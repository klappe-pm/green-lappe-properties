#!/usr/bin/env python3
"""
Effort 3: Demographics, Language, Immigration builder.

Reads ACS5 2019-2023 table-based summary file pipe-delimited extracts cached
in /tmp/ (downloaded from
https://www2.census.gov/programs-surveys/acs/summary_file/2023/table-based-SF/data/5YRData/),
filters to the 107 in-scope ZCTAs from Effort 0, and emits the Effort 3
deliverables.

Tables consumed:
  B01001 -- sex by age (under-5)
  B01003 -- total population
  B03002 -- Hispanic or Latino by race
  B05002 -- place of birth / nativity (foreign-born)
  B15003 -- educational attainment
  B19013 -- median household income
  B23010 -- married-couple work experience (dual-income proxy)
  B25003 -- tenure
  B25064 -- median gross rent
  B25070 -- rent burden
  C16001 -- language spoken at home (10-language ZCTA-published collapse)
  C16002 -- household language by LEP status

Geography ID convention in the table-based SF: ZCTAs use prefix
``860Z200US`` followed by the 5-digit ZCTA.  Estimates carry the suffix
``_E###``; margins-of-error carry ``_M###``.  Special MOE sentinels
(-555555555, -666666666, -888888888) and zero estimates with zero MOE are
all valid in the source; only the -555555555 sentinel means "estimate not
applicable" and is mapped to a Python ``None``.
"""

from __future__ import annotations

import csv
import math
from pathlib import Path

ROOT = Path("/Users/kevinlappe/Projects/green-lappe-properties")
EFFORT0 = ROOT / "docs/research/reports/effort-0/zip-master.csv"
OUTDIR = ROOT / "docs/research/reports/effort-3"
TMP = Path("/tmp")

ZCTA_PREFIX = "860Z200US"
COUNTY_PREFIX = "0500000US"
SENTINELS = {"-555555555", "-666666666", "-888888888", "*****", "-9", ""}


def _to_int(v: str) -> int | None:
    if v is None or v.strip() == "" or v.strip() in SENTINELS:
        return None
    try:
        return int(v)
    except ValueError:
        try:
            return int(float(v))
        except ValueError:
            return None


def _to_float(v: str) -> float | None:
    if v is None or v.strip() == "" or v.strip() in SENTINELS:
        return None
    try:
        return float(v)
    except ValueError:
        return None


def parse_table(path: Path, zctas: set[str], var_codes: list[str], county_fips: list[str] | None = None):
    """Stream a table-based SF .dat file, return {zcta: {var: (E, M)}} and optionally
    {county_fips: {var: (E, M)}}."""
    by_zcta: dict[str, dict[str, tuple[int | None, int | None]]] = {}
    by_county: dict[str, dict[str, tuple[int | None, int | None]]] = {}
    want_county = county_fips is not None
    want_zcta = bool(zctas)
    with path.open("r", encoding="utf-8", errors="replace") as f:
        header = next(f).rstrip("\n").split("|")
        idx = {col: i for i, col in enumerate(header)}
        # Build (estimate_col, moe_col, code) triples for the requested var_codes.
        triples = []
        for code in var_codes:
            e_col = f"{code.replace('_', '_E')}" if "_E" in code else f"{code}_E"  # noop fallback
            # The actual column naming in the file is e.g. B01003_E001 and B01003_M001
            # We accept var_codes of the form B01003_001 and expand.
            base, num = code.rsplit("_", 1) if "_" in code else (code, "001")
            ecol = f"{base}_E{num}"
            mcol = f"{base}_M{num}"
            if ecol in idx and mcol in idx:
                triples.append((idx[ecol], idx[mcol], code))
        if not triples:
            raise ValueError(f"None of {var_codes} found in {path}")
        gid_idx = idx["GEO_ID"]
        for line in f:
            parts = line.rstrip("\n").split("|")
            gid = parts[gid_idx]
            if want_zcta and gid.startswith(ZCTA_PREFIX):
                z = gid[len(ZCTA_PREFIX):]
                if z in zctas:
                    rec = by_zcta.setdefault(z, {})
                    for ei, mi, code in triples:
                        rec[code] = (_to_int(parts[ei]), _to_int(parts[mi]))
            elif want_county and gid.startswith(COUNTY_PREFIX):
                cfips = gid[len(COUNTY_PREFIX):]
                if cfips in county_fips:
                    rec = by_county.setdefault(cfips, {})
                    for ei, mi, code in triples:
                        rec[code] = (_to_int(parts[ei]), _to_int(parts[mi]))
    return by_zcta, by_county


