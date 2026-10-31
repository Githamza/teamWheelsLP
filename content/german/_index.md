---
title: "TeamWheels | Fahrgemeinschafts-Software für Microsoft Teams"
seoTitle: "Fahrgemeinschaften in Microsoft Teams | TeamWheels"
description: "Fahrgemeinschafts-App für Mitarbeitende in Microsoft Teams: weniger Scope-3-Emissionen, Parkdruck und Pendelkosten. In 5 Minuten live. 30 Tage kostenlos."
keywords: "Fahrgemeinschafts-App für Unternehmen, Mitfahrgelegenheit für Mitarbeiter, betriebliche Fahrgemeinschaften, Fahrgemeinschaft Software, BlaBlaCar für Unternehmen, Microsoft Teams App, betriebliches Mobilitätsmanagement, Pendler-App, Pendlerverkehr reduzieren, Fahrgemeinschaften organisieren, Corporate Carpooling, Mobilitäts-App für Unternehmen, Scope-3-Reporting Pendelverkehr, nachhaltige Mobilität Mitarbeiter, Mitfahrzentrale für Firmen"

# banner
banner:
  # one-column hero: title + rotating Teams / Copilot logos + one line (mirrors FR)
  layout: "centered"
  announcement:   # pill → Microsoft Store listing (teams_app.marketplace_url)
    label: "Neue Version"
    text: "Im Microsoft Store ansehen"
  journey:        # isometric "without / with TeamWheels" animation
    enable: true
  title: "Fahrgemeinschaften im Unternehmen"
  title_accent: "direkt in Ihren täglichen Tools"   # gradient 2nd line, ends with the logos
  rotating_logos:   # exactly 2 (CSS animation is tuned for 2 logos)
  - src: "images/microsoft-teams-icon.svg"
    alt: "Microsoft Teams"
  - src: "images/microsoft-copilot-icon.svg"
    alt: "Microsoft Copilot"
  lede: "TeamWheels macht nachhaltige Mobilität für Ihre Mitarbeitenden einfach."
  lede_logo: "images/logo.png"   # "TeamWheels" swapped for the logo
  # previous two-column texts, not shown in the centered layout
  subtitle: "Das Vertrauen von HR- und Nachhaltigkeitsteams in Europa und Nordamerika"
  subtitle_link: "#proof"   # the hero line links to the proof strip under the hero
  description: "Senken Sie Scope-3-Emissionen, reduzieren Sie den Parkplatzbedarf um 30 % und sparen Sie Ihren Mitarbeitenden 2.000 €/Jahr – ohne zusätzliche App, in 5 Minuten eingerichtet."
  button:
    enable: true
    button_label: "Demo anfordern"
    icon: "fas fa-arrow-right"
    link: "contact/"
  secondary_button:
    enable: false   # ersetzt durch den CTA „Zu Microsoft Teams hinzufügen“
    label: "Einsparungen berechnen"
    icon: "fas fa-calculator"
    link: "https://www.teamwheelsapp.com/en/blog/carpooling-savings-calculator-corporate-co2-roi-2026/"

  image: "images/teamwheels_demo_image.svg"

# brands
brands:
  enable: false
  title: "Sicher & konform"
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

# launch video — the hero's right-hand column. Its thumbnail is the animated
# `banner.image` SVG (how matching works) with a play button; the <video> is
# only created on click. Indexed from `watch_page` (/launch-video/: player,
# VideoObject JSON-LD, video sitemap entry). Keep in sync with
# content/german/launch-video.md.
launch_video:
  enable: true
  title: "TeamWheels – der KI-Fahrgemeinschafts-Agent in Microsoft Teams"
  button_label: "Launch-Video ansehen"
  watch_page: "/launch-video/"
  watch_page_label: "Seite mit dem Launch-Video öffnen"
  duration_seconds: 21
  poster: "videos/teamwheels-launch-en-poster.jpg"   # raster still of the SVG, shown in the player after the click
  mp4: "videos/teamwheels-launch-en.mp4"

