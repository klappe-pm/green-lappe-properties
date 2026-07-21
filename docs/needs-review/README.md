# README

This folder holds the Green-Lappe residence-to-childcare conversion analysis, staged for review before anything is placed permanently or acted on. Everything here is DRAFT.

## What this analysis says

Green-Lappe converts other owners' single-family and small residential properties to licensed family child care use: the owner keeps the property and earns premium rent, a licensed resident provider operates the care business, and Green-Lappe coordinates conversion, placement, and services for fees. Washington (King and Snohomish) is the launch market under both pricing lenses. California is a pricing test, not a market decision: it only works if a provider can collect roughly $1,500 to $2,000 per child per month, which a two-week tuition survey settles.

## Two overlapping renderings, one model

This folder now contains work from two sessions that ran the same six-county model in parallel. They agree on the verdict and draw on the same inputs, but they are not yet deduplicated. Reconcile them before anything graduates to a permanent location.

- Session A (this branch): the decision deck, the California conversion brief, the strategy in before/after/outcome/measure/plan form, and the two Python models.
- Session B (merged earlier via #73): `2026-07-20-use-of-asset-conversion-analysis.md`, a markdown rendering of the same analysis, plus `2026-07-20-conversion-analysis-continuation-prompt.md` and the raw search results under `docs/research/conversion-2026-07-20/`.

The deck and Session B's markdown analysis are two views of the same numbers. Pick one as canonical, or merge them; do not maintain both.

## Reading order

1. `green-lappe-combined-deck.html` starts here. The 15-slide decision deck: both pricing lenses, the reconciled verdict, and the supporting analysis. Open in a browser.
2. `2026-07-20-use-of-asset-conversion-analysis.md` the sibling session's full markdown analysis of the same model (status REVIEW). Read alongside the deck; reconcile the two.
3. `ca-residence-to-childcare-conversion-brief.md` the Washington-to-California regulatory port: license types, the three rental structures, and how to convert a residence to a care facility (FCCH light, center heavy).
4. `childcare-operator-property-model-strategy.md` the strategy in the project's before and after, outcome, measure, plan format, with links to the implementing plan docs in `childcare/`.
5. `orange-county-childcare-tam.md` the market study behind the California demand picture.
6. `model-inputs-consolidated.md` the full input register: every fact, model output, assumption, and search result feeding the numbers, with type tags and sources. The raw search results behind it are under `docs/research/conversion-2026-07-20/`.

## The numbers

- `models/green_lappe_model_v2.py` market pricing (Lens A). Run with `python3`.
- `models/green_lappe_model_v3.py` host price card plus capacity ramp (Lens B). Run with `python3`.

Every figure in the deck ties to these two models' JSON output to the dollar; an independent pass re-verified this 2026-07-20.

## Open decisions and flags

- D1 geography is resolved by this analysis: Washington launches first; California is conditional on the tuition survey.
- The California go decision rests entirely on collectible tuition. Run the Newport Beach, Irvine, Costa Mesa, and Riverside survey before committing.
- The host price card should be a floor, not a ceiling: where market tuition exceeds it (all of Washington), price to market.
- Design the capacity ramp to license at eight children with the shortest legal solo phase; the solo phase destroys value.
- Model filenames keep their underscore form because the deck's provenance section cites them by that exact name.
