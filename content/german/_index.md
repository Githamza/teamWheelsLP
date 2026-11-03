---
title: "TeamWheels | Betriebliche Fahrgemeinschaften für Ihre Mitarbeitenden"
seoTitle: "Fahrgemeinschaften im Unternehmen | TeamWheels"
description: "Betriebliche Fahrgemeinschaften: Mitarbeitende finden Mitfahrende, Fahrtnachweise und Scope-3-Reporting inklusive. In Microsoft Teams, erster Monat kostenlos."
# Startseite = kommerzieller Hauptbegriff „Fahrgemeinschaften Unternehmen“ (Lösung für Arbeitgeber);
# Teams/Copilot = Unterscheidungsmerkmal, nicht der Aufhänger. Software / App → corporate-carpooling-software
keywords: "Fahrgemeinschaften Unternehmen, betriebliche Fahrgemeinschaften, Fahrgemeinschaft Mitarbeiter, Fahrgemeinschaftsprogramm, Mitfahrgelegenheit für Mitarbeiter, TeamWheels"

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
  lede: "TeamWheels bringt Mitarbeitende mit derselben Strecke zusammen und steuert Ihr Fahrgemeinschaftsprogramm – von der Anmeldung bis zu den Pendlerleistungen."
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
  duration: "PT1M5S"        # ISO 8601, for VideoObject JSON-LD
  duration_seconds: 65      # plain seconds, for the video sitemap
  watch_page: "/demo/"                            # the video's watch page (link target)
  poster: "videos/teamwheels-demo-de-poster.jpg"   # still frame shown before the clip loads / video thumbnail
  webm: "videos/teamwheels-demo-de.webm"
  mp4: "videos/teamwheels-demo-de.mp4"

# why TeamWheels — comparison under the hero (partials/home-why.html),
# replaces the key figures (fun_facts, disabled below)
why_teamwheels:
  enable: true
  subtitle: "Vergleich"
  title: "Warum TeamWheels statt einer anderen Fahrgemeinschafts-Lösung?"
  lede: "Betriebliche Fahrgemeinschaften scheitern, wenn niemand die App öffnet. TeamWheels ist nativ in Microsoft Teams und Copilot integriert, die Tools, die Ihre Mitarbeitenden ohnehin den ganzen Tag nutzen – die Nutzung folgt von selbst. Entdecken Sie unsere [Fahrgemeinschafts-Software für Unternehmen](/de/corporate-carpooling-software/)."
  topic_label: "Kriterium"
  them_label: "Klassische Fahrgemeinschafts-Lösung"
  us_label: "TeamWheels"
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

# work_process — homepage-only steps, from the employer's side (partials/home-steps.html).
# Ohne `process_item` zeigt die Startseite die Schritte aus how-it-works.md; Titel nicht von dieser Seite übernehmen.
work_process:
  enable: true
  section: "how-it-works"   # target of the "Funktionsweise im Detail" button
  subtitle: "Einführung"
  title: "Starten Sie Ihr Fahrgemeinschaftsprogramm in weniger als einer Woche"
  link_label: "Funktionsweise im Detail"
  process_item:
    - label: "Tag 1"
      title: "Installieren"
      image: "images/how-it-works/home-de-step-1.svg"
      image_alt: "TeamWheels aus dem Microsoft Teams Store hinzugefügt, Anmeldung per SSO und kostenloser erster Monat aktiviert"
      content: "Ihre Microsoft-365-Administration fügt TeamWheels in 5 Minuten hinzu. Keine App zum Herunterladen: Ihre Mitarbeitenden melden sich mit ihrem Arbeitskonto an. Der kostenlose erste Monat startet mit der Installation."
    - label: "Woche 1"
      title: "Starten"
      image: "images/how-it-works/home-de-step-2.svg"
      image_alt: "Der TeamWheels-Agent schlägt einer Mitarbeiterin eine Fahrgemeinschaft auf ihrem Arbeitsweg vor"
      content: "Ihre Mitarbeitenden tragen ihre Arbeitswege in Teams ein oder sagen es dem Copilot-Agenten. TeamWheels schlägt automatisch Fahrgemeinschaften unter Kolleg:innen mit derselben Strecke vor."
    - label: "Monat 1"
      title: "Steuern"
      image: "images/how-it-works/home-de-step-3.svg"
      image_alt: "TeamWheels-Dashboard: geteilte Fahrten, vermiedenes CO₂, freie Parkplätze und Fahrtnachweise"
      content: "Verfolgen Sie geteilte Fahrten, vermiedenes CO₂ und frei gewordene Parkplätze. Die Fahrtnachweise pro Mitarbeitendem liegen für Ihre Pendlerleistungen bereit."

