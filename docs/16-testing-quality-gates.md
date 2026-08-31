# Testing and quality gates

- Status: Static, content, browser and accessibility suites implemented; deployed Lighthouse matrix pending
- Audience: Developers, QA, designers and deployment operators
- Owner: QA owner
- Last updated: 2026-08-31

## Automated commands

| Gate | Command | Coverage |
|---|---|---|
| Type/content | `npm run check` | Astro/TypeScript and collection schemas |
| Unit | `npm test` | School and article schema behavior |
| Documentation | `npm run lint:docs`, `npm run validate:docs`, `npm run validate:links` and `npm run validate:mermaid` | Markdown, required metadata, internal links and parsed Mermaid syntax |
| External references | `npm run validate:links:external` | Direct HTTP verification before handover; kept separate from CI to avoid third-party outages blocking school updates |
| Content safety | `npm run validate:content` | Filename/slug match, no raw HTML or Markdown images |
| Media safety | `npm run validate:no-photos` | No raster assets or upload surfaces |
| Static artifact | `npm run validate:static` | Required HTML/RSS/header files and no runtime/admin code |
| Production SEO | `npm run validate:seo:garden` and `npm run validate:seo:geometry` | Theme-independent canonicals, indexing, JSON-LD, robots, sitemap and RSS |
| Browser | `npm run test:e2e` | Routes, modes, no-JS, responsive, policies and blog |
| Accessibility | Playwright + axe | WCAG A/AA checks in Light and Night on desktop/mobile |

CI validates content and documentation, installs Chromium, runs browser tests, validates both preview static builds, then validates both themes against the same apex production SEO contract. It never deploys.

## Acceptance matrix

- Garden Light/Night and Geometry Light/Night.
- System mode live device response and persistent explicit overrides.
- Reduced-motion behavior and keyboard-visible focus.
- Desktop and 390×844 mobile layouts without horizontal overflow.
- Every public and journal route produces useful semantic HTML.
- Draft articles omitted from routes/RSS/sitemap.
- Preview noindex and production canonical/indexing behavior.
- Static `_headers`, `_redirects`, 404, sitemap and RSS present.
- No Worker, Function, database, admin, upload or photo artifacts.

## Performance

After Pages provisioning, run Lighthouse on Home, Journal and one article for both themes/modes. Targets: all category scores at least 95; LCP at most 2.5s; CLS below 0.1; INP below 200ms. Record any environment-dependent exception rather than hiding it.
