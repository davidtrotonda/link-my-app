import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PremiumNavbar, FinalFooter, SimulationStep1, SimulationStep2, SimulationStep3, animationStyles } from "./LandingVisuals";
import { ArrowRight, ChevronDown, Check, Copy, Link2, MousePointer2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";
import { englishBlogOverrides } from "./lib/blogOverridesEn.jsx";
import { frenchBlogOverrides } from "./lib/blogOverridesFr.jsx";
import { moreBlogPosts } from "./MoreBlogs";
import { moreBlogPosts2 } from "./MoreBlogs2.jsx";
import { agentGuideBlogPost } from "./MoreBlogs3.jsx";
import { getDateForSlugLabel, getDateForSlugISO } from "./lib/blogDates.js";

const authorData = {
  name: "David Trotonda",
  role: "CEO de SkeilApps",
  img: "https://skeilapps.com/wp-content/uploads/2025/12/IMG_20251213_151012-4.webp"
};

const OriginalCover1 = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#f8f9fa] flex items-center justify-center p-4 border border-black/5 group">
    <style>{`
       @keyframes clickSequence {
         0%, 15% { background-color: #e0f2fe; }
         20%, 30% { background-color: #bae6fd; transform: scale(0.95); }
         35%, 100% { background-color: #e0f2fe; transform: scale(1); }
       }
       @keyframes scanPopup {
         0%, 25% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
         30%, 45% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
         50%, 65% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); border-color: #10b981; }
         70%, 100% { opacity: 0; transform: translate(-50%, -40%) scale(0.9); }
       }
       @keyframes radarSweep {
         0% { left: -100%; }
         100% { left: 200%; }
       }
       @keyframes textChange {
         0%, 45% { opacity: 1; }
         50%, 100% { opacity: 0; }
       }
       @keyframes textChange2 {
         0%, 45% { opacity: 0; }
         50%, 100% { opacity: 1; }
       }
    `}</style>
    <div className="relative w-full max-w-[210px] h-full rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-50">
        <div className="text-[10px] font-black text-slate-800 flex items-center gap-1">skeilapps <span className="text-[6px]">▼</span></div>
        <div className="flex flex-col gap-[3px]"><div className="w-3 h-[2px] bg-slate-800 rounded-full"></div><div className="w-3 h-[2px] bg-slate-800 rounded-full"></div><div className="w-3 h-[2px] bg-slate-800 rounded-full"></div></div>
      </div>
      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="w-12 h-12 shrink-0 rounded-full bg-black p-[2px] border-2 border-slate-200">
          <img src="https://skeilapps.com/wp-content/uploads/2025/12/icono-SkeilEcom.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="flex gap-3 text-center">
          <div className="flex flex-col items-center"><span className="text-[11px] font-black leading-none text-slate-800">142</span></div>
          <div className="flex flex-col items-center"><span className="text-[11px] font-black leading-none text-slate-800">12K</span></div>
          <div className="flex flex-col items-center"><span className="text-[11px] font-black leading-none text-slate-800">240</span></div>
        </div>
      </div>
      <div className="px-4 pt-2 pb-2 relative z-10 text-[8px] leading-[1.3] text-slate-700">
        <div className="font-black text-slate-900 text-[9px] mb-0.5">SkeilApps Agency</div>
        <div>Descarga nuestra app abajo 👇</div>
        <div className="relative inline-block mt-1">
          <div className="relative z-10 flex items-center gap-1 rounded-md px-2 py-1 text-[8px] font-bold text-[#0284c7] transition-all bg-[#e0f2fe]" style={{ animation: "clickSequence 6s infinite" }}>
            <Link2 size={8} className="text-[#0284c7]" />
            <span>link-my.app/descarga</span>
          </div>
          <div className="absolute z-30 text-slate-800 drop-shadow-xl pointer-events-none" style={{ top: "50%", left: "50%", marginTop: "-2px", animation: "cursor-click-ig 6s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}>
            <MousePointer2 size={16} className="fill-black stroke-white stroke-[2]" />
          </div>
        </div>
      </div>
      
      {/* Smart Device Detection Popup */}
      <div className="absolute top-1/2 left-1/2 w-[150px] bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-2 border-blue-100 flex flex-col items-center p-4 text-center z-40 overflow-hidden" style={{ animation: "scanPopup 6s infinite" }}>
         <div className="absolute inset-0 w-[20px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent skew-x-12" style={{ animation: "radarSweep 1.5s infinite" }}></div>
         
         <div className="relative w-8 h-8 rounded-full flex items-center justify-center mb-2">
           <div className="absolute inset-0 border-2 border-blue-400 border-dashed rounded-full" style={{ animation: "spin 3s linear infinite" }}></div>
           <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" style={{ animation: "textChange 6s infinite" }}/><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.76.08 3.03.88 3.82 2.24-3.22 1.93-2.6 6.07.5 7.35-.74 1.48-1.57 2.87-2.99 3.34zM12.03 7.25c-.15-1.92 1.63-3.66 3.55-3.69.29 2.07-1.97 3.82-3.55 3.69z" style={{ animation: "textChange2 6s infinite" }}/></svg>
         </div>
         
         <div className="relative w-full h-[14px]">
           <div className="absolute inset-0 text-[10px] font-black text-blue-600 leading-tight" style={{ animation: "textChange 6s infinite" }}>Analizando...</div>
           <div className="absolute inset-0 text-[10px] font-black text-emerald-500 leading-tight" style={{ animation: "textChange2 6s infinite" }}>¡iPhone detectado!</div>
         </div>
         <div className="text-[7px] text-gray-500 leading-tight mt-1">Redirigiendo a App Store</div>
      </div>
    </div>
  </div>
);

const OriginalCover2 = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#f8f9fa] flex items-center justify-center p-4 border border-black/5 group">
     <style>{`
       @keyframes signalPulse {
         0%, 20% { transform: scale(0.8); opacity: 0; }
         30% { transform: scale(1.2); opacity: 1; }
         40%, 100% { transform: scale(1.5); opacity: 0; }
       }
       @keyframes phoneActivateL {
         0%, 35% { transform: translateY(0); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border-color: #e2e8f0; }
         40%, 60% { transform: translateY(-10px); box-shadow: 0 20px 25px -5px rgb(59 130 246 / 0.3); border-color: #3b82f6; }
         65%, 100% { transform: translateY(0); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border-color: #e2e8f0; }
       }
       @keyframes phoneActivateR {
         0%, 65% { transform: translateY(0); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border-color: #e2e8f0; }
         70%, 90% { transform: translateY(-10px); box-shadow: 0 20px 25px -5px rgb(16 185 129 / 0.3); border-color: #10b981; }
         95%, 100% { transform: translateY(0); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border-color: #e2e8f0; }
       }
       @keyframes screenRevealL {
         0%, 35% { opacity: 0; transform: scale(0.95); }
         40%, 60% { opacity: 1; transform: scale(1); }
         65%, 100% { opacity: 0; transform: scale(0.95); }
       }
       @keyframes screenRevealR {
         0%, 65% { opacity: 0; transform: scale(0.95); }
         70%, 90% { opacity: 1; transform: scale(1); }
         95%, 100% { opacity: 0; transform: scale(0.95); }
       }
       @keyframes cursorClick2 {
         0%, 15% { transform: translate(20px, 20px); opacity: 0; }
         18% { transform: translate(0, 0); opacity: 1; }
         22% { transform: translate(0, 0) scale(0.9); opacity: 1; }
         25%, 100% { transform: translate(20px, 20px); opacity: 0; }
       }
       @keyframes clickRipple2 {
         0%, 20% { transform: scale(0); opacity: 0; }
         22% { transform: scale(1); opacity: 1; }
         30%, 100% { transform: scale(2); opacity: 0; }
       }
     `}</style>
     
     {/* Smart Link URL Bar */}
     <div className="absolute top-6 w-[200px] bg-white rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-slate-100 p-2 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 px-2">
           <Link2 size={14} className="text-[#3b82f6]" />
           <span className="text-[11px] font-black text-slate-800 tracking-tight">link-my.app/app</span>
        </div>
        <div className="relative w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
           <ArrowRight size={12} className="text-white" />
           {/* Click interaction */}
           <div className="absolute -bottom-2 -right-2 text-slate-800 z-30 drop-shadow-md" style={{ animation: "cursorClick2 4s infinite" }}>
             <MousePointer2 size={14} className="fill-black stroke-white" />
           </div>
           <div className="absolute inset-0 bg-blue-400 rounded-full z-0" style={{ animation: "clickRipple2 4s infinite" }}></div>
        </div>
        
        {/* Signal ripples */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-[3px] border-blue-400" style={{ animation: "signalPulse 4s infinite" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-[3px] border-emerald-400" style={{ animation: "signalPulse 4s infinite 2s" }}></div>
     </div>

     {/* Devices Container */}
     <div className="w-full h-full mt-12 flex items-end justify-center gap-6 px-4 pb-2 z-10">
       
       {/* iPhone Device */}
       <div className="relative w-20 h-[110px] bg-white rounded-[14px] border-[3px] border-slate-200 shadow-[0_10px_20px_rgba(0,0,0,0.05)] flex flex-col items-center p-1.5 transition-all" style={{ animation: "phoneActivateL 4s infinite" }}>
          <div className="w-6 h-1 bg-slate-200 rounded-full mb-1.5"></div>
          <div className="w-full flex-1 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center p-2 relative overflow-hidden">
             
             {/* Apple Logo SVG Placeholder */}
             <div className="flex-1 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
             </div>

             {/* Screen Overlay App Store */}
             <div className="absolute inset-0 bg-[#0f172a] p-2 flex flex-col items-center transition-all duration-300" style={{ animation: "screenRevealL 4s infinite" }}>
                <div className="w-full flex items-center gap-1 mb-2">
                   <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center"><div className="w-2 h-2 border-[1.5px] border-white rounded-sm"></div></div>
                   <div className="flex-1"><div className="w-full h-1 bg-slate-700 rounded mb-0.5"></div><div className="w-2/3 h-1 bg-slate-700 rounded"></div></div>
                </div>
                <div className="w-12 h-4 bg-blue-600 rounded-full flex items-center justify-center mb-2"><span className="text-[5px] font-bold text-white tracking-widest">GET</span></div>
                <div className="w-full h-10 bg-slate-800 rounded-md"></div>
             </div>
          </div>
       </div>

       {/* Android Device */}
       <div className="relative w-20 h-[110px] bg-white rounded-[14px] border-[3px] border-slate-200 shadow-[0_10px_20px_rgba(0,0,0,0.05)] flex flex-col items-center p-1.5 transition-all" style={{ animation: "phoneActivateR 4s infinite" }}>
          <div className="w-6 h-1 bg-slate-200 rounded-full mb-1.5"></div>
          <div className="w-full flex-1 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center p-2 relative overflow-hidden">
             
             {/* Android Logo SVG Placeholder */}
             <div className="flex-1 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.76.08 3.03.88 3.82 2.24-3.22 1.93-2.6 6.07.5 7.35-.74 1.48-1.57 2.87-2.99 3.34zM12.03 7.25c-.15-1.92 1.63-3.66 3.55-3.69.29 2.07-1.97 3.82-3.55 3.69z"/></svg>
             </div>

             {/* Screen Overlay Google Play */}
             <div className="absolute inset-0 bg-[#f8fafc] border-t-[3px] border-slate-200 p-2 flex flex-col items-center transition-all duration-300" style={{ animation: "screenRevealR 4s infinite" }}>
                <div className="w-full flex items-center gap-1 mb-2">
                   <div className="w-4 h-4 bg-emerald-100 rounded flex items-center justify-center"><div className="w-2 h-2 bg-emerald-500 rounded-sm transform rotate-45"></div></div>
                   <div className="flex-1"><div className="w-full h-1 bg-slate-200 rounded mb-0.5"></div><div className="w-2/3 h-1 bg-slate-200 rounded"></div></div>
                </div>
                <div className="w-12 h-4 bg-emerald-500 rounded-full flex items-center justify-center mb-2"><span className="text-[5px] font-bold text-white tracking-widest">INSTALL</span></div>
                <div className="w-full h-10 bg-slate-100 rounded-md"></div>
             </div>
          </div>
       </div>

     </div>

     {/* Connection Lines */}
     <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 300 200">
        <path d="M150 45 Q100 80 80 100" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M150 45 Q200 80 220 100" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
     </svg>
  </div>
);

const OriginalCover3 = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#f8f9fa] flex items-center justify-center p-4 border border-black/5 group">
     <style>{`
       @keyframes drawLineBad {
         0%, 10% { stroke-dashoffset: 200; }
         40%, 100% { stroke-dashoffset: 0; }
       }
       @keyframes drawLineGood {
         0%, 10% { stroke-dashoffset: 200; }
         50%, 100% { stroke-dashoffset: 0; }
       }
       @keyframes showDotBad {
         0%, 38% { opacity: 0; transform: scale(0); }
         40%, 100% { opacity: 1; transform: scale(1); }
       }
       @keyframes showDotGood {
         0%, 48% { opacity: 0; transform: scale(0); }
         50%, 100% { opacity: 1; transform: scale(1); }
       }
       @keyframes moneyFloat {
         0%, 45% { transform: translateY(0); opacity: 0; }
         50% { opacity: 1; }
         80% { transform: translateY(-20px); opacity: 1; }
         100% { transform: translateY(-25px); opacity: 0; }
       }
       @keyframes moneyLoss {
         0%, 35% { transform: translateY(0); opacity: 0; }
         40% { opacity: 1; }
         80% { transform: translateY(20px); opacity: 1; }
         100% { transform: translateY(25px); opacity: 0; }
       }
     `}</style>
     
     {/* Analytics Dashboard Mockup */}
     <div className="w-full max-w-[240px] bg-white rounded-[16px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-4 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
           <div>
              <div className="text-[13px] font-black text-slate-800 tracking-tight">Tasa de Conversión</div>
              <div className="text-[9px] text-slate-500 font-medium">Últimos 30 días</div>
           </div>
           <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div><span className="text-[8px] font-bold text-slate-700">Smart Link</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="text-[8px] font-bold text-slate-500">2 Enlaces</span></div>
           </div>
        </div>

        {/* Chart Area */}
        <div className="relative h-[90px] w-full border-l-[1.5px] border-b-[1.5px] border-slate-200">
           {/* Grid lines */}
           <div className="absolute top-[25%] w-full border-t border-slate-100 border-dashed"></div>
           <div className="absolute top-[50%] w-full border-t border-slate-100 border-dashed"></div>
           <div className="absolute top-[75%] w-full border-t border-slate-100 border-dashed"></div>

           {/* Lines */}
           <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 80" preserveAspectRatio="none">
              {/* Bad Line (drops off early) */}
              <path d="M0 20 Q 20 20, 30 65 T 100 75" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="200" strokeDashoffset="200" style={{ animation: "drawLineBad 5s cubic-bezier(0.4, 0, 0.2, 1) infinite" }} />
              {/* Good Line (stays high) */}
              <path d="M0 20 Q 40 10, 60 15 T 100 5" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="200" strokeDashoffset="200" style={{ animation: "drawLineGood 5s cubic-bezier(0.4, 0, 0.2, 1) infinite" }} />
           </svg>

           {/* End Dots */}
           <div className="absolute bg-white border-[2.5px] border-slate-300 w-3 h-3 rounded-full z-10 shadow-sm" style={{ right: "-5px", top: "72px", animation: "showDotBad 5s infinite" }}></div>
           <div className="absolute bg-white border-[2.5px] border-emerald-500 w-3 h-3 rounded-full z-10 shadow-sm" style={{ right: "-5px", top: "1px", animation: "showDotGood 5s infinite" }}></div>

           {/* Animated Tooltips */}
           <div className="absolute right-2 top-4 bg-emerald-100 text-emerald-700 text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm" style={{ animation: "showDotGood 5s infinite" }}>
             +85%
           </div>
           <div className="absolute right-2 bottom-4 bg-slate-100 text-slate-500 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm" style={{ animation: "showDotBad 5s infinite" }}>
             -60%
           </div>

           {/* Money Floating */}
           <div className="absolute right-8 top-1 text-[12px] text-emerald-500 font-bold drop-shadow-sm" style={{ animation: "moneyFloat 5s infinite" }}>$$</div>
           <div className="absolute left-[30%] bottom-4 text-[12px] text-slate-400 font-bold drop-shadow-sm" style={{ animation: "moneyLoss 5s infinite" }}>-$</div>
        </div>
     </div>
  </div>
);

const originalBlogPosts = [
  {
    slug: "error-perder-ventas-instagram",
    title: "El error de usar 2 enlaces de descarga para tu App en redes sociales",
    date: "28 de Mayo, 2026",
    category: "MARKETING",
    excerpt: "Descubre cómo añadir clics intermedios destruye tu embudo y por qué un solo enlace inteligente multiplica tus descargas.",
    readTime: "5 min",
    author: authorData,
    coverComponent: <OriginalCover1 />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Has pasado meses diseñando y programando tu aplicación. Finalmente está publicada en el <strong>App Store</strong> y en <strong>Google Play</strong>. Lleno de ilusión, vas a tu perfil de Instagram o TikTok para poner el enlace de descarga y... sorpresa: <strong>las redes sociales solo te permiten poner un único enlace en tu biografía.</strong>
        </p>
        <p>
          ¿Qué haces entonces si tienes dos tiendas diferentes? Esta pequeña limitación técnica ha sido el dolor de cabeza de miles de desarrolladores y marketers, y la forma en la que la resuelvas definirá si tu app es un éxito o un fracaso.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">La trampa de las páginas intermedias</h2>
        <p>
          La solución más común —y la más dañina— es recurrir a herramientas de bio-links (como Linktree) o crear una "Landing Page" propia. La idea parece lógica: creas una página web sencilla que contiene dos botones gigantes, uno que dice <em>"Descargar para iOS"</em> y otro que dice <em>"Descargar para Android"</em>.
        </p>
        <p>
          Sin embargo, <strong>esto es un error fatal para tu embudo de conversión</strong>. En el mundo del marketing digital, cada paso extra que el usuario debe dar se conoce como "fricción". Y la fricción es el enemigo número uno de las ventas y las descargas. 
        </p>
        <p>
          Cuando el usuario hace clic en tu perfil, no quiere navegar por una página web, no quiere leer textos, y definitivamente no quiere tener que tomar una decisión sobre qué botón pulsar. Quiere tu aplicación en su teléfono lo más rápido posible.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">La matemática de perder usuarios</h2>
        <p>
          Veamos los números. En la industria de las aplicaciones móviles, sabemos que cada vez que fuerzas al usuario a hacer un clic adicional o esperar a que cargue una página web, <strong>pierdes entre un 40% y un 60% del tráfico</strong>. 
        </p>
        <p>
          Imagínate que 1.000 personas hacen clic en tu perfil de Instagram. El navegador interno de Instagram se abre, carga tu página de Linktree (lo cual toma unos 2 o 3 segundos dependiendo de la conexión). De esas 1.000 personas, 300 se cansan de esperar y cierran la ventana. De las 700 que quedan, 200 se distraen con otros enlaces que tengas puestos o simplemente les da pereza buscar el botón correcto. Al final, solo 500 llegan a la App Store. Acabas de perder a la mitad de tus usuarios potenciales por culpa de un botón extra.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">La solución definitiva: Link My App</h2>
        <p>
          La tecnología actual nos permite ser mucho más inteligentes. Si un usuario está navegando desde un iPhone, ¿por qué le preguntamos qué dispositivo tiene? Su teléfono ya nos está dando esa información.
        </p>
        <p>
          Aquí es donde entra en juego <strong>Link My App</strong>. Hemos creado la solución definitiva a este problema: un <strong>Smart Link</strong> (enlace inteligente) universal.
        </p>
        <p>
          Con Link My App, generas un único enlace (ej. <code>link-my.app/tu-app</code>) que pones en tu biografía. Cuando un usuario hace clic, nuestro servidor intercepta la petición en milisegundos, detecta si es un dispositivo Apple o Android, y lo <strong>redirige instantáneamente y sin páginas intermedias</strong> directamente a su tienda correspondiente.
        </p>
        <p>
          El resultado es mágico: el usuario hace un clic en Instagram y, en menos de un segundo, la App Store oficial se abre en su pantalla lista para descargar. Cero fricción, cero distracciones, y el 100% de tus usuarios llegando a la meta.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Aplica esto hoy mismo</h3>
          <p className="text-gray-600 mb-6">Crea un único enlace inteligente que detecte el móvil de tu usuario y lo envíe directamente a su tienda.</p>
          <Link to="/" className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Crea tu link gratis
          </Link>
        </div>
      </div>
    )
  },
  {
    slug: "como-evitar-perder-usuarios-descarga",
    title: "Cómo funciona la detección de dispositivo (Device Detection) en 1 solo enlace",
    date: "2 de Junio, 2026",
    category: "PRODUCTO",
    excerpt: "Descubre cómo un enlace universal analiza instantáneamente si eres iOS o Android y te redirige a tu tienda sin páginas intermedias.",
    readTime: "4 min",
    author: authorData,
    coverComponent: <OriginalCover2 />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Cuando hablamos de optimizar descargas de aplicaciones, existe un concepto técnico que marca la diferencia entre una campaña rentable y una campaña que pierde dinero: <strong>la detección de dispositivo o "Device Detection"</strong>.
        </p>
        <p>
          Seguramente te has preguntado cómo hacen las grandes empresas (como Uber, Spotify o Netflix) para poner un único enlace en sus anuncios y que, mágicamente, se te abra la tienda de aplicaciones correcta en tu móvil sin tener que pasar por una página web preguntándote qué teléfono usas. Hoy te explicamos exactamente cómo funciona esta tecnología y cómo puedes aplicarla a tu propia app.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">¿Qué es el User-Agent?</h2>
        <p>
          El secreto de todo esto reside en algo llamado <strong>User-Agent</strong>. Cada vez que tu teléfono móvil, ya sea usando Safari, Chrome, o el navegador interno de TikTok e Instagram, hace clic en un enlace y se conecta a una página web, envía una pequeña tarjeta de presentación invisible.
        </p>
        <p>
          Esta "tarjeta de presentación" es el User-Agent. Contiene información técnica sobre el dispositivo, como por ejemplo: <em>"Hola, soy un iPhone 15 Pro Max ejecutando iOS 17 usando Safari"</em>, o <em>"Hola, soy un Samsung Galaxy S23 ejecutando Android 14 usando Chrome"</em>.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">El error de la detección en el cliente (Client-Side)</h2>
        <p>
          Algunos desarrolladores intentan solucionar el problema de los dos enlaces creando su propia página web con un script de JavaScript que lee el User-Agent y redirige al usuario. Esto se conoce como redirección <em>Client-Side</em> (del lado del cliente).
        </p>
        <p>
          Aunque funciona en papel, en la práctica es un desastre. Requiere que el teléfono descargue la página HTML, descargue el código JavaScript, lo ejecute, y luego envíe la nueva orden de ir a la App Store. Esto toma varios segundos, deja una pantalla en blanco visible para el usuario, y muchas veces es bloqueado por los navegadores integrados de redes sociales por políticas de seguridad.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">La magia del Server-Side Routing con Link My App</h2>
        <p>
          La forma correcta y profesional de hacer esto es mediante redirecciones en el lado del servidor (<em>Server-Side Routing</em>), y eso es exactamente lo que hemos construido en <strong>Link My App</strong>.
        </p>
        <p>
          Cuando usas nuestro servicio, te proporcionamos un enlace universal. Cuando el usuario hace clic, la petición llega a nuestros servidores ultrarrápidos. Antes siquiera de intentar enviar un solo píxel o código al teléfono del usuario, nuestros servidores leen el User-Agent, procesan la lógica y responden con un código HTTP 302 de redirección instantánea.
        </p>
        <p>
          ¿El resultado? El usuario hace clic y, en una fracción de milisegundo (inapreciable para el ojo humano), su sistema operativo recibe la orden de abrir la App Store o Google Play nativa de su teléfono. Es la experiencia más fluida, premium y rápida posible.
        </p>
        <p>
          En Link My App nos hemos encargado de toda la complejidad técnica de mantener bases de datos de User-Agents actualizadas y de configurar servidores de baja latencia en todo el mundo, para que tú solo tengas que pegar tus dos enlaces de las tiendas y obtener tu "Smart Link" definitivo.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Crea tu primer Smart Link</h3>
          <p className="text-gray-600 mb-6">Prueba gratis la detección de dispositivo y optimiza el tráfico de tus campañas.</p>
          <Link to="/" className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Crea tu enlace universal
          </Link>
        </div>
      </div>
    )
  },
  {
    slug: "disparar-descargas-app-link",
    title: "Por qué cada clic extra en tu embudo te hace perder cientos de descargas",
    date: "10 de Junio, 2026",
    category: "ESTRATEGIA",
    excerpt: "Analizamos cómo la fricción de los enlaces dobles y páginas intermedias destruye tu inversión en anuncios y cómo un enlace directo maximiza la conversión.",
    readTime: "6 min",
    author: authorData,
    coverComponent: <OriginalCover3 />,
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Has conseguido presupuesto para marketing y decides lanzar una campaña de anuncios en Meta Ads (Facebook e Instagram) o en TikTok para promocionar tu nueva aplicación. Optimizas los creativos, segmentas la audiencia perfectamente, y consigues un Costo Por Clic (CPC) envidiable.
        </p>
        <p>
          Sin embargo, cuando miras las métricas al final del día, te das cuenta de algo aterrador: has pagado por 5.000 clics en tu anuncio, pero solo tienes 800 descargas reales en las tiendas. ¿A dónde han ido a parar esos 4.200 usuarios que pagaste de tu bolsillo? <strong>Bienvenidos al problema del embudo de conversión roto.</strong>
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Entendiendo la fricción y la "fuga" (Drop-off)</h2>
        <p>
          En marketing de crecimiento (Growth Marketing), el embudo o "funnel" es el recorrido que hace un usuario desde que ve tu marca hasta que realiza la acción deseada (descargar la app).
        </p>
        <p>
          La regla de oro del funnel es: <strong>cada paso adicional reduce tu tasa de conversión a la mitad</strong>. Si un usuario que hace clic en tu anuncio de TikTok es dirigido a una página tipo Linktree donde tiene que buscar tu app entre otros enlaces, o a una web donde debe elegir entre el logo de Apple o el de Android, estás añadiendo un paso innecesario.
        </p>
        <p>
          A este paso intermedio se le llama "Drop-off". Los usuarios en redes sociales tienen un nivel de atención de apenas 3 segundos. Si les haces esperar a que cargue una web y luego les haces pensar en qué botón hacer clic, simplemente cerrarán la pestaña. Acabas de pagar por ese clic en vano. Tu CPA (Costo Por Adquisición) se dispara, y tu ROAS (Retorno de Inversión Publicitaria) cae en picado.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Maximizando el ROAS con un Smart Link</h2>
        <p>
          Para que tus campañas sean verdaderamente rentables, necesitas que la distancia entre el anuncio y la tienda de aplicaciones sea cero. 
        </p>
        <p>
          Aquí es exactamente donde <strong>Link My App</strong> se convierte en la mejor herramienta de tu arsenal de marketing. Al utilizar nuestro sistema de enrutamiento inteligente, tú solo colocas un enlace único en tus campañas de Ads.
        </p>
        <p>
          Cuando el usuario hace clic en el anuncio, Link My App identifica instantáneamente su dispositivo y abre la App Store nativa en iOS o Google Play en Android, sin pantallas de carga ni botones adicionales. Al eliminar completamente la fricción de la página intermedia, logras que el 100% de los clics que has pagado lleguen al botón de "Instalar".
        </p>
        <p>
          Esta simple optimización de quitar 1 solo clic intermedio es capaz de <strong>duplicar o triplicar tus descargas manteniendo exactamente el mismo presupuesto de marketing</strong>. Es la forma más rápida y efectiva de reducir tu CPA y hacer que tu aplicación escale de forma rentable.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Aumenta tu ROAS con un solo clic</h3>
          <p className="text-gray-600 mb-6">Elimina pasos intermedios y envía a tus usuarios directos a descargar tu App.</p>
          <Link to="/" className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Aumenta tus conversiones
          </Link>
        </div>
      </div>
    )
  }
];

