# Customer-Back TAM for In-Home Daycare and Preschool in Orange County, California

## TL;DR

- The demand-derived total addressable market for paid licensed care of children 0 to 5 in Orange County is approximately $0.65B to $0.95B currently served (point estimate near $0.82B) and roughly $1.0B to $1.4B in total demand including unmet and waitlisted need (point estimate near $1.2B), built from the bottom up off a resident child population of 204,913 children ages 0 to 5 that has already fallen about 9% since 2019 to 2020. 
- The forward trend compresses the market: Orange County births have fallen from roughly 45,000 to 50,000 per year in the 1990s to about 30,000 to 31,000 today, and universal Transitional Kindergarten now pulls most four-year-olds out of paid preschool, so over a five-year view the enrollable paid market shrinks by roughly 8% to 12% in real child-count terms even as price inflation keeps nominal dollars roughly flat.
- Housing is not the constraint. Roughly 680,000 single-family homes and townhomes could physically host a licensed home, far more than demand could ever fill. Willingness and ability to pay, the collapse of the four-year-old paid segment into free TK, and a falling birth cohort are the real ceilings, so housing belongs as a closing reconciliation, not the opening frame.

## Key Findings

1. **The market is demand-constrained, not capacity-constrained.** Orange County has 998 licensed family child care homes  and 881 licensed centers  as of an April 29, 2025 data pull (Children’s Home Society, via the First 5 OC Child Care Landscape Update, Summer 2025), both down from 2019, against roughly 680,000 housing units physically eligible to host a home-based program. The binding constraints are the size of the working-parent child cohort and what families can pay, not the supply of rooms.
2. **The birth decline is structural and ongoing.** Annual resident births have fallen for over a decade and now sit near 30,000 to 31,000, and the 0 to 5 population dropped about 9% from 2019 to 2020 levels to 204,913.  Every forward year adds a smaller age-0 cohort than the year it replaces.
3. **TK is a one-time structural shock to the four-year-old paid segment.** With universal Transitional Kindergarten fully implemented in 2025 to 2026, free public TK now absorbs the majority of four-year-olds at the late-August academic-year boundary, hollowing out what used to be the most stable, full-pay age band for private preschools. Per the California Department of Education (AB 130): “In the 2025-2026 school year, and in each school year thereafter, a child who will have their fourth birthday on or before September 1 shall be admitted to a transitional kindergarten program.” PPIC measured statewide TK take-up at roughly 70% of eligible four-year-olds.
4. **Infant and toddler care is where unmet demand is largest, but ability to pay caps it.** Only about 1 in 8 infants and toddlers has a licensed spot, and 1,261 children five and under sat on the subsidized-care waitlist at a May 1, 2025 point-in-time pull (764 aged 0 to 2, 497 aged 3 to 5). The unmet need is real, but at the cost-covering price of $23,373 per year for center infant/toddler care, the demand that actually converts to paid enrollment is far smaller than raw need.
5. **Income heterogeneity splits the county into two distinct markets.** High-income coastal and Irvine ZIPs (Newport Beach 92661 at a $209,231 median household income, Irvine 92603 at $173,094, per U.S. Census Bureau ACS 2024 5-Year estimates, against Orange County overall at $116,289) support center premiums, while working-class ZIPs (Santa Ana, Anaheim 92805, Garden Grove, near $88,000 to $105,000) carry high care need but lower private ability to pay and lean on subsidy and family child care homes.

## Details

### Demographic Foundation: Current Resident Child Population

The starting point is the current count of children by single year of age, from the First 5 Orange County Child Care Landscape Update (Summer 2025), which draws on the ACS 2023 5-Year Public Use Microdata Sample.

|Age band                    |Children|Source basis            |
|----------------------------|--------|------------------------|
|0 through 1 (infant/toddler)|63,682  |ACS 2023 PUMS           |
|2 to 3                      |67,777  |ACS 2023 PUMS           |
|4 year olds                 |38,517  |ACS 2023 PUMS           |
|5 year olds                 |34,937  |ACS 2023 PUMS           |
|Total 0 to 5                |204,913 |Down ~9% since 2019/2020|
|(Memo) 2 to 5               |141,231 |ACS 2023 PUMS           |

