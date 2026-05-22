# dual-use-shortlist

ZCTAs that rank top-25 on BOTH rental-acquisition AND daycare-conversion. Dual-use score is the geometric mean of rental and daycare component scores. Lead-use recommendation given per ZIP.

Total dual-use ZIPs: **7**.

| Dual-rank | ZCTA | City | County | Rental rank | Daycare rank | Dual score | Lead use | Rationale |
|---|---|---|---|---|---|---|---|---|
| 1 | 98074 | Sammamish | King | 1 | 2 | 66.44 | Rental | Rental score materially higher; convert daycare opportunistically as parcel-level upside. |
| 2 | 98075 | Sammamish | King | 2 | 6 | 64.47 | Rental | Rental score materially higher; convert daycare opportunistically as parcel-level upside. |
| 3 | 98012 | Bothell | Snohomish | 10 | 4 | 62.61 | Rental | Rental score materially higher; convert daycare opportunistically as parcel-level upside. |
| 4 | 98029 | Issaquah | King | 4 | 15 | 61.35 | Rental | Rental score materially higher; convert daycare opportunistically as parcel-level upside. |
| 5 | 98021 | Bothell | Snohomish | 17 | 14 | 59.5 | Rental | Rental score materially higher; convert daycare opportunistically as parcel-level upside. |
| 8 | 98052 | Redmond | King | 18 | 17 | 58.74 | Rental | Rental score materially higher; convert daycare opportunistically as parcel-level upside. |
| 14 | 98077 | Woodinville | King | 21 | 25 | 56.87 | Rental | Rental score materially higher; convert daycare opportunistically as parcel-level upside. |

## Methodology

- Cutoff: top-25 per component (rental_rank <= 25 AND daycare_rank <= 25).
- Dual-use score = sqrt(rental_score × daycare_score). Penalizes lopsided scores.
- Lead-use recommendation thresholds: |rental_score - daycare_score| > 5 picks the higher; otherwise 'Either'.
- Dual-use score is a shortlist filter, not a primary ranking (per prompt directive).
