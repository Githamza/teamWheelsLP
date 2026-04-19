{{- /* Section list page as markdown for agents. */ -}}
---
title: {{ .Title | plainify }}
{{- with .Description }}
description: {{ . | plainify }}
{{- end }}
url: {{ .Permalink }}
lang: {{ .Lang }}
kind: {{ .Kind }}
---

# {{ .Title | plainify }}

{{ with .Description }}> {{ . | plainify }}

{{ end -}}

{{- with .RawContent }}{{ . }}

{{ end -}}

{{- with .Pages }}
## {{ i18n "recent_posts" | default "Pages" }}

{{ range . -}}
- [{{ .Title | plainify }}]({{ .Permalink }}){{ with .Description }} — {{ . | plainify }}{{ end }}
{{ end -}}
{{- end }}

---

Canonical HTML version: {{ .Permalink }}
