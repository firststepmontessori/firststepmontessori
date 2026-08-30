# Testing and quality gates

- Status: Repository and local rendered baseline passing; deployed Lighthouse matrix pending
- Audience: Developers, QA, accessibility reviewers and operators
- Owner: Quality owner
- Last updated: 2026-08-30

## Automated repository gates

| Gate | Command | Current scope |
|---|---|---|
| Astro/TypeScript | `npm run check` | Strict diagnostics across routes, components and APIs |
| Unit | `npm test` | Content schema validity and programme constraints |
| Build | `npm run build:garden`, `npm run build:geometry` | Both compile-time deployments |
| Markdown | `npm run lint:docs` | All docs and design Markdown |
| Documentation | `npm run validate:docs` | Required files, metadata and README ownership |
| No photos | `npm run validate:no-photos` | No raster assets or upload surfaces in shipped application |

## Browser acceptance matrix

Test Garden Light/Night, Garden System, Geometry Light/Night and Geometry System at 375×812, 768×1024 and 1440×900. Include latest stable Chrome, Safari and Firefox. Verify navigation, mode persistence, live System changes, keyboard focus, mobile disclosure, direct contact links and custom 404.

The 2026-08-30 local run passed sixteen Playwright checks across 1440px desktop and 390px mobile Chrome viewports, including Axe WCAG A/AA audits in Light and Night, semantic names, 44px primary mode targets, all public routes, preview robots, colour persistence/live System behavior, no-photo/no-upload, horizontal overflow and meaningful no-JavaScript rendering. The preferred in-app browser was attempted first but blocked local HTTP origins with `ERR_BLOCKED_BY_CLIENT`; Playwright using the installed Chrome binary was the documented fallback. Safari, Firefox, 768px tablet, screen-reader and deployed Lighthouse checks remain handover gates.

## Admin acceptance

With local D1 and development Access bypass enabled, cover initial draft creation, valid save, invalid schema, stale `409`, publish, duplicate publish conflict, revision listing, restore-to-draft and republish. Repeat protected-route checks without identity.

The 2026-08-30 local D1 run applied `0001_content.sql` successfully and passed draft save, stale `409`, immutable publish, revision listing and restore-to-new-draft. Remote Access enforcement remains a preview-deployment gate.

## Accessibility and performance

Run axe or equivalent plus manual keyboard and screen-reader checks. Verify WCAG 2.2 AA contrast and 44px touch targets. Run Lighthouse mobile after deployment; each category target is at least 95. Measure LCP at most 2.5s, CLS below 0.1 and INP below 200ms where representative field data exists.

## SEO and content

Validate canonical URLs, preview robots, production sitemap, structured data, 404 status and security headers. Search the shipped output for photographs, child names, placeholder credentials, unverified founder/Kuwait claims and unexpected form/upload code.
