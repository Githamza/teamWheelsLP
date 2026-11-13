---
title: "TeamWheels | Corporate Carpooling Solution for Your Employees"
seoTitle: "Corporate carpooling for your employees | TeamWheels"
description: "Corporate carpooling solution: ride matching for employees, commuter benefit tracking and Scope 3 reporting. Built into Microsoft Teams, first month free."
# homepage = commercial head term "corporate carpooling" (a solution for employers);
# Teams/Copilot is the differentiator, not the headline. Other intents have their page:
#   software / tool / app → corporate-carpooling-software ; white label → white-label-carpool-platform
#   guide (informational) → blog/corporate-carpooling-guide-2026
keywords: "corporate carpooling, employee carpooling, corporate carpool program, carpooling for companies, employee rideshare, TeamWheels"

# banner
banner:
  # one-column hero: title + rotating Teams / Copilot logos + one line (mirrors FR)
  layout: "centered"
  announcement:   # pill → Microsoft Store listing (teams_app.marketplace_url)
    label: "New version"
    text: "View on the Microsoft Store"
  journey:        # isometric "without / with TeamWheels" animation
    enable: true
  title: "Corporate carpooling"
  title_accent: "built into the tools you use every day"   # gradient 2nd line, ends with the logos
  rotating_logos:   # exactly 2 (CSS animation is tuned for 2 logos)
  - src: "images/microsoft-teams-icon.svg"
    alt: "Microsoft Teams"
  - src: "images/microsoft-copilot-icon.svg"
    alt: "Microsoft Copilot"
  lede: "TeamWheels matches employees who share the same commute and runs your carpool program, from sign-up to commuter benefits."
  lede_logo: "images/logo.png"   # "TeamWheels" swapped for the logo
  # previous two-column texts, not shown in the centered layout
  subtitle: "Trusted by HR & Sustainability teams across the USA, UK & Canada"
  subtitle_link: "#proof"   # the hero line links to the proof strip under the hero
  description: "Reduce Scope 3 emissions, cut parking demand by 30%, and save employees $2,000/year — zero extra apps, deployed in 5 minutes."
  button:
    enable: true
    button_label: "Get a demo"
    icon: "fas fa-arrow-right"
    link: "contact/"
  secondary_button:
    enable: false   # replaced by the "Add to Microsoft Teams" CTA
    label: "Calculate your savings"
    icon: "fas fa-calculator"
    link: "blog/carpooling-savings-calculator-corporate-co2-roi-2026/"

  image: "images/teamwheels_demo_image.svg"

# brands
brands:
  enable: false
  title: "Secure & Compliant"
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
# content/english/launch-video.md.
launch_video:
  enable: true
  title: "TeamWheels — the AI carpooling agent inside Microsoft Teams"
  button_label: "Watch the launch video"
  watch_page: "/launch-video/"
  watch_page_label: "Open the launch video page"
  duration_seconds: 21
  poster: "videos/teamwheels-launch-en-poster.jpg"   # raster still of the SVG, shown in the player after the click
  mp4: "videos/teamwheels-launch-en.mp4"

# video demo — the full demo, in its own section directly under the hero.
# Same click-to-play poster (the <video> element is only created on click,
# so Google finds no video here); links to `watch_page`, the /demo/ page
# that carries the player, the VideoObject JSON-LD and the video sitemap
# entry. Keep this block in sync with content/english/demo.md.
video_demo:
  enable: true
  button_label: "See it in action"
  subtitle: "Product demo"
  title: "See TeamWheels in action"
  lede: "Ride matching, the conversational bot and the Scope 3 emissions dashboard, in one minute."
  # uploadDate / duration are kept here for parity with demo.md (structured
  # data is emitted on /demo/ only).
  description: "A 60-second walkthrough of TeamWheels — the employee carpooling and commute-management app that runs natively inside Microsoft Teams. See ride matching, the conversational bot, and the Scope 3 emissions dashboard in action."
  uploadDate: "2026-11-01"
  duration: "PT1M5S"        # ISO 8601, for VideoObject JSON-LD
  duration_seconds: 65      # plain seconds, for the video sitemap
  watch_page: "/demo/"                            # the video's watch page (link target)
  poster: "videos/teamwheels-demo-en-poster.jpg"   # still frame shown before the clip loads / video thumbnail
  webm: "videos/teamwheels-demo-en.webm"
  mp4: "videos/teamwheels-demo-en.mp4"

