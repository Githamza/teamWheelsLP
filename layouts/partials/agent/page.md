{{- /*
  Renders a Hugo page as plain markdown for agents (Accept: text/markdown).
  Handles the structured frontmatter patterns used across the TeamWheels site:
  banner, image_and_content_blocks, fun_facts, work_process, pricing_card,
  testimonials, contact / contact_info / services, call_to_action, plus any
  raw body markdown (blog posts).
*/ -}}
{{- $p := . -}}
---
title: {{ .Title | plainify }}
{{- with .Description }}
description: {{ . | plainify }}
{{- end }}
url: {{ .Permalink }}
lang: {{ .Lang }}
{{- with .Params.keywords }}
keywords: {{ if reflect.IsSlice . }}{{ delimit . " " }}{{ else }}{{ . }}{{ end }}
{{- end }}
{{- if not .IsHome }}
{{- with .Date }}
date: {{ .Format "2006-01-02" }}
{{- end }}
{{- end }}
---

# {{ .Title | plainify }}

{{ with .Description }}> {{ . | plainify }}

{{ end -}}

{{- /* ─── Banner ─── */ -}}
{{- with .Params.banner }}
{{- with .subtitle }}**{{ . | plainify }}**

{{ end -}}
{{- with .title }}## {{ . | plainify }}

{{ end -}}
{{- with .description }}{{ . | plainify }}

{{ end -}}
{{- end -}}

{{- /* ─── Fun facts ─── */ -}}
{{- with .Params.fun_facts }}
{{- if .enable }}
## {{ .title | default "Key figures" | plainify }}

{{ range .fact_item -}}
- **{{ .counter_prefix }}{{ .counter }}{{ .counter_suffix }}** — {{ .content | plainify }}
{{ end }}
{{- end -}}
{{- end -}}

{{- /* ─── Work process ─── */ -}}
{{- with .Params.work_process }}
{{- if and .enable .process_item }}
## {{ .title | default "How it works" | plainify }}

{{ range $i, $step := .process_item -}}
{{ add $i 1 }}. **{{ .title | plainify }}** — {{ .content | plainify }}
{{ end }}
{{- end -}}
{{- end -}}

{{- /* ─── Image and content blocks (features / steps) ─── */ -}}
{{- with .Params.image_and_content_blocks }}
{{ range . -}}
{{- if .enable }}
## {{ .title | plainify }}

{{ with .subtitle }}*{{ . | plainify }}*

{{ end -}}
{{ .content }}

{{ end -}}
{{ end }}
{{- end -}}

{{- /* ─── Pricing ─── */ -}}
{{- with .Params.pricing }}
## {{ .title | default "Pricing" | plainify }}

{{ with .subtitle }}*{{ . | plainify }}*

{{ end -}}
{{- end -}}
{{- with .Params.pricing_card }}
{{ range . -}}
### {{ .name | plainify }} — {{ .currency }}{{ .price }}

{{ with .content }}{{ . | plainify }}

{{ end -}}
{{ with .features }}{{ . }}

{{ end -}}
{{ end -}}
{{- end -}}

{{- /* ─── Pricing calculator CTAs ─── */ -}}
{{- with .Params.pricing_calculator_cta }}
{{- if .enable }}
## {{ .title | plainify }}

{{ with .description }}{{ . | plainify }}

{{ end -}}
{{- end -}}
{{- end -}}

{{- /* ─── FAQ ─── */ -}}
{{- with .Params.faq }}
{{- if .enable }}
## {{ .title | default "FAQ" | plainify }}

{{ range .faq_item -}}
### {{ .title | plainify }}

{{ .content | plainify }}

{{ end -}}
{{- end -}}
{{- end -}}

{{- /* ─── Testimonials ─── */ -}}
{{- with .Params.testimonials }}
{{- if .enable }}
## {{ .title | default "Testimonials" | plainify }}

{{ range .reviews -}}
> {{ .content | plainify }}
>
> — **{{ .name | plainify }}**{{ with .designation }}, {{ . | plainify }}{{ end }}

{{ end -}}
{{- end -}}
{{- end -}}

{{- /* ─── Contact page fields ─── */ -}}
{{- with .Params.contact }}
## {{ .title | default "Contact" | plainify }}

{{ with .description }}{{ . | plainify }}

{{ end -}}
{{- end -}}
{{- with .Params.contact_info }}
{{- if .enable }}
### {{ .title | default "Get in touch" | plainify }}

{{ range .address_list -}}
- {{ . | plainify }}
{{ end }}
{{- end -}}
{{- end -}}
{{- with .Params.services }}
{{- if .enable }}
### {{ .title | plainify }}

{{ range .service_list -}}
- {{ . | plainify }}
{{ end }}
{{- end -}}
{{- end -}}

{{- /* ─── Raw body content (blog posts, etc.) ─── */ -}}
{{- with .RawContent }}
{{ . }}

{{- end -}}

{{- /* ─── Call to action ─── */ -}}
{{- with .Params.call_to_action }}
{{- if .enable }}
---

## {{ .title | plainify }}

{{ with .subtitle }}{{ . | plainify }}

{{ end -}}
{{ with .button_label }}**{{ . | plainify | strings.TrimRight "→ " }}**{{ with $.Params.call_to_action.button_link }} → {{ . | absLangURL }}{{ end }}

{{ end -}}
{{- end -}}
{{- end -}}

{{- /* ─── Next step button (homepage) ─── */ -}}
{{- with .Params.next_step_button }}
{{- if .enable }}
**{{ .label | plainify | strings.TrimRight "→ " }}** → {{ .link | absLangURL }}

{{ end -}}
{{- end }}
---

Canonical HTML version: {{ .Permalink }}
{{- with .Translations }}

Other languages:
{{ range . -}}
- [{{ .Language.LanguageName }}]({{ .Permalink }})
{{ end -}}
{{- end }}
