# TeamWheels — Google Ads Lead-Gen Campaign Plan

**Goal:** Maximize qualified B2B demo / free-trial requests (HR, Sustainability/ESG, Facilities/Mobility decision-makers).
**Product:** Microsoft Teams-native corporate carpooling. 30-day free trial → €5/seat/month → Enterprise (custom).
**Markets:** EN (US, UK, CA-en) + FR (France, CA-fr).
**Primary conversion:** Demo request / contact form submit. Secondary: free-trial start, savings-calculator completion.

---

## 0. Prerequisites (do these BEFORE spending a euro)

These are the difference between "spending money" and "generating leads." Without conversion tracking, the bidding algorithm is blind.

1. **Conversion tracking.** Create a primary conversion = demo/contact form submit. Because the form is Formspree, either:
   - Redirect to a `/en/thank-you/` (and `/fr/merci/`) page after submit and fire the Google Ads conversion on that pageview, **or**
   - Fire a GTM/gtag event on the Formspree success callback.
   Mark **demo request** as the only "Primary" conversion (used for bidding). Mark free-trial click + savings-calculator as "Secondary" (observe-only).
2. **Google Ads + GA4 linked**, and import GA4 key events as backup conversions.
3. **Enhanced Conversions for Leads** turned on (improves match rate / lowers reported CPA materially for B2B).
4. **Tag the calculator** (`/en/tools/savings-calculator/`) as a micro-conversion — strong intent signal.
5. **Set up a Lead Form asset** (in-SERP form) as a volume supplement, but landing-page-with-form stays primary for lead quality.

---

## 1. Account structure

Split by language/geo so budget, ad schedule, and bids are controllable per market.

| Campaign | Network | Geo | Lang | Daily budget (start) |
|---|---|---|---|---|
| `Search – EN – Corporate Carpooling` | Search only (no Search Partners, no Display) | US, UK, CA | English | €40 |
| `Search – FR – Covoiturage Entreprise` | Search only | France, CA | French | €25 |
| `PMax – Retargeting/Brand` (Phase 2) | Perf Max | All | both | €10 |

- **Search Partners / Display Network: OFF** at launch (low-intent traffic burns niche B2B budget). Re-test later.
- **Bidding:** start **Maximize Clicks with a max CPC cap (~€4)** for the first ~2 weeks to gather conversion data, then switch to **Maximize Conversions**, then **Target CPA** once you have ~15–30 conversions/month. (For pure cold accounts, tCPA too early starves delivery.)
- **Ad schedule:** business hours skew (Mon–Fri 07:00–19:00) for B2B; widen once data justifies it.
- **Audience signals (observation):** Company HR/Facilities job functions, "business software" in-market, sustainability/ESG affinity, Microsoft 365 / Teams users. Layer as *observe* first, then bid-adjust.
- **Location targeting:** "Presence: people in your targeted locations" (NOT interest) to avoid tire-kickers abroad.

---

## 2. EN campaign — ad groups & keywords

Tightly themed ad groups = higher Quality Score = lower CPC. Use **Phrase** and **Exact** match (avoid broad until you have a strong negative list + conversion history). Niche terms → low volume but high intent; that's the point.

### AG1 — Corporate Carpooling Software → LP `/en/corporate-carpooling-software/`
```
"corporate carpooling software"
"employee carpooling app"
"carpool management software"
"carpooling software for business"
"employee rideshare platform"
[corporate carpool software]
[employee carpooling software]
```

### AG2 — Commute / Mobility Management → LP `/en/benefits/`
```
"commute management software"
"employee commute platform"
"employee transportation software"
"corporate mobility platform"
"vanpool alternative software"
"commuter benefits platform"
```

### AG3 — Microsoft Teams Carpooling (unique differentiator, low competition) → LP `/en/how-it-works/`
```
"microsoft teams carpooling"
"carpooling app for microsoft teams"
"teams commute app"
"microsoft teams mobility app"
```

### AG4 — ESG / Scope 3 Commute → LP `/en/benefits/#business-impact`
```
"scope 3 commute tracking"
"employee commute emissions software"
"scope 3 category 7 software"
"commute carbon tracking employees"
```

### AG5 — Competitor / Alternative (capture in-market shoppers) → LP `/en/corporate-carpooling-software/`
```
"blablacar for business alternative"
"klaxit alternative"
"karos alternative"
"vanpool alternative"
"uber for business commute alternative"
```
> Brand-bid on competitors only if margins allow; keep these in a *separate, capped* ad group so you can pause fast.

---

## 3. FR campaign — ad groups & keywords

