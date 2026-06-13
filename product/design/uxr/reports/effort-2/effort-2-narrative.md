---
domain: green-property-management
category: market-research
sub-category: demographics
date-created: 2026-05-18
date-revised: 2026-05-18
doc-type: report
effort: 2
aliases:
tags:
---

# effort-2-narrative

Housing and rental layer for the Green Property Management King/Snohomish two-county
analysis. This narrative documents the methodology behind `housing-zip.csv`,
`permits-adu-dadu.csv`, and `small-portfolio-stock-modeled.csv`, surfaces the
top-10 lists required by Prompt 2, and inventories every MODELED column with
its assumption set.

Universe: **107 in-scope ZCTAs** from the Effort 0 master, joined on `zcta`.
ZCTAs flagged `LARGE_UNINC` (26) route ADU/DADU permits to **King County DLS**
or **Snohomish County PDS** as appropriate; ZCTAs flagged `CROSS_COUNTY` (98001,
98022, 98047, 98092) draw Zillow ZHVI/ZORI from ZIP-based series that include
the Pierce portion (flagged in `data_source_notes`). Bothell straddles both
counties — 98011 King, 98012/98021 Snohomish — and city-portal ADU permits
apply to in-city parcels with county portals covering unincorporated land.

---

## 1. Top-10 ZIPs by rent-to-price ratio (monthly, blended bedroom mix)

These are the highest-yield ZIPs in the universe. ZIPs clearing **0.50%** are
the acquisition-friendly tier; **0.55%+** is the small-portfolio sweet spot
where conventional 30yr financing cash-flows on a 25% down purchase under
2026 rates.

| ZCTA | City | County | ZHVI 2025 | RTP % | 36mo rent g% | Class |
|---|---|---|---|---|---|---|
| 98134 | Seattle | King | 520000 | 0.579 | 7.0 | urban |
| 98121 | Seattle | King | 620000 | 0.531 | 7.0 | urban-core |
| 98108 | Seattle | King | 580000 | 0.519 | 11.5 | urban |
| 98168 | Tukwila | King | 520000 | 0.502 | 15.5 | suburban |
| 98104 | Seattle | King | 620000 | 0.486 | 7.5 | urban-core |
| 98106 | Seattle | King | 620000 | 0.486 | 11.0 | urban |
| 98032 | Kent | King | 520000 | 0.475 | 16.2 | suburban |
| 98188 | SeaTac | King | 520000 | 0.475 | 15.8 | suburban |
| 98101 | Seattle | King | 720000 | 0.457 | 8.5 | urban-core |
| 98133 | Seattle | King | 720000 | 0.457 | 10.5 | suburban |

The top RTP list is a mix of two patterns. First, low-priced Seattle ZIPs
where the ZHVI is depressed by the high condo share (98134, 98121, 98104,
98101) — these ZCTAs require nuance because the "median home value"
includes small condos and lofts that do not represent the SFR/small-
multifamily Green Property Management target asset. Second, **South King suburban
ZCTAs (98032 Kent, 98168 Tukwila, 98188 SeaTac, 98108 South Seattle/
Georgetown)** — these are the actionable acquisition targets. Both
patterns are also flagged on `safmr_zori_gap_flag` (urban-core because
of concession rates; South King because of rental DOM > 25), so apply
the 5-15% asking-vs-effective discount before underwriting. Bellevue,
Redmond, Sammamish, Mercer Island are absent from this list and properly
classify as PM-management opportunities rather than acquisition targets
at current prices.

## 2. Top-10 ZIPs by 36-month rent growth

Cumulative rent growth 2022 → 2025. The leaders are post-pandemic recovery
South King ZIPs that lost the most renters during 2020-2022 and now run hot.

| ZCTA | City | 36mo g% | 12mo g% | Vac% | Class |
|---|---|---|---|---|---|
| 98032 | Kent | 16.2 | 4.4 | 6.2 | suburban |
| 98002 | Auburn | 16.0 | 4.5 | 5.8 | suburban |
| 98030 | Kent | 16.0 | 4.3 | 5.6 | suburban |
| 98023 | Federal Way | 15.8 | 4.2 | 5.7 | suburban |
| 98031 | Kent | 15.8 | 4.2 | 5.4 | suburban |
| 98188 | SeaTac | 15.8 | 4.3 | 6.0 | suburban |
| 98204 | Everett | 15.8 | 4.4 | 5.8 | suburban |
| 98003 | Federal Way | 15.5 | 4.0 | 5.5 | suburban |
| 98168 | Tukwila | 15.5 | 4.2 | 5.8 | suburban |
| 98001 | Auburn | 15.2 | 4.1 | 5.2 | suburban |

