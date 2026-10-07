# Implementation Plan: Dutch rollout, PR 2 (`feat/nl-i18n`)

## Overview
Add the `nl-be` and `nl` locales to Hugo with correct hreflang, sitemap alternates, language switcher and agent/redirect language lists, while the live site stays byte-identical until Hamza publishes a Dutch home page. Scope is PR 2 of SPEC.md only. PR 3+ (core pages, blog posts) start after PR 2 is approved, per the spec's review gates.

## Architecture decisions (from SPEC.md)
- Keys `nl-be` / `nl` → `/nl-be/`, `/nl/`; `params.hreflang` = `nl-BE` / `nl-NL`, read by every template that prints a language tag, with `default .Language.Lang` so other locales are unchanged (D1).
- A Dutch locale is "live" only when its home page is a real, non-draft content page. Switcher, alias redirects, WebMCP and sitemaps ignore non-live Dutch locales (D3).
- No test suite exists: a shell check script (`scripts/check-i18n.sh`) is the test. It compares production output to a baseline build of `main` and asserts the Dutch draft build. Written first, fails first.

## Task list

### Phase 1: Foundation
- [x] T1: Check script (RED): baseline vs branch, no-leak, hreflang assertions
- [x] T2: Languages, i18n files, draft homes, hreflang/sitemap/schema/lang params; no production leak

### Checkpoint A: production output identical to main; draft build emits nl-BE / nl-NL hreflang

### Phase 2: Navigation
- [x] T3: Language switcher guard, BE + NL flags, label
- [x] T4: Menus for nl-be and nl (D8)
- [x] T5: Alias redirect + WebMCP: live-locale lists, region-aware, per-locale URLs

### Checkpoint B: switcher/menus correct in `hugo server -D`; still no leak

### Phase 3: Strings
- [x] T6: Home image alt text → i18n (all languages)
- [ ] T7: Calculator: Dutch labels, EUR default, nl number format

### Checkpoint C: full check script green, open PR 2, stop for review

## Risks and mitigations
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Hugo still renders an empty home/sitemap/RSS for a language whose `_index.md` is a draft | High: Dutch URLs leak to production | T2 tests it first; fallback is a build-time guard (e.g. `_build` cascade or output suppression) decided inside T2, flagged in the PR |
| Template change alters FR/EN/DE/ES HTML | High | Baseline diff in the check script, every task |
| Home alt-text fix (T6) changes EN/DE/ES/FR HTML on purpose | Low | Only allowed diff; listed in the PR |
| Calculator formula assumes French rules | Med | Labels only; formula flagged, not changed |

## Open questions (defaults applied unless you object)
- D6-D8 defaults (excl. btw, switcher label, menus linking EN for untranslated pages).
