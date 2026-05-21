# Green PM design system v3

Production design system for Green Property Management. Modular specification set executable by parallel multi-agent LLM workflows.

## What this is

Forty-two specification documents plus four production CSS/JS asset files. The full v3 refactor of the previous monolithic style guide (`green-pm-style-guide.md`, 4,219 lines, now superseded).

## Version

`3.0.0` (locked, 2026-05-21).

Breaking changes from v2:

- Typography pivot: Geist (display/UI/financial) + Newsreader (body prose) + Fraunces italic (signature accent only).
- JetBrains Mono removed.
- Style guide decomposed from one 4,219-line file into 42 modular spec docs.
- Each section is independently executable, with declared dependencies, outputs, executor role, and acceptance criteria.

## Locked brand foundation

- **Name**: Green Property Management. Short: Green PM.
- **Operator**: Megan Green, designated broker.
- **Service area**: King and Snohomish counties, Washington.
- **Pricing**: 9% of collected rent; 60% leasing fee on placement.
- **Domain**: `greenpmpnw.com`.
- **Stack**: Astro + Tailwind + Sanity + Rentvine (→AppFolio at 50+ doors) + HubSpot + Postmark + Clerk + Neon.

## Structure

```
gpm-design-system/
├── README.md                       (this file)
├── green-pm-tokens.css             (v3 design tokens, single source of truth)
├── base.css                        (element resets, type defaults, focus, prose)
├── modes.css                       (audience-mode surface overrides)
├── tailwind.config.js              (Tailwind config mirroring tokens)
└── docs/
    ├── 00-index.md                 (master index, execution graph)
    │
    ├── Foundation tier (sequential, blocks all else)
    ├── 01-positioning.md
    ├── 02-brand-identity.md
    ├── 03-voice.md
    ├── 04-microcopy.md
    │
    ├── System primitives tier (sequential after foundation)
    ├── 10-color-system.md
    ├── 11-audience-modes.md
    ├── 20-typography-strategy.md
    ├── 21-typography-tokens.md
    ├── 22-typography-usage.md
    ├── 23-typography-migration.md
    ├── 30-design-tokens.md
    │
    ├── Layout and components tier (parallelizable, 5 agents)
    ├── 40-spacing-layout.md
    ├── 41-radius-shadow.md
    ├── 42-motion.md
    ├── 43-z-index.md
    ├── 50-form-components.md
    ├── 51-navigation.md
    ├── 52-component-grammar.md
    ├── 53-component-states.md
    ├── 54-empty-loading-error.md
    │
    ├── Surfaces tier (parallelizable, 6 agents)
    ├── 60-iconography.md
    ├── 61-photography.md
    ├── 62-illustration.md
    ├── 70-data-display.md
    ├── 71-status-indicators.md
    ├── 72-document-templates.md
    ├── 73-email-notifications.md
    ├── 74-print.md
    ├── 75-social-media.md
    │
    ├── System architecture tier (parallelizable with surfaces)
    ├── 80-system-architecture.md
    ├── 81-user-flows.md
    ├── 82-data-flows.md
    ├── 83-routing.md
    ├── 84-pms-integration.md
    ├── 85-sanity-schemas.md
    │
    └── Governance tier (parallelizable, runs last)
        ├── 90-file-naming.md
        ├── 91-accessibility.md
        ├── 92-dark-mode.md
        ├── 93-pairings-forbidden.md
        ├── 94-governance.md
        └── 95-quick-reference.md
```

## How to use this set

### As a human

Start at `docs/00-index.md`. Read the foundation tier (`01` through `04`) to absorb positioning, identity, voice. Then `docs/95-quick-reference.md` for the one-page cheat sheet. Drop into specific specs as needed.

### As an LLM orchestrator

1. Read `docs/00-index.md` to get the execution graph and parallel batch plan.
2. For any requested artifact, check the frontmatter of the most relevant spec doc to see dependencies.
3. Pull in dependent docs as context.
4. Produce the artifact.
5. Verify against the `## Acceptance` section at the bottom of each doc.

### As a designer or developer building product

1. Pin `docs/95-quick-reference.md` to your second monitor.
2. Import `green-pm-tokens.css`, then `modes.css`, then `base.css`, then Tailwind utilities (order matters).
3. Set `data-audience` on `<body>` to one of five values (see `docs/11-audience-modes.md`).
4. Use only tokens; never raw hex, never raw px outside the scale.
5. If something is missing from the system, file a change proposal per `docs/94-governance.md`.

## Quick triage (30 seconds)

When producing an artifact, check:

1. Color is a named token (Cedar, Ink, Cream, Paper, Stone, Clay, Sky).
2. Font is Geist (UI) or Newsreader (prose) or Fraunces italic (signature only).
3. Spacing is on the 4px scale.
4. Touch targets are 44px minimum.
5. One primary CTA per view.
6. No pure black, no pure white, no Inter, no JetBrains Mono, no gradients on brand surfaces.

Full forbidden list: `docs/93-pairings-forbidden.md`.

## Governance summary

- Every locked doc requires a change proposal to modify. See `docs/94-governance.md` for the proposal template.
- Annual review every January.
- Exception log: `docs/exceptions.md` (created as needed).
- Deprecation log: `docs/deprecations.md` (created as needed).
- Version bumps follow semantic versioning adapted for design specs.

## Files outside this package

The following live in companion repositories and are referenced but not contained here:

- Astro site code: `green-pm-site/` repo.
- Sanity studio: `green-pm-studio/` repo (schemas defined in `docs/85-sanity-schemas.md`).
- Operations docs: `green-pm-operations/` repo.
- Legal document content: owned by counsel; presentation governed by `docs/72-document-templates.md`.
