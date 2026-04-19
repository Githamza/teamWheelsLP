# Calculateur d'Économies Covoiturage — Plan Conception & Technique
> Outil gratuit TeamWheels | `teamwheels.app/tools/savings-calculator`

---

## 1. Objectifs produit

| Objectif | Détail |
|---|---|
| **Lead gen** | Capturer l'email via un rapport PDF téléchargeable |
| **Distribution** | SEO sur requêtes RH/RSE + partage LinkedIn |
| **Démonstration valeur** | Montrer concrètement ce que TeamWheels peut économiser AVANT l'inscription |
| **Marché** | France (€, km, FMD) + UK/US ($/£, miles, équivalents fiscaux) |

---

## 2. Parcours utilisateur

```
[Étape 1 — Paramètres entreprise]
  → Langue / Devise / Pays
  → Nombre de salariés
  → Distance moyenne domicile-travail (km ou miles)
  → Nombre de jours travaillés/an

[Étape 2 — Hypothèses mobilité]
  → % de salariés en voiture solo (slider)
  → % de covoiturage cible estimé (slider)
  → Consommation moyenne du véhicule (L/100 ou MPG)
  → Prix du carburant (pré-rempli selon pays, éditable)

[Étape 3 — Résultats animés]
  → Économies CO₂ évitées (tonnes/an)
  → Économies financières salariés (€ ou $ /an)
  → Gain employeur (charges FMD ou équivalent)
  → Réduction places parking nécessaires
  → Score RSE mobilité (0–100)

[Étape 4 — Rapport PDF]
  → Formulaire email (prénom, email, nom entreprise)
  → Génération et téléchargement du PDF
  → CTA : "Déployez TeamWheels pour atteindre ces résultats"
```

---

## 3. Formules de calcul

### 3.1 Variables d'entrée

```js
const inputs = {
  employees,          // nb salariés
  distanceKm,         // distance A/R domicile-travail
  workDays,           // jours travaillés/an (défaut: 220)
  soloCarsPercent,    // % voitures solo actuelles (défaut: 75%)
  carpoolTargetPct,   // % covoiturage cible (défaut: 30%)
  fuelConsumption,    // L/100km (défaut: 7) ou MPG
  fuelPrice,          // €/L ou $/gallon (pré-rempli par pays)
  currency,           // 'EUR' | 'USD' | 'GBP'
  unit,               // 'km' | 'miles'
}
```

### 3.2 Calculs principaux

```js
// Conducteurs solos actuels
const soloCars = Math.round(employees * soloCarsPercent / 100)

// Covoitureurs cibles (conducteurs convertis)
const carpoolConverted = Math.round(soloCars * carpoolTargetPct / 100)

// Distance totale évitée par an (km)
const kmSaved = carpoolConverted * distanceKm * workDays

// CO₂ évité (facteur ADEME : 0.193 kgCO₂/km pour voiture moyenne)
const co2Saved = (kmSaved * 0.193) / 1000  // en tonnes

// Économies carburant par salarié covoitureur (conducteur)
const fuelSavedPerDriver = (distanceKm / 2 * workDays * fuelConsumption / 100) * fuelPrice
// → on économise la moitié des km (passager prend en charge 1 jour sur 2)

// Économies financières totales salariés
const totalEmployeeSavings = carpoolConverted * fuelSavedPerDriver

// Gain employeur FMD (France uniquement)
// FMD max 2025 : 700€/an/salarié exonérés de charges
const FMD_CAP = 700   // €/an/salarié
const fmdGain = carpoolConverted * Math.min(fuelSavedPerDriver * 0.5, FMD_CAP) * 0.45
// 0.45 = taux moyen charges patronales évitées sur la prime

// Réduction places parking
const parkingReduced = Math.round(carpoolConverted * 0.7)
// 70% des covoitureurs libèrent une place (conducteurs alternants)

// Score RSE mobilité (0–100)
const rseScore = Math.round(
  (carpoolTargetPct * 0.4) +
  (Math.min(co2Saved / employees * 10, 40)) +
  (Math.min(parkingReduced / employees * 100 * 0.2, 20))
)
```

