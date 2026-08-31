# First Step Montessori website documentation

- Status: Preview implementation deployed; Access, school approval and production launch pending
- Audience: School owner, maintainers, designers and future implementation partners
- Owner: First Step Montessori website project
- Last updated: 2026-08-30

## Status dashboard

| Area | Implemented decision |
|---|---|
| Framework | Astro 7 + TypeScript, server output |
| Hosting | Cloudflare Workers with Workers Static Assets |
| Admin | Preact island protected by Cloudflare Access |
| Data | Cloudflare D1 draft, immutable revision and audit tables |
| Themes | Calm Prepared Garden and Joyful Geometry from one codebase |
| Colour mode | System default with persistent Light and Night overrides |
| Photography | Excluded from the shipped application and enforced by validation |
| Public contact | Direct call, WhatsApp, email, Instagram and map links; no form |
| Indexing | Preview builds are `noindex,nofollow`; production is enabled only after domain and content approval |
| Domain | Deferred for school selection |
| Preview hosting | Garden and Geometry Workers deployed on `workers.dev` |
| CI/CD | GitHub Actions validates `dev`/PRs and deploys merged `main`; environment secrets pending activation |
| Preview data | Shared APAC D1 provisioned and migration `0001_content.sql` applied |
| Admin access | Application rejects unauthenticated requests; Cloudflare Access awaits Zero Trust plan activation |

## Reading order

1. [Implementation plan](00-implementation-plan.md)
2. [Product requirements](01-product-requirements.md)
3. [Research findings](02-research-findings.md)
4. [Content and information architecture](03-content-information-architecture.md)
5. [Brand design system](04-brand-design-system.md)
6. [Calm Prepared Garden](05-calm-prepared-garden-theme.md) and [Joyful Geometry](06-joyful-geometry-theme.md)
7. [Colour modes and animation](07-colour-modes-animation.md) and [page layouts](08-page-layouts.md)
8. [High-level design](09-high-level-design.md) and [low-level design](10-low-level-design.md)
9. [Data model and APIs](11-data-model-api-contracts.md), [Cloudflare infrastructure](12-cloudflare-infrastructure.md) and [admin workflow](13-admin-content-workflow.md)
10. [SEO](14-seo-local-discovery.md), [security and child safety](15-security-privacy-child-safety.md), [quality gates](16-testing-quality-gates.md) and [operations](17-deployment-operations-handover.md)
11. [Content verification checklist](18-content-verification-checklist.md) and [decisions and assumptions](19-decisions-assumptions.md)
12. [Integration and deployment record](20-integrations-deployment-record.md)
13. [Content operator guide](21-content-operator-guide.md)

## Architecture decision records

- [ADR 0001: Astro on Cloudflare Workers](adr/0001-use-astro-on-cloudflare-workers.md)
- [ADR 0002: one codebase, two theme deployments](adr/0002-use-one-codebase-for-two-theme-deployments.md)
- [ADR 0003: D1 and Cloudflare Access](adr/0003-use-d1-and-cloudflare-access-for-admin.md)
- [ADR 0004: exclude photography](adr/0004-exclude-photography-from-v1.md)
- [ADR 0005: System, Light and Night modes](adr/0005-support-system-light-night-modes.md)
- [ADR 0006: WhatsApp and call without a public form](adr/0006-use-whatsapp-and-call-without-public-form.md)

## Other project references

- Approved visual boards and interactive canvas links: [`design/README.md`](../design/README.md)
- Database migration: [`migrations/0001_content.sql`](../migrations/0001_content.sql)
- Cloudflare configuration: [`wrangler.jsonc`](../wrangler.jsonc)
- Default verified/fallback content: [`src/content/default-site.ts`](../src/content/default-site.ts)

## Ownership convention

The school owns factual content and approval. The technical maintainer owns implementation, dependency updates, deployment and incident response. Either party may propose changes, but claims, contact details, hours and child-safety policy require school approval before production publication.
