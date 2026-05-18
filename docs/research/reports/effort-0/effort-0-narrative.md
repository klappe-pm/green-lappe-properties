---
domain: green-lappe-properties
category: market-research
sub-category: demographics
date-created: 2026-05-18
date-revised: 2026-05-18
doc-type: report
effort: 0
aliases:
tags:
---

# effort-0-narrative

Geographic foundation for the Green Lappe King/Snohomish two-county market
analysis. This narrative documents how the ZIP universe in `zip-master.csv`,
`zip-boundaries.geojson`, `district-boundaries.geojson`, and
`jurisdiction-crosswalk.csv` was assembled, what every flag means, what is
explicitly excluded, and where the remaining `# TODO` cells live.

## 1. Classification methodology

Every in-scope ZCTA is assigned one of five density/character classes. The
classes drive downstream segmentation (urban core does not compete with rural
Snohomish on the same yield scale). The rules below were applied by hand from
known geography; downstream agents may overwrite using density per square
mile from ACS B01003 + TIGER ALAND once direct API pulls are available.

| Class | Working definition | Typical examples |
|---|---|---|
| urban-core | Inside Seattle or Bellevue CBD, dense mixed-use, dominant multifamily and condo product, day-time population materially exceeds residential | 98101, 98102, 98104, 98109, 98121 (Seattle CBD/SLU/Belltown/Pioneer Sq); Downtown Bellevue tract within 98004 (rolled up under urban here for simplicity) |
| urban | Dense residential neighborhood inside a large city's incorporated area, mostly built before 1970, walk-accessible commercial spines | Most Seattle ZCTAs ex-CBD (98103, 98105, 98115, etc.); 98033 Downtown Kirkland; 98052 Redmond (high-density mixed) |
| suburban | Lower-rise SFR-dominant, post-WWII subdivision pattern, car-oriented, inside or directly adjacent to an incorporated city | Most Eastside and South King ZCTAs; most Lynnwood/Edmonds/Mukilteo ZCTAs; Lake Stevens, Marysville Marysville-proper |
| exurban | Small incorporated cities or commute-oriented unincorporated land beyond the contiguous suburban ring; substantial unincorporated share | 98010, 98019, 98045, 98065, 98077, 98223, 98252, 98272, 98290, 98292, 98296 |
| rural | Agriculture, forest, or low-density unincorporated dominant; population sparse; long commute distance | 98014, 98024, 98025, 98050, 98051, 98070, 98224, 98241, 98251, 98256, 98288, 98294 |

The class is the analyst's call where the ZCTA straddles two regimes (e.g.,
98004 mixes urban-core Downtown Bellevue with low-density Medina-adjacent
SFR; logged as `urban`). Downstream Effort 6 scoring should not treat these
as ordinal — they are categorical segmentation, not a quality ranking.

## 2. Anomaly code list

Codes are documented in `schema.yaml` under `code_lists.anomaly_flags` and
repeated here for narrative context.

- **CROSS_COUNTY** — ZCTA land area spans more than one county. Applied to
  98001, 98022, 98047, 98092 (all King ↔ Pierce). The Pierce share is
  recorded in `notes`; `pct_land_king + pct_land_snohomish` will sum to less
  than 1.00 for these rows. Effort 1-5 agents must filter their county-level
  queries on FIPS 53033/53061 and not assume "ZCTA = single county".
- **LARGE_UNINC** — `unincorporated_share >= 0.50`. Twenty-six ZCTAs carry
  this flag. Rental-regulatory authority for these parcels is the County
  Code, not a city code. Effort 5 daycare zoning and Effort 2 ADU permit
  joins must hit county portals (King DLS, Snohomish PDS) for the
  unincorporated portion.
- **RECENT_ANNEX_2020+** — No ZCTAs in this draft carry this flag; the two
  counties had no large city annexations between 2020-01-01 and the
  research date that materially shift ZCTA-to-place mapping. Flag retained
  in the code list for forward-compatibility.
