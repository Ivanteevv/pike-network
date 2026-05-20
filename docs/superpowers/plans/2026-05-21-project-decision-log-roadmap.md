# Project Decision Log Roadmap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a durable project memory system that records what changed, why decisions were made, and what each decision caused, so the project can be reviewed as a roadmap and retrospective later.

**Architecture:** Keep short factual commit summaries in `docs/commit-history.md`, architecture-level decisions in `docs/decisions`, and feature/process notes in a new `docs/project-log` folder. Each feature should leave one human-readable record that connects decisions, implementation outcome, verification, and follow-up risks.

**Tech Stack:** Markdown documentation, existing `docs` folder, git commit hashes, ADR-style records, existing `docs/superpowers/plans` workflow.

---

### Task 1: Create A Project Log Folder

**Files:**
- Create: `docs/project-log/README.md`
- Create: `docs/project-log/feature-log.md`
- Create: `docs/project-log/retro-index.md`

- [ ] **Step 1: Create the folder and README**

Create `docs/project-log/README.md`:

```markdown
# Project Log

This folder stores project memory that is useful for roadmap review and retrospective work.

Use these files for different levels of detail:

- `feature-log.md`: user-visible features, implementation decisions, verification, and consequences
- `retro-index.md`: recurring patterns, tradeoffs, open questions, and follow-up themes
- `../commit-history.md`: concise commit-level summaries
- `../decisions`: architecture decision records that should remain stable over time

Rules:

- Write entries in plain language.
- Link to commits when a commit exists.
- Record the decision and the consequence, not only the final code shape.
- Keep runtime content and editorial content out of this folder.
```

- [ ] **Step 2: Create the feature log template**

Create `docs/project-log/feature-log.md`:

```markdown
# Feature Log

## Entry Format

### YYYY-MM-DD - Feature name

- Branch:
- Commit:
- User goal:
- What changed:
- Key decisions:
- What worked:
- What changed after review:
- Verification:
- Follow-up:

## Entries
```

- [ ] **Step 3: Create the retrospective index**

Create `docs/project-log/retro-index.md`:

```markdown
# Retrospective Index

## Purpose

This file collects patterns that appear across feature work.

## Themes

### UX decisions

### Mobile behavior

### Content architecture

### Media handling

### Verification gaps

### Follow-up candidates
```

### Task 2: Seed The Log With The Menu PDF Viewer Work

**Files:**
- Modify: `docs/project-log/feature-log.md`
- Modify: `docs/project-log/retro-index.md`

- [ ] **Step 1: Add the feature entry**

Append this entry under `## Entries` in `docs/project-log/feature-log.md`:

```markdown
### 2026-05-21 - Menu PDF lightbox viewer

- Branch: `feature/menu-pdf-viewer`
- Commit: `12ae97f`
- User goal: Show bar and kitchen PDF menus from the bar page without exposing browser PDF iframe controls in the main UI.
- What changed:
  - Added `MenuPdfViewer` as the client component for menu previews.
  - Added mock PDF files and image previews under `public/mock/menus`.
  - Extended the menu content contract with `fileType` and `previewImages`.
  - Replaced menu cards on the bar page with direct PDF menu buttons.
  - Added shared scroll locking through `src/lib/client-scroll-lock.js`.
- Key decisions:
  - Keep PDF files as direct open/download links.
  - Use image previews for in-page viewing.
  - Use a desktop lightbox with restrained motion.
  - Use a classic fullscreen mobile viewer for iOS and Android.
  - Do not merge `public/Refference` source PDFs into runtime.
- What worked:
  - Lint and build passed.
  - Production anchor-scroll QA passed on iPhone-sized and desktop viewports.
- What changed after review:
  - The first mobile visual direction was rejected as too custom and card-like.
  - Mobile was simplified to a classic fullscreen black viewer.
  - Scrollbar compensation was added to reduce page jumps when overlays open and close.
- Verification:
  - `npm run lint`
  - `npm run build`
  - Browser QA on `https://pike-network-nine.vercel.app/`
- Follow-up:
  - Replace mock menu media with CMS-managed files when CMS integration starts.
  - Decide whether menu preview images are generated automatically or uploaded by editors.
```

- [ ] **Step 2: Add retrospective themes**

Append these notes to `docs/project-log/retro-index.md`:

```markdown
### UX decisions

- Menu PDF viewer: desktop can use restrained custom motion, but mobile should prefer native-feeling fullscreen behavior.

### Mobile behavior

- iOS and Android menu viewing should avoid nested cards, heavy blur, and small framed previews.
- Mobile scroll-link QA should include at least one iPhone-sized viewport before shipping.

### Content architecture

- Menu PDFs need both a file URL and preview image URLs in the frontend contract.

### Media handling

- Runtime mock media belongs in `public/mock`.
- Reference/source files should stay outside shipped runtime paths unless explicitly needed.

### Verification gaps

- Age-gate exit timing can affect first-click scroll tests; verify anchor links after the age gate is fully closed.
```

### Task 3: Update The Working Routine

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/commit-history.md`

- [ ] **Step 1: Add a documentation reminder to `AGENTS.md`**

Add this rule near the validation or final response section:

```markdown
## Project Memory

For meaningful feature, UI, architecture, or workflow decisions, update the project memory docs before finishing:

- `docs/commit-history.md` for concise commit-level summaries
- `docs/project-log/feature-log.md` for feature decisions and consequences
- `docs/decisions/*` for durable architecture decisions

The entry should mention what changed, why the decision was made, what review feedback changed, and what remains as follow-up.
```

- [ ] **Step 2: Keep commit history as the short index**

When a meaningful commit lands, add one entry to `docs/commit-history.md` with:

```markdown
### `<hash>` - `<title>`
- Date: `YYYY-MM-DD`
- Branch: `<branch>`
- Summary:
- Why:
- Decisions:
- Verification:
- Files:
```

### Task 4: Verify Documentation

**Files:**
- Verify: `docs/project-log/README.md`
- Verify: `docs/project-log/feature-log.md`
- Verify: `docs/project-log/retro-index.md`
- Verify: `docs/commit-history.md`
- Verify: `AGENTS.md`

- [ ] **Step 1: Run documentation search**

Run:

```bash
rg -n "Menu PDF|Project Log|Project Memory|12ae97f|feature-log|retro-index" docs AGENTS.md
```

Expected: the new workflow and seeded menu PDF entry are discoverable.

- [ ] **Step 2: Run project checks**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit with code `0`.

### Self-Review

- Spec coverage: This plan defines where decision logs live, how commit summaries connect to feature records, and how the menu PDF viewer work should be seeded for future retrospective review.
- Placeholder scan: No placeholder-only tasks remain; each file has exact content or exact commands.
- Type consistency: The plan consistently uses `docs/project-log`, `docs/commit-history.md`, `docs/decisions`, and `AGENTS.md` as the documentation surfaces.
