# ADR 004: Bar Pages by Slug

## Status

Working decision implemented in the current frontend.

## Context

The current Next.js application exposes individual bar pages at `/bars/[slug]`.

This is implemented in `src/app/bars/[slug]/page.js`, and route generation currently comes from the slug list returned by `getBars()`.

## Decision

Use a single-domain route pattern with per-bar pages at `/bars/[slug]` as the current canonical frontend structure.

## Rationale

- It matches the current codebase and existing UX.
- It keeps network discovery and per-bar SEO in one site tree.
- It is simple to generate from a structured bar list.
- It provides a stable route key for content lookup and sitemap generation.

## Consequences

Positive:

- simple route generation
- clear lookup model
- easy internal navigation between bars
- straightforward sitemap inclusion

Tradeoffs:

- future moves to subdomains would require redirects and route migration planning
- slug stability becomes a content governance concern

## Evidence In Current Repo

- route file: `src/app/bars/[slug]/page.js`
- route generation: `generateStaticParams()`
- sitemap generation: `src/app/sitemap.js`
- content lookup: `getBarBySlug(slug)`

## Guardrails

- Published slugs should be unique.
- Slug changes should be treated as deliberate migrations, not casual text edits.
- Homepage cards and sitemap generation should continue to derive from the same slug-bearing source.

## Boundary Of This ADR

This ADR defines the route shape and lookup key. It does not yet define:

- whether draft records may reuse a slug held by another draft or published bar
- whether preview mode can resolve unpublished slugs
- whether slug redirects are mandatory in the first CMS-backed release

Those follow-on governance decisions must be documented before CMS integration
is treated as execution-ready.

## Provisional Assumptions

- The single-domain route model remains acceptable for the first CMS-backed release.

## Open Questions

- Will the business eventually require per-bar subdomains or localized route variants?
- Should slug redirects be handled in the first production CMS workflow, or deferred?
