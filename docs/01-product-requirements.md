# Product requirements

- Status: Implemented baseline
- Audience: School approver, product owner, designer and developers
- Owner: Website product owner
- Last updated: 2026-08-30

## Users and needs

Primary users are parents or guardians considering early education or daycare near Vidyaranyapura. They need a quick understanding of the school, Montessori approach, age groups, daycare availability, location and a direct way to arrange a visit. Secondary users are approved school staff who need to update bounded factual copy without modifying design or infrastructure.

## Functional requirements

- Render Home, About, Montessori Approach, Programmes, Daycare and Admissions & Contact as semantic server-rendered pages.
- Provide Privacy, Child Safety & Media, Accessibility and custom 404 pages.
- Offer WhatsApp, telephone, email, Instagram and Google Maps links without collecting public form data.
- Build Garden and Geometry deployments from one shared content model.
- Default to device colour mode; persist explicit Light/Night/System selection locally.
- Provide a protected editor for contact details, bounded copy, programmes, announcements and SEO defaults.
- Prevent stale draft overwrites, publish immutable revisions and restore old revisions to a new draft.
- Keep preview deployments and all admin routes out of search indexes.

## Non-functional requirements

- WCAG 2.2 AA target, keyboard usability, visible focus and reduced-motion behavior.
- Lighthouse mobile target of at least 95 in Performance, Accessibility, Best Practices and SEO.
- Core Web Vitals targets: LCP at most 2.5 seconds, CLS below 0.1 and INP below 200 milliseconds at the 75th percentile when sufficient field data exists.
- Public content remains useful when JavaScript is unavailable; only mode persistence, entrance enhancement and admin editing require JavaScript.
- No secret, allowlist, Cloudflare account ID or consent record is committed.

## Exclusions

No photography, child imagery, gallery, media placeholder, upload endpoint, enquiry form, parent portal, blog, fees, online application, testimonial, accreditation claim or founder-employer claim is included.

## Success criteria

Parents can understand the offer and contact the school within two minutes on a mobile device. School staff can safely save, preview, publish and restore content. Both visual themes behave identically, and deployment can move to production without an architecture change.
