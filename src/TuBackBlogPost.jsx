import React from "react";
import { Link } from "react-router-dom";
import { Link2, MousePointer2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";

export const tuBackSlug = "tuback-link-backlinks-app-ecommerce";

const tuBackUrl = "https://tuback.link/";
const tuBackLogoUrl = "/partner-logos/tuback-logo-512.png";

const authorData = {
  name: "David Trotonda",
  role: "CEO de SkeilApps",
  img: "/partner-logos/skeilapps-logo.png",
};

const coverCopy = {
  es: { badge: "Backlinks", title: "Plan SEO", authority: "Autoridad", outreach: "Outreach", app: "App" },
  en: { badge: "Backlinks", title: "SEO plan", authority: "Authority", outreach: "Outreach", app: "App" },
  fr: { badge: "Backlinks", title: "Plan SEO", authority: "Autorité", outreach: "Outreach", app: "App" },
  ja: { badge: "被リンク", title: "SEOプラン", authority: "権威性", outreach: "掲載依頼", app: "アプリ" },
  de: { badge: "Backlinks", title: "SEO-Plan", authority: "Autorität", outreach: "Outreach", app: "App" },
  pt: { badge: "Backlinks", title: "Plano SEO", authority: "Autoridade", outreach: "Outreach", app: "App" },
  it: { badge: "Backlink", title: "Piano SEO", authority: "Autorità", outreach: "Outreach", app: "App" },
  ko: { badge: "백링크", title: "SEO 플랜", authority: "권위", outreach: "아웃리치", app: "앱" },
  nl: { badge: "Backlinks", title: "SEO-plan", authority: "Autoriteit", outreach: "Outreach", app: "App" },
  ar: { badge: "روابط خلفية", title: "خطة SEO", authority: "سلطة", outreach: "تواصل", app: "تطبيق" },
  hi: { badge: "बैकलिंक", title: "SEO योजना", authority: "अथॉरिटी", outreach: "आउटरीच", app: "ऐप" },
};

function TuBackCover() {
  const { i18n } = useTranslation();
  const copy = coverCopy[normalizeLanguage(i18n.language)] || coverCopy.en;

  return (
    <div className="tuback-cover relative h-full w-full overflow-hidden rounded-2xl border border-black/5 bg-[#f7faf8] p-4">
      <style>{`
        @keyframes tubackRoute {
          0% { stroke-dashoffset: 180; opacity: .15; }
          36%, 72% { stroke-dashoffset: 0; opacity: .95; }
          100% { stroke-dashoffset: -180; opacity: .18; }
        }
        @keyframes tubackNode {
          0%, 100% { transform: translateY(4px) scale(.98); }
          50% { transform: translateY(-4px) scale(1.02); }
        }
        @keyframes tubackSignal {
          0%, 100% { transform: scale(.82); opacity: .35; }
          45% { transform: scale(1.16); opacity: 1; }
        }
        @keyframes tubackScore {
          0% { transform: scaleY(.42); opacity: .55; }
          58%, 100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(#e7ece8_1px,transparent_1px),linear-gradient(90deg,#e7ece8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-20 flex items-center justify-between">
        <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-black/45 shadow-sm">
          {copy.badge}
        </div>
        <div className="rounded-full bg-black px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] text-white">
          DR 72
        </div>
      </div>

      <svg className="absolute inset-x-6 top-12 z-0 h-[150px] w-[calc(100%-48px)] overflow-visible" viewBox="0 0 270 154" fill="none" preserveAspectRatio="none">
        <path d="M56 82 C84 36 112 42 135 70" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="180" style={{ animation: "tubackRoute 5.4s ease-in-out infinite" }} />
        <path d="M214 44 C178 48 160 54 135 70" stroke="#10b981" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="180" style={{ animation: "tubackRoute 5.4s ease-in-out .25s infinite" }} />
        <path d="M74 132 C104 112 118 96 135 70" stroke="#2563eb" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="180" style={{ animation: "tubackRoute 5.4s ease-in-out .5s infinite" }} />
        <path d="M206 124 C176 110 152 92 135 70" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="180" style={{ animation: "tubackRoute 5.4s ease-in-out .75s infinite" }} />
      </svg>

      <div className="absolute left-1/2 top-[60px] z-30 grid h-[86px] w-[86px] -translate-x-1/2 place-items-center rounded-[28px] border border-black/10 bg-white p-2 shadow-[0_24px_52px_rgba(15,23,42,0.16)]" style={{ animation: "tubackNode 4.2s ease-in-out infinite" }}>
        <img src={tuBackLogoUrl} alt="TuBack.link" className="h-full w-full object-contain" />
        <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-emerald-400 shadow-[0_0_0_7px_rgba(16,185,129,0.16)]" style={{ animation: "tubackSignal 2.7s ease-in-out infinite" }} />
      </div>

      <div className="absolute left-5 top-[76px] z-20 w-[96px] rounded-[22px] border border-black/10 bg-white p-3 shadow-[0_18px_38px_rgba(15,23,42,0.08)]">
        <div className="mb-2 text-[8px] font-black uppercase tracking-[0.15em] text-black/35">{copy.outreach}</div>
        <div className="flex items-center gap-1.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-black text-white">
            <MousePointer2 size={12} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="h-2 rounded-full bg-slate-200" />
            <div className="mt-1.5 h-2 w-8 rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="mt-3 rounded-full bg-emerald-100 px-2 py-1 text-center text-[8px] font-black text-emerald-700">DOFOLLOW</div>
      </div>

      <div className="absolute bottom-5 left-9 z-20 flex items-end gap-1.5 rounded-[20px] border border-black/10 bg-white px-3 py-3 shadow-[0_18px_38px_rgba(15,23,42,0.08)]">
        {[38, 58, 82, 66].map((height, index) => (
          <span
            key={height}
            className="block w-3 origin-bottom rounded-full bg-black"
            style={{ height: `${height / 4}px`, animation: `tubackScore 3.2s ease-in-out ${index * 0.18}s infinite alternate` }}
          />
        ))}
      </div>

      <div className="absolute bottom-5 right-5 z-20 w-[118px] rounded-[22px] border border-black/10 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.15em] text-black/35">{copy.authority}</span>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400" style={{ animation: "tubackSignal 2.5s ease-in-out infinite" }} />
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-2 py-2">
          <Link2 size={13} />
          <span className="truncate text-[9px] font-black text-black">link-my.app</span>
        </div>
        <div className="mt-2 rounded-full bg-black px-2 py-1 text-center text-[8px] font-black text-white">{copy.app}</div>
      </div>

      <div className="absolute right-8 top-[72px] z-20 rounded-[20px] border border-black/10 bg-white px-3 py-2 text-[8px] font-black uppercase tracking-[0.14em] text-black/45 shadow-sm">
        {copy.title}
      </div>
    </div>
  );
}

const translations = {
  es: {
    title: "Cómo usar TuBack.link para ganar autoridad después de crear la app de tu ecommerce",
    excerpt: "Crear una app no basta si nadie descubre tu tienda: usa Link My App para medir descargas y TuBack.link para encontrar backlinks, outreach y oportunidades SEO.",
    category: "SEO",
    readTime: "6 min",
    intro: ["Después de crear la app de un ecommerce, muchas marcas se quedan solo en redes sociales, QR y campañas. Eso ayuda a conseguir descargas, pero no resuelve algo igual de importante: que la tienda gane autoridad en Google y aparezca cuando la gente busca productos.", "Ahí encaja TuBack.link. Según su página, la herramienta parte de la categoría y la URL de tu tienda para devolver oportunidades de backlinks, ángulos de outreach y prioridades. Link My App convierte después ese interés en visitas medibles hacia la app."],
    sections: [["Por qué tiene sentido hablar de backlinks en Link My App", ["Link My App trabaja la última parte del camino: un usuario ve tu enlace o QR y llega a App Store, Google Play o una alternativa según su dispositivo. Pero para que ese clic exista, antes tiene que haber tráfico, autoridad y lugares donde la marca aparezca.", "TuBack.link cubre esa capa anterior: ayuda a decidir dónde publicar enlaces, qué tipo de contenido preparar y por dónde empezar para subir autoridad. Si tu ecommerce gana más visibilidad orgánica, también tiene más oportunidades de llevar usuarios a su app."]], ["El flujo recomendado", ["Primero crea o publica tu app y genera un smart link en Link My App. Ese enlace será el que uses en campañas, QR, emails y canales donde quieras medir descargas.", "Después entra en TuBack.link, selecciona la categoría de tu tienda y pega la URL. Con esa lista puedes priorizar blogs, directorios, guías o menciones donde publicar un enlace contextual hacia tu ecommerce o hacia una landing que invite a descargar la app."]], ["Cómo unir backlinks y descargas de app", ["Puedes crear un smart link específico para cada campaña de backlinks. Por ejemplo: uno para una guía de marcas, otro para un directorio ecommerce y otro para un artículo invitado. Así sabes qué enlace trae clics reales hacia la app.", "Si el usuario llega desde móvil, Link My App lo envía a su tienda correcta. Si llega desde ordenador, puede abrir una landing alternativa con más contexto sobre la app, el ecommerce o la oferta."]], ["Cuándo merece la pena", ["Tiene sentido si tu ecommerce acaba de lanzar app, si compite en un nicho con muchas tiendas, si necesita subir autoridad de dominio o si quiere depender menos de anuncios y redes sociales.", "Los backlinks no sustituyen una buena app ni una buena experiencia de descarga. Pero sí pueden alimentar el embudo: más autoridad, más tráfico orgánico, más usuarios potenciales y más clics medibles hacia la app."]]],
    cards: [["Autoridad", "TuBack.link ayuda a priorizar oportunidades de backlinks para subir señales SEO."], ["Outreach", "Puedes preparar artículos, fichas o menciones con enlaces contextuales."], ["Descargas", "Link My App mide qué backlinks acaban generando clics hacia la app."]],
    checklistTitle: "Checklist rápido",
    checklist: [["Crea tu smart link", "ten una URL de descarga clara antes de mover tráfico."], ["Busca oportunidades", "usa TuBack.link con la categoría y URL de tu ecommerce."], ["Prioriza", "elige webs, directorios o blogs relevantes antes que enlaces genéricos."], ["Crea enlaces por campaña", "separa directorios, guías, posts invitados y QR."], ["Publica contenido útil", "el backlink debe tener contexto natural, no solo una URL pegada."], ["Mide resultados", "revisa clics, dispositivos y descargas estimadas en Link My App."]],
    cta: ["Siguiente paso", "Consigue backlinks y mide descargas", "Usa TuBack.link para encontrar oportunidades SEO y Link My App para saber qué enlaces terminan generando interés por tu app.", "Crear plan en TuBack.link", "Crear smart link en Link My App"],
  },
  en: {
    title: "How to use TuBack.link to build authority after creating your ecommerce app",
    excerpt: "Creating an app is not enough if nobody discovers the store: use Link My App to measure downloads and TuBack.link to find backlinks, outreach angles and SEO opportunities.",
    category: "SEO",
    readTime: "6 min",
    intro: ["After creating an ecommerce app, many brands focus only on social media, QR codes and campaigns. That helps with downloads, but it does not solve a bigger discovery problem: the store also needs authority in Google.", "That is where TuBack.link fits. Its page explains that it uses your category and store URL to return backlink opportunities, outreach angles and priorities. Link My App can then turn that attention into measurable app clicks."],
    sections: [["Why backlinks belong in a Link My App strategy", ["Link My App handles the last mile: someone clicks your link or scans your QR and reaches App Store, Google Play or a fallback according to the device. But before that click exists, the brand needs traffic, authority and places where it appears.", "TuBack.link covers that earlier layer: it helps decide where to publish links, what content to prepare and where to start building authority."]], ["Recommended flow", ["First, create or publish the app and generate a smart link in Link My App. That is the URL you use in campaigns, QR codes, emails and measurable channels.", "Then use TuBack.link with your store category and URL. Prioritize blogs, directories, guides or mentions where you can publish a contextual link toward your ecommerce or an app download landing."]], ["How to connect backlinks and app downloads", ["Create a dedicated smart link for each backlink campaign: one for a brand guide, one for an ecommerce directory and one for a guest article. This shows which source sends real clicks to the app.", "Mobile users go to the correct app store. Desktop users can open a fallback landing with more context about the app or ecommerce offer."]], ["When it is worth doing", ["It is useful after launching an app, in competitive niches, when you need domain authority or when you want to rely less on ads and social posts.", "Backlinks do not replace a good app or a smooth download flow, but they can feed the funnel: more authority, more organic traffic and more measurable clicks toward the app."]]],
    cards: [["Authority", "TuBack.link helps prioritize backlink opportunities for SEO signals."], ["Outreach", "Prepare articles, profiles or mentions with contextual links."], ["Downloads", "Link My App measures which backlinks generate app clicks."]],
    checklistTitle: "Quick checklist",
    checklist: [["Create your smart link", "have a clean download URL before moving traffic."], ["Find opportunities", "use TuBack.link with your ecommerce category and URL."], ["Prioritize", "choose relevant sites, directories or blogs over generic links."], ["Create campaign links", "separate directories, guides, guest posts and QR."], ["Publish useful content", "the backlink should have natural context."], ["Measure results", "check clicks, devices and estimated downloads in Link My App."]],
    cta: ["Next step", "Get backlinks and measure downloads", "Use TuBack.link to find SEO opportunities and Link My App to see which links turn into app interest.", "Create a plan on TuBack.link", "Create a smart link"],
  },
  fr: {
    title: "Comment utiliser TuBack.link pour gagner en autorité après avoir créé l’app de votre ecommerce",
    excerpt: "Créer une app ne suffit pas si personne ne découvre la boutique : utilisez Link My App pour mesurer les téléchargements et TuBack.link pour trouver backlinks, outreach et opportunités SEO.",
    category: "SEO",
    readTime: "6 min",
    intro: ["Après avoir créé l’app d’un ecommerce, beaucoup de marques se concentrent sur les réseaux, QR et campagnes. C’est utile, mais la boutique doit aussi gagner en autorité sur Google.", "TuBack.link s’intègre ici. Sa page indique que l’outil part de la catégorie et de l’URL de la boutique pour proposer des opportunités de backlinks, angles d’outreach et priorités. Link My App transforme ensuite cet intérêt en clics mesurables vers l’app."],
    sections: [["Pourquoi les backlinks ont leur place ici", ["Link My App gère la dernière étape : clic ou QR vers App Store, Google Play ou une alternative selon l’appareil. Mais avant ce clic, la marque a besoin de trafic, d’autorité et de présence.", "TuBack.link couvre cette couche précédente : où publier des liens, quel contenu préparer et par où commencer pour renforcer l’autorité."]], ["Le flux recommandé", ["Créez ou publiez d’abord l’app, puis générez un smart link dans Link My App.", "Utilisez ensuite TuBack.link avec la catégorie et l’URL de votre boutique pour prioriser blogs, annuaires, guides ou mentions."]], ["Relier backlinks et téléchargements", ["Créez un smart link spécifique par campagne de backlinks : guide de marques, annuaire ecommerce ou article invité.", "Sur mobile, Link My App ouvre le store correct. Sur ordinateur, il peut ouvrir une landing alternative avec plus de contexte."]], ["Quand cela vaut le coup", ["C’est utile après le lancement d’une app, dans un marché concurrentiel, pour gagner en autorité de domaine ou dépendre moins des ads.", "Les backlinks alimentent le funnel : plus d’autorité, plus de trafic organique et plus de clics mesurables vers l’app."]]],
    cards: [["Autorité", "TuBack.link aide à prioriser les opportunités de backlinks SEO."], ["Outreach", "Préparez articles, fiches ou mentions avec liens contextuels."], ["Téléchargements", "Link My App mesure quels backlinks génèrent des clics vers l’app."]],
    checklistTitle: "Checklist rapide",
    checklist: [["Créer le smart link", "avoir une URL claire avant d’envoyer du trafic."], ["Trouver des opportunités", "utiliser TuBack.link avec catégorie et URL."], ["Prioriser", "choisir des sites et blogs pertinents."], ["Séparer les campagnes", "annuaire, guide, article invité ou QR."], ["Publier du contenu utile", "le backlink doit avoir un contexte naturel."], ["Mesurer", "regarder clics, appareils et téléchargements estimés."]],
    cta: ["Étape suivante", "Obtenez des backlinks et mesurez les téléchargements", "Utilisez TuBack.link pour trouver des opportunités SEO et Link My App pour voir quels liens créent de l’intérêt pour l’app.", "Créer un plan sur TuBack.link", "Créer un smart link"],
  },
  ja: {
    title: "ECアプリ作成後に TuBack.link で権威性を高める方法",
    excerpt: "アプリを作るだけでは不十分です。Link My App でダウンロードを計測し、TuBack.link で被リンク、掲載依頼、SEO機会を見つけます。",
    category: "SEO",
    readTime: "6分",
    intro: ["ECアプリを作った後、多くのブランドはSNS、QR、キャンペーンに集中します。それは大切ですが、検索で見つけてもらうための権威性も必要です。", "TuBack.link はそこで役立ちます。カテゴリとストアURLから被リンク機会、アウトリーチの切り口、優先順位を返す設計です。Link My App はその関心をアプリへの計測可能なクリックに変えます。"],
    sections: [["なぜ被リンクが Link My App と関係するのか", ["Link My App は最後の導線を担当します。リンクやQRをクリックした人を端末に応じて App Store、Google Play、代替ページへ送ります。", "ただしクリックが生まれる前に、ブランドにはトラフィック、権威性、掲載先が必要です。TuBack.link はその前段階を支えます。"]], ["おすすめの流れ", ["まずアプリを公開し、Link My App でスマートリンクを作ります。", "次に TuBack.link でカテゴリとストアURLを入力し、ブログ、ディレクトリ、ガイド、掲載候補を優先します。"]], ["被リンクとアプリDLをつなげる", ["被リンク施策ごとに専用スマートリンクを作ります。ブランドガイド、ECディレクトリ、ゲスト記事などを分けて計測できます。", "モバイルなら正しいストアへ、PCならアプリ紹介やECの代替ページへ送れます。"]], ["特に向いているケース", ["アプリ公開直後、競争が強いジャンル、ドメイン権威性を上げたい場合に有効です。", "被リンクは良いアプリの代わりではありませんが、検索流入と計測できるアプリクリックを増やす入口になります。"]]],
    cards: [["権威性", "TuBack.link はSEO向けの被リンク候補を優先しやすくします。"], ["掲載依頼", "記事、掲載ページ、文脈のあるリンクを準備できます。"], ["ダウンロード", "Link My App でどの被リンクがアプリクリックにつながるか測れます。"]],
    checklistTitle: "クイックチェックリスト",
    checklist: [["スマートリンクを作る", "流入前に明確なDL用URLを用意する。"], ["機会を探す", "TuBack.link にカテゴリとURLを入れる。"], ["優先する", "関連性の高いサイトやブログを選ぶ。"], ["施策別に分ける", "ディレクトリ、ガイド、記事、QRを分ける。"], ["役立つ内容を公開", "自然な文脈のある被リンクにする。"], ["結果を見る", "クリック、端末、推定DLを確認する。"]],
    cta: ["次のステップ", "被リンクを獲得し、DLを計測する", "TuBack.link でSEO機会を見つけ、Link My App でアプリへの関心を測りましょう。", "TuBack.link で計画を作る", "スマートリンクを作成"],
  },
  de: {
    title: "So nutzt du TuBack.link für mehr Autorität nach der App-Erstellung deines Ecommerce",
    excerpt: "Eine App reicht nicht, wenn niemand den Shop entdeckt: Nutze Link My App für Download-Messung und TuBack.link für Backlinks, Outreach und SEO-Chancen.",
    category: "SEO",
    readTime: "6 Min.",
    intro: ["Nach der App-Erstellung konzentrieren sich viele Shops auf Social Media, QR und Kampagnen. Das hilft bei Downloads, aber der Shop braucht auch Autorität in Google.", "TuBack.link passt in diese Lücke. Die Seite beschreibt, dass Kategorie und Shop-URL zu Backlink-Möglichkeiten, Outreach-Winkeln und Prioritäten werden. Link My App macht daraus messbare App-Klicks."],
    sections: [["Warum Backlinks zu Link My App passen", ["Link My App übernimmt den letzten Schritt: Klick oder QR führt je nach Gerät zu App Store, Google Play oder Fallback. Vorher braucht die Marke aber Traffic und Autorität.", "TuBack.link hilft früher im Funnel: Wo Links veröffentlichen, welche Inhalte vorbereiten und wo mit Autorität beginnen."]], ["Empfohlener Ablauf", ["Erstelle oder veröffentliche zuerst deine App und generiere einen Smartlink in Link My App.", "Nutze danach TuBack.link mit Kategorie und URL, um Blogs, Verzeichnisse, Guides oder Erwähnungen zu priorisieren."]], ["Backlinks und App-Downloads verbinden", ["Erstelle pro Backlink-Kampagne einen eigenen Smartlink. So siehst du, welche Quelle echte App-Klicks erzeugt.", "Mobile Nutzer gehen zum richtigen Store, Desktop-Nutzer zu einer passenden Fallback-Landing."]], ["Wann es sinnvoll ist", ["Nach einem App-Launch, in kompetitiven Nischen, für mehr Domain-Autorität oder weniger Abhängigkeit von Ads.", "Backlinks füllen den Funnel mit mehr Autorität, organischem Traffic und messbaren App-Klicks."]]],
    cards: [["Autorität", "TuBack.link priorisiert Backlink-Chancen für SEO-Signale."], ["Outreach", "Bereite Artikel, Profile oder Erwähnungen mit Kontextlinks vor."], ["Downloads", "Link My App misst, welche Backlinks App-Klicks bringen."]],
    checklistTitle: "Schnelle Checkliste",
    checklist: [["Smartlink erstellen", "eine klare Download-URL vorbereiten."], ["Chancen finden", "TuBack.link mit Kategorie und Ecommerce-URL nutzen."], ["Priorisieren", "relevante Websites, Verzeichnisse oder Blogs wählen."], ["Kampagnen trennen", "Links für Verzeichnisse, Guides, Gastartikel und QR."], ["Nützlichen Content veröffentlichen", "der Backlink braucht natürlichen Kontext."], ["Ergebnisse messen", "Klicks, Geräte und geschätzte Downloads prüfen."]],
    cta: ["Nächster Schritt", "Backlinks gewinnen und Downloads messen", "Nutze TuBack.link für SEO-Chancen und Link My App, um App-Interesse messbar zu machen.", "Plan auf TuBack.link erstellen", "Smartlink erstellen"],
  },
  pt: {
    title: "Como usar o TuBack.link para ganhar autoridade depois de criar a app do teu ecommerce",
    excerpt: "Criar uma app não chega se ninguém descobre a loja: usa o Link My App para medir downloads e o TuBack.link para encontrar backlinks, outreach e oportunidades SEO.",
    category: "SEO",
    readTime: "6 min",
    intro: ["Depois de criar a app de um ecommerce, muitas marcas focam-se em redes sociais, QR e campanhas. Isso ajuda, mas a loja também precisa de autoridade no Google.", "O TuBack.link encaixa aqui. A ferramenta parte da categoria e URL da loja para devolver oportunidades de backlinks, ângulos de outreach e prioridades. O Link My App transforma esse interesse em cliques mensuráveis para a app."],
    sections: [["Porque backlinks fazem sentido no Link My App", ["O Link My App trata da etapa final: clique ou QR para App Store, Google Play ou fallback conforme o dispositivo. Antes disso, a marca precisa de tráfego, autoridade e lugares onde aparecer.", "O TuBack.link cobre essa camada anterior: onde publicar links, que conteúdo preparar e por onde começar a ganhar autoridade."]], ["Fluxo recomendado", ["Primeiro cria ou publica a app e gera um smart link no Link My App.", "Depois usa o TuBack.link com categoria e URL para priorizar blogs, diretórios, guias ou menções com links contextuais."]], ["Unir backlinks e downloads", ["Cria um smart link por campanha de backlinks. Assim sabes que origem gera cliques reais para a app.", "No mobile, o utilizador vai para a loja certa. No computador, abre uma landing alternativa."]], ["Quando vale a pena", ["Após lançar a app, em nichos competitivos, quando queres autoridade de domínio ou menor dependência de ads.", "Backlinks alimentam o funil: mais autoridade, tráfego orgânico e cliques mensuráveis para a app."]]],
    cards: [["Autoridade", "O TuBack.link ajuda a priorizar oportunidades de backlinks."], ["Outreach", "Prepara artigos, fichas ou menções com links contextuais."], ["Downloads", "O Link My App mede que backlinks geram cliques para a app."]],
    checklistTitle: "Checklist rápido",
    checklist: [["Criar o smart link", "ter uma URL clara antes de enviar tráfego."], ["Encontrar oportunidades", "usar o TuBack.link com categoria e URL."], ["Priorizar", "escolher sites, diretórios ou blogs relevantes."], ["Separar campanhas", "links para diretórios, guias, guest posts e QR."], ["Publicar conteúdo útil", "o backlink deve ter contexto natural."], ["Medir resultados", "ver cliques, dispositivos e downloads estimados."]],
    cta: ["Próximo passo", "Consegue backlinks e mede downloads", "Usa o TuBack.link para oportunidades SEO e o Link My App para medir interesse pela app.", "Criar plano no TuBack.link", "Criar smart link"],
  },
  it: {
    title: "Come usare TuBack.link per aumentare l’autorità dopo aver creato l’app ecommerce",
    excerpt: "Creare un’app non basta se nessuno scopre lo store: usa Link My App per misurare i download e TuBack.link per trovare backlink, outreach e opportunità SEO.",
    category: "SEO",
    readTime: "6 min",
    intro: ["Dopo aver creato l’app di un ecommerce, molti brand si concentrano su social, QR e campagne. È utile, ma lo store deve anche guadagnare autorità su Google.", "TuBack.link si inserisce qui. Parte da categoria e URL dello store per proporre opportunità di backlink, angoli di outreach e priorità. Link My App trasforma quell’interesse in clic misurabili verso l’app."],
    sections: [["Perché i backlink hanno senso su Link My App", ["Link My App gestisce l’ultimo passaggio: clic o QR verso App Store, Google Play o fallback in base al dispositivo. Prima però servono traffico, autorità e luoghi dove il brand appaia.", "TuBack.link copre lo strato precedente: dove pubblicare link, che contenuto preparare e da dove iniziare a costruire autorità."]], ["Flusso consigliato", ["Prima crea o pubblica l’app e genera uno smart link in Link My App.", "Poi usa TuBack.link con categoria e URL per priorizzare blog, directory, guide o menzioni."]], ["Collegare backlink e download", ["Crea uno smart link per ogni campagna di backlink. Così sai quale fonte porta clic reali all’app.", "Da mobile si apre lo store corretto; da desktop una landing alternativa."]], ["Quando conviene", ["Dopo il lancio dell’app, in nicchie competitive, quando vuoi più autorità di dominio o meno dipendenza dagli ads.", "I backlink alimentano il funnel: più autorità, traffico organico e clic misurabili verso l’app."]]],
    cards: [["Autorità", "TuBack.link aiuta a priorizzare opportunità di backlink SEO."], ["Outreach", "Prepara articoli, schede o menzioni con link contestuali."], ["Download", "Link My App misura quali backlink generano clic verso l’app."]],
    checklistTitle: "Checklist rapida",
    checklist: [["Crea lo smart link", "prepara una URL di download chiara."], ["Trova opportunità", "usa TuBack.link con categoria e URL."], ["Prioritizza", "scegli siti, directory o blog rilevanti."], ["Separa le campagne", "link per directory, guide, guest post e QR."], ["Pubblica contenuto utile", "il backlink deve avere contesto naturale."], ["Misura i risultati", "controlla clic, dispositivi e download stimati."]],
    cta: ["Prossimo passo", "Ottieni backlink e misura i download", "Usa TuBack.link per trovare opportunità SEO e Link My App per misurare l’interesse verso l’app.", "Crea piano su TuBack.link", "Crea smart link"],
  },
  ko: {
    title: "이커머스 앱을 만든 뒤 TuBack.link로 권위를 높이는 방법",
    excerpt: "스토어가 발견되지 않으면 앱만으로는 부족합니다. Link My App으로 다운로드를 측정하고 TuBack.link로 백링크, 아웃리치, SEO 기회를 찾으세요.",
    category: "SEO",
    readTime: "6분",
    intro: ["이커머스 앱을 만든 뒤 많은 브랜드는 SNS, QR, 캠페인에 집중합니다. 다운로드에는 도움이 되지만 Google에서 스토어 권위를 높이는 것도 중요합니다.", "TuBack.link는 이 지점에 맞습니다. 카테고리와 스토어 URL을 바탕으로 백링크 기회, 아웃리치 각도, 우선순위를 제안합니다. Link My App은 그 관심을 앱 클릭으로 측정합니다."],
    sections: [["왜 백링크가 Link My App 전략에 필요한가", ["Link My App은 마지막 단계를 담당합니다. 링크나 QR 클릭을 기기에 맞게 App Store, Google Play 또는 대체 페이지로 보냅니다.", "하지만 그 클릭 전에 브랜드는 트래픽, 권위, 노출 위치가 필요합니다. TuBack.link는 그 앞단을 돕습니다."]], ["추천 흐름", ["먼저 앱을 만들거나 공개하고 Link My App에서 스마트 링크를 생성합니다.", "그다음 TuBack.link에 카테고리와 URL을 넣어 블로그, 디렉터리, 가이드, 언급 기회를 우선순위로 정합니다."]], ["백링크와 앱 다운로드 연결하기", ["백링크 캠페인마다 전용 스마트 링크를 만드세요. 어떤 출처가 앱 클릭을 만드는지 알 수 있습니다.", "모바일은 올바른 스토어로, 데스크톱은 대체 랜딩으로 이동합니다."]], ["언제 유용한가", ["앱 출시 직후, 경쟁이 강한 니치, 도메인 권위가 필요할 때 유용합니다.", "백링크는 더 많은 권위, 유기적 트래픽, 측정 가능한 앱 클릭을 만듭니다."]]],
    cards: [["권위", "TuBack.link는 SEO 백링크 기회를 우선순위화합니다."], ["아웃리치", "문맥 있는 링크가 들어간 글이나 프로필을 준비합니다."], ["다운로드", "Link My App은 어떤 백링크가 앱 클릭을 만드는지 측정합니다."]],
    checklistTitle: "빠른 체크리스트",
    checklist: [["스마트 링크 만들기", "트래픽을 보내기 전 명확한 다운로드 URL을 준비합니다."], ["기회 찾기", "TuBack.link에 카테고리와 URL을 입력합니다."], ["우선순위 정하기", "관련 있는 사이트와 블로그를 선택합니다."], ["캠페인 분리", "디렉터리, 가이드, 게스트 글, QR 링크를 분리합니다."], ["유용한 콘텐츠 게시", "백링크는 자연스러운 문맥이 있어야 합니다."], ["결과 측정", "클릭, 기기, 예상 다운로드를 확인합니다."]],
    cta: ["다음 단계", "백링크를 얻고 다운로드를 측정하기", "TuBack.link로 SEO 기회를 찾고 Link My App으로 앱 관심을 측정하세요.", "TuBack.link에서 플랜 만들기", "스마트 링크 만들기"],
  },
  nl: {
    title: "Zo gebruik je TuBack.link om autoriteit op te bouwen na je ecommerce-app",
    excerpt: "Een app is niet genoeg als niemand je shop ontdekt: gebruik Link My App voor downloadmeting en TuBack.link voor backlinks, outreach en SEO-kansen.",
    category: "SEO",
    readTime: "6 min",
    intro: ["Na het maken van een ecommerce-app focussen veel merken op social, QR en campagnes. Dat helpt bij downloads, maar je shop heeft ook autoriteit in Google nodig.", "TuBack.link past hier goed. De tool gebruikt categorie en shop-URL om backlinkkansen, outreach-hoeken en prioriteiten te tonen. Link My App maakt appklikken daarna meetbaar."],
    sections: [["Waarom backlinks bij Link My App passen", ["Link My App regelt de laatste stap: klik of QR naar App Store, Google Play of fallback per apparaat. Daarvoor heeft een merk verkeer, autoriteit en vindbare plekken nodig.", "TuBack.link helpt eerder in de funnel: waar links publiceren, welke content voorbereiden en waar je begint met autoriteit."]], ["Aanbevolen flow", ["Maak of publiceer eerst je app en genereer een smartlink in Link My App.", "Gebruik daarna TuBack.link met categorie en URL om blogs, directories, gidsen of vermeldingen te prioriteren."]], ["Backlinks en downloads verbinden", ["Maak per backlinkcampagne een eigen smartlink. Zo zie je welke bron echte appklikken oplevert.", "Mobiel gaat naar de juiste store, desktop naar een fallback landing."]], ["Wanneer het nuttig is", ["Na een app-lancering, in competitieve niches, voor meer domeinautoriteit of minder afhankelijkheid van ads.", "Backlinks voeden de funnel met autoriteit, organisch verkeer en meetbare appklikken."]]],
    cards: [["Autoriteit", "TuBack.link helpt backlinkkansen prioriteren."], ["Outreach", "Bereid artikelen, profielen of vermeldingen met contextlinks voor."], ["Downloads", "Link My App meet welke backlinks appklikken genereren."]],
    checklistTitle: "Snelle checklist",
    checklist: [["Maak je smartlink", "zorg eerst voor een duidelijke download-URL."], ["Vind kansen", "gebruik TuBack.link met categorie en URL."], ["Prioriteer", "kies relevante sites, directories of blogs."], ["Scheid campagnes", "links voor directories, gidsen, guest posts en QR."], ["Publiceer nuttige content", "de backlink moet natuurlijke context hebben."], ["Meet resultaat", "bekijk klikken, apparaten en geschatte downloads."]],
    cta: ["Volgende stap", "Krijg backlinks en meet downloads", "Gebruik TuBack.link voor SEO-kansen en Link My App om appinteresse meetbaar te maken.", "Plan maken op TuBack.link", "Smartlink maken"],
  },
  ar: {
    title: "كيف تستخدم TuBack.link لرفع السلطة بعد إنشاء تطبيق متجرك",
    excerpt: "إنشاء تطبيق لا يكفي إذا لم يكتشف أحد متجرك: استخدم Link My App لقياس التنزيلات وTuBack.link للعثور على روابط خلفية وفرص SEO.",
    category: "SEO",
    readTime: "6 دقائق",
    intro: ["بعد إنشاء تطبيق لمتجر إلكتروني، تركز كثير من العلامات على الشبكات وQR والحملات. هذا يساعد، لكن المتجر يحتاج أيضا إلى سلطة في Google.", "هنا يأتي TuBack.link. يعتمد على التصنيف ورابط المتجر ليقترح فرص روابط خلفية وزوايا تواصل وأولويات. ثم يجعل Link My App النقرات نحو التطبيق قابلة للقياس."],
    sections: [["لماذا الروابط الخلفية مناسبة لـ Link My App", ["Link My App يدير الخطوة الأخيرة: نقرة أو QR إلى App Store أو Google Play أو بديل حسب الجهاز. لكن قبل تلك النقرة تحتاج العلامة إلى زيارات وسلطة وأماكن للظهور.", "TuBack.link يغطي المرحلة السابقة: أين تنشر الروابط، أي محتوى تجهز، ومن أين تبدأ بناء السلطة."]], ["المسار المقترح", ["أولا أنشئ أو انشر التطبيق وأنشئ رابطا ذكيا في Link My App.", "ثم استخدم TuBack.link مع التصنيف ورابط المتجر لتحديد المدونات والأدلة والفرص ذات الأولوية."]], ["ربط الروابط الخلفية بتنزيلات التطبيق", ["أنشئ رابطا ذكيا لكل حملة روابط خلفية. هكذا تعرف أي مصدر يجلب نقرات حقيقية إلى التطبيق.", "الموبايل يذهب إلى المتجر الصحيح، وسطح المكتب إلى صفحة بديلة."]], ["متى يكون مفيدا", ["بعد إطلاق التطبيق، في المجالات التنافسية، عند الحاجة إلى سلطة دومين أو تقليل الاعتماد على الإعلانات.", "الروابط الخلفية تغذي المسار بسلطة أكبر وزيارات عضوية ونقرات قابلة للقياس نحو التطبيق."]]],
    cards: [["السلطة", "TuBack.link يساعد على ترتيب فرص الروابط الخلفية."], ["التواصل", "جهز مقالات أو صفحات أو إشارات بروابط في سياق طبيعي."], ["التنزيلات", "Link My App يقيس أي روابط تولد نقرات للتطبيق."]],
    checklistTitle: "قائمة سريعة",
    checklist: [["أنشئ الرابط الذكي", "جهز URL تنزيل واضح قبل إرسال الزيارات."], ["ابحث عن الفرص", "استخدم TuBack.link مع التصنيف ورابط المتجر."], ["رتب الأولويات", "اختر مواقع وأدلة ومدونات ذات صلة."], ["افصل الحملات", "روابط للأدلة والمقالات وQR."], ["انشر محتوى مفيدا", "الرابط الخلفي يحتاج سياقا طبيعيا."], ["قس النتائج", "راجع النقرات والأجهزة والتنزيلات المقدرة."]],
    cta: ["الخطوة التالية", "احصل على روابط خلفية وقس التنزيلات", "استخدم TuBack.link لفرص SEO وLink My App لقياس الاهتمام بالتطبيق.", "إنشاء خطة على TuBack.link", "إنشاء رابط ذكي"],
  },
  hi: {
    title: "ईकॉमर्स ऐप बनाने के बाद TuBack.link से अथॉरिटी कैसे बढ़ाएं",
    excerpt: "अगर लोग आपके स्टोर को खोज ही नहीं पाते, तो सिर्फ ऐप काफी नहीं है: डाउनलोड मापने के लिए Link My App और बैकलिंक, आउटरीच व SEO अवसर खोजने के लिए TuBack.link इस्तेमाल करें.",
    category: "SEO",
    readTime: "6 मिनट",
    intro: ["ईकॉमर्स ऐप बनाने के बाद कई ब्रांड सोशल मीडिया, QR और कैंपेन पर ध्यान देते हैं. यह डाउनलोड में मदद करता है, लेकिन स्टोर को Google में अथॉरिटी भी चाहिए.", "यहीं TuBack.link काम आता है. श्रेणी और स्टोर URL से बैकलिंक अवसर, आउटरीच एंगल और प्राथमिकताएं मिलती हैं. Link My App उस रुचि को मापने योग्य ऐप क्लिक में बदलता है."],
    sections: [["Link My App रणनीति में बैकलिंक क्यों जरूरी हैं", ["Link My App आखिरी कदम संभालता है: क्लिक या QR के बाद यूज़र को डिवाइस के हिसाब से App Store, Google Play या वैकल्पिक पेज पर भेजना. लेकिन उस क्लिक से पहले ब्रांड को ट्रैफिक, अथॉरिटी और दिखने की जगहें चाहिए.", "TuBack.link फनल के शुरुआती हिस्से में मदद करता है: लिंक कहां प्रकाशित करने हैं, कौन सा कंटेंट तैयार करना है और अथॉरिटी कहां से बनानी है."]], ["सुझाया गया तरीका", ["पहले ऐप बनाएं या प्रकाशित करें और Link My App में स्मार्ट लिंक बनाएं.", "फिर TuBack.link में श्रेणी और URL डालकर ब्लॉग, डायरेक्टरी, गाइड या मेंशन को प्राथमिकता दें."]], ["बैकलिंक और ऐप डाउनलोड को जोड़ना", ["हर बैकलिंक कैंपेन के लिए अलग स्मार्ट लिंक बनाएं. इससे पता चलेगा कि कौन सा स्रोत ऐप क्लिक ला रहा है.", "मोबाइल यूज़र सही स्टोर पर जाते हैं और डेस्कटॉप यूज़र वैकल्पिक लैंडिंग पेज पर."]], ["कब यह काम आता है", ["ऐप लॉन्च के बाद, प्रतिस्पर्धी निच में, डोमेन अथॉरिटी बढ़ाने या विज्ञापनों पर निर्भरता घटाने के लिए.", "बैकलिंक फनल को ज्यादा अथॉरिटी, ऑर्गेनिक ट्रैफिक और मापने योग्य ऐप क्लिक से भरते हैं."]]],
    cards: [["अथॉरिटी", "TuBack.link SEO बैकलिंक अवसरों को प्राथमिकता देने में मदद करता है."], ["आउटरीच", "संदर्भ वाले लिंक के साथ लेख, प्रोफाइल या मेंशन तैयार करें."], ["डाउनलोड", "Link My App मापता है कि कौन से बैकलिंक ऐप क्लिक लाते हैं."]],
    checklistTitle: "त्वरित चेकलिस्ट",
    checklist: [["स्मार्ट लिंक बनाएं", "ट्रैफिक भेजने से पहले साफ डाउनलोड URL रखें."], ["अवसर खोजें", "TuBack.link में श्रेणी और URL डालें."], ["प्राथमिकता दें", "संबंधित साइट, डायरेक्टरी या ब्लॉग चुनें."], ["कैंपेन अलग करें", "डायरेक्टरी, गाइड, गेस्ट पोस्ट और QR के लिए लिंक अलग रखें."], ["उपयोगी कंटेंट प्रकाशित करें", "बैकलिंक प्राकृतिक संदर्भ में होना चाहिए."], ["नतीजे मापें", "क्लिक, डिवाइस और अनुमानित डाउनलोड देखें."]],
    cta: ["अगला कदम", "बैकलिंक पाएं और डाउनलोड मापें", "SEO अवसरों के लिए TuBack.link और ऐप में रुचि मापने के लिए Link My App इस्तेमाल करें.", "TuBack.link पर योजना बनाएं", "स्मार्ट लिंक बनाएं"],
  },
};

function TuBackContent({ article, language }) {
  const [eyebrow, ctaTitle, ctaText, tuBackButton, linkMyAppButton] = article.cta;

  return (
    <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
      {article.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {article.sections.map(([title, paragraphs], index) => (
        <React.Fragment key={title}>
          <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">{title}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {index === 1 && (
            <div className="grid gap-4 rounded-[28px] border border-black/10 bg-[#f7f7f5] p-5 sm:grid-cols-3 sm:p-6">
              {article.cards.map(([cardTitle, cardText]) => (
                <div key={cardTitle} className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-black text-black">{cardTitle}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-black/55">{cardText}</p>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}

      <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">{article.checklistTitle}</h2>
      <ul className="space-y-3">
        {article.checklist.map(([label, text], index) => (
          <li key={label}>
            <strong>{index + 1}. {label}:</strong> {text}
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-[28px] bg-black p-6 text-white sm:p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">{eyebrow}</p>
        <h2 className="mt-3 text-[24px] font-black leading-tight sm:text-[28px]">{ctaTitle}</h2>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/68">{ctaText}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={tuBackUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-black transition hover:-translate-y-0.5"
          >
            {tuBackButton}
          </a>
          <Link
            to={localizePath("/", language)}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
          >
            {linkMyAppButton}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function getTuBackPost(language, post) {
  const article = translations[language] || translations.en;

  return {
    ...post,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    readTime: article.readTime,
    content: <TuBackContent article={article} language={language} />,
  };
}

export const tuBackBlogPost = {
  slug: tuBackSlug,
  title: translations.es.title,
  date: "8 de Julio, 2026",
  category: translations.es.category,
  excerpt: translations.es.excerpt,
  readTime: translations.es.readTime,
  author: authorData,
  coverComponent: <TuBackCover />,
  content: <TuBackContent article={translations.es} language="es" />,
};
