---
version: 1
name: Clipper Pro study desk
description: A bold editorial landing page for a learning companion that turns web reading into an owned, reviewable library.
---

# Clipper Pro design system

## Direction

The marketing surface is **Persuade**: the page should make the product understandable in one glance and make starting feel obvious. It uses a study-desk visual language rather than generic AI SaaS conventions. Warm paper, ink, acid lime, and coral create a tactile editorial world; the product walkthrough is the hero artifact.

The page communicates only confirmed capabilities: clipping text from the web, keeping a personal library, and requesting AI summaries in bullets, paragraphs, or study notes. It does not use testimonials, user counts, benchmarks, or automatic-AI claims.

## Tokens

### Color

| Token | Value | Use |
|---|---|---|
| paper | `#f4efe6` | Page canvas |
| paper-bright | `#fffaf0` | Alternating content surface |
| ink | `#101820` | Primary text, borders, dark surfaces |
| slate | `#50605f` | Supporting text |
| lime | `#d9ff65` | Product accent and active emphasis |
| coral | `#ff927b` | Section accent |
| coral-deep | `#e55436` | Small accent text and icons |
| blush | `#eadbd4` | Quiet usage/limits transition surface |
| mint | `#8fe4d2` | Feature accent |

### Typography

The landing surface uses a two-family pairing: **Fraunces** for its editorial display voice and **Source Sans 3** for readable body and interface text. Both are loaded from Google Fonts with `display: swap`; the existing Inter variable remains available for non-marketing application surfaces.

- Display: `3.4rem` to `5.8rem`, Fraunces `700`, `-0.06em` tracking, `0.95` leading
- Section heading: `2.25rem` to `3rem`, Fraunces `700`, `-0.04em` tracking
- Body: `1rem` to `1.125rem`, `1.75` leading
- Labels: `0.75rem`, bold, uppercase, `0.2em` tracking

Headings use balanced wrapping and body copy uses pretty wrapping where supported. Georgia is the display fallback; Source Sans 3 falls back to the system sans stack through the inherited page font.

### Geometry and depth

- Borders: `2px solid ink` for editorial structure
- Buttons: square corners; minimum 48px height for touch
- Content panels: square corners and clear separators, not nested cards
- Emphasis depth: soft 4px offset shadow with ink or coral
- Sections: generous `5rem` to `7rem` vertical rhythm

## Components

### Header

Sticky, paper-colored navigation with an ink border. Desktop links anchor to page sections. Mobile uses a real expanded menu with a 44px control. The primary action is always **Sign in with Google**.

### Hero walkthrough

The hero is a two-part product story: a real-looking reading tab with selected text points to a saved clip and an on-demand bullet summary. The flow is literal and legible without relying on abstract dashboard cards.

### Feature rail

Three editorial columns explain clip, library, and summary capabilities. Each has one icon and one accent block; the rail is separated by rules rather than cards inside cards.

### Privacy and limits

The dark section explains opt-in AI, source retention, review formats, and visible monthly usage limits. The usage section distinguishes always-available clip/library functionality from usage-limited AI summaries.

### FAQ and CTA

Native `details` elements provide accessible disclosure without custom state. The final CTA repeats the Google sign-in action and avoids unsupported urgency or social proof.

## Responsive behavior

- Under `768px`, grids stack and the navigation becomes an expanded mobile menu.
- Hero walkthrough changes from side-by-side to a vertical clip-to-summary sequence.
- Touch actions stay at least 48px high.
- Body copy keeps a readable measure and never relies on color alone.

## Accessibility

Focus-visible rings use coral against both paper and ink surfaces. Text uses ink/slate values with strong contrast. Icons are paired with labels, decorative marks are hidden from assistive technology, disclosure uses native semantics, and the navigation has explicit expanded state.

## Files

- Landing surface: `app/(marketing)/page.tsx`
- Marketing shell: `app/(marketing)/layout.tsx`
- Global browser surface styling: `app/globals.css`