# why TeamWheels — comparison under the hero (partials/home-why.html),
# replaces the key figures (fun_facts, disabled below)
why_teamwheels:
  enable: true
  subtitle: "Comparison"
  title: "Why TeamWheels over another carpooling solution?"
  lede: "Corporate carpooling fails when nobody opens the app. TeamWheels is built natively into Microsoft Teams and Copilot, the tools your employees already use all day, so adoption follows. Explore our [corporate carpooling software](/en/corporate-carpooling-software/)."
  topic_label: "Criterion"
  them_label: "Typical carpooling solution"
  us_label: "TeamWheels"
  rows:
  - topic: "Access"
    them: "An app to download, an account and a password to create"
    us: "Already in Teams, Microsoft Entra ID single sign-on"
  - topic: "Rollout"
    them: "An IT project, a sign-up campaign, reminders"
    us: "One Teams admin, about 5 minutes, no IT project"
  - topic: "Adoption"
    them: "The app gets buried on the phone after a few weeks"
    us: "Notifications and an AI agent in the tool that's open all day"
  - topic: "Community"
    them: "Accounts to provision, then delete when employees leave"
    us: "Your Entra ID directory becomes the carpooler list, kept up to date automatically"
  - topic: "Data"
    them: "Your employees' data on an external platform"
    us: "In your Microsoft 365 tenant, data hosted in the EU, GDPR-compliant"
  - topic: "ESG reporting"
    them: "Exports to rework for Scope 3 and commuter-benefit reporting"
    us: "Scope 3 dashboard and commuter-benefit tracking, generated automatically"
  link:
    label: "Explore the corporate carpooling software"
    href: "corporate-carpooling-software/"

# strip under the comparison (steps + security line): hidden, the full
# "how it works" section follows right below
proof_strip:
  enable: false

# fun facts
fun_facts:
  enable: false   # replaced by why_teamwheels
  title: "Enterprise carpooling by the numbers"
  fact_item:
  - icon: "fas fa-dollar-sign"
    counter: "2,000"
    counter_suffix: ""
    counter_prefix: "$"
    content: "annual commuter savings per employee with shared rides"

  - icon: "fas fa-parking"
    counter: "30"
    counter_suffix: "%"
    counter_prefix: ""
    content: "reduction in parking demand at corporate campuses"

  - icon: "fas fa-leaf"
    counter: "6"
    counter_suffix: " kg"
    counter_prefix: "-"
    content: "CO₂ saved per shared commute — measurable Scope 3 impact"

  - icon: "fas fa-chart-line"
    counter: "10.6"
    counter_suffix: "%"
    counter_prefix: "+"
    content: "annual growth in corporate carpooling adoption worldwide"

# work_process — homepage-only steps, from the employer's side (partials/home-steps.html).
# Without `process_item` the homepage would reuse the steps of how-it-works.md; keep the title different from that page's.
work_process:
  enable: true
  section: "how-it-works"   # target of the "See how it works in detail" button
  subtitle: "Setup"
  title: "Launch your carpool program in under a week"
  link_label: "See how it works in detail"
  process_item:
    - label: "Day 1"
      title: "Install"
      image: "images/how-it-works/home-en-step-1.svg"
      image_alt: "TeamWheels added from the Microsoft Teams Store, with SSO sign-in and the free first month activated"
      content: "Your Microsoft 365 admin adds TeamWheels in 5 minutes. No app to download: employees sign in with their work account. The free first month starts at installation."
    - label: "Week 1"
      title: "Launch"
      image: "images/how-it-works/home-en-step-2.svg"
      image_alt: "The TeamWheels agent suggests a carpool on an employee's commute"
      content: "Employees enter their commutes in Teams or tell the Copilot agent. TeamWheels automatically suggests carpools between colleagues on the same route."
    - label: "Month 1"
      title: "Track"
      image: "images/how-it-works/home-en-step-3.svg"
      image_alt: "TeamWheels dashboard: shared rides, CO₂ avoided, parking spaces freed and commute reports"
      content: "Follow shared rides, CO₂ avoided and parking spaces freed. Per-employee commute reports are ready for your commuter benefits."

