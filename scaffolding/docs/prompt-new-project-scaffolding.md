---
domain: green-property-management
category: scaffolding
sub-category: new-project-prompt
date-created: 2026-06-07
date-revised: 2026-06-07
doc-type: llm-prompt-instructions
version: 0.1
doc-status: draft
aliases: [New project scaffolding prompt]
tags: [scaffolding, prompt, llm]
---

# prompt-new-project-scaffolding

Use this file as the instruction payload for an LLM that needs to scaffold a
new related project repository from an existing reference project. Replace the
bracketed values before sending it.

## LLM instructions

````text
You are working in `[TARGET_REPO_ABSOLUTE_PATH]`.

Your task is to scaffold the initial `[TARGET_PROJECT_NAME]` repository using
`[REFERENCE_REPO_ABSOLUTE_PATH]` as the process, information-architecture, and
operating-pattern reference. Use the reference project as a model for structure
and workflow, not as business content to copy.

Before editing, inspect the reference project:

1. Read the newest passoff in `[REFERENCE_REPO_ABSOLUTE_PATH]/docs/passoffs/`.
2. Read the reference repo's project-local instructions.
3. Read the reference repo's `README.md`.
4. Read the reference repo's information-architecture guidance and validation
   script if present.
5. Read the reference repo's backlog, launch index, prompt index, and any
   task-management package that defines durable work patterns.
6. Inspect the recent git history:
   `git -C [REFERENCE_REPO_ABSOLUTE_PATH] log --oneline --decorate -n 60`.

Start by reporting the reference passoff's `Next actions` and `Do not do`
sections to the user. Treat `Do not do` as binding unless the user explicitly
overrides it.

Use these scaffolding principles:

- Treat the new repo first as a documentation, research, launch-prep,
  planning, and decision-support corpus unless the user explicitly asks for
  product code.
- Keep `README.md` as the orientation layer and top-level information
  architecture map.
- Keep project-local instructions in the local convention used by the target
  agent environment, usually `CLAUDE.md` or `AGENTS.md`.
- Create deterministic IA guardrails before adding a large corpus: allowed
  zones, filename rules, frontmatter rules, sensitive-path blocks, passoff
  rules, and validation commands.
- Keep session handoffs in `docs/passoffs/` with a strict filename and section
  contract.
- Separate launch execution, research, strategy, brand/design, backlog, status,
  financial, marketing, prompt, and archive material into distinct zones.
- Prefer concise indexes and templates over speculative long-form plans.
- Leave facts as `TBD` when they are not provided by the user.
- Mark externally blocked decisions as blocked. Do not close them without
  linked evidence.
- Add one durable task note per durable task only if the user wants
  Obsidian-compatible or note-native task management.

Do not copy reference-project specifics into `[TARGET_PROJECT_NAME]` unless the
user explicitly confirms them:

- Names, domains, operators, pricing, geography, launch markets, entity
  structure, account owners, licensing assumptions, legal conclusions,
  insurance posture, trust-account choices, vendor choices, product stack,
  brand system, research rankings, public approvals, or sensitive evidence.
- Credentials, registrar data, license records, legal memos, insurance
  documents, payment details, recovery codes, personal registrant data,
  sensitive screenshots, or private evidence.

If target-project facts are unknown, write explicit placeholders:

- `TBD`
- `Blocked on user decision`
- `Blocked on counsel/account-owner/vendor/evidence`
- `Open question`

Create the initial repo scaffold:

1. `README.md`
   - Add YAML frontmatter.
   - Describe the project purpose using only confirmed facts.
   - Add current operating status.
   - Add repo layout.
   - Add headline outputs to read first.
   - Add workflow, conventions, and out-of-scope sections.

2. Project-local instructions
   - Add startup rules.
   - Add read-before-edit and passoff rules.
   - Add safety boundaries.
   - Add verification commands.
   - Add git and branch hygiene.

3. IA and validation
   - Create an information-architecture file.
   - Create a deterministic staged-change evaluator if the repo uses one.
   - Create a small pre-commit hook wrapper only if the repo should enforce the
     evaluator locally.

4. Core documentation zones
   - `docs/backlog/`
   - `docs/branding/`
   - `docs/financial/`
   - `docs/gtm/`
   - `docs/launch/`
   - `docs/marketing/`
   - `docs/passoffs/`
   - `docs/prompts/`
   - `docs/roadmap/`
   - `docs/status/`
   - `docs/strategies/`
   - `docs/uxd/`
   - `docs/uxr/`
   - a non-live archive area

5. Local indexes
   - Add `README.md` files only where they help future agents route work.
   - Do not add empty ceremony everywhere.
   - Update the root README whenever a durable top-level zone is created.

6. Backlog and launch placeholders
   - Seed active backlog items only as confirmed tasks or blocked questions.
   - For launch areas, make clear that documents are planning support, not
     legal, tax, licensing, insurance, privacy, security, or records-retention
     advice.
   - Do not create fake legal conclusions, domain decisions, public launch
     approvals, vendor commitments, or evidence.

Use this frontmatter pattern for new Markdown documents unless the target repo
has a stricter local standard:

```yaml
---
domain: [TARGET_DOMAIN_SLUG]
category: [zone]
sub-category: [specific-purpose]
date-created: yyyy-MM-dd
date-revised: yyyy-MM-dd
doc-type: [type]
version: 0.1
doc-status: draft
aliases: []
tags: []
---
```

Verification and ship flow:

1. Initialize Git if the target directory is not already a repo.
2. Work from the default branch, then create a short-lived feature or passoff
   branch if a default branch exists.
3. Stage only files created or edited for the scaffold.
4. Run the target repo's validation command.
5. Fix validation failures without bypassing hooks.
6. Commit with a detailed message.
7. Push and open a PR only if a remote exists and authentication is available.
   If no remote exists, leave a clean local commit and state that remote setup
   remains.
8. Write a final passoff in `docs/passoffs/` with:
   - `Summary`
   - `Files changed`
   - `Key decisions`
   - `Risks and open questions`
   - `Lessons learned`
   - `State`
   - `Next actions`
   - `Do not do`

Before reporting completion, provide evidence:

- final branch
- commit SHA
- PR URL if any
- validation command and result
- remaining blocked decisions
````
