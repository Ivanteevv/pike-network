# Content Model

## Purpose

This document defines:

- the content shape that exists today in the repository
- the target content entities needed for CMS-backed management
- ownership rules for editable content and media

It is intentionally data-focused and does not define frontend implementation steps.

The canonical internal frontend contracts that consume this model are defined in
[content-contracts.md](content-contracts.md).

## Current Implemented Model

The current content source is `src/lib/content/mock-site-data.js`.

It exports one top-level object with this shape:

```txt
mockSiteData
├── network
└── bars[]
```

### `network`

| Field | Type | Current usage |
| --- | --- | --- |
| `name` | string | stored, not currently rendered directly |
| `displayName` | string | footer and JSON-LD |
| `logoUrl` | string | stored, not currently rendered on the live pages |
| `phoneDisplay` | string | footer and homepage CTA |
| `phoneE164` | string | tel links |
| `mapSearchUrl` | string | homepage CTA |
| `locale` | string | stored, not currently consumed directly |
| `routeStrategy` | string | descriptive only |
| `hero.eyebrow` | string | stored, not currently rendered on homepage |
| `hero.title` | string | homepage hero |
| `hero.description` | string | homepage hero |
| `hero.media.kind` | string | homepage hero media |
| `hero.media.imageUrl` | string | homepage hero media |
| `hero.media.posterUrl` | string | homepage hero media |
| `hero.media.videoUrl` | string or absent | supported by component, not used in current network hero data |
| `commonFormats[]` | list | homepage shared-features section |
| `cta.title` | string | stored, not currently rendered |
| `cta.description` | string | stored, not currently rendered |
| `socials[]` | list | footer |
| `seo.title` | string | stored, but homepage metadata currently comes from `src/app/layout.js` |
| `seo.description` | string | homepage JSON-LD and stored SEO data |

### `bars[]`

Each item in `bars[]` is the current content unit for one bar page.

| Field | Type | Current usage |
| --- | --- | --- |
| `id` | string | content identity only |
| `slug` | string | route generation, lookup, sitemap |
| `name` | string | page content and JSON-LD |
| `shortLabel` | string | network cards and switcher |
| `locationLabel` | string | JSON-LD name |
| `city` | string | hero meta and JSON-LD |
| `addressLine` | string | hero, switcher, JSON-LD |
| `phoneDisplay` | string | page nav and contact actions |
| `phoneE164` | string | tel links |
| `hours[]` | list of strings | hero meta |
| `summary` | string | stored, not currently rendered |
| `vibe` | string | stored, not currently rendered |
| `features[]` | list of strings | stored, not currently rendered |
| `bestFor[]` | list of strings | rendered |
| `hero.eyebrow` | string | stored, but page derives eyebrow from city instead |
| `hero.title` | string | stored, not currently rendered directly |
| `hero.subtitle` | string | stored, not currently rendered directly |
| `hero.description` | string | stored, not currently rendered directly |
| `hero.kind` | string | hero media rendering |
| `hero.videoUrl` | string or absent | hero media rendering |
| `hero.imageUrl` | string | hero media rendering |
| `hero.posterUrl` | string | hero media fallback |
| `gallery[]` | list of media items | rendered in gallery |
| `menuLinks[]` | list | rendered in menu section |
| `menuPreview[]` | list | rendered in chips section |
| `events[]` | list | stored, not currently rendered |
| `mapUrl` | string | nav and contacts CTA |
| `socialLinks[]` | list | stored, not currently rendered |
| `seo.title` | string | page metadata |
| `seo.description` | string | page metadata and JSON-LD |

## Content Ownership Rules

- Frontend code owns layout, rendering logic, and adapter logic.
- The long-term source of truth for editable content should be outside this repository.
- Production photos, videos, and menu files should be managed as external assets, not committed source files.
- Temporary mock media in `public/mock` is allowed only while the CMS flow is not implemented.

## Target CMS-Oriented Model

The target model below is designed to cover all fields that the current frontend already uses, while reducing ambiguity for future CMS setup.

## Entity: `network_settings`

Singleton collection for network-wide content.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `brand_name` | string | yes | internal and display-safe base name |
| `display_name` | string | yes | public-facing brand label |
| `logo_asset` | asset reference | no | use when shared brand logo needs to be rendered from CMS-managed media |
| `default_locale` | string | yes | initial value can remain `ru-RU` |
| `primary_phone_display` | string | yes | display format |
| `primary_phone_e164` | string | yes | tel links |
| `map_search_url` | url | yes | network-level map CTA |
| `hero_eyebrow` | string | no | retain only if the homepage renders it |
| `hero_title` | string | yes | homepage hero |
| `hero_description` | text | yes | homepage hero |
| `hero_media_kind` | enum: `image`, `video` | yes | homepage hero rendering |
| `hero_media_asset` | asset reference | yes | image or video asset |
| `hero_media_poster_asset` | asset reference | no | video fallback poster |
| `common_formats` | repeatable component | no | title + description pairs |
| `cta_title` | string | no | homepage CTA copy if restored |
| `cta_description` | text | no | homepage CTA copy if restored |
| `social_links` | repeatable relation/component | no | label + URL |
| `seo_title` | string | no | homepage SEO override |
| `seo_description` | text | no | homepage SEO description |

## Current Network Field Disposition

This table makes the current network object explicit against the target model so
schema work does not have to guess whether a current field is kept, renamed, or
left out of CMS scope on purpose.

