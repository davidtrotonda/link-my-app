#!/usr/bin/env node
/**
 * Writes localized HTML shells for public SEO routes after Vite builds.
 * Cloudflare Static Assets serves these files before the SPA fallback, so
 * crawlers that do not render JavaScript still see localized SEO metadata.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  defaultLanguage,
  localizePath,
  supportedLanguages,
} from "../src/lib/i18nRoutes.js";
import { niches, nichePath, useCaseHubRoutes } from "../src/lib/useCases.js";
import { howTos, howToHubRoutes, howToPath } from "../src/lib/howTos.js";
import { getDateForSlugISO } from "../src/lib/blogDates.js";
import {
  legalPagesAr,
  legalPagesDe,
  legalPagesEn,
  legalPagesEs,
  legalPagesFr,
  legalPagesHi,
  legalPagesIt,
  legalPagesJa,
  legalPagesKo,
  legalPagesNl,
  legalPagesPt,
} from "../src/lib/legalPages.js";
import { blogSeoPosts, getBlogSeoMeta } from "../src/lib/blogSeoMeta.js";
import { getOpenSourceContent } from "../src/lib/openSourceContent.js";
const { loadStaticSeoData } = await import("./load-blog-static-data.mjs");

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const distDir = join(repoRoot, "dist");
const localeDir = join(repoRoot, "src", "locales");
const baseHtml = readFileSync(join(distDir, "index.html"), "utf8");
const { blog: blogStaticData, tourixy: tourixyStaticData } = await loadStaticSeoData();
const blogStaticByLanguage = Object.fromEntries(
  Object.entries(blogStaticData).map(([language, posts]) => [
    language,
    new Map(posts.map((post) => [post.slug, post])),
  ]),
);

const siteUrl = "https://link-my.app";
const brandName = "Link My App";
const brandImage = `${siteUrl}/og-image.svg`;
const keywords =
  "app download link, smart link for apps, App Store Google Play link, QR code for apps, app link analytics, link descarga app, enlaces inteligentes apps";

const ogLocales = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  ja: "ja_JP",
  de: "de_DE",
  pt: "pt_PT",
  it: "it_IT",
  ko: "ko_KR",
  nl: "nl_NL",
  ar: "ar_AR",
  hi: "hi_IN",
};

const legalByLanguage = {
  en: legalPagesEn,
  es: legalPagesEs,
  fr: legalPagesFr,
  ja: legalPagesJa,
  de: legalPagesDe,
  pt: legalPagesPt,
  it: legalPagesIt,
  ko: legalPagesKo,
  nl: legalPagesNl,
  ar: legalPagesAr,
  hi: legalPagesHi,
};

const useCasesHubMeta = {
  en: {
    title: "Use cases - app download links for every sector",
    description:
      "See how app marketers use a single smart link for App Store, Google Play and QR codes: ads, ecommerce, SaaS, restaurants, fitness and agencies.",
  },
  es: {
    title: "Casos de uso - enlaces de descarga para cada sector",
    description:
      "Mira cómo se usa un smart link único para App Store, Google Play y QR: anuncios, ecommerce, SaaS, restaurantes, fitness y agencias.",
  },
  fr: {
    title: "Cas d'usage - liens de téléchargement par secteur",
    description:
      "Découvre comment utiliser un smart link unique pour App Store, Google Play et QR : publicités, ecommerce, SaaS, restauration, fitness et agences.",
  },
  ja: {
    title: "活用シーン - 業種別アプリダウンロードリンク",
    description:
      "広告、EC、SaaS、飲食店、フィットネス、代理店が、App Store、Google Play、QRコード向けに1つのスマートリンクを使う方法を紹介します。",
  },
  de: {
    title: "Anwendungsfälle - App-Download-Links für jede Branche",
    description:
      "Sieh, wie Anzeigen, Ecommerce, SaaS, Restaurants, Fitness und Agenturen einen Smartlink für App Store, Google Play und QR-Codes nutzen.",
  },
  pt: {
    title: "Casos de uso - links de download de apps por setor",
    description:
      "Vê como anúncios, ecommerce, SaaS, restaurantes, fitness e agências usam um smart link para App Store, Google Play e QR codes.",
  },
  it: {
    title: "Casi d'uso - link di download app per settore",
    description:
      "Scopri come annunci, ecommerce, SaaS, ristoranti, fitness e agenzie usano uno smart link per App Store, Google Play e QR code.",
  },
  ko: {
    title: "활용 사례 - 업종별 앱 다운로드 링크",
    description:
      "광고, 이커머스, SaaS, 레스토랑, 피트니스, 에이전시가 App Store, Google Play, QR 코드에 하나의 스마트 링크를 사용하는 방법을 소개합니다.",
  },
  nl: {
    title: "Toepassingen - app-downloadlinks per sector",
    description:
      "Bekijk hoe advertenties, e-commerce, SaaS, restaurants, fitness en agencies een smartlink gebruiken voor App Store, Google Play en QR-codes.",
  },
  ar: {
    title: "حالات الاستخدام - روابط تنزيل التطبيقات حسب القطاع",
    description:
      "اكتشف كيف تستخدم الإعلانات والتجارة الإلكترونية وSaaS والمطاعم واللياقة والوكالات رابطا ذكيا لـ App Store وGoogle Play ورموز QR.",
  },
  hi: {
    title: "Use cases - हर sector के लिए app download links",
    description:
      "देखें ads, ecommerce, SaaS, restaurants, fitness और agencies App Store, Google Play और QR codes के लिए एक smart link कैसे इस्तेमाल करते हैं.",
  },
};

const tourixyCaseMeta = {
  en: {
    title: "Tourixy success story: one link to support app downloads",
    description:
      "How Tourixy uses Link My App across social media, its website and QR codes to send every visitor to the right store.",
  },
  es: {
    title: "Caso de éxito Tourixy: un solo enlace para impulsar las descargas",
    description:
      "Cómo Tourixy utiliza Link My App para compartir su app en redes, web y códigos QR y dirigir cada visita a la tienda correcta.",
  },
  fr: {
    title: "Cas client Tourixy : un seul lien pour faciliter les téléchargements",
    description:
      "Comment Tourixy utilise Link My App sur les réseaux, son site et ses QR codes pour diriger chaque visite vers le bon store.",
  },
  ja: {
    title: "Tourixy導入事例：1つのリンクでアプリのダウンロードを促進",
    description:
      "TourixyがSNS、Webサイト、QRコードでLink My Appを活用し、訪問者を端末に合ったストアへ案内する方法をご紹介します。",
  },
  de: {
    title: "Tourixy-Erfolgsgeschichte: ein Link für mehr App-Downloads",
    description:
      "Wie Tourixy Link My App in sozialen Netzwerken, auf der Website und in QR-Codes nutzt, um jeden Besucher zum richtigen Store zu führen.",
  },
  pt: {
    title: "Caso de sucesso Tourixy: um link para impulsionar downloads",
    description:
      "Como a Tourixy usa o Link My App nas redes sociais, no site e em códigos QR para levar cada visitante à loja certa.",
  },
  it: {
    title: "Caso di successo Tourixy: un solo link per favorire i download",
    description:
      "Come Tourixy usa Link My App sui social, sul sito e nei codici QR per indirizzare ogni visita allo store corretto.",
  },
  ko: {
    title: "Tourixy 성공 사례: 하나의 링크로 앱 다운로드 향상",
    description:
      "Tourixy가 소셜 미디어, 웹사이트, QR 코드에서 Link My App을 활용해 사용자를 알맞은 스토어로 보내는 방법을 소개합니다.",
  },
  nl: {
    title: "Tourixy-succesverhaal: één link voor meer appdownloads",
    description:
      "Hoe Tourixy Link My App gebruikt op sociale media, de website en in QR-codes om iedere bezoeker naar de juiste store te sturen.",
  },
  ar: {
    title: "قصة نجاح Tourixy: رابط واحد لدعم تنزيلات التطبيق",
    description:
      "كيف تستخدم Tourixy خدمة Link My App في الشبكات الاجتماعية والموقع ورموز QR لتوجيه كل زائر إلى المتجر المناسب.",
  },
  hi: {
    title: "Tourixy की सफलता: ऐप डाउनलोड बढ़ाने के लिए एक लिंक",
    description:
      "Tourixy सोशल मीडिया, वेबसाइट और QR कोड पर Link My App से हर विज़िटर को सही ऐप स्टोर तक कैसे पहुँचाता है।",
  },
};

const howToHubMeta = {
  en: {
    title: "How-to guides for app download links",
    description:
      "Practical guides to share your app: Instagram bio, WhatsApp, device redirect, web button and QR codes for physical campaigns.",
  },
  es: {
    title: "Guías paso a paso para enlaces de descarga de apps",
    description:
      "Guías prácticas para compartir tu app: bio de Instagram, WhatsApp, redirección por dispositivo, botón web y QR para campañas físicas.",
  },
  fr: {
    title: "Guides pratiques pour les liens de téléchargement d'apps",
    description:
      "Guides pratiques pour partager ton app : bio Instagram, WhatsApp, redirection par appareil, bouton web et QR pour campagnes physiques.",
  },
  ja: {
    title: "アプリダウンロードリンクの作り方ガイド",
    description:
      "Instagramプロフィール、WhatsApp、端末別リダイレクト、Webボタン、紙媒体QRでアプリを共有するための実践ガイド。",
  },
  de: {
    title: "Anleitungen für App-Download-Links",
    description:
      "Praktische Guides für Instagram Bio, WhatsApp, Geräte-Weiterleitung, Website-Button und QR-Codes für App-Downloads.",
  },
  pt: {
    title: "Guias para links de download de apps",
    description:
      "Guias práticos para bio de Instagram, WhatsApp, redirecionamento por dispositivo, botão no site e QR codes para downloads de apps.",
  },
  it: {
    title: "Guide per link di download app",
    description:
      "Guide pratiche per bio Instagram, WhatsApp, reindirizzamento per dispositivo, pulsante sito e QR code per download app.",
  },
  ko: {
    title: "앱 다운로드 링크 사용 가이드",
    description:
      "Instagram 프로필, WhatsApp, 기기별 리디렉션, 웹사이트 버튼, 오프라인 QR 캠페인에서 앱을 공유하는 실전 가이드.",
  },
  nl: {
    title: "Gidsen voor app-downloadlinks",
    description:
      "Praktische gidsen voor Instagram bio, WhatsApp, doorsturen per apparaat, websiteknop en QR-codes voor app-downloads.",
  },
  ar: {
    title: "أدلة روابط تنزيل التطبيقات",
    description:
      "أدلة عملية لـ Instagram bio وWhatsApp والتحويل حسب الجهاز وزر الموقع ورموز QR لتنزيل التطبيقات.",
  },
  hi: {
    title: "App download links के लिए how-to guides",
    description:
      "Instagram bio, WhatsApp, device redirect, website button और app download QR codes के लिए practical guides.",
  },
};

function readLocale(language) {
  return JSON.parse(readFileSync(join(localeDir, `${language}.json`), "utf8"));
}

function languagePrefix(language) {
  return language === defaultLanguage ? "" : `/${language}`;
}

function withSiteUrl(path) {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fullTitle(title) {
  return title.includes(brandName) ? title : `${title} | ${brandName}`;
}

function safeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function localizedDynamicPath(pathByLanguage, language) {
  return `${languagePrefix(language)}${pathByLanguage(language)}`;
}

function alternatesFor(entry) {
  const languages = entry.getLanguages?.() || supportedLanguages;
  const defaultAlternateLanguage = languages.includes(defaultLanguage)
    ? defaultLanguage
    : languages.includes("es")
      ? "es"
      : languages[0];
  return [
    ...languages.map((language) => {
      const href = withSiteUrl(entry.getPath(language));
      return `<link data-base-seo="true" rel="alternate" hreflang="${language}" href="${escapeHtml(href)}" />`;
    }),
    `<link data-base-seo="true" rel="alternate" hreflang="x-default" href="${escapeHtml(withSiteUrl(entry.getPath(defaultAlternateLanguage)))}" />`,
  ].join("\n");
}

function collectReadableText(value, output = []) {
  if (typeof value === "string" || typeof value === "number") {
    String(value)
      .split(/\n+/)
      .map((part) => part.replace(/\s+/g, " ").trim())
      .filter((part) => part.length >= 20 && !/^https?:\/\//i.test(part))
      .forEach((part) => output.push(part));
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectReadableText(item, output));
    return output;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectReadableText(item, output));
  }

  return output;
}

function staticContentBlock({ entry, language, title, description, robots }) {
  const collected = collectReadableText(entry.getContent?.(language));
  const paragraphs = [...new Set([description, ...collected])];
  let characterCount = 0;
  const selectedParagraphs = paragraphs.filter((paragraph) => {
    if (characterCount >= 7_500) return false;
    characterCount += paragraph.length;
    return true;
  });
  const homePath = localizePath("/", language);
  const useCasesPath = localizePath("/use-cases", language);
  const howToPathname = localizePath("/how-to", language);
  const blogPath = localizePath("/blog", language);

  return `<style id="app-loading-shell-styles">
      #app-loading-shell{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;min-height:100vh;background-color:#fff;background-image:linear-gradient(rgba(17,24,39,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(17,24,39,.035) 1px,transparent 1px);background-size:44px 44px;font-family:Arial,sans-serif;color:#050505}
      #app-loading-shell .app-loading-card{display:flex;min-width:220px;flex-direction:column;align-items:center;gap:13px;padding:28px 34px;border:1px solid rgba(0,0,0,.08);border-radius:28px;background:rgba(255,255,255,.94);box-shadow:0 24px 70px rgba(15,23,42,.1)}
      #app-loading-shell img{display:block;width:54px;height:54px;border-radius:16px;object-fit:cover;box-shadow:0 10px 25px rgba(0,0,0,.16)}
      #app-loading-shell strong{font-size:20px;line-height:1;font-weight:800;letter-spacing:-.04em}
      #app-loading-shell .app-loading-bar{position:relative;display:block;width:92px;height:4px;overflow:hidden;border-radius:999px;background:#e5e7eb}
      #app-loading-shell .app-loading-bar::after{content:"";position:absolute;inset:0;width:42%;border-radius:inherit;background:#050505;animation:linkMyAppLoading 1s ease-in-out infinite}
      #seo-static-content{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      @keyframes linkMyAppLoading{0%{transform:translateX(-120%)}50%{transform:translateX(70%)}100%{transform:translateX(240%)}}
      @media (prefers-reduced-motion:reduce){#app-loading-shell .app-loading-bar::after{animation:none;left:29%}}
    </style>
    <div id="app-loading-shell" role="status" aria-label="Link My App">
      <div class="app-loading-card">
        <img src="/logo-link-my-app.avif" width="54" height="54" alt="" />
        <strong>Link My App</strong>
        <span class="app-loading-bar" aria-hidden="true"></span>
      </div>
    </div>
    <noscript><style>#app-loading-shell{display:none!important}#seo-static-content{position:static!important;width:auto!important;height:auto!important;padding:96px 24px 64px!important;margin:0 auto!important;overflow:visible!important;clip:auto!important;white-space:normal!important}</style></noscript>
    <main id="seo-static-content" style="max-width:1120px;margin:0 auto;padding:96px 24px 64px;font-family:Arial,sans-serif;line-height:1.65;color:#111827">
      <h1 style="max-width:900px;font-size:clamp(2rem,5vw,4rem);line-height:1.05">${escapeHtml(title)}</h1>
      ${selectedParagraphs.map((paragraph) => `<p style="max-width:850px">${escapeHtml(paragraph)}</p>`).join("\n      ")}
      ${robots?.startsWith("noindex") ? "" : `<nav aria-label="Public pages" style="display:flex;flex-wrap:wrap;gap:16px;margin-top:32px"><a href="${homePath}">Link My App</a><a href="${useCasesPath}">Use cases</a><a href="${howToPathname}">Guides</a><a href="${blogPath}">Blog</a></nav>`}
    </main>`;
}

function metaBlock({
  entry,
  language,
  title,
  description,
  robots = "index,follow",
  pageKeywords = keywords,
}) {
  const canonical = withSiteUrl(entry.getPath(language));
  const pageTitle = fullTitle(title);
  const locale = ogLocales[language] || ogLocales.en;

  return `    <meta data-base-seo="true" name="robots" content="${escapeHtml(robots)}" />
    <meta data-base-seo="true" name="author" content="David Trotonda" />
    <meta data-base-seo="true" name="publisher" content="David Trotonda" />
    <meta data-base-seo="true" name="keywords" content="${escapeHtml(pageKeywords)}" />
    <meta data-base-seo="true" name="description" content="${escapeHtml(description)}" />
    <link data-base-seo="true" rel="canonical" href="${escapeHtml(canonical)}" />
${alternatesFor(entry)}
    <meta data-base-seo="true" property="og:locale" content="${locale}" />
    <meta data-base-seo="true" property="og:type" content="website" />
    <meta data-base-seo="true" property="og:site_name" content="${brandName}" />
    <meta data-base-seo="true" property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta data-base-seo="true" property="og:description" content="${escapeHtml(description)}" />
    <meta data-base-seo="true" property="og:url" content="${escapeHtml(canonical)}" />
    <meta data-base-seo="true" property="og:image" content="${brandImage}" />
    <meta data-base-seo="true" name="twitter:card" content="summary_large_image" />
    <meta data-base-seo="true" name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta data-base-seo="true" name="twitter:description" content="${escapeHtml(description)}" />
    <meta data-base-seo="true" name="twitter:image" content="${brandImage}" />
    <title data-base-seo="true">${escapeHtml(pageTitle)}</title>`;
}

function schemaBlock({ entry, language, title, description }) {
  const url = withSiteUrl(entry.getPath(language));
  const pageTitle = fullTitle(title);
  const common = {
    "@context": "https://schema.org",
    url,
    name: pageTitle,
    description,
    inLanguage: language,
    image: brandImage,
    author: {
      "@type": "Person",
      name: "David Trotonda",
      url: "https://link-my.app/",
    },
  };

  const schema =
    entry.kind === "blog"
      ? {
          ...common,
          "@type": "BlogPosting",
          headline: pageTitle,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
          datePublished: entry.publishedAt || getDateForSlugISO(entry.slug),
          dateModified: entry.publishedAt || getDateForSlugISO(entry.slug),
          publisher: {
            "@type": "Organization",
            name: brandName,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/favicon-512.png`,
            },
          },
        }
      : {
          ...common,
          "@type": "WebPage",
          isPartOf: {
            "@type": "WebSite",
            name: brandName,
            url: `${siteUrl}/`,
          },
        };

  return `    <script type="application/ld+json" id="route-schema">${safeJsonLd(schema)}</script>`;
}

function stripBaseSeo(html) {
  return html
    .replace(/\n\s*<meta\b(?=[^>]*data-base-seo="true")[^>]*\/>/g, "")
    .replace(/\n\s*<link\b(?=[^>]*data-base-seo="true")[^>]*\/>/g, "")
    .replace(/\n\s*<title\b(?=[^>]*data-base-seo="true")[^>]*>[\s\S]*?<\/title>/g, "");
}

function stripBaseSchema(html) {
  return html.replace(
    /\n\s*<script\b(?=[^>]*id="base-schema")[^>]*>[\s\S]*?<\/script>/g,
    "",
  );
}

function htmlFor(entry, language) {
  const { title, description, robots, pageKeywords } = entry.getMeta(language);
  const direction = language === "ar" ? "rtl" : "ltr";
  const html = entry.id === "home" ? stripBaseSeo(baseHtml) : stripBaseSchema(stripBaseSeo(baseHtml));
  const seo = [
    metaBlock({ entry, language, title, description, robots, pageKeywords }),
    entry.id === "home" || robots?.startsWith("noindex")
      ? ""
      : schemaBlock({ entry, language, title, description }),
  ]
    .filter(Boolean)
    .join("\n");

  return html
    .replace(/<html\b[^>]*>/, `<html lang="${language}" dir="${direction}">`)
    .replace(
      /(\s*<meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" \/>)/,
      `$1\n${seo}`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${staticContentBlock({ entry, language, title, description, robots })}</div>`,
    );
}

function writeRouteHtml(routePath, html) {
  if (routePath === "/") {
    writeFileSync(join(distDir, "index.html"), html, "utf8");
    return;
  }

  const normalized = routePath.replace(/^\/+|\/+$/g, "");
  const htmlFile = join(distDir, `${normalized}.html`);
  mkdirSync(dirname(htmlFile), { recursive: true });
  writeFileSync(htmlFile, html, "utf8");
}

function staticEntry(id, canonicalPath, getMeta, getContent = getMeta) {
  return {
    id,
    getPath: (language) => localizePath(canonicalPath, language),
    getMeta,
    getContent,
  };
}

const staticEntries = [
  staticEntry("home", "/", (language) => {
    const locale = readLocale(language);
    return {
      title: locale.landing.seoTitle,
      description: locale.landing.seoDesc,
    };
  }, (language) => readLocale(language).landing),
  staticEntry("open-source", "/open-source", (language) => {
    const content = getOpenSourceContent(language);
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      pageKeywords:
        "open source smart link, Apache 2.0, self hosted smart link, App Store Google Play link, open source QR code",
    };
  }, (language) => getOpenSourceContent(language)),
  staticEntry("what-we-do", "/what-we-do", (language) => {
    const locale = readLocale(language);
    return {
      title: locale.marketing.comoFunciona.title,
      description: locale.marketing.comoFunciona.description,
    };
  }, (language) => {
    const locale = readLocale(language);
    return [locale.marketing.comoFunciona, locale.seoContent, locale.simulations];
  }),
  staticEntry("pricing", "/pricing", (language) => {
    const locale = readLocale(language);
    return {
      title: locale.marketing.precio.title,
      description: locale.marketing.precio.description,
    };
  }, (language) => {
    const locale = readLocale(language);
    return [
      locale.marketing.precio,
      locale.pricingComparison,
      locale.pricingExtras,
      locale.pricing,
    ];
  }),
  staticEntry("faqs", "/faqs", (language) => {
    const locale = readLocale(language);
    return {
      title: locale.marketing.faqs.title,
      description: locale.marketing.faqs.description,
    };
  }, (language) => {
    const locale = readLocale(language);
    return [locale.marketing.faqs, locale.faqs, locale.landingFaqs];
  }),
  staticEntry("qr-codes", "/qr-codes", (language) => {
    const locale = readLocale(language);
    return {
      title: locale.qr.metaTitle,
      description: locale.qr.metaDescription,
    };
  }, (language) => readLocale(language).qr),
  staticEntry(
    "use-cases",
    "/use-cases",
    (language) => useCasesHubMeta[language],
    (language) => niches.map((niche) => niche[language] || niche.en),
  ),
  staticEntry("tourixy-success-story", "/success-story/tourixy", (language) =>
    tourixyCaseMeta[language] || tourixyCaseMeta.en,
    (language) => tourixyStaticData[language] || tourixyStaticData.en,
  ),
  staticEntry(
    "how-to",
    "/how-to",
    (language) => howToHubMeta[language],
    (language) => howTos.map((howTo) => howTo[language] || howTo.en),
  ),
  staticEntry("blog", "/blog", (language) => {
    const locale = readLocale(language);
    return {
      title: locale.blog.indexTitle,
      description: locale.blog.indexSubtitle,
    };
  }, (language) => blogStaticData[language]),
];

const legalEntries = ["privacy", "cookies", "terms"].map((type) => ({
  id: `legal-${type}`,
  getPath: (language) => localizePath(`/${type}`, language),
  getMeta: (language) => {
    const page = legalByLanguage[language][type];
    return {
      title: `${page.title} Link My App`,
      description: page.intro,
    };
  },
  getContent: (language) => legalByLanguage[language][type],
}));

const useCaseEntries = niches.map((niche) => ({
  id: `use-case-${niche.id}`,
  getPath: (language) => localizedDynamicPath((lang) => nichePath(niche.id, lang), language),
  getMeta: (language) => {
    const content = niche[language] || niche.en;
    return {
      title: content.metaTitle || content.title,
      description: content.metaDescription,
    };
  },
  getContent: (language) => niche[language] || niche.en,
}));

const howToEntries = howTos.map((howTo) => ({
  id: `how-to-${howTo.id}`,
  getPath: (language) => localizedDynamicPath((lang) => howToPath(howTo.id, lang), language),
  getMeta: (language) => {
    const content = howTo[language] || howTo.en;
    return {
      title: content.metaTitle || content.h1,
      description: content.metaDescription,
    };
  },
  getContent: (language) => howTo[language] || howTo.en,
}));

const blogEntries = blogSeoPosts.map((post) => ({
  id: `blog-${post.slug}`,
  kind: "blog",
  slug: post.slug,
  publishedAt: post.publishedAt,
  getPath: (language) => localizePath(`/blog/${post.slug}`, language),
  getLanguages: () => supportedLanguages.filter((language) =>
    blogStaticByLanguage[language]?.has(post.slug)),
  getMeta: (language) => {
    const localized = blogStaticByLanguage[language]?.get(post.slug);
    const meta = localized || getBlogSeoMeta(post.slug, "es");
    if (!localized) {
      return {
        title: `${meta.title} [${language.toUpperCase()}]`,
        description: `This article is not available in ${language.toUpperCase()}. Visit another language version on Link My App.`,
        robots: "noindex,follow",
      };
    }
    return {
      title: meta.title || post.title,
      description: meta.description || post.description,
      pageKeywords: meta?.keywords?.length
        ? meta.keywords.join(", ")
        : keywords,
    };
  },
  getContent: (language) => blogStaticByLanguage[language]?.get(post.slug)?.content || "",
}));

const entries = [...staticEntries, ...legalEntries, ...useCaseEntries, ...howToEntries, ...blogEntries];
let written = 0;

for (const entry of entries) {
  for (const language of supportedLanguages) {
    writeRouteHtml(entry.getPath(language), htmlFor(entry, language));
    written += 1;
  }
}

function aliasHtml(entry, language) {
  const aliasEntry = {
    ...entry,
    id: `${entry.id}-legacy-alias`,
    getMeta: (lang) => ({
      ...entry.getMeta(lang),
      robots: "noindex,follow",
    }),
  };
  return htmlFor(aliasEntry, language);
}

const entryById = new Map(entries.map((entry) => [entry.id, entry]));
const legacyAliases = [
  { path: "/en", entryId: "home", language: "en" },
  { path: "/precio", entryId: "pricing", language: "es" },
  { path: "/tarifs", entryId: "pricing", language: "fr" },
  { path: "/que-hacemos", entryId: "what-we-do", language: "es" },
  { path: "/que-faisons-nous", entryId: "what-we-do", language: "fr" },
  { path: "/privacidad", entryId: "legal-privacy", language: "es" },
  { path: "/terminos", entryId: "legal-terms", language: "es" },
  { path: "/confidentialite", entryId: "legal-privacy", language: "fr" },
  { path: "/conditions", entryId: "legal-terms", language: "fr" },
  { path: "/en/blog", entryId: "blog", language: "en" },
  ...supportedLanguages.map((language) => ({
    path: language === "en" ? "/como-funciona" : `/${language}/como-funciona`,
    entryId: "what-we-do",
    language,
  })),
  ...blogEntries.map((entry) => ({
    path: `/en/blog/${entry.slug}`,
    entryId: entry.id,
    language: "en",
  })),
];

for (const alias of legacyAliases) {
  const entry = entryById.get(alias.entryId);
  if (!entry) throw new Error(`Missing static entry for legacy alias ${alias.path}`);
  writeRouteHtml(alias.path, aliasHtml(entry, alias.language));
  written += 1;
}

// Vite's SSR loader can leave a file-watcher handle open on macOS/iCloud
// workspaces even after server.close(). All generated files are written sync.
for (const handle of process._getActiveHandles()) {
  if (handle?.constructor?.name === "Server" && typeof handle.close === "function") {
    handle.closeAllConnections?.();
    handle.close();
  }
  handle.unref?.();
}
