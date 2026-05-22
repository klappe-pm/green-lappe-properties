#!/usr/bin/env python3
"""
Effort 3 step 2: compute commute-time and under-5 density columns.

Approach:
- Read centroid lat/lon and ALAND_SQMI from Census 2024 Gazetteer ZCTA file.
- Compute great-circle distance from each ZCTA centroid to six employer hubs.
- Translate distance to commute minutes using a documented two-segment
  speed model (urban-core: 12 mph effective; suburban/exurban: 25 mph
  effective; the threshold is 8 miles from the hub).  This is labeled
  MODELED and is intended as a directional 8am-weekday signal in the
  absence of an OSRM server.  Anyone with OSRM access can swap the
  ``commute_minutes_modeled`` function later.
- Merge with the ACS demographics CSV produced by build_demographics.py
  to compute under-5 density per sq mi and to fill the commute columns.
- Write demographics-zip.csv (final, except population_2014/projection).
"""

from __future__ import annotations

import csv
import math
from pathlib import Path

ROOT = Path("/Users/kevinlappe/Projects/green-lappe-properties")
OUTDIR = ROOT / "docs/research/reports/effort-3"
GAZ = Path("/tmp/2024_Gaz_zcta_national.txt")

# Hub coordinates (decimal degrees).  Centroids verified against published addresses.
HUBS = {
    # Seattle CBD: 4th & Pike (Downtown)
    "seattle_cbd": (47.6101, -122.3344),
    # South Lake Union: Amazon Doppler tower / Westlake & Republican
    "slu": (47.6228, -122.3382),
    # Bellevue CBD: NE 8th & Bellevue Way
    "bellevue_cbd": (47.6147, -122.1923),
    # Microsoft main campus, Redmond: Building 92, 15010 NE 36th St
    "redmond_msft": (47.6440, -122.1296),
    # Boeing Everett Plant 2 (Boeing Field at Paine): 3003 W Casino Rd, Everett
    "everett_boeing": (47.9229, -122.2766),
    # Boeing Renton (737 final assembly): 737 Logan Ave N
    "renton_boeing": (47.5006, -122.2153),
}


def haversine_miles(lat1, lon1, lat2, lon2):
    R = 3958.7613  # earth radius in miles
    p1 = math.radians(lat1)
    p2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dlam / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))


def commute_minutes_modeled(miles: float) -> float:
    """MODELED 8am-weekday commute minutes from straight-line distance.

    Two-segment piecewise: the first 8 miles (core access) at 12 mph
    effective average speed (traffic, lights, signals), the remainder at
    25 mph (freeway-dominant).  Add a fixed 4-minute hub-arrival penalty
    (parking, garage entry).  This model is documented in
    effort-3-narrative.md section "Commute methodology"; it intentionally
    over-predicts vs OSRM for exurban/rural ZCTAs and under-predicts vs
    OSRM for cross-city peak commutes.  Replace with OSRM when available.
    """
    core = min(miles, 8.0)
    far = max(miles - 8.0, 0.0)
    minutes = core / 12.0 * 60 + far / 25.0 * 60 + 4.0
    return round(minutes, 1)


def load_centroids():
    centroids = {}
    aland_sqmi = {}
    with GAZ.open("r", encoding="utf-8") as f:
        next(f)  # header
        for line in f:
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 7:
                continue
            zcta = parts[0].strip()
            try:
                lat = float(parts[5].strip())
                lon = float(parts[6].strip())
                sqmi = float(parts[3].strip())
            except ValueError:
                continue
            centroids[zcta] = (lat, lon)
            aland_sqmi[zcta] = sqmi
    return centroids, aland_sqmi


def main():
    centroids, aland = load_centroids()

    src = OUTDIR / "demographics-zip-acs.csv"
    with src.open("r") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    missing_geo = []
    for r in rows:
        z = r["zcta"]
        ll = centroids.get(z)
        sqmi = aland.get(z)
        u5 = r.get("under_5_count")
        if u5 and sqmi:
            try:
                r["under_5_density_per_sqmi"] = round(float(u5) / float(sqmi), 1)
            except (ValueError, ZeroDivisionError):
                r["under_5_density_per_sqmi"] = None
        if not ll:
            missing_geo.append(z)
            for hub in HUBS:
                r[f"commute_min_{hub if hub != 'redmond_msft' else 'redmond_msft'}"] = None
            continue
        lat, lon = ll
        for hub, (hlat, hlon) in HUBS.items():
            miles = haversine_miles(lat, lon, hlat, hlon)
            mins = commute_minutes_modeled(miles)
            r[f"commute_min_{hub}"] = mins
        # The commute_min columns in the demographics-zip-acs schema use these names:
        # commute_min_seattle_cbd, commute_min_slu, commute_min_bellevue_cbd,
        # commute_min_redmond_msft, commute_min_everett_boeing, commute_min_renton_boeing.
        # The hub keys already match.

    # Write final demographics-zip.csv
    out = OUTDIR / "demographics-zip.csv"
    fieldnames = list(rows[0].keys())
    with out.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"wrote {out}  rows={len(rows)}  missing centroid: {missing_geo}")


if __name__ == "__main__":
    main()
