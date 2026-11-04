---
title: "Covoiturage en entreprise : le guide complet 2026"
translationKey: "corporate-carpooling-guide-2026"
date: 2026-04-29
lastmod: 2026-11-04
draft: false
description: "Covoiturage en entreprise : FMD, assurance et accident de trajet, coûts, choix de l'outil et mise en place en 5 étapes. Le guide 2026 pour RH, DAF et RSE."
image: "images/blog/corporate-carpooling.jpg"
author: "TeamWheels Editorial"
reading_time: "15 min"
keywords: "covoiturage en entreprise, covoiturage entreprise, covoiturage domicile-travail, covoiturage professionnel, covoiturage entre collègues, mettre en place le covoiturage en entreprise, assurance covoiturage domicile-travail, accident de trajet covoiturage, organiser un covoiturage, covoiturage salariés, Forfait Mobilité Durable, loi LOM, RSE, CSRD, mobilité durable, Microsoft Teams, TeamWheels"
canonical: "https://www.teamwheelsapp.com/fr/blog/covoiturage-entreprise-guide-2026/"
# URL pilier unique de la requête « covoiturage en entreprise » (informationnel).
# « logiciel / outil / application covoiturage entreprise » → /fr/corporate-carpooling-software/
# (lien avec cette ancre depuis la section #outil, ne pas viser ces requêtes ici).
# Les deux articles ci-dessous ont été fusionnés dans ce guide (septembre 2026).
# Hugo résout les aliases par rapport à la racine de langue (pas de /fr/ en tête) ;
# la 301 serveur qui fait autorité est déclarée dans static/.htaccess.
aliases:
  - /blog/covoiturage-domicile-travail-entreprise/
  - /blog/covoiturage-entreprise-5-etapes-demarrer/
faq:
  - question: "Qu'est-ce que le covoiturage domicile-travail en entreprise ?"
    answer: "Le covoiturage domicile-travail consiste pour des salariés d'une même entreprise — ou de sites proches — à partager un véhicule particulier pour le trajet entre leur domicile et leur lieu de travail. Il n'y a pas de chauffeur professionnel : conducteur et passagers partagent les frais. En France, il est encadré par la loi d'orientation des mobilités (LOM) et peut être financé par l'employeur via le forfait mobilités durables, exonéré de cotisations dans la limite de 600 € par an et par salarié (900 € en cumul avec l'abonnement transport)."
  - question: "Comment mettre en place le covoiturage en entreprise ?"
    answer: "En cinq étapes sur environ 30 jours : diagnostiquer les trajets des salariés, choisir un outil d'appariement, cadrer le dispositif (forfait mobilités durables, charte de covoiturage, communication), lancer un pilote de deux à quatre semaines avec 20 à 50 volontaires, puis généraliser et suivre chaque mois la participation, les trajets partagés et le CO₂ évité."
  - question: "Faut-il une assurance spéciale pour le covoiturage entre collègues ?"
    answer: "Non, tant que le covoiturage reste un partage de frais. Le Code des transports (article L3132-1) le définit comme un trajet effectué à titre non onéreux, excepté le partage des frais, et la DGCCRF précise que le passager est garanti par l'assurance responsabilité civile obligatoire du véhicule. Le conducteur doit en revanche vérifier sa propre garantie conducteur, que la responsabilité civile ne couvre pas."
  - question: "Un accident pendant un covoiturage domicile-travail est-il un accident de trajet ?"
    answer: "Oui. L'article L411-2 du Code de la sécurité sociale protège le trajet entre la résidence et le lieu de travail, et ce parcours peut ne pas être le plus direct lorsque le détour est rendu nécessaire par un covoiturage régulier, comme le rappelle l'INRS. Conducteur et passagers n'ont pas besoin de travailler dans la même entreprise. L'employeur déclare l'accident à la CPAM comme tout accident de trajet."
  - question: "L'employeur peut-il obliger ses salariés à covoiturer ?"
    answer: "Non. Le salarié choisit son mode de transport pour venir travailler : le covoiturage reste une démarche volontaire. L'employeur peut en revanche l'encourager, l'organiser avec un outil d'appariement, réserver des places de parking aux covoitureurs et le financer par le forfait mobilités durables."
  - question: "Combien coûte le covoiturage en entreprise pour l'employeur ?"
    answer: "Trois postes : l'outil (de 0 € pour un tableur à quelques euros par salarié et par mois ; TeamWheels coûte 3 € HT par collaborateur et par mois en tarif promotionnel), le forfait mobilités durables s'il est versé (facultatif, exonéré jusqu'à 600 € par salarié et par an) et le temps d'animation RH. Pour 200 collaborateurs, l'outil TeamWheels revient à 7 200 € HT par an, avant les économies de parking et d'indemnités kilométriques."
  - question: "Quel outil de covoiturage choisir pour son entreprise ?"
    answer: "Le critère décisif est l'adoption : un outil de covoiturage entreprise que les salariés doivent télécharger et ouvrir séparément dépasse rarement 18 % de participation. Privilégiez une solution intégrée aux outils déjà utilisés au quotidien (Microsoft Teams), avec un appariement automatique par trajet, horaires et site, des justificatifs FMD générés automatiquement et un reporting CO₂ exploitable pour la CSRD."
  - question: "Combien de temps faut-il pour lancer un programme de covoiturage en entreprise ?"
    answer: "Environ 30 jours de la décision aux premiers trajets partagés : une semaine de diagnostic, une semaine de préparation, une semaine de pilote et une semaine de généralisation. La configuration technique elle-même prend quelques minutes lorsque l'outil s'installe dans Microsoft Teams depuis AppSource."
  - question: "Le covoiturage inter-sites est-il éligible au forfait mobilités durables ?"
    answer: "Non. Le FMD couvre uniquement les trajets domicile-travail. Les déplacements professionnels entre deux sites relèvent des frais professionnels, remboursés selon le barème kilométrique. TeamWheels gère les deux régimes dans une même interface."
