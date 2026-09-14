import assert from "node:assert/strict";
import test from "node:test";

import {
  isLocalizableRoute,
  localizePath,
  supportedLanguages,
  switchLanguagePath,
} from "./i18nRoutes.js";
import { howToHubRoutes, howToPath, howTos } from "./howTos.js";
import { nichePath, niches, useCaseHubRoutes } from "./useCases.js";

function withLanguagePrefix(path, language) {
  return language === "en" ? path : `/${language}${path}`;
}

function expectedPath(item, hubs, language) {
  const hub = hubs[language] || hubs.en;
  const slug = item[language]?.slug || item.en.slug;
  return `${hub}/${slug}`;
}

test("localiza todos los casos de uso desde cualquier idioma", () => {
  for (const niche of niches) {
    for (const sourceLanguage of supportedLanguages) {
      const sourcePath = expectedPath(niche, useCaseHubRoutes, sourceLanguage);
      assert.equal(nichePath(niche.id, sourceLanguage), sourcePath);
      const source = withLanguagePrefix(sourcePath, sourceLanguage);

      for (const targetLanguage of supportedLanguages) {
        assert.equal(
          localizePath(source, targetLanguage),
          withLanguagePrefix(
            expectedPath(niche, useCaseHubRoutes, targetLanguage),
            targetLanguage,
          ),
          `${niche.id}: ${sourceLanguage} -> ${targetLanguage}`,
        );
      }
    }
  }
});

test("localiza todas las guías desde cualquier idioma", () => {
  for (const howTo of howTos) {
    for (const sourceLanguage of supportedLanguages) {
      const sourcePath = expectedPath(howTo, howToHubRoutes, sourceLanguage);
      assert.equal(howToPath(howTo.id, sourceLanguage), sourcePath);
      const source = withLanguagePrefix(sourcePath, sourceLanguage);

      for (const targetLanguage of supportedLanguages) {
        assert.equal(
          localizePath(source, targetLanguage),
          withLanguagePrefix(
            expectedPath(howTo, howToHubRoutes, targetLanguage),
            targetLanguage,
          ),
          `${howTo.id}: ${sourceLanguage} -> ${targetLanguage}`,
        );
      }
    }
  }
});

test("conserva query y hash al cambiar una ruta de contenido", () => {
  assert.equal(
    localizePath("/use-cases/for-agencies?utm_source=test#contact", "fr"),
    "/fr/cas-d-usage/pour-agences?utm_source=test#contact",
  );
});

test("el selector de idioma traduce rutas dinámicas completas", () => {
  assert.equal(
    switchLanguagePath("/fr/cas-d-usage/pour-agences", "es"),
    "/es/casos-de-uso/para-agencias",
  );
  assert.equal(
    switchLanguagePath("/it/guide/link-download-app-whatsapp", "de"),
    "/de/anleitungen/app-download-link-whatsapp",
  );
});

test("las páginas dinámicas son rutas localizables", () => {
  assert.equal(isLocalizableRoute("/use-cases/for-agencies"), true);
  assert.equal(isLocalizableRoute("/fr/cas-d-usage/pour-agences"), true);
  assert.equal(isLocalizableRoute("/it/guide/link-download-app-whatsapp"), true);
  assert.equal(isLocalizableRoute("/fr/use-cases/no-existe"), false);
});
