# Content Brief — `/fr/forfait-mobilites-durables-covoiturage/` (page money FMD × covoiturage, FR)

_Prepared 2026-08-29. Status: brief only — page not built yet._
_Source data: competitive landscape 2026-08-29 (project research log), SERP « forfait mobilités
durables covoiturage » (live, 2026-08-29), GSC last-3-months pull 2026-08-29,
service-public.gouv.fr/vosdroits/F33808 (fetched 2026-08-29), Worklife page analysis._
_Complements — does NOT replace — `brief-fmd-hub-fr.md` (hub refresh, already executed 2026-06-25)._

## Why this page exists

- **The keyword ladder:** `forfait mobilité durable` = **6 600/mois, KD 26, intent commercial** —
  the biggest keyword ever measured on this project. The hub blog post holds that head term
  (GSC: pos 4.8–9.8 on « forfait mobilité durable 2026 », pos 2.75 on the head term itself).
  The **covoiturage intersection** (« forfait mobilités durables covoiturage », « fmd covoiturage »,
  « justificatif covoiturage fmd », « prime covoiturage employeur ») is its highest-value long tail
  — and **no dedicated TeamWheels URL targets it**. GSC shows zero covoiturage×FMD queries captured
  yet (only « prime covoiturage 2026 » @pos 11, absorbed by the hub).
- **The SERP is winnable:** on « forfait mobilités durables covoiturage », p1 = gouvernement
  (ecologie.gouv, fonction-publique, URSSAF, ADEME) + **Covoit'ici p5** (opérateur territorial, pas
  un concurrent B2B) + **Worklife p7** (carte d'avantages — sa page dédiée fait ~2 500 mots,
  orientée sensibilisation, avec des **montants périmés : 700 €/800 €** au lieu de 600 €/900 €).
  Aucune plateforme de covoiturage entreprise ne s'y positionne.
