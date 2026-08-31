# SEO and local discovery

- Status: Static baseline and journal metadata implemented; domain-dependent work pending
- Audience: School owner, content maintainer, SEO and developers
- Owner: SEO owner
- Last updated: 2026-08-31

## On-site baseline

Every public route is prebuilt crawlable HTML with a unique title, bounded description, canonical URL and semantic headings. The layout emits organization/local-business JSON-LD; journal articles additionally emit `BlogPosting` dates, author and publisher. Production builds provide robots, XML sitemap and RSS. Preview builds use `noindex,nofollow` and suppress the production sitemap.

Article slugs are permanent. Topic archives are generated from validated frontmatter. Draft entries produce no route, sitemap item or RSS item. No photograph is offered for image search or social previews; a future approved branded illustration may be added without changing this rule.

## Local discovery

Use the exact approved school name, address and phone consistently across the site, Google Business Profile, Instagram and directories. Keep locality language natural: Vidyaranyapura, North Bangalore, Montessori, preschool and daycare. Do not create duplicate location pages or promise rankings.

## Production checklist

1. Register the domain in school-controlled ownership.
2. Set the chosen Pages project’s `PUBLIC_SITE_URL` and `SITE_ENV=production`.
3. Verify canonical, robots, sitemap, RSS and JSON-LD on the custom domain.
4. Verify the Google Business Profile and map pin.
5. Verify Search Console domain ownership and submit `/sitemap.xml`.
6. Inspect all primary and journal URLs and monitor Core Web Vitals.

Follow [Google business-detail guidance](https://developers.google.com/search/docs/appearance/establish-business-details) and [LocalBusiness structured-data documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business).
