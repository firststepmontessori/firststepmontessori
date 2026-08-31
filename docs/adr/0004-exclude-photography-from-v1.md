# ADR 0004: Exclude photography from version one

- Status: Accepted
- Audience: School owner, content staff, designers and developers
- Owner: Child-safety owner
- Last updated: 2026-08-31

## Context

Child photography requires specific parent consent, careful publication controls and a removal process. Those governance mechanisms do not yet exist.

## Decision

Ship no photos, generated children, stock imagery, gallery, placeholder or upload capability. Use only typography, CSS geometry and original inline SVG. Enforce the boundary with a repository validation script.

## Alternatives

Stock or AI-generated children would conflict with authenticity and still create misleading imagery. Photo placeholders would imply a promised gallery. Publishing supplied photos without governance is unacceptable.

## Consequences

The site is distinctive, fast and safer by default. Any future media proposal requires a new decision, consent/governance design and privacy/security review; it cannot enter through routine content editing.
