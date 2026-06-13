---
domain: brand
category: design-system
sub-category: token-atomic-execution
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 00-index
  - 30-design-tokens
  - 94-governance
  - 96-numbering-convention
produces:
  - token-atomicity-contract
  - parallel-agent-execution-plan
  - implementation-workstream-model
  - token-change-control-gates
  - cross-session-handoff-contract
executor: strategy
aliases:
  - token-execution-plan
  - atomic-token-workflow
  - parallel-agent-plan
tags:
  - design-system
  - tokens
  - execution
  - implementation
  - agentic-development
---

# 31-token-atomic-execution

Canonical execution and implementation plan for design-system work across parallel agent sessions. This document makes token atoms the first-class unit of planning, ownership, change control, validation, and handoff so multiple agents can work concurrently without drifting the source of truth.

## Dependencies

- [[00-index|design system master index]] for tier order, doc contract, and orchestration rules
- [[30-design-tokens|design tokens]] for the token source of truth and implementation file set
- [[94-governance|governance and change management]] for proposal, approval, exception, and passoff rules
- [[96-numbering-convention|numbering convention]] for this document's location and future insertion rules

## Outputs

1. Token atomicity contract
2. Parallel agent execution plan
3. Implementation workstream model
4. Token change control gates
5. Cross-session handoff contract

## 1. Purpose

This document is the operating plan for agentic development on the design system. It answers five questions:

1. What is the smallest change unit?
2. Which work can run in parallel?
3. Which work must serialize?
4. How do agents prevent token drift?
5. What evidence proves the work is complete?

The answer to the first question controls the rest: the smallest change unit is the token atom.

## 2. Token atoms are first-class

### 2.1 Definition

A token atom is one named, independently reviewable design decision. It can be a primitive value, a derived value, a semantic alias, or an approved role mapping.

| Layer | Example | What it owns | What it must not own |
|---|---|---|---|
| Primitive atom | `--color-cedar: #2D6A4F` | A raw brand value | Component intent |
| Derived atom | `--color-ink-60` | A computed or selected variant | New meaning |
| Semantic atom | `--color-action` | Intent mapping to a primitive | New raw values |
| Scale atom | `--space-6: 1.5rem` | One step in a system scale | Component layout |
| Role atom | Button primary background uses `--color-action` | One approved usage relationship | New token values |

No implementation task may treat a token as incidental. If a change introduces, renames, removes, remaps, or reinterprets a token, that token atom becomes the workstream's primary artifact.

### 2.2 Atomicity rules

1. **One atom, one meaning.** A token cannot carry multiple meanings because two components happen to share it.
2. **One atom, one owner per session.** Only one parallel session may own a token atom at a time.
3. **Primitive values are not component APIs.** Components consume semantic or role tokens where possible.
4. **Aliases do not hide changes.** If `--color-action` moves from Clay to another primitive, that is a semantic token change even when the alias name stays stable.
5. **Token names are stable addresses.** Rename only through governance, with migration notes and backlink updates.
6. **Raw values stop at token files.** Hex, arbitrary px values, shadow literals, easing curves, and z-index numbers do not appear in components unless the authoritative spec explicitly permits them.
7. **No opportunistic atom edits.** If a workstream discovers a token issue outside its assigned atom set, it records the issue and requests ownership before changing it.

### 2.3 Token atom manifest

Every token-affecting effort starts with a manifest. The manifest can live in the PR body, issue, passoff, or a temporary working note, but it must contain this table before implementation begins.

| Atom | Layer | Current source | Intended change | Owner session | Blocked by | Verification |
|---|---|---|---|---|---|---|
| `--space-0` | Scale | `green-pm-tokens.css` | Add explicit zero step | Token session | None | CSS var exists; quick reference matches |
| `--measure-modal` | Scale | `30-design-tokens.md` | Add modal measure | Token session | None | CSS var exists; Tailwind maxWidth mirrors it |

If the manifest is missing, token work has not started. If two sessions claim the same atom, the second session stops.

## 3. Parallel session model

### 3.1 Session roles

Parallel work uses named sessions. A person or agent may run more than one session, but each session has exactly one role.

