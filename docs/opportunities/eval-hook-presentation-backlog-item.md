---
domain: green-lappe-properties
category: backlog
sub-category: presentation-eval
date-created: 2026-05-19
date-revised: 2026-05-19
doc-type: backlog-item
version: 0.1
doc-status: draft
aliases: []
tags: [backlog, eval-hook, presentations, datastory]
---

# Backlog Item: Build `eval-hook-presentation`

## Goal

Create an eval hook that scores whether repo-native research docs are ready to become a high-quality presentation or partner memo.

## Why This Exists

The Green Lappe docs turned around quickly because they already have useful structure: frontmatter, TL;DRs, headings, tables, explicit caveats, modeled labels, and source inventories. The main friction was not lack of content. It was synthesis friction:

- multiple overlapping TAM/SAM/SOM lenses;
- some facts mixed with assumptions;
- dirty path migrations in the working tree;
- several pitch-critical gaps already named but not yet closed;
- no single claim-to-source index for presentation work.

The hook should catch those issues before deck work starts.

## Acceptance Criteria

The hook should read a docs folder and produce:

1. Presentation readiness score from 0-100.
2. Missing claim-spine fields: audience, decision, big idea, what-is, what-could-be, ask.
3. Source traceability warnings for uncited numbers.
4. Modeled-figure preservation warnings.
5. Slide-readiness map: which docs can produce cover, problem, market, wedge, team, economics, risks, and ask slides.
6. Caveat inventory.
7. Suggested first deck outline.
8. Render-readiness checklist for final PPTX work: style guide, slide source, proof objects, footer/source rules, layout variety.

## Suggested Implementation

- Input: repo root or docs subtree.
- Output: Markdown report plus JSON score.
- Start with rule-based checks; later add model-assisted rubric scoring.
- Use `rg`, frontmatter parsing, heading extraction, table detection, and numeric-claim extraction.
- Keep it offline by default.

## Priority

`priority: P1`

## Area

`area: opportunity-materials`

## Owner

Kevin
