# Keyword Cluster Map — TeamWheels — 2026-06-24

Built from live GSC `query+page` data (364 rows, last 6 months). Intent + real ranking-page
mapping, not lexical grouping. Goal lens: **qualified B2B demo requests**.

## Mapping summary

- **8 clusters** identified (2 high-value commercial EN/FR, 1 buyer-adjacent how-to, 1 brand, 1 differentiator, 1 low-intent traffic magnet, 1 junk).
- **Pages to create:** 1 — a dedicated EN commercial **"Corporate Carpooling Software"** landing page (currently the homepage does this job at avg pos ~24, fighting 10 other URLs).
- **Pages to update:** homepage EN/FR, `how-it-works`, the two EN commercial guides (titles/meta), category/tag pages (de-optimize from commercial terms).
- **Cannibalization (severe):** `corporate carpooling` splits across **11 URLs**, `corporate carpooling solution` 7, `corporate carpooling software` 6, `employee transport sharing` 6. The blog guide, homepage, `/en/tools`, category, tag, and blog-index pages all compete → none ranks on page 1.
- **Consolidation:** two duplicate Paris périphérique guides (2025 + 2026) cannibalize each other.

## Cluster table

| Cluster | Primary keyword | Secondary keywords | Intent | Target page | Priority | Notes |
| ------- | --------------- | ------------------ | ------ | ----------- | -------- | ----- |
| A. Corporate carpooling software (EN) | corporate carpooling software | corporate carpool software, corporate carpooling solution, carpool management software, carpool software, corporate carpooling, corporate carpooling app, carpool administration software, office carpooling | Commercial / buyer | **NEW** `/en/corporate-carpooling-software/` (or harden `/en/` as canonical) | **P1** | ~500+ impr pooled, pos 13–38, **0 clicks**; split across 6–11 URLs. The demo driver. |
| B. Employee commute / program (EN) | employee transport sharing | workplace ride sharing, employee carpool programs, office commute carpool, employee carpool, employee commuting, commute management platform | Commercial / HR-program | Fold strongest terms into Cluster A page; support with `/en/blog/carpooling-to-work-corporate-guide` | P2 | 250+ impr, pos 12–27. HR-framed buyers. |
| C. Covoiturage entreprise (FR) | outil covoiturage entreprise | covoiturage entreprise, application covoiturage entreprise, logiciel covoiturage, covoiturage d'entreprise, covoiturage au travail, covoiturage domicile travail, covoiturage entre collègues | Commercial / buyer (FR) | Harden `/fr/` as canonical commercial (or NEW `/fr/logiciel-covoiturage-entreprise/`) | **P1** | `outil covoiturage entreprise` = 220 impr at **pos 14** — striking distance. /fr fights 2 blog posts. |
| D. Paris carpool-lane schedules (FR) | voie covoiturage périphérique paris horaires 2026 | voie covoiturage a1 horaire, voie de covoiturage paris horaire, horaire covoiturage paris periph, heure covoiturage paris (+ many horaire/voie variants) | Informational (commuters) | **Consolidate** 2025+2026 guides → one canonical `/fr/blog/voies-covoiturage-paris-peripherique-guide-2026/` | P3 | Biggest impressions on site (~400+) but NOT buyers. CTR <1%. Keep as ToF magnet + add product CTA. |
| E. Brand | teamwheels | team wheels, team wheel, shared wheels | Navigational | `/en/` + `/fr/` | P2 | `team wheels` = 217 impr at **pos 3** → not owning own brand. 21 URLs rank for "teamwheels". |
| F. Microsoft Teams integration | microsoft teams carpooling | microsoft teams fuhrpark, teams commute | Commercial-differentiator | **NEW** content/section on the Teams angle | P3 | The unique differentiator, barely any impressions yet → create demand. |
| G. How-to / evaluate provider | how to launch corporate carpooling program | how can i quickly launch a customizable carpool platform for my company, key criteria for evaluating corporate ride-hailing providers | Informational, buyer-adjacent | `/en/blog/how-to-launch-corporate-carpooling-program` + internal link to Cluster A | P2 | Natural-language / AI-search queries at pos 3–4. Buyers in research mode. |
| H. Garbled "sharing car corporate" perms | — | software sharing car corporate, sharing car corporate software, corporate sharing software car (all pos 80+) | Junk | Do-not-target | — | Low-quality permutations, ignore. |

## Page briefs

### Cluster A — NEW `/en/corporate-carpooling-software/` (P1)
- **Page type:** commercial product/solution landing page.
- **Searcher problem:** an HR/mobility/ops buyer evaluating software to run an employee carpooling program.
- **Required sections:** H1 "Corporate Carpooling Software"; problem/outcome; **Microsoft Teams integration** (differentiator); how it works (3 steps); ROI / CO₂ / Scope-3 angle; pricing teaser; FAQ (schema); strong **"Book a demo"** CTA repeated.
- **Internal links:** from `/en/` hero, `/en/how-it-works`, `/en/pricing`, and the corporate-carpooling blog guides (anchor: "corporate carpooling software").
- **Cannibalization fix:** point category/tag/blog-index pages away from these commercial terms (de-optimize headings/titles); make this the single canonical commercial target.
- **Save/tag:** `cluster:corp-carpool-software-en`, `intent:commercial`, `priority:p1`.

### Cluster C — Harden `/fr/` (P1)
- **Page type:** FR commercial home/landing.
- **Searcher problem:** entreprise FR cherchant un outil/logiciel de covoiturage domicile-travail.
- **Required sections:** H1 ciblant "outil/logiciel covoiturage entreprise"; intégration Microsoft Teams; FMD / RSE; étapes; CTA "Demander une démo".
- **Internal links:** depuis les 2 articles blog covoiturage-entreprise (ancre "outil covoiturage entreprise") vers /fr.
- **Cannibalization fix:** the 2 FR blog posts should target their long-tail/how-to terms and link up to /fr for the commercial head term.
- **Save/tag:** `cluster:covoiturage-entreprise-fr`, `intent:commercial`, `priority:p1`.

### Cluster D — Consolidate Paris guides (P3, quick win)
- 301 the 2025 guide → 2026 (or canonical), merge unique content. Stops self-cannibalization, pools authority. Add a contextual product CTA for the rare B2B reader.

## Quick wins (do first)
1. **CTR rewrites** (page-1, near-zero CTR): `corporate-carpooling-guide-2026` (0.3%), `scope-3` guide (0.1%), `/en/how-it-works` (2%).
2. **Consolidate** the two Paris guides.
3. **FR head term** `outil covoiturage entreprise` (pos 14) — on-page optimization of `/fr` to reach page 1.
