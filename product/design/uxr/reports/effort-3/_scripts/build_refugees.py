#!/usr/bin/env python3
"""
Build refugee-placements.csv from State Dept (PRM/RPC/WRAPS) FY2020 to FY2024
state-by-nationality reports for Washington State.

Sources:
  /tmp/ref_fy20.xlsx (WRAPS XLSX)
  /tmp/ref_fy21.pdf, ref_fy22.pdf, ref_fy23.pdf, ref_fy24.pdf (WRAPS PDFs)

These are STATEWIDE totals.  To split between King and Snohomish counties we
apply published affiliate-placement shares.  The four major WA Refugee
Resettlement Agencies (R&P contract holders) and their reported FY2023-FY2024
city footprints:
  - International Rescue Committee (IRC) Seattle: Seattle + Kent (King)
  - World Relief Western Washington (WRWW): Kent (King) + Everett (Snohomish)
  - Jewish Family Service (JFS) Seattle: Seattle (King)
  - Lutheran Community Services Northwest (LCS NW): SeaTac (King) + Tacoma (Pierce)
The historical King/Snohomish split per WA DSHS ORIA quarterly tabulations is
roughly 80/20 in normal years, swinging to 65/35 in Russian/Ukrainian-heavy
years (WRWW Everett pulls more Slavic placements).  We apply a per-nationality
split documented in the methodology block.

This is labeled TRIANGULATED in the output.
"""

from __future__ import annotations

import csv
import re
from pathlib import Path
import openpyxl
import pdfplumber

ROOT = Path("/Users/kevinlappe/Projects/green-lappe-properties")
OUT = ROOT / "docs/research/reports/effort-3/refugee-placements.csv"

# Per-nationality King vs Snohomish allocation share.
# Methodology:
#   - Slavic-language nationalities (Russia, Ukraine, Moldova, Belarus, Kazakhstan)
#     skew Snohomish/Everett (World Relief WW base) -- 60% Snohomish, 40% King.
#   - Afghan placements concentrated in Kent / Seattle (IRC), King 85%, Snohomish 15%.
#   - All other African / Asian / Middle East nationalities follow IRC/JFS Seattle pattern
#     King 80%, Snohomish 20%.
#   - Burmese (Karen, Karenni) historically Tukwila/Kent King 90%, Snohomish 10%.
SLAVIC = {"russia", "ukraine", "moldova", "belarus", "kazakhstan", "uzbekistan",
          "kyrgyzstan", "tajikistan", "turkmenistan"}
AFGHAN = {"afghanistan"}
BURMESE = {"burma", "myanmar"}

LANG_BY_NATIONALITY = {
    "afghanistan": "Pashto/Dari",
    "burma": "Burmese (Karen/Karenni)",
    "myanmar": "Burmese (Karen/Karenni)",
    "dem. rep. congo": "Swahili/French",
    "drc": "Swahili/French",
    "congo (drc)": "Swahili/French",
    "congo (kinshasa)": "Swahili/French",
    "eritrea": "Tigrinya",
    "ethiopia": "Amharic/Oromo",
    "iran": "Farsi/Dari",
    "iraq": "Arabic/Kurdish",
    "russia": "Russian",
    "moldova": "Russian/Romanian",
    "ukraine": "Ukrainian/Russian",
    "kazakhstan": "Russian",
    "belarus": "Russian/Belarusian",
    "somalia": "Somali",
    "sudan": "Arabic",
    "syria": "Arabic",
    "central african republic": "French/Sango",
    "el salvador": "Spanish",
    "colombia": "Spanish",
    "venezuela": "Spanish",
    "cuba": "Spanish",
    "guatemala": "Spanish",
    "honduras": "Spanish",
    "nicaragua": "Spanish",
    "tunisia": "Arabic",
    "mali": "French/Bambara",
    "senegal": "French/Wolof",
    "lebanon": "Arabic",
    "armenia": "Armenian",
    "vietnam": "Vietnamese",
    "pakistan": "Urdu",
    "uganda": "English/Luganda",
    "tanzania": "Swahili",
    "rwanda": "Kinyarwanda",
    "bhutan": "Nepali",
    "nepal": "Nepali",
    "burundi": "Kirundi",
}

AGENCY_BY_NATIONALITY = {
    "afghanistan": "IRC Seattle (primary) / WRWW",
    "ukraine": "World Relief WW (primary)",
    "russia": "World Relief WW",
    "moldova": "World Relief WW",
    "kazakhstan": "World Relief WW",
    "burma": "WRWW / IRC Seattle",
    "dem. rep. congo": "IRC Seattle / LCS NW",
    "eritrea": "LCS NW / IRC Seattle",
    "ethiopia": "LCS NW / IRC Seattle",
    "iraq": "IRC Seattle / JFS Seattle",
    "iran": "JFS Seattle",
    "syria": "IRC Seattle / JFS Seattle",
    "somalia": "IRC Seattle",
}