The roughly 9% decline since 2019 to 2020 is the single most important forward signal: the base is already eroding before any projection.

### Births, Deaths, and Migration: The Cohort Engine

**Births.** Orange County resident births have declined for more than a decade. Historical California Department of Health Services data show 50,020 births in 1994, 46,980 in 2000, and 44,796 in 2002. By the early 2010s the level had fallen to roughly 37,000 to 38,000, and US Census Bureau Vintage estimates put 2023 at about 30,677. The authoritative integer series is the California Department of Public Health “Live Birth Profiles by County” final dataset (data.chhs.ca.gov), which I confirmed exists with final data through 2024 but could not extract integer-by-integer within tool limits. California statewide births fell to 400,108 in 2023  and, per National Center for Health Statistics final natality data via March of Dimes PeriStats, “In 2024, there were 402,075 live births in California” with a state fertility rate of 49.8 per 1,000 women ages 15 to 44, confirming the trend is regional and structural, not a one-year dip. I model the incoming age-0 cohort at about 30,500 declining roughly 2% per year.

**Deaths.** I age each cohort forward applying survival rates. The California infant mortality rate was 4.1 per 1,000 live births in 2023;   Orange County runs lower, averaging about 3.3 per 1,000 over 2010 to 2023.  Child mortality for ages 1 to 4 is far lower, on the order of 0.2 to 0.3 per 1,000 per year. I apply an age-0 survival of 0.9967 and ages 1 to 5 survival of about 0.9997 each. Mortality removes only a small fraction and is a minor term relative to births and migration.

**Migration.** Orange County had negative net domestic migration of about 22,400 in 2023 to 2024 (about 22,400 more people moving to other US counties than arriving), offset by positive net international migration of about 29,800, for net positive migration overall. The critical risk is that net international migration is collapsing: California statewide net international migration fell from 312,761 to 109,278 in the most recent Census Bureau Vintage 2025 estimate. Because international migration is what has been propping up the young-family and child cohort, its decline removes the main offset to the birth slide. I model net migration for the 0 to 5 cohort as roughly flat to slightly negative going forward.

**Five-year forward cohort projection (illustrative, wide bands).**

|Year       |Age 0 (births, survived)|Ages 1 to 5 (aged forward)|Total 0 to 5|Notes                     |
|-----------|------------------------|--------------------------|------------|--------------------------|
|2025 (base)|~30,400                 |~174,500                  |~204,900    |Matches landscape count   |
|2026       |~29,900                 |~171,000                  |~200,900    |Births down ~2%           |
|2027       |~29,300                 |~168,000                  |~197,300    |Migration offset weakening|
|2028       |~28,700                 |~165,500                  |~194,200    |                          |
|2029       |~28,100                 |~163,000                  |~191,100    |                          |
|2030       |~27,600                 |~161,000                  |~188,600    |About -8% vs base         |

The 0 to 5 stock drifts down roughly 1.5% to 2% per year, reaching about 188,000 to 191,000 by 2030, a decline near 8% over five years. Bands should be widened to plus or minus 4 percentage points given migration uncertainty.

### Seasonal (Monthly) View

Two seasonal layers reshape enrollable demand across the calendar year.

**Birth seasonality.** In the US and California, births cluster higher in late summer and early fall. Per CDC natality data, September has the highest average daily births (about 11,700 per day), followed by August (about 11,300) and July (about 11,100); FiveThirtyEight found 9 of the 10 most common birthdays from 1994 to 2014 fell in September, and February is the lowest birth month. This means the age-0 cohort entering the population swells in August through October. For infant care, which children typically enter around 3 to 6 months of age, this produces an enrollment-eligible infant bulge that hits roughly November through March.

**Enrollment seasonality.** Child care and preschool enrollment steps up sharply at the academic-year boundary in late August and September. Universal TK reinforces this: four-year-olds now exit paid preschool into free TK at that same September 1 boundary, so private providers face a recurring late-summer drop in their four-year-old book.

