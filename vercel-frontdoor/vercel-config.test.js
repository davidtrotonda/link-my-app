import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(
  await readFile(new URL("./vercel.json", import.meta.url), "utf8"),
);

test("www redirige la raíz y las rutas internas al dominio canónico", () => {
  const wwwHost = [{ type: "host", value: "www.link-my.app" }];
  assert.deepEqual(config.redirects.slice(0, 2), [
    {
      source: "/",
      has: wwwHost,
      destination: "https://link-my.app/",
      permanent: true,
    },
    {
      source: "/:path*",
      has: wwwHost,
      destination: "https://link-my.app/:path*",
      permanent: true,
    },
  ]);
});
