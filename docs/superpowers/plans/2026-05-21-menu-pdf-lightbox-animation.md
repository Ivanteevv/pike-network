# Menu PDF Lightbox Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained open/close animation to the bar menu lightbox without reintroducing PDF iframe UI or breaking scroll unlock behavior.

**Architecture:** Keep the existing `MenuPdfViewer` as the single client component for menu preview. Add a short closing state so the dialog can play an exit transition before `dialog.close()`, while scroll locking remains controlled by the existing shared `client-scroll-lock` utility. Use CSS classes/data attributes for motion and keep the image viewer model: preview images for in-page viewing, PDF href for opening/downloading.

**Tech Stack:** Next.js App Router, React client component state, CSS Modules, native `<dialog>`, shared `lockPageScroll`/`unlockPageScroll`.

---

### Task 1: Add Open And Close Motion State

**Files:**
- Modify: `src/components/menu-pdf-viewer.js`
- Modify: `src/components/menu-pdf-viewer.module.css`

- [ ] **Step 1: Add an animation state to the component**

In `src/components/menu-pdf-viewer.js`, add a duration constant and `isClosing` state near the existing imports/state:

```js
const LIGHTBOX_EXIT_MS = 180;
```

Inside `MenuPdfViewer`:

```js
const [isClosing, setIsClosing] = useState(false);
const closeTimeoutRef = useRef(null);
```

- [ ] **Step 2: Clear pending close timeout on unmount**

Add this effect after the existing `activeMenu` declaration:

```js
useEffect(() => {
  return () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
  };
}, []);
```

- [ ] **Step 3: Keep the existing dialog open flow, but reset closing on open**

Update `openMenu(index)`:

```js
function openMenu(index) {
  if (closeTimeoutRef.current) {
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }

  setActiveIndex(index);
  setIsClosing(false);
  setIsOpen(true);
}
```

- [ ] **Step 4: Change closeMenu to play exit animation before closing dialog**

Replace `closeMenu()` with:

```js
function closeMenu() {
  if (isClosing) {
    return;
  }

  setIsClosing(true);

  closeTimeoutRef.current = window.setTimeout(() => {
    closeTimeoutRef.current = null;
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }

    setIsOpen(false);
    setIsClosing(false);
  }, LIGHTBOX_EXIT_MS);
}
```

- [ ] **Step 5: Ensure native dialog close still resets state**

Keep the existing `onClose`, but make it clear all close flags:

```js
onClose={() => {
  setIsOpen(false);
  setIsClosing(false);
}}
```

- [ ] **Step 6: Expose motion state to CSS**

Add a data attribute to the `<dialog>`:

```jsx
<dialog
  ref={dialogRef}
  className={styles.dialog}
  data-state={isClosing ? "closing" : "open"}
  ...
>
```

### Task 2: Implement Reference-Style Lightbox Motion

**Files:**
- Modify: `src/components/menu-pdf-viewer.module.css`

- [ ] **Step 1: Add CSS custom properties for timing**

Near `.dialog`, add:

```css
.dialog {
  --menu-lightbox-enter-duration: 220ms;
  --menu-lightbox-exit-duration: 180ms;
}
```

Keep the existing `.dialog` declarations together with those variables.

- [ ] **Step 2: Animate the backdrop through the native dialog backdrop**

Update `.dialog::backdrop`:

```css
.dialog::backdrop {
  background: rgba(0, 0, 0, 0.66);
  backdrop-filter: blur(14px);
  animation: menuBackdropIn var(--menu-lightbox-enter-duration)
    var(--ease-standard) both;
}

.dialog[data-state="closing"]::backdrop {
  animation: menuBackdropOut var(--menu-lightbox-exit-duration)
    var(--ease-standard) both;
}
```

Add keyframes:

```css
@keyframes menuBackdropIn {
  from {
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0);
  }

  to {
    background: rgba(0, 0, 0, 0.66);
    backdrop-filter: blur(14px);
  }
}

@keyframes menuBackdropOut {
  from {
    background: rgba(0, 0, 0, 0.66);
    backdrop-filter: blur(14px);
  }

  to {
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0);
  }
}
```

- [ ] **Step 3: Animate the menu page as an image, not a panel**

Update `.viewerStage` to include the entry animation:

```css
.viewerStage {
  animation: menuImageIn var(--menu-lightbox-enter-duration)
    var(--ease-standard) both;
}

.dialog[data-state="closing"] .viewerStage {
  animation: menuImageOut var(--menu-lightbox-exit-duration)
    var(--ease-standard) both;
}
```

Add keyframes:

```css
@keyframes menuImageIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes menuImageOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }

  to {
    opacity: 0;
    transform: translateX(-50%) translateY(6px) scale(0.99);
  }
}
```

- [ ] **Step 4: Keep hover scale compatible with animation**

Update the hover rule so it does not fight the entrance transform:

```css
@media (hover: hover) and (pointer: fine) {
  .dialog[data-state="open"] .viewerStage:hover {
    transform: translateX(-50%) scale(1.018);
  }
}
```

Remove any older `.viewerStage:hover` rule that is not scoped by `data-state="open"`.

- [ ] **Step 5: Animate the close button and PDF link lightly**

Add:

```css
.closeButton,
.pdfLink {
  animation: menuChromeIn var(--menu-lightbox-enter-duration)
    var(--ease-standard) both;
}

.dialog[data-state="closing"] .closeButton,
.dialog[data-state="closing"] .pdfLink {
  animation: menuChromeOut var(--menu-lightbox-exit-duration)
    var(--ease-standard) both;
}

@keyframes menuChromeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes menuChromeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
```

- [ ] **Step 6: Respect reduced motion**

Replace the current `prefers-reduced-motion` block with:

```css
@media (prefers-reduced-motion: reduce) {
  .menuLink::after,
  .viewerStage,
  .menuImage,
  .closeButton,
  .pdfLink,
  .dialog::backdrop {
    animation: none;
    transition: none;
  }

  .dialog[data-state="open"] .viewerStage:hover,
  .viewerStage:hover {
    transform: translateX(-50%);
  }
}
```

### Task 3: Verify Scroll Lock And Build

**Files:**
- Verify: `src/components/menu-pdf-viewer.js`
- Verify: `src/lib/client-scroll-lock.js`

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code `0`, no ESLint errors.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: exit code `0`, Next.js build completes successfully.

- [ ] **Step 3: Manual browser checks requested from user**

Do not start a dev server or browser session unless the user explicitly asks in the current task. Ask the user to manually check these flows:

```txt
1. Open bar page.
2. Open "Барная карта".
3. Close with red cross.
4. Reopen "Барная карта".
5. Close by clicking outside the image.
6. Confirm page scroll works.
7. Reopen "Меню кухни".
8. Press Escape.
9. Confirm page scroll works.
10. Confirm reduced motion manually if OS/browser setting is available.
```

Expected: lightbox animates in/out, PDF preview remains clean image-only, and page scroll is restored after every close path.

### Self-Review

- Spec coverage: The plan covers open animation, close animation, backdrop blur, image reveal, hover compatibility, reduced motion, and scroll-lock verification.
- Placeholder scan: No `TODO`, `TBD`, or open-ended "fill in" instructions remain.
- Type consistency: The plan uses the existing `MenuPdfViewer`, `isOpen`, `dialogRef`, `viewerStage`, `closeButton`, `pdfLink`, and shared `client-scroll-lock` names consistently.
