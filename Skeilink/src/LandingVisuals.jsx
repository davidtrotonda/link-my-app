import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Cookie,
  CreditCard,
  FileText,
  Folder,
  Infinity as InfinityIcon,
  Link2,
  Menu,
  MousePointer2,
  Repeat,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import {
  languageOptions,
  localizePath,
  normalizeLanguage,
  setUserChosenLanguage,
  switchLanguagePath,
} from "./lib/i18nRoutes.js";

const brandLogoUrl =
  "https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png";

export function PremiumNavbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const language = normalizeLanguage(i18n.language);

  const links = [
    { label: t("nav.home"), href: localizePath("/", language) },
    { label: t("nav.how"), href: localizePath("/what-we-do", language) },
    { label: t("nav.faqs"), href: localizePath("/faqs", language) },
    { label: t("nav.price", "Gratis"), href: localizePath("/pricing", language) },
  ];
  const loginHref = localizePath("/login", language);

  return (
    <nav className="fixed left-1/2 top-4 z-[9999] w-[calc(100vw-16px)] max-w-[930px] -translate-x-1/2 rounded-[24px] border border-black/10 bg-white/45 px-3 py-2 shadow-[inset_0_0_14px_rgba(255,255,255,0.85),0_3px_22px_rgba(0,0,0,0.10)] backdrop-blur-xl md:top-6 md:rounded-[30px] md:px-5 md:py-3 lg:px-7">
      <div className="flex items-center justify-between gap-3">
        <a href={localizePath("/", language)} className="flex shrink-0 items-center gap-2 transition hover:opacity-80">
          <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="h-8 w-8 md:h-9 md:w-9 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
          <span className="text-[18px] font-bold tracking-tight text-black md:text-[22px]">
            Link My App
          </span>
        </a>

        <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="relative ml-auto flex shrink-0 items-center gap-2">
          <a
            href={loginHref}
            className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#353535_0%,#0a0a0a_100%)] px-3 py-2.5 text-sm font-bold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_10px_20px_rgba(255,255,255,0.05),0_4px_15px_rgba(0,0,0,0.32)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_10px_20px_rgba(255,255,255,0.08),0_8px_25px_rgba(0,0,0,0.45)] md:rounded-[22px] md:px-4 md:py-3.5 md:text-base"
          >
            {t("nav.login")}
          </a>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-transparent text-black lg:hidden"
            aria-label="Abrir menú"
          >
            {open ? <X size={25} strokeWidth={2.4} /> : <Menu size={27} strokeWidth={2.4} />}
          </button>

          <div
            className={`absolute right-0 top-[calc(100%+12px)] flex w-[min(280px,calc(100vw-24px))] origin-top flex-col gap-2 rounded-[24px] border border-black/10 bg-white p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition-all duration-300 lg:hidden ${
              open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
            }`}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-left text-[17px] font-semibold text-black transition hover:bg-black/[0.04] hover:text-black/65"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export function SmartLinkFlow() {
  const { t } = useTranslation();
  const appStoreLogo =
    "https://skeilapps.com/wp-content/uploads/2026/05/apple-Photoroom.png";
  const playStoreLogo =
    "https://skeilapps.com/wp-content/uploads/2026/05/android-Photoroom.png";
  const appIconUrl =
    "https://skeilapps.com/wp-content/uploads/2025/12/icono-SkeilEcom.png";

  const topLeftPath = "M450 95 C450 150 250 140 250 192";
  const topCenterPath = "M450 95 L450 192";
  const topRightPath = "M450 95 C450 150 610 140 610 192";

  const leftDownPath = "M250 274 L250 332";
  const centerDownPath = "M450 274 L450 358";
  const rightDownPath = "M610 274 L610 332";

  const particleLeftPath = "M450 95 C450 150 250 140 250 192 L250 350";
  const particleCenterPath = "M450 95 L450 390";
  const particleRightPath = "M450 95 C450 150 610 140 610 192 L610 350";

  return (
    <section
      className="slf-section"
      aria-label="Smart link hacia App Store, web y Google Play"
    >
      <style>{`
        .slf-section {
          width: 100%;
          padding: clamp(14px, 3vw, 32px) clamp(8px, 2vw, 18px) clamp(18px, 4vw, 42px);
          background:
            radial-gradient(circle at 50% 12%, rgba(255,255,255,.98) 0 18%, rgba(248,248,248,.92) 48%, rgba(255,255,255,1) 76%),
            linear-gradient(180deg, #ffffff 0%, #f7f7f8 62%, #ffffff 100%);
          font-family: inherit;
          container-type: inline-size;
        }

        .slf-frame {
          position: relative;
          width: min(100%, 920px);
          aspect-ratio: 920 / 585;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: clamp(18px, 3.1cqw, 28px);
          background:
            radial-gradient(circle, rgba(0,0,0,.055) 1px, transparent 1.5px) 0 0 / clamp(8px, 1.85cqw, 17px) clamp(8px, 1.85cqw, 17px),
            linear-gradient(180deg, rgba(255,255,255,.96), rgba(250,250,250,.9) 58%, rgba(255,255,255,1));
          box-shadow: 0 clamp(14px, 2.6cqw, 24px) clamp(36px, 7.6cqw, 70px) rgba(15, 23, 42, .07);
        }

        .slf-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, #fff 0%, transparent 14%, transparent 86%, #fff 100%),
            linear-gradient(180deg, #fff 0%, transparent 18%, transparent 84%, #fff 100%);
          z-index: 6;
        }

        .slf-lines,
        .slf-particles-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .slf-lines { z-index: 1; }
        .slf-particles-svg { z-index: 2; }

        .slf-line {
          fill: none;
          stroke: rgba(27, 31, 36, .13);
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .slf-particle .trail-far {
          stroke: currentColor;
          stroke-width: 5.5;
          stroke-linecap: round;
          opacity: .10;
          filter: blur(.8px);
        }

        .slf-particle .trail-near {
          stroke: currentColor;
          stroke-width: 4.2;
          stroke-linecap: round;
          opacity: .24;
          filter: blur(.25px);
        }

        .slf-particle .head { fill: currentColor; }
        .slf-particle.blue { color: #2ea7ff; }
        .slf-particle.green { color: #49c96f; }
        .slf-particle.black { color: #111827; }

        .slf-particle.blue .head {
          filter: drop-shadow(0 0 4px rgba(46,167,255,.55)) drop-shadow(0 0 9px rgba(46,167,255,.32));
        }

        .slf-particle.green .head {
          filter: drop-shadow(0 0 4px rgba(73,201,111,.55)) drop-shadow(0 0 9px rgba(73,201,111,.32));
        }

        .slf-particle.black .head {
          filter: drop-shadow(0 0 4px rgba(17,24,39,.45)) drop-shadow(0 0 9px rgba(17,24,39,.25));
        }

        .slf-link-pill,
        .slf-store-card,
        .slf-windows-card,
        .slf-phone,
        .slf-phone-android,
        .slf-globe-pill {
          position: absolute;
          z-index: 3;
        }

        .slf-link-pill {
          top: 11.3%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: clamp(5px, 1.3cqw, 12px);
          height: clamp(26px, 6.3cqw, 58px);
          max-width: 44%;
          padding: 0 clamp(7px, 1.95cqw, 18px) 0 clamp(6px, 1.52cqw, 14px);
          border: 1px solid rgba(15, 23, 42, .1);
          border-radius: clamp(9px, 1.95cqw, 18px);
          background: rgba(255,255,255,.86);
          box-shadow: 0 clamp(6px, 1.3cqw, 12px) clamp(15px, 3.04cqw, 28px) rgba(15, 23, 42, .08), inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(14px);
          animation: slfFloat 5s ease-in-out infinite;
        }

        .slf-mini-logo {
          width: clamp(16px, 3.37cqw, 31px);
          height: clamp(16px, 3.37cqw, 31px);
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: linear-gradient(135deg, #111827 0%, #27272a 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.12);
          overflow: hidden;
          flex: 0 0 auto;
        }

        .slf-mini-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .slf-link-text {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #151515;
          font-size: clamp(7px, 1.52cqw, 14px);
          font-weight: 760;
          letter-spacing: -.02em;
          white-space: nowrap;
        }

        .slf-store-card,
        .slf-windows-card {
          top: 32.8%;
          width: clamp(36px, 8.91cqw, 82px);
          height: clamp(36px, 8.91cqw, 82px);
          display: grid;
          place-items: center;
          border: 1px solid rgba(15, 23, 42, .10);
          border-radius: clamp(10px, 2.06cqw, 19px);
          background: rgba(255,255,255,.84);
          box-shadow: 0 clamp(8px, 1.74cqw, 16px) clamp(18px, 3.8cqw, 35px) rgba(15, 23, 42, .08), inset 0 1px 0 rgba(255,255,255,.95);
          backdrop-filter: blur(12px);
          overflow: hidden;
        }

        .slf-store-card.left {
          left: 27.77%;
          transform: translateX(-50%);
          animation: slfFloatLeft 6s ease-in-out infinite;
        }

        .slf-store-card.right {
          left: 67.78%;
          transform: translateX(-50%);
          animation: slfFloatRight 6.4s ease-in-out infinite;
        }

        .slf-windows-card {
          left: 50%;
          transform: translateX(-50%);
          animation: slfFloatWindows 6.2s ease-in-out infinite;
        }

        .slf-store-image {
          width: clamp(24px, 5.87cqw, 54px);
          height: clamp(24px, 5.87cqw, 54px);
          object-fit: contain;
          display: block;
        }

        .slf-store-image.app {
          width: 100%;
          height: 100%;
          transform: scale(1.7);
        }

        .slf-store-image.play {
          width: clamp(30px, 7.3cqw, 66px);
          height: clamp(30px, 7.3cqw, 66px);
        }

        .slf-windows-icon {
          width: clamp(24px, 5.21cqw, 48px);
          height: clamp(24px, 5.21cqw, 48px);
          display: block;
        }

        .slf-globe-pill {
          top: 66.6%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(32px, 6.95cqw, 64px);
          height: clamp(32px, 6.95cqw, 64px);
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          box-shadow: 0 0 0 clamp(3px, .65cqw, 6px) rgba(59, 130, 246, 0.12), 0 clamp(8px, 1.74cqw, 16px) clamp(16px, 3.47cqw, 32px) rgba(59, 130, 246, 0.25);
          color: white;
          animation: slfFloatCenter 5s ease-in-out infinite;
          z-index: 5;
        }

        .slf-internet-icon {
          width: clamp(18px, 3.69cqw, 34px);
          height: clamp(18px, 3.69cqw, 34px);
          opacity: 0.95;
        }

        .slf-phone,
        .slf-phone-android {
          top: 56.75%;
          width: clamp(96px, 27.2cqw, 260px);
          height: clamp(100px, 27.8cqw, 266px);
          transform: translateX(-50%);
          border-radius: clamp(13px, 3.47cqw, 32px) clamp(13px, 3.47cqw, 32px) 0 0;
          background: #fff;
          border: clamp(2px, .43cqw, 4px) solid #e5e7eb;
          border-bottom: none;
          box-shadow: 0 clamp(10px, 2.6cqw, 24px) clamp(24px, 5.97cqw, 55px) rgba(15, 23, 42, .18);
          overflow: hidden;
          animation: slfPhoneEnter 900ms cubic-bezier(.2,.9,.2,1) both;
          display: flex;
          flex-direction: column;
        }

        .slf-phone { left: 27.77%; }
        .slf-phone-android { left: 72.22%; }

        .slf-phone::after,
        .slf-phone-android::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 33%;
          background: linear-gradient(180deg, rgba(255,255,255,0), #ffffff 92%);
          pointer-events: none;
          z-index: 10;
        }

        .slf-phone-status {
          height: clamp(10px, 2.6cqw, 24px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: clamp(3px, .76cqw, 7px) clamp(7px, 1.63cqw, 15px) 0;
          font-size: clamp(4.8px, .98cqw, 9px);
          font-weight: 700;
          color: #111827;
          flex-shrink: 0;
        }

        .slf-ios-back {
          display: flex;
          align-items: center;
          gap: clamp(2px, .43cqw, 4px);
          padding: clamp(2px, .65cqw, 6px) clamp(7px, 1.52cqw, 14px) clamp(1px, .21cqw, 2px);
          color: #0a84ff;
          font-size: clamp(5px, 1.19cqw, 11px);
          font-weight: 500;
        }

        .slf-ios-back svg {
          width: clamp(5px, .98cqw, 9px);
          height: clamp(5px, .98cqw, 9px);
        }

        .slf-app-store-content {
          padding: clamp(5px, 1.73cqw, 16px) clamp(6px, 1.52cqw, 14px) clamp(8px, 1.95cqw, 18px);
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 1.3cqw, 12px);
        }

        .slf-app-hero {
          display: grid;
          grid-template-columns: clamp(30px, 7.17cqw, 66px) minmax(0, 1fr);
          gap: clamp(5px, 1.3cqw, 12px);
          align-items: start;
        }

        .slf-app-hero > div:last-child,
        .slf-play-info {
          min-width: 0;
          text-align: left;
        }

        .slf-app-icon-placeholder {
          width: clamp(30px, 7.17cqw, 66px);
          height: clamp(30px, 7.17cqw, 66px);
          border-radius: clamp(8px, 1.73cqw, 16px);
          background: linear-gradient(135deg, #2ea7ff, #8b5cf6 60%, #ec4899);
          display: grid;
          place-items: center;
          color: white;
          box-shadow: 0 4px 12px rgba(46, 167, 255, 0.2);
          flex-shrink: 0;
        }

        .slf-app-icon-placeholder svg {
          width: clamp(17px, 3.26cqw, 30px);
          height: clamp(17px, 3.26cqw, 30px);
        }

        .slf-app-title,
        .slf-play-title {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: clamp(5.9px, 1.26cqw, 13px);
          font-weight: 800;
          color: #111827;
          line-height: 1.08;
          letter-spacing: -.03em;
        }

        .slf-app-title { margin-top: clamp(1px, .21cqw, 2px); }

        .slf-app-dev,
        .slf-play-dev {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
          font-size: clamp(4.9px, 1.05cqw, 10px);
          margin-top: clamp(1px, .43cqw, 4px);
          line-height: 1.2;
        }

        .slf-app-dev { color: #8b8f98; }
        .slf-play-dev { color: #00875f; font-weight: 600; }

        .slf-app-actions {
          display: flex;
          align-items: center;
          gap: clamp(3px, .87cqw, 8px);
          margin-top: clamp(3px, .87cqw, 8px);
        }

        .slf-get-button {
          background: #0a84ff;
          color: white;
          font-weight: 800;
          font-size: clamp(5.5px, 1.19cqw, 11px);
          padding: clamp(2px, .54cqw, 5px) clamp(8px, 1.63cqw, 15px) clamp(2px, .6cqw, 5.5px);
          border-radius: 99px;
          letter-spacing: -.01em;
        }

        .slf-share-icon {
          margin-left: auto;
          color: #0a84ff;
          width: clamp(9px, 1.95cqw, 18px);
          height: clamp(9px, 1.95cqw, 18px);
        }

        .slf-ios-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-top: 1px solid #eceef2;
          border-bottom: 1px solid #eceef2;
          padding: clamp(3px, .76cqw, 7px) 0 clamp(3px, .65cqw, 6px);
        }

        .slf-ios-metric {
          min-width: 0;
          text-align: center;
          padding: 0 clamp(2px, .65cqw, 6px);
          border-right: 1px solid #eceef2;
        }

        .slf-ios-metric:last-child { border-right: none; }

        .slf-ios-label {
          font-size: clamp(3.6px, .78cqw, 7.2px);
          color: #a1a1aa;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -.01em;
          white-space: nowrap;
        }

        .slf-ios-value {
          color: #7c7f87;
          font-size: clamp(8px, 1.84cqw, 17px);
          line-height: 1.05;
          font-weight: 800;
          margin-top: clamp(1px, .32cqw, 3px);
        }

        .slf-ios-stars {
          color: #8f939b;
          font-size: clamp(5px, 1.08cqw, 10px);
          letter-spacing: clamp(-1.4px, -.15cqw, -0.7px);
          white-space: nowrap;
        }

        .slf-ios-small {
          color: #8f939b;
          font-size: clamp(4.8px, .98cqw, 9px);
          font-weight: 700;
          line-height: 1.05;
          margin-top: clamp(1px, .21cqw, 2px);
        }

        .slf-phone-status-android {
          height: clamp(13px, 3.26cqw, 30px);
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: clamp(3px, .87cqw, 8px) clamp(7px, 1.73cqw, 16px) 0;
          font-size: clamp(5px, 1.08cqw, 10px);
          font-weight: 500;
          color: #111827;
          gap: clamp(3px, .65cqw, 6px);
          flex-shrink: 0;
        }

        .slf-phone-status-android svg {
          width: clamp(7px, 1.52cqw, 14px);
          height: clamp(7px, 1.52cqw, 14px);
        }

        .slf-play-store-content {
          padding: clamp(6px, 1.73cqw, 16px);
          display: flex;
          flex-direction: column;
          gap: clamp(3px, .76cqw, 7px);
        }

        .slf-play-header {
          display: flex;
          gap: clamp(5px, 1.3cqw, 12px);
          align-items: flex-start;
        }

        .slf-play-info {
          display: flex;
          flex: 1 1 auto;
          min-width: 0;
          flex-direction: column;
          align-items: flex-start;
        }

        .slf-play-icon-placeholder {
          width: clamp(30px, 6.52cqw, 60px);
          height: clamp(30px, 6.52cqw, 60px);
          border-radius: clamp(8px, 1.52cqw, 14px);
          background: linear-gradient(135deg, #49c96f, #06b6d4);
          display: grid;
          place-items: center;
          color: white;
          box-shadow: 0 4px 12px rgba(73, 201, 111, 0.2);
          flex-shrink: 0;
        }

        .slf-play-icon-placeholder svg {
          width: clamp(16px, 3.04cqw, 28px);
          height: clamp(16px, 3.04cqw, 28px);
        }

        .slf-play-stats-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(3px, 1.08cqw, 10px);
          margin-top: clamp(4px, .87cqw, 8px);
          margin-bottom: clamp(5px, 1.3cqw, 12px);
          width: 100%;
          text-align: center;
        }

        .slf-play-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: clamp(20px, 5.21cqw, 48px);
        }

        .slf-play-stat-value {
          font-weight: 700;
          color: #374151;
          font-size: clamp(6px, 1.35cqw, 12.5px);
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .slf-play-star {
          font-size: clamp(6px, 1.19cqw, 11px);
          color: #fbbf24;
          margin-left: clamp(1px, .32cqw, 3px);
        }

        .slf-play-stat-label {
          font-size: clamp(4px, .82cqw, 7.5px);
          color: #9ca3af;
          margin-top: clamp(1px, .21cqw, 2px);
          white-space: nowrap;
          text-align: center;
        }

        .slf-play-stat-divider {
          width: 1px;
          height: clamp(9px, 1.95cqw, 18px);
          background: #e5e7eb;
        }

        .slf-install-button {
          width: 100%;
          background: #00875f;
          color: white;
          font-weight: 600;
          font-size: clamp(7px, 1.52cqw, 14px);
          padding: clamp(3px, .87cqw, 8px) 0;
          border-radius: clamp(5px, .87cqw, 8px);
          text-align: center;
          letter-spacing: 0.01em;
          margin-bottom: clamp(6px, 1.52cqw, 14px);
        }

        .slf-app-banner {
          height: clamp(34px, 8.69cqw, 80px);
          background: #f3f4f6;
          border-radius: clamp(7px, 1.3cqw, 12px);
          overflow: hidden;
          position: relative;
          background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
          background-size: clamp(4px, .87cqw, 8px) clamp(4px, .87cqw, 8px);
        }

        @keyframes slfFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }

        @keyframes slfFloatCenter {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }

        @keyframes slfFloatLeft {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(5px); }
        }

        @keyframes slfFloatRight {
          0%, 100% { transform: translateX(-50%) translateY(4px); }
          50% { transform: translateX(-50%) translateY(-4px); }
        }

        @keyframes slfFloatWindows {
          0%, 100% { transform: translateX(-50%) translateY(2px); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }

        @keyframes slfPhoneEnter {
          from { opacity: 0; transform: translateX(-50%) translateY(24px) scale(.98); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>

      <div className="slf-frame">
        <svg
          className="slf-lines"
          viewBox="0 0 900 585"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="slf-line" d={topLeftPath} />
          <path className="slf-line" d={topCenterPath} />
          <path className="slf-line" d={topRightPath} />
          <path className="slf-line" d={leftDownPath} />
          <path className="slf-line" d={centerDownPath} />
          <path className="slf-line" d={rightDownPath} />
        </svg>

        <svg
          className="slf-particles-svg"
          viewBox="0 0 900 585"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className="slf-particle blue">
            <line x1="-20" y1="0" x2="-8" y2="0" className="trail-far" />
            <line x1="-12" y1="0" x2="-4" y2="0" className="trail-near" />
            <circle cx="0" cy="0" r="5.8" className="head" />
            <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto" path={particleLeftPath} />
          </g>

          <g className="slf-particle black">
            <line x1="-18" y1="0" x2="-7" y2="0" className="trail-far" />
            <line x1="-11" y1="0" x2="-3" y2="0" className="trail-near" />
            <circle cx="0" cy="0" r="5.4" className="head" />
            <animateMotion dur="3s" begin=".6s" repeatCount="indefinite" rotate="auto" path={particleCenterPath} />
          </g>

          <g className="slf-particle green">
            <line x1="-20" y1="0" x2="-8" y2="0" className="trail-far" />
            <line x1="-12" y1="0" x2="-4" y2="0" className="trail-near" />
            <circle cx="0" cy="0" r="5.8" className="head" />
            <animateMotion dur="3.5s" begin="1.2s" repeatCount="indefinite" rotate="auto" path={particleRightPath} />
          </g>
        </svg>

        <div className="slf-link-pill">
          <div className="slf-mini-logo">
            <img src={appIconUrl} alt="Icono de la app" />
          </div>
          <div className="slf-link-text">{t("landing.previewUrl", "link-my.app/descargar-app")}</div>
        </div>

        <div className="slf-store-card left" aria-label="App Store">
          <img className="slf-store-image app" src={appStoreLogo} alt="App Store" />
        </div>

        <div className="slf-windows-card" aria-label="Otros dispositivos">
          <svg className="slf-windows-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#00A4EF" d="M3 5.2 10.8 4v7.4H3V5.2Z" />
            <path fill="#7FBA00" d="M12 3.8 21 2.5v8.9h-9V3.8Z" />
            <path fill="#F25022" d="M3 12.6h7.8V20L3 18.8v-6.2Z" />
            <path fill="#FFB900" d="M12 12.6h9v8.9L12 20.2v-7.6Z" />
          </svg>
        </div>

        <div className="slf-store-card right" aria-label="Google Play">
          <img className="slf-store-image play" src={playStoreLogo} alt="Google Play" />
        </div>

        <div className="slf-globe-pill" aria-label="Internet">
          <svg className="slf-internet-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>

        <div className="slf-phone" aria-hidden="true">
          <div className="slf-phone-status">
            <span>9:41</span>
            <span>••• 100</span>
          </div>

          <div className="slf-ios-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Buscar
          </div>

          <div className="slf-app-store-content">
            <div className="slf-app-hero">
              <div className="slf-app-icon-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <path d="M8 16 12 7l4 9" />
                  <path d="M9.5 13h5" />
                </svg>
              </div>

              <div>
                <div className="slf-app-title">{t("landing.mockupIosTitle", "Tu App en App Store")}</div>
                <div className="slf-app-dev">SkeilApps Agency</div>
                <div className="slf-app-actions">
                  <div className="slf-get-button">{t("landing.mockupIosGet", "Obtener")}</div>
                  <svg className="slf-share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v12" />
                    <path d="m7 8 5-5 5 5" />
                    <path d="M5 12v7h14v-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="slf-ios-metrics">
              <div className="slf-ios-metric">
                <div className="slf-ios-label">{t("landing.mockupIosRating", "496 MIL VALOR.")}</div>
                <div className="slf-ios-value">4,7</div>
                <div className="slf-ios-stars">★★★★★</div>
              </div>

              <div className="slf-ios-metric">
                <div className="slf-ios-label">{t("landing.mockupDownloads", "DESCARGAS")}</div>
                <div className="slf-ios-value">10K+</div>
                <div className="slf-ios-small">Apps</div>
              </div>

              <div className="slf-ios-metric">
                <div className="slf-ios-label">{t("landing.mockupIosAge", "EDAD")}</div>
                <div className="slf-ios-value">9+</div>
                <div className="slf-ios-small">{t("landing.mockupIosYears", "años")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="slf-phone-android" aria-hidden="true">
          <div className="slf-phone-status-android">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.73 0 1.33-.6 1.33-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
            <span>10:00</span>
          </div>

          <div className="slf-play-store-content">
            <div className="slf-play-header">
              <div className="slf-play-icon-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>

              <div className="slf-play-info">
                <div className="slf-play-title">{t("landing.mockupAndroidTitle", "Tu App en Google Play")}</div>
                <div className="slf-play-dev">SkeilApps Agency</div>
              </div>
            </div>

            <div className="slf-play-stats-container">
              <div className="slf-play-stat-item">
                <span className="slf-play-stat-value">
                  4.8
                  <span className="slf-play-star">★</span>
                </span>
                <span className="slf-play-stat-label">{t("landing.mockupAndroidRating", "Valoración")}</span>
              </div>

              <div className="slf-play-stat-divider"></div>

              <div className="slf-play-stat-item">
                <span className="slf-play-stat-value">10+</span>
                <span className="slf-play-stat-label">{t("landing.mockupDownloads", "Descargas")}</span>
              </div>

              <div className="slf-play-stat-divider"></div>

              <div className="slf-play-stat-item">
                <span className="slf-play-stat-value">PEGI 3</span>
                <span className="slf-play-stat-label">{t("landing.mockupIosAge", "Edad")}</span>
              </div>
            </div>

            <div className="slf-install-button">{t("landing.mockupAndroidInstall", "Instalar")}</div>
            <div className="slf-app-banner"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const animationStyles = `
  @keyframes cursor-click-ig {
    0% { transform: translate(40px, 80px); opacity: 0; }
    10% { opacity: 1; transform: translate(20px, 40px); }
    30% { transform: translate(0, 0); }
    40% { transform: translate(0, 0) scale(0.85); }
    45% { transform: translate(0, 0) scale(1); }
    60% { transform: translate(0, 0); opacity: 1; }
    80% { transform: translate(20px, 40px); opacity: 0; }
    100% { opacity: 0; transform: translate(40px, 80px); }
  }

  @keyframes link-interaction {
    0%, 35% { background-color: #e0f2fe; transform: scale(1); box-shadow: 0 0 0 rgba(2, 132, 199, 0); }
    40% { background-color: #bae6fd; transform: scale(0.96); box-shadow: 0 0 15px rgba(2, 132, 199, 0.3); }
    45%, 100% { background-color: #e0f2fe; transform: scale(1); box-shadow: 0 0 0 rgba(2, 132, 199, 0); }
  }

  @keyframes ripple-click {
    0%, 39% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
    40% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    55% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes scan-line {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  @keyframes code-scroll {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  }

  @keyframes radar-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes brackets-pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 20px rgba(52, 211, 153, 0.4); }
  }

  @keyframes extract-data-left {
    0%, 15% { opacity: 0; transform: translate(20px, 0) scale(0.8); }
    20%, 45% { opacity: 1; transform: translate(0, 0) scale(1); }
    50%, 100% { opacity: 0; transform: translate(0, -10px) scale(0.9); }
  }

  @keyframes extract-data-right {
    0%, 50%, 65% { opacity: 0; transform: translate(-20px, 0) scale(0.8); }
    70%, 95% { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; transform: translate(0, -10px) scale(0.9); }
  }

  @keyframes flowing-dash-ios { to { stroke-dashoffset: -30; } }
  @keyframes flowing-dash-and { to { stroke-dashoffset: -30; } }

  @keyframes pulse-opacity {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  @keyframes pop-store-ios {
    0%, 45%, 55%, 100% { transform: scale(1); box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
    50% { transform: scale(1.15); box-shadow: 0 15px 35px rgba(59, 130, 246, 0.25); }
  }

  @keyframes flash-border-ios {
    0%, 45%, 60%, 100% { opacity: 0; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  @keyframes pop-store-and {
    0%, 45%, 55%, 100% { transform: scale(1); box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
    50% { transform: scale(1.15); box-shadow: 0 15px 35px rgba(16, 185, 129, 0.25); }
  }

  @keyframes flash-border-and {
    0%, 45%, 60%, 100% { opacity: 0; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
`;

export const SimulationStep1 = () => (
  <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[#f8f9fa] flex items-center justify-center p-4 border border-black/5">
    <div className="relative w-full max-w-[210px] h-full rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-50">
        <div className="text-[10px] font-black text-slate-800 flex items-center gap-1">
          skeilapps <span className="text-[6px]">▼</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <div className="w-3 h-[2px] bg-slate-800 rounded-full"></div>
          <div className="w-3 h-[2px] bg-slate-800 rounded-full"></div>
          <div className="w-3 h-[2px] bg-slate-800 rounded-full"></div>
        </div>
      </div>
      
      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="w-12 h-12 shrink-0 rounded-full bg-black p-[2px] border-2 border-red-500">
          <img src="https://skeilapps.com/wp-content/uploads/2025/12/icono-SkeilEcom.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="flex gap-3 text-center">
          <div className="flex flex-col items-center"><span className="text-[11px] font-black leading-none text-slate-800">142</span><span className="text-[6px] font-semibold text-slate-500 mt-0.5">Posts</span></div>
          <div className="flex flex-col items-center"><span className="text-[11px] font-black leading-none text-slate-800">12K</span><span className="text-[6px] font-semibold text-slate-500 mt-0.5">Followers</span></div>
          <div className="flex flex-col items-center"><span className="text-[11px] font-black leading-none text-slate-800">240</span><span className="text-[6px] font-semibold text-slate-500 mt-0.5">Following</span></div>
        </div>
      </div>

      <div className="px-4 pt-2 pb-2 relative z-10 text-[8px] leading-[1.3] text-slate-700">
        <div className="font-black text-slate-900 text-[9px] mb-0.5">SkeilApps Agency</div>
        <div className="text-slate-400 mb-0.5">Software Company</div>
        <div>Creando links de descarga para apps 🚀</div>
        <div>Descarga nuestra app abajo 👇</div>

        <div className="relative inline-block mt-1">
          <div 
            className="relative z-10 flex items-center gap-1 rounded-md bg-[#e0f2fe] px-2 py-1 text-[8px] font-bold text-[#0284c7] transition-all"
            style={{ animation: "link-interaction 4s infinite" }}
          >
            <Link2 size={8} className="text-[#0284c7]" />
            <span>link-my.app/app</span>
          </div>
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#7dd3fc] rounded-md mix-blend-multiply opacity-0 pointer-events-none z-20"
            style={{ animation: "ripple-click 4s infinite" }}
          ></div>
          <div 
            className="absolute z-30 text-slate-800 drop-shadow-xl pointer-events-none"
            style={{ 
              top: "50%", left: "50%",
              marginTop: "-2px",
              animation: "cursor-click-ig 4s cubic-bezier(0.4, 0, 0.2, 1) infinite" 
            }}
          >
            <MousePointer2 size={16} className="fill-black stroke-white stroke-[2]" />
          </div>
        </div>
      </div>

      <div className="flex justify-around border-t border-slate-100 py-1.5 mt-auto">
         <div className="w-3.5 h-3.5 grid grid-cols-3 gap-[1px]">
           <div className="bg-slate-800"></div><div className="bg-slate-800"></div><div className="bg-slate-800"></div>
           <div className="bg-slate-800"></div><div className="bg-slate-800"></div><div className="bg-slate-800"></div>
           <div className="bg-slate-800"></div><div className="bg-slate-800"></div><div className="bg-slate-800"></div>
         </div>
         <div className="w-3.5 h-3.5 border-[1.5px] border-slate-300 rounded-[3px]"></div>
      </div>

      <div className="grid grid-cols-3 gap-[1px] bg-slate-100 flex-1">
        <div className="w-full h-full bg-slate-200"></div>
        <div className="w-full h-full bg-slate-200"></div>
        <div className="w-full h-full bg-slate-200"></div>
      </div>
    </div>
  </div>
);

export const SimulationStep2 = () => (
  <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[#090b10] flex items-center justify-center p-4 border border-black/5">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
    <div className="absolute top-2 left-2 right-2 opacity-30 font-mono text-[8px] text-emerald-500 overflow-hidden leading-relaxed whitespace-nowrap" style={{ animation: "code-scroll 12s linear infinite" }}>
      &gt; CONNECT 192.168.1.1:443<br/>
      &gt; GET /api/v1/detect HTTP/2.0<br/>
      &gt; Accept: text/html,application/xhtml+xml<br/>
      &gt; User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)<br/>
      &gt; Parsing User-Agent String...<br/>
      &gt; Match Found: Mobile Device<br/>
      &gt; System: iOS
    </div>

    <div className="absolute w-32 h-32 rounded-full border border-emerald-500/20 flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full border-t border-emerald-400/50" style={{ animation: "radar-spin 3s linear infinite" }}></div>
      <div className="absolute w-24 h-24 rounded-full border border-emerald-500/10"></div>
    </div>

    <div 
      className="relative z-10 w-16 h-20 bg-slate-900/80 backdrop-blur-md flex items-center justify-center rounded-xl border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
      style={{ animation: "brackets-pulse 2s infinite" }}
    >
      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-emerald-400 rounded-tl-[2px]"></div>
      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-emerald-400 rounded-tr-[2px]"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-emerald-400 rounded-bl-[2px]"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-emerald-400 rounded-br-[2px]"></div>
      <Smartphone size={24} className="text-emerald-300" strokeWidth={1.5} />
      <div className="absolute inset-x-1 h-[1px] bg-emerald-400/80 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" style={{ animation: "scan-line 2s ease-in-out infinite" }}></div>
    </div>

    <div className="absolute inset-0 z-20 pointer-events-none">
      <div 
        className="absolute top-[28%] left-[6%] bg-[#1a1e27] border border-slate-700/60 px-2.5 py-1.5 rounded-lg flex items-center gap-2 shadow-2xl"
        style={{ animation: "extract-data-left 6s infinite" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]"></div>
        <div className="flex flex-col">
          <span className="text-[6px] text-slate-400 font-mono uppercase tracking-wider mb-[1px]">Match Header</span>
          <span className="text-[9px] font-black text-white leading-none">Apple iOS 16.0</span>
        </div>
      </div>

      <div 
        className="absolute bottom-[28%] right-[6%] bg-[#1a1e27] border border-slate-700/60 px-2.5 py-1.5 rounded-lg flex items-center gap-2 shadow-2xl"
        style={{ animation: "extract-data-right 6s infinite" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.8)]"></div>
        <div className="flex flex-col text-left">
          <span className="text-[6px] text-slate-400 font-mono uppercase tracking-wider mb-[1px]">Match Header</span>
          <span className="text-[9px] font-black text-white leading-none">Android 13.0</span>
        </div>
      </div>
    </div>
  </div>
);

export const SimulationStep3 = () => (
  <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[#f8f9fa] flex items-center justify-center p-4 border border-black/5">
    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
    
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 224" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad-ios" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="grad-and" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="glow-ios">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-and">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <path d="M200,0 L200,112 C200,154 92,144 92,176" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
      <path d="M200,0 L200,112 C200,154 252,144 252,176" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />

      <path d="M200,0 L200,112 C200,154 92,144 92,176" fill="none" stroke="url(#grad-ios)" strokeWidth="4" strokeLinecap="round" strokeDasharray="15 15" filter="url(#glow-ios)" style={{ animation: "flowing-dash-ios 1s linear infinite" }} />
      <path d="M200,0 L200,112 C200,154 252,144 252,176" fill="none" stroke="url(#grad-and)" strokeWidth="4" strokeLinecap="round" strokeDasharray="15 15" filter="url(#glow-and)" style={{ animation: "flowing-dash-and 1s linear infinite" }} />
    </svg>

    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full border border-slate-200 border-t-slate-800" style={{ animation: "radar-spin 4s linear infinite" }}></div>
        <div className="absolute w-24 h-24 rounded-full border border-slate-100 border-b-slate-400" style={{ animation: "radar-spin 6s linear infinite reverse" }}></div>
        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-slate-200 flex items-center justify-center relative z-10">
          <Link2 size={24} className="text-black" />
        </div>
        <div className="absolute -right-14 top-0 bg-black text-white text-[7px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg" style={{ animation: "pulse-opacity 2s infinite" }}>
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> 0.2ms
        </div>
        <div className="absolute -left-16 bottom-0 bg-slate-800 text-white text-[7px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg" style={{ animation: "pulse-opacity 2s infinite 1s" }}>
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> ROUTING
        </div>
      </div>
    </div>

    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md border border-slate-200 flex items-center justify-center z-20">
      <Smartphone size={18} className="text-slate-800" />
    </div>

    <div 
      className="absolute bottom-5 left-[22%] -translate-x-1/2 grid h-16 w-16 place-items-center rounded-[18px] border border-slate-100 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] z-10 transition-all"
      style={{ animation: "pop-store-ios 4s infinite" }}
    >
      <img src="https://skeilapps.com/wp-content/uploads/2026/05/ChatGPT-Image-19-may-2026-18_09_01-Photoroom.png" alt="App Store" className="block h-10 w-10 object-contain drop-shadow-sm" />
      <div className="absolute inset-0 rounded-[18px] border-2 border-blue-400 opacity-0" style={{ animation: "flash-border-ios 4s infinite" }}></div>
    </div>

    <div 
      className="absolute bottom-5 left-[63%] -translate-x-1/2 grid h-16 w-16 place-items-center rounded-[18px] border border-slate-100 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] z-10 transition-all"
      style={{ animation: "pop-store-and 4s infinite 2s" }}
    >
      <img src="https://skeilapps.com/wp-content/uploads/2025/12/play-store.webp" alt="Google Play" className="block h-10 w-10 object-contain drop-shadow-sm" />
      <div className="absolute inset-0 rounded-[18px] border-2 border-green-400 opacity-0" style={{ animation: "flash-border-and 4s infinite 2s" }}></div>
    </div>
  </div>
);

export function ModernSimulationsSection() {
  const { t } = useTranslation();

  return (
    <section id="que-hacemos" className="w-full bg-white text-black py-20 font-sans" style={{ fontFamily: "'Satoshi', sans-serif" }}>
      <style>{animationStyles}</style>
      
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center flex flex-col items-center overflow-visible">
          <h2 className="mx-auto w-full max-w-[760px] text-center text-[clamp(34px,9vw,60px)] font-black leading-[0.95] tracking-[-0.055em] text-black md:whitespace-nowrap">
            {t("simulations.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            {t("simulations.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="group relative rounded-[32px] border border-black/[0.06] bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <SimulationStep1 />
            <div className="p-7 flex flex-col items-start text-left">
              <div className="mb-3 flex items-center justify-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white font-black text-xs">
                  1
                </div>
                <h3 className="text-xl font-black tracking-tight text-black">{t("simulations.step1Title")}</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-black/60">
                {t("simulations.step1Text")}
              </p>
            </div>
          </div>

          <div className="group relative rounded-[32px] border border-black/[0.06] bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <SimulationStep2 />
            <div className="p-7 flex flex-col items-start text-left">
              <div className="mb-3 flex items-center justify-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white font-black text-xs">
                  2
                </div>
                <h3 className="text-xl font-black tracking-tight text-black">{t("simulations.step2Title")}</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-black/60">
                {t("simulations.step2Text")}
              </p>
            </div>
          </div>

          <div className="group relative rounded-[32px] border border-black/[0.06] bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <SimulationStep3 />
            <div className="p-7 flex flex-col items-start text-left">
              <div className="mb-3 flex items-center justify-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white font-black text-xs shadow-md">
                  3
                </div>
                <h3 className="text-xl font-black tracking-tight text-black">{t("simulations.step3Title")}</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-black/60">
                {t("simulations.step3Text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const freeFeatures = [
  "1 smart link activo",
  "1 código QR automático",
];

const proFeatures = [
  "Smart links ilimitados",
  "QR ilimitados para carteles y campañas",
  "Estadísticas completas de clics",
  "Clics separados por iPhone, Android y ordenador",
  "Campañas por ubicación: Instagram, web, QR, email o tienda física",
  "Historial completo de clics",
  "Panel para gestionar todas tus apps",
  "Enlaces personalizados y editables",
];

function FeatureList({ items, dark = false }) {
  return (
    <ul className="mt-7 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm font-medium leading-6">
          <span
            className={`mt-0.5 shrink-0 text-[18px] font-black leading-none ${
              dark ? "text-white" : "text-black"
            }`}
          >
            ✓
          </span>
          <span className={dark ? "text-white/76" : "text-black/58"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FinalFooter({ theme = "light" }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const currentLanguage = normalizeLanguage(i18n.language);

  function changeLanguage(nextLanguage) {
    const normalizedLanguage = normalizeLanguage(nextLanguage);
    setUserChosenLanguage(normalizedLanguage);
    i18n.changeLanguage(normalizedLanguage);
    navigate(switchLanguagePath(`${location.pathname}${location.search}`, normalizedLanguage), {
      replace: true,
    });
  }
  
  return (
    <section className={`relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden ${isDark ? 'bg-[#000000]' : 'bg-white'}`}>
      <style>{`
        .footer-curve-notch {
          position: absolute;
          left: 50%;
          top: -1px;
          width: min(680px, 48vw);
          height: 82px;
          transform: translateX(-50%);
          z-index: 3;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .footer-curve-notch {
            width: min(420px, 70vw);
            height: 64px;
          }
        }
      `}</style>

      {!isDark && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
      )}

      <div className="relative h-20 md:h-24" />

      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_115%,rgba(64,64,64,0.45),transparent_34%),linear-gradient(120deg,#0d1020_0%,#111113_48%,#181612_100%)] px-5 pt-24 pb-8 text-white md:px-8 md:pt-28">
        <svg
          className="footer-curve-notch"
          viewBox="0 0 680 82"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 0 H156 C198 0 198 55 248 55 H432 C482 55 482 0 524 0 H680 V0 H0 Z"
            fill={isDark ? "#000000" : "white"}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.06em] md:whitespace-nowrap md:text-[52px]">
            {t("footer.ctaTitle")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-white/58 md:text-lg">
            {t("footer.ctaSubtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={localizePath("/#crear", currentLanguage)} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-black text-black shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5">
              {t("footer.btnCreate")}
              <ArrowRight size={16} />
            </a>
            <a href={localizePath("/login", currentLanguage)} className="flex h-12 items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-6 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white">
              {t("footer.btnAccess")}
            </a>
          </div>
        </div>

        <footer className="relative mx-auto mt-20 flex w-full max-w-[1320px] flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="h-9 w-9 object-contain" />
              <span className="text-lg font-black tracking-tight">LINK MY APP</span>
            </div>
            <div className="mt-3 text-center md:text-left">
              <p className="max-w-md text-sm font-medium leading-6 text-white/45">
                {t("footer.brandSubtitle")}
              </p>
              <div className="mt-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">Nuestras Webs</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <a href="https://skeilapps.com/" target="_blank" rel="noopener" className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-bold text-white/62 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">SkeilApps</a>
                  <a href="https://tienrank.com/" target="_blank" rel="noopener" className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-bold text-white/62 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">TienRank</a>
                  <a href="https://tuback.link/" target="_blank" rel="noopener" className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-bold text-white/62 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">TuBack.link</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/62">
              {t("language.label")}
              <select
                value={currentLanguage}
                onChange={(event) => changeLanguage(event.target.value)}
                className="bg-transparent text-sm font-black text-white outline-none"
              >
                {languageOptions.map((language) => (
                  <option key={language.code} value={language.code} className="text-black">
                    {language.label}
                  </option>
                ))}
              </select>
            </label>
            <FooterLink icon={Cookie} label={t("footer.cookies")} href={localizePath("/cookies", currentLanguage)} />
            <FooterLink icon={FileText} label={t("footer.terms")} href={localizePath("/terms", currentLanguage)} />
            <FooterLink icon={ShieldCheck} label={t("footer.privacy")} href={localizePath("/privacy", currentLanguage)} />
            <FooterLink icon={Folder} label={t("footer.blog")} href={localizePath("/blog", currentLanguage)} />
          </div>
        </footer>
      </div>
    </section>
  );
}

function FooterLink({ icon: Icon, label, href }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/62 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
    >
      <Icon size={15} className="text-white/35 transition group-hover:text-white/70" />
      {label}
    </a>
  );
}
