---
id: defer-domain-rebrand-to-green-property-solutions
status: DONE
title: Keep site.ts domain, url, and email on greenpmpnw.com for the gpm to Green Property Solutions rebrand
date-created: 2026-07-23
date-revised: 2026-07-23
supersedes:
superseded-by:
related:
tags: [rebrand, pr-85, config]
---

PR #85 rebrands display name and short name from GPM / Green Property Management to Green Property Solutions across code, config, brand assets, docs, and tests. `src/config/site.ts` `domain`, `url`, and `email` were left on `greenpmpnw.com` rather than moved to a new brand domain.

Decision: keep `greenpmpnw.com` in this PR. Domain and email migration requires actually owning a new domain, cutting over DNS, and redirecting the live site and email, which is a separate, higher-risk workstream from a display-name and design-token rebrand. Deferred, not rejected: revisit when a new domain is registered and DNS/email cutover is ready.
