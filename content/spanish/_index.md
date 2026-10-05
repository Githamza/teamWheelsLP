---
title: "TeamWheels | Software de coche compartido para empresas en Microsoft Teams"
seoTitle: "Carpooling corporativo en Microsoft Teams | TeamWheels"
description: "Coche compartido para empresas en Microsoft Teams. Reduzca emisiones Scope 3, parking y costes de desplazamiento. Activo en 5 minutos. Prueba gratis 30 días."
keywords: "coche compartido para empresas, carpooling corporativo, carpooling empresarial, app de coche compartido para empleados, BlaBlaCar para empresas, Uber para empleados, app de Microsoft Teams, plataforma de gestión de desplazamientos, desplazamientos de empleados, software de carpooling para empresas, movilidad sostenible, plan de movilidad, informe de emisiones Scope 3, movilidad corporativa, viajes compartidos al trabajo"

# banner
banner:
  subtitle: "La confianza de equipos de RR. HH. y Sostenibilidad de toda Europa y Norteamérica"
  title: 'Coche compartido para empleados, integrado en <span class="teams-brand">Microsoft Teams</span>'
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
  uploadDate: "2026-07-13"
  duration: "PT1M1S"        # ISO 8601, para el JSON-LD VideoObject
  duration_seconds: 61      # segundos, para el sitemap de vídeo
  watch_page: "/demo/"                            # página del vídeo (destino del enlace)
  poster: "videos/teamwheels-demo-poster.jpg"   # fotograma mostrado antes de cargar el clip / miniatura del vídeo
  webm: "videos/teamwheels-demo.webm"
  mp4: "videos/teamwheels-demo.mp4"

# fun facts
fun_facts:
  enable: true
  title: "El coche compartido en la empresa, en cifras"
  fact_item:
  - icon: "fas fa-dollar-sign"
    counter: "2000"
    counter_suffix: "€"
    counter_prefix: ""
    content: "de ahorro anual por empleado gracias a los trayectos compartidos"

  - icon: "fas fa-parking"
    counter: "30"
    counter_suffix: "%"
    counter_prefix: ""
    content: "de reducción de la demanda de aparcamiento en las sedes corporativas"

  - icon: "fas fa-leaf"
    counter: "6"
    counter_suffix: " kg"
    counter_prefix: "-"
    content: "de CO₂ ahorrados por trayecto compartido: impacto Scope 3 medible"

  - icon: "fas fa-chart-line"
    counter: "10.6"
    counter_suffix: "%"
    counter_prefix: "+"
    content: "de crecimiento anual en la adopción del carpooling corporativo a nivel mundial"

# work_process
work_process:
  enable: true
  section: "how-it-works"

# image_and_content_block
image_and_content_blocks:
  - enable: true
    subtitle: "Por qué los responsables de RR. HH. y Sostenibilidad eligen TeamWheels"
    title: "Coche compartido para empleados, justo donde sus equipos ya trabajan"
    image: "images/why_use_teamWheels.png"
    content_position: "right"
    content: "TeamWheels es un software de carpooling corporativo que se integra de forma nativa en Microsoft Teams: sin apps adicionales ni gestión del cambio. Un administrador de Teams, unos pocos clics, y su programa de coche compartido está activo en 5 minutos, con más del 40 % de participación de la plantilla.

    [Descubra el software de carpooling corporativo →](/es/corporate-carpooling-software/) · [Más información →](benefits/#teams-integration)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Impacto ESG y de movilidad medible"
    title: "Reduzca las emisiones Scope 3 y los costes de aparcamiento, y retenga el talento"
    image: "images/photos/office-parking-lot.jpg"
    content_position: "left"
    content: "Menos desplazamientos en solitario significan reducciones de Scope 3 medibles, hasta un 30 % menos de demanda de aparcamiento y más de 2.000 € de ahorro anual por empleado, al tiempo que mejoran la retención y el bienestar en el trabajo.

    [Más información →](benefits/#business-impact)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Gestión sencilla de los beneficios de movilidad"
    title: "Programas de movilidad con ventajas fiscales e informes de movilidad sostenible"
    image: "images/photos/commute-reporting-dashboard.jpg"
    content_position: "right"
    content: "Automatice el seguimiento de los beneficios de transporte con ventajas fiscales (límite del IRS en EE. UU.: 340 $/mes), genere informes Scope 3 listos para CSRD/CDP y cumpla la normativa en Europa y Norteamérica, sin carga administrativa adicional.

    [Más información →](benefits/#commuter-benefits)

    [Guía completa del carpooling corporativo (en inglés) →](/en/blog/corporate-carpooling-guide-2026/)
    "
    button:
      enable: false

  - enable: true
    subtitle: "Seguridad y cumplimiento de nivel empresarial"
    title: "Una solución de movilidad para empleados segura y aprobada por TI"
    image: "images/why_use_teamWheels.png"
    content_position: "left"
    content: "Publicada en la Microsoft Teams Store con una [Microsoft 365 Publisher Attestation](https://learn.microsoft.com/es-es/microsoft-365-app-certification/teams/hmz-digital-teamwheels), SSO con Microsoft Entra ID y conforme al RGPD: TeamWheels cumple los estándares de seguridad empresariales sin credenciales adicionales ni cambios de infraestructura.

    [Más información →](benefits/#security)
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
