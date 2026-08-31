# High-level design

- Status: Static architecture implemented and deployed to both Pages showcases
- Audience: School owner, maintainers and reviewers
- Owner: Architecture owner
- Last updated: 2026-08-31

## System context

```mermaid
flowchart LR
    Operator[Approved operator] --> GitHub[GitHub dev branch]
    GitHub --> Checks[GitHub Actions validation]
    GitHub --> PagesBuild[Cloudflare Pages Git build]
    PagesBuild --> Preview[Dev preview deployment]
    GitHub --> PR[Reviewed pull request]
    PR --> Main[Main branch]
    Main --> PagesBuild
    PagesBuild --> Static[Static HTML CSS JS SVG]
    Parent[Prospective parent] --> Static
```

GitHub is the source of content, revision history and approval. Astro compiles Markdown and components into static files. Cloudflare Pages builds from Git and serves those files globally. No request-time application, database or identity service participates.

## Public request flow

```mermaid
sequenceDiagram
    participant P as Parent browser
    participant E as Cloudflare edge
    participant A as Static asset
    P->>E: GET /blog/article/
    E->>A: Locate prebuilt index.html
    A-->>E: HTML with metadata and content
    E-->>P: Cached static response
    P->>P: Apply local colour preference and optional motion
```

JavaScript enhances colour selection and entrance motion only. Links, text, SEO metadata and journal content remain useful when JavaScript is unavailable.

## Theme builds

Garden and Geometry are separate Pages projects connected to the same repository. Each supplies a different `SITE_THEME` build variable. Content schemas and routes are shared; only visual tokens and motifs vary.
