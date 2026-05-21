---
domain: brand
category: design-system
sub-category: routing
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 11-audience-modes
  - 80-system-architecture
produces:
  - url-structure
  - sitemap
  - astro-route-map
  - redirects-table
  - canonical-url-rules
  - seo-meta-rules
executor: engineering
aliases:
tags:
---

# 83-routing

The complete URL structure, sitemap, redirects, canonical URLs, and SEO meta rules. Consumed by Astro page authors, the sitemap generator, and the redirects configuration.

## Dependencies

- `11-audience-modes` for which audience mode each URL maps to
- `80-system-architecture` for the Cloudflare Pages deployment context

## Outputs

1. URL structure (top-level patterns)
2. Complete sitemap (every page)
3. Astro route mapping
4. Redirects table (legacy URLs, common typos)
5. Canonical URL rules
6. SEO meta tag rules per page type
7. Forbidden URL patterns

## URL principles

| Principle | Means |
|---|---|
| Short | Three-segment paths maximum (e.g., `/owners/pricing`) |
| Predictable | URL patterns are uniform within a section |
| Stable | Once published, URLs don't change without redirects |
| Hyphenated | `kebab-case`, never `snake_case`, never `camelCase` |
| Lowercased | Always lowercase; URLs are case-sensitive on some servers |
| Trailing-slash-free | URLs end without a trailing slash (`/owners`, not `/owners/`) |
| No tracking parameters in canonical URLs | UTMs are query strings, never path elements |

## URL structure

### Top level

| URL | Purpose | Audience mode |
|---|---|---|
| `/` | Homepage | neutral-acquisition |
| `/owners` | Owner overview | owner-acquisition |
| `/owners/pricing` | Owner pricing detail | owner-acquisition |
| `/owners/services` | Owner services detail | owner-acquisition |
| `/owners/proposal` | Owner proposal request form | owner-acquisition |
| `/owners/faq` | Owner FAQ | owner-acquisition |
| `/rentals` | Rentals index | renter-acquisition |
| `/rentals/[slug]` | Rental detail page | renter-acquisition |
| `/rentals/apply` | Application landing (gated; sent by Megan after inquiry) | renter-acquisition |
| `/rentals/faq` | Renter FAQ | renter-acquisition |
| `/blog` | Field notes index | neutral-acquisition |
| `/blog/[slug]` | Field note detail | neutral-acquisition |
| `/blog/tag/[tag]` | Field notes filtered by tag | neutral-acquisition |
| `/about` | About page (Megan, brand story) | neutral-acquisition |
| `/contact` | Contact page | neutral-acquisition |
| `/portal/owner` | Owner portal home (authenticated) | owner-product |
| `/portal/owner/properties` | Owner properties list | owner-product |
| `/portal/owner/properties/[id]` | Single property detail | owner-product |
| `/portal/owner/statements` | Statements index | owner-product |
| `/portal/owner/statements/[id]` | Single statement | owner-product |
| `/portal/owner/documents` | Documents (lease, agreements) | owner-product |
| `/portal/owner/profile` | Owner profile and preferences | owner-product |
| `/portal/resident` | Resident portal home (authenticated) | renter-product |
| `/portal/resident/rent` | Rent payment page | renter-product |
| `/portal/resident/repairs` | Repairs list | renter-product |
| `/portal/resident/repairs/[id]` | Single repair detail | renter-product |
| `/portal/resident/repairs/new` | Report a new repair | renter-product |
| `/portal/resident/documents` | Documents (lease, notices) | renter-product |
| `/portal/resident/profile` | Resident profile | renter-product |
| `/accessibility` | Accessibility statement | neutral-acquisition |
| `/privacy` | Privacy policy | neutral-acquisition |
| `/terms` | Terms of service | neutral-acquisition |
| `/sitemap.xml` | Sitemap | n/a |
| `/robots.txt` | Robots directives | n/a |
| `/404` | Not found | neutral-acquisition |
| `/500` | Server error | neutral-acquisition |

### Slug patterns

| Resource | Slug format | Example |
|---|---|---|
| Rental | `[address-with-dashes]` | `1823-nw-65th-st-ballard` |
| Blog post | `[topic-as-dashes]` | `boiler-replacement-18th-ave-ne` |
| Tag | `[single-word-or-dashed]` | `compliance`, `field-notes`, `hb-1217` |

