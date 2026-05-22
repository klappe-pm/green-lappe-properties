---
domain: green-lappe-properties
category: opportunity-materials
sub-category: codex-index
date-created: 2026-05-19
date-revised: 2026-05-19
doc-type: operating-model
version: 0.1
doc-status: draft
aliases: []
tags: [codex, index, corpus]
---

# Codex Index Model

This model is for a second Codex session that needs to re-index the project quickly without re-reading every file in full.

## Bootstrap Commands

The old opportunity index builder now lives under
`docs/_archive/decks/_tools/build-corpus-index.mjs` and still reflects the
retired `docs/opportunities/` layout. Do not use it as an active bootstrap
without first updating its path classifier.

For current orientation, read:

1. `README.md`
2. `docs/uxr/reports/effort-6/final-report.md`
3. `docs/uxr/green-lappe-market-deep-dive.md`
4. `docs/_archive/green-lappe-opportunity-2-pager.md`
5. `docs/_archive/decks/partner-pitch-deck-source.md`

## Source Classes

| Class | Definition | Examples |
|---|---|---|
| `primary-synthesis` | Should be read first; contains synthesized conclusions. | README, effort-6 final report, TAM docs, launch prioritization, pitch prep. |
| `supporting-analysis` | Supports one part of the story with detailed evidence. | pain points, user journey, competitor reports, FCC strategy, metrics docs. |
| `data-table` | Machine-readable source data or scored output. | CSV, TSV, JSON, GeoJSON, YAML schemas. |
| `metric-definition` | Defines a metric used for operations, competitors, or future eval. | `docs/uxr/metrics/pm-competitor-metrics/`. |
| `process-or-backlog` | Workflow, backlog, passoff, project management. | backlog, status updates, passoffs. |
| `opportunity-output` | Generated partner materials in this folder. | two-pager, market deep dive, deck source, style guide. |

## Retrieval Strategy

Use a claim-first retrieval model:

1. Identify the claim.
2. Query the generated JSON for likely files by title, headings, tags, and class.
3. Read only the smallest source span that supports or challenges the claim.
4. If a number has multiple sources, prefer the more specific and later synthesis doc.
5. If a source says `MODELED`, preserve that label in downstream materials.

## Canonical Claim Pointers

| Claim area | Start here | Then read |
|---|---|---|
| Market size | `docs/uxr/unit-economics/Total Addressable Market (TAM).md` | `docs/uxr/competitors/Non-Institutional Small Landlord PM Market, King and Snohomish Counties.md` |
| PM market fragmentation | `docs/uxr/competitors/Non-Institutional Small Landlord PM Market, King and Snohomish Counties.md` | `docs/uxr/competitors/Independent Property Management Companies, King and Snohomish Counties.md` |
| Launch sequencing | `docs/gtm/Launch Prioritization.md` | `docs/uxr/reports/effort-6/final-report.md` |
| Pain points | `docs/uxd/PNW Property Management Pain Points - Three Personas, One Broken Middle.md` | `docs/uxd/User Journey Map v1.md` |
| Team thesis | `docs/_archive/Pitch Deck Prep v.1.md` | `docs/marketing/founder-bios/Kevin-Lappe-Resume.txt` |
| FCC wedge | `docs/strategies/market/Family Child Care (FCC).md` | `docs/uxr/reports/effort-6/top-10-daycare-conversion-zips.md` |
| Metrics | `docs/uxr/metrics/Northstar-Leased Months.md` | `docs/uxr/metrics/Key Property Management Metrics-MoC.md` |

## Conflict Rules

- The launch memo controls launch sequencing.
- The TAM memo controls broad full-stock TAM.
- The non-institutional PM market memo controls practical PM SAM/SOM and competitor fragmentation.
- Effort-6 controls ZCTA ranking and sensitivity.
- Pitch Deck Prep controls the two-principal hypothesis but marks several items as gaps; do not treat gap sketches as validated facts.
