# Link My App Vercel front door

This deployment provides a Vercel CDN entry point for `link-my.app` and forwards requests to the existing Cloudflare Worker. The Worker remains responsible for static assets, APIs, smart-link lookup, device detection, analytics, and KV caching.
