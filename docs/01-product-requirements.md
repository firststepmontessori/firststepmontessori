# Product requirements

- Status: Static v1 requirements implemented; school facts and production domain pending
- Audience: School owner, product, design, engineering and QA
- Owner: Product owner
- Last updated: 2026-08-31

## Goal and audience

Help prospective parents in Vidyaranyapura understand the school, Montessori approach, programmes, daycare and visit process. Give approved operators a low-cost, auditable publishing workflow through GitHub.

## Functional requirements

- Prebuild Home, About, Montessori Approach, Programmes, Daycare and Admissions & Contact as semantic HTML.
- Provide Privacy, Child Safety & Media, Accessibility and custom 404 pages.
- Generate a journal index, permanent article URLs, topic archives, pagination, RSS and sitemap entries from Markdown.
- Offer WhatsApp, call, email, Instagram and map links without collecting enquiries.
- Build Garden and Geometry from the same content using `SITE_THEME`.
- Default to device colour mode and persist explicit Light/Night choices locally.
- Keep meaningful content usable without JavaScript.
- Validate content before deployment and publish only through reviewed `dev` to `main` pull requests.

## Exclusions

No photographs, generated children, gallery, image upload, form, parent portal, fees, payments, attendance, live seat availability, runtime database, custom admin, Pages Function, Worker or third-party CMS.

## Success criteria

- Both themes contain identical facts and routes.
- Preview builds are `noindex,nofollow`; production has canonical metadata, structured data, sitemap and RSS.
- WCAG 2.2 AA automated checks, keyboard operation and reduced-motion behavior pass.
- Mobile Lighthouse targets at least 95 in Performance, Accessibility, Best Practices and SEO.
- Public routes remain useful with JavaScript disabled.
- Normal hosting and content publication require no paid runtime service.
