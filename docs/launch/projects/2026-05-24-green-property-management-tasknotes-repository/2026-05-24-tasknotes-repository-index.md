---
domain: green-property-management
category: launch
sub-category: tasknotes-repository
date-created: 2026-05-23
date-revised: 2026-05-24
doc-type: task-repository-index
version: 0.2
doc-status: draft
aliases: [Green Property Management TaskNotes Repository, TaskNotes Repository Index]
tags: [launch, tasknotes, tasks-plugin, obsidian, projects]
---

# Green Property Management TaskNotes Repository

Task repository path:
`docs/launch/projects/2026-05-24-green-property-management-tasknotes-repository/`

Launch target: 2026-06-15.

This folder is the single Obsidian-loadable task repository for Green Property
Management delivery work. Going forward, project notes, task notes, task
revisions, deleted-task decisions, session notes, and task-management process
changes should be made in this folder.

The folder is the project-scoped implementation of a global TaskNotes workflow:
each project gets its own project note, delivery-oriented features, status tags,
and one TaskNotes note per durable task.

## Package files

- [`2026-05-24-green-property-management-project-note.md`](2026-05-24-green-property-management-project-note.md) - project note, delivery hierarchy, task-note index, milestones, and launch target.
- [`2026-05-24-tasknotes-delivery-workflow.md`](2026-05-24-tasknotes-delivery-workflow.md) - global TaskNotes plus Tasks plugin workflow, scoped to this project.
- [`2026-05-24-draft-launch-task-list.md`](2026-05-24-draft-launch-task-list.md) - legacy inline task list retained as a migration source.
- [`2026-05-24-open-questions-and-gaps.md`](2026-05-24-open-questions-and-gaps.md) - what is known, what is unknown, and what answers are needed.
- [`tasks/`](tasks/) - TaskNotes task notes. Each durable task has one note with status tags, dependencies, links, session data, decisions, and verification gates.

## Relevant Green Property Management files

- [`../../plans/2026-05-20-business-launch-project-plan.md`](../../plans/2026-05-20-business-launch-project-plan.md)
- [`../../legal/2026-05-20-launch-readiness-gates.md`](../../legal/2026-05-20-launch-readiness-gates.md)
- [`../../discovery/2026-05-20-owner-discovery-guide.md`](../../discovery/2026-05-20-owner-discovery-guide.md)
- [`../../plans/2026-05-20-website-domain-internal-launch-plan.md`](../../plans/2026-05-20-website-domain-internal-launch-plan.md)
- [`../../plans/2026-05-21-website-phase-completion-register.md`](../../plans/2026-05-21-website-phase-completion-register.md)
- [`../../runbooks/2026-05-21-domain-purchase-evidence-runbook.md`](../../runbooks/2026-05-21-domain-purchase-evidence-runbook.md)
- [`../../runbooks/2026-05-21-dns-staging-access-runbook.md`](../../runbooks/2026-05-21-dns-staging-access-runbook.md)
- [`../../runbooks/2026-05-21-website-deployment-rollback-runbook.md`](../../runbooks/2026-05-21-website-deployment-rollback-runbook.md)
- [`../../runbooks/2026-05-21-website-qa-release-boundary-runbook.md`](../../runbooks/2026-05-21-website-qa-release-boundary-runbook.md)

## Plugin Roles

TaskNotes is the durable task manager.

- One Markdown note per durable task.
- Task status is represented by status tags and mirrored into TaskNotes
  frontmatter.
- Task notes carry links to project files, source docs, passoffs, PRs,
  decisions, verification gates, and LLM session updates.

The Tasks plugin is the live reporting layer.

- Project notes use Tasks code blocks to show blocked, open, active, and review
  work.
- Session notes may use inline Tasks plugin checkboxes for short-lived triage,
  but durable delivery tasks must be promoted into TaskNotes notes.

## Status Tags

Status is tag-first so it works across TaskNotes, Tasks, Dataview, search,
LLM automation, and plain Markdown.

| Status tag | Meaning |
|---|---|
| `#status/planned` | Known work that is not actionable yet. |
| `#status/open` | Actionable now. |
| `#status/active` | Actively being worked. |
| `#status/blocked` | Waiting on named external or upstream input. |
| `#status/review` | Work is ready for review, QA, or approval. |
| `#status/done` | Completed with linked evidence. |
| `#status/canceled` | Canceled or superseded with reason preserved. |

TaskNotes `status` frontmatter mirrors the status tag so TaskNotes views work,
but the tag is the portable source of truth that LLMs and repo automation should
update.

## Current Loading Assumption

The current assumption is that this repository is part of an Obsidian vault, or
this folder can be copied or mounted into one. If the vault layout is different,
use the questions in
[`2026-05-24-open-questions-and-gaps.md`](2026-05-24-open-questions-and-gaps.md)
to define the exact destination and automation expectations before operational
use.
