import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Store,
  Briefcase,
  Utensils,
  Dumbbell,
  Sparkles,
  Building2,
  ArrowRight,
  QrCode,
  Layers3,
} from "lucide-react";
import { SEO, LegalNavbar } from "./App.jsx";
import { FinalFooter as LandingFinalFooter, animationStyles } from "./LandingVisuals.jsx";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { niches, useCaseHubRoutes, nichePath } from "./lib/useCases.js";

const brandName = "Link My App";
const siteUrl = "https://link-my.app";

const iconByName = {
  Store,
  Briefcase,
  Utensils,
  Dumbbell,
  Sparkles,
  Building2,
};

const hubMeta = {
  en: {
    title: "Use cases – app download links for every sector",
    description:
      "See how every app sector uses a single smart link for App Store, Google Play and QR codes: ecommerce, SaaS, restaurants, fitness, creators and agencies.",
    h1: "Smart links for every app sector",
    eyebrow: "Use cases",
    intro:
      "Pick your sector and see how to use a single smart link and QR for your app: how to share it, where to print it, how to measure clicks and which channels work best.",
  },
  es: {
    title: "Casos de uso – enlaces de descarga para cada sector",
    description:
      "Mira cómo cada sector usa un smart link único para App Store, Google Play y QR: ecommerce, SaaS, restaurantes, fitness, creadores y agencias.",
    h1: "Smart links para cualquier tipo de app",
    eyebrow: "Casos de uso",
    intro:
      "Elige tu sector y descubre cómo usar un único smart link y QR para tu app: dónde compartirlo, dónde imprimirlo, cómo medir clics y qué canales funcionan mejor.",
  },
  fr: {
    title: "Cas d'usage – liens de téléchargement par secteur",
    description:
      "Découvre comment chaque secteur utilise un smart link unique pour App Store, Google Play et QR : ecommerce, SaaS, restauration, fitness, créateurs et agences.",
    h1: "Smart links pour tout type d'app",
    eyebrow: "Cas d'usage",
    intro:
      "Choisis ton secteur et découvre comment utiliser un seul smart link et QR pour ton app : où le partager, où l'imprimer, comment mesurer les clics et quels canaux marchent le mieux.",
  },
};

export default function UseCasesHub() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const meta = hubMeta[language] || hubMeta.en;
  const hubPath = useCaseHubRoutes[language] || useCaseHubRoutes.en;
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
          itemListElement: niches.map((n, idx) => {
            const c = n[language] || n.en;
            const url = `${siteUrl}${language === "en" ? "" : `/${language}`}${hubPath}/${c.slug}`;
            return {
              "@type": "ListItem",
              position: idx + 1,
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
        path={useCaseHubRoutes.en}
        schema={schema}
      />
      <LegalNavbar />
      <style>{animationStyles}</style>

      {/* HERO */}
      <section className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
        <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-black/45 shadow-sm">
          <Layers3 size={14} /> {meta.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(40px,6vw,76px)] font-black leading-[0.95] tracking-[-0.06em]">
          {meta.h1}
        </h1>
        <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-black/60 md:text-lg">
          {meta.intro}
        </p>
      </section>

      {/* NICHES GRID */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 pb-24 md:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {niches.map((n) => {
            const c = n[language] || n.en;
            const Ic = iconByName[n.icon] || Store;
            return (
              <Link
                key={n.id}
                to={localizePath(nichePath(n.id, language), language)}
                className={`group relative overflow-hidden rounded-[28px] border border-black/8 bg-gradient-to-br ${n.accent} p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.10)]`}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                  <Ic size={20} strokeWidth={2.5} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
                  {c.eyebrow}
                </p>
                <h2 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.035em]">
                  {c.label}
                </h2>
                <p className="mt-3 text-sm font-medium leading-7 text-black/60">
                  {c.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-black/70 group-hover:text-black">
                  {t("useCases.discover", "Ver caso de uso")} <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-black p-8 text-white shadow-[0_28px_80px_rgba(0,0,0,0.20)] md:p-12">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
                {t("useCases.ctaTag", "Empieza gratis")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("useCases.ctaTitle", "Crea tu primer smart link y QR para tu app")}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-white/65 md:text-base">
                {t(
                  "useCases.ctaSubtitle",
                  "Pega los enlaces de App Store y Google Play, descarga tu QR y empieza a medir las descargas en menos de un minuto.",
                )}
              </p>
            </div>
            <Link
              to={localizePath("/login", language)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black tracking-[-0.01em] text-black transition hover:-translate-y-0.5"
            >
              {t("useCases.ctaButton", "Empezar ahora")} <QrCode size={16} />
            </Link>
          </div>
        </div>
      </section>

      <LandingFinalFooter theme="light" />
    </main>
  );
}
