# Multi-Bar Project Context

## Status

Historical planning input from early project discovery.

When this file conflicts with [README.md](/Users/km/Documents/GitHub/pike-network/README.md),
[PROJECT_CONTEXT.md](/Users/km/Documents/GitHub/pike-network/PROJECT_CONTEXT.md),
or the current docs under `docs/`, the current repo docs win.

## Purpose

This document defines the target architecture and working assumptions for the next-generation version of the bar website.

The current project is a single-bar landing page.
The next project should be a multi-bar platform with a shared entry page and individual pages for each bar.

## Core Product Direction

Keep:

- cinematic visual tone
- premium first-screen presentation
- hero background video as a signature UI pattern

Change:

- move from one hardcoded bar page to a multi-entity platform
- add a root page for the entire network
- add a real admin/CMS layer
- model bars as content entities instead of static config only
- move media and editable content out of the frontend repository

## User-Facing Structure

### Root Page

Purpose:
- present the brand or network
- let users choose a specific bar

Suggested sections:
- hero
- brand intro
- network bar cards
- shared benefits
- shared broadcasts/events block
- footer

### Bar Page

Route pattern:
- `/bars/[slug]`

Purpose:
- showcase one exact bar
- provide all local content and conversion actions

Suggested sections:
- hero
- gallery
- menu
- broadcasts/events
- socials
- contacts
- map
- booking CTA

## Recommended Technical Baseline

### Recommended Option

Frontend:
- Next.js

CMS/Admin:
- Directus

Database:
- PostgreSQL

Media storage:
- S3-compatible object storage or a dedicated media platform

Deploy:
- frontend and CMS as separate deployable services

Why:
- easier SEO and route handling than extending the current static Vite landing
- bars can be modeled as relational content
- content editors get a real admin interface
- easier long-term scaling than storing all content in local config
- photos and videos stop bloating the code repository

## Media Architecture Rule

For the new project:

- bar photos and videos must not be stored in `src/assets`
- content editors must not need a Git commit to replace media
- repository-local media should be limited to tiny design/system assets only

Correct separation of concerns:

- Next.js: presentation layer, routing, SEO rendering, BFF endpoints where needed
- CMS: content source of truth
- object storage / media provider: binary file storage
- database: structured content and media metadata

## Is Next.js Enough As The Backend?

Next.js is a good frontend + BFF layer, but it should not be treated as the long-term storage backend for photos/videos.

Recommended role for Next.js:

- fetch content from CMS
- render pages
- generate metadata
- optionally issue signed upload URLs or proxy selected admin actions

Not recommended as the primary content/media backend for this project:

- storing uploaded files on local disk
- using the repository as a media source of truth
- handling all editorial content directly in source files

## CMS Options

### 1. Directus

Recommended default for this project.

Best fit when:
- content is structured
- bars share the same schema
- media, roles, and permissions matter
- frontend and admin should be clearly separated

Strengths:
- relational data model
- built-in admin studio
- granular permissions
- self-host friendly
- clean API-first workflow
- can be configured to store files outside the frontend project

Tradeoff:
- slightly more “backend product” than WordPress

### 2. WordPress

Best fit when:
- content team already knows WordPress
- editorial familiarity matters more than strict data architecture
- launch speed is prioritized

Suggested implementation:
- custom post type `bar`
- custom fields for bar metadata
- either:
  - classic WP frontend
  - or headless WordPress frontend

Media rule with WordPress:
- still use external object/media storage, not frontend repo assets

Tradeoff:
- content model often becomes plugin-heavy
- weaker long-term structure for a network-style product

### 3. Strapi

Best fit when:
- custom backend logic will expand
- the team wants a Node-first headless CMS
- developers are comfortable maintaining a backend app

Tradeoff:
- usually heavier operationally than Directus for simple editorial needs

## Recommended Content Model

### Global Settings

- brand name
- default SEO
- shared footer content
- shared navigation
- shared legal / policy links

### Bar

- slug
- name
- city
- district
- short description
- hero title
- hero subtitle
- hero video
- hero poster
- logo
- gallery
- menus
- socials
- address
- map data
- geo coordinates
- opening hours
- phone
- booking CTA
- SEO title
- SEO description
- OG image
- publish state
- sort order
- remote media references

### Supporting Collections

- menu links
- gallery items
- social links
- events or broadcasts

## Frontend Rules

- mobile layout must remain stable
- muted inline hero video should be preserved on mobile where browser policy allows it
- fallback image only for reduced motion or failed media situations
- avoid hardcoding venue content in frontend code
- fetch content by slug for bar pages
- treat hero video, gallery, and posters as remote media

## SEO Rules

- root page targets broad brand/network intent
- each bar page targets local intent
- each bar page needs unique metadata
- each bar page should emit local business schema with its own address, phone, geo, hours
- sitemap must include root page and all bar pages

## Operational Rules

- content should be editable without redeploying the frontend for every text/image change
- adding a new bar should ideally be a CMS action plus publish step, not a code release
- media uploads should preserve alt text fields
- permissions should separate admins from editors
- storage costs and CDN strategy should be considered separately from frontend hosting

## Current Recommendation

If starting now, use:

- Next.js + Directus + PostgreSQL + S3-compatible object storage

Fallback choice if editorial familiarity is the top priority:

- WordPress with custom post types, custom fields, and external media storage

## Open Questions

These still need a business decision:

- single domain with `/bars/[slug]` or subdomains per bar
- one shared menu system or fully separate menu entities
- online booking integration or simple CTA/phone
- whether events/broadcasts are global or bar-specific
- whether the admin should be self-hosted or fully managed
- which exact object storage/media provider to use
