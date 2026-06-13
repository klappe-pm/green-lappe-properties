#!/usr/bin/env python3
"""
Effort 6: Synthesis, Scoring, and Final Report
Build joined dataset + three composite scores per ZCTA.

Weights and inputs are documented in the prompt (Demographic Research Prompts.md
section "Prompt 6"). This script is the canonical computation. Re-running
produces an identical green-property-management-final-dataset.csv.
"""

import csv
import json
import math
import os
import sys
from collections import defaultdict

REPORTS = "/Users/kevinlappe/Projects/green-lappe-properties/docs/research/reports"
OUT = os.path.join(REPORTS, "effort-6")
os.makedirs(OUT, exist_ok=True)


# ---------- I/O helpers ----------
def read_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def to_float(s, default=None):
    if s is None:
        return default
    s = str(s).strip()
    if s == "" or s.startswith("#") or s.lower() == "nan":
        return default
    try:
        return float(s)
    except ValueError:
        return default


def write_csv(path, rows, fieldnames):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)


# ---------- Load inputs ----------
zip_master = read_csv(f"{REPORTS}/effort-0/zip-master.csv")
juris_crosswalk = read_csv(f"{REPORTS}/effort-0/jurisdiction-crosswalk.csv")
zip_school = read_csv(f"{REPORTS}/effort-1/zip-school-crosswalk.csv")
housing = read_csv(f"{REPORTS}/effort-2/housing-zip.csv")
small_port = read_csv(f"{REPORTS}/effort-2/small-portfolio-stock-modeled.csv")
permits = read_csv(f"{REPORTS}/effort-2/permits-adu-dadu.csv")
demographics = read_csv(f"{REPORTS}/effort-3/demographics-zip.csv")
pop_fill = read_csv(f"{REPORTS}/effort-3/zip-master-population-fill.csv")
visa = read_csv(f"{REPORTS}/effort-3/visa-cohorts.csv")
lca = read_csv(f"{REPORTS}/effort-4/lca-by-zip.csv")
cohort = read_csv(f"{REPORTS}/effort-4/cohort-analysis.csv")
childcare_gap = read_csv(f"{REPORTS}/effort-5/childcare-gap-zip.csv")
daycare_zoning = read_csv(f"{REPORTS}/effort-5/daycare-zoning-matrix.csv")
rental_reg = read_csv(f"{REPORTS}/effort-5/rental-regulatory-matrix.csv")


# ---------- Build keyed dicts ----------
def by_zip(rows, key="zcta"):
    return {r[key]: r for r in rows if r.get(key)}


m_master = by_zip(zip_master)
m_school = by_zip(zip_school)
m_housing = by_zip(housing)
m_small = by_zip(small_port)
m_demo = by_zip(demographics)
m_popfill = by_zip(pop_fill)
m_visa = by_zip(visa)
m_lca = by_zip(lca)
m_childcare = by_zip(childcare_gap)
m_zoning = by_zip(daycare_zoning, key="jurisdiction")
m_rental_reg = by_zip(rental_reg, key="jurisdiction")


# ---------- Permits aggregation (jurisdiction -> 2019-2024 total + last-yr velocity) ----------
permits_by_jur = defaultdict(lambda: {"total": 0.0, "y2024": 0.0})
for r in permits:
    j = r["jurisdiction"]
    yr = int(r["year"])
    issued = to_float(r["permits_issued"], 0.0) or 0.0
    permits_by_jur[j]["total"] += issued
    if yr == 2024:
        permits_by_jur[j]["y2024"] = issued


def jurisdiction_for_zip(z):
    """Map ZCTA primary city/unincorporated to a jurisdiction key for permits/zoning."""
    rec = m_master.get(z, {})
    city = (rec.get("city_primary") or "").strip()
    unincorp = to_float(rec.get("unincorporated_share"), 0.0) or 0.0
    county = (rec.get("county_primary") or "").strip()
    # Heuristic: LARGE_UNINC flag or unincorp > 0.5 -> use County Code
    flags = (rec.get("anomaly_flags") or "")
    if "LARGE_UNINC" in flags or unincorp >= 0.5:
        return f"Unincorporated {county}", county
    return city, county


