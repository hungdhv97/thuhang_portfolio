# 005 — Tokenize motion curves and align reveal rise to 16px

- **Status**: DONE
- **Commit**: 2a3aa87
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (`src/styles/global.css`), small–medium

## Problem

`design.md` specifies reveal as fade + **16px** rise with `cubic-bezier(0.22, 1, 0.36, 1)` and `MOTION_INTENSITY: 5`. Source uses **12px** rise and the file header still says `MOTION_INTENSITY 4`. The same two cubic-beziers are hand-typed in many rules instead of shared tokens — future edits will drift.

```css
/* src/styles/global.css:1-6 — dial comment drift */
/* Dials: DESIGN_VARIANCE 7 · MOTION_INTENSITY 4 · VISUAL_DENSITY 4 */

/* src/styles/global.css:190-196 — reveal distance drift vs design.md */
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  }
}
```

Repeated literals today:

- `cubic-bezier(0.22, 1, 0.36, 1)` — reveal / hero
- `cubic-bezier(0.32, 0.72, 0, 1)` — drawer / CTA press

## Target

Add tokens on `:root` (extend existing token block at `global.css:8-19`), then replace literals. Keep durations as they are unless another plan already changed them — this plan is cohesion, not a speed rewrite.

```css
/* target — add to :root */
:root {
  /* …existing color/font tokens… */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); /* editorial reveal / hero — design.md */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1); /* iOS-like drawer / UI chrome */
  --reveal-distance: 16px;
}
```

```css
/* target — reveal */
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    opacity: 0;
    transform: translateY(var(--reveal-distance));
    transition:
      opacity 0.75s var(--ease-out),
      transform 0.75s var(--ease-out);
  }
  .reveal.is-in {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Replace hand-typed curves:

| Selector area | Use token |
| --- | --- |
| `.reveal`, hero portrait/caption/accent | `var(--ease-out)` |
| `.mobile-drawer`, `.menu-backdrop`, `.menu-bar`, `.drawer-link`, `.cta-solid` transform/bg | `var(--ease-drawer)` |

Also update the file header dial comment to `MOTION_INTENSITY 5` to match `design.md`.

Do **not** change hero’s longer marketing durations (0.9s / 1.15s / 0.55s) — deliberate first-view choreography; only swap the bezier literal for `var(--ease-out)`.

Drawer link `translateY(12px)` may stay at 12px (chrome, not the section reveal token) unless you prefer `var(--reveal-distance)` for consistency — **prefer leaving drawer at 12px** so section reveal is the only 16px consumer.

## Repo conventions to follow

- Color tokens already live on `:root` / `html.dark` in `global.css` — put motion tokens beside them.
- `design.md` Motion section is the source of truth for reveal distance and curve.
- Respect restrained personality: do not add stagger or new keyframes in this plan.

## Steps

1. Add `--ease-out`, `--ease-drawer`, and `--reveal-distance: 16px` to `:root`.
2. Update the top-of-file dials comment to `MOTION_INTENSITY 5`.
3. Point `.reveal` at `var(--reveal-distance)` + `var(--ease-out)`.
4. Replace remaining `cubic-bezier(0.22, 1, 0.36, 1)` with `var(--ease-out)` and `cubic-bezier(0.32, 0.72, 0, 1)` with `var(--ease-drawer)` within `global.css` only.
5. Do not edit Astro components.

## Boundaries

- Do NOT invent a third “almost the same” bezier (e.g. do not introduce AUDIT’s `cubic-bezier(0.23, 1, 0.32, 1)` as a parallel `--ease-out` — this repo’s editorial out-curve is `0.22, 1, 0.36, 1` per design.md).
- Do NOT change reduced-motion architecture (plan 003 owns that).
- Do NOT alter work-item hover behavior (plan 001).
- Do NOT add dependencies.
- If tokens already exist under different names, extend those names instead of duplicating — STOP and report if unsure.

## Verification

- **Mechanical**: grep `cubic-bezier(0.22, 1, 0.36, 1)` and `cubic-bezier(0.32, 0.72, 0, 1)` in `src/styles/global.css` — should be zero (only inside token definitions). Confirm `translateY(var(--reveal-distance))` or `16px` on `.reveal`.
- **Feel check**:
  - Hard-refresh: section reveals still ease-out with a slightly clearer 16px rise (vs old 12px) — calm, not bouncy.
  - Drawer/CTA still feel the same curve family.
  - Reduce motion: reveal still instant via existing JS/CSS gate.
- **Done when**: design.md distance + dials match CSS; curves referenced via tokens; no parallel conflicting ease-out token.
