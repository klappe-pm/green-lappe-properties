---
domain: green-property-management
category: prompts
sub-category: project-scaffolding
date-created: 2026-06-07
date-revised: 2026-06-07
doc-type: prompt
version: 0.1
doc-status: draft
aliases: [Lapsauskas Properties scaffolding prompt]
tags: [prompt, scaffolding, lapsauskas-properties]
---

# lapsauskas-properties-scaffolding-prompt

Purpose: copy this prompt into a fresh Codex or Claude Code session whose
working directory is `/Users/kevinlappe/Projects/lapsauskas-properties`. It
asks the agent to scaffold the Lapsauskas Properties repository using the
history and operating lessons from this repo without copying Green Property
Management's business decisions, brand facts, or launch assumptions.

## Copyable prompt

````text
You are working in `/Users/kevinlappe/Projects/lapsauskas-properties`.

Scaffold the initial Lapsauskas Properties repository using
`/Users/kevinlappe/Projects/green-lappe-properties` as the process and
information-architecture reference. Use Green Property Management's history as
an operating pattern, not as business content to copy.

Before editing, read these source files from the Green repo:

- `/Users/kevinlappe/Projects/green-lappe-properties/README.md`
- `/Users/kevinlappe/Projects/green-lappe-properties/CLAUDE.md`
- `/Users/kevinlappe/Projects/green-lappe-properties/.claude/information-architecture.md`
- `/Users/kevinlappe/Projects/green-lappe-properties/.claude/evaluate-ia-change.mjs`
- `/Users/kevinlappe/Projects/green-lappe-properties/docs/backlog/backlog.md`
- `/Users/kevinlappe/Projects/green-lappe-properties/docs/launch/README.md`
- `/Users/kevinlappe/Projects/green-lappe-properties/docs/launch/plans/2026-05-20-business-launch-project-plan.md`
- `/Users/kevinlappe/Projects/green-lappe-properties/docs/launch/projects/2026-05-24-green-property-management-tasknotes-repository/2026-05-24-tasknotes-repository-index.md`
- `/Users/kevinlappe/Projects/green-lappe-properties/docs/branding/handoff/README.md`
- The newest passoff in `/Users/kevinlappe/Projects/green-lappe-properties/docs/passoffs/`
- `git -C /Users/kevinlappe/Projects/green-lappe-properties log --oneline --decorate -n 60`

Use these history-derived lessons:

- Treat the repo first as a documentation, research, launch-prep, and
  decision-support corpus. Do not build product code unless explicitly asked.
- Keep `README.md` as the orientation layer and top-level IA map.
- Keep project-local instructions in `CLAUDE.md`, including startup rules,
  passoff rules, launch-safety boundaries, and verification commands.
- Use `.claude/information-architecture.md` plus
  `.claude/evaluate-ia-change.mjs` as deterministic IA guardrails.
- Use `.githooks/pre-commit` only as a small wrapper that delegates to the IA
  evaluator.
- Put session handoffs in `docs/passoffs/` and require the sections:
  `Summary`, `Files changed`, `Key decisions`, `Risks and open questions`,
  `Lessons learned`, `State`, `Next actions`, and `Do not do`.
- Keep launch execution under `docs/launch/` with `plans/`, `legal/`,
  `discovery/`, `references/`, `runbooks/`, and `projects/`.
- Keep market/user research under `docs/uxr/`; preserve prompts for research in
  `docs/uxr/prompts/`.
- Keep reusable project or repo scaffolding prompts under `docs/prompts/`.
- Keep brand/design material separate from launch and research. Seed only a
  placeholder `docs/branding/` area until Lapsauskas-specific brand decisions
  exist.
- Keep active backlog items open when they depend on owner, broker, counsel,
  account-owner, vendor, market-conversation, or financing input.
- Use the TaskNotes pattern for durable launch tasks when the user wants
  Obsidian-compatible project tracking: one project note, one note per durable
  task, status tags, dependencies, evidence links, decisions, and verification
  gates.

Do not copy these Green-specific facts or assumptions into Lapsauskas
Properties unless I explicitly confirm them:

- Green Property Management, Green PM, Megan Green, `greenpmpnw.com`, pricing,
  named operators, licensing status, designated broker path, entity structure,
  trust-account choices, insurance posture, vendor choices, or public launch
  approvals.
- King/Snohomish launch geography, the Green PM market thesis, daycare/FCC
  wedge, ZIP rankings, research scores, brand colors, typography, voice rules,
  or product stack choices.
- Any sensitive evidence, registrar data, license records, legal memos,
  insurance documents, payment details, recovery codes, credentials, or personal
  registrant data.

If Lapsauskas-specific facts are unknown, write explicit `TBD` placeholders and
open questions. Do not invent legal, tax, licensing, insurance, brokerage,
trust-accounting, financing, acquisition, vendor, counsel, launch, domain, or
public-claims decisions. Mark those as blocked until I provide evidence or a
decision.

Create or update the scaffold with these files and folders:

