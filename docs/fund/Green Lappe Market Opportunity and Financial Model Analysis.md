---
domain: green-lappe-properties
category: fund
sub-category: market-entry-analysis
date-created: 2026-05-19
date-revised: 2026-05-19
doc-type: analysis
version: 0.1
doc-status: draft
aliases: []
tags:
  - market-sizing
  - financial-model
  - property-management
  - king-county
  - snohomish-county
---

# Green Lappe Market Opportunity and Financial Model Analysis

## Executive Readout

Green Lappe should enter through a narrow, relationship-led Snohomish County single-family property-management beachhead, then expand into King County submarkets where the market is larger and the moat is stronger. The day-one business is not "general property management." It is high-trust management for small owners who are tired of communication gaps, opaque fees, and regulatory risk, delivered with named accountability, visible repair workflows, and pass-through vendor economics.

The local project files support three linked conclusions:

1. The pain is real across all sides of the market: renters, small owners, and PM staff all describe the same broken middle.
2. The addressable market is large enough to support entry: the local small-owner stock is roughly 302,000 doors across King and Snohomish in the Effort 2 model, with a modeled rent roll of about $10.31B.
3. The first year is a proof cohort, not the business at scale: 5 properties at 75% of a full operating year produce about $22K of revenue in the base model and a cash operating loss before founder draw. The strategic question is whether those 5 properties create proof, referrals, and process discipline.

## Opportunity

### Problems

The repo's persona research points to a three-sided system failure:

| Problem | Renter expression | Owner expression | PM staff expression | Product opportunity |
|---|---|---|---|---|
| Communication black hole | Maintenance tickets disappear, no consistent contact, automated approvals with no human follow-up. | Owners feel they are managing the manager after signing. | Staff absorb angry calls from both sides with too many doors and poor systems. | Named owner/resident contact, persistent threads, SLA status, escalation rules. |
| Fee and financial opacity | Portal fees, deposit deductions, unexplained cleaning charges. | Maintenance markups, statements that do not reconcile, surprise renewal/setup fees. | Accounting systems force workarounds and late reporting. | Pass-through vendor pricing, original invoices attached, owner statement built for reconciliation. |
| Regulatory whiplash | Rights exist but are hard to operationalize. | Seattle and state rules feel like landmines. | Notice, screening, deposit, and eviction workflows keep changing. | Compliance-as-product, city-by-city workflow templates, counsel-reviewed notice paths. |
| Maintenance trust collapse | Mold, heat, pests, and water issues are handled late or defensively. | Repairs happen without approval or proof. | Coordinators dispatch blind without photos and vendor context. | Photo-required tickets, approval thresholds, habitability tiering, vendor scorecards. |

The market opening is not that incumbents are absent. It is that incumbents are present but structurally misaligned: high door loads, opaque economics, fragmented communication, and fee models that reward churn or maintenance spread.

### Unmet Needs

The unmet needs are unusually concrete:

- Owners need a manager who answers fast, shows the books, asks before expensive work, and keeps them compliant.
- Residents need repair acknowledgement, visible status, plain-language move-in/move-out documentation, and fewer junk-fee surprises.
- PM operators need workflows that reduce after-hours chaos, legal exposure, and manual accounting reconciliation.

Green Lappe's brand promise maps directly to those gaps: responsive, transparent, local, professional, human.

## Humans

### Persona 1: Resident / Tenant

Residents are not the paying customer, but they determine retention, vacancy, repair load, and reputation. Their core pains are slow maintenance, inaccessible managers, surprise charges, poor move-in/move-out evidence, and hostile lease/payment experiences.

Product job: make the resident experience legible. Every repair should have a timestamp, named owner, SLA tier, next action, and photo trail.

### Persona 2: Small Owner / Landlord

The paying customer is the 1-20 door owner, especially the accidental landlord, relocating homeowner, or small investor who cannot self-manage reliably. Their pain is a trust problem: they fear vendor markups, hidden fees, regulatory mistakes, bad tenant placement, and being trapped in a PM contract they cannot exit cleanly.