### 3.3 Conversions internationales

```js
const CONVERSIONS = {
  kmToMiles: 0.621371,
  lPer100ToMPG: 235.215,
  fuelDefaults: {
    FR: { price: 1.85, unit: '€/L',     currency: 'EUR', distUnit: 'km' },
    US: { price: 3.50, unit: '$/gal',   currency: 'USD', distUnit: 'miles' },
    GB: { price: 1.55, unit: '£/L',     currency: 'GBP', distUnit: 'miles' },
  },
  co2Factor: {
    km:    0.193,  // kgCO₂/km (ADEME)
    miles: 0.310,  // kgCO₂/mile (EPA)
  }
}
```

---

## 4. Architecture technique

### Stack

| Couche | Choix | Justification |
|---|---|---|
| **Markup** | HTML5 sémantique | Vanilla, pas de dépendance |
| **Style** | CSS3 custom properties | Thème TeamWheels, pas de framework |
| **Logique** | Vanilla JS ES2022 (modules) | Léger, pas de build step |
| **PDF** | `jsPDF` + `jspdf-autotable` via CDN | Génération client-side, pas de serveur |
| **Charts** | `Chart.js` via CDN | Léger, beau, pas d'overhead |
| **i18n** | Objet JS natif `TRANSLATIONS` | Pas de lib, switch FR/EN/… simple |
| **Hébergement** | `teamwheels.app/tools/savings-calculator` | Page standalone, iframe-able |

### Structure de fichiers

```
/tools/savings-calculator/
├── index.html          ← page principale
├── style.css           ← styles + variables TeamWheels
├── app.js              ← orchestration, state, événements
├── calculator.js       ← formules de calcul (module pur)
├── i18n.js             ← toutes les chaînes FR/EN/autres
├── pdf.js              ← génération du rapport PDF
├── charts.js           ← instanciation Chart.js
└── assets/
    ├── logo.svg
    └── og-calculator.png  ← image Open Graph pour partage
```

### Modules JS

```js
// calculator.js — module pur, zéro dépendance
export function computeSavings(inputs) { ... }
export function convertUnits(value, from, to) { ... }

// i18n.js
export const TRANSLATIONS = {
  fr: { step1Title: "Votre entreprise", ... },
  en: { step1Title: "Your company", ... },
}
export function t(key, lang = 'fr') { ... }

// pdf.js — dépend de jsPDF
export async function generateReport(results, inputs, userInfo, lang) { ... }

// charts.js — dépend de Chart.js
export function renderBarChart(canvasId, data) { ... }
export function renderDonutChart(canvasId, data) { ... }
```

---

## 5. UI & UX — Spécifications visuelles

### Palette de couleurs (à aligner sur charte TeamWheels)

```css
:root {
  --tw-primary:     #2563EB;   /* Bleu TeamWheels */
  --tw-primary-dark:#1D4ED8;
  --tw-accent:      #10B981;   /* Vert éco */
  --tw-bg:          #F8FAFC;
  --tw-surface:     #FFFFFF;
  --tw-text:        #0F172A;
  --tw-muted:       #64748B;
  --tw-border:      #E2E8F0;
}
```

### Layout — Stepper 4 étapes

```
┌─────────────────────────────────────────────────┐
│  Logo TeamWheels      🌐 FR | EN         [Beta] │
├─────────────────────────────────────────────────┤
│                                                  │
│  ① Entreprise  ──  ② Mobilité  ──  ③ Résultats  ③ Rapport
│       ●               ○               ○              ○     │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │           CONTENU ÉTAPE ACTIVE           │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│              [← Précédent]  [Suivant →]          │
└─────────────────────────────────────────────────┘
```

### Étape 3 — Résultats (cards animées)

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  🌿 CO₂      │  │  💶 Salariés  │  │  🏢 Employeur │  │  🅿️ Parking  │
│  évité       │  │  économisent │  │  FMD gain    │  │  libérées    │
│              │  │              │  │              │  │              │
│  12.4 t/an   │  │  €847/an     │  │  €31 400/an  │  │  42 places   │
│  ↑ counter   │  │  ↑ counter   │  │  ↑ counter   │  │  ↑ counter   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

