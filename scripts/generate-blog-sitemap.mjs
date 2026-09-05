#!/usr/bin/env node
/**
 * Regenerates every public sitemap from the route/catalog source of truth.
 * This keeps Google/Bing away from legacy URLs and makes new SEO pages
 * discoverable as soon as they are added to the app catalogs.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  defaultLanguage,
  localizePath,
  supportedLanguages,
} from "../src/lib/i18nRoutes.js";
import { niches, nichePath } from "../src/lib/useCases.js";
import { howTos, howToPath } from "../src/lib/howTos.js";
import { blogSeoPosts } from "../src/lib/blogSeoMeta.js";
const { loadStaticSeoData } = await import("./load-blog-static-data.mjs");

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const publicDir = join(repoRoot, "public");
const siteUrl = "https://link-my.app";
const { blog: blogStaticData } = await loadStaticSeoData();
const availableBlogSlugsByLanguage = Object.fromEntries(
  Object.entries(blogStaticData).map(([language, posts]) => [
    language,
    new Set(posts.map((post) => post.slug)),
  ]),
);

const now = new Date();
const todayISO = now.toISOString().slice(0, 10);
const year = now.getUTCFullYear();
const month = String(now.getUTCMonth() + 1).padStart(2, "0");
const monthKey = `${year}-${now.getUTCMonth()}`;
const todayDay = now.getUTCDate();
const maxDay = Math.min(28, Math.max(1, todayDay));

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
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

function languagePrefix(language) {
  return language === defaultLanguage ? "" : `/${language}`;
}

function withSiteUrl(path) {
  if (path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path}`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function xmlAlternates(entry) {
  const languages = entry.getLanguages?.() || supportedLanguages;
  const defaultAlternateLanguage = languages.includes(defaultLanguage)
    ? defaultLanguage
    : languages.includes("es")
      ? "es"
      : languages[0];
  return [
    ...languages.map(
      (language) =>
        `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(withSiteUrl(entry.getPath(language)))}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(withSiteUrl(entry.getPath(defaultAlternateLanguage)))}" />`,
  ].join("\n");
}

function xmlUrl(entry, language) {
  const loc = withSiteUrl(entry.getPath(language));
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${xmlAlternates(entry)}
  </url>`;
}

function xmlUrlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

function localizedDynamicPath(pathByLanguage, language) {
  return `${languagePrefix(language)}${pathByLanguage(language)}`;
}

const staticPageEntries = [
  { id: "home", path: "/", changefreq: "weekly", priority: "1.0" },
  { id: "open-source", path: "/open-source", changefreq: "monthly", priority: "0.9" },
  { id: "what-we-do", path: "/what-we-do", changefreq: "monthly", priority: "0.8" },
  { id: "pricing", path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { id: "qr-codes", path: "/qr-codes", changefreq: "monthly", priority: "0.85" },
  { id: "use-cases", path: "/use-cases", changefreq: "weekly", priority: "0.85" },
  { id: "tourixy-success-story", path: "/success-story/tourixy", changefreq: "monthly", priority: "0.85" },
  { id: "how-to", path: "/how-to", changefreq: "weekly", priority: "0.85" },
  { id: "faqs", path: "/faqs", changefreq: "monthly", priority: "0.7" },
  { id: "blog", path: "/blog", changefreq: "weekly", priority: "0.75" },
  { id: "privacy", path: "/privacy", changefreq: "yearly", priority: "0.35" },
  { id: "cookies", path: "/cookies", changefreq: "yearly", priority: "0.35" },
  { id: "terms", path: "/terms", changefreq: "yearly", priority: "0.35" },
].map((entry) => ({
  ...entry,
  lastmod: todayISO,
  getPath: (language) => localizePath(entry.path, language),
}));

const useCaseEntries = niches.map((niche) => ({
  id: `use-case-${niche.id}`,
  lastmod: todayISO,
  changefreq: "monthly",
  priority: niche.id === "agencies" ? "0.82" : "0.76",
  getPath: (language) => localizedDynamicPath((lang) => nichePath(niche.id, lang), language),
}));

const howToEntries = howTos.map((howTo) => ({
  id: `how-to-${howTo.id}`,
  lastmod: todayISO,
  changefreq: "monthly",
  priority: "0.72",
  getPath: (language) => localizedDynamicPath((lang) => howToPath(howTo.id, lang), language),
}));

const pageEntries = [...staticPageEntries, ...useCaseEntries, ...howToEntries];

const blogEntries = blogSeoPosts.map((post) => ({
  id: `blog-${post.slug}`,
  lastmod: post.publishedAt || isoForSlug(post.slug),
  changefreq: "monthly",
  priority: "0.62",
  getPath: (language) => localizePath(`/blog/${post.slug}`, language),
  getLanguages: () => supportedLanguages.filter((language) =>
    availableBlogSlugsByLanguage[language]?.has(post.slug)),
}));

const sitemapIndexUrls = [
  { loc: `${siteUrl}/sitemap-en.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-es.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-fr.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-ja.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-de.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-pt.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-it.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-ko.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-nl.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-ar.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-hi.xml`, lastmod: todayISO },
  { loc: `${siteUrl}/sitemap-blog.xml`, lastmod: todayISO },
];

function buildLanguageSitemap(language) {
  return xmlUrlset(pageEntries.map((entry) => xmlUrl(entry, language)));
}

function buildBlogSitemap() {
  const urls = blogEntries.flatMap((entry) =>
    entry.getLanguages().map((language) => xmlUrl(entry, language)),
  );
  return xmlUrlset(urls);
}

function buildSitemapIndex() {
  const items = sitemapIndexUrls
    .map(
      (entry) => `  <sitemap>
    <loc>${escapeXml(entry.loc)}</loc>
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

supportedLanguages.forEach((language) => {
  writeFileSync(
    join(publicDir, `sitemap-${language}.xml`),
    buildLanguageSitemap(language),
    "utf8",
  );
});

writeFileSync(join(publicDir, "sitemap-blog.xml"), buildBlogSitemap(), "utf8");

const sitemapIndex = buildSitemapIndex();
writeFileSync(join(publicDir, "sitemap_index.xml"), sitemapIndex, "utf8");
writeFileSync(join(publicDir, "sitemap.xml"), sitemapIndex, "utf8");

// Vite's SSR loader can leave a file-watcher handle open on macOS/iCloud
// workspaces even after server.close(). All generated files are written sync.
for (const handle of process._getActiveHandles()) {
  if (handle?.constructor?.name === "Server" && typeof handle.close === "function") {
    handle.closeAllConnections?.();
    handle.close();
  }
  handle.unref?.();
}
