---
domain: green-lappe-properties
category: configuration
sub-category: readme
date-created: 2026-05-18
date-revised: 2026-05-20
doc-type: readme
version: 0.1
doc-status: draft
aliases: []
tags: []
---

# green-lappe-properties

Working repository for Green Lappe Properties — a King + Snohomish County, Washington property management and acquisition entity built around a dual-use thesis (long-term rental and licensed daycare conversion). This repo holds the research, strategy, GTM, and operating artifacts that drive sub-market sequencing, acquisition shortlists, and service-design priorities.

## Thesis in one paragraph

Concentrate property-management entry on Eastside and central-Seattle ZIPs where multilingual screening (Mandarin, Hindi, Telugu, Russian/Ukrainian) is an uncontested moat against incumbent PMs; acquire small-portfolio rentals in top-school Eastside ZIPs (98074, 98075, 98029) and yield-mispriced rural-east edges (98024, 98045, 98050); structure the acquisition entity as a natural-person LLC on day one to preserve HB 1217's small-landlord exemption. See [docs/research/reports/effort-6/final-report.md](docs/research/reports/effort-6/final-report.md) for the synthesized rankings.

## Repo layout

| Folder | Summary |
| --- | --- |
| [`docs/`](docs/) | Main working corpus for research, strategy, planning, status, and partner materials. |
| [`docs/backlog/`](docs/backlog/) | Append-only backlog and backlink companion notes for project work and repo hygiene. |
| [`docs/design/`](docs/design/) | Brand, persona, pain-point, and journey artifacts that shape the service experience. |
| [`docs/fund/`](docs/fund/) | Capital-raise, market opportunity, and financial-model interpretation materials. |
| [`docs/gtm/`](docs/gtm/) | Go-to-market plans, launch sequencing, and prioritization logic. |
| [`docs/insights/`](docs/insights/) | Dated synthesized insight notes pulled out of broader research work. |
| [`docs/marketing/`](docs/marketing/) | Marketing collateral and founder-facing materials. |
| [`docs/marketing/founder-bios/`](docs/marketing/founder-bios/) | Founder biography and resume source material. |
| [`docs/opportunities/`](docs/opportunities/) | Partner-readiness package: briefs, deck source, generated indexes, and opportunity narrative. |
| [`docs/opportunities/decks/`](docs/opportunities/decks/) | PowerPoint deck variants and deck archive material pending canonical-deck selection. |
| [`docs/passoffs/`](docs/passoffs/) | Session handoff files governed by `~/.claude/PASSOFF.md`. |
| [`docs/plans/`](docs/plans/) | Forward plans and execution plans for moving the project from research to operating proof. |
| [`docs/questions/`](docs/questions/) | Open research and decision questions. |
| [`docs/research/`](docs/research/) | Research source tree for market, demographic, regulatory, scoring, and unit-economics work. |
| [`docs/research/competitors/`](docs/research/competitors/) | Competitor and small-owner property-management market analyses. |
| [`docs/research/metrics/`](docs/research/metrics/) | Metric definitions, north-star metric notes, and competitor metric glossary entries. |
| [`docs/research/plans/`](docs/research/plans/) | Research plans and promptable research scopes. |
| [`docs/research/prompts/`](docs/research/prompts/) | Prompts used to drive or reproduce research efforts. |
| [`docs/research/references/`](docs/research/references/) | Methodology, glossary, and reference material for interpreting research outputs. |
| [`docs/research/reports/`](docs/research/reports/) | The 7-effort analytical output, including the final scoring synthesis and supporting datasets. |
| [`docs/research/unit-economics/`](docs/research/unit-economics/) | TAM, CAC, and related economics models. |
| [`docs/roadmap/`](docs/roadmap/) | Product and business roadmap area. |
| [`docs/status/`](docs/status/) | Dated project and repo status reports. |
| [`docs/strategies/`](docs/strategies/) | Strategic frameworks and wedges, including DHM, FCC, marketplace, and validation strategy. |
| [`outputs/`](outputs/) | Generated or exported analytical outputs, including workbook artifacts. |
| [`project-management/`](project-management/) | Legacy project-management history and meta-analysis notes. |
| [`project-management/meta/`](project-management/meta/) | Meta-analysis artifacts and project retrospectives. |

## Research deliverable: the 7 efforts

The core analytical output lives under [`docs/research/reports/`](docs/research/reports/). Each effort folder contains a narrative, schema, and CSV/geojson data. Effort 6 is the synthesis layer; the others feed it.

