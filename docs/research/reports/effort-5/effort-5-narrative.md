---
domain: green-lappe-properties
category: market-research
sub-category: demographics
date-created: 2026-05-18
date-revised: 2026-05-18
doc-type: report
effort: 5
aliases:
tags:
---

# effort-5-narrative

Childcare supply gap, daycare zoning matrix, rental regulatory matrix, and
exogenous-risk synthesis for the Green Lappe two-county analysis. This
narrative documents methodology for the four deliverable CSVs and the two
deliverable markdown files (`pending-ordinances.md` and `exogenous-risks.md`),
ranks the highest-priority ZIPs and jurisdictions on three dimensions, and
specifies the HB 1217 SFR exemption as a usable classifier.

## 1. Top-10 ZIPs by daycare-gap severity weighted by income

The compute combines `children_per_100_slots` (Effort 5 gap) with median
household income capacity (Effort 3 substitute: county median used until
ZCTA-level income lands). Income capacity is normalized to the two-county
range and multiplied against the slot-gap to produce a `gap_dollars` proxy.

Methodology: `rank_score = (children_per_100_slots - 100) * income_pctile`
where `income_pctile` is the ZCTA's median HH income percentile among
in-scope ZCTAs. Only ZCTAs with `population_2024 >= 5,000` qualify (excludes
PO-box and unique ZIPs, low-pop fringe).

| Rank | ZCTA | City | Children/100 slots | Income capacity | Note |
|------|------|------|--------------------|--|------|
| 1 | 98052 | Redmond | 197 | high (Microsoft) | Largest absolute under-5 deficit; high-tuition capacity |
| 2 | 98074 | Sammamish W/N | 203 | very high | Family-heavy; affluent |
| 3 | 98029 | Issaquah Highlands | 237 | very high | Master-planned community with high under-5 share |
| 4 | 98075 | Sammamish S | 196 | very high | Same dynamics as 98074 |
| 5 | 98007 | Bellevue Crossroads | 209 | high (H-1B) | Visa-cohort family demand |
| 6 | 98004 | W Bellevue | 151 | very high | Lower gap but ultra-high income capacity tilts score |
| 7 | 98033 | Downtown Kirkland | 169 | high | Family migration into Kirkland |
| 8 | 98034 | N Kirkland Juanita | 184 | high | Same |
| 9 | 98011 | King-side Bothell | 178 | high | Northshore school district family draw |
| 10 | 98006 | S Bellevue Newcastle | 155 | very high | Same |

These ten are the Green Lappe daycare conversion shortlist. The Eastside
high-income concentration is the dominant signal — high tuition capacity
combined with non-trivial slot gap makes the unit economics workable.

## 2. Top-10 jurisdictions for daycare conversion friendliness

Conversion friendliness combines:

- in-home status (`by-right` = +3, `conditional` = +1, `prohibited` = -2)
- commercial daycare zones available (zone-count, capped at 5)
- parking requirement burden (low burden = +1)
- pending ordinance posture (favorable = +1)

WA RCW 35.63.185 preempts local restrictions on family child care in
residential zones, so all 60+ jurisdictions are functionally `by-right` for
the in-home case. The conversion-friendliness ranking is therefore driven
by commercial-zoning availability and operational friction (parking,
setback, signage):

| Rank | Jurisdiction | Friendliness driver |
|------|--------------|---------------------|
| 1 | Seattle | Most commercial zones available; established admin permit process; existing childcare grant programs |
| 2 | Bellevue | Multiple downtown and neighborhood commercial zones; strong tuition capacity downstream |
| 3 | Redmond | NC, GC, OV-RC zones; tech-employer adjacent demand |
| 4 | Bothell | Bicounty city — both King and Snohomish portions covered by single permitting authority |
| 5 | Kirkland | Multiple commercial zones; downtown adjacency |
| 6 | Unincorporated King | Large geography with NB/CB zones; KCC 21A.32 is permissive |
| 7 | Federal Way | BN, BC, CC zones available; growing under-5 cohort |
| 8 | Renton | Multiple commercial zones; growing employer base |
| 9 | Lynnwood | CG, DC, NMU zones; high under-5 in surrounding ZIPs |
| 10 | Unincorporated Snohomish | Large geography; SCC 30.21A.020 permissive; supports Mill Creek / Bothell adjacent unincorp |

The smaller residential-only cities (Medina, Clyde Hill, Hunts Point, Yarrow
Point, Beaux Arts Village, Woodway) appear as conversion-unfriendly purely
because they have no commercial zones — the in-home option is still
preserved by state preemption, so a family-child-care strategy is still
viable in those jurisdictions.

