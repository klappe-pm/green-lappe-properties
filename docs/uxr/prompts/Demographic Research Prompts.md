---
domain: green-lappe-properties
category: market-research
sub-category: demographics
doc-type: plan
date-created: 2026-05-18
date-revised: 2026-05-18
version: 0.1
doc-status: draft
llm-provider: Claude
llm-model: Opus 4.7
llm-session:
  - https://claude.ai/chat/7ea22a08-0bf8-4b11-bd38-9a383763be23
llm-session-data:
aliases: []
tags: []
---
# Demographic Research Prompts

A sequenced set of seven prompts that execute the [[Demographic Research Plan]]. 
Each prompt is self-contained:
- LLM running Effort 3 does not need the text of Effort 2 to do its job. 
- Prompts are written for a research-capable LLM (web search, file system, table generation). 
- Hand them off in order. 
- Effort 0 must finish before Efforts 1 through 5 begin. 
- Efforts 1 through 5 can run in parallel. 
- Effort 6 runs last.
- Prompt responses and reports are written to this folder: /Users/kevinlappe/Projects/green-lappe-properties/docs/uxr/reports

## How To Use

1. Run Prompt 0. Save the output as `effort-0-geographic-foundation.md` and the ZIP master CSV/GeoJSON to `data/effort-0/`.
2. Run Prompts 1 through 5 in parallel, each in its own LLM session. Pass the Effort 0 ZIP master list to each as input.
3. Run Prompt 6 after Efforts 1 through 5 complete. Pass all five output bundles as input.
4. Each prompt ends with a deliverables checklist. Do not accept the LLM's output as done until every item is present.

## Cross-Effort Conventions

Every prompt must obey these rules.

- **Geography**: King County and Snohomish County, Washington only. Edge ZIPs (under 10% land area in scope) are flagged but excluded from primary analysis.
- **ZIP terminology**: ZCTA where the analysis is Census-based; postal ZIP where the analysis is listings-based. Use the Effort 0 crosswalk to translate.
- **Dates**: cite vintage on every datum. ACS 5-year defaults to 2019-2023 unless newer is available. ACS 1-year 2024 is preferred at county and place level when MOE is acceptable.
- **Margins of error**: report MOE for every ZIP-level Census estimate. Aggregate to place level when MOE exceeds 20% of the estimate. Flag the aggregation.
- **Uncertainty**: every modeled value is labeled MODELED with the assumption set inline. Every triangulated estimate is labeled TRIANGULATED with the sources combined.
- **Sources**: public and triangulated public-proxy only. No paywalled data unless a free proxy is genuinely unavailable, in which case flag and footnote.
- **File outputs**: CSV with a documented schema, plus a Markdown narrative. GeoJSON for any deliverable with a spatial component. Schemas live in a `schema.yaml` per effort.
- **Naming**: lowercase kebab-case filenames. Match output filenames to the deliverables checklist exactly.
- **Do not fabricate**: if a value cannot be sourced, mark `# TODO: source needed` and continue. Do not invent ZIPs, employer names, school IDs, license numbers, or statute citations.

---

## Prompt 0: Geographic Foundation

```
ROLE
You are a senior GIS analyst preparing the geographic foundation for a King County and Snohomish County, Washington property management and real estate acquisition analysis. Every downstream dataset will join to your output, so cleanliness is the only thing that matters.

GOAL
Produce the canonical ZIP universe for King and Snohomish Counties with full crosswalks to cities, school districts, county jurisdictions, and urban/suburban/rural classifications. Flag every geographic anomaly that could cause silent join errors downstream.

SCOPE
- Geography: King County and Snohomish County, Washington
- Unit: ZCTA (primary) with postal ZIP crosswalk
- Inclusion: any ZCTA with at least 10% land area in either county
- Anomalies to flag: cross-county ZIPs, recently annexed areas, large unincorporated portions, ZIPs spanning multiple school districts

QUESTIONS TO ANSWER
1. Which ZIPs (ZCTAs) are in scope?
2. Which cities (incorporated and CDP), school districts, and county jurisdictions does each ZIP intersect?
3. How is each ZIP classified: urban core, urban, suburban, exurban, rural?
4. What is the current population per ZIP and the 2014-2024 trend?
5. Which ZIPs have anomalies?

DATA SOURCES
- US Census TIGER/Line ZCTA boundary files (2020 release minimum, 2024 if available)
- US Census ACS 5-year 2019-2023 (B01003 population)
- WA OSPI district boundary files
- King County and Snohomish County GIS portals for city boundaries and unincorporated areas
- WA OFM annual population estimates by city and county
- HUD USPS ZIP-to-ZCTA crosswalk

DELIVERABLES (every item required)
1. `zip-master.csv` with columns:
   - `zcta` (5-digit string)
   - `postal_zips` (semicolon-separated list of postal ZIPs that route into this ZCTA)
   - `county_primary` (King | Snohomish)
   - `county_secondary` (blank or the other county for cross-county ZCTAs)
   - `pct_land_king` (0.00 to 1.00)
   - `pct_land_snohomish` (0.00 to 1.00)
   - `cities` (semicolon-separated list of all intersecting cities or CDPs)
   - `city_primary` (the city with the largest land share)
   - `school_districts` (semicolon-separated)
   - `unincorporated_share` (0.00 to 1.00)
   - `classification` (urban-core | urban | suburban | exurban | rural)
   - `population_2014` (integer, ACS or OFM)
   - `population_2024` (integer)
   - `population_cagr_10yr` (percent)
   - `anomaly_flags` (semicolon-separated codes; see anomaly list)
   - `in_scope_primary` (true/false: at least 10% land area in target counties)
   - `notes` (free text)
2. `zip-boundaries.geojson` with one feature per in-scope ZCTA, properties matching `zip-master.csv` columns
3. `district-boundaries.geojson` for every school district intersecting the two counties
4. `jurisdiction-crosswalk.csv` mapping every city and unincorporated area to its rental-regulatory authority (Seattle SMC, Bellevue Municipal Code, unincorporated King County Code, etc.)
5. `effort-0-narrative.md` documenting:
   - The classification methodology (what makes a ZIP urban core vs. urban vs. suburban)
   - The full list of anomalies with explanation
   - Edge ZIPs excluded with reason
   - Known boundary changes 2014-2024
   - Data source vintage for every column

QUALITY BAR
- Every in-scope ZCTA appears in all four files.
- Cross-county ZIPs are explicit: `pct_land_king + pct_land_snohomish` should equal 1.00 to within rounding for in-scope rows.
- Anomaly flags use a documented code list (e.g., `CROSS_COUNTY`, `LARGE_UNINC`, `RECENT_ANNEX_2020+`, `MULTI_DISTRICT`).
- No ZCTA is in the file without a citation for its in-scope status.

DO NOT
- Invent ZCTA codes. Verify against Census TIGER 2020 or later.
- Use postal ZIPs as a primary key. ZCTA is the primary key; postal ZIP is a crosswalk.
- Default to "urban" for everything. The classification matters downstream.
```