Product job: replace trust-by-handshake with trust-by-artifact. The owner should see authority thresholds, original invoices, monthly statement reconciliation, renewal recommendations, compliance status, and an offboarding guarantee.

### Persona 3: PM Staff / Operator

The staff persona matters because Green Lappe's moat cannot survive if the operating model burns out the humans running it. Existing firms show 200-400+ doors per PM, low pay relative to Seattle costs, long on-call rotations, and manual compliance/accounting work.

Product job: design for low door load, vendor triage discipline, document templates, and clear escalation paths before adding volume.

## Scope of Pain

### Door and Household Scope

The local files provide two useful market-sizing cuts:

| Market layer | King County | Snohomish County | Combined | Source posture |
|---|---:|---:|---:|---|
| Small-owner units, Effort 2 model | 228,000 | 74,002 | 302,002 | `small-portfolio-stock-modeled.csv` |
| Small-owner rent roll, Effort 2 model | $8.08B | $2.23B | $10.31B | CSV-derived |
| Self-managed small-owner doors | 177,506 | 58,526 | 236,032 | CSV-derived from 78% self-managed assumption |
| Professionally managed small-owner doors | 50,494 | 15,476 | 65,970 | CSV-derived from 22% managed assumption |

The TAM memo also gives a more conservative small-owner rent roll range of $7.4B-$7.9B. For the financial model, the workbook uses the Effort 2 CSV-derived rollup because it ties directly to the ZIP-level synthesis dataset already in the repo.

### Human Scope

The pain touches more than owners:

- 302,002 modeled small-owner doors are the property-management operating universe.
- 236,032 modeled self-managed doors are the greenfield conversion pool.
- 65,970 modeled professionally managed doors are the incumbent-displacement pool.
- Renters attached to these doors experience the maintenance, fee, deposit, and communication failures documented in the persona research.
- PM staff at incumbents experience the same pain as workload, burnout, and compliance risk.

This is why the deck should frame Green Lappe as a service-design company in a property-management market, not as another local PM shop.

## County Financial Sizing

### King County

King is the larger, higher-revenue, higher-complexity market.

Key local figures:

- 448,717 renter-occupied units in the verified market report.
- Roughly 228,000 modeled small-owner units in the Effort 2 model.
- About $8.08B modeled small-owner rent roll.
- Reconciled in-scope PM base case: 160,000 units, 30% adoption, $3,850 annual fee per managed door, $185M current annual revenue.
- Greenfield King PM entry SAM: 56,000 doors and $216M annual revenue.

Strategic read: King is the moat market. Seattle adds compliance pain; Redmond, Bellevue, and other Eastside nodes add visa-renter, language, and high-fee-per-door upside. The top PM sequencing ZIPs are heavily King-weighted: 98052 Redmond, 98109 Seattle, 98121 Seattle, 98004 Bellevue, and 98101 Seattle.

### Snohomish County

Snohomish is the better entry market despite a lower PM sequencing score.

Key local figures:

- Roughly 74,002 modeled small-owner units.
- About $2.23B modeled small-owner rent roll.
- Reconciled market report base case: 37,000 in-scope units, 27% adoption, $3,400 annual fee per managed door, $34M annual current revenue.
- Launch memo directs phase 1 to Snohomish County SFRs, 2-5 properties in year one, because the Megan Green network creates warm acquisition and operational focus.

Strategic read: Snohomish is the proof market. It has less regulatory overhead, stronger warm-start access, and enough single-family stock to validate the promise before taking on King County's complexity.

## TAM / SAM / SOM

### TAM

There are two TAM lenses:

| TAM lens | Doors / stock | Revenue basis | Use |
|---|---:|---:|---|
| Two-county full small-owner stock | 302,002 doors | $10.31B modeled rent roll; $1.03B at 10% PM fee equivalent | Big-market framing |
| Small-owner serviceable PM market | King $185M + Snohomish $34M current served revenue | $219M current annual served market | Nearer-term operator framing |