| Effort | Topic | Key output |
| --- | --- | --- |
| 0 | Geographic foundation — 107 in-scope ZCTAs, jurisdiction crosswalks | [`effort-0-narrative.md`](docs/research/reports/effort-0/effort-0-narrative.md), `zip-master.csv` |
| 1 | Schools, attendance boundaries, ratings | [`effort-1-narrative.md`](docs/research/reports/effort-1/effort-1-narrative.md), [`boundary-change-watchlist.md`](docs/research/reports/effort-1/boundary-change-watchlist.md) |
| 2 | Housing, rents, ADU permits, supply pipeline | [`effort-2-narrative.md`](docs/research/reports/effort-2/effort-2-narrative.md), `permits-adu-dadu.csv` |
| 3 | Demographics, refugees, visa cohorts, languages | [`effort-3-narrative.md`](docs/research/reports/effort-3/effort-3-narrative.md), `demographics-zip.csv` |
| 4 | Tech employers, compensation, LCA, layoff cycle response | [`effort-4-narrative.md`](docs/research/reports/effort-4/effort-4-narrative.md), [`layoff-cycle-response.md`](docs/research/reports/effort-4/layoff-cycle-response.md) |
| 5 | Childcare supply, zoning, rental-reg matrix, exogenous risks | [`effort-5-narrative.md`](docs/research/reports/effort-5/effort-5-narrative.md), [`exogenous-risks.md`](docs/research/reports/effort-5/exogenous-risks.md), [`pending-ordinances.md`](docs/research/reports/effort-5/pending-ordinances.md) |
| 6 | Synthesis, scoring, sensitivity, shortlists | [`final-report.md`](docs/research/reports/effort-6/final-report.md), [`hypothesis-resolution.md`](docs/research/reports/effort-6/hypothesis-resolution.md), top-10 lists, [`sensitivity-analysis.md`](docs/research/reports/effort-6/sensitivity-analysis.md) |

The driving plan is [`docs/research/plans/Demographic Research Plan.md`](docs/research/plans/Demographic%20Research%20Plan.md). Reports methodology and metrics glossary live under [`docs/research/references/`](docs/research/references/).

## Headline outputs to read first

1. **[final-report.md](docs/research/reports/effort-6/final-report.md)** — three composite scores over 107 ZCTAs, dual-use shortlist, caveats.
2. **[top-10-pm-sub-markets.md](docs/research/reports/effort-6/top-10-pm-sub-markets.md)** — sub-market sequencing (98052 and 98109 are Δrank-stable; commit-grade).
3. **[top-10-rental-acquisition-zips.md](docs/research/reports/effort-6/top-10-rental-acquisition-zips.md)** — Eastside top-school cluster; school composite is multi-zone-averaged for 7 of 10, validate at parcel.
4. **[top-10-daycare-conversion-zips.md](docs/research/reports/effort-6/top-10-daycare-conversion-zips.md)** — sensitivity-fragile; HOA CC&R parcel-check mandatory before underwriting.
5. **[mismatch-analysis.md](docs/research/reports/effort-6/mismatch-analysis.md)** — Quadrant A (high-school / low-rent buy candidates: 98024, 98045, 98050, 98025, 98051) is the cherry-pick set the headline rankings miss.
6. **[hypothesis-resolution.md](docs/research/reports/effort-6/hypothesis-resolution.md)** — 10 validated / 2 partial / 2 refuted / 3 inconclusive; H3 (visa geography) and H11 (Eastside median income) are notable refutations.

## Workflow

- Session handoff is governed by `~/.claude/PASSOFF.md`. Passoffs land in [`docs/passoffs/`](docs/passoffs/). Resume the next session with `/resume`; close it with `/pass`.
- Backlog items go in [`docs/backlog/backlog.md`](docs/backlog/backlog.md) via the `/backlog` command (tags: `type:`, `priority:`, `area:`).
- Status reports land in [`docs/status/`](docs/status/) using the dated `YYYY-MM-DD-status-report.md` or `YYYY-MM-DD-HHMM-status-update.md` convention. Historical status updates have been migrated there from `project-management/status-updates/`.
- Forward plans land in [`docs/plans/`](docs/plans/) using the dated `YYYY-MM-DD-<slug>.md` convention.

## Conventions

- Markdown files use the `base-yaml` frontmatter defined in `~/.claude/rules/markdown-frontmatter.md` (domain, category, sub-category, date-created, date-revised, aliases, tags). Research artifacts add `doc-type`, `version`, `doc-status`, and `llm-*` fields.
- All dates are `yyyy-MM-dd` (America/Los_Angeles).
- ZIPs are referenced as 5-digit ZCTAs throughout. Where ZCTA-level data is unavailable, the underlying field is flagged in the schema's `provenance` block.

## Out of scope

Pierce County, Kitsap County, and Eastern Washington. Commercial real estate. Institutional multifamily ≥ 50 units without small-owner LLC structure. Post-secondary education. Preschool data not tied to licensed childcare.
