# Implementation plan

- Status: Static migration implemented; remote Pages cutover pending
- Audience: School owner, maintainers and reviewers
- Owner: Delivery maintainer
- Last updated: 2026-08-31

## Objective

Deliver a useful, fast and maintainable school website whose normal operation has no metered runtime component. GitHub stores approved content and history; Cloudflare Pages builds and serves static files.

## Delivery status

| Phase | Deliverable | Status |
|---|---|---|
| 1 | Static Astro architecture and repository content | Complete on `dev` |
| 2 | Journal routes, sourced article and meaningful SVG illustrations | Complete on `dev` |
| 3 | GitHub operator workflow and validation-only Actions | Complete on `dev` |
| 4 | Documentation, static-output QA and browser QA | In progress |
| 5 | PR to `main`, two native Pages projects and live verification | Pending authorization/merge |
| 6 | D1 export, legacy Worker/D1 deletion and credential cleanup | Pending Pages acceptance |
| 7 | Theme selection, domain, indexing and school handover | Pending school decision |

## Implementation boundary

The site includes six school-information pages, three family-facing policy pages, a custom 404, a static journal with topics/RSS, two themes, System/Light/Night modes, subtle motion, SEO metadata and direct contact actions. It excludes photographs, uploads, forms, portals, payments, fees, unverified employment/accreditation claims and runtime administration.

## Cutover rule

Never delete a live resource before its replacement is independently verified. Export the preview D1 database, compare any useful published content with repository content, verify both Pages projects, then remove the legacy Workers, D1 and GitHub deployment secrets. Record the evidence in [the integration record](20-integrations-deployment-record.md).
