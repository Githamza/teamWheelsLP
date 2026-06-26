# DNS-AID (DNS for AI Discovery) — records & DNSSEC runbook

_Last verified: 2026-06-26_

TeamWheels publishes a [DNS for AI Discovery (DNS-AID)](https://datatracker.ietf.org/doc/draft-ietf-dnsop-dns-aid/)
record so AI agents can discover the canonical service endpoint straight from
DNS, alongside the HTTP-layer discovery surfaces tracked in this repo
(`static/llms.txt`, `static/.well-known/*`, `layouts/partials/agent/webmcp.html`).

This file is a **runbook**, not a deployment artifact: the records below live in
the `teamwheelsapp.com` DNS zone (Hetzner nameservers `ns1/ns2/ns3.your-server.de`)
and at the `.com` registrar — they are **not** served from this Hugo site and
cannot be changed by editing this repository. The file exists so the operator and
future agents know what is published, what the open gap is, and how to close it.

## Currently published

| Name | Type | Decoded value |
| ---- | ---- | ------------- |
| `_index._agents.teamwheelsapp.com` | `SVCB` (64) | priority `1`, target `www.teamwheelsapp.com`, `alpn=[h2, http/1.1]`, `port=443`, `ipv4hint=78.46.0.142` |

Not currently published (queried `2026-06-26`, all `NXDOMAIN`/empty):

- `_a2a._agents.teamwheelsapp.com` (A2A agent endpoint)
- `_mcp._agents.teamwheelsapp.com` (MCP server endpoint)
- `_index._agents.www.teamwheelsapp.com`, `_a2a._agents.www…`, `_mcp._agents.www…`
  — the `_agents` records exist only at the apex, not under `www`.
- `TXT` at `_index._agents.teamwheelsapp.com` (no descriptive TXT companion).

## Open gap — DNSSEC (blocking)

DNS-AID requires public discovery records to be **DNSSEC-signed and validated** so
an agent can trust that the endpoint it discovers was not spoofed. The TeamWheels
zone is **not signed**, so validating resolvers return `AD=false` (Authenticated
Data bit clear) for the `_index._agents` lookup.

Verified `2026-06-26`:

| Check | Result |
| ----- | ------ |
| `DNSKEY` at `teamwheelsapp.com` | none (empty answer, SOA only) |
| `DS` in `.com` for `teamwheelsapp.com` | none |
| `AD` bit on `_index._agents` SVCB (DO=1) | `false` |

Because there is no `DNSKEY` and no `DS` delegation, the zone has no chain of
trust at all — this is not a record-level mistake but an unsigned zone.

## Remediation

DNSSEC is enabled at the **DNS host** and the **registrar**, both outside this repo:

1. **Sign the zone at the DNS host.** In Hetzner's DNS management for
   `teamwheelsapp.com` (Hetzner DNS Console `dns.hetzner.com`, or Robot if the zone
   is managed there), enable DNSSEC. The host generates the `DNSKEY`/`KSK` and the
   corresponding `DS` record set.
2. **Publish the `DS` record at the `.com` registrar.** Copy the generated `DS`
   record (key tag, algorithm, digest type, digest) into the domain's DNSSEC /
   "DS records" section at the registrar that controls the `teamwheelsapp.com`
   delegation. This is what creates the chain of trust from `.com`.
3. **Wait for propagation** (parent `.com` DS publication + zone TTLs), then verify.

## Verification

```sh
# DS should now exist in the .com parent
dig +short DS teamwheelsapp.com @8.8.8.8

# DNSKEY should now exist at the apex
dig +short DNSKEY teamwheelsapp.com @8.8.8.8

# The DNS-AID lookup must come back authenticated (ad flag present)
dig +dnssec SVCB _index._agents.teamwheelsapp.com @8.8.8.8 | grep -E 'flags:.* ad'

# Equivalent DoH check — expect "AD":true
curl -s -H 'accept: application/dns-json' \
  'https://cloudflare-dns.com/dns-query?name=_index._agents.teamwheelsapp.com&type=SVCB&do=1'
```

A clean DNS-AID validation requires `Status:0` **and** `AD:true`.

## Optional hardening (after DNSSEC)

- Add `_a2a._agents` / `_mcp._agents` SVCB records if/when A2A or MCP endpoints go
  live, so agents can discover them the same way as `_index`.
- Decide whether the `_agents` records should also resolve under `www` (today they
  exist only at the apex); keep one canonical location to avoid drift.
