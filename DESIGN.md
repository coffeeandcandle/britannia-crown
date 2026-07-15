---
name: Britannia Crown
description: British education consultancy in Dubai — nursery search, school placement, tutoring, homeschool support, and an ambassador referral programme
colors:
  burgundy: "#6B1E3D"
  dark-burgundy: "#4A0E29"
  champagne: "#E8C89C"
  warm-gold: "#D4A574"
  warm-gold-text: "#8C5C2B"
  burgundy-alt: "#5C1A35"
  white: "#FFFFFF"
  off-white: "#FAF6F1"
  text-dark: "#2A0D1A"
  text-mid: "#6B3A4E"
typography:
  display:
    fontFamily: "'Cormorant Garamond', serif"
    fontSize: "clamp(2.375rem, 5.5vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "normal"
  headline:
    fontFamily: "'Cormorant Garamond', serif"
    fontSize: "clamp(2rem, 4vw, 3.375rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "normal"
  title:
    fontFamily: "'Cormorant Garamond', serif"
    fontSize: "22px-26px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "'Jost', sans-serif"
    fontSize: "15px-18px"
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "'Jost', sans-serif"
    fontSize: "11px-13px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "1px-4px"
rounded:
  sm: "2px"
  md: "4px"
  pill: "100px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "40px"
  xl: "60px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.champagne}"
    textColor: "{colors.dark-burgundy}"
    rounded: "{rounded.sm}"
    padding: "17px 38px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark-burgundy}"
    rounded: "{rounded.sm}"
    padding: "17px 38px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.champagne}"
    rounded: "{rounded.sm}"
    padding: "17px 38px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text-mid}"
    rounded: "{rounded.md}"
    padding: "44px 38px"
  card-featured:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.champagne}"
    rounded: "{rounded.md}"
    padding: "44px 38px"
---

# Design System: Britannia Crown

## 1. Overview

**Creative North Star: "The Family Advisor"**

Britannia Crown reads like a trusted family advisor's study, not a marketplace stall: a deep burgundy and champagne palette borrowed from British heritage branding, paired with a serif display face for authority and a light, airy sans body face for warmth. The system exists to make a family relocating to Dubai feel they are handing their child's education to a confident, established partner — never a discount tutoring aggregator, never a cold corporate portal.

The system explicitly rejects generic template energy: no stock-agency blue-and-white SaaS look, no discount-marketplace badges or urgency banners, no gimmicky animation. Confidence is conveyed through restraint — generous whitespace, one accent color used sparingly, and real numbers (144K students, 50+ tutors) instead of decorative flourish.

**Key Characteristics:**
- Deep burgundy + champagne as the only real color statement; everything else is neutral
- Serif display type (Cormorant Garamond) for every heading, paired with a light-weight sans (Jost) for body copy
- Flat-by-default surfaces; shadow appears only as a hover response, never at rest
- Pill-shaped tags/badges contrasted against sharp 2-4px corners everywhere else
- Wide, generous section padding (100px desktop) — nothing feels cramped or ad-dense

## 2. Colors

The palette is a single heritage-burgundy statement over warm neutrals — restrained, not colorful.

