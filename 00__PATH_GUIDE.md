# File → Path Guide

Each file below is numbered to match the order I'll upload them. The name on the
left is what you'll download; the path on the right is what you type into
GitHub's "Create new file" name box (see instructions below).

| Downloaded file | Type this as the path in GitHub |
|---|---|
| 01__.env.example | `.env.example` |
| 02__.github__workflows__ci.yml | `.github/workflows/ci.yml` |
| 03__.gitignore | `.gitignore` |
| 04__Dockerfile | `Dockerfile` |
| 05__README.md | `README.md` |
| 06__next.config.mjs | `next.config.mjs` |
| 07__package.json | `package.json` |
| 08__postcss.config.js | `postcss.config.js` |
| 09__prisma__schema.prisma | `prisma/schema.prisma` |
| 10__prisma__seed.ts | `prisma/seed.ts` |
| 11__public__robots.txt | `public/robots.txt` |
| 12__src__app__admin__page.tsx | `src/app/admin/page.tsx` |
| 13__src__app__api__ai__chat__route.ts | `src/app/api/ai/chat/route.ts` |
| 14__src__app__api__audit-log__route.ts | `src/app/api/audit-log/route.ts` |
| 15__src__app__api__auth__[...nextauth]__route.ts | `src/app/api/auth/[...nextauth]/route.ts` |
| 16__src__app__api__users__route.ts | `src/app/api/users/route.ts` |
| 17__src__app__dashboard__page.tsx | `src/app/dashboard/page.tsx` |
| 18__src__app__globals.css | `src/app/globals.css` |
| 19__src__app__layout.tsx | `src/app/layout.tsx` |
| 20__src__app__login__page.tsx | `src/app/login/page.tsx` |
| 21__src__app__not-found.tsx | `src/app/not-found.tsx` |
| 22__src__app__page.tsx | `src/app/page.tsx` |
| 23__src__app__providers.tsx | `src/app/providers.tsx` |
| 24__src__components__ai__ChatPanel.tsx | `src/components/ai/ChatPanel.tsx` |
| 25__src__components__dashboard__RoleSelect.tsx | `src/components/dashboard/RoleSelect.tsx` |
| 26__src__components__dashboard__StatGrid.tsx | `src/components/dashboard/StatGrid.tsx` |
| 27__src__components__layout__DashboardShell.tsx | `src/components/layout/DashboardShell.tsx` |
| 28__src__components__layout__HeroCanvas.tsx | `src/components/layout/HeroCanvas.tsx` |
| 29__src__components__ui__Achievements.tsx | `src/components/ui/Achievements.tsx` |
| 30__src__components__ui__CommandPalette.tsx | `src/components/ui/CommandPalette.tsx` |
| 31__src__components__ui__CustomCursor.tsx | `src/components/ui/CustomCursor.tsx` |
| 32__src__components__ui__EasterEgg.tsx | `src/components/ui/EasterEgg.tsx` |
| 33__src__lib__ai.ts | `src/lib/ai.ts` |
| 34__src__lib__audit.ts | `src/lib/audit.ts` |
| 35__src__lib__auth.ts | `src/lib/auth.ts` |
| 36__src__lib__prisma.ts | `src/lib/prisma.ts` |
| 37__src__lib__ratelimit.ts | `src/lib/ratelimit.ts` |
| 38__src__middleware.ts | `src/middleware.ts` |
| 39__tailwind.config.ts | `tailwind.config.ts` |
| 40__tsconfig.json | `tsconfig.json` |

## How to upload using this guide (no drag-and-drop needed)

1. Go to your empty repo on github.com
2. Click **Add file** (top right) → **Create new file**
3. In the "Name your file..." box, type the **path** from the table above exactly,
   e.g. `src/app/page.tsx` — GitHub automatically creates the `src` and `app`
   folders for you as you type the `/`
4. Open the matching downloaded file on your computer (in Notepad, TextEdit,
   or VS Code), copy all its content, and paste it into GitHub's editor box
5. Scroll down, click **Commit changes**
6. Repeat for all 40 files

It's repetitive, but each step is simple and there's zero risk of files
landing in the wrong folder or overwriting each other.
