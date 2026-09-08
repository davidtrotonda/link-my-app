#!/usr/bin/env node

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const publicDir = join(repoRoot, "public");
const host = "link-my.app";
const key = "607f8c7b5815075935cf3f3d3747f604";
const keyLocation = `https://${host}/${key}.txt`;

function sitemapUrls() {
  const sitemapFiles = readdirSync(publicDir)
    .filter((name) => /^sitemap-(?:blog|[a-z]{2})\.xml$/.test(name));
  const urls = sitemapFiles.flatMap((name) => {
    const xml = readFileSync(join(publicDir, name), "utf8");
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  });
  return [...new Set(urls)];
}

const requestedUrls = process.argv.slice(2).filter((value) => /^https?:\/\//i.test(value));
const urlList = requestedUrls.length ? requestedUrls : sitemapUrls();

if (!urlList.length) throw new Error("No hay URLs para enviar a IndexNow.");
if (urlList.length > 10_000) throw new Error("IndexNow admite un máximo de 10.000 URLs por envío.");

for (const value of urlList) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== host) {
    throw new Error(`URL fuera del dominio permitido: ${value}`);
  }
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok) {
  const detail = (await response.text()).trim();
  throw new Error(`IndexNow respondió ${response.status}${detail ? `: ${detail}` : ""}`);
}

console.log(`[indexnow] ${urlList.length} URLs aceptadas (${response.status})`);
