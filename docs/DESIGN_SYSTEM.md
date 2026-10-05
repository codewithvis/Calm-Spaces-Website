# Calm Spaces Design System

## Design intent

Calm Spaces should feel like a quiet digital room: warm, private, human, and easy to enter. It is not a productivity dashboard, a clinical portal, or an AI-themed SaaS page.

## Color system

- Background: warm off-white `#f7f4ed`
- Surface: soft paper white `#fffdf8`
- Surface muted: warm gray-green `#eee9de`
- Primary action: sage `#738d78`
- Primary strong: deep sage `#4f6f59`
- Welcome: warm sand `#e9d8bc`
- Reflection: muted lavender `#c9c7d9`
- Creative accent: terracotta `#b97961`
- Text: deep green-charcoal `#20332b`
- Muted text: soft green-gray `#64736b`
- Warning: muted amber `#9b6f3a`
- Danger: muted rose `#a85e5e`

Dark mode uses a deep green-charcoal environment and recalibrated surfaces rather than inverted white/black values.

## Typography

- Display and emotional headings: Fraunces
- UI and body copy: DM Sans
- Body copy uses generous line height and readable measure.
- Headings use sentence case and avoid oversized dashboard language.

## Components

- Calm primary and quiet secondary buttons
- Need-based discovery links
- Mood choice tiles
- Grouped sidebar navigation
- Five-item mobile bottom navigation
- Editorial resource cards
- Private journal surface
- Support and safety callouts
- Empty, loading, and error states with human copy
- Accessible chart summaries

## Interaction rules

- Minimum touch target: 44px.
- Visible keyboard focus uses the focus semantic token.
- Hover and selection are never communicated by color alone.
- Private features include nearby privacy language.
- Safety access remains visible but visually calm.
- Avoid streaks, leaderboards, guilt, diagnosis, and unnecessary metrics.

## Motion

- Fast: 120ms for hover and focus feedback.
- Normal: 240ms for navigation, drawers, and sheets.
- Slow: 480ms for immersive wellness experiences only.
- All animation respects `prefers-reduced-motion`.

## Responsive behavior

- Public pages use editorial bands and constrained reading widths.
- Authenticated pages use a grouped sidebar from `lg` upward.
- Authenticated pages use bottom navigation below `lg`.
- Layouts are tested for 320px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, and 1920px widths.