France has a **regulatory tailwind**: companies >50 employees must have a *Plan de Mobilité Employeur (PDME)*, and the *Forfait Mobilités Durables (FMD)* subsidizes carpooling. These are extremely high-intent.

### AG1 — Logiciel / Application Covoiturage Entreprise → LP `/fr/corporate-carpooling-software/`
```
"logiciel covoiturage entreprise"
"application covoiturage entreprise"
"plateforme covoiturage entreprise"
"outil covoiturage entreprise"
[logiciel covoiturage entreprise]
```

### AG2 — Covoiturage Domicile-Travail / Salariés → LP `/fr/benefits/`
```
"covoiturage domicile travail entreprise"
"covoiturage salariés"
"covoiturage domicile travail"
"solution covoiturage employeur"
```

### AG3 — Plan de Mobilité / Forfait Mobilités Durables (regulatory intent) → LP `/fr/benefits/`
```
"plan de mobilité employeur"
"plan de mobilité entreprise"
"forfait mobilités durables covoiturage"
"plan de mobilité PDME logiciel"
```

### AG4 — Microsoft Teams Covoiturage → LP `/fr/how-it-works/`
```
"covoiturage microsoft teams"
"application covoiturage teams"
```

---

## 4. Negative keyword list (account-level, apply to both — translate for FR)

Protect budget from consumer/irrelevant traffic.
```
free                cours / classes
school              kids
karaoke             song / lyrics
blablacar (as the consumer app, unless in AG5)
uber driver / lyft driver / become a driver
jobs / hiring / salary / recruitment
login / sign in / download (consumer app intent)
"how to carpool" (informational, no buyer intent — unless running a separate awareness campaign)
student
flight / train / bus ticket
games / mod
```
FR negatives: `gratuit, étudiant, covoiturage longue distance, trajet vacances, blablacar (conso), petites annonces, emploi, salaire, permis`.

---

## 5. Responsive Search Ads (RSA) — copy bank

Pin sparingly; let Google rotate. Each ad group gets 8–12 headlines + 4 descriptions. Below = starter copy per theme (grounded in real product claims from the site).

### EN — AG1 Corporate Carpooling Software
**Headlines (30 char max):**
- Corporate Carpooling Software
- Built Inside Microsoft Teams
- Live in 5 Minutes, Not Months
- 40%+ Employee Participation
- 30-Day Free Trial — No Card
- €5/Seat/Month, All Features
- No App to Install for Staff
- Cut Parking Demand by 30%
- Track Scope 3 Commute CO₂
- Azure AD SSO + GDPR Hosting
- Book a Free Demo Today
- Trusted Carpool Platform

**Descriptions (90 char max):**
- Launch an employee carpool program inside Teams in 5 minutes. No new app. Book a demo.
- Zero-friction adoption — staff carpool from Teams chat. 40%+ participation. Free 30-day trial.
- Cut parking 30%, save staff $2,000+/yr, hit Scope 3 targets. See it live — request a demo.
- One price, all features: €5/seat/month after a free 30-day trial. GDPR-compliant. Start now.

### EN — AG3 Microsoft Teams Carpooling
**Headlines:**
- Carpooling for Microsoft Teams
- Carpool Without a New App
- Add From Microsoft AppSource
- One Click in Teams to Carpool
- 5-Minute Teams Deployment
- Conversational Carpool Bot
- Free 30-Day Trial
- Book a Demo

**Descriptions:**
- TeamWheels lives in Teams — staff find & offer rides in chat. 5-min deploy. Free trial.
- No separate app, no change management. Native Teams carpooling. Request a live demo today.

### EN — AG4 ESG / Scope 3
**Headlines:**
- Track Scope 3 Commute Emissions
- GHG Protocol Category 7 Data
- ESG-Ready Mobility Reporting
- Cut Commute Carbon, Prove It
- Automatic ESG & CO₂ Reports
- Book an ESG Demo

**Descriptions:**
- Measure & reduce Scope 3 Category 7 commute emissions with audit-ready reports. Book a demo.
- Give Sustainability teams real commute CO₂ data — automatically. Free 30-day trial.

### FR — AG1 Logiciel Covoiturage Entreprise
**Titres:**
- Logiciel Covoiturage Entreprise
- Intégré à Microsoft Teams
- Opérationnel en 5 Minutes
- 40%+ de Participation
- Essai Gratuit 30 Jours
- 5€/Siège/Mois, Tout Inclus
- Aucune Appli à Installer
- Réduisez le Parking de 30%
- Suivi des Émissions Scope 3
- Demandez une Démo

