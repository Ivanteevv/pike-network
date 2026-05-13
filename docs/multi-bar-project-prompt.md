# Multi-Bar Project Prompt

## Status

Historical planning input from early project discovery.

When this file conflicts with [README.md](/Users/km/Documents/GitHub/pike-network/README.md),
[PROJECT_CONTEXT.md](/Users/km/Documents/GitHub/pike-network/PROJECT_CONTEXT.md),
or the current docs under `docs/`, the current repo docs win.

## Goal

Design and build a production-ready multi-location bar website with:

- a main landing page for the whole bar network
- separate pages for each bar
- a CMS/admin panel for content editing
- strong SEO for the network and each bar page
- a premium visual style inspired by the current project, especially the hero background video
- externalized content and media storage outside the frontend repository

The current single-bar site is a visual reference, not a final architecture reference.
Preserve the cinematic feel of the first screen with autoplay background video where appropriate.
Do not store production photos, videos, or editable content inside the frontend codebase.

## Product Requirements

Build a website for a network of bars, not for a single venue.

Core behavior:

- the root page presents the bar network and lets users open the page of any specific bar
- each bar has its own dedicated page with unique content
- each bar page can have:
  - own title and subtitle
  - own hero video or hero image
  - own gallery
  - own menu links
  - own contacts
  - own map
  - own social links
  - own booking CTA
  - own SEO metadata
- a CMS/admin panel must allow non-developers to edit content without touching code

## Recommended Architecture

Preferred baseline:

- frontend: Next.js
- content/admin: Directus
- media: S3-compatible object storage or media CDN, connected to CMS
- deploy:
  - frontend on Vercel or Timeweb-compatible Node hosting
  - Directus on VPS / Docker / managed hosting
  - DB: PostgreSQL

Why this baseline:

- dynamic routes for bars are natural in Next.js
- strong SEO support for root page and per-bar pages
- structured content model is cleaner than a page-builder-first approach
- Directus gives a ready admin UI, relational content model, media handling, and granular permissions
- media can live outside the repo and outside the frontend runtime filesystem

## Non-Negotiable Storage Rule

Do not keep editable production media inside:

- `src/assets`
- the frontend repository
- the deployed frontend container filesystem as a source of truth

Use this split:

- frontend repo: code, UI components, small design-only static assets
- CMS/database: structured content and metadata
- object storage / media service: photos, videos, menu files, posters, OG assets if needed

## Recommended Media Pattern

Use this content flow:

1. editor uploads media in CMS/admin
2. file is stored in object storage or media service
3. CMS stores metadata and public/private asset references
4. Next.js fetches content and media URLs from CMS
5. frontend renders remote assets, not repository-local files

Preferred upload/storage patterns:

- CMS-managed uploads to S3-compatible storage
- or browser direct upload to object storage using signed URLs, with metadata saved in CMS

Avoid:

- committing large photos/videos to Git
- rebuilding the frontend for ordinary content changes
- storing venue media in `public/` except for tiny global assets like favicon or fallback design assets

## Alternative CMS/Admin Options

Option 1. Directus

Use when:
- content is highly structured
- there will be multiple bars and repeated entities
- admin users need a clean backoffice
- you want relational data without WordPress plugin sprawl

Option 2. WordPress

Use when:
- editors are already comfortable with WordPress
- the team wants familiar admin UX
- speed of launch matters more than strict content modeling

Implementation style:
- WordPress with custom post types for bars
- custom fields for bar-specific data
- frontend can be headless or theme-based

Option 3. Strapi

Use when:
- you want a developer-first headless CMS
- the team is comfortable maintaining a Node backend
- custom backend logic may grow over time

## Information Architecture

### Main Page

The main page should:

- introduce the brand or bar network
- show a premium hero section, preferably with video
- present a list of available bars
- provide short cards for each bar:
  - name
  - district / city
  - short tagline
  - preview image or looping preview video
  - CTA to open the bar page
- show shared brand blocks if relevant:
  - concept
  - advantages
  - events / broadcasts
  - franchise or about section if needed

### Bar Detail Page

Each bar page should include:

- hero section with bar-specific background video or image
- short intro
- gallery
- food / drinks / menu section
- broadcasts or events section if relevant
- socials
- contacts
- map
- booking CTA
- SEO and LocalBusiness schema for this exact bar

## CMS Content Model

Create structured content for at least these entities:

### Global Settings

- site name
- default SEO values
- brand description
- shared social links
- global navigation

### Bar

- id
- slug
- name
- display name
- city
- district
- short description
- long description
- hero title
- hero subtitle
- hero video
- hero fallback image
- logo
- gallery images
- contacts
- address
- geo coordinates
- working hours
- booking phone
- booking link
- social links
- map embed url
- reviews embed url
- bar-specific SEO fields
- sort order
- published status
- media asset references, not hardcoded local imports

### Menu Link

- title
- url
- type
- related bar
- sort order

### Media / Gallery Item

- asset
- alt text
- caption
- related bar
- sort order

## Admin Panel Requirements

The admin panel must support:

- authentication
- role-based access
- editor-friendly media management
- bar-by-bar content editing
- draft/publish workflow if supported
- easy editing of SEO fields
- ability to add a new bar without code changes
- media uploads that do not require a frontend deploy

Minimum roles:

- admin
- content editor

## Frontend Requirements

- mobile-first responsive behavior
- autoplay hero video must still work on phones where browser policy allows muted inline autoplay
- if reduced motion is requested, fall back to poster image
- high visual quality, not a template look
- preserve the current project’s cinematic first-screen feeling
- clean route structure:
  - `/`
  - `/bars/[slug]`
- support remote media URLs cleanly in frontend components

## SEO Requirements

- root page SEO for the overall brand
- unique title, description, canonical, Open Graph, Twitter card per bar page
- LocalBusiness or BarOrPub schema per bar page
- sitemap generation for all pages
- robots.txt
- clean semantic headings

## Delivery Requirements

Deliver:

- project structure
- content model
- frontend routing
- CMS configuration plan
- media storage strategy
- reusable components
- SEO setup
- deployment notes

Prioritize maintainability over quick hacks.
Avoid hardcoding bar content in source files if it belongs in CMS.
