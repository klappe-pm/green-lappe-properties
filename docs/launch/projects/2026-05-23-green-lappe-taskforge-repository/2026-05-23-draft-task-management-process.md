---
domain: green-lappe-properties
category: launch
sub-category: task-management-process
date-created: 2026-05-23
date-revised: 2026-05-23
doc-type: process-draft
version: 0.1
doc-status: draft
aliases: [Draft Task Management Process]
tags: [launch, taskforge, process, obsidian]
---

# Draft Task Management Process

This is the draft operating process for the task repository. It is intended for
critique before it becomes the working system.

## Scope

All Green Lappe launch tasks should be created, reviewed, updated, revised,
canceled, or completed inside:

`docs/launch/projects/2026-05-23-green-lappe-taskforge-repository/`

Do not scatter launch tasks across daily notes, random project notes, or archive
folders unless those notes link back to this repository and the source task
remains here.

## Required task fields

Every durable task should include:

- Human-readable task title.
- `[id:: GLP-T###]` stable task ID.
- `[project:: Green Lappe Launch]`.
- `[epic:: ...]`.
- `[feature:: ...]`.
- `[priority:: P0/P1/P2/P3]`.
- `[owner:: ...]`.
- `[depends:: ...]`.
- At least one tag beginning `#green-lappe/launch`.
- Scheduled date using `⏳ yyyy-mm-dd`.
- Due date using `📅 yyyy-mm-dd`.

## Task status workflow

Use these status markers:

- `- [>]` planned: known task, not actionable yet.
- `- [ ]` open: actionable now.
- `- [/]` in progress: actively being worked.
- `- [!]` blocked: waiting on owner, broker, counsel, account-owner, vendor,
  market conversation, or other external input.
- `- [x]` done: completed with enough evidence for review.
- `- [-]` canceled: deleted from the active plan by explicit decision.

## Review cadence

- [ ] Run a daily task triage until 2026-06-15 [id:: GLP-P001] [project:: Green Lappe Launch] [epic:: Task operations process] [feature:: Daily triage] [priority:: P1] [owner:: Kevin/Megan] [depends:: none] #green-lappe/launch #process/task-management ⏫ 🔁 every day ⏳ 2026-05-24 📅 2026-06-15
  - [ ] Review due-today and overdue tasks [id:: GLP-P002] [depends:: GLP-P001] [priority:: P1] #green-lappe/launch #process/task-management ⏫ ⏳ 2026-05-24 📅 2026-06-15
  - [ ] Move blocked tasks to `- [!]` and add blocker owner [id:: GLP-P003] [depends:: GLP-P001] [priority:: P1] #green-lappe/launch #process/task-management ⏫ ⏳ 2026-05-24 📅 2026-06-15
  - [ ] Add new tasks only inside this repository path [id:: GLP-P004] [depends:: GLP-P001] [priority:: P1] #green-lappe/launch #process/task-management ⏫ ⏳ 2026-05-24 📅 2026-06-15
- [ ] Run a weekly launch review every Monday [id:: GLP-P010] [project:: Green Lappe Launch] [epic:: Task operations process] [feature:: Weekly review] [priority:: P1] [owner:: Kevin/Megan] [depends:: none] #green-lappe/launch #process/task-management ⏫ 🔁 every week on Monday ⏳ 2026-05-25 📅 2026-06-15
  - [ ] Review milestone health against 2026-06-15 target [id:: GLP-P011] [depends:: GLP-P010] [priority:: P1] #green-lappe/launch #process/task-management ⏫ ⏳ 2026-05-25 📅 2026-06-15
  - [ ] Review all P0 blockers [id:: GLP-P012] [depends:: GLP-P010] [priority:: P0] #green-lappe/launch #process/task-management 🔺 ⏳ 2026-05-25 📅 2026-06-15
  - [ ] Decide whether target remains public launch, private readiness, or hold [id:: GLP-P013] [depends:: GLP-P010] [priority:: P0] #green-lappe/launch #process/task-management 🔺 ⏳ 2026-05-25 📅 2026-06-15

## How to add a task

1. Add it to [`2026-05-23-draft-launch-tasks.md`](2026-05-23-draft-launch-tasks.md)
   unless it is about the process itself.
2. Assign the next available `GLP-T###` ID.
3. Assign project, epic, feature, priority, owner, dependency, scheduled date,
   and due date.
4. Link any source file that explains why the task exists.
5. If the task depends on unknown external input, start it as `- [!]`.

## How to revise a task

1. Keep the task ID stable.
2. Change the title only if the task meaning remains the same.
3. If the meaning changes materially, cancel the old task and create a new one.
4. Update dates when the plan changes.
5. Update dependencies when upstream decisions change.

## How to delete or cancel a task

Prefer canceling to deleting:

- Use `- [-]` when a task was real but is no longer needed.
- Add a short reason in the task title or an indented note.
- Delete only duplicates, accidental test tasks, or malformed tasks created by
  automation.

## Automation rules

- Automations may read this folder for task status and dates.
- Automations may propose changes, but durable changes should keep stable IDs.
- Automations must not add credentials, personal contact details, payment
  details, license documents, counsel memos, receipts, or sensitive screenshots.
- Automations should not close blocked tasks unless the required external
  evidence is linked or summarized in a non-sensitive way.

## Suggested Obsidian Tasks views

```tasks
not done
path includes 2026-05-23-green-lappe-taskforge-repository
due before tomorrow
sort by priority
```

```tasks
not done
path includes 2026-05-23-green-lappe-taskforge-repository
tag includes #blocked/external
sort by due
```

```tasks
not done
path includes 2026-05-23-green-lappe-taskforge-repository
group by function task.description.match(/\\[epic:: ([^\\]]+)\\]/)?.[1] || "No epic"
sort by due
```
