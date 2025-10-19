# Repository Guidelines

## Project Structure & Module Organization
This Next.js 15 codebase uses the App Router under `src/app`, with the primary shell in `layout.tsx` and feature landing page in `page.tsx`. Auth-specific routes live inside `src/app/(auth)`, while API handlers are grouped in `src/app/api`. Shared UI primitives are collected under `src/components`, domain workflows under `src/features`, and reusable logic inside `src/hooks` and `src/lib`. TRPC procedures and client bindings sit in `src/trpc`, and Prisma data models plus migrations live in `prisma/`. Static assets, icons, and public fonts belong in `public/`.

## Build, Test, and Development Commands
- `pnpm dev`: launches the Turbopack development server on `http://localhost:3000` with hot-reload.
- `pnpm build`: generates the optimized production bundle; run before deployment checks.
- `pnpm start`: serves the production build locally; requires a prior `pnpm build`.
- `pnpm lint`: executes Biome lint rules across the repo; ensure it passes prior to pushing.
- `pnpm format`: applies Biome formatting in-place; use after large refactors or before reviews.

## Coding Style & Naming Conventions
Biome enforces two-space indentation, single quotes in TypeScript/JavaScript, and consistent import ordering. Prefer TypeScript everywhere (`.ts`/`.tsx`) and align component names with their files (e.g., `UserCard.tsx` exports `UserCard`). Co-locate styles using CSS modules only when Tailwind utility composition becomes unwieldy. Environment variables should be camel-cased with `NEXT_PUBLIC_` prefixes for client exposure. Keep TRPC routers named `<feature>Router` and export them from `src/trpc/index.ts`.

## Testing Guidelines
Automated tests are not yet wired into `package.json`; introduce coverage by co-locating `*.test.ts` files beside the code they exercise and add the corresponding runner before merging. Snapshot tests for UI should live alongside components, while integration tests against TRPC handlers should mock Prisma via dependency injection. Until a formal suite lands, run `pnpm lint` and manually verify critical flows (`pnpm dev`) before opening a review.

## Commit & Pull Request Guidelines
Recent history favors numeric prefixes (e.g., `03: trpc setup`) to tie commits to work items—continue the pattern with concise, imperative subjects. For pull requests, include a summary of changes, linked issue references, and screenshots or Looms for visual updates. Add verification notes (commands run, migrations applied) in the PR description, and ensure any database change ships with an updated `prisma/migrations` entry via `pnpm prisma migrate dev`.
