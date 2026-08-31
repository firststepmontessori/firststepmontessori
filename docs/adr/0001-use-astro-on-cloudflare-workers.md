# ADR 0001: Use Astro on Cloudflare Workers

- Status: Superseded by ADR 0007
- Audience: Technical maintainers and project owner
- Owner: Solution architect
- Last updated: 2026-08-31

## Context

The initial design assumed request-time content stored in D1 and therefore needed an application runtime.

## Decision

The project initially used Astro server output, the Cloudflare adapter and a protected Preact editor.

## Alternatives

Static Astro could not read D1 per request under that design. Next.js and a hand-written runtime both added more application surface than the site needed.

## Consequences

The design worked but created runtime, database, authentication and cost responsibilities. The donor and school later prioritized cost certainty and repository-managed content, so [ADR 0007](0007-use-static-astro-on-cloudflare-pages.md) supersedes it.
