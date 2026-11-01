---
title: "TeamWheels | Coche compartido para empresas y sus empleados"
seoTitle: "Coche compartido para empresas y empleados | TeamWheels"
description: "Coche compartido para empresas: emparejamiento de empleados, justificantes de trayectos e informes Scope 3. En Microsoft Teams, prueba gratis 30 días."
# portada = término comercial principal «coche compartido para empresas» (solución para empleadores);
# Teams/Copilot = argumento diferenciador, no el titular. Software / app → corporate-carpooling-software
keywords: "coche compartido para empresas, carpooling empresas, carpooling corporativo, coche compartido empleados, programa de coche compartido, TeamWheels"

# banner
banner:
  # one-column hero: title + rotating Teams / Copilot logos + one line (mirrors FR)
  layout: "centered"
  announcement:   # pill → Microsoft Store listing (teams_app.marketplace_url)
    label: "Nueva versión"
    text: "Ver en Microsoft Store"
  journey:        # isometric "without / with TeamWheels" animation
    enable: true
  title: "El coche compartido en la empresa"
  title_accent: "integrado en sus herramientas de cada día"   # gradient 2nd line, ends with the logos
  rotating_logos:   # exactly 2 (CSS animation is tuned for 2 logos)
  - src: "images/microsoft-teams-icon.svg"
    alt: "Microsoft Teams"
  - src: "images/microsoft-copilot-icon.svg"
    alt: "Microsoft Copilot"
  lede: "TeamWheels conecta a los empleados que hacen el mismo trayecto y gestiona su programa de coche compartido, desde la inscripción hasta los beneficios de movilidad."
  lede_logo: "images/logo.png"   # "TeamWheels" swapped for the logo
  # previous two-column texts, not shown in the centered layout
  subtitle: "La confianza de equipos de RR. HH. y Sostenibilidad de toda Europa y Norteamérica"
  subtitle_link: "#proof"   # the hero line links to the proof strip under the hero
  description: "Reduzca las emisiones Scope 3, disminuya un 30 % la demanda de aparcamiento y ahorre a cada empleado 2.000 €/año — sin apps adicionales, desplegado en 5 minutos."
  button:
    enable: true
    button_label: "Solicitar una demo"
    icon: "fas fa-arrow-right"
    link: "contact/"
  secondary_button:
    enable: false   # sustituido por el CTA «Añadir a Microsoft Teams»
    label: "Calcule su ahorro"
    icon: "fas fa-calculator"
    link: "https://www.teamwheelsapp.com/en/blog/carpooling-savings-calculator-corporate-co2-roi-2026/"

  image: "images/teamwheels_demo_image.svg"

# brands
brands:
  enable: false
  title: "Seguro y conforme a la normativa"
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

# launch video — columna derecha del hero. Su miniatura es el SVG animado de
# `banner.image` (cómo funciona el emparejamiento) con un botón de reproducción;
# el <video> solo se crea al hacer clic. Indexado desde `watch_page`
# (/launch-video/: reproductor, JSON-LD VideoObject, entrada del sitemap de
# vídeo). Mantener sincronizado con content/spanish/launch-video.md.
launch_video:
  enable: true
  title: "TeamWheels — el agente de IA de coche compartido dentro de Microsoft Teams"
  button_label: "Ver el vídeo de lanzamiento"
  watch_page: "/launch-video/"
  watch_page_label: "Abrir la página del vídeo de lanzamiento"
  duration_seconds: 21
  poster: "videos/teamwheels-launch-en-poster.jpg"   # imagen fija del SVG, mostrada en el reproductor tras el clic
  mp4: "videos/teamwheels-launch-en.mp4"

# video demo — la demo completa, en su propia sección justo debajo del hero.
# Mismo póster de clic para reproducir (el elemento <video> solo se crea al
# hacer clic, por lo que Google no encuentra ningún vídeo aquí); enlaza a
# `watch_page`, la página /demo/ que contiene el reproductor, el JSON-LD
# VideoObject y la entrada del sitemap de vídeo. Mantener sincronizado con
# content/spanish/demo.md.
video_demo:
  enable: true
  button_label: "Véalo en acción"
  subtitle: "Demo del producto"
  title: "Vea TeamWheels en acción"
  lede: "Emparejamiento de trayectos, el bot conversacional y el panel de emisiones Scope 3, en un minuto."
  # uploadDate / duration se mantienen aquí por paridad con demo.md (los datos
  # estructurados solo se emiten en /demo/).
  description: "Un recorrido de 60 segundos por TeamWheels, la app de coche compartido y gestión de desplazamientos de empleados que funciona de forma nativa dentro de Microsoft Teams. Vea en acción el emparejamiento de trayectos, el bot conversacional y el panel de emisiones Scope 3."
  uploadDate: "2026-11-01"
  duration: "PT1M5S"        # ISO 8601, para el JSON-LD VideoObject
  duration_seconds: 65      # segundos, para el sitemap de vídeo
  watch_page: "/demo/"                            # página del vídeo (destino del enlace)
  poster: "videos/teamwheels-demo-es-poster.jpg"   # fotograma mostrado antes de cargar el clip / miniatura del vídeo
  webm: "videos/teamwheels-demo-es.webm"
  mp4: "videos/teamwheels-demo-es.mp4"

