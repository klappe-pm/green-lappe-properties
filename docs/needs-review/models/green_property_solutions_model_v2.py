#!/usr/bin/env python3
"""Green Property Solutions model v2: owner-conversion / platform frame (corrects v1's operator-run miss).

Actors: OWNER (client) holds the property; PROVIDER (licensed resident FCCH operator) runs care and
pays rent; GREEN PROPERTY SOLUTIONS (platform) converts, places, and services, capturing fees. Per county:
provider P&L -> max supportable rent (affordability ceiling) -> owner conversion premium and
$/sqft/yr productivity -> owner 10-yr conversion NPV -> GL per-door fees and 60-month portfolio.
Crossover = tuition/child/month at which the provider matches a market tenant's rent bid.
"""
import json

SQFT = 2250
HORIZON = 10
R = 0.0743                      # HELOC discount
GROWTH = 0.03
KIDS = 12 * 0.85                # large FCCH at 85% utilization
PROVIDER_MIN = 55_000 / 12      # provider walk-away take-home ($/mo)
RENT_REV_CAP = 0.35             # rent <= 35% of gross tuition revenue
SERVICES_FEE = 0.10             # GL services fee on gross tuition
MGMT_FEE = 0.09                 # GL management fee on collected rent
CONV_FEE_ONE_TIME = 10_000      # GL capex-coordination fee per conversion
CAPEX = {"mean": 22_000, "median": 15_000}
RECONV = 12_000
CONTINUITY = 0.92               # provider-churn haircut on premium (MN 12-14%/yr churn proxy)

COUNTIES = {
    "orange":      dict(rent=4400, tuit=1613, wage=19.40),
    "san-diego":   dict(rent=4100, tuit=1365, wage=19.62),
    "riverside":   dict(rent=3200, tuit=1244, wage=19.82),
    "los-angeles": dict(rent=4200, tuit=1367, wage=19.67),
    "snohomish":   dict(rent=3300, tuit=2300, wage=21.00),
    "king":        dict(rent=3900, tuit=2600, wage=21.00),
}
ORDER = ["orange", "san-diego", "riverside", "los-angeles", "snohomish", "king"]


def provider_ceiling(d, tuit=None):
    t = d["tuit"] if tuit is None else tuit
    gross = KIDS * t
    assistant = 40 * d["wage"] * 1.18 * 50 / 12
    opex = 60 * KIDS + 300 + 200
    pool = gross - assistant - opex - SERVICES_FEE * gross - PROVIDER_MIN
    return max(0.0, min(pool, RENT_REV_CAP * gross)), gross


def owner_npv(d, stat):
    """Owner's incremental NPV of converting vs keeping a market tenant (both PM-managed at 9%)."""
    ceiling, _ = provider_ceiling(d)
    prem_mo = (ceiling - d["rent"]) * CONTINUITY
    if prem_mo <= 0:
        return dict(premium_mo=round(ceiling - d["rent"]), npv=None, viable=False)
    pv = sum(prem_mo * 12 * (1 + GROWTH) ** y * (1 - MGMT_FEE) / (1 + R) ** (y + 1)
             for y in range(HORIZON))
    pv -= CAPEX[stat] + CONV_FEE_ONE_TIME
    pv -= RECONV / (1 + R) ** HORIZON
    return dict(premium_mo=round(prem_mo), npv=round(pv), viable=True,
                payback_months=round((CAPEX[stat] + CONV_FEE_ONE_TIME) / (prem_mo * (1 - MGMT_FEE))))


def crossover_tuition(d):
    lo, hi = 500.0, 6000.0
    for _ in range(60):
        mid = (lo + hi) / 2
        ceiling, _ = provider_ceiling(d, mid)
        if ceiling < d["rent"]:
            lo = mid
        else:
            hi = mid
    return round((lo + hi) / 2)


def gl_door_fees(d):
    ceiling, gross = provider_ceiling(d)
    if ceiling <= d["rent"]:
        return 0
    return round(SERVICES_FEE * gross * 12 + MGMT_FEE * ceiling * 12)


def platform_60mo(counties=("snohomish", "king")):
    """GL portfolio: conversions ramp 1/3/6/10/15 cumulative Y1-Y5 across viable counties (blend)."""
    ramp = [1, 3, 6, 10, 15]
    fee_blend = sum(gl_door_fees(COUNTIES[c]) for c in counties) / len(counties)
    rows = []
    cash = 0.0
    for y in range(5):
        doors = ramp[y]
        new = doors - (ramp[y - 1] if y else 0)
        rev = doors * fee_blend + new * CONV_FEE_ONE_TIME
        hours = new * 120 + doors * 3 * 50           # 120 h/conversion + 3 h/wk/door ops
        cost = 30_000 * (1 + GROWTH) ** y + hours * 0  # operator labor reported separately
        ebitda = rev - cost
        cash += ebitda
        rows.append(dict(year=y + 1, doors=doors, revenue=round(rev), fixed=round(cost),
                         ebitda=round(ebitda), hours=round(hours), cum_cash=round(cash)))
    return rows, round(fee_blend)


def main():
    out = {"counties": {}, "platform": {}}
    for c in ORDER:
        d = COUNTIES[c]
        ceiling, gross = provider_ceiling(d)
        entry = dict(
            provider_gross_mo=round(gross), rent_ceiling_mo=round(ceiling), market_rent=d["rent"],
            premium_mo=round(ceiling - d["rent"]),
            psf_base=round(d["rent"] * 12 / SQFT, 1), psf_conv=round(ceiling * 12 / SQFT, 1),
            crossover_tuition=crossover_tuition(d), gl_fees_yr=gl_door_fees(d),
            owner_mean=owner_npv(d, "mean"), owner_median=owner_npv(d, "median"))
        out["counties"][c] = entry
    rows, blend = platform_60mo()
    out["platform"] = dict(fee_per_door_yr=blend, ramp=rows)
    print(json.dumps(out, indent=1))


if __name__ == "__main__":
    main()
