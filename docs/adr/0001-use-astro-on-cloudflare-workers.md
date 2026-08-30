# ADR 0001: Use Astro on Cloudflare Workers

- Status: Accepted
- Audience: Technical maintainers and project owner
- Owner: Solution architect
- Last updated: 2026-08-30

## Context

The school needs content-first server HTML, very little client JavaScript, strong SEO and a Cloudflare-only operating model with D1 bindings.

## Decision

Use Astro with TypeScript and the official Cloudflare adapter in server-output mode. Use Preact only for the protected editor island.

## Alternatives

Static Astro could be simpler but cannot read published D1 content per request. Next.js provides more application surface than this small site requires. A hand-written Worker would reduce framework code but increase template, routing and maintainability work.

## Consequences

Public pages ship minimal JavaScript and semantic HTML. The team must maintain Astro/adapter compatibility and a Worker runtime. Local binding simulation depends on Wrangler.
