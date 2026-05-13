# Task Spec: Replace Mock Content With CMS

## Goal

Replace the runtime dependency on `src/lib/content/mock-site-data.js` with CMS-backed content access while keeping the existing frontend behavior stable.

The canonical internal frontend contracts for this work are defined in
[docs/content-contracts.md](/Users/km/Documents/GitHub/pike-network/docs/content-contracts.md).

## Current State

- `src/lib/content/get-site-data.js` returns data directly from `mock-site-data.js`.
- `/` reads `getSiteData()`.
- `/bars/[slug]` reads `getBarBySlug(slug)` and `getBars()`.
- `generateStaticParams()` and `src/app/sitemap.js` currently depend on the same mock slug list.
- Temporary media URLs point to `public/mock/...`.

## Scope

In scope:

- content fetching from a selected CMS or CMS-facing adapter
- environment variable contract for CMS access
- mapping CMS responses into the internal frontend contract
- route generation from CMS-backed bar slugs
- sitemap generation from the same CMS-backed slug source

Out of scope:

- redesigning page layout
- replacing the route pattern
- building a full editorial UI inside this repo
- moving every temporary mock asset in the same step unless required by the CMS integration

## Constraints

- Keep the content access seam in `src/lib/content`.
- Do not make page components depend on raw CMS response shapes.
- Do not make the frontend repository the source of truth for editable production content.
- Media handling must remain compatible with externally hosted assets.

## Prerequisites

Before the runtime source is switched away from mock content, these decisions
must be documented explicitly:

- which CMS product and API shape are in scope for the first implementation
- whether the runtime reads published content only, or also supports preview or
  draft access
- how slug governance works for published records, draft records, and redirects
- whether missing CMS configuration or fetch failures hard-fail the build/runtime
  or fall back under a documented non-production rule

## Required Deliverables

1. A CMS-backed implementation behind `src/lib/content/get-site-data.js`, or a new module used by it.
2. A documented mapping layer from CMS fields to the frontend contracts in
   `docs/content-contracts.md`.
3. Slug loading for `generateStaticParams()` from the CMS-backed source.
4. Sitemap generation from the same published bar source.
5. Documentation for required environment variables and one explicit failure
   behavior rule.

## Acceptance Criteria

- `src/lib/content/get-site-data.js` no longer imports `mock-site-data.js` in the production runtime path.
- `getBars()` returns the list of published bars from the CMS-backed source.
- `getBarBySlug(slug)` returns a normalized bar object or `null`.
- The homepage renders network-level content from the CMS-backed source without
  changing component prop names.
- `/bars/[slug]` renders bar content from the CMS-backed source without changing the route pattern.
- `generateStaticParams()` derives slugs from the CMS-backed source.
- `src/app/sitemap.js` derives bar URLs from the same CMS-backed source as route generation.
- The adapter resolves CMS asset references into the URL-based media fields
  defined in `docs/content-contracts.md`.
- Required CMS configuration and CMS fetch failure behavior follow one explicit,
  documented rule rather than an ambiguous fallback.

## Suggested Implementation Sequence

1. Define the frontend data contract and keep it stable.
2. Add a CMS client or fetch helper.
3. Add mapper functions from CMS response objects to frontend objects.
4. Swap `getSiteData()`, `getBars()`, and `getBarBySlug(slug)` to use the mapper layer.
5. Document environment variables and operational assumptions.
6. Remove runtime dependence on mock content.

## Verification

- Run `npm run build`.
- Confirm that the homepage renders CMS-backed network data.
- Confirm that at least one `/bars/[slug]` page renders CMS-backed bar data.
- Confirm that `sitemap.xml` includes the CMS-backed bar slugs.

## Provisional Assumptions

- The selected CMS can provide published network settings and published bar records through an API available to the frontend build/runtime.
- The first implementation can use published content only if preview mode is not yet approved.

## Open Questions

- Which CMS product and API shape will be used?
- Should CMS reads happen directly from Next.js, or through an intermediate backend adapter?
- Is incremental revalidation required in the first implementation, or is build-time generation sufficient?
