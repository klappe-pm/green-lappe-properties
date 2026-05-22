# Green Lappe Properties Agent Instructions

These project-local instructions augment the user's global Codex, Claude, Warp, and Gemini rules. They do not override the global passoff location, naming, or safety rules.

## Startup

- Read the newest file in `docs/passoffs/` before making changes.
- Surface the passoff's `Next actions` and `Do not do` sections to the user before starting work.
- Read `README.md` and `.claude/information-architecture.md` before creating, moving, or renaming durable project files.

## Current Project Boundaries

- Treat this repo as a documentation, launch-prep, and decision-support corpus.
- Keep launch readiness and operations backlog items open until the user supplies the needed owner, broker, counsel, account-owner, vendor, or market-conversation input.
- Do not invent decisions, credentials, public launch approvals, legal conclusions, insurance requirements, trust-accounting requirements, vendor commitments, or discovery-call findings.
- Do not buy domains, configure DNS, connect hosting, publish production content, or commit registrar credentials, receipts, personal registrant data, payment details, recovery codes, counsel memos, license documents, or sensitive screenshots.
- Do not treat design-system, launch, domain, trademark, registrar, storage, or runbook material as legal, trademark, licensing, tax, insurance, privacy, cybersecurity, or records-retention advice.

## File Placement And Validation

- Preserve the information architecture in `.claude/information-architecture.md`.
- Update `README.md` when a top-level zone changes meaning or a new durable zone is added.
- Update local indexes when adding durable launch, opportunities, or design-system files.
- Put durable user-flow, user-journey, service-blueprint, and Mermaid UX diagram artifacts in `docs/uxd/`.
- Use the repo's YAML frontmatter conventions for durable Markdown documents.
- Run `node "$(git rev-parse --show-toplevel)/.claude/evaluate-ia-change.mjs" --staged` before claiming a change is ready.

## Git And Branch Hygiene

- Work from the default branch unless the user asks otherwise, then create a short-lived feature branch.
- Commit, push, create a PR, record the PR URL in the passoff, merge only when allowed by GitHub, and sync the local default branch before reporting completion.
- Delete stale local or remote branches only when their tips are already merged into `main` or GitHub reports their PRs merged. Ask before deleting unmerged branches.
- Before deleting stale branches, prune remotes and verify branch merge status against `main` or merged GitHub PRs.
- Do not use `--no-verify`, force-push, reset, or bypass branch protections.

## Passoff

- Follow `~/.claude/PASSOFF.md` exactly.
- Passoffs live in `docs/passoffs/` and use `yyyy-MM-dd-HHmm-passoff-file.md` in America/Los_Angeles time.
- Required sections, in order: `Summary`, `Files changed`, `Key decisions`, `Risks and open questions`, `Lessons learned`, `State`, `Next actions`, `Do not do`.
