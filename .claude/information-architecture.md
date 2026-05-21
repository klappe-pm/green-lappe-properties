# Green Lappe Information Architecture Plan

## Purpose

This file defines the repository information architecture (IA) that future agents must preserve when adding, moving, or editing project artifacts. The repo is a working corpus for Green Lappe Properties: research, strategy, launch planning, brand/design-system material, operating runbooks, and session passoffs.

The IA is intentionally file-system native. A future reader, agent, or pre-commit hook must be able to infer where a document belongs from its path, filename, frontmatter, and local index updates without relying on memory or private chat context.

## Current IA Review

The tracked worktree was clean at the start of this IA review on 2026-05-21. Do not use untracked files as IA precedent until they are intentionally staged and evaluated. The repository is documentation-heavy and uses `README.md` as the top-level folder map. High-control areas already have local indexes:

- `docs/design-system/README.md` and `docs/design-system/docs/00-index.md` govern design-system specs and assets.
- `docs/launch/README.md` governs launch plans, legal gates, discovery guides, references, and runbooks.
- `docs/opportunities/README.md` governs partner-readiness materials, decks, source indexes, and presentation inputs.
- `docs/passoffs/` is governed by the cross-agent passoff contract in `~/.claude/PASSOFF.md`.

The main IA risk is not missing content. It is drift: new files landing in plausible but unindexed places, legacy naming patterns continuing to spread, launch/legal-adjacent material bypassing gates, or design-system docs being added without updating the numbered execution graph.

## Canonical Zones

All durable project material belongs under one of these zones:

| Path | Role | Placement rule |
| --- | --- | --- |
| `README.md` | Repository orientation and top-level IA map | Update when a top-level docs zone changes meaning or a new durable zone is added. |
| `.claude/` | Project-local agent rules, evaluators, and deterministic workflow guidance | Keep executable checks here when they are project-specific and not product code. |
| `.githooks/` | Versioned Git hooks for this project | Keep hook wrappers small; delegate policy logic to `.claude/` evaluators. |
| `docs/research/` | Market, demographic, regulatory, scoring, and unit-economics source work | Use subfolders for plans, prompts, references, metrics, competitors, reports, and unit economics. |
| `docs/insights/` | Dated synthesized insight notes | Use dated filenames and link back to supporting research. |
| `docs/branding/` | Superseded or companion brand-system source material | Do not confuse with the locked canonical design-system package. |
| `docs/design-system/` | Canonical Green PM design-system package | Follow the numbered spec, frontmatter, dependency, output, and governance contracts. |
| `docs/opportunities/` | Partner-readiness materials and presentation source package | Update the local README when adding durable deliverables or generated indexes. |
| `docs/launch/` | Launch execution plans, gates, references, discovery guides, and runbooks | Keep public launch boundaries and sensitive-evidence exclusions explicit. |
| `docs/backlog/` | Append-only work backlog and companion notes | Do not use as a dumping ground for active plans that have a better canonical zone. |
| `docs/status/` | Dated status reports and updates | Use status-report or status-update filename conventions. |
| `docs/passoffs/` | Cross-agent session handoffs | Use the required passoff filename and section contract exactly. |
| `docs/financial/` | Financial-model workbooks and financial artifacts | Keep model files here; do not mix with market narrative docs. |
| `docs/gtm/` | Go-to-market plans and prioritization logic | Use when the content is about market motion, not launch mechanics. |
| `docs/strategies/` | Strategy frameworks and strategic wedges | Use for reusable strategic models rather than dated execution plans. |
| `docs/uxd/` | Personas, journeys, and service-experience artifacts | Use for user experience framing and journey evidence. |
| `docs/marketing/` | Collateral and founder-facing material | Use subfolders for durable source material such as founder bios. |
| `docs/meta/` | Meta-analysis, retrospectives, and project-level reflection | Use for repo/process reflection, not operating status. |
| `docs/_archive/` | Superseded artifacts retained for history | Never make this the primary home for active work. |

Do not create new durable top-level zones unless the repository `README.md` is updated in the same change and the zone has a distinct role that cannot fit the table above.

## Deterministic Requirements

These requirements are enforceable at change time. They intentionally avoid subjective quality scoring.

1. Every changed durable file must live under an allowed top-level path: `README.md`, `.claude/`, `.githooks/`, `.gitignore`, or `docs/`.
2. Every changed file under `docs/` must live in an allowed canonical docs zone.
3. `.DS_Store` and other OS metadata files must never be part of a change.
4. Filenames added under `docs/` must use lowercase kebab-case, with approved exceptions for `README.md`, design-system numbered specs, dated status files, dated launch files, and passoff files.
5. New Markdown documents outside `docs/passoffs/`, `docs/_archive/`, and `docs/design-system/` must include YAML frontmatter with at least `domain`, `category`, `sub-category`, `date-created`, `date-revised`, `aliases`, and `tags`.
6. Frontmatter dates must use `yyyy-MM-dd`.
7. New files under `docs/passoffs/` must be named `yyyy-MM-dd-HHmm-passoff-file.md` and include the required sections in order: `Summary`, `Files changed`, `Key decisions`, `Risks and open questions`, `State`, `Next actions`, `Do not do`.
8. New files under `docs/design-system/docs/` must be named `NN-kebab-slug.md`, must have an H1 matching the filename stem, and must declare `domain: brand`, `category: design-system`, and `version: 3.0.0` in frontmatter.
9. Adding a design-system numbered spec requires updating both `docs/design-system/docs/00-index.md` and `docs/design-system/docs/96-numbering-convention.md` in the same change.
10. Adding a durable launch Markdown file requires updating `docs/launch/README.md` unless the added file is itself a local README.
11. Adding a durable opportunities Markdown file requires updating `docs/opportunities/README.md` unless the added file is itself a local README.
12. Sensitive launch or legal-adjacent evidence must not be committed. Paths containing credentials, secrets, recovery codes, payment details, receipts, counsel memos, license documents, or sensitive screenshots fail IA evaluation.
13. The IA evaluator is scoped to changed files. It does not attempt to clean up legacy filenames unless those files are newly added, copied, or renamed in the current change.

## Placement Decision Tree

Use this order before creating a file:

1. Is it a session handoff? Put it in `docs/passoffs/`.
2. Is it launch execution, account-owner action, public-release gating, domain/DNS, legal gate tracking, discovery, or runbook material? Put it in `docs/launch/`.
3. Is it a locked or proposed design-system spec, token, CSS, Tailwind config, or component-governance artifact? Put it in `docs/design-system/`.
4. Is it a partner conversation package, deck source, opportunity memo, claim spine, or presentation index? Put it in `docs/opportunities/`.
5. Is it raw or synthesized market research? Put it in `docs/research/` or `docs/insights/` depending on whether it is source work or extracted insight.
6. Is it status, backlog, GTM, strategy, UX, marketing, financial, or meta work? Use the matching canonical zone.
7. If none of the above fits, update this IA plan and `README.md` before adding a new zone.

## Project Pre-Commit Hook

This repository has a versioned project hook at `.githooks/pre-commit`. Configure a checkout to use project hooks with:

```bash
git config core.hooksPath .githooks
```

The hook runs this IA evaluation before every commit:

```bash
node "$(git rev-parse --show-toplevel)/.claude/evaluate-ia-change.mjs" --staged
```

The command evaluates the staged change only. It exits `0` when IA requirements pass and non-zero when the change violates deterministic IA rules, which blocks the commit.

To evaluate an already committed range, use:

```bash
node "$(git rev-parse --show-toplevel)/.claude/evaluate-ia-change.mjs" --range main..HEAD
```
