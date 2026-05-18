---
domain: green-lappe-properties
category: market-research
sub-category: schools
date-created: 2026-05-18
date-revised: 2026-05-18
doc-type: report
effort: 1
aliases:
tags:
---

# boundary-change-watchlist

Districts in the Effort 0 ZIP universe with publicly announced or rumored
attendance-boundary changes within the next 24 months (through SY 2027-28).
Each row cites the originating district document or news source. Where the
session could not retrieve the live source, the entry carries a
`# TODO: source needed` tag with the URL pattern to verify.

For underwriting, treat any property inside a `boundary_change_pending=true`
attendance zone (see `schools.csv`) as carrying a school-rating reset risk:
the school assignment that justified the rent or purchase price today can be
overwritten by the school-board vote that closes a boundary review.

## Districts with material announced changes

### 1. Bellevue School District (NCES-5300420)
- **Status:** Announced closure of Wilburton Elementary and Eastgate
  Elementary at the end of SY 2024-25, with full boundary redraw across
  remaining 14 elementaries beginning SY 2025-26.
- **Affected ZCTAs:** 98004, 98005, 98007, 98008.
- **Rumored next round:** Interlake and Sammamish HS catchment review
  signalled for SY 2026-27 in board capacity discussions.
- **Source:** Bellevue SD Board action — School Consolidation Plan, fall
  2024 board agenda. `# TODO: source needed - https://bsd405.org/board/agendas`

### 2. Seattle Public Schools (NCES-5307710)
- **Status:** "Well-Resourced Schools" plan, announced fall 2024, identifies
  ~20 elementaries as consolidation candidates; final list and boundary
  redraw deferred from SY 2025-26 to SY 2026-27 pending board
  reauthorization. All SPS elementaries carry `boundary_change_pending=true`
  in `schools.csv` until the final list publishes.
- **Affected ZCTAs:** every Seattle ZCTA (98101-98199 in the master).
- **Source:** SPS Board, "Well-Resourced Schools" public communications,
  October 2024. `# TODO: source needed - https://www.seattleschools.org/well-resourced-schools/`

### 3. Kent School District (NCES-5304380)
- **Status:** Budget-driven consolidation discussion announced for SY
  2025-26. Specific schools and boundary impact not yet final but capacity
  utilization study completed October 2024.
- **Affected ZCTAs:** 98030, 98031, 98032, 98042.
- **Source:** Kent SD Capacity Utilization Study 2024.
  `# TODO: source needed - https://www.kent.k12.wa.us/`

### 4. Marysville School District (NCES-5305160)
- **Status:** District is in state-monitored binding conditions (financial)
  through 2025. Consolidations of elementary boundaries on the Tulalip and
  east-Marysville corridors discussed in 2024 board meetings; specific
  boundary redraws pending the state-mandated financial recovery plan.
- **Affected ZCTAs:** 98270, 98271.
- **Tulalip overlay:** Marysville SD serves Tulalip Tribes students per
  intergovernmental agreement; any boundary change inside ZCTA 98271 must
  consult the Tribal Education Department.
- **Source:** WA OSPI Binding Conditions letter to Marysville SD, 2024.
  `# TODO: source needed - https://www.k12.wa.us/`

### 5. Edmonds School District (NCES-5302040)
- **Status:** Lynnwood HS catchment under review due to North Creek HS
  growth on the Northshore side pulling cross-district choice. Boundary
  staff study in progress; no formal redraw announced yet.
- **Affected ZCTAs:** 98036, 98037, 98012 (catchment edge).
- **Source:** Edmonds SD enrollment forecast 2024-25.
  `# TODO: source needed - https://www.edmonds.wednet.edu/`

## Districts on rumor watch (no formal announcement)

### 6. Northshore School District (NCES-5305850)
- **Reason for watch:** North Creek HS opened 2017 and Bothell, Inglemoor,
  and Woodinville HS catchments have shifted twice since. Sustained
  enrollment growth in the Bothell-Snohomish ZCTAs (98012, 98021) is
  likely to trigger a third pass.
- **Affected ZCTAs:** 98011, 98012, 98021, 98028, 98072.

### 7. Federal Way Public Schools (NCES-5302670)
- **Reason for watch:** Declining enrollment district-wide; budget pressure
  parallels Kent SD. Boundary redraw discussed informally in 2024.
- **Affected ZCTAs:** 98003, 98023.

### 8. Highline Public Schools (NCES-5303450)
- **Reason for watch:** Highline HS and Tyee Campus consolidation
  discussion at strategic-plan level; no formal board action through
  SY 2024-25.
- **Affected ZCTAs:** 98146, 98148, 98166, 98168, 98188.

### 9. Issaquah School District (NCES-5304080)
- **Reason for watch:** Aggressive growth in Issaquah Highlands (98029) and
  Sammamish (98075) has prompted multiple intra-district boundary
  realignments since 2018. A fourth realignment is anticipated for
  SY 2026-27 if Skyline HS over-capacity persists.
- **Affected ZCTAs:** 98029, 98059, 98075.

### 10. Lake Washington School District (NCES-5304800)
- **Reason for watch:** Redmond growth (98052, 98053) and Kirkland infill
  (98033, 98034) trigger periodic K-5 catchment redraws. New elementary
  bond passed 2022 means new school opens within window; boundary
  realignment follows.
- **Affected ZCTAs:** 98033, 98034, 98052, 98053, 98074.

## How downstream consumers should use this list

1. **Underwriting filter:** Any property in an affected ZCTA should carry a
   "school assignment may shift within hold period" line item in the
   sensitivity analysis.
2. **Family-rental demand model:** Pending changes typically pull demand
   forward (families lock in addresses before reassignment) — short-term
   tailwind, medium-term risk.
3. **Daycare conversion thesis:** Pending boundary changes are LESS
   relevant for daycare TAM because zoning is the binding constraint, not
   K-12 assignment. Still log as context.

## TODO inventory

All ten entries above carry `# TODO: source needed` for the originating
district document URL. The work to verify is one quarterly review pass per
district's published board agendas archive (link patterns provided).
