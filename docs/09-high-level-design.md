# High-level design

- Status: Implemented baseline
- Audience: Technical maintainers, security reviewers and school owner
- Owner: Solution architect
- Last updated: 2026-08-30

## System context

```mermaid
flowchart LR
    Parent[Prospective parent] --> Worker[Cloudflare Worker]
    Staff[Approved school staff] --> Access[Cloudflare Access]
    Access --> Worker
    Worker --> Astro[Astro SSR application]
    Astro --> D1[(Cloudflare D1)]
    Astro --> Assets[Workers Static Assets]
    Parent --> External[Phone / WhatsApp / Email / Maps / Instagram]
```

## Containers and boundaries

The Worker is the public origin and application runtime. Astro renders semantic pages and API routes. Static Assets serves compiled CSS, browser scripts and fonts referenced by the application; the site ships no raster image assets. D1 stores one current draft, immutable published revisions and audit events. Cloudflare Access is the identity and policy boundary for `/admin*` and `/api/admin*`.

## Public request flow

```mermaid
sequenceDiagram
    participant P as Parent browser
    participant W as Cloudflare Worker
    participant A as Astro SSR
    participant D as D1
    P->>W: GET public route
    W->>A: Route request
    A->>D: Read latest published revision
    alt Published content exists
        D-->>A: Valid SiteDocument JSON
    else Database empty/unbound in development
        A-->>A: Use repository fallback document
    end
    A-->>W: Semantic HTML + security/SEO headers
    W-->>P: HTML and static CSS/JS
```

## Service principles

There is no separate origin server, object store, media pipeline, marketing tracker or form-processing service. This deliberately small boundary reduces cost, maintenance, privacy exposure and attack surface.
