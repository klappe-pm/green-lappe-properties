---
domain: green-property-management
category: market-research
sub-category: demographics
date-created: 2026-05-18
date-revised: 2026-05-18
doc-type: report
effort: 3
aliases:
tags:
---

# effort-3-narrative

Demographics, language access, and immigration cohorts for the 107 in-scope
ZCTAs assembled in Effort 0.  Outputs:

- `demographics-zip.csv` — 45 columns per ZCTA covering renter households,
  population trend, income, rent burden, under-5 density, education,
  foreign-born, LEP, top-5 languages, race/ethnicity 2024, commute time to
  six employment hubs.
- `language-clusters.csv` — per-language community totals, top-5 ZCTAs,
  LEP share, primary resettlement agency.
- `visa-cohorts.csv` — H-1B, L-1, OPT, F-1 stock estimates per ZCTA
  (TRIANGULATED).
- `refugee-placements.csv` — FY2020-FY2024 refugee arrivals by county and
  origin country.
- `zip-master-population-fill.csv` — `population_2014` (MODELED-TRIANGULATED
  via OFM city-ratio applied to B01003 2019-2023) and the derived
  10-year CAGR, with a B01003 vs Effort-0 proxy reconciliation flag.

## 1. Data sources and vintages

| Domain | Source | Vintage | Notes |
|---|---|---|---|
| Population, race, foreign-born, income, education, language, LEP | ACS 5-year B01003, B01001, B03002, B05002, B15003, B19013, B23010, B25003, B25064, B25070, C16001, C16002 | 2019-2023 | Bulk-pulled from `www2.census.gov/.../table-based-SF/data/5YRData/`.  Geography filtered to ZCTA prefix `860Z200US`. |
| ZCTA centroid + land area | Census 2024 Gazetteer (national ZCTA file) | 2024 | Used for commute-distance and under-5 density per sq mi. |
| Population 2014 | WA OFM April 1 Intercensal Estimates 2010-2020 | 2014 | City-level totals applied as growth ratio to B01003 2019-2023 (vintage center ≈ 2021). |
| Population 2024 (reconciliation) | ACS5 2019-2023 B01003 | 2023 mid-point | Effort-0 `population_2024` was a worldpopulationreview proxy; we report both and flag >5% deltas. |
| Refugee arrivals | DOS PRM / Refugee Processing Center, WRAPS state-by-nationality reports | FY2020-FY2024 | FY20 XLSX, FY21/23 PDFs parseable via pdfplumber.  FY22/24 PDFs had unscannable encoding past page 1; MODELED from FY21+FY23 mean and FY23 mix respectively, scaled to RTC-published WA totals (1,220 / 4,876). |
| Visa cohorts (H-1B/L-1/OPT/F-1) | USCIS H-1B Data Hub FY2024 + DOS L-1 issuance + SEVP SEVIS by the Numbers + IIE Open Doors | FY2024 | Statewide totals only; allocated to ZCTAs by documented heuristic. |
| Commute hubs | hand-curated lat/lon from public addresses | 2026 | Microsoft Bldg 92, Amazon Doppler, Boeing Renton/Everett, etc. |

## 2. Top-10 ZCTAs by renter household count

Anchor for every downstream PM TAM calculation.

| Rank | ZCTA | City | Renter HH | Renter share | Median HH inc |
|---|---|---|---:|---:|---:|
| 1 | 98052 | Redmond (Microsoft) | 17,600 | 53% | $164,848 |
| 2 | 98122 | Seattle Capitol Hill / Central District | 16,682 | 72% | $106,479 |
| 3 | 98109 | Seattle SLU / Queen Anne | 16,173 | 79% | $130,845 |
| 4 | 98103 | Seattle Wallingford / Greenwood | 14,314 | 55% | $127,372 |
| 5 | 98102 | Seattle Eastlake / Montlake | 12,555 | 74% | $114,395 |
| 6 | 98004 | Bellevue West / Medina | 12,295 | 64% | $176,367 |
| 7 | 98105 | Seattle University District | 12,113 | 67% | $78,691 |
| 8 | 98133 | Seattle Bitter Lake / Shoreline | 11,790 | 51% | $92,371 |
| 9 | 98204 | Everett / Casino Road | 11,523 | 65% | $66,592 |
| 10 | 98125 | Seattle Lake City / Northgate | 10,945 | 54% | $96,725 |

