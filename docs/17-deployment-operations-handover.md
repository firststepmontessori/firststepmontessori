# Deployment, operations and handover

- Status: Preview deployments operational; Access and production handover pending
- Audience: School owner, deployment operator and future maintainer
- Owner: Operations owner
- Last updated: 2026-08-30

## Local setup

Use Node 22.12 or newer. Run `npm install`, apply the local D1 migration, and set `ADMIN_DEV_BYPASS=true` only in an uncommitted `.dev.vars` file for localhost editor testing. Run `npm run dev` for development and `npm run validate` before handover.

## Preview deployment

The shared APAC preview D1 database is provisioned and migrated. Deploy both
themes sequentially with `npm run deploy:previews`; the shared `dist` directory
means the builds must not run in parallel. Each script supplies an explicit
Worker name because Astro redirects Wrangler to its generated server config.

Live previews:

- Garden: `https://first-step-montessori-garden-preview.harshu-1982.workers.dev`
- Geometry: `https://first-step-montessori-geometry-preview.harshu-1982.workers.dev`

Both return `noindex,nofollow`, disallow crawling in `robots.txt`, use the same
D1 binding and reject unauthenticated admin requests. Cloudflare Access remains
pending until the account owner activates a Zero Trust plan and approves the
private identity allowlist.

## Deployment commands

```bash
npx wrangler login
npx wrangler whoami
npm ci
npm run validate
npm run db:migrate:preview
npm run deploy:previews
```

Never run the Garden and Geometry deployment scripts concurrently because each
rebuilds `dist`. Never remove the explicit `--name` arguments without first
confirming how the active Astro adapter emits its redirected Wrangler config.

## Production deployment

After the school chooses a theme and domain, create a separate production D1 database, migrate it, seed/save/publish approved content, build with the chosen `SITE_THEME` and `SITE_ENV=production`, deploy the production environment and attach the custom domain. Remove or pause the losing demo after acceptance; never leave multiple indexable school identities.

## Monitoring

Enable Workers observability and review exception/error rates. Add Cloudflare Web Analytics after domain approval. Monitor uptime, contact-link integrity, Access sign-ins, audit events, Search Console coverage and Core Web Vitals. Avoid client advertising trackers.

## Rollback

Application rollback uses Cloudflare Worker version rollback. Content rollback restores an immutable revision into a draft, reviews it, then republishes. Database migrations must be additive whenever possible; take an export before a destructive schema change.

## Handover package

Transfer the domain, Cloudflare account/project access, repository ownership, recovery contacts and content-approval responsibility to school-controlled identities. Provide a short editor demonstration and record who can publish. Never hand over credentials through repository files.

The current local Wrangler login is an operator credential, not a handover
mechanism. A future maintainer must authenticate with their own approved
Cloudflare identity. Automatic GitHub-to-Cloudflare builds are not configured;
adding them requires explicit approval for the Cloudflare GitHub App and a
documented decision about whether pushes to `dev` deploy both previews.
