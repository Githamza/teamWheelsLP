---
title: "TeamWheels | Fahrgemeinschafts-Software für Microsoft Teams"
seoTitle: "Fahrgemeinschaften in Microsoft Teams | TeamWheels"
description: "Fahrgemeinschafts-App für Mitarbeitende in Microsoft Teams: weniger Scope-3-Emissionen, Parkdruck und Pendelkosten. In 5 Minuten live. 30 Tage kostenlos."
keywords: "Fahrgemeinschafts-App für Unternehmen, Mitfahrgelegenheit für Mitarbeiter, betriebliche Fahrgemeinschaften, Fahrgemeinschaft Software, BlaBlaCar für Unternehmen, Microsoft Teams App, betriebliches Mobilitätsmanagement, Pendler-App, Pendlerverkehr reduzieren, Fahrgemeinschaften organisieren, Corporate Carpooling, Mobilitäts-App für Unternehmen, Scope-3-Reporting Pendelverkehr, nachhaltige Mobilität Mitarbeiter, Mitfahrzentrale für Firmen"

# banner
banner:
  subtitle: "Das Vertrauen von HR- und Nachhaltigkeitsteams in Europa und Nordamerika"
  title: 'Fahrgemein­schaften für Mitarbeitende – direkt in <span class="teams-brand">Microsoft Teams</span>'
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
  uploadDate: "2026-07-13"
  duration: "PT1M1S"        # ISO 8601, for VideoObject JSON-LD
  duration_seconds: 61      # plain seconds, for the video sitemap
  watch_page: "/demo/"                            # the video's watch page (link target)
  poster: "videos/teamwheels-demo-poster.jpg"   # still frame shown before the clip loads / video thumbnail
  webm: "videos/teamwheels-demo.webm"
  mp4: "videos/teamwheels-demo.mp4"

# fun facts
fun_facts:
  enable: true
  title: "Betriebliche Fahrgemeinschaften in Zahlen"
  fact_item:
  - icon: "fas fa-dollar-sign"
    counter: "2000"
    counter_suffix: "€"
    counter_prefix: ""
    content: "jährliche Ersparnis pro Mitarbeitendem durch gemeinsame Fahrten"

  - icon: "fas fa-parking"
    counter: "30"
    counter_suffix: "%"
    counter_prefix: ""
    content: "weniger Parkplatzbedarf an Unternehmensstandorten"

  - icon: "fas fa-leaf"
    counter: "6"
    counter_suffix: " kg"
    counter_prefix: "-"
    content: "CO₂ weniger pro gemeinsamer Pendelfahrt – messbare Scope-3-Wirkung"

  - icon: "fas fa-chart-line"
    counter: "10.6"
    counter_suffix: "%"
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
