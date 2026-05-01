# Meetr

A modern meeting management platform that allows you to create AI agents, schedule meetings, run real-time video calls with OpenAI integration, and manage chat conversations—all in one place.

## Features

- **Agent Management** — Create, edit, and manage AI assistants with custom instructions
- **Meeting Scheduling** — Schedule meetings, assign agents, and track meeting history
- **Real-Time Video** — Stream.io powered video calls with OpenAI Realtime API integration
- **Live Chat** — Stream.io chat for real-time team messaging during meetings
- **Meeting Transcripts** — Automatic transcription of meeting audio via Stream.io
- **AI-Powered Summaries** — Inngest-driven background jobs to summarize meetings using OpenAI
- **Post-Meeting Chat** — Continue conversations with AI agents after meetings end
- **Authentication** — OAuth2 (GitHub, Google) via Better Auth
- **Responsive Design** — Mobile-first UI with Tailwind CSS and shadcn/ui

## Tech Stack

### Frontend
- **Next.js 16** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Pre-built React components
- **React Query (TanStack)** — Data fetching and caching
- **React Hook Form** — Form state management

### Backend
- **Next.js API Routes** — Serverless functions
- **tRPC** — Type-safe RPC between client and server
- **Drizzle ORM** — Database abstraction layer
- **PostgreSQL (Neon)** — Relational database

### AI & Services
- **OpenAI GPT-4o** — LLM for agent responses and meeting summaries
- **Inngest** — Background job orchestration for async tasks
- **Stream.io** — Real-time video, chat, and transcription
- **Better Auth** — OAuth2 and session management

### Utils & DevTools
- **nuqs** — URL search params management
- **JSONL Parser** — Transcript processing
- **ngrok** — Webhook tunneling for local dev

## Project Structure

```
src/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Auth-related pages (sign-in, sign-up)
│   ├── (dashboard)/                  # Protected dashboard routes
│   │   ├── agents/                   # Agent list and detail views
│   │   ├── meetings/                 # Meeting list and detail views
│   │   └── page.tsx                  # Dashboard home
│   ├── api/
│   │   ├── auth/[...all]/            # Better Auth endpoints
│   │   ├── trpc/[trpc]/              # tRPC API route
│   │   └── webhook/                  # Stream.io and Inngest webhooks
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing page
│   └── globals.css                   # Global styles
│
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── command-select.tsx            # Custom select component
│   ├── empty-state.tsx               # Empty state UI
│   └── ...                           # Other reusable components
│
├── db/
│   ├── index.ts                      # Database connection
│   └── schema.ts                     # Drizzle ORM schema (users, agents, meetings, sessions)
│
├── lib/
│   ├── auth.ts                       # Better Auth configuration
│   ├── auth-client.ts                # Client-side auth utilities
│   ├── simple-form.ts                # Custom form helper with Zod
│   ├── stream-chat.ts                # Stream Chat client
│   ├── stream-video.ts               # Stream Video client
│   └── utils.ts                      # General utilities
│
├── modules/
│   ├── agents/                       # Agent feature module
│   │   ├── server/procedures.ts      # tRPC routes for agents
│   │   ├── schemas.ts                # Zod validation schemas
│   │   ├── types.ts                  # TypeScript types
│   │   └── ui/                       # Agent UI components and views
│   │
│   ├── meetings/                     # Meeting feature module
│   │   ├── server/procedures.ts      # tRPC routes for meetings
│   │   ├── schemas.ts                # Zod validation schemas
│   │   ├── params.ts                 # Search param parsers (nuqs)
│   │   ├── types.ts                  # TypeScript types
│   │   ├── hooks/                    # Custom React hooks
│   │   └── ui/                       # Meeting UI components and views
│   │
│   ├── auth/                         # Auth UI components
│   ├── dashboard/                    # Dashboard UI components
│   └── ...                           # Other feature modules
│
├── trpc/
│   ├── client.tsx                    # tRPC client for React
│   ├── init.ts                       # tRPC router initialization
│   ├── query-client.ts               # React Query setup
│   ├── routers/                      # tRPC router definitions
│   └── server.tsx                    # Server-side tRPC utilities
│
└── inngest/
    ├── client.ts                     # Inngest client
    └── functions.ts                  # Background job definitions
```

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@host/dbname

# Authentication (Better Auth)
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stream.io (Video & Chat)
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=your-stream-api-key
STREAM_VIDEO_SECRET_KEY=your-stream-video-secret
NEXT_PUBLIC_STREAM_CHAT_API_KEY=your-stream-api-key
STREAM_CHAT_SECRET_KEY=your-stream-chat-secret

# OpenAI
OPENAI_API_KEY=sk-proj-your-openai-key

# Inngest (Optional, for webhook debugging)
INNGEST_SIGNING_KEY=your-inngest-key
INNGEST_EVENT_KEY=your-inngest-event-key
```

### Getting API Keys

- **Neon PostgreSQL**: [neon.tech](https://neon.tech) — Free PostgreSQL hosting
- **GitHub OAuth**: [github.com/settings/developers](https://github.com/settings/developers)
- **Google OAuth**: [console.cloud.google.com](https://console.cloud.google.com)
- **Stream.io**: [getstream.io](https://getstream.io) — Real-time APIs
- **OpenAI**: [platform.openai.com/keys](https://platform.openai.com/keys)
- **Inngest**: [inngest.com](https://inngest.com) — Serverless jobs

## Quick Start

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Database Setup

```bash
# Push schema to PostgreSQL
npm run db:push

# Open Drizzle Studio (browser-based DB UI)
npm run db:studio
```

### Development Server

```bash
# Start Next.js dev server
npm run dev

# Open http://localhost:3000 in your browser
```

**Important**: The app requires authentication. Sign in with GitHub or Google to access the dashboard.

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Webhook Development (Optional)

For testing webhooks locally, use ngrok to expose your local server:

```bash
npm run dev:webhook
```

This exposes your local server at a public URL that can receive Stream.io and Inngest webhooks.

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run db:push` | Sync Drizzle schema to database |
| `npm run db:studio` | Open interactive database UI |
| `npm run lint` | Run ESLint |
| `npm run dev:webhook` | Expose local server via ngrok |

## Architecture Patterns

### Module Organization
Each feature (agents, meetings) is organized as a module with:
- `server/procedures.ts` — tRPC endpoints
- `schemas.ts` — Zod validation
- `types.ts` — TypeScript interfaces
- `ui/` — React components
- `hooks/` — Custom React hooks

### Form Handling
Custom form helpers in `lib/simple-form.ts` provide:
- Zod resolver for validation
- Simple field binding
- Error state management

### State Management
- **Server State** — tRPC + React Query for API data
- **URL State** — nuqs for search params and filters
- **Client State** — React hooks for UI state

## Deployment

The app is optimized for:
- **Vercel** — Recommended for Next.js
- **Self-hosted** — Works on any Node.js hosting

No special configuration needed; environment variables are the only requirement.

## Support & Learning

- [Next.js Docs](https://nextjs.org/docs)
- [tRPC Docs](https://trpc.io/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Stream.io Docs](https://getstream.io/docs)
- [Better Auth Docs](https://better-auth.com)
