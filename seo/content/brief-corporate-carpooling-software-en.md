# Content Brief — `/en/corporate-carpooling-software/` (EN commercial landing page)

_Prepared 2026-06-24. Status: brief only — the live page is not built yet._
_Source data: `seo/keywords/cluster-map-2026-06-24.md` (Cluster A + B), `seo/reports/gsc-snapshot-2026-06-24.md`._

## Why this page exists

GSC shows the buyer cluster (`corporate carpooling software`, `corporate carpool software`,
`corporate carpooling solution`, `carpool management software`, `carpool software`, `corporate
carpooling`, `corporate carpooling app`) pulls **500+ pooled impressions but ~0 clicks**, because
it's **cannibalized across 6–11 URLs** (homepage, blog guides, `/en/tools`, category, tag, and
blog-index pages) with nothing ranking on page 1. This page becomes the **single canonical
commercial target** for that cluster — built to convert HR / mobility / sustainability buyers into
**demo requests** (the primary goal).

## Target file & routing

- **Create:** `content/english/corporate-carpooling-software.md` → `/en/corporate-carpooling-software/`
- **Layout:** `layout: "benefits"` (reuses the existing data-driven section template
  `themes/delta-hugo/layouts/_default/benefits.html` — no new layout needed).
- **Model pages:** `content/english/benefits.md` (closest structural match),
  `content/english/_index.md` (messaging/CTAs).
- **FR fast-follow (separate task):** `content/french/corporate-carpooling-software.md` targeting
  Cluster C (`outil/logiciel covoiturage entreprise`, already pos 14 — high-value).

## Keyword targeting

| Role | Keywords |
| ---- | -------- |
| **Primary** | corporate carpooling software |
| **Secondary** | corporate carpool software · corporate carpooling solution · carpool management software · carpool software · corporate carpooling app · carpool administration software · carpooling software |
| **Cluster B (fold in)** | employee transport sharing · workplace ride sharing · employee carpool programs · office commute carpool · commute management platform |
| **Differentiator** | corporate carpooling Microsoft Teams · carpooling app for Teams |

Do **not** chase the FR or Paris-lane terms here. Keep this page tightly commercial + English.

## SEO metadata (proposed)

- **title** (`≤60` chars): `Corporate Carpooling Software for Microsoft Teams | TeamWheels`
- **description** (`≤160`): `Corporate carpooling software built into Microsoft Teams. Cut commute costs & parking, hit Scope 3 targets, 5-minute deploy. Book a demo — free 30-day trial.`
- **keywords**: reuse the cluster terms above (comma-separated, matching existing convention).

## Page structure (front-matter sections, `layout: "benefits"`)

Use the same front-matter blocks the theme already renders: `banner`, `image_and_content_blocks`
(alternating `content_position`), `faq`, `call_to_action`.

1. **`banner`** — H1 **"Corporate Carpooling Software, Built Into Microsoft Teams"**.
   Subtitle: who it's for (HR, mobility, sustainability, facilities). 2–3 sentence value prop.
   Primary CTA `Book a demo` → `contact/`; secondary `Calculate your savings` → `tools/savings-calculator/`.
2. **Block — The buyer problem / outcome.** Standalone carpool apps die from low adoption; framing
   the outcome: 40%+ participation, lower parking demand, measurable Scope 3 reduction.
3. **Block — Microsoft Teams integration (the differentiator).** Reuse existing approved messaging:
   *native to Teams, no new app, 5-minute deploy by one Teams admin, Microsoft Partner Certified /
   AppSource, Azure AD (Entra ID) SSO, GDPR.* Anchor `teams-integration`.
4. **Block — Features as software ("…software" intent).** Matching/bot, admin dashboard, scheduling,
   reporting/analytics, multi-device. This is what "carpool management/administration software"
   searchers want to see.
5. **Block — ROI & compliance.** $2,000+/employee savings, 30% parking reduction, CO₂ / Scope 3
   Category 7 reporting. Link to the Scope 3 guide and savings calculator.
6. **`faq`** (renders FAQPage schema): "Is it really just a Teams app?", "How fast to deploy?",
   "How is data secured?", "What does it cost?", "Which countries (US/UK/CA)?".
7. **`call_to_action`** — repeat `Start free 30-day trial` / `Book a demo` → `contact/`.

## Internal linking (to consolidate authority on this page)

- **Inbound (add links pointing TO this page**, anchor "corporate carpooling software"):
  `/en/` hero/nav, `/en/how-it-works`, `/en/pricing`, `/en/benefits`,
  `content/english/blog/corporate-carpooling-guide-2026.md`,
  `content/english/blog/carpooling-to-work-corporate-guide.md`,
  `content/english/blog/scope-3-...-guide.md`.
- **Outbound:** `/en/how-it-works`, `/en/pricing`, `/en/tools/savings-calculator`, `/en/contact`.

## Cannibalization remediation (do alongside launch)

So this page can actually rank for the cluster:
- De-optimize `/en/categories/*`, `/en/tags/*`, and the `/en/blog/` index from the commercial head
  terms (they currently rank pos 30–56 and dilute). Consider `noindex` on thin tag/category pages.
- Point the blog guides' commercial anchor text to this page (they keep informational intent).
- After launch, confirm with `get_search_console_performance` (`dimensions:["query","page"]`) that
  Google consolidates the cluster onto this URL.

## Suggested OpenSEO tags (on confirmation)

`cluster:corp-carpool-software-en` · `intent:commercial` · `priority:p1`

## Build checklist (when the page is created later)

- New file uses `layout: "benefits"`, `draft: false`, image assets that exist under `assets/`/`static/`.
- `hugo --gc --minify` builds clean; page renders at `/en/corporate-carpooling-software/`.
- All CTAs resolve to `contact/` (relative) — **not** the wrong `teamwheels.app` domain (see finding below).

---

### ⚠️ Related finding (outside this brief's scope)

While editing the corporate-carpooling guide I found **broken CTA links to the wrong domain**
`teamwheels.app` (not `teamwheelsapp.com`) in the body of
`content/english/blog/corporate-carpooling-guide-2026.md`:
- `https://teamwheels.app/calculator`, `https://teamwheels.app/contact`,
  `https://teamwheels.app/roi-template` (incl. the **"Book a Free Demo"** link).

These point off-domain to non-existent pages — directly killing demo conversions on a page that
already gets ~957 impressions. Recommend fixing these to relative `/en/...` URLs. Other blog posts
may have the same issue — worth a repo-wide grep for `teamwheels.app`.
