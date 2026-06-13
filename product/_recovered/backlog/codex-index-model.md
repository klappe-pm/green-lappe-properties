---
domain: green-property-management
category: opportunity-materials
sub-category: codex-index
date-created: 2026-05-19
date-revised: 2026-05-22
doc-type: operating-model
version: 0.1
doc-status: draft
aliases: []
tags: [codex, index, corpus]
---

# Codex Index Model

This model is for a second Codex session that needs to re-index the project quickly without re-reading every file in full.

## Bootstrap Commands

No generated corpus index is active. Archived deck tooling is non-live and
must not be used as a bootstrap dependency unless a future task rebuilds a new
tool in an active canonical zone.

For current orientation, read:

1. `README.md`
2. `docs/uxr/reports/effort-6/final-report.md`
3. `docs/uxr/green-property-management-market-deep-dive.md`
4. `docs/gtm/Launch Prioritization.md`
5. `docs/marketing/founder-bios/Kevin-Lappe-Resume.txt`

## Source Classes

| Class | Definition | Examples |
|---|---|---|
| `primary-synthesis` | Should be read first; contains synthesized conclusions. | README, effort-6 final report, TAM docs, launch prioritization, pitch prep. |
| `supporting-analysis` | Supports one part of the story with detailed evidence. | pain points, user journey, competitor reports, FCC strategy, metrics docs. |
| `data-table` | Machine-readable source data or scored output. | CSV, TSV, JSON, GeoJSON, YAML schemas. |
| `metric-definition` | Defines a metric used for operations, competitors, or future eval. | `docs/uxr/metrics/pm-competitor-metrics/`. |
| `process-or-backlog` | Workflow, backlog, passoff, project management. | backlog, status updates, passoffs. |
| `opportunity-output` | Future partner materials created in active zones. | marketing collateral, GTM summaries, founder-facing source files. |

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
| Team thesis | `docs/marketing/founder-bios/Kevin-Lappe-Resume.txt` | Launch and GTM docs that describe the current operating model. |
| FCC wedge | `docs/strategies/market/Family Child Care (FCC).md` | `docs/uxr/reports/effort-6/top-10-daycare-conversion-zips.md` |
| Metrics | `docs/uxr/metrics/Northstar-Leased Months.md` | `docs/uxr/metrics/Key Property Management Metrics-MoC.md` |

## Conflict Rules

- The launch memo controls launch sequencing.
- The TAM memo controls broad full-stock TAM.
- The non-institutional PM market memo controls practical PM SAM/SOM and competitor fragmentation.
- Effort-6 controls ZCTA ranking and sensitivity.
- Retired pitch and deck material does not control active claims. Rebuild any needed claim spine from active research, GTM, launch, UXD, and marketing files.
