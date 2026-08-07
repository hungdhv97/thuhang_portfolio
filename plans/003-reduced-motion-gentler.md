# 003 — Prefer gentler reduced-motion, not zero motion

- **Status**: DONE
- **Commit**: 2a3aa87
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (`src/styles/global.css`), medium (several `@media (prefers-reduced-motion: reduce)` blocks)

## Problem

Audit rule: reduced motion means **fewer and gentler** animations — keep opacity/color that aids comprehension; drop large position/scale movement. Several blocks currently nuke everything with `transition: none` and `opacity: 1 !important` / `display: none`, including feedback that would still help.

Evidence:

```css
/* src/styles/global.css:323-334 — hero (current) */
@media (prefers-reduced-motion: reduce) {
  .hero-portrait::before,
  .hero-portrait-img,
  .hero-visual-caption {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
  .hero-portrait-img {
    transform: none;
  }
}
```

```css
/* src/styles/global.css:757-760 — section atmosphere (current) */
@media (prefers-reduced-motion: reduce) {
  .section-atmosphere::before {
    display: none;
  }
}
```

```css
/* src/styles/global.css:872-883 — drawer (current) */
@media (prefers-reduced-motion: reduce) {
  .menu-bar,
  .menu-backdrop,
  .mobile-drawer,
  .drawer-link {
    transition: none;
  }
  .drawer-link {
    opacity: 1;
    transform: none;
  }
}
```

Reveal path already soft-fails correctly in JS (`BaseLayout.astro` adds `.is-in` immediately when reduce matches) and CSS only applies translate under `no-preference` — keep that pattern.

## Target

Under `prefers-reduced-motion: reduce`:

| Surface | Keep | Drop |
| --- | --- | --- |
| Hero portrait accent / ken | Instant settled `transform: none`; caption may use short opacity ≤200ms if desired | `scale`, `scaleY`, `translateY` motion |
| `.section-atmosphere::before` | Optional instant opacity 0 or very short opacity ≤200ms `ease` | `display: none` (removes atmosphere entirely — prefer opacity 0 or no transition, not display nuke) |
| Drawer / backdrop / bars | Short opacity ≤200ms on backdrop OR instant open/close; links visible immediately | `translateX` / `translateY` movement |
| `.work-item` | May keep instant color/opacity (no duration) — OK | N/A |

Exact recipes:

```css
/* target — hero reduce */
@media (prefers-reduced-motion: reduce) {
  .hero-portrait::before {
    transition: none;
    transform: scaleY(1);
  }
  .hero-portrait-img {
    transition: none;
    transform: none;
  }
  .hero-visual-caption {
    transition: opacity 0.2s ease;
    transform: none;
    opacity: 1;
  }
}
```

```css
/* target — section atmosphere reduce */
@media (prefers-reduced-motion: reduce) {
  .section-atmosphere::before {
    transition: opacity 0.2s ease;
  }
}
```

(Do **not** use `display: none`. Hover may still reveal atmosphere without slide/scale.)

```css
/* target — drawer reduce */
@media (prefers-reduced-motion: reduce) {
  .menu-bar {
    transition: none;
  }
  .menu-backdrop {
    transition: opacity 0.2s ease;
  }
  .mobile-drawer {
    transition: opacity 0.2s ease;
    transform: none;
  }
  .mobile-drawer:not(.is-open) {
    opacity: 0;
  }
  .mobile-drawer.is-open {
    opacity: 1;
  }
  .drawer-link {
    transition: none;
    transition-delay: 0ms;
    opacity: 1;
    transform: none;
  }
}
```

Note: if `transform: none` on closed drawer would show the panel, keep closed state off-screen **without animation** via `transform: translateX(100%)` + `transition: none` (instant teleport is acceptable under reduce for spatial hide). Prefer:

```css
@media (prefers-reduced-motion: reduce) {
  .mobile-drawer {
    transition: none;
  }
  .menu-backdrop {
    transition: opacity 0.15s ease;
  }
  .drawer-link {
    transition: none;
    transition-delay: 0ms !important;
    opacity: 1;
    transform: none;
  }
}
```

Choose the second drawer recipe if the first fights `.is-open` transform rules — **instant transform, gentle backdrop opacity**. Update `Header.astro` only if reduce path still uses `finish()` immediately (it does — keep that).

## Repo conventions to follow

- Reveal already gates movement under `@media (prefers-reduced-motion: no-preference)` (`global.css:190-203`) — exemplar for “gentler = no travel”.
- JS reduce short-circuit: `BaseLayout.astro:67-71` and `Header.astro:164`.
- Personality: calm editorial — no bounce under reduce.

## Steps

1. Replace hero reduce block (~323–334) with settled transforms + optional short caption opacity only.
2. Replace section-atmosphere reduce (~757–760): remove `display: none`; allow short opacity transition or leave static.
3. Soften drawer reduce (~872–883): kill link/panel travel delays; allow backdrop opacity ≤200ms `ease` OR all `transition: none` but ensure links are visible without staggered hide.
4. Leave `.reveal` structure unchanged (already correct).
5. Do not edit `BaseLayout.astro` unless a reduce path regresses.

## Boundaries

- Do NOT remove reduced-motion support.
- Do NOT introduce motion libraries.
- Do NOT increase MOTION_INTENSITY or add decorative parallax.
- Do NOT change light/dark theme script.
- If another agent already rewrote these reduce blocks, STOP and report drift.

## Verification

- **Mechanical**: no `display: none` on `.section-atmosphere::before` under reduce; hero/drawer reduce blocks do not use `opacity: 1 !important` unless required to override a conflict.
- **Feel check**:
  - Enable Rendering → `prefers-reduced-motion: reduce`.
  - Hero: portrait and accent appear settled (no scale travel).
  - Open/close mobile menu: no sliding choreography; backdrop may soft-fade ≤200ms; links readable immediately.
  - Section atmosphere: still present or soft opacity — not hard-removed via `display: none`.
  - With reduce **off**, existing motion unchanged.
- **Done when**: reduce path keeps comprehension aids (opacity/instant state) and drops travel; no full nuke via `display: none` on atmosphere.
