# Design system — Thu Hằng portfolio (Astro)

## Design Read

Solo BA portfolio for recruiter/hiring managers (HR-tech, ERP, banking, FnB), with premium editorial / calm-authority language, leaning toward letter composition + hairline typography (Fraunces + Source Sans 3 + forest accent).

## Dials

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 4`

## Stack

- Astro + TypeScript + Tailwind CSS v4
- Minimal JS: theme toggle + IntersectionObserver reveal
- No Next.js

## Genre / theme

- Genre: `editorial`
- Macrostructure: `letter` (left-biased)
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

- Display: Fraunces (roman headings only)
- Body: Source Sans 3
- Labels: JetBrains Mono, uppercase, tracked

## Layout rules

- No card grids in hero
- No empty gray image placeholders — abstract CSS marks only
- Distinct section rhythms (pull-quote About, numbered Work, timeline Experience, columnar Skills)
- Real CV metrics only

## Motion

- Reveal: fade + 12px rise when `prefers-reduced-motion: no-preference`
- Work-row hover dim
- Theme toggle without flash (inline head script)
