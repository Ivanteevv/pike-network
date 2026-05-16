# Welcome Hero Overlay Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make a full-screen dark bar-selection page layer rise over the video hero during the first scroll while preserving native browser scrolling.

**Architecture:** Keep the effect CSS-first. Wrap the hero and the following selection screen in one overlay scene, make the hero sticky as the lower layer, and let a full-width `#bars` screen overlap it in normal document flow. Do not render a separate Welcome page footer; use reduced-motion media queries and mobile-specific spacing to keep the effect practical.

**Tech Stack:** Next.js App Router, React server component page, CSS Modules, native CSS sticky positioning.

---

### Task 1: Add The Overlay Scene Structure

**Files:**
- Modify: `src/app/page.js`

- [x] **Step 1: Introduce a scene wrapper**

Wrap the existing `HeroMedia` and `main` elements in a `div` using `styles.heroOverlayScene`.

- [x] **Step 2: Add a hero layering class**

Pass `className={styles.overlayHero}` to the existing `HeroMedia` so homepage-specific sticky behavior stays in `page.module.css`.

- [x] **Step 3: Keep anchors and content unchanged**

Keep `MagneticSelectBarButton href="#bars"` and `NetworkPointsSection` unchanged.

- [x] **Step 4: Remove the Welcome page footer**

Remove `SiteFooter` from `src/app/page.js` so the Welcome page ends at the focused bar-selection screen.

### Task 2: Style The Overlay Scroll

**Files:**
- Modify: `src/app/page.module.css`

- [x] **Step 1: Define the overlay scene**

Add a positioned scene wrapper with a warm dark background and isolated stacking context.

- [x] **Step 2: Make the hero sticky**

Add `.overlayHero { position: sticky; top: 0; z-index: 0; }` and remove only homepage-specific bottom border visual conflict if needed.

- [x] **Step 3: Keep the incoming content in normal flow**

Update `.overlayContent` so it sits above the sticky hero with `z-index`, but do not use a negative top margin. The second screen should begin below the hero and naturally rise from the bottom as the user scrolls.

- [x] **Step 4: Turn the selection section into a full screen**

Update `.section` with full-width dark background, `min-height: 100svh`, and responsive padding. Constrain only `.sectionFrame`, not the whole section.

- [x] **Step 5: Replace the hard background band**

Use a continuous dark base with subtle CSS scratch/grain overlays instead of a visible horizontal gradient break or external stock texture.

- [x] **Step 6: Tune mobile**

Use a more opaque section surface and top-aligned content for readability.

- [x] **Step 7: Add reduced-motion fallback**

In `prefers-reduced-motion: reduce`, remove the overlap and sticky layering so the page becomes simple stacked sections.

### Task 3: Verify

**Files:**
- Check: `src/app/page.js`
- Check: `src/app/page.module.css`
- Check: `docs/task-specs/welcome-hero-overlay-scroll.md`

- [ ] **Step 1: Run lint**

Run: `PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run lint`

- [ ] **Step 2: Run build**

Run: `PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run build`

- [ ] **Step 3: Review diff**

Run: `git diff -- src/app/page.js src/app/page.module.css docs/task-specs/welcome-hero-overlay-scroll.md docs/superpowers/plans/2026-05-17-welcome-hero-overlay-scroll.md`
