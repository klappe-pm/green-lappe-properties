---
domain: green-property-management
category: strategy
sub-category: validation
date-created: 2026-05-18
date-revised: 2026-05-18
doc-type:
version: 0.1
doc-status: draft
llm-provider: Claude
llm-model: Opus 4.7
llm-session:
llm-session-data:
aliases: []
tags: []
---

# Validation Strategies

> Ten testable strategies to validate the Green Property Management business hypothesis. Companion to [[green-property-management-launch-priority-memo|Launch Priority Memo]], [[green-property-management-two-sided-marketplace|Two-Sided Marketplace]], and [[dhm-framework|DHM Framework]].

## The Hypothesis Being Tested

Owners of single-family homes in Snohomish County who want professional property management, and who have been failed by incumbent property managers in measurable ways (unilateral decisions, opaque fees, slow response, weak records), will sign with a small, owner-operated firm that:

1. Publishes its fee schedule openly.
2. Commits to enforceable SLAs.
3. Provides a named contact who answers.
4. Treats residents as customers, not inventory.

Validating this hypothesis requires evidence on three planes: that the demand exists, that the supply of owners exists at acceptable acquisition cost, and that the operating model produces the promised customer experience inside acceptable margins. The DHM framework from [[dhm-framework|DHM Framework]] is the screening lens.

## How to Read the Strategies

Each strategy below includes:

- **The bet**: what is being tested.
- **The mechanism**: how the test runs.
- **Success criteria**: what a positive result looks like, quantified.
- **Failure mode**: what negative or null results imply.
- **Cost**: rough estimate of partner-hours and dollars.
- **DHM read**: which letters of the framework this strategy informs.
- **Priority**: `now`, `soon`, or `later` relative to launch.

The strategies are ordered roughly by sequence, not by importance.

---

## Strategy 1: Megan's Network Outreach (warm-intro test)

**The bet**: Megan Green's existing relationships will produce enough qualified owner introductions to fill the phase-1 cohort without paid acquisition.

**The mechanism**: Megan sends a personal note to a curated list of `30` past clients in Snohomish County who fit the launch ICP (recent buyer, recent seller, current owner relocating). Note describes the new service, includes a one-pager, and offers a free property review.

**Success criteria**:

- Reply rate `≥ 30%`.
- Conversations booked `≥ 15%`.
- Signed management agreements `≥ 3` inside 90 days.

**Failure mode**:

- Reply rate below 15%: the network is colder than expected, or the message is wrong.
- Conversations book but do not convert: the offer is wrong, the price is wrong, or the timing is wrong.
- Conversations convert at a rate below 1-in-10: the value proposition is not landing.

**Cost**: `~10 partner-hours`, `$0` direct.

**DHM read**: tests `D` (does the offer actually delight a known cohort) and provides a baseline read on customer acquisition economics that feeds `M`.

**Priority**: `now`.

## Strategy 2: Public Fee Schedule as a Marketing Weapon

**The bet**: posting the full fee schedule publicly on the launch site will drive inbound owner inquiries citing fee transparency as the reason for contact, at a rate higher than industry-standard inbound inquiry rates.

**The mechanism**: launch a one-page site with the full fee schedule visible at the URL `greenlappe.com/pricing`. Track inbound contact attribution. Compare attributable inbound to the inbound rate that comparable local property management firms receive on their own sites (best available proxy: site analytics from a few willing peers, or industry benchmarks).

**Success criteria**:

- Inbound contacts mentioning fee transparency or pricing comparison `≥ 30%` of total inbound.
- Time on the pricing page in analytics `≥ 60 seconds` average.
- At least one signed owner inside 6 months cites fee transparency as a top-three reason.

**Failure mode**:

- Inbound is dominated by tire-kickers comparison shopping for the lowest fee.
- Signed owners cite Megan personally, not fee transparency, as the reason for choosing.
- Time on pricing page is short and bounce rate is high.

