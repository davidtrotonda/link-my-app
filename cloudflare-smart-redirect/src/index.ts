const STATIC_SINGLE_SEGMENTS = new Set([
  "es", "fr", "ja", "de", "pt", "it", "ko", "nl", "ar", "hi", "en",
  "login", "dashboard", "privacy", "cookies", "terms", "faqs", "pricing",
  "what-we-do", "qr-codes", "use-cases", "how-to", "blog", "success-story",
  "como-funciona", "precio", "tarifs", "que-hacemos", "que-faisons-nous",
  "privacidad", "terminos", "confidentialite", "conditions",
]);

const LINK_ID_PATTERN = /^[A-Za-z0-9_-]{1,180}$/;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,79}$/;
const OWNER_ID_PATTERN = /^[A-Za-z0-9_-]{1,180}$/;
const MAX_JSON_BODY_BYTES = 8_192;
const DEFAULT_EDGE_CACHE_TTL_SECONDS = 60;

const RUNTIME_APP_SHELL_PATHS = new Set([
  "/login", "/dashboard",
  "/es/iniciar-sesion", "/es/panel",
  "/fr/connexion", "/fr/tableau-de-bord",
  "/ja/login", "/ja/dashboard",
  "/de/anmelden", "/de/dashboard",
  "/pt/entrar", "/pt/painel",
  "/it/accedi", "/it/pannello",
  "/ko/login", "/ko/dashboard",
  "/nl/inloggen", "/nl/dashboard",
  "/ar/login", "/ar/dashboard",
  "/hi/login", "/hi/dashboard",
]);

type Destination = "ios" | "android" | "fallback";
type ClickSource = "qr" | "written";

type PublicLink = {
  linkId: string;
  ownerId: string;
  title: string;
  slug: string;
  iosUrl: string;
  androidUrl: string;
  fallbackUrl: string;
  active: true;
};

type MissingLink = { missing: true };
type LinkCacheValue = PublicLink | MissingLink;

type RedirectCopy = {
  language: "en" | "es";
  title: string;
  fallback: string;
  openDestination: string;
  advertisement: string;
};

type SyncRequestBody = {
  linkId?: unknown;
  previousSlug?: unknown;
  action?: unknown;
  purgeStats?: unknown;
};

export function detectDestination(userAgent = ""): Destination {
  const agent = String(userAgent).toLowerCase();
  if (/iphone|ipad|ipod/.test(agent)) return "ios";
  if (/android/.test(agent)) return "android";
  return "fallback";
}

