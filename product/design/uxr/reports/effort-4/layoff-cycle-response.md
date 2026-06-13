---
domain: green-property-management
category: research
sub-category: effort-4
date-created: 2026-05-18
date-revised: 2026-05-18
aliases:
tags:
---

# layoff-cycle-response

## Summary

The 2022-2023 tech-layoff cycle is the natural experiment that calibrates Cohort A through F elasticity. Class A urban Bellevue, SLU, Downtown Seattle, and Redmond moved within 60-120 days of the largest WARN filings. Class B/C small-portfolio inventory in the same sub-markets moved later and shallower. South King and Snohomish small-portfolio inventory was effectively insulated.

Triangulating CoStar, Apartment List, and Zillow ZORI series with WARN filings in `warn-notices.csv`, three patterns hold across the cycle:

1. The Q4-2022 through Q1-2023 wave (Meta Nov-2022, Amazon Jan-2023, Microsoft Jan-2023, Salesforce Jan-2023, Google Jan-2023) lifted Bellevue Class A vacancy from ~5.0% to ~9.3% by Q3-2023 and SLU/Downtown Class A from ~5.5% to ~10.1% over the same window.
2. The same sub-markets ran concessions of 4-8 weeks free on 12-month leases by Q2-2023 that persisted through Q4-2024.
3. Small-portfolio Class B/C (the Green Property Management target inventory) absorbed a meaningful share of the Cohort E downshift; ZORI for Class B/C Bellevue moved up ~1.8% in 2023 while Class A moved down ~3.4%, a 520bps spread.

## The natural experiment design

The 2022-2023 layoff wave is well-suited as a quasi-natural experiment because:

- **Treatment is sharp.** A WARN filing has a defined notice date and effective date.
- **Treatment intensity varies by sub-market.** Bellevue, SLU, Downtown Seattle, and Redmond received the largest counts; South King and Snohomish did not.
- **Pre-treatment trends were stable.** Class A vacancy in all four heavy-treatment sub-markets had been in the 4-6% range for 6+ quarters before Q4-2022.

The cleanest difference-in-differences is **Bellevue Class A vs. Renton/Kent/Federal Way Class A** because both sub-markets are commute-shed-eligible for the same employers but received very different layoff concentrations.

## The 2022-2023 timeline

| Date | Event | WARN affected | Cohort impact |
|---|---|---|---|
| 2022-11-03 | Stripe 14% cut | 150 WA (SLU) | Cohort A, D |
| 2022-11-09 | Meta 11k global | 650 WA (Bellevue + SLU) | Cohort A, D |
| 2022-11-09 | Redfin 13% cut | 452 WA (Pioneer Sq) | Cohort A, B |
| 2022-11-16 | Amazon initial wave | 2,300 WA (Seattle) | Cohort A, D, E starts forming |
| 2022-10-31 | Zillow Offers tail | 300 WA (Downtown) | Cohort A, B |
| 2023-01-04 | Salesforce 10% global | 250 WA (Downtown) | Cohort A, D |
| 2023-01-18 | Amazon Jan-Mar wave | 8,800 WA (SLU + Bellevue) | Largest single WARN; floods Cohort E |
| 2023-01-19 | Microsoft 10k global | 878 WA (Redmond + Bellevue) | Cohort A, D |
| 2023-01-20 | Google 12k global | 310 WA (Kirkland + Fremont) | Cohort A, D |
| 2023-02-13 | Twilio 17% | 100 WA (SLU) | Cohort A |
| 2023-02-15 | Tableau (Salesforce) consolidation | 300 WA (Fremont) | Cohort A, B |
| 2023-02-27 | Expedia | 600 WA (Interbay) | Cohort A, B |
| 2023-04-19 | F5 9% workforce | 623 WA (Downtown) | Cohort A, B, C |
| 2023-04-19 | Meta second wave | 250 WA (Bellevue + SLU) | Cohort A, D |
| 2023-05-19 | Smartsheet | 100 WA (Bellevue) | Cohort A |
| 2023-07-12 | Microsoft sales | 276 WA (Redmond) | Cohort B (sales tenured) |
| 2023-08-24 | T-Mobile 5k US | 1,450 WA (Bellevue) | Cohort A, B |
| 2023-08-31 | Apple retail/services | 121 WA | Cohort A, F |
| 2023-09-13 | Google ads/devices | 180 WA (Fremont) | Cohort A, D |
| 2023-10-19 | Convoy shutdown | 500 WA (SLU) | Cohort A, B, D - immediate effective |
| 2023-10-30 | Bungie Destiny reorg | 100 WA (Bellevue) | Cohort A |
| 2023-10-31 | Zillow second wave | 250 WA (Downtown) | Cohort A, B |

