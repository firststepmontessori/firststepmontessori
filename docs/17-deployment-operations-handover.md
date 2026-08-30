# Deployment, operations and handover

- Status: Runbook ready; deployments pending Cloudflare account provisioning
- Audience: School owner, deployment operator and future maintainer
- Owner: Operations owner
- Last updated: 2026-08-30

## Local setup

Use Node 22.12 or newer. Run `npm install`, apply the local D1 migration, and set `ADMIN_DEV_BYPASS=true` only in an uncommitted `.dev.vars` file for localhost editor testing. Run `npm run dev` for development and `npm run validate` before handover.

## Preview deployment

Create the shared preview D1 database, apply migrations, add its non-secret resource identifier to an environment-specific deployment configuration, and configure Cloudflare Access. Build/deploy Garden and Geometry using their scripts. Confirm that both return `noindex,nofollow` and contain identical content.

## Production deployment

After the school chooses a theme and domain, create a separate production D1 database, migrate it, seed/save/publish approved content, build with the chosen `SITE_THEME` and `SITE_ENV=production`, deploy the production environment and attach the custom domain. Remove or pause the losing demo after acceptance; never leave multiple indexable school identities.

## Monitoring

Enable Workers observability and review exception/error rates. Add Cloudflare Web Analytics after domain approval. Monitor uptime, contact-link integrity, Access sign-ins, audit events, Search Console coverage and Core Web Vitals. Avoid client advertising trackers.

## Rollback

Application rollback uses Cloudflare Worker version rollback. Content rollback restores an immutable revision into a draft, reviews it, then republishes. Database migrations must be additive whenever possible; take an export before a destructive schema change.

## Handover package

Transfer the domain, Cloudflare account/project access, repository ownership, recovery contacts and content-approval responsibility to school-controlled identities. Provide a short editor demonstration and record who can publish. Never hand over credentials through repository files.
