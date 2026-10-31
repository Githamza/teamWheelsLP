---
title: "TeamWheels | Carpoolen voor bedrijven in Microsoft Teams"
seoTitle: "Carpoolen voor bedrijven in Microsoft Teams | TeamWheels"
description: "Carpoolen voor bedrijven, direct in Microsoft Teams: minder woon-werkverkeer met de auto, minder parkeerdruk en meer inzicht in uw CO₂-uitstoot."
keywords: "carpoolen, carpoolen voor bedrijven, carpool app, carpoolapp voor werkgevers, woon-werkverkeer, carpoolen woon-werkverkeer, werkgebonden personenmobiliteit, WPM, mobiliteitsbeleid, Microsoft Teams app, Scope 3 woon-werkverkeer, parkeerdruk"
# Draft until Hamza publishes the nl-NL locale (SPEC.md D3): while this home
# is a draft, nothing under /nl/ is built in production.
draft: false

# banner
banner:
  # one-column hero: title + rotating Teams / Copilot logos + one line (mirrors FR)
  layout: "centered"
  announcement:   # pill → Microsoft Store listing (teams_app.marketplace_url)
    label: "Nieuwe versie"
    text: "Bekijk in de Microsoft Store"
  journey:        # isometric "without / with TeamWheels" animation
    enable: true
  title: "Carpoolen voor bedrijven"
  title_accent: "in de tools die u elke dag gebruikt"   # gradient 2nd line, ends with the logos
  rotating_logos:   # exactly 2 (CSS animation is tuned for 2 logos)
  - src: "images/microsoft-teams-icon.svg"
    alt: "Microsoft Teams"
  - src: "images/microsoft-copilot-icon.svg"
    alt: "Microsoft Copilot"
  lede: "TeamWheels maakt duurzaam woon-werkverkeer makkelijk voor uw medewerkers."
  lede_logo: "images/logo.png"   # "TeamWheels" swapped for the logo
  # previous two-column texts, not shown in the centered layout
  subtitle: "Voor HR-, mobiliteits- en duurzaamheidsteams"
  subtitle_link: "#proof"   # the hero line links to the proof strip under the hero
  description: "Minder woon-werkverkeer met de auto, minder parkeerdruk en een lagere Scope 3-uitstoot. Geen extra app, binnen 5 minuten ingericht."
  button:
    enable: true
    button_label: "Demo aanvragen"
    icon: "fas fa-arrow-right"
    link: "contact/"
  secondary_button:
    enable: false   # vervangen door de CTA "Toevoegen aan Microsoft Teams"
    label: "Bereken uw besparing"
    icon: "fas fa-calculator"
    link: "besparingscalculator/"

  image: "images/teamwheels_demo_image.svg"

# brands
brands:
  enable: false
  title: "Veilig en compliant"
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

# launch video: right column of the hero. The clip itself is in English
# (no Dutch version yet); it is indexed from its English watch page.
launch_video:
  enable: true
  title: "TeamWheels: de AI-carpoolassistent in Microsoft Teams"
  button_label: "Bekijk de lanceringsvideo"
  watch_page: "https://www.teamwheelsapp.com/en/launch-video/"
  watch_page_label: "Pagina met de lanceringsvideo openen (Engelstalig)"
  duration_seconds: 21
  poster: "videos/teamwheels-launch-en-poster.jpg"
  mp4: "videos/teamwheels-launch-en.mp4"

# video demo: the full demo, in its own section under the hero (English clip).
video_demo:
  enable: true
  button_label: "Bekijk de demo"
  subtitle: "Productdemo"
  title: "Zie TeamWheels in actie"
  lede: "Ritmatching, de chatbot en het Scope 3-dashboard, in één minuut (Engelstalig)."
  description: "Demo van 60 seconden van TeamWheels, de carpoolapp voor woon-werkverkeer die direct in Microsoft Teams werkt: ritmatching, de chatbot en het dashboard voor Scope 3-uitstoot."
  uploadDate: "2026-11-01"
  duration: "PT1M"
  duration_seconds: 60
  watch_page: "https://www.teamwheelsapp.com/en/demo/"
  poster: "videos/teamwheels-demo-nl-poster.jpg"
  webm: "videos/teamwheels-demo-nl.webm"
  mp4: "videos/teamwheels-demo-nl.mp4"

