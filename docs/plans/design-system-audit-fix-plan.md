# Design System Audit Fix Plan

Date: 2026-06-26
Branch: `codex/standalone-site-sync`
Source of truth: `DESIGN.md`

## Scope

Audited the current site against `DESIGN.md`, `src/design-system/green-property-solutions-design-tokens.js`, `src/styles/green-property-solutions-tokens.css`, `src/styles/modes.css`, and rendered output from local Astro preview.

Verification performed:

- `npm run design:check` passed.
- `npm run build` passed.
- Browser/DOM inspection sampled `/`, `/owners/`, `/rentals/`, `/portal/owner/`, `/portal/resident/`, and `/portal/resident/repairs/` at 1440px and 390px.
- No horizontal overflow found on sampled pages, aside from the intentionally off-screen skip link.

## Findings

### 1. Stub pointers in `DESIGN.md` point to missing files

`DESIGN.md` names these as design-system pointers, but they do not exist yet:

- `src/design-system/components.ts`
- `src/design-system/examples/`
- `docs/design-system/accessibility.md`
- `docs/design-system/changes.md`

Impact: the style guide claims integration points that cannot be imported, reviewed, or extended.

### 2. Signature usage does not match the guide

`DESIGN.md` says the signature pattern is `"Megan" in Fraunces italic`, and governance says major modes should expose named operator accountability.

Current mismatch:

- `src/features/marketing-home/Hero.astro` uses `.signature` for `Owned and operated locally.`
- Most major surfaces mention Megan in body copy but do not use the formal signature pattern.

Impact: Fraunces is being used for a tagline, not for the named signature role the design system defines.

### 3. State colors are not consistently paired with icon plus label

`DESIGN.md` requires state colors to include icon plus text labels and not rely on color alone.

Current mismatches:

- `src/features/portal/PortalShell.astro` uses an info-colored preview callout with a text label but no icon.
- `src/features/legal/DraftNotice.astro` uses a warning dot plus label; the dot is not an icon.
- `src/pages/portal/resident/repairs/index.astro` uses colored dots plus labels for repair status; dots are not icons.
- `src/pages/portal/resident/index.astro` renders `$0` in `text-success` without a success label or icon.

Impact: status communication is inconsistent and under-specified for accessibility and visual grammar.

### 4. Action links use text arrows instead of component grammar

The design-system component grammar defines button/link patterns, but several links append a raw `→` glyph.

Current instances:

- `src/features/marketing-home/DualPath.astro`
- `src/pages/portal/owner/index.astro`
- `src/pages/portal/resident/index.astro`

Impact: action affordances are inconsistent with the future component contract and are not enforceable.

### 5. Product portal header still shows the marketing CTA

The global header always renders the Clay `Request a proposal` CTA, including owner/resident product routes.

Current sampled routes:

- `/portal/owner/`
- `/portal/resident/`
- `/portal/resident/repairs/`

Impact: `owner-product` and `renter-product` surfaces are supposed to be data-forward, but they carry an owner-acquisition CTA that is irrelevant to authenticated portal tasks.

### 6. Typography tracking is drifting outside the enforceable guide

The rendered site uses negative heading tracking from `--tracking-tight` and direct `tracking-tight` utilities.

Current instances:

- `src/styles/green-property-solutions-tokens.css` defines `--tracking-tight: -0.02em`.
- `src/styles/base.css` applies negative tracking to headings and `.text-display`.
- `src/features/marketing-home/Hero.astro` applies `tracking-tight`.

Impact: typography behavior is not clearly governed by `DESIGN.md`, and rendered headings show negative letter spacing across desktop and mobile.

### 7. Enforcement does not cover several design-guide rules

`npm run design:check` passes, but it does not currently enforce:

- Existence of the stub pointer files.
- `.signature` content/usage.
- State color icon plus label patterns.
- Raw arrow glyphs in action links.
- Product-route header CTA behavior.
- Negative tracking utilities or token values.

Impact: the project can regress against the written style guide while CI remains green.

### 8. Old token comments reference deleted docs

The standalone site removed the old design docs corpus, but token comments still point to files that no longer exist:

- `docs/30-design-tokens.md`
- `docs/21-typography-tokens.md`
- `docs/22-typography-usage.md`
- `docs/91-accessibility.md`
- `docs/11-audience-modes.md`

Impact: future contributors will follow dead references instead of `DESIGN.md`.

### 9. Public pages ship `noindex` by default

`BaseLayout` defaults `noindex` to `true`, and no public page currently overrides it. The built HTML confirms `meta name="robots" content="noindex, nofollow"` on the homepage, owners pages, rentals pages, about, and contact.