howto:
  name: "Lancer un programme de covoiturage entreprise en 5 étapes"
  description: "Procédure en cinq étapes, sur 30 jours, pour que les équipes RH et RSE diagnostiquent, outillent, pilotent puis généralisent un programme de covoiturage domicile-travail."
  totalTime: "P30D"
  image: "images/how-it-works/carpooling_people.png"
  tool:
    - "Microsoft Teams"
    - "TeamWheels"
    - "Outil de sondage interne"
  step:
    - name: "Étape 1 — Diagnostiquer le potentiel"
      text: "Fixer les objectifs (parking, RSE, coût, rétention), sonder les salariés sur leurs trajets et identifier les corridors domicile-travail à fort potentiel."
      url: "#etape-1"
    - name: "Étape 2 — Choisir l'outil de covoiturage"
      text: "Retenir un outil de covoiturage entreprise intégré aux outils existants, avec appariement automatique, justificatifs FMD et reporting CO₂."
      url: "#etape-2"
    - name: "Étape 3 — Préparer le cadre"
      text: "Configurer les sites et règles d'appariement, formaliser le FMD et une charte de covoiturage, préparer la communication de lancement."
      url: "#etape-3"
    - name: "Étape 4 — Piloter avec des ambassadeurs"
      text: "Lancer un pilote de deux à quatre semaines avec 20 à 50 volontaires, mesurer les mises en relation et ajuster les règles."
      url: "#etape-4"
    - name: "Étape 5 — Généraliser et mesurer"
      text: "Annoncer le programme à l'ensemble des salariés, suivre les indicateurs mensuels (participation, trajets, CO₂, parking) et animer la communauté."
      url: "#etape-5"
---

**Guide stratégique · Mobilité d'entreprise 2026 · 15 min de lecture**

*FMD, loi LOM, assurance et accident de trajet, coûts, choix de l'outil, lancement en 5 étapes — tout ce que les DRH, DAF et responsables RSE doivent savoir pour faire du covoiturage domicile-travail un levier de performance.*

