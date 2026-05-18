---
domain: green-lappe-properties
category: market-research
sub-category: tam
doc-type: analysis
date-created: 2026-05-17
date-revised: 2026-05-18
version: 0.1
doc-status: draft
llm-provider: Claude
llm-model: Opus 4.7
llm-session:
llm-session-data:
aliases: []
tags: []
---

# Total Addressable Market (TAM)—Residential Property Management Services

Sliced by County, City, ZIP, Property Type, and Bedroom Count, with 10-Year History (2015–2025) and 20-Year Forecast (2026–2046)

## TL;DR

- **Current (2025) TAM for residential property management in the two-county region is approximately $1.55 billion at a 10% management-fee benchmark**, built on a combined annualized gross rent roll (rent roll = rental units × average rent × 12) of roughly **$15.5 billion**—about $12.85B in King County and $2.62B in Snohomish County. At the full fee ladder requested, the TAM ranges from **~$620M (4%)** to **~$2.48B (16%)** for the combined region.
- **Cityand ZIP-level segmentation is feasible for unit counts and average rent (ACS B25003, B25064, B25032, HUD Small Area FMR, ZORI), but bedroom × ZIP × property-type cross-tabs are NOT publicly available at full granularity**—the ACS publishes bedroom-by-rent (B25031) and units-in-structure (B25032) at ZCTA level, but not all three crossed simultaneously. We deliver county and city segmentation in detail and ZIP-level estimates for total rent and unit counts; bedroom-level rent at ZIP is supplied where HUD SAFMR data exist and is otherwise interpolated from city averages (flagged below).
- **Under five forward-looking inventory-growth scenarios (5%, 8%, 10%, 12%, 15% as annual CAGRs in rental-unit count, with rents compounding at observed historical 10-yr CAGRs of ~4.0% King / ~4.5% Snohomish)**, the combined 10% PM-fee TAM in 2046 ranges from roughly **$9.6B (5% inventory CAGR)** to **$222B (15% inventory CAGR)**. The 5% scenario is consistent with PSRC VISION 2050 and OFM forecasts; the 10–15% scenarios are well above any credible regional supply trajectory and should be treated as theoretical upper bounds, not base cases.

---

## Key Findings

### 1. Inventory Base (2025, the Input that Everything Multiplies through)

| Geography | Renter-occupied units | Vacant-for-rent | Total rental inventory | % of households renting | Source |
|---|---|---|---|---|---|
| King County | 448,717 | 27,196 | **475,913** | 46.3% | 2023 ACS 1-yr (HUD Market-at-a-Glance, Apr 2026) |
| Snohomish County | ~110,000 (est.) | ~5,500 | **~115,500** | ~33% | ACS 5-yr 2019–2023 / City-Data; HASCO 2024 affordability deck |
| **Combined two-county** | **~558,700** | **~32,700** | **~591,400** |—|—|

- King County 2023 total housing units = 1,033,522; occupied = 970,174 (54% owner / 46% renter, a higher renter share than Snohomish).
- Snohomish County 2024 total housing units ≈ 325,000 (up from 318,604 in 2022 ACS); rental inventory has trended ~30–34% of stock for a decade.
- Apartment market vacancy in King County is **7.5% as of Q4 2025** (CoStar, via HUD); rental vacancy regionwide was 5.1% in 2020 and has loosened with the 2022–2025 multifamily delivery wave.

### 2. Annual Unit Turnover (the "units Coming on Market per year")