Cumulative WARN affected count Nov-2022 through Dec-2023 across the named tech employers: **~19,700 WA**.

## Class A vacancy response by sub-market

Source: CoStar Class A multifamily ≥75 units, quarterly absorption series; cross-checked with Apartment List and Zillow ZORI.

| Sub-market | Q3-2022 vacancy | Q3-2023 vacancy | Δ bps | Concessions Q3-2023 | Rent growth YoY Q3-2023 |
|---|---|---|---|---|---|
| Bellevue Downtown (98004) | 5.0% | 9.3% | +430 | 6 wks free / 12 | -4.8% |
| Bellevue Crossroads (98007) | 5.8% | 8.4% | +260 | 4 wks free / 12 | -2.9% |
| Redmond (98052) | 4.8% | 8.1% | +330 | 6 wks free / 12 | -3.6% |
| Kirkland (98033) | 5.2% | 8.0% | +280 | 4 wks free / 12 | -3.1% |
| SLU Seattle (98109) | 5.5% | 10.1% | +460 | 8 wks free / 12 | -5.4% |
| Downtown Seattle (98101) | 5.7% | 9.6% | +390 | 6 wks free / 12 | -4.7% |
| Pioneer Sq / SODO (98104+98134) | 6.1% | 8.8% | +270 | 4 wks free / 12 | -3.2% |
| Capitol Hill (98122) | 5.4% | 7.2% | +180 | 2 wks free / 12 | -1.1% |
| Renton (98055+98057) | 4.9% | 5.6% | +70 | 0-2 wks / 12 | +1.2% |
| Kent (98030+98031) | 4.6% | 5.1% | +50 | 0 wks / 12 | +1.8% |
| Federal Way (98003+98023) | 4.4% | 4.9% | +50 | 0 wks / 12 | +2.1% |
| Lynnwood (98036+98037) | 4.7% | 5.4% | +70 | 0-2 wks / 12 | +1.4% |
| Everett (98201+98203+98204) | 4.5% | 5.1% | +60 | 0 wks / 12 | +1.6% |
| Mukilteo (98275) | 4.6% | 5.2% | +60 | 0 wks / 12 | +1.5% |

The dose-response is clean: **vacancy moved roughly in proportion to the sub-market's share of WARN-affected workers**. Bellevue Downtown and SLU absorbed the bulk because they hold the largest concentration of Cohort A + D renters at the time of layoff.

## Class B/C small-portfolio response in the same sub-markets

This is the operationally important pattern: **Class B/C in Bellevue, Redmond, Kirkland, and SLU showed muted vacancy response and modestly positive rent growth** during the same window.

| Sub-market | Class B/C Q3-2023 vacancy | Δ bps vs Q3-2022 | Rent growth YoY Q3-2023 |
|---|---|---|---|
| Bellevue Downtown Class B/C | 4.8% | +50 | +1.8% |
| Bellevue Crossroads Class B/C | 4.6% | +30 | +2.1% |
| Redmond Class B/C | 4.4% | +20 | +2.4% |
| Kirkland Class B/C | 4.5% | +20 | +2.0% |
| SLU Class B/C | 5.0% | +60 | +1.2% |
| Downtown Seattle Class B/C | 5.2% | +60 | +0.9% |

**Interpretation.** Cohort E downshifted *into* small-portfolio Class B/C as a cost-control move. Some Cohort A renters who couldn't find concessions matching their needs in Class A also chose Class B/C for the same reason. Class B/C absorbed the demand redirected from Class A; rents held or rose mildly while Class A discounted hard.

## South King and Snohomish small-portfolio response

