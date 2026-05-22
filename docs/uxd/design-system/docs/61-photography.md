---
domain: brand
category: design-system
sub-category: photography
date-created: 2026-05-21
date-revised: 2026-05-21
status: spec-v3
version: 3.0.0
depends-on:
  - 01-positioning
  - 03-voice
produces:
  - photography-subjects
  - photography-style-rules
  - operator-portrait-spec
  - property-photography-spec
  - forbidden-photography
executor: brand
aliases: []
tags: []
---

# 61-photography

The photography spec. Operator portraits, property photos, process photos, and what to refuse. The brand earns its named-operator promise partly through photography. Consumed by photo direction sessions, listing photo standards, and editorial blog photo selection.

## Dependencies

- `01-positioning` for the named-operator and anti-corporate premise
- `03-voice` for the calm, specific, local tone

## Outputs

1. Photography subjects (what to shoot)
2. Style rules (how to shoot it)
3. Operator portrait specifications
4. Property photo standards
5. Process photo guidance
6. Stock photo policy
7. Forbidden photography

## Principles

The brand has a face. Use it. Photography earns the brand promise of named accountability. The wrong photography unwinds every other brand decision.

| Principle | Means | Does not mean |
|---|---|---|
| Real | Actual properties, actual people, actual weather | Documentary-style or unprofessional |
| Specific | Identifiable locations, named subjects, contextual details | Tourist or generic |
| Local | Pacific Northwest, gray skies, cedar, evergreens, rain | Folk-art or twee regional cliche |
| Human scale | People at human scale, not heroic | Posed, staged, or theatrical |
| Honest | Imperfect properties shown including imperfect parts | Glamour-retouched or HDR-heavy |

## Subjects (what to shoot)

### Operator portraits (Megan)

The primary brand photography. Used on:

- Home page hero (neutral-acquisition)
- About page
- Owner acquisition hero
- Email signature avatar
- Blog post author byline
- Document letterheads (small inset)

### Process photos

Megan working. Used on:

- Owner acquisition evidence sections ("How I work")
- Blog post field notes
- Social media

Examples:

- Megan at a kitchen table with an owner reviewing a proposal
- Megan on a roof with a contractor
- Megan reading a lease at her desk
- Megan walking a property with a renter
- Megan at a city permit office

### Property photos

Used on listings and listing detail pages. See dedicated spec below.

### Place photos

Pacific Northwest setting moments. Used sparingly on marketing surfaces for atmosphere:

- Wet sidewalk in November
- Cedar shake siding close-up
- Douglas fir branches against gray sky
- Bothell, Ballard, Edmonds neighborhood streets
- Specific local context (a Ballard alley, a Queen Anne hill, a Snohomish farm road)

## Style rules

### Composition

- Wide enough to read context
- Subject not heroically centered; off-center compositions allowed
- Foreground / midground / background layering
- No filters that obscure or stylize the place

### Light

- Natural light only
- Overcast is on-brand (PNW reality)
- Golden hour acceptable but not required
- No artificial studio lighting
- No HDR (high dynamic range) effects
- No heavy contrast bumping
- Shadows allowed and visible

### Color

- Color-correct for accurate skin tones
- Greens of the place preserved (cedar, evergreen, moss, lichen)
- Grays of the place preserved (rain, sidewalk, sky)
- Avoid orange tinting (teal-and-orange color grading forbidden)
- Avoid washed-out faded film looks

### Subject behavior

- Eye contact in operator portraits, not heroic
- People relaxed, not posed
- Hands doing something purposeful (reading a document, opening a door, pointing at a feature)
- No stiff staged smiles
- No crossed arms over chest

## Operator portrait specifications

### Primary hero portrait

Used at the top of the home page.

| Attribute | Spec |
|---|---|
| Crop | Three-quarter or full body |
| Setting | Outdoors, in front of an actual managed property |
| Wardrobe | Field outerwear matching the climate; not suit, not workwear costume |
| Pose | Standing, eye contact, relaxed |
| Background | Property visible behind, context readable |
| Light | Natural, overcast or filtered |
| Aspect ratio | 4:5 portrait for hero, 16:9 landscape for wide deployments |
| Retouching | None beyond color correction |

### Secondary portraits

For document letterheads, email signatures, social profiles:

- Headshot crop
- Same wardrobe and lighting standards
- Square aspect ratio for avatar use
- Output at 1:1, 4:5, 3:4 ratios

### Photography session priorities

When commissioning a session:

1. Primary hero portrait (one)
2. Two to three process portraits (Megan with property, Megan with owner, Megan with vendor)
3. Headshot for avatar (one)
4. Two to three secondary lifestyle (Megan walking neighborhood, Megan with vehicle, Megan at desk)

## Property photo standards

Used on `/rentals` listings and listing detail pages.

### Required shots per property

| Shot | Spec |
|---|---|
| Exterior wide | Full building, level horizon, no fisheye, daylight |
| Living area | Wide angle showing layout |
| Kitchen | Counters, cabinets, appliances visible |
| Each bedroom | Wide angle showing layout and windows |
| Each bathroom | Counter and fixtures |
| Distinctive features | Any feature that justifies the rent (deck, fireplace, basement workshop) |

### Property photo rules

- Daylight only (no flash, no twilight HDR)
- Level horizon (correct keystone distortion)
- No fisheye / ultrawide distortion above 24mm equivalent
- No HDR effects
- No virtual staging (empty rooms shown empty)
- Show the building including imperfect parts
- 4:3 aspect ratio for grid cards, native ratio for detail page gallery

### Property photo do-nots

- HDR-saturated sky-blue
- Heavy contrast bumping
- Virtual furniture
- Removed cars from street
- Removed power lines
- Removed neighboring properties
- Sky replacement
- Lens flares

## Process photo guidance

For blog field notes and evidence surfaces:

- Tells one specific story per shot
- Has a date and a place
- Includes Megan in context (not all process photos, but most)
- Captures real work (not a model holding a clipboard pretending)

## Stock photo policy

**Default: do not use stock photos.** The brand position depends on the photography being real and specific.

### Exception

Stock photos may appear only when:

1. The image is a background texture or pattern, not a subject (e.g., a topographic map texture)
2. The image is editorial reference (e.g., a generic kitchen example in a blog post about deferred maintenance)

If a stock photo is used in case 2, caption MUST acknowledge it ("File photo, illustrative") to preserve trust.

## Forbidden photography

- Handshake photos (suits shaking hands)
- Suited-couple-receiving-keys
- Skyline of Seattle from waterfront
- Drone-over-Mount-Rainier
- Diverse-team-laughing-at-laptop
- Smiling family at front door of suburban house
- Generic real estate yard sign closeups
- Stock "happy renters" or "happy landlords"
- Photos of money or cash
- Photos of contracts with visible signatures (legal risk)
- Aerial drone shots of neighborhoods (creepy, unnecessary)
- Posed Realtor®-style headshots (gold-frame portrait, blue gradient backdrop)
- Crossed-arms power poses
- Sunset over a generic skyline
- Models holding keys with prop houses

## Acceptance

This doc is acceptable when:

- A photographer can shoot a session from this doc as the brief
- A listing-photo standard is enforceable
- A blog editor can decide whether a photo fits the brand by referring to this doc
- Forbidden categories are clear enough that a designer would refuse a stock photo request
