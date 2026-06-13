---
domain: green-property-management
category: market-research
sub-category: tam
date-created: 2026-05-17
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

# Non-Institutional Small Landlord PM Market, King and Snohomish Counties

**Date:** May 4, 2026

**Geographic scope:** King County WA (primary), Snohomish County WA (secondary), national context

**Customer scope:** Individual landlords owning 1-5 properties (SFR, condos, townhomes, duplex/triplex/fourplex). Excludes private equity, REITs, institutional investors, large corporate PM companies.

**Purpose:** Single source of truth. Reconciles all prior project deliverables against authoritative sources. Documents two material corrections to earlier reports.

---

## Critical Corrections to Prior Reports

### Correction 1: HB 1217 SFR Exemption

**Earlier (incorrect):** Multiple prior reports stated the broad "single-family-not-owned-by-corporation" exemption from the Senate amendment was REMOVED in conference committee and is NOT in final law.

**Verified fact:** This exemption IS in the final law signed by Governor Ferguson on May 7, 2025.

**Verifying sources:** Multifamily NW (industry compliance guide), Spinnaker Property Management, mynorthwest.com (KIRO Newsradio), Washington State Standard, TPCAR (REALTORS), SJA Property Management compliance guide.

**Per mynorthwest.com:** the SFR exemption "represents approximately 38% of Washington renters."

**Implication:** The "exemption-as-classifier" rule from research plan v2 IS usable. SFR rentals not owned by a corporation, REIT, or LLC with a corporate member are exempt from the rent cap. This restores the v2 plan's natural-experiment design for separating individual-owned SFR from institutional-owned SFR.

**Database fixed:**

- `fact-regulation-exemption.csv` row 6: `in_final_law` changed from `false` to `true`
- `fact-hypothesis.csv` H-I2: status changed from `refuted` to `validated`
- `fact-hypothesis.csv` H-A8: status changed from `deviated` to `validated`
- New row H-A9 added documenting GAO 2026 institutional finding

### Correction 2: New Construction Exemption Term

**Verified:** 12 years from certificate of occupancy (per official Department of Commerce, SJA, limitlesslaw.com, washingtonstatestandard.com). Some industry blogs cite 15 years, reflecting the Senate amendment version, not the final law. **Database value of 12 years is correct.**

### New Finding: GAO 2026 on Institutional SFR Share in Seattle

GAO Report GAO-26-108675 (March 2026) finds institutional investors hold **only 4% of SFR rentals in Seattle metro** (lowest among 6 metros studied; Jacksonville highest at 22%). Less than 1% of all SFR (rental + owner-occupied). King County is unusually individual-landlord-heavy. This strengthens the in-scope-individual share for TAM/SAM versus national RHFS averages.

**Database updated:** New `fact-rental-stock` row added (Seattle-Bellevue HMFA, INSTITUTIONAL, 4%). New source `gao-2026-rental` added to `dim-source`.

---

## Verified Core Facts

### King County Rental Stock

| Metric | Value | Source |
|---|---|---|
| Renter-occupied units (2024 ACS 1-yr) | 448,717 | HUD Market at a Glance |
| Renter-occupied units (2023 ACS 1-yr) | 421,854 | HUD Market at a Glance |
| Renter-occupied units (2022 ACS 1-yr) | 419,367 | HUD Market at a Glance |
| Renter-occupied units (2020 Decennial) | 421,965 | HUD Market at a Glance |
| Renter share of occupied housing | 46.3% | 2024 ACS 1-yr |
| County vacancy rate | 3.6% | GPS Renting / King County data |

### National Rental Ownership (RHFS 2021)

| Metric | Value | Source |
|---|---|---|
| Individuals own % of rental units in 1-4 unit properties | 70.2% | Congress.gov RHFS analysis |
| Individuals own % of single-family rental homes | 72.53% | NRHC analysis of RHFS 2021 |
| Individuals + small local businesses, % of SFR | >85% | NRHC |
| Non-individual share of SFR | 25% | Joint Center for Housing Studies |
| REIT share of SFR | ~2% | RHFS 2021 |

### Institutional Investor Share, Seattle Metro

| Metric | Value | Source |
|---|---|---|
| Institutional share of SFR rentals, Seattle metro | 4% | GAO Report GAO-26-108675 (Mar 2026) |
| Institutional share of all SFR (rental + owner), Seattle metro | <1% | GAO Report GAO-26-108675 |
| Range across 6 metros studied | 4% (Seattle) to 22% (Jacksonville) | GAO Report GAO-26-108675 |

