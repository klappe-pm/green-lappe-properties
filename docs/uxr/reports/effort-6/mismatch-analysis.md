# mismatch-analysis

Four mispricing/opportunity quadrants surfaced from the joined dataset. Each list cites the data columns that produced it.

## A. High-school, low-rent (buy signal)

Top-quartile school composite AND bottom-quartile 2BR rent. Often indicates structural under-pricing: school zone hasn't yet repriced rents, or rent comps are stale.

| ZCTA | City | School composite | Median 2BR rent | Rent-to-price |
|---|---|---|---|---|
| 98024 | Fall City | 89.0 | $1,970 | 0.217% |
| 98045 | North Bend | 89.0 | $1,970 | 0.230% |
| 98050 | Preston | 89.0 | $1,970 | 0.286% |
| 98025 | Hobart | 86.2 | $1,970 | 0.326% |
| 98051 | Ravensdale | 86.2 | $1,970 | 0.286% |

## B. Low-school, high-rent (avoid)

Bottom-quartile school composite AND top-quartile 2BR rent. Indicates rent over-pricing relative to family-tenant demand — vacancy + turnover risk.

| ZCTA | City | School composite | Median 2BR rent | Vacancy |
|---|---|---|---|---|
| (none) | | | | |

## C. High-LEP, low-PM-penetration (multilingual moat opportunity)

Above-median LEP, >3,000 small-portfolio renter-HH, AND PM-rank > 30. Indicates significant TAM where multilingual capability is a differentiator and PM penetration is likely thin.

| ZCTA | City | LEP % | Top language | Small-port renter HH | PM rank |
|---|---|---|---|---|---|
| 98108 | Seattle | 26.5% | Chinese (Mandarin/Cantonese) | 3,153 | 31 |
| 98032 | Kent | 22.8% | Spanish | 5,212 | 43 |
| 98168 | Tukwila | 22.5% | Spanish | 4,593 | 53 |
| 98188 | SeaTac | 22.3% | Spanish | 3,483 | 58 |
| 98003 | Federal Way | 21.4% | Spanish | 6,477 | 36 |
| 98030 | Kent | 21.1% | Spanish | 4,618 | 52 |
| 98204 | Everett | 20.7% | Spanish | 4,759 | 47 |
| 98056 | Renton | 19.7% | Spanish | 3,949 | 41 |
| 98031 | Kent | 18.8% | Spanish | 4,508 | 50 |
| 98178 | Renton | 18.5% | Vietnamese | 3,106 | 68 |
| 98198 | Des Moines | 18.5% | Spanish | 4,698 | 61 |
| 98146 | Burien | 17.2% | Spanish | 3,453 | 70 |
| 98002 | Auburn | 16.4% | Spanish | 5,100 | 63 |
| 98037 | Lynnwood | 15.9% | Spanish | 3,022 | 76 |
| 98208 | Everett | 15.2% | Spanish | 5,858 | 40 |
| 98001 | Auburn | 14.7% | Spanish | 4,208 | 66 |
| 98087 | Lynnwood | 14.3% | Spanish | 4,214 | 49 |
| 98023 | Federal Way | 14.1% | Spanish | 5,925 | 42 |
| 98036 | Lynnwood | 13.9% | Spanish | 3,955 | 60 |
| 98059 | Renton | 13.5% | Chinese (Mandarin/Cantonese) | 3,723 | 46 |

## D. High-rate-locked / low-ADU-velocity (untapped accidental-landlord supply)

Rate-locked owners >=55% AND jurisdiction 2024 ADU permits below the cross-ZIP median. Suggests the supply-side conversion is *underway demographically* but *not yet showing in permit data* — pipeline catalysts (jurisdictional code reform, education, contractor capacity) may unlock.

| ZCTA | City | Rate-locked % | ADU permits 2024 (jur) | Population CAGR | Tech reloc proxy |
|---|---|---|---|---|---|
| 98039 | Medina | 82% | 0 | 0.01% | 0.274 |
| 98040 | Mercer Island | 78% | 20 | 0.47% | 0.193 |
| 98024 | Fall City | 70% | 0 | -0.03% | 0.054 |
| 98072 | Woodinville | 70% | 24 | 1.49% | 0.133 |
| 98077 | Woodinville | 70% | 0 | 1.49% | 0.101 |
| 98014 | Carnation | 68% | 0 | 2.08% | 0.038 |
| 98028 | Kenmore | 68% | 32 | 1.09% | 0.127 |
| 98045 | North Bend | 68% | 0 | 1.72% | 0.040 |
| 98065 | Snoqualmie | 68% | 14 | 1.44% | 0.082 |
| 98019 | Duvall | 66% | 0 | 0.91% | 0.088 |
| 98070 | Vashon | 66% | 0 | -0.03% | 0.030 |
| 98010 | Black Diamond | 65% | 0 | 1.58% | 0.079 |
| 98012 | Bothell | 64% | 0 | 1.09% | 0.164 |
| 98025 | Hobart | 64% | 0 | 0.00% | 0.000 |
| 98050 | Preston | 64% | 0 | 0.00% | 0.000 |
| 98051 | Ravensdale | 64% | 0 | -0.03% | 0.016 |
| 98275 | Mukilteo | 64% | 26 | 0.47% | 0.118 |
| 98296 | Snohomish | 64% | 0 | 0.91% | 0.061 |
| 98166 | Burien | 62% | 32 | 0.92% | 0.060 |
| 98256 | Index | 62% | 0 | -0.50% | 0.006 |

## Methodology

- Quartiles computed within the 107-ZCTA in-scope universe.
- All thresholds are documented in the script `_scripts/build_deliverables.py`.
