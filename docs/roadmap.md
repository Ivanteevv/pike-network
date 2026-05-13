# Roadmap

## Purpose

This roadmap describes the likely sequence for moving from the current mock-content frontend to a CMS-backed multi-bar site.

## Current State

- Frontend routes exist for the network page and bar pages.
- Content is hardcoded in `src/lib/content/mock-site-data.js`.
- Temporary mock media is stored in `public/mock`.
- No CMS workflow is implemented in this repository.

## Target State

- Bars and network content are editable outside the frontend repository.
- The frontend reads published content through a stable adapter.
- Adding or updating a bar does not require editing mock content in code.

## Phase Status Snapshot

- Phase 1: active
- Phase 2: planned
- Phase 3: active
- Phase 4: blocked pending decision gates
- Phase 5: future

## Decision Gates Before Phase 4

Phase 4 should not be treated as execution-ready until these decisions are
documented explicitly:

- CMS product and API shape
- published versus draft versus preview visibility rules
- slug governance, including whether slug redirects are required
- build/runtime failure behavior when required CMS configuration is missing or
  CMS content cannot be fetched

## Phases

### Phase 1: Documentation Baseline

Status:
active

Goal:
Create a documentation set that reflects current reality and reduces implementation ambiguity.

Outputs:

- updated `README.md`
- architecture, content, flow, glossary, and roadmap docs
- decision records
- execution-ready task specs

Exit criteria:

- a new developer can identify where routes, content, and media currently live within 10 minutes
- future work items can link to explicit docs instead of restating assumptions

### Phase 2: Frontend Content Contract

Status:
planned

Goal:
Make the current frontend depend on an explicit content contract instead of implicit object shape knowledge.

Outputs:

- documented page data contract
- adapter mapping layer behind `src/lib/content`
- graceful handling for missing optional sections

Exit criteria:

- all fields used by `src/app/page.js`, `src/app/bars/[slug]/page.js`, `src/app/sitemap.js`, and footer/nav components are documented and mapped
- routes no longer depend on raw CMS field names

### Phase 3: CMS Schema Definition

Status:
active

Goal:
Define the content schema required to support the existing frontend behavior and near-term editorial needs.

Outputs:

- bar schema
- network settings schema
- related entities for gallery items, menu links, events, and social links
- validation rules and required fields

Exit criteria:

- each currently rendered field has a defined upstream content field
- slug uniqueness, publish state, and media ownership rules are documented

### Phase 4: CMS Integration

Status:
blocked until the decision gates above are documented

Goal:
Replace repo-local mock content with CMS-backed data access.

Outputs:

- CMS client or fetch layer
- environment variable contract
- adapter mapping from CMS responses to frontend contract
- route generation from CMS-backed slugs

Exit criteria:

- `src/lib/content/get-site-data.js` no longer uses mock content in the runtime path
- the homepage, bar pages, and sitemap are generated from CMS-backed records
- a content edit can be reflected without editing repo-local mock data

### Phase 5: Editorial Hardening

Status:
future

Goal:
Make the content workflow safe for real editors.

Outputs:

- role definitions
- publish workflow
- media upload rules
- fallback handling for missing or unpublished content

Exit criteria:

- editors can update text and media without a code commit
- unpublished bars are handled according to a documented rule
- media replacement no longer depends on `public/mock`

## Risks

- The current route model may change if the product later requires subdomains or per-bar domains.
- CMS choice affects implementation detail, preview workflow, and deployment responsibilities.
- Existing UI currently stores some fields that are not yet rendered, which can create confusion during schema design unless explicitly tracked.

## Provisional Assumptions

- The first production integration will preserve the current single-domain route pattern.
- The first CMS release will favor structured fields over flexible page-builder content blocks.

## Open Questions

- Which CMS product will be selected?
- Is preview mode required in the first implementation milestone?
- Does the first launch need online booking, or is phone-plus-map sufficient?
