---
title: "Forfait Mobilité Durable (FMD) 2026 : le guide complet"
seoTitle: "Forfait mobilité durable 2026 : montants et simulateur"
description: "Forfait mobilité durable 2026 : montants et plafonds, modes éligibles, cumuls, attestation sur l'honneur, déclaration URSSAF et simulateur de budget employeur."
layout: "guide"
schemaType: "Article"
simulator: "fmd"
date: 2026-08-25
lastmod: 2026-08-25
draft: false
image: "images/blog/forfait-mobilite-durable.jpg"
keywords: "forfait mobilité durable, forfait mobilités durables 2026, forfait mobilité durable covoiturage, forfait mobilité durable vélo, forfait mobilité durable urssaf, attestation forfait mobilité durable, demande forfait mobilité durable, formulaire forfait mobilité durable"
sitemap:
  priority: 0.9
  changefreq: "monthly"

aliases:
  - /blog/forfait-mobilite-durable-guide-complet-2025/

# ─────────────────────────────────────────────────────────────────────────
# À COMPLÉTER — sections fonction publique
#
# Les montants des trois versants (État, territoriale, hospitalière), le seuil
# de jours d'utilisation et la date de versement sont fixés par décret. Ils
# n'ont pas pu être vérifiés contre une source officielle depuis
# l'environnement de rédaction (service-public.fr, URSSAF, Légifrance et
# fonction-publique.gouv.fr sont inaccessibles). Publier un montant
# réglementaire faux sur une page qui vise « forfait mobilité durable
# fonction publique » serait pire que de ne rien publier : les agents et les
# employeurs publics agissent sur ce chiffre.
#
# La structure éditoriale est en place (H2 « FMD dans la fonction publique »,
# H3 éducation nationale, H3 date de versement) et le maillage est fait. Il
# reste à renseigner :
#   - montant annuel FMD fonction publique d'État
#   - montant fonction publique territoriale
#   - montant fonction publique hospitalière
#   - cas particulier éducation nationale
#   - nombre minimal de jours d'utilisation dans l'année
#   - date limite de dépôt de la demande et date de versement
#   - référence du décret en vigueur + URL Légifrance
# Une fois ces valeurs confirmées, remplacer le bloc d'avertissement de la
# section correspondante et réactiver l'option « Fonction publique » du
# simulateur (assets/js/fmd-simulator.js, objet LEGAL).
# ─────────────────────────────────────────────────────────────────────────
todo_fonction_publique: true

key_points:
  enable: true
  title: "L'essentiel en 5 points"
  items:
    - "Le FMD est **facultatif** : c'est l'employeur qui décide de le mettre en place, d'en fixer le montant et les conditions."
    - "Dans le **privé**, il est exonéré de cotisations et d'impôt jusqu'à **600 € par salarié et par an**."
    - "Ce plafond passe à **900 €** en cumul avec la prise en charge d'un abonnement de transport en commun — un plafond **global**, apprécié après déduction de l'abonnement."
    - "Modes éligibles : **covoiturage** (conducteur ou passager), vélo, trottinette et EDP, autopartage bas carbone, et marche."
    - "L'exonération suppose de pouvoir **justifier** l'usage : attestation sur l'honneur du salarié, justificatifs conservés, montant distinct sur le bulletin de paie."