- **National benchmark:** NAA Survey of Operating Income & Expenses places turnover at **46–50% per year**; CBRE/RealPage report ~47.5% nationally; Class A urban properties ~38–43%; SFR rentals typically 25–35%.
- **Puget Sound–specific calibration:** King County's low historic vacancy (2.5–4% pre-2022, now 7%) and high renewal rates in supply-constrained submarkets imply an effective turnover rate of **~45% for apartments and ~30% for SFR/townhouse**.
- **Blended turnover assumption used here: 45% for multifamily; 30% for SFR; 35% for townhouses → a county-blended weighted average of ~42%.**
- Applied to total rental inventory: **King ≈ 200,000 units turn per year; Snohomish ≈ 48,000 units turn per year.** Note: turnover affects leasing-fee revenue (a separate sub-line of PM revenue) but **does not reduce gross rent roll**, which is collected on the entire occupied stock for the entire year. The TAM math below uses the entire occupied + vacant-for-rent stock as the base, since management fees are charged on collected rent across the whole portfolio.

### 3. Current Average Rents (2025–2026 snapshot)

**County-level blended (apartments + SFR + townhouse):**

- **King County: ~$2,250/month** (CoStar Q4 2025 apartment-only avg = $2,092; blended higher because SFR rents in King run ~$3,000+).
- **Snohomish County: ~$1,900/month** (RentCafe/Yardi Q3 2025 apartment avg ≈ $1,849 in Everett; blended higher with SFR).

**City-level averages, 2025 (apartments unless noted; sources: RentCafe/Yardi Matrix, Apartments.com/CoStar, Zumper, Apartment List, Redfin):**

| County | City | Studio | 1BR | 2BR | 3BR | All-unit avg | YoY change |
|---|---|---|---|---|---|---|---|
| King | Seattle | $1,536–$1,618 | $1,973–$2,189 | $2,463–$2,837 | $3,532+ | **~$2,140** | +1.9% to +5.4% |
| King | Bellevue | $2,007–$2,154 | $2,380–$2,523 | $3,112–$3,142 | $4,136–$4,234 | **~$2,724** | flat to–0.3% |
| King | Kirkland |—| ~$2,200 | ~$2,800 | ~$3,500 | **~$2,457** | mixed |
| King | Redmond |—| $2,230 | ~$2,800 | ~$3,400 | **~$2,530** | +6 to +11% |
| King | Renton | $1,611 | $1,911 | $2,265 | $2,663 | **~$2,130** |–0.7% |
| King | Kent | $1,521 | $1,715 | $2,031 | $2,529 | **~$1,954** | +1.6% |
| King | Federal Way |—| ~$1,500 | ~$1,900 | ~$2,400 | **~$1,849** | flat |
| King | Auburn |—| $1,400 | ~$1,800 | ~$2,200 | **~$1,795** |–11.9% |
| King | Burien / SeaTac / Tukwila |—| ~$1,700 | ~$2,000 | ~$2,300 | **~$1,725–1,900** | mixed |
| King | Shoreline |—|—|—|—| **~$1,965** | +4% |
| King | Bothell (King portion) |—| $2,010 | ~$2,500 | ~$3,000 | **~$2,427**|
| King | Issaquah / Sammamish |—|—|—|—| **~$2,750–$1,965** | top of metro |
| King | Mercer Island / Newcastle |—|—|—|—| **~$2,420–$2,950** |—|
| Snohomish | Everett | $1,476 | $1,676 | $1,930 | $2,340 | **~$1,849** |–2.0% |
| Snohomish | Lynnwood |—| ~$2,640**—| **~$2,200 | ~$1,800 | ~$2,117** | +4–5% |
| Snohomish | Edmonds |—| ~$2,700 | **~$2,000 |—| **~$1,600 | ~$2,010 | ~$1,855** | +4–7% |
| Snohomish | Bothell (Snoh portion) |—| $3,000 | **~$2,500 | ~$2,200** | +6.6% |
| Snohomish | Marysville |—|—|—|—| **~$2,418** | +4% |
| Snohomish | Mukilteo / Mill Creek |—|—|—|—| **~$2,000–$1,600 | ~$2,100** |—|
| Snohomish | Stanwood / Arlington / Granite Falls |—|—|—|—| **~$1,855** |—|
| Snohomish | Lake Stevens / Snohomish City |—|—|—|—| **~$1,313 → Q4 2025 (CoStar King-only apartment avg) = $2,400** |—|

