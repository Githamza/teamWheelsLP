# Runbook — allowlist `OpenSEO-Audit` in the WAF

**Why:** since 2026-10-10 the weekly OpenSEO site audit stops after 1 page with
`blocked-page` / HTTP 403 on `https://www.teamwheelsapp.com/fr/` (and `/nl-be/`).
Last full crawl: 2026-10-19 09:24 UTC (80 pages); the scheduled 06:1x UTC runs on
10-12, 10-19, 10-26 and 11-02 were all blocked. That's about 4 weeks without technical SEO coverage.

**Where the block is:** not in this repo. `static/.htaccess` has no UA, `[F]`,
`Deny` or `Require` rule. The site is a static Hugo build pushed over FTPS to an
Apache shared host (`.github/workflows/deploy.yml`), so the 403 comes from the
host's bot protection (ModSecurity / Imunify360 / Cloudflare if proxied).
A full run passing at 09:24 while the 06:24 run the same day was blocked points to
reputation or rate-based bot blocking, not a static rule.

## Steps (≈5 min, in the hosting control panel)

Allowlist the user agent containing **`OpenSEO-Audit`** in whichever layer is active:

- **Cloudflare (if DNS is proxied, orange cloud):** Security → WAF → Custom rules →
  create rule: `(http.user_agent contains "OpenSEO-Audit")` → action **Skip** → tick
  all remaining custom rules, rate limiting, managed rules and Super Bot Fight Mode.
  Place it first.
- **cPanel + Imunify360:** Imunify360 → Firewall → Whitelist (or ask support to
  whitelist the UA `OpenSEO-Audit` / OpenSEO crawler IPs from https://openseo.so/docs/crawler).
- **cPanel ModSecurity:** ModSecurity → disable it for `www.teamwheelsapp.com` only
  if the host offers no per-UA exception; otherwise open a support ticket asking for
  a ModSecurity exception for UA `OpenSEO-Audit`. (ModSecurity rules cannot be set from
  `.htaccess` on this host.)

## Verify

1. Re-run the audit from OpenSEO (or ask Claude: "relance l'audit OpenSEO").
2. Pass = more than 50 pages crawled and no `blocked-page` issue.
3. Check the next scheduled Monday 06:1x UTC run too, since the block was intermittent.

`static/robots.txt` explicitly allows `OpenSEO-Audit`. That documents intent only; it
does not lift a WAF 403.
