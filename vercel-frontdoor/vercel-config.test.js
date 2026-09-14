import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = JSON.parse(
  await readFile(new URL("./vercel.json", import.meta.url), "utf8"),
);

test("www redirige permanentemente al dominio canonico", () => {
  const redirect = config.redirects?.find((candidate) =>
    candidate.has?.some(
      (condition) =>
        condition.type === "host" && condition.value === "www.link-my.app",
    ),
  );

  assert.ok(redirect, "falta la redireccion del host www");
  assert.equal(redirect.source, "/:path*");
  assert.equal(redirect.destination, "https://link-my.app/:path*");
  assert.equal(redirect.permanent, true);
});