**Cost**: `~20 partner-hours`, `$50–$200/month` for site hosting and analytics.

**DHM read**: tests `H` (is fee transparency a sustainable differentiator or a quickly copied feature) and `D` (does it delight the target owner).

**Priority**: `now`.

---

## Strategy 3: The "I Want out of My Current PM" Landing Test

**The bet**: a specific subset of owners are actively unhappy with their current property manager. A landing page targeted at that frustration ("Switch your property manager in 60 days, no penalty, full handoff included") will convert at a higher rate than a generic launch site.

**The mechanism**: create a second landing page targeted at owners considering a switch. Run a small Google Ads or Facebook campaign on keywords like "switch property manager Snohomish County" and "property manager fired" for `30 days`. Measure click-through, form fill, and conversion to conversation.

**Success criteria**:

- CTR on ads `≥ 2%`.
- Form fill rate on landing page `≥ 8%`.
- Conversion from form fill to scheduled conversation `≥ 40%`.
- At least one signed owner attributable to this channel inside 6 months.

**Failure mode**:

- Low search volume on the keywords (suggests pain is real but not searched for).
- High click-through, no fills (the offer is not believable).
- High fills, no conversations (form leads are unqualified or wrong-intent).

**Cost**: `~30 partner-hours`, `$1,000–$2,500` ad spend.

**DHM read**: tests `D` directly. This is the pain-point segment from the brand style guide, made into an acquisition channel.

**Priority**: `soon` (month 3–6).

---

## Strategy 4: The "show Your math" Annual Review Pilot

**The bet**: owners will pay or stay specifically for the annual property review packet (income statement, expense detail, capital schedule, rent benchmark, recommended actions). The packet is a hard-to-copy operational asset.

**The mechanism**: deliver the full annual review packet to the founding Bothell property and to the first two signed owners. Track time-to-produce, owner reaction, and whether owners cite the packet in renewal or referral conversations.

**Success criteria**:

- Time-to-produce per packet trends downward with each iteration (first one `≤ 12 hours`, second `≤ 8`, third `≤ 6`).
- Each receiving owner cites the packet as valuable in retention or referral conversations.
- At least one referral attributable to a packet recipient inside 12 months.

**Failure mode**:

- Owners do not engage with the packet (open but do not act).
- Time-to-produce stays high, threatening margin.
- Packet becomes a marketing document rather than a working document.

**Cost**: `~30–40 partner-hours` for the first three packets combined.

**DHM read**: tests `H` (is this hard to copy at scale) and `M` (does it pay for itself in retention).

**Priority**: `soon` (months 6–12).

---

## Strategy 5: Habitability SLA Stress Test

**The bet**: the brand's 24-hour fix-or-explain commitment on habitability issues is operationally sustainable and produces resident-side delight strong enough to drive renewals.

**The mechanism**: instrument every habitability ticket from launch onward. Track time-to-acknowledgement, time-to-explanation, time-to-resolution, resident satisfaction at ticket close. Hold the commitment publicly visible on the brand site.

**Success criteria**:

- `≥ 95%` of habitability tickets acknowledged inside one business hour.
- `≥ 90%` resolved or explained inside 24 hours.
- Zero habitability tickets escalating to dispute, withholding, or repair-and-deduct under WA law.
- Resident renewal rate at first lease renewal `≥ 70%`.

**Failure mode**:

- SLA missed on more than 5% of tickets in any quarter: process is broken, vendor list is wrong, or partner bandwidth is insufficient.
- SLA met but renewals do not improve: the commitment is not actually the thing residents care most about.

**Cost**: `~5 partner-hours/month` for instrumentation and review.

**DHM read**: tests `D` directly on the resident side. Tests `M` indirectly through turnover cost.

**Priority**: `now` (launches with first managed property).

---

## Strategy 6: The FCC Opportunistic Match

**The bet**: a single FCC conversion in year one validates the wedge strategy at material economic scale, and produces a case study that closes the second wave of owner conversations.