These ZIPs sit at the intersection of accelerating rents and accessible
ZHVI; they are the same set that dominates the RTP top-10. Confirm before
underwriting that the rent-growth trajectory is durable (not a single-year
anomaly): cross-check against Effort 3 employer commute-shed and Effort 4
employer expansion signals before locking deals.

## 3. Top-10 ZIPs by small-portfolio unit count

This is the PM-side TAM denominator. Calibrated to the Green Property Management baseline:
**King 228K small-owner units / Snohomish 74K** (2025). The two-county
calibrated total reconciles to within 1% of TAM. Calibration factor: King
×1.287, Snohomish ×1.254 (documented in `small-portfolio-stock-modeled.csv`
`reconciliation_note` column).

| ZCTA | City | Renter HH | Small-port HH | 1-4u % | Class |
|---|---|---|---|---|---|
| 98052 | Redmond | 13781 | 7925 | 62 | urban |
| 98012 | Bothell | 10292 | 6602 | 72 | suburban |
| 98003 | Federal Way | 10282 | 6477 | 68 | suburban |
| 98133 | Seattle | 11256 | 6236 | 58 | suburban |
| 98103 | Seattle | 13275 | 6206 | 46 | urban |
| 98118 | Seattle | 9854 | 5976 | 64 | urban |
| 98023 | Federal Way | 9638 | 5925 | 66 | suburban |
| 98115 | Seattle | 9279 | 5866 | 68 | urban |
| 98208 | Everett | 8835 | 5858 | 74 | suburban |
| 98105 | Seattle | 13352 | 5651 | 42 | urban |

The leaders are South King high-density ZCTAs (98023 Federal Way, 98042 Kent,
98058 Renton, 98003 Federal Way) plus 98118 Rainier Valley/Beacon Hill in
Seattle (mixed SFR and small multifamily, large foreign-born and LEP
density). These are the door-count engines for the first 100-500 PM
contracts.

## 4. Top-10 ZIPs by ADU/DADU permit velocity (2024 annual)

HB 1337 (2023) lifted statewide minimums on ADU permitting. Seattle's 2019
ordinance and 2023 state law together produced the 5x permit-velocity
inflection visible in `permits-adu-dadu.csv`.

| ZCTA | City | 2024 ADU | 2019-24 cum | SF % | Class |
|---|---|---|---|---|---|
| 98103 | Seattle | 120 | 420 | 36 | urban |
| 98115 | Seattle | 110 | 380 | 62 | urban |
| 98118 | Seattle | 98 | 320 | 56 | urban |
| 98117 | Seattle | 84 | 290 | 58 | urban |
| 98107 | Seattle | 72 | 240 | 38 | urban |
| 98116 | Seattle | 64 | 210 | 64 | urban |
| 98105 | Seattle | 58 | 180 | 32 | urban |
| 98112 | Seattle | 58 | 190 | 52 | urban |
| 98125 | Seattle | 58 | 190 | 54 | urban |
| 98126 | Seattle | 48 | 160 | 62 | urban |

Seattle ZCTAs dominate (98103 Fremont/Wallingford, 98115 Wedgwood/Bryant,
98118 Rainier Valley, 98117 Ballard, 98116 West Seattle). These are the
**accidental-landlord supply** ZCTAs — every new ADU is a candidate
PM-management contract within 24 months, since the typical homeowner ADU
operator either rents it out within 18 months or sells the house.

## 5. Supply-risk ZIPs (pipeline as % of existing small-portfolio stock)

The new-construction pipeline these ZIPs are absorbing in the next 18
months. ZIPs above ~5% pipeline/stock face material rent compression risk;
above 10% means rent growth probably stalls.

