---
title: "TeamWheels | Solution de covoiturage entreprise pour vos salariés"
seoTitle: "Covoiturage entreprise : la solution pour vos salariés | TeamWheels"
description: "Solution de covoiturage entreprise : mise en relation des salariés, justificatifs FMD et suivi Scope 3. Intégrée à Microsoft Teams, essai gratuit 30 jours."
# accueil = requête tête commerciale « covoiturage entreprise » (solution pour
# employeurs) ; Teams/Copilot = argument de différenciation, pas l'angle principal.
# Les autres intentions ont leur page, ne pas les viser ici :
#   logiciel / outil / application → corporate-carpooling-software
#   guide, mise en place (informationnel) → blog/covoiturage-entreprise-guide-2026
#   FMD → forfait-mobilites-durables-covoiturage ; marque blanche → white-label-carpool-platform
keywords: "covoiturage entreprise, solution covoiturage entreprise, covoiturage salariés, programme de covoiturage entreprise, TeamWheels"

# banner
banner:
  # hero une colonne : titre + logos Teams / Copilot qui défilent + une phrase
  layout: "centered"
  announcement:   # pastille au-dessus du titre → fiche Microsoft Store (teams_app.marketplace_url)
    label: "Nouvelle version"
    text: "Voir sur le Microsoft Store"
  journey:        # animation 3D isométrique « sans / avec TeamWheels » au-dessus du titre
    enable: true
  title: "Le covoiturage en entreprise"
  title_accent: "au cœur de vos outils quotidiens"   # 2e ligne en dégradé, se termine par les logos
  rotating_logos:   # exactement 2 (animation CSS calée sur 2 logos)
  - src: "images/microsoft-teams-icon.svg"
    alt: "Microsoft Teams"
  - src: "images/microsoft-copilot-icon.svg"
    alt: "Microsoft Copilot"
  lede: "TeamWheels met en relation vos salariés qui font le même trajet et pilote votre programme de covoiturage, de l'inscription au forfait mobilités durables."
  lede_logo: "images/logo.png"   # « TeamWheels » remplacé par le logo (icône + typo manuscrite)
  # anciens textes (layout deux colonnes), non affichés en layout centered
  subtitle: "Plébiscité par les équipes RH & développement durable"
  subtitle_link: "#proof"
  description: "Réduisez votre Scope 3, libérez du parking et versez le Forfait Mobilité Durable — zéro app supplémentaire, déployé en 5 minutes."
  button:
    enable: true
    button_label: "Recevoir une démo"
    icon: "fas fa-arrow-right"
    link: "contact/"
  secondary_button:
    enable: false   # remplacé par le CTA « Installer dans Microsoft Teams »
    label: "Calculez vos économies"
    icon: "fas fa-calculator"
    link: "blog/calculateur-economies-covoiturage-entreprise-co2-roi-2026/"

  image: "images/teamwheels_demo_image_fr.svg"   # version FR (textes des bulles traduits)

# brands
brands:
  enable: false
  title: "Sécurisé et conforme"
  images:
  - "images/clients/01.png"
  - "images/clients/02.png"
  - "images/clients/03.png"
  - "images/clients/04.png"
  - "images/clients/05.png"

# features
features:
  enable: true
  section: "features"

# vidéo de lancement — colonne droite du hero. Sa miniature est le SVG animé
# `banner.image` (comment ça marche) avec un bouton lecture ; le <video>
# n'est créé qu'au clic. Indexée depuis `watch_page` (/launch-video/ :
# lecteur, VideoObject JSON-LD, entrée du sitemap vidéo). Garder ce bloc
# aligné sur content/french/launch-video.md.
launch_video:
  enable: true
  title: "TeamWheels — l'agent IA de covoiturage intégré à Microsoft Teams"
  button_label: "Voir la vidéo de lancement"
  watch_page: "/launch-video/"
  watch_page_label: "Voir la page de la vidéo de lancement"
  duration_seconds: 21
  poster: "videos/teamwheels-launch-fr-poster.jpg"   # image fixe du SVG, affichée dans le lecteur après le clic
  mp4: "videos/teamwheels-launch-fr.mp4"

