import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Instagram,
  MessageCircle,
  SplitSquareHorizontal,
  MousePointer2,
  Printer,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { SEO, LegalNavbar } from "./App.jsx";
import { FinalFooter as LandingFinalFooter, animationStyles } from "./LandingVisuals.jsx";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { howTos, howToHubRoutes, howToPath } from "./lib/howTos.js";

const brandName = "Link My App";
const siteUrl = "https://link-my.app";

const iconByName = {
  Instagram,
  MessageCircle,
  SplitSquareHorizontal,
  MousePointer2,
  Printer,
};

const hubMeta = {
  en: {
    title: "How-to guides for app download links",
    description:
      "Practical guides to share your app: Instagram bio, WhatsApp, device redirect, web button and QR codes for physical campaigns.",
    h1: "How to share your app the smart way",
    eyebrow: "How-to guides",
    intro:
      "Step-by-step guides to use your smart link in every channel: Instagram, WhatsApp, your website, QR codes and device-based redirects.",
  },
  es: {
    title: "Guías paso a paso para enlaces de descarga de apps",
    description:
      "Guías prácticas para compartir tu app: bio de Instagram, WhatsApp, redirección por dispositivo, botón web y QR para campañas físicas.",
    h1: "Cómo compartir tu app de forma inteligente",
    eyebrow: "Guías paso a paso",
    intro:
      "Guías paso a paso para usar tu smart link en cada canal: Instagram, WhatsApp, tu web, códigos QR y redirección por dispositivo.",
  },
  fr: {
    title: "Guides pratiques pour les liens de téléchargement d'apps",
    description:
      "Guides pratiques pour partager ton app : bio Instagram, WhatsApp, redirection par appareil, bouton web et QR pour campagnes physiques.",
    h1: "Comment partager ton app intelligemment",
    eyebrow: "Guides pratiques",
    intro:
      "Guides étape par étape pour utiliser ton smart link dans chaque canal : Instagram, WhatsApp, ton site, codes QR et redirection par appareil.",
  },
};

export default function HowToHub() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const meta = hubMeta[language] || hubMeta.en;
  const hubPath = howToHubRoutes[language] || howToHubRoutes.en;
  const canonical = `${siteUrl}${language === "en" ? hubPath : `/${language}${hubPath}`}`;

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${canonical}#collection`,
          url: canonical,
          name: meta.title,
          description: meta.description,
          inLanguage: language,
          isPartOf: { "@type": "WebSite", name: brandName, url: siteUrl },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: brandName,
              item: `${siteUrl}${localizePath("/", language)}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: meta.eyebrow,
              item: canonical,
            },
          ],
        },
        {
          "@type": "ItemList",
          itemListElement: howTos.map((h, i) => {
            const c = h[language] || h.en;
            const url = `${siteUrl}${language === "en" ? "" : `/${language}`}${hubPath}/${c.slug}`;
            return {
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              url,
            };
          }),
        },
      ],
    }),
    [canonical, meta, language, hubPath],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <SEO
        title={meta.title}
        description={meta.description}
        path={howToHubRoutes.en}
        schema={schema}
      />
      <LegalNavbar />
      <style>{animationStyles}</style>

      {/* HERO */}
      <section className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
        <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-black/45 shadow-sm">
          <BookOpen size={14} /> {meta.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(40px,6vw,76px)] font-black leading-[0.95] tracking-[-0.06em]">
          {meta.h1}
        </h1>
        <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-black/60 md:text-lg">
          {meta.intro}
        </p>
      </section>

      {/* GUIDES GRID */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 pb-24 md:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {howTos.map((h) => {
            const c = h[language] || h.en;
            const Ic = iconByName[h.icon] || Instagram;
            return (
              <Link
                key={h.id}
                to={localizePath(howToPath(h.id, language), language)}
                className={`group relative overflow-hidden rounded-[28px] border border-black/8 bg-gradient-to-br ${h.accent} p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.10)]`}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                  <Ic size={20} strokeWidth={2.5} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
                  {c.eyebrow}
                </p>
                <h2 className="mt-2 text-[20px] font-black leading-tight tracking-[-0.03em]">
                  {c.label}
                </h2>
                <p className="mt-3 text-sm font-medium leading-7 text-black/60">
                  {c.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-black/70 group-hover:text-black">
                  {t("howTo.readGuide", "Leer guía")} <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <LandingFinalFooter theme="light" />
    </main>
  );
}