- **MULTI_DISTRICT** — Three or more school districts intersect this ZCTA.
  Applied wherever the ZIP-to-district crosswalk in
  `district-boundaries.geojson` shows three or more rows. Critical signal
  for Effort 1 — these ZCTAs must publish per-attendance-zone school
  quality, not a ZCTA-average.
- **LOW_POP** — `population_2024 < 5,000`. Statistical noise risk for
  downstream rates and percentages. Effort 3 ACS MOE will frequently exceed
  20% on these; aggregate to place where MOE breaches.
- **RURAL_FRINGE** — Class `rural` AND adjacent to forest/agricultural land
  outside any incorporated city. Applied to most rural-classified ZCTAs.
  Signals that small-portfolio rental and licensed-childcare TAM are likely
  too thin for primary analysis but kept for completeness.
- **EDGE_ZIP** — Reserved for ZCTAs with under 10% land area in the two
  target counties. No ZCTA in this universe currently triggers EDGE_ZIP
  (because we excluded those at the inclusion step), but Pierce-adjacent
  ZCTAs like 98321, 98322, 98390 (Bonney Lake / Buckley / Sumner) were
  evaluated and dropped.
- **PO_BOX_ZIP** — Postal ZIP that maps to a containing ZCTA but has no
  separate ZCTA geometry. Applied to 98025 (Hobart), 98050 (Preston),
  98207 (Everett PO box). Set `in_scope_primary = false` automatically.
- **UNIQUE_ZIP** — Postal ZIP for a single building/employer/campus, no ZCTA
  geometry. Applied to 98154, 98158 (SeaTac airport), 98164, 98174, 98195
  (UW Seattle). All retained in the file for audit but
  `in_scope_primary = false`. The Microsoft 98073 ZIP was evaluated and not
  included since it is a unique-recipient ZIP under 98052.

A single ZCTA can and does carry multiple flags (e.g., 98014 carries
`LARGE_UNINC;RURAL_FRINGE`).

## 3. Edge ZIPs explicitly excluded

The following ZCTAs were evaluated against the 10%-land-area inclusion rule
and excluded:

| ZCTA | Reason for exclusion | County of primary land |
|---|---|---|
| 98321 (Buckley) | Buckley sits entirely in Pierce; trivial King share if any. | Pierce |
| 98322 (Carbonado) | Pierce; no King share. | Pierce |
| 98390 (Sumner / Bonney Lake) | Pierce; no King share. | Pierce |
| 98391 (Bonney Lake) | Pierce. | Pierce |
| 98354 (Milton) | Cross-county Pierce + King but the King share is well below 10%. Milton city is mostly Pierce. | Pierce |
| 98056-adjacent (Pierce edge of 98092) | Treated by including 98092 itself with `CROSS_COUNTY`; no separate row for the Pierce sliver. | Pierce |
| 98221 / 98232 / 98237 / 98273 / 98284 | Skagit County. | Skagit |
| 98249 (Freeland) / 98253 (Greenbank) / 98260 (Langley) / 98277 (Oak Harbor) | Island County. | Island |
| 98288 (Skykomish) | Borderline: included because the town sits entirely in King and is the only ZCTA covering that pocket. | King |
| 98224 (Baring) | Included for the same reason as 98288. | King |

The `UNIQUE_ZIP` and `PO_BOX_ZIP` rows above (98154, 98158, 98164, 98174,
98195, 98025, 98050, 98207) are physically retained in `zip-master.csv` with
`in_scope_primary = false`. They are not edge cases by land area but by
geometry-availability. Effort 1-5 agents should filter on
`in_scope_primary = true` for primary analysis.

## 4. Known boundary changes 2014-2024

Geographic events in the two counties during the analysis window that affect
the master file's interpretation:

- **Census 2020 vs 2010 ZCTA delineation.** The 2020 ZCTA universe differs
  from 2010 in several places where postal ZIPs were reassigned. Cross-decade
  comparisons in Effort 3 must use the 2020 ZCTA universe and harmonize
  2010 ACS data into 2020 geometry (Census provides a 2010→2020 relationship
  file).
- **Burien annexation of North Highline (2010, 2012).** Pre-dates the
  window but the 98146 ZCTA still includes large unincorporated White
  Center pockets; `LARGE_UNINC` flag is set.