# démo vidéo — la démo complète, dans sa propre section sous le hero. Même
# poster « clic pour lire » (le <video> n'est créé qu'au clic, Google n'y
# trouve donc aucune vidéo) ; renvoie vers `watch_page`, la page /demo/ qui
# porte le lecteur, le VideoObject JSON-LD et l'entrée du sitemap vidéo.
# Garder ce bloc aligné sur content/french/demo.md.
video_demo:
  enable: true
  button_label: "Voir en action"
  subtitle: "Démo du produit"
  title: "Découvrez TeamWheels en action"
  lede: "Le matching de trajets, le bot conversationnel et le tableau de bord Scope 3, en une minute."
  # uploadDate / duration restent ici par parité avec demo.md (données
  # structurées émises sur /demo/ seulement).
  description: "Démonstration de 60 secondes de TeamWheels — l'application de covoiturage et de gestion des trajets domicile-travail intégrée nativement à Microsoft Teams. Découvrez le matching de trajets, le bot conversationnel et le tableau de bord des émissions Scope 3."
  uploadDate: "2026-11-01"
  duration: "PT1M"
  duration_seconds: 60
  watch_page: "/demo/"
  poster: "videos/teamwheels-demo-fr-poster.jpg"   # image fixe affichée avant le chargement / miniature de la vidéo
  webm: "videos/teamwheels-demo-fr.webm"
  mp4: "videos/teamwheels-demo-fr.mp4"

# pourquoi TeamWheels — comparatif sous le hero (partials/home-why.html),
# remplace les chiffres clés (fun_facts, désactivé ci-dessous)
why_teamwheels:
  enable: true
  subtitle: "Comparatif"
  title: "Pourquoi TeamWheels plutôt qu'une autre solution de covoiturage ?"
  lede: "Le covoiturage en entreprise échoue quand personne n'ouvre l'app. TeamWheels est intégré nativement à Microsoft Teams et Copilot, les outils que vos salariés utilisent déjà toute la journée : l'adoption suit. Découvrez notre [logiciel de covoiturage entreprise](/fr/corporate-carpooling-software/)."
  topic_label: "Critère"
  them_label: "Solution de covoiturage classique"
  us_label: "TeamWheels"
  rows:
  - topic: "Accès"
    them: "Une app à télécharger, un compte et un mot de passe à créer"
    us: "Déjà dans Teams, connexion SSO Microsoft Entra ID"
  - topic: "Déploiement"
    them: "Projet IT, campagne d'inscription, relances"
    us: "Un admin Teams, environ 5 minutes, sans projet IT"
  - topic: "Adoption"
    them: "L'app reste au fond du téléphone après quelques semaines"
    us: "Notifications et agent IA dans l'outil ouvert toute la journée"
  - topic: "Communauté"
    them: "Comptes à provisionner, puis à supprimer au départ des salariés"
    us: "Votre annuaire Entra ID devient la liste des covoitureurs, à jour automatiquement"
  - topic: "Données"
    them: "Données de vos salariés sur une plateforme externe"
    us: "Dans votre tenant Microsoft 365, données hébergées en France, RGPD"
  - topic: "Pilotage RSE"
    them: "Exports à retraiter pour le Scope 3 et le FMD"
    us: "Tableau de bord Scope 3 et justificatifs FMD générés automatiquement"
  link:
    label: "Comparer avec BlaBlaCar Daily et Karos"
    href: "alternative-blablacar-daily-karos-entreprises/"

# bandeau sous le comparatif (étapes + ligne sécurité) : masqué, la section
# « Comment fonctionne » complète suit juste en dessous
proof_strip:
  enable: false

