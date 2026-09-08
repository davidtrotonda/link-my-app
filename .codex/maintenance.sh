#!/usr/bin/env bash
set -euo pipefail

if [[ ! -d node_modules ]] || [[ package-lock.json -nt node_modules/.package-lock.json ]]; then
  echo "[maintenance] sincronizando dependencias"
  npm ci --no-audit --no-fund
fi

echo "[maintenance] compilando la web"
npm run build
npm run seo:check

echo "[maintenance] comprobando el Worker"
npm run test:worker
npm exec -- tsc -p cloudflare-smart-redirect/tsconfig.json
npm exec -- wrangler deploy --dry-run --config cloudflare-smart-redirect/wrangler.jsonc

echo "[maintenance] comprobaciones web superadas; no se ha publicado nada"
