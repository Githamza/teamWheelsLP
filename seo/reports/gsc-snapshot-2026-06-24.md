# GSC Snapshot — TeamWheels — 2026-06-24

Source: OpenSEO `get_search_console_performance`, property `https://www.teamwheelsapp.com/`,
window **2026-03-21 → 2026-06-21** (last 3 months). First-party Search Console data.

## Headline

The site's clicks come almost entirely from **(a) brand terms** and **(b) French
informational "Paris carpool-lane schedule" content** — neither is a B2B buyer. The actual
**buying-intent software terms get heavy impressions but sit on page 2–3 with ~zero clicks.**
That gap *is* the demo-generation opportunity.

## Where clicks actually come from (top pages)

| Page | Clicks | Impr | CTR | Avg pos | Read |
| ---- | -----: | ---: | --: | ------: | ---- |
| `/en/` (home) | 67 | 2,125 | 3.2% | **23.4** | Ranks for the whole B2B software cluster — but stuck on page 2–3 |
| `/fr/blog/voies-covoiturage-paris-peripherique-guide-2026/` | 35 | **4,083** | 0.9% | 5.6 | Huge volume, wrong audience (commuters, not buyers), awful CTR |
| `/fr/` (home) | 22 | 322 | 6.8% | 10.5 | — |
| `/en/how-it-works/` | 10 | 496 | 2.0% | 7.6 | Page 1 but bleeding clicks → title/meta |
| `/fr/blog/voies-covoiturage-paris-peripherique-guide-2025/` | 8 | 1,062 | 0.8% | 5.1 | **Duplicate** of the 2026 guide → cannibalization |
| `/en/blog/corporate-carpooling-guide-2026/` | 3 | 957 | **0.3%** | 9.4 | Page 1, CTR disaster |
| `/en/blog/scope-3-employee-commuting-...-guide/` | 1 | 913 | **0.1%** | 7.5 | Page 1, CTR disaster |

## The money terms — high impressions, page 2–3, zero clicks

These are the qualified-buyer queries. All ranking off page 1, all 0 clicks:

| Query | Impr | Avg pos |
| ----- | ---: | ------: |
| corporate carpooling | 71 | 19.5 |
| corporate carpooling software | 70 | 28.0 |
| corporate carpool software | 62 | 23.7 |
| carpool software | 68 | 38.3 |
| carpool management software | 61 | 27.4 |
| corporate carpooling solution | 51 | 26.8 |
| carpool administration software | 30 | 19.4 |
| carpooling software | 23 | 26.8 |

→ The homepage (`/en/`, pos 23) is the page absorbing most of these. There is no dedicated,
focused **"corporate carpooling software"** commercial landing page doing this job.

## Striking distance (pos ~5–15) — fastest wins

Already on/near page 1; small pushes convert to clicks:

| Query | Impr | Avg pos |
| ----- | ---: | ------: |
| best corporate transportation app for employees london | 5 | 11.6 |
| application covoiturage entreprise | 9 | 14.4 |
| covoiturage d'entreprise | 4 | 14.3 |
| covoiturage au travail | 3 | 13.7 |
| covoiturage entre collègues | 6 | 10.8 |

## Brand leak

- `team wheels` — 8 clicks, **202 impressions, pos 5.1**. Own brand ranking only #5 → losing
  branded clicks. Make sure home/brand owns position 1.

## Recommended actions (priority order)

1. **CTR plays (this week, no ranking change needed):** rewrite title + meta description on the
   3 page-1 pages bleeding clicks — `corporate-carpooling-guide-2026` (0.3%), `scope-3` guide
   (0.1%), `/en/how-it-works/` (2.0%). Add buyer-intent hooks (Microsoft Teams, pricing, "book a demo").
2. **Position play — build/strengthen a commercial "corporate carpooling software" page** so the
   B2B software cluster has a dedicated target instead of the homepage at pos 23. Internal-link to it.
3. **Consolidate** the duplicate Paris périphérique guides (2025 + 2026) into one canonical URL to
   stop self-cannibalization and pool authority.
4. **FR striking distance:** light optimization on `application covoiturage entreprise`,
   `covoiturage d'entreprise/au travail/entre collègues` (all pos 10–15) → page 1.

## Next workflow

`keyword-clustering` using this GSC data — map the B2B software cluster, the FR entreprise
cluster, and the (low-value) commuter-lane cluster to the right pages, and confirm cannibalization
via a `query+page` pull.