|Month     |Birth inflow (relative)                          |Paid-care enrollment / fill                   |Net effect on enrollable paid demand                |
|----------|-------------------------------------------------|----------------------------------------------|----------------------------------------------------|
|Jan to Mar|Moderate (late-summer cohort now infant-eligible)|High and stable (mid-year)                    |High infant demand, stable fill                     |
|Apr to Jun|Lower                                            |Stable, some pre-summer attrition             |Steady                                              |
|Jul to Aug|Rising sharply (peak births)                     |Trough then sharp step-up at academic boundary|Four-year-olds leave to TK; reshuffle               |
|Sep to Oct|Peak births                                      |Highest enrollment of the year                |Peak fill for 0 to 3; four-year-old segment depleted|
|Nov to Dec|Declining                                        |High, holiday softness                        |Strong infant pipeline forming                      |

Fill rates for a typical site therefore peak in September and October, soften slightly over the holidays, and the four-year-old line drops every September as TK pulls that cohort out.

### ZIP-Level Demand, Income, and Supply Matrix

Pure ZIP-level single-year-of-age and licensed-slot counts are sparse, so I group into income-defined ZIP clusters and present the funnel at that granularity. Median household incomes are ACS 2019 to 2023 / 2024 5-Year estimates.

|ZIP cluster (representative ZIPs)                                                     |Median HH income                       |Care-need profile                                                          |Dominant setting                       |Ability to pay center premium|
|--------------------------------------------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------|---------------------------------------|-----------------------------|
|Newport Beach coast (92661, 92657, 92625, 92660)                                      |$159,000 to $209,000 (92661 = $209,231)|Moderate child counts, high working-parent                                 |Center, premium private                |Very high                    |
|Irvine (92603, 92602, 92618, 92620)                                                   |$130,000 to $173,000 (92603 = $173,094)|High child counts, very high working-parent, large Asian foreign-born share|Center and large FCCH                  |High                         |
|South County (Mission Viejo, Laguna Niguel, Aliso Viejo)                              |$136,000 to $141,000                   |Moderate, family-heavy                                                     |Center and FCCH                        |High                         |
|North/Central working-class (Santa Ana 92701/92703/92704, Anaheim 92805, Garden Grove)|$88,000 to $105,000                    |Very high care need, high child density                                    |Family child care home, subsidy-reliant|Low; subsidy-dependent       |
|Mid-tier (Fullerton, Costa Mesa, Tustin, Huntington Beach)                            |$104,000 to $120,000                   |Mixed                                                                      |Mix of center and FCCH                 |Moderate                     |

The strategic implication carried forward: high-income clusters are center-premium markets where willingness to pay is the lever, while working-class clusters have the highest raw need but the demand that converts to private paid care is thin and the realistic model is family child care homes plus subsidy capture.

### Customer-Back Demand Funnel and Segmented TAM

I build the TAM from children, through care need, through paid-formal share, times price. Key anchors: First 5 OC reports that the share of California young children (under age 6) with all available parents in the workforce rose from 61% in 2019 to 68% in 2023, and that Orange County runs slightly higher, with the commission citing working-parent prevalence among OC families with young children. (A national First Five Years Fund 2025 California fact sheet cites a somewhat lower 64% statewide; I use the First 5 OC figure of 68% as the OC-specific anchor and widen bands to absorb the discrepancy.) Price anchors: family child care home about $58 per child per day blended (roughly $1,475 per month infant, $1,125 per month preschool); center about $75 per child per day blended (roughly $1,948 per month infant-toddler, $1,368 per month preschool); full-time year about 250 to 255 care days. These align with First 5 OC’s reported center averages of $23,373 per year for infant/toddler and $16,417 per year for preschool. 

**Funnel by age band (current, point estimates within wide bands):**

|Age band            |Children|Care need (×0.68)|Paid-formal share     |Children in paid care|Blended annual price|Segment revenue                            |
|--------------------|--------|-----------------|----------------------|---------------------|--------------------|-------------------------------------------|
|0 to 1              |63,682  |43,300           |~18% (capacity-capped)|~7,650               |~$21,700            |~$166M                                     |
|2 to 3              |67,777  |46,100           |~50%                  |~23,000              |~$15,800            |~$364M                                     |
|4                   |38,517  |26,200           |~22% (post-TK)        |~5,800               |~$15,800            |~$91M                                      |
|5                   |34,937  |23,800           |~5% (wraparound)      |small                |wraparound          |~$25M                                      |
|Core served paid TAM|        |                 |                      |                     |                    |~$0.65B to $0.95B (point ~$0.80B to $0.82B)|

