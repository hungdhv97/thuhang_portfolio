# 002 — Fix mobile drawer close delay and timeout mismatch

- **Status**: TODO
- **Commit**: 2a3aa87
- **Severity**: MEDIUM
- **Category**: Interruptibility / Easing & duration
- **Estimated scope**: 2 files (`src/styles/global.css`, `src/components/Header.astro`), small

## Problem

Drawer open uses interruptible CSS transitions with `--ease-drawer`-class curve `cubic-bezier(0.32, 0.72, 0, 1)` — good. Two close bugs make dismiss feel sluggish:

1. `.drawer-link` always carries `transition-delay: calc(var(--i, 0) * 50ms + 60ms)`. On close (`.is-open` removed), that same positive delay still applies, so links stagger *out* after the panel starts moving — exit feels late and mushy.
2. JS hides the drawer after `320ms`, but CSS panel transition is `0.38s` (380ms). The node can get `hidden` before the transform finishes (~60ms early).

```css
/* src/styles/global.css:848-858 — current */
.drawer-link {
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--color-rule);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.4s cubic-bezier(0.32, 0.72, 0, 1),
    transform 0.4s cubic-bezier(0.32, 0.72, 0, 1),
    color 0.2s ease,
    border-color 0.2s ease;
  transition-delay: calc(var(--i, 0) * 50ms + 60ms);
}
```

```ts
/* src/components/Header.astro:155-165 — current */
} else {
  drawer.classList.remove("is-open");
  backdrop.classList.remove("is-open");
  const finish = () => {
    if (!open) {
      drawer.hidden = true;
      backdrop.hidden = true;
    }
  };
  if (reduce.matches) finish();
  else setTimeout(finish, 320);
  lastFocus?.focus();
}
```

## Target

- Stagger **only while open** (entrance). On close, delay `0ms`, slightly faster opacity/transform (~200–250ms) so the panel leads and links don’t lag.
- Sync hide timeout to panel duration: **380ms** (match `0.38s` on `.mobile-drawer`).
- Keep curve `cubic-bezier(0.32, 0.72, 0, 1)` (repo drawer vocabulary).
- Transform + opacity only.

```css
/* target — drawer-link */
.drawer-link {
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--color-rule);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.22s cubic-bezier(0.32, 0.72, 0, 1),
    transform 0.22s cubic-bezier(0.32, 0.72, 0, 1),
    color 0.2s ease,
    border-color 0.2s ease;
  transition-delay: 0ms;
}

.mobile-drawer.is-open .drawer-link {
  opacity: 1;
  transform: translateY(0);
  transition-duration:
    0.4s,
    0.4s,
    0.2s,
    0.2s;
  transition-delay: calc(var(--i, 0) * 50ms + 60ms);
}
```

(If merging into the existing `.mobile-drawer.is-open .drawer-link` rule that already sets opacity/transform, add the delay + duration overrides there; keep closed-state delay at `0ms` on the base rule.)

```ts
/* target — Header.astro close path */
else setTimeout(finish, 380);
```

## Repo conventions to follow

- Drawer comment in CSS: “transform/opacity only, interruptible” (`global.css` ~763).
- Curve already used: `cubic-bezier(0.32, 0.72, 0, 1)` on `.mobile-drawer`, `.menu-backdrop`, `.menu-bar`.
- Open still uses `requestAnimationFrame` before adding `.is-open` — keep that pattern.
- Exemplar: `.mobile-drawer` transition block at `global.css:830-832`.

## Steps

1. In `src/styles/global.css`, set base `.drawer-link` `transition-delay` to `0ms` and closed-state duration for opacity/transform to `0.22s` with `cubic-bezier(0.32, 0.72, 0, 1)`.
2. Move entrance stagger onto `.mobile-drawer.is-open .drawer-link` only: `transition-delay: calc(var(--i, 0) * 50ms + 60ms)` and entrance duration `0.4s` for opacity/transform.
3. In `src/components/Header.astro`, change `setTimeout(finish, 320)` to `setTimeout(finish, 380)`.
4. Do not change focus trap, Escape handling, or `hidden`/`aria-*` logic beyond the timeout value.

## Boundaries

- Do NOT restyle desktop nav or theme toggle.
- Do NOT switch drawer motion to `@keyframes` (must stay CSS transitions for interruptibility).
- Do NOT add Motion/Framer or new dependencies.
- Do NOT animate width/height/top/left.
- If close timeout or drawer durations have already been aligned (drift), STOP and report.

## Verification

- **Mechanical**: grep `setTimeout(finish` → `380`; confirm closed `.drawer-link` has `transition-delay: 0ms` and open rule owns the stagger.
- **Feel check**:
  - Open menu: links still stagger in (~50ms × index + 60ms).
  - Close via backdrop / Escape / link: panel and links retreat **immediately** (no exit stagger); spam toggle — motion retargets, does not restart from keyframe zero.
  - Animations panel 10%: close path shows delay 0 on links; drawer transform lasts ~380ms then `hidden` applies.
  - `prefers-reduced-motion: reduce`: existing `transition: none` + immediate `finish()` still works.
- **Done when**: close feels snappy; hide timeout ≥ panel duration; stagger is open-only.