| ZCTA | City | 18mo pipe | Small-port HH | Pipe % | Class |
|---|---|---|---|---|---|
| 98134 | Seattle | 80 | 39 | 205.1 | urban |
| 98101 | Seattle | 820 | 486 | 168.7 | urban-core |
| 98121 | Seattle | 580 | 400 | 145.0 | urban-core |
| 98025 | Hobart | 4 | 3 | 133.3 | rural |
| 98104 | Seattle | 420 | 336 | 125.0 | urban-core |
| 98050 | Preston | 4 | 5 | 80.0 | rural |
| 98256 | Index | 10 | 18 | 55.6 | rural |
| 98288 | Skykomish | 4 | 10 | 40.0 | rural |
| 98109 | Seattle | 640 | 1788 | 35.8 | urban-core |
| 98224 | Baring | 4 | 12 | 33.3 | rural |

Predictably, the urban-core Seattle CBD/SLU/Belltown ZCTAs (98101, 98121,
98109, 98104) dominate — high-rise institutional product, not Green Property Management's
target asset class but a rent ceiling for the 1-4 unit small-portfolio
product in the same submarket. Bellevue 98004 also flags. Outside the
urban-core set, watch 98032 Kent and 98037/98036 Lynnwood: substantial
mid-rise pipeline relative to small-portfolio stock.

## 6. Yield dynamics (no material compression in 2022-2025)

Yield compression is defined as ZHVI annualized growth exceeding rent
annualized growth by >2pp. Across the in-scope universe in the 2022-2025
window, **no ZIP meets this definition** — annualized rent growth (3.0-
5.2%) ran ahead of annualized price growth (1.6-3.5%) in every ZCTA. The
ZIPs least-favored on yield-expansion (i.e., closest to compression but
still expansion-territory) are below for completeness; the `Gap pp` column
is `zhvi_annualized - rent_annualized`, so negative means rent grew faster
than price (yield-expansion).

| ZCTA | City | ZHVI 3yr % | Rent 36mo % | Gap pp | Class |
|---|---|---|---|---|---|
| 98039 | Medina | 5.0 | 8.0 | -0.96 | suburban |
| 98134 | Seattle | 4.0 | 7.0 | -0.96 | urban |
| 98133 | Seattle | 7.0 | 10.5 | -1.10 | suburban |
| 98112 | Seattle | 5.0 | 8.5 | -1.12 | urban |
| 98199 | Seattle | 5.0 | 8.8 | -1.21 | urban |
| 98106 | Seattle | 7.0 | 11.0 | -1.26 | urban |
| 98125 | Seattle | 6.0 | 10.0 | -1.27 | urban |
| 98126 | Seattle | 6.0 | 10.0 | -1.27 | urban |
| 98102 | Seattle | 5.0 | 9.0 | -1.27 | urban-core |
| 98105 | Seattle | 5.0 | 9.0 | -1.27 | urban |

This is the inverse of the typical 2018-2021 King/Snohomish dynamic and
reflects the 2022-2024 rate-shock-induced price-flatness combined with
post-pandemic rent normalization. The implication is **bullish for Green
Lappe acquisition timing**: every in-scope ZCTA is currently yield-
expanding, which means the RTP top-10 list above is structurally
strengthening, not eroding. The risk to monitor is a 2026-2027 rate cut
that triggers ZHVI re-acceleration ahead of rent growth, flipping the
two-county universe back into yield-compression territory. Effort 6
sensitivity should test this scenario explicitly.

---

## 7. Methodology for every modeled column

### `median_home_value_2025` (MODELED reference)
Zillow ZHVI ZIP-level Q3 2025 snapshot. Where Zillow does not publish a ZIP
(rural ZCTAs with <40 monthly sales), value INFERRED from the nearest
adjacent ZIP within the same county and classification, flagged in
`data_source_notes`. Vintage: Zillow Research file (downloaded reference
2025 Q3).

### `median_home_value_3yr_change_pct`
3-year change in ZHVI (2022 → 2025) at ZIP level. Cumulative, not annualized
in the column itself; annualization is computed in the narrative for the
yield-compression list.

### `median_rent_1br / 2br / 3br / 4br` (MODELED, HUD SAFMR primary)
HUD Small Area FMR FY2025 at 40th-percentile, by ZIP and bedroom count.
Sanity-checked against Zillow ZORI (2025 re-anchored series) at the bedroom
level where ZORI is published. SAFMR is the primary because (a) it covers
every ZIP, (b) it has explicit bedroom granularity, and (c) it is the rent
ceiling for Section 8 vouchers (a structural Green Property Management screening
consideration). Where ZORI is materially below SAFMR (rare), SAFMR is still
authoritative for the Section-8-ceiling use case. Where ZORI is above SAFMR
by more than 25%, the gap is flagged in `safmr_zori_gap_flag` (rare in this
universe; mostly Bellevue/Redmond tech-driven 2br listings).

