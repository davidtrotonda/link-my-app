import React from "react";
import { Link } from "react-router-dom";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { weeklyBlogManifest } from "./lib/weeklyBlogManifest.js";

/**
 * Add one purpose-built animated cover per weekly slug. Covers must be
 * code-native React/CSS scenes; see content-workflow/blog-animation-standard.md.
 */
function AsoOptimizationCover() {
  return (
    <div
      className="asog-cover relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_20%_10%,#dbeafe_0,transparent_35%),linear-gradient(145deg,#f8fafc_0%,#eef2ff_52%,#ecfeff_100%)]"
      aria-hidden="true"
    >
      <style>{`
        @keyframes asogSearch {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          45% { transform: translate(-50%, 4px) scale(1.025); }
        }
        @keyframes asogRoute {
          0% { stroke-dashoffset: 210; opacity: .18; }
          42%, 76% { stroke-dashoffset: 0; opacity: .95; }
          100% { stroke-dashoffset: -210; opacity: .22; }
        }
        @keyframes asogCard {
          0%, 100% { transform: translateY(5px) scale(.985); }
          48%, 70% { transform: translateY(0) scale(1); }
        }
        @keyframes asogChip {
          0%, 20%, 100% { transform: translateY(5px); opacity: .45; }
          42%, 72% { transform: translateY(0); opacity: 1; }
        }
        @keyframes asogBar {
          0%, 18% { transform: scaleY(.3); opacity: .35; }
          55%, 100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes asogPulse {
          0%, 100% { transform: scale(.72); opacity: .3; }
          48% { transform: scale(1.12); opacity: .9; }
        }
      `}</style>

      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] [background-size:26px_26px]" />

      <div
        className="absolute left-1/2 top-[7%] z-30 flex h-[15%] min-h-9 w-[58%] -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-[5%] shadow-[0_14px_35px_rgba(15,23,42,0.12)]"
        style={{ animation: "asogSearch 4.8s ease-in-out infinite" }}
      >
        <span className="grid aspect-square h-[54%] place-items-center rounded-full bg-slate-950">
          <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none">
            <circle cx="10.5" cy="10.5" r="5.2" stroke="white" strokeWidth="2" />
            <path d="m14.4 14.4 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[clamp(8px,2.2vw,13px)] font-black tracking-[0.2em] text-slate-950">ASO</span>
        <span className="ml-auto h-1.5 w-[28%] rounded-full bg-indigo-100" />
      </div>

      <svg className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 320 250" fill="none" preserveAspectRatio="none">
        <path
          d="M160 53 C116 72 91 86 90 112 C90 145 115 167 155 180"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="210"
          style={{ animation: "asogRoute 5.2s ease-in-out infinite" }}
        />
        <path
          d="M160 53 C205 72 230 93 232 124 C234 153 222 173 207 188"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="210"
          style={{ animation: "asogRoute 5.2s ease-in-out .35s infinite" }}
        />
      </svg>

      <div className="absolute left-[6%] top-[27%] z-20 flex w-[22%] flex-col gap-2">
        {["A", "S", "O"].map((letter, index) => (
          <div
            key={letter}
            className="flex h-7 items-center gap-2 rounded-full border border-white/70 bg-white/90 px-2 shadow-sm"
            style={{ animation: `asogChip 4.6s ease-in-out ${index * 0.24}s infinite` }}
          >
            <span className={`h-3 w-3 rounded-full ${index === 0 ? "bg-indigo-500" : index === 1 ? "bg-cyan-400" : "bg-emerald-400"}`} />
            <span className="text-[8px] font-black text-slate-500">{letter}</span>
          </div>
        ))}
      </div>

      <div
        className="absolute left-[25%] top-[29%] z-20 h-[53%] w-[45%] rounded-[22px] border border-slate-200 bg-white p-[5%] shadow-[0_22px_55px_rgba(15,23,42,0.16)]"
        style={{ animation: "asogCard 4.8s ease-in-out .15s infinite" }}
      >
        <div className="flex h-[35%] items-center gap-[7%]">
          <div className="relative grid aspect-square h-full place-items-center rounded-[24%] bg-gradient-to-br from-indigo-600 to-cyan-400 text-[clamp(10px,3vw,18px)] font-black text-white">
            A
            <span
              className="absolute -right-[12%] -top-[12%] h-[32%] w-[32%] rounded-full bg-emerald-400 ring-4 ring-emerald-100"
              style={{ animation: "asogPulse 2.6s ease-in-out infinite" }}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-2.5 w-[74%] rounded-full bg-slate-900" />
            <div className="h-2 w-full rounded-full bg-slate-200" />
            <div className="h-2 w-[62%] rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="mt-[9%] grid h-[45%] grid-cols-3 gap-[5%]">
          {[0, 1, 2].map((index) => (
            <div key={index} className="overflow-hidden rounded-[20%] bg-slate-100 p-[16%]">
              <div className={`h-[42%] rounded-[20%] ${index === 0 ? "bg-indigo-200" : index === 1 ? "bg-cyan-200" : "bg-emerald-200"}`} />
              <div className="mt-[16%] h-1.5 rounded-full bg-white" />
              <div className="mt-[10%] h-1.5 w-[70%] rounded-full bg-white" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[5%] top-[32%] z-20 flex h-[42%] w-[20%] items-end gap-[9%] rounded-[20px] border border-slate-200 bg-white/92 px-[13%] pb-[15%] pt-[20%] shadow-[0_16px_40px_rgba(15,23,42,0.11)]">
        {[42, 66, 84, 100].map((height, index) => (
          <span
            key={height}
            className="block w-full origin-bottom rounded-full bg-gradient-to-t from-indigo-600 to-cyan-400"
            style={{
              height: `${height}%`,
              animation: `asogBar 3.8s ease-in-out ${index * 0.18}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-[5%] left-1/2 z-30 flex -translate-x-1/2 gap-2">
        <span className="rounded-full bg-slate-950 px-3 py-1 text-[8px] font-black tracking-wide text-white shadow-md">iOS</span>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[8px] font-black tracking-wide text-emerald-700 shadow-md">Play</span>
      </div>
    </div>
  );
}

function QrAppDownloadCover() {
  return (
    <div
      className="qrad-cover relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_18%_12%,#dcfce7_0,transparent_32%),radial-gradient(circle_at_84%_18%,#dbeafe_0,transparent_34%),linear-gradient(145deg,#f8fafc_0%,#ecfeff_54%,#f0fdf4_100%)]"
      aria-hidden="true"
    >
      <style>{`
        @keyframes qradScan {
          0%, 100% { transform: translateY(-38%); opacity: .22; }
          44%, 62% { transform: translateY(116%); opacity: .9; }
        }
        @keyframes qradRoute {
          0% { stroke-dashoffset: 260; opacity: .2; }
          42%, 72% { stroke-dashoffset: 0; opacity: .95; }
          100% { stroke-dashoffset: -260; opacity: .22; }
        }
        @keyframes qradPhone {
          0%, 100% { transform: translateY(4px) rotate(-1deg); }
          50% { transform: translateY(0) rotate(1deg); }
        }
        @keyframes qradStore {
          0%, 28%, 100% { transform: translateY(7px) scale(.96); opacity: .48; }
          50%, 76% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes qradDot {
          0%, 20%, 100% { transform: scale(.65); opacity: .35; }
          52% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes qradMetric {
          0%, 25% { transform: scaleX(.28); opacity: .35; }
          64%, 100% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="absolute left-[7%] top-[14%] z-20 grid aspect-square w-[34%] grid-cols-5 gap-[4%] rounded-[18%] border border-slate-200 bg-white p-[4%] shadow-[0_20px_45px_rgba(15,23,42,0.14)]">
        {[
          1, 1, 1, 0, 1,
          1, 0, 1, 0, 0,
          1, 1, 0, 1, 1,
          0, 0, 1, 0, 1,
          1, 1, 0, 1, 1,
        ].map((active, index) => (
          <span
            key={index}
            className={`${active ? "bg-slate-950" : "bg-emerald-100"} rounded-[30%]`}
          />
        ))}
        <span
          className="absolute left-[8%] right-[8%] top-[9%] h-[9%] rounded-full bg-emerald-400/70 blur-[1px]"
          style={{ animation: "qradScan 4.4s ease-in-out infinite" }}
        />
      </div>

      <svg className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 320 250" fill="none" preserveAspectRatio="none">
        <path
          d="M118 118 C156 92 180 92 205 122 C224 143 233 156 248 166"
          stroke="#0f766e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="260"
          style={{ animation: "qradRoute 5.1s ease-in-out infinite" }}
        />
        <path
          d="M116 130 C156 154 174 171 203 184 C222 193 239 198 257 202"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="260"
          style={{ animation: "qradRoute 5.1s ease-in-out .38s infinite" }}
        />
      </svg>

      <div
        className="absolute left-[43%] top-[18%] z-30 h-[48%] w-[22%] rounded-[22px] border border-slate-300 bg-slate-950 p-[2.2%] shadow-[0_24px_50px_rgba(15,23,42,0.24)]"
        style={{ animation: "qradPhone 4.8s ease-in-out infinite" }}
      >
        <div className="h-full rounded-[17px] bg-white p-[10%]">
          <div className="mx-auto mb-[16%] h-1.5 w-[34%] rounded-full bg-slate-300" />
          <div className="mx-auto grid aspect-square w-[48%] place-items-center rounded-[24%] bg-gradient-to-br from-emerald-500 to-cyan-500 text-[clamp(9px,2vw,14px)] font-black text-white">
            QR
          </div>
          <div className="mt-[16%] space-y-2">
            <div className="h-2 rounded-full bg-slate-900" />
            <div className="h-2 w-[74%] rounded-full bg-slate-200" />
            <div className="h-2 w-[56%] rounded-full bg-slate-200" />
          </div>
          <div className="mt-[18%] flex gap-[8%]">
            <span className="h-5 flex-1 rounded-full bg-slate-950" />
            <span className="h-5 flex-1 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>

      <div
        className="absolute right-[7%] top-[18%] z-20 flex h-[22%] w-[27%] items-center gap-[8%] rounded-2xl border border-blue-100 bg-white/95 p-[5%] shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
        style={{ animation: "qradStore 4.9s ease-in-out .2s infinite" }}
      >
        <span className="grid aspect-square h-[62%] place-items-center rounded-[26%] bg-slate-950 text-[clamp(8px,2vw,13px)] font-black text-white">iOS</span>
        <span className="min-w-0 flex-1 space-y-1.5">
          <span className="block h-2 w-full rounded-full bg-slate-900" />
          <span className="block h-2 w-[68%] rounded-full bg-blue-100" />
        </span>
      </div>

      <div
        className="absolute bottom-[16%] right-[7%] z-20 flex h-[22%] w-[27%] items-center gap-[8%] rounded-2xl border border-emerald-100 bg-white/95 p-[5%] shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
        style={{ animation: "qradStore 4.9s ease-in-out .55s infinite" }}
      >
        <span className="grid aspect-square h-[62%] place-items-center rounded-[26%] bg-emerald-500 text-[clamp(8px,2vw,13px)] font-black text-white">Play</span>
        <span className="min-w-0 flex-1 space-y-1.5">
          <span className="block h-2 w-full rounded-full bg-slate-900" />
          <span className="block h-2 w-[58%] rounded-full bg-emerald-100" />
        </span>
      </div>

      <div className="absolute bottom-[8%] left-[8%] z-30 flex w-[44%] items-end gap-[5%] rounded-2xl border border-slate-200 bg-white/92 p-[5%] shadow-[0_16px_35px_rgba(15,23,42,0.1)]">
        {[48, 72, 58, 92].map((width, index) => (
          <span key={width} className="flex-1 space-y-2">
            <span
              className="block h-2 origin-left rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              style={{ width: `${width}%`, animation: `qradMetric 3.8s ease-in-out ${index * 0.22}s infinite alternate` }}
            />
            <span
              className="block h-2 rounded-full bg-slate-100"
              style={{ animation: `qradDot 3.4s ease-in-out ${index * 0.2}s infinite` }}
            />
          </span>
        ))}
      </div>

      <div className="absolute left-[37%] top-[43%] z-30 flex gap-2">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]"
            style={{ animation: `qradDot 3.2s ease-in-out ${index * 0.24}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

export const weeklyBlogCoverComponents = {
  "codigo-qr-app-descarga": QrAppDownloadCover,
  "app-store-optimization-aso-guia": AsoOptimizationCover,
};

function renderSectionBlock(block, index, language) {
  if (block.type === "heading") {
    return <h3 key={index}>{block.text}</h3>;
  }

  if (block.type === "bullets") {
    return (
      <ul key={index}>
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  if (block.type === "steps") {
    return (
      <ol key={index}>
        {block.items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}:</strong> {item.text}
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "callout") {
    return (
      <div key={index} className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
        <h3 className="mt-0 text-xl font-black text-gray-950">{block.title}</h3>
        <p className="mb-0">{block.text}</p>
      </div>
    );
  }

  if (block.type === "link") {
    return (
      <p key={index}>
        {block.text}
        <Link
          to={localizePath(block.to, language)}
          className="font-bold text-gray-950 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-950"
        >
          {block.label}
        </Link>
        {block.after}
      </p>
    );
  }

  return <p key={index}>{block.text}</p>;
}

function WeeklyArticleContent({ article, language }) {
  const locale = article.locales[language] || article.locales.en;

  return (
    <div className="space-y-8">
      <div>
        {locale.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {locale.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.blocks.map((block, index) => renderSectionBlock(block, index, language))}
        </section>
      ))}

      <section>
        <h2>{locale.faqTitle}</h2>
        {locale.faq.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center sm:p-8">
        <h3 className="mt-0 text-xl font-black text-gray-950">{locale.cta.title}</h3>
        <p>{locale.cta.text}</p>
        <Link
          to={localizePath("/", language)}
          className="inline-block rounded-full bg-black px-8 py-3.5 font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:bg-gray-900"
        >
          {locale.cta.label}
        </Link>
      </div>
    </div>
  );
}

export function getWeeklyBlogPosts(language = "es") {
  const normalizedLanguage = normalizeLanguage(language);

  return weeklyBlogManifest.map((article) => {
    const locale = article.locales[normalizedLanguage] || article.locales.en;
    const Cover = weeklyBlogCoverComponents[article.slug];

    return {
      slug: article.slug,
      title: locale.title,
      category: locale.category,
      excerpt: locale.excerpt,
      readTime: locale.readTime,
      publishedAt: article.publishedAt,
      keywords: [
        article.seo.primaryKeyword,
        ...(article.seo.secondaryKeywords || []),
      ].filter(Boolean),
      automatedWeeklyPost: true,
      coverComponent: Cover ? <Cover /> : null,
      content: <WeeklyArticleContent article={article} language={normalizedLanguage} />,
    };
  });
}