| Session | Primary responsibility | May edit tokens | May edit docs | May edit implementation files |
|---|---|---:|---:|---:|
| Orchestrator | Build plan, assign ownership, merge evidence | No | Yes | No |
| Token steward | Own token atom manifest and token files | Yes | Yes | Yes |
| Documentation agent | Frontmatter, backlinks, quick reference, acceptance text | No, unless assigned | Yes | No |
| Implementation agent | CSS, Tailwind, component usage, file placement | Assigned atoms only | Yes, when documenting implementation | Yes |
| Accessibility agent | Contrast, focus, motion, keyboard and screen reader checks | No, unless assigned | Yes | No |
| Verification agent | Run checks, compare hashes, inspect diffs | No | No, except verification notes | No |
| Passoff agent | Handoff, PR body, state tracking | No | Yes | No |

### 3.2 Parallelism rule

Run in parallel unless two sessions need the same token atom, same file block, same frontmatter field, or same acceptance gate. The conflict unit is not "same repository" or "same folder"; the conflict unit is the token atom plus its declared owning files.

### 3.3 Lock levels

| Lock | Scope | When used | Who releases it |
|---|---|---|---|
| Atom lock | One token atom or role relationship | Any token-affecting change | Token steward |
| File lock | One file section or frontmatter block | Two sessions need nearby edits | Orchestrator |
| Gate lock | Verification, passoff, PR, merge | End-of-work sequence | Passoff agent |

Locks are coordination notes, not Git locks. They exist to stop conflicting edits before they become merge conflicts.

## 4. Execution plan

### 4.1 Gate 0: preflight, serialized

The orchestrator runs this before parallel work starts:

1. Read the latest passoff.
2. Surface `Next actions` and `Do not do`.
3. Run `git status -sb`.
4. Inventory requested target folders.
5. Identify token atoms and file groups.
6. Create or update the token atom manifest.
7. Assign sessions and locks.

No agent writes files before Gate 0 is complete.

### 4.2 Batch 1: source-of-truth alignment, mostly parallel

These can run at the same time after Gate 0:

| Session | Work package | Inputs | Outputs |
|---|---|---|---|
| Token steward | Confirm token atom inventory | `30-design-tokens`, token files | Token manifest, atom locks |
| Documentation agent | Validate frontmatter and doc graph | Numbered specs | Missing metadata and backlink list |
| Implementation agent | Inspect CSS and Tailwind parity | Token CSS, Tailwind config | Implementation mismatch list |
| Accessibility agent | Inspect contrast, focus, motion rules | Color, motion, accessibility specs | Accessibility drift list |
| Verification agent | Prepare repeatable checks | Repo paths and expected files | Verification command set |

The token steward is the only session that can change token values in this batch.

### 4.3 Gate 1: token atom commit point, serialized

Before downstream docs or components change, the token steward freezes the atom manifest:

1. Every changed atom has one owner.
2. Every atom maps to one source file and one spec section.
3. Every alias points to an existing primitive or derived token.
4. Every implementation mirror is named.
5. Every verification method is listed.

Downstream sessions may proceed only after this gate is satisfied.

### 4.4 Batch 2: implementation and documentation, parallel

After Gate 1, work fans out:

| Session | Work package | Editable surface |
|---|---|---|
| Token steward | Apply token atom changes | `green-pm-tokens.css`, `30-design-tokens.md`, token mirror files |
| Documentation agent | Update index, quick reference, backlinks, numbering | Numbered Markdown specs |
| Implementation agent | Update Tailwind and CSS mirrors | `tailwind.config.js`, `base.css`, `modes.css` |
| Accessibility agent | Update contrast, focus, reduced-motion assertions | Accessibility and forbidden-pattern docs |
| Verification agent | Run partial checks as files land | Read-only checks |

Each session reports changed files and atom IDs back to the orchestrator. A session that needs another session's atom waits instead of patching around it.

### 4.5 Gate 2: reconciliation, serialized

The orchestrator reconciles:

1. Token manifest vs token CSS variables.
2. Token manifest vs Tailwind theme keys.
3. Quick reference token names vs token CSS variables.
4. Index inventory vs filesystem inventory.
5. Numbering convention count vs actual numbered docs.
6. Backlinks and Markdown links.
7. Acceptance criteria in touched specs.

Any mismatch returns to the owning session. Do not patch verification failures from a different session unless ownership is reassigned.

### 4.6 Batch 3: final verification, parallel read-only

Read-only verification can run in parallel:

