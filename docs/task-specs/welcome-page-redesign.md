# Task Spec: Welcome Page Redesign

## Goal

Redesign the network welcome page as a premium brand gateway that guides users
to choose a bar.

## Scope

- Update the homepage experience.
- Main route: `src/app/page.js`
- Styling: `src/app/page.module.css`
- Content source: `src/lib/content/mock-site-data.js`
- Read helpers: `src/lib/content/get-site-data.js`
- Reuse existing components where practical.
- Keep content CMS-ready through the content layer where practical.

## Relevant Docs

- `docs/features/welcome-page.md`
- `docs/content-contracts.md`
- `docs/mock-media.md`
- `docs/architecture.md`

## Success Criteria

- Hero has one obvious primary action: `Выбрать бар`.
- The page communicates brand atmosphere before heavy reading.
- Bar selection does not become a generic identical card grid.
- Desktop clearly separates bar list, active preview, and enter CTA when using a
  preview model.
- Mobile uses a simpler intentional layout.
- Phone, map, and social links stay secondary.
- Public copy comes from the content layer where practical.
- The page remains scalable if more bars are added later.
- `npm run lint` and `npm run build` pass.

## Constraints

- Do not integrate CMS in this task.
- Do not move production media into the repo.
- Do not perform large unrelated refactors.
- Do not change route URLs.
- Do not make the page look like a SaaS/startup template.
- Do not make utility links compete with the bar-selection flow.

## Non-Goals

- No CMS implementation.
- No app-wide redesign.
- No production media migration.
- No generic card-grid landing page as the main structure.
- No long research or prompt exploration inside implementation docs.

## Validation

Run:

- `npm run lint`
- `npm run build`

Manual checks:

- Age gate appears and closes.
- `Выбрать бар` leads to the bar-selection area.
- Bar links open the expected `/bars/[slug]` pages.
- Phone links use `tel:`.
- Mobile layout has no text overlap or clipped controls.

## Final Response

Report:

1. What changed.
2. Which files changed.
3. Which checks ran.
4. Remaining risks or manual checks.