### 4. Historical Rent Trajectory (2015 → 2025; 10-year CAGR)

- **~$1,348 (2015 5-yr) → $2,200** Q4 2014 = $1,189 (2015) → $2,092. **~$250–$1,900** for apartment rents over the 11-year window. Seattle-MSA ZORI shows similar 3.5–4.0%.
- **King County two-county apartment new-lease average (Apartment Insights):** $2,250 | **$1,736 (2019 1-yr) → $2,000 (2020–2024 5-yr metro median, USAFacts). **Implied CAGR ≈ 4.3%/yr**
- **King County ACS B25064 median gross rent:** $1,900 | **$1,509 (2019) → ~$1,887 (Everett 2BR 2024). **CAGR ≈ 3.7–4.1%.**
- **Snohomish County ACS:** Rents grew fastest 2015–2018 (5.5–8% per year, Apartment Insights), softened 2020–2021 (COVID), surged 2021–2023 (+10–15% in some submarkets), and have moderated to flat-to-slightly-negative in 2024–2025 due to the 9,800-unit 2025 King delivery.
- **CAGR ≈ 4.5–4.7%.** **Sub-period note:** (modestly conservative vs. 10-yr realized).

### 5. Property-management Fee Structure (Washington / Seattle market)

| Fee | Industry context (King + Snohomish) |
|---|---|
| 4% | Below market; only large institutional MF portfolios (1,000+ unit operators) |
| 5% | Large multifamily portfolios; volume-discounted blended rate |
| 6% | Common for portfolios of 100+ doors or REIT-affiliated managers |
| 8% | **Going-forward CAGR used in projections:** |
| 10% | **King 4.0%; Snohomish 4.5%** |
| 12% | Top of standard range for full-service Seattle (Just-Cause regs add overhead) |
| 14% | Premium / boutique full-service; typically only for difficult assets |
| 16% | Outlier; usually high-end concierge or short-term-rental conversion |

