# Decisions and assumptions

- Status: Static architecture deployed; school content, theme and domain approvals pending
- Audience: School owner, maintainers and reviewers
- Owner: Architecture owner
- Last updated: 2026-08-31

## Approved decisions

- Astro and TypeScript generate fully static output.
- Cloudflare Pages native Git integration builds and deploys; GitHub Actions validates only.
- GitHub Markdown/YAML replaces the custom admin, D1, Access and runtime APIs.
- `dev` is the editing/preview branch; protected `main` is production.
- Two Pages projects use one codebase and separate compile-time theme values.
- Journal articles have schema-validated permanent URLs, topics, RSS and approved SVG illustrations.
- System is the default colour mode; explicit Light/Night choices stay local.
- Contact remains direct; there is no public form.
- Photography remains excluded from v1.

## Assumptions

- A small number of operators can use GitHub with the documented workflow.
- Content/build frequency remains comfortably below Pages Free-plan limits.
- The GitHub organization can authorize the Cloudflare GitHub App.
- The school or donor will own and renew the domain.
- Cloudflare account inventory remains available when platform changes are required.

## Deferred decisions

- Final school facts, named profiles and programme wording.
- Chosen Garden/Geometry production identity.
- Domain name, registrar ownership and launch date.
- Google Business Profile/Search Console ownership.
- Whether to enable Cloudflare Web Analytics.
- Any future photography or alternate content editor; each requires a new review.

## Known constraints

A content change requires a Git commit and Pages build. There is no instant browser admin or runtime preview. GitHub and Cloudflare account availability are external dependencies for publishing, while the already deployed static site remains unaffected by content-authoring downtime.
