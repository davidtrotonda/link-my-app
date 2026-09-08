# Link My App Agent Notes

Link My App is a web-only React 19 + Vite application. Firebase provides the
backend and rollback hosting, Cloudflare serves the production application and
smart redirects, and Vercel is only the public front door for `link-my.app`.

## Source of truth and workflow

- GitHub repository: `davidtrotonda/link-my-app`.
- `origin/main` is the authoritative recoverable source after a reviewed change
  is merged. Git itself is the change and production history; do not maintain a
  separate production-history document.
- Work on a branch and open a pull request. Do not push feature work directly to
  `main`.
- Run the relevant web checks and inspect the preview or dry run before merging.
- Never merge or deploy to production without the user's explicit approval.
- This repository has no Android or iOS build/release workflow.

## Required checks

- Install reproducibly with `npm ci` using Node.js 24.
- Build the site with `npm run build`.
- Validate generated SEO with `npm run seo:check`.
- Run Worker tests with `npm run test:worker`.
- Type-check the Worker with
  `npm exec -- tsc -p cloudflare-smart-redirect/tsconfig.json`.
- Validate the Cloudflare bundle without publishing with
  `npm exec -- wrangler deploy --dry-run --config cloudflare-smart-redirect/wrangler.jsonc`.

The external-image check is useful as a manual diagnostic, but it is not a
required CI gate because third-party anti-bot protection can return false 403s.

## Production architecture

- Public URL: `https://link-my.app`.
- Cloudflare Worker: `link-my-app-smart-redirect-v2`. It serves `dist/` and owns
  the redirect logic in `cloudflare-smart-redirect/`.
- Vercel project: `link-my-app-frontdoor`. Its root directory is
  `vercel-frontdoor/`; it only rewrites requests to the Worker and adds the
  `X-Link-My-App-Frontdoor` header.
- Firebase project: `skeilink`. Authentication, Realtime Database and Functions
  remain backend services. Firebase Hosting is the rollback origin.

Do not replace the Vercel front door with a second application build. A normal
frontend change belongs in the Cloudflare deployment; Vercel only needs a new
deployment when `vercel-frontdoor/vercel.json` changes.

## Important paths

- `src/App.jsx`: app shell, auth, dashboard, forms, redirects and routes.
- `src/LandingVisuals.jsx`: public landing visuals and marketing sections.
- `src/lib/i18nRoutes.js`: localized routes.
- `cloudflare-smart-redirect/`: Worker, D1 migrations and Cloudflare config.
- `vercel-frontdoor/`: minimal Vercel rewrite project.
- `docs/CLOUD_RECOVERY_RUNBOOK.md`: recovery and provider reconnection guide.
- `public/llms.txt`, `public/agents.md`, `public/robots.txt` and the sitemaps:
  crawler and agent guidance.

## Agent-friendly requirements

- Keep interactive controls labeled and keyboard accessible.
- Prefer semantic elements; use `aria-hidden="true"` for decorative visuals.
- Agent-operable forms should keep stable `name`, `toolname`,
  `tooldescription` and useful `toolparamdescription` attributes.
- Keep `/llms.txt` valid Markdown with one H1 and working Markdown links.

## Secrets and safety

- Never commit `.env`, service-account files, Firebase private credentials,
  Stripe secrets, Cloudflare tokens or Vercel tokens.
- Keep only variable names and placeholders in documentation and examples.
- Do not remove user-created changes unless explicitly requested.
- Do not expose destructive dashboard actions as agent tools without an
  explicit confirmation experience.