def moe_pct(e, m):
    """Return MOE as a percent of estimate, or None if not computable."""
    if e is None or m is None or e == 0:
        return None
    return abs(m) / abs(e) * 100.0


def safe_div(num, den):
    if num is None or den is None or den == 0:
        return None
    return num / den


def load_zip_master():
    rows = []
    with EFFORT0.open() as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)
    return rows


def main():
    zip_rows = load_zip_master()
    in_scope = [r for r in zip_rows if r["in_scope_primary"].strip().lower() == "true"]
    zctas = {r["zcta"] for r in in_scope}
    print(f"In-scope ZCTAs: {len(zctas)}")

    counties = ["53033", "53061"]  # King, Snohomish

    # Table-by-table pulls.
    print("Reading B01003 (population)...")
    pop_z, pop_c = parse_table(TMP / "b01003.dat", zctas, ["B01003_001"], counties)
    print("Reading B01001 (under-5)...")
    age_z, age_c = parse_table(TMP / "b01001.dat", zctas,
                                ["B01001_001", "B01001_003", "B01001_027"], counties)
    print("Reading B25003 (tenure)...")
    ten_z, ten_c = parse_table(TMP / "b25003.dat", zctas,
                                ["B25003_001", "B25003_002", "B25003_003"], counties)
    print("Reading B19013 (median HH income)...")
    inc_z, inc_c = parse_table(TMP / "b19013.dat", zctas, ["B19013_001"], counties)
    print("Reading B25064 (median gross rent)...")
    rent_z, rent_c = parse_table(TMP / "b25064.dat", zctas, ["B25064_001"], counties)
    print("Reading B25070 (rent burden)...")
    burden_codes = [f"B25070_{i:03d}" for i in range(1, 12)]
    b25070_z, b25070_c = parse_table(TMP / "b25070.dat", zctas, burden_codes, counties)
    print("Reading B03002 (race/ethnicity)...")
    race_codes = ["B03002_001", "B03002_003", "B03002_004", "B03002_006",
                  "B03002_007", "B03002_005", "B03002_008", "B03002_009", "B03002_012"]
    race_z, race_c = parse_table(TMP / "b03002.dat", zctas, race_codes, counties)
    print("Reading B05002 (foreign-born)...")
    fb_z, fb_c = parse_table(TMP / "b05002.dat", zctas,
                              ["B05002_001", "B05002_013"], counties)
    print("Reading B15003 (educ attainment)...")
    educ_codes = ["B15003_001"] + [f"B15003_{i:03d}" for i in range(22, 26)]
    educ_z, educ_c = parse_table(TMP / "b15003.dat", zctas, educ_codes, counties)
    print("Reading B23010 (married-couple work)...")
    b23010_codes = ["B23010_001", "B23010_004"]  # MC families and both FT
    b23010_z, b23010_c = parse_table(TMP / "b23010.dat", zctas, b23010_codes, counties)
    print("Reading C16001 (language)...")
    c16001_codes = ["C16001_001", "C16001_002"]
    # 10 non-English language groups: indices 3,6,9,12,15,18,21,24,27,30,33,36
    lang_groups = [
        (3, "Spanish"),
        (6, "French/Haitian/Cajun"),
        (9, "German/W.Germanic"),
        (12, "Russian/Polish/Slavic"),
        (15, "Other Indo-European"),
        (18, "Korean"),
        (21, "Chinese (Mandarin/Cantonese)"),
        (24, "Vietnamese"),
        (27, "Tagalog/Filipino"),
        (30, "Other Asian/Pacific Island"),
        (33, "Arabic"),
        (36, "Other/unspecified"),
    ]
    # Each group has _total, _vw, _lvw at offsets +0, +1, +2.
    for idx, _ in lang_groups:
        c16001_codes.append(f"C16001_{idx:03d}")        # total speakers
        c16001_codes.append(f"C16001_{idx+1:03d}")      # speak English "very well"
        c16001_codes.append(f"C16001_{idx+2:03d}")      # speak English less than very well
    lang_z, lang_c = parse_table(TMP / "c16001.dat", zctas, c16001_codes, counties)
    print("Reading C16002 (HH LEP)...")
    c16002_codes = ["C16002_001"] + [f"C16002_{i:03d}" for i in [4, 7, 10, 13]]
    c16002_z, c16002_c = parse_table(TMP / "c16002.dat", zctas, c16002_codes, counties)

    print("All tables parsed.")

    # Build demographics-zip.csv rows
    out_rows = []
    pop2014 = {}  # ZCTA -> (population_2014, source)
    for zr in in_scope:
        z = zr["zcta"]
        pop_e = pop_z.get(z, {}).get("B01003_001", (None, None))
        b01003_pop = pop_e[0]
        b01003_moe = pop_e[1]
        # households from B25003
        hh_total = ten_z.get(z, {}).get("B25003_001", (None, None))[0]
        own = ten_z.get(z, {}).get("B25003_002", (None, None))[0]
        rent = ten_z.get(z, {}).get("B25003_003", (None, None))[0]
        rent_moe = ten_z.get(z, {}).get("B25003_003", (None, None))[1]
        renter_share = safe_div(rent, hh_total)

        # Under-5 from B01001 (003 male <5 + 027 female <5)
        under_5_m = age_z.get(z, {}).get("B01001_003", (None, None))[0]
        under_5_f = age_z.get(z, {}).get("B01001_027", (None, None))[0]
        under_5 = (under_5_m or 0) + (under_5_f or 0) if (under_5_m is not None or under_5_f is not None) else None
        pct_under_5 = safe_div(under_5, b01003_pop)
        # density requires sq mi (TODO from GeoJSON, marked None for now)
        under_5_density = None  # populated below if land area available

        # Income
        median_hh_inc_e = inc_z.get(z, {}).get("B19013_001", (None, None))[0]
        median_hh_inc_m = inc_z.get(z, {}).get("B19013_001", (None, None))[1]
        # Median renter HH income is NOT in B19013; published in B25119_003 (we did not pull). Mark TODO.
        median_renter_inc = None  # TODO: B25119 not pulled

        # Rent burden
        b25070_total = b25070_z.get(z, {}).get("B25070_001", (None, None))[0]
        # 30%+ cost burdened
        burdened30 = 0
        for code in ["B25070_007", "B25070_008", "B25070_009", "B25070_010"]:
            v = b25070_z.get(z, {}).get(code, (None, None))[0]
            if v is not None:
                burdened30 += v
        pct_burdened30 = safe_div(burdened30, b25070_total)
        burdened50 = b25070_z.get(z, {}).get("B25070_010", (None, None))[0]
        pct_burdened50 = safe_div(burdened50, b25070_total)

        # Dual income proxy: married-couple families with both spouses worked FT
        mc_total = b23010_z.get(z, {}).get("B23010_001", (None, None))[0]
        mc_both_ft = b23010_z.get(z, {}).get("B23010_004", (None, None))[0]
        # This is share of married-couple families dual FT; informative but not "all HH dual income"
        pct_dual_income_hh = safe_div(mc_both_ft, hh_total)

        # Bachelor's or higher
        b15003_total = educ_z.get(z, {}).get("B15003_001", (None, None))[0]
        bach_or_higher = 0
        for code in ["B15003_022", "B15003_023", "B15003_024", "B15003_025"]:
            v = educ_z.get(z, {}).get(code, (None, None))[0]
            if v is not None:
                bach_or_higher += v
        pct_bach_higher = safe_div(bach_or_higher, b15003_total)

        # Foreign-born
        fb_tot = fb_z.get(z, {}).get("B05002_001", (None, None))[0]
        fb_born = fb_z.get(z, {}).get("B05002_013", (None, None))[0]
        pct_fb = safe_div(fb_born, fb_tot)

        # Race/ethnicity 2024 (proxy from 2019-2023 5yr)
        race_tot = race_z.get(z, {}).get("B03002_001", (None, None))[0]
        w_nh = race_z.get(z, {}).get("B03002_003", (None, None))[0]
        b_nh = race_z.get(z, {}).get("B03002_004", (None, None))[0]
        asn_nh = race_z.get(z, {}).get("B03002_006", (None, None))[0]
        hisp = race_z.get(z, {}).get("B03002_012", (None, None))[0]
        # "other" lumped: AIAN + NHPI + Other + 2+
        other_sum = 0
        for code in ["B03002_005", "B03002_007", "B03002_008", "B03002_009"]:
            v = race_z.get(z, {}).get(code, (None, None))[0]
            if v is not None:
                other_sum += v
        pct_asian = safe_div(asn_nh, race_tot)
        pct_black = safe_div(b_nh, race_tot)
        pct_hisp = safe_div(hisp, race_tot)
        pct_white_nh = safe_div(w_nh, race_tot)
        pct_other = safe_div(other_sum, race_tot)

        # Language (C16001) top 5 non-English speakers + LEP
        lang_total_pop_5plus = lang_z.get(z, {}).get("C16001_001", (None, None))[0]
        speak_english_only = lang_z.get(z, {}).get("C16001_002", (None, None))[0]
        # LEP = sum of "less than very well" across all 12 groups (idx+2 in each group)
        lep_total = 0
        lep_have_any = False
        per_lang = []  # (group_label, total_speakers, lvw)
        for idx, label in lang_groups:
            total_g = lang_z.get(z, {}).get(f"C16001_{idx:03d}", (None, None))[0]
            lvw = lang_z.get(z, {}).get(f"C16001_{idx+2:03d}", (None, None))[0]
            if lvw is not None:
                lep_total += lvw
                lep_have_any = True
            per_lang.append((label, total_g or 0, lvw or 0))
        if not lep_have_any:
            lep_total = None
        # LEP pct is LEP / pop 5+
        lep_pct = safe_div(lep_total, lang_total_pop_5plus)
        # Top-5 non-English languages by speaker count, excluding "Other/unspecified" group
        ranked = sorted([p for p in per_lang if p[0] != "Other/unspecified"], key=lambda x: -x[1])
        top5 = ranked[:5]
        # Pad if needed
        while len(top5) < 5:
            top5.append(("", 0, 0))

        # MOE flags: columns with > 20% MOE
        flags = []
        def check_moe(name, e_pair):
            e, m = e_pair
            mp = moe_pct(e, m)
            if mp is not None and mp > 20.0:
                flags.append(name)
        check_moe("population_2024", (b01003_pop, b01003_moe))
        check_moe("renter_households", (rent, rent_moe))
        check_moe("median_hh_income", (median_hh_inc_e, median_hh_inc_m))

        # 2014 race -- not pulled (would need 2014 5yr B03002); marked None
        # Commute -- populated by separate step
        out_rows.append({
            "zcta": z,
            "population_2024": b01003_pop,
            "population_2024_moe": b01003_moe,
            "households_total": hh_total,
            "renter_households": rent,
            "renter_hh_share_pct": round(renter_share * 100, 2) if renter_share is not None else None,
            "population_cagr_10yr_pct": None,  # filled by population_2014 step
            "population_2014_proxy": None,
            "population_projection_2035": None,  # filled by OFM step
            "median_hh_income": median_hh_inc_e,
            "median_renter_hh_income": median_renter_inc,
            "pct_cost_burdened_30plus": round(pct_burdened30 * 100, 2) if pct_burdened30 is not None else None,
            "pct_severely_cost_burdened_50plus": round(pct_burdened50 * 100, 2) if pct_burdened50 is not None else None,
            "pct_under_5": round(pct_under_5 * 100, 2) if pct_under_5 is not None else None,
            "under_5_count": under_5,
            "under_5_density_per_sqmi": None,
            "pct_dual_income_mc_hh": round(pct_dual_income_hh * 100, 2) if pct_dual_income_hh is not None else None,
            "pct_bachelors_or_higher": round(pct_bach_higher * 100, 2) if pct_bach_higher is not None else None,
            "foreign_born_pct": round(pct_fb * 100, 2) if pct_fb is not None else None,
            "lep_pct": round(lep_pct * 100, 2) if lep_pct is not None else None,
            "lep_speakers_5plus": lep_total,
            "top_language_1_name": top5[0][0],
            "top_language_1_speakers": top5[0][1],
            "top_language_2_name": top5[1][0],
            "top_language_2_speakers": top5[1][1],
            "top_language_3_name": top5[2][0],
            "top_language_3_speakers": top5[2][1],
            "top_language_4_name": top5[3][0],
            "top_language_4_speakers": top5[3][1],
            "top_language_5_name": top5[4][0],
            "top_language_5_speakers": top5[4][1],
            "pct_asian": round(pct_asian * 100, 2) if pct_asian is not None else None,
            "pct_black": round(pct_black * 100, 2) if pct_black is not None else None,
            "pct_hispanic": round(pct_hisp * 100, 2) if pct_hisp is not None else None,
            "pct_white_nh": round(pct_white_nh * 100, 2) if pct_white_nh is not None else None,
            "pct_other": round(pct_other * 100, 2) if pct_other is not None else None,
            "pct_asian_2014": None,
            "pct_black_2014": None,
            "pct_hispanic_2014": None,
            "pct_white_nh_2014": None,
            "commute_min_seattle_cbd": None,
            "commute_min_slu": None,
            "commute_min_bellevue_cbd": None,
            "commute_min_redmond_msft": None,
            "commute_min_everett_boeing": None,
            "commute_min_renton_boeing": None,
            "moe_flags": ";".join(flags),
            "acs_vintage": "ACS5 2019-2023",
        })

    # Sort by zcta string
    out_rows.sort(key=lambda r: r["zcta"])

    # Write demographics-zip-acs.csv (without commute/projection/2014 yet)
    out_path = OUTDIR / "demographics-zip-acs.csv"
    fieldnames = list(out_rows[0].keys())
    with out_path.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in out_rows:
            w.writerow(r)
    print(f"wrote {out_path}  rows={len(out_rows)}")

    # Also emit a county-level summary for QA
    county_out = OUTDIR / "_county-summary.csv"
    with county_out.open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["county_fips", "county_name", "pop_b01003", "hh_total", "renter_hh",
                    "median_hh_inc", "lep_speakers_5plus", "foreign_born", "pct_asian", "pct_black", "pct_hispanic", "pct_white_nh"])
        for c, name in [("53033", "King"), ("53061", "Snohomish")]:
            pop = pop_c.get(c, {}).get("B01003_001", (None,))[0]
            hh = ten_c.get(c, {}).get("B25003_001", (None,))[0]
            r = ten_c.get(c, {}).get("B25003_003", (None,))[0]
            inc = inc_c.get(c, {}).get("B19013_001", (None,))[0]
            lep_tot = 0
            for idx, _ in lang_groups:
                lvw = lang_c.get(c, {}).get(f"C16001_{idx+2:03d}", (None,))[0]
                if lvw is not None:
                    lep_tot += lvw
            fb = fb_c.get(c, {}).get("B05002_013", (None,))[0]
            rtot = race_c.get(c, {}).get("B03002_001", (None,))[0]
            asn = race_c.get(c, {}).get("B03002_006", (None,))[0]
            blk = race_c.get(c, {}).get("B03002_004", (None,))[0]
            hsp = race_c.get(c, {}).get("B03002_012", (None,))[0]
            wht = race_c.get(c, {}).get("B03002_003", (None,))[0]
            w.writerow([c, name, pop, hh, r, inc, lep_tot, fb,
                        round(asn / rtot * 100, 2) if asn and rtot else None,
                        round(blk / rtot * 100, 2) if blk and rtot else None,
                        round(hsp / rtot * 100, 2) if hsp and rtot else None,
                        round(wht / rtot * 100, 2) if wht and rtot else None])
    print(f"wrote {county_out}")

    # ---- language-clusters.csv ----
    # Per language (10 ACS C16001 groups), aggregate two-county totals,
    # find top-5 ZCTAs by speaker count, compute LEP share.
    cluster_path = OUTDIR / "language-clusters.csv"
    with cluster_path.open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow([
            "language_group", "top_5_zctas", "total_speakers_two_county",
            "lep_speakers_two_county", "lep_share_pct",
            "growth_2014_2024_pct", "dominant_resettlement_agency",
            "notes",
        ])
        agency_map = {
            "Russian/Polish/Slavic": "World Relief WW (primary for Russian/Ukrainian)",
            "Other Indo-European": "JFS Seattle / Lutheran Community Services NW",
            "Spanish": "n/a (predominantly economic migration, not resettlement)",
            "Arabic": "IRC Seattle / Lutheran Community Services NW",
            "Other Asian/Pacific Island": "IRC Seattle / Lutheran Community Services NW",
            "Korean": "n/a",
            "Chinese (Mandarin/Cantonese)": "n/a",
            "Vietnamese": "n/a (legacy SE Asian resettlement; mature community)",
            "Tagalog/Filipino": "n/a",
            "French/Haitian/Cajun": "n/a",
            "German/W.Germanic": "n/a",
            "Other/unspecified": "n/a",
        }
        # Aggregate per language across in-scope ZCTAs
        for idx, label in lang_groups:
            per_z = []
            tot_speakers = 0
            lep_count = 0
            for z in zctas:
                t = lang_z.get(z, {}).get(f"C16001_{idx:03d}", (None,))[0]
                l = lang_z.get(z, {}).get(f"C16001_{idx+2:03d}", (None,))[0]
                if t is not None:
                    per_z.append((z, t))
                    tot_speakers += t
                if l is not None:
                    lep_count += l
            per_z.sort(key=lambda x: -x[1])
            top5 = [z for z, _ in per_z[:5]]
            lep_share = round(lep_count / tot_speakers * 100, 2) if tot_speakers else None
            w.writerow([
                label, ";".join(top5), tot_speakers, lep_count, lep_share,
                "# TODO: 2014 ACS5 not pulled at ZCTA",
                agency_map.get(label, "n/a"),
                "C16001 collapsed; B16001 detailed language only at state level",
            ])
    print(f"wrote {cluster_path}")


if __name__ == "__main__":
    main()