---

## Prompt 1: Schools and Attendance Boundaries

```
ROLE
You are an education-data analyst building the K-12 layer of a King and Snohomish County real estate analysis. School quality and attendance geography drive single-family rental demand and family-formation patterns.

INPUT
- The ZIP master from Effort 0: `zip-master.csv` and `zip-boundaries.geojson`

GOAL
Produce a complete picture of K-12 school quality, capacity trends, and attendance geography for King and Snohomish Counties, joined to the Effort 0 ZIP universe.

SCOPE
- All public schools (district, charter, magnet), grades K-12
- All private schools (secular and religious), grades K-12
- Attendance boundaries for public schools only
- 3 to 5 year enrollment trends
- Recent boundary changes (last 5 years) and announced future changes
- Districts in scope: every district intersecting the Effort 0 ZIP universe

QUESTIONS TO ANSWER
1. Where are the highest-rated elementary, middle, and high schools concentrated, by ZIP and by attendance zone?
2. Which ZIPs sit inside attendance zones for top-rated schools at all three tiers simultaneously?
3. Where is enrollment growing and where is it shrinking?
4. Which districts have redrawn boundaries recently, and which are signaling future changes?
5. How does private school density vary by ZIP, and where do families exit public schools at higher rates?

DATA SOURCES
- WA OSPI Washington State Report Card (enrollment, demographics, performance)
- GreatSchools and Niche ratings (cross-check both; report the blend)
- District GIS portals: Seattle SPS, Lake Washington, Bellevue, Northshore, Issaquah, Renton, Kent, Federal Way, Highline, Tukwila, Auburn, Mercer Island, Shoreline, Edmonds, Mukilteo, Everett, Marysville, Lakewood, Snohomish, Monroe, Stanwood-Camano, Granite Falls, Lake Stevens, Sultan, Index, Darrington
- NCES Private School Universe Survey
- WA OSPI private school directory

DELIVERABLES
1. `schools.csv` with columns:
   - `school_id` (NCES ID for public, OSPI ID for private if no NCES)
   - `school_name`
   - `school_type` (public | charter | magnet | private_secular | private_religious)
   - `grade_levels` (elem | middle | high | k8 | k12 | other)
   - `district_id`
   - `district_name`
   - `address`, `city`, `state`, `zip`
   - `latitude`, `longitude`
   - `enrollment_current`
   - `enrollment_3yr_change_pct`
   - `enrollment_5yr_change_pct`
   - `rating_greatschools` (1-10)
   - `rating_niche` (A+ to F)
   - `rating_blended` (your computed 0-100; document the formula)
   - `student_teacher_ratio`
   - `pct_free_reduced_lunch`
   - `last_boundary_change_year` (public schools only)
   - `boundary_change_pending` (true/false, document the source)
   - `notes`
2. `attendance-boundaries.geojson` with one feature per public-school attendance zone (separate features for elem, middle, high), properties include `school_id`, `school_name`, `grade_levels`, `rating_blended`, `district_id`
3. `zip-school-crosswalk.csv` for every in-scope ZCTA, the dominant attendance zones for elem/middle/high (use majority-area assignment) with columns:
   - `zcta`
   - `elem_school_id`, `elem_rating_blended`, `elem_pct_zip_area`
   - `middle_school_id`, `middle_rating_blended`, `middle_pct_zip_area`
   - `high_school_id`, `high_rating_blended`, `high_pct_zip_area`
   - `zip_school_quality_composite` (your blend; document)
   - `multi_zone_zip_flag` (true if no single school covers more than 60% of ZIP area at any tier)
4. `boundary-change-watchlist.md` listing every district with announced or rumored boundary changes in the next 24 months
5. `effort-1-narrative.md` with:
   - The blended-rating formula
   - The majority-area assignment method
   - Top-10 ZIPs by composite school quality
   - Bottom-10 ZIPs by composite school quality
   - The 5 districts with the most boundary instability

QUALITY BAR
- Every in-scope ZCTA from Effort 0 appears in `zip-school-crosswalk.csv`.
- Every public school has an assigned attendance zone polygon.
- Private school ratings are blank if no rating source covers them; do not invent.
- Boundary changes cite the district document or news source.

DO NOT
- Use ZIP as a substitute for attendance boundary. Two houses on one block can be in different zones.
- Treat GreatSchools rating as ground truth. It correlates with test scores and demographics; the blend mitigates this.
- Skip private schools. Private school density is a public-school-exit signal.
```

---

## Prompt 2: Housing and Rental Market