# fun facts
fun_facts:
  enable: false   # remplacé par why_teamwheels
  title: "Le covoiturage domicile-travail en chiffres"
  fact_item:
  - icon: "fas fa-euro-sign"
    counter: "900"
    counter_suffix: " €"
    counter_prefix: ""
    content: "par salarié et par an (FMD + abonnement transport)"

  - icon: "fas fa-clock"
    counter: "5"
    counter_suffix: " min"
    counter_prefix: ""
    content: "pour déployer TeamWheels dans votre entreprise"

  - icon: "fas fa-car"
    counter: "6"
    counter_suffix: " kg"
    counter_prefix: "-"
    content: "de CO₂ économisés par trajet partagé"

  - icon: "fas fa-chart-line"
    counter: "10,6"
    counter_suffix: " %"
    counter_prefix: "+"
    content: "de croissance annuelle du marché du covoiturage"

# work_process — étapes propres à l'accueil, vues par l'employeur (partials/home-steps.html).
# Sans `process_item`, l'accueil reprendrait les étapes de how-it-works.md.
# Le titre ne doit pas reprendre celui de /fr/how-it-works/ (« Comment fonctionne… »).
work_process:
  enable: true
  section: "how-it-works"   # cible du bouton « Voir le fonctionnement détaillé »
  subtitle: "Mise en place"
  title: "Lancez votre programme de covoiturage en moins d'une semaine"
  link_label: "Voir le fonctionnement détaillé"
  process_item:
    - label: "Jour 1"
      title: "Installez"
      image: "images/how-it-works/home-fr-step-1.svg"
      image_alt: "TeamWheels ajouté depuis le Microsoft Teams Store, connexion SSO et essai gratuit activés"
      content: "Votre admin Microsoft 365 ajoute TeamWheels en 5 minutes. Pas d'app à télécharger : vos salariés se connectent avec leur compte pro. L'essai gratuit démarre à l'installation."
    - label: "Semaine 1"
      title: "Lancez"
      image: "images/how-it-works/home-fr-step-2.svg"
      image_alt: "L'agent TeamWheels propose à un salarié un covoiturage sur son trajet domicile-travail"
      content: "Vos salariés déclarent leurs trajets dans Teams ou à l'agent Copilot. TeamWheels propose automatiquement les équipages entre collègues qui font le même trajet."
    - label: "Mois 1"
      title: "Pilotez"
      image: "images/how-it-works/home-fr-step-3.svg"
      image_alt: "Tableau de bord TeamWheels : trajets partagés, CO₂ évité, places de parking libérées et justificatifs FMD"
      content: "Suivez les trajets partagés, le CO₂ évité et les places de parking libérées. Les justificatifs du forfait mobilités durables sont prêts à verser."

