## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Cursor Cloud specific instructions

This is a single static Astro + Tailwind CSS v4 portfolio site (no backend, database, or external services). Use npm (there is a `package-lock.json`). The startup update script already runs `npm install`.

- Run (dev): `npm run dev` serves the site at http://localhost:4321. The background variant documented above (`astro dev --background` + `astro dev stop/status/logs`) is supported by this Astro version.
- Build: `npm run build` outputs static files to `dist/`; `npm run preview` serves that build. See `README.md` for the full script list.
- There are no test or lint scripts configured. `astro check` is not a repo command and, if run, triggers an interactive prompt to install `@astrojs/check` + `typescript` — avoid it in non-interactive sessions.
- All page copy/metrics live in `src/data/content.ts`; the single page is `src/pages/index.astro` with `src/layouts/BaseLayout.astro`. The header has a light/dark theme toggle (DAY/NIGHT) driven by minimal inline JS.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
