#!/usr/bin/env node
/**
 * Regenerates public/sitemap-blog.xml so every monthly redeploy bumps the
 * freshness signal for Google. Each post gets a deterministic random day
 * within the current month, never in the future — same algorithm as
 * src/lib/blogDates.js so frontend and sitemap stay in sync.
 *
 * Runs automatically before `vite build` (see package.json `prebuild`).
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const publicDir = join(repoRoot, "public");

const now = new Date();
const year = now.getUTCFullYear();
const month = String(now.getUTCMonth() + 1).padStart(2, "0");
const monthKey = `${year}-${now.getUTCMonth()}`;
const todayDay = now.getUTCDate();
const maxDay = Math.min(28, Math.max(1, todayDay));

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function dayForSlug(slug) {
  const seed = hashString(`${slug}::${monthKey}`);
  return (seed % maxDay) + 1;
}

function isoForSlug(slug) {
  const day = String(dayForSlug(slug)).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const blogSlugs = [
  "error-perder-ventas-instagram",
  "como-evitar-perder-usuarios-descarga",
  "disparar-descargas-app-link",
  "alternativa-gratis-onelink-to",
  "alternativa-branch-io-sin-sdk",
  "alternativa-firebase-dynamic-links",
  "medir-roi-influencers-app",
  "secreto-apps-top-100",
  "visitas-vs-descargas",
  // AI Agent guide (page 1, middle position)
  "guia-agentes-ia-link-my-app",
  // Page 2 — 5 long-tail + 4 head/medium
  "linktree-pierde-descargas-app",
  "medir-descargas-influencer-tiktok-sin-sdk",
  "boton-descarga-app-fold-movil",
  "google-ads-tienda-equivocada",
  "qr-packaging-app-sin-parecer-cupon",
  "smart-link-vs-deep-link",
  "atribucion-descargas-apps-medir-canal-real",
  "bio-instagram-app-plantillas-descargas",
  "lanzar-app-saas-sin-desperdiciar-presupuesto",
];

// For the sitemap index we use the most recent date across all blog entries
const indexLastmod = blogSlugs
  .map(isoForSlug)
  .sort()
  .pop();

const sitemapIndexUrls = [
  { loc: "https://link-my.app/sitemap-en.xml", lastmod: indexLastmod },
  { loc: "https://link-my.app/sitemap-es.xml", lastmod: indexLastmod },
  { loc: "https://link-my.app/sitemap-fr.xml", lastmod: indexLastmod },
  { loc: "https://link-my.app/sitemap-blog.xml", lastmod: indexLastmod },
];

function buildBlogSitemap() {
  const urls = blogSlugs
    .map((slug) => {
      const lastmod = isoForSlug(slug);
      return `  <url>
    <loc>https://link-my.app/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://link-my.app/blog/${slug}" />
    <xhtml:link rel="alternate" hreflang="es" href="https://link-my.app/es/blog/${slug}" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://link-my.app/fr/blog/${slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://link-my.app/blog/${slug}" />
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function buildSitemapIndex() {
  const items = sitemapIndexUrls
    .map(
      (entry) => `  <sitemap>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>
`;
}

mkdirSync(publicDir, { recursive: true });

const blogSitemapPath = join(publicDir, "sitemap-blog.xml");
writeFileSync(blogSitemapPath, buildBlogSitemap(), "utf8");

const indexPath = join(publicDir, "sitemap_index.xml");
writeFileSync(indexPath, buildSitemapIndex(), "utf8");

console.log(`[sitemap] regenerated (month ${year}-${month}, maxDay ${maxDay})`);
blogSlugs.forEach((slug) => {
  console.log(`  ${isoForSlug(slug)}  ${slug}`);
});
