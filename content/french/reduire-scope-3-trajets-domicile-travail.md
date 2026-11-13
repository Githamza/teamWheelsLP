---
title: "Réduire le Scope 3 des trajets domicile-travail"
seoTitle: "Réduire le Scope 3 domicile-travail : méthode et calcul"
description: "Calculer les émissions des trajets domicile-travail (scope 3, catégorie 7) et ce que le covoiturage salariés permet d'éviter : formule, exemple chiffré, leviers."
slug: "reduire-scope-3-trajets-domicile-travail"
date: 2026-11-03
lastmod: 2026-11-03
draft: false
layout: "pillar"
keywords: ["réduire scope 3 domicile-travail", "scope 3 catégorie 7", "émissions trajets domicile-travail", "bilan carbone déplacements domicile-travail", "covoiturage scope 3", "calcul CO2 domicile-travail"]

# Demande du 03/11/2026 (priorité 2, haut de funnel). Chiffre calculable :
# méthode + exemple. Facteur 0,193 kgCO2e/km = celui du calculateur
# (assets/js/savings-calculator.js) ; la page renvoie à la Base Empreinte pour
# la valeur à retenir dans un bilan. Stats : INSEE n° 1835 (74 % en voiture,
# 2017) et INSEE 7928259 (17,4 MtCO2e en 2019, 98 % voiture).
faq_title: "Questions fréquentes sur le scope 3 domicile-travail"
faq:
  - question: "Les trajets domicile-travail sont-ils dans le scope 3 ?"
    answer: "Oui. Dans le GHG Protocol, les déplacements domicile-travail des salariés forment la catégorie 7 du scope 3, car ils se font avec des véhicules que l'entreprise ne possède pas. Dans le bilan d'émissions de gaz à effet de serre réglementaire (BEGES), ils sont rattachés aux émissions indirectes liées au transport."
  - question: "Comment calculer les émissions des trajets domicile-travail ?"
    answer: "Multipliez, pour les salariés qui viennent en voiture, la distance aller-retour par le nombre de jours travaillés sur site et par un facteur d'émission par kilomètre (Base Empreinte de l'ADEME), en divisant par le nombre d'occupants du véhicule. Les données viennent d'une enquête mobilité auprès des salariés, ou des relevés de votre outil de covoiturage."
  - question: "De combien le covoiturage réduit-il le scope 3 domicile-travail ?"
    answer: "Chaque équipage de deux salariés supprime une voiture du trajet. Dans l'exemple de cette page (300 salariés, 210 en voiture, 25 km aller), 20 % de conducteurs qui covoiturent en binôme tous les jours de présence réduisent les émissions domicile-travail d'environ 10 %, soit une quarantaine de tonnes de CO₂e par an."
  - question: "Comment prouver la réduction dans le bilan carbone ?"
    answer: "Avec des données de trajets réels plutôt qu'une estimation : nombre de trajets covoiturés, kilomètres évités, nombre d'occupants. TeamWheels enregistre chaque trajet partagé dans Microsoft Teams et fournit un export des trajets, kilomètres et CO₂ évités pour le bilan GES et la CSRD."
---

**Pour les responsables RSE, mobilité et RH qui doivent chiffrer, puis réduire, les émissions des trajets domicile-travail.** Cette page donne la formule de calcul, un exemple chiffré pour un site de 300 salariés, et l'effet mesurable du covoiturage.

---

## Pourquoi les trajets domicile-travail pèsent dans le scope 3 {#enjeu}