faq:
  - question: "Quel est le montant du forfait mobilité durable en 2026 ?"
    answer: "Il n'y a pas de montant imposé : l'employeur fixe librement la somme qu'il verse. Ce qui est plafonné, c'est l'exonération. Dans le secteur privé, le forfait est exonéré de cotisations sociales et d'impôt sur le revenu jusqu'à 600 € par salarié et par an, porté à 900 € en cas de cumul avec la prise en charge d'un abonnement de transport en commun. Au-delà, la fraction excédentaire redevient un élément de rémunération soumis à cotisations."
  - question: "Le forfait mobilité durable est-il obligatoire pour l'employeur ?"
    answer: "Non. Le FMD est un dispositif facultatif, à la main de l'employeur. Ce qui peut être obligatoire, c'est d'aborder le sujet de la mobilité domicile-travail : les entreprises d'au moins 50 salariés sur un même site doivent l'inscrire dans leurs négociations annuelles obligatoires, et à défaut d'accord, établir un plan de mobilité employeur."
  - question: "Le covoiturage est-il éligible au forfait mobilité durable ?"
    answer: "Oui, aussi bien pour le conducteur que pour le passager, sur les trajets domicile-travail. C'est l'un des modes explicitement visés par le dispositif. La difficulté n'est pas l'éligibilité mais la preuve : contrairement à un abonnement, un trajet partagé ne laisse pas de facture, d'où l'importance d'un outil qui trace automatiquement les trajets."
  - question: "Comment mettre en place le forfait mobilité durable dans mon entreprise ?"
    answer: "Par accord d'entreprise ou de branche, ou à défaut par décision unilatérale de l'employeur après consultation du CSE lorsqu'il existe. L'acte doit préciser les modes éligibles, le montant, les conditions d'attribution et les justificatifs demandés. Il faut ensuite organiser la collecte des attestations et faire apparaître le versement distinctement sur le bulletin de paie."
  - question: "Quels justificatifs faut-il conserver pour l'URSSAF ?"
    answer: "Au minimum une attestation sur l'honneur du salarié, renouvelée chaque année, indiquant le mode utilisé et la période concernée. Selon les modes, s'y ajoutent des justificatifs d'achat, de location ou d'abonnement. Pour le covoiturage, un relevé des trajets partagés constitue la pièce la plus solide. Ces éléments doivent être conservés et présentables en cas de contrôle."
  - question: "Le FMD est-il cumulable avec la prise en charge de l'abonnement de transport ?"
    answer: "Oui. Les deux dispositifs se cumulent, mais l'exonération s'apprécie alors globalement, dans la limite de 900 € par an et par salarié, après déduction de la prise en charge de l'abonnement. Concrètement, si vous remboursez déjà 300 € d'abonnement annuel, il vous reste 600 € de marge exonérée pour le forfait lui-même."
  - question: "Le FMD est-il cumulable avec la prime de transport carburant ?"
    answer: "Oui, mais dans un plafond global commun. Le cumul du forfait mobilité durable et de la prime de transport reste soumis à un plafond d'exonération unique, qu'il faut suivre salarié par salarié sur l'année civile."
  - question: "Un salarié à temps partiel ou arrivé en cours d'année y a-t-il droit ?"
    answer: "Oui. Le forfait est attribué selon les conditions que vous avez définies dans votre accord ou votre décision unilatérale. Beaucoup d'employeurs proratisent le montant en fonction du temps de présence sur l'année, ce qui est admis dès lors que la règle est écrite et appliquée uniformément."
  - question: "Le forfait mobilité durable est-il imposable pour le salarié ?"
    answer: "Non, dans la limite du plafond d'exonération. Le salarié perçoit la somme nette de cotisations salariales et n'a pas à la déclarer à l'impôt sur le revenu tant qu'elle reste sous le plafond. C'est ce qui rend le dispositif nettement plus efficace qu'une prime classique de même montant brut."
  - question: "Peut-on verser le FMD sous forme de titre-mobilité ?"
    answer: "Oui. Le titre-mobilité est un support de paiement dématérialisé, sur le modèle du titre-restaurant, prévu pour verser le forfait auprès de prestataires référencés. Il ne change ni le plafond ni les conditions d'exonération, seulement le mode de versement et la traçabilité."
  - question: "Que se passe-t-il si je dépasse le plafond d'exonération ?"
    answer: "Rien d'interdit : vous pouvez verser davantage. Mais la fraction qui dépasse le plafond redevient un élément de rémunération ordinaire, soumis à cotisations sociales et à l'impôt sur le revenu. Le suivi des plafonds par salarié et par année civile est donc un point de vigilance de paie, surtout en cas de cumul."
  - question: "Existe-t-il un modèle d'attestation sur l'honneur ?"
    answer: "Oui, vous pouvez partir d'un modèle et l'adapter à votre accord. Un modèle d'attestation sur l'honneur au format texte est téléchargeable dans la section « Mettre en place le FMD » de cette page. Faites-le viser chaque année et conservez-le avec les justificatifs du salarié."

sources:
  - label: "Guide TeamWheels du covoiturage en entreprise"
    url: "/fr/covoiturage-entreprise/"
  - label: "Aides à la mobilité durable en entreprise : règles, plafonds et cumuls"
    url: "/fr/blog/aides-mobilite-durable-entreprise-regles-plafonds-cumuls/"
  - label: "Plafonds d'exonération du forfait mobilités durables, secteur privé"
    checked: "25 août 2026"
---