# ---------- Define in-scope ZCTAs ----------
in_scope = [r for r in zip_master if (r.get("in_scope_primary") or "").lower() == "true"]
in_scope_zips = [r["zcta"] for r in in_scope]
print(f"[scope] in-scope ZCTAs: {len(in_scope_zips)}")


# ---------- Merge population fill (Effort 3) back into zip-master values ----------
for z in in_scope_zips:
    p = m_popfill.get(z, {})
    if z in m_master:
        if to_float(m_master[z].get("population_2014")) is None:
            m_master[z]["population_2014"] = p.get("population_2014_modeled", "") or m_master[z].get("population_2014", "")
        if to_float(m_master[z].get("population_cagr_10yr")) is None:
            m_master[z]["population_cagr_10yr"] = p.get("population_cagr_10yr_pct", "") or m_master[z].get("population_cagr_10yr", "")


# ---------- LEP × renter × tech intermediate ----------
# Tech-employer concentration proxy: LCA total FY24 (lca_total_fy2024). Default 0 for non-listed.
# Renter density: renter_households / households_total (already in demographics renter_hh_share_pct).
# LEP density: lep_pct (percent).


# ---------- Visa-cohort renter density ----------
# total_visa_renter_est / renter_households (renter_hh from demographics).


# ---------- Tech cohort exposure (per ZCTA) ----------
# Approximate via LCA FY24 share of renter_hh; cap at 0.35. Use diversification penalty above.
# (We do not have a direct "tech cohort share" per ZCTA outside cohort-analysis top5 lists.)


# ---------- Regulatory complexity / friendliness ----------
# Complexity index: count of "yes"/restrictive flags in rental_reg by jurisdiction.
# Friction inverse: low complexity -> high friendliness.
REG_FRICTION_KEYS = [
    "just_cause_eviction", "rent_stabilization_local", "source_of_income_protection",
    "fair_chance_housing", "landlord_licensing_required", "rental_inspection_program",
    "first_in_time_tenant_selection",
]


def reg_friction_score(jur_name):
    rec = m_rental_reg.get(jur_name)
    if not rec:
        # Try County Code fallback
        rec = m_rental_reg.get(f"Unincorporated {jur_name}") or m_rental_reg.get(jur_name + " County")
    if not rec:
        # Default Washington-state RCW baseline (medium friction)
        return 2.0
    score = 0.0
    for k in REG_FRICTION_KEYS:
        v = (rec.get(k) or "").lower().strip()
        if v in ("yes", "true", "hb1217-only"):
            score += 1.0
        elif v in ("partial", "limited"):
            score += 0.5
    # STR restrictions add complexity
    if (rec.get("str_restrictions") or "").lower() not in ("", "none specified", "no", "none"):
        score += 0.5
    return score


# ---------- Daycare zoning permissiveness ----------
ZONE_STATUS_SCORE = {
    "by-right": 1.0,
    "permitted": 1.0,
    "administrative-permit": 0.7,
    "admin-permit": 0.7,
    "conditional": 0.4,
    "conditional-use": 0.4,
    "prohibited": 0.0,
    "restricted": 0.2,
}


def daycare_zoning_score(jur_name):
    rec = m_zoning.get(jur_name)
    if not rec:
        rec = m_zoning.get(f"Unincorporated {jur_name}") or m_zoning.get(jur_name + " County")
    if not rec:
        # RCW 35.63.185 preempts: family child care by-right baseline statewide
        return 0.8
    status = (rec.get("in_home_residential_status") or "").lower().strip()
    base = ZONE_STATUS_SCORE.get(status, 0.6)
    # bonus if commercial daycare zones are broad
    czones = rec.get("commercial_daycare_zones") or ""
    nzones = len([z for z in czones.split(";") if z.strip()])
    if nzones >= 5:
        base += 0.2
    elif nzones >= 3:
        base += 0.1
    return min(1.0, base)