[Bar chart : avant/après covoiturage]    [Score RSE Gauge 0–100]
```

### Étape 4 — Gate email (léger, pas intrusif)

```
┌─────────────────────────────────────────────────┐
│  📄 Téléchargez votre rapport personnalisé       │
│                                                  │
│  Prénom          [________________]              │
│  Email pro        [________________]              │
│  Entreprise      [________________]              │
│                                                  │
│  ☐ J'accepte de recevoir des infos TeamWheels   │
│                                                  │
│        [⬇ Télécharger le rapport PDF]            │
│                                                  │
│  Ou partagez directement : [LinkedIn] [Twitter]  │
└─────────────────────────────────────────────────┘
```

---

## 6. Contenu du rapport PDF

```
Page 1 — Couverture
  Logo TeamWheels | Date | Nom entreprise
  Titre : "Rapport d'impact covoiturage — [Entreprise]"

Page 2 — Synthèse exécutive
  Tableau récapitulatif des 4 métriques clés
  Score RSE mobilité avec interprétation

Page 3 — Détail des calculs
  Hypothèses retenues
  Méthodologie (référence ADEME / EPA)
  Graphiques (bar chart avant/après, répartition CO₂)

Page 4 — Éligibilité FMD / Tax benefits
  France : détail exonération, plafonds 2025
  UK/US : équivalents (Cycle to Work, commuter benefits)

Page 5 — Prochaines étapes
  Comment TeamWheels concrétise ces économies
  QR code → landing page TeamWheels
  Contact : demo@teamwheels.app
```

---

## 7. i18n — Structure

```js
// i18n.js
export const TRANSLATIONS = {
  fr: {
    meta: {
      title: "Calculateur d'économies covoiturage | TeamWheels",
      description: "Estimez les économies CO₂ et financières du covoiturage dans votre entreprise."
    },
    steps: {
      1: { title: "Votre entreprise", subtitle: "Quelques infos sur votre organisation" },
      2: { title: "Mobilité actuelle", subtitle: "Comment vos salariés se déplacent aujourd'hui" },
      3: { title: "Vos économies potentielles", subtitle: "Résultats estimés avec TeamWheels" },
      4: { title: "Votre rapport personnalisé", subtitle: "Téléchargez votre analyse complète" },
    },
    fields: {
      employees:     "Nombre de salariés",
      distance:      "Distance domicile-travail (A/R, km)",
      workDays:      "Jours travaillés / an",
      soloPercent:   "% de salariés en voiture solo",
      targetPercent: "Objectif de covoiturage (%)",
      fuelPrice:     "Prix du carburant (€/L)",
      consumption:   "Consommation moyenne (L/100km)",
    },
    results: {
      co2:      { label: "CO₂ évité", unit: "t/an", desc: "Équivalent {x} allers Paris-NYC" },
      savings:  { label: "Économies par covoitureur", unit: "€/an" },
      fmd:      { label: "Gain FMD employeur", unit: "€/an" },
      parking:  { label: "Places parking libérées", unit: "places" },
      rse:      { label: "Score RSE Mobilité", unit: "/ 100" },
    },
    cta: {
      download: "Télécharger mon rapport PDF",
      demo:     "Voir une démo TeamWheels",
      share:    "Partager sur LinkedIn",
    }
  },

  en: {
    meta: {
      title: "Carpooling Savings Calculator | TeamWheels",
      description: "Estimate CO₂ and financial savings from corporate carpooling."
    },
    steps: {
      1: { title: "Your company", subtitle: "A few details about your organisation" },
      2: { title: "Current mobility", subtitle: "How your employees commute today" },
      3: { title: "Your potential savings", subtitle: "Estimated results with TeamWheels" },
      4: { title: "Your personalised report", subtitle: "Download your full analysis" },
    },
    fields: {
      employees:     "Number of employees",
      distance:      "Home-to-work distance (round trip, miles)",
      workDays:      "Working days / year",
      soloPercent:   "% of employees driving alone",
      targetPercent: "Carpooling target (%)",
      fuelPrice:     "Fuel price ($/gal)",
      consumption:   "Average consumption (MPG)",
    },
    results: {
      co2:      { label: "CO₂ avoided", unit: "t/yr", desc: "Equivalent to {x} Paris-NYC flights" },
      savings:  { label: "Savings per carpooler", unit: "$/yr" },
      fmd:      { label: "Employer tax benefit", unit: "$/yr" },
      parking:  { label: "Parking spots freed", unit: "spots" },
      rse:      { label: "Mobility ESG Score", unit: "/ 100" },
    },
    cta: {
      download: "Download my PDF report",
      demo:     "See a TeamWheels demo",
      share:    "Share on LinkedIn",
    }
  }
}
```

---

## 8. SEO & Distribution

### Meta tags (index.html)

```html
<title>Calculateur d'économies covoiturage entreprise | TeamWheels</title>
<meta name="description" content="Estimez en 2 minutes les économies CO₂ et financières du covoiturage pour vos salariés. Rapport PDF gratuit.">
<meta property="og:image" content="/tools/savings-calculator/assets/og-calculator.png">
<link rel="canonical" href="https://teamwheels.app/tools/savings-calculator">

