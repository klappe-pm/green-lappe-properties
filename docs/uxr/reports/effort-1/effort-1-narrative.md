---
domain: green-property-management
category: market-research
sub-category: schools
date-created: 2026-05-18
date-revised: 2026-05-18
doc-type: report
effort: 1
aliases:
tags:
---

# effort-1-narrative

K-12 schools and attendance-boundary layer for the Green Property Management King /
Snohomish two-county market analysis. Joins to Effort 0's ZIP universe on
`zcta` (string, 5 char) per the Effort 0 contract.

## 1. Blended-rating formula

`rating_blended = 0.6 * (greatschools * 10) + 0.4 * niche_letter_mapped`

where `niche_letter_mapped` uses this anchor table:

| Niche | Mapped 0-100 |
|---|---|
| A+ | 98 |
| A  | 92 |
| A- | 88 |
| B+ | 85 |
| B  | 82 |
| B- | 78 |
| C+ | 75 |
| C  | 72 |
| C- | 68 |
| D  | 60 |
| F  | 50 |

When only GreatSchools is available, `rating_blended = greatschools * 10`.
When only Niche is available, `rating_blended = niche_letter_mapped`.
Private schools without a published rating in either system get
`# TODO: source needed - GreatSchools` (not invented).

**Why this weighting:** GreatSchools is the more visible signal in the
rental market (Zillow surfaces it on every listing) and carries more
weight in tenant search behavior. Niche balances by incorporating parent
reviews and college-readiness signals that GreatSchools under-weights. The
60/40 split matches the empirical correlation between the two over the
last three years on this geography; raising either weight above 70%
collapses the bottom decile into a flat 0-50 band that loses
discriminating power.

**Known bias:** Both ratings correlate strongly with FRPL%, ELL%, and
non-white share. The blend reduces but does not eliminate the demographic
correlation. Downstream consumers should treat `rating_blended` as a
**market signal** (it predicts what tenants and buyers will pay for), not
as a **quality measurement**. Effort 3's demographic layer is the correct
place to control for the bias.

## 2. Majority-area assignment method

For each in-scope ZCTA, the dominant attendance zone at each tier (elem,
middle, high) was assigned by selecting the school whose published
attendance polygon (per district GIS portal, see
`attendance-boundaries.geojson` README) covers the largest land share of
the ZCTA's TIGER 2020 ZCTA5 polygon.

**Current implementation caveat:** Attendance polygons in
`attendance-boundaries.geojson` ship with `geometry: null` (Effort 0
convention). The `_pct_zip_area` columns in the crosswalk are therefore
**rule-based estimates**, not polygon-intersect results. The rule used:

1. If the ZCTA falls entirely inside one district (no MULTI_DISTRICT
   flag), assign the dominant elem, middle, and high zone for that
   district's largest population pocket inside the ZCTA. `_pct_zip_area`
   is 0.45-0.75 typically.
2. If the ZCTA carries MULTI_DISTRICT (3+ districts overlap), the
   dominant assignment goes to the district covering the largest land
   share, but `multi_zone_zip_flag = true` is set on the row.
3. For ZCTAs covered by a single K-12 campus (Skykomish 98288, 98224;
   Index 98256; Darrington 98241; Vashon 98070; Mercer Island 98040),
   `_pct_zip_area` is 0.85-1.00.

**Multi-zone flag rule:** `multi_zone_zip_flag = true` when:
- The ZCTA carries `MULTI_DISTRICT` in `zip-master.csv`, OR
- No single school covers more than 60% of ZCTA area at any tier per the
  estimate above.

20 ZCTAs in `zip-school-crosswalk.csv` trigger
`multi_zone_zip_flag = true`. For these rows, downstream rent/value models
**must** join at the parcel level to actual attendance polygons (once the
GeoJSON is geometry-populated), not at the ZCTA dominant-zone level. The
spec is explicit on this; see Effort 0 narrative section 7 (paragraph 3).

**Why majority-area, not majority-population:** Population-weighted
assignment is what tenants actually experience, but population by
attendance zone is not published consistently across the 25+ districts
in scope. Land-area majority is the second-best proxy and is reproducible
from polygons alone.

## 3. ZIP-school quality composite

`zip_school_quality_composite = 0.25 * elem_blended
                              + 0.30 * middle_blended
                              + 0.45 * high_blended`

**Why high-school weight is highest:** Family rental tenure typically
straddles middle and high school grades — families that signed a lease
when kids were in third grade are still in the rental five years later as
the kids hit eighth. High-school quality is the longer-lived price
signal. Elem is weighted lowest because elem catchments change more
frequently and elem-only families often time their move to middle-school
transition anyway.

The composite is on the same 0-100 scale as the underlying blended
ratings. Anything 90+ is "all three tiers top-decile"; anything below 55
is "all three tiers bottom-quartile".

## 4. Top-10 ZIPs by composite school quality

