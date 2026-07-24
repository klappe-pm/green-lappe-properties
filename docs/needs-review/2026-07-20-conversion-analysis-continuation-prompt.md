---
domain: green-property-solutions
category: prompt
sub-category: financial-model
date-created: 2026-07-20
date-revised: 2026-07-20
type: prompt
status: DRAFT
aliases:
  - conversion analysis continuation prompt
tags:
  - conversion
  - fcch
  - handoff
  - npv
  - prompt
---

# 2026-07-20-conversion-analysis-continuation-prompt

Paste everything below the divider into a new session. It contains everything determined to date, the open decisions, and the remaining research. Reference files live in the 2026-07-20 session scratchpad (`/private/tmp/claude-501/-Users-kevinlappe/b3888cd5-b551-45f6-affa-097b44e52c2d/scratchpad/`) and in this repo under `docs/needs-review/`.

---

You are continuing a decision-grade analysis for Green Property Solutions. Be a research, thinking, and writing product partner. Do not re-derive settled facts. Do not invent scenario labels. Ask before assuming on anything listed under open decisions.

## The Business (settled)

Green Property Solutions evaluates other owners' single-family and small residential properties entering the market, turning over, or entering management to find their highest-value feasible use. Green Property Solutions owns nothing; the owner is the customer and retains title. The core result is annual owner net value per usable square foot, after actual owner costs, compared first with a conventional residential rental. Child care is one branch, not a default, and must be ranked against conventional renters and any other owner-approved use. A licensed resident provider operates the care business as lessee only in the family-home branch; a company-operated center is a separate licensed-operating-company branch. The thesis: owners with locked mortgages and owners bringing a property to market may need the highest productive use of square footage without selling. The pitch: GPS gives the owner a defensible, property-specific use decision and executes the winning owner-approved path.

## Pricing (settled)

$2,000 per child per month not-potty-trained, $1,500 potty-trained, full-time 5 days/week. This is the price, not a scenario. Partial-week optimization comes later. WA market tuition ($2,300-2,600 infant) exceeds this price; treat the price as the floor there and note market upside. Do not build a "card vs market lens" framing; it was tried and rejected as useless.

## Cost Ownership (settled)

- Conversion capex: owner absorbs, Green Property Solutions facilitates (confirmed for WA; a similar CA model is TBD, open decision below).
- Licensing costs: Green Property Solutions.
- Utilities, cable, internet, variable: operator or Green Property Solutions; anything GL fronts passes to the owner at a 10% margin on top of the management fee.
- Management fee: model 5, 7, 8, 9, 10, 11, 12 percent of monthly rent, both rental and care facilities.
- Maintenance: baseline on residential SFH/townhome actuals ($1,000-2,500/unit/yr SoCal benchmark), care-wear multiplier ~1.5x, not invented daycare figures.

## Regulatory Determinations (primary-source verified 2026-07-20)

- CA FCCH (by-right statewide under SB 234 / HSC 1597.45; provider must reside, HSC 1596.78): small 4 solo (all infants) / 6 (max 3 infants) / 7-8 conditional (max 2 infants, needs one K-enrolled child plus one 6+, landlord consent if rented, HSC 1597.44). Large (licensee + assistant, assistant may be 14+, 22 CCR 102352(a)(3)): 12 (max 4 infants) / 13-14 conditional (max 3 infants, HSC 1597.465). Hard cap 14. Infant = under 2.
- WA family home (residency mandatory, RCW 43.216.010): capacity tied to licensee experience; 2+ yrs plus assistant = 12 (max 6 under-2); waiver 13-16 (WAC 110-300-0358: 3+ yrs experience, ECE certs, sqft minimums, sprinkler). License attaches to facility; provider credentials portable; DCYF 90-day decision (RCW 43.216.305).
- Center-in-residence: WA expressly allowed (WAC 110-300-0010(4)), CA needs local CUP plus fire conversion. FAILS at this price point: a 28-kid config with 4 teachers plus director loses money in both WA counties (staffing $22,813/mo eats the revenue). The 2-staff family-home configurations are the profit frontier. CA best config: L14 (14 kids, 3 npt + 11 pt = $22,500/mo gross at 100%). WA best: H16 waiver (6 npt + 10 pt = $27,000/mo) or H12.
- Providers assumed licensed and qualified day one (recruiting filter, not a licensing assumption). Owner-occupancy by the provider assumed wherever residency is required.

## Model Results To Date (v5 grid, 2026-07-20; files green_property_solutions_model_v2/v3/v4.py plus inline v5)

