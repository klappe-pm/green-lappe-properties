---
domain: brand
category: design-system
sub-category: index
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on: []
produces:
  - master-doc-inventory
  - execution-graph
  - doc-contract
executor: strategy
aliases:
tags:
---

# 00-index

Master index for the Green Property Management design system. Replaces the v2 monolithic style guide with a modular doc set executable by parallel and sequential LLM agent workflows.

## Purpose

Every doc in this set has:

- A defined input (dependencies on other docs or external context)
- A defined output (the artifact it produces)
- A defined executor (which agent role can produce it)
- A defined acceptance test (how to verify it is complete)

This index is the routing layer. An orchestrator LLM consults this index to determine which docs to produce, in what order, and which can run in parallel.

## Dependencies

None. This is the root routing document for the design-system package.

## Outputs

1. Master inventory of every numbered design-system spec
2. Tiered execution graph for human and LLM orchestration
3. Required document contract and frontmatter schema
4. Locked stack summary for downstream implementation

## Version

Design system version 3.0.0. Breaking changes from v2:

- Typography pivot from Fraunces + Inter + JetBrains Mono to Geist + Newsreader + Fraunces (italic accent only)
- JetBrains Mono removed entirely
- Style guide broken from one 4,219-line file into a modular doc set
- Each section becomes an executable doc

## Doc inventory

### Tier 0: Foundation (sequential, blocking)

| Doc | Produces | Depends on | Executor |
|---|---|---|---|
| `00-index.md` | This index | None | Orchestrator |
| `01-positioning.md` | Strategic positioning, competitive whitespace, anti-positioning | None | Strategy |
| `02-brand-identity.md` | Name forms, wordmark spec, operator signature | `01` | Brand |
| `03-voice.md` | Voice principles, three-context voice samples | `01`, `02` | Brand |
| `04-microcopy.md` | Microcopy patterns, banned phrases, owner and renter samples | `03` | Content |

### Tier 1: System primitives (sequential after Tier 0)

| Doc | Produces | Depends on | Executor |
|---|---|---|---|
| `10-color-system.md` | Color palette, accessibility matrix, mode ratios | `01` | Design |
| `11-audience-modes.md` | Five audience modes, surface and tone rules | `01`, `10` | Design |
| `20-typography-strategy.md` | Why Geist, Newsreader, Fraunces. Rationale and competitive context | `01`, `03` | Design |
| `21-typography-tokens.md` | Type tokens, families, weights, sizes, leading, tracking | `20` | Engineering |
| `22-typography-usage.md` | Every interface element with font, weight, size, color, mobile, desktop | `21`, `11` | Engineering |
| `23-typography-migration.md` | Step-by-step migration from v2 type system to v3 | `21`, `22` | Engineering |
| `30-design-tokens.md` | Full token CSS file (color + type + spacing + radius + shadow + motion + z-index) | `10`, `21` | Engineering |

### Tier 2: Layout and components (parallel after Tier 1)

| Doc | Produces | Depends on | Executor |
|---|---|---|---|
| `40-spacing-layout.md` | Spacing scale, layout grids, container widths | `30` | Design |
| `41-radius-shadow.md` | Border radius scale, shadow elevation system | `30` | Design |
| `42-motion.md` | Duration, easing, reduced-motion rules | `30` | Design |
| `43-z-index.md` | Z-index scale, layering rules | `30` | Engineering |
| `50-form-components.md` | Form inputs, labels, validation, error states | `22`, `30`, `40` | Engineering |
| `51-navigation.md` | Top nav, mobile nav, footer, breadcrumbs | `22`, `30`, `40` | Engineering |
| `52-component-grammar.md` | Card, button, badge, tag, chip patterns | `22`, `30`, `40` | Engineering |
| `53-component-states.md` | Default, hover, focus, active, disabled matrix | `52`, `42` | Engineering |
| `54-empty-loading-error.md` | Empty, loading, and error state designs | `52` | Engineering |

### Tier 3: Surfaces and applications (parallel after Tier 2)

| Doc | Produces | Depends on | Executor |
|---|---|---|---|
| `60-iconography.md` | Icon set, sizing, color rules | `30` | Design |
| `61-photography.md` | Photography rules, subject matter, what to avoid | `01`, `03` | Brand |
| `62-illustration.md` | Illustration direction, when to use, what to avoid | `61` | Brand |
| `70-data-display.md` | Tables, charts, financial figures, dashboards | `22`, `30` | Engineering |
| `71-status-indicators.md` | Status chips, success / warning / error / info | `30`, `52` | Engineering |
| `72-document-templates.md` | Statement, proposal, lease, notice templates | `22`, `30`, `61` | Content |
| `73-email-notifications.md` | Transactional email templates | `22`, `30`, `03` | Engineering |
| `74-print.md` | Print specifications for letters and yard signs | `30`, `61` | Design |
| `75-social-media.md` | Social profile setup, content patterns, forbidden patterns | `03`, `61` | Brand |

### Tier 4: System architecture (parallel after Tier 0)

| Doc | Produces | Depends on | Executor |
|---|---|---|---|
| `80-system-architecture.md` | Stack overview, deployment, environments | None | Engineering |
| `81-user-flows.md` | Owner acquisition, renter inquiry, resident onboarding flows | `11`, `80` | Engineering |
| `82-data-flows.md` | Sanity to Astro, Rentvine sync, HubSpot integration | `80` | Engineering |
| `83-routing.md` | URL structure, sitemap, Astro routes | `80` | Engineering |
| `84-pms-integration.md` | Rentvine config, AppFolio migration plan, theming limits | `80` | Engineering |
| `85-sanity-schemas.md` | All Sanity schema docs (listing, blog-post, lead, etc.) | `80` | Engineering |

