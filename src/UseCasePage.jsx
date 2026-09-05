import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Store,
  Briefcase,
  Utensils,
  Dumbbell,
  Sparkles,
  Building2,
  Megaphone,
  Check,
  ChevronDown,
  QrCode,
  ArrowRight,
  AlertTriangle,
  X as XIcon,
  TrendingUp,
} from "lucide-react";
import { SEO, LegalNavbar } from "./App.jsx";
import { FinalFooter as LandingFinalFooter, animationStyles } from "./LandingVisuals.jsx";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { niches, visibleNiches, useCaseHubRoutes, nichePath, getNicheBySlug } from "./lib/useCases.js";

const brandName = "Link My App";
const siteUrl = "https://link-my.app";

const iconByName = {
  Store,
  Briefcase,
  Utensils,
  Dumbbell,
  Sparkles,
  Building2,
  Megaphone,
};

export default function UseCasePage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const { nicheSlug } = useParams();
  const niche = getNicheBySlug(nicheSlug, language) || niches[0];
  const content = niche[language] || niche.en;
  const Icon = iconByName[niche.icon] || Store;
  const [openFaq, setOpenFaq] = useState(-1);

  const hubPath = useCaseHubRoutes[language] || useCaseHubRoutes.en;
  const canonical = `${siteUrl}${language === "en" ? "" : `/${language}`}${hubPath}/${content.slug}`;

  const relatedNiches = useMemo(
    () => visibleNiches.filter((n) => n.id !== niche.id).slice(0, 4),
    [niche.id],
  );

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: `${content.metaTitle || content.title} | ${brandName}`,
          description: content.metaDescription,
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
              name: t("useCases.hubBreadcrumb", "Casos de uso"),
              item: `${siteUrl}${language === "en" ? hubPath : `/${language}${hubPath}`}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: content.label,
              item: canonical,
            },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: (content.faqs || []).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    }),
    [canonical, content, language, hubPath, t],
  );

  const seoPath = useMemo(() => {
    return `${useCaseHubRoutes.en}/${niche.en.slug}`;
  }, [niche]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <SEO
        title={content.metaTitle || content.title}
        description={content.metaDescription}
        path={seoPath}
        schema={schema}
      />
      <LegalNavbar />
      <style>{animationStyles}</style>

      {/* Breadcrumb */}
      <nav className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pt-28 md:px-8 md:pt-32">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-black/50">
          <li>
            <Link to={localizePath("/", language)} className="hover:text-black">
              {brandName}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to={localizePath("/use-cases", language)} className="hover:text-black">
              {t("useCases.hubBreadcrumb", "Casos de uso")}
            </Link>
          </li>
          <li>/</li>
          <li className="text-black">{content.label}</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-12 pt-10 md:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
        <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-black/45 shadow-sm">
          <Icon size={14} /> {content.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(38px,6vw,72px)] font-black leading-[0.95] tracking-[-0.06em]">
          {content.h1}
        </h1>
        <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-black/60 md:text-lg">
          {content.intro}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to={localizePath("/login", language)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black tracking-[-0.01em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
          >
            {t("useCases.ctaPrimary", "Empezar gratis")} <ArrowRight size={16} />
          </Link>
          <Link
            to={localizePath("/qr-codes", language)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-6 py-3 text-sm font-black tracking-[-0.01em] text-black transition hover:-translate-y-0.5 hover:border-black/25"
          >
            <QrCode size={16} /> {t("useCases.ctaQr", "Ver QR para apps")}
          </Link>
        </div>

        {/* Metrics row */}
        {Array.isArray(content.metrics) && content.metrics.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {content.metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-[20px] border border-black/8 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <p className="text-[32px] font-black leading-none tracking-tight text-black">{m.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-black/55">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PAIN POINTS */}
      {Array.isArray(content.painPoints) && content.painPoints.length > 0 && (
        <section className="relative w-full bg-[#fafbfc] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                {t("useCases.painTag", "Lo que te frena ahora")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("useCases.painTitle", "Los problemas más comunes en tu nicho")}
              </h2>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {content.painPoints.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-[20px] border border-black/8 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700">
                    <AlertTriangle size={16} strokeWidth={2.5} />
                  </span>
                  <p className="text-[14px] leading-relaxed text-black/65">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BEFORE / AFTER */}
      {content.beforeAfter && (
        <section className="relative w-full bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                {t("useCases.compareTag", "Antes vs después")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("useCases.compareTitle", "Lo que cambia para ti")}
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {/* Before */}
              <div className="rounded-[28px] border border-black/8 bg-[#fafbfc] p-6 md:p-8">
                <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-red-600">
                  <XIcon size={12} strokeWidth={3} /> {content.beforeAfter.before.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {content.beforeAfter.before.rows.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-black/65">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
                        <XIcon size={10} strokeWidth={3} />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              {/* After */}
              <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.05)] md:p-8">
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  <Check size={12} strokeWidth={3} /> {content.beforeAfter.after.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {content.beforeAfter.after.rows.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-black/80">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      {Array.isArray(content.benefits) && content.benefits.length > 0 && (
        <section className="relative w-full bg-[#fafbfc] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                {t("useCases.benefitTag", "Cómo lo solucionamos")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("useCases.benefitTitle", "Lo que cambia en tu canal con Link My App")}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.benefits.map((b, i) => (
                <article
                  key={i}
                  className="rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_55px_rgba(0,0,0,0.045)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <h3 className="text-[18px] font-black leading-tight tracking-[-0.03em]">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-black/55">
                    {b.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REAL EXAMPLES */}
      {Array.isArray(content.realExamples) && content.realExamples.length > 0 && (
        <section className="relative w-full bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                {t("useCases.examplesTag", "Ejemplos reales")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("useCases.examplesTitle", "Casos reales de cómo se usa")}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {content.realExamples.map((ex, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-[24px] border border-black/8 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white">
                      <TrendingUp size={13} strokeWidth={2.5} />
                    </span>
                    <h3 className="text-[16px] font-black tracking-[-0.02em]">{ex.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-black/60">{ex.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TUTORIAL */}
      {Array.isArray(content.tutorial) && content.tutorial.length > 0 && (
        <section className="relative w-full bg-[#fafbfc] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                {t("useCases.tutorialTag", "Cómo aplicarlo en tu app")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("useCases.tutorialTitle", "Implementación paso a paso")}
              </h2>
            </div>
            <ol className="mt-10 grid gap-4 md:grid-cols-2">
              {content.tutorial.map((s, i) => (
                <li
                  key={i}
                  className="rounded-[24px] border border-black/8 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-white text-sm font-black">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-[17px] font-black tracking-[-0.02em]">{s.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-black/60">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* FAQ */}
      {Array.isArray(content.faqs) && content.faqs.length > 0 && (
        <section className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">FAQ</p>
            <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
              {t("useCases.faqTitle", "Preguntas frecuentes")}
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-4xl space-y-3">
            {content.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <button
                  key={f.q}
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  className="w-full rounded-[24px] border border-black/[0.07] bg-white p-5 text-left shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
                >
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-black tracking-[-0.02em] text-black md:text-lg">
                        {f.q}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-black/45 transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="pl-12 text-sm font-medium leading-7 text-black/55 md:text-base">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* RELATED NICHES */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
            {t("useCases.relatedTag", "Más casos de uso")}
          </p>
          <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
            {t("useCases.relatedTitle", "Ver otros sectores que usan Link My App")}
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {relatedNiches.map((n) => {
            const c = n[language] || n.en;
            const Ic = iconByName[n.icon] || Store;
            return (
              <Link
                key={n.id}
                to={localizePath(nichePath(n.id, language), language)}
                className="group rounded-[24px] border border-black/8 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <Ic size={18} />
                </div>
                <h3 className="text-base font-black tracking-[-0.02em]">{c.label}</h3>
                <p className="mt-1 text-xs text-black/55">{c.eyebrow}</p>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            to={localizePath("/use-cases", language)}
            className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:border-black/25"
          >
            {t("useCases.viewAll", "Ver todos los casos de uso")} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <LandingFinalFooter theme="light" />
    </main>
  );
}