```
ROLE
You are a real estate market analyst building the housing and rental layer of a King and Snohomish County dual-use (PM + acquisition) analysis. Your output drives both rental yield underwriting and small-portfolio TAM calculation.

INPUT
- The ZIP master from Effort 0: `zip-master.csv` and `zip-boundaries.geojson`

GOAL
Quantify per-ZIP housing values, rent levels by bedroom, yields, velocity, supply dynamics, small-portfolio building stock, ADU/DADU permit velocity, and accidental-landlord supply indicators.

SCOPE
- Property types: single-family detached, condo, townhouse, 2-4 unit small multifamily, ADU/DADU
- Exclude: new-construction luxury condos under 5 years old, 50+ unit institutional multifamily without small-owner LLC structure
- Time windows: 12 and 36 month trends

QUESTIONS TO ANSWER
1. What is the median home value and median rent (by bedroom count) per ZIP?
2. Where are rents growing faster than home values?
3. Where is the opposite happening (yield compression)?
4. What is the rent-to-price ratio per ZIP, and which ZIPs clear 0.7% monthly?
5. Where is vacancy elevated, and where is rental absorption fastest?
6. What is the owner-renter mix, single-family share, and new construction pipeline by ZIP?
7. What share of renter households live in 1-4 unit and 5-20 unit buildings per ZIP?
8. What is the ADU/DADU permit growth rate post-HB 1337 (2023) and Seattle's 2019 ADU expansion, by jurisdiction?
9. What is the rate-locked owner share (sub-4% mortgages) by ZIP, as a proxy for accidental-landlord supply?
10. What is the concession-flag rate and days-on-market by ZIP and submarket?

DATA SOURCES
- Zillow ZHVI (home values), Zillow ZORI (rents) at ZIP where available
- HUD Small Area FMR (rent by bedroom by ZIP, 40th percentile)
- Redfin Data Center (median sale price, days on market, sale-to-list ratio)
- Apartment List rent reports
- ACS 5-year 2019-2023: B25032 (units in structure), B25003 (tenure), B25041 (bedrooms), B25064 (median gross rent), B25127 (year built and structure)
- Seattle DCI ADU/DADU permit dashboard
- King County DLS permit data
- Snohomish County PDS permit data
- Individual city permit portals (Bellevue, Redmond, Kirkland, Bothell, Lynnwood, Edmonds, Everett, etc.)
- FHFA NMDB and Redfin Lock-In Effect reports for rate-lock estimation
- King County and Snohomish County Assessor parcel data for institutional ownership exclusion

DELIVERABLES
1. `housing-zip.csv` with columns per in-scope ZCTA:
   - `zcta`
   - `median_home_value_2025`
   - `median_home_value_3yr_change_pct`
   - `median_rent_1br`, `median_rent_2br`, `median_rent_3br`, `median_rent_4br` (source: HUD SAFMR primary, ZORI secondary)
   - `rent_growth_12mo_pct`
   - `rent_growth_36mo_pct`
   - `rent_to_price_ratio_monthly_pct`
   - `vacancy_rate`
   - `days_on_market_rental`
   - `days_on_market_sale`
   - `concession_flag_rate_pct`
   - `owner_occupied_pct`
   - `renter_occupied_pct`
   - `single_family_pct`
   - `units_1to4_pct` (share of all housing in 1-4 unit structures)
   - `units_5to19_pct`
   - `units_20plus_pct`
   - `renter_hh_in_small_portfolio_est` (modeled: renter HH × share in 1-4 + share of 5-19 owned by small landlords)
   - `new_construction_pipeline_units_18mo`
   - `adu_permits_2019_2024_cumulative`
   - `adu_permits_2024_annual`
   - `rate_locked_owner_pct_est` (modeled, document method)
   - `mom_avg_rent_growth_yoy_pct`
   - `data_source_notes`
2. `permits-adu-dadu.csv` with one row per permit issuance year per jurisdiction:
   - `jurisdiction`, `year`, `permits_issued`, `units_completed_est`
3. `small-portfolio-stock-modeled.csv` per ZCTA:
   - `zcta`
   - `total_rental_units_est`
   - `small_owner_units_est` (apply RHFS small-owner share, adjusted for local institutional exclusion)
   - `pct_self_managed_est` (default 78%, document deviations)
   - `pct_professionally_managed_est`
   - `avg_blended_monthly_rent`
   - `annual_rent_roll_est_dollars`
4. `effort-2-narrative.md` with:
   - Top-10 ZIPs by rent-to-price ratio
   - Top-10 ZIPs by 36-month rent growth
   - Top-10 ZIPs by small-portfolio unit count
   - Top-10 ZIPs by ADU/DADU permit velocity
   - Supply-risk ZIPs (highest new construction pipeline as % of stock)
   - Yield-compression ZIPs (home values growing faster than rents by >2pp annually)
   - Methodology for every modeled column

QUALITY BAR
- Every in-scope ZCTA appears in `housing-zip.csv`.
- Modeled columns are flagged as MODELED with the assumption.
- Bedroom-level rent comes from HUD SAFMR with ZORI as a sanity check; flag any ZIP with a >25% gap between the two.
- The small-owner share calculation reconciles to the King County and Snohomish County totals from the Green Lappe TAM dataset (228K small-owner King + 74K Snohomish, 2025 baseline).

DO NOT
- Use listing-source asking rents without flagging the 5-15% asking-vs-effective gap.
- Treat ZORI methodology as comparable preand post-2024 without flagging.
- Apply national RHFS small-owner share without local institutional-exclusion adjustment.
```

---

## Prompt 3: Demographics, Language, and Immigration