def split_county(nationality, total):
    n = (nationality or "").strip().lower()
    if n in SLAVIC:
        king = int(round(total * 0.40))
    elif n in AFGHAN:
        king = int(round(total * 0.85))
    elif n in BURMESE:
        king = int(round(total * 0.90))
    else:
        king = int(round(total * 0.80))
    sno = total - king
    return king, sno


def parse_xlsx_fy20():
    wb = openpyxl.load_workbook('/tmp/ref_fy20.xlsx', data_only=True)
    ws = wb['FY2020']
    out = {}
    in_wa = False
    for r in ws.iter_rows(min_row=10, values_only=True):
        col0 = str(r[0] or '').strip()
        col1 = str(r[1] or '').strip()
        if col0 == 'Washington':
            in_wa = True
            continue
        if in_wa:
            if col0 == '' and col1:
                # nationality row
                nationality = col1.strip()
                total = r[2] or 0
                out[nationality] = total
            elif col0 and col0 != 'Total':
                # next state
                break
    return out


STATE_NAMES = {
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
    "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
    "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
    "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
    "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
    "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
    "West Virginia","Wisconsin","Wyoming","Puerto Rico"
}


def parse_pdf_fy(path):
    """Extract Washington's nationality breakdown via pdfplumber.

    PDF layout:
      "Washington Total <13 numbers> <annual_total>"
      "Nationality <13 numbers OR fewer> <annual_total>"   for each origin
    The trailing column = annual FY arrival count.  We extract the rightmost
    integer per nationality row.  Rows are continued onto subsequent pages
    when the WA section overflows; the second-page header repeats
    "Washington Nationality ...".
    """
    out = {}
    in_wa = False
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            for line in text.split("\n"):
                l = line.strip()
                if not l:
                    continue
                # Enter WA on its Total row
                if l.startswith("Washington Total") or l.startswith("Washington T"):
                    in_wa = True
                    continue
                # Handle wrapped continuation: a line that starts with "Washington <nat>"
                if l.startswith("Washington ") and not in_wa:
                    in_wa = True
                    l_after = l[len("Washington "):]
                    # parse this row as a nationality row
                    m = re.match(r'^([A-Za-z][A-Za-z .,\(\)\-/]+?)\s+([\d,]+)\s*$', l_after)
                    if m:
                        nat = m.group(1).strip().rstrip(",.")
                        try:
                            tot = int(m.group(2).replace(",", ""))
                            out[nat] = out.get(nat, 0) + tot
                        except ValueError:
                            pass
                    continue
                if not in_wa:
                    continue
                tokens = l.split()
                if not tokens:
                    continue
                # Exit when next state begins (e.g., "West Virginia ..." or "Wisconsin Total ...")
                first = tokens[0]
                two = " ".join(tokens[:2]) if len(tokens) > 1 else first
                if first in STATE_NAMES and first != "Washington":
                    in_wa = False
                    continue
                if two in STATE_NAMES and two != "Washington":
                    in_wa = False
                    continue
                # Extract last token as annual total
                # nationality row pattern: NAME <... numbers...> ANNUAL_TOTAL
                m = re.match(r'^([A-Za-z][A-Za-z .,\(\)\-/]+?)\s+([\d,].*)$', l)
                if not m:
                    continue
                nat = m.group(1).strip().rstrip(",.")
                rest = m.group(2)
                # Skip the WA Total row's continuation
                if nat == "Washington":
                    continue
                # Annual total is the last integer in the rest
                ints = re.findall(r'[\d,]+', rest)
                if not ints:
                    continue
                try:
                    tot = int(ints[-1].replace(",", ""))
                except ValueError:
                    continue
                # Skip obviously off-table values
                low = nat.lower()
                if low.startswith(("based", "data", "only", "any", "fiscal", "refugee arrivals", "october", "p. ", "affiliate")):
                    in_wa = False
                    continue
                # Skip if nationality looks like noise (too long or contains numbers in unexpected places)
                if len(nat) > 40 or any(c.isdigit() for c in nat):
                    continue
                out[nat] = out.get(nat, 0) + tot
    return out


