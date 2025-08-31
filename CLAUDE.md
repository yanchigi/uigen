# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains **UIGen**, an AI-powered React component generator with live preview, built with Next.js 15, React 19, and TypeScript. The main project is located in the `uigen/` directory.

## Development Commands

### Setup and Installation
```bash
cd uigen
npm run setup  # Installs deps, generates Prisma client, runs migrations
```

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run dev:daemon   # Start dev server in background, logs to logs.txt
```

### Building and Testing
```bash
npm run build        # Build for production
npm run test         # Run tests with Vitest
npm run lint         # Run ESLint
```

### Database
```bash
npm run db:reset     # Reset database with force flag
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Run database migrations
```

## Architecture

### Core Structure
- **Next.js App Router**: Uses Next.js 15 with App Router pattern in `src/app/`
- **Virtual File System**: Custom `VirtualFileSystem` class manages in-memory file operations
- **AI Integration**: Claude AI integration via Vercel AI SDK and Anthropic client
- **Database**: Prisma with SQLite for user projects and authentication

### Key Directories
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components organized by feature
  - `chat/` - Chat interface components
  - `editor/` - Code editor and file tree components  
  - `preview/` - Live preview components
  - `auth/` - Authentication components
  - `ui/` - Reusable UI components (shadcn/ui)
- `src/lib/` - Core utilities and business logic
  - `contexts/` - React contexts for state management
  - `tools/` - AI tool implementations (file manager, string replacement)
  - `transform/` - Code transformation utilities
  - `prompts/` - AI prompt templates
- `src/actions/` - Server actions
- `src/hooks/` - Custom React hooks

### Main Chat API
The `/api/chat` endpoint handles AI interactions using:
- Custom tools for file manipulation (`str_replace_editor`, `file_manager`)
- Virtual file system for managing generated code
- Project persistence for authenticated users

### Database Schema
- **User**: Authentication (id, email, password, timestamps)
- **Project**: User projects (id, name, userId, messages, data, timestamps)

## Tech Stack
- Next.js 15 with App Router and Turbopack
- React 19 with TypeScript
- Tailwind CSS v4
- Prisma with SQLite
- Anthropic Claude AI via Vercel AI SDK
- Testing with Vitest and Testing Library
- UI components from Radix UI and shadcn/ui

## Environment Setup
Optional `.env` file with:
```
ANTHROPIC_API_KEY=your-api-key-here
```
App runs without API key using mock responses.
- Use comments sapringly. Only comment complex code.
- The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.