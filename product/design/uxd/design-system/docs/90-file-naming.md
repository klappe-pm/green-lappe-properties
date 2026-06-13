---
domain: brand
category: design-system
sub-category: file-naming
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on: []
produces:
  - filename-conventions
  - identifier-conventions
  - repo-structure
  - css-class-naming
  - sanity-naming
  - astro-route-naming
  - asset-naming
executor: engineering
aliases: []
tags: []
---

# 90-file-naming

The complete file, identifier, and naming convention specification. Defines case styles, separators, length caps, and allowed characters for every named thing in the system: filenames, repo paths, CSS classes, JavaScript identifiers, Sanity schema names, Astro routes, asset filenames, environment variables, and database keys. Consumed by every engineer working in the codebase.

## Dependencies

None. This is the foundation naming spec.

## Outputs

1. Filename convention rules (kebab-case rationale and rules)
2. Repo structure conventions
3. CSS class naming
4. JavaScript and TypeScript identifier conventions
5. Sanity schema and field naming
6. Astro route and slug naming
7. Asset filename conventions
8. Environment variable conventions
9. Forbidden patterns

## 90.1 Master rule: kebab-case for files

Every file in the repository uses kebab-case (lowercase, dashes between words):

| Right | Wrong |
|---|---|
| `listing-card.astro` | `ListingCard.astro` |
| `owner-statement-pdf.ts` | `OwnerStatementPDF.ts` |
| `green-pm-tokens.css` | `green_pm_tokens.css` |
| `pms-integration.md` | `pmsIntegration.md` |
| `40-spacing-layout.md` | `40_Spacing_Layout.MD` |

### 90.1.1 Why kebab-case

Three reasons:

1. **URL-safe.** Filenames frequently become URL segments (Astro routes, GitHub raw URLs, public asset paths). Kebab-case requires no encoding.
2. **Cross-platform safe.** Windows is case-insensitive at the filesystem level; macOS can be either. PascalCase or camelCase filenames create case-sensitivity bugs that don't appear until production on Linux.
3. **Obsidian-compatible.** The doc set lives in an Obsidian vault. Obsidian treats kebab-case as standard.

### 90.1.2 Exceptions to kebab-case

| Context | Exception | Example |
|---|---|---|
| React/Astro component files | PascalCase (community convention) | `ListingCard.astro`, `OwnerStatement.jsx` |
| Project-convention names | As convention dictates | `README.md`, `LICENSE`, `CHANGELOG.md`, `Dockerfile` |
| Test files mirroring component names | Match parent | `ListingCard.test.tsx` |
| Configuration files with required names | As tool requires | `tailwind.config.js`, `astro.config.mjs`, `package.json` |
| Sanity schema files | camelCase (Sanity convention) | `blogPost.ts`, `listing.ts` (singular) |

This is the only deviation from the master rule. Everything else (utilities, helpers, scripts, doc markdown files, asset files, CSS files) uses kebab-case.

### 90.1.3 Doc filenames

Markdown documentation files in the design system use numeric-prefix kebab-case:

```
00-index.md
01-positioning.md
20-typography-strategy.md
84-pms-integration.md
```

The numeric prefix groups by tier (0x foundation, 1x system primitives, 2x typography, 3x tokens, 4x layout, 5x components, 6x surfaces, 7x data, 8x architecture, 9x governance). Numeric prefixes preserve sort order in the filesystem.

H1 must match the filename without `.md`:

```markdown
# 40-spacing-layout
```

## 90.2 Repo structure

The marketing site repo, `green-pm-site/`, follows this structure:

```
green-pm-site/
├── README.md
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── public/
│   ├── fonts/
│   │   ├── geist-400.woff2
│   │   ├── geist-500.woff2
│   │   ├── geist-600.woff2
│   │   ├── geist-700.woff2
│   │   ├── newsreader-400.woff2
│   │   ├── newsreader-500.woff2
│   │   ├── newsreader-600.woff2
│   │   ├── newsreader-italic-400.woff2
│   │   └── fraunces-italic-600.woff2
│   ├── images/
│   │   ├── og/
│   │   ├── photography/
│   │   └── icons/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── primitives/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Container.astro
│   │   │   └── Badge.astro
│   │   ├── layouts/
│   │   │   ├── BaseLayout.astro
│   │   │   ├── NeutralAcquisitionLayout.astro
│   │   │   ├── OwnerAcquisitionLayout.astro
│   │   │   ├── RenterAcquisitionLayout.astro
│   │   │   └── BlogPostLayout.astro
│   │   ├── sections/
│   │   │   ├── HeroSection.astro
│   │   │   ├── FeatureGrid.astro
│   │   │   └── CallToAction.astro
│   │   └── domain/
│   │       ├── ListingCard.astro
│   │       ├── ListingDetail.astro
│   │       ├── OwnerProposalForm.astro
│   │       └── BlogPostCard.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── owners/
│   │   │   ├── index.astro
│   │   │   ├── pricing.astro
│   │   │   └── proposal.astro
│   │   ├── rentals/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── about.astro
│   │   ├── accessibility.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── modes.css
│   │   └── base.css
│   ├── lib/
│   │   ├── sanity.ts
│   │   ├── hubspot.ts
│   │   └── pms-listings.ts
│   ├── types/
│   │   ├── listing.ts
│   │   ├── blog-post.ts
│   │   └── lead.ts
│   └── content/
│       └── config.ts
├── sanity/
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── listing.ts
│   │   ├── blogPost.ts
│   │   ├── faq.ts
│   │   ├── lead.ts
│   │   ├── page.ts
│   │   ├── settings.ts
│   │   ├── team.ts
│   │   ├── tag.ts
│   │   └── neighborhood.ts
│   ├── sanity.config.ts
│   └── package.json
└── docs/
    └── design-system/
        └── (the doc set this is part of)
```

### 90.2.1 Directory naming

Directories also use kebab-case:

| Right | Wrong |
|---|---|
| `src/components/` | `src/Components/` |
| `public/fonts/` | `public/Fonts/` |
| `src/lib/pms-integration/` | `src/lib/pmsIntegration/` |

## 90.3 CSS class naming

CSS classes use kebab-case. Tailwind utility classes naturally are kebab-case. Custom CSS classes follow the same convention.

| Right | Wrong |
|---|---|
| `.listing-card` | `.ListingCard`, `.listing_card`, `.listingCard` |
| `.eyebrow` | `.Eyebrow` |
| `.signature` | `.signatureLine` |
| `.text-display` | `.textDisplay` |

### 90.3.1 BEM-lite convention

Custom CSS classes follow a simplified BEM (Block-Element-Modifier) pattern when complexity warrants:

```css
.listing-card { /* block */ }
.listing-card__image { /* element */ }
.listing-card__address { /* element */ }
.listing-card--featured { /* modifier */ }
```

Most components don't need this; a single class is enough. BEM applies when a component has multiple internal elements that need distinct styling.

### 90.3.2 State classes

State classes use a `is-` or `has-` prefix:

```css
.button.is-loading { /* in progress */ }
.input.is-error { /* validation failed */ }
.card.has-photo { /* card has an image */ }
```

### 90.3.3 Utility classes

Custom utility classes use the Tailwind-style flat naming:

```css
.tabular { font-variant-numeric: tabular-nums; }
.sr-only { /* visually hidden */ }
.skip-link { /* skip-to-content */ }
```

## 90.4 JavaScript and TypeScript identifiers

JavaScript and TypeScript use the standard ECMAScript conventions:

