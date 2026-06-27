# DNS for AI Discovery (DNS-AID) — Records to publish

Remediation for: *"DNS-AID well-known entrypoint records not found"*
(scanner: <https://isitagentready.com>).

These records are **not part of this repo's build/deploy** — the site is a Hugo
static build deployed via FTPS to `/public_html/`. DNS-AID records live in the
authoritative DNS **zone**, which for `teamwheelsapp.com` is hosted on Hetzner
(nameservers `ns1.your-server.de`, `ns.second-ns.com`, `ns3.second-ns.de`).
They must be added in **Hetzner Robot → DNS** (the zone-file editor for this
domain), then DNSSEC enabled. There is no DNS API token in this project, so this
step is manual.

Spec: draft-mozleywilliams-dnsop-dnsaid (SVCB only — no HTTPS/TYPE65) + RFC 9460.

---

## 1. The record (paste into the Hetzner zone editor)

Canonical organization entry point — `_index._agents` — pointing at the host that
already serves our agent surface (`/.well-known/agent-skills/`, `/.well-known/api-catalog`):

```zone
_index._agents.teamwheelsapp.com. 3600 IN SVCB 1 www.teamwheelsapp.com. alpn=h2,http/1.1 port=443 ipv4hint=78.46.0.142 mandatory=alpn,port
```

Notes:
- Only **standard** SvcParamKeys are used (`alpn`, `port`, `ipv4hint`, `mandatory`).
  The DNS-AID-specific params (`cap`, `well-known`, `policy`, …) have **no IANA
  numbers assigned yet** in the draft, so a public nameserver would reject them by
  name. Add them later (as `keyNNNNN=` generic form) only if you run an experiment.
- `ipv4hint` is optional and currently matches the apex A record (`78.46.0.142`).
  Drop it if the host IP may change.
- If Hetzner's editor rejects the native `SVCB` presentation form, it can be entered
  as an RFC 3597 generic record (`\# <len> <hex>`) instead — ask and I'll generate it.

### Optional — only if you actually run an A2A protocol endpoint
Do **not** publish this unless a real agent-to-agent endpoint exists; pointing
`alpn=a2a` at the static site would advertise a service that isn't there.

```zone
_a2a.agent.teamwheelsapp.com. 3600 IN SVCB 1 <a2a-host>. alpn=a2a,h2 port=443
```

## 2. Enable DNSSEC

The zone is currently **unsigned** (no DS record at the parent `.com`). The draft
says records SHOULD be DNSSEC-signed (MUST if TLSA is added).

1. Hetzner Robot → DNS → enable **DNSSEC** for `teamwheelsapp.com` (generates DNSKEY/DS).
2. Copy the generated **DS record** to the **domain registrar** (where the domain is
   registered) so the `.com` parent publishes it. DNSSEC is not active until the DS
   is at the parent.

## 3. Verify

```bash
# Record is published and resolvable:
dig +short SVCB _index._agents.teamwheelsapp.com

# DNSSEC chain (AD flag set = validated):
dig +dnssec _index._agents.teamwheelsapp.com | grep -E "flags:|RRSIG"
dig +short DS teamwheelsapp.com            # non-empty once DS is at the registrar

# Re-run the agent-readiness scanner:
curl -s https://isitagentready.com/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"https://www.teamwheelsapp.com"}' \
  | jq '.checks.discoverability.dnsAid'     # expect status: "pass"
```

DNS propagation can take up to the TTL (3600s) plus registrar processing for the DS.
