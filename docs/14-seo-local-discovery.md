# SEO and local discovery

- Status: Technical baseline implemented; domain-dependent work pending
- Audience: School owner, content maintainer, SEO and developers
- Owner: SEO owner
- Last updated: 2026-08-30

## On-site baseline

Every public page has a unique title, bounded description, canonical URL, semantic heading/landmark structure and crawlable server HTML. Production provides `robots.txt` and XML sitemap. Preview builds return `noindex,nofollow`; admin routes additionally receive an `X-Robots-Tag` header.

The base layout emits JSON-LD with `EducationalOrganization` and `LocalBusiness`, postal address, phone, email, website and Instagram. It deliberately omits rating, price range, logo image, founder history and opening hours that cannot yet be expressed accurately.

## Local content

Use the school’s exact approved name, address and phone consistently across the website, Google Business Profile, Instagram and any directory. Keep useful locality terms natural: Vidyaranyapura, North Bangalore, Montessori, preschool and daycare. Do not create duplicate near-identical location pages.

## Launch checklist

1. Select and register the production domain in the school’s ownership.
2. Confirm canonical origin and rebuild with `SITE_ENV=production`.
3. Verify Google Business Profile ownership and the map pin.
4. Verify the domain property in Google Search Console.
5. Submit the sitemap and inspect all six primary URLs.
6. Validate JSON-LD with Google’s Rich Results Test and Schema.org validator.
7. Monitor indexing, queries, Core Web Vitals and incorrect duplicate listings.

Follow [Google business detail guidance](https://developers.google.com/search/docs/appearance/establish-business-details) and [LocalBusiness structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business). Search visibility is not guaranteed and must never be described as guaranteed.
