#!/usr/bin/env python3
"""Green-Lappe model v3: host tuition schedule + X->Z capacity ramp + WA per-ZIP optimized scenarios.

Host inputs (2026-07-20): tuition $2,000/mo non-potty-trained (npt), $1,500/mo potty-trained (pt).
Ramp: X kids per provider for period Y months (single-provider license phase), then Z kids with an
assistant after Y. Defaults X=6, Y=12, Z=12 (CA small->large experience gate; WA staffing step);
sensitivity on X and Y shown. Non-potty capacity capped at 4 (CA infant limit; WA under-2 band,
licensing-band assumption). WA ZIP scenarios use the effort-6 zone/school analysis (slot gap,
school composite) with research-derived per-ZIP rents (assumption bands).
"""
import json

NPT, PT = 2000.0, 1500.0
NPT_CAP = 4
X_DEFAULT, Y_DEFAULT, Z_DEFAULT = 6, 12, 12
HORIZON = 10
R = 0.0743
GROWTH = 0.03
PROVIDER_MIN = 55_000 / 12
RENT_REV_CAP = 0.35
SERVICES_FEE = 0.10
MGMT_FEE = 0.09
CONV_FEE = 10_000
CAPEX_MEAN = 22_000
RECONV = 12_000
CONTINUITY = 0.92

COUNTIES = {
    "orange":      dict(rent=4400, wage=19.40),
    "san-diego":   dict(rent=4100, wage=19.62),
    "riverside":   dict(rent=3200, wage=19.82),
    "los-angeles": dict(rent=4200, wage=19.67),
    "snohomish":   dict(rent=3300, wage=21.00),
    "king":        dict(rent=3900, wage=21.00),
}
ORDER = ["orange", "san-diego", "riverside", "los-angeles", "snohomish", "king"]

# effort-6 WA zones: dual-use shortlist + 98012/98021 detail. rent = research-derived ZIP anchor
# (ASSUMPTION band); slot_gap = kids per 100 slots (demand); school = composite (retention proxy).
WA_ZIPS = {
    "98012 Bothell (Sno)":     dict(county="snohomish", rent=3900, slot_gap=241, school=86.5),
    "98021 Bothell (Sno)":     dict(county="snohomish", rent=3800, slot_gap=190, school=84.0),
    "98074 Sammamish (King)":  dict(county="king", rent=4600, slot_gap=203, school=99.2),
    "98075 Sammamish (King)":  dict(county="king", rent=4500, slot_gap=196, school=99.2),
    "98029 Issaquah (King)":   dict(county="king", rent=4300, slot_gap=237, school=99.2),
    "98052 Redmond (King)":    dict(county="king", rent=4200, slot_gap=197, school=95.0),
    "98077 Woodinville (King)":dict(county="king", rent=4400, slot_gap=180, school=92.0),
}


def util_from_gap(gap):
    """Enrollment utilization from slot-gap severity."""
    return 0.90 if gap >= 200 else (0.85 if gap >= 150 else 0.80)


def blended(kids, util):
    """Revenue-optimal mix at capacity `kids`: fill npt seats first (higher price), cap 4."""
    k = kids * util
    npt_k = min(NPT_CAP, k)
    pt_k = k - npt_k
    return npt_k * NPT + pt_k * PT, k


def ceiling_month(kids, util, wage, with_assistant):
    rev, k = blended(kids, util)
    assistant = (40 * wage * 1.18 * 50 / 12) if with_assistant else 0.0
    opex = 60 * k + 300 + 200
    pool = rev - assistant - opex - SERVICES_FEE * rev - PROVIDER_MIN
    return max(0.0, min(pool, RENT_REV_CAP * rev)), rev


def scenario(rent, wage, util, x=X_DEFAULT, y=Y_DEFAULT, z=Z_DEFAULT):
    """Owner NPV and GL fees under the X->Z ramp. Year 1 = X kids solo (after 4 dead months),
    years 2+ = Z kids with assistant (Y=12 default folds the gate into year 1)."""
    ceil_small, rev_small = ceiling_month(x, util, wage, with_assistant=(x > 8))
    ceil_large, rev_large = ceiling_month(z, util, wage, with_assistant=(z > 8))
    prem_small = (ceil_small - rent) * CONTINUITY
    prem_large = (ceil_large - rent) * CONTINUITY
    # month grid: 4 licensing dead months, then Y months at X kids solo, then Z kids w/ assistant
    flows = []
    for yr in range(HORIZON):
        f = 0.0
        for m in range(yr * 12, yr * 12 + 12):
            if m < 4:
                p = -rent * CONTINUITY * 0        # dead months: no premium, no penalty modeled
            elif m < 4 + y:
                p = prem_small
            else:
                p = prem_large * (1 + GROWTH) ** yr
            f += p * (1 - MGMT_FEE)
        if yr == 0:
            f -= CAPEX_MEAN + CONV_FEE
        flows.append(f)
    flows[-1] -= RECONV
    npv = sum(f / (1 + R) ** (t + 1) for t, f in enumerate(flows))
    gl_small = SERVICES_FEE * rev_small * 12 + MGMT_FEE * max(0, ceil_small) * 12
    gl_large = SERVICES_FEE * rev_large * 12 + MGMT_FEE * max(0, ceil_large) * 12
    return dict(ceiling_small=round(ceil_small), ceiling_large=round(ceil_large),
                premium_small=round(prem_small), premium_large=round(prem_large),
                owner_npv=round(npv), viable=prem_large > 0,
                payback_mo=(round((CAPEX_MEAN + CONV_FEE) / (prem_large * (1 - MGMT_FEE)))
                            if prem_large > 0 else None),
                gl_fees_small=round(gl_small), gl_fees_large=round(gl_large))


def main():
    out = {"tuition": dict(npt=NPT, pt=PT, npt_cap=NPT_CAP),
           "ramp": dict(x=X_DEFAULT, y_months=Y_DEFAULT, z=Z_DEFAULT),
           "counties": {}, "wa_zips": {}, "ramp_sensitivity": {}}
    for c in ORDER:
        d = COUNTIES[c]
        out["counties"][c] = scenario(d["rent"], d["wage"], util=0.85)
    for z, d in WA_ZIPS.items():
        w = COUNTIES[d["county"]]["wage"]
        u = util_from_gap(d["slot_gap"])
        s = scenario(d["rent"], w, util=u)
        s.update(util=u, slot_gap=d["slot_gap"], school=d["school"], rent=d["rent"],
                 psf=round(s["ceiling_large"] * 12 / 2250, 1))
        out["wa_zips"][z] = s
    # ramp sensitivity on the King baseline: X in 4/6/8, Y in 6/12/24 months
    for x in (4, 6, 8):
        for y in (6, 12, 24):
            key = f"x{x}_y{y}"
            d = COUNTIES["king"]
            base = scenario(d["rent"], d["wage"], util=0.85, x=x, y=y)
            out["ramp_sensitivity"][key] = dict(owner_npv=base["owner_npv"],
                                                premium_small=base["premium_small"])
    print(json.dumps(out, indent=1))


if __name__ == "__main__":
    main()
