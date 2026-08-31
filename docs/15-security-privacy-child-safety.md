# Security, privacy and child safety

- Status: Static controls implemented; remote headers and branch policy require Pages verification
- Audience: School owner, maintainers, security reviewers and content operators
- Owner: Security and privacy owner
- Last updated: 2026-08-31

## Reduced attack surface

The public site serves prebuilt files and accepts no requests that change state. There is no login, session, database, form, upload, API or server-side application. GitHub authentication and repository permissions control content changes; `main` must require reviewed pull requests and passing checks.

Pages applies the committed Content Security Policy, frame denial, content-type protection, referrer policy, permissions policy, HSTS and immutable hashed-asset caching from `public/_headers`. Inline code is limited to the colour-mode bootstrap, enhancement script and JSON-LD; no user content can inject HTML.

## Data minimisation

The website contains no child record, consent record, parent account, enquiry submission, advertising pixel or marketing cookie. The only local preference is the anonymous Light/Night/System value stored on the visitor’s device. Direct contact links hand the conversation to the chosen service.

## Media boundary

No child photograph, stock photograph, generated child, video, gallery placeholder or image upload exists. Validation rejects raster assets in shipped source/public folders and rejects Markdown image syntax. Optional article visuals are approved inline SVG concepts.

Future photography requires a separate decision covering specific revocable guardian consent, purpose, selection, metadata, withdrawal, deletion and third-party sharing. Consent evidence must remain outside the public repository.

## Secrets and incidents

Pages Git integration removes Cloudflare deployment tokens from GitHub. Do not commit credentials, account identifiers, private allowlists or personal data. If unauthorized content is published, disable automatic deployment if necessary, revert through a reviewed PR, preserve Git history, rotate any exposed credential and notify the school owner. Child-safety concerns take priority over availability.