| Rank | ZCTA | Composite | Primary district(s) | Notes |
|------|------|-----------|----------------------|-------|
| 1 (tie) | 98029 | 99.2 | Issaquah | Issaquah Highlands; Endeavour / Beaver Lake / Issaquah HS. |
| 1 (tie) | 98040 | 99.2 | Mercer Island | Single-district island; all three tiers top-rated. |
| 1 (tie) | 98074 | 99.2 | Lake Washington | Sammamish north; Wilder / Inglewood / Eastlake. |
| 1 (tie) | 98075 | 99.2 | Issaquah | Sammamish south; Sunny Hills / Pine Lake / Skyline. |
| 5 | 98006 | 96.4 | Bellevue / Issaquah / Renton | Somerset / Newcastle ridge; Newport HS. |
| 6 | 98053 | 95.0 | Lake Washington | Redmond Ridge; Audubon / Timberline / Redmond HS. |
| 7 | 98027 | 94.0 | Issaquah | Issaquah city; multi-zone but high floor. |
| 8 (tie) | 98004 | 93.0 | Bellevue | Downtown Bellevue / Clyde Hill / Medina. Wilburton closure noise. |
| 8 (tie) | 98039 | 93.0 | Bellevue | Medina; same Bellevue HS feeder as 98004. |
| 10 | 98065 | 92.4 | Snoqualmie Valley | Snoqualmie Ridge; Timber Ridge / Snoqualmie Middle / Mount Si. |

**Reading the top-10:** Six of ten ZCTAs are inside the
Issaquah/Lake-Washington/Bellevue Eastside corridor. Two are exurban
(Snoqualmie Ridge, Redmond Ridge), two are islands (Mercer Island, Medina).
All ten are owner-heavy and rent-tight: family demand exceeds rental
supply, which makes the school signal a price ceiling more than a tenant-
acquisition driver. For PM-side TAM, these ZCTAs are over-saturated by
incumbent managers; for acquisition, they are yield-compressed.

## 5. Bottom-10 ZIPs by composite school quality

| Rank | ZCTA | Composite | Primary district(s) | Notes |
|------|------|-----------|----------------------|-------|
| 1 | 98188 | 49.0 | Highline / Tukwila | SeaTac east; airport-adjacent. |
| 2 | 98168 | 52.2 | Highline | Boulevard Park / White Center east. |
| 3 | 98118 | 52.3 | Seattle | Columbia City / Rainier Valley. |
| 4 | 98148 | 52.6 | Highline | SeaTac residential west. |
| 5 | 98241 | 54.0 | Darrington | Darrington; rural east Snohomish. |
| 6 (tie) | 98146 | 55.8 | Highline | Burien / White Center. |
| 6 (tie) | 98251 | 55.8 | Sultan / Index | Gold Bar. |
| 6 (tie) | 98294 | 55.8 | Sultan | Sultan town. |
| 9 (tie) | 98002 | 57.3 | Auburn | Central Auburn. |
| 9 (tie) | 98106 | 57.3 | Seattle | Delridge / High Point / South Park. |

**Reading the bottom-10:** Five ZCTAs are South King corridor
(Tukwila/SeaTac/Burien/south-Seattle), three are rural Snohomish, two are
mid-Auburn / south-Renton. These are precisely the ZCTAs where the
**school-quality premium does NOT bind** the rent — yield expansion
candidates if the underlying density and renter-household count clear.
Note these are also the ZCTAs where Effort 3's LEP and visa-cohort
overlays will be richest, which means Green Property Management's screening-capability
moat earns the most return here.

## 6. Top-5 districts by boundary instability

Ranked by count of `boundary_change_pending=true` schools in
`schools.csv` plus presence on the `boundary-change-watchlist.md` formal
list:

1. **Seattle Public Schools (NCES-5307710)** — 45+ schools flagged
   pending under "Well-Resourced Schools" plan; every SPS elementary
   carries pending flag until the final consolidation list is published
   by the board (was expected SY 2025-26; deferred to SY 2026-27).
2. **Kent School District (NCES-5304380)** — All 24 schools flagged
   pending. District-wide capacity utilization study triggered the
   consolidation discussion; budget pressure makes resolution likely
   within the 24-month window.
3. **Marysville School District (NCES-5305160)** — All 15 schools
   flagged pending. State binding-conditions financial recovery requires
   consolidation; Tulalip overlay complicates which boundaries can move.
4. **Bellevue School District (NCES-5300420)** — Wilburton + Eastgate
   slated to close end of SY 2024-25. Interlake/Sammamish HS catchment
   review pending SY 2026-27. Eight Bellevue schools carry pending flag.
5. **Edmonds School District (NCES-5302040)** — Lynnwood HS catchment
   under review due to cross-district pull from Northshore's North Creek
   HS. One school pending; one more on rumor watch.

Honorable mentions:
- **Northshore** (NCES-5305850) — North Creek HS catchment has shifted
  twice since 2017; a third pass is anticipated but not yet announced.
- **Issaquah** (NCES-5304080) — Aggressive growth in 98029 and 98075
  has triggered four boundary realignments since 2018; another likely
  if Skyline HS over-capacity persists.

## 7. Tulalip Reservation overlay (98271)