# video demo — the full demo, in its own section directly under the hero.
# Same click-to-play poster (the <video> element is only created on click,
# so Google finds no video here); links to `watch_page`, the /demo/ page
# that carries the player, the VideoObject JSON-LD and the video sitemap
# entry. Keep this block in sync with content/german/demo.md.
video_demo:
  enable: true
  button_label: "In Aktion ansehen"
  subtitle: "Produktdemo"
  title: "TeamWheels in Aktion"
  lede: "Fahrten-Matching, der Konversations-Bot und das Scope-3-Emissions-Dashboard – in einer Minute."
  # uploadDate / duration are kept here for parity with demo.md (structured
  # data is emitted on /demo/ only).
  description: "Ein 60-sekündiger Rundgang durch TeamWheels – die App für Mitarbeiter-Fahrgemeinschaften und Pendlermanagement, die nativ in Microsoft Teams läuft. Sehen Sie Fahrten-Matching, den Konversations-Bot und das Scope-3-Emissions-Dashboard in Aktion."
  uploadDate: "2026-11-01"
  duration: "PT1M"        # ISO 8601, for VideoObject JSON-LD
  duration_seconds: 60      # plain seconds, for the video sitemap
  watch_page: "/demo/"                            # the video's watch page (link target)
  poster: "videos/teamwheels-demo-de-poster.jpg"   # still frame shown before the clip loads / video thumbnail
  webm: "videos/teamwheels-demo-de.webm"
  mp4: "videos/teamwheels-demo-de.mp4"

# why TeamWheels — comparison under the hero (partials/home-why.html),
# replaces the key figures (fun_facts, disabled below)
why_teamwheels:
  enable: true
  subtitle: "Vergleich"
  title: "Warum TeamWheels statt einer separaten App?"
  lede: "Eine separate Fahrgemeinschafts-App ist eine App mehr, die Ihre Mitarbeitenden vergessen. TeamWheels ist dort, wo sie ohnehin arbeiten: in Microsoft Teams."
  topic_label: "Kriterium"
  them_label: "Separate Fahrgemeinschafts-App"
  us_label: "TeamWheels in Microsoft Teams"
  rows:
  - topic: "Zugang"
    them: "App herunterladen, Konto und Passwort anlegen"
    us: "Bereits in Teams, Single Sign-on mit Microsoft Entra ID"
  - topic: "Einführung"
    them: "IT-Projekt, Registrierungskampagne, Erinnerungen"
    us: "Ein Teams-Admin, rund 5 Minuten, kein IT-Projekt"
  - topic: "Akzeptanz"
    them: "Nach ein paar Wochen gerät die App auf dem Handy in Vergessenheit"
    us: "Benachrichtigungen und KI-Agent im Tool, das den ganzen Tag geöffnet ist"
  - topic: "Community"
    them: "Konten anlegen und beim Austritt von Mitarbeitenden wieder löschen"
    us: "Ihr Entra-ID-Verzeichnis wird zur Mitfahrerliste, automatisch aktuell"
  - topic: "Daten"
    them: "Daten Ihrer Mitarbeitenden auf einer externen Plattform"
    us: "In Ihrem Microsoft-365-Tenant, Datenhaltung in der EU, DSGVO-konform"
  - topic: "ESG-Reporting"
    them: "Exporte, die für Scope 3 erst aufbereitet werden müssen"
    us: "Scope-3-Dashboard und CSRD-taugliche Berichte, automatisch erstellt"
  link:
    label: "Mehr zur Fahrgemeinschafts-Software für Unternehmen"
    href: "corporate-carpooling-software/"

# strip under the comparison (steps + security line): hidden, the full
# "how it works" section follows right below
proof_strip:
  enable: false

# fun facts
fun_facts:
  enable: false   # replaced by why_teamwheels
  title: "Betriebliche Fahrgemeinschaften in Zahlen"
  fact_item:
  - icon: "fas fa-dollar-sign"
    counter: "2.000"
    counter_suffix: " €"
    counter_prefix: ""
    content: "jährliche Ersparnis pro Mitarbeitendem durch gemeinsame Fahrten"

  - icon: "fas fa-parking"
    counter: "30"
    counter_suffix: " %"
    counter_prefix: ""
    content: "weniger Parkplatzbedarf an Unternehmensstandorten"

  - icon: "fas fa-leaf"
    counter: "6"
    counter_suffix: " kg"
    counter_prefix: "-"
    content: "CO₂ weniger pro gemeinsamer Pendelfahrt – messbare Scope-3-Wirkung"

  - icon: "fas fa-chart-line"
    counter: "10,6"
    counter_suffix: " %"
    counter_prefix: "+"
    content: "jährliches Wachstum betrieblicher Fahrgemeinschaften weltweit"

# work_process
work_process:
  enable: true
  section: "how-it-works"

