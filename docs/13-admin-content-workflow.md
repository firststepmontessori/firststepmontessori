# GitHub content workflow

- Status: Repository workflow implemented; branch protection and Pages previews pending remote setup
- Audience: School operators, approvers and maintainers
- Owner: School content owner
- Last updated: 2026-08-31

The filename is retained for historical links; there is no custom admin application. GitHub is the editing, identity, review and audit surface.

## Draft, preview and publish lifecycle

```mermaid
sequenceDiagram
    participant O as Approved operator
    participant D as GitHub dev branch
    participant C as Automated checks
    participant P as Pages preview
    participant R as Pull request review
    participant M as Main branch
    O->>D: Edit Markdown and commit
    D->>C: Validate schema, links, safety and builds
    D->>P: Native Git preview build
    O->>P: Review Garden and Geometry
    O->>R: Open dev to main PR
    R->>M: Merge after approval and checks
    M->>P: Native production build
```

## Permissions and boundaries

Operators may edit school facts and Markdown articles. They may select one approved illustration name. They may not add photographs, HTML, scripts, navigation, layout tokens, deployment settings or credentials. Main branch protection requires pull requests and passing checks.

## Revision and rollback

```mermaid
stateDiagram-v2
    [*] --> DevDraft
    DevDraft --> Previewed: checks and Pages preview pass
    Previewed --> Published: reviewed PR merges to main
    Published --> Correction: new dev commit
    Published --> RevertPR: GitHub Revert
    Correction --> Published: reviewed PR
    RevertPR --> Published: reviewed revert PR
```

Git commits are immutable history for normal operations. Rollback creates a new revert commit through a pull request; never force-push or rewrite `main`. See the [operator guide](21-content-operator-guide.md).