# image_and_content_block
image_and_content_blocks:
  - enable: true
    subtitle: "Why HR & Sustainability Leaders Choose TeamWheels"
    subtitle_link: "benefits/"
    title: "Adopted by Your Employees, Thanks to Microsoft Teams and Copilot"
    image: "images/home-en-adoption-teams-copilot.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "TeamWheels in Microsoft Teams suggests a carpool to an employee, and Copilot finds colleagues on the same commute"
    content_position: "right"
    content: "TeamWheels is a [corporate carpooling tool](/en/corporate-carpooling-software/) that integrates natively with Microsoft Teams — no extra app, no change management. One Teams admin, a few clicks, and your carpool program is live in 5 minutes with 40%+ employee participation.

    [Read more →](benefits/#teams-integration)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Measurable ESG & Commute Impact"
    title: "Cut Scope 3 Emissions, Reduce Parking Costs, Retain Top Talent"
    image: "images/home-en-rse.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "TeamWheels ESG report: CO₂ avoided through carpooling (Scope 3, category 7), parking spaces freed and report export"
    content_position: "left"
    content: "Fewer solo commutes mean measurable Scope 3 reductions, up to 30% less parking demand, and $2,000+ in annual savings per employee — while boosting retention and workplace well-being.

    [Read more →](benefits/#business-impact)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Commuter Benefits"
    title: "Commute Reports Generated Automatically"
    image: "images/home-en-benefits.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Per-employee commute reports generated by TeamWheels for every carpooler, with export for payroll"
    content_position: "right"
    content: "Every ride shared in Teams is logged: TeamWheels produces the per-employee trip reports you need to run commuter benefits and Scope 3 reporting, with no manual entry.

    [Read more →](benefits/#commuter-benefits)

    [Complete corporate carpooling guide →](/en/blog/corporate-carpooling-guide-2026/)
    "
    button:
      enable: false

  - enable: true
    anchor: "security"   # target of the proof strip security link
    subtitle: "Enterprise Security & Compliance"
    title: "A Secure, IT-Approved Employee Mobility Solution"
    image: "images/home-en-securite.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Sign-in to TeamWheels with a Microsoft work account (Entra ID SSO), data in your tenant, hosted in the EU"
    content_position: "left"
    content: "Published on the Microsoft Teams Store with a [Microsoft 365 Publisher Attestation](https://learn.microsoft.com/en-us/microsoft-365-app-certification/teams/hmz-digital-teamwheels), Microsoft Entra ID SSO, data hosted in the EU, GDPR compliant — TeamWheels meets enterprise security standards with zero extra credentials or infrastructure changes. It runs in your Microsoft 365 tenant and is available across Europe and North America.

    [Read more →](benefits/#security)
    "
    button:
      enable: false

  - enable: true
    anchor: "fleet"
    subtitle: "Early access"
    title: "Fleet Management in Microsoft Teams"
    image: "images/home-en-flotte.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Booking a pool car in Microsoft Teams with TeamWheels, mileage log and due-date alerts"
    content_position: "right"
    content: "For SMEs and public bodies with 5 to 30 pool vehicles still managed in Excel: book a vehicle from the Teams chat, log the mileage on return, get due-date alerts and the cost per vehicle. No tracker box, no extra app.

    [Join the early access →](contact/)
    "
    button:
      enable: false


# FAQ — rendered under the "how it works" button (partials/faq-section.html,
# called from the theme index.html) and emitted as FAQPage JSON-LD.
faq_title: "Corporate carpooling FAQ"
faq:
  - question: "Does TeamWheels require Microsoft 365?"
    answer: "Yes. TeamWheels is a Microsoft Teams app: it installs from the Microsoft Teams Store into your Microsoft 365 tenant, and employees use it in Teams on desktop, web and mobile. If your organization does not use Microsoft 365, another carpooling solution will suit you better."
  - question: "How do employees sign in?"
    answer: "With their existing Microsoft 365 work account, through Microsoft Entra ID single sign-on. There is no new app to download and no password to create, and your Entra ID directory becomes the carpooler list, updated automatically when people join or leave."
  - question: "Where is employee data hosted?"
    answer: "TeamWheels runs in your Microsoft 365 tenant and its data is hosted in the EU (France). The platform is GDPR compliant and built with privacy by design."
  - question: "Which countries is TeamWheels available in?"
    answer: "TeamWheels is available across Europe and North America. Companies in the USA, UK and Canada run it today, the app is localized for France, Belgium, the Netherlands, Germany and Spain, and French employers get ready-made records for the Forfait Mobilités Durables."
  - question: "How long does it take to launch a carpool program?"
    answer: "About 5 minutes for the installation by a Microsoft 365 admin, then a two- to four-week pilot with 20 to 50 volunteers before you open it to everyone."

# blog
blog:
  enable: true
  subtitle: "Resources for HR & Sustainability Leaders"
  title: "Employee Commute & Corporate Carpooling Insights"
  description: "Practical guides on corporate carpooling programs, Scope 3 reduction, and commuter benefits for HR & Sustainability leaders."

  button:
    enable: true
    link: "blog/"
    label: "View all articles →"

next_step_button:
  enable: true
  link: "how-it-works/"
  label: "See how it works →"


# call_to_action
call_to_action:
  enable: true
  title: "Launch an Employee Carpooling Program in Your Organization"
  subtitle: "Join companies across the USA, UK, Canada and Europe reducing Scope 3 emissions and improving employee well-being. <br><strong>First month free</strong> + guided deployment included. <em>No credit card required.</em>"
  button_label : "Get a guided demo →"
  button_link : "contact/"
  image : "images/cta.png"

---