# image_and_content_block
image_and_content_blocks:
  - enable: true
    subtitle: "Pourquoi choisir TeamWheels ?"
    subtitle_link: "benefits/"
    title: "Le covoiturage directement dans Microsoft Teams"
    image: "images/why_use_teamWheels.png"
    content_position: "right"
    content: "TeamWheels est un [outil de covoiturage entreprise](/fr/corporate-carpooling-software/) qui s'intègre nativement à Microsoft Teams — zéro app supplémentaire, adoption immédiate. Un admin, quelques clics, et votre programme covoiturage est en ligne en 5 minutes avec 40%+ de participation.

    [En savoir plus →](benefits/#integration-teams)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Des résultats concrets"
    title: "RSE, économies et bien-être au quotidien"
    image: "images/photos/office-parking-lot.jpg"
    content_position: "left"
    content: "Moins de trajets solo = émissions CO₂ mesurables, 30% de places de parking libérées, et des économies concrètes sur les frais de trajet — tout en renforçant le bien-être et la marque employeur.

    [En savoir plus →](benefits/#resultats)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Coup de pouce du gouvernement"
    title: "Forfait mobilités durables : jusqu'à 900 €/an par salarié"
    image: "images/photos/commute-reporting-dashboard.jpg"
    content_position: "right"
    content: "Versez jusqu'à 600 € par an et par salarié — 900 € en cumul avec l'abonnement transport — exonérés de charges et d'impôt grâce au [forfait mobilités durables](/fr/forfait-mobilites-durables-covoiturage/). TeamWheels génère automatiquement les justificatifs FMD et vous permet de rejoindre la charte ADEME.

    [En savoir plus →](benefits/#fmd)

    [Guide complet : covoiturage en entreprise →](/fr/blog/covoiturage-entreprise-guide-2026/)
    "
    button:
      enable: false

  - enable: true
    anchor: "security"   # target of the proof strip security link
    subtitle: "Sécurité & Conformité"
    title: "Une solution sécurisée, pensée pour votre DSI"
    image: "images/why_use_teamWheels.png"
    content_position: "left"
    content: "Publiée sur le Microsoft Teams Store avec une [Publisher Attestation Microsoft 365](https://learn.microsoft.com/fr-fr/microsoft-365-app-certification/teams/hmz-digital-teamwheels), SSO via Microsoft Entra ID, données hébergées en France et RGPD compliant — une solution enterprise sécurisée, sans identifiants supplémentaires. Les grands comptes, campus et zones d'activité peuvent la déployer sous leur propre nom avec la [plateforme de covoiturage en marque blanche](/fr/white-label-carpool-platform/).

    [En savoir plus →](benefits/#securite)
    "
    button:
      enable: false

  - enable: true
    subtitle: "En accès anticipé"
    title: "Gestion de flotte automobile dans Microsoft Teams"
    image: "images/parking.png"
    content_position: "right"
    content: "Pour les PME et collectivités de 5 à 30 véhicules de service encore gérés sur Excel : réservation d'un véhicule depuis le chat Teams, relevé kilométrique au retour, alertes d'échéances et coût par véhicule. Sans boîtier, sans application supplémentaire.

    [Découvrir la gestion de flotte →](/fr/logiciel-gestion-de-flotte-automobile/)
    "
    button:
      enable: false


# testimonials
testimonials:
  enable: false
  subtitle: "Retours d'expérience"
  title: "Ce que nos clients disent de TeamWheels"
  image_1: "images/testimonials-group-1.png"
  image_2: "images/testimonials-group-2.png"
  reviews:
    - name: "Marie Dupont"
      designation: "DRH, Entreprise XYZ"
      image: "images/avatar/04.jpg"
      content: "Déploiement en 1 semaine, adoption immédiate par les équipes. 40% de nos collaborateurs covoiturent maintenant."

    - name: "Pierre Martin"
      designation: "RSE Manager, Société ABC"
      image: "images/avatar/02.jpg"
      content: "Parfait pour notre bilan carbone. Interface intuitive dans Teams, nos collaborateurs adorent."

    - name: "Sophie Bernard"
      designation: "Office Manager, StartupDEF"
      image: "images/avatar/07.jpg"
      content: "Simple à mettre en place et gratuit pendant 30 jours. On a pu tester sans engagement."


# blog
blog:
  enable: true
  subtitle: "Ressources"
  title: "Actualités et guides pratiques"
  description: "Découvrez nos conseils pour développer le covoiturage dans votre entreprise"

  button:
    enable: true
    link: "blog/"
    label: "Voir tous les articles →"

next_step_button:
  enable: true
  link: "how-it-works/"
  label: "Voir comment ça fonctionne →"


# call_to_action
call_to_action:
  enable: true
  title: "Lancez le covoiturage dans votre entreprise"
  subtitle: "Rejoignez les entreprises qui réduisent leur Scope 3 et améliorent le bien-être de leurs équipes. <br><strong>Essai gratuit 30 jours</strong> + déploiement accompagné inclus. <em>Sans engagement.</em>"
  button_label : "Recevoir une démo guidée →"
  button_link : "contact/"
  image : "images/cta.png"

---
