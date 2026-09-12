#!/usr/bin/env node

import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

function decodeHtml(value = "") {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function duplicateGroups(rows, property) {
  const groups = new Map();
  rows.forEach((row) => {
    const value = row[property];
    if (value) groups.set(value, [...(groups.get(value) || []), row]);
  });
  return [...groups.entries()].filter(([, matches]) => matches.length > 1);
}

const distDir = join(process.cwd(), "dist");
const rows = htmlFiles(distDir).map((file) => {
  const html = readFileSync(file, "utf8");
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
  const visibleBody = decodeHtml(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );

  return {
    file: relative(distDir, file),
    title: decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || ""),
    description: decodeHtml(html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] || ""),
    canonical: html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)?.[1] || "",
    robots: html.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i)?.[1] || "",
    visibleCharacters: visibleBody.length,
  };
});

const indexable = rows.filter((row) => !row.robots.includes("noindex"));
const errors = [];
const missingMetadata = indexable.filter((row) => !row.title || !row.description || !row.canonical);
const thinPages = indexable.filter((row) => row.visibleCharacters < 300);
const duplicateTitles = duplicateGroups(indexable, "title");
const duplicateDescriptions = duplicateGroups(indexable, "description");
const requiredLegacyAliases = [
  "como-funciona.html",
  "es/como-funciona.html",
  "precio.html",
  "que-hacemos.html",
  "en.html",
  "en/blog.html",
];
const generatedFiles = new Set(rows.map((row) => row.file.replaceAll("\\", "/")));
const missingLegacyAliases = requiredLegacyAliases.filter((file) => !generatedFiles.has(file));

if (missingMetadata.length) errors.push(`${missingMetadata.length} páginas sin metadatos completos`);
if (thinPages.length) errors.push(`${thinPages.length} páginas con menos de 300 caracteres visibles`);
if (duplicateTitles.length) errors.push(`${duplicateTitles.length} grupos de títulos duplicados`);
if (duplicateDescriptions.length) errors.push(`${duplicateDescriptions.length} grupos de descripciones duplicadas`);
if (missingLegacyAliases.length) errors.push(`${missingLegacyAliases.length} alias válidos sin HTML estático`);

console.log(JSON.stringify({
  htmlPages: rows.length,
  indexablePages: indexable.length,
  noindexPages: rows.length - indexable.length,
  missingMetadata: missingMetadata.length,
  thinPages: thinPages.length,
  duplicateTitleGroups: duplicateTitles.length,
  duplicateDescriptionGroups: duplicateDescriptions.length,
  missingLegacyAliases,
}, null, 2));

if (errors.length) {
  thinPages.slice(0, 10).forEach((row) => console.error(`[thin] ${row.file}: ${row.visibleCharacters}`));
  duplicateTitles.slice(0, 5).forEach(([title, matches]) =>
    console.error(`[duplicate title] ${title}: ${matches.map((row) => row.file).join(", ")}`));
  duplicateDescriptions.slice(0, 5).forEach(([description, matches]) =>
    console.error(`[duplicate description] ${description}: ${matches.map((row) => row.file).join(", ")}`));
  throw new Error(errors.join("; "));
}

console.log("[seo] HTML rastreable, metadatos únicos y contenido suficiente.");