| Identifier type | Convention | Example |
|---|---|---|
| Variable | camelCase | `let leasedMonths = 0;` |
| Function | camelCase | `function calculateLatentRevenue() {}` |
| Class | PascalCase | `class OwnerStatement {}` |
| Interface (TypeScript) | PascalCase, no `I` prefix | `interface ListingProps {}` (not `IListingProps`) |
| Type alias (TypeScript) | PascalCase | `type LeadStatus = 'new' \| 'contacted' \| 'converted';` |
| Constant (true constant, not const-declared variable) | SCREAMING_SNAKE_CASE | `const MAX_DOORS_RENTVINE = 49;` |
| Enum (TypeScript) | PascalCase, members PascalCase | `enum LeadSource { OwnerForm, RenterInquiry, Referral }` |
| Boolean | camelCase, `is`/`has`/`can` prefix | `let isPublished = true;` |
| Private (class fields) | underscore prefix | `private _internalState = null;` |
| React/Astro component | PascalCase | `ListingCard`, `HeroSection` |
| Hook (React) | camelCase, `use` prefix | `useListingData()` |

### 90.4.1 File-level export naming

If a file exports a single primary thing, the filename matches the export:

```typescript
// listing-card.tsx
export function ListingCard(props) { ... }

// (filename kebab-case for utilities; PascalCase only for component files)
// utility files:
// pms-listings.ts exports `fetchPMSListings`
```

## 90.5 Sanity schema and field naming

Sanity uses camelCase for schema names and field names.

| Schema name | Title (Studio) | File |
|---|---|---|
| `listing` | "Listing" | `sanity/schemas/listing.ts` |
| `blogPost` | "Field note" | `sanity/schemas/blogPost.ts` |
| `faq` | "FAQ" | `sanity/schemas/faq.ts` |
| `landingPage` | "Landing page" | `sanity/schemas/landingPage.ts` |

Field names within schemas:

```typescript
defineField({
  name: 'addressLine1',      // camelCase
  title: 'Address line 1',   // sentence case, human-readable
  type: 'string',
})
```

### 90.5.1 Reference fields

Reference field names indicate the relationship:

```typescript
defineField({
  name: 'neighborhood',    // singular when single reference
  type: 'reference',
  to: [{ type: 'neighborhood' }],
}),
defineField({
  name: 'tags',            // plural when array reference
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'tag' }] }],
}),
```

## 90.6 Astro routes and slugs

Astro routes use kebab-case. Dynamic routes use bracketed kebab-case parameter names.

| Route | URL | Notes |
|---|---|---|
| `src/pages/index.astro` | `/` | Home |
| `src/pages/owners/index.astro` | `/owners` | Owner acquisition |
| `src/pages/owners/proposal.astro` | `/owners/proposal` | Proposal form |
| `src/pages/rentals/[slug].astro` | `/rentals/1823-nw-65th-st` | Listing detail |
| `src/pages/blog/[slug].astro` | `/blog/why-i-replaced-this-boiler-now` | Blog post |
| `src/pages/blog/category/[category].astro` | `/blog/category/maintenance` | Blog category |

### 90.6.1 Slug generation

URL slugs are kebab-case derivations of titles:

| Source | Slug |
|---|---|
| `1823 NW 65th St` | `1823-nw-65th-st` |
| `Why I replaced this boiler now` | `why-i-replaced-this-boiler-now` |
| `What HB 1217 means for King County landlords` | `what-hb-1217-means-for-king-county-landlords` |

Sanity's slug field generates this automatically. Manual overrides are permitted if the auto-generated slug is awkward.

### 90.6.2 Slug rules

- Lowercase only
- Dashes between words; no underscores
- No special characters except dashes
- Maximum 80 characters
- No trailing or leading dashes
- No double dashes
- Numbers permitted (e.g., `1823-nw-65th-st`)

## 90.7 Asset filenames

### 90.7.1 Photos

Photos use kebab-case with a structured prefix:

```
[subject]-[descriptor]-[size].[ext]

operator-megan-portrait-1200.jpg
operator-megan-portrait-2400.jpg
property-1823-nw-65th-st-exterior-1200.jpg
property-1823-nw-65th-st-kitchen-1200.jpg
process-statement-kitchen-table-1200.jpg
```

The size suffix indicates pixel width on the long edge. The system typically ships 1200px (1x), 2400px (2x retina), and 600px (mobile thumbnail).

### 90.7.2 Icons

Icons use kebab-case matching the Lucide icon set:

