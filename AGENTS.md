# AGENTS.md

## Agent Role

Work as a senior frontend engineer in an existing Next.js App Router project.
Prefer small, scoped changes over broad rewrites.

## Runtime

- Use Node 20 from `.nvmrc`.
- Use `npm`. `package-lock.json` is committed.
- Main checks:
  - `npm run lint`
  - `npm run build`

## Branch Workflow

Do not work directly on `main` for feature, fix, UI, or documentation changes.

Create a separate branch for every distinct task:

- `feature/<short-description>` for new features
- `fix/<short-description>` for bug fixes
- `docs/<short-description>` for documentation-only changes
- `refactor/<short-description>` for refactoring without behavior changes

Examples:

- `fix/scroll-to-top`
- `docs/restructure-agent-context`
- `feature/welcome-page-selector`
- `refactor/content-adapter`

Keep each branch focused on one logical change.
Do not mix unrelated changes in the same branch.

Before starting implementation:

1. Check the current branch.
2. If currently on `main`, create a new task branch.
3. If already on a task branch, verify that the requested work belongs to that
   branch.
4. If the requested work is unrelated to the current branch, create a new branch
   from updated `main`.

Before commit:

- Run `git status`.
- Review changed files.
- Make sure the branch contains only changes related to the task.

After the user confirms the result:

- Commit the branch.
- Push the branch.
- Merge into `main` only after manual/user verification or explicit approval.

## Current Project Shape

- `/` is implemented in `src/app/page.js`.
- `/bars/[slug]` is implemented in `src/app/bars/[slug]/page.js`.
- Metadata, robots, and sitemap live in `src/app`.
- Reusable UI lives in `src/components`.
- Content access lives in `src/lib/content`.
- Current content source is `src/lib/content/mock-site-data.js`.
- `src/lib/content/get-site-data.js` is the intended adapter boundary.
- Temporary media lives in `public/mock` and is referenced by URL string paths.

## Architecture Boundary

Preserve `src/lib/content` as the content adapter boundary.
Routes and components should consume normalized frontend contracts, not raw CMS
fields or upstream storage records.

## Context Routing

Read only the docs relevant to the task:

- General repo onboarding: `README.md`
- Runtime/content architecture: `docs/architecture.md`
- Frontend data shape: `docs/content-contracts.md`
- CMS field planning: `docs/content-model.md`
- Current and target content movement: `docs/content-flow.md`
- CMS migration sequence: `docs/roadmap.md`
- Shared vocabulary: `docs/glossary.md`
- Media fixtures: `docs/mock-media.md`
- Welcome page product/design direction: `docs/features/welcome-page.md`
- Execution-ready task specs: `docs/task-specs/*`
- Architecture decisions: `docs/decisions/*`

Do not read `docs/archive/*` unless the task explicitly asks for historical
reasoning, old prompts, or prior research.

## Implementation Rules

- Do not introduce production editable media into `src`.
- Do not commit real production bar media into the frontend repo.
- Keep temporary frontend media in `public/mock`.
- Keep public copy in the content layer, not hardcoded inside JSX, when practical.
- Do not perform large refactors outside the requested task.
- Preserve scalability for more bars.
- Preserve route URLs unless the task explicitly changes routing.
- Do not implement CMS/admin integration unless the task explicitly asks for it.
- Ask only when a decision affects business logic, public contracts, routing, or
  data ownership.

## Validation

After code changes, run the most relevant check:

- `npm run lint`
- `npm run build`

For documentation-only changes, still run the checks above unless the task says
otherwise. If a check cannot run, explain why and describe the next best manual
verification.

## Final Response

Report:

1. What changed.
2. Which files changed.
3. Which checks ran and their result.
4. Remaining risks or manual checks.
