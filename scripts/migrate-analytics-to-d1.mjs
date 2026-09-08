#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { GoogleAuth } from "google-auth-library";

const applyChanges = process.argv.includes("--apply");
const configPath = path.join(os.homedir(), ".config", "configstore", "firebase-tools.json");
const migrationId = "firebase-click-events-v1";

function readEnvFile() {
  const envPath = path.resolve(".env");
  if (!existsSync(envPath)) return {};
  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, "$2"),
        ];
      }),
  );
}

function databaseUrl() {
  const fileEnv = readEnvFile();
  const value =
    process.env.FIREBASE_DATABASE_URL ||
    process.env.VITE_FIREBASE_DATABASE_URL ||
    fileEnv.FIREBASE_DATABASE_URL ||
    fileEnv.VITE_FIREBASE_DATABASE_URL;
  if (!value) throw new Error("Falta FIREBASE_DATABASE_URL o VITE_FIREBASE_DATABASE_URL.");
  return value.replace(/\/$/, "");
}

async function firebaseAccessToken() {
  const dedicatedAdcPath = path.join(
    os.homedir(),
    "Library",
    "Application Support",
    "Codex",
    "gcloud-link-my-app",
    "application_default_credentials.json",
  );
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || dedicatedAdcPath;

  if (existsSync(credentialsPath)) {
    try {
      const auth = new GoogleAuth({
        keyFilename: credentialsPath,
        scopes: [
          "https://www.googleapis.com/auth/firebase.database",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      });
      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();
      if (accessToken.token) return accessToken.token;
    } catch {
      // Use the Firebase CLI session below when ADC needs reauthentication.
    }
  }

  const config = JSON.parse(readFileSync(configPath, "utf8"));
  const tokens = config.tokens || config.user?.tokens || {};
  if (tokens.refresh_token) {
    const firebaseApi = await import("firebase-tools/lib/apiv2.js");
    firebaseApi.setRefreshToken(tokens.refresh_token);
    return firebaseApi.getAccessToken();
  }
  if (tokens.access_token) return tokens.access_token;
  throw new Error("No se ha encontrado token de Firebase CLI. Ejecuta firebase login.");
}

function sqlString(value) {
  return `'${String(value ?? "").replaceAll("'", "''")}'`;
}

function aggregateEvents(events) {
  const rows = new Map();
  for (const event of Object.values(events || {})) {
    const createdAt = Number(event?.createdAt || 0);
    const linkId = String(event?.linkId || "").slice(0, 180);
    const ownerId = String(event?.ownerId || "").slice(0, 180);
    if (!createdAt || !linkId || !ownerId) continue;
    const day = new Date(createdAt).toISOString().slice(0, 10);
    const destination = ["ios", "android", "fallback"].includes(event.destination)
      ? event.destination
      : "fallback";
    const source = event.source === "qr" ? "qr" : "written";
    const slug = String(event.slug || "").slice(0, 80);
    const key = `${linkId}|${day}|${destination}|${source}`;
    const current = rows.get(key) || {
      ownerId,
      linkId,
      slug,
      day,
      destination,
      source,
      clicks: 0,
      lastClickAt: 0,
    };
    current.clicks += 1;
    current.lastClickAt = Math.max(current.lastClickAt, createdAt);
    rows.set(key, current);
  }
  return Array.from(rows.values());
}

function sqlForRows(rows, sourceRows) {
  const statements = rows.map(
    (row) => `INSERT INTO daily_link_stats (
  owner_id, link_id, slug, day, destination, source, clicks, last_click_at
) VALUES (
  ${sqlString(row.ownerId)}, ${sqlString(row.linkId)}, ${sqlString(row.slug)},
  ${sqlString(row.day)}, ${sqlString(row.destination)}, ${sqlString(row.source)},
  ${row.clicks}, ${row.lastClickAt}
) ON CONFLICT(link_id, day, destination, source) DO UPDATE SET
  owner_id = excluded.owner_id,
  slug = excluded.slug,
  clicks = MAX(daily_link_stats.clicks, excluded.clicks),
  last_click_at = MAX(daily_link_stats.last_click_at, excluded.last_click_at);`,
  );
  statements.push(
    `INSERT OR REPLACE INTO analytics_migrations (id, applied_at, source_rows) VALUES (${sqlString(migrationId)}, ${Date.now()}, ${sourceRows});`,
  );
  return `${statements.join("\n\n")}\n`;
}

function runWrangler(sqlFile) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "npx",
      [
        "wrangler",
        "d1",
        "execute",
        "ANALYTICS_DB",
        "--remote",
        "--file",
        sqlFile,
        "--config",
        "cloudflare-smart-redirect/wrangler.jsonc",
      ],
      { stdio: "inherit" },
    );
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`Wrangler terminó con código ${code}.`)),
    );
  });
}

const token = await firebaseAccessToken();
const response = await fetch(`${databaseUrl()}/clickEvents.json`, {
  headers: { Authorization: `Bearer ${token}` },
});
if (!response.ok) throw new Error(`Firebase respondió ${response.status}.`);
const events = (await response.json()) || {};
const rows = aggregateEvents(events);

console.log(`Eventos históricos encontrados: ${Object.keys(events).length}`);
console.log(`Filas diarias agregadas: ${rows.length}`);

if (!applyChanges) {
  console.log("Simulación completada. Usa --apply para escribir la migración en D1.");
  process.exit(0);
}

const temporaryDir = mkdtempSync(path.join(os.tmpdir(), "link-my-analytics-"));
const sqlFile = path.join(temporaryDir, "backfill.sql");
try {
  writeFileSync(sqlFile, sqlForRows(rows, Object.keys(events).length), "utf8");
  await runWrangler(sqlFile);
  console.log("Estadísticas históricas agregadas en D1; clickEvents de Firebase no se han borrado.");
} finally {
  rmSync(temporaryDir, { recursive: true, force: true });
}