# image_and_content_block
image_and_content_blocks:
  - enable: true
    subtitle: "Warum sich HR- und Nachhaltigkeitsverantwortliche für TeamWheels entscheiden"
    subtitle_link: "benefits/"
    title: "Von Ihren Mitarbeitenden genutzt – dank Microsoft Teams und Copilot"
    image: "images/home-de-adoption-teams-copilot.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "TeamWheels in Microsoft Teams schlägt einer Mitarbeiterin eine Fahrgemeinschaft vor, Copilot findet Kolleg:innen mit derselben Strecke"
    content_position: "right"
    content: "TeamWheels ist ein [Fahrgemeinschafts-Tool für Unternehmen](/de/corporate-carpooling-software/), das sich nativ in Microsoft Teams integriert – keine zusätzliche App, kein Change-Management. Ein Teams-Administrator, ein paar Klicks, und Ihr Fahrgemeinschaftsprogramm ist in 5 Minuten live – mit über 40 % Mitarbeiterbeteiligung.

    [Mehr erfahren →](benefits/#teams-integration)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Messbare Wirkung auf ESG und Pendelverkehr"
    title: "Scope-3-Emissionen senken, Parkkosten reduzieren, Talente binden"
    image: "images/home-de-rse.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "ESG-Bericht von TeamWheels: durch Fahrgemeinschaften vermiedenes CO₂ (Scope 3, Kategorie 7), freie Parkplätze und CSRD-Export"
    content_position: "left"
    content: "Weniger Alleinfahrten bedeuten messbare Scope-3-Reduktionen, bis zu 30 % weniger Parkplatzbedarf und über 2.000 € jährliche Ersparnis pro Mitarbeitendem – bei gleichzeitig höherer Mitarbeiterbindung und mehr Wohlbefinden am Arbeitsplatz.

    [Mehr erfahren →](benefits/#business-impact)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Pendlerleistungen"
    title: "Fahrtnachweise automatisch erstellt"
    image: "images/home-de-benefits.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Von TeamWheels erstellte Fahrtnachweise für alle Mitfahrenden, mit Export für die Lohnabrechnung"
    content_position: "right"
    content: "Jede in Teams geteilte Fahrt wird erfasst: TeamWheels erstellt die Nachweise pro Mitarbeitendem für Ihre Pendlerleistungen und Ihr Scope-3-Reporting, ohne manuelle Eingabe.

    [Mehr erfahren →](benefits/#commuter-benefits)

    [Der umfassende Leitfaden zu Fahrgemeinschaften im Unternehmen (auf Englisch) →](/en/blog/corporate-carpooling-guide-2026/)
    "
    button:
      enable: false

  - enable: true
    anchor: "security"   # target of the proof strip security link
    subtitle: "Sicherheit & Compliance auf Enterprise-Niveau"
    title: "Eine sichere, von der IT freigegebene Mobilitätslösung für Mitarbeitende"
    image: "images/home-de-securite.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Anmeldung bei TeamWheels mit dem Microsoft-Arbeitskonto (SSO über Entra ID), Daten in Ihrem Tenant, Hosting in der EU"
    content_position: "left"
    content: "Veröffentlicht im Microsoft Teams Store mit einer [Microsoft 365 Publisher Attestation](https://learn.microsoft.com/de-de/microsoft-365-app-certification/teams/hmz-digital-teamwheels), Single Sign-on über Microsoft Entra ID und DSGVO-konform – TeamWheels erfüllt Sicherheitsstandards für Unternehmen, ohne zusätzliche Zugangsdaten oder Änderungen an der Infrastruktur.

    [Mehr erfahren →](benefits/#security)
    "
    button:
      enable: false

  - enable: true
    anchor: "fleet"
    subtitle: "Im Early Access"
    title: "Fuhrparkmanagement in Microsoft Teams"
    image: "images/home-de-flotte.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Buchung eines Poolfahrzeugs in Microsoft Teams mit TeamWheels, Kilometerstand und Erinnerungen an Fristen"
    content_position: "right"
    content: "Für KMU und öffentliche Einrichtungen mit 5 bis 30 Poolfahrzeugen, die noch in Excel verwaltet werden: Fahrzeug direkt im Teams-Chat buchen, Kilometerstand bei Rückgabe erfassen, Erinnerungen an Fristen und Kosten pro Fahrzeug. Ohne Telematikbox, ohne zusätzliche App.

    [Am Early Access teilnehmen →](contact/)
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
  subtitle: "Schließen Sie sich Unternehmen in ganz Europa und Nordamerika an, die ihre Scope-3-Emissionen senken und das Wohlbefinden ihrer Mitarbeitenden verbessern. <br><strong>Erster Monat kostenlos</strong> + begleitete Einführung inklusive. <em>Keine Kreditkarte erforderlich.</em>"
  button_label : "Begleitete Demo anfordern →"
  button_link : "contact/"
  image : "images/cta.png"

---
