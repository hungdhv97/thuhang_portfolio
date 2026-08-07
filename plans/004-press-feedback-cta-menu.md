# 004 — Add subtle press feedback to text CTAs and menu toggle

- **Status**: TODO
- **Commit**: 2a3aa87
- **Severity**: MEDIUM
- **Category**: Missed opportunities / Physicality & origin
- **Estimated scope**: 1 file (`src/styles/global.css`), small (optional 1-line class tweak in Header if needed)

## Problem

Solid CTA already confirms press with `transform: scale(0.98)` (`global.css:557-558`). Text CTAs (Contact email/phone, secondary links) and the mobile menu toggle have no `:active` scale — presses feel dead next to `.cta-solid` and the theme toggle (`active:scale-[0.97]` in `Header.astro:40`).

Frequency: Contact CTAs are occasional (recruiter reaches out once); menu toggle is occasional. Purpose: **Feedback**. Budget: 100–160ms, scale 0.95–0.98.

```css
/* src/styles/global.css:520-531 — current cta-text (no active) */
.cta-text {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  color: var(--color-ink);
  text-decoration: none;
  border-bottom: 1px solid var(--color-rule);
  padding-bottom: 0.2rem;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}
```

```html
<!-- src/components/Header.astro:76-88 — menu-toggle has no active scale -->
<button
  type="button"
  id="menu-toggle"
  class="menu-toggle relative flex h-10 w-10 items-center justify-center border-0 bg-transparent p-0 md:hidden"
  ...
>
```

## Target

```css
/* target — extend .cta-text */
.cta-text {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  color: var(--color-ink);
  text-decoration: none;
  border-bottom: 1px solid var(--color-rule);
  padding-bottom: 0.2rem;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.cta-text:active {
  transform: scale(0.97);
}

.menu-toggle {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.menu-toggle:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .cta-text,
  .menu-toggle {
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }
  .cta-text:active,
  .menu-toggle:active {
    transform: none;
  }
}
```

Notes:

- Use `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out) for press, **or** if plan 005 has landed tokens, use `var(--ease-out)`.
- Do **not** add press scale to `.nav-a` (tens/day in-header navigation — reject per frequency gate).
- Transform + existing color only.

## Repo conventions to follow

- `.cta-solid:active { transform: scale(0.98); }` + `transform 0.15s cubic-bezier(0.32, 0.72, 0, 1)` (`global.css:548-558`) — exemplar; text links can use `0.97` to match theme toggle.
- Theme toggle already: `active:scale-[0.97]` (`Header.astro:40`).
- `design.md`: “CTA active `scale(0.98)`” — solid stays 0.98; text/icon controls at 0.97 is consistent subtle feedback.

## Steps

1. Update `.cta-text` in `src/styles/global.css` to include `transform 160ms` in `transition` and add `:active { transform: scale(0.97) }`.
2. Add `.menu-toggle` transform transition + `:active` scale `0.97` in the same file (near `.menu-toggle:focus-visible` / `.theme-toggle` rules ~899–910).
3. Add a small reduce override so active scale does not travel under `prefers-reduced-motion: reduce` (color hover may remain).
4. Do not modify `.nav-a` or `.cta-solid` scale values.

## Boundaries

- Do NOT animate nav links’ press scale.
- Do NOT add hover scale on CTAs (press only).
- Do NOT touch Work list hover.
- Do NOT add JS.
- If `:active` scales already exist on these selectors (drift), STOP and report.

## Verification

- **Mechanical**: `.cta-text:active` and `.menu-toggle:active` exist with `scale(0.97)`; transition includes transform ~160ms.
- **Feel check**:
  - Press Contact email/phone: brief scale-in confirmation; release returns smoothly (CSS transition retargets).
  - Press hamburger: same; does not fight open bar morph (bars use their own transform — if conflict, apply scale on `.menu-toggle` only and keep bars as children; child transforms are independent).
  - DevTools 10% playback: press phase ~100–160ms ease-out.
  - Reduce motion: no scale travel on active.
- **Done when**: text CTAs and menu toggle match the existing solid/theme press language without animating high-frequency nav.