The first is the theoretical revenue pool if all small-owner rental stock used professional management. The second is a more realistic market-entry lens based on current adoption and fee-per-door assumptions.

### SAM

The best deck SAM is the local report's King County entry SAM:

| SAM | Doors | Annual revenue | Why it matters |
|---|---:|---:|---|
| King County entry SAM | 56,000 | $216M | Realistic 3-5 year addressable market after filtering out permanent self-managers, out-of-submarket owners, and locked contracts. |
| Snohomish current served base | ~9,990 currently managed doors | $34M | Practical launch beachhead; 37,000 in-scope units at 27% adoption. |

### SOM

The project files define three SOM cases:

| Scenario | Y3 doors | Y3 revenue | Y5 doors | Y5 revenue | Strategic meaning |
|---|---:|---:|---:|---:|---|
| Bootstrapped | 200 | ~$770K | 400 | ~$1.5M | Referral-led, no major capital requirement. |
| Funded boutique | 700-1,000 | ~$2.7M-$3.85M | 1,800-2,500 | ~$7M-$9.6M | Requires team, systems, and repeatable owner acquisition. |
| Funded + M&A | 1,200-1,400 | ~$4.6M-$5.4M | 3,000-3,500 | ~$11.5M-$13.5M | Requires tuck-in acquisition and integration discipline. |

The recommended Green Lappe entry cut is below even the bootstrapped SOM at first: 5 doors in year one, 12 in year two, then prove whether 40, 100, and 200 doors can be reached without breaking service quality.

## Where Green Lappe Can Enter and Build a Moat

### Entry Wedge

The immediate wedge is not the highest-scoring PM ZIP. It is the highest-conversion launch motion:

- Geography: Snohomish County first.
- Product: single-family property management.
- Channel: Megan Green's recent-buyer, recent-seller, and relocating-owner network.
- Offer: small-portfolio, named-contact, transparent-fee PM.
- Operating promise: no maintenance markup, owner approval thresholds, repair SLAs, clean offboarding, annual property review.

### Expansion Wedge

The expansion wedge is King County, especially Redmond/Bellevue/Seattle submarkets where the repo's scoring finds stronger PM demand and more defensible complexity:

- 98052 Redmond: highest PM sequencing score, 7,925 renter households in small-portfolio stock, strong visa-renter density.
- 98004 Bellevue: high fee-per-door and multilingual demand.
- Seattle ZIPs: higher compliance complexity, which can become a compliance moat if the workflow is actually better.

### Durable Moat

Green Lappe's moat should be built in layers:

1. Trust artifact moat: owner statements, invoices, photos, repair logs, and approval records that incumbents do not consistently provide.
2. Service SLA moat: same-business-day owner acknowledgement and habitability fix-or-explain commitments.
3. Compliance workflow moat: city-by-city templates for notice, deposit, screening, renewal, rent increase, and offboarding.
4. Language and relocation moat: Eastside and Northshore screening/leasing flows for Mandarin, Hindi/Telugu, Russian/Ukrainian, and other language clusters already identified in the repo.
5. FCC option moat: licensed family child care conversion competence, kept out of the day-one homepage but used as a sophisticated-owner second-meeting differentiator.

## Financial Model Analysis

The attached workbook uses the user's year-one assumption: 5 properties under management at 75% of a full operating year. It models a conservative quality-first base case, not the funded boutique SOM case.

### Base Case Summary

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Ending managed doors | 5 | 12 | 40 | 100 | 200 |
| Total revenue | ~$21.9K | ~$44.5K | ~$156.6K | ~$419.0K | ~$847.3K |
| Cash operating costs | ~$35.3K | ~$58.7K | ~$141.9K | ~$284.4K | ~$518.0K |
| Contribution before founder draw | (~$13.3K) | (~$14.2K) | ~$14.7K | ~$134.6K | ~$329.3K |
| Contribution margin | -60.8% | -32.0% | 9.4% | 32.1% | 38.9% |

Interpretation:

