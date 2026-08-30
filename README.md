# First Step Montessori website

A photo-free Astro website for First Step Montessori in Vidyaranyapura, North Bangalore. One codebase builds two approved Cloudflare Worker previews: Calm Prepared Garden and Joyful Geometry.

## Live preview deployments

- [Calm Prepared Garden](https://first-step-montessori-garden-preview.harshu-1982.workers.dev)
- [Joyful Geometry](https://first-step-montessori-geometry-preview.harshu-1982.workers.dev)

Both previews are intentionally excluded from search indexing and share the
same migrated preview D1 database.

## Quick start

```bash
npm install
npm run db:migrate:local
npm run dev
```

The local admin is available at `/admin` in Astro development mode. Production and preview deployments require Cloudflare Access.

## Build and verify

```bash
npm run build:garden
npm run build:geometry
npm run validate
npm run test:e2e
```

Authenticated Cloudflare operators can apply preview migrations and deploy both
themes with `npm run db:migrate:preview` and `npm run deploy:previews`. See the
[integration and deployment record](docs/20-integrations-deployment-record.md)
before changing Worker names, bindings or authentication.

GitHub Actions validates every push to `dev` and every pull request to `main`.
After an approved pull request is merged, a push to `main` deploys Garden and
Geometry sequentially. The deploy job reads `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_API_TOKEN` only from the protected GitHub `preview` environment.

Playwright uses its installed Chromium by default. On this Mac, testing can reuse the installed Chrome binary through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` as described in [quality gates](docs/16-testing-quality-gates.md).

## Documentation and designs

- [Complete documentation index](docs/README.md)
- [Content verification before launch](docs/18-content-verification-checklist.md)
- [Approved design concepts](design/README.md)
- [Integration and deployment record](docs/20-integrations-deployment-record.md)

## Safety boundary

No photo, child imagery, gallery placeholder or upload endpoint is shipped. `npm run validate:no-photos` enforces this constraint. The supplied flyer scans and concept boards are reference material outside the public application asset tree.
