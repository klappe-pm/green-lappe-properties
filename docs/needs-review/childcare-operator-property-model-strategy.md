# Childcare Operator Property Model Strategy

- Date: 2026-07-20
- Status: DRAFT
- Role: execution plan (before/after, outcomes, measures, and the plan docs in `childcare/`). For the market analysis and the geography verdict, see the canonical analysis below; do not read this as a competing market study.
- Canonical analysis (numbers and verdict): `2026-07-20-use-of-asset-conversion-analysis.md` and the deck `green-property-solutions-combined-deck.html`.
- Source of truth (current business): `src/config/site.ts`, `src/pages/owners/pricing.astro`, `src/features/faq/faqs.ts`

> Scope note: this doc was drafted from the Orange County TAM alone, before the full six-county corpus was recovered. Its market-sizing and its open decision D1 (target geography) are superseded by the canonical analysis, which resolves geography: Washington launches first, California is conditional on a tuition survey. Keep this file for its execution structure (the table and the `childcare/` plan docs); take the market numbers and the verdict from the canonical analysis.

## Strategy recommendation

Green Property Solutions should offer an owner-side highest-and-best-use service for single-family homes entering the market, turning over, or entering management. The first question is whether the home earns more **annual owner net value per usable square foot** as a conventional rental, an independent family-home childcare operation, a company-operated center, or another owner-approved use. Childcare is recommended only when it beats the conventional-rental control case after actual conversion, vacancy, insurance, maintenance, management, and reconversion costs. Where the independent family-home branch wins, the home is leased to a licensed in-home provider who lives there and runs a Family Child Care Home (FCCH); free or subsidized housing can form part of the provider package only when the owner-side economics still work. GPS owns none of the property and may earn disclosed management, conversion, placement, or operating-company fees.

The model must be pointed at exactly one segment: infant and toddler FCCHs in mid-to-high-income ZIP clusters. The market study is unambiguous that this is the only segment universal Transitional Kindergarten does not erode, where unmet need is deepest, and where family ability to pay covers cost. Do not build or host four-year-old-dependent preschool capacity, because free public TK has permanently absorbed most of that demand.

One decision gates everything below and is decision D1: confirm the target geography. The market study is Orange County, California. The operating GPS business is King and Snohomish County, Washington. The child-demand evidence, the licensing rules (California small FCCH up to 8, large up to 14 with an assistant), and the ZIP income thresholds in this strategy are Orange County facts. If the target is Washington, the same model structure holds but every market number, licensing rule, and subsidy program must be re-sourced against Washington data before any site is underwritten. This strategy is written geography-parametric: the structure is portable, the numbers are Orange County until D1 says otherwise.

## Before and after with outcomes, measures, and plans

Each row states the current state (Before), the proposed state (After), the outcome the change is for, how that outcome is measured, and the plan document that implements it.

| Initiative | Before (current GPS) | After (childcare-operator model) | Targeted outcome | How to measure | Plan document |
|---|---|---|---|---|---|
| Property use | Home leased to a family as a residential rental | Owner-choice screen ranks conventional rental, independent FCCH, company-operated center, and defined other uses; execute only the winning owner-approved use | Higher owner net value and square-foot productivity where childcare actually wins | Annual owner net value and annual owner net value per usable sqft versus conventional rental; count of owner-approved properties live | [[childcare/property-sourcing-and-underwriting\|property sourcing and underwriting]] |
| Operator relationship | Tenant on a standard lease, vacancy risk on the owner | Operator-partner: subsidized housing plus a business, in exchange for a written enrollment commitment | Aligned incentives and lower effective vacancy | Operator retention at 12 and 24 months; share of months meeting the enrollment floor | [[childcare/operator-lease-and-housing-terms\|operator lease and housing terms]] |
| Target market | Broad residential owners across the service area | Infant and toddler FCCH demand in ZIPs with median household income above about $120,000 and thin infant supply | Site selection that survives the declining child cohort | Per candidate ZIP: licensed infant slots per resident infant, and median household income | [[childcare/target-market-zip-selection\|target market and ZIP selection]] |
| Revenue model | 9% of collected rent plus 60% of one month's rent at placement, no maintenance markup | Base property income plus a management fee plus an enrollment-linked component tied to filled child slots | Revenue that scales with childcare success, not just rent | Blended revenue per property; enrollment-linked revenue as a share of total | [[childcare/revenue-and-enrollment-share\|revenue and enrollment share]] |
| Underwriting | Standard residential rent comparables | Every site underwritten to a declining-cohort base case (about minus 2% children per year) with fill-rate resilience required | No site that only works at a flat or growing cohort | Pass rate of sites against the declining-cohort stress test; realized fill vs underwritten fill | [[childcare/property-sourcing-and-underwriting\|property sourcing and underwriting]] |
| Licensing and compliance | Standard residential rental compliance | Operator holds the FCCH license (small up to 8, large up to 14 with a paid assistant); property meets licensing conditions | Every host property is licensable and licensed | Time from lease to license granted; zero operating sites without a current license | [[childcare/licensing-and-compliance\|licensing and compliance]] |
| Launch and enrollment timing | Lease and place tenants year round | Stage capacity to the September enrollment peak and the November to March infant pipeline | Faster time to full enrollment | Weeks from operator move-in to enrollment floor; fill rate by calendar month | [[childcare/launch-timing-and-enrollment-ops\|launch timing and enrollment ops]] |

