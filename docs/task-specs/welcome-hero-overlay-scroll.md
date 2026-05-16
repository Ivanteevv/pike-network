# Task Spec: Welcome Hero Overlay Scroll

## Goal

Turn the first homepage scroll transition into a controlled-feeling full-screen
overlay: the complete bar-selection screen should rise over the video hero
instead of the page immediately moving into a normal below-the-fold section.

## Context

- The homepage is implemented in `src/app/page.js`.
- The welcome hero uses `HeroMedia` with the `immersive` variant.
- The bar-selection section starts at `#bars` inside `src/app/page.js`.
- Welcome page product direction lives in `docs/features/welcome-page.md`.
- The primary guest task remains choosing a bar, not watching an animation.

## UX Decision

Implement the effect as progressive enhancement on top of normal browser
scrolling. Do not hijack the user's scroll input, block native scrolling, or
replace the page with slide-style navigation.

The preferred interaction is:

1. The guest lands on the video hero.
2. On the first downward scroll, the complete dark bar-selection screen rises
   from the bottom over the hero.
3. The guest can stop partway through the transition because progress is tied to
   normal scroll position.
4. During the transition, the hero video is visible only around the incoming
   screen edge and behind any still-uncovered viewport area.
5. Once the bar-selection screen is in place, it reads as a full standalone dark
   screen, not as a floating card or partial panel.
6. The Welcome page does not render a separate footer after the bar-selection
   screen; contact actions stay in the hero and bar cards.
7. After the overlay transition completes, the bar-selection screen is the final
   primary destination for the page.

## Recommended Approach

Use a sticky hero and a normal document-flow content layer that visually
overlaps the hero during the first scroll range.

- Keep the hero as the lower visual layer for the transition range.
- Keep the hero layout itself intact as a full first viewport.
- Let the `#bars` section remain reachable by normal anchors and keyboard
  navigation.
- Make the incoming layer full-width and at least one viewport tall.
- Constrain only the inner selection content, not the entire incoming screen.
- Do not render `SiteFooter` on the Welcome page for this interaction.
- Use a subtle dark textured background for the selection screen; avoid visible
  horizontal banding or stock-like decorative imagery.
- Animate only compositor-friendly properties such as `transform` and `opacity`.
- Avoid animating layout-heavy properties such as `height`, `top`, `margin`, or
  grid dimensions during scroll.
- Prefer CSS `position: sticky`, stacking context, and transform-based motion.
- Use JavaScript only if CSS alone cannot provide the required fallback or
  browser support; if JavaScript is needed, keep it small and passive.

## Desktop Behavior

- Use the full overlay effect.
- The hero should feel held in place while the bar-selection surface rises.
- The incoming screen should be a full dark section, not a centered rounded card.
- By the time the bar cards and CTAs are visible, the section background should
  be opaque enough for comfortable reading.
- The `Выбрать бар` CTA should still target `#bars` and land the user at a useful
  point in the overlay/selection experience.

## Mobile Behavior

- Keep the same conceptual transition, but make it shorter and lighter.
- Preserve native touch scrolling without custom gesture handling.
- Favor a dense, opaque section background so text and CTAs stay readable on
  small screens.
- Avoid continuous JavaScript scroll calculations on low-end devices.
- Ensure bar cards and phone links remain easy to tap and do not require precise
  timing in the transition.

## Accessibility And Motion

- Respect `prefers-reduced-motion: reduce`.
- In reduced-motion mode, disable decorative overlay motion and allow the hero
  and bar-selection section to behave like normal stacked sections.
- Preserve keyboard navigation, scrollbar behavior, page search, and anchor
  navigation.
- Avoid scrolljacking, scroll snapping that traps progress, and custom scroll
  containers for the main page.
- Do not rely on motion to communicate required information.

## Performance Constraints

- Keep the implementation CSS-first where practical.
- Animate `transform` and `opacity` only.
- Use `will-change` sparingly and only for elements that actually animate during
  the transition.
- Do not introduce a heavy animation library for this effect.
- Do not add runtime visual checks or browser automation unless the user asks for
  them in the implementation task.

## Scope

- Update the homepage section structure only if needed for layering.
- Likely files:
  - `src/app/page.js`
  - `src/app/page.module.css`
  - `src/components/hero-media.js` only if the hero needs a small presentational
    hook for sticky/overlay behavior.
  - `src/components/hero-media.module.css` only if the existing hero component
    needs variant-specific support.
- Keep content in the existing content layer. This task should not add new
  public copy unless a small accessibility label or internal hook is required.

## Non-Goals

- No CMS implementation.
- No route URL changes.
- No production media migration.
- No floating card treatment for the whole bar-selection screen.
- No redesign of the bar cards beyond what is necessary for readability inside
  the full-screen overlay transition.
- No global scroll framework.
- No custom scroll physics.
- No separate footer section below the Welcome page bar-selection screen.

## Success Criteria

- First scroll from the hero feels like a complete dark bar-selection screen is
  layering over the video hero.
- The hero remains a full first viewport and is not visually compressed by the
  incoming layer at rest.
- The interaction remains controllable through native scrolling.
- Desktop gets the full overlay impression.
- Mobile keeps the effect lighter and remains usable on weak devices.
- Reduced-motion users get a simple stacked-section fallback.
- `#bars` anchor navigation remains useful.
- The bar-selection screen is not presented as a centered floating plaque.
- There is no extra footer section below the Welcome page selection screen.
- The selection background reads as one continuous dark material with only subtle
  grain or scratch detail.
- Text and CTAs in the bar-selection section remain readable when the user is
  expected to interact.
- `npm run lint` and `npm run build` pass.

## Validation

Run:

- `npm run lint`
- `npm run build`

Manual checks:

- Scroll down from the hero on desktop and confirm a full dark bar-selection
  screen overlays the hero rather than a centered card.
- Stop midway through the first scroll and confirm the page remains stable and
  readable.
- Click `Выбрать бар` and confirm the user lands at the bar-selection experience.
- Navigate with keyboard and confirm focus order remains logical.
- Test mobile manually on a weak or throttled device when available.
- Enable reduced motion and confirm the decorative transition is removed.

## Research Notes

- Modern scroll-driven effects should preserve native scrolling and user control.
- CSS scroll-driven animation support is improving, but the effect should not
  require unsupported features to remain usable.
- Accessibility guidance warns against scrolljacking and parallax-like motion
  that changes expected scroll behavior.
- Performance guidance favors `transform` and `opacity` animations over layout
  and paint-triggering properties.