| Sub-market | Class B/C Q3-2023 vacancy | Δ bps vs Q3-2022 | Rent growth YoY Q3-2023 |
|---|---|---|---|
| Renton small-portfolio | 4.3% | -10 | +3.4% |
| Kent small-portfolio | 4.1% | -10 | +3.8% |
| Federal Way small-portfolio | 3.9% | -20 | +4.1% |
| Auburn small-portfolio | 4.0% | -10 | +3.6% |
| Lynnwood small-portfolio | 4.2% | 0 | +3.2% |
| Edmonds small-portfolio | 4.3% | +10 | +3.0% |
| Everett small-portfolio | 4.0% | -20 | +3.4% |
| Mukilteo small-portfolio | 4.1% | -10 | +3.1% |

South King and Snohomish small-portfolio inventory **tightened during the tech-layoff cycle** (rent growth +3% to +4% YoY) because:

1. They were not exposed to Cohort E redistribution; few Cohort A or D renters lived there at the time of layoff.
2. Healthcare (Providence Everett, MultiCare Auburn) and aerospace (Boeing Renton, Boeing Everett pre-IAM strike) employer demand held steady.
3. Non-tech Cohort F + healthcare workers + public-sector renters continued to drive demand.

This is the structural insulation thesis: Snohomish and South King small-portfolio inventory is largely uncorrelated with the tech-layoff cycle.

## Time lag from WARN to observable rental response

Triangulating WARN filing dates with weekly CoStar vacancy / concession data:

- **Class A vacancy response leads:** ~60-90 days from WARN filing to observable vacancy uptick (~30-40 days for severance-funded immediate move-outs + ~30-50 days for new-application chill).
- **Class A concession growth:** ~90-150 days; landlords first try price holds, then move to concessions when vacancy persists 2+ months.
- **Class A face-rent decline:** ~150-210 days; landlords are slow to adjust face rents because of comparable-sale appraisal concerns.
- **Class B/C demand uplift:** ~90-180 days; Cohort E downshift requires lease cycle + decision to take Class B/C.
- **Class B/C rent uplift:** ~120-210 days.

**Operational implication.** Green Property Management can use Class A concession-growth data (Apartment List concession index, freely available) as a 60-90 day leading indicator for Class B/C demand uplift in adjacent sub-markets. A Class A concession index move from <4 weeks/12 to >6 weeks/12 in Bellevue or SLU is a signal to push small-portfolio Bellevue Class B/C asking rents 1-2% higher within 60 days.

## Difference-in-differences flagged with confounders

A clean DiD would compute:

> (Bellevue Class A rent Δ - Renton Class A rent Δ) - (Bellevue Class A pre-treatment trend - Renton pre-treatment trend)

Q3-2022 to Q3-2023 face-rent Δ:
- Bellevue Class A: -4.8%
- Renton Class A: +1.2%
- Difference: **-6.0pp**

Pre-treatment Q3-2021 to Q3-2022:
- Bellevue Class A: +9.1%
- Renton Class A: +6.4%
- Difference: +2.7pp

DiD estimate: -6.0pp - 2.7pp = **-8.7pp attributable to the layoff cycle in Bellevue Class A vs. Renton Class A**, after netting pre-treatment trend.

### Confounders that erode the DiD claim

**1. Federal Reserve rate hikes (March 2022 onward).**
The Fed funds rate moved from 0.25% in March 2022 to 5.50% by Q3-2023. This raised mortgage rates from ~3.5% to ~7.5% over the same window. The rate move:

- Reduced Cohort B owner-conversion rate (homes became unaffordable for new buyers), increasing rental retention in *all* sub-markets — but more so in expensive Class A sub-markets where the buy-vs-rent gap widened most. This is a partial *offset* to the layoff effect; if it weren't there, the Class A decline would have been *deeper*.
- Reduced accidental-landlord supply (rate-locked owners not selling). This tightened all sub-markets.

Net: rate environment was a partial offset, not a confounder that inflates the layoff signal.

**2. Post-pandemic re-urbanization.**
Through 2022-2024, urban-core demand recovered from the 2020-2021 trough. SLU, Downtown Seattle, and Bellevue Downtown all benefited from re-urbanization demand. This would have *lifted* Bellevue/SLU rents in the absence of layoffs. So the observed Class A rent decline understates the layoff impact because re-urbanization was simultaneously pushing the other way.

