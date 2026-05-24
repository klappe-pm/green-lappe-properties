# final-report

Green Property Management — King + Snohomish County market analysis. Generated 2026-05-18.

## 1. Executive summary

Three composite scores across 107 in-scope ZCTAs. Each score is a fixed-weight composite of normalized inputs from Efforts 1-5. Sensitivity analysis (±30% per weight, renormalized) classifies top-20 stability per score.

### Top 10 — PM business sequencing

| Rank | Score | ZCTA | City | County |
|---|---|---|---|---|
| 1 | 78.28 | 98052 | Redmond | King |
| 2 | 71.1 | 98109 | Seattle | King |
| 3 | 67.5 | 98121 | Seattle | King |
| 4 | 67.24 | 98004 | Bellevue | King |
| 5 | 65.23 | 98101 | Seattle | King |
| 6 | 64.39 | 98103 | Seattle | King |
| 7 | 64.15 | 98007 | Bellevue | King |
| 8 | 62.26 | 98115 | Seattle | King |
| 9 | 61.34 | 98105 | Seattle | King |
| 10 | 59.24 | 98122 | Seattle | King |

### Top 10 — Rental acquisition

| Rank | Score | ZCTA | City | County |
|---|---|---|---|---|
| 1 | 72.8 | 98074 | Sammamish | King |
| 2 | 72.1 | 98075 | Sammamish | King |
| 3 | 68.96 | 98155 | Shoreline | King |
| 4 | 68.49 | 98029 | Issaquah | King |
| 5 | 68.26 | 98275 | Mukilteo | Snohomish |
| 6 | 68.15 | 98059 | Renton | King |
| 7 | 67.77 | 98038 | Maple Valley | King |
| 8 | 67.48 | 98053 | Redmond | King |
| 9 | 66.94 | 98006 | Bellevue | King |
| 10 | 66.75 | 98012 | Bothell | Snohomish |

### Top 10 — Daycare conversion

| Rank | Score | ZCTA | City | County |
|---|---|---|---|---|
| 1 | 63.26 | 98117 | Seattle | King |
| 2 | 60.64 | 98074 | Sammamish | King |
| 3 | 59.09 | 98116 | Seattle | King |
| 4 | 58.72 | 98012 | Bothell | Snohomish |
| 5 | 58.03 | 98126 | Seattle | King |
| 6 | 57.64 | 98075 | Sammamish | King |
| 7 | 57.59 | 98107 | Seattle | King |
| 8 | 56.85 | 98103 | Seattle | King |
| 9 | 56.8 | 98115 | Seattle | King |
| 10 | 56.42 | 98118 | Seattle | King |

### Headline findings

- **PM** sequencing leads in **98052 Redmond**, **98109 Seattle (SLU)**, **98121 Seattle (Belltown)**, **98004 Bellevue**, and **98101 Seattle (Downtown)**. Density, visa-renter concentration, and regulatory complexity (compliance moat) drive ranks.
- **Rental** acquisition leads in **98074/98075 Sammamish** and **98155 Shoreline**, **98029 Issaquah**, **98275 Mukilteo**. School composite (28% weight) is dispositive; Eastside + close-in Snohomish suburbs dominate.
- **Daycare** conversion leads in family-dense Seattle (98117/98116/98103) and Eastside suburbs (98074/98075). Slot gap + under-5 density + zoning permissiveness combine.
- **Dual-use** shortlist: **7 ZCTAs** rank top-25 on BOTH rental and daycare. Sammamish (98074, 98075), Bothell (98012, 98021), Issaquah (98029) are the strongest dual-use parcels.
- **Hypothesis tally:** 10 validated, 2 partially-validated, 2 refuted, 3 inconclusive.

## 2. Geographic foundation summary

Effort 0 catalogued 113 ZCTAs across King + Snohomish; 107 are in-scope-primary. Six are excluded (PO-only or out-of-scope tribal/military). Cross-county allocations for 98001/22/47/92 (King-Pierce); LARGE_UNINC flag on 12+ ZCTAs routes regulatory join to County Code; Tulalip (98271) flagged for sovereignty-uncertain regulatory regime. Jurisdiction-crosswalk.csv (60 jurisdictions) is the canonical regulatory key.

## 3. Schools and attendance boundaries summary

