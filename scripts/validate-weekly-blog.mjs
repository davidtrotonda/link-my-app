#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  weeklyBlogLanguages,
  weeklyBlogManifest,
} from "../src/lib/weeklyBlogManifest.js";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const blogSource = readFileSync(join(repoRoot, "src", "Blog.jsx"), "utf8");
const visualSource = readFileSync(join(repoRoot, "src", "WeeklyBlogPosts.jsx"), "utf8");
const failures = [];

function fail(message) {
  failures.push(message);
}

function allStrings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(allStrings);
  return [];
}

if (!blogSource.includes("PINNED_PAGE_ONE_COUNT = POSTS_PER_PAGE")) {
  fail("Blog.jsx no fija la página 1 al tamaño de página.");
}

if (!blogSource.includes("...getWeeklyBlogPosts(language)")) {
  fail("Blog.jsx no inserta los posts semanales después de la página fijada.");
}

const seenSlugs = new Set();
const seenDates = new Set();

for (const entry of weeklyBlogManifest) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug || "")) {
    fail(`Slug semanal inválido: ${entry.slug || "(vacío)"}`);
  }

  if (seenSlugs.has(entry.slug)) fail(`Slug semanal duplicado: ${entry.slug}`);
  seenSlugs.add(entry.slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.publishedAt || "")) {
    fail(`${entry.slug}: publishedAt debe usar YYYY-MM-DD.`);
  }
  if (seenDates.has(entry.publishedAt)) {
    fail(`${entry.slug}: ya existe otro artículo semanal con fecha ${entry.publishedAt}.`);
  }
  seenDates.add(entry.publishedAt);

  if (!entry.researchFile || !entry.researchFile.startsWith("content-workflow/keyword-research/")) {
    fail(`${entry.slug}: researchFile no apunta al historial de Keyword Planner.`);
  } else {
    const researchPath = join(repoRoot, entry.researchFile);
    if (!existsSync(researchPath)) {
      fail(`${entry.slug}: falta ${entry.researchFile}.`);
    } else {
      const research = JSON.parse(readFileSync(researchPath, "utf8"));
      if (String(research.googleAds?.customerId) !== "4440561793") {
        fail(`${entry.slug}: customer ID de Keyword Planner incorrecto.`);
      }
      if (String(research.googleAds?.languageId) !== "1003") {
        fail(`${entry.slug}: idioma de Keyword Planner incorrecto.`);
      }
      if (!research.googleAds?.locationIds?.map(String).includes("2724")) {
        fail(`${entry.slug}: falta la ubicación España (2724).`);
      }
      if (!research.selected?.keyword || research.selected?.avgMonthlySearches == null) {
        fail(`${entry.slug}: la keyword elegida no conserva sus métricas.`);
      }
    }
  }

  if (!entry.seo?.primaryKeyword || !Array.isArray(entry.seo?.secondaryKeywords)) {
    fail(`${entry.slug}: faltan keywords SEO estructuradas.`);
  }

  for (const language of weeklyBlogLanguages) {
    const locale = entry.locales?.[language];
    if (!locale) {
      fail(`${entry.slug}: falta la traducción ${language}.`);
      continue;
    }

    for (const field of ["title", "excerpt", "category", "readTime", "faqTitle"]) {
      if (!locale[field]) fail(`${entry.slug}/${language}: falta ${field}.`);
    }

    if (!locale.introduction?.length || !locale.sections?.length || !locale.faq?.length) {
      fail(`${entry.slug}/${language}: contenido, secciones o FAQ incompletos.`);
    }

    const contentLength = allStrings(locale).join(" ").length;
    if (contentLength < 2500) {
      fail(`${entry.slug}/${language}: contenido demasiado corto (${contentLength} caracteres).`);
    }
  }

  const escapedSlug = entry.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const coverRegistration = new RegExp(`["']${escapedSlug}["']\\s*:`);
  if (!coverRegistration.test(visualSource)) {
    fail(`${entry.slug}: falta registrar su portada animada.`);
  }
}

if (failures.length) {
  console.error("[blog:check] validación fallida:");
  failures.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(
  `[blog:check] ${weeklyBlogManifest.length} posts semanales válidos; página 1 fijada y ${weeklyBlogLanguages.length} idiomas exigidos.`,
);

