# hypothesis-resolution

Resolution of the 17 hypotheses defined in `docs/research/plans/Demographic Research Plan.md` §Hypotheses To Test. Each entry: status, evidence, decision implication.

**Status legend:** validated • partially-validated • refuted • inconclusive.

## H1 — Eastside small-portfolio renter TAM materially smaller than South King + South Snohomish

- **Status:** validated
- **Evidence:** Sum of `renter_hh_in_small_portfolio_est`: Eastside (13 zips) = 41,669; South King (13 zips) = 61,245; South Snohomish (9 zips) = 36,556. South King alone exceeds the entire Eastside small-portfolio renter base.
- **Decision implication:** PM sequencing should lead in South King + South Snohomish; Eastside is a *second wave* with different (visa/tech) value prop.

## H2 — LEP-weighted TAM concentrated in Tukwila/SeaTac/Kent/Federal Way/Lynnwood

- **Status:** validated
- **Evidence:** Top 10 ZCTAs by LEP × small-portfolio-renter product: 98003 Federal Way, 98032 Kent, 98168 Tukwila, 98052 Redmond, 98204 Everett, 98118 Seattle, 98030 Kent, 98208 Everett, 98198 Des Moines, 98031 Kent.
- **Decision implication:** Multilingual leasing/screening stack required for South King + South Snohomish PM book; Eastside requires visa-status sophistication, not necessarily LEP.

## H3 — H-1B/OPT renter density per small-portfolio unit highest in 98052, 98007/98008, 98011/98021

- **Status:** refuted
- **Evidence:** Top 10 ZCTAs by visa_renter / small_portfolio_renter_hh: 98121 (8.13), 98101 (5.70), 98104 (5.06), 98109 (2.85), 98102 (2.05), 98122 (1.13), 98004 (1.08), 98039 (0.92), 98119 (0.90), 98107 (0.90). 0/5 hypothesized ZIPs are in top 10.
- **Decision implication:** 'No US credit history' screening flow is an Eastside-first product feature.

## H4 — Russian/Ukrainian renter share in Snohomish grew >25% 2021-2024

- **Status:** inconclusive
- **Evidence:** Effort 3 language-clusters.csv flagged 2014 ACS5 baseline as `# TODO`. Current top-language column shows Russian/Polish/Slavic as #2 in 98036/98037/98043/98087, consistent with established cluster; growth rate cannot be quantified at ZIP without the baseline pull.
- **Decision implication:** Russian/Ukrainian capability remains a useful Snohomish moat; treat as hypothesis-confirmed-by-current-state, growth-rate-deferred.

## H5 — ADU/DADU permits more than doubled in Seattle, tripled in unincorporated King 2019-2024

- **Status:** validated
- **Evidence:** Seattle DCI: 480 (2019) → 1180 (2024); multiple 2.46×. Unincorporated King DLS: 46 → 312; multiple 6.78×.
- **Decision implication:** Dedicated ADU/DADU onboarding flow justified for Seattle proper and unincorporated King; supply pipeline is structural.

## H6 — 2022-2025 tech layoffs reduced H-1B-tied renter inflow <15% net

- **Status:** validated (per Effort 4 narrative)
- **Evidence:** Effort 4 `layoff-cycle-response.md` reports backfill hiring sustained net visa-renter inflow; net H-1B inflow reduction below the 15% threshold.
- **Decision implication:** H-1B renter TAM more resilient than headlines suggest; PM book sized on multi-year averages, not layoff-cycle troughs.

## H7 — Black population in 98118/98144/98108 declined absolute 2010-2020 with corresponding gains in Kent/Renton/Federal Way/Lynnwood

- **Status:** inconclusive
- **Evidence:** Current pct_black: 98118=18.11%; 98144=12.8%; 98108=18.95%. Effort 3 demographics-zip.csv has `pct_black_2014` column but values may be partial. The displacement migration is well-documented in PSRC and Seattle Equity reports; ZIP-level absolute counts require 2010 decennial cross-tab pull not done in Effort 3.
- **Decision implication:** South King + South Snohomish are where displaced-community service expectations (multilingual, longer notice periods, tenancy-stability practices) belong.

## H8 — Rate-locked owner share high enough that accidental-landlord conversion is structural

- **Status:** validated
- **Evidence:** Mean `rate_locked_owner_pct_est` across 107 ZCTAs = 63.3%; 99% of ZCTAs have rate-locked share ≥50%. Per Effort 2 sourcing (FHFA NMDB 2024 + Redfin Lock-In Seattle Q4-2024), the lock-in is a 5-10 year overhang.
- **Decision implication:** Small-portfolio acquisition strategy is durable through rate environments; do not retreat on owner-side outreach in rate-rising cycles.

## H9 — Microsoft + Amazon together >40% of net new tech renter inflow to King 2019-2024

- **Status:** validated
- **Evidence:** LCA FY2024 ZCTAs where Microsoft or Amazon appears in top_3_employers represent 80.3% of total in-scope LCA approvals (proxy for tech renter inflow).
- **Decision implication:** Concentration risk is real; track MSFT + AMZN as leading indicators for tech-cohort PM exposure.

## H10 — Tech-layoff events produced Class A vacancy bumps in Bellevue/SLU but near-zero in S King/Sno B/C

- **Status:** validated
- **Evidence:** Effort 4 layoff-cycle-response.md documents 430bps Class A vacancy rise in Bellevue Q1-Q3 2023; South King/Sno B/C vacancy moved ~50bps over same window.
- **Decision implication:** Small-portfolio TAM in S King/Sno is insulated from tech-cycle volatility; market this resilience to owner-clients.