```
public/images/icons/
  chevron-down.svg
  arrow-right.svg
  check.svg
  x.svg
  home.svg
```

For custom icons (not in Lucide), follow the same kebab-case convention with a `gpm-` prefix:

```
gpm-key-handoff.svg
gpm-statement-page.svg
```

### 90.7.3 Logo and brand assets

```
public/images/brand/
  green-pm-wordmark-cedar.svg
  green-pm-wordmark-cream.svg
  green-pm-wordmark-cream-on-cedar.svg
  green-pm-logo-icon.svg              (if a logo mark is commissioned later)
  green-pm-favicon-32.png
  green-pm-favicon-128.png
  green-pm-apple-touch-icon-180.png
```

### 90.7.4 Open Graph images

```
public/images/og/
  og-default-1200x630.png
  og-owner-acquisition-1200x630.png
  og-renter-acquisition-1200x630.png
  og-blog-default-1200x630.png
```

Per-blog-post OG images use the post slug:

```
og-why-i-replaced-this-boiler-now-1200x630.png
```

## 90.8 Environment variables

Environment variables use SCREAMING_SNAKE_CASE with prefixes:

| Prefix | Use | Example |
|---|---|---|
| `PUBLIC_` | Variables exposed to client-side code | `PUBLIC_SITE_URL=https://greenpmpnw.com` |
| (no prefix) | Server-only secrets | `SANITY_TOKEN=...`, `HUBSPOT_API_KEY=...` |

```
# .env.example
PUBLIC_SITE_URL=https://greenpmpnw.com
PUBLIC_SANITY_PROJECT_ID=abc123
PUBLIC_SANITY_DATASET=production

SANITY_TOKEN=secret-token-here
HUBSPOT_API_KEY=secret-key-here
RENTVINE_API_KEY=secret-key-here
POSTMARK_SERVER_TOKEN=secret-token-here
```

## 90.9 Database and storage keys

Keys in any key-value or database context use snake_case:

```
user_id
property_address
created_at
updated_at
lead_source
```

This matches PostgreSQL convention (the most likely future database).

### 90.9.1 Cache keys

Cache keys use colon-separated namespaces:

```
listing:1823-nw-65th-st
owner:abc-123:statements:2026-03
hubspot:lead:lead-id-here
```

## 90.10 Git commits and branches

Commit messages: lowercase, present tense, no period:

```
add owner proposal form
fix typography pivot regression on owner letter
update tailwind config for v3 fonts
```

Conventional commits permitted but not required:

```
feat: add owner proposal form
fix: typography pivot regression on owner letter
refactor: move tokens to v3 schema
```

Branch names: kebab-case with type prefix:

```
feat/owner-proposal-form
fix/owner-letter-typography
refactor/tokens-v3
chore/update-dependencies
```

## 90.11 Forbidden patterns

| Pattern | Why forbidden |
|---|---|
| Spaces in filenames | URL-unsafe, shell-unsafe |
| Special characters in filenames (`@`, `#`, `?`, `&`, `=`) | URL-unsafe |
| Mixed case in URL slugs | Case sensitivity bugs |
| Underscores in URL slugs | Modern convention is dashes |
| Trailing underscores or dashes in identifiers | Confusing |
| Numeric-only filenames (`123.md`) | Sort order unstable, hard to identify |
| Hungarian notation (`strName`, `intCount`) | Type prefixes obsolete in TypeScript |
| `I`-prefix on interfaces (`IListingProps`) | Java-ism; TypeScript convention is no prefix |
| `_private` (single underscore) at module level | Reserved for class fields |
| `__doubleUnderscore` anywhere | Reserved for runtime |
| Pluralization confusion (`leads.ts` vs `lead.ts`) | Pick one (singular for schema files, plural for collection utilities) |

## 90.12 Acceptance

This doc is acceptable when:

- An engineer can name any new file, identifier, route, or asset by consulting only this doc
- Every shipping file in the repo follows the documented convention or is explicitly listed as an exception
- A grep for forbidden patterns returns zero matches in shipping code
- New code reviewers can identify naming-convention violations without consulting another doc
