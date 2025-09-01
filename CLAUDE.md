# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. It uses Claude AI to generate React components based on user descriptions and provides a virtual file system for real-time editing and preview.

## Development Commands

### Setup and Installation
```bash
# Install dependencies and initialize database
npm run setup

# Reset database (drops all data)
npm run db:reset
```

### Development
```bash
# Start development server with Turbo
npm run dev

# Start development server in background (logs to logs.txt)
npm run dev:daemon

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Run tests
npm test
```

## Architecture

### Core System Components

**Virtual File System (`src/lib/file-system.ts`)**
- In-memory file system that doesn't write to disk
- Handles file operations (create, read, update, delete, rename)
- Serializes/deserializes for persistence in database
- Used by AI tools to manage generated component files

**AI Integration (`src/app/api/chat/route.ts`)**
- Streaming chat API using Vercel AI SDK
- Integrates with Anthropic Claude or mock provider
- Uses custom tools: `str_replace_editor` and `file_manager`
- Saves conversation and file state to database projects

**Database Schema (Prisma + SQLite)**
- `User`: Authentication with email/password
- `Project`: Contains messages (JSON) and file data (JSON) 
- Supports both authenticated users and anonymous sessions
- Generated client at `src/generated/prisma/`

### UI Architecture

**Main Layout (`src/app/main-content.tsx`)**
- Three-panel resizable layout: Chat | Preview/Code toggle
- Context providers: FileSystemProvider, ChatProvider
- Switches between Preview (iframe) and Code (editor + file tree)

**State Management**
- `FileSystemProvider`: Virtual file system state and operations
- `ChatProvider`: Chat messages and streaming responses
- Uses React Context pattern throughout

**Key Components**
- `ChatInterface`: Handles user input and AI responses
- `PreviewFrame`: Iframe that renders generated components
- `CodeEditor`: Monaco Editor for file editing
- `FileTree`: Directory structure navigation

### AI Tools Integration

The system provides two custom tools to Claude:

1. **str_replace_editor**: File content editing with string replacement
2. **file_manager**: File system operations (create, list, view files)

These tools operate on the VirtualFileSystem instance and allow the AI to generate and modify React components.

### Component Generation Flow

1. User describes component in chat
2. AI receives system prompt with React/Tailwind guidelines
3. AI uses tools to create files in virtual file system
4. Preview updates in real-time via iframe
5. User can switch to Code view to see/edit generated files
6. For authenticated users, state persists in database

## Key Files and Directories

- `src/lib/file-system.ts`: Virtual file system implementation
- `src/lib/contexts/`: React context providers for state management
- `src/lib/tools/`: AI tool implementations for file operations
- `src/lib/prompts/`: System prompts for AI component generation
- `src/components/`: Reusable UI components (uses shadcn/ui)
- `prisma/schema.prisma`: Database schema definition
- `components.json`: shadcn/ui configuration

## Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Prisma ORM with SQLite
- **AI**: Anthropic Claude via Vercel AI SDK
- **Editor**: Monaco Editor for code editing
- **Testing**: Vitest with jsdom environment

## Development Notes

- The app works without an API key (uses mock responses)
- File operations happen in memory - nothing written to disk during generation
- Authentication is optional (supports anonymous users)
- Database migrations are in `prisma/migrations/`
- TypeScript aliases configured for `@/*` imports
- Use comments sparingly. Only comment complex code.
- The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.
- when push, use "git push origin"
- if file size is over 5Mb, don't add to Git