### HB 1217 (final Enacted Law, May 7, 2025)

| Parameter | Value | Source |
|---|---|---|
| Annual rent cap formula | Lesser of 7% + CPI or 10% | RCW 59.18.700 |
| 2025 cap | 10.0% | WA Dept of Commerce |
| 2026 cap | 9.683% | WA Dept of Commerce |
| Manufactured/mobile home cap | 5% (no sunset) | RCW 59.20 |
| First-year freeze | 12 months from tenancy start | RCW 59.18.700 |
| Notice required | 90 days written | HB 1217 |
| Civil penalty | Up to $7,500 per violation | HB 1217 |
| New construction exemption | 12 years from CO | RCW 59.18.710 / WA Commerce |
| **SFR-not-owned-by-corporation exemption** | **In final law** | Multifamily NW, mynorthwest, WA Standard, TPCAR |
| Owner-occupied 2-4 unit exemption | In final law | RCW 59.18.710 |
| Shared bath/kitchen owner-occupied | In final law | RCW 59.18.710 |
| LIHTC/qualified low-income | In final law | RCW 59.18.710 |
| Sunset on residential provisions | July 1, 2040 | HB 1217 |

### Seattle Rents (Triangulated)

| Source | Period | Value |
|---|---|---|
| Zillow ZORI | Sep 2025 | $2,258 |
| Zillow ZORI | Mid 2025 | ~$2,230 |
| Zumper | Apr 2026 | $1,995 |
| Apartment List | Mar 2025 | $2,026 |
| Apartments.com | Aug 2025 | $2,139 |

Working number: **$2,150-$2,250** mid-range. King County aggregate (mix of Seattle, Eastside, South King): **~$2,400** average. Eastside premium (Bellevue, Kirkland, Redmond): **$2,470-$2,724**.

### King County PM Fee Structure

| Component | Range | Sources |
|---|---|---|
| Monthly management | 8-12% of rent | SJA, GPS Renting, RPA, Joseph Group |
| Leasing fee | 50-100% of one month | SJA (60%), Next Brick (50%), RPA (75%), RPM (75%) |
| Renewal fee | $250 flat to 25% of one month | Next Brick ($250), GPS ($250), SJA (25%, min $500) |
| Maintenance markup | 0-15% | RPM (10%), Next Brick (0%), GPS (0%) |
| Setup fee | $200-$500 | SJA ($385 SFR, $200/unit MF), GPS ($295) |

### Eviction Pain Indicators (Drives PM Adoption)

| County | 2025 filings | YoY |
|---|---|---|
| King County | 8,732 | +12% |
| Snohomish County | 2,579 | +16% |

---

## Reconciled Market Sizing

### National In-Scope PM Market (2026)

| Scenario | Units | Adoption | Fee/unit | Annual revenue |
|---|---|---|---|---|
| Low | 28M | 22% | $2,400 | $14.8B |
| **Base** | **30M** | **30%** | **$2,750** | **$24.8B** |
| High | 34M | 35% | $2,900 | $34.5B |

**Headline: ~$25B nationally** (range $18-33B reflects definitional uncertainty around individual-owner classification of LLCs).

### King County Market

| Scenario | Units       | Adoption | Fee/unit   | Annual revenue |
| -------- | ----------- | -------- | ---------- | -------------- |
| Low      | 150,000     | 25%      | $3,500     | $131M          |
| **Base** | **160,000** | **30%**  | **$3,850** | **$185M**      |
| High     | 170,000     | 35%      | $4,500     | $268M          |

### Snohomish County Market

| Scenario | Units | Adoption | Fee/unit | Annual revenue |
|---|---|---|---|---|
| Low | 34,000 | 22% | $3,000 | $22M |
| **Base** | **37,000** | **27%** | **$3,400** | **$34M** |
| High | 40,000 | 32% | $4,000 | $51M |

**Combined two-county base: $219M annually** (~0.9% of national in-scope PM revenue).

---

## TAM/SAM/SOM: Greenfield King County PM Business Entry

### Headline

| Tier | Doors | Annual Revenue |
|---|---|---|
| TAM (full universe at full PM) | 188,000 | **$724M** |
| SAM (addressable subsegment) | 56,000 | **$216M** |
| SOM Y3 (3-year capture) | 700-1,400 | **$2.7-5.4M** |
| SOM Y5 (5-year ceiling) | 1,800-3,500 | **$7-13.5M** |

### TAM

Starting from 448,717 King County renter-occupied units:

| Filter | Doors |
|---|---|
| All renter-occupied | 448,717 |
| Remove 50+ unit large MF | 269,000 |
| Keep 1-unit SFR/condo + 2-4 unit small MF | 188,000 |

**TAM = 188,000 doors × $3,850/door/year = $724M**

GAO 2026 finding (4% institutional SFR in Seattle vs. 22% national high) supports the higher end of this estimate. King County is unusually individual-landlord-heavy.

### SAM

| Filter | Doors |
|---|---|
| TAM | 188,000 |
| Apply ~78% individual + LLC-traceable share (adjusted up for King County's low institutional share per GAO 2026) | 145,000-160,000 |
| Remove permanent self-managers (1-property accidentals with no compliance pain) | 95,000 |
| Remove out-of-submarket and locked-in long contracts | 76,000 |
| Realistic 3-5 year addressable + currently-served | **56,000** |

**SAM = 56,000 doors × $3,850/door/year = $216M**

Of these, ~48,000 are currently using third-party PM. The remaining ~8,000 are realistic conversion targets over 3-5 years as HB 1217 compliance burden compounds.

### SAM by Submarket

| Submarket | SAM doors | Avg rent | Fee/door/yr | Submarket SAM |
|---|---|---|---|---|
| Seattle | 19,000 | $2,230 | $3,800 | $72M |
| Eastside | 13,000 | $2,650 | $4,300 | $56M |
| South King | 18,000 | $1,920 | $3,200 | $58M |
| Other | 6,000 | $2,400 | $3,800 | $23M |
| **Total** | **56,000** | | | **$209M** |

**Strategic implication:** Eastside has highest fee/door but stickiest incumbents. South King has most doors but lowest fee/door. Seattle has highest regulatory complexity, favoring compliance-led differentiation.

### Competitive Landscape (Top 5 In-Scope Operators)

| Operator | Est. King County in-scope doors | SAM share |
|---|---|---|
| Real Property Associates | ~3,500 | 6.3% |
| Lori Gill & Associates / Windermere PM NW | ~1,200 | 2.1% |
| SJA Property Management | ~700 | 1.3% |
| Bell-Anderson & Associates | ~380 | 0.7% |
| Brink Property Management | ~400 | 0.7% |
| **Top 5 combined** | **~6,180** | **11%** |

Remaining ~42,000 currently-managed doors spread across 40+ smaller independent operators plus Real Property Management franchises, Evernest, Mynd. **No single operator exceeds 7% of SAM.** Fragmented services market with classic conditions for new entry.

### SOM Scenarios

| Scenario | Capital | Y3 doors | Y3 revenue | Y5 doors | Y5 revenue | SAM share Y5 |
|---|---|---|---|---|---|---|
| A: Bootstrapped | <$500K | 200 | ~$770K | 400 | ~$1.5M | 0.7% |
| **B: Funded boutique** | **$1-3M** | **700-1,000** | **$2.7-3.85M** | **1,800-2,500** | **$7-9.6M** | **3.2-4.5%** |
| **C: Funded + M&A** | **$5-15M** | **1,200-1,400** | **$4.6-5.4M** | **3,000-3,500** | **$11.5-13.5M** | **5.4-6.3%** |

**Recommended SOM band:** Y3 700-1,400 doors / $2.7-5.4M; Y5 1,800-3,500 / $7-13.5M.

---

## Validated Hypotheses (Updated)

| ID | Hypothesis | Status | Note |
|---|---|---|---|
| H-H1 | King County rental units ~430K-450K | validated | 448,717 (HUD) |
| H-H3 | KC in-scope units ~140K-180K | validated | 160K (within range) |
| H-H5 | KC professionally managed in-scope ~30K-50K | validated | 48K |
| H-H7 | Avg blended PM fee/unit/yr KC $3,500-4,500 | validated | $3,850 |
| H-H9 | KC in-scope PM revenue $120M-200M | validated | $185M |
| H-H12 | Lori Gill is largest in-segment PM in two counties | refuted | RPA larger (~3,500 vs ~1,200) |
| H-I1 | HB 1217 increases PM adoption 2026-2028 | partially-validated | Direction confirmed, +3-5pp |
| **H-I2** | **HB 1217 SFR-not-owned-by-corp exemption captures ~70-80% of WA individual SFR** | **validated (CORRECTED)** | **Exemption IS in final law per Multifamily NW, mynorthwest, WA Standard. Captures ~38% of WA renters.** |
| H-I3 | HB 1217 increases legal/compliance services demand | validated | Operators publishing compliance content |
| H-I7 | Elevated 2024 WA evictions suggest landlord pain driving PM adoption | validated | KC 8,732 (+12%), Snoho 2,579 (+16%) |
| **H-A8** | **LLC carve-out: large share of LLC owners are individuals** | **validated (CORRECTED)** | **HB 1217 exemption registry IS usable as classifier; v2 plan rule works.** |
| **H-A9** | **King County has lower institutional SFR penetration than national** | **validated (NEW)** | **GAO 2026: 4% institutional SFR in Seattle vs. 22% in Jacksonville.** |

---

## Strategic Implications

1. **Fragmented market supports entry.** No operator exceeds 7% of SAM. Top 5 hold 11% combined.
2. **Differentiation is mandatory.** The 10%-of-rent + 75%-leasing-fee model is fully covered by incumbents. Three viable wedges:
   - **Compliance-as-product:** HB 1217 + Seattle stack done-for-you for accidental landlords
   - **Subscription/flat-fee:** GPS Renting model exists; could extend with $99-199/mo flat targeting 1-2 property landlords
   - **Vertical specialist:** Condos-only (HOA-savvy), ADU-only (HB 1110 tailwind), or Mandarin/Spanish-language (WPI proves demand)

3. **HB 1217 SFR exemption changes the targeting math.** The broad SFR exemption captures a large share of King County's individual-owned SFR. Two segmentation paths:
   - **Exempt-property targeting:** SFR landlords not subject to rent cap have less compliance pain but may still want PM for time savings, tenant placement, maintenance coordination
   - **Capped-property targeting:** 2-4 unit non-owner-occupied, condos, and any LLC-with-corp-member properties hit the full HB 1217 stack and have maximum compliance pain

4. **Submarket choice determines economics.**
   - Eastside: highest fee/door ($4,300), stickiest incumbents
   - South King: most doors, lowest fee/door, least competition
   - Seattle: highest regulatory complexity, best fit for compliance positioning

5. **24-month window before institutional saturation.** Roll-up activity (PURE/HomeRiver merger to 40K doors, ProperXPM to 20K) is moving toward King County. New entrants have 2-4 years before this wave saturates the segment.
6. **M&A optionality is real.** Several Document 3 operators are aging founder-led shops (Cornell 1972, Bell-Anderson 1972, Walls 1960s, Pacific Crest 2003). 50-300 door tuck-ins at $400-800/door are standard exit path.

---

## Caveats & Confidence Levels

- **Door counts for top operators are estimates ±20%.** RPA's 4,500 includes commercial; King County in-scope likely ~3,500. Lori Gill ranges 1,500-2,000 across sources. Document 3 self-reported figures inflate toward marketing claims. SOM math is robust to ±20% on incumbent doors because of fragmentation.
- **Fee per door uses 27-month tenancy assumption.** Longer Seattle tenancies under HB 1217 could compress per-year fee by 5-10%.
- **Owner conversion rate (TAM → SAM) is the largest uncertainty.** 30% SAM/TAM ratio; could push to 40% if HB 1217 enforcement intensifies.
- **Snohomish in-scope unit count below initial range** (37K vs initial 45K-60K). Listings dataset may underweight smaller markets.
- **HB 1217 exemption-as-classifier mechanism is restored** but practical implementation requires owner-by-owner verification because LLC-with-corp-member disqualifies the exemption.

---

## Source Hierarchy (Highest to Lowest Confidence)

| Tier | Sources |
|---|---|
| Authoritative government | HUD, US Census ACS, RHFS, GAO, WA Department of Commerce, RCW 59.18.700/.710/.720 |
| Industry compliance guides | Multifamily NW, RHAWA, TPCAR, Washington Landlord Association |
| Operator-specific | SJA, GPS Renting, Next Brick, Real Property Associates pricing pages |
| Academic | JCHS Harvard, Coven 2024 (UC Berkeley) |
| Data licensors | Zillow ZORI, Zumper, Apartment List, Apartments.com, Rentometer |
| Industry blogs (use with care) | Steadily, Joseph Group, Pinnacle List, LeaseRunner |

---

## Files in Project

| File | Purpose |
|---|---|
| `pm-market-research-datasets.xlsx` | Single workbook, 21 tabs (cover + 20 datasets) |
| `pm-market-db/` | Source CSV tables, schema.yaml, validate.py, queries |
| `king-county-pm-tam-sam-som.md` | Original TAM/SAM/SOM analysis |
| `king-county-pm-fact-checked-report.md` | This document |
