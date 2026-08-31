# Low-level design

- Status: Static modules and build lifecycle implemented
- Audience: Developers and maintainers
- Owner: Technical maintainer
- Last updated: 2026-08-31

## Modules

| Area | Responsibility |
|---|---|
| `src/content.config.ts` | Registers validated school and journal collections |
| `src/content/schema.ts` | Zod contracts for school facts, programmes and articles |
| `src/content/site.ts` | Loads the single required school record at build time |
| `src/content/blog.ts` | Filters/sorts published posts, checks unique slugs and derives topics |
| `src/pages/` | Produces static school, policy, journal, RSS, sitemap and 404 routes |
| `src/components/` | Shared semantic UI and original SVG visuals |
| `src/layouts/BaseLayout.astro` | Canonical metadata, robots policy, JSON-LD and colour-mode bootstrap |
| `public/_headers` | Static security and cache headers interpreted by Pages |
| `public/_redirects` | Permanent article redirect rules |

## Build lifecycle

1. Pages checks out a Git commit and installs the locked dependencies.
2. Astro loads Markdown frontmatter through content collections.
3. Zod rejects missing, malformed or overlong content.
4. Static path functions enumerate articles, topics and pagination.
5. Astro emits HTML, CSS, JS, RSS, sitemap and 404 artifacts into `dist`.
6. Pages uploads `dist`; failed builds do not replace the previous deployment.

## Theme and environment resolution

`SITE_THEME` accepts `garden` or `geometry`, defaulting to Garden. `SITE_ENV` accepts `production` or `preview`, defaulting to Preview. Preview output emits `noindex,nofollow`; production emits indexable metadata and a populated sitemap. Pages defines the values separately for production and preview environments.

## Failure behavior

Missing school content, duplicate blog slugs, invalid dates, unsafe slugs, Markdown images or raw HTML fail validation/build. A broken commit therefore cannot generate a successful Pages deployment. There is no runtime database, concurrent-edit lock or API failure mode; Git resolves editing conflicts before merge.