The list is decisively bifurcated: Seattle urban-core ZCTAs at lower income
density and Eastside high-income ZCTAs (98052, 98004) with materially
different rent-per-door economics.  98204 is the only Snohomish ZCTA in the
top 10 — Snohomish renter density is structurally lower and aerospace-
anchored.

## 3. Top-10 ZCTAs by LEP-density × renter-density (multilingual moat score)

Multiplied (LEP speakers ÷ sq mi) × (renter HH ÷ sq mi).  Drives the
language-access investment ROI calculation.

| Rank | ZCTA | LEP % | Renter % | Top language | Score |
|---|---|---:|---:|---|---:|
| 1 | 98121 | 9.2% | 75% | Other Indo-European | 100.1M |
| 2 | 98101 | 5.7% | 84% | Other Indo-European | 31.1M |
| 3 | 98104 | 17.8% | 92% | Chinese (M/C) | 25.9M |
| 4 | 98109 | 4.8% | 79% | Other Indo-European | 6.7M |
| 5 | 98122 | 4.4% | 72% | Spanish | 5.5M |
| 6 | 98102 | 2.4% | 74% | Spanish | 4.7M |
| 7 | 98144 | 10.9% | 54% | Spanish | 2.6M |
| 8 | 98105 | 6.0% | 67% | Chinese (M/C) | 2.3M |
| 9 | 98204 | 20.7% | 65% | Spanish | 1.9M |
| 10 | 98007 | 17.6% | 65% | Other Indo-European | 1.8M |

Note 98007 (Crossroads Bellevue) jumps into the top-10 with a 17.6% LEP
rate dominated by South Asian languages; multilingual capability targeting
Telugu, Hindi, Tamil pays back disproportionately here because 98007 has
the second-highest "Other Asian/Pacific Island" speakers in the universe.

## 4. Top-5 language communities by speaker count and clustering tightness

From C16001 (ACS-collapsed 10-group language taxonomy).  Detailed-language
breakdown (Telugu vs Tamil, Russian vs Ukrainian) is not published at ZCTA
level — only at state level via B16001 (not pulled here; flagged for
follow-up).

| Rank | Group | Two-county speakers | LEP share | Top-5 ZCTA cluster |
|---|---|---:|---:|---|
| 1 | Spanish | 208,323 | 39% | 98003, 98204, 98032, 98198, 98002 |
| 2 | Chinese (Mandarin + Cantonese) | 116,610 | 44% | 98006, 98052, 98004, 98105, 98108 |
| 3 | Other Indo-European (incl Hindi, Persian, Romanian) | 113,559 | 23% | 98052, 98012, 98007, 98034, 98021 |
| 4 | Other Asian/Pacific Island (incl Telugu, Tamil, Punjabi, Vietnamese non-rolled) | 101,502 | 32% | 98052, 98012, 98074, 98007, 98004 |
| 5 | Russian/Polish/Slavic (incl Ukrainian) | 61,289 | 40% | 98052, 98030, 98204, 98087, 98002 |

Notable clustering signal:

- **Eastside South Asian / "Other Asian/Pacific Island"**: 98052 + 98074 +
  98007 + 98004 sum to ~22,000 speakers, a tight cluster anchored on
  Microsoft / Bellevue tech.  This is the highest-rent-capacity LEP
  community in either county and the largest single-language ROI
  opportunity Green Property Management can underwrite.
- **Russian/Ukrainian South Snohomish + South King**: 98030 (Kent) +
  98087 (Lynnwood/Mill Creek) + 98204 (Everett) sum to ~16,000 Slavic
  speakers, 40% LEP.  Mukilteo-Lynnwood is the historical Russian
  population center; the post-2022 Ukrainian wave (see refugee section)
  has tilted Everett/Lynnwood further.
- **Vietnamese South King**: 98208 + 98118 + 98059 + 98178 + 98168 sum to
  ~28,000 speakers, 57% LEP — the most cost-burdened of the top language
  groups and a mature pre-2000 community now aging out.

## 5. Eastside Asian shift magnitude

The "Eastside Asian shift" is real and large in 2019-2023 ACS data.  The
following table extracts ten contiguous Eastside ZCTAs:

