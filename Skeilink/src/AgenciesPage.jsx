import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Users,
  BarChart3,
  Layers,
  Workflow,
  Briefcase,
  PieChart,
  Tag,
  Check,
  ChevronDown,
  ArrowRight,
  QrCode,
  Sparkles,
  Globe,
} from "lucide-react";
import { SEO, LegalNavbar } from "./App.jsx";
import { FinalFooter as LandingFinalFooter, animationStyles } from "./LandingVisuals.jsx";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { getNicheById, nichePath, useCaseHubRoutes } from "./lib/useCases.js";

const brandName = "Link My App";
const siteUrl = "https://link-my.app";

export default function AgenciesPage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const niche = getNicheById("agencies");
  const content = niche[language] || niche.en;
  const [openFaq, setOpenFaq] = useState(-1);

  const path = nichePath("agencies", language);
  const canonical = `${siteUrl}${language === "en" ? path : `/${language}${path}`}`;

  const stats = useMemo(
    () => [
      { value: "+50", label: t("agencies.stat1", "Smart links por cliente") },
      { value: "3×", label: t("agencies.stat2", "Más datos accionables") },
      { value: "1", label: t("agencies.stat3", "Único panel para todo") },
    ],
    [t],
  );

  const pillars = useMemo(
    () => [
      {
        icon: Users,
        title: t("agencies.pillar1Title", "Un cliente, una estructura limpia"),
        text: t(
          "agencies.pillar1Text",
          "Crea un smart link por cliente, otro por campaña, otro por país. Sin URLs perdidas en carpetas ni Slack.",
        ),
      },
      {
        icon: Workflow,
        title: t("agencies.pillar2Title", "Atribución que se entiende"),
        text: t(
          "agencies.pillar2Text",
          "Clics separados por dispositivo, fuente y campaña. Llega al reporting con datos que el cliente entiende a la primera.",
        ),
      },
      {
        icon: Layers,
        title: t("agencies.pillar3Title", "QR por canal y por evento"),
        text: t(
          "agencies.pillar3Text",
          "Genera un QR distinto para retail, redes, ferias o stickers de influencer. Cada uno medido por separado.",
        ),
      },
      {
        icon: Tag,
        title: t("agencies.pillar4Title", "Marca corta y propia"),
        text: t(
          "agencies.pillar4Text",
          "Usa URLs cortas personalizadas tipo link-my.app/cliente. Limpias para presentaciones, ads y QR impresos.",
        ),
      },
    ],
    [t],
  );

  const workflow = useMemo(
    () => [
      {
        title: t("agencies.flow1Title", "Onboarding del cliente"),
        text: t(
          "agencies.flow1Text",
          "Pega los enlaces de App Store y Google Play, define el fallback web y crea el primer smart link del cliente.",
        ),
      },
      {
        title: t("agencies.flow2Title", "Una URL por canal"),
        text: t(
          "agencies.flow2Text",
          "Repite el smart link por canal: Instagram, paid social, TikTok, prensa, retail, eventos. Cada uno mide por su lado.",
        ),
      },
      {
        title: t("agencies.flow3Title", "Reporte mensual"),
        text: t(
          "agencies.flow3Text",
          "Lleva al cliente clics por dispositivo, fuente y campaña. Pantallazos limpios sin pelearte con 3 dashboards.",
        ),
      },
    ],
    [t],
  );

  const idealFor = useMemo(
    () => [
      { icon: Briefcase, label: t("agencies.idealFor1", "Agencias de marketing digital") },
      { icon: Globe, label: t("agencies.idealFor2", "Agencias de paid media") },
      { icon: Sparkles, label: t("agencies.idealFor3", "Estudios de creadores") },
      { icon: PieChart, label: t("agencies.idealFor4", "Equipos de growth in-house") },
    ],
    [t],
  );

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: `${content.metaTitle} | ${brandName}`,
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
              item: `${siteUrl}${language === "en" ? useCaseHubRoutes.en : `/${language}${useCaseHubRoutes[language]}`}`,
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
    [canonical, content, language, t],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <SEO
        title={content.metaTitle}
        description={content.metaDescription}
        path={`${useCaseHubRoutes.en}/${niche.en.slug}`}
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

      {/* HERO with stats */}
      <section className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-16 pt-10 md:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-black/45 shadow-sm">
              <Building2 size={14} /> {content.eyebrow}
            </p>
            <h1 className="mt-5 text-[clamp(40px,6vw,76px)] font-black leading-[0.95] tracking-[-0.06em]">
              {content.h1}
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-black/60 md:text-lg">
              {content.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={localizePath("/login", language)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black tracking-[-0.01em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
              >
                {t("agencies.ctaPrimary", "Crear cuenta de agencia")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="relative rounded-[34px] border border-black/10 bg-black p-8 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
              {t("agencies.statsTag", "Qué cambia para tu agencia")}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
                >
                  <p className="text-[28px] font-black leading-none tracking-tight">{s.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-sm font-medium text-white/80">
              {[
                t("agencies.heroBullet1", "Atribución por canal sin pegar dashboards"),
                t("agencies.heroBullet2", "QR distinto para retail, eventos e influencers"),
                t("agencies.heroBullet3", "Marca corta personalizada por cliente"),
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative w-full bg-[#fafbfc] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {t("agencies.pillarsTag", "4 cosas que solucionas en el día 1")}
            </p>
            <h2 className="mt-3 text-[clamp(32px,4.5vw,56px)] font-black leading-[0.95] tracking-[-0.055em]">
              {t("agencies.pillarsTitle", "Tu agencia, con la misma capa para todos los clientes")}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className="rounded-[28px] border border-black/8 bg-white p-7 shadow-[0_18px_55px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[22px] font-black leading-tight tracking-[-0.035em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-black/55">{p.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="relative w-full bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {t("agencies.workflowTag", "Tu workflow ideal")}
            </p>
            <h2 className="mt-3 text-[clamp(32px,4.5vw,56px)] font-black leading-[0.95] tracking-[-0.055em]">
              {t("agencies.workflowTitle", "Del onboarding al reporte mensual en 3 pasos")}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {workflow.map((s, i) => (
              <div
                key={s.title}
                className="rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs font-black">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-black tracking-[-0.02em]">{s.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-black/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDEAL FOR */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8">
        <div className="rounded-[34px] border border-black/8 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {t("agencies.idealTag", "Ideal para")}
            </p>
            <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
              {t("agencies.idealTitle", "Estos perfiles ya usan Link My App")}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {idealFor.map((it) => {
              const Icon = it.icon;
              return (
                <div
                  key={it.label}
                  className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black text-white">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  <p className="text-sm font-bold text-black/80">{it.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">FAQ</p>
          <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
            {t("agencies.faqTitle", "Preguntas frecuentes de agencias")}
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          {(content.faqs || []).map((f, i) => {
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

      {/* FINAL CTA */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-black p-8 text-white shadow-[0_28px_80px_rgba(0,0,0,0.20)] md:p-12">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
                {t("agencies.finalCtaTag", "Empieza con un cliente")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("agencies.finalCtaTitle", "Lleva tu primer cliente a Link My App en 5 minutos")}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-white/65 md:text-base">
                {t(
                  "agencies.finalCtaSubtitle",
                  "Pega los enlaces de App Store y Google Play, crea el primer smart link, descarga el QR y entrega a tu cliente una capa de medición limpia.",
                )}
              </p>
            </div>
            <Link
              to={localizePath("/login", language)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black tracking-[-0.01em] text-black transition hover:-translate-y-0.5"
            >
              {t("agencies.finalCtaButton", "Empezar")} <QrCode size={16} />
            </Link>
          </div>
        </div>
      </section>

      <LandingFinalFooter theme="light" />
    </main>
  );
}
