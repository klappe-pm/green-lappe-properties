#!/usr/bin/env python3
"""Quick rank inspector — prints top 15 per score for sanity checking."""
import csv, os
OUT = "/Users/kevinlappe/Projects/green-lappe-properties/docs/research/reports/effort-6"
with open(os.path.join(OUT, "green-lappe-final-dataset.csv")) as f:
    rows = list(csv.DictReader(f))

def show(label, score_col, rank_col, n=15):
    print(f"\n=== TOP {n}: {label} ===")
    s = sorted(rows, key=lambda r: int(r[rank_col]))[:n]
    for r in s:
        print(f"  #{r[rank_col]:>3} {r['zcta']}  {r['city_primary']:<22}  {label}={r[score_col]}  county={r['county_primary']}")

show("PM", "pm_score", "pm_rank")
show("Rental", "rental_score", "rental_rank")
show("Daycare", "daycare_score", "daycare_rank")
show("Dual-use", "dual_use_score", "dual_use_rank", n=20)
