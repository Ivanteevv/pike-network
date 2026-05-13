# Architecture

## Purpose

This document describes the current frontend architecture in this repository and the target architecture implied by the project direction.

The canonical internal frontend data contracts are defined in
[content-contracts.md](content-contracts.md).

## Current Architecture

### Runtime

- Framework: Next.js App Router
- Primary routes:
  - `/` in `src/app/page.js`
  - `/bars/[slug]` in `src/app/bars/[slug]/page.js`
- Metadata shell: `src/app/layout.js`
- Robots and sitemap:
  - `src/app/robots.js`
  - `src/app/sitemap.js`

### Content Layer

- Current source of truth for page content: `src/lib/content/mock-site-data.js`
- Current read API:
  - `getSiteData()`
  - `getBars()`
  - `getBarBySlug(slug)`
- Current adapter implementation: `src/lib/content/get-site-data.js`
- Current implementation detail: the adapter is still a direct pass-through to
  mock objects, so the normalization boundary is a design seam, not yet a fully
  implemented mapper layer

### Media Layer

- Temporary media is stored in `public/mock`
- Components consume renderable URL-based media contracts, not imported files
- Hero media rendering is centralized in `src/components/hero-media.js`
- Gallery rendering is centralized in `src/components/bar-gallery.js`
- In the target system, CMS or storage layers may keep asset references, but the
  frontend adapter must resolve those into the URL fields defined in
  [content-contracts.md](content-contracts.md)

### Rendering Pattern

1. Route reads from the content layer.
2. Today, route code still receives the raw mock object shape; the intended
   steady state is for route code to depend only on the normalized contracts in
   `src/lib/content`.
3. Page emits metadata and JSON-LD.
4. Sitemap generation reads the same bar list used for route generation.

### Global Shell

- `src/app/layout.js` sets fonts and site-wide metadata
- `src/components/age-gate.js` adds a client-side age gate
- `src/components/scroll-to-top.js` provides global scroll return behavior

## Current Boundary Decisions

- This repository is the frontend application, not the long-term editorial source of truth.
- Mock content exists because CMS integration is not yet implemented.
- Mock media in `public/mock` is allowed only as a temporary frontend development aid.

## Target Architecture

### Intended Runtime Responsibilities

Frontend repository:

- routing
- rendering
- SEO metadata generation
- JSON-LD generation
- presentation logic
- content-to-UI mapping

CMS and data systems:

- editable structured content
- draft and publish workflow
- media metadata
- editor permissions

Object storage or media service:

- photos
- videos
- menu PDFs
- posters and other binary assets

### Intended Content Path

1. Editor updates content in CMS.
2. CMS stores structured records and media references.
3. Frontend fetches published content through a content adapter.
4. Routes render normalized data without knowing CMS-specific field names.

## Current vs Target

| Area | Current | Target |
| --- | --- | --- |
| Content source | `mock-site-data.js` in repo | CMS outside repo |
| Bar route generation | `generateStaticParams()` from mock slug list | Slugs from CMS-backed source |
| Media source | `/public/mock/...` URLs | CMS-managed remote assets |
| Editorial workflow | code change required | non-developer content editing |
| Frontend responsibility | content + rendering mixed together | rendering and content adaptation separated |

## Integration Boundary To Preserve

The safest seam for future work is the content adapter in `src/lib/content`.

Frontend routes and components should depend on a stable internal data contract, while CMS-specific fetching and mapping stay behind the adapter layer.

## Provisional Assumptions

- The current single-domain route model remains the working default during the first CMS integration.
- The frontend will continue to statically enumerate bar slugs at build time unless a later requirement forces a more dynamic strategy.

## Open Questions

- Should the CMS integration support preview or draft mode in the first version?
- Should bar pages keep full static generation, or move to revalidation/on-demand publishing?
- Which CMS product will own the canonical schema and editorial workflow?

These are not settled architecture decisions yet. CMS integration work should
not assume answers here unless the answers are documented explicitly in the
roadmap or a follow-on ADR.