| Current field | Target disposition | Notes |
| --- | --- | --- |
| `name` | rename to `brand_name` | target keeps the same concept under CMS-safe naming |
| `displayName` | rename to `display_name` | public-facing label |
| `logoUrl` | rename to `logo_asset` | adapter resolves asset reference to a renderable URL when needed |
| `phoneDisplay` | rename to `primary_phone_display` | shared contact display value |
| `phoneE164` | rename to `primary_phone_e164` | shared tel link value |
| `mapSearchUrl` | rename to `map_search_url` | shared map CTA |
| `locale` | rename to `default_locale` | editorial default locale, not route logic |
| `routeStrategy` | move out of content model | routing strategy belongs to frontend architecture and ADR 004, not CMS content |
| `hero.eyebrow` | rename to `hero_eyebrow` | optional until homepage renders it |
| `hero.title` | rename to `hero_title` | homepage hero copy |
| `hero.description` | rename to `hero_description` | homepage hero copy |
| `hero.media.kind` | rename to `hero_media_kind` | adapter maps this into frontend media contract |
| `hero.media.imageUrl` | fold into `hero_media_asset` | CMS stores asset reference; adapter resolves image URL |
| `hero.media.videoUrl` | fold into `hero_media_asset` | CMS stores asset reference; adapter resolves video URL |
| `hero.media.posterUrl` | rename to `hero_media_poster_asset` | separate poster fallback when needed |
| `commonFormats[]` | rename to `common_formats` | repeatable structured items |
| `cta.title` | rename to `cta_title` | optional until homepage renders CTA copy again |
| `cta.description` | rename to `cta_description` | optional until homepage renders CTA copy again |
| `socials[]` | rename to `social_links` | repeatable shared links |
| `seo.title` | rename to `seo_title` | optional homepage override |
| `seo.description` | rename to `seo_description` | homepage SEO description |

## Entity: `bars`

Primary collection for bar-specific pages.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | system id | yes | CMS-managed primary key |
| `slug` | string | yes | unique, route-safe, immutable after publish unless migration is planned |
| `name` | string | yes | base bar name |
| `short_label` | string | yes | compact label for cards and switcher |
| `location_label` | string | yes | readable location label |
| `city` | string | yes | used in UI and schema |
| `address_line` | string | yes | postal street line |
| `phone_display` | string | yes | local or shared phone |
| `phone_e164` | string | yes | tel links |
| `map_url` | url | yes | external map destination |
| `hours_text` | repeatable string | yes | current UI expects ordered text lines |
| `best_for` | repeatable string | yes | current page renders this section |
| `summary` | text | no | current data has it; UI may use later |
| `vibe` | text | no | current data has it; UI may use later |
| `features` | repeatable string | no | current data has it; UI may use later |
| `hero_title` | string | no | keep for future UI flexibility |
| `hero_subtitle` | string | no | keep for future UI flexibility |
| `hero_description` | text | no | keep for future UI flexibility |
| `hero_media_kind` | enum: `image`, `video` | yes | current component contract |
| `hero_media_asset` | asset reference | yes | main hero asset |
| `hero_poster_asset` | asset reference | no | required when hero kind is `video` |
| `seo_title` | string | yes | bar page metadata |
| `seo_description` | text | yes | bar page metadata |
| `publish_state` | enum | yes | at minimum draft/published |
| `sort_order` | integer | no | network page ordering |

## Entity: `bar_gallery_items`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bar` | relation to `bars` | yes | owner bar |
| `asset` | asset reference | yes | image asset |
| `alt_text` | string | yes | required for accessible rendering |
| `sort_order` | integer | yes | gallery order |
| `caption` | string | no | not used yet, but safe to support |

## Entity: `bar_menu_links`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bar` | relation to `bars` | yes | owner bar |
| `title` | string | yes | section card title |
| `description` | text | yes | section card body |
| `url` | url or null | no | external menu file or page |
| `status_label` | string | yes | current UI shows a status line even when URL is empty |
| `sort_order` | integer | yes | output order |

## Entity: `bar_menu_preview_items`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bar` | relation to `bars` | yes | owner bar |
| `name` | string | yes | chip label |
| `note` | string | yes | chip sublabel |
| `sort_order` | integer | yes | output order |

## Entity: `bar_events`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bar` | relation to `bars` | yes | owner bar |
| `title` | string | yes | current data already contains this |
| `timing_text` | string | yes | human-readable schedule line |
| `description` | text | yes | event summary |
| `sort_order` | integer | yes | output order |

## Entity: `bar_social_links`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bar` | relation to `bars` | yes | owner bar |
| `label` | string | yes | social name |
| `url` | url | yes | external destination |
| `sort_order` | integer | no | output order |

## Modeling Rules

- `slug` must be unique among published bars.
- Asset fields must reference CMS-managed media or external storage URLs, not local repo paths as the long-term source of truth.
- Bar ordering on the network page must be explicit, not dependent on accidental insertion order.
- Fields currently rendered by the frontend should not depend on optional nested rich-text structures.
- The first CMS version should prefer plain structured fields over highly flexible page-builder blocks.

## Provisional Assumptions

- Opening hours remain text lines in the first implementation because the current UI already consumes ordered strings.
- The first CMS version models events, gallery items, and menu links as separate collections or repeatable components rather than rich text.

## Open Questions

- Should phone and socials be fully local per bar, or inherit from network settings unless overridden?
- Should menu files be URLs only, or first-class managed assets with metadata?
- Does the project need coordinates and richer structured address fields in the first release, or is `address_line` sufficient?
