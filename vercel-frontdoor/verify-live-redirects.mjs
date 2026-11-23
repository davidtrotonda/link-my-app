import assert from "node:assert/strict";
import test from "node:test";

const canonicalOrigin = "https://link-my.app";
const wwwOrigin = "https://www.link-my.app";
const requests = [
  "/",
  "/?utm_source=seo-check&utm_campaign=www%20root",
  "/es/codigo-qr-app",
  "/es/como/boton-descarga-app-web?src=seo-check",
];

for (const method of ["GET", "HEAD"]) {
  for (const path of requests) {
    test(`${method} ${path} redirects www and serves its canonical destination`, async () => {
      const options = {
        method,
        redirect: "manual",
        signal: AbortSignal.timeout(10_000),
      };
      const redirect = await fetch(new URL(path, wwwOrigin), options);
      await redirect.body?.cancel();
      assert.equal(redirect.status, 308, "www should redirect permanently");

      const location = redirect.headers.get("location");
      assert.ok(location, "the redirect should include a Location header");
      const destination = new URL(location);
      const expected = new URL(path, canonicalOrigin);
      assert.equal(destination.origin, canonicalOrigin);
      assert.equal(destination.pathname, expected.pathname);
      assert.equal(destination.searchParams.toString(), expected.searchParams.toString());

      const response = await fetch(destination, options);
      await response.body?.cancel();
      assert.equal(response.status, 200, "the destination should load without another redirect");
    });
  }
}
