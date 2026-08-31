# Implementation plan

- Status: Static migration and Pages deployment complete; legacy Worker removal pending
- Audience: School owner, maintainers and reviewers
- Owner: Delivery maintainer
- Last updated: 2026-08-31

## Objective

Deliver a useful, fast and maintainable school website whose normal operation has no metered runtime component. GitHub stores approved content and history; Cloudflare Pages builds and serves static files.

## Delivery status

| Phase | Deliverable | Status |
|---|---|---|
| 1 | Static Astro architecture and repository content | Complete |
| 2 | Journal routes, sourced article and meaningful SVG illustrations | Complete |
| 3 | GitHub operator workflow and validation-only Actions | Complete |
| 4 | Documentation, static-output QA and browser QA | Complete |
| 5 | PR to `main`, two native Pages projects and live verification | Complete |
| 6 | Legacy Worker deletion and final inventory verification | Pending explicit deletion approval |
| 7 | Theme selection, domain, indexing and school handover | Pending school decision |

## Implementation boundary

The site includes six school-information pages, three family-facing policy pages, a custom 404, a static journal with topics/RSS, two themes, System/Light/Night modes, subtle motion, SEO metadata and direct contact actions. It excludes photographs, uploads, forms, portals, payments, fees, unverified employment/accreditation claims and runtime administration.

## Cutover rule

Never delete a live resource before its replacement is independently verified. Both Pages projects have passed live route, metadata, header, journal, mode and 404 checks. Account inventory confirmed that no D1 database and no GitHub deployment secrets exist. The two legacy Workers may be removed only after explicit deletion approval; record the result in [the integration record](20-integrations-deployment-record.md).
