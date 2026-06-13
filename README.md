---
domain: green-property-management
category: configuration
sub-category: readme
date-created: 2026-05-18
date-revised: 2026-06-12
doc-type: readme
version: 0.1
doc-status: draft
aliases: []
tags: []
---

# Green Property Management

Working repository for Green Property Management — a King + Snohomish County, Washington property management and acquisition entity built around a dual-use thesis (long-term rental and licensed daycare conversion). This repo holds the research, strategy, GTM, and operating artifacts that drive sub-market sequencing, acquisition shortlists, and service-design priorities.

## Thesis in one paragraph

Concentrate property-management entry on Eastside and central-Seattle ZIPs where multilingual screening (Mandarin, Hindi, Telugu, Russian/Ukrainian) is an uncontested moat against incumbent PMs; acquire small-portfolio rentals in top-school Eastside ZIPs (98074, 98075, 98029) and yield-mispriced rural-east edges (98024, 98045, 98050); structure the acquisition entity as a natural-person LLC on day one to preserve HB 1217's small-landlord exemption. See [product/design/uxr/reports/effort-6/final-report.md](final-report.md) for the synthesized rankings.

## Current operating status

The repo is in documentation, launch-prep, and decision-support mode. The GitHub PR queue is clean as of the latest handoff, and active work is tracked in [product/backlog/backlog.md](green-lappe-properties/product/backlog.md). Launch readiness and operations items remain blocked until the user supplies owner, broker, counsel, account-owner, vendor, or market-conversation input; agents should not invent those decisions or evidence to close backlog items.

## Repo layout

| Folder | Summary |
| --- | --- |
| [`CLAUDE.md`](green-lappe-properties/CLAUDE.md) | Canonical project-local instruction file (Claude Code only). |
| [`LLM-BREADCRUMBS.md`](green-lappe-properties/LLM-BREADCRUMBS.md) | Low-token navigation pointer back to this project root, local passoff history, and the canonical session-data breadcrumb implementation. |
| [`.claude/`](.claude/) | Project-local IA policy, validation logic, and deterministic workflow guidance. |
| [`docs/`](docs/) | Main working corpus for research, strategy, planning, status, and partner materials. |
| [`product/backlog/`](product/backlog/) | Append-only backlog and backlink companion notes for project work and repo hygiene. |
| [`product/branding/`](product/branding/) | Brand-system source files, style guide material, tokens, schemas, and implementation references. |
| [`product/gtm/`](product/gtm/) | Go-to-market plans, launch sequencing, and prioritization logic. |
| [`product/launch/`](product/launch/) | Canonical launch execution folder for business launch plans, legal gates, discovery guides, and launch references. |
| [`product/launch/plans/`](product/launch/plans/) | Dependency-ordered launch plans and critical-path task sequencing. |
| [`product/launch/legal/`](product/launch/legal/) | Launch-readiness, licensing, trust-accounting, and legal-gate checklists. |
| [`product/launch/discovery/`](product/launch/discovery/) | Owner discovery guides, scripts, and proof-sprint discovery artifacts. |
| [`product/launch/references/`](product/launch/references/) | Launch-specific reference notes and source-link summaries. |
| [`product/content/marketing/`](product/content/marketing/) | Marketing collateral and founder-facing materials. |
| [`product/content/marketing/founder-bios/`](product/content/marketing/founder-bios/) | Founder biography and resume source material. |
| [`docs/financial/`](docs/financial/) | Financial-model workbook artifacts. |
| [`docs/passoffs/`](docs/passoffs/) | Session handoff files governed by `~/.claude/PASSOFF.md`. |
| [`product/prompts/`](product/prompts/) | Reusable project, repo, and agent scaffolding prompts. |
| [`docs/roadmap/`](docs/roadmap/) | Product and business roadmap area. |
| [`product/status/`](product/status/) | Dated project and repo status reports. |
| [`product/strategies/`](product/strategies/) | Strategic frameworks and wedges; active market frameworks live under `product/strategies/market/`. |
| [`product/design/uxd/`](product/design/uxd/) | Persona, pain-point, journey, user-flow, and Mermaid service-experience artifacts. |
| [`product/design/uxd/design-system/`](product/design/uxd/design-system/) | Canonical design-system documentation for identity, voice, tokens, components, UX, accessibility, governance, and implementation architecture. |
| [`product/design/uxr/`](product/design/uxr/) | User and market research source tree for demographics, competitors, metrics, scoring, and unit economics. |
| [`product/design/uxr/competitors/`](product/design/uxr/competitors/) | Competitor and small-owner property-management market analyses. |
| [`product/design/uxr/metrics/`](product/design/uxr/metrics/) | Metric definitions, north-star metric notes, and competitor metric glossary entries. |
| [`product/design/uxr/plans/`](product/design/uxr/plans/) | Research plans and promptable research scopes. |
| [`product/design/uxr/prompts/`](product/design/uxr/prompts/) | Prompts used to drive or reproduce research efforts. |
| [`product/design/uxr/references/`](product/design/uxr/references/) | Methodology, glossary, and reference material for interpreting research outputs. |
| [`product/design/uxr/reports/`](product/design/uxr/reports/) | The 7-effort analytical output, including the final scoring synthesis and supporting datasets. |
| [`product/design/uxr/unit-economics/`](product/design/uxr/unit-economics/) | TAM, CAC, and related economics models. |

## Research deliverable: the 7 efforts

The core analytical output lives under [`product/design/uxr/reports/`](product/design/uxr/reports/). Each effort folder contains a narrative, schema, and CSV/geojson data. Effort 6 is the synthesis layer; the others feed it.

