---
domain: green-lappe-properties
category: financial-model
sub-category: use-of-asset
date-created: 2026-07-20
date-revised: 2026-07-20
type: analysis
status: REVIEW
aliases:
  - conversion product analysis
  - use-of-asset six-county model
tags:
  - conversion
  - fcch
  - npv
  - property-management
  - tam-sam-som
---

# 2026-07-20-use-of-asset-conversion-analysis

## Purpose and Frame

Green-Lappe converts other owners' single-family and small residential properties to licensed family child care use for higher productivity per square foot. The owner keeps the property and earns premium rent; a licensed resident provider operates the care business; Green-Lappe supplies conversion coordination, provider placement, and ongoing services for fees. This analysis answers, per county and per Washington zone: can that product be sold there? Markets in decision order: Orange, San Diego, Riverside, Los Angeles (CA); Snohomish, King (WA). An early model iteration priced the operators running care themselves; that framing was wrong and is superseded. Reference models: `models/green_lappe_model_v2.py` (market pricing) and `models/green_lappe_model_v3.py` (host price card and capacity ramp) in this folder. This document is the canonical written analysis; its visual companion is the deck `green-lappe-combined-deck.html` (hosted at claude.ai/code/artifact/ec65dddb-c4d3-402e-80c1-ce9610f523ba). Both render the same two models; neither is a second analysis.

## Method

The rent a provider can pay is derived, not assumed: gross tuition at licensed capacity and utilization, minus an assistant at market wage, supplies, insurance, a 10% Green-Lappe services fee, and a $55,000 provider living income, capped at 35% of gross revenue. Where that ceiling clears market SFR rent, the owner has a conversion premium; where it does not, a family tenant outbids the provider and there is no product. Owner NPV is 10 years at 7.43% (current HELOC), net of a 9% management fee on premium rent, an 8% provider-continuity haircut (12 to 14 percent annual licensing churn proxy), $22,000 mean conversion capex plus a $10,000 coordination fee, and $12,000 reconversion at exit. All time-sensitive inputs were searched July 2026 and adversarially re-verified against primary sources: 29 of 30 claims confirmed, 1 corrected (Seattle FY2026 FMR 3BR $3,272 / 4BR $3,847).

## Scenario A: Market Pricing (v2)

Tuition at county market rates (CA 2023 Portfolio medians escalated 30% to the 2024 CCAoA statewide anchor; WA prior-research rates). Ceiling vs market rent per month: Orange $5,297 vs $4,400 (+$897); San Diego $2,977 vs $4,100 (−$1,123); Riverside $1,827 vs $3,200 (−$1,373); Los Angeles $2,985 vs $4,200 (−$1,215); Snohomish $8,211 vs $3,300 (+$4,911); King $9,282 vs $3,900 (+$5,382). Productivity per square foot per year: Snohomish $17.6 to $43.8, King $20.8 to $49.5, Orange $23.5 to $28.2; negative change in the other three. Owner NPV where viable: King $381,612 (7-month payback), Snohomish $344,902 (8-month), Orange $32,026 (43-month). Green-Lappe fees per converted door per year: King $41,849, Snohomish $37,020, blend $39,434, plus $10,000 one-time. Platform ramp 1/3/6/10/15 doors over five years: year-5 revenue $641,518, EBITDA $607,752 on roughly 2,850 platform hours ($213 per hour). Crossover tuition (rate per child per month at which the provider matches a market tenant) is nearly uniform: $1,394 to $1,515 across all six counties. Verdict under market pricing: the product sells in Washington, cannot be sold in San Diego, Riverside, or Los Angeles, and is thin in Orange (+6% headroom).

## Scenario B: Host Price Card and Ramp (v3)