Impact: if the site is meant to be public now, search engines will not index it and Plausible analytics will stay disabled.

## Fix Plan

### Phase 1: Make the style-guide surface real

1. Add the missing stub files named by `DESIGN.md`.
2. Keep stubs intentionally small:
   - `components.ts` exports placeholder registry metadata only.
   - `examples/README.md` explains where future examples go.
   - `docs/design-system/accessibility.md` records pending contrast/screenshot coverage.
   - `docs/design-system/changes.md` starts the token/change log.
3. Update token comments to point to `DESIGN.md` and the new design-system docs only.

Acceptance:

- `npm run design:check` verifies the pointer files exist.
- No comments reference deleted docs.

### Phase 2: Normalize signature and accountability

1. Replace the home hero `.signature` text with a Megan signature pattern or remove `.signature` from the tagline.
2. Define a reusable signature rule in `DESIGN.md`:
   - public marketing: one operator accountability line per major acquisition path.
   - documents/letters: formal `Megan` signature.
   - dashboards: use normal Geist text for account preview/support notes unless Megan is signing a message.
3. Add a design check that fails if `.signature` text is not `Megan` or an approved signed variant.

Acceptance:

- Fraunces appears only in `.signature`.
- `.signature` content matches the documented signature role.

### Phase 3: Create state and action primitives before expanding components

1. Add small primitives, not a full component library:
   - `StatusBadge.astro` for success/warning/error/info with icon plus label.
   - `Callout.astro` for note/warning/error/success callouts with icon plus label.
   - `ActionLink.astro` for text links with a consistent icon/affordance.
2. Replace:
   - `PortalShell` preview callout with `Callout`.
   - `DraftNotice` with `Callout`.
   - repair status dots with `StatusBadge`.
   - resident balance success color with a labeled `StatusBadge` or neutral value plus status label.
   - raw `→` links with `ActionLink`.
3. Add checker coverage for raw `→` glyphs and direct state-color usage outside the primitives.

Acceptance:

- State colors appear only inside approved primitives and token files.
- Every state instance has visible text and an icon.
- No raw arrow glyphs remain in `src`.

### Phase 4: Make audience modes affect global chrome

1. Pass `audience` from `BaseLayout` into `Header`.
2. Hide or replace the Clay `Request a proposal` CTA on `owner-product` and `renter-product` routes.
3. Use product-appropriate header actions:
   - owner product: `Statements` or no CTA.
   - resident product: `Pay rent` or no CTA.
4. Add a checker rule that product routes do not render the owner-acquisition proposal CTA.

Acceptance:

- Product routes no longer show the acquisition CTA.
- Clay remains reserved for the primary action in the active audience context.

### Phase 5: Resolve typography tracking governance

1. Decide whether negative heading tracking is part of the Green PS system.
2. If not, set `--tracking-tight` to `0`, remove `tracking-tight` from hero classes, and update heading CSS.
3. If yes, document it explicitly in `DESIGN.md` and add a narrower allowed-use rule.
4. Add checker coverage for arbitrary tracking utilities and token drift.

Acceptance:

- Rendered heading tracking matches the written design-system rule.
- The checker enforces the decision.

### Phase 6: Verify across the site

1. Run:
   - `npm run design:check`
   - `npm run lint`
   - `npm run check`
   - `npm test`
   - `npm run test:components`
   - `npm run test:static`
   - `npm run build`
2. Run browser inspection on at least:
   - `/`
   - `/owners/`
   - `/rentals/`
   - `/portal/owner/`
   - `/portal/resident/`
   - `/portal/resident/repairs/`
3. Confirm no horizontal overflow at 390px and 1440px.
4. Add screenshot/contrast notes to `docs/design-system/accessibility.md`.

### Phase 7: Decide launch visibility

1. Decide whether the site should remain `noindex` until launch or become indexable now.
2. If it should be public now, flip public routes to `noindex={false}` or make the default opt-out instead of opt-in.
3. Re-enable analytics on the routes that should be measured.
4. Update the sitemap and launch docs to match the decision.

Acceptance:

- Public pages either intentionally remain hidden, with that choice documented, or they are indexable and measurable.
- The robots policy matches the product's launch state.

## Suggested Implementation Order

1. Phase 1: pointer files and dead references.
2. Phase 3: `Callout`, `StatusBadge`, `ActionLink`, and enforcement.
3. Phase 4: audience-aware header.
4. Phase 2: signature/accountability cleanup.
5. Phase 5: typography tracking decision and enforcement.
6. Phase 6: full verification and accessibility notes.
7. Phase 7: launch visibility and analytics decision.
