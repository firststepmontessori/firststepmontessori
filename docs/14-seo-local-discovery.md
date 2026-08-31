# SEO and local discovery

- Status: Garden production SEO and canonical-host cutover verified; search-platform ownership pending
- Audience: School owner, content maintainer, SEO and developers
- Owner: SEO owner
- Last updated: 2026-08-31

## On-site baseline

Every public route is prebuilt crawlable HTML with a unique title, bounded description, canonical URL and semantic headings. The layout emits `WebSite` and organization/local-business JSON-LD; journal articles additionally emit `BlogPosting` dates, author and publisher. Production builds provide robots, XML sitemap and RSS. Preview builds use `noindex,nofollow` and return a valid empty XML sitemap.

Search behavior is deliberately theme-independent. `SITE_THEME` selects Garden or Geometry presentation; `SITE_ENV` selects indexable production or noindex preview behavior; `PUBLIC_SITE_URL` sets canonical, sitemap, RSS and structured-data origins. CI compiles both themes as production against `https://firststepmontessori.com` and rejects missing canonicals, noindex leakage, incomplete robots/sitemap/RSS or missing structured data. Garden is the chosen live presentation, while Geometry remains noindex for comparison.

Article slugs are permanent. Topic archives are generated from validated frontmatter. Draft entries produce no route, sitemap item or RSS item. No photograph is offered for image search or social previews; a future approved branded illustration may be added without changing this rule.

## Local discovery

Use the exact approved school name, address and phone consistently across the site, Google Business Profile, Instagram and directories. Keep locality language natural: Vidyaranyapura, North Bangalore, Montessori, preschool and daycare. Do not create duplicate location pages or promise rankings.

## Production checklist

1. Completed: continuing school/donor control and renewal responsibility for `firststepmontessori.com` is recorded.
2. Completed: the apex and `www` hostnames point to Garden, whose production build uses `PUBLIC_SITE_URL=https://firststepmontessori.com` and `SITE_ENV=production`.
3. Completed: the live apex returns Garden HTML with `index,follow`, apex canonicals, `WebSite`, `EducationalOrganization` and `LocalBusiness` JSON-LD; `/robots.txt`, `/sitemap.xml` and `/blog/rss.xml` use the apex origin.
4. Completed: `www`, the former Garden showcase hostname and the Garden `pages.dev` fallback return HTTP 301 to the matching apex path and preserve query strings.
5. Pending owner action: claim or verify the Google Business Profile and confirm the map pin.
6. Pending owner action: verify Search Console domain ownership and submit `https://firststepmontessori.com/sitemap.xml`.
7. Ongoing: inspect primary and journal URLs after releases and monitor Core Web Vitals.

Follow [Google business-detail guidance](https://developers.google.com/search/docs/appearance/establish-business-details) and [LocalBusiness structured-data documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business).
