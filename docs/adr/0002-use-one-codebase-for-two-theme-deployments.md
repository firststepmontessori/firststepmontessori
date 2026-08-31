# ADR 0002: Use one codebase for two theme deployments

- Status: Accepted
- Audience: Project owner, designers and developers
- Owner: Solution architect
- Last updated: 2026-08-31

## Context

The school should compare Calm Prepared Garden and Joyful Geometry with identical content and behavior. Separate implementations would drift and double maintenance.

## Decision

Use a compile-time `SITE_THEME` value to select CSS tokens and abstract motifs. Build two Cloudflare Pages projects from one repository and identical Git-managed content. Promote only the selected theme to production. Calm Prepared Garden was selected on 2026-08-31; Joyful Geometry remains a noindex showcase.

## Alternatives

A runtime theme picker would expose an unnecessary brand decision to visitors. Two repositories would duplicate code and weaken parity. Only one concept would prevent informed selection.

## Consequences

Both builds remain behaviorally identical and have no request-time runtime. SEO and indexing are controlled independently through `SITE_ENV` and `PUBLIC_SITE_URL`. QA must cover both static builds, production SEO configurations and colour modes. Production has one coherent Garden identity.
