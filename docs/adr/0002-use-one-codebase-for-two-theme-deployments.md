# ADR 0002: Use one codebase for two theme deployments

- Status: Accepted
- Audience: Project owner, designers and developers
- Owner: Solution architect
- Last updated: 2026-08-31

## Context

The school should compare Calm Prepared Garden and Joyful Geometry with identical content and behavior. Separate implementations would drift and double maintenance.

## Decision

Use a compile-time `SITE_THEME` value to select CSS tokens and abstract motifs. Build two noindex Cloudflare Pages projects from one repository and identical Git-managed content. Promote only the selected theme to production.

## Alternatives

A runtime theme picker would expose an unnecessary brand decision to visitors. Two repositories would duplicate code and weaken parity. Only one concept would prevent informed selection.

## Consequences

Both previews remain behaviorally identical and have no request-time runtime. QA must cover both static builds and colour modes. Production has one coherent identity.
