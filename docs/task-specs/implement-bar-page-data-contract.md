# Task Spec: Implement Bar Page Data Contract

## Goal

Define and implement the normalized frontend data contracts used by the current
site so that content-source changes do not leak directly into route and
component code.

## Current State

- `src/app/bars/[slug]/page.js` consumes a bar object returned by `getBarBySlug(slug)`.
- The expected object shape is currently implicit in `mock-site-data.js`.
- The bar page, bar switcher, and sitemap all depend on a consistent `slug`.

## Scope

In scope:

- the normalized `BarPageData` object shape
- the normalized `BarSummary` list shape used by `getBars()` and
  `getSiteData().bars`
- the normalized `NetworkSiteData` shape returned by `getSiteData()`
- mapping rules from upstream content into that shape
- null and missing-field behavior
- required versus optional sections

Out of scope:

- CMS schema design beyond what is necessary to support the contract
- visual redesign of the bar page
- homepage contract redesign beyond what is necessary to keep shared helpers aligned

## Canonical Contract Location

The canonical contract definitions for this task should live in:

- [docs/content-contracts.md](../content-contracts.md)

This task should update that file instead of creating parallel contract notes in
multiple places.

## Required Contracts

### `BarPageData`

The frontend detail contract for one bar should provide at least:

```json
{
  "id": "string",
  "slug": "string",
  "name": "string",
  "shortLabel": "string",
  "locationLabel": "string",
  "city": "string",
  "addressLine": "string",
  "phoneDisplay": "string",
  "phoneE164": "string",
  "hours": ["string"],
  "bestFor": ["string"],
  "hero": {
    "kind": "image|video",
    "videoUrl": "string|null",
    "imageUrl": "string|null",
    "posterUrl": "string|null"
  },
  "gallery": [
    {
      "src": "string",
      "alt": "string"
    }
  ],
  "menuLinks": [
    {
      "title": "string",
      "description": "string",
      "href": "string|null",
      "status": "string"
    }
  ],
  "menuPreview": [
    {
      "name": "string",
      "note": "string"
    }
  ],
  "mapUrl": "string",
  "seo": {
    "title": "string",
    "description": "string"
  }
}
```

The current data source includes additional fields such as `summary`, `vibe`, `features`, `events`, and `socialLinks`.

Those fields should be either:

- preserved as optional contract fields, or
- explicitly excluded from the contract with documented rationale

### `BarSummary`

`getBars()` and `getSiteData().bars` must expose an explicit summary contract for
route generation and cross-bar navigation. At minimum it must include:

- `id`
- `slug`
- `name`
- `shortLabel`
- `locationLabel`
- `city`
- `addressLine`

### `NetworkSiteData`

`getSiteData()` must expose an explicit network-level contract for homepage and
site-wide shared UI, including:

- `network`
- `bars` as `BarSummary[]`

## Contract Rules

- `slug` is required and route-safe.
- `hero.kind` determines whether `videoUrl` is expected.
- `posterUrl` is required when `hero.kind` is `video` unless the component contract is intentionally changed.
- `gallery` items require both `src` and `alt`.
- `menuLinks[].status` remains required even when `href` is `null`.
- collection fields return arrays, not `null`.
- non-applicable media URL fields return `null`.
- `getBarBySlug(slug)` returns `null` when no bar matches the documented runtime
  visibility rule.

## Deliverables

1. A documented TypeScript-like or JSON-like contract definition in project docs.
2. Mapper code that guarantees the returned object matches the contract.
3. Clear handling for optional or absent sections.
4. Removal of direct dependence on raw source object shape in route code, if present.
5. Explicit documentation of which getters return `NetworkSiteData`,
   `BarSummary[]`, and `BarPageData | null`.

## Acceptance Criteria

- The bar page reads from a documented normalized object, not an undocumented CMS response shape.
- Every field accessed in `src/app/bars/[slug]/page.js` is present in the contract or handled as optional with fallback behavior.
- `getBarBySlug(slug)` returns `null` for a missing slug under the documented
  runtime visibility rule.
- `getBars()` returns `BarSummary[]` without requiring route code to know CMS
  internals.
- `getSiteData()` returns `NetworkSiteData` with `bars` treated as
  `BarSummary[]`, not an implicit full-detail object list.
- The contract explicitly documents whether non-rendered fields such as `events` and `socialLinks` are included.
- The contract is stable enough that swapping content sources does not require page-level prop renaming.

## Verification

- Cross-check the contract against the fields used in `src/app/bars/[slug]/page.js`.
- Cross-check the contract against network listing needs in `src/components/network-points.js`.
- Cross-check the network-level contract against `src/app/page.js` and
  `src/components/site-footer.js`.
- Run `npm run build` after implementation.

## Provisional Assumptions

- The first implementation may keep string arrays for `hours` and `bestFor` because that matches current UI expectations.
- The homepage and sitemap may use smaller list-oriented contracts derived from the same source records.

## Open Questions

- Should the bar-page contract include non-rendered fields now, or only when the UI starts using them?
- If preview is later approved, does it reuse the same contracts with a
  different visibility rule, or require separate preview-only helpers?