# ---------- Build per-ZCTA raw feature vector ----------
records = []
for z in in_scope_zips:
    rec_master = m_master[z]
    rec_school = m_school.get(z, {})
    rec_house = m_housing.get(z, {})
    rec_small = m_small.get(z, {})
    rec_demo = m_demo.get(z, {})
    rec_visa = m_visa.get(z, {})
    rec_lca = m_lca.get(z, {})
    rec_child = m_childcare.get(z, {})

    jur, county = jurisdiction_for_zip(z)

    # Population values
    pop_2024 = to_float(rec_demo.get("population_2024")) or to_float(rec_master.get("population_2024")) or 0.0
    pop_cagr = to_float(rec_demo.get("population_cagr_10yr_pct"))
    if pop_cagr is None:
        pop_cagr = to_float(m_popfill.get(z, {}).get("population_cagr_10yr_pct"))
    if pop_cagr is None:
        pop_cagr = 0.0

    # Renter household counts (housing) + small-portfolio
    renter_hh = to_float(rec_house.get("renter_households_est")) or to_float(rec_demo.get("renter_households")) or 0.0
    renter_sp = to_float(rec_house.get("renter_hh_in_small_portfolio_est")) or 0.0

    # ADU permits jurisdiction velocity (last yr / total)
    pdata = permits_by_jur.get(jur, {"total": 0.0, "y2024": 0.0})
    # Some unincorporated zips key under "Unincorporated King (King DLS)" etc; tolerate variants
    if pdata["total"] == 0.0:
        for jk, jv in permits_by_jur.items():
            if jur.split()[0] in jk:
                pdata = jv
                break
    adu_velocity = pdata["y2024"]  # raw permits last year for the jurisdiction
    adu_total_5yr = pdata["total"]
    rate_locked = to_float(rec_house.get("rate_locked_owner_pct_est")) or 0.0
    # Tech-relocation proxy: bachelors share × foreign-born share (signal of mobile workforce)
    bach = to_float(rec_demo.get("pct_bachelors_or_higher")) or 0.0
    fborn = to_float(rec_demo.get("foreign_born_pct")) or 0.0
    tech_reloc = (bach / 100.0) * (fborn / 100.0)
    # Composite "accidental landlord supply": normalize the three sub-inputs later, then average
    # We expose raw components: adu_velocity, rate_locked, tech_reloc.

    # LEP × renter × tech-employer concentration
    lep_pct = to_float(rec_demo.get("lep_pct")) or 0.0
    renter_share = to_float(rec_demo.get("renter_hh_share_pct")) or 0.0
    lca_fy24 = to_float(rec_lca.get("lca_total_fy2024")) or 0.0
    # Combined raw product (will be normalized)
    lep_renter_tech = (lep_pct / 100.0) * (renter_share / 100.0) * lca_fy24

    # Visa-cohort renter density
    visa_renter = to_float(rec_visa.get("total_visa_renter_est")) or 0.0
    visa_density = (visa_renter / renter_hh) if renter_hh > 0 else 0.0

    # Tech cohort exposure share (per-ZCTA)
    tech_share = (lca_fy24 / renter_hh) if renter_hh > 0 else 0.0  # LCAs per renter HH

    # Employer commute-shed access: average commute to top hubs (lower better; we'll invert)
    commute_keys = [
        "commute_min_seattle_cbd", "commute_min_slu", "commute_min_bellevue_cbd",
        "commute_min_redmond_msft", "commute_min_everett_boeing", "commute_min_renton_boeing",
    ]
    commutes = [to_float(rec_demo.get(k)) for k in commute_keys]
    commutes = [c for c in commutes if c is not None]
    avg_commute = (sum(commutes) / len(commutes)) if commutes else 60.0
    min_commute = min(commutes) if commutes else 60.0

    # Regulatory complexity (positive for PM moat; inverse for rental friendliness)
    reg_complex = reg_friction_score(jur)

    # School quality composite
    school_q = to_float(rec_school.get("zip_school_quality_composite")) or 50.0

    # Housing financials
    rtp = to_float(rec_house.get("rent_to_price_ratio_monthly_pct")) or 0.0
    rent_growth_36 = to_float(rec_house.get("rent_growth_36mo_pct")) or 0.0
    dom_rental = to_float(rec_house.get("days_on_market_rental")) or 30.0
    vacancy = to_float(rec_house.get("vacancy_rate")) or 5.0
    owner_pct = to_float(rec_house.get("owner_occupied_pct")) or 50.0
    median_income = to_float(rec_demo.get("median_hh_income")) or 0.0

    # Daycare conversion features
    under5 = to_float(rec_demo.get("pct_under_5")) or 0.0
    under5_density = to_float(rec_demo.get("under_5_density_per_sqmi")) or 0.0
    gap_per100 = to_float(rec_child.get("children_per_100_slots")) or 100.0
    zoning_perm = daycare_zoning_score(jur)
    # Facility trend
    fopen = to_float(rec_child.get("facility_open_3yr"))
    fclose = to_float(rec_child.get("facility_close_3yr"))
    if fopen is None or fclose is None:
        fac_trend = 0.0  # neutral when TODO
    else:
        fac_trend = fopen - fclose

    # High-income employment proximity = inverse of commute to highest-paid hub
    hi_emp_prox = -min_commute  # invert later via normalization

    rec = {
        "zcta": z,
        "city_primary": rec_master.get("city_primary"),
        "county_primary": rec_master.get("county_primary"),
        "county_secondary": rec_master.get("county_secondary"),
        "classification": rec_master.get("classification"),
        "jurisdiction_for_regs": jur,
        "population_2024": pop_2024,
        "population_cagr_10yr_pct": pop_cagr,
        "renter_households_est": renter_hh,
        "renter_hh_in_small_portfolio_est": renter_sp,
        "renter_hh_share_pct": renter_share,
        "owner_occupied_pct": owner_pct,
        "median_hh_income": median_income,
        "median_home_value_2025": to_float(rec_house.get("median_home_value_2025")),
        "median_rent_2br": to_float(rec_house.get("median_rent_2br")),
        "rent_to_price_ratio_monthly_pct": rtp,
        "rent_growth_36mo_pct": rent_growth_36,
        "days_on_market_rental": dom_rental,
        "vacancy_rate": vacancy,
        "rate_locked_owner_pct_est": rate_locked,
        "adu_permits_2024_jurisdiction": adu_velocity,
        "adu_permits_5yr_jurisdiction": adu_total_5yr,
        "tech_relocation_proxy": tech_reloc,
        "lep_pct": lep_pct,
        "foreign_born_pct": fborn,
        "pct_bachelors_or_higher": bach,
        "lca_total_fy2024": lca_fy24,
        "lep_renter_tech_raw": lep_renter_tech,
        "total_visa_renter_est": visa_renter,
        "visa_renter_density": visa_density,
        "tech_cohort_share_proxy": tech_share,
        "avg_commute_min": avg_commute,
        "min_commute_min": min_commute,
        "reg_complexity_score": reg_complex,
        "zip_school_quality_composite": school_q,
        "multi_zone_zip_flag": rec_school.get("multi_zone_zip_flag", "false"),
        "pct_under_5": under5,
        "under_5_density_per_sqmi": under5_density,
        "children_per_100_slots": gap_per100,
        "zoning_permissiveness": zoning_perm,
        "facility_net_3yr": fac_trend,
        "avg_tuition_infant": to_float(rec_child.get("avg_tuition_infant")),
        "tuition_to_median_income_ratio": to_float(rec_child.get("tuition_to_median_income_ratio")),
        "top_language_1_name": rec_demo.get("top_language_1_name"),
        "top_language_2_name": rec_demo.get("top_language_2_name"),
        "moe_flags": rec_demo.get("moe_flags"),
        "anomaly_flags": rec_master.get("anomaly_flags"),
    }
    records.append(rec)