Le Forfait Mobilité Durable est l'un des rares dispositifs où l'intérêt de l'employeur et celui du salarié se rejoignent sans arbitrage : la somme versée est exonérée de cotisations pour l'un et d'impôt pour l'autre. Pourtant, une majorité d'entreprises éligibles ne l'ont toujours pas mis en place — le plus souvent parce que la charge de justification paraît floue. Ce guide traite les deux moitiés du sujet : ce que dit la règle, et comment la tenir en pratique.

## Ce qui change en 2026

Le dispositif est désormais stabilisé. Les points à retenir pour l'année en cours :

- **Le plafond d'exonération du secteur privé reste fixé à 600 €** par salarié et par an lorsque le forfait est versé seul.
- **Le plafond de cumul avec l'abonnement de transport en commun est de 900 €**, apprécié globalement. C'est le point le plus souvent mal interprété : il ne s'agit pas de 900 € de FMD en plus de l'abonnement, mais d'une enveloppe commune.
- **Le titre-mobilité** s'est installé comme support de versement, sur le modèle du titre-restaurant, et simplifie la traçabilité pour les employeurs qui ne veulent pas gérer les justificatifs en interne.
- **La pression du reporting extra-financier** fait entrer le FMD dans un second usage : il alimente les indicateurs de mobilité durable de la CSRD, au-delà de son intérêt social.

## Modes éligibles

Le forfait couvre les trajets **domicile-travail** effectués avec l'un des modes suivants :

| Mode | Éligible | Point d'attention |
|---|---|---|
| **Covoiturage** (conducteur ou passager) | Oui | La preuve ne vient pas d'une facture : il faut un relevé de trajets |
| **Vélo et vélo à assistance électrique** | Oui | Vélo personnel, achat, location ou entretien selon votre accord |
| **Trottinette et engins de déplacement personnel** | Oui | Personnels ou en location, motorisés ou non |
| **Autopartage** | Oui | Véhicules à faibles émissions |
| **Marche** | Oui | Le mode le plus difficile à justifier en pratique |
| **Transports en commun** | Non au titre du FMD | Relèvent de la prise en charge obligatoire de l'abonnement, cumulable |
| **Voiture individuelle en solo** | Non | Relève le cas échéant de la prime de transport carburant |

Vous n'êtes pas obligé de retenir tous les modes. Beaucoup d'employeurs démarrent avec le covoiturage et le vélo, qui concentrent l'essentiel des usages réels, puis élargissent.

## FMD et covoiturage : conditions et justificatifs

Le covoiturage est le mode le plus intéressant pour un employeur — il ne suppose aucun équipement, il agit directement sur le Scope 3 et sur la pression parking — et c'est aussi celui dont la justification est la moins évidente.

**Les conditions.** Le trajet doit être un trajet domicile-travail, et le salarié peut être conducteur ou passager. Rien n'impose que le covoiturage soit organisé par l'employeur ni qu'il se fasse entre collègues.

**Le problème de la preuve.** Un abonnement de transport laisse une facture ; un vélo laisse un ticket de caisse. Un trajet partagé ne laisse rien. En pratique, l'URSSAF s'appuie sur l'attestation sur l'honneur du salarié, mais une attestation seule est fragile si elle n'est adossée à aucune donnée. C'est précisément ce qui bloque beaucoup d'employeurs : ils veulent bien verser, mais pas porter un risque de redressement.

**Ce qui rend le dossier solide.** Un relevé nominatif des trajets partagés, daté, avec l'origine, la destination et le rôle du salarié, transforme l'attestation en pièce justificative sérieuse. C'est le rôle d'un outil de covoiturage d'entreprise : [TeamWheels](/fr/corporate-carpooling-software/) enregistre chaque trajet partagé dans Microsoft Teams et génère automatiquement les justificatifs par salarié, avec le suivi des plafonds sur l'année civile.

Pour la mise en place du programme de covoiturage lui-même — diagnostic, choix de l'outil, adoption — voyez notre [guide du covoiturage en entreprise](/fr/covoiturage-entreprise/).

## Exonérations et déclaration : URSSAF, paie et DSN

Trois obligations pratiques conditionnent l'exonération :

