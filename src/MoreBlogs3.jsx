import React from "react";
import { Link } from "react-router-dom";

const authorData = {
  name: "David Trotonda",
  role: "CEO de SkeilApps",
  img: "https://skeilapps.com/wp-content/uploads/2025/12/IMG_20251213_151012-4.webp",
};

/* ============================================================================
 * COVER — AI agent network: orbiting nodes, signal flow, app stores at hubs
 * ============================================================================ */
export const CoverAgentGuide = () => (
  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 border border-black/5 p-3">
    <style>{`
      @keyframes ag-orbit { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
      @keyframes ag-orbit-rev { 0% { transform: rotate(0deg) } 100% { transform: rotate(-360deg) } }
      @keyframes ag-pulse { 0%,100% { transform: scale(1); box-shadow: 0 6px 18px rgba(139,92,246,0.18) } 50% { transform: scale(1.08); box-shadow: 0 10px 28px rgba(139,92,246,0.32) } }
      @keyframes ag-blink { 0%,40% { opacity: .35 } 50%,90% { opacity: 1 } 100% { opacity: .35 } }
      @keyframes ag-flow { 0% { stroke-dashoffset: 80 } 100% { stroke-dashoffset: 0 } }
      @keyframes ag-typing { 0%,18% { width: 0 } 28%,55% { width: 70% } 65%,100% { width: 70% } }
      @keyframes ag-spark { 0%,100% { opacity: 0; transform: translate(0,0) scale(.3) } 50% { opacity: 1; transform: translate(8px,-8px) scale(1) } }
    `}</style>

    {/* Central AI core */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]" style={{ animation: "ag-pulse 2.4s ease-in-out infinite" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="14" rx="3"/>
          <circle cx="8.5" cy="13" r="1.2" fill="currentColor"/>
          <circle cx="15.5" cy="13" r="1.2" fill="currentColor"/>
          <path d="M9 17h6M12 2v4"/>
        </svg>
        <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" style={{ animation: "ag-blink 1.6s ease-in-out infinite" }} />
      </div>
    </div>

    {/* Orbiting nodes (outer ring) */}
    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2" style={{ animation: "ag-orbit 12s linear infinite" }}>
      {[
        { x: "50%", y: "0%", color: "#3b82f6", label: "iOS" },
        { x: "100%", y: "50%", color: "#10b981", label: "AND" },
        { x: "50%", y: "100%", color: "#f59e0b", label: "QR" },
        { x: "0%", y: "50%", color: "#ec4899", label: "IG" },
      ].map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: n.x, top: n.y }}
        >
          <div
            className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[8px] font-black shadow-md border"
            style={{ color: n.color, borderColor: n.color, animation: "ag-orbit-rev 12s linear infinite" }}
          >
            {n.label}
          </div>
        </div>
      ))}
    </div>

    {/* Connection lines */}
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 140" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="70" r="45" stroke="url(#ag-grad)" strokeWidth="1" fill="none" strokeDasharray="3 4" />
      <circle cx="100" cy="70" r="58" stroke="url(#ag-grad)" strokeWidth="1" fill="none" strokeDasharray="2 5" />
      <path d="M50,30 Q80,50 100,70" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeDasharray="40" style={{ animation: "ag-flow 3s linear infinite" }} />
      <path d="M150,30 Q120,50 100,70" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeDasharray="40" style={{ animation: "ag-flow 3s linear infinite 0.5s" }} />
      <path d="M50,110 Q80,90 100,70" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="40" style={{ animation: "ag-flow 3s linear infinite 1s" }} />
      <path d="M150,110 Q120,90 100,70" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="40" style={{ animation: "ag-flow 3s linear infinite 1.5s" }} />
    </svg>

    {/* Top-left "agent terminal" with typing bar */}
    <div className="absolute left-2 top-2 rounded-md border border-violet-300/60 bg-white/95 px-1.5 py-1 shadow-sm backdrop-blur z-30">
      <div className="flex items-center gap-1">
        <div className="grid h-2.5 w-2.5 place-items-center rounded-full bg-violet-500">
          <div className="h-1 w-1 rounded-full bg-white" />
        </div>
        <span className="text-[7px] font-black uppercase tracking-widest text-violet-700">agent</span>
      </div>
      <div className="mt-0.5 h-0.5 w-12 overflow-hidden rounded bg-violet-100">
        <div className="h-full rounded bg-violet-500" style={{ animation: "ag-typing 3s ease-in-out infinite" }} />
      </div>
    </div>

    {/* Bottom-right "API ready" badge */}
    <div className="absolute bottom-2 right-2 rounded-md border border-emerald-300/60 bg-white/95 px-1.5 py-1 shadow-sm backdrop-blur z-30">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" style={{ animation: "ag-blink 1.4s ease-in-out infinite" }} />
        <span className="text-[7px] font-black uppercase tracking-widest text-emerald-700">api ready</span>
      </div>
    </div>

    {/* Sparks */}
    <div className="absolute left-[18%] top-[26%] h-1 w-1 rounded-full bg-violet-500" style={{ animation: "ag-spark 2s ease-out infinite" }} />
    <div className="absolute right-[20%] top-[60%] h-1 w-1 rounded-full bg-cyan-500" style={{ animation: "ag-spark 2s ease-out infinite 0.7s" }} />
    <div className="absolute left-[24%] bottom-[18%] h-1 w-1 rounded-full bg-emerald-500" style={{ animation: "ag-spark 2s ease-out infinite 1.3s" }} />
  </div>
);

