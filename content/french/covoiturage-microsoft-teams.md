---
title: "Covoiturage dans Microsoft Teams : l'appli de covoiturage pour vos salariés"
seoTitle: "Covoiturage Microsoft Teams : l'appli Teams pour vos salariés"
description: "Une appli de covoiturage dans Microsoft Teams : vos salariés trouvent un collègue sur leur trajet en écrivant au bot, sans rien installer. Installation AppSource en 5 minutes."
slug: "covoiturage-microsoft-teams"
date: 2026-11-04
lastmod: 2026-11-04
draft: false
layout: "pillar"
keywords: ["covoiturage microsoft teams", "appli covoiturage teams", "application covoiturage teams", "covoiturage teams", "bot covoiturage teams", "covoiturage microsoft 365", "covoiturage copilot"]

# Angle Teams (plan SEO du 04/11/2026, point 4) : aucune page concurrente
# positionnée sur ces requêtes. Intention : « comment ça marche dans Teams »,
# côté salarié ET côté administrateur IT. Ne pas viser « logiciel covoiturage
# entreprise » ici (→ /fr/corporate-carpooling-software/) ni « covoiturage en
# entreprise » (→ guide). CTA src=covoiturage-teams (lead_source GA4).
faq_title: "Questions fréquentes sur le covoiturage dans Teams"
faq:
  - question: "Peut-on faire du covoiturage dans Microsoft Teams ?"
    answer: "Oui. TeamWheels est une application Microsoft Teams validée par Microsoft et publiée sur AppSource. Les salariés déclarent leur trajet, proposent ou cherchent une place en écrivant au bot TeamWheels dans Teams, et reçoivent les mises en relation et les rappels de départ sous forme de messages Teams. Aucune autre application n'est nécessaire."
  - question: "Les salariés doivent-ils installer une application ?"
    answer: "Non. Ils utilisent Teams, qu'ils ont déjà sur leur ordinateur, dans le navigateur et sur leur téléphone. Ils se connectent avec leur compte Microsoft 365 : pas de compte à créer, pas de mot de passe supplémentaire."
  - question: "Comment installer l'application de covoiturage dans Teams ?"
    answer: "Un administrateur Microsoft 365 ajoute TeamWheels depuis le Microsoft Teams Store (AppSource), accorde le consentement Entra ID, déclare les sites de l'entreprise et active le programme. Comptez environ cinq minutes. Il peut ensuite publier l'application pour tous les salariés ou pour un groupe pilote via les stratégies d'application Teams."
  - question: "Le covoiturage dans Teams fonctionne-t-il sur mobile ?"
    answer: "Oui, dans l'application mobile Microsoft Teams. Les salariés y reçoivent la notification au moment de partir et peuvent signaler une absence ou un retard en un message, depuis le parking comme depuis le bureau."
  - question: "Peut-on réserver un covoiturage avec Copilot ?"
    answer: "Oui. L'agent TeamWheels répond aussi dans Microsoft Copilot : un salarié peut demander un trajet en langage naturel et Copilot réserve la place auprès d'un collègue. Le fonctionnement et les données restent les mêmes que dans le bot Teams."
  - question: "Où sont stockées les données de covoiturage ?"
    answer: "L'authentification passe par Entra ID, l'application s'installe dans votre tenant Microsoft 365, les données sont hébergées en France et traitées conformément au RGPD. Seules les informations nécessaires à l'appariement sont utilisées  : site, horaires habituels et secteur de départ."
  - question: "Combien coûte l'appli de covoiturage Teams ?"
    answer: "Le premier mois est offert jusqu'à 50 collaborateurs, sans carte bancaire. Ensuite, 3 € HT par collaborateur et par mois (tarif promotionnel, au lieu de 5 € HT) avec un engagement trimestriel, justificatifs FMD et reporting CO₂ inclus."
---

