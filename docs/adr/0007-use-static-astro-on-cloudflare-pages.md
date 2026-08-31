# ADR 0007: Use static Astro on Cloudflare Pages

- Status: Accepted
- Audience: School owner, operators, technical maintainers and security reviewers
- Owner: Solution architect
- Last updated: 2026-08-31

## Context

This website is a no-cost gift. The school needs durable information and occasional articles, not a request-time application. Even generous free runtime/database tiers introduce limits, operational dependencies and possible future cost or failure. Approved operators can use a guided GitHub workflow.

## Decision

Generate all public routes with Astro static output. Store school and journal content as schema-validated Markdown in GitHub. Deploy through two Cloudflare Pages projects using native Git integration and compile-time theme variables. Use `dev` for previews and reviewed pull requests to protected `main` for publication. Do not use Workers, Pages Functions, D1, KV, R2, Access, deploy hooks or runtime upload services.

## Alternatives

Retaining D1/admin gives a friendlier editor but preserves runtime, authentication and storage obligations. A Git-backed custom admin still needs secrets and server-side code. An external CMS adds another vendor, account and potential pricing change. A single-page hand-written site reduces framework code but weakens the existing route, content-schema and journal tooling.

## Consequences

Static requests have no application execution or database cost. Git provides identity, review and history; Pages provides previews and atomic deployments. Operators must learn the documented Markdown/PR workflow, and every public change requires a build. Legacy Workers/D1 must be exported and deleted only after Pages verification.
