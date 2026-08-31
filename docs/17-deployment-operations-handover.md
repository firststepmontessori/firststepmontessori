# Deployment, operations and handover

- Status: Local/static workflow complete; Pages provisioning, cutover and production handover pending
- Audience: Maintainers, Cloudflare operators and school owner
- Owner: Operations owner
- Last updated: 2026-08-31

## Local and repository workflow

Use Node 22.12 or newer. Run `npm install`, `npm run dev`, `npm run validate`, both theme builds with `npm run validate:static`, and browser tests before a release. Commit phase work to `dev`; publish only through a reviewed PR to protected `main`.

## Pages provisioning

1. Reauthorize Cloudflare and install/authorize the Workers & Pages GitHub App for only the school repository.
2. Create `first-step-montessori-garden` and `first-step-montessori-geometry` as Git-integrated Pages projects.
3. Set `main` as production and allow `dev` previews.
4. Set build command `npm run build`, output `dist`, Node `22.12.0`, project-specific `SITE_THEME`, Preview `SITE_ENV` and origin `PUBLIC_SITE_URL`.
5. Confirm GitHub check runs and both `pages.dev` URLs.
6. Verify routes, modes, headers, redirects, robots and static-only delivery.

Cloudflare configuration belongs in the dashboard and [infrastructure record](12-cloudflare-infrastructure.md), not repository secrets. Do not create a deploy hook or GitHub API token.

## Legacy cutover and deletion

1. Inventory exact Worker and D1 identifiers after authentication.
2. Export `first-step-montessori-preview` to a timestamped gitignored local SQL backup.
3. Compare useful published D1 content with repository content.
4. Verify both Pages sites and preserve evidence.
5. Delete `first-step-montessori-garden-preview` and `first-step-montessori-geometry-preview`.
6. Delete any additional project Worker only after ownership is confirmed.
7. Delete D1 `first-step-montessori-preview` after no binding remains.
8. Remove obsolete Cloudflare deployment secrets from GitHub.
9. Confirm old Worker URLs no longer serve the site and update the integration record.

## Rollback and maintenance

For content/code, revert the merged PR and allow Pages to deploy the revert. For a Pages platform incident, select a previously successful Pages deployment while preparing the Git revert. Review dependencies and platform limits quarterly; validate contacts and school facts each term.

## Production handover

After theme and domain selection, keep one Pages project, set the production canonical/indexing environment, attach DNS, validate Search Console and optional privacy-friendly analytics, and disable/delete the unselected showcase. Give the school collaborator access, the operator guide and domain-renewal responsibility. There is no runtime bill to monitor.