| Check | Owner | Pass condition |
|---|---|---|
| YAML/frontmatter parse | Verification agent | Every numbered spec parses and has required keys |
| Dependency graph | Verification agent | Every `depends-on` target exists |
| Link graph | Verification agent | Every Markdown and wikilink target resolves |
| Token parity | Token steward | Quick reference tokens exist in CSS token files |
| CSS syntax sanity | Implementation agent | CSS braces balance |
| Tailwind config sanity | Implementation agent | Config imports as ESM |
| Folder placement | Orchestrator | Requested target folder contains expected files |
| Git scope | Passoff agent | Only intended files are staged |

Verification is read-only. If a check fails, ownership returns to the responsible session.

### 4.7 Gate 3: passoff and ship, serialized

Passoff and ship flow is serialized:

1. Write the passoff in `docs/passoffs/`.
2. Record Summary, Files changed, Key decisions, Risks and open questions, State, Next actions, Do not do.
3. Stage only intended work.
4. Commit with the required passoff subject pattern when applicable.
5. Push the branch.
6. Open the PR.
7. Record the PR URL in the passoff follow-up commit.
8. Merge only if GitHub reports clean mergeability, no required failing checks, no draft state, no unresolved review threads, and no branch protection warnings.
9. Sync local `main`.

No parallel session edits files after Gate 3 starts.

## 5. Implementation plan for this design-system package

### 5.1 Canonical file placement

The package has two valid surfaces:

| Surface | Purpose | Files |
|---|---|---|
| Package root | Current package source layout | `README.md`, `green-pm-tokens.css`, `base.css`, `modes.css`, `tailwind.config.js` |
| Requested docs export folder | Operator-requested colocated copy for docs workflows | Same package files copied into `docs/uxd/design-system/docs/` |

Passoffs do not follow the export folder. Passoffs always live in `docs/passoffs/`.

### 5.2 Implementation order

1. Restore or update root package files.
2. Mirror requested non-passoff files into `docs/uxd/design-system/docs/`.
3. Add or update numbered specs.
4. Update `00-index.md`, `95-quick-reference.md`, and `96-numbering-convention.md`.
5. Run verification against numbered specs and mirrored package files.
6. Write passoff in the normal passoff folder.
7. Commit, push, PR, record PR URL, merge when allowed, sync `main`.

### 5.3 Mirror discipline

When a root package file is mirrored into `docs/uxd/design-system/docs/`, the mirror must be byte-for-byte identical unless a future spec explicitly declares a docs-folder variant. If a mirror is edited directly, the same change must be reconciled back to the root package file before the work ships.

The verification agent checks this with file hashes.

## 6. Agent handoff format

Every parallel session reports in this shape:

```markdown
Session:
Role:
Owned atoms:
Owned files:
Files changed:
Verification run:
Open issues:
Do not overwrite:
```

`Do not overwrite` is mandatory. It prevents the next session from replacing local work with stale assumptions.

## 7. Forbidden execution patterns

- No raw token values outside token files unless an authoritative spec names an exception.
- No component edits bundled with token atom edits unless the manifest names the component role relationship.
- No quick-reference edits that are not checked against the detailed spec.
- No frontmatter schema drift.
- No duplicate ownership of a token atom across sessions.
- No branch merge with unresolved verification failures.
- No passoff outside `docs/passoffs/`.
- No large content removal without explicit approval.

## 8. Verification commands

Run these classes of checks before claiming completion:

1. YAML parse and frontmatter key check for numbered specs.
2. `depends-on` target resolution.
3. Markdown link and Obsidian wikilink resolution.
4. Actual numbered-doc count against `00-index.md` and `96-numbering-convention.md`.
5. Quick-reference token names against `green-pm-tokens.css`.
6. CSS brace balance for `green-pm-tokens.css`, `base.css`, and `modes.css`.
7. ESM import check for `tailwind.config.js`.
8. Hash equality for any mirrored root package files.
9. `git status -sb` before staging and before final response.

## 9. Acceptance

This document is acceptable when:

- It defines token atoms as the first-class unit of work.
- It separates token ownership from documentation, implementation, verification, and passoff roles.
- It identifies which gates are serialized and which batches can run in parallel.
- It provides an implementation plan for mirrored package files and normal passoff placement.
- It defines verification evidence that can be run by agents in parallel read-only sessions.
- It gives future agents enough structure to continue design-system work without re-deciding ownership, file placement, or token atomicity rules.