**Total demand including unmet/waitlisted.** If formal paid penetration rose to meet a larger share of working-parent demand at current prices, the infant/toddler band alone would add roughly $140M to $150M and the 2 to 3 band another $100M to $120M, lifting total demand to roughly $1.0B to $1.4B, point estimate about $1.2B. This brackets the prior report’s $1.2B to $1.6B but revises the point modestly downward, because the declining birth cohort and the TK removal of the four-year-old paid segment both subtract from the forward ceiling.

**Latent upside band (unpaid family/friend/neighbor converting to paid licensed care).** A large share of infant and toddler care is currently provided by unpaid family, friends, and neighbors. If even a fraction converts to paid licensed care, this adds a separate upside band of roughly $0.3B to $0.6B, but conversion is gated by ability to pay, which is exactly why it has not happened at scale in working-class ZIPs.

**Segmented TAM by program bucket (current served, illustrative split):**

|Program bucket              |Capacity rule                                |Share of served revenue|Approx. served revenue|
|----------------------------|---------------------------------------------|-----------------------|----------------------|
|Small Family Child Care Home|Up to 8 children, no assistant               |~7%                    |~$55M to $60M         |
|Large Family Child Care Home|Up to 14 children, assistant required above 6|~5%                    |~$40M to $45M         |
|Center-based preschool      |Larger staffed facility                      |~88%                   |~$700M to $720M       |

California licensing defines a Small Family Child Care Home as up to 8 children with the provider as sole caregiver (no more than 2 infants in the 8-child configuration), and a Large Family Child Care Home as up to 12 (or 14 under specific age conditions) children, requiring a paid assistant whenever more than 6 children are present.

### Unit Economics and Businesses Supported

**Per-site revenue and cost structure:**

|Site type |Realistic fill |Day rate    |Care days|Gross revenue        |Cost notes                                                                                                                 |
|----------|---------------|------------|---------|---------------------|---------------------------------------------------------------------------------------------------------------------------|
|Small FCCH|~7 children    |~$58 blended|~250     |~$100,000            |Sole provider, no payroll; home costs; net margin high but provider wage is the residual                                   |
|Large FCCH|~12 children   |~$58 blended|~250     |~$174,000 to $177,000|Must staff a paid assistant above 6 children (~$35,000 to $45,000 fully loaded); net before owner pay ~$130,000 to $140,000|
|Center    |60 to 120 slots|~$75 blended|~250     |~$1.5M to $3M+       |Heavy payroll (multiple credentialed staff, director), lease, ratios; thin operating margins, typically 5% to 15%          |

**Businesses the demand can support (served TAM ÷ revenue per site):**

|Bucket       |Served revenue|Revenue per site |Demand-supported sites|Actual operating (Apr 2025)|
|-------------|--------------|-----------------|----------------------|---------------------------|
|Small FCCH   |~$57M         |~$100,000        |~570                  |combined 998 FCCHs         |
|Large FCCH   |~$42M         |~$175,000 (gross)|~240                  |combined 998 FCCHs         |
|FCCH subtotal|~$99M         |blended ~$135,000|~730                  |998 (down from 2019)       |
|Centers      |~$710M        |~$2.0M avg       |~355                  |881 (down from 2019)       |

The served-demand math supports roughly 730 family child care homes and 355 average-sized centers, against 998 and 881 actually operating. The apparent gap signals that many sites run below full fill (especially after TK pulled out four-year-olds) and that smaller-than-average centers are common. On total demand including unmet need, the supportable counts rise toward and modestly above the current operating base, concentrated in infant/toddler family child care homes. The actionable read: there is room for more infant/toddler home-based capacity where families can pay, but not a broad shortage of physical sites.

### Housing Reconciliation (Closing Check)

