# Dutch rollout (nl-BE, nl-NL): repo map

PR 1 of the "TeamWheels — AI Agent Spec: Dutch Site & Blog Rollout" (Oct 7, 2026).
Findings only. No config, layout or content changes until this plan is approved.

Audited at `main` @ 871cede (after PR #118, German + Spanish rollout). Hugo v0.163.3 extended.
Baseline `hugo --gc --minify`: clean, zero warnings (FR 78, EN 73, DE 32, ES 32 pages).

## 1. Config

| Item | Value | Where |
| --- | --- | --- |
| `defaultContentLanguage` | `fr` | `config/_default/hugo.toml` |
| `defaultContentLanguageInSubdir` | `true` (the spec says `...InRoot`: Hugo's key is `...InSubdir`) | same |
| Languages | `fr` (w1), `en` (w2), `de` (w3), `es` (w4) | `config/_default/languages.toml` |
| Per-language fields | `label`, `locale` (e.g. `en-us`), `contentDir`, `weight`, `params.{home,copyright,title,description}` | same |
| Menus | one file per language: `config/_default/menus.{fr,en,de,es}.toml` | |
| i18n strings | `i18n/{fr,en,de,es}.yaml`, same key set in all four | |
| Content | `content/{french,english,german,spanish}/` (one `contentDir` per language) | |
| Deploy | `.github/workflows/deploy.yml` builds and deploys on every push to `main`. No PR preview environment exists. | |
| Server | Apache, `static/.htaccess` (root `/` → 301 `/fr/`, legacy redirects, `Link` headers) | |

Legacy `config.toml` and `hugo.toml` at the repo root: `hugo.toml` only holds theme `[params.variables]`; `config.toml` is a 3-line leftover (baseURL, languageCode, title).

### Translation pairing

- **Core pages pair by file name.** `content/french/how-it-works.md` ↔ `content/english/how-it-works.md` ↔ `content/german/how-it-works.md`. This is why FR/DE/ES core pages use English slugs (`/fr/how-it-works/`). No core page sets `translationKey`.
- **Blog posts pair by `translationKey`** (FR and EN slugs differ). Example: `translationKey: "carpooling-savings-calculator"` on both the FR and EN calculator articles.
- Consequence for Phase 2: a Dutch core page can keep the shared file name (`how-it-works.md`) and set `slug: hoe-het-werkt` to get the Dutch URL. That pairs with FR/EN/DE/ES without touching their files. Adding `translationKey` only on the Dutch side would *break* pairing, because Hugo then stops matching by path.

## 2. How the theme renders hreflang, the switcher and the sitemap

| Feature | File | Behaviour | Impact for NL |
| --- | --- | --- | --- |
| hreflang | `layouts/partials/seo/hreflang.html` (called from `layouts/partials/essentials/head.html:136`) | Loops `.AllTranslations`, emits `hreflang="{{ .Language.Lang }}"`, i.e. the **language key**, not `locale`. `x-default` → FR version if one exists, else self. Untranslated pages advertise self + x-default. | With keys `nl-be` / `nl` the tags would read `nl-be` and `nl`, not `nl-BE` / `nl-NL`. Needs a per-language hreflang value (see Q1). |
| `<html lang>` | `layouts/_default/baseof.html` (fixed in #118) | Page language key | same as above |
| Language switcher | `layouts/partials/essentials/lang-switch.html` (header desktop + mobile, `themes/delta-hugo/layouts/partials/essentials/header.html:17,104`) | Ranges `hugo.Sites`, links the translation or falls back to `/<lang>/`. Visible text is `{{ $l.Lang \| upper }}` + a flag; `label` is only the `title` attribute. | Would show "NL-BE" / "NL". Lists every configured language, even one whose pages are all `draft: true`, so a draft-only locale would link to a 404 home. Needs a guard (see Q4). |
| Flags | `layouts/partials/essentials/flag.html` | `if` chain on `fr`/`de`/`es`, **everything else renders the UK flag** | Needs BE and NL flags. |
| Sitemap | `layouts/sitemap.xml` (per language) + `layouts/sitemapindex.xml` (root, flat urlset) | Lists `.AllTranslations` as `xhtml:link` alternates, again with `.Language.Lang`. Excludes `noindex`, taxonomies, root shim. Drafts are not built, so not listed. | Same hreflang-value fix needed in both files. |
| Schema | `layouts/partials/seo/schema.html:313` | `inLanguage` = language key | Should read `nl-BE` / `nl-NL`. |

## 3. Hardcoded French (and FR/EN-only) strings in layouts

Strings that would leak into or misbehave on a Dutch page:

| # | File:line | String / logic | Effect on nl pages |
| --- | --- | --- | --- |
| 1 | `themes/delta-hugo/layouts/index.html:127,145` | `alt="TeamWheels - Covoiturage intégré à Microsoft Teams"` | French alt text on every home page (already leaks on EN/DE/ES today). Move to i18n. |
| 2 | `layouts/partials/savings-calculator.html:21` | `id="{{ if eq $lang "fr" }}calculateur{{ else }}calculator{{ end }}"`, `data-currency` = EUR for `fr`, **GBP for everyone else** | NL/BE calculator would default to GBP. |
| 3 | `assets/js/savings-calculator.js` | `TRANSLATIONS` only has `fr` and `en` (falls back to `en`); number format `fr-FR` or `en-GB`; country list display locale `fr`/`en` | All calculator labels in English on nl pages. Adding `nl` strings is in scope (labels only). |
| 4 | `assets/js/savings-calculator.js:197-202` | **Formula flag:** `country === 'FR'` → `min(fuelSaved × 0.5, FMD_CAP=700) × 0.45`; any other country → flat `totalEmployeeSavings × 0.12` labelled "Estimated employer benefit" | BE/NL get a generic 12 % estimate, not mobiliteitsbudget / reiskostenvergoeding. Also `FMD_CAP = 700` does not match the FMD amounts on `/fr/forfait-mobilites-durables-covoiturage/` (600 €, 900 € cumulated). Out of scope per spec; flagged only. |
| 5 | `layouts/alias.html:21` | `supported = ["fr","en","de","es"]`, matched on the **primary** subtag | Alias redirects: a `nl-BE` browser would map to `nl` → `/nl/` (Netherlands) if added naïvely. Needs region-aware matching. |
| 6 | `layouts/partials/agent/webmcp.html:27-78` | `langs = ['fr','en','de','es']`, `.slice(0,2)` on `<html lang>`, blog paths fall back to `/en` for non fr/en, calculator path picks FR or EN article | `nl-be` would be sliced to `nl` → wrong locale. |
| 7 | `layouts/partials/essentials/head.html:63-66` + `static/.htaccess:185-187` | `rel="service-doc"` links listed per language with hardcoded titles ("Comment ça marche — TeamWheels") | Add nl-BE/nl-NL entries (or leave, they are agent hints, not user-visible). |
| 8 | `themes/delta-hugo/layouts/_default/baseof.html:58-86` | Root redirect JS: "French browser → fr, else en" | Dead in practice: `.htaccess` 301s `/` to `/fr/` before this runs. No change needed. |
| 9 | `layouts/partials/seo/hreflang.html:20` | `x-default` hardwired to `fr` | Spec: keep x-default (FR). No change, noted. |
| 10 | `layouts/partials/faq-section.html:4` | `"Questions fréquentes"` | Comment only (example), not rendered. |

No other French text was found in `layouts/` or the theme: menu labels, buttons and form strings already go through `i18n/*.yaml` or front matter.

## 4. Where the spec and the repo differ (needs a decision)

**Q1. `/nl/` prefix with locale key `nl-nl` is not possible as written.** Hugo builds the URL prefix from the language key, so key `nl-nl` serves `/nl-nl/`. Options:
- **(A, recommended)** keys `nl-be` and `nl`, both with `locale` set (`nl-be`, `nl-nl`) and a new `params.hreflang` (`nl-BE`, `nl-NL`). Change `hreflang.html`, both sitemaps, `schema.html` and `<html lang>` to read `.Language.Params.hreflang | default .Language.Lang`. FR/EN/DE/ES output stays byte-identical.
- (B) keys `nl-be` and `nl-nl`, URL `/nl-nl/` (diverges from the spec table).

**Q2. The savings calculator is no longer a standalone page.** Since Sept 2026 it lives inside the FR/EN blog articles (`/fr/blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/`, EN twin) and `/tools/savings-calculator/` 301s there, because the old ~90-word tool page cannibalised the article. A bare `besparingscalculator` page would bring that problem back. Proposal: make `besparingscalculator` an article-style page (calculator shortcode + 600-900 words of local context), paired with the FR/EN articles via `translationKey: "carpooling-savings-calculator"`.

**Q3. Blog section for NL.** DE/ES have no blog: their menus point to the EN blog with absolute URLs. NL needs `content/<dir>/blog/_index.md` per locale. Until the first post is approved, a `/nl-be/blog/` index would be empty in production. Proposal: keep the blog menu entry pointing at the Dutch blog only once one post is live; until then, no blog link in NL menus.

**Q4. `draft: true` on every new page vs. a working switcher.** The deploy workflow builds without `-D`, so draft pages are absent in production. That is good for safety, but the switcher (and alias redirects) would still advertise `/nl-be/` and `/nl/` and link to 404s. Proposal: the switcher only lists a language whose home page is built (`with site.Home`). Merging PR 2 then changes nothing visible in production until a home page goes non-draft. Note: the Phase 1 acceptance ("curl of one nl-BE page shows hreflang alternates pointing to live URLs") can only be checked on a local `hugo -D` build until a human publishes pages.

**Q5. No preview URL.** Hosting has no PR previews. Each PR will include `hugo -D` build output and curl excerpts instead. Tell me if you want a Coolify preview app set up (out of scope otherwise).

**Q6. Content directory names.** Existing dirs are English language names (`french`, `german`). Proposal: `content/dutch-be/` and `content/dutch-nl/`.

**Q7. Pricing "excl. VAT" wording.** The FR pricing page does not mention HT/VAT at all (`3€ /collaborateur /mois`). Proposal for NL: "€ 3 per medewerker per maand, excl. btw" on both locales (btw is the term in both countries). Confirm, since it adds a claim the FR page does not make.

**Q8. Switcher label.** Visible text is the uppercase key. Proposal: show `NL` + BE flag and `NL` + NL flag, with `label` ("Nederlands (België)" / "Nederlands (Nederland)") in the `title` and `aria-label`.

**Q9. Menus.** DE/ES menus link product pages that NL would not have in Phase 2 (benefits, white label, corporate-carpooling-software, demo, contact). Proposal: NL menus link the 4 localized pages, and the EN version of everything else via absolute URLs (the DE/ES pattern, handled by `layouts/partials/lang-url.html`). Contact/demo stay EN until localized; tell me if `contact` should be in Phase 2 too, since every CTA points there.

## 5. Tooling status

- **OpenSEO MCP is unreachable** from this session (`ECONNREFUSED` on localhost:3001). Not needed for PR 1-4, but required by the spec before drafting each blog post (Phases 3-4). Please start the container before the first blog PR.
- No OpenSEO calls made in this PR.

## 6. Proposed PR sequence (unchanged from the spec, with the decisions above)

1. `feat/nl-audit`: this document.
2. `feat/nl-i18n`: languages, menus, `i18n/nl-be.yaml` + `i18n/nl.yaml`, hreflang param (Q1), switcher guard + flags (Q4, Q8), alias/webmcp locale lists, home alt text and calculator currency/strings moved to i18n. Empty draft `_index.md` per locale so the build has something to render with `-D`.
3. `feat/nl-be-core`: home, `hoe-het-werkt`, `prijzen`, `besparingscalculator` (nl-BE).
4. `feat/nl-nl-core`: same for nl-NL.
5. One PR per blog post.
