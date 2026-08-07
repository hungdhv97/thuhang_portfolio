# Design system - Thu Hằng portfolio (Astro)

## Design Read

Solo BA portfolio for recruiter/hiring managers (HR-tech, ERP, banking, FnB), with premium editorial / calm-authority language, leaning toward letter composition + hairline typography (Fraunces + Source Sans 3 + forest accent).

Mode: redesign-preserve. Vibe: Editorial Luxury on cool stone + forest (not warm cream/brass). Layout: Editorial Split hero.

## Dials

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 4`

## Stack

- Astro + TypeScript + Tailwind CSS v4
- Self-hosted fonts via `@fontsource-variable` / `@fontsource`
- Minimal JS: theme toggle + IntersectionObserver reveal
- No Next.js

## Genre / theme

- Genre: `editorial`
- Macrostructure: `letter` (centered column)
- Theme: cool stone paper + forest accent
- Light default; `html.dark` tonal invert
- Paper grain overlay + soft radial atmosphere

## Tokens

| Token | Light | Role |
| --- | --- | --- |
| `--color-paper` | `oklch(96.8% 0.008 92)` | Canvas |
| `--color-ink` | `oklch(20% 0.02 55)` | Primary text |
| `--color-accent` | `oklch(46% 0.085 152)` | Signal (< 5% viewport) |
| `--color-rule` | ink @ 12% | Hairlines |

## Typography

- Display: Fraunces Variable (roman headings only)
- Body: Source Sans 3 Variable
- Labels: JetBrains Mono, uppercase, tracked

## Layout rules

- No card grids in hero
- No empty gray image placeholders - abstract CSS marks only
- Distinct section rhythms (pull-quote About, numbered Work, timeline Experience, columnar Skills)
- Real CV metrics only
- Sticky header stays editorial hairline bar (not floating dock)

## Motion

- Reveal: fade + 16px rise (`cubic-bezier(0.22, 1, 0.36, 1)`) when `prefers-reduced-motion: no-preference`
- Work-row hover dim; portrait / mark haptic hover (transform/opacity only)
- CTA active `scale(0.98)`; theme toggle without flash (inline head script)