## Astro route map

Every URL above maps to an Astro file in `src/pages/`. Astro's file-based routing handles this automatically; explicit list for reference:

```
src/pages/
├── index.astro                                   # /
├── about.astro                                   # /about
├── contact.astro                                 # /contact
├── accessibility.astro                           # /accessibility
├── privacy.astro                                 # /privacy
├── terms.astro                                   # /terms
├── 404.astro                                     # /404
├── 500.astro                                     # /500
├── sitemap.xml.ts                                # /sitemap.xml (dynamic)
├── owners/
│   ├── index.astro                               # /owners
│   ├── pricing.astro                             # /owners/pricing
│   ├── services.astro                            # /owners/services
│   ├── proposal.astro                            # /owners/proposal
│   └── faq.astro                                 # /owners/faq
├── rentals/
│   ├── index.astro                               # /rentals
│   ├── [slug].astro                              # /rentals/[slug]
│   ├── apply.astro                               # /rentals/apply
│   └── faq.astro                                 # /rentals/faq
├── blog/
│   ├── index.astro                               # /blog
│   ├── [slug].astro                              # /blog/[slug]
│   └── tag/[tag].astro                           # /blog/tag/[tag]
└── portal/
    ├── owner/
    │   ├── index.astro                           # /portal/owner
    │   ├── properties/
    │   │   ├── index.astro                       # /portal/owner/properties
    │   │   └── [id].astro                        # /portal/owner/properties/[id]
    │   ├── statements/
    │   │   ├── index.astro                       # /portal/owner/statements
    │   │   └── [id].astro                        # /portal/owner/statements/[id]
    │   ├── documents.astro                       # /portal/owner/documents
    │   └── profile.astro                         # /portal/owner/profile
    └── resident/
        ├── index.astro                           # /portal/resident
        ├── rent.astro                            # /portal/resident/rent
        ├── repairs/
        │   ├── index.astro                       # /portal/resident/repairs
        │   ├── new.astro                         # /portal/resident/repairs/new
        │   └── [id].astro                        # /portal/resident/repairs/[id]
        ├── documents.astro                       # /portal/resident/documents
        └── profile.astro                         # /portal/resident/profile
```

## Redirects

Configured in `_redirects` (Cloudflare Pages) or via `astro.config.mjs`.

### Common redirects

| From | To | Reason |
|---|---|---|
| `/index.html` | `/` | Server-default index handled |
| `/index` | `/` | Same |
| `/home` | `/` | Common typo |
| `/owners.html` | `/owners` | Legacy `.html` extension |
| `/rentals.html` | `/rentals` | Same |
| `/rental` | `/rentals` | Singular-to-plural |
| `/listings` | `/rentals` | Common rename |
| `/properties` | `/rentals` | Common rename |
| `/blog/index` | `/blog` | Index handled |
| `/contact-us` | `/contact` | Common variation |
| `/contactus` | `/contact` | Same |
| `/services` | `/owners/services` | Disambiguate to owner-side |
| `/pricing` | `/owners/pricing` | Same |
| `/login` | `/portal/resident` (default; OR a chooser page that asks which portal) | Authentication entry point |
| `/signin` | `/portal/resident` | Same |
| `/portal` | `/portal/resident` (default; OR a chooser page) | Portal root |

### Legacy URLs

When the site launches, no legacy URLs exist. As the site grows, when any URL is renamed or removed:

1. Add a 301 redirect from old to new
2. Update the sitemap
3. Note the change in `94-governance.md` change log

## Canonical URLs

Every page declares its canonical URL via `<link rel="canonical">`:

```html
<link rel="canonical" href="https://greenpmpnw.com/owners/pricing" />
```

Rules:

- Always absolute URL with `https://`
- Always lowercase
- Never includes query strings (UTMs, search params)
- Never includes fragment identifiers
- Never trailing slash
- For paginated archives (`/blog?page=2`), canonical points to `/blog` (the first page); each page declares its own URL in `<link rel="next">` and `<link rel="prev">`

## SEO meta rules per page type

### Universal meta tags

Every page includes:

```html
<title>[page-specific title] · Green PM</title>
<meta name="description" content="[page-specific description, 140-160 chars]" />
<link rel="canonical" href="https://greenpmpnw.com[path]" />
<meta property="og:title" content="[page-specific title]" />
<meta property="og:description" content="[page-specific description]" />
<meta property="og:image" content="https://greenpmpnw.com/og-default.jpg" />
<meta property="og:url" content="https://greenpmpnw.com[path]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Green Property Management" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#2D6A4F" />
```

### Page-type-specific patterns

#### Homepage

| Tag | Value |
|---|---|
| Title | `Green PM · Property management for small landlords in King and Snohomish counties` |
| Description | `Property management for 1 to 20-door landlords in King and Snohomish counties, Washington. 9% of collected rent. Megan Green, designated broker.` |

#### Owners page

| Tag | Value |
|---|---|
| Title | `For owners · Green Property Management` |
| Description | `Small-portfolio property management in King and Snohomish counties. 9% fee, transparent pricing, named designated broker.` |

#### Rental listing detail

| Tag | Value |
|---|---|
| Title | `[address] · [beds] bed, [baths] bath · $[rent]/mo · Green PM` |
| Description | `[address] in [neighborhood]. [beds] bed, [baths] bath, [sqft] sqft. $[rent]/mo. Available [date].` |
| OG image | Listing's hero photo |

Also include schema.org structured data for `RentalApartment`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RentAction",
  "object": {
    "@type": "Apartment",
    "address": { ... },
    "numberOfRooms": "...",
    ...
  }
}
</script>
```

#### Blog post

| Tag | Value |
|---|---|
| Title | `[post title] · Field notes · Green PM` |
| Description | `[first 150 chars of post body, trimmed at sentence]` |
| OG image | Post's hero image |
| OG type | `article` |

Also include `<meta property="article:published_time">` and `<meta property="article:author">`.

#### Portal pages

| Tag | Value |
|---|---|
| Title | `[page name] · Green PM` |
| Description | (Generic site description; portal pages are not for search indexing) |
| Robots | `noindex, nofollow` |

## robots.txt

```
User-agent: *
Allow: /
Disallow: /portal/
Disallow: /rentals/apply

Sitemap: https://greenpmpnw.com/sitemap.xml
```

Portal pages and the application page are blocked from crawl.

## sitemap.xml

Generated at build time. Includes:

- All marketing pages (`/`, `/owners*`, `/rentals` index, `/blog*`, `/about`, `/contact`, legal pages)
- All published rental listings (with `lastmod`)
- All published blog posts (with `lastmod`)

Excluded:

- `/portal/*` (authenticated)
- `/rentals/apply` (gated)
- `/404`, `/500`

Format per Sitemap Protocol; `priority` and `changefreq` set conservatively:

| URL pattern | Priority | Changefreq |
|---|---|---|
| `/` | 1.0 | weekly |
| `/owners`, `/rentals`, `/blog`, `/about` | 0.8 | weekly |
| `/owners/*` | 0.7 | monthly |
| `/rentals/[slug]` | 0.6 | weekly |
| `/blog/[slug]` | 0.5 | monthly |
| `/blog/tag/*` | 0.4 | monthly |
| Legal pages | 0.3 | yearly |

## Forbidden URL patterns

- Trailing slashes on canonical URLs
- Uppercase letters in URLs
- Spaces or special characters (use only `[a-z0-9-]`)
- Numeric IDs in marketing URLs (use slugs)
- Multiple slug formats for the same resource (e.g., `/rentals/1823-nw-65th-st` and `/rentals/1823nw65thst`)
- Deeply nested URLs (more than three segments below root)
- URLs that mix singular and plural inconsistently
- URLs with `.html`, `.php`, `.aspx` extensions
- Query strings as the primary identifier (use path segments)
- URLs that change when content is updated (always redirect)
- Self-canonical URLs that include query parameters
- Including `index` in any URL path
- Hash-routing for portal navigation (use proper paths)
- Authentication state encoded in URL (use cookies or session tokens)

## Acceptance

This doc is acceptable when:

- Every page in the system has a documented URL
- The Astro route map matches the URL structure
- Redirects cover common typos and legacy patterns
- Canonical URL rules are consistent
- robots.txt and sitemap.xml are buildable from these specs
- SEO meta tags are documented per page type