# why TeamWheels — comparison under the hero (partials/home-why.html),
# replaces the key figures (fun_facts, disabled below)
why_teamwheels:
  enable: true
  subtitle: "Comparativa"
  title: "¿Por qué TeamWheels y no otra solución de coche compartido?"
  lede: "El coche compartido en la empresa fracasa cuando nadie abre la app. TeamWheels está integrado de forma nativa en Microsoft Teams y Copilot, las herramientas que sus empleados ya usan todo el día: la adopción llega sola. Descubra nuestro [software de carpooling corporativo](/es/corporate-carpooling-software/)."
  topic_label: "Criterio"
  them_label: "Solución de coche compartido clásica"
  us_label: "TeamWheels"
  rows:
  - topic: "Acceso"
    them: "Una app que descargar, una cuenta y una contraseña que crear"
    us: "Ya está en Teams, inicio de sesión único con Microsoft Entra ID"
  - topic: "Despliegue"
    them: "Proyecto de TI, campaña de registro, recordatorios"
    us: "Un administrador de Teams, unos 5 minutos, sin proyecto de TI"
  - topic: "Adopción"
    them: "A las pocas semanas, la app queda olvidada en el móvil"
    us: "Notificaciones y agente de IA en la herramienta abierta todo el día"
  - topic: "Comunidad"
    them: "Cuentas que dar de alta y luego de baja cuando un empleado se va"
    us: "Su directorio de Entra ID se convierte en la lista de participantes, actualizada automáticamente"
  - topic: "Datos"
    them: "Los datos de sus empleados en una plataforma externa"
    us: "En su tenant de Microsoft 365, datos alojados en la UE, conforme al RGPD"
  - topic: "Informes ESG"
    them: "Exportaciones que hay que reelaborar para el Scope 3"
    us: "Panel de Scope 3 e informes listos para CSRD, generados automáticamente"
  link:
    label: "Descubra el software de carpooling corporativo"
    href: "corporate-carpooling-software/"

# strip under the comparison (steps + security line): hidden, the full
# "how it works" section follows right below
proof_strip:
  enable: false

# fun facts
fun_facts:
  enable: false   # replaced by why_teamwheels
  title: "El coche compartido en la empresa, en cifras"
  fact_item:
  - icon: "fas fa-dollar-sign"
    counter: "2000"
    counter_suffix: " €"
    counter_prefix: ""
    content: "de ahorro anual por empleado gracias a los trayectos compartidos"

  - icon: "fas fa-parking"
    counter: "30"
    counter_suffix: " %"
    counter_prefix: ""
    content: "de reducción de la demanda de aparcamiento en las sedes corporativas"

  - icon: "fas fa-leaf"
    counter: "6"
    counter_suffix: " kg"
    counter_prefix: "-"
    content: "de CO₂ ahorrados por trayecto compartido: impacto Scope 3 medible"

  - icon: "fas fa-chart-line"
    counter: "10,6"
    counter_suffix: " %"
    counter_prefix: "+"
    content: "de crecimiento anual en la adopción del carpooling corporativo a nivel mundial"

# work_process — homepage-only steps, from the employer's side (partials/home-steps.html).
# Sin `process_item`, la portada mostraría los pasos de how-it-works.md; no repetir el título de esa página.
work_process:
  enable: true
  section: "how-it-works"   # target of the "Ver el funcionamiento en detalle" button
  subtitle: "Puesta en marcha"
  title: "Lance su programa de coche compartido en menos de una semana"
  link_label: "Ver el funcionamiento en detalle"
  process_item:
    - label: "Día 1"
      title: "Instale"
      image: "images/how-it-works/home-es-step-1.svg"
      image_alt: "TeamWheels agregado desde la Microsoft Teams Store, con inicio de sesión SSO y prueba gratuita activada"
      content: "Su administrador de Microsoft 365 agrega TeamWheels en 5 minutos. Sin app que descargar: sus empleados inician sesión con su cuenta profesional. La prueba gratuita empieza con la instalación."
    - label: "Semana 1"
      title: "Lance"
      image: "images/how-it-works/home-es-step-2.svg"
      image_alt: "El agente de TeamWheels propone a una empleada un coche compartido en su trayecto al trabajo"
      content: "Sus empleados indican sus trayectos en Teams o al agente de Copilot. TeamWheels propone automáticamente coches compartidos entre compañeros que hacen el mismo recorrido."
    - label: "Mes 1"
      title: "Supervise"
      image: "images/how-it-works/home-es-step-3.svg"
      image_alt: "Panel de TeamWheels: trayectos compartidos, CO₂ evitado, plazas de aparcamiento liberadas y justificantes"
      content: "Siga los trayectos compartidos, el CO₂ evitado y las plazas de aparcamiento liberadas. Los justificantes por empleado están listos para sus beneficios de movilidad."

