# Nexus — AI Operations Console

A working v1 foundation, built to be extended feature-by-feature rather than faked wholesale.
Design system: dark "AI ops console" — deep space base, violet/cyan signal colors, Space Grotesk + Inter type.

## Quickstart

```bash
npm install
cp .env.example .env      # fill in DATABASE_URL, NEXTAUTH_SECRET, ANTHROPIC_API_KEY at minimum
npm run db:push
npm run db:seed           # creates admin@nexus.dev / ChangeMe123! — change immediately
npm run dev
```

Generate `NEXTAUTH_SECRET` with: `openssl rand -base64 32`

## What's actually working right now

- **Auth**: email/password + Google OAuth, JWT sessions, 2FA (TOTP) verification path, RBAC (Admin/Member/Viewer)
- **Database**: Postgres via Prisma — users, sessions, audit log, AI memory, knowledge chunks
- **Dashboard**: live stat cards, usage chart (Recharts), keyboard shortcuts (`g d`, `g a`, `g u`, `g s`)
- **Command palette**: `⌘K` / `Ctrl+K` from anywhere
- **AI assistant**: real Claude API calls, RAG retrieval over `KnowledgeChunk`, long-term memory per user stored in Postgres and injected into every prompt
- **Admin panel**: user list, inline role changes, audit log viewer — all RBAC-protected server-side
- **Rate limiting**: sliding-window limiter (Upstash) on the AI endpoint, with a safe local no-op fallback
- **Audit logging**: login attempts, 2FA failures, role changes, AI usage
- **UI polish**: glassmorphism, custom cursor, animated neural-mesh hero, skeleton loaders, custom 404, confetti + Konami-code easter egg, reduced-motion support, focus-visible states, SEO metadata

## What's stubbed / documented but not wired up

These are named explicitly rather than silently missing, so you know exactly what's real:

- **Embeddings**: uses a deterministic hash-based vector stand-in (`src/lib/ai.ts`) so RAG works with zero external deps. Swap in OpenAI/Voyage embeddings + pgvector for production quality.
- **AI Model Router**: the interface supports OpenAI/Gemini/DeepSeek, but only Claude is implemented. Add SDK calls in `routeCompletion()`.
- **Payments, email notifications, Slack/Discord/Notion/etc. integrations, biometric login/SSO, multi-agent orchestration, voice AI, computer vision, browser automation, self-healing agents, code review/bug-fix AI, terminal-in-browser, live collaboration, visual DB designer, CI/CD, k8s, session replay, heatmaps**: not built. Each is a real, scoped project on its own — happy to build any of these next as a proper vertical slice rather than a stub.

## Suggested build order for the rest of your list

1. Payments (Stripe) + email (Resend/SendGrid) — closes the loop on a real SaaS
2. One integration done well (Slack or Gmail) as a template for the others
3. Multi-agent workflow builder (a real one needs its own execution engine — worth its own session)
4. Observability: error tracking (Sentry) + basic analytics before heatmaps/session replay
5. DevOps: Dockerfile + CI (GitHub Actions) + one-click deploy (Vercel/Railway)

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind · Prisma/Postgres · NextAuth · Anthropic SDK · Recharts · Framer Motion