Effort 1 produced a multi-zone-aware composite (`zip_school_quality_composite`) blending elementary, middle, high ratings weighted by attendance-zone area share. ~20 ZIPs are multi-zone; for those, the composite is used directly rather than ZIP-averaging. Boundary changes for 2025-26 watch-listed in `boundary-change-watchlist.md` (Lake Washington and Issaquah re-zonings).

## 4. Housing and rental market summary

Effort 2 reconciled small-portfolio renter-HH stock to GL TAM (King 228K, Snohomish 74K — calibration factor 1.287 applied) using a u14%×0.68 + u519%×0.18 share model. ADU/DADU permits show Seattle 2× growth and unincorporated King ~3× growth 2019-2024 (H5). Rate-locked owner share averages ~55% across 107 ZCTAs (FHFA NMDB 2024 + Redfin Lock-In Q4-2024). Asking-vs-effective rent gap flagged in concession-heavy submarkets.

## 5. Demographics, language, and immigration summary

Effort 3 published `demographics-zip.csv` (107 ZCTAs, ACS5 2019-2023), `language-clusters.csv`, `visa-cohorts.csv` (USCIS H-1B Hub + SEVP/IIE F-1 + DOS L-1 allocated by bachelor's × renter weight), `refugee-placements.csv`, and `zip-master-population-fill.csv` (OFM intercensal city-ratio to fill Effort 0 TODOs). Top language clusters: Spanish concentrated in South King; Russian/Polish/Slavic in S Snohomish; Mandarin/Korean on Eastside; Tagalog distributed. Commute matrix to six employer hubs (Seattle CBD, SLU, Bellevue CBD, Redmond MSFT, Everett Boeing, Renton Boeing) per-ZCTA.

## 6. Employers, workforce, and tech cohorts summary

Effort 4 catalogued top-20 employers, tech-employer site-level detail, LCA approvals by ZCTA FY23/FY24, WARN notices, 7-tier compensation matrix, and a 5-cohort tech-workforce model. Layoff-cycle response: Class A vacancy in Bellevue/SLU rose ~430bps Q1-Q3 2023 with 60-120 day lag from layoff announcement; South King/Sno B/C vacancy moved <50bps (H10 validated). Microsoft + Amazon represent the majority of LCA approvals in tech-heavy ZCTAs (H9 directional support).

## 7. Childcare supply and regulatory matrix summary

Effort 5 produced `childcare-facilities.csv` (DCYF list), `childcare-gap-zip.csv` (children_per_100_slots), `daycare-zoning-matrix.csv` (62 jurisdictions, in-home status + commercial zones + parking), `rental-regulatory-matrix.csv` (62 jurisdictions, JCE/SOI/FCH/landlord-licensing/inspection/first-in-time/STR), `pending-ordinances.md`, and `exogenous-risks.md`. RCW 35.63.185 preempts city restriction on family child care in residential zones — by-right baseline statewide; HOA CC&Rs (parcel-level) remain the binding daycare-conversion constraint (H17).

## 8. Exogenous risks summary

Per Effort 5 `exogenous-risks.md` — top exogenous risks (paraphrased): HB 1217 statewide rent-cap (7%+CPI, max 10%); USCIS H-1B policy changes; Boeing 737-MAX cycle for Snohomish aerospace exposure; King County FAA NextGen flight-path noise litigation in 98168/98188; Microsoft/Amazon RTO compliance enforcement timeline; ECE workforce shortage compressing daycare margins.

## 9. PM business sequencing score and top-10 sub-markets

**Weights (sum 1.00):** renter-HH in small-portfolio 0.22 • accidental-landlord supply 0.16 • LEP × renter × tech 0.14 • visa-renter density 0.12 • regulatory complexity 0.10 • tech-cohort exposure 0.10 (capped at 0.35 with diversification penalty) • commute-shed access 0.10 • population growth 0.06.

**Top 10:** 98052, 98109, 98121, 98004, 98101, 98103, 98007, 98115, 98105, 98122.

Deep-dive profiles per ZCTA in `top-10-pm-sub-markets.md`.

## 10. Rental acquisition score and top-10 ZIPs

**Weights (sum 1.00):** school composite 0.28 • rent-to-price 0.20 • 36-mo rent growth 0.12 • DOM+vacancy inverse 0.10 • tenant stability 0.12 • regulatory friendliness 0.10 • commute to hub 0.08.

**Top 10:** 98074, 98075, 98155, 98029, 98275, 98059, 98038, 98053, 98006, 98012.

Deep-dive profiles per ZIP in `top-10-rental-acquisition-zips.md`.

## 11. Daycare conversion score and top-10 ZIPs

**Weights (sum 1.00):** under-5 density 0.20 • slot gap 0.22 • zoning permissiveness 0.20 • HH income 0.12 • hi-income employer proximity 0.10 • facility opens-minus-closes 3yr 0.08 • school quality reinforcement 0.08.

**Top 10:** 98117, 98074, 98116, 98012, 98126, 98075, 98107, 98103, 98115, 98118.

Deep-dive profiles per ZIP in `top-10-daycare-conversion-zips.md`.

## 12. Dual-use shortlist and use-case lead per parcel

7 ZCTAs are top-25 on both rental and daycare. See `dual-use-shortlist.md` for the full table with use-case-lead recommendation per ZIP. Sammamish (98074, 98075), Bothell (98012, 98021), and Issaquah (98029) carry both signals strongest.

## 13. Sensitivity analysis

Each weight perturbed ±30% independently (renormalized to sum 1.00). Top-20 stability per score:

| Score | Robust (Δrank≤3) | Moderate (≤8) | Fragile (>8) |
|---|---|---|---|
| PM | 18 | 2 | 0 |
| Rental | 10 | 9 | 1 |
| Daycare | 6 | 10 | 4 |

Full detail in `sensitivity-analysis.md`. Robust picks are safe to act on at current scoring; fragile picks should be confirmed by alternative weighting or parcel-level field validation before underwriting.

## 14. Data sources, vintage, and caveats

### Source inventory
- Census ACS 5-yr 2019-2023 (Effort 3 primary).
- WA OFM intercensal 2024 (population fill).
- Zillow ZHVI/ZORI Q3-2025 (Effort 2; re-anchor break pre-2024).
- HUD SAFMR FY2025 (Effort 2 primary rent floor).
- USCIS H-1B Data Hub FY2024, SEVP/IIE 2024, DOS L-1 FY2024 (Effort 3 visa).
- USDOL OFLC LCA disclosures FY23/FY24 (Effort 4).
- NCES CCD 2023-24 + WA OSPI School Report Card (Effort 1).
- WA DCYF licensed facility list (Effort 5).
- City/County code citations per `effort-5/daycare-zoning-matrix.csv` + `rental-regulatory-matrix.csv`.

### Caveats
- **MOE flags.** Effort 3 surfaced ACS MOE on several ZCTAs (column `moe_flags`); rankings dependent on those columns are footnoted in deep-dive markdown.
- **Modeled values.** Small-portfolio renter-HH (Effort 2), tech-relocation proxy (Effort 6), visa allocation (Effort 3), tech-cohort share (Effort 6) are MODELED. Reconciliation notes are in each upstream CSV.
- **Multi-zone ZIPs.** ~20 ZCTAs are multi-attendance-zone; school composite uses attendance-zone area share, not ZIP average.
- **LARGE_UNINC.** 12+ ZCTAs route to County Code rather than city code; jurisdiction-crosswalk applied.
- **Tulalip (98271).** Sovereignty: state landlord-tenant code applicability uncertain on tribal land. Flag-and-footnote in any acquisition or daycare conversion underwriting.
- **Cross-county.** 98001/22/47/92 partially extend into Pierce; TAM treated as King-only.
- **Tech-cohort cap.** Per spec, tech share > 0.35 triggers a diversification penalty (penalty = min(0.5, (share - 0.35) × 2.0)) applied to the normalized component before weighting.
- **Population fill.** Effort 3 zip-master-population-fill.csv merged into zip-master for 2014 baseline + CAGR (was TODO in Effort 0).
- **Pierce allocation.** Cross-county Pierce sliver for 98001/22/47/92 not separately modeled; treat ranks as King-share approximations.
- **Heatmap geometry.** `heatmaps.geojson` mirrors Effort 0's null-geometry convention; render-time merge with TIGER ZCTA polygons (see sibling README).
- **Dual-use score** is a *shortlist filter*, not a primary ranking. Do not use to override single-purpose rankings.

### Reproducibility

- `_scripts/build_scores.py` — joins all upstream CSVs and computes the three composite scores. Deterministic.
- `_scripts/build_deliverables.py` — produces all markdown deliverables, sensitivity table, hypothesis resolution, GeoJSON.
- `_scripts/inspect.py` — top-N rank inspector (sanity check).
- All scripts re-runnable; no external network calls.
