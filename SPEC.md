# Spec: Dutch site and blog rollout (nl-BE, nl-NL)

Source brief: "TeamWheels — AI Agent Spec: Dutch Site & Blog Rollout" (Oct 7, 2026).
Repo audit: `seo/content/nl-rollout/repo-map.md` (PR #119).
This file records the decisions taken on that brief and the audit. Where the two differ, this file wins.

## Objective

Add two Dutch-language locales to teamwheelsapp.com, one per country, so Belgian and Dutch HR, mobility and CSR managers find a TeamWheels page written for their own employer rules, and book a demo or install the Teams app.

- **nl-BE** (Flanders): mobiliteitsbudget, kilometervergoeding, bedrijfswagen, voordeel alle aard.
- **nl-NL** (Netherlands): reiskostenvergoeding, werkkostenregeling, WPM.
- Readers are employers. The blog never addresses individual commuters.

Deliverables: the i18n setup, 4 core pages per locale (8), 8 blog posts (5 BE, 3 NL). Every page ships as `draft: true`; Hamza reviews, flips drafts and merges.

Out of scope: design changes, pricing changes, new features, calculator formulas, any edit to FR/EN/DE/ES content beyond what the i18n plumbing requires.

### Decisions (approved 2026-10-07)

| # | Decision |
| --- | --- |
| D1 | Language keys `nl-be` and `nl` → URLs `/nl-be/` and `/nl/`. Each language gets `locale` (`nl-be`, `nl-nl`) and `params.hreflang` (`nl-BE`, `nl-NL`). Templates emit `.Language.Params.hreflang \| default .Language.Lang`, so FR/EN/DE/ES output is unchanged. |
| D2 | `besparingscalculator` is an article-style page: the `savings-calculator` shortcode plus 600-900 words of local context. It pairs with the FR/EN calculator articles through `translationKey: "carpooling-savings-calculator"`. |
| D3 | A locale appears in the language switcher, alias redirects and agent language lists only once its home page is built (published). Merging the i18n PR changes nothing visible in production. |
| D4 | No preview environment. Each PR carries evidence from a local draft-inclusive build (`hugo -D`) plus a production-mode build (`hugo --gc --minify`). |
| D5 | Content dirs `content/dutch-be/` and `content/dutch-nl/`. |
| D6 | Pricing on both locales reads "€ 3 per medewerker per maand, excl. btw". *Default, not yet confirmed.* |
| D7 | Switcher shows `NL` + the BE or NL flag; the full label ("Nederlands (België)", "Nederlands (Nederland)") goes in `title` and `aria-label`. *Default, not yet confirmed.* |
| D8 | NL menus link the 4 localized pages, and EN for everything else via absolute URLs (the DE/ES pattern). No blog link until the first post in that locale is published. *Default, not yet confirmed.* |
| D9 | Core pages pair by file name: a Dutch page reuses the shared file name (`how-it-works.md`) and sets `slug:` for the Dutch URL. Blog posts pair by `translationKey`, only when a FR/EN twin exists. |

## Tech stack

- Hugo v0.163.3 extended (pinned in `.github/workflows/deploy.yml`), theme `delta-hugo` (vendored in `themes/`, project overrides in `layouts/`).
- Tailwind/PostCSS via npm (`npm ci`), Go modules from `config/_default/module.toml`.
- Apache hosting (`static/.htaccess`). Every push to `main` builds and deploys to production.
- OpenSEO MCP (self-hosted on localhost:3001) for keyword and SERP research before each blog post.

## Commands

```bash
npm ci                                  # install once per clone
hugo --gc --minify                      # production build: exactly what CI runs, drafts EXCLUDED
hugo --gc --minify -D -d /tmp/nl-draft  # draft-inclusive build for reviewing new nl pages
hugo server -D                          # local preview incl. drafts, http://localhost:1313/nl-be/
hugo list drafts | grep dutch           # every new page must appear here until Hamza flips it
```

`npm run build` passes `--buildDrafts`. Never use it to check what production will serve.

## Project structure

```
config/_default/languages.toml      → add [nl-be] and [nl] blocks (D1)
config/_default/menus.nl-be.toml    → nl-BE menus (D8)
config/_default/menus.nl.toml       → nl-NL menus (D8)
i18n/nl-be.yaml, i18n/nl.yaml       → UI strings, same key set as i18n/fr.yaml
content/dutch-be/                   → nl-BE pages (D5)
  _index.md, how-it-works.md, pricing.md, besparingscalculator.md
  blog/_index.md, blog/<slug>.md
content/dutch-nl/                   → nl-NL pages, same layout
layouts/partials/seo/hreflang.html  → hreflang value from params (D1)
layouts/sitemap.xml, sitemapindex.xml, partials/seo/schema.html, _default/baseof.html → same
layouts/partials/essentials/lang-switch.html, flag.html → D3, D7
layouts/alias.html, partials/agent/webmcp.html → region-aware language lists (D3)
layouts/partials/savings-calculator.html, assets/js/savings-calculator.js → nl labels, EUR, nl-BE/nl-NL number format
themes/delta-hugo/layouts/index.html → home image alt text to i18n
seo/content/nl-rollout/             → audit, one brief per blog post, OpenSEO notes
```

## Code style

Follow the DE/ES rollout (PR #118). Front matter mirrors the FR source page field for field; only values are localized.

Core page (`content/dutch-be/how-it-works.md`):

```yaml
---
title: "Zo werkt carpoolen in Microsoft Teams, live in 5 minuten"
seoTitle: "Zo werkt carpoolen voor bedrijven in Microsoft Teams"
description: "<140-155 chars, main keyword included>"
slug: "hoe-het-werkt"
layout: "how-it-works"
draft: true
---
```

Blog post (`content/dutch-be/blog/mobiliteitsbudget-carpoolen.md`), per the brief's template:

```yaml
---
title: "<H1, max 60 characters>"
description: "<140-155 characters, main keyword included>"
slug: "mobiliteitsbudget-carpoolen"
date: 2026-10-20
lastmod: 2026-10-20
draft: true
image: "images/blog/<file>.webp"
author: TeamWheels
keywords: "mobiliteitsbudget, <secondary>"
verify: ["Pijler 2 bedragen 2027 (FOD Financiën)"]
faq:
  - question: "..."
    answer: "..."
---
```

Template changes keep the existing fallback idiom, so untouched languages render as before:

```go-html-template
{{- $hl := .Language.Params.hreflang | default .Language.Lang -}}
<link rel="alternate" hreflang="{{ $hl }}" href="{{ .Permalink }}" />
```

Rules:
- Formal "u" on product pages, informal "je" on blog posts.
- Vocabulary per country (see the brief). No Belgian term on an nl-NL page, and the reverse.
- Body links carry the language prefix (`/nl-be/prijzen/`); the markdown link hook does not add it.
- Unknown legal amounts are written `[[VERIFY: what, official source]]` and listed in `verify:` and the PR description.
- FAQ goes in `faq:` front matter (slice shape), which emits `FAQPage` JSON-LD automatically.

## Testing strategy

There is no test suite. Each PR proves its change with build output and greps, pasted into the PR description.

| Check | How | Pass condition |
| --- | --- | --- |
| Production build | `hugo --gc --minify` | Exit 0, zero `WARN`/`ERROR`; FR/EN/DE/ES page counts unchanged from baseline (78/73/32/32) |
| No leak to production | grep the production `public/` for `/nl-be/`, `/nl/` | No nl URL in any page, sitemap or switcher until a home is published (D3) |
| Other locales unchanged | `diff -r` of FR/EN/DE/ES HTML before vs after the i18n PR | No diff, except intended fixes (home alt text) |
| hreflang | `-D` build: grep `hreflang` on one nl-BE page and its FR twin | nl-BE page lists fr, en, de, es, nl-BE, nl-NL (where twins exist) + x-default → FR; the FR page lists nl-BE back |
| Sitemap | `-D` build: `/nl-be/sitemap.xml` and root `sitemap.xml` | nl URLs with `xhtml:link` alternates using `nl-BE`/`nl-NL` |
| Locale separation | grep nl-NL content for `mobiliteitsbudget\|voordeel alle aard\|FOD\|SPF`, nl-BE content for `reiskostenvergoeding\|werkkostenregeling\|Belastingdienst` | No hits |
| Drafts | `hugo list drafts` | Every new nl page listed |
| Blog SEO checklist | per post, from the brief | All boxes ticked in the PR description |
| JSON-LD | extract `application/ld+json` from the `-D` build, parse with `node -e` / `jq` | Valid JSON; `Article` + `FAQPage` on posts; `inLanguage` = `nl-BE`/`nl-NL` |
| Calculator | `hugo server -D`, open `/nl-be/besparingscalculator/` | Labels in Dutch, EUR selected, Dutch number format |

## Boundaries

**Always**
- Work on a branch, one PR per step, and wait for approval before starting the next.
- Set `draft: true` on every new page.
- Run both builds (production and `-D`) before pushing, and paste the evidence.
- List open `[[VERIFY]]` markers, OpenSEO calls and questions in every PR description.
- Cite only official sources for legal facts: FOD/SPF Financiën, FOD Mobiliteit (BE); Belastingdienst, Rijksoverheid, RVO (NL).
- Keep product claims identical to the FR pages (Publisher Attestation, never "certified").

**Ask first**
- Any change to a template that alters FR/EN/DE/ES output.
- Any new route, redirect or `.htaccess` change.
- Any OpenSEO paid run (estimate cost first), and any batch over 2,000 credits.
- Any point where the repo differs from this spec.

**Never**
- Push to `main`, merge, deploy, or set `draft: false`.
- Invent legal amounts, thresholds, customer names, testimonials, statistics or case studies.
- Mix Belgian and Dutch rules on the same page.
- Delete or rename an existing URL.
- Start rank tracking or scheduled OpenSEO checks.
- Change calculator formulas (flag them instead).

## Success criteria

1. Production build is clean, and the live site is unchanged until Hamza publishes an nl home page.
2. With drafts built, every translated page emits reciprocal hreflang (`fr`, `en`, `de`, `es`, `nl-BE`, `nl-NL` where twins exist, `x-default` → FR), and both sitemaps list nl URLs with alternates.
3. 4 core pages per locale exist as drafts, in local vocabulary, with the same product claims as FR.
4. 8 blog posts exist as drafts, each passing the brief's SEO checklist, with every legal figure either sourced or marked `[[VERIFY]]`.
5. BE-2, NL-1 and NL-2 are ready for review by Nov 23, so they can be live by Dec 7 (before the January search peak).
6. After launch (Hamza's step): nl-BE and nl-NL URLs indexed in Search Console, all `[[VERIFY]]` markers resolved.

## Work plan (PRs)

| PR | Branch | Content | Gate |
| --- | --- | --- | --- |
| 1 | `feat/nl-audit` | Repo map + this spec (#119) | Hamza approves |
| 2 | `feat/nl-i18n` | Languages, menus, i18n files, hreflang/sitemap/schema params, switcher guard + flags, alias/webmcp lists, home alt text, calculator nl labels + EUR, draft `_index.md` per locale | Builds clean, other locales unchanged, hreflang checked on `-D` build |
| 3 | `feat/nl-be-core` | nl-BE: home, hoe-het-werkt, prijzen, besparingscalculator | Native Dutch review |
| 4 | `feat/nl-nl-core` | nl-NL: same four pages | Native Dutch review |
| 5-12 | `content/nl-be-<slug>`, `content/nl-nl-<slug>` | One post each; seasonal posts first (BE-2, NL-1, NL-2) | Native review, then `[[VERIFY]]` resolved by Hamza |

## Open questions

1. Confirm D6 ("excl. btw", which the FR pricing page does not say), D7 (switcher label) and D8 (menus).
2. Should `contact` be localized in Phase 2? Every CTA points there, and an EN contact page breaks the Dutch flow.
3. Who is the native Dutch reviewer, for both Flemish and Netherlands usage?
4. The OpenSEO MCP is unreachable from this session (ECONNREFUSED). It must be running before the first blog post.
5. Calculator: non-French countries get a flat 12 % "employer benefit" estimate, and the FR cap (700 €) does not match the published FMD amounts. Out of scope here; open a separate ticket?