- Method: provider affordability ceiling = gross tuition minus assistant (market wage x1.18 load), supplies, insurance, GL fees, $55,000 provider living income, capped at 35% of gross; premium = ceiling minus market SFR rent, x0.92 provider-continuity haircut; owner NPV 10-yr at 7.43%; owner absorbs ~$25K capex; $12K reconversion at exit. Provider time-space tax uplift (+~13% rent capacity) included in v5.
- Owner NPV per conversion at 5/7/8/9/10/11/12% fee ($K): King 506/495/489/483/478/472/467; Snohomish 456/446/441/436/431/426/421; Riverside 325/318/314/310/307/303/299; San Diego 252/246/243/240/237/234/231; LA 244/238/235/232/230/227/224; Orange 228/222/219/217/214/211/209.
- GL revenue per door per year at the same fees ($K): King 7.0 to 15.8; Snohomish 6.2 to 14.0; CA counties 5.2 to 11.6. Fee sensitivity to the owner is ~1% of NPV per point; the fee level is a GL revenue and positioning decision, not an owner negotiation.
- Monthly premiums (ceiling plus tax uplift minus rent, churn-adjusted): King $6,050; Snohomish $5,490; Riverside $4,007; SD $3,179; LA $3,087; Orange $2,903. WA premiums use market tuition; CA use the $2,000/$1,500 price.
- Solo-phase finding: X=6 solo does not cover market rent anywhere; X=8 (CA conditional small) turns it positive; each extra month before the assistant costs ~$1,800 NPV (King). Design target: X=8, shortest legal Y.
- WA ZIP ranking (effort-6 zones, at the price): 98012 Bothell $123K NPV best (241 kids/100 slots, 15-mo payback), then 98029 Issaquah, 98021 Bothell, 98074 Sammamish, 98052 Redmond, 98077 Woodinville, 98075 Sammamish.

## Shortage Dataset (researched 2026-07-20; full detail in scratchpad task outputs)

- Current under-5: LA 474K, OC 155K, Riverside 143K, SD 177K, King 117K, Snohomish 50K (ACS 2024). Licensed slots: LA 217K, OC 86K, Riverside 40K, SD 101K (2023 Portfolio, still current-published); King 83K, Snohomish 20K (CCA of WA Dec 2024).
- Care need (children under 6 with all parents in labor force, ACS 2024): LA 387K, OC 128K, Riverside 103K, SD 136K, King 94K, Snohomish 40K. Slots per child needing care: Riverside 0.39 and Snohomish 0.51 thinnest; King 0.88.
- Projections ages 0-4 to 2030 (DOF Vintage 2026 / OFM 2022 med): LA -4.9%, OC -5.5%, SD -8.4%, Riverside -2.5%, King +2.9%, Snohomish +2.8%. CA young-child population is SHRINKING; WA grows.
- CA universal TK is removing 4-year-olds from the private market: 2025-26 projected TK enrollment LA 48K, OC 18K, SD 22K, Riverside 15K. CA shortage concentrates in under-3s, which is the $2,000 seat. WA supply grew +10-12% 2020-2024; CA supply flat with LA declining outright (-3,309 slots 2021-2023).
- Workforce: childcare median wage $13.67-15.66/hr; a childcare worker's rent burden is 70-80% of gross in every study county; housing scarcity constrains care supply, supporting the provider-housing-included model.
- Flagged unverified: WA Fair Start 75% SMI timing and 2027 rate-percentile change; Head Start 2025-26 federal status; WA Task Force slots-needed estimate.

## Competitors (researched 2026-07-20)

Only one property-side player exists: Mission Driven Finance's CARE fund (25 properties, ~488 seats, $14M, philanthropy-capitalized; San Diego, Las Vegas, Colorado; NO Washington presence). Platforms (Wonderschool, Upwards, Winnie, BridgeCare) are software-only. Services-only launch startups died (MyVillage; NeighborSchools via Higher Ground Ch.11 2025). Commercial-center capital avoids residential; EPR REIT is exiting education. WA facility grants (ELF) are 5x oversubscribed ($277M sought vs $56M available). Conclusion: WA residential conversion is genuine white space.

## Macro Anchors (July 2026)

Fed 3.50-3.75% holding, hawkish SEP; 30-yr mortgage 6.55% (PMMS), forecasts ~6.3-6.5% through 2028; HELOC 7.43% (owner discount rate); CPI 3.5%; equity hurdle convention 10-12%. Housing: CA 2.5M units short, WA 1.1M by 2044 (King 337K, Snohomish 143K). Rate-locked owner share ~55% of WA small owners (prior research): that is the supply funnel for the pitch.

## Tax Chain (deep-dive VERIFIED 2026-07-20; full citations in session task output)