- **Sammamish annexation of Klahanie (2016).** Klahanie was previously
  unincorporated King and is now Sammamish. The 98029 ZCTA already covers
  the area; the change is jurisdictional only and reflects in the
  `cities` column.
- **Mill Creek annexation (East Gateway UGA, 2018).** Modest expansion of
  Mill Creek into previously unincorporated south Snohomish. Reflected in
  98012 and 98087 unincorporated-share estimates.
- **HB 1337 (statewide ADU, 2023).** Not a boundary change but legally
  changes which structures count as separate housing units in every
  jurisdiction. Effort 2 must apply post-HB 1337 rules to ADU/DADU
  permit-velocity numerator.
- **No materially-large King or Snohomish annexations between 2020-01-01
  and 2024-12-31.** This is the basis for leaving `RECENT_ANNEX_2020+`
  unused in the current draft.
- **Tulalip Indian Reservation overlay in 98271.** Not a 2014-2024 change
  but worth flagging: 98271 includes the Tulalip Tribes reservation, which
  has its own governance overlay. Effort 5 zoning and Effort 2 rental
  regulatory matrix must treat the reservation portion separately.

## 5. Data source vintage per column

Vintage authority for every column in `zip-master.csv`:

| Column | Source | Vintage | Status in this draft |
|---|---|---|---|
| zcta | Census TIGER/Line 2020 ZCTA5 | 2020 | Authoritative; verified against HUD crosswalk and Census ZCTA universe. |
| postal_zips | HUD USPS ZIP-ZCTA crosswalk + USPS lookup | Q4 2024 | Listed equal to ZCTA in this draft; multi-postal-ZIP ZCTAs are rare in these counties. TODO refresh against HUD Q3 2025 file. |
| county_primary | Census 2020 ZCTA-to-County relationship file | 2020 | Authoritative. |
| county_secondary | Same | 2020 | Set only for the four CROSS_COUNTY ZCTAs. |
| pct_land_king, pct_land_snohomish | Census 2020 ZCTA-to-County rel file (AREALAND_PART / AREALAND) | 2020 | MODELED in this draft (rounded to 0.05). Direct numeric values pending API pull. |
| cities | Census 2020 ZCTA-to-Place rel file + county GIS | 2020 + current | Authoritative for incorporated cities; CDPs are 2020 Census. |
| city_primary | Same | 2020 | Analyst-assigned where ZCTA spans more than one place. |
| school_districts | NCES EDGE SY2023-24 + WA OSPI 2024-25 boundaries | 2024 | District names verified against OSPI; NCES GEOIDs need post-processing verification (see district README). |
| unincorporated_share | County GIS clip of incorporated city boundaries vs ZCTA | current | MODELED (rounded to 0.05). Precise overlay pending GIS step. |
| classification | Analyst rules | 2026 | See section 1. |
| population_2014 | ACS 5-year 2010-2014 B01003 | 2014 | NOT POPULATED in this draft. Every row carries `# TODO: source needed - ACS5 2010-2014 B01003`. |
| population_2024 | ACS 5-year 2019-2023 B01003 (target); World Population Review ACS-derived 2024 (proxy used) | 2023-2024 | Populated with PUBLIC-PROXY values from worldpopulationreview.com (worldpopulationreview is itself derived from ACS but adds editorial smoothing); replace with direct B01003 pulls in Effort 3. |
| population_cagr_10yr | Derived | n/a | NOT POPULATED in this draft; depends on population_2014. |
| anomaly_flags | Analyst rules | 2026 | See section 2. |
| in_scope_primary | Inclusion rule | 2026 | Authoritative. |
| notes | Analyst | 2026 | Free text. |

City-totals authority for cross-checks: WA OFM April 1, 2024 and 2025
estimates (`https://ofm.wa.gov/...`). The OFM PDF/XLSX was not parseable in
this session; downstream agents should pull the XLSX directly for any
city-level cross-check.

## 6. TODO-cell inventory

Every `# TODO` cell across the deliverables, by file:

### `zip-master.csv`

