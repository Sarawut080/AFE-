# Copilot / AI agent instructions — AFE-plus

Short summary
- Stack: Next.js 14 (TypeScript), React 18, Redux Toolkit, Prisma (Postgres), Sass/tailwind used.
- Repo uses both `src/app/` (App Router) and `src/pages/` (Pages Router + API routes).

Key commands
- Start dev server (port used by project): `npm run dev` (runs `next dev -p 3050`).
- Build for production: `npm run build`; start: `npm run start`.
- Lint: `npm run lint`.
- Prisma: use `npx prisma migrate dev --name <name>` / `npx prisma migrate` / `npx prisma generate`.

Where to look first (big-picture)
- Application entry & routes: `src/app/` (App Router) and `src/pages/` (legacy pages and API routes). Inspect both when changing routing or API behavior.
- Server/API code: `src/pages/api/` contains serverless endpoints; prefer editing those for server-side behaviors used by frontend.
- Business/service layer: `src/lib/service/` contains API wrappers (e.g. `auth.ts`, `userManagement.ts`, `borrowEquipment.ts`). Prefer updating or adding helpers here rather than scattering direct `fetch`/`axios` calls.
- Global libs and middleware: `src/lib/` (e.g. `authMiddleware.ts`, `prisma.ts`, `withCommonData.ts`) — these centralize cross-cutting concerns.
- State management: `src/redux/` (store at `src/redux/store.ts`, feature slices under `src/redux/features/`). Example: `setDataUser` in `src/redux/features/user.ts` replaces the whole `user` object.
- DB schema & migrations: `prisma/schema.prisma` and `prisma/migrations/`.

Environment & secrets
- Environment variables exposed to Next via `next.config.js` (example keys): `APP_STATUS`, `GOOGLE_MAPS_API_KEY`, `CHANNEL_ACCESS_TOKEN_LINE`, `WEB_API_URL`, `WEB_DOMAIN`, `CRYPTOJS_SECRET_KEY`, `SECRET_KEY`.
- Database env names (Prisma): `DATABASE_PUBLIC_URL`, `DATABASE_PUBLIC_URL_NON_POOLING` (check `prisma/schema.prisma`).
- Local env files present: `env.development.local`, `env.production.local` — follow their convention for local testing.

Conventions & useful patterns (project-specific)
- Components: organized in `src/components/<Feature>/` with files per component (e.g. `Button/ButtonAdd.tsx`). Use PascalCase for components and group related component files in a folder.
- Services: high-level API interactions live in `src/lib/service/*` — call these from pages/components rather than embedding URLs inline. Services commonly read `process.env.WEB_API_URL`.
- Redux slices: each feature under `src/redux/features/` exports actions and default reducer. Prefer `createSlice` patterns and `PayloadAction<T>` as shown in `src/redux/features/user.ts`.
- Styling: global styles in `src/styles/` (`globals.css`, `main.scss`) and Tailwind configured; keep page-level style modules alongside components when already present.
- Database: Prisma models use snake_case names (e.g. `users`, `takecareperson`, `borrowequipment`) — keep field names consistent when writing queries.

Debugging and developer workflow notes
- Run dev server: `npm run dev` and reproduce UI/API behavior locally on port 3050 by default.
- To update Prisma after schema edits: `npx prisma migrate dev --name <desc>` then `npx prisma generate`.
- Server-side logs: examine terminal running `next dev`, and for API-specific runs inspect `src/pages/api/*` handler code.
- When adding an API route, place it under `src/pages/api/` for serverless endpoints; these are used by external services and the frontend.

Integration points and external dependencies
- Line messaging / webhook integrations: `src/pages/api/webhook.ts`, `src/lib/service/apiLineReply.ts`, and `src/lib/service/apiLineGroup.ts` — be careful with tokens: `CHANNEL_ACCESS_TOKEN_LINE` from env.
- Google Maps usage: `@react-google-maps/api` and `GOOGLE_MAPS_API_KEY` in env; map components live under `src/components` and pages that use maps (search for `@react-google-maps/api`).
- Prisma/Postgres is the canonical data source; migrations live in `prisma/migrations/` and the SQL backups (`backupafe.sql`, `backupdata3.sql`) exist in the repo root.

Quick examples (copyable)
- Start dev: `npm run dev` (dev server on port 3050)
- Run prisma migrate locally: `npx prisma migrate dev --name init` then `npx prisma generate`
- Example state update (user): open `src/redux/features/user.ts` and dispatch `setDataUser({ permission, userName, userId, accessToken })`.

What NOT to assume
- The repo mixes `src/app` and `src/pages`. Don't assume a single routing system — check both when changing navigation or API endpoints.
- Many DB relations and naming are legacy/snake_case. Match Prisma model/field names when writing raw SQL or Prisma queries.

If unsure where to change something
1. Look for service wrapper in `src/lib/service/` — modify or add there.
2. Check API handlers under `src/pages/api/` for server-side logic.
3. If state is involved, inspect or add a slice in `src/redux/features/` and wire through `src/redux/store.ts`.

Next steps / feedback
- Tell me which areas feel unclear (routing, prisma, services, redux) and I will expand examples or add file references.