# why TeamWheels — comparison under the hero (partials/home-why.html),
# replaces the key figures (fun_facts, disabled below)
why_teamwheels:
  enable: true
  subtitle: "Vergelijking"
  title: "Waarom TeamWheels en geen losse carpoolapp?"
  lede: "Een losse carpoolapp is weer een app die uw medewerkers vergeten. TeamWheels zit waar ze al werken: in Microsoft Teams."
  topic_label: "Criterium"
  them_label: "Losse carpoolapp"
  us_label: "TeamWheels in Microsoft Teams"
  rows:
  - topic: "Toegang"
    them: "Een app downloaden, een account en wachtwoord aanmaken"
    us: "Al in Teams, inloggen met Microsoft Entra ID (SSO)"
  - topic: "Uitrol"
    them: "IT-project, aanmeldcampagne, herinneringen"
    us: "Eén Teams-beheerder, ongeveer 5 minuten, geen IT-project"
  - topic: "Gebruik"
    them: "Na een paar weken raakt de app op de telefoon in de vergetelheid"
    us: "Meldingen en een AI-agent in de tool die de hele dag openstaat"
  - topic: "Community"
    them: "Accounts aanmaken en weer verwijderen als medewerkers vertrekken"
    us: "Uw Entra ID-directory wordt de lijst met carpoolers, automatisch bijgewerkt"
  - topic: "Gegevens"
    them: "Gegevens van uw medewerkers op een extern platform"
    us: "In uw Microsoft 365-tenant, gegevens opgeslagen in de EU, AVG-conform"
  - topic: "Rapportage"
    them: "Exports die u zelf moet bewerken voor Scope 3 en de WPM-rapportage"
    us: "Scope 3-dashboard en ritgegevens voor de WPM-rapportage, automatisch bijgehouden"

# strip under the comparison (steps + security line): hidden, the full
# "how it works" section follows right below
proof_strip:
  enable: false

# fun facts
fun_facts:
  enable: false   # replaced by why_teamwheels
  title: "Carpoolen in het woon-werkverkeer: de cijfers"
  fact_item:
  - icon: "fas fa-clock"
    counter: "5"
    counter_suffix: " min"
    counter_prefix: ""
    content: "om TeamWheels in uw organisatie in te richten"

  - icon: "fas fa-parking"
    counter: "30"
    counter_suffix: "%"
    counter_prefix: ""
    content: "minder vraag naar parkeerplaatsen op de bedrijfslocatie"

  - icon: "fas fa-leaf"
    counter: "6"
    counter_suffix: " kg"
    counter_prefix: "-"
    content: "CO₂ per gedeelde rit: meetbaar effect op uw Scope 3"

  - icon: "fas fa-chart-line"
    counter: "10,6"
    counter_suffix: "%"
    counter_prefix: "+"
    content: "jaarlijkse groei van de carpoolmarkt"

# work_process
work_process:
  enable: true
  section: "how-it-works"

