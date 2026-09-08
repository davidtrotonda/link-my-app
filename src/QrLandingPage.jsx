import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  QrCode,
  Smartphone,
  ScanLine,
  Check,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Target,
  Megaphone,
  Store,
  Briefcase,
  Apple,
  Bot,
} from "lucide-react";
import { SEO, LegalNavbar } from "./App.jsx";
import { FinalFooter as LandingFinalFooter, animationStyles } from "./LandingVisuals.jsx";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { niches as useCaseNiches, nichePath } from "./lib/useCases.js";

const brandName = "Link My App";
const siteUrl = "https://link-my.app";

/* ---------------------------------------------------------------------------
   Animación del QR: cuadritos generados + línea escáner + logos de tiendas
--------------------------------------------------------------------------- */
const QR_PATTERN = [
  "1111111011001111111",
  "1000001011011000001",
  "1011101001001011101",
  "1011101011101011101",
  "1011101001011011101",
  "1000001010101000001",
  "1111111010101111111",
  "0000000011100000000",
  "1011110100011001100",
  "0110010111010111001",
  "1110110010010100010",
  "0101011110110001110",
  "1111100100010101101",
  "0000000011001110000",
  "1111111010110100011",
  "1000001011001110100",
  "1011101001110000111",
  "1011101010100111010",
  "1111111011010101011",
];