### Tier 5: Governance and reference (parallel after all)

| Doc | Produces | Depends on | Executor |
|---|---|---|---|
| `90-file-naming.md` | File and code naming conventions, repo structure | None | Engineering |
| `91-accessibility.md` | WCAG compliance, keyboard nav, screen reader rules | `30`, `52` | Engineering |
| `92-dark-mode.md` | Dark mode strategy, deferred to phase 2 | `10`, `30` | Design |
| `93-pairings-forbidden.md` | Best pairings, forbidden color and type combinations | `10`, `22` | Design |
| `94-governance.md` | Ownership, change proposal, versioning, deprecation | None | Strategy |
| `95-quick-reference.md` | One-page cheat sheet of all critical rules | All | Strategy |
| `96-numbering-convention.md` | Numbering scheme, reserved slots, insertion and renumbering rules | `00`, `90`, `94` | Strategy |

## Execution plan

### Sequential gate 1: Foundation

Produce in order. No parallelism. Each blocks the next.

```
01-positioning.md → 02-brand-identity.md → 03-voice.md → 04-microcopy.md
```

### Sequential gate 2: System primitives

Produce in order. Each blocks the next.

```
10-color-system.md → 11-audience-modes.md
20-typography-strategy.md → 21-typography-tokens.md → 22-typography-usage.md → 23-typography-migration.md
30-design-tokens.md (requires both color and typography tokens)
```

### Parallel batch 1: Layout and components

After gate 2, these can run in parallel. Five agents work simultaneously:

```
Agent A: 40-spacing-layout.md, 41-radius-shadow.md
Agent B: 42-motion.md, 43-z-index.md
Agent C: 50-form-components.md, 51-navigation.md
Agent D: 52-component-grammar.md, 53-component-states.md
Agent E: 54-empty-loading-error.md
```

### Parallel batch 2: Surfaces

After parallel batch 1, these can run in parallel. Six agents:

```
Agent A: 60-iconography.md
Agent B: 61-photography.md, 62-illustration.md
Agent C: 70-data-display.md, 71-status-indicators.md
Agent D: 72-document-templates.md
Agent E: 73-email-notifications.md, 74-print.md
Agent F: 75-social-media.md
```

### Parallel batch 3: System architecture

Independent of design system, can run from Tier 0 onward:

```
Agent A: 80-system-architecture.md → 81-user-flows.md
Agent B: 82-data-flows.md, 83-routing.md
Agent C: 84-pms-integration.md, 85-sanity-schemas.md
```

### Parallel batch 4: Governance

After everything else, can run in parallel:

```
Agent A: 90-file-naming.md
Agent B: 91-accessibility.md
Agent C: 92-dark-mode.md, 93-pairings-forbidden.md
Agent D: 94-governance.md → 96-numbering-convention.md
Agent E: 95-quick-reference.md
```

## Doc contract

Every doc in this set must:

1. **Start with the frontmatter block** in the schema below
2. **H1 matches the filename** without `.md` extension
3. **Open with one paragraph** stating what the doc produces and who consumes it
4. **Declare dependencies** in a `## Dependencies` section at the top
5. **Declare outputs** in a `## Outputs` section
6. **Declare acceptance tests** in a `## Acceptance` section at the bottom
7. **Use Obsidian-flavored Markdown** with kebab-case filenames
8. **Use inline code** for filenames, repo paths, configuration keys
9. **No em dashes**; use commas, semicolons, parentheses, colons, or separate sentences
10. **Sentence case throughout**

Required frontmatter schema:

```yaml
---
domain: brand
category: design-system
sub-category: [section-name]
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
depends-on:
  - [filename-without-md]
produces:
  - [artifact-1]
  - [artifact-2]
executor: [strategy|brand|design|engineering|content]
aliases:
tags:
---
```

## Locked stack

Every doc must respect these locked decisions. Do not propose alternatives.

- **Domain**: `greenpmpnw.com`
- **Marketing site**: Astro plus Tailwind, deployed to Cloudflare Pages or Netlify
- **Content layer**: Sanity (headless CMS)
- **Portal layer**: Rentvine (launch, under 50 doors) then AppFolio (50 plus doors)
- **CRM**: HubSpot Starter
- **Email**: Postmark or AWS SES plus Google Workspace
- **Fonts**: Geist (display, UI, financial), Newsreader (body prose), Fraunces (italic signature accent only)
- **Colors**: Cedar, Ink, Cream, Paper, Stone, Clay, Sky and derived neutrals

## How an orchestrator uses this index

```
1. Read this index.
2. Determine which tier the requested doc belongs to.
3. Verify all dependencies in the doc's frontmatter exist.
4. If dependencies missing, produce them first (or queue for production).
5. Execute the doc with the appropriate executor role.
6. Verify acceptance tests pass.
7. Mark doc complete in the workflow state.
```

## Acceptance

This index is acceptable when:

- Every doc listed has a defined filename, executor, dependency list, and output
- The dependency graph is acyclic
- Every tier can be unambiguously scheduled
- A new orchestrator agent can read this doc and immediately produce a work plan without further clarification

## Related

- [`green-pm-tokens.css`](../green-pm-tokens.css) machine-readable token export
- [`tailwind.config.js`](../tailwind.config.js) Tailwind configuration mirroring tokens
- [[96-numbering-convention|design-system numbering convention]]
- Sanity schemas in `sanity/schemas/`
- Astro repo at `green-pm-site/`