```
ROLE
You are a demographic analyst building the population, language access, and immigration cohort layer for a King and Snohomish County property management TAM analysis. Your output drives sub-market sequencing, language-access investment, and tenant-screening service design.

INPUT
- The ZIP master from Effort 0: `zip-master.csv` and `zip-boundaries.geojson`

GOAL
Profile household composition, language access, country-of-origin demographics, and immigration-tied tenant cohorts at ZIP granularity. Identify LEP and visa-cohort clusters that incumbent PM screening systematically fails. Compute commute-time from each ZIP centroid to six employment hubs.

SCOPE
- Census ACS 5-year 2019-2023 at ZCTA level, supplemented with ACS 1-year 2024 at county and place level
- Foreign-born and language-spoken-at-home detail to specific languages, not aggregate groupings
- H-1B, L-1, OPT, F-1 employer and worksite data
- Refugee and asylum arrival data
- Commute-time to: Seattle CBD (Downtown), South Lake Union, Bellevue CBD, Redmond (Microsoft main campus), Everett (Boeing Plant 2), Renton (Boeing Renton)

QUESTIONS TO ANSWER
1. How many renter households exist in each in-scope ZCTA, and what share of total households?
2. What is the 10-year population growth rate (2014-2024) by sub-market, and what does OFM project through 2035?
3. What is the median household income and rent burden (>30%, >50%) by sub-market?
4. Where are households with children under 5 concentrated, and what is the density per square mile?
5. Where are dual-income high-earner households concentrated?
6. What is the educational attainment profile by ZIP?
7. What is the foreign-born share by county, city, and ZIP?
8. What are the top 10 non-English languages spoken at home by county and city, with speaker counts?
9. Where does Limited English Proficiency (LEP) concentrate at the ZIP level?
10. Which specific language communities cluster in which sub-markets, and how have those clusters shifted 2014-2024?
11. How many H-1B, L-1, OPT, F-1 visa holders are in King and Snohomish, by employer and year?
12. How many refugees and asylum seekers have been resettled in each county since 2020, by origin country and primary resettlement agency?
13. How does Seattle First-in-Time tenant selection (SMC 14.08.050) prevent informal screening accommodation, and how does this vary across King jurisdictions and the Snohomish county line?
14. How has racial and ethnic composition changed 2010, 2020, 2024 by sub-market?
15. What is the magnitude of the Eastside Asian shift in Bellevue, Redmond, Sammamish, Newcastle?
16. What is the magnitude of Black population out-migration from Seattle Central District to South King and South Snohomish?
17. What is the commute-shed of each major employer hub, and which ZIPs sit inside premium commute zones?

DATA SOURCES
- US Census 2010, 2020 Decennial
- US Census ACS 5-year 2019-2023, ACS 1-year 2024 (county and place)
- ACS tables: S0101 (age/sex), B03002 (race/ethnicity), B25003 (tenure), S1901 (income), B25070 (rent burden), B19001 (income distribution), B25118/B25119 (renter vs owner income), B16001 (language detail), C16002 (household language), B16005 (LEP by language), B05002/B05006 (foreign-born)
- WA OFM Forecast of the State Population
- USCIS H-1B Employer Data Hub
- DOL OFLC LCA Disclosure Data
- SEVP SEVIS by the Numbers
- IIE Open Doors
- WA DSHS Office of Refugee and Immigrant Assistance (ORIA)
- State Dept Refugee Processing Center
- IRC Seattle, World Relief Western Washington, JFS Seattle, LCS NW resettlement placement data
- Seattle SMC 14.08.050 and rule history
- OpenStreetMap routing (OSRM) or Google Distance Matrix for commute-time

DELIVERABLES
1. `demographics-zip.csv` per in-scope ZCTA:
   - `zcta`
   - `population_2024`
   - `households_total`
   - `renter_households`
   - `renter_hh_share_pct`
   - `population_cagr_10yr_pct`
   - `population_projection_2035` (OFM, allocated)
   - `median_hh_income`
   - `median_renter_hh_income`
   - `pct_cost_burdened_30plus`
   - `pct_severely_cost_burdened_50plus`
   - `pct_under_5`
   - `under_5_density_per_sqmi`
   - `pct_dual_income_hh`
   - `pct_bachelors_or_higher`
   - `foreign_born_pct`
   - `lep_pct`
   - `top_language_1_name`, `top_language_1_speakers`
   - `top_language_2_name`, `top_language_2_speakers`
   - `top_language_3_name`, `top_language_3_speakers`
   - `top_language_4_name`, `top_language_4_speakers`
   - `top_language_5_name`, `top_language_5_speakers`
   - `pct_asian`, `pct_black`, `pct_hispanic`, `pct_white_nh`, `pct_other`
   - `pct_asian_2014`, `pct_black_2014`, `pct_hispanic_2014`, `pct_white_nh_2014` (for trend)
   - `commute_min_seattle_cbd`
   - `commute_min_slu`
   - `commute_min_bellevue_cbd`
   - `commute_min_redmond_msft`
   - `commute_min_everett_boeing`
   - `commute_min_renton_boeing`
   - `moe_flags` (semicolon-separated list of columns with MOE > 20%)
2. `language-clusters.csv` listing each language community by sub-market:
   - `language`
   - `top_5_zctas` (semicolon-separated)
   - `total_speakers_two_county`
   - `lep_share_pct`
   - `growth_2014_2024_pct`
   - `dominant_resettlement_agency` (where applicable)
3. `visa-cohorts.csv` per ZCTA:
   - `zcta`
   - `h1b_workers_est`
   - `opt_students_est`
   - `f1_students_est`
   - `total_visa_renter_est`
   - `data_method` (TRIANGULATED with sources)
4. `refugee-placements.csv` by county and origin country:
   - `county`
   - `origin_country`
   - `fy2020`, `fy2021`, `fy2022`, `fy2023`, `fy2024`
   - `primary_resettlement_agency`
   - `language_primary`
5. `effort-3-narrative.md` with:
   - Top-10 ZIPs by renter-household count
   - Top-10 ZIPs by LEP density × renter density × tech-employer concentration
   - Top-5 language communities by speaker count and clustering tightness
   - The Eastside Asian shift analysis with magnitude
   - The Central District displacement analysis with destination ZIPs
   - First-in-Time policy impact summary
   - Methodology for every modeled column

QUALITY BAR
- Every in-scope ZCTA appears in `demographics-zip.csv`.
- MOE flags are honest. Any ZCTA with >20% MOE on a column has the flag set.
- Top-language columns name the specific language (Telugu, not "Other Indian"). Group only when ACS does not separate.
- Visa-cohort estimates are TRIANGULATED with sources documented.
- Commute times are off-peak or labeled (default: weekday 8 AM departure).

DO NOT
- Aggregate "Asian" or "Hispanic" without the underlying language and origin detail.
- Report visa-cohort approvals as resident counts without flagging the stock-vs-flow distinction.
- Skip the Snohomish refugee placements. Russian/Ukrainian community is a major Snohomish cluster.
- Treat 2010 Decennial geographies as identical to 2020. Cross-decade comparisons need ZCTA normalization.
```