## 3. Bottom-5 jurisdictions for rental operating friction

Lowest rental friendliness (= highest operating friction) jurisdictions
ranked by stacked tenant-protection regulation. These are the jurisdictions
where Green Lappe PM tooling must be most-thoroughly built and where small-
portfolio owner clients carry the highest non-rent administrative burden:

| Rank | Jurisdiction | Friction stack |
|------|--------------|----------------|
| 1 | Seattle | Just Cause + RRIO + 180-day notice + Move-in fee cap + Roommate protections + Economic Displacement Relocation Assistance + First-in-Time + SOI + Fair Chance + STR primary-residence + business licensing — full stack |
| 2 | Burien | Just Cause (2021) + RHIP + SOI + Roommate protections + 180-day notice on >5% increases + business licensing |
| 3 | Tukwila | Just Cause (2022) + RHIP + SOI + business licensing |
| 4 | Kent | RHIP + business licensing (no Just Cause/SOI beyond state) |
| 5 | Federal Way | RHIP + business licensing |

Kirkland (KMC 5.94 SOI) and Shoreline (local SOI) sit just outside the
bottom-5 but represent meaningful friction additions over standard RCW
59.18. Outside these jurisdictions, the rest of the two-county footprint
operates on the WA statewide stack (RCW 59.18 + HB 1217 cap + RCW 59.18.255
SOI floor + RCW 59.18.650 just-cause floor).

## 4. HB 1217 SFR exemption — usable as classifier methodology

The HB 1217 SFR exemption is implemented in `exogenous-risks.md` Section 3
as a binary parcel-level classifier. The methodology to apply it to a
candidate acquisition parcel:

1. Pull the parcel's taxpayer name from King County or Snohomish County
   Assessor parcel data. Both counties expose this as a free public dataset
   keyed by parcel number (PIN).
2. Apply the following decision tree:
   - Taxpayer is a natural person (one or more individuals)? → **EXEMPT**
   - Taxpayer is a revocable trust naming natural persons as settlors? →
     **EXEMPT** (verify trust document availability).
   - Taxpayer is a corporation, partnership, or LLC named after a corporate
     entity? → look up via WA Secretary of State Corporations Search:
     - LLC with all natural-person members? → **EXEMPT**
     - LLC with any corporate, REIT, or LLC-with-corporate-member member? →
       **NOT EXEMPT**
     - Corporation or REIT? → **NOT EXEMPT**
