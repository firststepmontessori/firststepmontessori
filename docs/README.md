# First Step Montessori website documentation

- Status: Static implementation deployed to two verified Pages showcases; legacy Worker removal pending
- Audience: School owner, content operators, maintainers and reviewers
- Owner: First Step Montessori website maintainers
- Last updated: 2026-08-31

## Status dashboard

| Area | Current decision |
|---|---|
| Framework | Astro 7 + TypeScript, static output |
| Hosting | Cloudflare Pages static assets |
| Content management | Markdown/YAML in GitHub |
| Publishing | `dev` preview, reviewed PR to `main`, native Pages Git build |
| Blog | Static Markdown articles, topics, pagination, RSS and permanent slugs |
| Themes | Garden and Geometry built from one repository |
| Colour mode | System default with Light and Night overrides |
| Photography | Excluded and enforced by validation |
| Runtime services | No Workers, Pages Functions, D1, KV, R2 or Access |
| Domain | Deferred for school selection |
| Live showcases | [Garden](https://first-step-montessori-garden.pages.dev) and [Geometry](https://first-step-montessori-geometry.pages.dev) |
| Legacy cutover | Two confirmed preview Workers retained pending explicit deletion approval; no D1 database exists |

## Reading order

1. [Implementation plan](00-implementation-plan.md)
2. [Product requirements](01-product-requirements.md)
3. [Research findings](02-research-findings.md)
4. [Content and information architecture](03-content-information-architecture.md)
5. [Brand design system](04-brand-design-system.md)
6. [Calm Prepared Garden](05-calm-prepared-garden-theme.md) and [Joyful Geometry](06-joyful-geometry-theme.md)
7. [Colour modes and animation](07-colour-modes-animation.md) and [page layouts](08-page-layouts.md)
8. [High-level design](09-high-level-design.md) and [low-level design](10-low-level-design.md)
9. [Content schemas and generated routes](11-data-model-api-contracts.md), [Cloudflare infrastructure](12-cloudflare-infrastructure.md) and [content workflow](13-admin-content-workflow.md)
10. [SEO](14-seo-local-discovery.md), [security and child safety](15-security-privacy-child-safety.md), [quality gates](16-testing-quality-gates.md) and [operations](17-deployment-operations-handover.md)
11. [Content verification checklist](18-content-verification-checklist.md), [decisions and assumptions](19-decisions-assumptions.md), [integration record](20-integrations-deployment-record.md) and [operator guide](21-content-operator-guide.md)

## Architecture decision records

- [ADR 0001: Astro on Cloudflare Workers — superseded](adr/0001-use-astro-on-cloudflare-workers.md)
- [ADR 0002: one codebase, two theme deployments](adr/0002-use-one-codebase-for-two-theme-deployments.md)
- [ADR 0003: D1 and Cloudflare Access — superseded](adr/0003-use-d1-and-cloudflare-access-for-admin.md)
- [ADR 0004: exclude photography](adr/0004-exclude-photography-from-v1.md)
- [ADR 0005: System, Light and Night modes](adr/0005-support-system-light-night-modes.md)
- [ADR 0006: WhatsApp and call without a public form](adr/0006-use-whatsapp-and-call-without-public-form.md)
- [ADR 0007: static Astro on Cloudflare Pages](adr/0007-use-static-astro-on-cloudflare-pages.md)

## Authoritative repository locations

- School content: [`src/content/site/school.md`](../src/content/site/school.md)
- Journal content: [`src/content/blog/`](../src/content/blog/)
- Article template: [`templates/blog-post.md`](../templates/blog-post.md)
- Cloudflare static headers and redirects: [`public/`](../public/)
- Approved design boards: [`design/README.md`](../design/README.md)

The school owns factual approval. Maintainers own code, build configuration and platform operations. No credential, private allowlist, child information or consent record belongs in this repository.