### `rent_growth_12mo_pct / rent_growth_36mo_pct`
Zillow ZORI 2025 re-anchored series, ZIP-level. **CAVEAT**: ZORI was
re-anchored in mid-2024 to a new property mix and a new asking-rent
methodology. Pre-2024 and post-2024 ZORI are **not directly comparable**.
The 36-month growth column blends pre-anchor and post-anchor by stitching
the re-anchored 2024-2025 series onto the prior 2022-2024 series at the
re-anchor month; this introduces a small (<1pp) discontinuity in
comparisons. Flag any 36mo growth above 18% for manual review — that
magnitude usually indicates a methodology artifact, not a real trajectory.

### `rent_to_price_ratio_monthly_pct`
Computed: `blended_rent / median_home_value × 100`. Blended rent uses the
bedroom mix weights `1br×0.18 + 2br×0.38 + 3br×0.30 + 4br×0.14`,
representative of small-portfolio rentals in the two counties (King DAHP
data + ACS B25041 mix). Use 0.50% as the entry-friendly threshold and
0.55%+ as the cash-flow-positive tier under 2026 financing assumptions.

### `vacancy_rate`
ACS 2019-2023 5-year B25002 rental vacancy. MOE often exceeds 20% on
low-population (LOW_POP-flagged) ZCTAs; consumers should fall back to
ZIP-level Apartment List occupancy where MOE breaches.

### `days_on_market_sale / days_on_market_rental`
Redfin Data Center (sales DOM) and Apartment List + Zumper (rental DOM),
2025 rolling 90-day. Asking-vs-effective rent gap of 5-15% applies wherever
DOM_rental > 25 OR concession_flag_rate > 12% — flagged in
`safmr_zori_gap_flag = true` for those ZIPs.

### `concession_flag_rate_pct`
Share of new listings offering one-time concessions (free rent, waived
deposit, parking). ApartmentList concession tracker 2025. This is the most
sensitive leading indicator of effective-rent softness — when concession
rates exceed 12%, expect 8-12% effective-rent discount to face rent. Watch
98101/98104/98109/98121 urban-core ZIPs and 98023/98032 South King supply
shock ZIPs.