<!-- Hreflang -->
<link rel="alternate" hreflang="fr" href="https://teamwheels.app/tools/savings-calculator?lang=fr">
<link rel="alternate" hreflang="en" href="https://teamwheels.app/tools/savings-calculator?lang=en">
```

### Mots-clés cibles

| Langue | Requêtes prioritaires |
|---|---|
| FR | `calculateur covoiturage entreprise`, `économies FMD salarié`, `bilan carbone mobilité domicile-travail` |
| EN | `corporate carpooling savings calculator`, `employee commute CO2 calculator`, `ESG mobility score` |

### Canaux de distribution

- **LinkedIn** : post résultats + partage avec image générée dynamiquement
- **Annuaires RH FR** : RHinfo, Myrhline, Actionco, Welcome to the Jungle (ressources)
- **Product Hunt** : lancement "free tool" sous TeamWheels
- **Iframe embed** : snippet proposé aux partenaires RH / consultants mobilité

---

## 9. Intégrations & Analytics

```js
// Tracking events (Google Analytics 4 ou Plausible)
const EVENTS = {
  STEP_COMPLETE:    'calculator_step_complete',   // {step: 1|2|3|4}
  RESULTS_VIEWED:   'calculator_results_viewed',  // {co2, savings, rseScore}
  PDF_DOWNLOADED:   'calculator_pdf_downloaded',  // {lang, country}
  DEMO_CLICKED:     'calculator_cta_demo',
  SHARED_LINKEDIN:  'calculator_shared_linkedin',
}
```

### Webhook lead capture (optionnel)

```js
// pdf.js — à la soumission email
async function submitLead(userInfo, results) {
  await fetch('https://teamwheels.app/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'savings-calculator',
      lang: currentLang,
      ...userInfo,
      estimatedSavings: results.totalEmployeeSavings,
      rseScore: results.rseScore,
    })
  })
}
```

---

## 10. Roadmap de build

| Phase | Tâches | Durée estimée |
|---|---|---|
| **Phase 1** | HTML structure + stepper CSS + i18n FR/EN | 4h |
| **Phase 2** | Logique calcul (calculator.js) + binding inputs live | 3h |
| **Phase 3** | Étape résultats : cards animées + Chart.js | 3h |
| **Phase 4** | Génération PDF (jsPDF) + gate email | 4h |
| **Phase 5** | SEO meta, OG image, hreflang, analytics | 2h |
| **Phase 6** | Tests cross-browser + responsive mobile | 2h |
| **Total** | | **~18h** |

---

## 11. Critères de succès

| KPI | Cible mois 1 |
|---|---|
| Taux complétion étape 1→3 | > 60% |
| Taux gate email (étape 4) | > 25% des visiteurs étape 3 |
| Leads qualifiés captés | > 30/mois |
| Partages LinkedIn | > 10/mois |
| Taux démo demandée | > 10% des leads PDF |
