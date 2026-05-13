# Pike Network

Frontend repository for the multi-bar "Pike" website.

The current implementation is a Next.js site with:

- a network landing page at `/`
- per-bar pages at `/bars/[slug]`
- mock content stored in code
- temporary mock media stored in `public/mock`

The target direction is a CMS-managed content system where editable text and venue media live outside this frontend repository.

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

4. Useful checks:

```bash
npm run lint
npm run build
```

## Current Reality

- The content source is `src/lib/content/mock-site-data.js`.
- Read helpers in `src/lib/content/get-site-data.js` expose `getSiteData()`, `getBars()`, and `getBarBySlug(slug)`.
- The network page is implemented in `src/app/page.js`.
- The bar page route is implemented in `src/app/bars/[slug]/page.js`.
- `generateStaticParams()` currently builds bar routes from the slug list inside mock content.
- `src/app/sitemap.js` also derives bar URLs from the same content source.
- Temporary frontend media belongs in `public/mock` and is referenced by URL strings.

## Target Direction

- Replace mock content with CMS-managed content.
- Keep the frontend repository focused on presentation, routing, and rendering.
- Keep production photos, videos, and editable menu files outside the frontend repository.
- Preserve the single-domain route pattern unless a later product decision changes it.

## Repository Map

- `src/app`: App Router routes, metadata, sitemap, robots
- `src/components`: reusable UI building blocks
- `src/lib/content`: content access layer and current mock source
- `public/mock`: temporary mock media for frontend development
- `docs`: project documentation, architecture notes, decisions, and task specs

## Documentation Map

- [docs/architecture.md](docs/architecture.md)
- [docs/content-contracts.md](docs/content-contracts.md)
- [docs/content-model.md](docs/content-model.md)
- [docs/content-flow.md](docs/content-flow.md)
- [docs/glossary.md](docs/glossary.md)
- [docs/roadmap.md](docs/roadmap.md)
- [docs/decisions/001-separate-multi-bar-repo.md](docs/decisions/001-separate-multi-bar-repo.md)
- [docs/decisions/002-content-outside-frontend-repo.md](docs/decisions/002-content-outside-frontend-repo.md)
- [docs/decisions/003-cms-first-content-management.md](docs/decisions/003-cms-first-content-management.md)
- [docs/decisions/004-bar-pages-by-slug.md](docs/decisions/004-bar-pages-by-slug.md)
- [docs/task-specs/replace-mock-content-with-cms.md](docs/task-specs/replace-mock-content-with-cms.md)
- [docs/task-specs/define-bar-content-schema.md](docs/task-specs/define-bar-content-schema.md)
- [docs/task-specs/implement-bar-page-data-contract.md](docs/task-specs/implement-bar-page-data-contract.md)

## Working Rules

- Treat `src/lib/content/mock-site-data.js` as a temporary development source, not the long-term source of truth.
- Do not introduce editable production media into `src/`.
- Keep temporary mock media under `public/mock`.
- When changing information architecture, keep the network usable as the number of bars grows.

## Open Questions

- Which CMS will be selected for implementation: Directus or another system?
- Will the production site stay on one domain with `/bars/[slug]`, or move to another routing model later?
- Which content should be shared at the network level versus fully local to each bar?