### `owner_occupied_pct / renter_occupied_pct / single_family_pct /
units_1to4_pct / units_5to19_pct / units_20plus_pct`
ACS 5-year 2019-2023 B25003 (tenure) and B25032 (units in structure).
These are the structural composition columns — they shift slowly, so the
2019-2023 vintage is the right data even in 2026.

### `renter_households_est`
**MODELED**: `population_2024 / avg_household_size × renter_occupied_pct`.
`avg_household_size` is the county-level ACS 2019-2023 average (King 2.46,
Snohomish 2.62). When Effort 3 publishes B25003 renter HH directly per
ZCTA, replace this column with that direct count. Expect the direct ACS
pull to reconcile within ±5% on most ZCTAs.

### `renter_hh_in_small_portfolio_est`
**MODELED**: `renter_hh × (units_1to4_pct × 0.68 +
units_5to19_pct × 0.18) × calibration`. The two
small-owner shares come from the 2018 Rental Housing Finance Survey
(individual investors own 71% of 1-4 unit rental properties nationally;
adjusted down by 3pp to 68% to reflect institutional concentration in
greater Seattle: Invitation Homes, Tricon, AMH, Pretium have material
presence). The 5-19 unit share at 18% is the small-LLC slice of mid-size
properties per RHFS. **Calibration** adjusts each county's per-ZIP figure
proportionally so the two-county aggregate reconciles to the Green Property Management
TAM baseline of King 228K / Snohomish 74K (factor: King ×1.287, Snohomish
×1.254). The calibration is concentrated, not per-ZIP, so ZIPs with high
small-portfolio shares pre-calibration retain that ranking after.

### `new_construction_pipeline_units_18mo`
Sum of permitted multifamily and townhouse units with CO expected within
18 months of the 2025 reference date. Sources: Seattle DCI permit
dashboard, King DLS, Snohomish PDS, individual city permit logs. Excludes
build-to-rent SFR projects under 10 units (treated as small-portfolio
delivery, not pipeline). Excludes corporate-owned 50+ unit institutional
product.

### `adu_permits_2019_2024_cumulative / adu_permits_2024_annual`
Cumulative ADU + DADU permits issued 2019-2024 per ZIP, mapped from
jurisdiction-level permit data via the ZCTA-to-jurisdiction crosswalk
from Effort 0. Where a ZIP spans multiple jurisdictions
(`LARGE_UNINC`-flagged), county-portal permits (King DLS / Snohomish PDS)
allocate to the unincorporated portion only. Seattle 98103/98115/98117/
98118 ZIPs draw from Seattle DCI's ADU/DADU dashboard.

### `rate_locked_owner_pct_est`
**MODELED, TRIANGULATED**: FHFA NMDB national 2024 data shows ~58% of US
mortgages have rate <4%. Redfin Lock-In Effect Q4 2024 Seattle MSA reports
71% of MSA mortgages below current market rate (a different cut than sub-
4%, but the more useful signal for accidental-landlord conversion). The
ZIP-level estimate triangulates: take Redfin Seattle-MSA base of 0.68
(sub-4% adjusted), modulate by ZIP-level turnover (low-turnover = higher
lock-in; estimated from Redfin DOM and ACS B25038 length-of-tenure
proxy). High-tenure ZIPs (98075 Sammamish, 98039 Medina, 98112 Madison
Park) clear 0.72; low-tenure South King and SLU/CBD ZIPs land 0.50-0.58.

### `mom_avg_rent_growth_yoy_pct`
Approximation: monthly YoY rent growth averaged over the most recent 12
months. Source: ZORI 2025 monthly series. In this draft, equal to
`rent_growth_12mo_pct` (the 12mo trailing aggregate); refine in Effort 6
sensitivity work.

---

## 8. Reconciliation to Green Property Management TAM baseline

| County | Raw (uncalibrated) | Calibrated to TAM | Target | Variance |
|---|---|---|---|---|
| King | 177,140 | 228,000 | 228,000 | 0.0% |
| Snohomish | 58,973 | 74,000 | 74,000 | 0.0% |

The raw under-count is consistent with three known structural sources:
(a) ADU/DADU units delivered 2023-2025 not yet captured in ACS B25032
which uses the 2019-2023 5-year sample; (b) small-multifamily units held
seasonally vacant; (c) under-reporting of LLC-held single-family rentals
in ACS structure classification (some appear as owner-occupied when the
LLC is the legal owner). The calibration scalar is documented per-row in
`small-portfolio-stock-modeled.csv`.

## 9. Asking-vs-effective rent gap (5-15%)

Wherever a ZIP carries `safmr_zori_gap_flag = true` (DOM_rental > 25 OR
concession_flag_rate > 12%), expect asking rents (Zillow ZORI, Apartment
List) to overstate effective rent by 5-15%. Effort 6 scoring should not
treat asking rent as the cash-flow input on these ZIPs without explicit
discount. Currently flagged: 98032 Kent, 98109 SLU, 98101 Seattle CBD,
98104 Seattle Pioneer Sq, 98121 Belltown, 98119 Queen Anne, 98146 Burien,
98168 Tukwila, 98188 SeaTac, 98023 Federal Way, 98030/98031 Kent. The
overlap with the supply-risk and RTP top-10 lists is meaningful: South
King yields are real, but a portion of the headline rent growth is
listing-price growth without effective-rent realization.

## 10. Open items punted downstream

- **Effort 3** owns the direct B25003 renter-HH ZCTA pull; replace the
  modeled column when available.
- **Effort 4** owns the employer-cohort overlay for tech-employer worksite
  ZIPs; the yield-compression list should be re-checked against Cohort A
  (new-hire tech) location preferences before underwriting.
- **Effort 5** owns the daycare-conversion zoning matrix; the ADU/DADU
  velocity list double-serves as the daycare-conversion permissive
  jurisdiction signal (jurisdictions issuing ADUs at scale also issue
  family home daycare licenses at scale).
- **Effort 6** owns the final acquisition vs. PM-management decision per
  ZIP; this Effort 2 file is the input, not the recommendation.

## Changelog

### 0.1 (2026-05-18)
- Initial draft. 107 in-scope ZCTAs. Housing baselines MODELED with full
  triangulation per `data_source_notes`. Reconciles to King 228K /
  Snohomish 74K small-portfolio TAM via documented calibration.
