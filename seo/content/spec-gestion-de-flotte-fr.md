<!-- Spec reçue le 2026-09-08 ; intégrée dans content/french/logiciel-gestion-de-flotte-automobile.md (layout pillar). -->

# SPEC — Page pilier « Logiciel de gestion de flotte automobile » (teamwheelsapp.com)

## 0. Contexte et objectif

- Site : teamwheelsapp.com, Hugo, thème delta-hugo, section FR sous `/fr/`.
- Objectif : **test SEO avant tout développement produit**. La page doit être indexée, ranker sur « logiciel gestion de flotte » / « gestion de flotte automobile » et mesurer deux signaux pendant 8 semaines : impressions/clics dans Search Console et demandes d'accès anticipé (événement GA4 `generate_lead`).
- Le contenu est fourni, ne pas le réécrire : `logiciel-gestion-de-flotte-automobile.md`. Ton rôle est l'intégration technique, le SEO on-page et le tracking.
- Ne rien coder côté produit. Ne pas créer de démo, de formulaire complexe ni de page tarif.

## 1. Positionnement — règles de fond (non négociables)

1. Angle : **gestion de flotte dans Microsoft Teams, pour les PME de 5 à 30 véhicules encore sur Excel, centrée sur la réservation et le partage des véhicules**.
2. « Sans boîtier » est un argument secondaire, jamais le titre ni la promesse principale (déjà occupé par Evera, GAC Car Fleet, CarFleet/Echoes, Gustave).
3. Ne jamais promettre : géolocalisation temps réel, données constructeur, désignation ANTAI, poids lourds. La section « Ce que TeamWheels ne fait pas » reste telle quelle.
4. La brique n'est pas encore livrée : le CTA est **« Demander un accès anticipé »**, jamais « Essai gratuit », « Commencer », « Acheter ». Aucun prix chiffré sur la page.
5. Pas de statistiques, témoignages, logos clients ou chiffres inventés. Si un emplacement « preuve sociale » existe dans le layout, le laisser vide ou le supprimer.
6. Ton : direct, pédagogique, sans superlatifs ni jargon marketing. Ne pas ajouter d'emojis, d'exclamations, de « révolutionnez », « boostez », « solution innovante ».

## 2. Fichier et URL