function QrScanAnimation() {
  return (
    <div className="relative aspect-square w-full max-w-[420px] mx-auto rounded-[36px] border border-black/8 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-[0_28px_80px_rgba(0,0,0,0.10)] overflow-hidden">
      <style>{`
        @keyframes qr-scan-line {
          0% { transform: translateY(0); opacity: 0.85; }
          50% { transform: translateY(100%); opacity: 0.85; }
          50.01% { opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        @keyframes qr-store-pop-ios {
          0%, 35% { transform: scale(0.6) translateY(20px); opacity: 0; }
          45%, 100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes qr-store-pop-android {
          0%, 45% { transform: scale(0.6) translateY(20px); opacity: 0; }
          55%, 100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes qr-link-pulse {
          0%, 100% { box-shadow: 0 8px 28px rgba(16,185,129,0.32); }
          50% { box-shadow: 0 8px 32px rgba(16,185,129,0.55); }
        }
      `}</style>

      <div className="relative h-full w-full grid grid-cols-1 gap-3">
        {/* Top bar with link */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-black/8 bg-white px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-black text-white">
              <QrCode size={15} />
            </div>
            <span className="text-[11px] font-bold text-slate-700">link-my.app/qr</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> live
          </div>
        </div>

        {/* QR grid */}
        <div className="relative mx-auto aspect-square w-[68%] overflow-hidden rounded-2xl border border-black/8 bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
          <div className="grid h-full w-full grid-cols-[repeat(19,minmax(0,1fr))] gap-[1px]">
            {QR_PATTERN.flatMap((row, ri) =>
              row.split("").map((cell, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className={cell === "1" ? "bg-slate-900 rounded-[1px]" : "bg-white"}
                />
              )),
            )}
          </div>
          {/* Scan line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-[18%] bg-gradient-to-b from-emerald-400/0 via-emerald-400/40 to-emerald-400/0"
            style={{ animation: "qr-scan-line 3s ease-in-out infinite" }}
          />
        </div>

        {/* Store logos */}
        <div className="relative grid grid-cols-2 gap-2">
          <div
            className="flex items-center justify-center gap-2 rounded-2xl border border-black/8 bg-white px-3 py-3 shadow-sm"
            style={{ animation: "qr-store-pop-ios 3s ease-out infinite" }}
          >
            <Apple size={18} className="text-slate-800" />
            <span className="text-[11px] font-black text-slate-800">App Store</span>
          </div>
          <div
            className="flex items-center justify-center gap-2 rounded-2xl border border-black/8 bg-white px-3 py-3 shadow-sm"
            style={{ animation: "qr-store-pop-android 3s ease-out infinite" }}
          >
            <Bot size={18} className="text-emerald-600" />
            <span className="text-[11px] font-black text-slate-800">Google Play</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Página completa de QR
--------------------------------------------------------------------------- */
export default function QrLandingPage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const [openFaq, setOpenFaq] = useState(-1);

  const pageTitle = t(
    "qr.metaTitle",
    "Crea un código QR para tu app gratis y sin caducidad",
  );
  const pageDescription = t(
    "qr.metaDescription",
    "Crea un QR gratis para tu app, sin fecha de caducidad. Funciona con iPhone y Android y envía cada escaneo a App Store, Google Play o tu enlace alternativo.",
  );

  const benefits = useMemo(
    () => [
      {
        icon: Smartphone,
        title: t("qr.benefit1Title", "Envía cada móvil a su tienda"),
        text: t(
          "qr.benefit1Text",
          "Un solo QR detecta si el móvil es iPhone o Android y lo manda directamente a App Store o Google Play.",
        ),
      },
      {
        icon: ScanLine,
        title: t("qr.benefit2Title", "Sin fecha de caducidad"),
        text: t(
          "qr.benefit2Text",
          "El QR queda unido a una URL estable. Puedes usarlo en carteles, packaging, flyers, eventos o pantallas sin crear otro cada mes.",
        ),
      },
      {
        icon: TrendingUp,
        title: t("qr.benefit3Title", "Mide cuántos escaneos se convierten"),
        text: t(
          "qr.benefit3Text",
          "El QR está unido a un smart link, así que sabes cuántos escaneos has tenido y cuántos terminaron en App Store y Google Play.",
        ),
      },
    ],
    [t],
  );

  const steps = useMemo(
    () => [
      {
        title: t("qr.step1Title", "Pega los enlaces de tu app"),
        text: t(
          "qr.step1Text",
          "App Store, Google Play y una URL alternativa para ordenadores. Un único formulario, sin código.",
        ),
      },
      {
        title: t("qr.step2Title", "Genera tu smart link"),
        text: t(
          "qr.step2Text",
          "Creamos automáticamente el QR vinculado a tu smart link. Detecta el dispositivo y envía cada clic al destino correcto.",
        ),
      },
      {
        title: t("qr.step3Title", "Descárgalo e imprímelo"),
        text: t(
          "qr.step3Text",
          "Descarga el QR en alta resolución. Imprímelo en carteles, packaging, mostradores o úsalo en pantallas.",
        ),
      },
    ],
    [t],
  );

  const useCases = useMemo(
    () => [
      {
        icon: Store,
        title: t("qr.useCase1", "QR para apps de tiendas y ecommerce"),
        text: t(
          "qr.useCase1Text",
          "Imprime el QR en cajas, packaging o mostrador para que tus clientes descarguen la app.",
        ),
        to: localizePath(nichePath("ecommerce", language), language),
      },
      {
        icon: Megaphone,
        title: t("qr.useCase2", "QR para creadores e influencers"),
        text: t(
          "qr.useCase2Text",
          "Usa el QR en stories, merchandising y meetups para llevar tráfico a tu app desde redes.",
        ),
        to: localizePath(nichePath("creators", language), language),
      },
      {
        icon: Target,
        title: t("qr.useCase3", "QR para apps SaaS y B2B"),
        text: t(
          "qr.useCase3Text",
          "Reparte el QR en demos, ferias o materiales comerciales sin necesidad de dos enlaces.",
        ),
        to: localizePath(nichePath("saas", language), language),
      },
      {
        icon: Sparkles,
        title: t("qr.useCase4", "QR para apps de gimnasios y fitness"),
        text: t(
          "qr.useCase4Text",
          "Coloca el QR en recepción, vestuarios o pantallas para que los socios descarguen tu app.",
        ),
        to: localizePath(nichePath("fitness", language), language),
      },
      {
        icon: Briefcase,
        title: t("qr.useCase5", "QR para apps de restaurantes y hostelería"),
        text: t(
          "qr.useCase5Text",
          "Pega el QR en mesas, cartas digitales o tickets para descargar tu app de pedidos o fidelización.",
        ),
        to: localizePath(nichePath("restaurants", language), language),
      },
      {
        icon: QrCode,
        title: t("qr.useCase6", "QR para agencias y partners"),
        text: t(
          "qr.useCase6Text",
          "Centraliza la distribución de la app de tu cliente con un QR medible que separa los canales.",
        ),
        to: localizePath(nichePath("agencies", language), language),
      },
    ],
    [t, language],
  );

  const faqs = useMemo(
    () => [
      {
        q: t("qr.faq1Q", "¿Necesito generar dos códigos QR distintos?"),
        a: t(
          "qr.faq1A",
          "No. Con Link My App generas un único QR que decide en el momento del escaneo si el usuario entra desde iPhone, Android u ordenador, y lo lleva al destino correcto.",
        ),
      },
      {
        q: t("qr.faq2Q", "¿En qué resolución se descarga el QR?"),
        a: t(
          "qr.faq2A",
          "Lo generamos en alta resolución (PNG) para que puedas imprimirlo en carteles, packaging, lonas o flyers sin pérdida de calidad.",
        ),
      },
      {
        q: t("qr.faq3Q", "¿Puedo cambiar a dónde apunta el QR sin reimprimir?"),
        a: t(
          "qr.faq3A",
          "Sí. El QR está vinculado a un smart link estable, así que puedes cambiar el destino o el enlace alternativo cuando quieras. La URL impresa sigue siendo la misma.",
        ),
      },
      {
        q: t("qr.faq4Q", "¿Cuento los escaneos del QR por separado?"),
        a: t(
          "qr.faq4A",
          "Sí. Cada escaneo cuenta como un clic con origen \"QR\" y queda separado en las estadísticas frente a Instagram, web o email.",
        ),
      },
      {
        q: t("qr.faq5Q", "¿Funciona si mi app solo está en una tienda?"),
        a: t(
          "qr.faq5A",
          "Sí. Si solo tienes App Store o solo Google Play, el QR puede llevar a tu única tienda o a una URL alternativa para el resto.",
        ),
      },
      {
        q: t("qr.faq6Q", "¿Cuánto cuesta crear el QR de mi app?"),
        a: t(
          "qr.faq6A",
          "Puedes generar QR ilimitados gratis para distintas campañas, carteles, ubicaciones o partners.",
        ),
      },
    ],
    [t],
  );

  const pagePath = "/qr-codes";
  const canonical = `${siteUrl}${localizePath(pagePath, language)}`;

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: `${pageTitle} | ${brandName}`,
          description: pageDescription,
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
              name: t("qr.breadcrumb", "Código QR para apps"),
              item: canonical,
            },
          ],
        },
        {
          "@type": "SoftwareApplication",
          name: `${brandName} – ${t("qr.softwareName", "Generador de QR para apps")}`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: canonical,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            description: t("qr.offerDesc", "Crea un QR gratis para tu app"),
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    }),
    [canonical, pageTitle, pageDescription, language, faqs, t],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        schema={schema}
      />
      <LegalNavbar />
      <style>{animationStyles}</style>

      {/* HERO */}
      <section className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-black/45 shadow-sm">
              <QrCode size={14} /> {t("qr.eyebrow", "QR gratis para tu app")}
            </p>
            <h1 className="mt-5 text-[clamp(38px,6vw,72px)] font-black leading-[0.95] tracking-[-0.06em]">
              {t(
                "qr.h1",
                "Crea un código QR para tu app, gratis y sin caducidad",
              )}
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-black/60 md:text-lg">
              {t(
                "qr.subtitle",
                "Genera un único QR para tu aplicación. Si el usuario escanea con iPhone va a App Store, si escanea con Android va a Google Play, y el resto a tu enlace alternativo. Sin fecha de caducidad y gratis.",
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={localizePath("/login", language)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black tracking-[-0.01em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]"
              >
                {t("qr.ctaPrimary", "Crear mi QR gratis")} <QrCode size={16} />
              </Link>
              <Link
                to={localizePath("/login", language)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-6 py-3 text-sm font-black tracking-[-0.01em] text-black transition hover:-translate-y-0.5 hover:border-black/25"
              >
                {t("qr.ctaSecondary", "Crear cuenta gratis")}
              </Link>
            </div>

            <ul className="mt-7 grid gap-2.5 text-sm font-medium text-black/65">
              {[
                t("qr.heroBullet1", "QR gratis y sin fecha de caducidad"),
                t("qr.heroBullet2", "Funciona para iPhone, Android y ordenador"),
                t("qr.heroBullet3", "Estadísticas separadas para escaneos QR"),
              ].map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <QrScanAnimation />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative w-full bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {t("qr.benefitsTag", "Por qué un solo QR")}
            </p>
            <h2 className="mt-3 text-[clamp(32px,4.5vw,56px)] font-black leading-[0.95] tracking-[-0.055em]">
              {t(
                "qr.benefitsTitle",
                "Un QR menos, una decisión menos para el usuario",
              )}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <article
                  key={b.title}
                  className="group relative overflow-hidden rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_55px_rgba(0,0,0,0.045)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                    <Icon size={21} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[20px] font-black leading-tight tracking-[-0.035em]">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-black/55">
                    {b.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative w-full bg-[#fafbfc] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {t("qr.stepsTag", "Cómo funciona")}
            </p>
            <h2 className="mt-3 text-[clamp(32px,4.5vw,56px)] font-black leading-[0.95] tracking-[-0.055em]">
              {t("qr.stepsTitle", "Tu QR listo en menos de 1 minuto")}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
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

      {/* USE CASES */}
      <section className="relative w-full bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              {t("qr.casesTag", "Casos de uso")}
            </p>
            <h2 className="mt-3 text-[clamp(32px,4.5vw,56px)] font-black leading-[0.95] tracking-[-0.055em]">
              {t("qr.casesTitle", "QR para cualquier tipo de app")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-black/55 md:text-lg">
              {t(
                "qr.casesIntro",
                "Mira cómo usar un único QR según el sector de tu aplicación.",
              )}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => {
              const Icon = u.icon;
              return (
                <Link
                  key={u.title}
                  to={u.to}
                  className="group relative rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[18px] font-black leading-tight tracking-[-0.03em]">
                    {u.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-black/55">
                    {u.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-black/70 group-hover:text-black">
                    {t("qr.useCaseCta", "Ver caso de uso")} →
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              to={localizePath("/use-cases", language)}
              className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:border-black/25"
            >
              {t("qr.useCasesAll", "Ver todos los casos de uso")} →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
            FAQ
          </p>
          <h2 className="mt-3 text-[clamp(32px,4.5vw,56px)] font-black leading-[0.95] tracking-[-0.055em]">
            {t("qr.faqTitle", "Preguntas frecuentes sobre el QR de tu app")}
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-4xl space-y-3">
          {faqs.map((f, i) => {
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
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"}`}
                >
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
                {t("qr.finalCtaTag", "Empieza gratis")}
              </p>
              <h2 className="mt-3 text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-[-0.05em]">
                {t("qr.finalCtaTitle", "Crea ahora el QR gratis de tu app")}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-white/65 md:text-base">
                {t(
                  "qr.finalCtaSubtitle",
                  "Un único QR, sin fecha de caducidad, que abre App Store en iPhone y Google Play en Android.",
                )}
              </p>
            </div>
            <Link
              to={localizePath("/login", language)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black tracking-[-0.01em] text-black transition hover:-translate-y-0.5 hover:shadow-[0_22px_45px_rgba(255,255,255,0.16)]"
            >
              {t("qr.finalCtaButton", "Generar mi QR")} <QrCode size={16} />
            </Link>
          </div>
        </div>
      </section>

      <LandingFinalFooter theme="light" />
    </main>
  );
}
