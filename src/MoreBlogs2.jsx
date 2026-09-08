import React from "react";
import { Link } from "react-router-dom";

const authorData = {
  name: "David Trotonda",
  role: "CEO de SkeilApps",
  img: "/partner-logos/skeilapps-logo.png",
};

/* ============================================================================
 * COVER ANIMATIONS — minimal text, max visual storytelling
 * Each cover narrates the blog in 3-5 animated elements with sequenced motion.
 * ============================================================================ */

/* ──────────────────────────────────────────────────────────────────────────
 * 1) LINKTREE – Bio link with stacked bullets vs direct smart link.
 *    Story: tap → linktree opens (5 buttons) → user gets lost (−% counter)
 *           vs smart link → goes straight to App Store icon → installs grow.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverLinktree = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-rose-50 border border-black/5">
    <style>{`
      @keyframes lt2-finger { 0%,12% { transform: translate(0,0); opacity: .85 } 22% { transform: translate(-2px,-2px); opacity: 1 } 36%,100% { transform: translate(0,0); opacity: .55 } }
      @keyframes lt2-ripple { 0%,18% { transform: scale(.6); opacity: 0 } 28% { transform: scale(1); opacity: .6 } 60%,100% { transform: scale(1.7); opacity: 0 } }
      @keyframes lt2-leak { 0%,28% { opacity: 0; transform: translateY(0) } 40% { opacity: 1 } 90% { opacity: 0; transform: translateY(28px) } 100% { transform: translateY(28px) } }
      @keyframes lt2-flow { 0%,18% { stroke-dashoffset: 60 } 60%,100% { stroke-dashoffset: 0 } }
      @keyframes lt2-counter { 0%,20% { opacity: 0; transform: translateY(4px) } 35% { opacity: 1; transform: translateY(0) } 90% { opacity: 1 } 100% { opacity: 0 } }
      @keyframes lt2-pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.08) } }
    `}</style>
    <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3">
      {/* LEFT: Linktree-style stacked page with finger tap and leak */}
      <div className="relative rounded-xl border border-rose-200 bg-white/80 p-2.5 backdrop-blur">
        <div className="absolute -top-2 left-2 rounded-full bg-rose-100 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-rose-600">linktree</div>
        <div className="mx-auto h-3 w-3 rounded-full bg-rose-200 mb-1.5" />
        <div className="space-y-1">
          {[0,1,2,3,4].map((i) => (
            <div key={i} className={`h-1.5 w-full rounded-md ${i === 1 ? "bg-rose-300" : "bg-slate-200"}`} />
          ))}
        </div>
        <div className="pointer-events-none absolute right-1 top-1/3 text-rose-500" style={{ animation: "lt2-finger 3.6s ease-in-out infinite" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2l7 18 2-8 8-2L3 2z"/></svg>
        </div>
        <div className="pointer-events-none absolute right-1 top-1/3 h-3 w-3 rounded-full border border-rose-300" style={{ animation: "lt2-ripple 3.6s ease-out infinite" }} />
        {/* drip lost installs */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-1 rounded-b-full bg-rose-300" style={{ animation: "lt2-leak 3.6s ease-in infinite" }} />
      </div>

      {/* RIGHT: Smart link → direct to store, growing counter */}
      <div className="relative rounded-xl border border-emerald-200 bg-white/90 p-2.5 backdrop-blur">
        <div className="absolute -top-2 left-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-emerald-700">smart link</div>
        {/* Arrow from URL to store */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,80 L90,20" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="60" style={{ animation: "lt2-flow 3.6s ease-in-out infinite" }} />
        </svg>
        {/* Bottom-left URL chip */}
        <div className="absolute bottom-1.5 left-1.5 rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[6px] font-black text-emerald-700">/tuapp</div>
        {/* Top-right store icon */}
        <div className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-md bg-black text-white shadow" style={{ animation: "lt2-pulse 2.4s ease-in-out infinite" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 4l-3 5h2v3h2v-3h2l-3-5z"/></svg>
        </div>
        {/* growing counter */}
        <div className="absolute bottom-7 left-1.5 flex items-baseline gap-0.5" style={{ animation: "lt2-counter 3.6s ease-out infinite" }}>
          <span className="text-base font-black text-emerald-700 leading-none tabular-nums">+47</span>
          <span className="text-[7px] font-black uppercase tracking-wider text-emerald-600">installs</span>
        </div>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 2) INFLUENCER TIKTOK – 3 creators, 3 counters racing, trophy on winner.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverInfluencerTikTok = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-white to-amber-50 border border-black/5 p-3">
    <style>{`
      @keyframes inf-bar1 { 0% { width: 0% } 60%,100% { width: 38% } }
      @keyframes inf-bar2 { 0% { width: 0% } 70%,100% { width: 72% } }
      @keyframes inf-bar3 { 0% { width: 0% } 65%,100% { width: 24% } }
      @keyframes inf-trophy { 0%,68% { opacity: 0; transform: scale(.4) } 80% { opacity: 1; transform: scale(1.2) } 100% { transform: scale(1) } }
      @keyframes inf-count1 { 0%,100% { content: "0" } }
      @keyframes inf-pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.05) } }
      @keyframes inf-shimmer { 0% { background-position: -120% 0 } 100% { background-position: 220% 0 } }
    `}</style>
    {/* Top: 3 creator avatars with TT badge */}
    <div className="mb-2 flex items-center justify-between">
      {["#ec4899","#3b82f6","#10b981"].map((c, i) => (
        <div key={i} className="relative">
          <div className="grid h-9 w-9 place-items-center rounded-full text-white text-[10px] font-black shadow-sm" style={{ background: `linear-gradient(135deg, ${c}, #000)`, animation: `inf-pulse 2s ease-in-out infinite ${i * 0.4}s` }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.3V2h-3.5v13.7a2.9 2.9 0 0 1-5.2 1.7 2.9 2.9 0 0 1 3.2-4.5v-3.5a6.3 6.3 0 1 0 5.5 6.3V8.7a8.2 8.2 0 0 0 4.8 1.5V6.7a4.9 4.9 0 0 1-1 0z"/></svg>
          </div>
          {i === 1 && (
            <div className="absolute -right-1 -top-1 text-amber-500" style={{ animation: "inf-trophy 3.4s ease-out infinite" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h10v2c0 3-1.5 5-3.5 5.8V14h2v2H8.5v-2h2v-2.2C8.5 11 7 9 7 6V4z"/></svg>
            </div>
          )}
        </div>
      ))}
    </div>
    {/* Bars */}
    <div className="space-y-1.5">
      {[1,2,3].map((i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className="text-[8px] font-black text-black/45 w-7">{i === 2 ? "+842" : i === 1 ? "+247" : "+102"}</span>
          <div className="relative h-2.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${i === 2 ? "bg-emerald-500" : i === 1 ? "bg-pink-500" : "bg-blue-500"}`}
              style={{ animation: `inf-bar${i} 3.4s ease-out infinite` }}
            />
            <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)", backgroundSize: "200% 100%", animation: "inf-shimmer 2s linear infinite" }} />
          </div>
        </div>
      ))}
    </div>
    {/* Bottom badges */}
    <div className="mt-2 flex justify-between gap-1">
      <span className="rounded bg-pink-100 px-1.5 py-0.5 text-[7px] font-black text-pink-700">@a</span>
      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[7px] font-black text-emerald-700">@b ★</span>
      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[7px] font-black text-blue-700">@c</span>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 3) BUTTON BELOW THE FOLD – phone with scroll, fold line, late CTA, lost users.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverBotonAbajoFold = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-black/5 flex items-center justify-center gap-4 p-3">
    <style>{`
      @keyframes fold2-scroll { 0%,15% { transform: translateY(0) } 70%,85% { transform: translateY(-66px) } 100% { transform: translateY(-66px) } }
      @keyframes fold2-finger { 0%,15% { transform: translate(0, 0); opacity: .9 } 70%,85% { transform: translate(-4px,-44px); opacity: .9 } 100% { transform: translate(-4px,-44px); opacity: .6 } }
      @keyframes fold2-cta { 0%,68% { transform: scale(.9); box-shadow: 0 0 0 0 rgba(16,185,129,0) } 78%,90% { transform: scale(1.06); box-shadow: 0 0 0 6px rgba(16,185,129,0.18) } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16,185,129,0) } }
      @keyframes fold2-lost { 0%,40% { opacity: 0; transform: translate(0,0) } 55% { opacity: 1 } 85% { opacity: 0; transform: translate(14px, 8px) } }
    `}</style>
    {/* Phone */}
    <div className="relative h-44 w-24 rounded-[20px] border-[3px] border-slate-800 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="absolute left-1/2 top-1 h-1 w-7 -translate-x-1/2 rounded-full bg-slate-200" />
      <div className="absolute inset-x-0 top-12 z-10 border-t-2 border-dashed border-red-400/60">
        <span className="absolute -top-2.5 right-1 rounded bg-red-500 px-1 py-0.5 text-[7px] font-black text-white">FOLD</span>
      </div>
      <div className="pt-3 px-1.5 flex flex-col gap-1" style={{ animation: "fold2-scroll 4s ease-in-out infinite" }}>
        <div className="h-3 rounded bg-slate-200" />
        <div className="h-2 rounded bg-slate-100" />
        <div className="h-2 rounded bg-slate-100 w-2/3" />
        <div className="h-8 rounded bg-slate-100" />
        <div className="h-2 rounded bg-slate-100" />
        <div className="h-2 rounded bg-slate-100 w-3/4" />
        <div className="h-8 rounded bg-slate-100" />
        <div className="h-2 rounded bg-slate-100" />
        <div className="h-2 rounded bg-slate-100 w-1/2" />
        <div className="h-6 rounded-md bg-emerald-500 flex items-center justify-center" style={{ animation: "fold2-cta 4s ease-in-out infinite" }}>
          <span className="text-[7px] font-black text-white">DESCARGAR</span>
        </div>
      </div>
      {/* finger that travels to find the CTA */}
      <div className="absolute bottom-3 right-2 text-slate-800" style={{ animation: "fold2-finger 4s ease-in-out infinite" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2l7 18 2-8 8-2L3 2z"/></svg>
      </div>
    </div>
    {/* Lost user icons */}
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2 py-0.5" style={{ animation: "fold2-lost 4s ease-in-out infinite" }}>
        <span className="text-[8px] font-black text-red-600">−12%</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2 py-0.5" style={{ animation: "fold2-lost 4s ease-in-out infinite 0.4s" }}>
        <span className="text-[8px] font-black text-red-600">−28%</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2 py-0.5" style={{ animation: "fold2-lost 4s ease-in-out infinite 0.8s" }}>
        <span className="text-[8px] font-black text-red-600">−41%</span>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 4) GOOGLE ADS WRONG STORE – ad banner, split road, coins burning on red path.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverGoogleAdsWrong = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-rose-50 border border-black/5 p-3">
    <style>{`
      @keyframes ga-coin-good { 0% { transform: translate(0,0); opacity: 0 } 20% { opacity: 1 } 80% { transform: translate(56px,28px); opacity: 1 } 100% { opacity: 0 } }
      @keyframes ga-coin-bad { 0% { transform: translate(0,0); opacity: 0 } 20% { opacity: 1 } 80% { transform: translate(-56px,28px); opacity: 1 } 100% { transform: translate(-56px,38px); opacity: 0 } }
      @keyframes ga-fire { 0%,100% { transform: scale(1) rotate(-3deg); opacity: .85 } 50% { transform: scale(1.15) rotate(3deg); opacity: 1 } }
      @keyframes ga-ad-pulse { 0%,100% { box-shadow: 0 6px 14px rgba(59,130,246,0.18) } 50% { box-shadow: 0 8px 22px rgba(59,130,246,0.32) } }
    `}</style>
    {/* Top: Ad banner */}
    <div className="mx-auto mb-2 w-full rounded-md border border-blue-300 bg-white p-1.5 shadow" style={{ animation: "ga-ad-pulse 2.2s ease-in-out infinite" }}>
      <div className="flex items-center gap-1.5">
        <span className="rounded bg-blue-500 px-1 py-0.5 text-[7px] font-black text-white">AD</span>
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="h-1 w-3/4 rounded bg-slate-300" />
          <div className="h-1 w-2/4 rounded bg-slate-200" />
        </div>
        <span className="text-[8px] font-black text-blue-700">€€€</span>
      </div>
    </div>
    {/* Roads */}
    <svg viewBox="0 0 200 60" className="w-full h-16" preserveAspectRatio="none">
      <path d="M100,0 L100,18 Q100,30 70,30 L20,30" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M100,0 L100,18 Q100,30 130,30 L180,30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="3 3" />
    </svg>
    {/* Two destinations */}
    <div className="mt-1 flex items-end justify-between">
      <div className="relative">
        <div className="grid h-12 w-12 place-items-center rounded-xl border-2 border-emerald-400 bg-white shadow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#10b981"><path d="M17 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10z"/></svg>
        </div>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-black text-emerald-700">iOS ✓</span>
        {/* coin good */}
        <div className="absolute -top-1 -left-1 grid h-4 w-4 place-items-center rounded-full bg-yellow-400 text-[8px] font-black text-yellow-900 shadow" style={{ animation: "ga-coin-good 2.6s ease-in infinite" }}>€</div>
      </div>
      <div className="relative">
        <div className="grid h-12 w-12 place-items-center rounded-xl border-2 border-red-400 bg-white shadow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="m5 5 14 14"/></svg>
        </div>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-red-100 px-1.5 py-0.5 text-[7px] font-black text-red-700">iOS ✗</span>
        {/* burning coin */}
        <div className="absolute -top-2 -right-2 text-base" style={{ animation: "ga-fire 1.6s ease-in-out infinite" }}>🔥</div>
        <div className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-yellow-400 text-[8px] font-black text-yellow-900 shadow" style={{ animation: "ga-coin-bad 2.6s ease-in infinite 0.4s" }}>€</div>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 5) QR PACKAGING – premium tilted box with QR glow + iPhone scanning beam.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverQrPackaging = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 via-white to-stone-200 border border-black/5 flex items-center justify-center p-3">
    <style>{`
      @keyframes pkg2-box { 0%,100% { transform: rotate(-6deg) translateY(0) } 50% { transform: rotate(6deg) translateY(-2px) } }
      @keyframes pkg2-scan { 0% { top: 12% } 50% { top: 78% } 100% { top: 12% } }
      @keyframes pkg2-beam { 0%,40% { opacity: 0; transform: scale(.7) } 55% { opacity: 1; transform: scale(1) } 80%,100% { opacity: 0; transform: scale(1.4) } }
      @keyframes pkg2-check { 0%,75% { opacity: 0; transform: scale(.4) } 85% { opacity: 1; transform: scale(1.2) } 100% { transform: scale(1) } }
      @keyframes pkg2-glow { 0%,100% { box-shadow: 0 4px 18px rgba(0,0,0,0.10) } 50% { box-shadow: 0 6px 26px rgba(16,185,129,0.35) } }
    `}</style>
    {/* Package box */}
    <div className="relative" style={{ animation: "pkg2-box 4s ease-in-out infinite" }}>
      <div className="relative h-28 w-32 rounded-md bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 border border-stone-300 shadow-[0_18px_30px_rgba(0,0,0,0.14)]">
        <div className="absolute left-1/2 top-1.5 h-1.5 w-20 -translate-x-1/2 rounded-full bg-stone-300/80" />
        <div className="absolute -top-2 left-3 grid h-5 w-5 place-items-center rounded-full bg-black text-[8px] font-black text-white">B</div>
        {/* QR on box */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 h-14 w-14 rounded-md bg-white border border-black p-1" style={{ animation: "pkg2-glow 2.4s ease-in-out infinite" }}>
          <div className="grid h-full w-full grid-cols-6 gap-px">
            {[1,0,1,1,0,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,0,1,1,0,1,1,1,0,0,1,0,1,0,1].map((v,i)=>(
              <div key={i} className={v ? "bg-black" : "bg-white"} />
            ))}
          </div>
          {/* scan beam */}
          <div className="absolute inset-x-1 h-px bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.6)]" style={{ animation: "pkg2-scan 1.6s linear infinite" }} />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] font-black tracking-widest text-stone-500">SCAN</div>
        {/* check on success */}
        <div className="absolute -top-3 -right-3 grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white shadow" style={{ animation: "pkg2-check 3.2s ease-out infinite" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
      </div>
    </div>
    {/* Phone scanning */}
    <div className="absolute right-3 bottom-3 h-16 w-9 rounded-[8px] border-2 border-slate-800 bg-white shadow">
      <div className="absolute left-1/2 top-0.5 h-0.5 w-3 -translate-x-1/2 rounded-full bg-slate-300" />
      <div className="absolute inset-1 rounded-sm bg-gradient-to-b from-slate-100 to-slate-200" />
      {/* scan beam */}
      <div className="absolute -left-6 top-1/2 h-px w-6 bg-emerald-400/80" style={{ animation: "pkg2-beam 1.6s ease-out infinite" }} />
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 6) SMART LINK vs DEEP LINK – two phones side by side, one opens store,
 *    the other lands inside the app on a specific screen, with arrows.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverSmartVsDeep = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-white to-blue-50 border border-black/5 p-3">
    <style>{`
      @keyframes svd-arrow { 0% { stroke-dashoffset: 60 } 60%,100% { stroke-dashoffset: 0 } }
      @keyframes svd-bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
      @keyframes svd-pulse-l { 0%,100% { box-shadow: 0 4px 14px rgba(59,130,246,.18) } 50% { box-shadow: 0 6px 20px rgba(59,130,246,.36) } }
      @keyframes svd-pulse-r { 0%,100% { box-shadow: 0 4px 14px rgba(168,85,247,.18) } 50% { box-shadow: 0 6px 20px rgba(168,85,247,.36) } }
      @keyframes svd-fade { 0%,40% { opacity: 0 } 55%,100% { opacity: 1 } }
    `}</style>
    <div className="grid grid-cols-2 gap-2 h-full">
      {/* LEFT: smart link → store icon */}
      <div className="relative flex flex-col items-center justify-center gap-1">
        <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-blue-700">smart</span>
        <div className="relative h-24 w-14 rounded-[10px] border-2 border-blue-400 bg-white" style={{ animation: "svd-pulse-l 2.4s ease-in-out infinite, svd-bounce 3s ease-in-out infinite" }}>
          <div className="absolute left-1/2 top-1 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-200" />
          <div className="absolute inset-1.5 grid place-items-center rounded-md bg-gradient-to-b from-blue-50 to-white">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-blue-500 text-white shadow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10z"/></svg>
            </div>
            <div className="mt-1 text-[7px] font-black text-blue-700">App Store</div>
          </div>
        </div>
        <svg className="absolute left-0 right-0 top-12 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0,5 L100,5" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </svg>
      </div>
      {/* RIGHT: deep link → inside app screen */}
      <div className="relative flex flex-col items-center justify-center gap-1">
        <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-purple-700">deep</span>
        <div className="relative h-24 w-14 rounded-[10px] border-2 border-purple-400 bg-white" style={{ animation: "svd-pulse-r 2.4s ease-in-out infinite 0.4s, svd-bounce 3s ease-in-out infinite 0.4s" }}>
          <div className="absolute left-1/2 top-1 h-0.5 w-4 -translate-x-1/2 rounded-full bg-purple-200" />
          <div className="absolute inset-1.5 flex flex-col gap-0.5 rounded-md bg-gradient-to-b from-purple-50 to-white p-1">
            <div className="h-1 w-full rounded bg-purple-300" />
            <div className="h-3 w-full rounded bg-purple-200" />
            <div className="h-1 w-2/3 rounded bg-purple-100" />
            <div className="mt-auto h-2 w-full rounded bg-purple-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-purple-500 text-white text-[8px] font-black" style={{ animation: "svd-fade 2.8s ease-in-out infinite" }}>↪</div>
        </div>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 7) ATTRIBUTION – pie chart + 4 source channel chips flowing arrows in, growing counter.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverAtribucion = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-cyan-50 border border-black/5 p-3">
    <style>{`
      @keyframes atr-rotate { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
      @keyframes atr-source { 0%,100% { transform: translate(0,0); opacity: .9 } 50% { transform: translate(2px,-2px); opacity: 1 } }
      @keyframes atr-counter { 0% { transform: scale(.92) } 100% { transform: scale(1) } }
      @keyframes atr-tick { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
      @keyframes atr-flow1 { 0% { stroke-dashoffset: 40 } 100% { stroke-dashoffset: 0 } }
    `}</style>
    <div className="grid h-full grid-cols-[1fr_auto] items-center gap-3">
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { code: "IG", color: "#ec4899" },
          { code: "TT", color: "#3b82f6" },
          { code: "QR", color: "#10b981" },
          { code: "WEB", color: "#f59e0b" },
        ].map((s, i) => (
          <div key={s.code} className="flex items-center gap-1.5 rounded-md border border-black/5 bg-white px-1.5 py-1 shadow-sm" style={{ animation: `atr-source 2.4s ease-in-out infinite ${i * 0.2}s` }}>
            <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-[8px] font-black uppercase tracking-wider text-black/65">{s.code}</span>
            <svg className="ml-auto h-2 w-3" viewBox="0 0 30 10" preserveAspectRatio="none">
              <path d="M0,5 L28,5" stroke={s.color} strokeWidth="1.5" strokeDasharray="3 2" fill="none" style={{ animation: "atr-flow1 1.4s linear infinite" }} />
            </svg>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="relative h-20 w-20" style={{ animation: "atr-rotate 14s linear infinite" }}>
          <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(#ec4899 0 30%, #3b82f6 30% 56%, #10b981 56% 82%, #f59e0b 82% 100%)" }} />
          <div className="absolute inset-[8px] rounded-full bg-white shadow-inner" />
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center" style={{ animation: "atr-counter 1.4s ease-out forwards" }}>
            <span className="text-base font-black text-black tabular-nums" style={{ animation: "atr-tick 1.8s ease-in-out infinite" }}>2.4K</span>
            <span className="text-[7px] font-black uppercase tracking-wider text-black/45">descargas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 8) INSTAGRAM BIO – phone with rotating bio templates + tap + arrow to store.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverBioInstagram = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-white to-yellow-50 border border-black/5 p-3 flex items-center justify-center gap-3">
    <style>{`
      @keyframes ig-cycle { 0%,20% { opacity: 1 } 25%,40% { opacity: 0 } 100% { opacity: 0 } }
      @keyframes ig-cycle1 { 0%,20% { opacity: 0 } 25%,45% { opacity: 1 } 50%,100% { opacity: 0 } }
      @keyframes ig-cycle2 { 0%,45% { opacity: 0 } 50%,70% { opacity: 1 } 75%,100% { opacity: 0 } }
      @keyframes ig-cycle3 { 0%,70% { opacity: 0 } 75%,95% { opacity: 1 } 100% { opacity: 0 } }
      @keyframes ig-tap { 0%,15% { transform: scale(1) } 22% { transform: scale(.92) } 30%,100% { transform: scale(1) } }
      @keyframes ig-arrow { 0% { stroke-dashoffset: 30 } 70%,100% { stroke-dashoffset: 0 } }
      @keyframes ig-store-pop { 0%,55% { transform: scale(.4); opacity: 0 } 70% { transform: scale(1.15); opacity: 1 } 100% { transform: scale(1) } }
    `}</style>
    {/* Phone */}
    <div className="relative h-44 w-26 w-[100px] rounded-[20px] border-[3px] border-pink-300 bg-white shadow-[0_10px_28px_rgba(236,72,153,0.16)] overflow-hidden p-2" style={{ animation: "ig-tap 3.2s ease-in-out infinite" }}>
      <div className="absolute left-1/2 top-1 h-1 w-6 -translate-x-1/2 rounded-full bg-pink-200" />
      {/* avatar */}
      <div className="mt-2 flex items-center gap-1.5">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-500 via-amber-300 to-pink-400 p-0.5">
          <div className="h-full w-full rounded-full bg-white" />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <div className="h-1.5 w-3/4 rounded bg-slate-300" />
          <div className="h-1 w-1/2 rounded bg-slate-200" />
        </div>
      </div>
      {/* rotating bio variants */}
      <div className="relative mt-2 h-8">
        <div className="absolute inset-0 flex flex-col gap-1" style={{ animation: "ig-cycle 6s ease-in-out infinite" }}>
          <div className="h-1.5 rounded bg-slate-200" />
          <div className="h-1.5 w-2/3 rounded bg-slate-200" />
        </div>
        <div className="absolute inset-0 flex flex-col gap-1" style={{ animation: "ig-cycle1 6s ease-in-out infinite" }}>
          <div className="h-1.5 rounded bg-pink-200" />
          <div className="h-1.5 w-3/4 rounded bg-pink-200" />
        </div>
        <div className="absolute inset-0 flex flex-col gap-1" style={{ animation: "ig-cycle2 6s ease-in-out infinite" }}>
          <div className="h-1.5 rounded bg-amber-200" />
          <div className="h-1.5 w-1/2 rounded bg-amber-200" />
        </div>
        <div className="absolute inset-0 flex flex-col gap-1" style={{ animation: "ig-cycle3 6s ease-in-out infinite" }}>
          <div className="h-1.5 rounded bg-emerald-200" />
          <div className="h-1.5 w-2/3 rounded bg-emerald-200" />
        </div>
      </div>
      {/* link */}
      <div className="mt-2 rounded-md border-2 border-pink-400 bg-pink-50 px-1.5 py-1 flex items-center gap-1 shadow-sm">
        <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
        <div className="h-1.5 flex-1 rounded bg-pink-300" />
      </div>
      {/* finger */}
      <div className="absolute bottom-3 right-2 text-pink-600">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2l7 18 2-8 8-2L3 2z"/></svg>
      </div>
    </div>
    {/* Arrow + store */}
    <div className="flex flex-col items-center gap-2">
      <svg width="34" height="14" viewBox="0 0 40 14">
        <path d="M2,7 L34,7" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="30" strokeLinecap="round" style={{ animation: "ig-arrow 3s ease-in-out infinite" }} />
        <path d="M30,3 L34,7 L30,11" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white shadow-md" style={{ animation: "ig-store-pop 3.2s ease-out infinite" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10z"/></svg>
      </div>
      <span className="text-[7px] font-black uppercase tracking-widest text-emerald-700">install</span>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * 9) SAAS LAUNCH – laptop with web app + phone with mobile install + chart growing + rocket.
 * ────────────────────────────────────────────────────────────────────────── */
export const CoverSaaSLaunch = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100 border border-black/5 p-3">
    <style>{`
      @keyframes saas-rocket { 0% { transform: translate(0,0) rotate(-30deg) } 70%,100% { transform: translate(40px,-40px) rotate(-12deg); opacity: .85 } }
      @keyframes saas-trail { 0% { opacity: 0; transform: scale(.4) } 60% { opacity: .6 } 100% { opacity: 0; transform: scale(1.5) } }
      @keyframes saas-bar { 0% { transform: scaleY(.2) } 100% { transform: scaleY(1) } }
      @keyframes saas-tick { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
      @keyframes saas-glow { 0%,100% { box-shadow: 0 6px 14px rgba(99,102,241,.18) } 50% { box-shadow: 0 8px 24px rgba(99,102,241,.36) } }
    `}</style>
    <div className="grid h-full grid-cols-[1.4fr_1fr] gap-2 items-end">
      {/* Left: laptop + chart */}
      <div className="relative flex flex-col items-center gap-1">
        <div className="relative h-16 w-24 rounded-md bg-white border-2 border-slate-300 p-1 shadow" style={{ animation: "saas-glow 3s ease-in-out infinite" }}>
          <div className="h-full w-full rounded-sm bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-1 flex flex-col gap-0.5">
            <div className="h-1 w-3/4 rounded bg-indigo-300" />
            <div className="h-0.5 w-1/2 rounded bg-indigo-200" />
            <div className="flex items-end gap-0.5 h-6 mt-auto">
              {[3,5,4,7,6,9].map((v, i) => (
                <div key={i} className="w-1 origin-bottom rounded-sm bg-indigo-500" style={{ height: `${v * 3}px`, animation: `saas-bar 1.4s ease-out forwards ${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-12 rounded-b-md bg-slate-300" />
      </div>
      {/* Right: phone with arrow to install counter */}
      <div className="relative flex flex-col items-center gap-1">
        <div className="relative h-16 w-8 rounded-[8px] border-2 border-indigo-400 bg-white shadow" style={{ animation: "saas-glow 3s ease-in-out infinite 0.4s" }}>
          <div className="absolute left-1/2 top-0.5 h-0.5 w-3 -translate-x-1/2 rounded-full bg-indigo-200" />
          <div className="absolute inset-1 rounded-sm bg-gradient-to-b from-indigo-100 to-white p-0.5 flex flex-col gap-0.5">
            <div className="h-0.5 w-full rounded bg-indigo-300" />
            <div className="h-0.5 w-2/3 rounded bg-indigo-200" />
            <div className="mt-auto grid h-3 place-items-center rounded-sm bg-indigo-500 text-[5px] font-black text-white">+</div>
          </div>
        </div>
        <div className="rounded-md bg-indigo-100 px-1.5 py-0.5 text-[8px] font-black text-indigo-800" style={{ animation: "saas-tick 1.6s ease-in-out infinite" }}>
          +1,247
        </div>
      </div>
      {/* Rocket */}
      <div className="absolute top-2 right-2 text-indigo-600" style={{ animation: "saas-rocket 3s ease-out infinite" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5L3 22l5.5-1.5"/>
          <path d="M12 15l-3-3a22 22 0 0 1 9-9l3 3a22 22 0 0 1-9 9z"/>
          <circle cx="15" cy="9" r="1.5" fill="#fff"/>
        </svg>
      </div>
      {/* rocket trail */}
      <div className="absolute top-7 right-9 h-2 w-2 rounded-full bg-indigo-300/60" style={{ animation: "saas-trail 1.4s ease-out infinite" }} />
      <div className="absolute top-9 right-11 h-1.5 w-1.5 rounded-full bg-indigo-300/60" style={{ animation: "saas-trail 1.4s ease-out infinite 0.3s" }} />
    </div>
  </div>
);

/* ============================================================================
 * BLOG POSTS — expanded content with detailed sections, examples, tables, callouts.
 * ============================================================================ */

const Callout = ({ children }) => (
  <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/60 px-5 py-4 my-6">
    <p className="text-[14px] sm:text-[15px] font-medium leading-7 text-emerald-900">{children}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
    <span className="text-[28px] font-black leading-none tracking-tight text-black">{value}</span>
    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/55">{label}</span>
  </div>
);

const StatRow = ({ stats }) => (
  <div className="grid grid-cols-3 gap-3 my-8">
    {stats.map((s, i) => <Stat key={i} value={s.value} label={s.label} />)}
  </div>
);

const CtaBlock = () => (
  <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 sm:p-8 mt-12 text-center">
    <h3 className="text-[22px] font-bold mb-3 text-black tracking-tight">Crea tu smart link gratis hoy</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">Un único enlace y QR para App Store y Google Play. Detección automática, estadísticas por canal, sin SDK.</p>
    <Link to="/" className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
      Empezar gratis →
    </Link>
  </div>
);

export const moreBlogPosts2 = [
  /* ─────────────────────────── 1. LINKTREE LONG-TAIL ─────────────────────────── */
  {
    slug: "linktree-pierde-descargas-app",
    title: "Por qué Linktree pierde descargas de tu app móvil (y qué hacer en su lugar)",
    date: "5 de Julio, 2026",
    category: "ESTRATEGIA",
    excerpt: "Linktree añade una página intermedia entre tu bio y la App Store. Te enseñamos exactamente cuánta conversión te cuesta, qué pasa en cada paso y cómo eliminarla sin perder funcionalidad.",
    readTime: "8 min",
    author: authorData,
    coverComponent: <CoverLinktree />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Linktree resuelve un problema real: la bio de Instagram solo permite un enlace. Pero cuando lo usas para distribuir tu app móvil, <strong>te está costando entre un 30 % y un 45 % de las descargas potenciales</strong>. Lo peor es que la mayoría de fundadores y marketers no lo sabe porque el dato no aparece en ningún dashboard.
        </p>

        <StatRow stats={[
          { value: "−42 %", label: "Descargas perdidas vs smart link" },
          { value: "5 → 2", label: "Pasos hasta instalar" },
          { value: "0", label: "Atribución por canal" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El funnel real cuando usas Linktree</h2>
        <p>
          Vamos a desmontar el camino que recorre un usuario desde que ve tu bio de Instagram hasta que instala tu app. Los pasos en negrita son los que añade Linktree:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Toca tu link de bio.</li>
          <li><strong>Espera a que cargue la página de Linktree.</strong></li>
          <li><strong>Ve un fondo, un banner y varios botones.</strong></li>
          <li><strong>Tiene que decidir entre "App Store" o "Google Play".</strong></li>
          <li><strong>Toca el botón correcto.</strong></li>
          <li>Espera a que cargue la tienda.</li>
          <li>Toca "Instalar".</li>
        </ol>
        <p>
          Cada uno de los pasos 2, 3, 4 y 5 es una oportunidad para que el usuario se distraiga, dude o cierre la pestaña. Y a más pasos, más caída. Es matemática pura del funnel.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El error del paso 4: pedirle al usuario que elija</h2>
        <p>
          El paso 4 (elegir entre App Store y Google Play) es el más dañino. Suena absurdo porque "el usuario sabe qué móvil tiene", pero la realidad es que mucha gente no presta atención al label. Especialmente cuando los iconos son parecidos y la página tiene varios elementos compitiendo por su atención.
        </p>
        <p>
          Resultado: una parte de tus usuarios toca el botón equivocado, llega a una tienda donde "esta app no está disponible" y cierra la pestaña. Otra parte simplemente se cansa de elegir y abandona. La culpa no es del usuario – es del diseño del flujo.
        </p>

        <Callout>
          Cada paso que añades a un funnel de instalación baja la conversión entre un 8 % y un 15 %. Tres pasos extra = la mitad de tus descargas potenciales perdidas.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Lo que pierdes en datos</h2>
        <p>
          El segundo problema con Linktree es de atribución. Linktree te dice cuántos clics tienen tus enlaces, pero no cuántas descargas convirtieron. Y como cada clic puede no haber acabado en una instalación, tu métrica de "clics en el link de bio" es <em>vanity</em> – no tiene relación directa con revenue.
        </p>
        <p>
          Tres preguntas concretas que Linktree no responde:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>¿Cuántas instalaciones generó Instagram este mes?</li>
          <li>¿Convierten más los usuarios iOS o Android?</li>
          <li>¿Qué story específica está trayendo más descargas?</li>
        </ul>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">La alternativa: un smart link en la bio</h2>
        <p>
          La solución es eliminar el paso intermedio. Un smart link es una URL única (por ejemplo <code>link-my.app/tuapp</code>) que detecta el dispositivo del usuario y lo redirige directamente: iPhone → App Store, Android → Google Play, ordenador → tu landing.
        </p>
        <p>
          Sin página intermedia. Sin botones. Sin elección. Y como cada clic se queda registrado con su dispositivo y su fuente, tu dashboard te dice exactamente cuántas visitas vienen de Instagram vs TikTok vs WhatsApp.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Pero quería poner varios enlaces en mi bio…</h2>
        <p>
          Es la objeción más común. La respuesta corta: <strong>tu bio de Instagram no necesita varios enlaces si tu objetivo principal es la app</strong>. La home de tu producto es Instagram. La acción que quieres es que se descarguen la app. Todo lo demás distrae.
        </p>
        <p>
          Si vendes a varios segmentos, abre stories con highlights distintos donde cada uno tenga su propio sticker de link a un smart link específico (por ejemplo, uno para curso y otro para app). Más limpio que un Linktree y trackable individualmente.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo migrar sin perder seguidores</h2>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Crea tu smart link con los enlaces de App Store, Google Play y una URL alternativa para desktop.</li>
          <li>Ponlo en tu bio sustituyendo al Linktree.</li>
          <li>Si quieres, mantén el Linktree activo una semana con un mensaje "Hemos cambiado a link-my.app/tuapp para tu comodidad".</li>
          <li>Después de 7 días, mira los datos: clics totales, distribución iOS/Android, hora pico.</li>
        </ol>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 2. INFLUENCER TIKTOK LONG-TAIL ─────────────────────────── */
  {
    slug: "medir-descargas-influencer-tiktok-sin-sdk",
    title: "Cómo medir las descargas de app que trae cada influencer de TikTok sin SDK",
    date: "9 de Julio, 2026",
    category: "ATRIBUCIÓN",
    excerpt: "Si quieres pagar a influencers por resultados de verdad, necesitas atribución limpia. Te enseñamos el método paso a paso, sin tocar tu código y con coste cero.",
    readTime: "10 min",
    author: authorData,
    coverComponent: <CoverInfluencerTikTok />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Cuando colaboras con influencers en TikTok hay dos modelos: pagas por publicación (caro y a ciegas) o pagas por descargas reales. El segundo siempre es mejor para tu unit economics, pero requiere saber con precisión <strong>qué influencer trajo qué instalaciones</strong>. Y no, no necesitas integrar AppsFlyer, Branch ni Adjust para conseguirlo.
        </p>

        <StatRow stats={[
          { value: "1", label: "Smart link por creador" },
          { value: "0 €", label: "Coste por install atribuido" },
          { value: "≈82 %", label: "Precisión vs SDK" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El método: un smart link único por creador</h2>
        <p>
          La técnica es simple. En lugar de compartir el mismo enlace con todos los influencers, cada creador recibe una URL personalizada con un sufijo identificativo: <code>link-my.app/tuapp-marina</code>, <code>link-my.app/tuapp-alex</code>, etc.
        </p>
        <p>
          Cada smart link tiene los mismos destinos (App Store + Google Play + fallback web), pero el dashboard cuenta sus clics por separado. Resultado: ves exactamente cuántas personas tocaron el link de Marina, cuántas el de Alex, y comparas su rendimiento.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo cerrar el gap entre clic y descarga real</h2>
        <p>
          Una herramienta de atribución sin SDK mide clics, no instalaciones. Para estimar descargas reales con precisión aceptable:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Toma los clics del smart link del influencer en el período (ej. los 7 días posteriores al post).</li>
          <li>Resta los rebotes (sesiones de menos de 5 segundos): aproximadamente un 18 %.</li>
          <li>Multiplica por la tasa de conversión típica de tu tienda en App Store (entre 18 % y 30 % en categoría apps).</li>
          <li>Compara con el delta de instalaciones diarias en tu cuenta de App Store Connect durante esos días.</li>
        </ol>

        <Callout>
          Esta estimación no es exacta a nivel de usuario, pero <strong>es justa para comparar influencers entre sí</strong> – que es lo que importa para decidir a quién renovar.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Caso real: tres influencers, mismo presupuesto</h2>
        <p>
          Imagina que pagas 1.500 € a tres creadores en una semana, mismo brief, mismo plazo. Tus smart links muestran:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-black/10 rounded-xl">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-3 font-bold">Influencer</th>
                <th className="p-3 font-bold">Clics</th>
                <th className="p-3 font-bold">Instalaciones estimadas</th>
                <th className="p-3 font-bold">CPI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/5"><td className="p-3">Marina</td><td className="p-3">3.420</td><td className="p-3">540</td><td className="p-3">2,78 €</td></tr>
              <tr className="border-t border-black/5 bg-emerald-50"><td className="p-3 font-bold">Alex</td><td className="p-3 font-bold">5.120</td><td className="p-3 font-bold">980</td><td className="p-3 font-bold">1,53 €</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Lucía</td><td className="p-3">2.200</td><td className="p-3">295</td><td className="p-3">5,08 €</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Con estos datos sabes que <strong>Alex convierte 3× mejor que Lucía a igual budget</strong>. La decisión para el próximo trimestre es obvia.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Por qué no necesitas un SDK (todavía)</h2>
        <p>
          Un SDK de atribución te da exactitud usuario-a-usuario pero a cambio:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Tu equipo de dev integra código nuevo y mantiene la actualización del SDK.</li>
          <li>La app pesa más (entre 1 y 4 MB extras).</li>
          <li>Pagas entre 1 y 8 céntimos por instalación atribuida.</li>
          <li>Tienes que lidiar con App Tracking Transparency (iOS) y la privacy sandbox (Android).</li>
        </ul>
        <p>
          Para un fundador o agencia en early/mid stage, el método del smart link único da el 80 % del valor por el 0 % del coste. Solo merece la pena un SDK cuando ya gastes más de 50.000 €/mes en paid social y necesites optimización automática de pujas.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Plantilla de brief para influencers</h2>
        <p>
          Para que esto funcione bien, manda al creador un brief con estos elementos:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>El smart link único que le toca (no compartir con otro creador).</li>
          <li>Especifica que el link debe ir en su bio y/o en la descripción del video, no solo verbalmente.</li>
          <li>Pide una story con sticker de link además del post (multiplica clics 2-3×).</li>
          <li>Acordad una ventana de medición (típico: 7 días post-publicación).</li>
        </ul>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 3. CTA FOLD LONG-TAIL ─────────────────────────── */
  {
    slug: "boton-descarga-app-fold-movil",
    title: "El error de poner el botón de descarga al final de la home móvil",
    date: "13 de Julio, 2026",
    category: "CRO",
    excerpt: "El 60 % del tráfico móvil no llega al final de tu página. Te enseñamos dónde colocar el CTA, qué copy usar y cómo medir el impacto del cambio.",
    readTime: "7 min",
    author: authorData,
    coverComponent: <CoverBotonAbajoFold />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Es una escena clásica: tu home tiene un hero atractivo, tres secciones de features, un carrusel de testimonios, una tabla de pricing y, después de 40 segundos de scroll, aparece un botón "Descargar la app". Resultado: no se descarga casi nadie.
        </p>

        <StatRow stats={[
          { value: "30 %", label: "Usuarios que llegan a mitad de página" },
          { value: "15 %", label: "Usuarios que llegan al final" },
          { value: "8 seg", label: "Para decidir si te interesa" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Por qué este patrón mata las descargas</h2>
        <p>
          En móvil, los usuarios deciden en los primeros 8 segundos si tu producto les interesa. Si tu CTA aparece después de 4 pantallas de scroll, esa decisión ya está tomada – y normalmente es "cerrar la pestaña". Los heatmaps típicos muestran que solo el 30 % del tráfico móvil llega a la mitad de la página y menos del 15 % al final.
        </p>
        <p>
          Esto se llama "below the fold" en jerga de CRO. El "fold" es la línea imaginaria que marca el final de la primera pantalla visible sin scroll. Y todo lo que está debajo de esa línea recibe una fracción del tráfico que llega a lo que está encima.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Dónde sí colocar el CTA</h2>
        <p>
          La regla general: <strong>el botón de descarga tiene que estar visible sin scroll en la primera pantalla móvil</strong>. Lo ideal es:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Hero con CTA principal</strong>: título, una frase de propuesta de valor y el botón. Nada más.</li>
          <li><strong>Sticky bar inferior</strong>: si tu hero ocupa toda la pantalla, mantén un bar fijo abajo con el CTA siempre accesible.</li>
          <li><strong>CTAs repetidos</strong>: después de cada sección de tu home, repite el CTA. Cada bloque del scroll debería tener su propia llamada a la acción.</li>
        </ol>

        <Callout>
          Si solo puedes hacer un cambio en tu home móvil este mes, mueve el CTA arriba del fold y pon un sticky bar abajo. Es la mejora con mayor ROI por minuto de trabajo.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El copy del botón importa más de lo que crees</h2>
        <p>
          "App Store" + "Google Play" lado a lado divide la atención. "Descargar" es genérico. "Descargar gratis" o "Probar la app" funcionan mejor porque añaden un beneficio. Algunas opciones probadas:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>"Probar gratis" → suena a riesgo cero.</li>
          <li>"Empezar en 30 segundos" → comunica velocidad.</li>
          <li>"Descargar la app" → directo, sin promesa.</li>
        </ul>
        <p>
          En todos los casos, mejor un único botón que apunta a un smart link (detección automática iOS/Android) que dos botones forzando a elegir.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo medir el impacto</h2>
        <p>
          Antes de cambiar nada, anota tu baseline: clics actuales en el smart link desde la home en los últimos 14 días. Después aplica los cambios: mueve el CTA arriba y añade sticky bar. Mide los siguientes 14 días.
        </p>
        <p>
          Lo típico es un incremento del 25 al 60 % en clics. Si tu app tiene buena tasa de instalación una vez llega a la tienda, ese porcentaje se traduce directamente en descargas.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Errores comunes al implementar</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Botón demasiado pequeño</strong>: Apple recomienda mínimo 44×44 px de target táctil. Si es más pequeño, el dedo falla.</li>
          <li><strong>Botón en color que se confunde con el fondo</strong>: tiene que destacar. Si tu identidad es blanca, usa un acento de color para los CTAs.</li>
          <li><strong>Sticky bar tapando contenido importante</strong>: deja un padding inferior en tu body equivalente a la altura del sticky bar.</li>
        </ul>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 4. GOOGLE ADS WRONG STORE LONG-TAIL ─────────────────────────── */
  {
    slug: "google-ads-tienda-equivocada",
    title: "Cómo evitar que Google Ads queme presupuesto enviando a la tienda equivocada",
    date: "17 de Julio, 2026",
    category: "PAID MEDIA",
    excerpt: "Si tu anuncio apunta a App Store pero el usuario está en Android, ese euro está perdido. Te enseñamos a configurarlo bien, qué métricas vigilar y cómo recuperar presupuesto.",
    readTime: "9 min",
    author: authorData,
    coverComponent: <CoverGoogleAdsWrong />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Una de las cosas que más sorprende a los media buyers cuando empiezan a hacer paid social y paid search para apps es descubrir que <strong>una parte enorme del presupuesto se gasta enviando usuarios a la tienda equivocada</strong>. Esto sucede cuando configuras un anuncio con un único destino (típicamente App Store) y olvidas que la mitad de tu audiencia está en Android.
        </p>

        <StatRow stats={[
          { value: "40-60 %", label: "Tráfico Android perdido si apuntas solo a App Store" },
          { value: "0 €", label: "Conversiones de clics a tienda equivocada" },
          { value: "1", label: "Smart link soluciona todo" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El problema técnico</h2>
        <p>
          En Google Ads y Meta Ads tradicionales, al configurar un anuncio puedes elegir destino "App Store" o "Google Play", pero no ambos. Las plataformas tienen campañas específicas para apps (UAC en Google, App Promotion en Meta) que sí enrutan automáticamente al usuario al store correspondiente. Pero esas campañas son distintas a las de búsqueda, display, video o web tráfico.
        </p>
        <p>
          Si usas una campaña estándar con un link de destino, el enrutamiento es tu responsabilidad. Cuando alguien con iPhone clica un anuncio configurado para Google Play, llega a una página que le dice "esta app no está disponible en tu dispositivo". Ese clic ha costado dinero y no genera nada.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Por qué se cuela tanto en las campañas</h2>
        <p>
          Tres motivos principales:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Las plantillas de Google Ads piden una URL</strong> y mucha gente pega la primera que tiene (normalmente App Store o Google Play directamente).</li>
          <li><strong>Las segmentaciones por sistema operativo en display y video son limitadas</strong>, especialmente en Meta donde no puedes segmentar el inventario móvil por OS de forma totalmente fiable.</li>
          <li><strong>El media buyer que monta la campaña a menudo no es el dueño del producto</strong> y asume que el destino correcto es la tienda del fundador (que suele ser iPhone).</li>
        </ol>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">La solución: smart link como destino</h2>
        <p>
          La forma profesional de resolverlo es usar como URL de destino del anuncio un smart link en lugar de un enlace a una tienda concreta. El smart link detecta el User-Agent del usuario y lo redirige automáticamente:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>iPhone → App Store</li>
          <li>Android → Google Play</li>
          <li>Ordenador → tu landing o app web</li>
        </ul>
        <p>
          Esto funciona para todas las redes (Google Ads, Meta, TikTok, LinkedIn, Reddit, X). Solo cambias la URL de destino del anuncio y dejas la audiencia en abierto. Si tu app está disponible en ambas tiendas, no segmentes por sistema operativo.
        </p>

        <Callout>
          Cambiar tus URLs de destino por smart links suele recuperar entre un 30 % y un 50 % del presupuesto que se perdía en clics a tienda equivocada. Es el ROI más rápido que puedes hacer en una semana.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo medir lo que ya estás perdiendo</h2>
        <p>
          Antes de cambiar nada, mide cuánto te cuesta el problema actual. Pasos:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Mira tu campaña actual de Google Ads / Meta y revisa el reporte de dispositivos.</li>
          <li>Identifica qué porcentaje del tráfico viene de iOS y de Android.</li>
          <li>Si tu URL de destino solo apunta a una tienda, calcula: <em>budget × % usuarios del otro OS = presupuesto perdido</em>.</li>
        </ol>
        <p>
          Ejemplo: si gastas 5.000 €/mes en una campaña que envía a App Store y el 50 % de los clics vienen de Android, estás tirando 2.500 €/mes. Ese cálculo solo te lleva 5 minutos pero la diferencia es enorme.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo medir después del cambio</h2>
        <p>
          Una vez tu URL de destino es un smart link, el dashboard te muestra:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Clics totales (deberían bajar al principio porque ya no hay "rebotes").</li>
          <li>Distribución por OS (iOS vs Android vs desktop).</li>
          <li>Coste por clic real (sin contar fugas).</li>
        </ul>
        <p>
          Compáralo con las instalaciones en App Store Connect y Google Play Console durante el mismo período. La conversión clic → instalación debería subir significativamente porque ya no estás contando clics que iban a una tienda incompatible.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Errores comunes al hacer el cambio</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>No actualizar todos los anuncios a la vez</strong>: deja conjuntos viejos con URLs directas y otros con smart link. Hace tus métricas ininteligibles. Unifica el día del cambio.</li>
          <li><strong>No tener URL alternativa para desktop</strong>: si tu campaña recibe tráfico desktop (Google Ads search lo recibe siempre), define una landing como fallback.</li>
          <li><strong>Pánico al ver el CTR bajar</strong>: el CTR puede bajar al principio porque ya no cuentas clics "fáciles" a la tienda incorrecta. Lo que importa es la instalación final, no el CTR.</li>
        </ul>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 5. QR PACKAGING LONG-TAIL ─────────────────────────── */
  {
    slug: "qr-packaging-app-sin-parecer-cupon",
    title: "Cómo poner un QR de descarga en packaging sin que parezca un cupón barato",
    date: "21 de Julio, 2026",
    category: "BRAND",
    excerpt: "Un QR mal colocado convierte un packaging premium en uno de supermercado. Te enseñamos el método de las marcas que mejor lo hacen, dónde ponerlo, cómo medirlo.",
    readTime: "8 min",
    author: authorData,
    coverComponent: <CoverQrPackaging />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          El packaging es una de las superficies de marketing más caras y duraderas que tienes. Cada caja es un anuncio físico por el que tu cliente ya pagó al comprar el producto. Tiene sentido aprovecharlo para impulsar las descargas de tu app, pero la mayoría de marcas lo hace de forma que rompe la experiencia premium.
        </p>

        <StatRow stats={[
          { value: "3×3 cm", label: "Tamaño mínimo recomendado" },
          { value: "1", label: "QR (no dos)" },
          { value: "Interior", label: "Ubicación ganadora" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Los errores más comunes</h2>

        <h3 className="text-[18px] font-bold mt-8 mb-3 tracking-tight">1. Poner dos QR distintos</h3>
        <p>
          El error más visible: imprimir un QR para App Store y otro para Google Play. Doble caos visual, doble explicación necesaria y el lector intuitivamente se queda paralizado eligiendo. Usa siempre un solo QR vinculado a un smart link que detecte el móvil del usuario al escanear.
        </p>

        <h3 className="text-[18px] font-bold mt-8 mb-3 tracking-tight">2. Tamaño y contraste pobres</h3>
        <p>
          Un QR por debajo de 2,5 cm escaneado a distancia falla. Un QR en color sobre una textura compleja también. Para packaging premium, lo más seguro es un QR en negro sobre fondo blanco mate o crema, con un padding visual claro de al menos 5 mm alrededor.
        </p>

        <h3 className="text-[18px] font-bold mt-8 mb-3 tracking-tight">3. El copy de cupón</h3>
        <p>
          "Escanéame" suena a cupón de supermercado. "Escanea para descargar la app" suena a corporate aburrido. Lo que mejor convierte es un beneficio concreto pero corto:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>"Acceso anticipado al próximo drop" – marca de moda.</li>
          <li>"Desbloquea contenido exclusivo" – creador o lifestyle.</li>
          <li>"Tu compra te suma puntos" – ecommerce con loyalty.</li>
          <li>"Activa la garantía en 10 segundos" – producto técnico.</li>
        </ul>

        <Callout>
          La regla: el copy del QR tiene que prometer un valor que el cliente no podía obtener sin la app. Si lo que ofreces ya está en tu web pública, el QR queda como un atajo de marketing más, no como una invitación al ecosistema.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Dónde colocar el QR en el packaging</h2>
        <p>
          La ubicación importa tanto como el copy. Cuatro localizaciones ordenadas de mejor a peor:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Solapa interior de la caja</strong>: el cliente la ve justo cuando termina de desempaquetar y está en pico emocional. Ganadora absoluta.</li>
          <li><strong>Inserto independiente</strong>: una tarjeta de bienvenida con QR. Convierte muy bien pero tiene coste extra de impresión.</li>
          <li><strong>Parte trasera del producto</strong>: funciona si el QR no compite con información obligatoria (ingredientes, garantías).</li>
          <li><strong>Exterior delantero</strong>: rompe la identidad de marca. Solo si el QR es <em>parte</em> del diseño (raro y arriesgado).</li>
        </ol>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo medir el ROI del QR</h2>
        <p>
          Sin medición, todo este trabajo es a ciegas. Usa un smart link específico para packaging, distinto del de redes sociales. Y si imprimes varias líneas de producto, un smart link por línea.
        </p>
        <p>
          Cosas a medir cada mes:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Escaneos totales (clics en el smart link con fuente "qr").</li>
          <li>Distribución por dispositivo iOS / Android (te dice quién es tu cliente real).</li>
          <li>Conversión a instalación (compara con descargas en App Store Connect).</li>
          <li>Hora pico de escaneos (te dice si abren el packaging al recibirlo o días después).</li>
        </ul>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Detalles que separan a las marcas premium</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>QR debossing</strong> en cajas premium: el QR está grabado, no impreso. Cuesta más pero queda elegantísimo.</li>
          <li><strong>Sello cera</strong>: el QR oculto bajo un sello de cera que el cliente rompe. Experiencia ritual.</li>
          <li><strong>QR animado en pantalla</strong>: si tu producto incluye una pantalla pequeña (electrónica de consumo), el QR puede ser dinámico.</li>
        </ul>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 6. SMART VS DEEP LINK HEAD ─────────────────────────── */
  {
    slug: "smart-link-vs-deep-link",
    title: "Smart link vs deep link: qué son y cuándo usar cada uno",
    date: "25 de Julio, 2026",
    category: "EDUCACIÓN",
    excerpt: "Dos conceptos que a menudo se confunden. Te explicamos las diferencias en lenguaje claro, con ejemplos reales y te ayudamos a decidir qué necesitas según tu caso.",
    readTime: "10 min",
    author: authorData,
    coverComponent: <CoverSmartVsDeep />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          "Smart link" y "deep link" son términos que se usan a menudo de forma intercambiable, pero significan cosas distintas. Confundirlos puede llevarte a invertir tiempo y dinero en una solución técnica que no necesitas, o peor, a no implementar la solución que sí te haría falta.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Qué es un smart link</h2>
        <p>
          Un smart link es una URL que detecta el dispositivo de quien la abre y lo redirige al destino correcto:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Si el usuario está en iPhone → App Store.</li>
          <li>Si está en Android → Google Play.</li>
          <li>Si está en ordenador → URL alternativa (landing o app web).</li>
        </ul>
        <p>
          Toda la lógica vive en el servidor del proveedor del smart link, no dentro de tu app. Ventajas:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>No requiere instalar nada en tu app.</li>
          <li>Funciona el primer día.</li>
          <li>Sirve para campañas, packaging, QR y cualquier sitio donde puedas pegar una URL.</li>
          <li>Estadísticas por dispositivo y fuente sin SDK.</li>
        </ul>
        <p>
          Es lo que normalmente quieres si tu objetivo es <strong>conseguir más descargas o redirigir tráfico de marketing</strong>.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Qué es un deep link</h2>
        <p>
          Un deep link es una URL que abre directamente una pantalla específica <em>dentro</em> de tu app, no la pantalla inicial. Por ejemplo, un deep link puede abrir:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>El carrito de la compra.</li>
          <li>El perfil de un producto concreto.</li>
          <li>Una conversación específica.</li>
          <li>Un screen de ajustes profundo.</li>
        </ul>
        <p>
          Siempre y cuando el usuario ya tenga la app instalada. Si no la tiene, el deep link puede fallar o (si está bien configurado) llevarle a la tienda para instalarla y luego abrir la pantalla correcta tras la instalación (esto último se llama "deferred deep link" y es lo más complejo).
        </p>

        <Callout>
          Smart link = "te llevo a la tienda correcta para descargar". Deep link = "te llevo a una pantalla concreta dentro de la app que ya tienes".
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Configuración técnica</h2>
        <p>
          Un smart link se configura en minutos: pegas las URLs de tienda y la fallback. Punto.
        </p>
        <p>
          Un deep link requiere:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>iOS</strong>: configurar Universal Links con un archivo <code>apple-app-site-association</code> en tu dominio, asociarlo con la app en Xcode, y manejar el routing dentro del código.</li>
          <li><strong>Android</strong>: configurar App Links con un archivo <code>assetlinks.json</code>, asociarlo con la app en el manifest, y manejar el routing.</li>
          <li>Probarlo en distintas versiones de OS porque hay diferencias.</li>
        </ul>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cuándo necesitas cada uno</h2>
        <p>
          Decisión sencilla:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-black/10 rounded-xl">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-3 font-bold">Necesidad</th>
                <th className="p-3 font-bold">Solución</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/5"><td className="p-3">Bio de Instagram, packaging, QR, anuncios paid</td><td className="p-3 font-bold text-emerald-700">Smart link</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Botón en mi web "Descarga la app"</td><td className="p-3 font-bold text-emerald-700">Smart link</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Email de notificación → abrir el chat de pedido</td><td className="p-3 font-bold text-purple-700">Deep link</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Compartir un producto entre usuarios de la app</td><td className="p-3 font-bold text-purple-700">Deep link</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Magic link de login</td><td className="p-3 font-bold text-purple-700">Deep link</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          La mayoría de empresas necesitan smart links el 80 % del tiempo. Los deep links son para casos avanzados de retención y growth in-app, no para distribución inicial.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">¿Se pueden combinar?</h2>
        <p>
          Sí, y es lo que hacen las empresas maduras:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Smart link como destino de marketing</strong> (adquisición de nuevos usuarios).</li>
          <li><strong>Deep link como destino de notificaciones in-app y email transaccional</strong> (re-engagement de usuarios existentes).</li>
        </ul>
        <p>
          Cada uno cubre un escenario distinto y se complementan. No tienes que elegir, pero <em>sí</em> tienes que priorizar – y normalmente el smart link es el primer paso.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Mitos comunes</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>"Necesito un deep link para mi anuncio de Facebook"</strong> → falso. Para anuncios, un smart link es suficiente y más simple.</li>
          <li><strong>"Los deep links sustituyen a los smart links"</strong> → falso. Resuelven problemas distintos.</li>
          <li><strong>"Branch.io es el único que hace deep links"</strong> → falso. Universal Links de Apple y App Links de Android son nativos y gratuitos.</li>
        </ul>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 7. ATTRIBUTION HEAD ─────────────────────────── */
  {
    slug: "atribucion-descargas-apps-medir-canal-real",
    title: "Atribución de descargas de apps: cómo medir el canal real que las trae",
    date: "29 de Julio, 2026",
    category: "ANALÍTICA",
    excerpt: "App Store Connect y Google Play Console te dicen cuántas descargas tienes, pero no de dónde vienen. Aquí tienes el método completo paso a paso.",
    readTime: "11 min",
    author: authorData,
    coverComponent: <CoverAtribucion />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          El problema más común al promocionar una app es no saber qué canal trae las descargas. App Store Connect te dice cuántas tienes en total, pero no de dónde vienen. Y sin esa información, no puedes decidir a qué canal asignar más presupuesto. Marketing a ciegas.
        </p>

        <StatRow stats={[
          { value: "0", label: "Atribución por canal nativa en las tiendas" },
          { value: "8", label: "Canales típicos a separar" },
          { value: "1", label: "Smart link por canal" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Por qué la atribución es difícil en apps</h2>
        <p>
          A diferencia de la web, donde tienes UTMs y Google Analytics rastreando todo, las tiendas de apps son una caja negra. Cuando un usuario clica un anuncio y termina instalando la app, la información del origen del clic se pierde por el camino porque las tiendas no pasan parámetros al SDK del fabricante.
        </p>
        <p>
          Históricamente la industria ha resuelto esto con SDKs de atribución (AppsFlyer, Adjust, Branch). Estos hacen "device fingerprinting" o usan SKAdNetwork de Apple para reconciliar el clic con la instalación. Funciona bien pero es caro y complejo.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">La alternativa: atribución por smart link</h2>
        <p>
          Hay un método más simple que funciona bien para el 80 % de los equipos: crear un smart link distinto por canal. Cada uno mide sus clics por separado y aplicas la misma tasa de conversión esperada (18-25 % en categoría apps) para obtener una estimación justa de instalaciones por canal.
        </p>
        <p>
          Esta cifra no es exacta usuario a usuario, pero <strong>es comparable</strong>, que es lo que necesitas para tomar decisiones de presupuesto.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Estructura recomendada de smart links</h2>
        <p>
          Una buena nomenclatura ahorra horas más tarde. Estructura:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-black/10 rounded-xl">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-3 font-bold">Canal</th>
                <th className="p-3 font-bold">Slug sugerido</th>
                <th className="p-3 font-bold">Dónde se usa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/5"><td className="p-3">Instagram orgánico</td><td className="p-3"><code>tuapp-ig</code></td><td className="p-3">Bio, stories propias</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Instagram paid</td><td className="p-3"><code>tuapp-ig-paid</code></td><td className="p-3">Ads Meta</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">TikTok</td><td className="p-3"><code>tuapp-tt</code></td><td className="p-3">Bio y video</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">YouTube</td><td className="p-3"><code>tuapp-yt</code></td><td className="p-3">Descripciones</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Email</td><td className="p-3"><code>tuapp-email</code></td><td className="p-3">Newsletter</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">QR packaging</td><td className="p-3"><code>tuapp-pkg</code></td><td className="p-3">QR en cajas</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">QR evento</td><td className="p-3"><code>tuapp-evt</code></td><td className="p-3">QR en stands</td></tr>
              <tr className="border-t border-black/5"><td className="p-3">Web</td><td className="p-3"><code>tuapp-web</code></td><td className="p-3">CTA en home</td></tr>
            </tbody>
          </table>
        </div>

        <Callout>
          Para campañas específicas (lanzamiento, Black Friday, colaboración con creador X), añade un sufijo más: <code>tuapp-ig-bf</code>, <code>tuapp-marina</code>, etc. Cada uno mide por separado.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo cruzar smart links con descargas reales</h2>
        <p>
          Tienes dos fuentes de datos:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li><strong>Smart link dashboard</strong>: clics por canal, por dispositivo, por período.</li>
          <li><strong>App Store Connect + Google Play Console</strong>: instalaciones totales por día.</li>
        </ol>
        <p>
          Para estimar instalaciones por canal:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Toma los clics de cada smart link en un período (ej. semana).</li>
          <li>Resta rebotes (~18 %).</li>
          <li>Multiplica por la tasa de conversión típica de tu tienda (18-25 %).</li>
          <li>Suma todas las estimaciones por canal y compáralo con la cifra real de App Store Connect.</li>
          <li>Si el total estimado es similar al real (±15 %), tu modelo está calibrado. Si no, ajusta la tasa de conversión.</li>
        </ol>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cuándo sí necesitas un SDK de atribución</h2>
        <p>
          El método del smart link por canal cubre el 80 % de los casos. Llega un momento en que necesitas más:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Cuando gastas más de 50.000 €/mes en paid y necesitas optimización automática de pujas en Meta y TikTok.</li>
          <li>Cuando haces colaboraciones con redes de afiliados grandes que exigen tracking exacto.</li>
          <li>Cuando tu equipo de analítica necesita modelos de mix marketing más sofisticados.</li>
        </ul>
        <p>
          Antes de esos casos, el smart link por canal hace todo lo que necesitas con cero código y coste mínimo.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Errores comunes en atribución sin SDK</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Reutilizar el mismo smart link en varios canales</strong>: mata la atribución. Uno por canal, sin excepciones.</li>
          <li><strong>No nombrar los smart links</strong>: dentro de tres meses no sabrás cuál era cuál. Pon nombres claros desde el día uno.</li>
          <li><strong>Olvidar los QR físicos</strong>: la fuente "qr" se mide igual que las digitales – usa smart links por QR también.</li>
          <li><strong>Comparar canales con períodos distintos</strong>: si comparas el smart link de Instagram en su mes pico contra el de TikTok en agosto, el dato está sesgado. Usa siempre la misma ventana.</li>
        </ul>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 8. INSTAGRAM BIO HEAD ─────────────────────────── */
  {
    slug: "bio-instagram-app-plantillas-descargas",
    title: "Las plantillas de bio de Instagram que más descargas de app generan",
    date: "2 de Agosto, 2026",
    category: "REDES SOCIALES",
    excerpt: "Probadas con miles de cuentas. Te damos 5 fórmulas de bio, con ejemplos reales, dónde colocar cada elemento y el error que arruina cualquiera de ellas.",
    readTime: "7 min",
    author: authorData,
    coverComponent: <CoverBioInstagram />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          La bio de Instagram tiene 150 caracteres. Es uno de los activos más caros de tu marca: la ven todos los visitantes de tu perfil. Y sin embargo, la mayoría de cuentas de apps tienen una bio que no convierte. Aquí tienes 5 fórmulas que sí lo hacen.
        </p>

        <StatRow stats={[
          { value: "150", label: "Caracteres disponibles" },
          { value: "1", label: "Link permitido" },
          { value: "2-3 seg", label: "Para enganchar al visitante" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Fórmula 1: Problema + Solución + CTA</h2>
        <p>
          Estructura: una frase corta sobre el dolor del usuario, una frase sobre lo que tu app resuelve, una emoji-flecha apuntando al enlace.
        </p>
        <p className="bg-slate-50 border border-slate-200 rounded-2xl p-4 italic">
          "¿Te cuesta dormir? La app que te ayuda a relajarte en 7 noches. 👇"
        </p>
        <p>
          <strong>Por qué funciona</strong>: la pregunta interpela. Si el dolor es tuyo, sigues leyendo. Si no, te vas – pero los que se quedan son altamente cualificados.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Fórmula 2: Cifra social</h2>
        <p>
          Estructura: número de usuarios + categoría + CTA. Funciona porque la prueba social baja la fricción a instalar.
        </p>
        <p className="bg-slate-50 border border-slate-200 rounded-2xl p-4 italic">
          "+200k personas ya entrenan con nosotros 💪 Descarga 👇"
        </p>
        <p>
          <strong>Cuidado</strong>: si pones cifras infladas y luego en la tienda apareces con 12 reviews, pierdes credibilidad. La cifra debe ser real o verificable.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Fórmula 3: Resultado en X días</h2>
        <p>
          Estructura: promesa específica + plazo + CTA. La especificidad del plazo aumenta la credibilidad.
        </p>
        <p className="bg-slate-50 border border-slate-200 rounded-2xl p-4 italic">
          "Aprende inglés conversacional en 21 días. Sin clases. 👇"
        </p>
        <p>
          <strong>Por qué funciona</strong>: el cerebro responde mejor a "21 días" que a "rápido". Es concreto, mensurable, alcanzable. Y "sin clases" elimina la objeción anticipada.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Fórmula 4: Lista numerada</h2>
        <p>
          Estructura: 3 bullets con lo que la app hace. Lectura escaneable, perfecta para móvil.
        </p>
        <p className="bg-slate-50 border border-slate-200 rounded-2xl p-4 italic">
          🍳 Recetas en 15 min<br/>
          🥗 Sin azúcar añadida<br/>
          📱 Lista de la compra automática<br/>
          👇
        </p>
        <p>
          <strong>Tip</strong>: cada emoji ayuda a separar visualmente. Pero no más de 3-4 bullets, o pierde el scaneo.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Fórmula 5: Pregunta directa</h2>
        <p>
          Estructura: una pregunta cuya respuesta sea claramente "sí" + CTA. Funciona si la pregunta refleja un deseo claro de tu audiencia.
        </p>
        <p className="bg-slate-50 border border-slate-200 rounded-2xl p-4 italic">
          "¿Quieres ahorrar 200€/mes en gasolina? 👇"
        </p>
        <p>
          <strong>Por qué funciona</strong>: una pregunta directa con respuesta obvia crea un compromiso mental inmediato. El usuario ya ha dicho "sí" antes de tocar el link.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El error que arruina cualquier fórmula</h2>
        <p>
          Sea cual sea la fórmula que elijas, hay un error que mata la conversión: <strong>poner dos URLs (App Store y Google Play) o un Linktree</strong>. Cualquiera de los dos añade fricción innecesaria.
        </p>
        <p>
          Pon una sola URL corta que detecte el móvil del usuario y lo lleve directo a su tienda. Cada paso que añades baja la conversión entre un 8 % y un 15 %. Linktree puede comerte el 40 % del funnel sin que te enteres.
        </p>

        <Callout>
          La mejor bio de Instagram para apps: 1 fórmula + 1 emoji-flecha + 1 smart link. Punto.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Cómo probarlo en tu cuenta</h2>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Anota tus métricas baseline: clics actuales en tu link de bio durante los últimos 14 días.</li>
          <li>Cambia tu bio por una de las 5 fórmulas.</li>
          <li>Asegúrate de que el link de bio es un smart link, no un Linktree ni un link directo a App Store/Google Play.</li>
          <li>Mide los siguientes 14 días.</li>
          <li>Si el lift es claro (&gt;20 %), quédate. Si no, prueba otra fórmula.</li>
        </ol>
        <p>
          En 6 semanas habrás validado las 5 fórmulas y tendrás datos para decidir qué patrón funciona mejor con <em>tu</em> audiencia.
        </p>

        <CtaBlock />
      </div>
    ),
  },

  /* ─────────────────────────── 9. SAAS LAUNCH HEAD ─────────────────────────── */
  {
    slug: "lanzar-app-saas-sin-desperdiciar-presupuesto",
    title: "Cómo lanzar la app móvil de tu SaaS sin desperdiciar tráfico ni presupuesto",
    date: "6 de Agosto, 2026",
    category: "SAAS",
    excerpt: "Lanzar la versión móvil de un SaaS es delicado. Mal hecho pierdes a tus mejores leads. Te damos el playbook completo paso a paso con los errores típicos.",
    readTime: "12 min",
    author: authorData,
    coverComponent: <CoverSaaSLaunch />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Tu SaaS lleva años funcionando como web app. Por fin tienes la versión móvil lista. El problema: tu audiencia ya está acostumbrada a entrar desde el navegador, tu funnel de adquisición está construido para la web, y tu equipo no tiene experiencia distribuyendo apps móviles. Si lanzas la app sin pensarlo, te arriesgas a romper conversiones que ya funcionaban.
        </p>

        <StatRow stats={[
          { value: "1", label: "Smart link por canal de adquisición" },
          { value: "Día 7", label: "Métrica clave: activación" },
          { value: "5 pasos", label: "Onboarding móvil máximo" },
        ]} />

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Error 1: forzar la descarga a usuarios desktop</h2>
        <p>
          La mayoría de SaaS tienen tráfico mayoritariamente desktop. Si en cada página añades un CTA "Descarga la app" agresivo, estás distrayendo a los usuarios desktop de la conversión a su flujo natural (registro web). El resultado: menos signups desktop sin un aumento equivalente de descargas.
        </p>
        <p>
          La forma correcta: usa un smart link como destino de los CTAs móviles. En móvil envía a App Store o Google Play. En desktop envía a tu landing de signup web. <strong>Mismo botón, comportamiento diferente según dispositivo</strong>. Sin duplicar campañas, sin A/B tests innecesarios.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Error 2: lanzar sin métricas claras</h2>
        <p>
          Sin separar el origen de las instalaciones desde el primer día, no sabrás si los usuarios móviles vienen de tu newsletter, de tu blog, del soporte, de una integración o de fuera. Crea un smart link distinto para cada canal de adquisición desde el día uno. Te ahorra meses de análisis a posteriori.
        </p>
        <p>
          Para SaaS B2B, también añade smart links específicos para tus equipos de sales y customer success. Cuando un AE manda la app a un prospect tras la demo, queremos saber si esa instalación se materializó.
        </p>

        <Callout>
          La métrica vanity es "número de descargas". La métrica que importa para SaaS es "usuarios activos en la app a día 7". Cualquier playbook que no mida la segunda está incompleto.
        </Callout>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Error 3: copiar el onboarding web tal cual</h2>
        <p>
          El onboarding móvil necesita ser más corto. Una app móvil que pide configurar workspace, invitar equipo y conectar 5 integraciones en el primer flujo pierde a la mitad de los usuarios. Reduce el onboarding inicial a "crea cuenta y haz tu primera acción". El resto se puede hacer después.
        </p>
        <p>
          Patrón recomendado:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Pantalla de bienvenida con propuesta de valor (1 pantalla).</li>
          <li>Signup con email/Google (1 pantalla).</li>
          <li>Pregunta clave de personalización (1 pantalla, opcional).</li>
          <li>Primera acción aspiracional dentro de la app.</li>
        </ol>
        <p>
          Configuraciones avanzadas, invitación a equipo e integraciones se desbloquean después o se ofrecen contextualmente.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Error 4: no medir la calidad de las instalaciones</h2>
        <p>
          Las descargas vanity no te dicen nada. Lo que importa para SaaS es la cadena:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>Descarga → 100 %.</li>
          <li>Apertura → debería ser 80-90 %.</li>
          <li>Signup → 60-75 %.</li>
          <li>Primera acción → 50-65 %.</li>
          <li>Activación a día 7 → 30-45 %.</li>
        </ol>
        <p>
          Si tu cadena pierde mucho en algún paso concreto, ahí está tu problema, no en "tener pocas descargas". Cruza estos datos con la fuente del smart link para saber qué canal trae usuarios que sí se activan.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Error 5: ignorar el deep linking desde web</h2>
        <p>
          Tu web ya recibe mucho tráfico desde los emails que mandas a tus clientes existentes. Cuando un usuario web abre un email con un enlace a "tu workspace", debería:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Si está en desktop → abrir la web app directamente en el workspace correcto.</li>
          <li>Si está en móvil y tiene la app → abrir la app en la pantalla correcta (deep link).</li>
          <li>Si está en móvil y no tiene la app → llevar a la tienda y luego a la pantalla correcta tras instalar (deferred deep link).</li>
        </ul>
        <p>
          Esto requiere combinar smart link (para nuevos usuarios) con deep link (para los que ya tienen la app). No es trivial pero es lo que separa una app móvil de SaaS bien lanzada de una mediocre.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Error 6: lanzar sin canal específico para clientes existentes</h2>
        <p>
          Tus clientes actuales son la mejor fuente de adopción inicial. Pero no descubrirán la app por sí solos. Necesitas:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Banner en la web app desktop animando a descargar la móvil (con smart link).</li>
          <li>Email a la base de clientes anunciando el lanzamiento.</li>
          <li>Aviso en notificaciones in-app web.</li>
          <li>Mención en el changelog o release notes.</li>
        </ul>
        <p>
          Cada uno con su propio smart link, así sabes exactamente qué canal interno trajo más adopciones.
        </p>

        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El playbook resumido</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li>Smart link por canal desde día uno.</li>
          <li>CTA secundario en desktop, primario en móvil.</li>
          <li>Onboarding móvil corto: signup + 1ª acción.</li>
          <li>Métrica clave: activación a día 7, no descargas.</li>
          <li>Deep link para usuarios existentes; smart link para nuevos.</li>
          <li>Comunicar el lanzamiento a la base actual antes que al exterior.</li>
        </ul>
        <p>
          Y nunca mandes a los prospects a elegir entre App Store y Google Play – el smart link decide por ellos.
        </p>

        <CtaBlock />
      </div>
    ),
  },
];
