# ADR 0003: Use D1 and Cloudflare Access for admin

- Status: Accepted
- Audience: Technical maintainers, operators and security reviewers
- Owner: Solution architect
- Last updated: 2026-08-30

## Context

Approved staff need bounded content editing, publishing and rollback without a custom password system or non-Cloudflare backend.

## Decision

Store a single optimistic draft, immutable revisions and audit events in D1. Put the Astro/Preact editor and all admin APIs behind Cloudflare Access. Treat the Access identity header as the staff identity after the edge policy succeeds.

## Alternatives

Git-only content makes routine changes technical. A third-party CMS expands cost and data/process boundaries. Custom authentication creates password, recovery and session responsibilities that Access already covers.

## Consequences

Administration stays within Cloudflare and uses prepared statements plus strict schemas. Operators must configure Access correctly and maintain D1 migrations. The repository must never contain the staff allowlist.