**L'essentiel :** TeamWheels est une appli de covoiturage qui fonctionne **dans Microsoft Teams**. Vos salariés écrivent au bot pour proposer ou chercher une place, et reçoivent la mise en relation dans Teams. Rien à télécharger, aucun compte à créer : un administrateur l'installe depuis le [Microsoft Teams Store](https://marketplace.microsoft.com/fr-fr/product/WA200012036) en environ cinq minutes.

<p class="pillar-cta">
  <a class="btn btn-primary" href="https://marketplace.microsoft.com/fr-fr/product/WA200012036" rel="noopener" target="_blank">Ajouter TeamWheels à Teams</a>
  <a class="btn btn-outline-primary" href="/fr/contact/?src=covoiturage-teams">Demander une démo</a>
</p>

## Pourquoi faire le covoiturage dans Teams plutôt que dans une appli de plus {#pourquoi-teams}

Un programme de covoiturage échoue rarement à cause de l'algorithme. Il échoue parce que les salariés n'ouvrent pas l'application : il faut la télécharger, créer un compte, penser à la consulter. Teams, vos équipes l'ont déjà ouvert toute la journée.

| | Appli de covoiturage séparée | Covoiturage dans Microsoft Teams |
|---|---|---|
| **Pour commencer** | Télécharger une application, créer un compte | Écrire au bot TeamWheels dans Teams |
| **Connexion** | Identifiant et mot de passe de plus | Compte Microsoft 365 (SSO Entra ID) |
| **Notifications** | Dans une app souvent désactivée | Message Teams, sur ordinateur et mobile |
| **Annuaire** | À importer ou à saisir | L'annuaire Microsoft 365 de l'organisation |
| **Déploiement** | Campagne d'adoption, support | Publication de l'app par l'administrateur Teams |

C'est la raison pour laquelle nous avons construit TeamWheels comme une application Teams, et non comme une application mobile à côté.

## Comment ça marche pour un salarié {#salarie}

1. **Il déclare son trajet une fois.** Dans une conversation avec le bot : secteur de départ, site de travail, horaires habituels, conducteur ou passager.
2. **Il reçoit des propositions.** Le bot lui présente les collègues compatibles par itinéraire, horaires et site. Le conducteur valide, le passager est prévenu.
3. **Il est prévenu au moment de partir.** Une notification Teams rappelle le trajet du jour. Absence, télétravail, retard : un message au bot suffit, les collègues concernés sont avertis.
4. **Il peut passer par Copilot.** « Trouve-moi un covoiturage pour demain 8 h vers le site de Lyon » : l'agent TeamWheels répond aussi dans Microsoft Copilot.

Chaque trajet partagé est enregistré, ce qui sert de justificatif pour le [forfait mobilités durables](/fr/forfait-mobilites-durables-covoiturage/), conducteur comme passager.

## Comment ça marche pour l'administrateur IT {#administrateur}

| Étape | Ce que fait l'administrateur | Durée |
|---|---|---|
| 1. Installer | Ajouter TeamWheels depuis le Teams Store (AppSource) dans le centre d'administration Teams | 1 à 2 min |
| 2. Autoriser | Accorder le consentement administrateur Entra ID | 1 min |
| 3. Configurer | Déclarer les sites de l'entreprise et les règles d'appariement | 2 min |
| 4. Publier | Rendre l'application disponible pour tous ou pour un groupe pilote via les stratégies d'application Teams | 1 min |

Pas de serveur, pas d'infrastructure, pas de fichier d'utilisateurs à importer : l'annuaire Microsoft 365 est la liste des covoitureurs. L'application est validée par Microsoft et publiée sur AppSource. Les données sont hébergées en France et l'application respecte le RGPD : seules les informations nécessaires à l'appariement sont traitées (site, horaires, secteur de départ).

## Ce que voient les RH et l'équipe RSE {#rh}

- **Participation** : covoitureurs inscrits et actifs.
- **Trajets partagés et kilomètres évités**, exportables.
- **CO₂ évité** pour le scope 3, catégorie 7 (déplacements domicile-travail) du bilan GES et de la CSRD.
- **Relevés FMD** mensuels par salarié, prêts pour la paie.
- **Places de parking libérées**, pour objectiver la pression sur le stationnement.

Le détail des fonctions côté employeur, la gestion multi-sites et le comparatif avec les autres outils sont sur la page [logiciel de covoiturage entreprise](/fr/corporate-carpooling-software/).

## Prix {#prix}

La grille est publique :

- **Premier mois offert**, jusqu'à 50 collaborateurs, sans carte bancaire.
- **3 € HT par collaborateur et par mois** ensuite (tarif promotionnel, au lieu de 5 € HT), engagement trimestriel, tout inclus.
- **Offre Entreprise** sur devis pour les organisations multi-entités (API, intégrations RH, SLA).

Voir les [tarifs](/fr/pricing/) ou estimer vos économies avec le [simulateur](/fr/blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/).

## Quand ce n'est pas la bonne solution {#limites}

TeamWheels vit dans Teams. Si votre organisation n'utilise pas Microsoft 365, ou si une grande partie de vos salariés n'a pas de compte Teams (intérimaires, sous-traitants sans licence), une application de covoiturage grand public conviendra mieux. De même, en zone dense où vos salariés n'ont pas de collègue sur leur trajet, un réseau ouvert comme celui de Karos offre plus de volume : voir notre [comparatif avec Karos et BlaBlaCar Daily](/fr/alternative-blablacar-daily-karos-entreprises/).

Vous préparez le projet ? Le [guide du covoiturage en entreprise](/fr/blog/covoiturage-entreprise-guide-2026/) couvre le forfait mobilités durables, l'assurance, l'accident de trajet et les étapes de lancement.

<p class="pillar-cta">
  <a class="btn btn-primary" href="/fr/contact/?src=covoiturage-teams">Voir le covoiturage dans Teams en démo</a>
</p>

*Page à jour au 4 novembre 2026. Microsoft, Microsoft Teams, Microsoft 365, Copilot et Entra ID sont des marques du groupe Microsoft.*
