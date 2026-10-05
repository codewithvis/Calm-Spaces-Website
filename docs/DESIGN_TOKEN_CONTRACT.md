# Calm Spaces Design Token Contract

## Source of truth

The implementation source of truth is [`design-system/tokens.css`](../design-system/tokens.css). Components should consume semantic tokens rather than raw colors, arbitrary spacing, arbitrary radii, or component-specific brand values.

## Token layers

1. **Primitive tokens** describe palette, spacing, type scale, radius, shadows, motion, z-index, and breakpoints.
2. **Semantic tokens** describe meaning: background, surface, text, border, brand, accent, state, mood, safety, and chart roles.
3. **Component tokens** describe reusable implementation contracts such as button heights, input heights, sidebar width, focus rings, loading states, and overlays.

## Core semantic roles

- `--color-bg-*`: page backgrounds and inverse contexts.
- `--color-surface-*`: paper, secondary, elevated, sunken, and inverse surfaces.
- `--color-text-*`: primary, secondary, tertiary, muted, inverse, and link text.
- `--color-border-*`: subtle, default, strong, and focus borders.
- `--color-brand-*`: primary action states and secondary brand color.
- `--color-accent-*`: warm, soft, and lavender accents.
- `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*`: accessible status states.
- `--color-mood-*`: user-selected emotional states only; never diagnosis.
- `--color-safety-*`: clear, calm safety surfaces.
- `--chart-*`: chart line, grid, axis, label, and secondary series roles.

## Typography

- `--font-display`: Fraunces through the Next font binding, with an editorial fallback.
- `--font-sans`: DM Sans through the Next font binding, with a readable fallback.
- `--font-mono`: system monospace for technical values only.
- Type scale, weight, leading, and tracking tokens are defined centrally.

## Layout and component contracts

- Spacing follows a 4px base grid from `--space-0` through `--space-120`.
- Radius ranges from editorial `--radius-none` to avatar/pill `--radius-full`.
- Default elevation is `--shadow-sm`; stronger shadows need a clear interaction or overlay reason.
- Interactive controls use `--focus-ring-*` and meet a minimum 44px target.
- Motion uses `--duration-*` and `--ease-*`; reduced motion removes non-essential animation.
- Layering uses the controlled `--z-*` scale rather than ad hoc extreme values.

## Theme behavior

Light mode uses warm ivory, paper, sand, sage, clay, and deep green-charcoal. Dark mode remaps the semantic layer to deep forest-charcoal, lifted green surfaces, warm text, and muted accents. Components do not branch on theme names.

## Governance

Before introducing a new token:

1. Check whether an existing semantic token already communicates the meaning.
2. Add a token only when the concept is reusable across components or pages.
3. Prefer semantic naming over palette naming.
4. Document the purpose and allowed usage.
5. Validate contrast and reduced-motion behavior.

Legacy `--color-bg`, `--color-surface`, and similar names remain compatibility aliases while route components are migrated to the semantic contract.