**The mechanism**: actively maintain a pre-qualified pipeline of `≥ 3` licensed FCC providers seeking properties. When an inbound owner opportunity arrives that fits the FCC profile (zoning, layout, owner appetite for higher yield), make the match. Document the full conversion process.

**Success criteria**:

- Provider pipeline of `≥ 3` qualified candidates maintained.
- One signed FCC lease inside 18 months.
- Conversion capex on budget within `±15%`.
- Property licensed by DCYF within 6 months of conversion completion.
- First-year operator revenue tracks projections within `±20%`.

**Failure mode**:

- Provider pipeline cannot reach 3 qualified candidates (supply-side hypothesis fails).
- No matching property emerges from inbound (property-side hypothesis fails for the wedge).
- Conversion economics break (capex overruns, insurance denials, mortgage covenant blocks).

**Cost**: `~80 partner-hours` over 12 months, capex separately funded by owner.

**DHM read**: tests `H` and `M` for the strategic wedge. See [[green-property-management-fcc-strategy|FCC Strategy]] for full DHM read on the wedge.

**Priority**: `soon` (provider pipeline starts at month 3; first match opportunistic).

---

## Strategy 7: The Named-vendor List as a Moat Test

**The bet**: a small, vetted vendor list with published quality scores and pass-through pricing creates a switching-cost moat for owners (they would lose the vendor relationships if they leave) and a quality signal for residents.

**The mechanism**: build a vendor list of `8–12` trades providers across plumbing, HVAC, electrical, handyman, landscaping, roofing, flooring, pest. Vet for insurance, licensure, reliability. Score every job. Publish scores quarterly.

**Success criteria**:

- Vendor list operational by month 6.
- Mean repair cost vs market benchmark `≤ market rate` (pass-through, no markup).
- Mean repair quality score `≥ 4.0 / 5.0` across rolling 90 days.
- Owner-cited reasons for staying include vendor quality at year-one review.

**Failure mode**:

- Vendor list is hard to fill because trades are scarce in the target corridor (real risk in current market).
- Pass-through pricing produces vendor flight to higher-margin work elsewhere.
- Quality scores stay average; no differentiation.

**Cost**: `~40 partner-hours` over months 1–6.

**DHM read**: tests `H` (network of vetted vendors is moderately hard to copy) and `D` (residents experience better repair quality).

**Priority**: `now`.

---

## Strategy 8: The Cross-county Owner Referral Test

**The bet**: an owner who is happy with Green Property Management's Snohomish service will refer or transfer their King County property, validating the soft-barrier hypothesis from the launch priority memo.

**The mechanism**: track every signed phase-1 owner for whether they hold property in King County. Ask explicitly at intake whether they would consider Green Property Management for King County properties when ready. At month 9, formally ask each phase-1 owner for King County referrals.

**Success criteria**:

- `≥ 50%` of phase-1 owners disclose King County property holdings during intake.
- `≥ 1` King County property under management or pending agreement by end of phase 1.
- King County properties operationally indistinguishable from Snohomish properties (same SLA adherence, same fee structure, same owner satisfaction).

**Failure mode**:

- Phase-1 owners do not hold King County property (the soft-barrier hypothesis is wrong about owner overlap).
- Owners hold King County property but already have established managers there with switching costs Green Property Management cannot overcome.

**Cost**: `~5 partner-hours` for intake question redesign and tracking; minimal direct cost.

**DHM read**: tests `M` (geographic expansion economics) and `H` (network-effect signal for marketplace liquidity).

**Priority**: `soon` (intake redesign in month 1; formal referral ask in month 9).

---

## Strategy 9: The Transparent Dispute Resolution Pilot

**The bet**: handling owner-resident disputes through a published, written process with a named partner decision will produce higher trust on both sides than the industry-standard adversarial framing.

**The mechanism**: publish a dispute resolution process. When the first dispute arises (deposit deduction, repair responsibility, lease interpretation), handle it on the published process. Document the outcome and the satisfaction of both parties.