- Year 1 is intentionally small and unprofitable because it buys operating proof.
- Year 2 remains a validation year: the business must prove retention, referrals, and repeatable onboarding.
- Year 3 is the first year the base case turns contribution-positive before founder draw.
- Year 4-5 are where the model starts to resemble a business line rather than a professional services pilot.

### What Has to Be True

For the base case to work:

- The first 5 owners must be warm-acquired or very low CAC.
- Owner retention must be 100% in the first cohort.
- Resident renewal must hit the launch memo's 70% target.
- No maintenance markup means Green Lappe must make margin through management fee, leasing, renewal, setup, and low rework, not hidden spread.
- The operating templates have to keep door count per operator deliberately low until the SLA model is proven.

### What Would Break the Model

- Taking low-fit owners just to add doors.
- Entering Seattle compliance-heavy properties before the Snohomish operating loop is stable.
- Underpricing the flat fee below the documented $3,400-$3,850 annual revenue-per-door market reality.
- Letting founder time hide the true cost of service.
- Adding FCC conversions before standard PM quality is stable.

## Deck Input: Recommended Slide Flow

1. **The broken middle:** renters, owners, and PM staff all suffer from the same operating failures.
2. **The human pain:** three personas, three journeys, same root causes.
3. **The scale:** 302K modeled small-owner doors, 236K modeled self-managed doors, $10.31B modeled rent roll.
4. **The county cut:** Snohomish for entry, King for scale and moat.
5. **The market map:** TAM $1.03B at 10% of modeled rent roll; $219M current served market; $216M King entry SAM.
6. **The wedge:** small SFR owners in Snohomish through Megan's network.
7. **The moat:** transparent financial artifacts, repair SLAs, compliance workflows, language access, FCC option.
8. **The financial truth:** 5 properties validate service, not scale; 200 doors begins to matter; funded boutique SOM is 1,800-2,500 doors by Y5.
9. **The ask / next proof:** secure legal/software/banking foundation, move founding property under the standard, sign first 5 owners, measure SLA/retention/referral proof.

## Risks and Open Questions

| Risk | Why it matters | Mitigation |
|---|---|---|
| Licensing gate | Washington property management is brokerage activity. | Resolve managing broker / firm license path before taking third-party rent. |
| Founder time is under-modeled | Early service quality will depend on partner labor. | Track time per property from day one; update direct ops cost after first quarter. |
| Snohomish-to-King transition | King County adds regulatory complexity and higher expectations. | Expand first to adjacent north King only after templates are stable. |
| Flat fee calibration | Underpricing can make transparency financially impossible. | Price to at least the documented $3,400-$3,850 annual revenue-per-door market band. |
| FCC distraction | FCC is a real moat but adds underwriting, insurance, zoning, and operator risk. | Keep FCC as phase-three wedge unless a uniquely strong owner/provider pair appears. |

## Files Reviewed for This Deliverable

Primary inputs:

- `README.md`
- `docs/design/PNW Property Management Pain Points - Three Personas, One Broken Middle.md`
- `docs/design/Brand Style Guide.md`
- `docs/gtm/Launch Prioritization.md`
- `docs/gtm/Go-to-Market (GTM) Plan v.1.md`
- `docs/research/unit-economics/Total Addressable Market (TAM).md`
- `docs/research/unit-economics/Total Addressable Market (TAM) — Residential Property Management Services.md`
- `docs/research/unit-economics/Customer Acquisition Costs (CAC) Model.md`
- `docs/research/competitors/Non-Institutional Small Landlord PM Market, King and Snohomish Counties.md`
- `docs/research/competitors/Independent Property Management Companies, King and Snohomish Counties.md`
- `docs/research/reports/effort-2/small-portfolio-stock-modeled.csv`
- `docs/research/reports/effort-6/final-report.md`
- `docs/research/reports/effort-6/top-10-pm-sub-markets.md`
- `docs/research/reports/effort-6/green-lappe-final-dataset.csv`

Supporting context reviewed across strategy, metrics, demographics, regulatory, and launch materials in the repo. No web search was used.