- `population_2014` — TODO on every row of the 98 ZCTAs. Source needed: ACS
  5-year 2010-2014 B01003 (Census API `acs/acs5?get=B01003_001E&for=zip%20code%20tabulation%20area:*`). Estimated cell count: **98**.
- `population_cagr_10yr` — TODO on every row (depends on the above).
  Estimated cell count: **98**.
- `population_2024` — populated with PROXY values, not TODO-marked, but
  flagged in `schema.yaml` for ACS B01003 replacement. Not counted in the
  TODO total.

Total TODO cells in `zip-master.csv`: **196** (across 98 rows).

### `jurisdiction-crosswalk.csv`

- One `# TODO` on the Milton row (confirm small King portion if any).
  Total: **1**.

### `schema.yaml`

- Two narrative TODO references (HUD crosswalk refresh; direct ACS pull).
  Not counted as data cells.

### `zip-boundaries.geojson`

- Every feature has `geometry: null`. This is by design and documented in
  the sibling README, not flagged as TODO cells. Treat as 0 TODO cells.

### `district-boundaries.geojson`

- Every feature has `geometry: null` (same convention). 0 TODO cells.
- Three district rows carry `notes` flagging that NCES GEOID needs
  verification (Skykomish, Riverview, duplicate Snoqualmie Valley row). Not
  counted as cell TODOs but logged in the district README.

### Bundle total

**~197 TODO-marked cells**, concentrated almost entirely in the
`population_2014` and `population_cagr_10yr` columns of `zip-master.csv`.
Effort 3's demographics ingestion will fill both columns from ACS B01003,
which is the natural place for the work.

## 7. How Efforts 1-5 should consume this bundle

1. Join on `zcta` (string, 5 char). Never on `postal_zips`.
2. Filter to `in_scope_primary = true` for primary analysis.
3. Respect `anomaly_flags` — especially `CROSS_COUNTY`, `LARGE_UNINC`, and
   `MULTI_DISTRICT` — when allocating county-level data to ZCTAs.
4. For unincorporated portions of any ZCTA (`unincorporated_share > 0`),
   pull regulatory data from the County Code via
   `jurisdiction-crosswalk.csv`, not the nearest city's code.
5. For cross-county ZCTAs, expect that totals will not reconcile to a
   single county. Allocate by `pct_land_king` / `pct_land_snohomish` where
   the underlying data is county-level.
6. Treat `population_2024` as a PROXY value pending Effort 3's direct B01003
   pull; do not lock downstream decisions on it without re-validation.
7. The four `UNIQUE_ZIP` Seattle CBD rows (98154, 98158, 98164, 98174,
   98195) and three `PO_BOX_ZIP` rows (98025, 98050, 98207) are
   intentionally `in_scope_primary = false` and should be ignored by
   automated joiners.

## 8. Open items punted to downstream efforts

- **Tulalip Indian Reservation overlay** in 98271 — flagged in `notes`;
  Effort 5 must build a separate row in the rental-regulatory matrix.
- **Camano Island portion of 98292** — Stanwood-Camano School District
  covers a small Island County area; Effort 1 attendance boundaries must
  clip to FIPS 53061 to avoid pulling Island County student data.
- **King County Pierce share** for 98001, 98022, 98047, 98092 — Effort 2
  ADU permit data should be pulled from both King DLS and Pierce County
  Planning to cover the full ZCTA; flag any double-count risk.
- **Bothell bi-county split** — 98011 (King) and 98012/98021 (Snohomish)
  are all the same city. Effort 5 rental-regulatory rows show
  jurisdiction=Bothell, county=Both. City code applies inside city limits;
  county code applies outside. Each ZCTA carries unincorporated land in the
  county that contains its centroid.

## Changelog

### 0.1 (2026-05-18)
- Initial draft. Effort 0 ZIP universe + crosswalks + null-geometry
  GeoJSONs. Population_2014 and CAGR columns TODO-marked across the
  master. Population_2024 populated with PUBLIC-PROXY values from
  worldpopulationreview.com (ACS-derived, 2024 vintage) pending direct
  ACS B01003 pull in Effort 3.