## Why this model, from the market study

The market is demand-constrained, not capacity-constrained. Orange County has roughly 680,000 single-family homes physically eligible to host a licensed home against demand that supports on the order of 730 to 1,000 family child care homes, so housing is never the binding constraint. That is precisely why a property-first company has an edge only if it solves the real constraints, which are finding a willing and able operator and filling child slots. The free-housing-for-placement structure is a direct answer to both: it lowers the operator's largest fixed cost and ties GPS's upside to enrollment.

The segment choice is forced by the data. Universal TK now pulls most four-year-olds into free public programs at the September 1 boundary, permanently depressing the four-year-old paid segment. Infant and toddler care is untouched by TK, has the deepest unmet need (only about one in eight infants has a licensed spot), and clears cost only where families can pay, which points to the higher-income ZIP clusters (Irvine, South County, coastal). The working-class ZIPs carry the highest raw need but the paid demand is thin and subsidy-dependent, which is a different, subsidy-anchored model and is out of scope for the free-housing model until proven.

## Strategy doc updates required

This strategy changes GPS's public and internal positioning, so the following source-of-truth artifacts must be reconciled in the same cycle, not after:

- `src/config/site.ts` and the owners pricing page describe GPS only as residential property management with a 9%-plus-placement model. If the childcare line ships, these need a second, clearly separated service description, and the pricing model must state the enrollment-linked component. Do not overwrite the residential model; add the childcare model beside it.
- `docs/research/orange-county-childcare-tam.md` was previously an untitled backlog file set aside in a sweep stash. It is restored here under a compliant name and is now the cited market source. Its caveats (paid-formal penetration rate, birth series integers, ZIP-level sparsity) are open and must be closed before any site is underwritten, not before the strategy is accepted.
- No geography has been committed. Until D1 resolves, the site copy stays Washington and this strategy stays Orange County, and that divergence is stated, not hidden.

## Decisions this strategy needs

- D1 target geography: Orange County (where the market evidence is) or the existing Washington service area (where the business operates). Everything downstream is parametric on this.
- D2 operator compensation shape: how much of the operator's pay is housing versus cash, and what enrollment floor triggers the housing subsidy.
- D3 revenue split: the enrollment-linked component's size and whether GPS takes equity in the childcare business or only a fee.
- D4 leasehold model: property owners retain title in California and Washington. Decide whether Green Property Solutions manages the owner-supplied home directly or takes a master lease, then underwrite the different risk and fee structure.

## Open risks

- The child cohort is falling about 2% per year and net international migration, the main offset, is weakening, so the market shrinks in child-count terms even as prices hold. Every underwrite must survive that.
- Licensing and neighbor or HOA resistance to a home-based business can block otherwise-good properties; licensing feasibility is a site-selection gate, not a post-lease surprise.
- The enrollment-linked revenue only works if enrollment is measured cleanly and the operator cannot understate it; the measurement mechanism is load-bearing and is specified in the revenue plan.
