import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { GoogleAuth } from "google-auth-library";

const applyChanges = process.argv.includes("--apply");
const configPath = path.join(os.homedir(), ".config", "configstore", "firebase-tools.json");

function readEnvFile() {
  const envPath = path.resolve(".env");
  if (!fs.existsSync(envPath)) return {};

  return Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
        return [key, value];
      })
  );
}

function getDatabaseUrl() {
  const fileEnv = readEnvFile();
  const databaseUrl =
    process.env.FIREBASE_DATABASE_URL ||
    process.env.VITE_FIREBASE_DATABASE_URL ||
    fileEnv.FIREBASE_DATABASE_URL ||
    fileEnv.VITE_FIREBASE_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("Falta FIREBASE_DATABASE_URL o VITE_FIREBASE_DATABASE_URL.");
  }

  return databaseUrl.replace(/\/$/, "");
}

async function getFirebaseAccessToken() {
  const dedicatedAdcPath = path.join(
    os.homedir(),
    "Library",
    "Application Support",
    "Codex",
    "gcloud-link-my-app",
    "application_default_credentials.json"
  );
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || dedicatedAdcPath;

  if (fs.existsSync(credentialsPath)) {
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
      // Fall back to the Firebase CLI login below when the dedicated ADC needs reauthentication.
    }
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const tokens = config.tokens || config.user?.tokens || {};

  if (tokens.refresh_token) {
    try {
      const firebaseApi = await import("firebase-tools/lib/apiv2.js");
      firebaseApi.setRefreshToken(tokens.refresh_token);
      return await firebaseApi.getAccessToken();
    } catch {
      throw new Error(
        "Las credenciales de Firebase han caducado. Ejecuta firebase login --reauth y vuelve a lanzar la migración."
      );
    }
  }

  const token = tokens.access_token;

  if (!token) {
    throw new Error("No se ha encontrado token de Firebase CLI. Ejecuta firebase login.");
  }

  return token;
}

async function requestJson(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`Firebase respondió ${response.status}.`);
  }

  return body;
}

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function safeHttpUrl(value) {
  const cleaned = cleanString(value, 4096);
  try {
    const parsed = new URL(cleaned);
    return ["http:", "https:"].includes(parsed.protocol) && parsed.hostname ? cleaned : "";
  } catch {
    return "";
  }
}

function toPublicLink(link) {
  if (!link || link.active !== true) return null;

  const ownerId = cleanString(link.ownerId, 160);
  const slug = cleanString(link.slug, 80);
  const iosUrl = safeHttpUrl(link.iosUrl);
  const androidUrl = safeHttpUrl(link.androidUrl);
  const fallbackUrl = safeHttpUrl(link.fallbackUrl);

  if (!ownerId || !/^[a-z0-9][a-z0-9-]{0,79}$/.test(slug)) return null;
  if (!iosUrl || !androidUrl || !fallbackUrl) return null;

  return {
    ownerId,
    title: cleanString(link.title, 160),
    slug,
    iosUrl,
    androidUrl,
    fallbackUrl,
    active: true,
    createdAt: link.createdAt || Date.now(),
    updatedAt: link.updatedAt || Date.now(),
    ...(link.channel ? { channel: cleanString(link.channel, 40) } : {}),
    ...(link.parentLinkId ? { parentLinkId: cleanString(link.parentLinkId, 160) } : {}),
  };
}

function toPublicProfile(uid, profile) {
  if (!profile) return null;

  return {
    uid,
    displayName: cleanString(profile.displayName, 120) || "Usuario",
    bio: cleanString(profile.bio, 500),
    photoURL: cleanString(profile.photoURL, 2048),
    public: profile.public !== false,
    updatedAt: profile.updatedAt || Date.now(),
  };
}

const databaseUrl = getDatabaseUrl();
const token = await getFirebaseAccessToken();
const [links, users] = await Promise.all([
  requestJson(`${databaseUrl}/links.json`, token),
  requestJson(`${databaseUrl}/users.json`, token),
]);

const activeEntries = Object.entries(links || {}).filter(([, link]) => link?.active === true);
const publicLinks = Object.fromEntries(
  activeEntries.map(([id, link]) => [id, toPublicLink(link)]).filter(([, link]) => link)
);
const skippedActiveLinks = activeEntries.length - Object.keys(publicLinks).length;
const publicProfiles = Object.fromEntries(
  Object.entries(users || {})
    .map(([uid, profile]) => [uid, toPublicProfile(uid, profile)])
    .filter(([, profile]) => profile)
);

console.log(`Enlaces activos válidos para migrar: ${Object.keys(publicLinks).length}`);
console.log(`Enlaces activos omitidos por datos inválidos: ${skippedActiveLinks}`);
console.log(`Perfiles seguros para migrar: ${Object.keys(publicProfiles).length}`);

if (skippedActiveLinks > 0) {
  throw new Error("Hay enlaces activos inválidos. No se aplicará una migración incompleta.");
}

if (!applyChanges) {
  console.log("Simulación completada. Usa --apply únicamente después de revisar el resultado.");
  process.exit(0);
}

await requestJson(`${databaseUrl}/.json`, token, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ publicLinks, publicProfiles }),
});

const migratedLinks = await requestJson(`${databaseUrl}/publicLinks.json`, token);
if (Object.keys(migratedLinks || {}).length !== Object.keys(publicLinks).length) {
  throw new Error("La comprobación posterior no coincide con el número de enlaces migrados.");
}
for (const [id, expected] of Object.entries(publicLinks)) {
  const migrated = migratedLinks?.[id];
  for (const field of ["ownerId", "slug", "iosUrl", "androidUrl", "fallbackUrl", "active"]) {
    if (migrated?.[field] !== expected[field]) {
      throw new Error(`La comprobación posterior no coincide para ${id}/${field}.`);
    }
  }
}

console.log("Migración aplicada y verificada. Los enlaces privados originales no se han modificado.");
