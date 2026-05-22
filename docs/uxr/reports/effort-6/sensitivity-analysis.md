# sensitivity-analysis

Each of the three composite scores re-computed under ±30% perturbation of every input weight (renormalized to sum to 1). Max absolute rank delta across all 2N perturbations reported for each top-20 ZCTA.

**Stability buckets:** robust (|Δrank| ≤ 3) • moderate (≤ 8) • fragile (> 8).

## PM business sequencing score (top 20)

| Rank | ZCTA | City | Max Δrank | Worst perturbation | Stability |
|---|---|---|---|---|---|
| 1 | 98052 | Redmond | +0 |  | robust |
| 2 | 98109 | Seattle | +0 |  | robust |
| 3 | 98121 | Seattle | +3 | renter_sp+30% | robust |
| 4 | 98004 | Bellevue | +1 | renter_sp-30% | robust |
| 5 | 98101 | Seattle | +4 | renter_sp+30% | moderate |
| 6 | 98103 | Seattle | -2 | renter_sp+30% | robust |
| 7 | 98007 | Bellevue | +2 | lep_renter_tech-30% | robust |
| 8 | 98115 | Seattle | -3 | renter_sp+30% | robust |
| 9 | 98105 | Seattle | -2 | renter_sp+30% | robust |
| 10 | 98122 | Seattle | +2 | visa-30% | robust |
| 11 | 98133 | Seattle | +1 | renter_sp-30% | robust |
| 12 | 98125 | Seattle | -1 | renter_sp-30% | robust |
| 13 | 98118 | Seattle | -2 | visa-30% | robust |
| 14 | 98107 | Seattle | +0 |  | robust |
| 15 | 98116 | Seattle | +2 | renter_sp-30% | robust |
| 16 | 98144 | Seattle | +2 | renter_sp-30% | robust |
| 17 | 98119 | Seattle | -1 | renter_sp-30% | robust |
| 18 | 98102 | Seattle | -3 | renter_sp-30% | robust |
| 19 | 98117 | Seattle | +2 | renter_sp-30% | robust |
| 20 | 98033 | Kirkland | -5 | reg_complex-30% | moderate |

## Rental acquisition score (top 20)

| Rank | ZCTA | City | Max Δrank | Worst perturbation | Stability |
|---|---|---|---|---|---|
| 1 | 98074 | Sammamish | +0 |  | robust |
| 2 | 98075 | Sammamish | +1 | rtp+30% | robust |
| 3 | 98155 | Shoreline | +8 | rtp-30% | moderate |
| 4 | 98029 | Issaquah | +4 | school-30% | moderate |
| 5 | 98275 | Mukilteo | +5 | school+30% | moderate |
| 6 | 98059 | Renton | -3 | rent_growth+30% | robust |
| 7 | 98038 | Maple Valley | -2 | school-30% | robust |
| 8 | 98053 | Redmond | -4 | rtp-30% | moderate |
| 9 | 98006 | Bellevue | +5 | rtp+30% | moderate |
| 10 | 98012 | Bothell | -3 | school-30% | robust |
| 11 | 98027 | Issaquah | -2 | school+30% | robust |
| 12 | 98072 | Woodinville | -2 | school-30% | robust |
| 13 | 98040 | Mercer Island | +9 | school-30% | fragile |
| 14 | 98026 | Edmonds | +5 | rtp-30% | moderate |
| 15 | 98208 | Everett | +3 | school+30% | robust |
| 16 | 98065 | Snoqualmie | +8 | school-30% | moderate |
| 17 | 98021 | Bothell | +2 | school+30% | robust |
| 18 | 98052 | Redmond | +7 | school-30% | moderate |
| 19 | 98011 | Bothell | +3 | rtp-30% | robust |
| 20 | 98005 | Bellevue | +8 | school-30% | moderate |

## Daycare conversion score (top 20)

| Rank | ZCTA | City | Max Δrank | Worst perturbation | Stability |
|---|---|---|---|---|---|
| 1 | 98117 | Seattle | +1 | under5-30% | robust |
| 2 | 98074 | Sammamish | +3 | under5+30% | robust |
| 3 | 98116 | Seattle | +4 | under5-30% | moderate |
| 4 | 98012 | Bothell | +3 | under5+30% | robust |
| 5 | 98126 | Seattle | +5 | under5-30% | moderate |
| 6 | 98075 | Sammamish | +7 | under5+30% | moderate |
| 7 | 98107 | Seattle | +7 | under5-30% | moderate |
| 8 | 98103 | Seattle | +11 | under5-30% | fragile |
| 9 | 98115 | Seattle | +3 | school-30% | robust |
| 10 | 98118 | Seattle | +10 | under5-30% | fragile |
| 11 | 98199 | Seattle | +5 | gap+30% | moderate |
| 12 | 98136 | Seattle | +3 | under5-30% | robust |
| 13 | 98087 | Lynnwood | +5 | under5-30% | moderate |
| 14 | 98021 | Bothell | -5 | under5-30% | moderate |
| 15 | 98029 | Issaquah | -7 | under5-30% | moderate |
| 16 | 98024 | Fall City | +12 | gap-30% | fragile |
| 17 | 98052 | Redmond | -4 | under5-30% | moderate |
| 18 | 98039 | Medina | -12 | under5-30% | fragile |
| 19 | 98119 | Seattle | -5 | under5+30% | moderate |
| 20 | 98007 | Bellevue | +3 | under5-30% | robust |

## Summary

| Score | Robust | Moderate | Fragile |
|---|---|---|---|
| PM | 18 | 2 | 0 |
| Rental | 10 | 9 | 1 |
| Daycare | 6 | 10 | 4 |

Methodology: each component weight independently scaled by 0.7 and 1.3, weights renormalized to sum to 1.00, scores re-computed using identical normalized input arrays. Top-20 ZCTAs evaluated against the union of all 2×N scenarios; the worst-case Δrank is reported.