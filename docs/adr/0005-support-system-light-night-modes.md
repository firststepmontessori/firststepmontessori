# ADR 0005: Support System, Light and Night modes

- Status: Accepted
- Audience: Designers, frontend developers and accessibility reviewers
- Owner: Design-system maintainer
- Last updated: 2026-08-30

## Context

The site needs comfortable viewing across devices and times of day while honoring user preference and avoiding a flash of the wrong theme.

## Decision

Default to System, permit explicit Light and Night overrides, persist only a versioned local-browser preference and apply it with a pre-paint inline script. In System mode, respond live to device-scheme changes.

## Alternatives

Light-only ignores device needs. A simple binary toggle cannot return clearly to System. Server-side storage would collect unnecessary preference data and still not know the device scheme at first paint.

## Consequences

Every theme needs two contrast-checked palettes. A small inline script is allowed by CSP. QA must cover persistence, live changes, keyboard/screen-reader state and reduced motion.