# ---------- Min-max normalization ----------
def minmax(values, inverse=False):
    """Return list of normalized [0,1] values; inverse=True flips so low->1."""
    vmin = min(values)
    vmax = max(values)
    rng = vmax - vmin
    if rng == 0:
        return [0.5] * len(values)
    out = [(v - vmin) / rng for v in values]
    if inverse:
        out = [1.0 - x for x in out]
    return out


def winsorize(values, lo_q=0.02, hi_q=0.98):
    """Cap outliers at the 2nd/98th percentile to stabilize min-max scaling."""
    sv = sorted(values)
    n = len(sv)
    lo = sv[int(n * lo_q)]
    hi = sv[int(n * hi_q)]
    return [min(max(v, lo), hi) for v in values]


# Pull feature arrays
def col(name):
    return [r.get(name) or 0.0 for r in records]


# Winsorize heavy-tail features then min-max
def norm(name, inverse=False, wins=True):
    vals = [r.get(name) for r in records]
    vals = [v if v is not None else 0.0 for v in vals]
    if wins:
        vals = winsorize(vals)
    return minmax(vals, inverse=inverse)


n_renter_sp = norm("renter_hh_in_small_portfolio_est")
n_adu_velocity = norm("adu_permits_2024_jurisdiction")
n_rate_locked = norm("rate_locked_owner_pct_est")
n_tech_reloc = norm("tech_relocation_proxy")
n_lep_renter_tech = norm("lep_renter_tech_raw")
n_visa_density = norm("visa_renter_density")
n_reg_complex = norm("reg_complexity_score")
n_tech_share = norm("tech_cohort_share_proxy")
n_avg_commute = norm("avg_commute_min", inverse=True)
n_pop_cagr = norm("population_cagr_10yr_pct")

