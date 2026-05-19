# Content Contracts

## Purpose

This document defines the internal frontend data contracts returned by the
content layer in `src/lib/content/get-site-data.js`.

It is the canonical contract reference for:

- `getSiteData()`
- `getBars()`
- `getBarBySlug(slug)`

This document does not define the CMS schema. CMS-specific fields, relations,
and asset references belong in [content-model.md](content-model.md).

## Contract Rules

- Routes and components must depend on these internal contracts, not on raw CMS
  response shapes.
- The current mock implementation may return richer objects, but consumers
  should treat the returned values as the contracts defined here.
- CMS records may store asset references or relational media objects. The
  adapter layer must resolve those into the concrete URL fields used by the
  frontend contracts below.
- Collection fields return arrays, not `null`.
- Non-applicable media URL fields return `null`.
- `getBarBySlug(slug)` returns `null` when no bar is visible in the current
  runtime view.
- Until preview behavior is explicitly approved and documented, the runtime view
  for these contracts is the published view only.

## Shared Media Contract

Renderable media passed to frontend components uses URL fields, not raw CMS
asset objects.

```json
{
  "kind": "image|video",
  "imageUrl": "string|null",
  "videoUrl": "string|null",
  "posterUrl": "string|null"
}
```

Rules:

- `kind` is always present.
- `imageUrl` is required for image media and may also be present as a fallback
  for video media.
- `videoUrl` is required only when `kind` is `video`.
- `posterUrl` is required when `kind` is `video` unless the frontend component
  contract is intentionally changed.

## `getSiteData()`: `NetworkSiteData`

`getSiteData()` returns the network-level content needed by the homepage and
site-wide shared UI.

```json
{
  "network": {
    "name": "string",
    "displayName": "string",
    "logoUrl": "string|null",
    "phoneDisplay": "string",
    "phoneE164": "string",
    "mapSearchUrl": "string",
    "locale": "string|null",
    "hero": {
      "eyebrow": "string|null",
      "title": "string",
      "description": "string",
      "media": {
        "kind": "image|video",
        "imageUrl": "string|null",
        "videoUrl": "string|null",
        "posterUrl": "string|null"
      }
    },
    "commonFormats": [
      {
        "title": "string",
        "description": "string"
      }
    ],
    "cta": {
      "title": "string|null",
      "description": "string|null"
    },
    "socials": [
      {
        "label": "string",
        "href": "string"
      }
    ],
    "seo": {
      "title": "string|null",
      "description": "string"
    }
  },
  "bars": [
    {
      "id": "string",
      "slug": "string",
      "name": "string",
      "shortLabel": "string",
      "locationLabel": "string",
      "city": "string",
      "addressLine": "string"
    }
  ]
}
```

Notes:

- `bars` in `getSiteData()` is a summary list for homepage cards and cross-bar
  navigation, not a guarantee of full bar-page detail fields.
- `seo.title` may be `null` when global metadata still comes from
  `src/app/layout.js`.

## `getBars()`: `BarSummary[]`

`getBars()` returns the summary list used for route generation, sitemap
generation, and lightweight cross-bar navigation.

```json
[
  {
    "id": "string",
    "slug": "string",
    "name": "string",
    "shortLabel": "string",
    "locationLabel": "string",
    "city": "string",
    "addressLine": "string"
  }
]
```

Rules:

- `slug` is route-safe and unique within the currently visible runtime view.
- Consumers of `getBars()` must not depend on hidden extra fields from the
  current mock implementation.

## `getBarBySlug(slug)`: `BarPageData | null`

`getBarBySlug(slug)` returns the normalized detail shape for one bar page.

```json
{
  "id": "string",
  "slug": "string",
  "name": "string",
  "shortLabel": "string",
  "locationLabel": "string",
  "city": "string",
  "addressLine": "string",
  "phoneDisplay": "string",
  "phoneE164": "string",
  "hours": ["string"],
  "bestFor": ["string"],
  "hero": {
    "kind": "image|video",
    "imageUrl": "string|null",
    "videoUrl": "string|null",
    "posterUrl": "string|null"
  },
  "gallery": [
    {
      "src": "string",
      "alt": "string"
    }
  ],
  "broadcasts": [
    {
      "id": "string",
      "title": "string",
      "date": "string",
      "time": "string",
      "description": "string",
      "category": "string",
      "image": {
        "src": "string",
        "alt": "string|null"
      },
      "status": "string|null",
      "isFeatured": "boolean"
    }
  ],
  "broadcastsSettings": {
    "emptyBehavior": "show|hide",
    "emptyState": {
      "title": "string",
      "description": "string",
      "ctas": [
        {
          "label": "string",
          "href": "string"
        }
      ]
    }
  },
  "menuLinks": [
    {
      "title": "string",
      "description": "string",
      "href": "string|null",
      "status": "string"
    }
  ],
  "menuPreview": [
    {
      "name": "string",
      "note": "string"
    }
  ],
  "mapUrl": "string",
  "seo": {
    "title": "string",
    "description": "string"
  },
  "summary": "string|null",
  "vibe": "string|null",
  "features": ["string"],
  "events": [
    {
      "title": "string",
      "timing": "string",
      "description": "string"
    }
  ],
  "socialLinks": [
    {
      "label": "string",
      "href": "string"
    }
  ]
}
```

Rules:

- `hours`, `bestFor`, `gallery`, `broadcasts`, `menuLinks`, `menuPreview`,
  `features`, `events`, and `socialLinks` return arrays, not `null`.
- `gallery[].alt` is required.
- `broadcasts[]` contains only published broadcasts in normal runtime views.
- `broadcasts[].image` is optional. When present, `image.src` is required and
  `image.alt` should be provided unless the image is decorative.
- `broadcastsSettings.emptyBehavior` controls whether an empty broadcasts
  section renders a designed fallback or hides the section.
- `menuLinks[].status` remains required even when `href` is `null`.
- `summary`, `vibe`, and other not-yet-rendered singleton fields may be `null`
  until the UI uses them consistently.

## Current Consumers

- `getSiteData()`:
  [`src/app/page.js`](../src/app/page.js),
  [`src/components/site-footer.js`](../src/components/site-footer.js)
- `getBars()`:
  [`src/app/bars/[slug]/page.js`](../src/app/bars/%5Bslug%5D/page.js),
  [`src/app/sitemap.js`](../src/app/sitemap.js)
- `getBarBySlug(slug)`:
  [`src/app/bars/[slug]/page.js`](../src/app/bars/%5Bslug%5D/page.js)