- En France, **74 % des actifs** qui se déplacent pour aller travailler utilisent leur voiture ([INSEE Première n° 1835](https://www.insee.fr/fr/statistiques/5013868), données 2017).
- Les déplacements domicile-travail ont émis **17,4 millions de tonnes de CO₂e en 2019**, dont **98 % dues à la voiture** ([INSEE](https://www.insee.fr/fr/statistiques/7928259)).
- Dans le GHG Protocol, ces trajets forment la **catégorie 7 du scope 3** (« employee commuting »). Ils entrent dans le bilan GES et, pour les entreprises concernées, dans le reporting climat de la CSRD.

C'est souvent le premier poste du scope 3 sur lequel l'employeur peut agir sans changer de fournisseur ni de produit.

## La méthode de calcul {#methode}

> **Émissions annuelles (kgCO₂e) = salariés venant en voiture × distance aller-retour (km) × jours sur site par an × facteur d'émission (kgCO₂e/km) ÷ occupants par voiture**

- **Salariés venant en voiture et distance** : enquête mobilité auprès des salariés, ou codes postaux de domicile anonymisés.
- **Jours sur site** : jours travaillés moins congés et télétravail (souvent 180 à 210 jours).
- **Facteur d'émission** : prenez la valeur « voiture particulière » de la [Base Empreinte de l'ADEME](https://base-empreinte.ademe.fr/) en vigueur pour votre bilan. Notre [calculateur](/fr/blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/) utilise 0,193 kgCO₂e par kilomètre pour une voiture moyenne.
- **Occupants** : 1 en autosolisme, 2 pour un binôme de covoiturage.

**Émissions évitées par le covoiturage** = kilomètres-voiture supprimés × facteur d'émission. Un binôme qui covoiture supprime une voiture sur deux sur ce trajet.

## Exemple chiffré : un site de 300 salariés {#exemple}

| Donnée | Valeur |
|---|---|
| Salariés sur le site | 300 |
| Viennent en voiture, seuls (70 %) | 210 |
| Distance aller-retour moyenne | 50 km (25 km aller) |
| Jours sur site par an | 200 |
| Facteur d'émission | 0,193 kgCO₂e/km |
| **Émissions domicile-travail actuelles** | 210 × 50 × 200 × 0,193 = **405 t CO₂e par an** |
| Covoitureurs : 20 % des conducteurs, en binômes | 42 salariés, soit 21 voitures en moins |
| Kilomètres-voiture évités | 21 × 50 × 200 = 210 000 km |
| **Émissions évitées** | 210 000 × 0,193 = **40,5 t CO₂e par an, soit −10 %** |

Si les binômes ne covoiturent que 3 jours sur 5, comptez 60 % de cet effet : environ 24 t CO₂e par an. Pour faire le calcul avec vos propres chiffres, utilisez le [calculateur d'économies covoiturage](/fr/blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/).

<p class="pillar-cta">
  <a class="btn btn-primary" href="/fr/contact/?src=scope-3-domicile-travail">Chiffrer votre site en démo</a>
</p>

## Les leviers pour réduire ce poste {#leviers}

1. **Le covoiturage entre collègues** : effet direct sur les kilomètres-voiture, sans investissement en infrastructure.
2. **Le télétravail** : moins de jours sur site, donc moins de trajets.
3. **Le vélo et les transports en commun**, soutenus par le [forfait mobilités durables](/fr/forfait-mobilites-durables-covoiturage/) et la prise en charge de l'abonnement.
4. **L'électrification** des véhicules, qui réduit le facteur d'émission par kilomètre.

Ces leviers se cumulent. Le covoiturage est le plus rapide à lancer : quelques semaines, contre plusieurs mois ou années pour une piste cyclable ou une ligne de bus. Pour inscrire ces actions dans une démarche d'ensemble, voir notre [plan de réduction carbone en entreprise](/fr/blog/plan-reduction-carbone-entreprise-strategie-decarbonation/) et le [plan de mobilité employeur](/fr/blog/plan-de-mobilite-employeur-modele-covoiturage/).

## Mesurer avec des trajets réels {#mesure}

Une estimation suffit pour un premier bilan. Pour suivre une trajectoire de réduction, il faut des données de trajets. TeamWheels organise le covoiturage directement dans Microsoft Teams et enregistre chaque trajet partagé :

- **trajets covoiturés, kilomètres et CO₂ évités**, par site et par mois ;
- **export pour le bilan GES et la CSRD** (scope 3, catégorie 7) ;
- **les mêmes données** servent aux justificatifs du forfait mobilités durables (voir [logiciel de gestion du FMD](/fr/logiciel-forfait-mobilites-durables/)).

<p class="pillar-cta">
  <a class="btn btn-primary" href="/fr/contact/?src=scope-3-domicile-travail">Demander une démo</a>
</p>

*Méthode simplifiée à visée d'estimation. Pour un bilan réglementaire ou audité, retenez les facteurs d'émission en vigueur de la Base Empreinte et documentez vos hypothèses.*