n_school = norm("zip_school_quality_composite")
n_rtp = norm("rent_to_price_ratio_monthly_pct")
n_rent_growth = norm("rent_growth_36mo_pct")
n_dom = norm("days_on_market_rental", inverse=True)
n_vac = norm("vacancy_rate", inverse=True)
n_owner = norm("owner_occupied_pct")
n_income = norm("median_hh_income")
n_reg_friendly = norm("reg_complexity_score", inverse=True)
n_min_commute = norm("min_commute_min", inverse=True)

n_under5_density = norm("under_5_density_per_sqmi")
n_gap = norm("children_per_100_slots")  # higher gap_per_100 = better daycare opp
n_zoning = norm("zoning_permissiveness")
n_fac_trend = norm("facility_net_3yr")

# DOM+vacancy combined (housing inverse): avg of two
n_dom_vac = [(a + b) / 2 for a, b in zip(n_dom, n_vac)]
# Tenant stability proxies: owner-renter mix (owner_pct) + income
n_stability = [(a + b) / 2 for a, b in zip(n_owner, n_income)]


# Accidental-landlord composite (ADU velocity + rate-locked + tech-relocation): average
n_accidental = [(a + b + c) / 3 for a, b, c in zip(n_adu_velocity, n_rate_locked, n_tech_reloc)]


# Tech cohort exposure cap with diversification penalty:
# If raw tech_cohort_share_proxy is in the top quartile threshold (proxy >= 35th percentile of *renters*),
# AND the share is over 35% of renter_hh, apply a penalty.
# Practical implementation: if tech_share > 0.35 -> tech_factor = 1.0 - (share - 0.35) * 2 clamped [0, 1]
def tech_exposure_score(r, n_share_val):
    share = r.get("tech_cohort_share_proxy") or 0.0
    if share > 0.35:
        penalty = min(0.5, (share - 0.35) * 2.0)
        return max(0.0, n_share_val * (1.0 - penalty))
    return n_share_val


