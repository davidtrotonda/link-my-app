import { weeklyBlogAsoLocales } from "./weeklyBlogAsoLocales.js";
import { weeklyBlogQrAppLocales } from "./weeklyBlogQrAppLocales.js";

/**
 * Data source for the articles created by the Friday editorial automation.
 *
 * Keep this file free of JSX so the sitemap/static-meta/validation scripts can
 * import the same data used by the React blog. Newest entries go first.
 */
export const weeklyBlogLanguages = [
  "en",
  "es",
  "fr",
  "ja",
  "de",
  "pt",
  "it",
  "ko",
  "nl",
  "ar",
  "hi",
];

export const weeklyBlogManifest = [
  {
    slug: "codigo-qr-app-descarga",
    publishedAt: "2026-08-14",
    researchFile: "content-workflow/keyword-research/2026-08-14.json",
    seo: {
      primaryKeyword: "codigo qr app",
      secondaryKeywords: [
        "qr para descargar app",
        "codigo qr para app",
        "qr app store google play",
        "smart link app",
      ],
    },
    locales: weeklyBlogQrAppLocales,
  },
  {
    slug: "app-store-optimization-aso-guia",
    publishedAt: "2026-07-24",
    researchFile: "content-workflow/keyword-research/2026-07-24.json",
    seo: {
      primaryKeyword: "app store optimization",
      secondaryKeywords: [
        "aso app",
        "aso marketing",
        "google play aso",
        "seo para apps",
      ],
    },
    locales: weeklyBlogAsoLocales,
  },
];

export const weeklyBlogSeoPosts = weeklyBlogManifest.map((entry) => {
  const spanish = entry.locales.es;
  const translations = Object.fromEntries(
    weeklyBlogLanguages
      .filter((language) => language !== "es")
      .map((language) => {
        const locale = entry.locales[language];
        return [
          language,
          {
            title: locale.title,
            description: locale.excerpt,
            category: locale.category,
          },
        ];
      }),
  );

  return {
    slug: entry.slug,
    title: spanish.title,
    description: spanish.excerpt,
    category: spanish.category,
    publishedAt: entry.publishedAt,
    keywords: entry.seo.primaryKeyword
      ? [entry.seo.primaryKeyword, ...(entry.seo.secondaryKeywords || [])]
      : [],
    translations,
  };
});
