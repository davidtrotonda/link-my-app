# Link My App Agent Guide

This guide is for AI agents and automation tools using Link My App through the public website.

## What Link My App Does

Link My App creates smart app download links:

- iPhone/iPad users go to the App Store URL.
- Android users go to the Google Play URL.
- Desktop or unknown visitors go to a fallback URL.

Each link has a stable public slug, an associated QR code, and click analytics.

## Main Routes

- `https://link-my.app/`
- `https://link-my.app/login`
- `https://link-my.app/dashboard`
- `https://link-my.app/qr-code-for-apps`
- `https://link-my.app/use-cases`
- `https://link-my.app/how-to`
- `https://link-my.app/blog`
- `https://link-my.app/open-source-smart-link`
- `https://github.com/davidtrotonda/link-my-app` (public Apache-2.0 source repository)
- `https://link-my.app/llms.txt`
- `https://link-my.app/llms-full.txt`
- `https://link-my.app/ai-index.json`
- `https://link-my.app/openapi.json`

## Create Smart Link Workflow

Collect these fields:

- `app_name`: app or campaign name.
- `ios_url`: full App Store URL.
- `android_url`: full Google Play URL.
- `fallback_url`: web fallback for desktop and unknown devices.
- `custom_slug`: optional short slug.

Validate that URLs are complete `http` or `https` URLs. If one store URL is missing because the app only exists on one platform, use the fallback URL for unsupported devices and explain the limitation.

## Slug Rules

- Lowercase ASCII letters, numbers, and hyphens.
- Keep it short and brand-readable.
- Do not invent an opaque slug without confirmation.
- If a slug is taken, suggest a clear variant such as `brand-app`, `brand-2026`, `brand-ig`, or `brand-qr`.
- Once a QR code has been printed, avoid changing the public slug; edit the destinations behind the link instead.

## Safety

- Do not delete, pause, or overwrite links unless the user explicitly asks.
- Dashboard actions require authentication.
- Return the final smart link URL and summarize iOS, Android, and fallback destinations.