# image_and_content_block
image_and_content_blocks:
  - enable: true
    subtitle: "Waarom TeamWheels?"
    title: "Carpoolen waar uw medewerkers al werken"
    image: "images/why_use_teamWheels.png"
    content_position: "right"
    content: "TeamWheels is een carpoolapp voor bedrijven die direct in Microsoft Teams werkt: geen extra app, geen nieuwe gewoonte om aan te leren. Een Teams-beheerder, een paar klikken, en uw carpoolprogramma staat binnen 5 minuten online, met een deelname van meer dan 40%.

    [Zo werkt het →](hoe-het-werkt/)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Concrete resultaten"
    title: "Minder alleen in de auto, minder parkeerdruk, meer werkplezier"
    image: "images/photos/office-parking-lot.jpg"
    content_position: "left"
    content: "Als minder medewerkers alleen met de auto naar het werk rijden, betekent dat meetbaar minder CO₂-uitstoot, tot 30% minder vraag naar parkeerplaatsen en lagere reiskosten, terwijl u het welzijn van uw medewerkers en uw werkgeversmerk versterkt.

    [Bereken uw besparing →](besparingscalculator/)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Past in uw mobiliteitsbeleid"
    title: "Carpoolen in uw beleid voor woon-werkverkeer"
    image: "images/photos/commute-reporting-dashboard.jpg"
    content_position: "right"
    content: "TeamWheels houdt bij welke ritten uw medewerkers delen. Zo heeft u de gegevens in handen om carpoolen op te nemen in uw mobiliteitsbeleid, naast de reiskostenvergoeding, en om inzicht te krijgen in het woon-werkverkeer, bijvoorbeeld met het oog op de [rapportage werkgebonden personenmobiliteit (WPM)](https://www.rvo.nl/onderwerpen/rapportage-wpm). Organisaties met 100 of meer werknemers geven daarin jaarlijks vóór 1 juli het aantal kilometers woon-werkverkeer en zakelijk verkeer van hun werknemers door, per vervoermiddel en brandstof, voor het eerst over het jaar 2024. Het kabinet is van plan die grens met terugwerkende kracht tot 1 januari 2026 te verhogen naar 250 werknemers; het wijzigingsbesluit is nog niet in het Staatsblad gepubliceerd (stand van zaken oktober 2026).

    [Bekijk de prijzen →](prijzen/)
    "
    button:
      enable: false

  - enable: true
    anchor: "security"   # target of the proof strip security link
    subtitle: "Veiligheid en compliance"
    title: "Een veilige oplossing, ontworpen met het oog op uw IT-afdeling"
    image: "images/why_use_teamWheels.png"
    content_position: "left"
    content: "Gepubliceerd in de Microsoft Teams Store met een [Microsoft 365 Publisher Attestation](https://learn.microsoft.com/nl-nl/microsoft-365-app-certification/teams/hmz-digital-teamwheels), inloggen via Microsoft Entra ID, gegevens gehost in Frankrijk en AVG-proof: een veilige oplossing voor bedrijven, zonder extra wachtwoorden. Grote organisaties, campussen en bedrijventerreinen kunnen TeamWheels ook onder hun eigen naam inzetten met het [white-labelplatform](https://www.teamwheelsapp.com/en/white-label-carpool-platform/) (Engelstalig).
    "
    button:
      enable: false


# testimonials
testimonials:
  enable: false

# blog: no Dutch posts yet, so the theme shows the latest English posts.
blog:
  enable: true
  subtitle: "Kennisbank"
  title: "Gidsen over carpoolen en woon-werkverkeer"
  description: "Praktische gidsen over carpoolen binnen bedrijven, Scope 3 en mobiliteitsregelingen voor HR- en duurzaamheidsprofessionals (Engelstalig)."

  button:
    enable: true
    link: "https://www.teamwheelsapp.com/en/blog/"
    label: "Alle artikelen bekijken →"

next_step_button:
  enable: true
  link: "hoe-het-werkt/"
  label: "Zo werkt het →"


# call_to_action
call_to_action:
  enable: true
  title: "Start met carpoolen in uw organisatie"
  subtitle: "Verlaag uw Scope 3-uitstoot en verbeter het welzijn van uw teams. <br><strong>30 dagen gratis</strong>, inclusief begeleiding bij de inrichting. <em>Geheel vrijblijvend.</em>"
  button_label : "Persoonlijke demo aanvragen →"
  button_link : "contact/"
  image : "images/cta.png"

---
