# Low-level design

- Status: Implemented baseline
- Audience: Developers, reviewers and operators
- Owner: Application maintainer
- Last updated: 2026-08-30

## Module map

| Module | Responsibility |
|---|---|
| `src/content/schema.ts` | Strict Zod schema and TypeScript content types |
| `src/content/default-site.ts` | Repository fallback and initial content source |
| `src/lib/db.ts` | Astro 7 `cloudflare:workers` D1 binding access, reads, optimistic saves, publishing, listing, restore and audit |
| `src/lib/admin.ts` | Access identity extraction and consistent API errors |
| `src/lib/theme.ts` | Compile-time theme/environment constants |
| `src/middleware.ts` | Security, cache and robots headers |
| `src/layouts/BaseLayout.astro` | Metadata, structured data, pre-paint mode logic and shared frame |
| `src/components/` | Shared SSR visual and navigation components |
| `src/components/admin/AdminEditor.tsx` | Only hydrated Preact island |
| `src/pages/api/admin/` | Protected content endpoints |

## Rendering lifecycle

Public routes request the latest immutable D1 revision. When no D1 binding or published revision exists, they use the validated repository fallback, allowing local rendering and a safe initial deployment. Content is parsed through the same schema before use. Invalid stored JSON fails closed as an application error rather than rendering arbitrary data.

## Theme resolution

`SITE_THEME` is translated by Astro configuration into the compile-time `__SITE_THEME__` constant. Garden is the safe default and Geometry is selected only by the exact `geometry` value. CSS variables provide all theme and colour-mode differences; route markup and content remain shared.

## Errors and concurrency

Invalid JSON returns 400; invalid schema/version returns 422; missing Access identity returns 401; cross-origin mutation returns 403; unavailable D1 returns 503; stale writes and duplicate publish/restore conflicts return 409. Draft updates use `WHERE version = expectedVersion`. Publishing uses a D1 batch and a unique revision number. Restoring writes the old document as a new draft version and never silently changes the live revision.

## Caching

Admin pages and APIs use `no-store`. Public SSR caching is intentionally deferred until a production content-invalidation policy is established. Static assets receive Cloudflare’s asset delivery behavior.