Host inputs 2026-07-20: $2,000 per month non-potty-trained (capped at 4 children per the CA infant limit and WA under-2 band), $1,500 potty-trained; capacity ramp X kids solo for Y months then Z kids with an assistant (base X=6, Y=12, Z=12); 4 licensing dead months. These inputs were not in the prior estimate and change it materially. Full-capacity ceiling / premium / owner NPV / payback: Orange $6,055 / +$1,523 / $62,831 / 23 mo; San Diego $6,016 / +$1,763 / $82,698 / 20 mo; Riverside $5,977 / +$2,555 / $147,379 / 14 mo; Los Angeles $6,006 / +$1,662 / $74,579 / 21 mo; Snohomish $5,745 / +$2,249 / $124,682 / 16 mo; King $5,745 / +$1,697 / $79,841 / 21 mo. Solo-phase premiums are negative or nil everywhere (−$1,016 to +$88), so every month of Y costs the owner roughly $1,800 of NPV (King: $90,925 at Y=6 down to $58,390 at Y=24); X=8 turns the solo premium positive (+$340) and is the preferred small-license configuration where the statutory age mix allows it. Washington zone ranking (effort-6 eligible ZIPs, utilization scaled by slot gap, school composite as retention proxy): 98012 Bothell $123,049 NPV (premium $2,272, 15-month payback, 90% utilization on a 241-per-100 slot gap); 98029 Issaquah $93,155; 98021 Bothell $87,315; 98074 Sammamish $70,734; 98052 Redmond $57,420; 98077 Woodinville $42,473; 98075 Sammamish $35,000.

## Findings That Need Review

1. A uniform price card inverts the geography: the premium becomes rent-driven, so the lowest-rent markets win. Riverside jumps to first among counties and 98012 Bothell leads the zones, while high-rent Sammamish falls to the bottom. Rent is the competing bid against the provider.
2. California realization risk is the controlling assumption: $2,000/$1,500 runs 25 to 60 percent above prevailing CA family-child-care rates (Riverside market FCCH infant roughly $1,300 escalated), against subsidy ceilings frozen at January 2022 levels. The CA verdict under scenario B holds only if those prices are collectible; Riverside carries the most risk (worst tuition-to-income ratio, 0.27).
3. The card underprices Washington: WA market rates are $2,300 to $2,600, so scenario B cuts WA premiums from about $4,500 to $5,000 down to $1,700 to $2,300. The optimized configuration prices WA at market and treats the card as a floor, preserving scenario A's Washington economics.
4. The solo licensing phase is a cost of entry, not a business; compress Y via the CDSS director-experience waiver where grantable and license at X=8 rather than 6.
5. Optimized blend recommendation pending host sign-off: market pricing in WA, host card in CA contingent on a primary tuition survey (Newport Beach, Irvine, Costa Mesa for Orange; equivalent for Riverside), X=8, launch zone 98012.

## Inputs Carried as Bands, Not Facts

CA tuition realization at the host card; Cost of Care Plus supplement exact amounts; county R&R rate sheets (none published); direct 1-to-3-year FCCH closure rate (Minnesota 12 to 14 percent annual churn used as proxy); SoCal-specific conversion capex pricing (national data); per-ZIP WA rents (research-derived bands); WA under-2 capacity band; provider living income threshold ($55,000; ceiling moves $833 per month per $10,000 where the residual binds, $0 where the 35% cap binds).

## Sources

HUD FY2025/FY2026 FMR schedules; Zillow ZORI county and SFR files (June 2026); Census HVS Q1 2026 and ACS 2024; Zumper July 2026; Freddie Mac PMMS 6.55%; Bankrate HELOC 7.43%; WSJ Prime 6.75%; 2023 California Child Care Portfolio county sheets; CDSS RMR ceiling lookup (frozen at 1/1/2022); CACFP 2025-26; CDSS and DCYF fee schedules; 22 CCR 102369 and 102417; CIV 1947.12 and 1950.5; B&P 10130/10131; HSC 1596.78, 1597.41, 1569; RCW 18.85; WA HB 1217 Commerce announcements (2026 cap 9.683%, 2027 cap 10.0%); WA DCYF LFH base rates (July 2025); recovered Green-Lappe research corpus (git 47b51ac~1: TAM, effort-0 through effort-6 zone and school analysis, FCC wedge strategy, GTM plan).