> **Réponse directe : mettre en place le covoiturage en entreprise en 5 étapes (30 jours)**
>
> 1. **Diagnostiquer** : sondez les salariés sur leurs trajets et repérez les axes domicile-travail partagés (semaine 1).
> 2. **Choisir l'outil** : un outil d'appariement des trajets, avec justificatifs FMD et reporting CO₂ (semaine 1).
> 3. **Cadrer** : décision ou accord FMD (jusqu'à 600 € exonérés par salarié et par an), charte de covoiturage, communication (semaine 2).
> 4. **Piloter** : 2 à 4 semaines avec 20 à 50 volontaires, puis ajustez les règles d'appariement (semaines 3 et 4).
> 5. **Généraliser et mesurer** : ouverture à tous, suivi mensuel de la participation, des trajets, du CO₂ et des places de parking libérées.
>
> Le détail de chaque étape est [plus bas](#etapes).

### Quels outils pour organiser le covoiturage de vos salariés ? {#outils-2026}

| Outil | Type | Covoiturage entre | Application à installer | Justificatifs FMD | Tarif public |
|---|---|---|---|---|---|
| Attestations + tableur | Organisation interne | Collègues | Non | Attestations sur l'honneur, à collecter à la main | Gratuit (temps RH) |
| Karos (reprise de BlaBlaCar Daily) | Application grand public, réseau ouvert | Tous les utilisateurs de l'application | Oui | Preuves de trajets via l'opérateur | Non communiqué |
| Comovee | Plateforme dédiée entreprise | Collègues de l'organisation | Oui (web, mobile) | Selon offre | Sur devis |
| Un 7ème SenS | Progiciel de covoiturage d'entreprise | Collègues de l'organisation | Oui (web, mobile) | Inscrit au registre de preuve de covoiturage | Non communiqué |
| **TeamWheels** | **Application Microsoft Teams** | **Collègues de l'organisation** | **Non, dans Teams (SSO Entra ID)** | **Relevés mensuels par salarié, exportables pour la paie** | **3 € HT par collaborateur et par mois (promo)** |

*Informations publiques des éditeurs au 3 novembre 2026. Vérifiez les conditions en vigueur auprès de chaque fournisseur. Comparatif détaillé : [alternative à BlaBlaCar Daily et Karos](/fr/alternative-blablacar-daily-karos-entreprises/) et [alternative à Oxycar](/fr/alternative-oxycar/).*

Chaque matin, des millions de salariés rejoignent leur lieu de travail seuls dans leur voiture. Des places vides, des parkings saturés, des émissions inutiles — et souvent, un collègue qui habite à deux kilomètres et fait exactement le même trajet. Le covoiturage en entreprise existe pour résoudre ce paradoxe. Passer de l'idée à un programme qui fonctionne vraiment, c'est une autre histoire : ce guide vous explique comment faire, concrètement, sans que cela devienne un projet chronophage pour vos équipes RH.

---

## Sommaire

1. [Covoiturage, ridesharing : de quoi parle-t-on ?](#definitions)
2. [Pourquoi 2026 est l'année charnière](#pourquoi)
3. [BlaBlaCar, Klaxit, Uber vs TeamWheels](#comparatif)
4. [Covoiturage entre collègues et covoiturage professionnel](#usages)
5. [Organiser le covoiturage au quotidien](#organisation)
6. [Assurance, responsabilité et accident de trajet](#assurance)
7. [Quel outil de covoiturage choisir pour son entreprise ?](#outil)
8. [Combien coûte le covoiturage en entreprise ?](#couts)
9. [Lancer un programme de covoiturage en 5 étapes](#etapes)
10. [Questions fréquentes](#faq)

---

## 1. Covoiturage, ridesharing : de quoi parle-t-on exactement ? {#definitions}

> **Définition** — Le covoiturage domicile-travail (ou covoiturage pendulaire) consiste à partager un véhicule particulier entre deux personnes ou plus qui effectuent le même trajet entre leur domicile et leur lieu de travail. Contrairement au VTC (Uber, Bolt, Heetch), il n'y a pas de chauffeur professionnel rémunéré : les passagers partagent les frais réels du trajet. Il se distingue du covoiturage longue distance (BlaBlaCar) par sa **régularité** — les mêmes personnes, les mêmes trajets, chaque semaine — et par le **cadre employeur** : l'entreprise joue un rôle facilitateur, souvent financier.

On parle aussi de **covoiturage entre collègues** quand les covoitureurs travaillent pour le même employeur, et de **covoiturage professionnel** quand le trajet partagé est un déplacement de travail (une réunion sur un autre site, une visite client). Les deux relèvent de régimes différents, détaillés [plus bas](#usages).

En France, on distingue deux grandes familles de mobilité partagée :

- **Le VTC / ride-hailing** (Uber, Bolt, Heetch) — un chauffeur professionnel, payé à la course. Pratique, mais coûteux et non éligible au FMD.
- **Le covoiturage entre pairs** (BlaBlaCar, Klaxit, Karos, TeamWheels) — un salarié conducteur transporte ses collègues en échange du partage des frais. Éligible au FMD, traçable, vertueux sur le plan RSE.

Pour une entreprise, la différence est considérable : un salarié qui prend un VTC quotidiennement coûte entre **3 000 et 6 000 €/an** en notes de frais. Le même trajet en covoiturage organisé revient à **moins de 500 €/an**, partiellement exonéré grâce au FMD.

> **Le forfait mobilités durables (FMD) en clair** — [guide employeur FMD & covoiturage →](/fr/forfait-mobilites-durables-covoiturage/)
>
> Instauré par la **loi LOM** (loi d'orientation des mobilités, 2019), le forfait mobilités durables permet à tout employeur privé ou public de prendre en charge les frais de covoiturage domicile-travail de ses salariés, conducteurs comme passagers. Le montant versé est exonéré de cotisations sociales et d'impôt sur le revenu dans la limite de **600 € par an et par salarié** — **900 €** en cumul avec la prise en charge de l'abonnement aux transports en commun. Ces plafonds sont fixés par la loi de finances et révisés chaque année.
>
> Pour justifier chaque versement, l'employeur recueille au moins une fois par an une [attestation de covoiturage](/fr/attestation-covoiturage-forfait-mobilites-durables/) ou un relevé de trajets pour chaque salarié bénéficiaire.

---

## 2. Pourquoi 2026 est l'année charnière pour la mobilité d'entreprise {#pourquoi}

Trois forces convergentes rendent le covoiturage d'entreprise inévitable en 2026 :

### La pression réglementaire s'accélère

La directive **CSRD** (Corporate Sustainability Reporting Directive), applicable aux grandes entreprises françaises depuis le 1er janvier 2024 et aux ETI à partir de 2025, impose de quantifier et déclarer les émissions de **scope 3** — voir aussi notre article sur la [flambée des carburants 2026](/fr/blog/flambee-carburants-covoiturage-entreprise-2026/) — dont les déplacements domicile-travail des salariés. Le covoiturage est l'un des seuls leviers immédiatement activables pour réduire ces émissions de manière mesurable et auditée. Pour un site de 200 salariés dont 70 % viennent en voiture individuelle, atteindre 20 % de covoitureurs réduit d'environ 15 % les émissions liées aux trajets domicile-travail.

### Le coût de la vie pèse sur la fidélisation

Un salarié qui vient seul en voiture paie seul le carburant, les péages, l'usure et une partie de l'assurance de chaque trajet. En partageant ces frais avec un ou deux collègues 4 jours sur 5 sur un trajet de 30 km, il économise de l'ordre de **1 400 à 1 800 € par an** (estimation TeamWheels, à refaire avec vos distances dans le [simulateur](/fr/blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/)) — un avantage plus visible qu'une prime ponctuelle, et un argument de rétention concret dans un marché du travail tendu.

### Le retour au bureau repose la question de la mobilité

Le trajet domicile-travail est l'une des premières sources de stress des salariés français. Les entreprises qui aident activement leurs collaborateurs à en réduire le coût et la pénibilité retiennent mesurablement mieux leurs talents ; les covoitureurs réguliers déclarent d'ailleurs un niveau de satisfaction plus élevé vis-à-vis de leur employeur, notamment sur les critères de sens et d'appartenance.

### Chiffres clés

| Indicateur | Valeur | Source |
|---|---|---|
| Actifs qui vont travailler en voiture (parmi ceux qui se déplacent) | 74 % | [Insee Première n° 1835, janvier 2021](https://www.insee.fr/fr/statistiques/5013868) (données 2017) |
| Actifs qui prennent la voiture pour un trajet de 5 km ou moins | 60 % | [Insee Première n° 1835](https://www.insee.fr/fr/statistiques/5013868) |
| Plafond FMD exonéré de charges (FMD seul / cumul abonnement transport) | 600 € / 900 € par salarié et par an | Code de la sécurité sociale, voir notre [guide FMD](/fr/forfait-mobilites-durables-covoiturage/) |
| Objectif national de trajets covoiturés par jour d'ici 2027 | 3 millions (contre environ 900 000 au lancement) | Plan national covoiturage du quotidien, décembre 2022 |
| Assurance spécifique nécessaire pour covoiturer | Aucune, tant que le trajet reste un partage de frais | [DGCCRF](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/covoiturage-la-reglementation-applicable) |

---

## 3. BlaBlaCar, Klaxit, Uber — et TeamWheels : qui fait quoi ? {#comparatif}

| Plateforme | Type | Domicile-travail quotidien | Inter-sites pro | Intégration Teams | FMD natif | Dashboard RH |
|---|---|---|---|---|---|---|
| Uber / Bolt / Heetch | VTC (chauffeur pro) | ❌ Trop cher | ⚡ Possible | ❌ | ❌ | ❌ |
| BlaBlaCar | Covoiturage longue distance | ❌ Non adapté | ❌ | ❌ | ❌ | ❌ |
| Klaxit / Karos | Covoiturage courte distance | ✅ Oui | ❌ | ❌ | ⚡ Partiel | ⚡ Limité |
| **TeamWheels** | **Covoiturage corporate + flotte** | **✅ Natif** | **✅ Complet** | **✅ Natif Teams** | **✅ 100 % conforme** | **✅ Temps réel** |

La différence fondamentale tient à deux points : l'intégration native dans **Microsoft Teams** et la couverture complète du cycle de mobilité — du trajet domicile-bureau aux déplacements inter-sites avec la flotte d'entreprise.

> **Actualité :** Karos a repris BlaBlaCar Daily au 1er octobre 2026 (rebaptisée Daily), qui avait absorbé Klaxit en 2023. Oxycar, autre plateforme de covoiturage d'entreprise, a été liquidée en 2023 : voir [l'alternative à Oxycar](/fr/alternative-oxycar/). Contrat, données salariés, justificatifs FMD : voir [ce que le rachat de BlaBlaCar Daily par Karos change pour votre covoiturage d'entreprise](/fr/blog/rachat-blablacar-daily-karos-covoiturage-entreprise/), et [l'alternative à BlaBlaCar Daily et Karos pour les entreprises](/fr/alternative-blablacar-daily-karos-entreprises/).

> **Le covoiturage d'entreprise n'est plus un avantage optionnel : c'est une obligation de reporting et un levier de compétitivité RH.**

---

## 4. Covoiturage entre collègues et covoiturage professionnel : les deux cas d'usage {#usages}

### Cas n°1 — Le covoiturage entre collègues pour le trajet domicile-travail

En France, **74 % des actifs** qui se déplacent pour travailler prennent leur voiture, et c'est encore le cas de 60 % d'entre eux pour un trajet de 5 km ou moins ([Insee, 2021](https://www.insee.fr/fr/statistiques/5013868)). Pour une entreprise de 80 salariés dont 60 viennent en voiture individuelle, un programme de covoiturage bien organisé peut représenter :

- 30 à 35 voitures en moins sur le parking
- Entre 120 000 et 180 000 km de trajets partagés par an
- Jusqu'à **25 tonnes de CO₂ évitées** (valorisables dans votre DPEF/CSRD)
- Jusqu'à **48 000 € d'économie brute** sur les remboursements kilométriques

À plus grande échelle, prenons une entreprise de 300 salariés en région parisienne :

| Indicateur | Avant covoiturage | Avec 25 % de covoitureurs |
|---|---|---|
| Voitures sur le parking | 210 | 158 |
| CO₂ émis (trajets/an) | 126 tonnes | 95 tonnes |
| FMD versé (exonéré de charges) | 0 € | ~42 000 € de charges évitées |
| Satisfaction trajet (sondage) | 34 % | 61 % |

Ces chiffres sont illustratifs, mais cohérents avec les retours observés sur des déploiements similaires : les gains sont réels, mesurables et actionnables dès les premiers mois.

> **Entreprises multi-sites : l'éligibilité au FMD**
>
> Pour les salariés dont le lieu de travail principal est un site différent de leur domicile déclaré, le FMD s'applique sur le trajet habituel domicile-site. Les trajets entre deux sites de l'entreprise relèvent des frais professionnels et sont remboursables selon le barème kilométrique de l'administration fiscale. TeamWheels gère les deux régimes de façon transparente.

### Cas n°2 — Le covoiturage professionnel : déplacements inter-sites et flotte d'entreprise

Beaucoup d'entreprises françaises gèrent des déplacements réguliers entre leurs établissements — du siège vers les agences régionales, du dépôt vers les chantiers. Ces trajets mobilisent soit des véhicules de la flotte (pool de voitures partagées), soit des véhicules personnels remboursés aux frais kilométriques, soit des VTC ou taxis, l'option la plus coûteuse.

TeamWheels intègre un module de gestion de flotte directement dans Microsoft Teams : un salarié qui doit se rendre de Lyon à Grenoble peut réserver un véhicule de pool, voir si un collègue fait le même trajet pour covoiturer, et générer automatiquement le bon de déplacement — le tout sans quitter Teams.

> **Point réglementaire**
>
> Les déplacements professionnels inter-sites effectués en covoiturage avec un véhicule personnel ne sont pas éligibles au FMD mais ouvrent droit au remboursement des frais kilométriques selon le [barème fiscal en vigueur](/fr/blog/bareme-kilometrique-2026-indemnite-domicile-travail/). La traçabilité automatique via TeamWheels simplifie la gestion comptable de ces remboursements.

---

## 5. Organiser le covoiturage au quotidien : appariement, trajets, objections {#organisation}

Un programme de covoiturage ne se résume pas à un outil : c'est une organisation qui doit tenir dans la durée. Trois sujets opérationnels font la différence entre un programme qui s'essouffle après un mois et un programme qui s'installe.

### L'appariement : trouver les bons corridors

Tout commence par la carte. L'objectif est d'identifier les **corridors** à fort potentiel : des groupes de salariés qui habitent dans le même secteur et travaillent sur le même site, avec des horaires compatibles. Un sondage interne rapide suffit pour poser un premier diagnostic : répartition géographique, part des salariés venant seuls en voiture, nombre de sites, profil des horaires (fixes, décalés, hybrides).

Ensuite, c'est l'outil qui fait le travail — à condition que son appariement soit assez fin. Un système qui propose des correspondances uniquement à partir du lieu de travail, sans tenir compte du quartier d'habitation ni des horaires habituels, génère des suggestions inutilisables et décourage dès la première semaine. La granularité géographique et horaire de l'appariement est le premier critère à vérifier.

### La gestion des trajets : absorber les horaires atypiques

Le covoiturage fonctionne mieux sur des horaires stables, mais peu d'organisations en ont encore. Télétravail deux jours par semaine, réunions tardives, équipes en horaires décalés : votre dispositif doit gérer cette flexibilité sans friction. Concrètement, un salarié doit pouvoir signaler une absence, modifier ses disponibilités, rejoindre ou quitter un groupe de covoiturage en quelques secondes — et être prévenu automatiquement lorsqu'un trajet est confirmé ou annulé. C'est précisément ce qu'apporte un bot conversationnel dans l'outil que les équipes ont déjà ouvert toute la journée.

### Les objections des salariés : les entendre, puis les lever

Certains salariés perçoivent le covoiturage comme une contrainte : dépendance aux horaires d'autrui, perte d'autonomie, gêne à partager sa voiture avec un collègue qu'on connaît peu. Nous analysons ces freins en détail dans [pourquoi vos employés sont sceptiques face au covoiturage](/fr/blog/pourquoi-vos-employes-sont-sceptiques-sur-le-covoiturage/). Trois principes permettent de les lever :

- **Présenter le covoiturage comme une option, jamais comme une obligation**, et insister sur la flexibilité du dispositif (on covoiture deux jours par semaine, pas forcément cinq).
- **Rendre le bénéfice individuel visible** : un salarié qui voit qu'il économise 120 € par mois et qu'il touche un FMD exonéré change d'avis plus vite qu'avec un discours RSE.
- **S'appuyer sur des ambassadeurs internes** : trois à cinq covoitureurs convaincus, dans des services différents, qui témoignent et entraînent leurs collègues.

Enfin, communiquez régulièrement sur les résultats collectifs — trajets partagés, CO₂ évité, économies générées. La visualisation de l'impact crée une dynamique d'engagement durable.

---

## 6. Assurance, responsabilité et accident de trajet {#assurance}

> **En bref** — Le covoiturage domicile-travail ne demande pas d'assurance spéciale tant qu'il reste un partage de frais : le passager est couvert par l'assurance responsabilité civile obligatoire du véhicule. Un accident pendant un covoiturage régulier reste un accident de trajet, même si le conducteur fait un détour pour prendre un collègue.

### Le passager est couvert par l'assurance du conducteur

Le Code des transports (article L3132-1) définit le covoiturage comme l'utilisation en commun d'un véhicule par un conducteur et un ou plusieurs passagers, **à titre non onéreux, excepté le partage des frais**. Tant que la participation demandée aux passagers ne dépasse pas les frais réels (carburant, péages, usure), le trajet reste non professionnel et le passager est garanti par l'assurance responsabilité civile obligatoire du véhicule, comme le rappelle la [DGCCRF](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/covoiturage-la-reglementation-applicable).

Deux limites à écrire noir sur blanc dans votre charte de covoiturage :

- **Le conducteur n'est pas couvert par sa propre responsabilité civile** pour ses dommages corporels : il vérifie sa garantie conducteur auprès de son assureur.
- **Un conducteur qui fait du bénéfice sort du cadre du covoiturage** : il s'agit alors de transport rémunéré, et son assurance risque de ne plus jouer.

Pour une voiture de fonction ou de service, le covoiturage est possible avec l'accord de l'employeur : vérifiez que le contrat de la flotte couvre le transport de collègues.

### Un accident pendant un covoiturage régulier reste un accident de trajet

L'article L411-2 du Code de la sécurité sociale protège le trajet entre la résidence et le lieu de travail. Ce parcours **peut ne pas être le plus direct lorsque le détour est rendu nécessaire par un covoiturage régulier** : l'INRS le rappelle dans son [focus juridique sur les accidents de trajet](https://www.inrs.fr/publications/juridique/focus-juridiques/focus-juridique-accidents-trajet.html). Conducteur et passagers n'ont pas besoin de travailler pour le même employeur.

Le mot important est *régulier*. Un relevé de trajets daté par salarié, comme celui que produit un outil de covoiturage, le démontre bien plus facilement qu'un arrangement oral entre collègues. L'INRS consacre aussi une fiche au sujet dans *Travail & Sécurité* : [« Covoiturage et travail »](https://www.inrs.fr/dam/inrs/CataloguePapier/TS/TI-TS857page44.pdf).

### Ce que l'employeur fait, et ce qu'il ne fait pas

| L'employeur… | |
|---|---|
| **ne peut pas** imposer le covoiturage | Le salarié choisit son mode de transport : le covoiturage reste volontaire. |
| **n'a pas à** assurer les véhicules personnels | Les trajets domicile-travail se font sous l'assurance de chaque conducteur. |
| **déclare** l'accident de trajet | Comme pour tout accident de trajet, auprès de la CPAM, dès qu'il en est informé. |
| **fixe** le cadre | Charte (partage des frais, ponctualité, imprévus, sécurité), FMD, places réservées. |
| **conserve** les justificatifs | Relevés ou attestations de covoiturage, utiles pour le FMD comme pour démontrer la régularité d'un trajet. |

---

## 7. Quel outil de covoiturage choisir pour son entreprise ? {#outil}

C'est la décision la plus critique du projet, et deux erreurs reviennent sans cesse.

**Erreur n°1 — Compter sur la bonne volonté individuelle.** Les salariés ne vont pas s'organiser spontanément sur WhatsApp ou par mail. Sans structure, sans appariement, sans suivi, le covoiturage reste une intention.

**Erreur n°2 — Déployer une application tierce isolée.** Si les salariés doivent télécharger une nouvelle app, créer un compte et penser à l'ouvrir chaque semaine, le taux d'abandon après les premières semaines est quasi systématique : moins de 18 % d'inscrits sur une plateforme autonome quand l'entreprise la propose.

Pour éviter ces écueils, un outil de covoiturage entreprise doit répondre à cinq critères :

1. **L'adoption** — il s'intègre aux outils déjà utilisés au quotidien (Microsoft 365, Teams), sans nouvelle app ni nouveau mot de passe. C'est le critère qui explique à lui seul l'écart entre 18 % et plus de 40 % de participation.
2. **L'appariement automatique** — par trajet, horaires habituels et site, avec une gestion simple des absences et des changements de disponibilité.
3. **La conformité FMD** — calcul des kilomètres partagés, génération automatique des justificatifs employeur, suivi des plafonds par salarié, le tout prêt pour un contrôle URSSAF.
4. **Le reporting** — km partagés, CO₂ évité, nombre de covoiturages : des données exploitables telles quelles dans votre DPEF, votre bilan GES (poste 7) et votre rapport CSRD.
5. **La sécurité et la souveraineté des données** — SSO via Entra ID, conformité RGPD, données qui restent dans votre environnement Microsoft 365.

Un dernier critère, souvent oublié : le coût total. Entre une application autonome facturée au siège, un développement sur mesure et un SaaS déployé dans votre tenant Microsoft 365 avec le premier mois offert, l'écart se chiffre en dizaines de milliers d'euros — et surtout en mois de déploiement. Si votre organisation travaille déjà sur Microsoft 365, la solution la plus rationnelle est un [logiciel de covoiturage entreprise](/fr/corporate-carpooling-software/) intégré à Microsoft Teams.

---

## 8. Combien coûte le covoiturage en entreprise ? {#couts}

Un programme de covoiturage coûte peu à l'employeur, et la plupart des postes sont facultatifs. Voici les trois lignes à budgéter.

| Poste | Ordre de grandeur | À savoir |
|---|---|---|
| **L'outil** | De 0 € (tableur et attestations) à quelques euros par salarié et par mois | TeamWheels : 3 € HT par collaborateur et par mois (tarif promotionnel, au lieu de 5 € HT), premier mois offert. La plupart des éditeurs ne publient pas de grille. |
| **Le forfait mobilités durables** | Montant libre, exonéré jusqu'à 600 € par salarié et par an (900 € en cumul avec l'abonnement transport) | Facultatif. Fixé par accord d'entreprise ou décision unilatérale. Voir le [guide FMD](/fr/forfait-mobilites-durables-covoiturage/). |
| **Le temps RH** | Deux à quatre jours pour le lancement, puis quelques heures par mois | Réduit si l'appariement, les relevés et le reporting sont automatisés. |

**Exemple : un site de 200 salariés.** L'outil TeamWheels revient à 3 € × 200 × 12 = **7 200 € HT par an**. Si 40 covoitureurs reçoivent un FMD de 300 € par an, l'enveloppe FMD est de 12 000 €, sans cotisations sociales. En face : les places de parking que vous n'avez plus à louer ou à construire, les indemnités kilométriques évitées sur les déplacements professionnels partagés et le CO₂ du poste 7 de votre bilan GES.

**Faites le calcul avec vos chiffres** : effectif, distance moyenne et part de covoitureurs dans le [simulateur d'économies, de CO₂ et de ROI du covoiturage](/fr/blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/).

---

## 9. Lancer un programme de covoiturage en 5 étapes {#etapes}

Un programme de covoiturage d'entreprise n'a pas besoin de mois de préparation : de la décision aux premiers trajets partagés, comptez 30 jours. Voici la feuille de route que nous recommandons.

Si votre entreprise compte au moins 50 salariés sur un même site, ce programme est aussi le volet covoiturage de votre plan de mobilité employeur : voir notre [modèle de plan de mobilité employeur à télécharger](/fr/blog/plan-de-mobilite-employeur-modele-covoiturage/).

### Étape 1 — Diagnostiquer le potentiel (jours 1 à 7) {#etape-1}

Commencez par fixer vos objectifs : réduire la pression sur le parking, atteindre vos cibles RSE, faire économiser vos salariés, améliorer la rétention ? Choisissez les deux ou trois indicateurs que vous suivrez (taux de participation, trajets partagés par semaine, CO₂ évité, places libérées). Puis sondez les salariés : modes de transport actuels, distance, intérêt pour le covoiturage, freins perçus, canaux de communication préférés. Une petite incentive (bon café, don à une association) augmente sensiblement le taux de réponse. Inventoriez enfin les véhicules de flotte et les trajets inter-sites récurrents, et fixez le montant de FMD que l'entreprise est prête à verser.

### Étape 2 — Choisir l'outil de covoiturage (jours 5 à 7) {#etape-2}

Sélectionnez votre outil selon les cinq critères de la [section 7](#outil) : intégration aux outils existants, appariement automatique, justificatifs FMD, reporting, sécurité. Si vous êtes sur Microsoft 365, l'installation depuis AppSource prend quelques minutes à un administrateur Teams — pas de projet IT, pas d'infrastructure à prévoir.

### Étape 3 — Préparer le cadre (jours 8 à 14) {#etape-3}

- **Configuration** : sites, groupes par localisation ou service, règles d'appariement, politiques de flotte et règles de remboursement FMD. Testez l'expérience utilisateur de bout en bout.
- **Formalisation** : mettez en place le FMD par accord d'entreprise ou décision unilatérale (après consultation du CSE), et rédigez une charte courte couvrant responsabilités du conducteur et du passager, partage des frais, sécurité et procédure en cas d'imprévu.
- **Communication** : préparez le message de lancement de la direction ou des RH — il doit expliquer le *pourquoi* (RSE, FMD, qualité de vie) et pas seulement le *comment* —, une FAQ, un contenu intranet et un webinaire de 20 minutes, enregistré pour les absents.

### Étape 4 — Piloter avec des ambassadeurs (jours 15 à 21) {#etape-4}

Recrutez 20 à 50 volontaires enthousiastes dans plusieurs services, avec un canal Teams dédié et un support réactif. Suivez chaque jour les mises en relation et recueillez les retours : qu'est-ce qui fonctionne, qu'est-ce qui bloque, qu'est-ce qui inciterait davantage de collègues à participer ? Ajustez les règles d'appariement et les messages en conséquence.

### Étape 5 — Généraliser et mesurer (jours 22 à 30) {#etape-5}

Annoncez le programme à l'ensemble des salariés — mail de la direction, session d'information, témoignages des pilotes — avec un argument central simple : *« Économisez jusqu'à 1 500 € par an sur vos trajets, en deux minutes dans Teams. »* Les premiers appariements se font automatiquement ; la plupart des entreprises atteignent **30 % d'adoption dès la fin du premier mois**. Installez ensuite un cycle mensuel : suivi des indicateurs, reconnaissance des covoitureurs actifs, ajustements.

| Métrique | Objectif (mois 1) | Objectif (mois 3) |
|---|---|---|
| Taux de participation | 15 % des salariés | 30 % des salariés |
| Covoitureurs actifs | 5 % des salariés | 15 % des salariés |
| Trajets partagés / semaine | 50 | 200 |
| CO₂ évité (kg) | 100 | 500 |
| Satisfaction salariés | 4/5 | 4,5/5 |

**Cinq erreurs courantes à éviter** : lancer sans sponsor de la direction ; sur-complexifier le dispositif au lieu de commencer simple et d'itérer ; ignorer les retours du pilote ; négliger le plan de communication ; tout faire à la main alors que l'appariement, les justificatifs et le reporting peuvent être automatisés.

---

## Pourquoi choisir TeamWheels plutôt qu'une solution autonome {#teamwheels}

L'obstacle numéro un à l'adoption d'un programme de covoiturage est la **friction d'usage**. Avec TeamWheels, qui vit dans Microsoft Teams, le taux d'inscription dépasse systématiquement **60 % dès la première semaine**.

À voir en 20 secondes : la [vidéo de lancement de TeamWheels](/fr/launch-video/) montre un salarié demander un trajet dans Microsoft Teams et rejoindre un collègue en un clic.

{{< launch-video placement="blog_launch" >}}

- ✅ **Zéro friction d'adoption** — aucune nouvelle app, aucun nouveau mot de passe. L'outil s'installe en quelques minutes par l'administrateur Teams.
- ✅ **Matching automatique** — l'algorithme apparie conducteurs et passagers selon le domicile, le site et les horaires habituels.
- ✅ **Gestion FMD automatisée** — calcul des km partagés, génération du justificatif employeur, suivi des plafonds par salarié. Tout est audit-ready pour l'URSSAF.
- ✅ **Tableau de bord RSE en temps réel** — km partagés, CO₂ évité, nombre de covoiturages — données prêtes pour votre DPEF ou rapport CSRD.
- ✅ **Gestion de flotte intégrée** — réservation de véhicules de pool, dispatch des déplacements inter-sites, calcul automatique des indemnités kilométriques.
- ✅ **Souveraineté des données** — aucune donnée salariale ne quitte votre environnement Microsoft 365. Conformité RGPD native.

---

## Questions fréquentes {#faq}

### Comment mettre en place le covoiturage en entreprise ?

En cinq étapes sur environ 30 jours : diagnostiquer les trajets des salariés, choisir un outil d'appariement, cadrer le dispositif (forfait mobilités durables, charte de covoiturage, communication), lancer un pilote de deux à quatre semaines avec 20 à 50 volontaires, puis généraliser et suivre chaque mois la participation, les trajets partagés et le CO₂ évité. Le détail est [plus haut](#etapes).

### Faut-il une assurance spéciale pour le covoiturage entre collègues ?

Non, tant que le covoiturage reste un partage de frais. Le Code des transports (article L3132-1) le définit comme un trajet effectué à titre non onéreux, excepté le partage des frais, et la DGCCRF précise que le passager est garanti par l'assurance responsabilité civile obligatoire du véhicule. Le conducteur doit en revanche vérifier sa propre garantie conducteur, que la responsabilité civile ne couvre pas.

### Un accident pendant un covoiturage domicile-travail est-il un accident de trajet ?

Oui. L'article L411-2 du Code de la sécurité sociale protège le trajet entre la résidence et le lieu de travail, et ce parcours peut ne pas être le plus direct lorsque le détour est rendu nécessaire par un covoiturage régulier, comme le rappelle l'INRS. Conducteur et passagers n'ont pas besoin de travailler dans la même entreprise. L'employeur déclare l'accident à la CPAM comme tout accident de trajet.

### L'employeur peut-il obliger ses salariés à covoiturer ?

Non. Le salarié choisit son mode de transport pour venir travailler : le covoiturage reste une démarche volontaire. L'employeur peut en revanche l'encourager, l'organiser avec un outil d'appariement, réserver des places de parking aux covoitureurs et le financer par le forfait mobilités durables.

### Combien coûte le covoiturage en entreprise pour l'employeur ?

Trois postes : l'outil (de 0 € pour un tableur à quelques euros par salarié et par mois ; TeamWheels coûte 3 € HT par collaborateur et par mois en tarif promotionnel), le forfait mobilités durables s'il est versé (facultatif, exonéré jusqu'à 600 € par salarié et par an) et le temps d'animation RH. Pour 200 collaborateurs, l'outil TeamWheels revient à 7 200 € HT par an, avant les économies de parking et d'indemnités kilométriques.

### Qu'est-ce que le covoiturage domicile-travail en entreprise ?

Le covoiturage domicile-travail consiste pour des salariés d'une même entreprise — ou de sites proches — à partager un véhicule particulier pour le trajet entre leur domicile et leur lieu de travail. Il n'y a pas de chauffeur professionnel : conducteur et passagers partagent les frais. En France, il est encadré par la loi d'orientation des mobilités (LOM) et peut être financé par l'employeur via le forfait mobilités durables, exonéré de cotisations dans la limite de 600 € par an et par salarié (900 € en cumul avec l'abonnement transport).

### Quel outil de covoiturage choisir pour son entreprise ?

Le critère décisif est l'adoption : un outil de covoiturage entreprise que les salariés doivent télécharger et ouvrir séparément dépasse rarement 18 % de participation. Privilégiez une solution intégrée aux outils déjà utilisés au quotidien (Microsoft Teams), avec un appariement automatique par trajet, horaires et site, des justificatifs FMD générés automatiquement et un reporting CO₂ exploitable pour la CSRD.

### Combien de temps faut-il pour lancer un programme de covoiturage en entreprise ?

Environ 30 jours de la décision aux premiers trajets partagés : une semaine de diagnostic, une semaine de préparation, une semaine de pilote et une semaine de généralisation. La configuration technique elle-même prend quelques minutes lorsque l'outil s'installe dans Microsoft Teams depuis AppSource.

### Le covoiturage inter-sites est-il éligible au forfait mobilités durables ?

Non. Le FMD couvre uniquement les trajets domicile-travail. Les déplacements professionnels entre deux sites relèvent des frais professionnels, remboursés selon le barème kilométrique. TeamWheels gère les deux régimes dans une même interface.

---

## Prêt à réduire vos coûts de mobilité dès ce trimestre ?

Avec TeamWheels, **le premier mois est offert, jusqu'à 50 collaborateurs**, sans carte bancaire. Installation en quelques minutes dans votre environnement Microsoft 365. Ensuite, l'abonnement est souscrit avec un engagement trimestriel.

**[Demander une démo gratuite](/fr/contact/)** · **[Simuler mes économies FMD](/fr/blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/)**

---

*Article publié par l'équipe TeamWheels le 29 avril 2026, mis à jour le 4 novembre 2026 (assurance et accident de trajet, coûts, chiffres sourcés) et le 7 septembre 2026 (fusion des guides « Covoiturage domicile-travail : comment l'organiser » et « Outil de covoiturage entreprise : 5 étapes pour démarrer »).*
