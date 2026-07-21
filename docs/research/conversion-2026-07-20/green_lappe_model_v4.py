#!/usr/bin/env python3
"""Green-Lappe model v4: ratio-based capacity from verified CA/WA regulation, host full-time price card.

Scenarios (search-results-ratios-licensing.md): CA-L14, CA-L12 large FCCH; WA-H12 home, WA-H16 waiver,
WA-C28 center-in-residence. Providers assumed licensed and qualified day one (recruiting filter).
Owner-occupied assumed wherever residency is required (FCCH paths); WA-C28 has no residency rule.
Pricing: $2,000/mo not-potty-trained (npt, modeled as the under-2 band), $1,500/mo potty-trained,
full-time 5 days/week. Rent ceiling from the operator P&L; premium vs market SFR rent; owner NPV.
"""
import json

NPT, PT = 2000.0, 1500.0
UTIL = 0.85
PROVIDER_MIN = 55_000 / 12       # owner-operator take-home floor (FCCH paths)
ENTITY_MARGIN = 0.15             # operating-entity margin on gross (center path)
RENT_REV_CAP = 0.35
SERVICES_FEE = 0.10
MGMT_FEE = 0.09
CONV_FEE = 10_000
RECONV = 12_000
CONTINUITY = 0.92
R = 0.0743
GROWTH = 0.03
HORIZON = 10
STAFF_LOAD = 1.18
HRS_MO = 40 * 50 / 12
DIRECTOR_WAGE = 32.0

# scenario: kids npt/pt at license limits, hired staff FTEs (licensee excluded on FCCH paths),
# capex adder over the $22,000 base conversion, months of facility-licensing dead time.
SCENARIOS = {
    "CA-L14": dict(states=("CA",), npt=3, pt=11, hired=1, dir=0, capex_add=0,     dead=4),
    "CA-L12": dict(states=("CA",), npt=4, pt=8,  hired=1, dir=0, capex_add=0,     dead=4),
    "WA-H12": dict(states=("WA",), npt=6, pt=6,  hired=1, dir=0, capex_add=0,     dead=3),
    "WA-H16": dict(states=("WA",), npt=6, pt=10, hired=2, dir=0, capex_add=12_000, dead=4),
    "WA-C28": dict(states=("WA",), npt=8, pt=20, hired=4, dir=1, capex_add=45_000, dead=6),
}
COUNTIES = {
    "orange":      dict(st="CA", rent=4400, wage=19.40),
    "san-diego":   dict(st="CA", rent=4100, wage=19.62),
    "riverside":   dict(st="CA", rent=3200, wage=19.82),
    "los-angeles": dict(st="CA", rent=4200, wage=19.67),
    "snohomish":   dict(st="WA", rent=3300, wage=21.00),
    "king":        dict(st="WA", rent=3900, wage=21.00),
}
ORDER = ["orange", "san-diego", "riverside", "los-angeles", "snohomish", "king"]
CAPEX_BASE = 22_000


def econ(sc, county):
    s, d = SCENARIOS[sc], COUNTIES[county]
    kids = (s["npt"] + s["pt"]) * UTIL
    gross = (s["npt"] * NPT + s["pt"] * PT) * UTIL
    staff = s["hired"] * d["wage"] * STAFF_LOAD * HRS_MO + s["dir"] * DIRECTOR_WAGE * STAFF_LOAD * HRS_MO
    opex = 60 * kids + 300 + 200 + (400 if sc == "WA-C28" else 0)
    fees = SERVICES_FEE * gross
    income_floor = gross * ENTITY_MARGIN if s["dir"] else PROVIDER_MIN
    pool = gross - staff - opex - fees - income_floor
    ceiling = max(0.0, min(pool, RENT_REV_CAP * gross))
    prem = (ceiling - d["rent"]) * CONTINUITY
    capex = CAPEX_BASE + s["capex_add"] + CONV_FEE
    flows = []
    for yr in range(HORIZON):
        months = 12 - s["dead"] if yr == 0 else 12
        f = prem * (1 + GROWTH) ** yr * months * (1 - MGMT_FEE)
        if yr == 0:
            f -= capex
        flows.append(f)
    flows[-1] -= RECONV
    npv = sum(f / (1 + R) ** (t + 1) for t, f in enumerate(flows))
    gl = SERVICES_FEE * gross * 12 + MGMT_FEE * ceiling * 12
    return dict(gross_mo=round(gross), staff_mo=round(staff), ceiling=round(ceiling),
                premium=round(prem), owner_npv=round(npv) if prem > 0 else None,
                payback_mo=round(capex / (prem * (1 - MGMT_FEE))) if prem > 0 else None,
                gl_fees_yr=round(gl) if prem > 0 else 0, viable=prem > 0,
                psf=round(ceiling * 12 / 2250, 1))


def main():
    out = {}
    for c in ORDER:
        st = COUNTIES[c]["st"]
        out[c] = {sc: econ(sc, c) for sc, s in SCENARIOS.items() if st in s["states"]}
    print(json.dumps(out, indent=1))


if __name__ == "__main__":
    main()
