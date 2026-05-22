#!/usr/bin/env python3
"""
Triangulate population_2014 per in-scope ZCTA.

Approach:
  1. Pull OFM 2014 (intercensal) and 2020 (intercensal base = Census 2020) city
     populations for every King and Snohomish jurisdiction (plus Pierce
     jurisdictions intersecting the four CROSS_COUNTY ZCTAs).
  2. Pull OFM 2024 postcensal city populations for cross-check.
  3. For each in-scope ZCTA:
       - Resolve city_primary from zip-master.csv.
       - Compute the city's 2014/2020 growth factor (OFM).
       - Apply the same growth factor backward from ACS 2019-2023 5yr B01003
         (vintage roughly 2021 mid-point) to estimate 2014 population.
       - Method: pop_2014_est = pop_2024_b01003 *
                  (ofm_city_2014 / ofm_city_2020_base)
     This is a city-share ratio applied to the ZCTA's 2024 B01003.
  4. For ZCTAs whose city_primary is "Unincorporated" or doesn't map to a
     single OFM jurisdiction, fall back to the county-level OFM ratio.
  5. Output:
       - zip-master-population-fill.csv with columns
         zcta, population_2014, population_2024_b01003_check,
         population_cagr_10yr, method, source_city
       - Append flag if the b01003 figure differs from the Effort-0 proxy by
         more than 5%.

The cell value is labeled MODELED-TRIANGULATED in the notes column.  This is
the best available defensible substitute for the 6.7 GB national ACS5 2014
SF tarball (which the harness disallowed).
"""

from __future__ import annotations

import csv
from pathlib import Path

try:
    import openpyxl
except ImportError as e:
    raise SystemExit("openpyxl required")

ROOT = Path("/Users/kevinlappe/Projects/green-lappe-properties")
ZIPMASTER = ROOT / "docs/research/reports/effort-0/zip-master.csv"
DEMOG = ROOT / "docs/research/reports/effort-3/demographics-zip.csv"
OUT = ROOT / "docs/research/reports/effort-3/zip-master-population-fill.csv"


def load_ofm_intercensal():
    """Return {(county_name_lower, jurisdiction_lower): {'p2010': ..., 'p2014': ..., 'p2020': ...}}"""
    wb = openpyxl.load_workbook("/tmp/ofm_intercensal_2010_2020.xlsx", data_only=True)
    ws = wb["Total Population"]
    out = {}
    for r in ws.iter_rows(min_row=2, values_only=True):
        county = r[2]
        juris = r[4]  # full "City NAME town" etc.
        if county is None or juris is None:
            continue
        county = str(county).strip().lower()
        juris = str(juris).strip().lower()
        try:
            p2010 = int(r[6]) if r[6] not in (None, ".") else None
            p2014 = int(r[10]) if r[10] not in (None, ".") else None
            p2020 = int(r[16]) if r[16] not in (None, ".") else None
        except (TypeError, ValueError):
            continue
        out[(county, juris)] = {"p2010": p2010, "p2014": p2014, "p2020": p2020}
    return out


# Map our zip-master `city_primary` strings to OFM `jurisdiction` strings.
# OFM uses "Citytown" or "City city" form; we map exact strings as they appear
# in the workbook (already lower-cased on read).
CITY_NAME_MAP = {
    # King County (OFM strings include "(part)" suffix for cross-county jurisdictions)
    "auburn": "auburn city (part)",
    "pacific": "pacific city (part)",
    "algona": "algona city",
    "federal way": "federal way city",
    "bellevue": "bellevue city",
    "clyde hill": "clyde hill city",
    "hunts point": "hunts point town",
    "yarrow point": "yarrow point town",
    "medina": "medina city",
    "kent": "kent city",
    "renton": "renton city",
    "redmond": "redmond city",
    "kirkland": "kirkland city",
    "mercer island": "mercer island city",
    "sammamish": "sammamish city",
    "issaquah": "issaquah city",
    "newcastle": "newcastle city",
    "north bend": "north bend city",
    "snoqualmie": "snoqualmie city",
    "duvall": "duvall city",
    "carnation": "carnation city",
    "covington": "covington city",
    "maple valley": "maple valley city",
    "black diamond": "black diamond city",
    "enumclaw": "enumclaw city (part)",
    "tukwila": "tukwila city",
    "seatac": "seatac city",
    "burien": "burien city",
    "des moines": "des moines city",
    "normandy park": "normandy park city",
    "lake forest park": "lake forest park city",
    "shoreline": "shoreline city",
    "kenmore": "kenmore city",
    "bothell": "bothell city (part)",
    "woodinville": "woodinville city",
    "skykomish": "skykomish town",
    "milton": "milton city (part)",
    "seattle": "seattle city",
    "hobart": "unincorporated king county",
    "preston": "unincorporated king county",
    "vashon island": "unincorporated king county",
    "vashon": "unincorporated king county",
    "fall city": "unincorporated king county",
    "ravensdale": "unincorporated king county",
    "baring": "unincorporated king county",
    # Snohomish County
    "everett": "everett city",
    "lynnwood": "lynnwood city",
    "edmonds": "edmonds city",
    "mukilteo": "mukilteo city",
    "mountlake terrace": "mountlake terrace city",
    "mill creek": "mill creek city",
    "lake stevens": "lake stevens city",
    "marysville": "marysville city",
    "arlington": "arlington city",
    "monroe": "monroe city",
    "snohomish": "snohomish city",
    "stanwood": "stanwood city",
    "granite falls": "granite falls city",
    "darrington": "darrington town",
    "sultan": "sultan city",
    "gold bar": "gold bar city",
    "index": "index town",
    "brier": "brier city",
    "woodway": "woodway town",
    "lochsloy": "unincorporated snohomish county",
}