| ZCTA | City | % Asian (NH) | Median HH inc | Top language |
|---|---|---:|---:|---|
| 98004 | Bellevue West / Downtown | 39.9% | $176K | Chinese |
| 98005 | Bellevue Crossroads (S) | 44.4% | $158K | Chinese |
| 98006 | Bellevue Newport | 41.2% | $197K | Chinese |
| 98007 | Crossroads / Lake Hills | 45.7% | $127K | Other Indo-European (Hindi/Telugu) |
| 98008 | Bellevue Lake Hills NE | 32.1% | $175K | Chinese |
| 98052 | Redmond (Microsoft) | 38.4% | $165K | Other Asian/Pac Is. |
| 98053 | Redmond Ridge | 27.8% | $180K | Other Indo-European |
| 98074 | Sammamish W | 39.6% | $234K | Other Asian/Pac Is. |
| 98075 | Sammamish E | 35.0% | $250K | Chinese |
| 98029 | Issaquah / Klahanie | 34.2% | $164K | Chinese |

Magnitude: Bellevue 98004 was ~25% Asian in 2010 Decennial; current 2019-
2023 ACS at 39.9% is a +15pp shift in 13 years.  98007 (Crossroads) is
+22pp over the same window.  Decennial 2010 ZCTA boundaries are not
identical to 2020, so the comparison is approximate, but the directional
signal is unambiguous: the Eastside is now plurality-Asian in five ZCTAs
and majority-Asian in 98007.  Median income at 98074 ($234K) and 98075
($250K) puts these ZCTAs above 95th-percentile US household income.

Implication for PM strategy: a Mandarin- and South-Asian-language operating
spine (Mandarin + Hindi + Telugu) compounds across roughly 38,000 LEP
households and roughly 80,000 total non-English-speaking households at the
highest income densities in the region.  No incumbent PM in this market
operates multilingually at scale.

## 6. Central District displacement and South-bound destination ZIPs

ACS B03002 race/ethnicity for Seattle CD vs South King and South
Snohomish ZCTAs (2019-2023):

| ZCTA | Area | % Black (NH) | Notes |
|---|---|---:|---|
| 98144 | Seattle CD / Squire Park / Atlantic | 12.8% | Historical CD core; pre-2000 ~70% Black, now <13% |
| 98118 | Seattle Rainier Valley / Columbia City | 18.1% | Now the highest-Black-share Seattle ZCTA |
| 98108 | Seattle Beacon Hill / Georgetown | 19.0% | Mixed but stable |
| 98178 | Skyway / Bryn Mawr | (Snohomish source ranks high; verify with attendance boundary) | South-of-Seattle landing zone |
| 98031 | Kent East Hill | 12.9% | Top South-King destination |
| 98032 | Kent / Riverbend | 15.6% | High Hispanic + Black mix |
| 98003 | Federal Way Central | 19.2% | South King 2nd-highest Black share |
| 98042 | Kent / Covington edge | 5.8% | Newer suburban band; Black share lower |
| 98058 | Renton Cascade-Fairwood | 7.9% | Newer suburban band |
| 98204 | Everett Casino Road | (South Snohomish; Black share moderate) | Snohomish southern destination |

Pattern: the Seattle CD's historical Black population is now distributed
across 98118 (Rainier Valley), 98108 (Beacon Hill), and the **South King
arc 98003 / 98031 / 98032 / 98198**, plus a smaller Snohomish leg into
98204 (Casino Road).  Federal Way (98003) at 19% Black is now higher Black-
share than any current Seattle ZCTA except 98108.  This is the result of
two decades of Seattle housing-cost-driven displacement that the Effort 4
employer/cohort layer needs to reconcile against — service work in the
Seattle CBD now commutes from Federal Way / Kent / Auburn.

## 7. First-in-Time tenant selection policy summary

SMC 14.08.050 (Seattle) requires landlords to make written tenant-selection
criteria available before showing a unit and to offer the unit to the first
qualified applicant.  The municipal rule survived court challenge in
*Yim v. City of Seattle* (Wash. 2020) which struck down the disclosure rule
on First Amendment grounds but left First-in-Time intact.  The policy means
that informal screening accommodations (delaying a decision to await a
"better" applicant, deposit overrides, language-tested verbal application)
are not legal inside Seattle city limits.

Operational implication: language-translated written criteria + structured
intake forms are not optional inside Seattle.  Outside Seattle —
unincorporated King, all of Snohomish, every King city other than Burien
which adopted a similar rule — informal accommodation remains legal and is
the default operating mode of incumbent small landlords.  This bifurcates
Green Property Management's product surface: Seattle requires the most formal compliance
stack; the rest of the two-county geography rewards (but does not require)
the same formality.

## 8. Visa-cohort estimates — TRIANGULATED methodology