1. **Faire apparaître le versement distinctement sur le bulletin de paie.** Le forfait ne doit pas être noyé dans une ligne de prime générique, sous peine de perdre le bénéfice du régime en cas de contrôle.
2. **Suivre le plafond par salarié et par année civile.** Le suivi doit intégrer les cumuls : abonnement de transport pris en charge, prime de transport éventuelle. C'est là que se produisent la plupart des dépassements involontaires.
3. **Conserver les justificatifs.** Attestation sur l'honneur annuelle, plus les pièces propres à chaque mode. La durée de conservation doit couvrir la période de reprise applicable en matière de cotisations.

En cas de contrôle, l'absence de justificatifs entraîne la réintégration des sommes dans l'assiette des cotisations — c'est-à-dire un redressement sur l'intégralité des versements, pas seulement sur la fraction litigieuse.

## Mettre en place le FMD : étapes et attestation

### 1. Choisir le support juridique

Accord d'entreprise ou de branche, ou décision unilatérale de l'employeur après consultation du CSE lorsqu'il existe. L'accord est plus lourd à obtenir mais plus solide ; la décision unilatérale permet de démarrer vite, quitte à basculer ensuite.

### 2. Écrire ce que vous couvrez

Le texte doit préciser les modes retenus, le montant, la périodicité de versement, les conditions d'attribution — notamment le sort des temps partiels et des arrivées en cours d'année — et la liste des justificatifs demandés.

### 3. Collecter l'attestation sur l'honneur

C'est la pièce centrale du dossier. Elle doit être renouvelée chaque année et mentionner le mode utilisé et la période concernée.

> **Modèle d'attestation sur l'honneur** — [télécharger le modèle FMD (texte, à adapter à votre accord)](/documents/attestation-forfait-mobilite-durable.txt). Faites-le viser par le salarié chaque année et conservez-le avec ses justificatifs.

### 4. Paramétrer la paie

Créer la ligne dédiée sur le bulletin, la rattacher au bon code de cotisation, et mettre en place le suivi de plafond annuel par salarié.

### 5. Automatiser la collecte des preuves

C'est l'étape qui décide si le dispositif tient dans la durée. Tant que la collecte repose sur des relances par mail et un tableur, elle s'érode. Adossée à l'outil qui enregistre déjà les trajets, elle devient un sous-produit gratuit du programme.

## FMD dans la fonction publique

Le forfait existe aussi dans les **trois versants de la fonction publique** — État, territoriale, hospitalière — avec des règles propres, distinctes de celles du secteur privé. Les différences portent sur le montant, sur le nombre minimal de jours d'utilisation dans l'année, sur la procédure de demande et sur la date de versement, qui intervient l'année suivant celle de l'usage.

> **Section en cours de vérification.** Les montants applicables aux trois versants et au cas particulier de l'éducation nationale, ainsi que le seuil de jours et les dates de dépôt et de versement, sont fixés par décret et révisés régulièrement. Nous ne publions pas ces chiffres tant qu'ils n'ont pas été confirmés contre le texte en vigueur : sur un sujet où agents et employeurs publics agissent directement sur le montant annoncé, une valeur périmée est plus nuisible qu'une absence de valeur. En attendant, rapprochez-vous de votre service RH ou de la DGAFP, qui applique le décret propre à votre versant.

### Éducation nationale

Les personnels de l'éducation nationale relèvent du dispositif de la fonction publique d'État, avec une procédure de demande gérée au niveau académique. Les modalités précises et le calendrier de dépôt sont couverts par la vérification en cours ci-dessus.

### Date de versement dans la fonction publique

Contrairement au secteur privé, où l'employeur choisit la périodicité, le versement dans la fonction publique intervient l'année **suivant** celle au titre de laquelle le forfait est demandé, après instruction de la demande. Le calendrier exact relève du même décret et fait partie des éléments en cours de vérification.

## Ce que le FMD change pour un employeur privé

Rapporté à une prime classique, le forfait présente un avantage double qui explique son rendement : côté employeur, l'absence de charges patronales sur la somme versée ; côté salarié, l'absence de cotisations salariales et d'impôt sur le revenu. À budget constant, le montant qui arrive réellement dans la poche du salarié est nettement supérieur.

Le simulateur en haut de cette page chiffre l'écart pour votre effectif, avec le taux de charges que vous appliquez réellement.

Reste la question du financement. Un employeur qui hésite à ouvrir une ligne budgétaire supplémentaire gagne à raisonner en net : une partie du coût est compensée par la baisse du besoin en places de parking et, pour les organisations soumises au reporting extra-financier, par la valorisation d'un indicateur de mobilité durable qu'il faudrait de toute façon alimenter.