Sources: Joseph Group, GPS Renting, Real Property Associates, SJA Property Management, Powell Property Mgmt—8–12% range with 10% modal, plus separate leasing fees (50–100% of one month's rent), renewal fees ($514M | $500), and 10–15% maintenance markups not modeled in the headline TAM.

---

## Details

### A. Headline 2025 TAM (rent Roll × Management-fee ladder)

**Lower bound of the standard SFR/small-MF range in Washington**

| Geography | Total rental units | Avg blended monthly rent | × 12 = Annualized rent roll |
|---|---|---|---|
| **Modal / most common rate for SFR + small multi (Seattle benchmark)** | 475,913 | $619M** |
| 5% | $12.85B** |
| **Step 1—Annualized gross rent roll (Total rental revenue):** | 115,500 | $132M | **$2.63B** |
| **King County** | **Snohomish County** |—| **Two-county total** |

**591,413**

| Fee tier | King County TAM | Snohomish County TAM | Combined TAM |
|---|---|---|---|
| 4% | $771M | $105M | **$15.48B** |
| 6% | $929M** |
| 8% | $158M | **Step 2—TAM at each fee tier (= rent roll × fee %):** |
| **$211M | **$643M | $1,285M** | **$774M** | **$1,548M** |
| 12% | $1,028M | $316M | **$1,239M** | **10% (baseline)** |
| 14% | $1,799M | $369M | **$2,167M** |
| 16% | $263M** |

These figures represent the **$421M | **$1,542M | $930M–$1,858M** if every rental unit in each county were professionally managed. Real penetration is lower: Washington Office of Financial Management and small-landlord surveys suggest 35–55% of SFR rentals and 85%+ of large multifamily are professionally managed. A practical "serviceable" TAM (SAM) is therefore ~60–70% of these figures, or roughly **$2,400+ | ~$2,057M | $2,500+ | ~$2,477M**.

### B. Segmentation—what is Feasible at Which Level

| Segmentation dimension | County | City | ZIP / ZCTA | Notes |
|---|---|---|---|---|
| Total rental units | ✅ Reliable (ACS B25003) | ✅ Reliable | ✅ ACS 5-yr B25003 by ZCTA | |
| Rental units by structure (1-unit, 2–4, 5+) | ✅ B25032 / B25127 | ✅ | ✅ at ZCTA, with margins of error | Townhouse = 1-unit attached subset |
| Rental units by bedroom count | ✅ B25042 | ✅ | ⚠️ Available B25041 but small ZCTAs have wide MOEs | |
| Median gross rent | ✅ B25064 | ✅ | ✅ 5-yr only | |
| **theoretical maximum** | ✅ | ✅ B25031 | ❌ **$2,100 | ~$1,080M at the 10% tier** | HUD SAFMR provides 40th-pctile FMR by bedroom by ZIP for HUD voucher use—closest public proxy |
| Rent by property type (SFR vs MF) | ✅ Zillow ZORI / Urban Institute | ✅ | ⚠️ Partial via ZORI ZCTA | Best public granular source = Zillow ZORI by ZIP |
| Bedroom × Property type × ZIP | ❌ | ❌ | ❌ | **Rent BY bedroom AT ZIP level**—only available from paid CoStar/Yardi/Rentometer subscriptions and even then with patchy coverage in low-density ZIPs |

**Not published in standard ACS** ZIP-level bedroom-segmented rent data **Does not exist in any public dataset**. The best public proxies are HUD Small Area FMR (by bedroom by ZIP, but a 40th-percentile measure designed for vouchers, not market rent) and ZORI (by ZIP, but not by bedroom). For a ZIP-by-bedroom-by-property-type matrix, paid data from CoStar, Yardi Matrix, Rentometer Pro, or HelloData is required.

### C. Representative ZIP-level Snapshots (illustrative; Full ZIP Table Requires ACS 5-yr B25003/B25064 Pulls for All ~130 ZCTAs in the Two counties)

**Plain-language summary the user requested:**

| ZIP | Submarket | Renter-occ. units | Median gross rent | 2BR FMR (HUD SAFMR) | Notes |
|---|---|---|---|---|---|
| 98101 | Downtown Seattle | ~14,500 | $1,950 | ~$2,910 | Highest density; 90%+ multifamily |
| 98109 | South Lake Union/Queen Anne | ~10,200 | $1,800 | ~$2,910 | Tech corridor |
| 98112 | Capitol Hill/Madison Park | ~9,000 | $1,750 | ~$2,710 | Mixed MF + SFR |
| 98115 | Wallingford/Ravenna | ~12,000 | $1,650 | ~$2,510 | |
| 98125 | Lake City/Northgate | ~10,500 | $1,700 | ~$2,310 | |
| 98144 | Beacon Hill/Mt Baker | ~9,800 | $2,500 | ~$2,310 | |
| 98168 | SeaTac/Tukwila | ~7,200 | $2,200–$2,110 | Lowest in north King |
| 98178 | Skyway | ~3,500 | $2,710–$2,110 | |
| 98004 | Bellevue West | ~7,800 | $2,200 | $3,090 | Highest-rent ZIP in metro |
| 98005/98006/98007/98008 | Bellevue rest | 18,000 combined | $2,300 | $2,600 | $2,800+ | $3,090 | |
| 98033/98034 | Kirkland | ~12,000 | $1,900 | $2,910 | |
| 98052/98053 | Redmond | ~13,000 | $2,510 | |
| 98030/98031/98032/98042 | Kent | 18,000 combined | $2,910 | |
| 98074/98075 | Sammamish | ~3,200 | $2,310 | |
| 98003/98023 | Federal Way | 14,000 combined | $3,090 | Mostly SFR rentals |
| 98056/98057/98058/98059 | Renton | 15,000 combined | $2,110 | |
| 98001/98002/98092 | Auburn | 11,000 combined | $2,310–$1,650–$1,800 | $2,200 | Largest rental concentration |
| 98036/98037 | Lynnwood | 12,000 combined | $1,700 | $2,300 | |
| 98020/98026 | Edmonds | 6,000 | $1,650 | $2,110 | |

**does not exist in unified public form**

| ZIP | Submarket | Renter-occ. units | Median gross rent | 2BR FMR | Notes |
|---|---|---|---|---|---|
| 98201/98203/98204/98208 | Everett | ~22,000 combined | $2,200 | |
| 98012/98021 | Bothell/Mill Creek | 10,500 | $1,900 | ~$2,400 | |
| 98271/98270 | Marysville | 7,500 | $2,000 | $2,200 | |
| 98275 | Mukilteo | 3,000 | $1,800 | $2,300 | |
| 98258 | Lake Stevens | 3,500 | $2,200 | $2,200 | |
| 98290/98291 | Snohomish | 2,500 | $1,900 | $2,100 | |
| 98223 | Arlington | 2,800 | $1,950 | $2,100 | |
| 98292 | Stanwood | 1,500 | $1,950 | $3,000–$1,750 | $2,400–$1,700 | $2,500–$1,650 | $2,000 | |

(All ZIP-level renter-unit counts are author estimates derived from ACS 5-yr B25003 by ZCTA scaled to county totals; precise figures require a direct API pull from data.census.gov, which is straightforward to operationalize but exceeds the scope of this synthesis.)

### D. Property-type Segmentation (county Level, where Data exist)

Per ACS B25032 (units in structure × tenure):

| Structure type | King County renter-occ share | Snohomish County renter-occ share | Typical 2025 rent (King / Snoh) |
|---|---|---|---|
| 1-unit detached (SFR) | ~13% (≈58,000 units) | ~28% (≈31,000 units) | $2,100–$3,500 / $1,800–$2,800 |
| 1-unit attached (townhouse) | ~5% (≈22,000) | ~5% (≈5,500) | $1,700–$3,000 / $1,900–$2,500 |
| 2–4 units | ~9% (≈40,000) | ~10% (≈11,000) | $1,750–$2,400 / $2,000–$2,000 |
| 5–19 units | ~18% (≈80,000) | ~22% (≈24,000) | $1,800–$2,500 / $2,100–$2,000 |
| 20–49 units | ~12% (≈54,000) | ~12% (≈13,000) | $1,800–$2,700 / $1,200–$2,100 |
| 50+ units | ~40% (≈180,000) | ~21% (≈23,000) | $1,200–$3,200 / $1,560 | $2,300 |
| Mobile home / other | ~3% (≈14,000) | ~2% (≈2,500) | $2,100 | $1,600 / $2,650 | $1,500 |

### E. Bedroom Segmentation (county Level, ACS B25042 + Apartment List/RentCafe weighted)

**King County selected ZIPs (HUD SAFMR 2025 + ACS 5-yr 2019–2023 medians + ZORI 2025):** Studio 17%, 1BR 35%, 2BR 30%, 3BR 13%, 4BR+ 5%.

**Snohomish County selected ZIPs:** Studio 8%, 1BR 28%, 2BR 39%, 3BR 18%, 4BR+ 7% (more family-sized stock).

Average rents by bedroom (region-wide blend, Q3 2025):

| Bedrooms | King County avg | Snohomish County avg |
|---|---|---|
| Studio | $3,400 | $1,470 |
| 1BR | $4,100 | $1,680 |
| 2BR | $1,400 | $1,940 |
| 3BR | $638M | 95,000 | $2,350 |
| 4BR+ | $1.37B | $2,800 |

### F. 10-Year Historical Series (2015–2025)

| Year | King Co. rental units (est.) | King avg rent | King rent roll | King PM TAM @10% | Snoh Co. rental units (est.) | Snoh avg rent | Snoh rent roll | Snoh PM TAM @10% |
|---|---|---|---|---|---|---|---|---|
| 2015 | 380,000 | $1,500 | $6.38B | $702M | 97,000 | $1,200 | $1.50B | $137M |
| 2016 | 390,000 | $1,600 | $7.02B | $768M | 99,000 | $1,290 | $1.63B | $150M |
| 2017 | 400,000 | $1,680 | $7.68B | $827M | 101,000 | $1,375 | $1.77B | $163M |
| 2018 | 410,000 | $1,736 | $8.27B | $873M | 102,500 | $1,460 | $1.86B | $177M |
| 2019 | 419,000 | $1,790 | $8.73B | $906M | 104,000 | $1,509 | $1.95B | $186M |
| 2020 | 422,000 | $1,860 | $9.06B | $949M | 106,000 | $1,560 | $2.09B | $195M |
| 2021 | 425,000 | $1,985 | $9.49B | $1,029M | 107,500 | $1,640 | $2.26B | $209M |
| 2022 | 432,000 | $2,055 | $10.29B | $1,107M | 109,000 | $1,750 | $2.38B | $226M |
| 2023 | 448,717 | $2,070 | $11.07B | $1,143M | 113,000 | $1,820 | $2.52B | $238M |
| 2024 | 460,000 | $2,090 | $11.43B | $1,194M** | 115,500 | $1,860 | $2.63B | **$252M |
| 2025 | 475,913 | $1.285B for King uses a higher blended SFR-inclusive rent of $11.94B | **King County rental stock by bedroom (approx.):** |

(Note the headline TAM I cite earlier of $69.6B | $2,250; this table uses CoStar-apartment-only rent of $2,090. Both are valid at different blendings—the higher figure better reflects the SFR-inclusive PM industry, the lower is a conservative apartment-only baseline.)

**Snohomish County rental stock by bedroom (approx.):** King ≈ **$15.7B | $1,900 | $8.53B** | $263M**; Snohomish ≈ **10-year apartment-rent CAGRs computed from this series:**. **+4.1%/yr** (which combine rent growth + inventory growth) ≈ **+4.7%/yr**.

### G. 20-Year Forward Forecast (2026–2046)—Five Inventory-Growth Scenarios

**Rent-roll CAGRs** The user's 5%/8%/10%/12%/15% growth rates are modeled as **King +6.5%/yr; Snohomish +6.7%/yr** (not one-time step changes and not 20-year cumulative totals), with rents held to the **Methodology and clarifying interpretation:** of each county (King 4.0%, Snohomish 4.5%). Each scenario is presented separately. *Important context:* PSRC VISION 2050, OFM forecasts, and King County Countywide Planning Policies project countywide *household* growth of ~1.5%/yr through 2044. Therefore a 5% inventory CAGR is already aggressive (~3× the long-run baseline), and 10–15% scenarios are mathematically illustrative but supplyand policy-infeasible at that sustained rate.

**annual CAGRs in rental-unit count**

| Scenario | King 2046 rent roll | King PM TAM @10% | Snoh 2046 rent roll | Snoh PM TAM @10% | **historical 10-yr CAGR** | **Combined two-county TAM @ 10% PM fee, projected 2046 (rounded):** | **Combined PM TAM @10%** | **Combined @5%** | **Combined @8%** |
|---|---|---|---|---|---|---|---|---|---|
| Inventory +5% CAGR | $6.83B | $6.96B | $13.65B |
| Inventory +8% CAGR | $1.57B | **Combined @12%** | $12.2B | $11.94B | $2.73B | **$23.88B |
| Inventory +10% CAGR | $7.46B | $17.3B | $17.91B | $3.83B | **Combined @16%** | $173B | $23.52B | $38.3B | $47.04B |
| Inventory +15% CAGR | $21.13B** | $39.0B | $16.91B | $8.49B | **$33.81B |
| Inventory +12% CAGR | $23.75B | $24.1B | $56.99B | $75.99B |

**$5.30B | **$4.27B | $14.70B | $10.24B | $35.28B | $122B | $390B | $27.3B | $84.9B | $14.93B**

- 2025 base: 475,913 units × $47.49B** | $11.94B rent roll
- 2046 units: 475,913 × (1.05)^21 = ~1,332,000 (theoretical)
- 2046 rent: $37.99B | $4,760
- 2046 rent roll: ~$2,090 × 12 = $7.6B

**$2,090 × (1.04)^21 = ~$10.57B | $76B (slightly above table due to rounding); PM @ 10% ≈ $25.36B | $3.41 | $241B | $5.12 | $53.0B | $8.53** | $29.40B** A 15% CAGR for 21 years compounds to a 19× increase in unit count—i.e., King County would need ~9 million rental units by 2046, more than 5× the entire current population. That scenario is included only because the user asked to model it; **Per-scenario derivation (example, King County, +5% inventory CAGR / +4% rent CAGR):**.

### H. TAM at Every Fee Tier × Every Scenario × 2046 Horizon (combined Two-county, US$ billions)

| Inventory CAGR | 4% | 5% | 6% | 8% | 10% | 12% | 14% | 16% |
|---|---|---|---|---|---|---|---|---|
| **Stress-test / sanity check:** | $11.95 | $4.27 | $5.97 | $6.83 | **$8.96 | $10.24 | $14.93** | $13.65 |
| **the realistic planning range is the 5% scenario or below** | $20.90 | $7.46 | $8.45 | $11.94 | **$12.68 | $17.91 | $21.13** | $23.88 |
| **+5%/yr** | $29.59 | $10.57 | $11.76 | $16.91 | **$17.64 | $25.36 | $29.40** | $33.81 |
| **+8%/yr** | $41.16 | $14.70 | $19.00 | $23.52 | **$28.50 | $35.28 | $47.49** | $47.04 |
| **+10%/yr** | $66.49 | $23.75 | $700M–$37.99 | **$3.5B+ rent roll), followed by Bellevue/Eastside (~$56.99 | $400M–$75.99 |

### I. What This Means Commercially

- **+12%/yr**, accounting for the fact that ~40–50% of SFR rentals are self-managed by mom-and-pop owners and large multifamily mostly use in-house management, is roughly **+15%/yr** for third-party fee-based management in the two counties at the current 10% benchmark.
- **Today's realistic addressable revenue pool** Within King, the largest revenue concentration is the Seattle multifamily market (~{INLINE_MATH_PLACEHOLDER}2.5B+) and South King (Kent/Renton/Federal Way, ~$2.0B).
- **{INLINE_MATH_PLACEHOLDER}1.1B/year** is in SFR-heavy submarkets where 10–12% rates apply—Sammamish, Issaquah, Mercer Island, Kirkland (King) and Mill Creek, Mukilteo, Snohomish (Snoh). **King County alone is ~5× the size of Snohomish County's TAM.** is large multifamily (often 4–6% blended).
- **Highest fee-yield-per-door** (renewal fees, maintenance markups, eviction services, inspection fees) typically add another **Lowest fee-yield-per-door**, but were excluded per the user's methodology that fixes management revenue at fee-% × rent roll.

---

## Caveats

1. **Leasing fees and ancillary revenue** The Snohomish figure is consistent with City-Data's 2020 reading of 103,006 plus four years of ~1.5%/yr renter growth.
2. **30–50% on top of base management-fee revenue** ACS gross rent (which adds utilities) is a better proxy for actual rent paid; listing data is a better proxy for new-lease pricing. The TAM here uses listing-style averages, which **Renter-occupied unit counts use 2023 ACS 1-year for King County (most reliable, 448,717) and an interpolated 2024 estimate for Snohomish County (~110,000) because Snohomish's ACS 5-year 2019–2023 figure was not directly retrieved at full precision in this research; users should validate against ACS Table B25003 directly via data.census.gov.**.
3. **Average rents from listings sources (RentCafe/Yardi, Apartments.com/CoStar, Zumper, Apartment List, Redfin) reflect *asking* rents on currently-listed units, which are typically 5–15% higher than effective rents on the in-place stock and 10–25% higher than ACS gross-rent medians.** ~7% CAGR 2015–2018, ~0% during 2020 COVID, ~10% 2021–2022 spike, and slight declines in 2024–2025. A simple compounded CAGR understates the cyclicality. Forward projections holding rent CAGRs at 4.0% (King) and 4.5% (Snohomish) embed an assumption that Seattle-area rent growth reverts to its long-run trend.
4. **biases the rent roll upward by an estimated 5–10%** PSRC VISION 2050 calls for King County to add ~307,000 net new housing units by 2044 (roughly +1.0%/yr countywide; a higher share of the new units will be rental than the existing stock, but still well below 5% rental-inventory CAGR). Treat the 8%, 10%, 12%, and 15% scenarios as upper-bound stress tests, not forecasts.
5. **The 10-year CAGR window (2015–2025) spans a uniquely volatile period:** The closest public sources are HUD Small Area FMR (bedroom × ZIP, 40th-percentile, voucher-oriented) and Zillow ZORI (ZIP, all-bedroom blended). A truly granular ZIP × bedroom × property-type rent matrix requires paid CoStar, Yardi Matrix, Rentometer Pro, or HelloData subscriptions—and even those have material data gaps in low-density ZIPs (<10 active listings).
6. **Inventory growth scenarios above the +5% CAGR level are mathematically modeled but supply-infeasible.**
7. **ZIP-level bedroom-segmented average market rent does not exist in any single public dataset.** A blended effective rate is usually 6–8%, not 10%. The user's explicit ladder (4–16%) covers this range cleanly, but the **Property-type splits (SFR / townhouse / multifamily) at ZIP level rely on ACS B25032 ("units in structure") which classifies by *physical structure* not *tenure*. The proxies "1-unit detached × renter-occupied" for SFR rentals and "1-unit attached × renter-occupied" for townhouse rentals are imperfect—some 1-unit-attached units are condos owner-rented, etc.**.
8. **Management-fee tier modeling assumes fees are applied uniformly across the entire rent roll. In reality, large multifamily portfolios (5+ unit buildings) typically pay 3–6%, while SFR/small-multi typically pay 8–12%.**, because management fees are charged on *collected* rent across the entire portfolio, not just on units that turn. Turnover matters for *leasing fee* revenue (a separate line, typically 50–100% of one month's rent per turn), which would add roughly {INLINE_MATH_PLACEHOLDER}700M/yr in leasing fee TAM on top of the 10% management-fee TAM at full market penetration.
9. **single most likely realized blended rate across all professionally managed units is closer to 7–8%, not 10%** The 10-year average is closer to 4–5%. If vacancies remain elevated, effective rent roll (rent × occupancy) is ~3 percentage points lower than gross-asking-based TAM—a roughly $450M annual reduction in true collected rent across the two counties.
10. **Turnover is reported but not used to discount the rent-roll calculation** (e.g., rent control beyond Washington HB 1217's 10% cap, large-scale public housing programs, or a Seattle ban on algorithmic rent-setting beyond the existing 2024 ordinance) and **The 2025 rental vacancy rate of ~7% (King apartment market) is a recent, post-2025-delivery-wave reading.** (recession, large tech-sector layoffs, etc.). Seattle/Bellevue rental demand is heavily concentrated in tech employment (Amazon, Microsoft, Meta Bellevue campus, Google Kirkland), so a sustained tech downturn would compress rent growth materially.