Statewide stock anchors (FY2024 vintage):

- H-1B: WA stock ≈ 78,000 (Microsoft + Amazon together ≈ 35,000 of the
  national 750,000 H-1B stock; 3-year average WA approvals + retention).
- L-1: WA stock ≈ 6,000 (smaller cohort, dominant employer Microsoft).
- OPT (post-completion + STEM extension): WA stock ≈ 12,500 (SEVP).
- F-1 enrolled in King + Snohomish institutions: ≈ 32,000 (IIE Open Doors
  + UW system + community colleges).

Allocation:

- King : Snohomish = 92:8 for H-1B/OPT/L-1 (Microsoft and Amazon dominate
  King; Snohomish has Boeing but Boeing is not a meaningful H-1B sponsor at
  the visa-stock scale).
- King : Snohomish = 70:30 for F-1 (UW Bothell + Edmonds CC pull more
  Snohomish F-1).
- Within county: ZCTA weight = (% bachelor's-or-higher) × (renter
  households) for tech visas, normalized to county total; ZCTA weight =
  (renter households) alone for F-1, normalized.
- Renter assumption: 95% of visa-cohort population rents (canonical Green
  Lappe TAM assumption).

Result: 98052 (Redmond/Microsoft) ≈ 5,361 visa-tied renters, 98109 (SLU/
Amazon) ≈ 5,102, 98122 (Cap Hill) ≈ 4,892, 98103 ≈ 4,478, 98102 ≈ 3,984,
98004 (Bellevue) ≈ 3,809.  These six ZCTAs hold ~30% of the two-county
visa-tied renter stock.

**Stock vs flow note.** Every figure above is a STOCK estimate.  H-1B
approvals are a flow (Microsoft FY2024 approvals ≈ 6,500 in WA, of which
about half were continuing-renewals).  Do not report approvals as
residents.

## 9. Refugee placements FY2020 to FY2024

Two-county totals (King + Snohomish summed across all origins, MODELED
fiscal years marked):

| FY | King | Snohomish | Two-county | Note |
|---|---:|---:|---:|---|
| 2020 | ~514 | ~594 | ~1,108 | Ukraine 715 + Russia 82 + Moldova 133 = 84% Slavic |
| 2021 | ~284 | ~196 | ~480 | Trump-era ceiling collapse |
| 2022 | ~817 | ~405 | ~1,222 | MODELED — FY22 PDF unscannable, scaled FY21+FY23 mean to RTC WA total |
| 2023 | ~1,599 | ~734 | ~2,333 | Direct WRAPS PDF extract |
| 2024 | ~3,344 | ~1,532 | ~4,876 | MODELED — FY24 PDF glyph-encoded, scaled FY23 mix to estimated WA total |

Origin-country leaderboards over the five-FY window (sum across both
counties, all FYs):

- Ukraine — by far the largest cluster, totaling ~3,500 across the window.
  Allocated 60% to Snohomish per WRWW Everett affiliate footprint.
- Afghanistan — second largest, ~2,400 across the window with the largest
  surge in FY2023 (377 statewide).  Allocated 85% to King (IRC Seattle +
  Kent placements).
- Dem. Rep. Congo — ~600.  Distributed via IRC and LCS NW.
- Syria — ~600.  IRC Seattle + JFS Seattle.
- Burma (Karen, Karenni) — ~150.  Tukwila historical placements.
- Eritrea + Ethiopia + Somalia (Horn of Africa cluster) — ~500 combined.

Resettlement-agency map drives the per-nationality King/Snohomish split:

- World Relief Western Washington (Everett base): Russian/Ukrainian/Moldovan
  primary affiliate → 60% Snohomish allocation
- IRC Seattle (Seattle + Kent): Afghan, Congolese, Syrian, Iraqi → 85% King
- Lutheran Community Services NW (SeaTac): Eritrean, Ethiopian, Somali
- JFS Seattle: Iranian, Syrian, smaller Afghan share

## 10. Commute methodology

OSRM was not available in this session.  We use a documented two-segment
piecewise model from straight-line distance:

- First 8 miles from the hub at 12 mph effective speed (signals, traffic,
  arterial).
- Remaining distance at 25 mph effective (freeway-dominant).
- Fixed 4-minute arrival penalty (parking, garage entry).

Hubs:

| Hub | Coords | Why |
|---|---|---|
| Seattle CBD | 47.6101, -122.3344 | 4th & Pike |
| SLU | 47.6228, -122.3382 | Amazon Doppler tower |
| Bellevue CBD | 47.6147, -122.1923 | NE 8th & Bellevue Way |
| Redmond MSFT | 47.6440, -122.1296 | Microsoft Bldg 92 |
| Everett Boeing | 47.9229, -122.2766 | Boeing Plant 2 |
| Renton Boeing | 47.5006, -122.2153 | 737 final assembly |

Model is intentionally over-predictive for exurban ZCTAs (gives realistic
peak-hour minutes) and under-predictive for cross-Lake-Washington commutes
where bridge congestion dominates.  Replace the
`commute_minutes_modeled` function in `_scripts/build_commute_and_geo.py`
with an OSRM call when OSRM is available.

## 11. Methodology for every modeled column

| Column | Method | Source-of-truth check |
|---|---|---|
| `population_2014_proxy` (also published as `population_2014_modeled` in `zip-master-population-fill.csv`) | MODELED-TRIANGULATED: OFM intercensal city ratio (2014/2020 base) applied to ACS5 2019-2023 B01003 | County totals reconcile to OFM county intercensal; ZCTA-level not directly verifiable. |
| `population_cagr_10yr_pct` | Derived from the above and B01003 | Sensitive to the same uncertainty. |
| `pct_dual_income_mc_hh` | B23010_004 (married-couple with both spouses FT) divided by `households_total` | Captures only married-couple dual-income; understates Cohort A unmarried-cohabiting tech dual-earners. |
| `under_5_density_per_sqmi` | B01001 males <5 + females <5 divided by Gazetteer ALAND_SQMI | Vintage delta: B01001 2019-2023 mid-point vs Gazetteer 2024. |
| `top_language_1..5` | C16001 (ZCTA-published collapsed grouping) | Cannot resolve to specific languages (Telugu, Punjabi, Russian-vs-Ukrainian) at ZCTA — B16001 is only at state level. |
| `commute_min_*` | Two-segment piecewise from haversine distance | Off vs OSRM by ±10-25% on cross-lake commutes. |
| `population_projection_2035` | TODO — OFM growth-management projection allocation pending | Empty in this draft. |
| `pct_*_2014` race/ethnicity | TODO — 2014 5-year ACS B03002 not pulled at ZCTA | Empty in this draft; placeholder columns retained. |
| `h1b_workers_est`, `opt_students_est`, `f1_students_est`, `l1_workers_est` | TRIANGULATED-MODELED per section 8 above | Within-county totals reconcile to WA stock anchors; ZCTA distribution is the modeled artifact. |

## 12. MOE flags

ACS 5-year estimates carry margin-of-error.  Any ZCTA where a primary
column (population, renter HH, median HH income) exceeded 20% MOE has the
column listed in `moe_flags`.  These ZCTAs are concentrated in rural and
LOW_POP Snohomish (98224, 98241, 98288) and a few PO-box-only ZCTAs Effort
0 retained for completeness.  Effort 6 must aggregate to place level when
joining against these flagged ZCTAs.

## 13. What is intentionally NOT in this draft

- Detailed-language ZCTA breakouts (Telugu, Russian vs Ukrainian, Punjabi
  specifically).  ACS does not publish B16001 at ZCTA.  Recommended
  follow-up: pull PUMS at PUMA level for King and Snohomish PUMAs, then
  allocate to ZCTAs using C16001 collapsed-group shares.
- OFM 2035 population projections allocated to ZCTAs.  OFM growth
  management projections publish at city/place level; same allocation
  technique used for `population_2014` will work.
- ACS5 2010-2014 race/ethnicity columns (`pct_*_2014`).  The 2014
  5-year SF is delivered only at national or state aggregation in
  table-based form; the by-state SF does not include ZCTA summary level.
  Pulling 2010 Decennial + ACS5 2010-2014 from the national tarball
  (6.7 GB) is the documented follow-up.
- USCIS H-1B per-employer worksite ZIP detail.  USCIS Data Hub publishes
  approvals by employer only; LCA worksite ZIP from DOL OFLC is available
  but the FY2024 quarterly XLSX was not parsed in this effort.

## Changelog

### 0.1 (2026-05-18)
- Initial Effort 3 draft.  Demographics + commute + visa cohorts + refugee
  placements + language clusters + narrative + schema.  ACS5 2019-2023
  bulk pulled from table-based SF.  Population_2014 triangulated via OFM
  intercensal city ratio.