- **Product wedge parfait :** pour verser le FMD covoiturage en exonération, l'employeur doit
  **prouver les trajets** (attestation sur l'honneur ou justificatif). TeamWheels génère
  l'historique des trajets et les justificatifs — la page transforme une recherche réglementaire
  en argument de démo. C'est le même playbook que `white-label-carpool-platform.md` : SERP sans
  concurrent direct + cluster de citation IA (le site rank déjà **pos 1** sur la requête
  conversationnelle « qu'est-ce que le FMD et comment une PME peut-elle le mettre en place ? »).

## Target file & routing

- **Create:** `content/french/forfait-mobilites-durables-covoiturage.md`
  → `/fr/forfait-mobilites-durables-covoiturage/`
- **Layout:** `layout: "benefits"` (blocs `banner` / `image_and_content_blocks` /
  `call_to_action`). **Modèle : `content/french/white-label-carpool-platform.md`** — même recette :
  `faq:` (forme slice) + `howto:` en front matter → schémas FAQPage + HowTo auto-émis par
  `layouts/partials/seo/schema.html`. Le layout benefits n'affiche PAS de bloc FAQ visible :
  reprendre les Q/R dans un `image_and_content_blocks` comme sur la page white-label.
- **FR-only, pas de paire EN** : le cluster durable EN est micro (≤90/mois) et le FMD est un
  dispositif français. (Si une paire EN devient utile plus tard — angle « commuter benefits » —
  même nom de fichier côté `content/english/` pour l'appairage hreflang automatique.)
- Liens internes en URL préfixées `/fr/...` (les liens body racine 404 — convention établie).

## Keyword targeting

| Role | Keywords |
| ---- | -------- |
| **Primary** | forfait mobilités durables covoiturage |
| **Secondary** | fmd covoiturage · prime covoiturage employeur · justificatif covoiturage fmd · attestation covoiturage employeur · indemnité covoiturage entreprise |
| **Fold in** | financer le covoiturage de ses salariés · preuve de covoiturage · registre de preuve de covoiturage employeur |
| **Ne PAS viser ici** | `forfait mobilité durable` (tête) · `fmd 2026` · `fmd urssaf` — ils appartiennent au hub blog. `prime covoiturage` seule (dispositif État, le hub la traite). |

## SEO metadata (proposed)

- **title** (≤60) : `FMD & Covoiturage : le Guide Employeur 2026 | TeamWheels`
- **description** (≤160) : `Financez le covoiturage domicile-travail via le forfait mobilités durables : montants exonérés, justificatifs, mise en place en 4 étapes. Guide pour RH et DAF.`
- **keywords** : reprendre le cluster ci-dessus (convention existante, séparé par virgules).

## Facts sheet (vérifié 2026-08-29 — re-vérifier à la rédaction, loi de finances annuelle)

Source : service-public.gouv.fr F33808 (maj 2025-07-29) — citer URSSAF/service-public dans la page.

- FMD **facultatif** (accord d'entreprise, accord de branche ou décision unilatérale après
  consultation du CSE) ; versement égalitaire entre salariés éligibles sinon sanction 750–3 750 €.
- Plafonds d'exonération : **600 €/an/salarié** (dont max 300 € prime carburant) ;
  **900 €/an** en cas de cumul avec la prise en charge d'abonnement transports en commun.
- Covoiturage éligible **conducteur ET passager** ; depuis le 01/01/2025 y compris covoiturage
  avec un membre de la famille (à re-vérifier — source Previssima).
- Justification : **attestation sur l'honneur ou justificatif de paiement** ; montant à faire
  figurer sur le bulletin de paie. Le Registre de Preuve de Covoiturage
  (covoiturage.beta.gouv.fr) fournit des preuves de classe A/B/C via les opérateurs — à
  expliquer (c'est la lacune n°1 de la SERP côté employeur).
- **Angle à battre :** la page Worklife affiche 700 €/800 € (périmé). Être LE contenu à jour
  avec tableau des plafonds sourcé = différenciateur immédiat + candidat AI Overview.

## Page structure (front-matter blocks, layout benefits)

1. **`banner`** — H1 **« Forfait mobilités durables & covoiturage : le guide de l'employeur »**.
   Sous-titre : RH, DAF, responsables mobilité/RSE — comment financer jusqu'à 600 €/an/salarié de
   covoiturage, exonérés de cotisations. CTA primaire `Demander une démo` → `/fr/contact/` ;
   secondaire `Calculer vos économies` → `/fr/tools/savings-calculator/`.
2. **Bloc — Le covoiturage est éligible au FMD (réponse directe, format answer-first).**
   Conducteur et passager, cadre LOM, tableau des plafonds 600/900 € sourcé URSSAF. 2–3 phrases
   citables (GEO).
3. **Bloc — Mise en place en 4 étapes** (miroir du `howto:` front matter) : 1. choisir modalités et
   budget ; 2. formaliser (accord/DUE + consultation CSE) ; 3. définir la preuve des trajets ;
   4. verser et inscrire en paie. Mention du calendrier et des coûts réels (lacunes Worklife).
4. **Bloc — La preuve des trajets : le vrai sujet.** Attestation sur l'honneur vs Registre de
   Preuve de Covoiturage (classes A/B/C) vs **export automatique depuis la plateforme** — c'est le
   wedge TeamWheels : historique de trajets dans Teams, justificatifs prêts pour la paie,
   reporting RSE/Scope 3. Lien démo.
5. **Bloc — Cumuls et cas particuliers (bref).** FMD + abonnement TC (900 €), FMD vs prime
   covoiturage de l'État, renvoi vers le hub et le billet « aides mobilité durable » pour le détail.
6. **Bloc — Erreurs fréquentes + Q/R visibles** (reprend le contenu du `faq:`).
7. **`faq:`** (schema) : « Le covoiturage est-il éligible au FMD ? » · « Quel montant maximum
   en 2026 ? » · « Quels justificatifs pour le covoiturage ? » · « Passager et conducteur y
   ont-ils droit ? » · « Peut-on cumuler FMD et abonnement transport ? » · « Comment TeamWheels
   automatise-t-il les justificatifs ? »
8. **`howto:`** : « Mettre en place le FMD covoiturage dans son entreprise » — les 4 étapes.
9. **`call_to_action`** — `Demander une démo` / essai 30 jours.

Longueur cible : 1 800–2 500 mots utiles. Battre Worklife sur l'**opérationnel employeur**
(preuves, paie, coûts, calendrier), pas sur la sensibilisation.

## Internal linking

- **Inbound (à ajouter) :** hub `content/french/blog/forfait-mobilite-durable-guide-complet-2025.md`
  (depuis ses sections « Les justificatifs requis pour le covoiturage » et « FMD et covoiturage :
  le duo gagnant » — les raccourcir en résumés + lien, ancre « FMD covoiturage : le guide
  employeur ») · `blog/aides-mobilite-durable-entreprise-regles-plafonds-cumuls.md` ·
  `blog/covoiturage-domicile-travail-entreprise.md` · `blog/covoiturage-rse-entreprise-politique-mobilite-durable.md` ·
  `/fr/corporate-carpooling-software/` (bloc FMD) · home FR. Footer : menu 4 (comme white-label).
- **Outbound :** `/fr/corporate-carpooling-software/` (conversion), `/fr/tools/savings-calculator/`,
  `/fr/pricing/`, `/fr/contact/`, hub FMD (autorité), sources officielles (service-public, URSSAF,
  ADEME employeursprocovoiturage — liens sortants de confiance, bons pour l'E-E-A-T).

## Cannibalization guardrails

- Le hub garde `forfait mobilité durable` + variantes 2026/urssaf/fonction publique ; cette page
  prend uniquement l'intersection covoiturage. Title/H1 du hub inchangés.
- Après indexation, vérifier avec `get_search_console_performance` (`dimensions:["query","page"]`,
  filtre query contains « covoiturage ») que les requêtes FMD×covoiturage consolident sur la
  nouvelle URL et non sur le hub.

## Success metrics

- GSC à ~4 semaines : impressions sur « forfait mobilités durables covoiturage » / « fmd
  covoiturage » attribuées à la nouvelle URL ; le hub conserve ses positions tête.
- Clarity grounding queries (prochain export, Track C) : citations IA sur le cluster
  FMD/covoiturage employeur.
- Clics internes nouvelle page → `/fr/contact/` (démos).

## Suggested OpenSEO tags (on confirmation)

`topic:fmd` · `cluster:fmd-covoiturage-fr` · `intent:commercial` · `market:fr` · `priority:p1`

## Build checklist

- `layout: "benefits"`, `draft: false`, image existante sous `assets/`/`static/`
  (réutiliser `images/blog/sustainable-mobility.jpg` ou dédiée).
- `faq:` en forme slice (`- question:` / `- answer:`) + `howto:` (name + `step:` ordonnés) —
  vérifier l'émission FAQPage/HowTo dans le build (`hugo --gc --minify` clean, JSON-LD valide).
- Tous les CTA en `/fr/...` (jamais `teamwheels.app`, jamais de racine sans préfixe langue).
- Enregistrer la page en key page OpenSEO (`role: money`) au lancement + entrée research log.
