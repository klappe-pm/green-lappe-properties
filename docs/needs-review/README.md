# README

This folder holds the Green Property Solutions residence-to-childcare conversion analysis, staged for review before anything is placed permanently or acted on. Everything here is DRAFT.

## What this analysis says

Green Property Solutions converts other owners' single-family and small residential properties to licensed family child care use: the owner keeps the property and earns premium rent, a licensed resident provider operates the care business, and Green Property Solutions coordinates conversion, placement, and services for fees. Washington (King and Snohomish) is the launch market under both pricing lenses. California is a pricing test, not a market decision: it only works if a provider can collect roughly $1,500 to $2,000 per child per month, which a two-week tuition survey settles.

## One model, one canonical analysis, distinct artifact types

Two sessions ran the same six-county model in parallel; the outputs are now deduplicated by role, so nothing here is a second competing analysis. Every number traces to the two Python models, and one document is canonical for the analysis:

- Canonical written analysis: `2026-07-20-use-of-asset-conversion-analysis.md`.
- Washington operating-model decision brief (this session): `2026-07-22-washington-childcare-license-and-operating-model-decision-brief.md`. It compares the independent resident-provider model with a separate company-operated center model; it does not replace the canonical market analysis.
- Its visual companion (same numbers, presentation form): `green-property-solutions-combined-deck.html`.
- Execution plan (distinct type): `childcare-operator-property-model-strategy.md` plus `childcare/`.
- Regulatory port: `ca-residence-to-childcare-conversion-brief.md`.
- Market study and input register: `orange-county-childcare-tam.md`, `model-inputs-consolidated.md`, with raw search results under `docs/research/conversion-2026-07-20/`.

## Reading order

1. `green-property-solutions-combined-deck.html` starts here. The 15-slide decision deck: both pricing lenses, the reconciled verdict, and the supporting analysis. Open in a browser.
2. `2026-07-20-use-of-asset-conversion-analysis.md` the canonical written analysis of the same model (status REVIEW). The deck and this file are two views of one model, not two analyses.
3. `ca-residence-to-childcare-conversion-brief.md` the Washington-to-California regulatory port: license types, the three rental structures, and how to convert a residence to a care facility (FCCH light, center heavy).
4. `childcare-operator-property-model-strategy.md` the execution plan in before/after, outcome, measure, plan format, with links to the plan docs in `childcare/`. It defers to the canonical analysis for market numbers and the geography verdict.
5. `orange-county-childcare-tam.md` the market study behind the California demand picture.
6. `model-inputs-consolidated.md` the full input register: every fact, model output, assumption, and search result feeding the numbers, with type tags and sources.

## The numbers

- `models/green_property_solutions_model_v2.py` market pricing (Lens A). Run with `python3`.
- `models/green_property_solutions_model_v3.py` host price card plus capacity ramp (Lens B). Run with `python3`.

Every figure in the deck ties to these two models' JSON output to the dollar; an independent pass re-verified this 2026-07-20.

## Open decisions and flags

- D1 geography is resolved by this analysis: Washington launches first; California is conditional on the tuition survey.
- The California go decision rests entirely on collectible tuition. Run the Newport Beach, Irvine, Costa Mesa, and Riverside survey before committing.
- The host price card should be a floor, not a ceiling: where market tuition exceeds it (all of Washington), price to market.
- Design the capacity ramp to license at eight children with the shortest legal solo phase; the solo phase destroys value.
- Model filenames keep their underscore form because the deck's provenance section cites them by that exact name.
