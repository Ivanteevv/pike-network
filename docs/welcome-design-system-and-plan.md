# Welcome Page Design System And Work Plan

## Page Role

Welcome page is the network entry point for a new guest.

The page should answer three questions quickly:

- where the guest arrived;
- what kind of place Pike is;
- which bar to choose next.

The page should feel like a warm bar entrance, not a technical index of a multi-location platform.

Primary user scenario:

1. A new guest opens the site.
2. They understand that Pike is a bar network for relaxed evenings, food, drinks, and watching sports with a company.
3. They scroll or jump to location choice.
4. They open the relevant bar page or call to reserve.

## Positioning

Pike is:

- a bar for relaxing after work;
- a place for friends and groups;
- a place where sports broadcasts are one of the main reasons to gather;
- warm, comfortable, slightly vintage, but not theatrical.

The welcome page should not emphasize differences between locations yet. The second location is still being built, so location cards should be neutral and practical.

## First Screen

Required first-screen elements:

- Pike logo or clear brand name;
- atmospheric hero media;
- direct jump to bar choice;
- phone action as booking/reservation;
- concise brand line.

Recommended hero message:

- title: `Бар "Щука"` or `Щука`;
- support line: about food, drinks, sports, and relaxed evenings;
- primary CTA: `Выбрать бар`;
- secondary CTA: `Позвонить`.

Avoid on the first screen:

- long architectural explanations;
- city-first positioning;
- heavy differences between locations;
- decorative UI that hides the next step.

## Content Structure

Minimum launch structure:

1. Hero
   - brand;
   - atmosphere;
   - two clear actions.

2. Location Choice
   - compact cards for available bars;
   - address;
   - status if needed, for example `Открыто` / `Скоро открытие`;
   - direct link to bar page;
   - phone action nearby.

Optional later sections:

- shared sports broadcast block;
- food and drinks preview;
- atmosphere/media band;
- social links;
- map block.

For the next refactor, keep only `Hero` and `Location Choice` as mandatory. Everything else should be added only if it improves the guest path.

## Visual Direction

Mood:

- cinematic;
- warm;
- bar-like;
- grounded;
- comfortable;
- slightly vintage.

Do:

- use real-looking bar photos/video as the main visual asset;
- keep dark surfaces with warm highlights;
- use restrained copper/orange accents;
- make location cards easy to scan;
- keep controls large enough on mobile.

Avoid:

- corporate SaaS-style cards;
- overly glossy glassmorphism;
- decorative gradients as the main visual;
- excessive vintage ornaments;
- making the page feel like a restaurant poster instead of a usable website.

## Typography

Current setup:

- body: `Manrope`;
- display: `Roboto Condensed`.

Recommended direction:

- keep `Manrope` for body text, addresses, small interface text, and descriptions;
- replace the main display face with a Cyrillic serif for large brand/title moments;
- keep a condensed sans only for small labels if needed.

Candidate display fonts:

- `Cormorant Garamond` for the main title: elegant, vintage, recognizable, but must be used carefully;
- `Literata` as a calmer alternative if Cormorant feels too theatrical;
- `Playfair Display` selected after visual comparison for a stronger signboard/poster character;
- keep `Roboto Condensed` only for utility labels/buttons if the contrast works.

Rules:

- hero title may use serif;
- section headings may use serif or restrained display scale;
- buttons and location-card metadata should stay highly readable;
- do not use negative letter spacing;
- do not make all text decorative.

## Color And Surfaces

Keep the current warm dark foundation, but reduce visual noise.

Core palette:

- near-black / dark brown background;
- warm paper text;
- muted paper secondary text;
- copper/orange accent;
- occasional deep green or amber only for status details.

Surface rules:

- hero should be media-first, not card-first;
- location cards may be dark panels with subtle border and soft shadow;
- avoid nested cards;
- use radius around `8-16px` for functional panels unless existing components require more;
- reserve pill radius for small status labels and actions.

## Components

### `WelcomeHero`

Purpose:

- make the brand instantly clear;
- communicate the bar mood;
- expose the two main actions.

Content:

- logo/name;
- short line about relaxing, food, drinks, and sports;
- `Выбрать бар`;
- `Позвонить`.

Behavior:

- primary CTA scrolls to locations;
- phone CTA uses `tel:`;
- mobile first screen must fit without overlap.

### `LocationChoice`

Purpose:

- help the guest choose the nearest or relevant bar.

Each location card:

- bar short label;
- address;
- availability/status;
- link to bar page;
- optional phone action.

Rules:

- do not over-describe differences between bars yet;
- keep scalable structure for future locations;
- card should be useful even with two locations.

### `AgeGate`

Purpose:

- legal age confirmation without making the site feel hostile.

Refactor direction:

- align typography with the new system;
- make text shorter and clearer;
- keep the primary action obvious;
- keep exit path;
- avoid a heavy modal that feels disconnected from the brand.

Recommended copy:

- brand: `Щука`;
- title: `Вам уже есть 18?`;
- description: `На сайте есть информация о баре, напитках и событиях. Подтвердите возраст, чтобы продолжить.`;
- primary: `Да, мне есть 18`;
- secondary: `Нет`.

## Content Model Changes

Update `mockSiteData.network` with guest-facing fields:

- hero eyebrow;
- hero title;
- hero tagline;
- hero actions;
- location choice title;
- location choice description;
- reservation copy;
- neutral location statuses.

Remove or stop rendering guest-facing technical copy about:

- platform architecture;
- CMS readiness;
- separate content entities;
- SEO implementation details.

Those ideas can stay in docs, not on the public welcome page.

## CMS Readiness Rule

The welcome refactor must prepare the project for a CMS-backed content source.

Rules:

- public copy should live in the content layer, not inside page JSX;
- components should receive structured props and stay presentational;
- `mock-site-data.js` is a temporary local adapter that should resemble future CMS data;
- location status, CTA labels, hero copy, SEO copy, media references, and alt text should be data fields;
- page code may format and compose data, but should not become the source of editorial truth;
- reusable content sections should tolerate future CMS states: draft location, hidden location, missing media, missing menu link, and sort order.

Future CMS mapping:

- `network` -> global site settings / brand settings;
- `network.hero` -> welcome hero content;
- `network.locationChoice` -> location selector copy and labels;
- `bars[]` -> bar collection;
- `bar.statusLabel` -> publish/opening status shown in cards;
- `bar.hero`, `bar.gallery`, `bar.menuLinks`, `bar.events` -> related content/media collections.

Implementation implication:

- when a label is visible to guests, prefer adding it to `mockSiteData` now instead of hardcoding it in the component;
- when a value controls rendering, prefer explicit fields such as `statusLabel`, `isPublished`, `sortOrder`, `href`, or `media.kind` instead of deriving meaning from text.

## Refactor Plan

### Phase 1: Design Tokens

- update font imports in `src/app/layout.js`;
- update display typography tokens in `src/app/theme.css`;
- tighten radius/surface usage where needed;
- keep existing body and color tokens unless a component forces change.

### Phase 2: Content

- rewrite `network.hero` copy for guests;
- add location-choice copy/status fields;
- remove technical homepage sections from rendering.

### Phase 3: Components

- create or reshape homepage sections:
  - `WelcomeHero`;
  - `LocationChoice` or updated `NetworkPointsSection`.
- keep `HeroMedia` as the media foundation.
- make cards neutral because location differences are not ready yet.

### Phase 4: Age Gate

- update age-gate copy;
- align its typography and spacing with the new welcome system;
- verify mobile modal layout and focus behavior.

### Phase 5: Verification

- run `npm run lint`;
- run `npm run build`;
- start `npm run dev`;
- check desktop and mobile viewport visually;
- verify:
  - age gate appears and closes;
  - hero is readable;
  - `Выбрать бар` scrolls to locations;
  - phone link is present;
  - location cards link to bar pages;
  - no text overlaps on mobile.

## Design Decisions

- final display font: `Playfair Display`;
- whether the hero title should show the SVG logo or text brand first;
- whether phone action should be visible as text or icon plus text on mobile;
- whether the second location needs a `Скоро открытие` status before launch.