def resolve_city(zr):
    """Pick the best OFM jurisdiction for a zip-master row."""
    primary = (zr.get("city_primary") or "").strip()
    if not primary:
        return None, "no_primary_city"
    key = primary.lower()
    if key in CITY_NAME_MAP:
        return CITY_NAME_MAP[key], "exact"
    # try with "city" suffix
    if key + " city" in [v for v in CITY_NAME_MAP.values()]:
        return key + " city", "suffix"
    return None, f"unmapped:{primary}"


def main():
    ofm = load_ofm_intercensal()
    # Build the county-level baselines from the workbook header rows (the
    # "<County> County" row carries each county total).
    county_totals = {
        c: {"p2010": ofm.get((c, f"{c} county"), {}).get("p2010"),
            "p2014": ofm.get((c, f"{c} county"), {}).get("p2014"),
            "p2020": ofm.get((c, f"{c} county"), {}).get("p2020")}
        for c in ("king", "snohomish", "pierce")
    }
    print("County baselines:", county_totals)

    # Load zip-master and current demographics
    with ZIPMASTER.open("r") as f:
        zm = {r["zcta"]: r for r in csv.DictReader(f) if r["in_scope_primary"].strip().lower() == "true"}
    with DEMOG.open("r") as f:
        dem = {r["zcta"]: r for r in csv.DictReader(f)}

    out_rows = []
    for z in sorted(zm.keys()):
        zr = zm[z]
        county = zr["county_primary"].strip().lower()
        pop2024_b01003 = dem.get(z, {}).get("population_2024")
        pop2024_b01003 = int(pop2024_b01003) if pop2024_b01003 and pop2024_b01003.isdigit() else None
        pop2024_e0 = zr.get("population_2024")
        try:
            pop2024_e0 = int(pop2024_e0)
        except (ValueError, TypeError):
            pop2024_e0 = None

        city_key, status = resolve_city(zr)
        if city_key:
            row = ofm.get((county, city_key))
            if row is None:
                # Try with pierce / snohomish swap for cross-county ZCTAs
                # (e.g., 98001 in King but Auburn city straddles King/Pierce)
                for c in ("king", "snohomish", "pierce"):
                    row = ofm.get((c, city_key))
                    if row:
                        break
            if row and row.get("p2014") and row.get("p2020"):
                factor = row["p2014"] / row["p2020"]
                method = f"city_ratio:{city_key}"
            else:
                cb = county_totals.get(county, {})
                factor = (cb.get("p2014") / cb.get("p2020")) if (cb.get("p2014") and cb.get("p2020")) else None
                method = f"county_fallback:{county}"
        else:
            cb = county_totals.get(county, {})
            factor = (cb.get("p2014") / cb.get("p2020")) if (cb.get("p2014") and cb.get("p2020")) else None
            method = f"county_fallback:{county}({status})"

        # Apply factor to B01003 2024.  This is MODELED.
        if factor and pop2024_b01003:
            pop2014_est = int(round(pop2024_b01003 * factor))
            # 10-year CAGR
            years = 10
            cagr = (pop2024_b01003 / pop2014_est) ** (1 / years) - 1 if pop2014_est > 0 else None
            cagr_pct = round(cagr * 100, 2) if cagr is not None else None
        else:
            pop2014_est = None
            cagr_pct = None

        # Reconcile B01003 vs Effort-0 proxy
        delta_flag = ""
        if pop2024_b01003 and pop2024_e0:
            delta_pct = abs(pop2024_b01003 - pop2024_e0) / pop2024_e0 * 100
            if delta_pct > 5.0:
                delta_flag = f"E0_PROXY_DIFF_{delta_pct:.1f}pct"

        out_rows.append({
            "zcta": z,
            "population_2014_modeled": pop2014_est,
            "population_2024_b01003_check": pop2024_b01003,
            "population_2024_e0_proxy": pop2024_e0,
            "population_cagr_10yr_pct": cagr_pct,
            "method": method,
            "ofm_factor_2014_to_2020": round(factor, 4) if factor else None,
            "reconciliation_flag": delta_flag,
            "notes": "MODELED-TRIANGULATED: OFM intercensal city ratio applied to ACS5 2019-2023 B01003; documented in effort-3-narrative.md",
        })

    fieldnames = list(out_rows[0].keys())
    with OUT.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in out_rows:
            w.writerow(r)
    print(f"wrote {OUT}  rows={len(out_rows)}")

    # Update demographics-zip.csv in place with 2014 pop and CAGR
    with DEMOG.open("r") as f:
        rd = csv.DictReader(f)
        hdr = rd.fieldnames
        rows = list(rd)
    pf = {r["zcta"]: r for r in out_rows}
    for r in rows:
        z = r["zcta"]
        if z in pf:
            r["population_2014_proxy"] = pf[z]["population_2014_modeled"]
            r["population_cagr_10yr_pct"] = pf[z]["population_cagr_10yr_pct"]
    with DEMOG.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=hdr)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print("Updated demographics-zip.csv with population_2014 and CAGR.")


if __name__ == "__main__":
    main()
