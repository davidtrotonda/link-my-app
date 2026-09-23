import assert from "node:assert/strict";
import test from "node:test";

import {
  detectDestination,
  findCachedLink,
  isFirebaseHostingProxyPath,
  isLikelyBot,
  isRuntimeAppShellPath,
  normalizeDestination,
  redirectInterstitialHtml,
  slugFromPath,
} from "../src/index.ts";

const publicLink = {
  linkId: "link-1",
  ownerId: "owner-1",
  title: "Mi app",
  slug: "mi-app",
  iosUrl: "https://apps.apple.com/app/id123",
  androidUrl: "https://play.google.com/store/apps/details?id=example.app",
  fallbackUrl: "https://example.com/app",
  active: true,
};

test("detecta el destino sin distinguir mayúsculas", () => {
  assert.equal(detectDestination("Mozilla/5.0 (iPhone)"), "ios");
  assert.equal(detectDestination("Mozilla/5.0 (Linux; Android 15)"), "android");
  assert.equal(detectDestination("Mozilla/5.0 (Macintosh)"), "fallback");
});

test("extrae slugs explícitos y antiguos", () => {
  assert.equal(slugFromPath("/r/mi-app"), "mi-app");
  assert.equal(slugFromPath("/Mi-App"), "mi-app");
  assert.equal(slugFromPath("/r/no/valido"), "");
  assert.equal(slugFromPath("/r/%E0%A4%A"), "");
});

test("acepta únicamente destinos http y https", () => {
  assert.equal(normalizeDestination("javascript:alert(1)"), "");
  assert.equal(normalizeDestination("https://example.com/app"), "https://example.com/app");
});

test("separa crawlers de navegadores normales", () => {
  assert.equal(isLikelyBot("Googlebot/2.1"), true);
  assert.equal(isLikelyBot("Mozilla/5.0 Safari/605.1.15"), false);
  assert.equal(isLikelyBot("WhatsApp/2.26.17 iPhone"), false);
});

test("reenvía únicamente las rutas reservadas de Firebase Hosting", () => {
  assert.equal(isFirebaseHostingProxyPath("/__/auth/handler"), true);
  assert.equal(isFirebaseHostingProxyPath("/__/auth/iframe"), true);
  assert.equal(isFirebaseHostingProxyPath("/__/firebase/init.js"), true);
  assert.equal(isFirebaseHostingProxyPath("/api/stripe/create-checkout-session"), true);
  assert.equal(isFirebaseHostingProxyPath("/api/admin/users"), true);
  assert.equal(isFirebaseHostingProxyPath("/api/feedback"), true);
  assert.equal(isFirebaseHostingProxyPath("/__/otra-ruta"), false);
  assert.equal(isFirebaseHostingProxyPath("/mi-smart-link"), false);
});

test("solo login y panel usan el app shell con estado 200", () => {
  assert.equal(isRuntimeAppShellPath("/login"), true);
  assert.equal(isRuntimeAppShellPath("/es/panel"), true);
  assert.equal(isRuntimeAppShellPath("/fr/connexion/"), true);
  assert.equal(isRuntimeAppShellPath("/es/ruta-que-no-existe"), false);
  assert.equal(isRuntimeAppShellPath("/es/blog/articulo-inexistente"), false);
});

test("la pantalla de redirección muestra marca, logo y destino alternativo", () => {
  const html = redirectInterstitialHtml({
    target: "https://apps.apple.com/es/app/example?id=123&ct=test",
    copy: {
      language: "es",
      title: "Redirigiendo…",
      fallback: "Si no se abre automáticamente,",
      openDestination: "pulsa aquí",
      advertisement: "Publicidad",
    },
    delayMs: 1100,
    nonce: "testnonce",
  });

  assert.match(html, /Redirigiendo…/);
  assert.match(html, /Powered by Link My App/);
  assert.match(html, /logo-link-my-app\.avif/);
  assert.match(html, /id="redirect-ad-slot"/);
  assert.match(html, /window\.location\.replace/);
  assert.match(html, /https:\/\/apps\.apple\.com\/es\/app\/example\?id=123&amp;ct=test/);
  assert.equal((html.match(/logo-link-my-app\.avif/g) || []).length, 1);
});

test("la pantalla simple no muestra el nombre de la app ni texto adicional", () => {
  const html = redirectInterstitialHtml({
    target: "https://example.com/app",
    copy: {
      language: "en",
      title: "Redirecting…",
      fallback: "If it does not open automatically,",
      openDestination: "tap here",
      advertisement: "Advertisement",
    },
    delayMs: 1100,
    nonce: "testnonce",
  });

  assert.doesNotMatch(html, /Taking you to the right store/);
  assert.doesNotMatch(html, /class="app-name"/);
  assert.doesNotMatch(html, /class="logo"/);
  assert.doesNotMatch(html, /class="eyebrow"/);
});

test("la Cache API evita una lectura de KV cuando ya tiene el enlace", async () => {
  let kvReads = 0;
  const env = {
    LINKS_KV: {
      async get() {
        kvReads += 1;
        return null;
      },
    },
  };
  const cache = {
    async match() {
      return Response.json(publicLink);
    },
  };
  const ctx = { waitUntil() {} };

  const link = await findCachedLink(env, ctx, publicLink.slug, cache);

  assert.deepEqual(link, publicLink);
  assert.equal(kvReads, 0);
});

test("los enlaces inexistentes no se guardan en caché", async () => {
  const originalFetch = globalThis.fetch;
  const pendingTasks = [];
  let kvWrites = 0;
  let edgeWrites = 0;
  const env = {
    FIREBASE_DATABASE_URL: "https://database.example/",
    EDGE_CACHE_TTL_SECONDS: "60",
    LINKS_KV: {
      async get() {
        return null;
      },
      async put() {
        kvWrites += 1;
      },
    },
  };
  const cache = {
    async match() {
      return undefined;
    },
    async put() {
      edgeWrites += 1;
    },
  };
  const ctx = {
    waitUntil(promise) {
      pendingTasks.push(promise);
    },
  };

  try {
    globalThis.fetch = async () => Response.json({});
    const link = await findCachedLink(env, ctx, "no-existe", cache);
    await Promise.all(pendingTasks);

    assert.equal(link, null);
    assert.equal(kvWrites, 0);
    assert.equal(edgeWrites, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("ignora una ausencia antigua de caché al reactivar un enlace", async () => {
  const originalFetch = globalThis.fetch;
  const pendingTasks = [];
  let edgeDeletes = 0;
  let edgeWrites = 0;
  const env = {
    FIREBASE_DATABASE_URL: "https://database.example/",
    EDGE_CACHE_TTL_SECONDS: "60",
    LINKS_KV: {
      async get() {
        return null;
      },
      async delete() {},
    },
  };
  const cache = {
    async match() {
      return Response.json({ missing: true });
    },
    async delete() {
      edgeDeletes += 1;
      return true;
    },
    async put(_request, response) {
      edgeWrites += 1;
      assert.deepEqual(await response.json(), publicLink);
    },
  };
  const ctx = {
    waitUntil(promise) {
      pendingTasks.push(promise);
    },
  };

  try {
    globalThis.fetch = async () => Response.json({ [publicLink.linkId]: publicLink });
    const link = await findCachedLink(env, ctx, publicLink.slug, cache);
    await Promise.all(pendingTasks);

    assert.deepEqual(link, publicLink);
    assert.equal(edgeDeletes, 1);
    assert.equal(edgeWrites, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