---

## Prompt 4: Employers, Workforce, and Tech Cohorts

```
ROLE
You are a workforce analyst building the employer and tech-cohort layer for a King and Snohomish County property management TAM analysis. Your output drives demand forecasting, layoff-cycle exposure analysis, and screening-tolerance calibration.

INPUT
- The ZIP master from Effort 0: `zip-master.csv` and `zip-boundaries.geojson`

GOAL
Identify the employer-driven engines of rental demand, quantify tech-cohort renter behavior through hiring and layoff cycles, and define the early-warning indicators Green Lappe must monitor.

SCOPE
- Top 20 employers by headcount in the two counties
- Named tech employers: Microsoft, Amazon, Meta, Google, Apple, T-Mobile, Salesforce, Nvidia, Oracle, F5, Expedia, Zillow, Redfin, DocuSign, Smartsheet, SAP Concur, Adobe, Stripe, OpenAI Seattle, Anthropic, Snowflake, Databricks, ServiceNow, Cisco
- Boeing in Snohomish (Everett, Mukilteo) and South King (Renton, Tukwila, Auburn)
- Non-tech anchors: UW, Fred Hutch, Seattle Children's, Virginia Mason, Providence, MultiCare, Swedish, Premera, Kaiser, Costco HQ, Starbucks HQ, Nordstrom HQ, Weyerhaeuser, PACCAR, Alaska Airlines, Port of Seattle, public sector
- Six tenant cohorts: A (new-hire tech, 0-2 yr), B (mid-tenure, 3-7 yr), C (senior, 8+ yr), D (H-1B/OPT visa-tied), E (laid-off), F (tech-adjacent contractor/gig)
- 2022-2023 tech-layoff cycle as the natural experiment for cohort elasticity

QUESTIONS TO ANSWER
18. Who are the 20 largest employers with current headcount, YoY change, and primary worksite ZIPs?
19. For each named tech employer, regional headcount, 2019-2025 hiring trajectory, layoff history?
20. H-1B and LCA volume by employer and worksite ZIP, FY2019-FY2024?
21. Boeing regional headcount trajectory including 2024 IAM 751 strike and production rate outlook?
22. Amazon Seattle/Bellevue physical-presence trajectory including RTO mandate and 2022-2024 layoffs?
23. Next-tier employer-driven renter demand (healthcare, retail HQ, aerospace, public sector)?
24. Renter-demand share by sector?
25. WARN notices 2022-2025 by employer, count, effective date?
26. RTO posture of top 20 employers as of 2026 and correlation with renter demand?
27-36. Household income distribution, tech compensation by employer/level, RSU-to-rent translation, dual-tech share, visa-renter prepayment capacity, unemployment, cost-of-living.
37-47. Six cohorts: count, compensation, sub-markets, layoff elasticity, owner-conversion, screening-friction, RTO interaction, RSU vesting interaction, home-purchase drain.

DATA SOURCES
- Puget Sound Business Journal Largest Employers lists (2022, 2023, 2024, 2025 editions)
- Company 10-K filings (Microsoft, Amazon, Meta, etc.)
- LinkedIn workforce signals (triangulation only)
- USCIS H-1B Employer Data Hub
- DOL OFLC LCA Disclosure Data (worksite ZIP, wage)
- Layoffs.fyi
- WA ESD WARN Notice database
- Levels.fyi, Blind self-reported compensation
- BLS OEWS (Occupational Employment and Wage Statistics) MSA-level
- BLS QCEW NAICS 5112, 5182, 5415, 5417 for tech employment share
- BLS LAUS (Local Area Unemployment Statistics)
- WA ESD Labor Market Information
- Flex Index for RTO posture
- BEA Regional Price Parities
- C2ER ACCRA cost of living
- Apartment List and Zillow ZORI for layoff-cycle vacancy response

DELIVERABLES
1. `employers-top20.csv`:
   - `employer_name`
   - `sector` (tech | aerospace | healthcare | retail-hq | public | other)
   - `headcount_2025`
   - `headcount_2022`
   - `headcount_yoy_change_pct`
   - `primary_worksite_zips` (semicolon-separated)
   - `primary_worksite_cities`
   - `notes`
2. `tech-employers-detailed.csv` for each named tech employer:
   - `employer_name`
   - `headcount_2019`, `headcount_2021`, `headcount_2023`, `headcount_2025`
   - `cumulative_layoffs_2022_2025`
   - `largest_layoff_event_date`, `largest_layoff_event_count`
   - `rto_posture_2026` (fully-remote | hybrid-2 | hybrid-3 | hybrid-4 | full-rto)
   - `primary_worksite_zips`
   - `h1b_approvals_fy2022`, `h1b_approvals_fy2023`, `h1b_approvals_fy2024`
   - `lca_median_wage_fy2024`
3. `lca-by-zip.csv` per worksite ZIP:
   - `zcta`
   - `lca_total_fy2023`, `lca_total_fy2024`
   - `top_3_employers` (semicolon-separated)
   - `median_wage_fy2024`
4. `warn-notices.csv`:
   - `employer`, `notice_date`, `effective_date`, `affected_count`, `county`, `worksite`
5. `compensation-by-level.csv`:
   - `employer`, `role_family`, `level`, `base_median`, `bonus_target_pct`, `rsu_4yr_value`, `total_comp_year1`, `total_comp_year4`, `monthly_rent_capacity_30pct`, `monthly_rent_capacity_40pct`
6. `cohort-analysis.csv` for each of six cohorts:
   - `cohort_id` (A/B/C/D/E/F)
   - `cohort_name`
   - `estimated_count_two_county`
   - `median_compensation`
   - `primary_zctas_top5` (semicolon-separated)
   - `rent_capacity_range`
   - `renter_share_pct`
   - `layoff_elasticity` (estimated vacancy-rate-change per 10% layoff event)
   - `owner_conversion_annual_pct`
   - `screening_friction_score` (0-100, document)
   - `data_method`
7. `layoff-cycle-response.md` analyzing the 2022-2023 natural experiment:
   - Class A vacancy response in Bellevue, SLU, Downtown Seattle, Redmond
   - Class B/C small-portfolio response in same submarkets vs. South King and Snohomish
   - Time-lag from WARN to observable rental response
   - Difference-in-differences flagged with confounders (rate hikes, post-pandemic re-urbanization)
8. `effort-4-narrative.md` with:
   - Sector renter-demand attribution
   - Top-3 monitoring indicators per employer
   - Cohort sub-market clustering map
   - The Boeing Snohomish exposure analysis
   - The Amazon Bellevue tower expansion exposure analysis
   - Sub-markets most insulated from tech layoffs

QUALITY BAR
- Every top-20 employer cites a source for headcount.
- Tech compensation is TRIANGULATED across levels.fyi, Blind, and LCA prevailing wage. Report a range, not a point estimate.
- Cohort counts are MODELED with the assumption set documented.
- LCA worksite ZIPs map cleanly to Effort 0 ZCTAs (use the postal-to-ZCTA crosswalk).
- WARN notices include the original WA ESD filing reference.

DO NOT
- Report H-1B approvals as resident counts.
- Use levels.fyi as the sole compensation source; the sample is biased upward.
- Conflate Bellevue Microsoft satellites with Redmond main campus headcount.
- Skip Boeing because it is not tech. Snohomish small-portfolio TAM is aerospace-anchored.
```