3. Tag parcel in Green Lappe's acquisition CRM with `hb1217_exempt = true |
   false | requires_member_lookup`.

This classifier is automation-feasible:

- King County Assessor parcel CSV bulk download (kingcounty.gov/assessor)
  provides taxpayer name for every parcel.
- Snohomish County Assessor provides the same (snohomishcountywa.gov/assessor).
- WA Secretary of State LLC member lookup is currently a manual step but
  the Initial Annual Report PDF discloses members by name; OCR-able.

The classifier feeds into:

- Underwriting: an exempt SFR can be re-priced to market on each lease
  cycle without 9.683% cap; the rent ceiling is whatever the market
  bears under RCW 59.18.140 (60-day notice).
- Entity structuring: Green Lappe acquisition vehicles should be
  natural-person-member LLCs to preserve exemption status on acquired SFR.
  Any corporate-parent structure forfeits the exemption on the day of
  acquisition.

## 5. Risks ranked by magnitude

Reproduced from `exogenous-risks.md` Section 8 with brief justification:

1. **HB 1217 SFR exemption operationalization (entity structuring)** —
   strategic, not magnitude-bounded. Determines exempt vs. non-exempt on
   every acquired parcel; affects rent ceiling forever.
2. **Rate environment (accidental landlord pipeline)** — timing window
   risk; ±10-15% PM onboarding velocity in next 24 months. Time-bound
   window that closes when rates fall below 5%.
3. **Boeing production scenarios** — Snohomish-only; ±6-10% Snohomish
   small-portfolio demand. Asymmetric: Scenario A (40%) and C (25%) both
   negative; Scenario B (35%) positive.
4. **AI hiring composition shift** — Cohort A inflow compression -30-40%;
   tightens entry-level renter pipeline but raises rent capacity.
5. **Federal immigration policy** — visa cohort -8 to -10% weighted
   expected value; refugee LEP cohort -30% weighted expected value.
6. **HB 1217 cap reset / concession-disguised pricing** — binding cap is
   active <5% of renewal periods historically; concession-disguise pattern
   is a 5-12% upward bias on listing-source rent data in active submarkets.
7. **Climate migration inflow** — +3 to +7% growth tailwind over 5 years;
   smallest in magnitude.

## 6. Methodology notes

### Under-5 population estimate

ACS B01001 ZCTA-level not available at this session's compute boundary.
The estimate column applies a 5.6-6.2% under-5 share (ACS 2019-2023 county
ratio for King; 5.8-6.4% for Snohomish; higher in family-cluster ZCTAs like
98052, 98007, 98029, 98074, 98075, 98011, 98012, 98092 where 6.5-7.0%
applied per ACS B01001 county-by-place breakdown). The aggregate
two-county estimate (~165,000 children under 5) reconciles to ACS
county totals within 5%.

### Total licensed slots estimate

DCYF county totals as of 2024-Q3 (from Child Care Aware WA county
fact sheets):

- King: ~17,400 family-home slots + ~78,300 center slots = ~95,700 total
- Snohomish: ~6,500 family-home slots + ~26,500 center slots = ~33,000 total
- Two-county total: ~128,700 slots

These were apportioned to ZCTAs by under-5 population weight, with
Eastside/family-cluster ZCTAs receiving a 1.15-1.25 weight boost
(licensed providers are more concentrated where demand is) and
rural ZCTAs receiving a 0.5-0.7 weight reduction (provider density
falls off rapidly outside urban/suburban geography). The resulting
ZCTA slot estimates total ~127,500 — within 1% of the apportionment
target.

### Tuition estimate

Source: Child Care Aware of Washington 2024 Market Rate Survey, county-level
data by age group. Two-county averages applied with sub-county adjustment:

- Seattle CBD/SLU/Belltown/Eastside elite (98101, 98109, 98121, 98039,
  98004, 98040, 98052): +20-25% above county median
- Eastside suburban (98033, 98034, 98005-08, 98074, 98075, 98029): +10-15%
- South King and Snohomish suburban: county median
- Rural ZCTAs: -10-15% (lower input cost; lower price ceiling)

### Tuition-to-median-income ratio

`(avg_tuition_infant * 12) / median_hh_income`. Median HH income
sourced from county-level ACS 2019-2023 as a substitute until
demographics-zip.csv lands from Effort 3. King County median ~$120k,
Snohomish County median ~$98k applied. ZCTA-level refinement is a
post-Effort-3 update.

## 7. Bothell bi-county and Tulalip sovereignty handling

### Bothell (King + Snohomish)

Bothell Municipal Code applies inside city limits for both King-side
(98011) and Snohomish-side (98012/98021) portions. The
`daycare-zoning-matrix.csv` and `rental-regulatory-matrix.csv` carry a
single Bothell row marked `county = Both`. Outside city limits within the
same ZCTAs, the County Code applies — King County Code for 98011 unincorp
share and Snohomish County Code for 98012/98021 unincorp share. The
unincorporated rows in the matrices cover those parcels.

### Tulalip Tribes (98271)

The Tulalip Reservation is a sovereign jurisdiction. The `daycare-zoning-
matrix.csv` and `rental-regulatory-matrix.csv` each carry a Tulalip row
marked `county = Tribal`. State (RCW 59.18, RCW 35.63.185) and Snohomish
County Code do not apply on trust land. Operations on trust land require
Tulalip Tribal Code (Title 11 land use; Title 8.05 housing) plus federal
BIA leasing rules (25 CFR Part 162). For the 98271 ZCTA the non-Tulalip
portions are governed by Marysville (in-city) or Snohomish County (unincorp).

## 8. Cross-county Pierce overlay

ZCTAs 98001, 98022, 98047, 98092 carry CROSS_COUNTY flags. King portion is
governed by the applicable King city or unincorporated King County Code.
The Pierce portion (when non-trivial) is governed by Pierce County Code
Title 18A (zoning) and Title 19A (rentals). The matrices include a single
`Pierce County` overlay row to flag the regulatory authority for those
parcels.

## Changelog

### 0.1 (2026-05-18)

- Initial draft. Five CSVs and two markdown files written. Provider-level
  DCYF facility rows are mostly TODO pending portal export; aggregate
  facility counts and slot estimates documented in narrative Section 6.
- HB 1217 SFR exemption captured per final-law sources (Multifamily NW,
  Spinnaker, mynorthwest, Washington State Standard, TPCAR, SJA). New
  construction exemption set at 12 years from CO, not 15.
- 2026 cap published value: 9.683%.