- `README.md`
  - YAML frontmatter using `domain: lapsauskas-properties`.
  - One-paragraph project purpose with `TBD` placeholders where facts are
    unknown.
  - Current operating status.
  - Repo layout table.
  - Headline outputs to read first.
  - Workflow and conventions.
  - Out-of-scope section.
- `CLAUDE.md`
  - Canonical project-local instruction file.
  - Startup: read newest passoff, surface `Next actions` and `Do not do`, then
    read `README.md` and `.claude/information-architecture.md` before creating,
    moving, or renaming durable files.
  - Boundaries: this repo is documentation, launch-prep, research, and
    decision-support until user says otherwise.
  - Safety: no invented legal/licensing/insurance/trust/vendor/public launch
    decisions; no sensitive evidence in Git.
  - Verification: run
    `node "$(git rev-parse --show-toplevel)/.claude/evaluate-ia-change.mjs" --staged`
    before claiming ready.
- `.claude/information-architecture.md`
  - Adapt the Green IA structure to Lapsauskas Properties.
  - Include canonical zones for `docs/backlog/`, `docs/branding/`,
    `docs/financial/`, `docs/gtm/`, `docs/launch/`, `docs/marketing/`,
    `docs/passoffs/`, `docs/prompts/`, `docs/roadmap/`, `docs/status/`,
    `docs/strategies/`, `docs/uxd/`, `docs/uxr/`, and a non-live archive
    folder under `docs/`.
  - Include deterministic requirements for allowed zones, kebab-case filenames,
    required frontmatter, passoff naming, launch README updates, and sensitive
    path blocks.
- `.claude/evaluate-ia-change.mjs`
  - Adapt the Green evaluator for the Lapsauskas repo.
  - Keep it deterministic and scoped to staged changes.
  - Allow the same docs zones listed above, including `prompts`.
- `.githooks/pre-commit`
  - Small shell wrapper that runs the IA evaluator.
- `docs/backlog/backlog.md`
  - Active, Completed, and Ghost Links sections.
  - Seed active items only as `TBD` or blocked items where user input is needed.
- `docs/prompts/README.md`
  - Index for reusable scaffolding prompts.
- `docs/launch/README.md`
  - Pointer table for `plans/`, `legal/`, `discovery/`, `references/`,
    `runbooks/`, and `projects/`.
  - State that launch materials are planning support only, not legal/tax/
    insurance/licensing advice.
- `docs/launch/plans/`
  - Add a dated scaffold plan only if it can stay generic and explicitly
    blocked on user decisions. Use today's America/Los_Angeles date.
- `docs/launch/legal/`, `docs/launch/discovery/`, `docs/launch/references/`,
  `docs/launch/runbooks/`, `docs/launch/projects/`
  - Add `README.md` placeholders where useful; do not create fake legal
    conclusions or evidence.
- `docs/uxr/`, `docs/uxd/`, `docs/branding/`, `docs/financial/`, `docs/gtm/`,
  `docs/marketing/`, `docs/roadmap/`, `docs/status/`, `docs/strategies/`,
  the non-live archive folder under `docs/`
  - Create only the minimum durable structure and local README files needed for
    orientation. Use `TBD` placeholders instead of importing Green content.
- `docs/passoffs/`
  - End the session by writing a passoff file named
    `yyyy-MM-dd-HHmm-passoff-file.md` in America/Los_Angeles time.

Use frontmatter for new Markdown documents outside passoffs, archives, and
design-system docs:

```yaml
---
domain: lapsauskas-properties
category: <zone>
sub-category: <specific-purpose>
date-created: yyyy-MM-dd
date-revised: yyyy-MM-dd
doc-type: <type>
version: 0.1
doc-status: draft
aliases: []
tags: []
---
```

When drafting content, make the repo useful on day one:

- Add a short "Known facts" section with only user-provided facts.
- Add an "Open questions" section for owner, entity, geography, property type,
  financing, legal, insurance, accounting, domain, brand, and operations
  decisions.
- Add a "Blocked decisions" section so future agents do not close external
  gates without evidence.
- Add "Do not do" language to prevent copying Green's business facts, brand
  decisions, and regulatory assumptions into this project.
- Prefer concise indexes and templates over speculative long-form plans.

Validation and shipping:

1. Initialize Git if `/Users/kevinlappe/Projects/lapsauskas-properties` is not
   already a repo.
2. Use a short-lived branch from the default branch if a default branch exists.
3. Stage only the scaffold files you created or edited.
4. Run
   `node "$(git rev-parse --show-toplevel)/.claude/evaluate-ia-change.mjs" --staged`.
5. Fix any IA failures without bypassing hooks.
6. Commit with a detailed message.
7. Push and open a PR only if a remote exists and authentication is available.
   If no remote exists, leave a clean local commit and state that remote setup is
   still needed.
8. Write the passoff before ending, and include the final branch, commit SHA,
   PR URL if any, next actions, and binding `Do not do` constraints.
````