---

## Prompt 5: Childcare Supply and Regulatory Matrix

```
ROLE
You are a regulatory and zoning analyst building the childcare supply, daycare zoning, rental regulatory, and exogenous risk layer for a King and Snohomish County dual-use analysis. Your output gates the daycare conversion thesis and defines per-jurisdiction operational friction for the rental side.

INPUT
- The ZIP master from Effort 0: `zip-master.csv` and `zip-boundaries.geojson`
- The under-5 density columns from Effort 3 demographics output (if available; otherwise produce a standalone capacity-gap analysis using Census child population data)

GOAL
Identify daycare supply gaps by ZIP, map regulatory rules governing both rental operations and daycare conversions per jurisdiction, and catalog exogenous risks (federal immigration policy, AI hiring shift, HB 1217, rate environment, climate migration, Boeing production rate).

SCOPE
- Childcare facilities: every licensed WA DCYF family home and center provider in both counties
- Daycare zoning matrix: every incorporated city plus unincorporated King and unincorporated Snohomish
- Rental regulatory matrix: same jurisdictions
- Exogenous risk catalog: federal, state, local; current and 12-24 month pending

QUESTIONS TO ANSWER
48. Where is licensed childcare capacity shortest relative to under-5 population (children-per-100-slots)?
49. Where have facilities recently opened or closed?
50. What is the average daycare tuition by ZIP, and how does it correlate with household income?
51. Which jurisdictions allow in-home daycare by right, by conditional use, or not at all?
52. Where is commercial daycare zoning available?
53. Which jurisdictions have just-cause eviction, rent control, source-of-income protections, or other landlord-burden rules?
54. Which cities have short-term rental restrictions, landlord licensing, or rental inspection programs?
55. What ordinance changes are pending in the next 12-24 months?
56. Federal immigration policy realistic outcome range for H-1B, OPT, refugee inflows over 5-10 years?
57. AI-driven hiring composition shift at Microsoft, Amazon, Google, Anthropic, OpenAI?
58. How does HB 1217 rent stabilization, source-of-income protections, Fair Chance Housing shift the small-portfolio owner base?
59. How does the interest rate environment affect accidental landlord supply?
60. What is the climate-migration inflow signal for the Pacific Northwest?
61. What is the Boeing production rate risk to Snohomish renter demand (737 MAX, 777X, 787)?

DATA SOURCES
- WA DCYF Child Care Search (licensed facilities, license history, capacity)
- Child Care Aware of Washington
- City municipal codes for every in-scope jurisdiction
- King County Code, Snohomish County Code (unincorporated)
- MRSC Washington zoning summaries
- Seattle SMC, Bellevue Municipal Code, Redmond Municipal Code, Kirkland Municipal Code, Bothell Municipal Code (cross-county), Issaquah Municipal Code, Renton Municipal Code, Kent Municipal Code, Federal Way Revised Code, Auburn Municipal Code, SeaTac Municipal Code, Tukwila Municipal Code, Burien Municipal Code, Shoreline Municipal Code, Lynnwood Municipal Code, Edmonds Municipal Code, Mukilteo Municipal Code, Mountlake Terrace Municipal Code, Mill Creek Municipal Code, Everett Municipal Code, Marysville Municipal Code, Arlington Municipal Code, Lake Stevens Municipal Code, Monroe Municipal Code
- WA RCW 59.18 (residential landlord-tenant)
- WA HB 1217 (rent stabilization) final law text and Department of Commerce guidance
- WA HB 1337 (ADU statewide)
- USCIS, DOL OFLC for immigration policy baseline
- Migration Policy Institute, Pew Research Center for immigration scenarios
- Boeing 10-K, IAM 751 strike outcome, production rate guidance
- FHFA NMDB for rate-lock environment
- Pacific Northwest climate migration literature (Climate Migration Council, academic studies)

DELIVERABLES
1. `childcare-facilities.csv` per licensed provider:
   - `license_number`, `provider_name`, `provider_type` (family-home | center)
   - `address`, `city`, `zip`, `zcta`
   - `licensed_capacity`
   - `infant_capacity`, `toddler_capacity`, `preschool_capacity`
   - `license_open_date`, `license_status`, `last_inspection_date`
   - `monthly_tuition_est_infant`, `monthly_tuition_est_preschool`
2. `childcare-gap-zip.csv` per in-scope ZCTA:
   - `zcta`
   - `under_5_population`
   - `total_licensed_slots`
   - `children_per_100_slots`
   - `gap_severity` (severe | high | moderate | balanced | surplus)
   - `facility_open_3yr`, `facility_close_3yr`
   - `avg_tuition_infant`
   - `tuition_to_median_income_ratio`
3. `daycare-zoning-matrix.csv` per jurisdiction:
   - `jurisdiction`
   - `in_home_residential_status` (by-right | conditional | prohibited)
   - `in_home_capacity_limit`
   - `commercial_daycare_zones` (semicolon-separated zone codes)
   - `parking_requirement`
   - `setback_requirement`
   - `notable_restrictions`
   - `source_citation` (municipal code section)
4. `rental-regulatory-matrix.csv` per jurisdiction:
   - `jurisdiction`
   - `just_cause_eviction` (yes | no)
   - `rent_stabilization_local` (yes | no | hb1217-only)
   - `source_of_income_protection` (yes | no)
   - `fair_chance_housing` (yes | no)
   - `landlord_licensing_required` (yes | no)
   - `rental_inspection_program` (yes | no)
   - `str_restrictions` (described)
   - `first_in_time_tenant_selection` (yes | no)
   - `notable_other_rules`
   - `source_citation`
5. `pending-ordinances.md` listing every announced or rumored ordinance change in the next 24 months affecting rental or daycare operations
6. `exogenous-risks.md` covering:
   - Federal immigration policy scenarios (3 realistic outcomes) and TAM impact estimates
   - AI hiring composition shift (more applied scientists, fewer junior SDEs) and Cohort A impact
   - HB 1217 SFR exemption analysis (the exemption IS in final law per Multifamily NW and other sources)
   - HB 1217 cap reset to 9.683% in 2026 and the concession-disguised pricing pattern
   - Rate environment scenarios and accidental landlord supply impact
   - Climate migration inflow estimates
   - Boeing production rate scenarios (737 MAX, 777X, 787 ramp/cuts) and Snohomish exposure
7. `effort-5-narrative.md` with:
   - Top-10 ZIPs by daycare-gap severity weighted by income
   - Top-10 jurisdictions for daycare conversion friendliness (by-right + commercial available)
   - Bottom-5 jurisdictions for rental operating friction
   - HB 1217 SFR exemption usable-as-classifier methodology
   - Risks ranked by magnitude

QUALITY BAR
- Every licensed facility cites its DCYF license number.
- Every zoning row cites the municipal code section.
- Every regulatory row cites the statute or ordinance.
- HB 1217 SFR exemption is captured correctly per the May 7, 2025 signed law: SFR not owned by a corporation/REIT/LLC-with-corporate-member IS exempt from the rent cap. Do not repeat the earlier (incorrect) interpretation that the exemption was removed in conference.
- New construction exemption term is 12 years from CO, not 15.

DO NOT
- Repeat the now-corrected interpretation that the HB 1217 SFR exemption was removed in conference. Per Multifamily NW, Spinnaker, mynorthwest, Washington State Standard, TPCAR, SJA: the exemption IS in final law.
- Treat all jurisdictions as having Seattle's regulatory stack. Most do not.
- Skip unincorporated King and Snohomish County. Large rental stock lives there.
```

