# TeamWheels — SEO Workspace

Local workspace for SEO research, planning, and reporting. Saves context over time so OpenSEO workflows don't start from a blank conversation.

_Last updated: 2026-06-24_

## Site & scope

- **Product:** TeamWheels — corporate / enterprise carpooling, integrated with **Microsoft Teams**
- **Primary domain:** https://www.teamwheelsapp.com/
- **Stack:** Hugo static site, bilingual (EN / FR), repo lives in this folder
- **Markets:** English (UK / USA) and French (France / Canada) — **prioritized equally**
- **Page inventory (content/):**
  - Core: `_index`, `pricing`, `benefits`, `how-it-works`, `contact`, `career`, `tools/savings-calculator` (×2 languages)
  - Blog: 12 EN posts, 10 FR posts

## Goal

**Primary objective: qualified B2B demo requests** — drive HR / mobility / sustainability
decision-makers to book a demo or contact sales.

- Focus: buying-intent and bottom-funnel terms (corporate carpooling software, Teams
  integration, employee commute programs, ESG/RSE reporting, FMD — forfait mobilité durable).
- Support: top-of-funnel informational content that feeds the demo pipeline.
- Success metrics (to confirm): non-branded organic sessions → demo/contact conversions,
  rankings for buying-intent terms in both languages.

## Positioning (from repo — confirm/expand)

- **Who it's for:** companies wanting to set up an employee carpooling program; HR / mobility
  / CSR-ESG teams.
- **Key differentiator:** native Microsoft Teams integration (carpooling inside the tools
  employees already use).
- **FR angle:** Forfait Mobilité Durable (FMD), covoiturage domicile-travail, RSE reporting,
  covoiturage lanes (voies de covoiturage).
- **EN angle:** corporate carpooling ROI, ESG reporting, employee commute benefits, tax benefits.
- See `../SEO_STRATEGY.md` for the existing content gaps list, Q1 calendar, and technical-SEO status.

## OpenSEO MCP status

- Mode: **self-hosted** (`whoami` → `local-admin`)
- Projects: only a generic **"Default"** project exists (domain not set)
- **TODO:** create/map an OpenSEO project to `teamwheelsapp.com`, then connect Google Search
  Console on the project's Integrations page so `get_search_console_performance` returns live data.

## Search Console

**✅ Connected (2026-06-24)** natively in OpenSEO (project `ac0a7dda-…ff40`, property
`https://www.teamwheelsapp.com/`). Live data flows via `get_search_console_performance` — no
CSV files needed. First snapshot saved to `reports/gsc-snapshot-2026-06-24.md`.

> The `redirect_uri_mismatch` during setup was fixed by registering OpenSEO's exact OAuth
> callback in the Google Cloud OAuth client. The standalone `scripts/search-console/` Node
> flow is **redundant** now and can be retired.

## Folder map

| Folder | Holds |
| ------ | ----- |
| `gsc/` | Search Console exports (if using the CSV fallback) |
| `keywords/` | Keyword lists, research output, clusters |
| `competitors/` | Competitor analysis, SERP landscape notes |
| `content/` | Briefs, drafts, content plans |
| `outreach/` | Link prospects, contact lists, outreach drafts |
| `reports/` | Periodic SEO reports and snapshots |

## How the agent should approach SEO here

- Bilingual: every keyword/content decision considers both EN (UK/US) and FR (FR/CA).
- B2B / decision-maker framing — prioritize demo-driving intent over raw traffic.
- Respect the existing `SEO_STRATEGY.md`; extend it rather than duplicate it.
- Distinguish source evidence from inference when researching positioning.
