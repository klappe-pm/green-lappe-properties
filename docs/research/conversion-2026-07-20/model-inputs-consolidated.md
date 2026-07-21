# model-inputs-consolidated

Working inputs register for the Green-Lappe use-of-asset market analysis. Sources: recovered repo research (git 47b51ac~1), trust-documents vault, harness research brief, agent digests 2026-07-20. Type tags: FACT (sourced, on-disk), MODELED (derived in prior research), ASSUMPTION (prior research, unvalidated), SEARCH (pending live web research).

## Scope

Options: A = third-party rental PM business; B = large family child care home conversion; C = in-home assisted care (STUB). Markets in order: CA (Orange, San Diego, Riverside, Los Angeles); then WA (Snohomish, King). Each county individual + blended. 10-yr NPV horizon; 60-month operating model; labor priced and at $0 side by side.

## Calibration asset (FACT, trust-documents)

4632 146th Pl SE, Bothell WA 98012 (Snohomish). 4bd/2.5ba, 2,250 sqft, panhandle greenbelt lot. Bought $610,000 (2021). Mortgage $485,000 @ 2.625% (2022 refi), PI $2,250/mo ($27,000/yr). Value est $1,000,000. Equity $515,000. Tax $7,500/yr, insurance $1,900/yr (Steadily). Variable opex 6% of gross. Target rent $3,900/mo (comps $1.26-1.63/sqft; subject $1.73 premium). Net CF +$633/mo at $3,900. Cap rate 3.46%. Sell-now net after-tax $382,600; hold-vs-sell 5-yr advantage +$263K. NOTE: earlier v3 report used 2.3%/$1,866-mo; superseded by 2.625%/$2,250 in final report + xlsx. Known defect: 98012 xlsx Amortization sheet circular-formula explosion corrupts Sell Analysis hold-vs-sell mortgage rows; markdown tables are the good copy.

## WA option A inputs (from recovered research)

