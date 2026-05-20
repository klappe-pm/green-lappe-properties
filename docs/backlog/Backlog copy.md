---
domain: claude-skills
category: backlog
sub-category:
date-created: 2026-05-18
date-revised: 2026-05-18
type: backlog
version: "0.1"
status: active
llm-provider: Claude
llm-model:
llm-session:
llm-session-data:
aliases:
tags: [backlog, project-management]
---

# Backlog

> See [[Backlinks Backlog]]

This document tracks open work, completed items, and ghost links for the Claude skills project.

## Active

### Cross-tool

- [P1] Define Codex CLI skill loading mechanism for CI/CD pipelines
- [P2] Define ad hoc local LLM skill usage patterns
- [P2] Design and build skill-loading support for Cursor and Windsurf
- [P2] Design and build skill-loading support for Gemini CLI
- [P2] Design and build skill-loading support for local LLMs (Ollama, llama.cpp, etc.)
- [P2] Remove local LLM scope from existing skills and docs; flag any docs currently scoping for local
- [P2] Steps 1, 2, 3 from prior planning for non-Claude tool support (specifics TBD)

### Infrastructure

- [P1] Define hook trigger timing for ghost link creation (on save, PR open, PR merge, manual)
- [P1] Define hook scope (companion file, backlog, glossary, or all three)
- [P1] Define hook mechanism (git hook, CI action, editor plugin, slash command)
- [P1] Implement target verification mechanism for backlink target existence checks
- [P2] Build duplicate detection automation in the backlog
- [P2] Build external issue tracker integration (GitHub Issues, Linear, Jira)
- [P2] Build vault-wide index for YAML and tag consolidation usage counts

### Skills

- [P1] Build ghost-links skill (file structure, parent-doc grouping, alphabetization)
- [P1] Build glossary-maintenance skill (PR-driven updates, term changes, new ghost links)
- [P2] Decide skill decomposition: one skill or several for key term extraction, companion file maintenance, ghost links, glossary
- [P2] Document skill compatibility matrix across Claude, Codex, Cursor, Gemini, local

### Taxonomy

- [P2] Define disambiguation rule when a key term could refer to multiple notes (e.g., "Diane")
- [P2] Define key term scope for LLM-related terms (prompt, model, agent, etc.)
- [P2] Define key term scope for product management entities (opportunities, problems, ideas, concepts, users, segments, markets, competitors)
- [P2] Pilot the key term and companion file workflow on one project before automating

### Workflow

- [P1] Implement operational companion file structure (categories, term lists, alphabetization within categories)
- [P1] Implement ghost links file workflow (H2 Ghost Links section, per-parent H3, category structure)
- [P2] Define command surface for backlog, ghost links, and glossary across Claude Code and Codex

## Completed

## Ghost Links