# image_and_content_block
image_and_content_blocks:
  - enable: true
    subtitle: "Por qué los responsables de RR. HH. y Sostenibilidad eligen TeamWheels"
    subtitle_link: "benefits/"
    title: "Adoptado por sus empleados gracias a Microsoft Teams y Copilot"
    image: "images/home-es-adoption-teams-copilot.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "TeamWheels en Microsoft Teams propone un coche compartido a una empleada y Copilot encuentra compañeros con el mismo trayecto"
    content_position: "right"
    content: "TeamWheels es una [herramienta de carpooling corporativo](/es/corporate-carpooling-software/) que se integra de forma nativa en Microsoft Teams: sin apps adicionales ni gestión del cambio. Un administrador de Teams, unos pocos clics, y su programa de coche compartido está activo en 5 minutos, con más del 40 % de participación de la plantilla.

    [Más información →](benefits/#teams-integration)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Impacto ESG y de movilidad medible"
    title: "Reduzca las emisiones Scope 3 y los costes de aparcamiento, y retenga el talento"
    image: "images/home-es-rse.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Informe ESG de TeamWheels: CO₂ evitado con el coche compartido (Scope 3, categoría 7), plazas liberadas y exportación CSRD"
    content_position: "left"
    content: "Menos desplazamientos en solitario significan reducciones de Scope 3 medibles, hasta un 30 % menos de demanda de aparcamiento y más de 2.000 € de ahorro anual por empleado, al tiempo que mejoran la retención y el bienestar en el trabajo.

    [Más información →](benefits/#business-impact)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Beneficios de movilidad"
    title: "Justificantes de trayectos generados automáticamente"
    image: "images/home-es-benefits.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Justificantes de trayectos generados por TeamWheels para cada empleado que comparte coche, con exportación a nóminas"
    content_position: "right"
    content: "Cada trayecto compartido en Teams queda registrado: TeamWheels genera los justificantes por empleado para sus beneficios de movilidad y sus informes Scope 3, sin introducir datos a mano.

    [Más información →](benefits/#commuter-benefits)

    [Guía completa del carpooling corporativo (en inglés) →](/en/blog/corporate-carpooling-guide-2026/)
    "
    button:
      enable: false

  - enable: true
    anchor: "security"   # target of the proof strip security link
    subtitle: "Seguridad y cumplimiento de nivel empresarial"
    title: "Una solución de movilidad para empleados segura y aprobada por TI"
    image: "images/home-es-securite.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Inicio de sesión en TeamWheels con la cuenta profesional de Microsoft (SSO con Entra ID), datos en su tenant, alojados en la UE"
    content_position: "left"
    content: "Publicada en la Microsoft Teams Store con una [Microsoft 365 Publisher Attestation](https://learn.microsoft.com/es-es/microsoft-365-app-certification/teams/hmz-digital-teamwheels), SSO con Microsoft Entra ID y conforme al RGPD: TeamWheels cumple los estándares de seguridad empresariales sin credenciales adicionales ni cambios de infraestructura.

    [Más información →](benefits/#security)
    "
    button:
      enable: false

  - enable: true
    anchor: "fleet"
    subtitle: "En acceso anticipado"
    title: "Gestión de flotas en Microsoft Teams"
    image: "images/home-es-flotte.png"
    image_fit: true   # product mockup: full-width image, no padding
    image_alt: "Reserva de un vehículo de empresa en Microsoft Teams con TeamWheels, registro de kilometraje y avisos de vencimientos"
    content_position: "right"
    content: "Para pymes y administraciones públicas con 5 a 30 vehículos de empresa que aún se gestionan en Excel: reserva del vehículo desde el chat de Teams, registro del kilometraje a la vuelta, avisos de vencimientos y coste por vehículo. Sin dispositivos de rastreo ni apps adicionales.

    [Unirse al acceso anticipado →](contact/)
    "
    button:
      enable: false


# blog
blog:
  enable: true
  subtitle: "Recursos para responsables de RR. HH. y Sostenibilidad"
  title: "Ideas sobre desplazamientos de empleados y carpooling corporativo"
  description: "Guías prácticas sobre programas de coche compartido en la empresa, reducción de Scope 3 y beneficios de movilidad para responsables de RR. HH. y Sostenibilidad."

  button:
    enable: true
    link: "https://www.teamwheelsapp.com/en/blog/"
    label: "Ver todos los artículos →"

next_step_button:
  enable: true
  link: "how-it-works/"
  label: "Vea cómo funciona →"


# call_to_action
call_to_action:
  enable: true
  title: "Ponga en marcha un programa de coche compartido en su organización"
  subtitle: "Únase a las empresas de toda Europa y Norteamérica que ya reducen sus emisiones Scope 3 y mejoran el bienestar de sus empleados. <br><strong>Prueba gratuita de 30 días</strong> + despliegue guiado incluido. <em>Sin tarjeta de crédito.</em>"
  button_label : "Solicitar una demo guiada →"
  button_link : "contact/"
  image : "images/cta.png"

---