n_tech_capped = [tech_exposure_score(r, n_tech_share[i]) for i, r in enumerate(records)]


# Daycare proximity to high-income employment: combine min_commute (closer better) × income
n_hi_emp_prox = [(a + b) / 2 for a, b in zip(n_min_commute, n_income)]


# ---------- Compose three scores ----------
PM_W = {
    "renter_sp": 0.22,
    "accidental": 0.16,
    "lep_renter_tech": 0.14,
    "visa": 0.12,
    "reg_complex": 0.10,
    "tech": 0.10,
    "commute": 0.10,
    "pop_growth": 0.06,
}
RENTAL_W = {
    "school": 0.28,
    "rtp": 0.20,
    "rent_growth": 0.12,
    "dom_vac": 0.10,
    "stability": 0.12,
    "reg_friendly": 0.10,
    "commute": 0.08,
}
DAYCARE_W = {
    "under5": 0.20,
    "gap": 0.22,
    "zoning": 0.20,
    "income": 0.12,
    "hi_emp": 0.10,
    "fac_trend": 0.08,
    "school": 0.08,
}

assert abs(sum(PM_W.values()) - 1.0) < 1e-9
assert abs(sum(RENTAL_W.values()) - 1.0) < 1e-9
assert abs(sum(DAYCARE_W.values()) - 1.0) < 1e-9

# Compute scores 0-100
pm_scores = []
rental_scores = []
daycare_scores = []
for i, r in enumerate(records):
    pm = (
        PM_W["renter_sp"] * n_renter_sp[i]
        + PM_W["accidental"] * n_accidental[i]
        + PM_W["lep_renter_tech"] * n_lep_renter_tech[i]
        + PM_W["visa"] * n_visa_density[i]
        + PM_W["reg_complex"] * n_reg_complex[i]
        + PM_W["tech"] * n_tech_capped[i]
        + PM_W["commute"] * n_avg_commute[i]
        + PM_W["pop_growth"] * n_pop_cagr[i]
    )
    rental = (
        RENTAL_W["school"] * n_school[i]
        + RENTAL_W["rtp"] * n_rtp[i]
        + RENTAL_W["rent_growth"] * n_rent_growth[i]
        + RENTAL_W["dom_vac"] * n_dom_vac[i]
        + RENTAL_W["stability"] * n_stability[i]
        + RENTAL_W["reg_friendly"] * n_reg_friendly[i]
        + RENTAL_W["commute"] * n_min_commute[i]
    )
    daycare = (
        DAYCARE_W["under5"] * n_under5_density[i]
        + DAYCARE_W["gap"] * n_gap[i]
        + DAYCARE_W["zoning"] * n_zoning[i]
        + DAYCARE_W["income"] * n_income[i]
        + DAYCARE_W["hi_emp"] * n_hi_emp_prox[i]
        + DAYCARE_W["fac_trend"] * n_fac_trend[i]
        + DAYCARE_W["school"] * n_school[i]
    )
    pm_scores.append(round(pm * 100, 2))
    rental_scores.append(round(rental * 100, 2))
    daycare_scores.append(round(daycare * 100, 2))


# Geometric mean for dual-use
def geomean(a, b):
    if a <= 0 or b <= 0:
        return 0.0
    return math.sqrt(a * b)


dual_scores = [round(geomean(rental_scores[i], daycare_scores[i]), 2) for i in range(len(records))]


# Ranks
def rank_desc(values):
    sorted_pairs = sorted(enumerate(values), key=lambda x: -x[1])
    ranks = [0] * len(values)
    for r, (i, _) in enumerate(sorted_pairs, start=1):
        ranks[i] = r
    return ranks


