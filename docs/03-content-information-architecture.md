# Content and information architecture

- Status: Static routes and journal implemented
- Audience: School content owner, UX, SEO and engineering
- Owner: Content-design owner
- Last updated: 2026-08-31

## Sitemap

| Route | Navigation | Purpose |
|---|---|---|
| `/` | Logo/Home | Promise, programmes, approach, daycare, rhythm and contact |
| `/about/` | Primary | Story, values and approved text-only team information |
| `/montessori-approach/` | Primary | Prepared environment, independence and hands-on learning |
| `/programmes/` | Primary | Four flyer-derived programme stages |
| `/daycare/` | Primary | Routine, questions and confirmed hours |
| `/blog/` | Primary | Montessori journal index |
| `/blog/{slug}/` | Journal | Permanently addressed article |
| `/blog/topic/{topic}/` | Journal | Generated topic archive |
| `/blog/page/{number}/` | Journal | Generated archive pagination |
| `/blog/rss.xml` | Metadata | RSS feed |
| `/admissions-contact/` | Primary/CTA | Visit steps, address and contact links |
| `/privacy/` | Footer | Family-facing privacy notice |
| `/child-safety-media/` | Footer | Current no-photo rule and future consent principles |
| `/accessibility/` | Footer | Accessibility support and feedback |
| `/404.html` | System | Recovery actions |

## Content ownership

School facts live in `src/content/site/school.md`. Journal entries live in `src/content/blog/`; frontmatter controls title, slug, description, dates, author, topics, publication state and one approved illustration. Components, navigation, layout and theme tokens remain code-owned.

## Verification rules

The school approves names, contacts, age bands, hours and public claims. Operators must not publish founder employment, accreditation, fees, availability or outcomes without evidence and explicit approval. Article slugs are permanent after publication; required changes receive a static redirect.
