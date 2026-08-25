{{- /*
  Renders a Hugo page as plain markdown for agents (Accept: text/markdown).
  Handles the structured frontmatter patterns used across the TeamWheels site:
  banner, image_and_content_blocks, fun_facts, work_process, pricing_card,
  testimonials, contact / contact_info / services, call_to_action, plus any
  raw body markdown (blog posts).
*/ -}}
{{- $p := . -}}
{{- $lang := .Lang -}}
{{- $homeURL := (absLangURL "") -}}
{{- $sitemapURL := printf "%ssitemap.xml" site.BaseURL -}}
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
{{- $btns := slice -}}
{{- with .button }}{{ if and .enable .link }}{{ $btns = $btns | append (dict "label" (.button_label | default .label) "link" .link) }}{{ end }}{{ end -}}
{{- with .secondary_button }}{{ if and .enable .link }}{{ $btns = $btns | append (dict "label" (.label | default .button_label) "link" .link) }}{{ end }}{{ end -}}
{{- with $btns }}{{ range . -}}
- **{{ .label | plainify | strings.TrimRight "→ " }}** → {{ .link | absLangURL }}
{{ end }}
{{ end -}}
{{- end -}}

{{- /* ─── Tool / landing page intro ─── */ -}}
{{- with .Params.intro_subtitle }}**{{ . | plainify }}**

{{ end -}}
{{- with .Params.intro_lede }}{{ . | plainify }}

{{ end -}}

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
{{ with .content -}}
{{- /* Normalise content:
        1. Trim leading/trailing whitespace on each line so YAML indentation
           doesn't flip bullet lists into 4-space code blocks.
        2. YAML folds single newlines to spaces and collapses blank-line
           separators, so any remaining `\n` in the parsed string was
           originally a paragraph/list break — promote each to a blank line
           so markdown renders paragraphs and lists correctly. */ -}}
{{- $lines := split . "\n" -}}
{{- $out := slice -}}
{{- range $lines -}}
{{- $out = $out | append (trim . " \t") -}}
{{- end -}}
{{- $joined := trim (delimit $out "\n") " \n\t" -}}
{{- $joined = replaceRE "\\n+" "\n\n" $joined -}}
{{ $joined }}

{{ end -}}
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
{{ with .features }}{{ trim . " \n\t" }}

{{ end -}}
{{- $ctas := slice -}}
{{- if and .free_trial_btn_label .free_trial_btn_link }}{{ $ctas = $ctas | append (dict "label" .free_trial_btn_label "link" .free_trial_btn_link) }}{{ end -}}
{{- if and .buy_now_btn_label .buy_now_btn_link }}{{ $ctas = $ctas | append (dict "label" .buy_now_btn_label "link" .buy_now_btn_link) }}{{ end -}}
{{- with $ctas }}{{ range . -}}
- **{{ .label | plainify | strings.TrimRight "→ " }}** → {{ .link | absLangURL }}
{{ end }}
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

{{- /* ─── FAQ ───
       Supports two front-matter shapes (same as seo/schema.html):
         1. Map shape (pricing-style):  faq: {enable, title, faq_list:[{title,content}]}
         2. Slice shape (per-page):     faq: [{question, answer}]
*/ -}}
{{- $faqItems := slice -}}
{{- $faqTitle := "FAQ" -}}
{{- $faqDesc := "" -}}
{{- with .Params.faq -}}
  {{- if reflect.IsMap . -}}
    {{- if .enable -}}
      {{- $faqTitle = .title | default "FAQ" -}}
      {{- $faqDesc = .description | default "" -}}
      {{- range (or .faq_list .faq_item) -}}
        {{- $faqItems = $faqItems | append (dict "q" (or .title .question) "a" (or .content .answer)) -}}
      {{- end -}}
    {{- end -}}
  {{- else if reflect.IsSlice . -}}
    {{- range . -}}
      {{- $q := or (index . "question") (index . "title") -}}
      {{- $a := or (index . "answer") (index . "content") -}}
      {{- if and $q $a -}}{{- $faqItems = $faqItems | append (dict "q" $q "a" $a) -}}{{- end -}}
    {{- end -}}
  {{- end -}}
{{- end -}}
{{- with $faqItems }}
## {{ $faqTitle | plainify }}

{{ with $faqDesc }}{{ . | plainify }}

{{ end -}}
{{ range . -}}
### {{ .q | plainify }}

{{ .a | plainify }}

{{ end -}}
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

{{ with .subtitle }}*{{ . | plainify }}*

{{ end -}}
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

{{- /* ─── Homepage blog teaser ─── */ -}}
{{- with .Params.blog }}
{{- if .enable }}
## {{ .title | default "From the blog" | plainify }}

{{ with .subtitle }}*{{ . | plainify }}*

{{ end -}}
{{ with .description }}{{ . | plainify }}

{{ end -}}
{{ $blog := site.GetPage (printf "/blog") -}}
{{ with $blog }}
{{ range first 5 (where .Pages "Section" "blog") -}}
- [{{ .Title | plainify }}]({{ .Permalink }}){{ with .Description }} — {{ . | plainify }}{{ end }}
{{ end }}
{{ end -}}
{{ with .button }}{{ if and .enable .link }}**{{ .label | plainify | strings.TrimRight "→ " }}** → {{ .link | absLangURL }}

{{ end }}{{ end -}}
{{- end -}}
{{- end -}}

{{- /* ─── Raw body content (blog posts, etc.) ─── */ -}}
{{- with .RawContent -}}
{{- /* The template already emits `# Title` from frontmatter, so strip a
       leading H1 from the body when it duplicates that title. */ -}}
{{- $body := . -}}
{{- $body = replaceRE "^\\s*#\\s+[^\\n]+\\n+" "" $body -}}
{{ $body }}

{{ end -}}

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


{{/* ─── Key links for agents (sitemap, translations, primary nav) ─── */}}
---

## Key links

- Canonical HTML: {{ .Permalink }}
- Sitemap: {{ $sitemapURL }}
{{- with .Translations }}
{{ range . -}}
- {{ .Language.Label }}: {{ .Permalink }}
{{ end -}}
{{- end }}
{{- if .IsHome }}
{{- $nav := slice "how-it-works" "pricing" "blog" "contact" -}}
{{- range $nav -}}
{{- with site.GetPage (printf "/%s" .) }}
- {{ .Title | plainify }}: {{ .Permalink }}
{{- end -}}
{{- end }}
{{ end }}