export function normalizeDestination(value: unknown): string {
  try {
    const url = new URL(String(value || "").trim());
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

export function slugFromPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const rawSlug =
    parts[0] === "r" && parts.length === 2
      ? parts[1]
      : parts.length === 1
        ? parts[0]
        : "";

  try {
    const slug = decodeURIComponent(rawSlug || "").trim().toLowerCase();
    return SLUG_PATTERN.test(slug) ? slug : "";
  } catch {
    return "";
  }
}

export function isLikelyBot(userAgent = ""): boolean {
  return /bot|crawler|spider|slurp|facebookexternalhit|telegrambot|discordbot|preview|headless/i.test(
    userAgent,
  );
}

function positiveInteger(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function redirectDelayMs(env: Env): number {
  return Math.min(
    positiveInteger(env.REDIRECT_INTERSTITIAL_DELAY_MS, 1_100),
    10_000,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanSlug(value: unknown): string {
  const slug = String(value || "").trim().toLowerCase();
  return SLUG_PATTERN.test(slug) ? slug : "";
}

function cacheKeyForSlug(slug: string): string {
  return `link:${slug}`;
}

function edgeCacheRequestForSlug(slug: string): Request {
  return new Request(`https://link-cache.invalid/v1/${encodeURIComponent(slug)}`);
}

async function readEdgeCachedLink(
  cache: Cache,
  slug: string,
): Promise<LinkCacheValue | null> {
  try {
    const response = await cache.match(edgeCacheRequestForSlug(slug));
    if (!response) return null;

    const value: unknown = await response.json();
    if (isRecord(value) && value.missing === true) return { missing: true };
    return isPublicLink(value) ? value : null;
  } catch (error) {
    console.error(JSON.stringify({
      message: "edge link cache read failed",
      slug,
      error: error instanceof Error ? error.message : String(error),
    }));
    return null;
  }
}

async function writeEdgeCachedLink(
  cache: Cache,
  env: Env,
  slug: string,
  value: PublicLink,
): Promise<void> {
  try {
    await cache.put(
      edgeCacheRequestForSlug(slug),
      new Response(JSON.stringify(value), {
        headers: {
          "Cache-Control": `public, max-age=${positiveInteger(
            env.EDGE_CACHE_TTL_SECONDS,
            DEFAULT_EDGE_CACHE_TTL_SECONDS,
          )}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }),
    );
  } catch (error) {
    console.error(JSON.stringify({
      message: "edge link cache write failed",
      slug,
      error: error instanceof Error ? error.message : String(error),
    }));
  }
}

async function deleteEdgeCachedLink(cache: Cache, slug: string): Promise<void> {
  try {
    await cache.delete(edgeCacheRequestForSlug(slug));
  } catch (error) {
    console.error(JSON.stringify({
      message: "edge link cache delete failed",
      slug,
      error: error instanceof Error ? error.message : String(error),
    }));
  }
}

function publicLinkFromUnknown(linkId: string, value: unknown): PublicLink | null {
  if (!isRecord(value) || value.active !== true) return null;

  const ownerId = String(value.ownerId || "").trim();
  const slug = cleanSlug(value.slug);
  const iosUrl = normalizeDestination(value.iosUrl);
  const androidUrl = normalizeDestination(value.androidUrl);
  const fallbackUrl = normalizeDestination(value.fallbackUrl);

  if (!LINK_ID_PATTERN.test(linkId) || !OWNER_ID_PATTERN.test(ownerId)) return null;
  if (!slug || !iosUrl || !androidUrl || !fallbackUrl) return null;

  return {
    linkId,
    ownerId,
    title: String(value.title || "").slice(0, 160),
    slug,
    iosUrl,
    androidUrl,
    fallbackUrl,
    active: true,
  };
}

function isPublicLink(value: unknown): value is PublicLink {
  if (!isRecord(value) || value.active !== true) return false;
  return Boolean(publicLinkFromUnknown(String(value.linkId || ""), value));
}

function firebaseUrl(env: Env, path: string, token = ""): URL {
  const url = new URL(path, env.FIREBASE_DATABASE_URL);
  if (token) url.searchParams.set("auth", token);
  return url;
}

async function findActiveLink(env: Env, slug: string): Promise<PublicLink | null> {
  const queryUrl = firebaseUrl(env, "/publicLinks.json");
  queryUrl.searchParams.set("orderBy", JSON.stringify("slug"));
  queryUrl.searchParams.set("equalTo", JSON.stringify(slug));
  queryUrl.searchParams.set("limitToFirst", "2");

  const response = await fetch(queryUrl, { headers: { Accept: "application/json" } });
  if (!response.ok) return null;

  const links: unknown = await response.json();
  if (!isRecord(links)) return null;

  for (const [linkId, value] of Object.entries(links)) {
    const link = publicLinkFromUnknown(linkId, value);
    if (link?.slug === slug) return link;
  }
  return null;
}

export async function findCachedLink(
  env: Env,
  ctx: ExecutionContext,
  slug: string,
  cache: Cache = caches.default,
): Promise<PublicLink | null> {
  const edgeCached = await readEdgeCachedLink(cache, slug);
  if (edgeCached && "missing" in edgeCached) {
    ctx.waitUntil(deleteEdgeCachedLink(cache, slug));
  } else if (isPublicLink(edgeCached)) {
    return edgeCached;
  }

  const key = cacheKeyForSlug(slug);
  const cached = await env.LINKS_KV.get<LinkCacheValue>(key, {
    type: "json",
    cacheTtl: 30,
  });

  if (cached && "missing" in cached) {
    ctx.waitUntil(env.LINKS_KV.delete(key));
  } else if (isPublicLink(cached)) {
    ctx.waitUntil(writeEdgeCachedLink(cache, env, slug, cached));
    return cached;
  }

  const link = await findActiveLink(env, slug);
  if (link) ctx.waitUntil(writeEdgeCachedLink(cache, env, slug, link));
  return link;
}

function destinationUrl(link: PublicLink, destination: Destination): string {
  if (destination === "ios") return link.iosUrl;
  if (destination === "android") return link.androidUrl;
  return link.fallbackUrl;
}

function clickSource(url: URL): ClickSource {
  const source = `${url.searchParams.get("src") || ""} ${url.searchParams.get("source") || ""}`.toLowerCase();
  return source.includes("qr") ? "qr" : "written";
}

async function requestFingerprint(
  request: Request,
  link: PublicLink,
  destination: Destination,
  source: ClickSource,
): Promise<string> {
  const encoder = new TextEncoder();
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "";
  const bytes = encoder.encode(
    `${ip}|${userAgent.slice(0, 240)}|${link.linkId}|${destination}|${source}`,
  );
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function isDuplicateClick(
  request: Request,
  link: PublicLink,
  destination: Destination,
  source: ClickSource,
): Promise<boolean> {
  const fingerprint = await requestFingerprint(request, link, destination, source);
  const cache = caches.default;
  const cacheRequest = new Request(`https://click-dedupe.invalid/${fingerprint}`);
  const existing = await cache.match(cacheRequest);
  if (existing) return true;

  await cache.put(
    cacheRequest,
    new Response(null, {
      status: 200,
      headers: { "Cache-Control": "public, max-age=20" },
    }),
  );
  return false;
}

async function writeLegacyClickFallback(
  env: Env,
  link: PublicLink,
  destination: Destination,
  source: ClickSource,
): Promise<void> {
  if (env.LEGACY_CLICK_FALLBACK !== "true") return;

  const response = await fetch(firebaseUrl(env, "/clickEvents.json"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      linkId: link.linkId,
      ownerId: link.ownerId,
      ownerLinkKey: `${link.ownerId}_${link.linkId}`,
      slug: link.slug,
      destination,
      source,
      userAgent: "edge-fallback",
      createdAt: { ".sv": "timestamp" },
    }),
  });
  if (!response.ok) throw new Error(`Firebase click fallback returned ${response.status}`);
}

async function recordAggregatedClick(
  env: Env,
  request: Request,
  link: PublicLink,
  destination: Destination,
  source: ClickSource,
): Promise<void> {
  if (isLikelyBot(request.headers.get("user-agent") || "")) return;
  if (await isDuplicateClick(request, link, destination, source)) return;

  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  try {
    await env.ANALYTICS_DB.prepare(
      `INSERT INTO daily_link_stats (
        owner_id, link_id, slug, day, destination, source, clicks, last_click_at
      ) VALUES (?, ?, ?, ?, ?, ?, 1, ?)
      ON CONFLICT(link_id, day, destination, source) DO UPDATE SET
        owner_id = excluded.owner_id,
        slug = excluded.slug,
        clicks = daily_link_stats.clicks + 1,
        last_click_at = excluded.last_click_at`,
    )
      .bind(link.ownerId, link.linkId, link.slug, day, destination, source, now)
      .run();
  } catch (error) {
    console.error(JSON.stringify({
      message: "aggregated click write failed",
      linkId: link.linkId,
      error: error instanceof Error ? error.message : String(error),
    }));
    await writeLegacyClickFallback(env, link, destination, source);
  }
}

function bearerToken(request: Request): string {
  const authorization = request.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer ([^\s]{20,5000})$/);
  return match?.[1] || "";
}

async function readJsonBody(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_JSON_BODY_BYTES) throw new Error("body-too-large");
  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_JSON_BODY_BYTES) {
    throw new Error("body-too-large");
  }
  return body ? JSON.parse(body) : {};
}

async function authorizedPrivateLink(
  env: Env,
  token: string,
  linkId: string,
): Promise<Record<string, unknown> | null> {
  const response = await fetch(
    firebaseUrl(env, `/links/${encodeURIComponent(linkId)}.json`, token),
    { headers: { Accept: "application/json" } },
  );
  if (!response.ok) return null;
  const value: unknown = await response.json();
  return isRecord(value) ? value : null;
}

async function authorizeOwner(env: Env, token: string, ownerId: string): Promise<boolean> {
  const response = await fetch(
    firebaseUrl(env, `/users/${encodeURIComponent(ownerId)}/uid.json`, token),
    { headers: { Accept: "application/json" } },
  );
  if (!response.ok) return false;
  const value: unknown = await response.json();
  return value === ownerId;
}

async function authorizeAdmin(env: Env, token: string): Promise<boolean> {
  const url = firebaseUrl(env, "/settings/promoCodes.json", token);
  url.searchParams.set("shallow", "true");
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  return response.ok;
}

function corsOrigin(request: Request, env: Env): string {
  const origin = request.headers.get("origin") || "";
  if (!origin) return "";
  if (origin === env.APP_ORIGIN) return origin;
  if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return origin;
  return "";
}

function apiHeaders(request: Request, env: Env): Headers {
  const headers = new Headers({
    "Cache-Control": "private, no-store, max-age=0",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  const origin = corsOrigin(request, env);
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Vary", "Origin");
  }
  return headers;
}

function jsonResponse(request: Request, env: Env, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: apiHeaders(request, env),
  });
}

async function handleLinkSync(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse(request, env, { error: "Método no permitido." }, 405);
  }
  const token = bearerToken(request);
  if (!token) return jsonResponse(request, env, { error: "No autorizado." }, 401);

  let body: SyncRequestBody;
  try {
    const parsed = await readJsonBody(request);
    body = isRecord(parsed) ? parsed : {};
  } catch {
    return jsonResponse(request, env, { error: "JSON inválido." }, 400);
  }

  const linkId = String(body.linkId || "");
  const previousSlug = cleanSlug(body.previousSlug);
  const action = body.action === "delete" ? "delete" : "sync";
  if (!LINK_ID_PATTERN.test(linkId)) {
    return jsonResponse(request, env, { error: "Link inválido." }, 400);
  }

  const privateLink = await authorizedPrivateLink(env, token, linkId);
  if (!privateLink) return jsonResponse(request, env, { error: "No autorizado." }, 403);

  const currentSlug = cleanSlug(privateLink.slug);
  const slugsToDelete = new Set([previousSlug, currentSlug].filter(Boolean));
  const cache = caches.default;

  if (action === "delete" || privateLink.active !== true) {
    await Promise.all(
      Array.from(slugsToDelete, async (slug) => {
        await Promise.all([
          env.LINKS_KV.delete(cacheKeyForSlug(slug)),
          deleteEdgeCachedLink(cache, slug),
        ]);
      }),
    );
  } else {
    const publicLink = publicLinkFromUnknown(linkId, privateLink);
    if (!publicLink) {
      return jsonResponse(request, env, { error: "Datos del link inválidos." }, 400);
    }
    if (previousSlug && previousSlug !== publicLink.slug) {
      await Promise.all([
        env.LINKS_KV.delete(cacheKeyForSlug(previousSlug)),
        deleteEdgeCachedLink(cache, previousSlug),
      ]);
    }
    await Promise.all([
      env.LINKS_KV.put(cacheKeyForSlug(publicLink.slug), JSON.stringify(publicLink)),
      writeEdgeCachedLink(cache, env, publicLink.slug, publicLink),
    ]);
  }

  if (action === "delete" && body.purgeStats === true) {
    await env.ANALYTICS_DB.prepare("DELETE FROM daily_link_stats WHERE link_id = ?")
      .bind(linkId)
      .run();
  }
  return jsonResponse(request, env, { success: true });
}

type DailyStatsRow = {
  owner_id: string;
  link_id: string;
  slug: string;
  day: string;
  destination: Destination;
  source: ClickSource;
  clicks: number;
  last_click_at: number;
};

function serializedStatsRow(row: DailyStatsRow) {
  return {
    ownerId: row.owner_id,
    linkId: row.link_id,
    slug: row.slug,
    day: row.day,
    destination: row.destination,
    source: row.source,
    clicks: Number(row.clicks || 0),
    lastClickAt: Number(row.last_click_at || 0),
  };
}

async function legacyAnalyticsMigrated(env: Env): Promise<boolean> {
  const migration = await env.ANALYTICS_DB.prepare(
    "SELECT id FROM analytics_migrations WHERE id = ? LIMIT 1",
  )
    .bind("firebase-click-events-v1")
    .first<{ id: string }>();
  return migration?.id === "firebase-click-events-v1";
}

async function handleStats(request: Request, env: Env): Promise<Response> {
  if (request.method !== "GET") {
    return jsonResponse(request, env, { error: "Método no permitido." }, 405);
  }
  const token = bearerToken(request);
  if (!token) return jsonResponse(request, env, { error: "No autorizado." }, 401);

  const url = new URL(request.url);
  const adminScope = url.searchParams.get("scope") === "admin";
  try {
    const legacyMigrated = await legacyAnalyticsMigrated(env);
    if (adminScope) {
      if (!(await authorizeAdmin(env, token))) {
        return jsonResponse(request, env, { error: "No autorizado." }, 403);
      }
      const result = await env.ANALYTICS_DB.prepare(
        `SELECT owner_id, link_id, slug, day, destination, source, clicks, last_click_at
         FROM daily_link_stats ORDER BY day DESC LIMIT 50000`,
      ).all<DailyStatsRow>();
      return jsonResponse(request, env, {
        rows: result.results.map(serializedStatsRow),
        legacyMigrated,
      });
    }

    const ownerId = url.searchParams.get("ownerId") || "";
    if (!OWNER_ID_PATTERN.test(ownerId)) {
      return jsonResponse(request, env, { error: "Usuario inválido." }, 400);
    }
    if (!(await authorizeOwner(env, token, ownerId))) {
      return jsonResponse(request, env, { error: "No autorizado." }, 403);
    }
    const result = await env.ANALYTICS_DB.prepare(
      `SELECT owner_id, link_id, slug, day, destination, source, clicks, last_click_at
       FROM daily_link_stats WHERE owner_id = ? ORDER BY day DESC LIMIT 20000`,
    )
      .bind(ownerId)
      .all<DailyStatsRow>();
    return jsonResponse(request, env, {
      rows: result.results.map(serializedStatsRow),
      legacyMigrated,
    });
  } catch (error) {
    console.error(JSON.stringify({
      message: "stats query failed",
      error: error instanceof Error ? error.message : String(error),
    }));
    return jsonResponse(request, env, { error: "Estadísticas no disponibles." }, 503);
  }
}

async function handleAccountStatsDelete(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse(request, env, { error: "Método no permitido." }, 405);
  }
  const token = bearerToken(request);
  if (!token) return jsonResponse(request, env, { error: "No autorizado." }, 401);

  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch {
    return jsonResponse(request, env, { error: "JSON inválido." }, 400);
  }
  const ownerId = isRecord(body) ? String(body.ownerId || "") : "";
  if (!OWNER_ID_PATTERN.test(ownerId)) {
    return jsonResponse(request, env, { error: "Usuario inválido." }, 400);
  }
  if (!(await authorizeOwner(env, token, ownerId))) {
    return jsonResponse(request, env, { error: "No autorizado." }, 403);
  }

  await env.ANALYTICS_DB.prepare("DELETE FROM daily_link_stats WHERE owner_id = ?")
    .bind(ownerId)
    .run();
  return jsonResponse(request, env, { success: true });
}

function linkUnavailableResponse(): Response {
  return new Response(
    '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Enlace no disponible</title><body style="font-family:system-ui;padding:40px;text-align:center"><h1>Enlace no disponible</h1><p>Este enlace no existe o está pausado.</p></body></html>',
    {
      status: 404,
      headers: {
        "Cache-Control": "public, max-age=30",
        "Content-Type": "text/html; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineScriptString(value: string): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function redirectCopy(request: Request): RedirectCopy {
  const primaryLanguage = (request.headers.get("accept-language") || "")
    .split(",", 1)[0]
    ?.split("-", 1)[0]
    ?.trim()
    .toLowerCase();

  if (primaryLanguage === "es") {
    return {
      language: "es",
      title: "Redirigiendo…",
      fallback: "Si no se abre automáticamente,",
      openDestination: "pulsa aquí",
      advertisement: "Publicidad",
    };
  }

  return {
    language: "en",
    title: "Redirecting…",
    fallback: "If it does not open automatically,",
    openDestination: "tap here",
    advertisement: "Advertisement",
  };
}

type RedirectInterstitialOptions = {
  target: string;
  copy: RedirectCopy;
  delayMs: number;
  nonce: string;
};

export function redirectInterstitialHtml({
  target,
  copy,
  delayMs,
  nonce,
}: RedirectInterstitialOptions): string {
  const safeTarget = escapeHtml(target);
  const safeNonce = escapeHtml(nonce);
  const fallbackDelaySeconds = Math.ceil((delayMs + 2_500) / 1_000);

  return `<!doctype html>
<html lang="${copy.language}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
    <meta name="robots" content="noindex,nofollow">
    <meta name="theme-color" content="#ffffff">
    <meta http-equiv="refresh" content="${fallbackDelaySeconds};url=${safeTarget}">
    <title>${escapeHtml(copy.title)} | Link My App</title>
    <style>
      *{box-sizing:border-box}
      html,body{min-height:100%;margin:0}
      body{display:grid;min-height:100svh;place-items:center;padding:24px;background:#fff;color:#050505;font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      body:before{position:fixed;inset:0;z-index:-1;background-image:linear-gradient(to right,rgba(0,0,0,.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.035) 1px,transparent 1px);background-size:44px 44px;content:""}
      .wrap{width:100%;max-width:400px;text-align:center}
      .card{padding:32px 24px 28px;border:1px solid rgba(0,0,0,.1);border-radius:28px;background:rgba(255,255,255,.96);box-shadow:0 24px 70px rgba(0,0,0,.08)}
      h1{margin:0;font-size:clamp(30px,8vw,38px);font-weight:900;letter-spacing:-.05em;line-height:1.05}
      .progress{height:5px;margin:24px auto 0;overflow:hidden;border-radius:999px;background:#ececec}
      .progress:after{display:block;width:100%;height:100%;border-radius:inherit;background:#050505;content:"";transform-origin:left;animation:redirect-progress ${delayMs}ms linear both}
      .fallback{margin:20px 0 0;color:rgba(0,0,0,.48);font-size:12px;font-weight:650;line-height:1.6}
      .fallback a{color:#050505;font-weight:900;text-underline-offset:3px}
      .powered{display:inline-flex;align-items:center;gap:9px;margin-top:22px;padding:9px 14px;border:1px solid rgba(0,0,0,.09);border-radius:999px;background:rgba(255,255,255,.95);box-shadow:0 8px 24px rgba(0,0,0,.06);font-size:12px;font-weight:850}
      .powered img{width:22px;height:22px;border-radius:7px;object-fit:contain}
      .ad-slot[hidden]{display:none!important}
      @keyframes redirect-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
      @media (prefers-reduced-motion:reduce){.progress:after{animation:none;transform:scaleX(1)}}
    </style>
  </head>
  <body>
    <main class="wrap" aria-live="polite">
      <section class="card">
        <h1>${escapeHtml(copy.title)}</h1>
        <div class="progress" aria-hidden="true"></div>
        <p class="fallback">${escapeHtml(copy.fallback)} <a href="${safeTarget}" rel="nofollow noreferrer">${escapeHtml(copy.openDestination)}</a>.</p>
        <aside id="redirect-ad-slot" class="ad-slot" data-ad-placement="smart-link-interstitial" aria-label="${escapeHtml(copy.advertisement)}" hidden></aside>
      </section>
      <div class="powered">
        <img src="/logo-link-my-app.avif" width="22" height="22" alt="">
        <span>Powered by Link My App</span>
      </div>
    </main>
    <script nonce="${safeNonce}">
      window.setTimeout(function () {
        window.location.replace(${inlineScriptString(target)});
      }, ${delayMs});
    </script>
  </body>
</html>`;
}

function redirectInterstitialResponse(
  request: Request,
  env: Env,
  target: string,
): Response {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const html = redirectInterstitialHtml({
    target,
    copy: redirectCopy(request),
    delayMs: redirectDelayMs(env),
    nonce,
  });

  return new Response(html, {
    status: 200,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Security-Policy": `default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
      "Content-Type": "text/html; charset=utf-8",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function redirectResponse(target: string): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      "Cache-Control": "private, no-store, max-age=0",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function proxyToFirebase(request: Request, hostingOrigin: string): Promise<Response> {
  const requestUrl = new URL(request.url);
  const originUrl = new URL(`${requestUrl.pathname}${requestUrl.search}`, hostingOrigin);
  return fetch(new Request(originUrl, request));
}

export function isFirebaseHostingProxyPath(pathname: string): boolean {
  return (
    pathname === "/__/auth" ||
    pathname.startsWith("/__/auth/") ||
    pathname === "/__/firebase" ||
    pathname.startsWith("/__/firebase/") ||
    pathname === "/api/feedback" ||
    pathname.startsWith("/api/stripe/") ||
    pathname.startsWith("/api/admin/")
  );
}

export function isRuntimeAppShellPath(pathname: string): boolean {
  const normalizedPath = pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
  return RUNTIME_APP_SHELL_PATHS.has(normalizedPath);
}

async function appShellResponse(
  request: Request,
  env: Env,
  status = 200,
): Promise<Response> {
  const requestUrl = new URL(request.url);
  const appShellUrl = new URL("/", requestUrl);
  const appShell = await env.ASSETS.fetch(new Request(appShellUrl, request));
  if (status === 200 || appShell.status >= 400) return appShell;

  const headers = new Headers(appShell.headers);
  headers.delete("Content-Length");
  headers.set("Cache-Control", "private, no-store, max-age=0");
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(request.method === "HEAD" ? null : appShell.body, {
    status,
    statusText: status === 404 ? "Not Found" : appShell.statusText,
    headers,
  });
}

async function handleRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const requestUrl = new URL(request.url);

  if (request.method === "OPTIONS" && requestUrl.pathname.startsWith("/api/")) {
    const headers = apiHeaders(request, env);
    headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    return new Response(null, { status: 204, headers });
  }
  if (requestUrl.pathname === "/api/health") {
    return jsonResponse(request, env, { status: "ok", edge: true });
  }
  if (requestUrl.pathname === "/api/links/sync") return handleLinkSync(request, env);
  if (requestUrl.pathname === "/api/stats") return handleStats(request, env);
  if (requestUrl.pathname === "/api/stats/account-delete") {
    return handleAccountStatsDelete(request, env);
  }
  if (isFirebaseHostingProxyPath(requestUrl.pathname)) {
    return proxyToFirebase(request, env.FIREBASE_HOSTING_ORIGIN);
  }

  const pathParts = requestUrl.pathname.split("/").filter(Boolean);
  const isExplicitRedirectPath = pathParts[0] === "r" && pathParts.length === 2;
  const isPossibleRootSlug =
    pathParts.length === 1 &&
    !STATIC_SINGLE_SEGMENTS.has(pathParts[0].toLowerCase()) &&
    !pathParts[0].includes(".");

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    (isExplicitRedirectPath || isPossibleRootSlug)
  ) {
    const slug = slugFromPath(requestUrl.pathname);
    if (slug) {
      const link = await findCachedLink(env, ctx, slug);
      if (link) {
        const destination = detectDestination(request.headers.get("user-agent") || "");
        const target = destinationUrl(link, destination);
        if (request.method === "GET") {
          ctx.waitUntil(
            recordAggregatedClick(env, request, link, destination, clickSource(requestUrl)).catch(
              (error: unknown) => {
                console.error(JSON.stringify({
                  message: "click background task failed",
                  linkId: link.linkId,
                  error: error instanceof Error ? error.message : String(error),
                }));
              },
            ),
          );
        }
        if (
          request.method === "HEAD" ||
          isLikelyBot(request.headers.get("user-agent") || "")
        ) {
          return redirectResponse(target);
        }
        return redirectInterstitialResponse(request, env, target);
      }
    }
    if (isExplicitRedirectPath) return linkUnavailableResponse();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const assetResponse = await env.ASSETS.fetch(request);
  if (
    assetResponse.status !== 404 ||
    !request.headers.get("accept")?.includes("text/html")
  ) {
    return assetResponse;
  }

  return appShellResponse(
    request,
    env,
    isRuntimeAppShellPath(requestUrl.pathname) ? 200 : 404,
  );
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      return await handleRequest(request, env, ctx);
    } catch (error) {
      const path = new URL(request.url).pathname;
      console.error(JSON.stringify({
        message: "unhandled worker error",
        path,
        error: error instanceof Error ? error.message : String(error),
      }));
      if (path.startsWith("/api/")) {
        return jsonResponse(request, env, { error: "Error interno." }, 500);
      }
      if (request.method === "GET" || request.method === "HEAD") {
        return env.ASSETS.fetch(request);
      }
      return new Response("Internal Server Error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
