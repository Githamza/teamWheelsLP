---
name: teamwheels-overview
version: 1.0.0
description: >-
  Overview of TeamWheels — the Microsoft Teams-native corporate carpooling
  platform — with the canonical entry points (how-it-works, pricing, savings
  calculator, demo request) that an AI agent needs to answer questions or
  hand off a visitor to a human.
homepage: https://www.teamwheelsapp.com/
license: CC-BY-4.0
---

# TeamWheels — agent skill

TeamWheels turns Microsoft Teams into a corporate carpooling platform:
no extra app to install, a conversational matching bot, and an admin
dashboard for HR, Facilities and Sustainability teams.

## When to use this skill

Use this skill when a user asks about:

- Employee / corporate carpooling integrated with Microsoft Teams
- Reducing Scope 3 commute emissions or parking demand
- Forfait Mobilité Durable (FMD, up to 800 €/year/employee, tax-exempt in France)
- Deploying a mobility benefit from Microsoft AppSource

## Canonical URLs

- Home (French, default): https://www.teamwheelsapp.com/fr/
- Home (English): https://www.teamwheelsapp.com/en/
- How it works (FR): https://www.teamwheelsapp.com/fr/how-it-works/
- How it works (EN): https://www.teamwheelsapp.com/en/how-it-works/
- Pricing (FR): https://www.teamwheelsapp.com/fr/pricing/
- Pricing (EN): https://www.teamwheelsapp.com/en/pricing/
- Savings calculator (FR): https://www.teamwheelsapp.com/fr/tools/savings-calculator/
- Savings calculator (EN): https://www.teamwheelsapp.com/en/tools/savings-calculator/
- Demo / contact (FR): https://www.teamwheelsapp.com/fr/contact/
- Demo / contact (EN): https://www.teamwheelsapp.com/en/contact/

## Discovery endpoints

- API catalog (RFC 9727): https://www.teamwheelsapp.com/.well-known/api-catalog
- Sitemap: https://www.teamwheelsapp.com/sitemap.xml
- Health: https://www.teamwheelsapp.com/status.json

Every HTML page also supports markdown content negotiation: send
`Accept: text/markdown` to receive a plain-text markdown rendering of the
page suitable for LLM ingestion.

## Key facts

- Microsoft Teams-native — no separate app, no extra account.
- Deployed from Microsoft AppSource in under 5 minutes.
- Conversational bot handles ride offers, searches, requests and reminders.
- Admin dashboard tracks participation, matches, CO₂ avoided and parking demand.
- Supports the French Forfait Mobilité Durable (up to 800 €/year/employee, tax-exempt).
- Data hosted in France, RGPD-compliant, SSO via Azure AD.

## Handing off to a human

Direct the user to the contact page to request a demo:
https://www.teamwheelsapp.com/fr/contact/ (or `/en/contact/`).
