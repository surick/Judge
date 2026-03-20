# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Judge is an AI-powered legal consultation system. The project contains two parts:

1. **kernel/** - Original Java prototype (multi-threaded console app)
2. **web/** - Next.js full-stack web application (recommended for production)

## Web Application (web/)

### Build and Run

```bash
# Install dependencies
cd web && npm install

# Development server
cd web && npm run dev

# Production build
cd web && npm run build

# Run production server
cd web && npm start
```

### Environment Variables

Create `web/.env.local` with at least one LLM API key:

```env
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
DEEPSEEK_API_KEY=sk-xxx
QWEN_API_KEY=sk-xxx
```

### Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Next.js    │     │  API Routes │     │  LLM 网关   │
│  Chat UI    │────▶│  /api/chat  │────▶│  (多模型)   │
└─────────────┘     └─────────────┘     └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  法律检索   │
                     │  (RAG)      │
                     └─────────────┘
```

### Key Files

| File | Purpose |
|------|---------|
| `web/src/app/chat/page.tsx` | Main chat interface |
| `web/src/app/api/chat/route.ts` | Chat API endpoint |
| `web/src/lib/llm/providers.ts` | Multi-model LLM gateway |
| `web/src/lib/laws/searcher.ts` | Legal document retrieval |
| `web/src/lib/prompts/judge.ts` | Judge system prompt |

## Java Kernel (kernel/)

Original prototype - plain Java project without Maven/Gradle.

```bash
# Compile all source files
cd kernel && javac *.java

# Run the application
cd kernel && java Main
```

### Architecture

Multi-threaded producer-consumer system:

```
┌─────────┐     ┌──────────────┐     ┌───────┐     ┌───────────────┐     ┌──────────┐
│ Appeal  │ ──▶ │ ReceiveQueue │ ──▶ │ Judge │ ──▶ │ ResultsQueue  │ ──▶ │ Adjudge  │
│ (stdin) │     │   EVENTS     │     │       │     │   RESULTS     │     │ (output) │
└─────────┘     └──────────────┘     └───────┘     └───────────────┘     └──────────┘
```

## Project Structure

```
kernel/          # Java prototype (legacy)
web/             # Next.js web application (main)
├── src/
│   ├── app/     # Pages and API routes
│   ├── lib/     # Business logic
│   └── types/   # TypeScript definitions
├── prisma/      # Database schema
└── public/      # Static assets
modules/         # Planned modules (empty)
```

## Deployment

1. Push to GitHub
2. Import in Vercel with Root Directory = `web`
3. Configure environment variables
4. Add custom domain `evilcry.com`