export const blogPosts = [
  originalBlogPosts[0],
  moreBlogPosts[0],
  originalBlogPosts[1],
  moreBlogPosts[4],
  // AI Agent guide placed in the middle of page 1 (position 5 of 10)
  agentGuideBlogPost,
  moreBlogPosts[1],
  moreBlogPosts[3],
  moreBlogPosts[2],
  originalBlogPosts[2],
  moreBlogPosts[5],
  // Second batch (page 2) — 5 long-tail + 4 head/medium
  ...moreBlogPosts2,
];

const POSTS_PER_PAGE = 10;

function getLocalizedBlogPosts(language) {
  const normalizedLanguage = normalizeLanguage(language);
  if (normalizedLanguage === "es") return blogPosts;

  const isFrench = normalizedLanguage === "fr";
  const overridesMap = isFrench ? frenchBlogOverrides : englishBlogOverrides;

  return blogPosts.map((post) => {
    const override = overridesMap[post.slug];
    if (!override) return post;

    return {
      ...post,
      ...override,
      readTime: "5 min",
      content: override.content
    };
  });
}

export function BlogIndex() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const localizedPosts = useMemo(() => getLocalizedBlogPosts(language), [language]);
  const [activeCover, setActiveCover] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(localizedPosts.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = localizedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCover((prev) => (prev + 1) % visiblePosts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visiblePosts.length]);

  function goToPage(page) {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
    setActiveCover(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col overflow-x-hidden w-full">
      <style>{animationStyles}</style>
      <style>{`
        .inactive-cover * { animation-play-state: paused !important; }
        .active-cover * { animation-play-state: running !important; }
        .group:hover .inactive-cover * { animation-play-state: running !important; }
      `}</style>
      <PremiumNavbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t("blog.indexTitle")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("blog.indexSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {visiblePosts.map((post, i) => (
            <Link
               key={post.slug}
               to={localizePath(`/blog/${post.slug}`, language)}
               className="group flex flex-col h-full"
               onMouseEnter={() => setActiveCover(i)}
            >
              <div className={`w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border shadow-sm relative transition-all duration-500 ${activeCover === i ? 'active-cover opacity-100 scale-[1.02] shadow-xl border-gray-200' : 'inactive-cover opacity-100 scale-100 border-gray-100'}`}>
                <div className="w-full h-full pointer-events-none">
                  {post.coverComponent}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-3 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-[11px] font-black uppercase tracking-[0.16em] text-gray-400">
                  <span>{post.category}</span>
                  <span>{getDateForSlugLabel(post.slug, language)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Paginación del blog">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("blog.prevPage", "Anterior")}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`grid h-10 min-w-[40px] place-items-center rounded-full border px-3 text-sm font-black transition hover:-translate-y-0.5 ${
                  page === currentPage
                    ? "border-black bg-black text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("blog.nextPage", "Siguiente")}
            >
              →
            </button>
          </nav>
        )}
      </div>

      <FinalFooter theme="dark" />
    </div>
  );
}

