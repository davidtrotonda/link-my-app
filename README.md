# Link My App

Open-source smart link builder for mobile apps.

Link My App lets app owners create one short URL that detects the visitor device and sends each click to the right destination: App Store for iPhone, Google Play for Android, or a fallback website for desktop and unknown devices.

Created by [David Trotonda](https://github.com/davidtrotonda).

## What it does

- Smart redirects from `/r/:slug` based on user agent.
- Dashboard to create, pause, copy and delete app links.
- Public profiles for creators, agencies or app owners.
- QR landing flow for printed campaigns and offline acquisition.
- Click event tracking with destination, source and estimated installs.
- Firebase Authentication with Google and email/password.
- Firebase Realtime Database security rules.
- Stripe Checkout, Billing Portal, payment verification and promo codes through Firebase Functions.
- Multilingual public pages in English, Spanish and French.
- SEO pages, blog content, sitemaps and structured metadata.

## Tech stack

- React 19
- Vite
- Tailwind CSS
- Firebase Authentication
- Firebase Realtime Database
- Firebase Hosting
- Firebase Functions v2
- Stripe
- i18next

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs at:

```text
http://localhost:5173
```

## Firebase setup

1. Create a Firebase project.
2. Add a web app in Firebase Console.
3. Enable Authentication providers:
   - Google
   - Email/Password
4. Enable Realtime Database.
5. Copy `.env.example` to `.env`.
6. Fill the Firebase values in `.env`.
7. Deploy the database rules from `database.rules.json`.

## Stripe setup

Firebase Functions use Secret Manager values, not hardcoded keys.

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```

If you rotate webhook secrets and need a temporary fallback:

```bash
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET_LEGACY
```

## Deploy

Login and select your Firebase project first:

```bash
npx firebase login
npx firebase use --add
```

Deploy hosting, database rules and functions:

```bash
npm run deploy
```

If you use the helper script to make Cloud Run invokers public, set your project id:

```bash
FIREBASE_PROJECT_ID=your-project-id npm run deploy:run-public
```

## Attribution

This project is released under Apache-2.0. If you copy, modify or redistribute it, keep the license and NOTICE attribution to David Trotonda.

Visible product credit is appreciated:

```text
Based on Link My App by David Trotonda
https://github.com/davidtrotonda/link-my-app
```

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