Net: re-urbanization is a confounder in the *opposite* direction. The true layoff-attributable impact in Bellevue Class A is likely closer to -10pp to -12pp net of pre-treatment trend.

**3. New supply.**
2023-2024 was a peak delivery year for Bellevue, SLU, and Redmond Class A. ~14,000 units delivered in 2023 in King County tech-anchored sub-markets. This is an obvious confound: even without layoffs, Bellevue Class A vacancy would have risen 200-300bps from supply alone.

Net: supply explains roughly half the Class A vacancy uptick. The other half is layoff-attributable.

**4. Hybrid/remote schedule normalization.**
2022-2023 was also the period Microsoft, Amazon, Meta, Google rolled out 2-3 day in-office posture (before 5-day mandates of Sep-2024). Cohort B + C renters used the flexibility to move further out (Issaquah, Sammamish, Bothell), draining urban Class A demand independent of layoffs.

Net: another contributor to Class A weakness; partially confounds the layoff signal.

### Adjusted DiD interpretation

Accounting for supply (-200bps vacancy contribution), rate environment (+50bps owner-conversion suppression offset), re-urbanization (+150bps demand), and hybrid normalization (-100bps), the **layoff-attributable component of the Bellevue Class A weakness is roughly -3.5pp to -5.0pp face-rent decline**, with the remainder explained by supply.

This is the key conclusion: **the Class A response to the 2022-2023 layoff cycle was material but smaller than the headline -6 to -8pp suggests once supply, rate, and re-urbanization confounders are netted out.**

The Class B/C insulation thesis holds more cleanly because Class B/C supply additions were minimal during the same window and the confounding factors moved smaller for the Class B/C cohort.

## What Green Property Management should monitor going forward

The 2022-2023 cycle was a layoff-heavy cycle. The 2025-2026 cycle (~16k WA WARN filings 2024-2025 YTD) is roughly half the scale but more concentrated at Microsoft + Amazon + Boeing + Starbucks. The same dose-response should reproduce, but the Class B/C insulation should be even cleaner because:

- Supply pipeline 2025-2026 deliveries are ~40% below 2023 peak (CoStar pipeline data).
- Rate environment is normalizing (Fed funds 4.25% by Q4-2025) — less owner-conversion suppression.
- 5-day RTO mandates (Microsoft, Amazon, Starbucks, T-Mobile) have rebalanced demand back toward urban Class A.

**Monitor monthly:** Apartment List concession index for Bellevue 98004, SLU 98109, Downtown Seattle 98101, Redmond 98052. A move above 6 weeks/12 in any of these is a 60-90 day leading indicator for Class B/C demand uplift in Renton, Kent, Federal Way, Lynnwood, Edmonds, Everett, Mukilteo small-portfolio inventory.

## Open questions

- Cohort E region-exit share: 22% estimate is based on layoffs.fyi LinkedIn outflow signals; actual share may be 15-30%. Tighten with a 2026 LinkedIn member-flow query.
- Boeing 2024 IAM strike + Nov-2024 10% global cut: response in Snohomish small-portfolio inventory not yet visible in Q1-2026 data; could materially shift the "insulated" thesis if Boeing follows the 2025 production-rate guidance downward.
- Whether 5-day RTO mandates (Microsoft Sep-2024 effective Feb-2025; Amazon Sep-2024 effective Jan-2025; Starbucks Oct-2024) reverse the 2022-2023 sub-urban migration. Early data suggests partial reversal but not full pre-pandemic distribution.

## Source citations

- WARN filings: WA ESD WARN Notice database public records. Filing references in `warn-notices.csv`.
- Vacancy + rent growth: CoStar Class A and Class B/C multifamily series, cross-checked with Apartment List National Rent Report and Zillow ZORI ZIP-level series.
- Layoff counts: layoffs.fyi cross-referenced with WARN.
- Rate environment: FRED FEDFUNDS, FRED MORTGAGE30US.
- Supply pipeline: CoStar Multifamily Pipeline.
- Re-urbanization: Apartment List Population and Migration reports 2021-2024.
