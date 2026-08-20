# Design system

The frontend edition uses a violet/cyan interaction palette to distinguish it visually from the slate/blue fullstack edition.

## Principles

1. **Semantics before decoration** — buttons, links, headings, tables and dialogs use native semantics first.
2. **State is visible** — active, pressed, focus, disabled, pending and error states are not communicated by color alone.
3. **Density is a user preference** — compactness changes spacing, not information availability.
4. **Equivalent representations** — maps and charts have non-visual equivalents; cards never replace the semantic table permanently.
5. **Reduced motion is respected** — transitions collapse under `prefers-reduced-motion`.

Storybook documents primitives plus the adaptive explorer as an interaction-level composition.
