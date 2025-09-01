"use client";

import { Loader2, FileText, FilePlus, Edit, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: any;
  state: "call" | "partial-call" | "result";
  result?: any;
}

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

function parseToolArguments(toolName: string, args: any): { message: string; icon: React.ComponentType<any> } {
  if (toolName === "str_replace_editor") {
    try {
      const parsedArgs = typeof args === "string" ? JSON.parse(args) : args;
      const { command, path } = parsedArgs;
      
      if (path) {
        const filename = path.split("/").pop() || path;
        
        switch (command) {
          case "create":
            return { message: `Creating ${filename}`, icon: FilePlus };
          case "str_replace":
            return { message: `Editing ${filename}`, icon: Edit };
          case "view":
            return { message: `Viewing ${filename}`, icon: Eye };
          case "insert":
            return { message: `Updating ${filename}`, icon: Edit };
          default:
            return { message: `Working on ${filename}`, icon: FileText };
        }
      }
    } catch (error) {
      // Fall through to default case
    }
  }
  
  if (toolName === "file_manager") {
    try {
      const parsedArgs = typeof args === "string" ? JSON.parse(args) : args;
      const { action, path } = parsedArgs;
      
      if (path && action) {
        const filename = path.split("/").pop() || path;
        
        switch (action) {
          case "create":
          case "create_file":
            return { message: `Creating ${filename}`, icon: FilePlus };
          case "read":
          case "read_file":
            return { message: `Reading ${filename}`, icon: Eye };
          case "write":
          case "write_file":
            return { message: `Writing ${filename}`, icon: Edit };
          default:
            return { message: `Managing ${filename}`, icon: FileText };
        }
      }
    } catch (error) {
      // Fall through to default case
    }
  }
  
  // Default fallback - clean up the tool name
  const cleanName = toolName
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  
  return { message: cleanName, icon: FileText };
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const { message, icon: Icon } = parseToolArguments(toolInvocation.toolName, toolInvocation.args);
  const isCompleted = toolInvocation.state === "result" && toolInvocation.result;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isCompleted ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <Icon className="w-3 h-3 text-neutral-600" />
          <span className="text-neutral-700">{message}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <Icon className="w-3 h-3 text-neutral-600" />
          <span className="text-neutral-700">{message}</span>
        </>
      )}
    </div>
  );
}