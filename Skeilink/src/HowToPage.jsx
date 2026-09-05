import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Instagram,
  MessageCircle,
  SplitSquareHorizontal,
  MousePointer2,
  Printer,
  Check,
  ArrowRight,
  AlertTriangle,
  QrCode,
} from "lucide-react";
import { SEO, LegalNavbar } from "./App.jsx";
import { FinalFooter as LandingFinalFooter, animationStyles } from "./LandingVisuals.jsx";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { howTos, howToHubRoutes, howToPath, getHowToBySlug } from "./lib/howTos.js";
import { getNicheById, nichePath } from "./lib/useCases.js";

const brandName = "Link My App";
const siteUrl = "https://link-my.app";

const iconByName = {
  Instagram,
  MessageCircle,
  SplitSquareHorizontal,
  MousePointer2,
  Printer,
};

export default function HowToPage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const { howToSlug } = useParams();
  const howto = getHowToBySlug(howToSlug, language) || howTos[0];
  const content = howto[language] || howto.en;
  const Icon = iconByName[howto.icon] || Instagram;

  const seoPath = `${howToHubRoutes.en}/${howto.en.slug}`;
  const canonical = `${siteUrl}${language === "en" ? seoPath : `/${language}${howToHubRoutes[language] || howToHubRoutes.en}/${content.slug}`}`;

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HowTo",
          name: content.h1,
          description: content.intro,
          inLanguage: language,
          totalTime: content.totalTime || "PT4M",
          step: (content.steps || []).map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
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
              name: t("howTo.hubBreadcrumb", "Guías"),
              item: `${siteUrl}${language === "en" ? howToHubRoutes.en : `/${language}${howToHubRoutes[language] || howToHubRoutes.en}`}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: content.label,
              item: canonical,
            },
          ],
        },
      ],
    }),
    [content, language, canonical, t],
  );

  const relatedNiches = useMemo(
    () =>
      (howto.relatedNiches || [])
        .map((id) => getNicheById(id))
        .filter(Boolean),
    [howto],
  );

  const otherGuides = useMemo(
    () => howTos.filter((h) => h.id !== howto.id).slice(0, 3),
    [howto.id],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <SEO
        title={content.metaTitle || content.h1}
        description={content.metaDescription}
        path={seoPath}
        schema={schema}
      />
      <LegalNavbar />
      <style>{animationStyles}</style>

      {/* Breadcrumb */}
      <nav className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pt-28 md:px-8 md:pt-32">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-black/50">
          <li>
            <Link to={localizePath("/", language)} className="hover:text-black">
              {brandName}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to={localizePath("/how-to", language)} className="hover:text-black">
              {t("howTo.hubBreadcrumb", "Guías")}
            </Link>
          </li>
          <li>/</li>
          <li className="text-black">{content.label}</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
        <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-black/45 shadow-sm">
          <Icon size={14} /> {content.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(36px,5.5vw,68px)] font-black leading-[0.95] tracking-[-0.06em]">
          {content.h1}
        </h1>
        <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-black/60 md:text-lg">
          {content.intro}
        </p>
      </section>

      {/* PROBLEM */}
      {content.problem && (
        <section className="relative mx-auto w-full max-w-[1100px] px-5 py-6 md:px-8">
          <div className="flex items-start gap-4 rounded-[24px] border border-amber-100 bg-amber-50/60 p-5">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle size={16} strokeWidth={2.5} />
            </span>
            <p className="text-[15px] font-medium leading-relaxed text-black/70">
              {content.problem}
            </p>
          </div>
        </section>
      )}

      {/* STEPS */}
      {Array.isArray(content.steps) && content.steps.length > 0 && (
        <section className="relative mx-auto w-full max-w-[1100px] px-5 py-12 md:px-8">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {t("howTo.stepsTag", "Paso a paso")}
            </p>
            <h2 className="mt-3 text-[clamp(28px,4vw,46px)] font-black leading-[0.95] tracking-[-0.05em]">
              {t("howTo.stepsTitle", "Los pasos exactos para lograrlo")}
            </h2>
          </div>
          <ol className="space-y-4">
            {content.steps.map((s, i) => (
              <li
                key={i}
                className="rounded-[24px] border border-black/8 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-start md:gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-base font-black text-white">
                      {i + 1}
                    </span>
                    <p className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-black/40 md:block">
                      {t("howTo.stepLabel", "Paso")}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black tracking-[-0.025em] text-black">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/65">
                      {s.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to={localizePath("/login", language)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black tracking-[-0.01em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
            >
              {t("howTo.ctaPrimary", "Crear mi smart link gratis")} <ArrowRight size={16} />
            </Link>
            <Link
              to={localizePath("/qr-codes", language)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-6 py-3 text-sm font-black tracking-[-0.01em] text-black transition hover:-translate-y-0.5 hover:border-black/25"
            >
              <QrCode size={16} /> {t("howTo.ctaQr", "Ver QR para apps")}
            </Link>
          </div>
        </section>
      )}

      {/* RELATED NICHES (interlinking) */}
      {relatedNiches.length > 0 && (
        <section className="relative mx-auto w-full max-w-[1100px] px-5 py-12 md:px-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
            {t("howTo.relatedNicheTag", "Aplícalo a tu sector")}
          </p>
          <h2 className="mt-3 text-[clamp(24px,3.4vw,38px)] font-black leading-[0.95] tracking-[-0.04em]">
            {t("howTo.relatedNicheTitle", "Casos de uso por tipo de app")}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {relatedNiches.map((n) => {
              const c = n[language] || n.en;
              return (
                <Link
                  key={n.id}
                  to={localizePath(nichePath(n.id, language), language)}
                  className="group flex items-center gap-4 rounded-[24px] border border-black/8 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-black text-white">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-black tracking-[-0.02em]">{c.label}</h3>
                    <p className="mt-0.5 text-xs text-black/55">{c.eyebrow}</p>
                  </div>
                  <ArrowRight size={16} className="text-black/40 group-hover:text-black" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* OTHER GUIDES */}
      <section className="relative mx-auto w-full max-w-[1100px] px-5 py-16 md:px-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
          {t("howTo.otherGuidesTag", "Más guías")}
        </p>
        <h2 className="mt-3 text-[clamp(24px,3.4vw,38px)] font-black leading-[0.95] tracking-[-0.04em]">
          {t("howTo.otherGuidesTitle", "Sigue aprendiendo a usar tu smart link")}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {otherGuides.map((g) => {
            const c = g[language] || g.en;
            const Ic = iconByName[g.icon] || Instagram;
            return (
              <Link
                key={g.id}
                to={localizePath(howToPath(g.id, language), language)}
                className="group rounded-[24px] border border-black/8 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <Ic size={16} />
                </div>
                <h3 className="text-base font-black tracking-[-0.02em]">{c.label}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.16em] text-black/50 group-hover:text-black">
                  {t("howTo.readGuide", "Leer guía")} →
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-10">
          <Link
            to={localizePath("/how-to", language)}
            className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:border-black/25"
          >
            {t("howTo.viewAll", "Ver todas las guías")} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <LandingFinalFooter theme="light" />
    </main>
  );
}