**Descriptions:**
- Lancez le covoiturage de vos salariés dans Teams en 5 min. Sans nouvelle appli. Démo gratuite.
- Adoption sans friction : vos équipes covoiturent depuis Teams. Essai gratuit 30 jours.
- Réduisez le parking, atteignez vos objectifs Scope 3, fidélisez. Réservez une démo.

### FR — AG3 Plan de Mobilité / FMD
**Titres:**
- Logiciel Plan de Mobilité
- Conforme PDME & FMD
- Covoiturage Domicile-Travail
- Forfait Mobilités Durables
- Démo Gratuite
**Descriptions:**
- Répondez à votre obligation PDME et valorisez le Forfait Mobilités Durables. Démo gratuite.
- Mobilité durable clé en main dans Teams. Reporting automatique. Essai 30 jours.

---

## 6. Assets / Extensions (do ALL — they lift CTR 10–20% for free)

- **Sitelinks:** Pricing · How It Works · Free 30-Day Trial · Savings Calculator (use the real `/en/tools/savings-calculator/`) · Benefits · Book a Demo.
- **Callouts:** "Live in 5 Minutes" · "No App to Install" · "30-Day Free Trial" · "GDPR-Compliant" · "On Microsoft AppSource" · "Azure AD SSO".
- **Structured snippets:** *Features* — Carpool Matching Bot, Scope 3 Dashboard, ESG Reports, SSO, Admin Analytics.
- **Lead form asset:** "Book a TeamWheels demo" — qualifying Qs (company size, role, country). Volume booster; landing-page form stays primary.
- **Call asset / Image assets / Logo / Business name.**
- **Promotion asset:** "30-Day Free Trial — No Credit Card."

---

## 7. Landing page mapping & CRO

| Intent | Landing page |
|---|---|
| Software / buyer | `/en/corporate-carpooling-software/` · `/fr/corporate-carpooling-software/` |
| Commute/mobility/ESG | `/en/benefits/` · `/fr/benefits/` |
| Teams differentiator | `/en/how-it-works/` · `/fr/how-it-works/` |
| Pricing shoppers | `/en/pricing/` · `/fr/pricing/` |
| All CTAs resolve to | `/en/contact/` (demo) · `/fr/contact/` |

**CRO priorities (biggest lever on lead volume):**
1. Put the demo form **above the fold** on the destination LP (don't make ad traffic scroll). Consider a dedicated PPC variant of `/contact/` with a short form (Name, Work email, Company, # employees, Country).
2. Match the LP H1 to the ad theme (message match → higher Quality Score + conversion rate).
3. Add the **savings calculator** as a secondary CTA — interactive tools convert browsers into leads.
4. Trust signals near the form: Microsoft AppSource badge, GDPR, "5-minute setup," participation stat.

---

## 8. Budget, expectations & KPIs

- **Niche B2B reality:** low search volume, but high-value leads. Expect CPCs ~€2–6 (EN software terms higher), and a cost-per-lead in the ~€40–120 range depending on LP quality. One closed enterprise account (€5/seat × hundreds of seats × 12 mo) pays back many months of spend — optimize for **lead quality**, not cheapest clicks.
- **Starting budget:** €65/day total (€40 EN + €25 FR) ≈ €2,000/mo. Scale the ad groups that produce demos; cut the rest.
- **KPIs to watch weekly:** Conversions (demo requests), Cost/conversion, Conv. rate, Search Impression Share on AG1/AG3, Quality Score (aim ≥7), Search Terms report (mine for new keywords + negatives).
- **Optimization cadence:** First 2 weeks — add negatives daily from Search Terms. Weeks 3–4 — pause sub-QS-5 keywords, shift budget to winners. Week 4+ — switch to Max Conversions → Target CPA.

---

## 9. Phased rollout

- **Week 0:** Conversion tracking + Enhanced Conversions + thank-you pages. (Blocking — do not launch without.)
- **Week 1:** Launch EN AG1+AG3 and FR AG1+AG3 only (highest intent), Max Clicks w/ CPC cap, full extensions, tight negatives.
- **Week 2–3:** Add AG2/AG4/AG5; mine search terms; switch to Max Conversions once ≥15 conv.
- **Week 4+:** Target CPA; add Lead Form asset; test PMax retargeting on site visitors; build dedicated PPC landing page if CVR < 5%.

---

## 10. Quick "don't-do" list

- Don't run Display/Search Partners at launch.
- Don't use Broad match before you have conversion data + a fat negative list.
- Don't send all traffic to the homepage — use the mapped LPs.
- Don't optimize to cheapest CPC — a €100 lead that demos beats a €20 lead that never replies.
- Don't launch without conversion tracking. (Yes, again.)
