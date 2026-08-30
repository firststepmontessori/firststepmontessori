# Security, privacy and child safety

- Status: Public preview controls verified; Cloudflare Access activation pending
- Audience: School owner, security reviewer, operators and developers
- Owner: Security and privacy owner
- Last updated: 2026-08-30

## Threat controls

Cloudflare terminates requests and provides network protection. Access authenticates staff before admin content reaches the Worker. The application reads the Access-provided identity, rejects missing identities, enforces same-origin writes, validates strict JSON schemas, uses bound prepared statements, escapes template content, emits restrictive security headers and disables admin caching/indexing.

## Security headers

Middleware sets Content Security Policy, Permissions Policy, Referrer Policy, `nosniff`, frame denial and Cross-Origin Opener Policy. CSP permits only same-origin scripts/connections/images plus Google-hosted fonts; frame ancestors are denied. Review the policy if maps are ever embedded rather than linked.

## Data minimisation

There is no public form, parent account, marketing cookie, advertising pixel, child record, consent record or media database. The browser stores only a versioned colour preference. Admin audit records contain staff identity, action, bounded details and timestamp.

## No-photo enforcement

The public source and asset directories contain no raster images or upload surfaces. `npm run validate:no-photos` enforces this boundary. Flyer scans and design-board PNGs remain outside shipped public assets. No child name from the donor conversation appears in source or documentation.

## Access and secrets

Private allowlists, tokens, account IDs, Access credentials and environment secrets belong in Cloudflare/CI configuration, not Git. Access policies should grant the minimum number of named staff, require strong identity-provider authentication and be reviewed when a staff member leaves.

The deployed preview Workers reject `/admin` and `/api/admin` requests that do
not carry a Cloudflare-provided identity. Ordinary unauthenticated requests and
requests attempting to forge the identity header were verified to return
`401`. The Cloudflare account still requires Zero Trust plan activation before
the intended named-user Access applications can be created. Until then, the
editor is intentionally unavailable rather than exposed with a development
bypass.

## Incident response

For suspected compromise: disable the Access application or affected identity, roll back the Worker, rotate relevant credentials, inspect audit/Cloudflare logs, preserve evidence and notify the school owner. A child-safety concern receives priority over marketing continuity.