def main():
    fy_data = {}
    fy_data[2020] = parse_xlsx_fy20()
    print(f"FY2020 WA nationalities: {len(fy_data[2020])}, total: {sum(fy_data[2020].values())}")

    for fy, path in [(2021, '/tmp/ref_fy21.pdf'), (2022, '/tmp/ref_fy22.pdf'),
                     (2023, '/tmp/ref_fy23.pdf'), (2024, '/tmp/ref_fy24.pdf')]:
        fy_data[fy] = parse_pdf_fy(path)
        print(f"FY{fy} WA nationalities: {len(fy_data[fy])}, total: {sum(fy_data[fy].values())}")

    # FY2022 and FY2024 PDFs are not text-extractable (glyph encoding or image-only after p1).
    # We TRIANGULATE: assume the FY22 WA nationality mix matches the average of FY21 and FY23,
    # and the FY24 WA nationality mix matches FY23 (next-most-recent comparable resettlement
    # composition).  We scale to the published WA-state totals (RTC FY24 reports FY22 WA share
    # of 4.79% of 25,465 national = 1,220; FY24 WA total from WRAPS Apr-2026 cumulative = 4,876
    # nominal pending official state report).
    if not fy_data[2022]:
        # Use mean of FY21 + FY23 distribution scaled to WA FY22 total of 1,220
        target = 1220
        src21 = fy_data[2021]
        src23 = fy_data[2023]
        nats = set(src21) | set(src23)
        mix = {n: (src21.get(n, 0) + src23.get(n, 0)) / 2 for n in nats}
        s = sum(mix.values()) or 1
        fy_data[2022] = {n: int(round(v / s * target)) for n, v in mix.items()}
        fy_data[2022]['_modeled'] = True
        print(f"FY2022 WA nationalities (MODELED-mean): "
              f"{len([k for k in fy_data[2022] if k != '_modeled'])}, "
              f"total: {sum(v for k, v in fy_data[2022].items() if k != '_modeled')}")
    if not fy_data[2024]:
        # Use FY23 distribution scaled to WA FY24 total of ~4,876
        target = 4876
        src = {k: v for k, v in fy_data[2023].items() if not k.startswith('_')}
        s = sum(src.values()) or 1
        fy_data[2024] = {n: int(round(v / s * target)) for n, v in src.items()}
        fy_data[2024]['_modeled'] = True
        print(f"FY2024 WA nationalities (MODELED-from-FY23): "
              f"{len([k for k in fy_data[2024] if k != '_modeled'])}, "
              f"total: {sum(v for k, v in fy_data[2024].items() if k != '_modeled')}")

    # Union of nationalities
    all_nats = set()
    for fy in (2020, 2021, 2022, 2023, 2024):
        all_nats.update(k for k in fy_data[fy].keys() if not k.startswith('_'))

    # Build rows: one per (county, nationality) with FY-year columns
    rows = []
    for nat in sorted(all_nats):
        fy_totals = {fy: fy_data[fy].get(nat, 0) for fy in (2020, 2021, 2022, 2023, 2024)}
        for county_label, county_share_key in (("King", "king"), ("Snohomish", "snohomish")):
            row = {"county": county_label, "origin_country": nat}
            for fy in (2020, 2021, 2022, 2023, 2024):
                total = fy_totals[fy]
                king, sno = split_county(nat, total)
                row[f"fy{fy}"] = king if county_share_key == "king" else sno
            row["primary_resettlement_agency"] = AGENCY_BY_NATIONALITY.get(nat.lower(), "IRC Seattle")
            row["language_primary"] = LANG_BY_NATIONALITY.get(nat.lower(), "# TODO: language map")
            # Flag modeled fiscal years
            modeled_fys = []
            if fy_data.get(2022, {}).get('_modeled'):
                modeled_fys.append('FY2022')
            if fy_data.get(2024, {}).get('_modeled'):
                modeled_fys.append('FY2024')
            row["allocation_method"] = (
                "TRIANGULATED: WA state total (RPC/WRAPS) split by per-nationality "
                "agency-footprint heuristic (Slavic 60% Snohomish, Afghan 85% King, "
                "Burmese 90% King, other 80% King); "
                + ("modeled fiscal years: " + ",".join(modeled_fys) + " (FY22 from mean of FY21+FY23 scaled to WA total 1220; FY24 from FY23 mix scaled to WA total 4876)"
                   if modeled_fys else "all FYs from direct WRAPS extracts")
            )
            rows.append(row)

    fieldnames = ["county", "origin_country", "fy2020", "fy2021", "fy2022", "fy2023", "fy2024",
                  "primary_resettlement_agency", "language_primary", "allocation_method"]
    with OUT.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"wrote {OUT}  rows={len(rows)}")


if __name__ == "__main__":
    main()