### Primary
- **Burgundy** (#6B1E3D): the dominant surface color for dark sections (stats bar, ambassador banner, featured cards) and the default text-link/accent color on light backgrounds.
- **Dark Burgundy** (#4A0E29): deepest surface, used for the nav bar, footer, and the darkest section backgrounds (hero overlay, CTA section, earnings section).

### Secondary
- **Champagne** (#E8C89C): the single accent used for all calls to attention — button fills on dark backgrounds, headline emphasis (`<em>`), nav brand wordmark, stat numbers. This is the "gold" of the system.
- **Warm Gold** (#D4A574): a deeper secondary accent used for decorative hairlines, dividers, and gradient borders on light backgrounds — never used for text, only non-text ornament (fails contrast at normal text sizes).
- **Warm Gold Text** (#8C5C2B): the text-safe variant of Warm Gold — same hue family, darkened to pass 4.5:1+ contrast on white/off-white. Use this, never raw Warm Gold, for any actual text on a light background (eyebrow labels, connector arrows, the signup form's required-field asterisk).
- **Burgundy Alt** (#5C1A35): a slightly lighter burgundy used once, to differentiate the "Teachers & Educators" featured card from the standard featured-card burgundy. Documented here so it's an intentional variant, not undocumented drift.

### Neutral
- **Off-White** (#FAF6F1): the default page/section background on light sections.
- **White** (#FFFFFF): card and form-field backgrounds; pure white is reserved for surfaces sitting on top of off-white, creating gentle layering without shadow.
- **Text Dark** (#2A0D1A): default body text color on light backgrounds.
- **Text Mid** (#6B3A4E): secondary/muted text — descriptions, captions, form labels on light backgrounds.

### Named Rules
**The One Accent Rule.** Champagne is the only color used to signal "act here." It never appears twice in the same viewport for two different purposes — if it's the button, it isn't also the icon glow.

**The Text-Safe Gold Rule.** Warm Gold (#D4A574) never renders as text on a light background — it fails WCAG contrast there. Text uses Warm Gold Text (#8C5C2B) instead; raw Warm Gold is reserved for lines, borders, and gradients where contrast rules don't apply. On dark backgrounds (ambassador, earnings, CTA sections), eyebrow labels use Champagne instead of either gold variant.

## 3. Typography

**Display Font:** 'Cormorant Garamond', serif (weights 400–700, with italic for emphasis)
**Body Font:** 'Jost', sans-serif (weights 300–600)

**Character:** A classic British-editorial pairing — serif for gravitas and warmth, geometric-light sans for clean modern legibility. The combination is what keeps "heritage" from tipping into "old-fashioned."

### Hierarchy
- **Display** (600 weight, `clamp(2.375rem, 5.5vw, 4.75rem)`, line-height 1.08): hero H1 only. Uses italic champagne-colored `<em>` for the emotional phrase within the headline.
- **Headline** (600 weight, `clamp(2rem, 4vw, 3.375rem)`, line-height 1.12): section titles (`.section-title`) — one per major section.
- **Title** (600 weight, 22–26px, line-height 1.2): card titles, FAQ questions, step titles.
- **Body** (300 weight, 15–18px, line-height 1.7): all paragraph copy. Generous line-height is deliberate — this is a reading-heavy trust-building site, not a scannable app.
- **Label** (500 weight, 11–13px, letter-spacing 1–4px, uppercase): eyebrow text, nav links, button labels, stat labels. Uppercase + wide tracking is the system's signature "quiet emphasis" device, used instead of bold or color for de-emphasized structure.

### Named Rules
**The Uppercase Whisper Rule.** Small uppercase, wide-tracked labels (eyebrows, nav, stat labels) never exceed 13px. They organize the page without competing with headline serif type for attention.

## 4. Elevation

Flat by default. Cards, forms, and buttons sit with no resting shadow — depth is instead conveyed through background-color layering (off-white page → white card) and a 1px hairline border (`rgba(107,30,61,0.08)`). Shadow exists purely as a hover/interaction response, never a static decoration.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 20px 50px rgba(107,30,61,0.12)`): applied to cards on hover, paired with a `translateY(-4px)` lift.
- **Button glow** (`box-shadow: 0 8px 30px rgba(232,200,156,0.3)`): applied to primary buttons on hover, paired with `translateY(-2px)`.

### Named Rules
**The Flat-Until-Touched Rule.** Nothing casts a shadow at rest. If it's not being hovered or focused, it sits flush against its background.

## 5. Components

Buttons, cards, and inputs all read as refined and restrained: sharp small-radius corners, thin hairline borders instead of heavy fills, and understated hover motion (a small lift, never a bounce or scale).

### Buttons
- **Shape:** 2px radius — nearly square, never pill-shaped (pills are reserved for tags/badges only).
- **Primary:** champagne fill, dark-burgundy text, `17px 38px` padding, uppercase label, 2px letter-spacing.
- **Hover:** background shifts to white, `translateY(-2px)`, champagne-tinted glow shadow.
- **Secondary/Ghost:** transparent fill, 1px champagne-tinted border (`rgba(232,200,156,0.4)`), champagne text; hover fills a faint champagne tint (`rgba(232,200,156,0.1)`) and solidifies the border.

### Chips (Tags)
- **Style:** pill-shaped (100px radius) — the one place the system breaks its sharp-corner rule, deliberately, to mark "this is metadata, not an action."
- **State:** age-range pills on hero use a translucent champagne fill (`rgba(232,200,156,0.12)`) with a thin matching border; service-age tags on cards use a translucent burgundy fill on light backgrounds.

### Cards / Containers
- **Corner Style:** 4px radius.
- **Background:** white on off-white/white sections; burgundy (`.featured` variant) for highlighted cards, flipping all internal text to champagne/white.
- **Shadow Strategy:** flat at rest; hover lift per the Elevation section, plus a top-edge gradient bar (burgundy → warm-gold) that scales in from the left on hover.
- **Border:** 1px hairline, `rgba(107,30,61,0.08)`.
- **Internal Padding:** `44px 38px`.

### Inputs / Fields
- **Style:** translucent white/champagne-tinted background depending on context (dark form on CTA section vs. light form on signup section), 1px border, 2px radius, no heavy inset shadow.
- **Focus:** border brightens to solid champagne or burgundy (context-dependent); background lightens slightly. No glow ring.

### Navigation
- **Style:** fixed dark-burgundy bar with blur backdrop; wordmark in champagne serif with a small uppercase sub-label beneath it. Links are translucent champagne uppercase labels with an animated underline on hover; the CTA link breaks pattern as a solid champagne pill-cornered button.
- **Mobile:** links collapse behind a hamburger toggle; a full-height dark-burgundy panel slides in from the right with larger uppercase links stacked vertically.

## 6. Do's and Don'ts

### Do:
- **Do** keep champagne (#E8C89C) as the only "act here" signal — one accent, used sparingly (the One Accent Rule).
- **Do** use uppercase, wide-tracked labels (≤13px) for all structural/meta text — eyebrows, nav, stat labels, button labels.
- **Do** keep cards and buttons flat at rest; only add shadow/lift on hover or focus.
- **Do** pair every headline in Cormorant Garamond with body copy in Jost — never mix another display or body face into a page.
- **Do** favor real, specific numbers over decorative claims when building trust-building sections (stat bars, "why us" panels).

### Don't:
- **Don't** introduce a second saturated accent color alongside champagne — it dilutes the One Accent Rule.
- **Don't** use rounded/pill shapes on buttons or cards — pill shape is reserved exclusively for tags/badges.
- **Don't** add resting shadows to cards, buttons, or inputs — this system is flat-until-touched.
- **Don't** let this drift toward a generic SaaS/template look (blue gradients, glassmorphism, urgency badges, countdown timers) — that directly contradicts the "boutique consultancy, not discount marketplace" positioning in PRODUCT.md.
- **Don't** use bold weight for emphasis in body copy — emphasis is carried by champagne color and italic serif, not font-weight jumps.
