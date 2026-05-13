# Pike Network

Frontend repository for the multi-bar Pike website.

The current implementation is a Next.js App Router site with a network welcome
page, per-bar pages, repo-local mock content, and temporary mock media. The
target direction is CMS-managed content and externally managed production media,
but no CMS workflow is implemented in this repository yet.

## Start Here

1. Use Node 20 from `.nvmrc`.
2. Install dependencies:

```bash
npm ci
```

3. Start the dev server:

```bash
npm run dev
```

4. Run checks:

```bash
npm run lint
npm run build
```

## Current Reality

- `/` is implemented in `src/app/page.js`.
- `/bars/[slug]` is implemented in `src/app/bars/[slug]/page.js`.
- The content source is `src/lib/content/mock-site-data.js`.
- Read helpers in `src/lib/content/get-site-data.js` expose `getSiteData()`,
  `getBars()`, and `getBarBySlug(slug)`.
- `generateStaticParams()` builds bar routes from the slug list inside mock
  content.
- `src/app/sitemap.js` derives bar URLs from the same content source.
- Temporary frontend media belongs in `public/mock` and is referenced by URL
  strings.

## Target Direction

- Replace mock content with CMS-managed content in a future task.
- Keep the frontend repository focused on presentation, routing, rendering, and
  content adaptation.
- Keep production photos, videos, and editable menu files outside the frontend
  repository.
- Preserve the single-domain `/bars/[slug]` route pattern unless a later
  product decision changes it.

## Repository Map

- `src/app` — App Router routes, metadata, sitemap, robots, global CSS
- `src/components` — reusable UI building blocks
- `src/lib/content` — content access layer and current mock source
- `public/mock` — temporary mock media for frontend development
- `docs` — architecture notes, content docs, decisions, feature docs, and task
  specs
- `docs/archive` — historical planning inputs only

## Documentation Map

- [AGENTS.md](AGENTS.md) — working rules and context routing for AI agents
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — short index of canonical docs
- [docs/architecture.md](docs/architecture.md) — runtime boundaries and target architecture
- [docs/content-contracts.md](docs/content-contracts.md) — internal frontend data contracts
- [docs/content-model.md](docs/content-model.md) — CMS-oriented field planning
- [docs/content-flow.md](docs/content-flow.md) — current and target content movement
- [docs/glossary.md](docs/glossary.md) — shared terminology
- [docs/mock-media.md](docs/mock-media.md) — temporary media fixture rules
- [docs/roadmap.md](docs/roadmap.md) — sequencing and decision gates
- [docs/features/welcome-page.md](docs/features/welcome-page.md) — current welcome page direction

Execution-ready task specs live in [docs/task-specs](docs/task-specs):

- [welcome-page-redesign.md](docs/task-specs/welcome-page-redesign.md)
- [implement-content-adapter.md](docs/task-specs/implement-content-adapter.md)
- [replace-mock-content-with-cms.md](docs/task-specs/replace-mock-content-with-cms.md)
- [define-bar-content-schema.md](docs/task-specs/define-bar-content-schema.md)
- [implement-bar-page-data-contract.md](docs/task-specs/implement-bar-page-data-contract.md)

Architecture decisions live in [docs/decisions](docs/decisions).

Historical planning inputs live in [docs/archive](docs/archive). Treat them as
background only; they must not override the canonical docs above.

## Working Rules

- Do not work directly on `main` for feature, fix, UI, or documentation changes;
  follow the branch workflow in [AGENTS.md](AGENTS.md).
- Treat `src/lib/content/mock-site-data.js` as a temporary development source,
  not the long-term source of truth.
- Preserve `src/lib/content/get-site-data.js` as the content adapter boundary.
- Do not introduce editable production media into `src`.
- Keep temporary mock media under `public/mock`.
- When changing information architecture, keep the network usable as the number
  of bars grows.

## Open Questions

- Which CMS will be selected for implementation?
- Will the production site stay on one domain with `/bars/[slug]`, or move to
  another routing model later?
- Which content should be shared at the network level versus fully local to each
  bar?