- Provider: IRC 280A(c)(4) confirmed, renters included (Pub 587 verbatim); deduction = time-space percentage, realistically 30-40% of rent and utilities for a full-time provider, higher only with documented exclusive-use rooms; 280A(c)(5) gross-income limit (no losses from home expenses); standard meal rates (2025: breakfast $1.66, lunch $3.15, snack $0.93); SE tax; QBI applies (not an SSTB). Effective rent subsidy roughly $650-900/mo at a 30% marginal rate.
- Bifurcated lease (commercial daycare lease plus housing lease): NO supporting authority found; statute cuts against it (280A(a)/(f)(1) keys off the dwelling unit); treat as unsupported form over substance. Worse, designating >20% of gross rent as commercial risks flipping the OWNER's depreciation from 27.5-yr residential to 39-yr under the 168(e)(2)(A) 80% dwelling-unit test. Single market-rate residential lease with a documented exclusive-use-rooms addendum is the defensible structure.
- Owner: Schedule E; live-in provider keeps the building 27.5-yr residential (statutory-text application, no direct ruling); fencing/land improvements = 15-yr and 100% bonus-eligible federally (OBBBA restored bonus for property placed in service after 2025-01-19; CA does not conform); de minimis safe harbor $2,500/item; Section 179 and QIP unavailable on residential rentals. CA: 7% nonresident withholding on rents over $1,500/yr with the property manager as withholding agent (Form 592; waivers via 588/589). Prop 13: daycare use alone does not reassess, but major conversion work can be assessed as new construction for the altered portion (R&T 70(a)). WA: rent is B&O-exempt to the owner (WAC 458-20-118); no use-based property-tax reclassification.
- Green Property Solutions: fees are ordinary income; WA B&O Service rate 1.5% (<$1M gross), 1.75% ($1-5M), 2.1% ($5M+); marked-up pass-throughs are fully B&O-taxable (WAC 458-20-111 agency exclusion fails on markup); LA city business tax $4.25 per $1,000 on management fees if operating there. WA child-care B&O: providers exempt through 2035 for under-13 care (RCW 82.04.2905), a small tailwind for operators.
- Chain reality: the owner picks up 100% of rent as income while the provider deducts ~30-40%, so the chain is not a net write-off machine; keep every lease at documented market rate and arm's length (related-party and circular structures invite recharacterization). Never let GL take title or master-lease.

## Open Decisions (decide before building more)

1. GL monetization: owner-side fees only (~$10-13K/door/yr at 10%, needs ~45 doors by year 5 for ~$600K revenue) vs adding an operator-side services fee (billing, enrollment, compliance; restores ~$30-40K/door). The biggest open product decision.
2. Management fee level to lead with (owner NPV is insensitive; 9-10% matches incumbents; 11-12% defensible given the premium delivered; 5-7% only as a first-cohort hook).
3. CA cost-ownership structure (WA settled: owner absorbs conversion; CA "similar model TBD").
4. Whether the CA price of $2,000/$1,500 is validated by a primary tuition survey before any CA commitment (it runs 25-60% above prevailing CA FCCH rates; survey Newport Beach, Irvine, Costa Mesa, and Riverside target ZIPs; roughly 2 weeks of work).
5. Provider recruiting mechanism and the X=8 / short-Y licensing design (WA needs 2-3+ yr experienced licensees for 12-16 capacity).
6. Deliverable form: the operator rejected narrative/lens decks and "action maps" as off-target; ask before building the next deliverable shape. Design must use the GPS brand book (`brand-book/green-property-solutions-brand-book.html`): mono-label eyebrows, Geist tight-tracked display, Newsreader prose, 4px radii, ink-dark cover, ratio-bar components, status tokens (success #3E7A55, warning #A8741A, error #9C2D1F); never the generic cream-card grid.

## Remaining Research

1. Childcare costs by county THEN by city (required, not started): city-level FCCH and center tuition for target cities in all six counties; re-rank within counties afterward.
2. WA Fair Start subsidy changes and Head Start status (404-blocked last pass).
3. Primary tuition survey design for Orange and Riverside (the CA gating item).
4. Assisted care (option C) full model: same affordability-ceiling method with an RCFE operator; six-bed board-and-care grosses $4,000-6,500/resident/mo; 24/7 staffing; stub inputs already gathered.
5. Tax leftovers: 2026 CACFP-based meal rates; RCW 82.04.394 on-site-personnel exclusion; WA assessor practice on home-daycare valuation; Tax Court time-space case line.

## File Inventory

- Repo (branch claude/session-20260720-172255, PR #73 open): `docs/needs-review/2026-07-20-use-of-asset-conversion-analysis.md` (v2/v3-era; supersede its scenario labels with this prompt).
- Scratchpad: `model-inputs-consolidated.md`; `search-results-{ca-rental-pm, ca-childcare, rates-wa, c-stub, competitors-macro, ratios-licensing}.md`; `green_property_solutions_model_v2/v3/v4.py` plus JSON outputs; recovered research corpus under `recovered/` (194 docs: TAM, effort-0 through effort-6 ZIP scoring, FCC wedge strategy, GTM plan).
- Deck artifact (superseded framing; keep URL for redeploy): claude.ai/code/artifact/93d503c8-aa4f-43b9-bdb5-3da65f11a117.
- Calibration asset: 4632 146th Pl SE Bothell 98012 (4/2.5, 2,250 sqft, $1M value, $485K @ 2.625%, rent $3,900; files in `~/Vaults/trust-documents/`).

## Behavioral Notes for the Next Session

Owner is a product operator, not a client for hedging: lead with answers, quantify plainly, say when something fails. Ask the open-decision questions before modeling past them. Do not build deliverables that were not asked for. Verify time-sensitive figures by search, never from memory. All prose one line per paragraph, no em-dashes (repo rules auto-enforce).