- Créer : `content/fr/logiciel-gestion-de-flotte-automobile.md` (ou l'équivalent selon l'arborescence des pages produit existantes — s'aligner sur `logiciel-covoiturage-entreprise` ou la page « marque blanche »).
- URL finale : `https://www.teamwheelsapp.com/fr/logiciel-gestion-de-flotte-automobile/` — slug exact, trailing slash, pas de date dans l'URL.
- Front matter : reprendre le format des pages produit existantes du thème (copier une page voisine et remplacer les valeurs). Champs à conserver obligatoirement : `title`, `description`, `slug`, `date`, `lastmod`, `draft: false`. Adapter `type`, `layout`, `images` aux noms réels du thème ; supprimer ceux que le thème ignore.
- `title` (balise `<title>`, ≤ 60 caractères affichés) : `Logiciel gestion de flotte automobile dans Teams | TeamWheels`
- `description` (meta, ≤ 155 caractères) : `Gestion de flotte automobile pour PME de 5 à 30 véhicules : réservation, kilométrage, échéances et coûts dans Microsoft Teams. Sans boîtier, sans nouvelle appli.`
- Pas de version EN pour l'instant. Si le thème génère automatiquement `hreflang` vers `/en/…`, s'assurer qu'il ne pointe pas vers une 404 : soit désactiver la traduction pour cette page, soit n'émettre que `hreflang="fr"` et `x-default` vers la FR.

## 3. Structure HTML et balisage

- Un seul `<h1>` : le H1 du contenu fourni. Si le thème injecte le `title` du front matter en H1, supprimer le `# ` du corps ou ajuster pour éviter deux H1.
- Hiérarchie H2 → H3 telle que dans le fichier, sans en ajouter.
- Les ancres `{#fonctionnement}` et `{#acces-anticipe}` doivent fonctionner (Goldmark : `markup.goldmark.parser.attribute.block = true` et `title = true`). Sinon, ajouter des `id` en HTML.
- Les attributs `{.btn .btn-primary}` sur les liens : les convertir vers le composant bouton réel du thème (shortcode ou HTML). Résultat attendu : deux boutons visibles dans le hero, un dans la section « Accès anticipé ».
- Le tableau comparatif à 5 colonnes doit rester lisible sur mobile : wrapper avec défilement horizontal (`overflow-x: auto`) si le thème ne le fait pas. Ne pas supprimer de colonnes.
- Bloc JSON-LD `FAQPage` en fin de fichier : nécessite `markup.goldmark.renderer.unsafe = true`. Si `unsafe` est désactivé et ne doit pas l'être, déplacer le JSON-LD dans un partial `head` conditionné à cette page (par ex. via un paramètre front matter `faqSchema: true`). Vérifier le rendu avec le test Rich Results de Google.
- Ajouter le schéma `SoftwareApplication` **uniquement si** le thème le fait déjà pour les autres pages produit ; sinon ne rien ajouter (pas de prix, pas de note, pas d'avis inventés).
- Canonical auto-référent sur l'URL finale. Pas de `noindex`.
- Image OG : créer `static/images/gestion-flotte-teams-og.png` en 1200×630, texte : « Gestion de flotte automobile dans Microsoft Teams — TeamWheels ». Pas de logo Microsoft, pas de capture d'écran de Teams (pas de contenu de marque tierce). `alt` sur toutes les images de la page, en français, décrivant l'image.

## 4. Liens internes

Corriger les trois URLs du contenu pour qu'elles pointent vers des pages existantes (vérifier dans `content/fr/`) :

| Dans le contenu | Remplacer par |
|---|---|
| `/fr/logiciel-covoiturage-entreprise/` | la page produit covoiturage réelle |
| `/fr/forfait-mobilites-durables/` | la page pilier FMD réelle |
| `/fr/contact/` | la page contact ou formulaire de démo réelle |

Ajouter des liens **entrants** vers la nouvelle page (sinon elle ne sera pas explorée vite) :

1. Menu principal FR : entrée « Gestion de flotte » à côté de « Logiciel covoiturage ».
2. Footer FR : lien dans la colonne produit.
3. Page produit covoiturage FR : une phrase dans une section existante, ancre « gestion de flotte automobile dans Teams ».
4. Page d'accueil FR : si un bloc « fonctionnalités » ou « cas d'usage » existe, y ajouter la carte gestion de flotte. Ne pas modifier le hero de l'accueil.
5. Article de blog VI / véhicules intermédiaires (s'il est publié) : un lien contextuel.

Ne pas toucher aux pages EN.

## 5. Tracking et mesure

1. Chaque bouton « Demander un accès anticipé » déclenche l'événement GA4 `generate_lead` existant (paramètre `lead_source: "gestion_flotte"` si le setup accepte des paramètres). Ne pas créer un nouvel événement.
2. Si le CTA envoie vers le formulaire contact existant, préremplir ou passer un paramètre d'URL `?src=gestion-flotte` pour distinguer l'origine dans les notifications.
3. Après déploiement : soumettre l'URL dans Search Console (inspection d'URL → demander l'indexation), vérifier qu'elle apparaît dans le sitemap généré par Hugo, vérifier `robots.txt`.
4. Ajouter les mots-clés suivants au suivi de positions OpenSEO (projet existant) : `logiciel gestion de flotte`, `gestion de flotte automobile`, `gestion de flotte`, `gestion de parc automobile`, `logiciel gestion parc automobile`, `autopartage entreprise`, `gestion flotte automobile excel`, `logiciel gestion de flotte gratuit`.

## 6. Performance et qualité

- Aucun script tiers ajouté. Aucune iframe.
- Lighthouse mobile ≥ 90 en Performance, Accessibilité, SEO.
- Contraste des boutons conforme WCAG AA.
- Page en français uniquement, `lang="fr"` sur `<html>` (ou hérité correctement).
- Build Hugo sans warning lié à cette page.

## 7. Critères d'acceptation (checklist finale)

- [ ] URL exacte `/fr/logiciel-gestion-de-flotte-automobile/` en 200, avec trailing slash
- [ ] `<title>` et meta description conformes au §2, un seul H1
- [ ] Contenu identique au fichier fourni (hors adaptation technique des boutons/ancres/liens)
- [ ] Aucune mention de prix, d'essai gratuit, de géolocalisation temps réel, de données constructeur
- [ ] Deux CTA « Demander un accès anticipé » fonctionnels, événement `generate_lead` vérifié dans le DebugView GA4
- [ ] JSON-LD FAQPage valide (Rich Results Test)
- [ ] 4 à 5 liens internes entrants en place (menu, footer, page covoiturage, accueil)
- [ ] Aucun lien sortant vers une 404 ; aucun `hreflang` vers une page EN inexistante
- [ ] OG image 1200×630 présente et référencée
- [ ] Lighthouse mobile ≥ 90 sur les trois scores
- [ ] URL soumise dans Search Console, présente dans le sitemap
- [ ] Mots-clés ajoutés au rank tracker OpenSEO

## 8. Hors périmètre (ne pas faire)

- Réécrire ou « améliorer » le contenu, ajouter des sections, des chiffres ou des témoignages
- Créer une page tarif, une page EN, un formulaire dédié, une intégration produit
- Modifier la structure globale du site, le hero de l'accueil ou les pages EN
- Ajouter un chatbot, un popup, une bannière
- Publier les 3 articles satellites (spec séparée à venir) : « gestion de flotte sur Excel », « véhicule de service vs indemnités kilométriques », « organiser un autopartage entreprise »
