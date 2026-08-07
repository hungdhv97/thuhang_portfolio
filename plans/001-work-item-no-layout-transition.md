# 001 — Stop animating layout on work-item hover

- **Status**: DONE
- **Commit**: 2a3aa87
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file (`src/styles/global.css`), small

## Problem

`.work-item` transitions `padding` (a layout property) on hover/focus. Recruiters skim this list constantly; layout+paint on every hover feels sticky and burns main-thread work. Design already wants work-row hover dim via opacity/color only (`design.md` Motion).

```css
/* src/styles/global.css:338-349 — current */
.work-item {
  border-top: 1px solid var(--color-rule);
  border-left: 2px solid transparent;
  margin-left: -2px;
  padding: 1.5rem 0.75rem 1.5rem 0.85rem;
  opacity: 1;
  background-color: transparent;
  transition:
    opacity 0.35s ease,
    background-color 0.35s ease,
    border-color 0.35s ease,
    padding 0.35s ease;
}
```

Hover/focus only change `opacity`, `background-color`, and `border-left-color` — never padding — so the padding transition is dead weight that still participates in style calc.

## Target

Animate only compositor-friendly / paint-cheap properties already used by the hover state. Keep duration short (tens-of-times/day hover tier). Prefer repo hover easing (`ease` for color/opacity per editorial calm).

```css
/* target */
.work-item {
  border-top: 1px solid var(--color-rule);
  border-left: 2px solid transparent;
  margin-left: -2px;
  padding: 1.5rem 0.75rem 1.5rem 0.85rem;
  opacity: 1;
  background-color: transparent;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}
```

Also shorten from `0.35s` → `0.2s` so the dim/highlight reads as near-imperceptible feedback, not a lingering fade (frequency: tens/day).

Leave the `@media (prefers-reduced-motion: reduce)` block that sets `.work-item { transition: none; }` as-is for this plan (plan 003 may refine reduced-motion globally).

## Repo conventions to follow

- Work hover is deliberate: sibling dim to `opacity: 0.4`, hovered row accent soft fill + left border (`global.css` ~372–381). Do **not** remove the hover-dim behavior.
- Animate transform/opacity (and here color/bg/border) only — never width/height/margin/padding/top/left.
- Exemplar of scoped property transitions: `.cta-solid` at `global.css:548-550` (lists exact properties, uses `cubic-bezier(0.32, 0.72, 0, 1)` for intentional UI).

## Steps

1. In `src/styles/global.css`, edit the `.work-item` `transition` declaration (~lines 345–349): remove `padding 0.35s ease`; change remaining durations from `0.35s` to `0.2s`.
2. Do not change padding values, hover selectors, or markup in `src/components/Work.astro`.

## Boundaries

- Do NOT touch Hero, drawer, reveal, or CTA rules.
- Do NOT remove `.work-list:hover .work-item:not(:hover)` dimming — that is a documented design tradeoff.
- Do NOT add dependencies or new keyframes.
- If `.work-item` no longer lists `padding` in `transition` when you open the file (drift), STOP and report.

## Verification

- **Mechanical**: open `src/styles/global.css` and confirm `.work-item` transition has no `padding` and durations are `0.2s`.
- **Feel check**:
  - Hover work rows on a fine pointer: siblings dim, active row accents; no perceptible “padding jump” or layout shift.
  - In DevTools Animations panel at 10%, confirm only opacity/background-color/border-color animate.
  - Toggle `prefers-reduced-motion: reduce` — hover still applies instantly (existing reduce rule).
- **Done when**: padding is not in the transition list; hover dim still works; no layout property is animated on `.work-item`.
