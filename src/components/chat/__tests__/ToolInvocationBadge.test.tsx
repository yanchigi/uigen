import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

afterEach(() => {
  cleanup();
});

test("renders loading state for pending tool invocation", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "create", path: "/components/Card.jsx" }),
    state: "partial-call" as const,
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating Card.jsx")).toBeDefined();
});

test("renders completed state for finished tool invocation", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "create", path: "/components/Card.jsx" }),
    state: "result" as const,
    result: "File created successfully",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);

  expect(screen.getByText("Creating Card.jsx")).toBeDefined();
});

test("parses str_replace_editor create command correctly", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "create", path: "/components/Button.tsx" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("parses str_replace_editor str_replace command correctly", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "str_replace", path: "/App.jsx" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("parses str_replace_editor view command correctly", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "view", path: "/styles/globals.css" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Viewing globals.css")).toBeDefined();
});

test("parses str_replace_editor insert command correctly", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "insert", path: "/components/Form.tsx" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Updating Form.tsx")).toBeDefined();
});

test("handles file_manager tool correctly", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "file_manager",
    args: JSON.stringify({ action: "create_file", path: "/utils/helpers.js" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Creating helpers.js")).toBeDefined();
});

test("handles object args instead of stringified JSON", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/components/Modal.tsx" },
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Creating Modal.tsx")).toBeDefined();
});

test("extracts filename from complex path", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "create", path: "/src/components/ui/dialog/Dialog.tsx" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Creating Dialog.tsx")).toBeDefined();
});

test("handles malformed JSON args gracefully", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: "invalid json {",
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Str Replace Editor")).toBeDefined();
});

test("handles unknown tool with fallback", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "unknown_tool",
    args: "{}",
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Unknown Tool")).toBeDefined();
});

test("handles missing path in args", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "create" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Str Replace Editor")).toBeDefined();
});

test("handles unknown command with default message", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: JSON.stringify({ command: "unknown_command", path: "/test.js" }),
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Working on test.js")).toBeDefined();
});

test("handles empty args", () => {
  const toolInvocation = {
    toolCallId: "test-id",
    toolName: "str_replace_editor",
    args: {},
    state: "result" as const,
    result: "Success",
  };

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);
  expect(screen.getByText("Str Replace Editor")).toBeDefined();
});