Only after the demand model does housing enter. Orange County has about 1,077,623 occupied housing units, roughly 61% single-family,  and about 680,000 single-family homes and townhomes qualify to host a licensed home, of which roughly 610,000 are eligible for a small license and roughly 440,000 for a large license. Against a demand model that supports on the order of 730 to 1,000 family child care homes, housing capacity exceeds demand by a factor of several hundred. Housing is therefore not the constraint, and any analysis that leads with it inverts the real logic. Demand, willingness to pay, and the shrinking child cohort are the ceiling.

### Five-Year Forward View

Combining the cohort projection with the TK shock: the 0 to 5 population falls about 8% by 2030, the four-year-old paid preschool segment stays structurally depressed under universal TK, and net international migration weakness removes the main offset to falling births. Real enrollable paid demand contracts roughly 8% to 12% over five years. Price inflation of roughly 3% to 5% per year (child care has been outpacing general inflation) keeps nominal TAM roughly flat to slightly up, but the number of paying children, the operative variable for site counts, declines. Infant/toddler care is the most resilient segment because TK does not touch it and unmet need is deepest there.

## Recommendations

1. **Target infant and toddler family child care homes in mid-to-high-income ZIPs first.** This is the one segment TK does not erode, where unmet need is deepest, and where ability to pay covers cost. Prioritize Irvine, South County, and mid-tier coastal clusters where median household income clears roughly $120,000. Benchmark to change the call: if a target ZIP shows fewer than one licensed infant slot per eight resident infants and median income above $120,000, it is a go.
2. **Do not build new four-year-old-dependent private preschool capacity.** Universal TK has permanently removed most of that demand. Any center pro forma that relies on full-pay four-year-olds should be rejected. Reorient center models toward infant/toddler and three-year-old rooms plus TK wraparound and extended-day care, which working TK parents still need and pay for.
3. **In working-class ZIPs, pursue subsidy-anchored family child care, not private-pay centers.** Santa Ana, Anaheim, and Garden Grove have the highest need but low private ability to pay. The viable model captures CSPP, CCTR, Head Start, and voucher revenue (over $320M flowing into the county across these programs) plus the 1,261-child waitlist. Build to subsidy reimbursement, not market price.
4. **Underwrite every site to a declining-cohort base case.** Assume the local 0 to 5 population falls about 2% per year and require fill-rate resilience to that. The threshold that should change the plan: if a submarket’s birth or under-5 count is falling faster than 2.5% per year and has no offsetting in-migration of young families, reduce planned capacity or shorten the payback assumption.
5. **Time launches and capacity adds to the September enrollment peak and the winter infant pipeline.** Open or expand ahead of the late-August academic boundary for two-to-three-year-old enrollment, and stage infant capacity for the November-to-March window when the late-summer birth cohort becomes care-eligible.

## Caveats

- The single largest uncertainty in the TAM is the paid-formal penetration rate by age, which is not directly observed; I used wide bands and capacity cross-checks, but the served point estimate could reasonably sit anywhere from $0.65B to $0.95B depending on how much subsidized care is counted as market revenue.
- The exact year-by-year Orange County resident birth series 2010 to 2024 exists in the CDPH “Live Birth Profiles by County” final file but could not be extracted integer-by-integer within tool limits; I relied on Census Vintage (30,677 for 2023), historical CDHS levels, and statewide CDPH/NCHS anchors (402,075 statewide for 2024). The direction and magnitude are well supported; specific annual integers should be confirmed against the CDPH file before publication.
- ZIP-level single-year-of-age and licensed-slot counts are sparse, so the ZIP matrix is grouped into income clusters. Treat the cluster funnel as directional, not precise per-ZIP.
- The working-parent care-need rate carries a source discrepancy (First 5 OC’s 68% statewide for 2023 versus First Five Years Fund’s 64%); I used 68% as the OC-specific anchor and widened bands accordingly.
- TK take-up is still ramping (about 70% statewide per PPIC); the share of four-year-olds remaining in paid private preschool may be higher than the 22% modeled in affluent ZIPs where families prefer private settings, which would lift the four-year-old segment modestly.
- Net international migration is the swing factor for the entire forward cohort and is changing rapidly; the five-year projection should be re-run when fresh Vintage estimates and any policy changes land.
- Price anchors blend full-time rates; part-day and part-week enrollment, common in preschool, would lower realized revenue per child below the full-time figures used.