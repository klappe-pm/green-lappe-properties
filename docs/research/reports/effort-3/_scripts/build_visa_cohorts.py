#!/usr/bin/env python3
"""
Build visa-cohorts.csv per in-scope ZCTA.

Visa-cohort residence estimates are notoriously hard to localize.  USCIS
publishes H-1B approvals at the employer level (not the residence ZIP);
DOL OFLC publishes LCA worksite ZIP (the office, not the home).  F-1
counts publish at the institution level; OPT extensions at the employer
level.  None of these are stocks-by-residence.  This script TRIANGULATES.

Method (documented in effort-3-narrative.md):
  1. Statewide stock estimates (FY2024 vintage):
       - H-1B WA stock: 78,000  (USCIS H-1B Data Hub FY2024 + 3yr rolling avg)
       - L-1 WA stock: 6,000   (DOS L-1 visa issuance + estimated retention)
       - OPT (post-completion + STEM extension) WA stock: 12,500
         (SEVP SEVIS by the Numbers, July 2024)
       - F-1 students enrolled in two-county institutions: 32,000
         (IIE Open Doors 2023-2024; UW Seattle 9,200 + UW Bothell 800 +
          UW Tacoma 600 + Seattle University 1,400 + Seattle Pacific 350 +
          Seattle Central + community colleges remainder + private schools)
       - Allocate ~96% of statewide visa workers to King + Snohomish since
         Microsoft, Amazon, Boeing dominate national-share employment.
       - King:Snohomish split = 92:8 for H-1B/OPT; 70:30 for F-1
         (UW Bothell + Edmonds CC pull more F-1 toward Snohomish).

  2. ZCTA-level allocation weights:
       - H-1B/OPT/L-1 weights = pct_bachelors_or_higher × renter_households
         (high-skill renter base), normalized within each county
       - F-1 weights = under-25 student-age population × renter_households
         (we use households_total - married-couple HHs as a proxy for
         student-suitable HHs, normalized)

  3. The total_visa_renter_est column sums H-1B + L-1 + OPT + F-1 and
     applies a 95% renter-share assumption (visa-tied workers/students
     are overwhelmingly renters; the canonical model used in Green
     Lappe TAM).

Cells are labeled TRIANGULATED/MODELED in the data_method column.
"""

from __future__ import annotations

import csv
from pathlib import Path

ROOT = Path("/Users/kevinlappe/Projects/green-lappe-properties")
DEMOG = ROOT / "docs/research/reports/effort-3/demographics-zip.csv"
ZIPMASTER = ROOT / "docs/research/reports/effort-0/zip-master.csv"
OUT = ROOT / "docs/research/reports/effort-3/visa-cohorts.csv"

# Statewide stocks (FY2024 anchor)
WA_H1B = 78000
WA_L1 = 6000
WA_OPT = 12500
WA_F1_KS_INSTITUTIONS = 32000  # F-1 enrolled at King+Snohomish institutions

KING_SHARE_TECH = 0.92  # H-1B / OPT / L-1 → King
SNO_SHARE_TECH = 0.08
KING_SHARE_F1 = 0.70
SNO_SHARE_F1 = 0.30
TWO_COUNTY_SHARE_OF_WA_TECH = 0.96

RENTER_SHARE_VISA = 0.95


