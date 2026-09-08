#!/usr/bin/env bash
set -euo pipefail

echo "[setup] comprobando Node.js 24"
node -e 'const major = Number(process.versions.node.split(".")[0]); if (major !== 24) { console.error(`Se requiere Node.js 24; versión actual: ${process.versions.node}`); process.exit(1); }'

echo "[setup] instalando dependencias reproducibles"
npm ci --no-audit --no-fund

echo "[setup] Link My App listo"