**Success criteria**:

- Dispute resolution process published by month 6.
- First dispute handled per process inside `≤ 30 days` from initiation.
- Both parties report procedural satisfaction (`≥ 4 / 5`), regardless of substantive outcome.
- Zero disputes escalate to small-claims court or to the Washington Attorney General's Office.

**Failure mode**:

- No disputes arise (sample too small to validate).
- Dispute resolution favors one side systematically, signaling drift back to single-sided operation.
- Process is unworkable in practice and gets abandoned for ad-hoc handling.

**Cost**: `~15 partner-hours` to design the process; variable per dispute.

**DHM read**: tests `H` (process is hard to copy because most firms do not invest here) and `D` (both sides feel heard).

**Priority**: `soon` (process design by month 6; first test opportunistic).

---

## Strategy 10: The Price-anchor Test

**The bet**: a flat monthly fee per property, priced at the upper third of the local market, will not be a meaningful barrier to acquisition if the fee schedule is transparent and the SLA commitments are visible. Owners who are willing to pay a premium for confidence are the target. Owners shopping on price alone are the wrong customer.

**The mechanism**: set the launch fee at the 65th-75th percentile of comparable Snohomish County property management fees. Hold the line through phase 1. Track win rate at this price, and track which lost opportunities cite price as the primary reason.

**Success criteria**:

- Win rate on qualified conversations `≥ 40%` at the chosen price.
- Lost opportunities citing price as primary reason `≤ 30%`.
- No phase-1 owner asks for a discount after signing.
- No phase-1 owner churns citing price.

**Failure mode**:

- Win rate below 25% at the chosen price: pricing is wrong or value proposition is not landing.
- Price discounts requested during sales conversations more than half the time: the brand promise is not being read as worth the premium.
- Churn citing price: the value did not show up in operations.

**Cost**: `~5 partner-hours` for benchmarking; opportunity cost of lost low-fee customers (intentional).

**DHM read**: tests `M` directly (can the brand sustain its margin) and indirectly tests `D` (do owners feel they got what they paid for).

**Priority**: `now`.

---

## Summary Table

|#|Strategy|Priority|DHM letters tested|Cost (partner-hours)|
|---|---|---|---|---|
|1|Megan's network outreach|`now`|D, M|10|
|2|Public fee schedule|`now`|D, H|20|
|3|Switch-your-PM landing|`soon`|D|30|
|4|Annual review packet pilot|`soon`|H, M|30–40|
|5|Habitability SLA stress test|`now`|D, M|5/mo|
|6|FCC opportunistic match|`soon`|H, M|80|
|7|Vendor list moat test|`now`|H, D|40|
|8|Cross-county referral test|`soon`|M, H|5|
|9|Transparent dispute resolution|`soon`|H, D|15+|
|10|Price-anchor test|`now`|M, D|5|

## Sequencing Logic

The `now` strategies cluster on the launch fundamentals: warm intros, fee transparency, SLA enforcement, vendor list, and price discipline. These are the things that must work on the founding property and the first two signed properties or the launch hypothesis is broken.

The `soon` strategies cluster on the expansion fundamentals: differentiated acquisition (switch-your-PM landing), retention proof points (annual review packet), wedge validation (FCC), expansion validation (cross-county), and operational maturity (dispute resolution).

No `later` strategies are listed. If a strategy is worth doing, it is worth listing as `now` or `soon`. Strategies that are not validated by month 24 are abandoned, not deferred.

## What This Document is Not

- Not a roadmap. Strategies do not commit to dates beyond `now` / `soon`.
- Not a forecast. The numbers in success criteria are tests, not predictions.
- Not exhaustive. Other validation strategies will emerge from operating the launch.

## Versioning

|Version|Date|Author|Notes|
|---|---|---|---|
|`0.1`|2026-05-17|Kevin|Initial validation strategies. Ten experiments mapped to DHM.|
