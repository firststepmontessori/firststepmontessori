# Decisions and assumptions

- Status: Active decision register
- Audience: School owner, product owner and technical maintainers
- Owner: Project owner
- Last updated: 2026-08-30

## Confirmed decisions

- Astro with TypeScript runs on Cloudflare Workers.
- One codebase compiles into Garden and Geometry previews; only one becomes production.
- Preact is limited to the protected admin island.
- D1 stores bounded JSON drafts, immutable revisions and audit records.
- Cloudflare Access protects staff routes.
- System is the default colour preference with local Light/Night overrides.
- Animation is subtle, non-blocking and reduced-motion safe.
- Version one contains no photography, media placeholders or upload path.
- Parents contact the school through direct links, not a public form.
- Preview deployments never enter search indexes.

## Working assumptions

- Flyer contact details and programme age bands are plausible but not production-approved.
- Daycare hours refer to 9 AM–5 PM but operating days and exceptions are unknown.
- English is the only version-one language.
- Traffic and editing frequency are modest enough for Workers and D1 standard limits.
- A school-controlled Cloudflare account, domain and identity provider will be available before handover.

## Deferred decisions

- Final domain and production theme.
- Whether the flyer logo should be traced or the new code-native mark adopted.
- Approved founder/team story and any Kuwait history.
- Google Business Profile ownership and final map pin.
- Cloudflare Web Analytics token and production caching policy.
- Any future multilingual content, public form, media or parent services.

## Constraints

No credentials or private identity list enters Git. Generated design boards are non-authoritative. Public content must not expose child or parent information. Any future photography requires a new ADR, privacy review and explicit consent workflow; it is not a routine content edit.