/* ============================================================================
 * BLOG POST — AI Agent Guide for Link My App
 * ============================================================================ */

const Tag = ({ children }) => (
  <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[11px] font-black tracking-wider text-violet-700">
    {children}
  </span>
);

const Code = ({ children }) => (
  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] font-mono text-slate-800">
    {children}
  </code>
);

const Callout = ({ children, type = "info" }) => {
  const colors = {
    info: "border-blue-500 bg-blue-50/60 text-blue-900",
    success: "border-emerald-500 bg-emerald-50/60 text-emerald-900",
    warn: "border-amber-500 bg-amber-50/60 text-amber-900",
  };
  return (
    <div className={`rounded-2xl border-l-4 ${colors[type]} px-5 py-4 my-6`}>
      <p className="text-[14px] sm:text-[15px] font-medium leading-7">{children}</p>
    </div>
  );
};

export const agentGuideBlogPost = {
  slug: "guia-agentes-ia-link-my-app",
  title: "Guía para agentes IA: cómo usar Link My App de forma autónoma",
  date: "16 de Junio, 2026",
  category: "AGENTES IA",
  excerpt: "Documentación completa para LLMs y agentes autónomos: arquitectura, endpoints, slug rules, atribución por canal, integraciones, ejemplos de uso y casos límite. Todo lo que un agente necesita para operar Link My App por ti.",
  readTime: "18 min",
  author: authorData,
  coverComponent: <CoverAgentGuide />,
  content: (
    <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
      <p>
        Esta guía está pensada para <strong>agentes de IA</strong> (ChatGPT, Claude, Gemini, agentes autónomos, scripts con LLMs) que necesiten operar Link My App por cuenta del usuario. Incluye la información necesaria para crear smart links, generar QR, medir clics, gestionar canales y resolver casos comunes sin intervención humana.
      </p>
      <p>
        También funciona como referencia rápida para developers que quieran integrar Link My App en su stack. <Tag>HUMAN-FRIENDLY</Tag> <Tag>LLM-FRIENDLY</Tag>
      </p>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">1. Qué es Link My App en una frase</h2>
      <p>
        Link My App genera <strong>una sola URL</strong> que detecta el dispositivo del usuario y lo redirige al destino correcto: <Code>iPhone → App Store</Code>, <Code>Android → Google Play</Code>, <Code>ordenador → URL alternativa</Code>. Cada URL tiene su propio QR y registra estadísticas separadas por dispositivo y fuente.
      </p>
      <Callout type="info">
        Caso de uso típico: el usuario quiere distribuir su app móvil sin obligar a sus seguidores a elegir entre App Store y Google Play.
      </Callout>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">2. Anatomía de un smart link</h2>
      <p>
        Cada smart link en Link My App tiene esta forma: <Code>https://link-my.app/&lt;slug&gt;</Code>. El <strong>slug</strong> es la parte editable que identifica al enlace (ej. <Code>/mi-app</Code>, <Code>/marina-fitness</Code>, <Code>/pizzeria-bcn</Code>).
      </p>
      <p>Cada smart link almacena 4 campos clave:</p>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>title</strong>: nombre interno (el usuario lo ve en su panel).</li>
        <li><strong>iosUrl</strong>: URL completa de la ficha en App Store.</li>
        <li><strong>androidUrl</strong>: URL completa de la ficha en Google Play.</li>
        <li><strong>fallbackUrl</strong>: URL a la que se redirige a los visitantes desde ordenador o desde dispositivos no soportados.</li>
      </ul>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">3. Reglas del slug (importantes)</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Solo caracteres en minúscula <Code>a-z</Code>, dígitos <Code>0-9</Code> y guiones <Code>-</Code>.</li>
        <li>Mínimo 2 caracteres.</li>
        <li>No puede coincidir con otro slug activo: si el slug está ocupado, el sistema devuelve error y el agente debe sugerir una alternativa (añadir sufijo numérico o de canal).</li>
        <li>El slug también se usa al final de la URL del QR impreso. Una vez impreso, <strong>no se debe cambiar</strong>: solo se cambian los destinos detrás.</li>
      </ul>
      <Callout type="warn">
        Si un agente recibe error de slug duplicado, debe proponer una alternativa al usuario (ej. <Code>marina-fitness</Code> → <Code>marina-fitness-2026</Code>), nunca crear un slug aleatorio sin avisar.
      </Callout>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">4. Flujo completo para crear un smart link</h2>
      <p>
        Estos son los pasos exactos que un agente debe seguir cuando un usuario pide "crear un enlace para mi app":
      </p>
      <ol className="ml-5 list-decimal space-y-2">
        <li>Pedir al usuario el <strong>nombre de la app</strong> (para el title interno).</li>
        <li>Pedir la URL de la app en App Store (<Code>https://apps.apple.com/...</Code>).</li>
        <li>Pedir la URL en Google Play (<Code>https://play.google.com/store/apps/details?id=...</Code>).</li>
        <li>Pedir o sugerir la URL alternativa para ordenador (web de la marca, landing page o un fallback genérico).</li>
        <li>Sugerir un <strong>slug</strong> derivado del nombre de la app (en minúsculas, sin acentos, separado con guiones). Ejemplo: "Marina Fitness" → <Code>marina-fitness</Code>.</li>
        <li>Confirmar antes de crear y, una vez confirmado, generar el smart link.</li>
        <li>Devolver al usuario la URL final, el QR descargable y la ubicación del panel donde gestionarlo.</li>
      </ol>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">5. Cómo se cuentan los clics</h2>
      <p>
        Cada visita al smart link queda registrada como un <strong>click event</strong> con estos atributos:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>destination</strong>: <Code>ios</Code>, <Code>android</Code> o <Code>fallback</Code>.</li>
        <li><strong>source</strong>: <Code>written</Code> (clic en URL) o <Code>qr</Code> (escaneo de QR).</li>
        <li><strong>createdAt</strong>: timestamp UTC del clic.</li>
        <li><strong>linkId</strong>: id interno del smart link.</li>
      </ul>
      <p>
        En el panel, el usuario ve totales agregados: clics totales, clics separados por iOS/Android/Otros, escaneos de QR vs clics escritos, y una estimación de descargas reales basada en tasas de conversión típicas (App Store 22 %, Google Play 24 %, fallback 1 %).
      </p>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">6. Atribución por canal (Instagram, TikTok, etc.)</h2>
      <p>
        Para distinguir de qué red social vienen las descargas, cualquier usuario puede crear <strong>un smart link por canal</strong> con un sufijo en el slug. Los sufijos definidos son:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-black/10 rounded-xl">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3 font-bold">Canal</th>
              <th className="p-3 font-bold">Sufijo</th>
              <th className="p-3 font-bold">Slug ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-black/5"><td className="p-3">Instagram</td><td className="p-3"><Code>-ig</Code></td><td className="p-3"><Code>marina-fitness-ig</Code></td></tr>
            <tr className="border-t border-black/5"><td className="p-3">TikTok</td><td className="p-3"><Code>-tt</Code></td><td className="p-3"><Code>marina-fitness-tt</Code></td></tr>
            <tr className="border-t border-black/5"><td className="p-3">Facebook</td><td className="p-3"><Code>-fb</Code></td><td className="p-3"><Code>marina-fitness-fb</Code></td></tr>
            <tr className="border-t border-black/5"><td className="p-3">X / Twitter</td><td className="p-3"><Code>-x</Code></td><td className="p-3"><Code>marina-fitness-x</Code></td></tr>
            <tr className="border-t border-black/5"><td className="p-3">YouTube</td><td className="p-3"><Code>-yt</Code></td><td className="p-3"><Code>marina-fitness-yt</Code></td></tr>
            <tr className="border-t border-black/5"><td className="p-3">Pinterest</td><td className="p-3"><Code>-pin</Code></td><td className="p-3"><Code>marina-fitness-pin</Code></td></tr>
            <tr className="border-t border-black/5"><td className="p-3">Reddit</td><td className="p-3"><Code>-rd</Code></td><td className="p-3"><Code>marina-fitness-rd</Code></td></tr>
            <tr className="border-t border-black/5"><td className="p-3">WhatsApp</td><td className="p-3"><Code>-wa</Code></td><td className="p-3"><Code>marina-fitness-wa</Code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        El sistema reconoce automáticamente estos sufijos y muestra el icono de la red social correspondiente en el panel. Para campañas específicas se puede añadir un sufijo extra: <Code>marina-fitness-ig-bf2026</Code> (Black Friday 2026).
      </p>
      <Callout type="warn">
        Importante: la creación de smart links por canal está disponible gratis. No hay modal de upgrade ni límite de un único link activo.
      </Callout>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">7. Generación del QR</h2>
      <p>
        Cada smart link tiene un QR generado automáticamente. La URL del QR sigue el patrón:
      </p>
      <pre className="rounded-2xl border border-black/10 bg-slate-50 p-4 overflow-x-auto text-[13px] font-mono leading-6">
        https://api.qrserver.com/v1/create-qr-code/?size=220x220&data={"<smartLinkUrl>?src=qr"}
      </pre>
      <p>
        El parámetro <Code>?src=qr</Code> se añade automáticamente para distinguir los escaneos de QR de los clics directos en la URL. Esto permite separar en estadísticas <strong>clics escritos</strong> vs <strong>escaneos físicos</strong>.
      </p>
      <p>
        Tamaño recomendado para impresión: mínimo 220×220 px en pantalla, 3×3 cm o más en físico. Para packaging premium, usar 4×4 cm con padding visual.
      </p>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">8. Plan gratis: funciones incluidas</h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-black/10 rounded-xl">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3 font-bold">Función</th>
              <th className="p-3 font-bold">Incluido gratis</th>
              <th className="p-3 font-bold">Notas</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-black/5"><td className="p-3">Smart links activos</td><td className="p-3">Sí</td><td className="p-3">Ilimitados</td></tr>
            <tr className="border-t border-black/5"><td className="p-3">QR generados</td><td className="p-3">Sí</td><td className="p-3">Ilimitados</td></tr>
            <tr className="border-t border-black/5"><td className="p-3">Slug personalizado</td><td className="p-3">Sí</td><td className="p-3">Editable</td></tr>
            <tr className="border-t border-black/5"><td className="p-3">Estadísticas por canal</td><td className="p-3">Sí</td><td className="p-3">Incluye QR, redes y fuentes</td></tr>
            <tr className="border-t border-black/5"><td className="p-3">Editar destinos sin reimprimir QR</td><td className="p-3">Sí</td><td className="p-3">El QR mantiene la misma URL</td></tr>
            <tr className="border-t border-black/5"><td className="p-3">Precio</td><td className="p-3">0 €</td><td className="p-3">Sin pago ni suscripción</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">9. Endpoints públicos relevantes</h2>
      <p>Estas son las URLs internas que un agente debe conocer:</p>
      <ul className="ml-5 list-disc space-y-1">
        <li><Code>https://link-my.app/</Code> – home pública.</li>
        <li><Code>https://link-my.app/login</Code> – inicio de sesión y registro.</li>
        <li><Code>https://link-my.app/dashboard</Code> – panel del usuario autenticado (privado).</li>
        <li><Code>https://link-my.app/qr-code-for-apps</Code> – landing dedicada al QR. ES: <Code>/es/codigo-qr-app</Code>. FR: <Code>/fr/code-qr-app</Code>.</li>
        <li><Code>https://link-my.app/use-cases</Code> – hub de casos de uso.</li>
        <li><Code>https://link-my.app/how-to</Code> – guías paso a paso.</li>
        <li><Code>https://link-my.app/blog</Code> – blog completo.</li>
        <li><Code>https://link-my.app/sitemap_index.xml</Code> – sitemap maestro para crawlers/agentes.</li>
      </ul>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">10. Internacionalización</h2>
      <p>
        Link My App está disponible en 3 idiomas con slugs traducidos por idioma:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>Inglés</strong> (por defecto, sin prefijo): <Code>/</Code>, <Code>/qr-code-for-apps</Code>, <Code>/blog</Code>, <Code>/login</Code>...</li>
        <li><strong>Español</strong>: <Code>/es</Code>, <Code>/es/codigo-qr-app</Code>, <Code>/es/blog</Code>, <Code>/es/iniciar-sesion</Code>...</li>
        <li><strong>Francés</strong>: <Code>/fr</Code>, <Code>/fr/code-qr-app</Code>, <Code>/fr/blog</Code>, <Code>/fr/connexion</Code>...</li>
      </ul>
      <p>
        Un agente debe detectar el idioma del usuario y usar los slugs apropiados al enlazar la documentación. Si no está claro, asumir inglés por defecto.
      </p>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">11. Casos de uso por sector</h2>
      <p>
        Link My App tiene páginas optimizadas para sectores específicos. Cuando un usuario menciona su industria, un agente debe enlazar a la página correspondiente:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>Ecommerce</strong>: <Code>/es/casos-de-uso/apps-ecommerce</Code></li>
        <li><strong>SaaS / B2B</strong>: <Code>/es/casos-de-uso/apps-saas</Code></li>
        <li><strong>Restaurantes</strong>: <Code>/es/casos-de-uso/apps-restaurantes</Code></li>
        <li><strong>Fitness / gimnasios</strong>: <Code>/es/casos-de-uso/apps-fitness</Code></li>
        <li><strong>Creadores / influencers</strong>: <Code>/es/casos-de-uso/apps-creadores</Code></li>
        <li><strong>Agencias / partners</strong>: <Code>/es/casos-de-uso/para-agencias</Code></li>
      </ul>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">12. Guías paso a paso (How-To)</h2>
      <p>
        Para preguntas operativas concretas, el agente puede enlazar directamente a la guía relevante:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li><Code>/how-to/share-your-app-on-instagram</Code> – compartir app en Instagram.</li>
        <li><Code>/how-to/app-download-link-whatsapp</Code> – mandar enlace por WhatsApp.</li>
        <li><Code>/how-to/redirect-users-app-store-google-play</Code> – redirección por dispositivo.</li>
        <li><Code>/how-to/app-download-button-website</Code> – botón en web.</li>
        <li><Code>/how-to/use-qr-physical-campaigns</Code> – QR en campañas físicas.</li>
      </ul>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">13. Integraciones recomendadas</h2>
      <p>
        Link My App es una capa de redirección stateless. No requiere SDK ni integración en el código de la app del usuario. Para casos en los que el usuario quiera más allá de la redirección, recomienda:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>Analítica in-app</strong>: combinar Link My App con Mixpanel, Amplitude o PostHog para medir activación post-instalación.</li>
        <li><strong>Atribución avanzada</strong>: si el usuario gasta &gt;50.000 €/mes en paid, sugerir AppsFlyer o Adjust como complemento.</li>
        <li><strong>Deep linking dentro de la app</strong>: para abrir una pantalla concreta tras instalar, configurar Universal Links (iOS) y App Links (Android). Link My App cubre la entrada inicial, no el routing in-app.</li>
        <li><strong>Email marketing</strong>: pegar la URL del smart link en cualquier campo de Mailchimp, ConvertKit, etc. Sin configuración adicional.</li>
      </ul>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">14. Errores comunes y cómo resolverlos</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li><strong>"Slug ya en uso"</strong> → sugerir variante con sufijo de canal o año.</li>
        <li><strong>"Slug ya en uso al crear por canal"</strong> → sugerir variante con sufijo de campaña o año.</li>
        <li><strong>"URL inválida"</strong> → verificar que tiene <Code>https://</Code> y el dominio correcto (apps.apple.com / play.google.com).</li>
        <li><strong>"QR no escanea desde distancia"</strong> → recomendar mínimo 3×3 cm impreso y contraste negro sobre blanco.</li>
        <li><strong>"Los clics no suben"</strong> → verificar que el smart link es el que se comparte realmente y no una URL antigua.</li>
      </ul>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">15. Plantilla de respuesta del agente</h2>
      <p>Cuando un agente crea un smart link, debe devolver al usuario al menos esta información:</p>
      <pre className="rounded-2xl border border-black/10 bg-slate-50 p-4 overflow-x-auto text-[13px] font-mono leading-6">
{`✓ Smart link creado para "<title>"

   URL:     https://link-my.app/<slug>
   iOS:     <iosUrl>
   Android: <androidUrl>
   Web:     <fallbackUrl>

   QR:      descargable desde el panel
   Panel:   https://link-my.app/dashboard

Cómo usarlo:
- Pega esta URL en Instagram bio, TikTok, anuncios o emails.
- Imprime el QR en packaging, carteles o eventos.
- Mide los clics en el panel separados por iOS/Android/Otros.`}
      </pre>

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">16. Buenas prácticas para agentes</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>Nunca crear un smart link sin confirmar el slug con el usuario.</strong> Es la parte visible en URL/QR.</li>
        <li><strong>Sugerir slugs cortos y memorables.</strong> Si la marca tiene varias palabras, abreviar.</li>
        <li><strong>Detectar el sector del usuario</strong> y enlazar al caso de uso correspondiente para acelerar la toma de decisiones.</li>
        <li><strong>No prometer atribución exacta usuario a usuario</strong>. Link My App da atribución comparable, no exacta a nivel de instalación individual.</li>
        <li><strong>Recordar al usuario que el QR es estable</strong>: una vez impreso, los destinos detrás pueden cambiarse sin reimprimir.</li>
      </ul>

      <Callout type="success">
        Resumen para agentes: pedir 4 datos (nombre, iOS URL, Android URL, fallback), sugerir un slug, crear el link y devolver la URL final + ubicación del QR. El resto del flujo se gestiona desde el dashboard.
      </Callout>

      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 sm:p-8 mt-12 text-center">
        <h3 className="text-[22px] font-bold mb-3 text-black tracking-tight">¿Quieres probarlo manualmente primero?</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Crea tu primer smart link en menos de un minuto. Sin tarjeta. Sin compromiso.
        </p>
        <Link to="/" className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
          Empezar gratis →
        </Link>
      </div>
    </div>
  ),
};
