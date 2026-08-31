# First Step Montessori website

A photo-free, static Astro website for First Step Montessori in Vidyaranyapura, North Bangalore. Calm Prepared Garden is the production identity. The same repository also builds a noindex Joyful Geometry showcase with identical school content.

## Content publishing

GitHub is the content-management and approval system:

1. Edit school information in `src/content/site/school.md` or copy `templates/blog-post.md` into `src/content/blog/`.
2. Commit the change to `dev`.
3. Review the Cloudflare Pages preview and automated checks.
4. Open a pull request from `dev` to `main`.
5. Merge only after school approval; Cloudflare Pages publishes `main` automatically.

The repository contains no runtime admin, database, enquiry form or upload API. Git history records every change, and a revert pull request provides rollback.

## Local development

```bash
npm install
npm run dev
```

Build either theme as static HTML:

```bash
npm run build:garden
npm run validate:static
npm run build:geometry
npm run validate:static
```

Run all repository checks:

```bash
npm run validate
npm run test:e2e
```

## Deployment

Cloudflare Pages connects directly to this GitHub repository. The Garden project publishes the production site; the Geometry project remains a noindex showcase. Separate `SITE_THEME` values select presentation only. `SITE_ENV` and `PUBLIC_SITE_URL` control indexing and canonical identity independently, and CI verifies production SEO for both themes. GitHub Actions validates changes but holds no Cloudflare credentials and performs no deployment.

See the [documentation index](docs/README.md), [content operator guide](docs/21-content-operator-guide.md), [content verification checklist](docs/18-content-verification-checklist.md), and [approved design concepts](design/README.md).

## Safety boundary

No child photograph, stock photograph, generated child, gallery, image upload, enquiry form or tracking pixel is shipped. `npm run validate:no-photos` enforces the media boundary.
