# Revenue And Enrollment Share

- Date: 2026-07-20
- Status: DRAFT
- Parent: [[../childcare-operator-property-model-strategy|Childcare Operator Property Model Strategy]]
- Implements: Revenue model

## Objective

Define GPS's revenue from a childcare-host property so it scales with enrollment, not just rent, and so the enrollment-linked component rests on a clean, tamper-resistant measurement.

## Scope

In scope: the revenue components, the enrollment measurement mechanism, and how this sits beside the existing residential pricing. Out of scope: operator compensation internals (see operator lease and housing terms).

## Steps

1. Define the components: base property income, a management fee, and an enrollment-linked component tied to filled child slots.
2. Specify the enrollment measurement source (for example licensing rosters or subsidy-payment records) so the filled-slot count cannot be understated by the operator.
3. State how the childcare pricing model is presented beside the existing residential model (9% of collected rent plus 60% of one month's rent at placement, no maintenance markup) without overwriting it.
4. Model blended revenue per property for a small FCCH (about 7 children) and a large FCCH (about 12 children) using the market study's day-rate anchors.

## Acceptance

- The enrollment-linked component has a named, verifiable measurement source.
- The residential model and the childcare model are both stated, clearly separated.

## Measures

- Blended revenue per childcare-host property.
- Enrollment-linked revenue as a share of total property revenue.

## Open questions

- D3 sets the size of the enrollment-linked component and whether GPS takes equity or only a fee.