export function BlogPost() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const localizedPosts = useMemo(() => getLocalizedBlogPosts(language), [language]);
  const { slug } = useParams();
  const post = localizedPosts.find(p => p.slug === slug) || localizedPosts[0];
  
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const updatedLabel = useMemo(() => getDateForSlugLabel(post?.slug || "", language), [post?.slug, language]);
  const updatedISO = useMemo(() => getDateForSlugISO(post?.slug || ""), [post?.slug]);

  useEffect(() => {
    if (!post) return;
    const scriptId = "blog-post-schema";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const url = `https://link-my.app${localizePath(`/blog/${post.slug}`, language)}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: post.title,
      description: post.excerpt || post.title,
      inLanguage: language,
      author: {
        "@type": "Person",
        name: "David Trotonda",
        url: "https://link-my.app/",
      },
      publisher: {
        "@type": "Person",
        name: "David Trotonda",
        logo: {
          "@type": "ImageObject",
          url: "https://link-my.app/favicon.png",
        },
      },
      datePublished: post.date || updatedISO,
      dateModified: updatedISO,
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const node = document.getElementById(scriptId);
      if (node) node.remove();
    };
  }, [post, language, updatedISO]);

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareArticle = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    let shareUrl = '';
    if(platform === 'x') shareUrl = `https://x.com/intent/tweet?url=${url}&text=${title}`;
    if(platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if(platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${title} - Mira esto: ${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col relative overflow-x-hidden w-full">
      <div className="absolute top-0 left-0 w-full h-[450px] lg:h-[380px] bg-[#000000] z-0"></div>
      <style>{animationStyles}</style>
      <style>{`
        .active-cover * { animation-play-state: running !important; }
      `}</style>
      
      <PremiumNavbar />

      <main className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-40 pb-16 flex-grow">
        
        {/* Header Hero */}
        <div className="w-full bg-[#121212] rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row overflow-hidden border border-white/5 mb-16">
            <div className="w-full lg:w-[60%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <div className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">{post.category}</div>
                <h1 className="text-[28px] sm:text-3xl md:text-[34px] lg:text-4xl font-extrabold text-white leading-[1.2] tracking-tight mb-6 pr-0 sm:pr-4">
                    {post.title}
                </h1>
                <div className="text-[12px] font-medium text-gray-500 flex flex-wrap gap-2 items-center">
                    <span>{post.category}</span>
                    <span className="text-gray-700">·</span>
                    <span>{post.readTime} {t("blog.reading")}</span>
                    <span className="text-gray-700">·</span>
                    <time dateTime={updatedISO}>{t("blog.updated")} {updatedLabel}</time>
                </div>
            </div>

            <div className="w-full lg:w-[40%] relative flex items-center justify-center p-6 lg:p-10">
                <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] aspect-square rounded-[32px] border-2 border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden active-cover pointer-events-none bg-black/10">
                   {post.coverComponent}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            <aside className="col-span-1 lg:col-span-3 flex flex-col gap-8 lg:sticky lg:top-32">
                <div className="flex items-center gap-3">
                    <img src="https://skeilapps.com/wp-content/uploads/2025/12/IMG_20251213_151012-4.webp" alt="David Trotonda" className="w-11 h-11 rounded-full object-cover shadow-sm" />
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-gray-900 leading-tight">David Trotonda</span>
                        <span className="text-[12px] font-medium text-gray-500">CEO {language === 'en' ? 'of' : 'de'} SkeilApps</span>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center lg:flex-col lg:items-start gap-4 w-full">
                    <div className="flex flex-col items-start gap-1.5 shrink-0">
                        <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{t("blog.share")}</span>
                        <div className="flex flex-row gap-1 sm:gap-2">
                            <button onClick={() => shareArticle('x')} className="w-[28px] h-[28px] rounded bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-colors">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.072H5.059z"/></svg>
                            </button>
                            <button onClick={() => shareArticle('linkedin')} className="w-[28px] h-[28px] rounded bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-colors">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </button>
                            <button onClick={() => shareArticle('whatsapp')} className="w-[28px] h-[28px] rounded bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-colors">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            </button>
                            <button onClick={copyArticleLink} className={`w-[28px] h-[28px] rounded border flex items-center justify-center transition-colors ${copied ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-800 hover:bg-black hover:text-white'}`}>
                                {copied ? <Check className="w-3 h-3" strokeWidth={3} /> : <Copy className="w-3 h-3" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#f8f9fa] rounded-xl p-5 border border-gray-100 hidden lg:block">
                    <p className="text-[12px] text-gray-500 font-medium mb-2">{t("blog.readArticle")}</p>
                    <p className="text-[14px] text-gray-800 font-bold">{post.title}</p>
                </div>
            </aside>

            <article className="col-span-1 lg:col-span-9">
                {post.content}
            </article>
        </div>
      </main>

      <section id="related-articles-section" className="w-full bg-[#000000] py-16 sm:py-24 mt-10 relative z-10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 sm:mb-12">
                <h2 className="text-white text-[28px] sm:text-3xl lg:text-[34px] font-bold tracking-tight">{t("blog.related")}</h2>
                <Link to={localizePath("/blog", language)} className="group inline-flex items-center justify-center text-white border border-gray-600 rounded-full px-5 py-2.5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-[14px] font-semibold gap-2 shrink-0">
                    {t("blog.moreArticles")} 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {localizedPosts.filter(p => p.slug !== slug).slice(0, 3).map((relatedPost) => (
                  <Link key={relatedPost.slug} to={localizePath(`/blog/${relatedPost.slug}`, language)} className="group bg-[#111111] border border-gray-800 rounded-[24px] p-4 sm:p-5 flex flex-col hover:bg-[#1a1a1a] hover:border-gray-700 transition-all duration-300">
                    <div className="w-full h-[220px] sm:h-[160px] lg:h-[160px] rounded-xl bg-[#222222] mb-5 overflow-hidden flex items-center justify-center relative">
                        <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                          {relatedPost.coverComponent}
                        </div>
                    </div>
                    <h3 className="text-white font-bold text-[16px] leading-snug mb-2 transition-colors line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-gray-400 text-[13px] leading-relaxed mb-6 line-clamp-3">{relatedPost.excerpt}</p>
                    <div className="mt-auto flex justify-between items-center text-[12px] text-gray-500 font-medium">
                        <span>{relatedPost.category}</span>
                        <span>{relatedPost.readTime}</span>
                    </div>
                  </Link>
                ))}
            </div>
        </div>
      </section>

      <FinalFooter theme="dark" />
    </div>
  );
}
