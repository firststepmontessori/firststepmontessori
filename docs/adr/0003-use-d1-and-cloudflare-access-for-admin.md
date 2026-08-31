# ADR 0003: Use D1 and Cloudflare Access for admin

- Status: Superseded by ADR 0007
- Audience: Technical maintainers, operators and security reviewers
- Owner: Solution architect
- Last updated: 2026-08-31

## Context

The initial design prioritized a custom browser editor with drafts, publishing and rollback.

## Decision

The project initially stored drafts/revisions in D1 and protected an Astro/Preact editor and APIs with Cloudflare Access.

## Alternatives

Git-managed content is less familiar to nontechnical editors. A third-party CMS expands cost and data boundaries. Custom authentication creates password, recovery and session responsibilities.

## Consequences

The design created ongoing runtime/storage/authentication responsibilities. Cost certainty later became the stronger requirement, so [ADR 0007](0007-use-static-astro-on-cloudflare-pages.md) replaces the editor with GitHub Markdown, PR previews and Git rollback.
