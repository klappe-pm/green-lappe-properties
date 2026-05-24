"""Sanity check H16 named ZIPs' actual children_per_100_slots rank."""
import csv
with open("/Users/kevinlappe/Projects/green-lappe-properties/docs/research/reports/effort-6/green-property-management-final-dataset.csv") as f:
    rows = list(csv.DictReader(f))
ranked = sorted(rows, key=lambda r: -float(r["children_per_100_slots"]))
named = ["98052", "98074", "98075", "98029", "98011"]
for i, r in enumerate(ranked, start=1):
    if r["zcta"] in named:
        print(f"Rank {i}: {r['zcta']} {r['city_primary']} kids/100slots={r['children_per_100_slots']}")
print("Total ZCTAs:", len(ranked))
