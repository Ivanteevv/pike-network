# Project Context

Last updated: 2026-03-14

## Purpose

Local workspace for the new multi-bar website project.

This project is separate from the legacy single-bar `Pike` landing page.
The old project remains unchanged and serves only as a visual/content reference.

## Product Direction

- build a multi-bar platform, not a single landing page
- use Next.js as the frontend foundation
- keep the premium cinematic first-screen feel, including hero background video
- move editable content and production media out of the frontend repository
- support a CMS/admin panel for non-developer content updates

## Architecture Baseline

Working architecture assumptions for planning:

- Next.js
- Directus
- PostgreSQL
- S3-compatible object storage

## Current Canonical Docs

Use these as the current source of truth for this repository:

- [README.md](/Users/km/Documents/GitHub/pike-network/README.md) for onboarding and current repo reality
- [docs/architecture.md](/Users/km/Documents/GitHub/pike-network/docs/architecture.md) for current structure and target runtime boundaries
- [docs/content-contracts.md](/Users/km/Documents/GitHub/pike-network/docs/content-contracts.md) for internal frontend data contracts
- [docs/content-model.md](/Users/km/Documents/GitHub/pike-network/docs/content-model.md) for current field inventory and target CMS-oriented model
- [docs/content-flow.md](/Users/km/Documents/GitHub/pike-network/docs/content-flow.md) for current and target content movement
- [docs/roadmap.md](/Users/km/Documents/GitHub/pike-network/docs/roadmap.md) for sequencing and decision gates

## Historical Planning Inputs

These files are useful background, but they are not the current canonical source
of truth when they conflict with the docs above:

- [docs/multi-bar-project-prompt.md](/Users/km/Documents/GitHub/pike-network/docs/multi-bar-project-prompt.md)
- [docs/multi-bar-project-context.md](/Users/km/Documents/GitHub/pike-network/docs/multi-bar-project-context.md)

## Working Rules

- all new context for the multi-bar project belongs in this repository, not in `Pike`
- do not store bar photos/videos in `src/assets` as source of truth
- treat media as remote assets managed outside the repo
- preserve mobile hero video behavior where browser policy allows muted autoplay