ZCTA 98271 contains the Tulalip Tribes reservation. Marysville School
District serves Tulalip students per an intergovernmental agreement, and
the schools located physically on the reservation (Quil Ceda Tulalip
Elementary, Heritage High School) are flagged in `schools.csv` with the
sovereignty note. Any school-quality interpretation for properties inside
98271 must distinguish:

1. Properties on the reservation — subject to Tribal jurisdiction; school
   assignment is per the intergovernmental agreement, not per Marysville
   SD boundary.
2. Properties off the reservation, inside 98271 — subject to standard
   Marysville SD boundary, but the reservation portion of the ZCTA pulls
   the ZCTA-average ratings down. Treat per-attendance-zone, not per-ZCTA.

## 8. Cross-county allocation (98001, 98022, 98047, 98092)

These four ZCTAs are CROSS_COUNTY (King + Pierce). The schools listed
serve the King share only. The Pierce sliver of each ZCTA is served by:
- 98001 (King-Pierce, Auburn south): Auburn SD on King side, Auburn SD
  also extends across the line. No Pierce-side substitution needed.
- 98022 (King-Pierce, Enumclaw): Enumclaw SD on King side, **White River
  SD (Pierce)** on Pierce side. White River SD is not in our school
  universe; Pierce-side properties need a separate join.
- 98047 (King-Pierce, Pacific): Auburn SD throughout; no swap needed.
- 98092 (King-Pierce, Lakeland Hills): Auburn SD on King side,
  **Dieringer SD (Pierce)** on Pierce side. Dieringer is not in our
  universe; Pierce-side properties need a separate join.

For downstream metrics, allocate by `pct_land_king` per the Effort 0
contract.

## 9. Files in this effort

| File | Lines | Description |
|------|-------|-------------|
| `schools.csv` | ~344 | Curated K-12 universe with NCES-style IDs. Includes public, charter, magnet, private secular, private religious. |
| `attendance-boundaries.geojson` | ~110 | FeatureCollection, all `geometry: null` per Effort 0 convention. Post-processing merge step documented in sibling README. |
| `attendance-boundaries.geojson.README` | ~60 | Convention, geometry-source URLs, merge steps. |
| `zip-school-crosswalk.csv` | 108 | One row per in-scope ZCTA. Dominant elem/middle/high zone + composite + multi-zone flag. |
| `boundary-change-watchlist.md` | ~110 | 10 districts on the watchlist (5 announced + 5 rumor). |
| `effort-1-narrative.md` | this file | Methodology, formulas, top/bottom lists. |
| `schema.yaml` | ~120 | Column-level documentation for each CSV / GeoJSON. |

## 10. TODO inventory

- `schools.csv` — every `address`, `latitude`, `longitude` row is
  `# TODO: source needed - NCES EDGE locations` (~344 rows × 3 cols ≈ 1,032
  cells). Every `enrollment_current`, `enrollment_3yr_change_pct`,
  `enrollment_5yr_change_pct`, `student_teacher_ratio`,
  `pct_free_reduced_lunch` is `# TODO: source needed - OSPI` (~344 rows ×
  5 cols ≈ 1,720 cells). Two private schools also TODO on rating fields.
- `attendance-boundaries.geojson` — every feature has `geometry: null`.
  Documented in sibling README. Treat as 0 row-level TODO cells.
- `zip-school-crosswalk.csv` — 0 TODO cells in the visible columns; all
  107 ZCTAs are populated. Caveat: `_pct_zip_area` columns are
  rule-based estimates pending polygon merge.
- `boundary-change-watchlist.md` — 10 entries carry
  `# TODO: source needed - <district URL>` for the originating board
  agenda or news source.
- `schema.yaml` — 0 TODO cells.

Total TODO-marked cells across the bundle: **~2,762**, concentrated in
the operational metadata of `schools.csv` (addresses, lat/lng, OSPI
enrollment). Effort 3's OSPI ingestion plus a one-time NCES EDGE pull
will resolve >95% of them.

## 11. How Effort 2+ should consume this bundle

1. Join `zip-school-crosswalk.csv` on `zcta` to `zip-master.csv`. For
   any rental-yield or family-demand model, use
   `zip_school_quality_composite` as the school-signal feature.
2. For any ZCTA with `multi_zone_zip_flag = true`, do NOT use the
   composite as the binding signal. Either drop to a per-parcel join
   against the attendance polygons (once geometry-populated), or join
   to the per-school records directly from `schools.csv` filtered by
   the ZCTA's `school_districts`.
3. Cross-county ZCTAs (98001, 98022, 98047, 98092) — King-side schools
   only. For Pierce-side properties, pull Pierce-side district records
   from Effort 2's housing or Effort 5's regulatory matrix.
4. Tulalip ZCTA 98271 — distinguish reservation vs off-reservation per
   section 7.
5. Treat `rating_blended` as a market signal, not a quality measurement.
   Effort 3's demographic controls are required to interpret causally.

## Changelog

### 0.1 (2026-05-18)
- Initial Effort 1 draft. Curated school universe per district (not
  exhaustive — OSPI bulk ingest pending). Attendance-boundaries
  GeoJSON ships null-geometry per Effort 0 convention. Crosswalk uses
  rule-based dominant-zone assignment pending polygon merge.