pm_ranks = rank_desc(pm_scores)
rental_ranks = rank_desc(rental_scores)
daycare_ranks = rank_desc(daycare_scores)
dual_ranks = rank_desc(dual_scores)

for i, r in enumerate(records):
    r["pm_score"] = pm_scores[i]
    r["pm_rank"] = pm_ranks[i]
    r["rental_score"] = rental_scores[i]
    r["rental_rank"] = rental_ranks[i]
    r["daycare_score"] = daycare_scores[i]
    r["daycare_rank"] = daycare_ranks[i]
    r["dual_use_score"] = dual_scores[i]
    r["dual_use_rank"] = dual_ranks[i]
    # Store normalized components for transparency
    r["_n_renter_sp"] = round(n_renter_sp[i], 4)
    r["_n_accidental"] = round(n_accidental[i], 4)
    r["_n_lep_renter_tech"] = round(n_lep_renter_tech[i], 4)
    r["_n_visa"] = round(n_visa_density[i], 4)
    r["_n_reg_complex"] = round(n_reg_complex[i], 4)
    r["_n_tech_capped"] = round(n_tech_capped[i], 4)
    r["_n_avg_commute"] = round(n_avg_commute[i], 4)
    r["_n_pop_growth"] = round(n_pop_cagr[i], 4)
    r["_n_school"] = round(n_school[i], 4)
    r["_n_rtp"] = round(n_rtp[i], 4)
    r["_n_rent_growth"] = round(n_rent_growth[i], 4)
    r["_n_dom_vac"] = round(n_dom_vac[i], 4)
    r["_n_stability"] = round(n_stability[i], 4)
    r["_n_reg_friendly"] = round(n_reg_friendly[i], 4)
    r["_n_min_commute"] = round(n_min_commute[i], 4)
    r["_n_under5"] = round(n_under5_density[i], 4)
    r["_n_gap"] = round(n_gap[i], 4)
    r["_n_zoning"] = round(n_zoning[i], 4)
    r["_n_income"] = round(n_income[i], 4)
    r["_n_hi_emp"] = round(n_hi_emp_prox[i], 4)
    r["_n_fac_trend"] = round(n_fac_trend[i], 4)


# ---------- Write joined dataset ----------
fieldnames = list(records[0].keys())
out_csv = os.path.join(OUT, "green-property-management-final-dataset.csv")
write_csv(out_csv, records, fieldnames)
print(f"[write] {out_csv}  rows={len(records)} cols={len(fieldnames)}")


# ---------- Persist score data for downstream scripts ----------
with open(os.path.join(OUT, "_scripts", "scored_records.json"), "w") as f:
    json.dump(records, f, indent=2, default=str)

# Also persist normalization arrays for sensitivity
norm_state = {
    "pm_weights": PM_W,
    "rental_weights": RENTAL_W,
    "daycare_weights": DAYCARE_W,
    "normalized": {
        "renter_sp": n_renter_sp,
        "accidental": n_accidental,
        "lep_renter_tech": n_lep_renter_tech,
        "visa": n_visa_density,
        "reg_complex": n_reg_complex,
        "tech_capped": n_tech_capped,
        "avg_commute": n_avg_commute,
        "pop_growth": n_pop_cagr,
        "school": n_school,
        "rtp": n_rtp,
        "rent_growth": n_rent_growth,
        "dom_vac": n_dom_vac,
        "stability": n_stability,
        "reg_friendly": n_reg_friendly,
        "min_commute": n_min_commute,
        "under5": n_under5_density,
        "gap": n_gap,
        "zoning": n_zoning,
        "income": n_income,
        "hi_emp": n_hi_emp_prox,
        "fac_trend": n_fac_trend,
    },
    "zctas": [r["zcta"] for r in records],
}
with open(os.path.join(OUT, "_scripts", "norm_state.json"), "w") as f:
    json.dump(norm_state, f)

print("[done] build_scores.py")