- Small-owner units: King 228,000 / Snohomish 74,000 / combined 302,000 (MODELED, RHFS shares x ACS; alt narrow estimate 180-200K).
- Rent roll: $7.64B combined ($5.88B K / $1.75B S). Weighted rent King $2,150, Sno $1,975; SFR King $2,950, Sno $2,650 (MODELED 2025).
- TAM @10% fee: $763.6M combined (K $588M / S $175M). Greenfield (78% self-managed) $595.6M. Leasing turnover TAM $186M. Practical served market $219M (K $185M / S $34M). King SAM 56,000 doors / $216M.
- SOM scenarios: bootstrapped Y5 400 doors/$1.5M; funded 1,800-2,500/$7-9.6M; M&A 3,500/$13.5M. GPM base case: Y1 5 doors to Y5 200 doors, $847K rev, EBITDA +$329K Y5, contribution-negative Y1-Y2 (-$13K/-$14K).
- Fees: $3,850/door/yr King, $3,400 Sno, $3,650 Y3 blend. Mgmt 8-12%; leasing 50-100% of month (model 50%); renewal $250; setup $295. GPM website pricing: 9% + 60% leasing + 0 markup.
- Turnover SFR 25-35% (Sno 28%); tenancy 2.5-3.5 yr; vacancy King 3.6%, 98012 ~2.7%; DOM 18-45 days.
- CAC: owner $1,500-5,000 ($0 Y1 warm network, $500 Y2, $1,500 Y3+); renter $200-800 (model $400). Referral CAC <30% of paid.
- Ops: direct $750/door/yr Y1-2, $600 Y3+; fixed $30K/45K/70K/120K/220K Y1-Y5. Doors/PM 150-350. EBITDA benchmark 15-20%. Staffing triggers: bookkeeper 25, maint coord 50, leasing 75, 2nd broker 100, controller 150, ops mgr 200.
- Startup: $50-95K one-time + $36-65K/yr; DB hire adds $80-150K. Firm license $304. E&O $1M/$2M, GL $1M, cyber $1M.
- Regulatory: RCW 18.85 (PM = brokerage; DB needs 3yr + 90hr + exam; Megan's DB status OPEN QUESTION). Trust acct WAC 308-124E-105. HB 1217 cap 2026 = 9.683%; SFR natural-person exemption INCLUDED in final law; new-construction exempt 12 yr.
- Benchmarks: renewal 60-75%; delinquency <3%; collection 92-97%; eviction <1/100; LTV:CAC 3:1 min / 5:1 healthy; payback <12mo.

## WA option B inputs (FCC wedge, from recovered research)

- WA DCYF Licensed Family Home: up to 12 children, provider resides, residential zoning preserved. RCW 35.63.185 preempts city restriction (by-right); HOA CC&Rs binding constraint (H17).
- FCC economics (ASSUMPTION, flagged illustrative): standard lease $36-54K/yr; FCC lease $54-72K; FCC + services fee $84-108K (services 10-15% of tuition). Conversion capex $3-10K light / $15-40K full. Revenue floor = residential rent if provider vacates.
- Slot gaps (kids/100 slots): 98012 = 241; Eastside 151-237; two-county supply ~128,700 slots vs ~165,000 under-5.
- Infant tuition $2,300 (98012) to $2,750/mo (Seattle); tuition/income 0.19-0.27.
- Daycare-conversion top ZIPs: 98117, 98074, 98116, 98012, 98126, 98075, 98107, 98103, 98115, 98118. Dual-use (rental+daycare top-25): 98074, 98075, 98012, 98029, 98021, 98052, 98077; lead use = Rental in all 7.
- Structures: A direct premium lease / B lease+services (default) / C PropCo-OpCo (3rd-4th property). DHM 3-3-3 Pursue. Insurance carriers: Markel, Philadelphia, K&K.
- ECE workforce shortage = margin compression risk. Provider pipeline: DCYF Welcome Team, Wonderschool, Imagine Institute/STARS.

## CA regulatory (FACT, harness brief 2026-07-16)

- FCCH = care in provider's OWN residence (HSC 1596.78). Small FCCH: 6-8 kids w/ conditions. Large FCCH: up to 12 w/ assistant (13-14 conditional; needs owner written consent if rented). Large requires 1 yr Small/center-admin experience or CDSS waiver. Renter-provider: 30-day written notice to owner (HSC 1597.41); restrictions on FCC generally void; deposit bump allowed within cap.
- Owner who establishes/manages/maintains care = regulated operator; that is the child care CENTER route (corporate applicant OK, needs qualified director on site + fire clearance).
- Unpaid parent co-op exemption (HSC 1596.792): no payment, rotating parents, <=12 kids; not a business model.
- Key structures: (1) rent to resident FCCH provider; (2) lease to licensed center operator; (3) owner-sponsored center entity (not passive). Platforms (Wonderschool etc.) do not replace licensing.
- C stub: RCFE HSC 1569 vs adult residential; six-bed small-home model; SEARCH pending.

## GTM/labor context

- Operators: Megan Green (21 yr RE, 108 transactions, WA license; DB endorsement status UNKNOWN = gating) + Kevin Lappe (systems). Owner time value $125/hr (prior analyses). Two-principal 150-250 door capacity = central UNPROVEN assumption. Kevin residence: Newport Beach, CA (Orange County); explains CA counties.
- Phasing: Sno-only Y1 (2-5 doors), +King Y2 (6-12), FCC overlay months 18-30 (1-3 conversions).
- Phase-1 success: 100% owner retention, >=70% renewal, >=95% SLA, 0 fee disputes, <=30-day onboard.

## SEARCH pending (agents running 2026-07-20)

1. CA rents/vacancy/PM fees/market size 4 counties; AB 1482 cap; AB 12; DRE B&P 10131 detail.
2. CA child care: tuition by county, RMR subsidy ceilings, desert data, FCCH exit rates, assistant wages, insurance, CACFP, licensing fees + timeline, capex anchors.
3. Current rates: 30-yr, investment premium, HELOC, prime, SBA 7(a), 10-yr UST, opportunity-cost yields. WA refresh: 2026 rents, HB 1217 2026/2027 cap, WCCC subsidy rates, DCYF fees/timeline.
4. RCFE stub: admin cert, fees, timeline, 6-bed board-and-care rates SoCal, staffing, capex, insurance, occupancy.

## Host inputs (carried as labeled assumption bands until provided)

- Kevin hrs/wk, Megan hrs/wk per option; loaded wage (default $125/hr from prior analyses; $0-labor variant always shown).
- Equity on hand for Phase-7 cash engine (known anchor: $515K equity in 98012 asset; liquid capital UNKNOWN).
- Which license holder(s) for CA DRE / CA FCCH / WA DB.

## Deliverable spec reminders

Workbook tabs: readme, inputs, regulatory-map, cost-inputs-a, cost-inputs-b, labor-accounting, npv-option-a, npv-option-b, npv-option-c-stub, crossovers, market-margin, tam, sam-som, phased-60-a, phased-60-b, verdict. Helvetica Neue 11, left/top aligned, bold frozen headers, blue inputs, yellow key results, whole dollars, minus sign not parens, no accounting formats. CALCULATION DEFINITIONS block ends every tab. Sheet names with hyphens must be single-quoted in cross-sheet formulas; Python reference computed FIRST, workbook tied to it to the dollar, headless recalc zero errors. Report: Obsidian markdown, kebab-case, frontmatter key order domain/category/sub-category/date-created/date-revised/then alpha/aliases/tags last, dense prose, no blank lines around headers, leads with verdict.