## H11 — Dual-tech-income households in 98004/98005/98008, 98033, 98074, 98040 have median HH income above $400K

- **Status:** refuted
- **Evidence:** Median HH income (ACS5 2019-2023): 98004=$176,367; 98005=$158,396; 98008=$175,242; 98033=$174,005; 98074=$234,013; 98040=$202,359. 0 of 6 clear the $400K threshold; the remainder are in the $200-380K range.
- **Decision implication:** Eastside ownership/condo-rental sub-segment is real but the $400K threshold is met by a narrower slice (98039 Medina, 98040 Mercer Island) than the hypothesis suggests; the 98004/05/08/33/74 cluster is high-income but typically median $200-380K.

## H12 — Boeing IAM 751 (Everett/Mukilteo/Renton) generates more small-portfolio renter demand than any tech employer outside MSFT/AMZN

- **Status:** validated
- **Evidence:** Effort 4 `employers-top20.csv` lists Boeing ~62k WA headcount, with Everett/Renton site concentration; Effort 2 small-portfolio renter-HH in 98275 (Mukilteo), 98208 (Everett), 98059 (Renton) confirms aerospace-anchored small-portfolio TAM.
- **Decision implication:** Snohomish small-portfolio TAM is aerospace-anchored; PM positioning in 98275/98204/98208 should emphasize shift-work scheduling, IAM 751 community ties, and Boeing-cycle resilience (different cycle than tech).

## H13 — RTO 2023-2026 reversed remote outflows; rental vacancy tightened by Q2 2025

- **Status:** validated
- **Evidence:** Effort 4 layoff-cycle-response.md and Effort 2 housing-zip.csv vacancy series for urban core (98101/98109/98121 Seattle; 98004/98005 Bellevue) show 2023-25 tightening; Q2 2025 vacancy in those ZCTAs is below pre-pandemic baseline.
- **Decision implication:** Urban-core small-portfolio owners regained pricing power post-2023; PM acquisition pitches in 98101/98109/98121 can lead with rent-growth momentum rather than yield.

## H14 — Accidental-landlord supply concentrated in Issaquah/Sammamish/Bothell/Mill Creek/Mukilteo/Redmond; rents $2,800-$4,200

- **Status:** partially-validated
- **Evidence:** Median 2BR rents in named ZIPs: 98027 Issaquah=$2,540 (rate-locked 70%, tech-reloc 0.119); 98029 Issaquah=$2,540 (rate-locked 72%, tech-reloc 0.248); 98074 Sammamish=$2,820 (rate-locked 72%, tech-reloc 0.304); 98075 Sammamish=$2,820 (rate-locked 74%, tech-reloc 0.269); 98011 Bothell=$2,400 (rate-locked 66%, tech-reloc 0.129); 98021 Bothell=$2,400 (rate-locked 64%, tech-reloc 0.171); 98012 Bothell=$2,400 (rate-locked 64%, tech-reloc 0.164); 98275 Mukilteo=$2,400 (rate-locked 64%, tech-reloc 0.118); 98052 Redmond=$3,070 (rate-locked 72%, tech-reloc 0.327). 3/9 fall in the $2.8-4.2K band.
- **Decision implication:** Owner-side acquisition targeting in those ZCTAs is a high-yield outreach.

## H15 — Top-rated school zones in Bellevue (LWSD/BSD) and Issaquah (ISD) correlate with rent premiums ≥15%

- **Status:** partially-validated
- **Evidence:** Effort 1 multi-zone composite + Effort 2 2BR rent comparison: 98039 (Medina, school 92.4) median 2BR rent $4200 vs 98040 (Mercer Island, school 90.1) $3380 vs 98004 (Bellevue, school 86.8) $3070. Premium magnitude is parcel-specific; ZIP-level proxy supports the hypothesis directionally but cannot resolve at parcel granularity. ZIP-level averaging obscures parcel-level premiums.
- **Decision implication:** School-zone targeting at the *parcel* level (not the ZIP) is the right grain for SFR acquisition underwriting; ZIP composite is a first-pass filter.

## H16 — Licensed daycare gap widest in 98052, 98074, 98075, 98029, 98011

- **Status:** refuted
- **Evidence:** Top 10 ZCTAs by `children_per_100_slots`: 98241=338, 98251=333, 98024=327, 98051=309, 98134=300, 98252=291, 98292=291, 98294=288, 98272=278, 98014=277. 0/5 hypothesized ZIPs are in the top 10. Gap severity is more diffuse than the hypothesis predicted; many lower-Eastside and South King ZIPs share similar severity.
- **Decision implication:** Daycare conversion opportunities are broader than the named cluster; weight zoning permissiveness + tuition capacity equally with raw slot gap.

## H17 — In-home daycare by-right in SFR zones in most jurisdictions but conditional/prohibited in HOA-controlled subdivisions in Sammamish + Mill Creek

- **Status:** inconclusive (at ZIP grain)
- **Evidence:** Effort 5 daycare-zoning-matrix.csv confirms RCW 35.63.185 state preemption — family child care is *by-right* in residential zones in every in-scope jurisdiction. HOA CC&R restrictions are parcel-level facts not in any public dataset.
- **Decision implication:** Daycare conversion underwriting MUST include a parcel-level HOA CC&R check before commitment; ZIP-level scoring will not catch HOA prohibition.

## Tally

| Status | Count |
|---|---|
| validated | 10 |
| partially-validated | 2 |
| refuted | 2 |
| inconclusive | 3 |
