# Dutch rollout: launch checklist (nl-BE, nl-NL)

State on 2026-10-11, after PRs #124-#134 and the [[VERIFY]] round 2 PR.
All Dutch pages are on `main` as `draft: true`. Production does not change until a page's `draft` flag is flipped.

## 1. How publishing works

- **A locale goes live when its home goes live.** Set `draft: false` on `content/dutch-be/_index.md` (or `content/dutch-nl/_index.md`). From then on the switcher, hreflang, sitemaps, alias redirects and WebMCP include that locale automatically (`layouts/partials/lang-live.html`).
- **Publish a locale's core set together**, so no live page links to a draft. That means the home, `how-it-works`, `pricing`, `besparingscalculator` and `contact`, plus, for nl-BE, `corporate-carpooling-software.md` (`/nl-be/carpoolen-voor-bedrijven/`).
- **Blog posts can follow one by one.** When the first post of a locale goes live, also set `draft: false` on its `blog/_index.md` and add the blog link to the menus (SPEC D8; the DE/ES menus show the pattern).
- **Never publish a page that still contains `[[VERIFY`.** The marker text would render on the live page. Check with:
  `git grep -n "\[\[VERIFY" -- content/dutch-be content/dutch-nl`

## 2. Remaining markers (25)

### Ready to publish now (no markers)
- nl-BE: home, hoe-het-werkt, prijzen, besparingscalculator, contact, carpoolen-voor-bedrijven.
- nl-NL: hoe-het-werkt, prijzen, contact.

### Time-gated: the amount isn't published yet
For a launch before the official publication date (the seasonal posts by Dec 7): replace the marker with plain text such as "nog niet gepubliceerd (verwacht rond …)", keep the 2026 figure labelled as 2026, and come back on the date below.

| File | Marker | Expected |
| --- | --- | --- |
| nl-be/blog/kilometervergoeding-2027 | quarterly amount from 1-1-2027 (BOSA / Staatsblad) | end Dec 2026 |
| nl-be/blog/kilometervergoeding-2027 | annual amount from 1-7-2027 | June 2027 |
| nl-be/blog/kilometervergoeding-2027 | commuting exemption 2027 (indexeringsbericht AJ 2028) | H1 2027 |
| nl-be/blog/fietsvergoeding-of-carpool | cao 164 amount 2027 (×2) | Jan 2027 |
| nl-be/blog/fietsvergoeding-of-carpool | tax-free bike amount and cap 2027 | Dec 2026 - Jan 2027 |
| nl-be/blog/bedrijfswagen-vs-carpool | reference CO₂ and minimum VAA 2027 (KB) | Dec 2026 |
| nl-be/blog/mobiliteitsbudget-carpoolen | mobility budget min/max 2027 | Jan 2027 |
| nl/besparingscalculator, nl/blog/kilometervergoeding-2027, nl/blog/reiskostenvergoeding-2027 | onbelaste km-vergoeding 2027 (Belastingplan 2027 vote) | Dec 2026 |
| nl/blog/reiskostenvergoeding-2027 | thuiswerkvergoeding 2027; same-day rule once the bill is law | Dec 2026 |
| nl/blog/wpm-rapportage-carpoolen | WPM emission factors 2026 (RVO handreiking) | Dec 2026 |
| nl/_index, nl/besparingscalculator, nl/blog/wpm-rapportage-carpoolen | WPM 100 → 250 decree in the Staatsblad (WGK028577; Raad van State advice 10-9-2026) | unknown, check monthly |

**nl-NL home:** its only marker is the WPM decree. To launch nl-NL before the decree is published, replace the marker with "(stand oktober 2026)" wording and track the decree here.

### Your decision needed (not time-gated)
| File | Marker | Suggestion |
| --- | --- | --- |
| nl-be/blog/bedrijfswagen-vs-carpool | example TCO amounts (×2) | These are fictional and the text already says so: delete both markers. |
| nl-be/blog/kilometervergoeding-2027 | per-km car contribution under your sector cao (scenario B) | Rewrite as "het bedrag uit je sectorcao" and delete the marker. |
| nl-be/blog/mobiliteitsbudget-carpoolen | mandatory mobility budget (no law yet) | The paragraph already says no law exists: delete the marker. |
| nl-be/blog/mobiliteitsbudget-carpoolen | carpool platform subscription in pillar 2 | Ask mobiliteitsbudget.be, or delete the sentence. |
| nl-be/blog/mobiliteitsbudget-carpoolen | paying a colleague-driver from pillar 2 | Ask mobiliteitsbudget.be, or reword the example as "carpoolritten via een deeloplossing". |
| nl-be/blog/mobiliteitsbudget-carpoolen | year of the next diagnostiek woon-werkverkeer | Check mobilit.belgium.be in a browser (it shows a CAPTCHA to bots). |

### Other open points (from the PR descriptions)
- **NL-1 and NL-2: Handboek Loonheffingen §23.8.1.** Does providing a carpool app make the carpool "employer-organised"? This decides whether passengers can get the tax-free vergoeding. Get advice, or cite §23.8.1.
- **NL-1: confirm the € 2,45/day thuiswerkvergoeding for 2026** by eye in the Belastingdienst "Tarieven 2026" PDF.
- **NL-3:** two sourced sentences were cut for length (each KVK registration with 100+ employees reports separately; home-working days don't need to be reported). Restore them if you want.
- **Fisconetplus links (FOD Financiën)** open a JavaScript page that may ask first-time visitors to accept terms. Check that they open for a normal reader.

## 3. Launch day, per locale

1. `hugo --gc --minify` locally: zero warnings. Then `scripts/check-i18n.sh`; it will report the new locale under "differs from main", which is expected once a home is live.
2. Merge, wait for the deploy, then check:
   - `curl -sI https://www.teamwheelsapp.com/nl-be/` returns 200.
   - The FR home now has `hreflang="nl-BE"`.
   - `/sitemap.xml` lists the nl-BE URLs.
3. Google Search Console:
   - resubmit `https://www.teamwheelsapp.com/sitemap.xml`;
   - request indexing for the home, the product page and the seasonal posts.
4. OpenSEO (hosted project "Default"), using the same tools as the earlier research:
   - `run_site_audit` once, to catch hreflang, canonical and duplicate-content issues across locales;
   - `inspect_urls` 1-2 weeks after publication;
   - before starting any rank tracking, run `estimate_rank_tracker_cost` and confirm the cost.
5. Monthly: `get_search_console_performance` and `get_search_opportunities`. Posts ranking 4-20 get a refresh PR first.

## 4. Seasonal deadline
BE-2 (`/nl-be/blog/kilometervergoeding-2027/`), NL-1 (`/nl/blog/reiskostenvergoeding-2027/`) and NL-2 (`/nl/blog/kilometervergoeding-2027/`) should be live by **Dec 7, 2026**, before the January search peak. They need their locale's core pages live first.