| Effort | Topic | Key output |
| --- | --- | --- |
| 0 | Geographic foundation — 107 in-scope ZCTAs, jurisdiction crosswalks | [`effort-0-narrative.md`](effort-0-narrative.md), `zip-master.csv` |
| 1 | Schools, attendance boundaries, ratings | [`effort-1-narrative.md`](effort-1-narrative.md), [`boundary-change-watchlist.md`](boundary-change-watchlist.md) |
| 2 | Housing, rents, ADU permits, supply pipeline | [`effort-2-narrative.md`](effort-2-narrative.md), `permits-adu-dadu.csv` |
| 3 | Demographics, refugees, visa cohorts, languages | [`effort-3-narrative.md`](effort-3-narrative.md), `demographics-zip.csv` |
| 4 | Tech employers, compensation, LCA, layoff cycle response | [`effort-4-narrative.md`](effort-4-narrative.md), [`layoff-cycle-response.md`](layoff-cycle-response.md) |
| 5 | Childcare supply, zoning, rental-reg matrix, exogenous risks | [`effort-5-narrative.md`](effort-5-narrative.md), [`exogenous-risks.md`](exogenous-risks.md), [`pending-ordinances.md`](pending-ordinances.md) |
| 6 | Synthesis, scoring, sensitivity, shortlists | [`final-report.md`](final-report.md), [`hypothesis-resolution.md`](hypothesis-resolution.md), top-10 lists, [`sensitivity-analysis.md`](sensitivity-analysis.md) |

The driving plan is [`product/design/uxr/plans/Demographic Research Plan.md`](Demographic%20Research%20Plan.md). Reports methodology and metrics glossary live under [`product/design/uxr/references/`](product/design/uxr/references/).

## Headline outputs to read first

1. **[final-report.md](final-report.md)** — three composite scores over 107 ZCTAs, dual-use shortlist, caveats.
2. **[top-10-pm-sub-markets.md](top-10-pm-sub-markets.md)** — sub-market sequencing (98052 and 98109 are Δrank-stable; commit-grade).
3. **[top-10-rental-acquisition-zips.md](top-10-rental-acquisition-zips.md)** — Eastside top-school cluster; school composite is multi-zone-averaged for 7 of 10, validate at parcel.
4. **[top-10-daycare-conversion-zips.md](top-10-daycare-conversion-zips.md)** — sensitivity-fragile; HOA CC&R parcel-check mandatory before underwriting.
5. **[mismatch-analysis.md](mismatch-analysis.md)** — Quadrant A (high-school / low-rent buy candidates: 98024, 98045, 98050, 98025, 98051) is the cherry-pick set the headline rankings miss.
6. **[hypothesis-resolution.md](hypothesis-resolution.md)** — 10 validated / 2 partial / 2 refuted / 3 inconclusive; H3 (visa geography) and H11 (Eastside median income) are notable refutations.
7. **[user-flow-and-experience-diagrams.md](user-flow-and-experience-diagrams.md)** — standalone Mermaid.js user-flow, service-blueprint, and experience-recovery diagrams for renter, owner, and PM staff journeys.

## Workflow

- Session handoff is governed by `~/.claude/PASSOFF.md`. Passoffs land in [`docs/passoffs/`](docs/passoffs/). Resume the next session with `/resume`; close it with `/pass`.
- Project-local instructions live in [`CLAUDE.md`](green-lappe-properties/CLAUDE.md), the single canonical instruction file (Claude Code only).
- Backlog items go in [`product/backlog/backlog.md`](green-lappe-properties/product/backlog.md) via the `/backlog` command (tags: `type:`, `priority:`, `area:`).
- Status reports land in [`product/status/`](product/status/) using the dated `YYYY-MM-DD-status-report.md` or `YYYY-MM-DD-HHMM-status-update.md` convention. Historical status updates have been migrated there from `project-management/status-updates/`.
- Launch execution documents land in [`product/launch/`](product/launch/) under `plans/`, `legal/`, `discovery/`, or `references/`.
- Project, repo, and agent scaffolding prompts land in [`product/prompts/`](product/prompts/); the global Claude `/new-project-scaffolding` command and `new-project-scaffolding` skill are the executable workflow. Research prompts remain in [`product/design/uxr/prompts/`](product/design/uxr/prompts/).
- Research prompts land in [`product/design/uxr/prompts/`](product/design/uxr/prompts/) using descriptive slug names.
- UX and service-experience diagrams land in [`product/design/uxd/`](product/design/uxd/) using lowercase kebab-case filenames and Mermaid blocks where diagrams are useful.
- Branch hygiene: keep `main` synced after PR merge, and delete merged feature/passoff branches once their work is present on `main`.

## Conventions

- Markdown files use the `base-yaml` frontmatter defined in `~/.claude/rules/markdown-frontmatter.md` (domain, category, sub-category, date-created, date-revised, aliases, tags). Research artifacts add `doc-type`, `version`, `doc-status`, and `llm-*` fields.
- All dates are `yyyy-MM-dd` (America/Los_Angeles).
- ZIPs are referenced as 5-digit ZCTAs throughout. Where ZCTA-level data is unavailable, the underlying field is flagged in the schema's `provenance` block.
- Archive folders whose names start with `_` are non-live. Do not use archive files as dependencies, blockers, or source-of-truth inputs for active work.

## Out of scope

Pierce County, Kitsap County, and Eastern Washington. Commercial real estate. Institutional multifamily ≥ 50 units without small-owner LLC structure. Post-secondary education. Preschool data not tied to licensed childcare.