# image_and_content_block
image_and_content_blocks:
  - enable: true
    subtitle: "Warum sich HR- und Nachhaltigkeitsverantwortliche für TeamWheels entscheiden"
    subtitle_link: "benefits/"
    title: "Fahrgemeinschaften dort, wo Ihre Teams bereits arbeiten"
    image: "images/why_use_teamWheels.png"
    content_position: "right"
    content: "TeamWheels ist eine Fahrgemeinschafts-Software für Unternehmen, die sich nativ in Microsoft Teams integriert – keine zusätzliche App, kein Change-Management. Ein Teams-Administrator, ein paar Klicks, und Ihr Fahrgemeinschaftsprogramm ist in 5 Minuten live – mit über 40 % Mitarbeiterbeteiligung.

    [Zur Fahrgemeinschafts-Software für Unternehmen →](/de/corporate-carpooling-software/) · [Mehr erfahren →](benefits/#teams-integration)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Messbare Wirkung auf ESG und Pendelverkehr"
    title: "Scope-3-Emissionen senken, Parkkosten reduzieren, Talente binden"
    image: "images/photos/office-parking-lot.jpg"
    content_position: "left"
    content: "Weniger Alleinfahrten bedeuten messbare Scope-3-Reduktionen, bis zu 30 % weniger Parkplatzbedarf und über 2.000 € jährliche Ersparnis pro Mitarbeitendem – bei gleichzeitig höherer Mitarbeiterbindung und mehr Wohlbefinden am Arbeitsplatz.

    [Mehr erfahren →](benefits/#business-impact)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Pendlerleistungen einfach verwalten"
    title: "Steuerbegünstigte Pendlerprogramme & Reporting zur nachhaltigen Mobilität"
    image: "images/photos/commute-reporting-dashboard.jpg"
    content_position: "right"
    content: "Automatisieren Sie die Erfassung steuerbegünstigter Pendlerleistungen (z. B. US-Grenze von 340 $/Monat laut IRS), erstellen Sie CSRD- und CDP-taugliche Scope-3-Berichte und bleiben Sie länderübergreifend compliant – ganz ohne zusätzlichen Verwaltungsaufwand.

    [Mehr erfahren →](benefits/#commuter-benefits)

    [Der umfassende Leitfaden zu Fahrgemeinschaften im Unternehmen (auf Englisch) →](/en/blog/corporate-carpooling-guide-2026/)
    "
    button:
      enable: false

  - enable: true
    anchor: "security"   # target of the proof strip security link
    subtitle: "Sicherheit & Compliance auf Enterprise-Niveau"
    title: "Eine sichere, von der IT freigegebene Mobilitätslösung für Mitarbeitende"
    image: "images/why_use_teamWheels.png"
    content_position: "left"
    content: "Veröffentlicht im Microsoft Teams Store mit einer [Microsoft 365 Publisher Attestation](https://learn.microsoft.com/de-de/microsoft-365-app-certification/teams/hmz-digital-teamwheels), Single Sign-on über Microsoft Entra ID und DSGVO-konform – TeamWheels erfüllt Sicherheitsstandards für Unternehmen, ohne zusätzliche Zugangsdaten oder Änderungen an der Infrastruktur.

    [Mehr erfahren →](benefits/#security)
    "
    button:
      enable: false


# blog
blog:
  enable: true
  subtitle: "Ressourcen für HR- und Nachhaltigkeitsverantwortliche"
  title: "Wissen rund um Pendelverkehr & betriebliche Fahrgemeinschaften"
  description: "Praxisleitfäden zu betrieblichen Fahrgemeinschaften, Scope-3-Reduktion und Pendlerleistungen für HR- und Nachhaltigkeitsverantwortliche (auf Englisch)."

  button:
    enable: true
    link: "https://www.teamwheelsapp.com/en/blog/"
    label: "Alle Artikel ansehen →"

next_step_button:
  enable: true
  link: "how-it-works/"
  label: "So funktioniert es →"


# call_to_action
call_to_action:
  enable: true
  title: "Starten Sie ein Fahrgemeinschaftsprogramm in Ihrem Unternehmen"
  subtitle: "Schließen Sie sich Unternehmen in ganz Europa und Nordamerika an, die ihre Scope-3-Emissionen senken und das Wohlbefinden ihrer Mitarbeitenden verbessern. <br><strong>30 Tage kostenlos testen</strong> + begleitete Einführung inklusive. <em>Keine Kreditkarte erforderlich.</em>"
  button_label : "Begleitete Demo anfordern →"
  button_link : "contact/"
  image : "images/cta.png"

---