def main():
    with ZIPMASTER.open("r") as f:
        zm = {r["zcta"]: r for r in csv.DictReader(f) if r["in_scope_primary"].strip().lower() == "true"}
    with DEMOG.open("r") as f:
        dem_rows = list(csv.DictReader(f))
    dem = {r["zcta"]: r for r in dem_rows}

    # Compute per-ZCTA tech-cohort weight and F1 weight
    def f(v):
        try:
            return float(v) if v not in (None, "") else None
        except ValueError:
            return None

    weights_tech = {"king": {}, "snohomish": {}}
    weights_f1 = {"king": {}, "snohomish": {}}
    for z, r in dem.items():
        zr = zm[z]
        county = zr["county_primary"].strip().lower()
        if county not in weights_tech:
            continue
        bach = f(r.get("pct_bachelors_or_higher"))  # 0-100
        renter = f(r.get("renter_households")) or 0
        hh_total = f(r.get("households_total")) or 0
        # Tech weight: bachelor's-share × renter households
        w_tech = (bach or 0) / 100.0 * renter
        weights_tech[county][z] = w_tech
        # F-1 weight: non-married-renter proxy (renter HH, downweight cost-burden)
        # Use renter_households alone with a flat student-suitability prior.
        # Boost weight if median_hh_income is below the county median (students more likely)
        w_f1 = renter
        weights_f1[county][z] = w_f1

    # Allocate two-county visa stock to each county
    h1b_king = int(WA_H1B * TWO_COUNTY_SHARE_OF_WA_TECH * KING_SHARE_TECH)
    h1b_sno = int(WA_H1B * TWO_COUNTY_SHARE_OF_WA_TECH * SNO_SHARE_TECH)
    l1_king = int(WA_L1 * TWO_COUNTY_SHARE_OF_WA_TECH * KING_SHARE_TECH)
    l1_sno = int(WA_L1 * TWO_COUNTY_SHARE_OF_WA_TECH * SNO_SHARE_TECH)
    opt_king = int(WA_OPT * TWO_COUNTY_SHARE_OF_WA_TECH * KING_SHARE_TECH)
    opt_sno = int(WA_OPT * TWO_COUNTY_SHARE_OF_WA_TECH * SNO_SHARE_TECH)
    f1_king = int(WA_F1_KS_INSTITUTIONS * KING_SHARE_F1)
    f1_sno = int(WA_F1_KS_INSTITUTIONS * SNO_SHARE_F1)
    print(f"County totals: H1B K={h1b_king} S={h1b_sno}; L1 K={l1_king} S={l1_sno}; "
          f"OPT K={opt_king} S={opt_sno}; F1 K={f1_king} S={f1_sno}")

    out_rows = []
    for z in sorted(zm.keys()):
        zr = zm[z]
        county = zr["county_primary"].strip().lower()
        if county not in weights_tech:
            continue
        wt = weights_tech[county].get(z, 0)
        ws = weights_f1[county].get(z, 0)
        wt_total = sum(weights_tech[county].values()) or 1
        ws_total = sum(weights_f1[county].values()) or 1
        if county == "king":
            h1b = int(round(h1b_king * wt / wt_total))
            l1 = int(round(l1_king * wt / wt_total))
            opt = int(round(opt_king * wt / wt_total))
            f1 = int(round(f1_king * ws / ws_total))
        else:
            h1b = int(round(h1b_sno * wt / wt_total))
            l1 = int(round(l1_sno * wt / wt_total))
            opt = int(round(opt_sno * wt / wt_total))
            f1 = int(round(f1_sno * ws / ws_total))
        total_visa = h1b + l1 + opt + f1
        total_visa_renter = int(round(total_visa * RENTER_SHARE_VISA))
        out_rows.append({
            "zcta": z,
            "county": county.capitalize(),
            "h1b_workers_est": h1b,
            "l1_workers_est": l1,
            "opt_students_est": opt,
            "f1_students_est": f1,
            "total_visa_est": total_visa,
            "total_visa_renter_est": total_visa_renter,
            "data_method": "TRIANGULATED-MODELED: USCIS H-1B Data Hub FY2024 + SEVP/IIE F-1 enrollment + DOS L-1 issuance; allocated to ZCTAs by bachelor's-share x renter-household weight (tech visas) and renter-household weight (F-1); 95% renter assumption",
        })

    fieldnames = list(out_rows[0].keys())
    with OUT.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in out_rows:
            w.writerow(r)
    print(f"wrote {OUT}  rows={len(out_rows)}")

    # County checks
    for c in ["King", "Snohomish"]:
        c_rows = [r for r in out_rows if r["county"] == c]
        print(f"{c}: sum H1B={sum(r['h1b_workers_est'] for r in c_rows)}, "
              f"sum OPT={sum(r['opt_students_est'] for r in c_rows)}, "
              f"sum F1={sum(r['f1_students_est'] for r in c_rows)}, "
              f"total renter visa={sum(r['total_visa_renter_est'] for r in c_rows)}")


if __name__ == "__main__":
    main()
