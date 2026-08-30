# First Step Montessori website

A photo-free Astro website for First Step Montessori in Vidyaranyapura, North Bangalore. One codebase builds two approved Cloudflare Worker previews: Calm Prepared Garden and Joyful Geometry.

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

Playwright uses its installed Chromium by default. On this Mac, testing can reuse the installed Chrome binary through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` as described in [quality gates](docs/16-testing-quality-gates.md).

## Documentation and designs

- [Complete documentation index](docs/README.md)
- [Content verification before launch](docs/18-content-verification-checklist.md)
- [Approved design concepts](design/README.md)

## Safety boundary

No photo, child imagery, gallery placeholder or upload endpoint is shipped. `npm run validate:no-photos` enforces this constraint. The supplied flyer scans and concept boards are reference material outside the public application asset tree.
