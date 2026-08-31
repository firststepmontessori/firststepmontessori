# Content models and generated-route contracts

- Status: Repository models and routes implemented; runtime APIs removed
- Audience: Content maintainers, developers and QA
- Owner: Technical maintainer
- Last updated: 2026-08-31

## School document

The required `site/school` collection entry contains:

- `settings`: public name, contact channels, address, locality, hours and map link.
- `pages`: bounded hero/title/introduction copy for six primary pages.
- `programmes`: exactly Buds, Caterpillar, Cocoon and Butterfly.
- `announcements`: at most five bounded text announcements.
- `seo`: title suffix, description and locality terms.

The collection is stored in `src/content/site/school.md`; schema validation occurs at build time.

## Journal entry

| Field | Contract |
|---|---|
| `title` | Required, at most 120 characters |
| `slug` | Required lowercase letters/numbers with single hyphens; must match filename |
| `description` | Required, at most 180 characters |
| `publishedDate` | Required valid date |
| `updatedDate` | Optional valid date |
| `author` | Required public display name |
| `topics` | One to five bounded topic names |
| `draft` | Excluded from generated public routes when true |
| `featured` | Editorial flag reserved for listings |
| `illustration` | Optional approved SVG concept name |

Raw HTML and Markdown images are rejected. Photographs are rejected anywhere in shipped source/public assets.

## Generated routes

`getStaticPaths()` generates one article page per published slug and one topic page per derived topic. Pagination pages begin at page 2; `/blog/page/1/` permanently redirects to `/blog/`. RSS and sitemap use the same published-post query, preventing draft leakage.

## API surface

There is no public or administrative JSON API. Content updates are Git commits and pull requests. Contact actions navigate to phone, email, WhatsApp, Instagram or Google Maps rather than submitting data to this project.
