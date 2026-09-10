# Content Brief — Salariés isolés : FMD vs IK vs voiture de fonction électrique (FR, P1)

_Prepared 2026-09-06. Status: shipped (4 posts live on branch `claude/sustainable-mobility-blog-posts-bcpds3`)._
_Source: user-supplied research brief "FMD, Indemnités Kilométriques ou Voiture Électrique de
Fonction : Comparatif des Coûts Employeur 2026", plus `get_keyword_metrics` on 20 candidate terms._

## Why

The source research covers a segment the existing FR blog didn't: what to do for the **minority
of employees who can't carpool** (often 15–30% of headcount) — the AEN/éco-score math, the 2026
barème kilométrique, and the prime carburant doubling. Keyword research surfaced two very large,
low-difficulty gaps that no existing TeamWheels page targets, plus one high-value near-zero-competition
niche term:

| Keyword | Volume/mo | KD | Intent | Notes |
|---|---|---|---|---|
| `barème kilométrique 2026` | 40,500 | 26 | informational | Biggest single opportunity found to date on this site. |
| `prime carburant 2026` | 40,500 | 41 | informational | Newsjack: BOSS communiqué 6 Aug 2026, temporary through 31/12/2026. |
| `indemnité kilométrique 2026` | 9,900 | 17 | commercial | Folded into the barème post rather than split (near-duplicate intent). |
| `avantage en nature véhicule électrique` | 590 | **0** | informational | Tiny volume, essentially no competition, strong DAF/comptable fit. |
| `forfait mobilité durable` | 6,600 | 26 | commercial | Already owned by existing FMD guide + money page — not re-targeted. |
| `plan de mobilité employeur` | 260 | 10 | commercial | CPC 10.63 (high B2B value) — used as the pillar's secondary target. |

No-data / too-niche terms (no DataForSEO row returned — kept as differentiator content, not SEO
targets): éco-score ADEME variants, TAI flotte automobile, prime CEE véhicule électrique, salarié
isolé covoiturage, voiture électrique de fonction (50/mo, HIGH competition).

## Pages shipped (hub + 3 spokes)

- **Hub:** `/fr/blog/mobilite-salaries-isoles-fmd-ik-voiture-electrique-2026/` — comparatif +
  méthode de segmentation + 2 cas concrets (PME 30 salariés, ETI 250 salariés). Targets `plan de
  mobilité employeur`; links down to all 3 spokes + existing FMD guide + `aides-mobilite-durable`.
- **Spoke 1:** `/fr/blog/bareme-kilometrique-2026-indemnite-domicile-travail/` — targets `barème
  kilométrique 2026` + `indemnité kilométrique 2026`. Full CV-by-CV table (verified via WebSearch
  against LégiSocial/ECA, cross-checked against the source doc's 5CV/9000km example — both match
  exactly).
- **Spoke 2:** `/fr/blog/prime-carburant-2026-600-euros-employeur.md` — targets `prime carburant
  2026`. Time-sensitive; flag for a freshness check in Q1 2027 (measure expires 31/12/2026).
- **Spoke 3:** `/fr/blog/avantage-en-nature-vehicule-electrique-fonction-eco-score-2026/` — targets
  `avantage en nature véhicule électrique` + éco-score long-tail. Most differentiated piece;
  candidate for backlink/PR outreach given near-zero competition.

## Internal linking

Hub-and-spoke, kept deliberately light per editorial guidance (no more than 2-3 contextual links
per spoke): each spoke links up to the hub once and to one TeamWheels product page
(`/fr/corporate-carpooling-software/` or `/fr/tools/savings-calculator/`). The hub links down to
all 3 spokes plus the existing `/fr/blog/forfait-mobilite-durable-guide-complet-2025/` and
`/fr/blog/aides-mobilite-durable-entreprise-regles-plafonds-cumuls/`, which now also links forward
to the hub. No cannibalization with existing FMD content — the existing guide/money page own
`forfait mobilité durable`; this batch owns the three cost-comparison terms it didn't cover.

## Fact-checking notes

- `barème kilométrique` full table and `prime carburant` doubling were independently verified via
  WebSearch (LégiSocial, Village Justice, ECA Groupe) — both matched the source doc's figures
  exactly, including the 9,000km/5CV worked example (4,608€ thermique / 5,529.60€ electric).
- AEN/éco-score figures (abattement 70%/4,641.60€, Twingo E-Tech validation date, non-eco-scored
  models) were taken as-is from the source research, which itself carries a corrections log
  against an initial brief. Not independently re-verified — flag if a future audit has spare
  DataForSEO/WebSearch budget.
- LLD loyers and Stellantis CEE amounts are estimates per the source doc — kept caveated in the
  published article rather than presented as exact.

## Success metric

Re-pull `get_search_console_performance` in ~4 weeks once indexed: watch `barème kilométrique
2026` and `prime carburant 2026` for any impressions (they're highly competitive KD-wise but the
volume makes even a page-2 ranking worth tracking), and watch internal-link clicks from the 3
spokes into the hub and into `/fr/corporate-carpooling-software/` / `/fr/tools/savings-calculator/`.

## Save/tag

Keywords saved under `topic:salaries-isoles-fmd-ik-ve` / `market:fr` / `priority:p1` /
`batch:2026-09-fmd-cost-comparison` in OpenSEO. Research log entry appended 2026-09-06.
