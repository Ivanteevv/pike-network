# Task Spec: Implement Content Adapter Boundary

## Goal

Make `src/lib/content/get-site-data.js` return normalized frontend contracts
instead of raw `mockSiteData`.

## Context

- The current source is still `src/lib/content/mock-site-data.js`.
- CMS integration is not part of this task.
- The content adapter boundary already lives in `src/lib/content/get-site-data.js`.
- Frontend contracts are defined in `docs/content-contracts.md`.

## Scope

- Update `src/lib/content/get-site-data.js`.
- Add mapper/helper functions if useful.
- Preserve existing public functions:
  - `getSiteData()`
  - `getBars()`
  - `getBarBySlug(slug)`
- Preserve current page behavior.

## Success Criteria

- `getSiteData()` returns only the documented `NetworkSiteData` shape.
- `getBars()` returns only `BarSummary[]`.
- `getBarBySlug(slug)` returns normalized `BarPageData` or `null`.
- Collection fields return arrays, not `null`.
- Non-applicable media URL fields return `null`.
- Routes do not depend on hidden extra fields from the mock source.
- Homepage, bar pages, static params, sitemap, metadata, and JSON-LD keep
  working.
- `npm run lint` and `npm run build` pass.

## Constraints

- Do not integrate CMS.
- Do not change route URLs.
- Do not move media files.
- Do not perform unrelated UI redesign.
- Do not change public component APIs unless required by the contract.

## Validation

Run:

- `npm run lint`
- `npm run build`

## Final Response

Report:

1. What changed.
2. Which files changed.
3. Which checks ran and their result.
4. Any fields intentionally dropped from returned contracts.
5. Remaining risks or manual checks.
