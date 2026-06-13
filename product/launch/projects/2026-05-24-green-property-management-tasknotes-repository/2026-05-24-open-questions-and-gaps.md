---
domain: green-property-management
category: launch
sub-category: task-repository-gaps
date-created: 2026-05-23
date-revised: 2026-05-24
doc-type: open-questions
version: 0.1
doc-status: draft
aliases: [Task Repository Open Questions And Gaps]
tags: [launch, tasknotes, gaps, open-questions]
---

# Open Questions And Gaps

This file separates what is already known from what still needs user input.

## What is known

- Launch target is 2026-06-15.
- The strongest immediate path is legal gate clarity, owner discovery, pricing
  signal, one owner-visible systems artifact, and first-cohort readiness.
- Launch readiness and operations are blocked on owner, broker, counsel,
  account-owner, vendor, or market-conversation input.
- Sensitive evidence must stay outside Git.
- The task repository should be a single Obsidian-loadable path.
- Task management should happen in this path going forward.

## What is unknown

- Exact Obsidian vault root or roots.
- Whether this repo is the vault, a folder inside the vault, or a source folder
  that will be copied into another vault.
- Whether TaskNotes is configured for Obsidian Tasks emoji format, Dataview
  bracket format, TaskNotes, or mixed parsing.
- Whether your existing automations expect a specific folder such as
  `Projects/`, `Tasks/`, `Areas/`, or daily notes.
- Whether your current vault uses Dataview, Bases, Tasks queries, Templater,
  Periodic Notes, QuickAdd, or custom scripts.
- Whether task completion should be archived, left in place, or moved to a done
  file.
- Whether task dependencies should remain inline fields or be represented by
  links to project, epic, or feature notes.
- Who owns the daily review and weekly launch review.
- Which external evidence system will store license, counsel, insurance,
  vendor, account, domain, and contact details.

## Answers needed from Kevin

1. What is the exact Obsidian vault path where this task repository should live?
2. Should the folder be named exactly `Projects/Green Property Management Delivery/`, or should
   it stay at the repo-valid path currently drafted here?
3. Which TaskNotes task format do you use today: emoji, Dataview, TaskNotes, or
   mixed?
4. Which plugins or automations need to read these tasks?
5. Do your automations require tasks to live in one file, one file per project,
   one file per epic, or one file per task?
6. Should completed tasks stay in place, move to an archive file, or be
   deleted after review?
7. Should canceled tasks stay visible as `- [-]`, or should they move to a
   canceled-task log?
8. What project taxonomy do you want beyond project, epic, feature, priority,
   owner, dependency, scheduled date, and due date?
9. Should the launch target remain a public launch target, or should it be
   renamed to private launch-readiness target until legal gates clear?
10. Who is allowed to change P0 launch dates?
11. Who is allowed to mark externally blocked tasks done?
12. What daily review time should automations or reminders use?
13. What timezone should TaskNotes and automations use? Current repo convention
    is America/Los_Angeles.
14. Should recurring process tasks exist in the same task file as launch tasks,
    or in the process file only?
15. Should task IDs use `GPM-T###`, or do you already have an ID convention?

## Draft assumptions to critique

- The package path is the source of truth:
  `docs/launch/projects/2026-05-24-green-property-management-tasknotes-repository/`.
- The project is `Green Property Management Delivery`.
- Epics are governance, legal/licensing, owner discovery, operations, systems,
  website/public boundary, and task operations process.
- P0 means launch/hold decision blocker.
- P1 means needed for a credible launch-readiness package.
- Tasks use inline IDs and dependency fields because that remains readable even
  when a plugin ignores custom fields.
- Blocked external tasks start as `- [!]`.
- The 2026-06-15 date is treated as conditional until launch gates clear.
