---
domain: green-property-management
category: launch
sub-category: tasknotes-delivery-workflow
date-created: 2026-05-23
date-revised: 2026-05-24
doc-type: process-draft
version: 0.2
doc-status: draft
aliases: [TaskNotes Delivery Workflow, Global TaskNotes Workflow]
tags: [launch, tasknotes, tasks-plugin, process, obsidian, status/open]
---

# TaskNotes Delivery Workflow

This is the global workflow pattern for managing project delivery with
TaskNotes, the Tasks plugin, Git, and LLM-assisted development. This file is
scoped to Green Property Management, but the structure should be reused across
projects with only project, epic, feature, owner, and repository values changed.

## Global Pattern

Every project gets:

- One project note that defines project scope, epics, features, milestones, and
  live views.
- One TaskNotes note per durable delivery task.
- Optional inline Tasks plugin checkboxes for quick triage, meeting notes, and
  temporary session work.
- A stable status tag on every task note.
- A session ledger inside each task note that records LLM work, decisions,
  files changed, verification, passoffs, commits, PRs, and blockers.

## Plugin Responsibilities

TaskNotes is the system of record.

- Use it for task identity, frontmatter, due dates, scheduled dates,
  dependencies, project links, and task notes.
- Use one task note per durable unit of delivery.
- Update TaskNotes task notes after every meaningful LLM or human work session.

The Tasks plugin is the review and dashboard layer.

- Use it for project dashboards, blocked-task queries, due-date queries,
  weekly-review queries, and quick inline checklists.
- Do not let inline checkboxes become the only copy of durable delivery work.
  Promote them to TaskNotes notes when they affect project delivery.

## Status Tags

Status tags are canonical. TaskNotes `status` frontmatter mirrors the tag.

| Status tag | TaskNotes status mirror | When to use |
|---|---|---|
| `#status/planned` | `planned` | Known, sequenced, not actionable yet. |
| `#status/open` | `open` | Actionable and ready to pick up. |
| `#status/active` | `active` | A human or LLM is actively working it. |
| `#status/blocked` | `blocked` | Waiting on a named blocker. |
| `#status/review` | `review` | Implemented or drafted; needs review, QA, approval, or critique. |
| `#status/done` | `done` | Complete with linked evidence. |
| `#status/canceled` | `canceled` | Canceled, superseded, or intentionally removed. |

Do not use checkbox glyphs as the canonical status. They are useful in Tasks
plugin views, but the status tag must be present in task-note frontmatter.

## Task Note Required Fields

Every durable task note should include these fields:

```yaml
title:
task_id:
project:
project_note:
epic:
feature:
status:
priority:
owner:
scheduled:
due:
blocked_by:
depends_on:
verification:
source_files:
session_links:
tags:
```

The `tags` list must include one and only one `status/...` tag.

## Developer Workflow

Use this loop for LLM-assisted project delivery:

1. Define project plan, dependencies, and test gates in the project note.
2. Create or revise TaskNotes task notes for each durable delivery unit.
3. Before work starts, set the task note to `#status/active` and add a session
   entry with branch, plan, expected files, and verification command.
4. During work, link decisions, source docs, changed files, blockers, and
   unresolved questions in the task note.
5. Before claiming done, run the verification command and record the output or
   failure in the task note.
6. When work ships, link the commit, PR, passoff, and merge state in the task
   note.
7. Move the task to `#status/review` if human critique is needed, or
   `#status/done` only when the evidence is complete and no external approval
   is still pending.

## LLM Session Ledger

Each task note should keep a session ledger with these fields in the body:

- Date and agent.
- Branch.
- Files changed.
- Decisions made.
- Verification run.
- Passoff link.
- PR link.
- Commit SHA.
- Remaining blockers.
- Next action.

LLMs should update the ledger as part of the same branch/PR that changes the
work. If a task is blocked by legal, licensing, counsel, account-owner,
vendor, or market-conversation evidence, the LLM must leave it blocked.

## Automation Rules

Automation may update task notes when all of these are true:

- It writes only to the project task repository path.
- It preserves stable task IDs.
- It updates exactly one status tag.
- It links the source session, passoff, PR, or verification evidence.
- It does not store credentials, personal contact details, payment details,
  license documents, counsel memos, receipts, or sensitive screenshots.

Automation must not close externally blocked tasks unless the relevant evidence
is linked or summarized in a non-sensitive way.

## Tasks Plugin Dashboard Queries

Blocked work:

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository
tag includes #status/blocked
sort by due
```

Open work:

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository
tag includes #status/open
sort by due
```

Active work:

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository
tag includes #status/active
sort by due
```

Needs review:

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository
tag includes #status/review
sort by due
```

## Green Property Management Scope

For this project, `#status/blocked` is expected on legal, launch, insurance,
trust-accounting, public-boundary, account-owner, vendor, and owner-discovery
tasks until outside evidence exists. The task system is allowed to track those
tasks, but it must not imply they are legally or operationally complete.
