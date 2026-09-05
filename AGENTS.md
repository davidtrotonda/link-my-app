# Link My App Agent Notes

Use this repository as a React 19 + Vite + Firebase app.

## Project Commands

- Install dependencies with `npm install`.
- Run local development with `npm run dev`.
- Build production assets with `npm run build`.
- Preview production output with `npm run preview`.

## Important Paths

- `src/App.jsx` contains the main app shell, auth flow, dashboard, forms, redirects, and routes.
- `src/LandingVisuals.jsx` contains the public landing visuals and shared marketing sections.
- `src/lib/i18nRoutes.js` defines localized routes for English, Spanish, French, Japanese, German, Portuguese, Italian, Korean, Dutch, Arabic, and Hindi.
- `public/llms.txt` is the public LLM entry point.
- `public/agents.md` is the public website guide for AI agents.
- `public/robots.txt` and `public/sitemap_index.xml` expose crawl guidance.

## Agent-Friendly Requirements

- Keep interactive controls labeled and keyboard accessible.
- Avoid invalid ARIA on generic `div` or `span` elements. Use semantic elements first; use `aria-hidden="true"` for decorative visuals.
- Forms that agents may operate should include `toolname`, `tooldescription`, stable `name` attributes, and useful `toolparamdescription` attributes.
- Keep `/llms.txt` valid Markdown with a single H1, concise summary, and Markdown links to important resources.

## Safety

- Do not remove existing user-created changes unless explicitly requested.
- Do not expose private Firebase keys or Stripe secrets in public files.
- Do not mark destructive dashboard actions as agent tools without explicit user confirmation UX.
