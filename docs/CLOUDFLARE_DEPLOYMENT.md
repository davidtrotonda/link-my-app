# Cloudflare edge deployment

Link My App keeps Firebase Authentication, Realtime Database and Functions, but serves the frontend and smart redirects through Cloudflare Workers Static Assets.

## Request flow

- Existing static pages and hashed assets are served directly from Cloudflare's edge without invoking the Worker.
- `/r/:slug` and legacy `/:slug` redirects read from KV first and only query Firebase on a cache miss.
- Link changes call `/api/links/sync` with the signed-in Firebase ID token to refresh or remove the KV entry.
- Clicks are deduplicated for 20 seconds and aggregated in D1 by link, day, destination and source.
- `/api/stripe/*` and `/api/admin/*` continue to use the existing Firebase Functions rewrites.
- Firebase Hosting remains available as a rollback origin through `skeilink.web.app`.

## Resources

- Worker: `link-my-app-smart-redirect-v2`
- KV: `link-my-app-edge-links-kv`
- D1: `link-my-app-edge-analytics-db`
- Configuration: `cloudflare-smart-redirect/wrangler.jsonc`
- Schema: `cloudflare-smart-redirect/migrations/0001_daily_link_stats.sql`

## Deploy

```bash
npm run test:database-rules
npm run test:worker
npm run cloudflare:dry-run
npm run deploy:database
npm run deploy:cloudflare
```

Run the historical analytics import only when legacy Firebase click events need to be added to a new D1 database:

```bash
npm run analytics:migrate
npm run analytics:migrate -- --apply
```

The import is idempotent and does not delete `clickEvents` from Firebase.

## DNS cutover

The Worker routes already cover `link-my.app/*` and `www.link-my.app/*`. In Cloudflare DNS, both hostnames must be **Proxied** (orange cloud) for the routes to receive traffic:

- `A` record `link-my.app` -> `199.36.158.100`
- `CNAME` record `www` -> `skeilink.web.app`

The origin values can stay unchanged. Only switch Proxy status from **DNS only** to **Proxied**. Verify after the change:

```bash
curl -i https://link-my.app/api/health
curl -I https://www.link-my.app/es
curl -I https://link-my.app/r/KNOWN_SLUG
```

Expected results are JSON with `"edge":true`, a Cloudflare-served page from `www`, and a small `302` smart redirect.

## Rollback

To bypass Cloudflare without deleting any deployment, switch the two DNS records back to **DNS only**. Traffic will return to Firebase Hosting. Do not remove Firebase Hosting until the edge deployment has been stable for at least one billing cycle.
