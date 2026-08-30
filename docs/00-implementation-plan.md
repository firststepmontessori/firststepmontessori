# Implementation plan

- Status: Implemented baseline; external Cloudflare provisioning and content approval pending
- Audience: Project owner, school approver and technical maintainers
- Owner: Website project maintainer
- Last updated: 2026-08-30

## Objective

Deliver a functional, maintainable and gift-funded school website that is fast, locally discoverable, privacy-conscious and inexpensive to operate. The repository now contains the public application, dual themes, colour-mode controller, D1 content workflow, Cloudflare configuration, tests, validation scripts, design references and handover documentation.

## Delivery status

| Sequence | Deliverable | Status |
|---|---|---|
| 1 | Documentation and ADR baseline | Implemented |
| 2 | Facts separated from unresolved content | Implemented; school approval pending |
| 3 | Logo treatment | Code-native geometric mark implemented; flyer vector tracing deferred pending brand approval |
| 4 | Garden Light/Night concepts | Approved and saved under `design/` |
| 5 | Geometry Light/Night concepts | Approved and saved under `design/` |
| 6 | Layout/design records | Implemented in docs and CSS tokens |
| 7 | Shared Astro architecture and admin | Implemented |
| 8 | Both themes and three-mode controller | Implemented |
| 9 | Two Cloudflare preview deployments | Blocked on Cloudflare account IDs/authentication; configuration ready |
| 10 | Automated and browser QA | Automated baseline implemented; final Lighthouse and device matrix follow deployment |
| 11 | School presentation | Pending preview URLs |
| 12 | Domain connection | Deferred until school chooses theme and domain |
| 13 | Production SEO and handover | Deferred until domain and approved facts are available |

## Implementation boundaries

Version one includes six public pages, three footer policies, a custom 404, SSR metadata, structured data, sitemap/robots behavior, direct contact actions and a protected bounded editor. It excludes media, public forms, fees, portals, blogs, payment, unverified founder claims and unverified accreditations.

## Completion definition

The repository baseline is complete when both theme builds pass type checking, unit tests, documentation validation and the no-photo gate. Operational completion additionally requires school fact approval, real D1 identifiers, Access policy configuration, two preview deployments, browser/accessibility/performance QA and later a production domain.
