# LLM-BREADCRUMBS

## Purpose

This pointer is a low-token navigation aid for LLM sessions. It tells a session where it is, how to climb back to the project root, where local history lives, and which session-data implementation owns the format.

## Quick Navigation

- Current pointer: `/Users/kevinlappe/Projects/green-lappe-properties/docs/passoffs/0000-00-00-0000-llm-breadcrumbs.md`
- Project root: `/Users/kevinlappe/Projects/green-lappe-properties`
- Projects root: `/Users/kevinlappe/Projects`
- Canonical implementation: `/Users/kevinlappe/Projects/session-data`
- Canonical command: `python3 -m session_data.llm_breadcrumbs --write`
- Canonical schema: `/Users/kevinlappe/Projects/session-data/schemas/llm-breadcrumbs-v1.schema.json`
- This history folder: `/Users/kevinlappe/Projects/green-lappe-properties/docs/passoffs`
- Local history folders: `/Users/kevinlappe/Projects/green-lappe-properties/docs/passoffs`

## How To Apply

1. Read root instructions at the project root before editing.
2. When a session follows nested history or generated artifacts, use this file to return to the project root and canonical implementation.
3. Treat project-local and global history as peers; choose the one that matches the source evidence instead of assuming either scope is primary.
4. Prefer linked passoffs, source transcripts, and report data over summaries when accuracy matters.

## Data

```json
{
  "$schema": "/Users/kevinlappe/Projects/session-data/schemas/llm-breadcrumbs-v1.schema.json",
  "canonical-command": "python3 -m session_data.llm_breadcrumbs --write",
  "canonical-implementation-root": "/Users/kevinlappe/Projects/session-data",
  "canonical-schema": "/Users/kevinlappe/Projects/session-data/schemas/llm-breadcrumbs-v1.schema.json",
  "generated-at": "2026-05-23T18:46:31-07:00",
  "history-dir": "/Users/kevinlappe/Projects/green-lappe-properties/docs/passoffs",
  "history-dirs": [
    "/Users/kevinlappe/Projects/green-lappe-properties/docs/passoffs"
  ],
  "navigation-rule": "Read downward as needed, then use breadcrumbs to climb back to the project root and canonical implementation.",
  "pointer-path": "/Users/kevinlappe/Projects/green-lappe-properties/docs/passoffs/0000-00-00-0000-llm-breadcrumbs.md",
  "project-root": "/Users/kevinlappe/Projects/green-lappe-properties",
  "projects-root": "/Users/kevinlappe/Projects",
  "schema-version": "1.0.0",
  "scope": "history-folder",
  "scope-policy": "Project-local and global history are peers; use the scope that matches the source evidence."
}
```
