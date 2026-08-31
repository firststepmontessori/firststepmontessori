# Research findings

- Status: Updated for the static Pages decision; re-check platform limits before production launch
- Audience: School approver, design, SEO and technical maintainers
- Owner: Website research owner
- Last updated: 2026-08-31

## Flyer findings

The two scans in `images/` are source material, not public assets. They indicate the school name, phone, email, Instagram, Vidyaranyapura address, daycare hours and Buds/Caterpillar/Cocoon/Butterfly age ranges. Each value remains subject to [school verification](18-content-verification-checklist.md). The flyers name a Head of School; no profile or Kuwait employment claim is published without direct approval and evidence. Child details supplied conversationally are irrelevant and are not stored in the site.

## Reference sites and visual response

- [Argan Bedaya](https://arganbedaya.com/early-childhood-center/) demonstrates calm hierarchy but depends on photography.
- [The Montessori Studio](https://www.themontessoristudio.com/) has concise actions and strong presence, but its photographic treatment conflicts with the current media rule.
- [Gulf Montessori](https://gulfmontessorikw.com/) communicates programme information clearly but does not establish any founder-employment connection.

The project adopts clear hierarchy and direct parent actions while using original SVG/CSS visual language. Reference sites are inspiration only, never evidence of employment, accreditation or affiliation.

## Montessori article sources

The first journal article uses primary Association Montessori Internationale references: [Maria Montessori’s biography](https://montessori-ami.org/node/1820) and the [Montessori 3–6 environment](https://montessori-ami.org/node/2175). New educational or historical claims should link directly to reliable primary sources.

## Local discovery

A confidently attributable mature school website was not found during initial research. Opportunity therefore depends on an accurate Google Business Profile, consistent name/address/phone data, fast pages and approved structured data. Follow [Google business-detail guidance](https://developers.google.com/search/docs/appearance/establish-business-details) and [LocalBusiness structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Cloudflare feasibility and cost choice

Cloudflare Pages can connect directly to GitHub and build each push, including preview deployments and repository checks. Static asset requests are documented as free and unlimited; the Free plan currently lists 500 builds per month and 20,000 files per site. Pages Functions would consume Workers quota, so none are used. See [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [Pages pricing](https://developers.cloudflare.com/pages/functions/pricing/) and [Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

Cloudflare Web Analytics remains optional after domain approval. No advertising or behavioral-tracking product is planned.
