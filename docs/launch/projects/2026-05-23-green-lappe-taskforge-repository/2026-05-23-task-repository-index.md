---
domain: green-lappe-properties
category: launch
sub-category: taskforge-repository
date-created: 2026-05-23
date-revised: 2026-05-23
doc-type: task-repository-index
version: 0.1
doc-status: draft
aliases: [Green Lappe TaskForge Repository, Task Repository Index]
tags: [launch, taskforge, obsidian, projects]
---

# Green Lappe TaskForge Repository

Task repository path:
`docs/launch/projects/2026-05-23-green-lappe-taskforge-repository/`

Launch target: 2026-06-15.

This folder is the single Obsidian-loadable task repository for Green Lappe
launch work. Going forward, draft tasks, revised tasks, deleted-task decisions,
review notes, and task-management process changes should be made in this folder.
The folder is organized around a `Projects` model even though the repo keeps
lowercase dated filenames for validation.

## Package files

- [`2026-05-23-green-lappe-launch-project.md`](2026-05-23-green-lappe-launch-project.md) - project, epics, features, milestones, and launch target.
- [`2026-05-23-draft-launch-tasks.md`](2026-05-23-draft-launch-tasks.md) - TaskForge-compatible draft tasks for critique.
- [`2026-05-23-draft-task-management-process.md`](2026-05-23-draft-task-management-process.md) - draft process for reviewing, updating, revising, managing, deleting, and adding tasks.
- [`2026-05-23-open-questions-and-gaps.md`](2026-05-23-open-questions-and-gaps.md) - what is known, what is unknown, and what answers are needed.

## Relevant Green Lappe files

- [`../../plans/2026-05-20-business-launch-project-plan.md`](../../plans/2026-05-20-business-launch-project-plan.md)
- [`../../legal/2026-05-20-launch-readiness-gates.md`](../../legal/2026-05-20-launch-readiness-gates.md)
- [`../../discovery/2026-05-20-owner-discovery-guide.md`](../../discovery/2026-05-20-owner-discovery-guide.md)
- [`../../plans/2026-05-20-website-domain-internal-launch-plan.md`](../../plans/2026-05-20-website-domain-internal-launch-plan.md)
- [`../../plans/2026-05-21-website-phase-completion-register.md`](../../plans/2026-05-21-website-phase-completion-register.md)
- [`../../runbooks/2026-05-21-domain-purchase-evidence-runbook.md`](../../runbooks/2026-05-21-domain-purchase-evidence-runbook.md)
- [`../../runbooks/2026-05-21-dns-staging-access-runbook.md`](../../runbooks/2026-05-21-dns-staging-access-runbook.md)
- [`../../runbooks/2026-05-21-website-deployment-rollback-runbook.md`](../../runbooks/2026-05-21-website-deployment-rollback-runbook.md)
- [`../../runbooks/2026-05-21-website-qa-release-boundary-runbook.md`](../../runbooks/2026-05-21-website-qa-release-boundary-runbook.md)

## Obsidian and TaskForge compatibility

This draft uses standard Markdown tasks with TaskForge-compatible Obsidian Tasks
markers:

- `- [ ]` open task
- `- [/]` in progress
- `- [!]` blocked or on hold
- `- [>]` planned
- `- [x]` done
- `- [-]` canceled
- `📅 yyyy-mm-dd` due date
- `⏳ yyyy-mm-dd` scheduled date
- `🔺`, `⏫`, `🔼`, `🔽`, `⏬` priority markers

The draft also uses inline fields such as `[project:: ...]`, `[epic:: ...]`,
`[feature:: ...]`, `[id:: ...]`, `[depends:: ...]`, and `[owner:: ...]`.
Those fields keep the task plan readable across Obsidian, Dataview, TaskForge,
and future automation scripts even if a specific plugin ignores a field.

## Current loading assumption

The current assumption is that the Green Lappe repository itself is part of an
Obsidian vault, or this folder can be copied or mounted into one. If your vault
layout is different, use the questions in
[`2026-05-23-open-questions-and-gaps.md`](2026-05-23-open-questions-and-gaps.md)
to define the exact destination and automation expectations before operational
use.