---

## Prompt 6: Synthesis, Scoring, and Final Report

```
ROLE
You are a senior strategy analyst synthesizing five parallel research efforts (schools, housing, demographics, employers, regulatory) into the final Green Lappe market analysis. Your output is the decision document. Three composite scores, three ranked lists, one dual-use shortlist.

INPUT
- Effort 0 outputs: `zip-master.csv`, `zip-boundaries.geojson`, `district-boundaries.geojson`, `jurisdiction-crosswalk.csv`
- Effort 1 outputs: `schools.csv`, `attendance-boundaries.geojson`, `zip-school-crosswalk.csv`, `boundary-change-watchlist.md`
- Effort 2 outputs: `housing-zip.csv`, `permits-adu-dadu.csv`, `small-portfolio-stock-modeled.csv`
- Effort 3 outputs: `demographics-zip.csv`, `language-clusters.csv`, `visa-cohorts.csv`, `refugee-placements.csv`
- Effort 4 outputs: `employers-top20.csv`, `tech-employers-detailed.csv`, `lca-by-zip.csv`, `warn-notices.csv`, `compensation-by-level.csv`, `cohort-analysis.csv`, `layoff-cycle-response.md`
- Effort 5 outputs: `childcare-facilities.csv`, `childcare-gap-zip.csv`, `daycare-zoning-matrix.csv`, `rental-regulatory-matrix.csv`, `pending-ordinances.md`, `exogenous-risks.md`

GOAL
Join all prior datasets at the ZIP level. Compute three composite scores per ZIP (PM business sequencing, rental acquisition, daycare conversion). Produce ranked lists per score and a dual-use shortlist. Run sensitivity analysis on the top 20 ZIPs per score. Test every hypothesis from the research plan and mark each validated, partially-validated, refuted, or inconclusive. Produce the final report.

SCORING METHODOLOGY

Compute three 0-100 scores per in-scope ZCTA.

PM business sequencing score weights (sum to 1.00):
- Renter-household count in small-portfolio buildings (Effort 2): 0.22
- Accidental landlord supply (ADU/DADU velocity + rate-locked + tech-relocation, Effort 2): 0.16
- LEP density × renter density × tech-employer concentration (Effort 3 + Effort 4): 0.14
- Visa-cohort renter density (Effort 3): 0.12
- Regulatory complexity (Effort 5): 0.10 (treated as compliance-moat positive)
- Tech-cohort exposure (Effort 4): 0.10 (positive but capped; >35% triggers diversification penalty)
- Employer commute-shed access (Effort 3 commute matrix): 0.10
- Population growth projection (Effort 3 OFM): 0.06

Rental acquisition score weights (sum to 1.00):
- Composite school quality (Effort 1 `zip_school_quality_composite`): 0.28
- Rent-to-price ratio (Effort 2): 0.20
- 36-month rent growth (Effort 2): 0.12
- Days on market and vacancy (Effort 2, inverse): 0.10
- Tenant stability proxies (owner-renter mix, income, Effort 2 + Effort 3): 0.12
- Regulatory friendliness (Effort 5, inverse of friction): 0.10
- Commute access to top hubs (Effort 3): 0.08

Daycare conversion score weights (sum to 1.00):
- Children under 5 density (Effort 3): 0.20
- Licensed-slot gap severity (Effort 5 `children_per_100_slots`): 0.22
- Zoning permissiveness (Effort 5 daycare-zoning-matrix, joined by jurisdiction): 0.20
- Household income for tuition capacity (Effort 3): 0.12
- Proximity to high-income employment (Effort 3 commute, Effort 4): 0.10
- Facility opening/closure trend (Effort 5, opens-minus-closes 3yr): 0.08
- School quality reinforcement (Effort 1; high quality pulls families): 0.08

Document the exact normalization for each input. Most are min-max normalized within the in-scope ZCTA universe. Document outlier handling.

DELIVERABLES

1. `green-lappe-final-dataset.csv` per in-scope ZCTA, joining all upstream columns plus three score columns and three rank columns:
   - All columns from `zip-master`, `zip-school-crosswalk`, `housing-zip`, `small-portfolio-stock-modeled`, `demographics-zip`, `childcare-gap-zip`
   - `pm_score`, `pm_rank`
   - `rental_score`, `rental_rank`
   - `daycare_score`, `daycare_rank`
   - `dual_use_score` (geometric mean of rental and daycare)
   - `dual_use_rank`
2. `top-10-pm-sub-markets.md` with deep-dive profiles for the top 10 PM sub-markets:
   - Rank, sub-market name, score, score decomposition
   - Renter-household count, small-portfolio share
   - Language and visa-cohort exposure
   - Tech-cohort exposure and layoff resilience
   - Regulatory environment
   - Top-3 reasons to enter, top-3 risks
3. `top-10-rental-acquisition-zips.md` with deep-dive profiles for the top 10 rental ZIPs:
   - Rank, ZCTA, primary city, score, score decomposition
   - Median rent by bedroom, rent-to-price ratio
   - Composite school quality, top schools assigned
   - Tenant profile
   - Regulatory friction
   - Top-3 reasons to acquire, top-3 risks
4. `top-10-daycare-conversion-zips.md` with deep-dive profiles for the top 10 daycare ZIPs:
   - Rank, ZCTA, primary city, score, score decomposition
   - Under-5 density, slot gap, average tuition
   - Zoning status for both in-home and commercial daycare
   - Income capacity
   - Nearest high-income employer cluster
   - Top-3 reasons to convert, top-3 risks
5. `dual-use-shortlist.md` listing every ZIP in top-tier on both rental and daycare, with use-case lead recommendation per ZIP and rationale
6. `mismatch-analysis.md` surfacing:
   - High-school-quality ZIPs with below-market rent (buy signal)
   - Low-school-quality ZIPs with premium rent (avoid)
   - High-LEP ZIPs with low PM penetration estimate (multilingual moat opportunity)
   - High-rate-locked-owner ZIPs with low ADU/DADU velocity (untapped accidental-landlord supply)
7. `sensitivity-analysis.md` on the top 20 ZIPs per score showing rank stability across +/30% perturbations of each weight, identifying which ZIPs are robust and which are weight-sensitive
8. `hypothesis-resolution.md` testing each of the 17 hypotheses from the research plan with status (validated | partially-validated | refuted | inconclusive), evidence, and decision implication
9. `heatmaps.geojson` with per-ZCTA polygons styled for each of the three scores (use a property field per score), suitable for direct rendering in Mapbox or Leaflet
10. `final-report.md` structured per the research plan's final report structure:
    1. Executive summary (1 page, three top-10 rank orders surfaced first)
    2. Geographic foundation summary
    3. Schools and attendance boundaries summary
    4. Housing and rental market summary
    5. Demographics, language, and immigration summary
    6. Employers, workforce, and tech cohorts summary
    7. Childcare supply and regulatory matrix summary
    8. Exogenous risks summary
    9. PM business sequencing score and top-10 sub-markets
    10. Rental acquisition score and top-10 ZIPs
    11. Daycare conversion score and top-10 ZIPs
    12. Dual-use shortlist and use-case lead per parcel
    13. Sensitivity analysis
    14. Data sources, vintage, and caveats

QUALITY BAR
- Every score has a documented formula and is reproducible from the input CSVs.
- Every rank position in the deep-dive markdown documents links to the data row that produced it.
- Sensitivity analysis demonstrates which top-10 picks are robust.
- Hypothesis resolution states evidence, not opinion.
- Executive summary fits on one page when printed.

DO NOT
- Aggregate scores by averaging dissimilar inputs without normalization.
- Skip the sensitivity analysis. Single-weight rankings are fragile.
- Treat the dual-use score as a primary ranking; it is a shortlist filter.
- Hide caveats. Every MOE flag, every triangulation, every modeled assumption is surfaced in the final report's caveats section.
```

---

## Hand-Off Checklist

After Effort 6 completes, the partner team has:

|Item|Source Effort|Format|
|---|---|---|
|ZIP universe and crosswalks|0|CSV + GeoJSON|
|School ratings and attendance boundaries|1|CSV + GeoJSON|
|Housing values, rents, yields, permits|2|CSV|
|Demographics, language, visa cohorts|3|CSV|
|Employer detail, cohort analysis, layoff response|4|CSV + Markdown|
|Childcare gaps, zoning matrix, regulatory matrix, risks|5|CSV + Markdown|
|Three composite scores, ranked lists, dual-use shortlist|6|CSV + Markdown|
|Hypothesis resolution|6|Markdown|
|Sensitivity analysis|6|Markdown|
|Heatmaps for rendering|6|GeoJSON|
|Final report|6|Markdown|

This is the input bundle the Green Lappe operating team uses to commit to a sub-market entry sequence, a language-access roadmap, a parcel-acquisition search, and a quarterly monitoring discipline.
