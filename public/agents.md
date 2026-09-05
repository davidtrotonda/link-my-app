# Link My App Agent Guide

This guide is for AI agents, browser agents, and automation tools that need to understand or operate Link My App through the public website.

## Purpose

Link My App creates a single public smart link for a mobile app. The smart link routes:

- iPhone and iPad visitors to the App Store URL.
- Android visitors to the Google Play URL.
- Desktop, unknown devices, or unsupported cases to a fallback web URL.

The product also generates QR-ready URLs and records click statistics by destination and source.

## Main Public Routes

- `https://link-my.app/` - home and smart-link creation form.
- `https://link-my.app/login` - login and account creation.
- `https://link-my.app/dashboard` - authenticated dashboard for managing links.
- `https://link-my.app/qr-code-for-apps` - QR-specific product page.
- `https://link-my.app/use-cases` - industry use cases.
- `https://link-my.app/how-to` - step-by-step guides.
- `https://link-my.app/blog/guia-agentes-ia-link-my-app` - detailed Spanish guide for agents.
- `https://link-my.app/open-source-smart-link` - official open-source and self-hosting overview.
- `https://github.com/davidtrotonda/link-my-app` - public Apache-2.0 source repository.
- `https://link-my.app/sitemap_index.xml` - sitemap index.
- `https://link-my.app/llms.txt` - concise LLM entry point.

Spanish routes use `/es`, for example `https://link-my.app/es/iniciar-sesion`. French routes use `/fr`, for example `https://link-my.app/fr/connexion`. Japanese routes use `/ja`, for example `https://link-my.app/ja/login`. German routes use `/de`, for example `https://link-my.app/de/anmelden`. Portuguese routes use `/pt`, for example `https://link-my.app/pt/entrar`. Italian routes use `/it`, for example `https://link-my.app/it/accedi`. Korean routes use `/ko`, for example `https://link-my.app/ko/login`. Dutch routes use `/nl`, for example `https://link-my.app/nl/inloggen`. Arabic routes use `/ar`, for example `https://link-my.app/ar/login`. Hindi routes use `/hi`, for example `https://link-my.app/hi/login`.

## Create Smart Link Tool

The home and dashboard creation form is annotated as the declarative WebMCP tool `create_smart_link`.

Use it when the user wants to create a download link, smart link, app link, QR link, or one URL for App Store and Google Play.

Expected fields:

- `app_name` - public name of the app or campaign.
- `ios_url` - full App Store URL.
- `android_url` - full Google Play URL.
- `fallback_url` - fallback website URL for desktop or unknown devices.
- `custom_slug` - optional short slug for the final URL.

Ask the user for missing store URLs before creating a production link. If only one store exists, use the fallback URL to cover the remaining devices.

## Slug Rules

- Use lowercase ASCII letters, numbers, and hyphens.
- Keep slugs short and recognizable.
- Derive the first suggestion from the app or brand name.
- Do not invent an opaque slug without user confirmation.
- If a slug is already taken, suggest a clear variant such as `brand-app`, `brand-2026`, or a campaign suffix.
- Once a QR has been printed, avoid changing the public slug; edit destinations behind the link instead.

## Channel Suffixes

For source-specific tracking, create one smart link per channel with these suffixes:

- Instagram: `-ig`
- TikTok: `-tt`
- Facebook: `-fb`
- X / Twitter: `-x`
- YouTube: `-yt`
- Pinterest: `-pin`
- Reddit: `-rd`
- WhatsApp: `-wa`

Example: `marina-fitness-ig` for Instagram and `marina-fitness-tt` for TikTok.

## Safe Interaction Notes

- Do not delete, pause, or overwrite existing smart links unless the user explicitly asks.
- When creating or editing links, return the final URL and summarize the destinations.
- For QR use, remind the user that the QR should point to the stable smart link URL, not directly to App Store or Google Play.
- Dashboard actions require the user to be authenticated.
- Private routes such as `/dashboard`, `/login`, `/admin`, and `/perfil` are intentionally disallowed in `robots.txt` for crawlers, but browser agents may navigate them on behalf of an authenticated user.

## Recommended Agent Response After Creating a Link

Return:

- Final smart link URL.
- App Store destination.
- Google Play destination.
- Fallback destination.
- Suggested QR usage.
- Any source/channel suffix used.
