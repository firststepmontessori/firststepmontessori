# Deployment, operations and handover

- Status: Static workflow, custom-domain showcases, mail DNS and legacy retirement complete; email rule and theme selection pending
- Audience: Maintainers, Cloudflare operators and school owner
- Owner: Operations owner
- Last updated: 2026-08-31

## Local and repository workflow

Use Node 24.20 LTS for CI and Cloudflare builds; local maintenance commands require Node 22.19 or newer. Run `npm install`, `npm run dev`, `npm run validate`, both theme builds with `npm run validate:static`, and browser tests before a release. Commit phase work to `dev`; publish only through a reviewed PR to protected `main`.

## Pages provisioning

1. The Workers & Pages GitHub App is installed for only the school website repository.
2. `first-step-montessori-garden` and `first-step-montessori-geometry` are live as Git-integrated Pages projects.
3. `main` is production; `dev` is the only automatic preview branch.
4. Both use `npm run build`, output `dist`, Node `24.20.0`, project-specific `SITE_THEME`, `SITE_ENV=preview` and their own `PUBLIC_SITE_URL`.
5. Cloudflare native builds and GitHub validation run independently; neither uses a deployment token.
6. `garden.firststepmontessori.com` and `joyful.firststepmontessori.com` are active with SSL and their home and journal routes return HTTP 200.
7. Both showcases remain noindex until the school selects one theme.

Cloudflare configuration belongs in the dashboard and [infrastructure record](12-cloudflare-infrastructure.md), not repository secrets. Do not create a deploy hook or GitHub API token.

## Legacy cutover and deletion

1. Exact inventory confirmed the two named legacy preview Workers.
2. A final binding inspection found `first-step-montessori-preview`, despite an earlier empty D1 list result.
3. The full database was exported to a timestamped file under `.local-backups/`, confirmed gitignored, hashed and checked for the expected schemas. It contained zero draft, revision or audit rows.
4. Both Pages sites and custom subdomains passed acceptance checks.
5. With explicit approval, only `first-step-montessori-garden-preview` and `first-step-montessori-geometry-preview` were deleted.
6. The unbound D1 database was then deleted; the final D1 list is empty.
7. Both former Worker URLs return HTTP 404. No other Worker was deleted.
8. GitHub has no Cloudflare Actions deployment secrets to remove.

## Rollback and maintenance

For content/code, revert the merged PR and allow Pages to deploy the revert. For a Pages platform incident, select a previously successful Pages deployment while preparing the Git revert. Review dependencies and platform limits quarterly; validate contacts and school facts each term.

## Production handover

After theme selection, keep one Pages project, attach `firststepmontessori.com` and `www.firststepmontessori.com`, set the production canonical/indexing environment, validate Search Console and optional privacy-friendly analytics, and disable/delete the unselected showcase. Give the school collaborator access, the operator guide and domain-renewal responsibility. There is no application runtime bill to monitor.

Configure the public school email according to [the email-routing runbook](22-domain-email-routing.md). Keep the destination Gmail address out of repository content and operational screenshots. Cloudflare Email Routing handles inbound forwarding only; a later requirement to send as the school address must use an approved outbound mail service or a verified Gmail send-as configuration.
