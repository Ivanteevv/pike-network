# Welcome Page

## Page Role

The welcome page is the network entry point for new guests. It should quickly
answer where the guest arrived, what kind of place Pike is, and which bar they
should choose next.

The page should feel like a warm bar entrance, not a technical index of a
multi-location platform.

## Primary User Scenario

1. A new guest opens the site.
2. They understand that Pike is a bar network for relaxed evenings, food,
   drinks, and watching sports with a company.
3. They move toward bar choice through the primary `Выбрать бар` path.
4. They open the relevant bar page or use secondary contact actions.

## Positioning

Pike is:

- a bar for relaxing after work;
- a place for friends and groups;
- a place where sports broadcasts are one of the main reasons to gather;
- warm, comfortable, slightly vintage, and not theatrical.

The welcome page should emphasize network atmosphere and bar choice. It should
not overstate differences between locations while the network is still growing.

## Content Structure

Current canonical structure:

1. Hero
   - clear brand name or logo;
   - atmospheric media or controlled brand scene;
   - concise line about food, drinks, sports, and relaxed evenings;
   - primary CTA: `Выбрать бар`;
   - secondary phone action.

2. Bar Selection
   - compact, scalable list of bars;
   - address and practical status when useful;
   - active preview on desktop when practical;
   - clear CTA to enter a selected bar page.

3. Secondary Support
   - phone;
   - map;
   - social links;
   - short network/about copy only when it improves orientation.

## Visual Direction

Mood:

- cinematic;
- warm;
- bar-like;
- grounded;
- comfortable;
- slightly vintage;
- editorial and premium through composition, typography, spacing, and restraint.

Do:

- use real-looking bar photos, video, or controlled brand objects as primary
  visual material;
- keep dark surfaces with warm highlights;
- use restrained copper, amber, or orange accents;
- make bar selection easy to scan;
- keep controls large enough on mobile;
- make desktop and mobile feel intentionally designed for their contexts.

Avoid:

- corporate SaaS-style landing page patterns;
- generic identical card grids as the main structure;
- overly glossy glassmorphism;
- decorative gradients as the main visual idea;
- purple-dominant or cold neon palettes;
- excessive vintage ornaments;
- interactions that feel noisy, gimmicky, or game-like.

## Typography Direction

- Body, addresses, metadata, and descriptions should stay highly readable.
- Large brand/title moments may use a Cyrillic-friendly display or serif face.
- Condensed sans typography may be used for utility labels when it supports
  hierarchy.
- Do not use negative letter spacing.
- Do not make all text decorative.

## Color And Surface Rules

- Keep a warm dark foundation.
- Use warm paper-like text colors.
- Use copper, amber, or orange accents sparingly for emphasis.
- Use deep green or amber only for status details when useful.
- Hero should be media-first or scene-first, not card-first.
- Functional panels may use subtle borders and soft shadow.
- Avoid nested cards.
- Use restrained radius for panels; reserve pill shapes for status labels and
  compact actions.

## Component Expectations

### Welcome Hero

- Make the brand instantly clear.
- Communicate the mood before requiring heavy reading.
- Provide one obvious primary action: `Выбрать бар`.
- Keep phone or reservation as secondary.
- Fit mobile without overlap.

### Bar Selection

- Help the guest choose the nearest or relevant bar.
- Scale beyond two bars without turning into a cluttered directory.
- On desktop, clearly separate bar list, active preview, and enter CTA when the
  design uses a preview model.
- On mobile, prefer a simpler list-oriented layout with reduced animation.

### Age Gate

- Keep legal age confirmation clear and short.
- Align typography and spacing with the welcome system.
- Keep the confirmation action obvious and preserve the exit path.

## Non-Goals

- No CMS implementation in welcome page redesign work.
- No app-wide redesign unless a task explicitly asks for it.
- No production media migration into the repo.
- No route URL changes.
- No public technical copy about architecture, CMS readiness, or SEO internals.
- No generic card-grid landing page as the main page structure.

## CMS Readiness Rules

- Public copy should live in the content layer when practical.
- Components should receive structured props and stay presentational.
- `mock-site-data.js` is a temporary local source that should resemble future
  CMS-backed data.
- Location status, CTA labels, hero copy, SEO copy, media references, and alt
  text should be data fields when they are guest-facing.
- Page code may format and compose data, but should not become the source of
  editorial truth.
- Reusable sections should tolerate future CMS states such as draft location,
  hidden location, missing media, missing menu link, and sort order.
