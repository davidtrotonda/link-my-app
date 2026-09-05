import React from "react";
import { Link } from "react-router-dom";
import { Link2, MousePointer2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";

export const tienRankSlug = "tienrank-app-ecommerce-fichas-producto";

const tienRankUrl = "https://tienrank.com/";
const tienRankLogoUrl = "/partner-logos/tienrank-brand-v3-512.png";

const authorData = {
  name: "David Trotonda",
  role: "CEO de SkeilApps",
  img: "/partner-logos/skeilapps-logo.png",
};

const coverCopy = {
  es: { badge: "SEO + GEO", title: "Ficha indexable", rank: "Ranking", product: "Producto", smart: "Smart link", app: "App" },
  en: { badge: "SEO + GEO", title: "Indexable profile", rank: "Ranking", product: "Product", smart: "Smart link", app: "App" },
  fr: { badge: "SEO + GEO", title: "Fiche indexable", rank: "Classement", product: "Produit", smart: "Smart link", app: "App" },
  ja: { badge: "SEO + GEO", title: "検索可能な掲載", rank: "ランキング", product: "商品", smart: "スマートリンク", app: "アプリ" },
  de: { badge: "SEO + GEO", title: "Indexierbares Profil", rank: "Ranking", product: "Produkt", smart: "Smartlink", app: "App" },
  pt: { badge: "SEO + GEO", title: "Ficha indexável", rank: "Ranking", product: "Produto", smart: "Smart link", app: "App" },
  it: { badge: "SEO + GEO", title: "Scheda indicizzabile", rank: "Ranking", product: "Prodotto", smart: "Smart link", app: "App" },
  ko: { badge: "SEO + GEO", title: "검색 노출 프로필", rank: "랭킹", product: "상품", smart: "스마트 링크", app: "앱" },
  nl: { badge: "SEO + GEO", title: "Indexeerbaar profiel", rank: "Ranking", product: "Product", smart: "Smartlink", app: "App" },
  ar: { badge: "SEO + GEO", title: "صفحة قابلة للفهرسة", rank: "ترتيب", product: "منتج", smart: "رابط ذكي", app: "تطبيق" },
  hi: { badge: "SEO + GEO", title: "इंडेक्स होने वाली प्रोफाइल", rank: "रैंकिंग", product: "उत्पाद", smart: "स्मार्ट लिंक", app: "ऐप" },
};

function TienRankCover() {
  const { i18n } = useTranslation();
  const copy = coverCopy[normalizeLanguage(i18n.language)] || coverCopy.en;

  return (
    <div className="tienrank-cover relative h-full w-full overflow-hidden rounded-2xl border border-black/5 bg-[#f8fafc] p-4">
      <style>{`
        @keyframes tienRankRise {
          0%, 100% { transform: translateY(10px); opacity: .62; }
          45%, 70% { transform: translateY(0); opacity: 1; }
        }
        @keyframes tienRankSweep {
          0% { transform: translateX(-110%); opacity: 0; }
          24%, 62% { opacity: .7; }
          100% { transform: translateX(130%); opacity: 0; }
        }
        @keyframes tienRankTap {
          0%, 100% { transform: scale(.9); opacity: .35; }
          45% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes tienRankPodium {
          0% { transform: scaleY(.5); opacity: .55; }
          58%, 100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 opacity-75 [background-image:linear-gradient(#e7eaf0_1px,transparent_1px),linear-gradient(90deg,#e7eaf0_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-20 flex items-center justify-between">
        <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-black/45 shadow-sm">
          {copy.badge}
        </div>
        <div className="rounded-full bg-black px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] text-white">
          {copy.rank}
        </div>
      </div>

      <div className="absolute left-5 top-[74px] z-20 w-[92px] rounded-[22px] border border-black/10 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="mb-2 text-[8px] font-black uppercase tracking-[0.15em] text-black/35">{copy.product}</div>
        <div className="relative h-11 overflow-hidden rounded-2xl bg-slate-100">
          <span className="absolute left-2 top-2 h-7 w-7 rounded-xl bg-black" />
          <span className="absolute left-11 top-2 h-2 w-8 rounded-full bg-slate-300" />
          <span className="absolute left-11 top-5 h-2 w-6 rounded-full bg-slate-300" />
          <span className="absolute inset-y-0 left-0 w-9 bg-white/70 blur-md" style={{ animation: "tienRankSweep 3.2s ease-in-out infinite" }} />
        </div>
        <div className="mt-2 rounded-full bg-emerald-100 px-2 py-1 text-center text-[8px] font-black text-emerald-700">INDEX</div>
      </div>

      <div className="absolute left-1/2 top-[50px] z-30 w-[146px] -translate-x-1/2 rounded-[26px] border border-black/10 bg-white p-3 shadow-[0_24px_56px_rgba(15,23,42,0.14)]" style={{ animation: "tienRankRise 4.8s ease-in-out infinite" }}>
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-black p-1.5">
            <img src={tienRankLogoUrl} alt="TienRank" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[7px] font-black uppercase tracking-[0.15em] text-black/35">TienRank</div>
            <div className="truncate text-[10px] font-black text-black">{copy.title}</div>
          </div>
        </div>
        <div className="mt-3 flex items-end justify-center gap-2">
          {[48, 78, 58].map((height, index) => (
            <span
              key={height}
              className={`${index === 1 ? "bg-emerald-400" : "bg-slate-900"} block w-7 origin-bottom rounded-t-2xl`}
              style={{ height: `${height / 3}px`, animation: `tienRankPodium 3.4s ease-in-out ${index * 0.2}s infinite alternate` }}
            />
          ))}
        </div>
        <div className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-yellow-400 text-[10px] font-black text-black shadow-[0_10px_25px_rgba(234,179,8,0.24)]">#1</div>
      </div>

      <div className="absolute right-5 top-[82px] z-20 w-[88px] rounded-[22px] border border-black/10 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.15em] text-black/35">{copy.rank}</span>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-black text-[8px] font-black text-white">+7</span>
        </div>
        <div className="space-y-1.5">
          {[1, 2, 3].map((rank, index) => (
            <div key={rank} className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1">
              <span className="text-[8px] font-black text-black/45">{rank}</span>
              <span className={`${index === 0 ? "bg-emerald-400" : "bg-slate-300"} h-2 flex-1 rounded-full`} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-20 w-[112px] rounded-[22px] border border-black/10 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.15em] text-black/35">{copy.smart}</span>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400" style={{ animation: "tienRankTap 2.5s ease-in-out infinite" }} />
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-2 py-2">
          <Link2 size={13} />
          <span className="truncate text-[9px] font-black text-black">link-my.app</span>
        </div>
        <div className="mt-2 rounded-full bg-black px-2 py-1 text-center text-[8px] font-black text-white">{copy.app}</div>
      </div>

      <div className="absolute bottom-6 left-6 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white text-black shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
        <MousePointer2 size={14} />
      </div>
    </div>
  );
}

const translations = {
  es: {
    title: "Por qué subir tu ecommerce a TienRank después de crear tu app",
    excerpt: "Crear una app para tu tienda online es solo una parte: usa Link My App para llevar usuarios a la descarga y TienRank para ganar visibilidad con fichas, productos y SEO/GEO.",
    category: "ECOMMERCE",
    readTime: "6 min",
    intro: [
      "Cuando una tienda online crea su propia app, normalmente piensa en App Store, Google Play, campañas y QR. Todo eso es importante, pero hay otra pregunta igual de práctica: dónde puede descubrirte alguien que aún no te conoce.",
      "Ahí encaja TienRank. Link My App ayuda a que cada clic vaya a la tienda de apps correcta; TienRank puede ayudarte a que tu ecommerce, tus productos y tu propuesta aparezcan en un entorno pensado para rankings, fichas indexables y descubrimiento SEO/GEO.",
    ],
    sections: [
      ["Por qué este tema tiene sentido en Link My App", ["Link My App no va solo de acortar URLs. Va de distribuir mejor una app: una URL para iPhone, Android, ordenador, QR, campañas y medición. Pero una app no consigue descargas si nadie llega a conocer la tienda.", "TienRank funciona como una capa anterior del embudo: ayuda a presentar tu tienda online en una ficha permanente, con contexto de ecommerce y posibilidades de aparecer en rankings, noticias o búsquedas relacionadas. Si alguien descubre tu marca allí, después puedes llevarlo a descargar la app con un smart link."]],
      ["El flujo recomendado para una tienda con app", ["Primero publicas la app o la creas con una tecnología sincronizada con tu ecommerce. Después generas un enlace único en Link My App con App Store, Google Play y una URL alternativa. Ese enlace te sirve para bio, packaging, emails, campañas y QR.", "Luego subes tu ecommerce a TienRank y trabajas la ficha: qué vendes, categoría, productos destacados, propuesta diferencial, tecnología, comunidad y enlaces clave. Así tu tienda no depende solo de anuncios o redes sociales para ser descubierta."]],
      ["Cómo enlazar TienRank con Link My App", ["Puedes crear un smart link específico para TienRank. Así, si alguien entra desde tu ficha, sabrás que ese canal ha generado clics hacia la app. Si el usuario está en iPhone irá a App Store, si está en Android irá a Google Play y si está en ordenador verá la URL alternativa que hayas elegido.", "También puedes crear enlaces por producto o campaña: un enlace para una colección concreta, otro para una ficha de marca y otro para una campaña de lanzamiento. El panel de Link My App te ayuda a separar esos clics y no mezclar todas las fuentes."]],
      ["Cuándo merece especialmente la pena", ["Tiene mucho sentido si acabas de lanzar la app de una tienda, si tienes productos visuales, si quieres aparecer en búsquedas de ecommerce o si necesitas más señales para que usuarios y herramientas de IA entiendan qué haces.", "En vez de depender solo de Instagram o anuncios, conviertes tu tienda, tus fichas y tu app en activos que pueden recibir tráfico desde más sitios."]],
    ],
    cards: [["App", "Un smart link lleva cada clic a App Store, Google Play o tu alternativa."], ["Productos", "La ficha puede explicar qué vendes y qué productos o categorías quieres destacar."], ["Medición", "Con enlaces separados puedes saber si TienRank, QR o redes traen más interés."]],
    checklistTitle: "Checklist rápido",
    checklist: [["Publica o prepara tu app", "asegúrate de tener los enlaces finales de App Store y Google Play."], ["Crea tu smart link", "usa Link My App para tener una sola URL y QR medible."], ["Sube tu tienda a TienRank", "trabaja una ficha clara con categoría, propuesta y productos destacados."], ["Añade el enlace de descarga", "usa un smart link específico para medir el tráfico que venga desde TienRank."], ["Separa campañas", "crea enlaces distintos para productos, QR, redes o fichas si quieres comparar resultados."], ["Revisa datos", "mira clics, QR, dispositivos y descargas estimadas para decidir qué canal reforzar."]],
    cta: ["Siguiente paso", "Haz que descubran tu tienda y tu app", "Sube tu ecommerce a TienRank para ganar visibilidad y usa Link My App para convertir ese interés en descargas medibles.", "Subir ecommerce a TienRank", "Crear smart link en Link My App"],
  },
  en: {
    title: "Why add your ecommerce to TienRank after creating your app",
    excerpt: "Creating an app for your online store is only one part: use Link My App to send users to the right download and TienRank to gain visibility with profiles, products and SEO/GEO.",
    category: "ECOMMERCE",
    readTime: "6 min",
    intro: ["When an online store creates its own app, the first focus is usually App Store, Google Play, campaigns and QR codes. All of that matters, but people also need a place to discover the brand before they already know it.", "That is where TienRank fits. Link My App sends each click to the right app destination; TienRank can help your ecommerce, products and positioning appear in a place built for rankings, indexable profiles and SEO/GEO discovery."],
    sections: [["Why this belongs on Link My App", ["Link My App is not just about shortening URLs. It is about distributing an app better: one URL for iPhone, Android, desktop, QR, campaigns and measurement. But an app cannot get downloads if people never discover the store.", "TienRank works one step earlier in the funnel: it presents your online store through a permanent profile with ecommerce context. Once someone discovers the brand there, your smart link can move that interest toward the app."]], ["A recommended flow for a store with an app", ["First, publish the app or create it with technology that stays synced with your ecommerce. Then create one Link My App URL with App Store, Google Play and a fallback page.", "Then add your ecommerce to TienRank and work on the profile: what you sell, category, featured products, differentiation, technology, community and key links."]], ["How to connect TienRank with Link My App", ["Create a specific smart link for TienRank. If someone comes from your profile, you will know that channel generated app interest. iPhone users go to App Store, Android users go to Google Play and desktop users open your chosen fallback.", "You can also create links by product or campaign so the Link My App dashboard keeps those clicks separated."]], ["When it is especially useful", ["It makes sense after launching a store app, with visual products, when you want ecommerce search visibility or when users and AI tools need clearer signals about what you do.", "Instead of depending only on Instagram or ads, your store, product pages and app become assets that can receive discovery from more places."]]],
    cards: [["App", "A smart link sends each click to App Store, Google Play or your fallback."], ["Products", "The profile can explain what you sell and which products or categories matter most."], ["Measurement", "Separate links help you see whether TienRank, QR or social channels create more interest."]],
    checklistTitle: "Quick checklist",
    checklist: [["Publish or prepare the app", "confirm your final App Store and Google Play links."], ["Create your smart link", "use Link My App to get one measurable URL and QR code."], ["Add your store to TienRank", "build a clear profile with category, positioning and featured products."], ["Add the download link", "use a dedicated smart link to measure traffic from TienRank."], ["Separate campaigns", "create different links for products, QR, social media or profiles."], ["Review data", "check clicks, QR, devices and estimated downloads."]],
    cta: ["Next step", "Help people discover your store and your app", "Add your ecommerce to TienRank for visibility and use Link My App to turn that attention into measurable downloads.", "Add ecommerce to TienRank", "Create a smart link"],
  },
  fr: {
    title: "Pourquoi ajouter votre ecommerce à TienRank après avoir créé votre app",
    excerpt: "Créer une app pour votre boutique n’est qu’une étape : Link My App dirige chaque clic vers le bon store et TienRank donne plus de visibilité à vos fiches, produits et contenus SEO/GEO.",
    category: "ECOMMERCE",
    readTime: "6 min",
    intro: ["Quand une boutique en ligne crée son app, elle pense souvent à App Store, Google Play, campagnes et QR. C’est essentiel, mais il faut aussi un endroit où être découverte avant que la marque soit connue.", "C’est là que TienRank s’intègre bien. Link My App envoie chaque clic vers la bonne destination de téléchargement ; TienRank peut donner de la visibilité à votre ecommerce, vos produits et votre positionnement."],
    sections: [["Pourquoi ce sujet a sa place ici", ["Link My App sert à mieux distribuer une app : un lien pour iPhone, Android, ordinateur, QR, campagnes et mesure. Mais une app ne gagne pas de téléchargements si personne ne découvre la boutique.", "TienRank agit plus haut dans le funnel avec une fiche permanente et un contexte ecommerce. Ensuite, le smart link transforme cet intérêt en téléchargement."]], ["Le flux recommandé", ["Publiez l’app ou créez-la avec une technologie synchronisée avec votre ecommerce. Puis créez une URL unique dans Link My App avec App Store, Google Play et une page alternative.", "Ajoutez ensuite votre ecommerce à TienRank et travaillez la fiche : produits, catégorie, différence, technologie, communauté et liens clés."]], ["Connecter TienRank et Link My App", ["Créez un smart link spécifique pour TienRank. Vous saurez si la fiche génère de l’intérêt pour l’app, tout en envoyant iPhone vers App Store, Android vers Google Play et ordinateur vers l’alternative.", "Vous pouvez aussi créer des liens par produit, collection ou campagne pour garder les clics séparés."]], ["Quand cela vaut le coup", ["C’est utile après le lancement d’une app, pour des produits visuels, pour gagner en visibilité ecommerce ou pour aider utilisateurs et IA à comprendre ce que vous faites.", "La boutique, les fiches et l’app deviennent des actifs découvrables, pas seulement des pages dépendantes des réseaux ou ads."]]],
    cards: [["App", "Un smart link envoie chaque clic vers App Store, Google Play ou votre alternative."], ["Produits", "La fiche explique ce que vous vendez et les produits ou catégories à pousser."], ["Mesure", "Des liens séparés montrent si TienRank, QR ou réseaux créent plus d’intérêt."]],
    checklistTitle: "Checklist rapide",
    checklist: [["Publier ou préparer l’app", "vérifiez les liens finaux App Store et Google Play."], ["Créer le smart link", "utilisez Link My App pour une URL et un QR mesurables."], ["Ajouter la boutique à TienRank", "préparez une fiche claire avec catégorie, positionnement et produits."], ["Ajouter le lien de téléchargement", "utilisez un smart link dédié pour mesurer TienRank."], ["Séparer les campagnes", "créez des liens différents pour produits, QR, réseaux ou fiches."], ["Analyser les données", "regardez clics, QR, appareils et téléchargements estimés."]],
    cta: ["Étape suivante", "Faites découvrir votre boutique et votre app", "Ajoutez votre ecommerce à TienRank pour gagner en visibilité et utilisez Link My App pour convertir cet intérêt en téléchargements mesurables.", "Ajouter mon ecommerce à TienRank", "Créer un smart link"],
  },
  ja: {
    title: "ECアプリ作成後に TienRank へ掲載する理由",
    excerpt: "オンラインストアのアプリ作成は一部にすぎません。Link My App で正しいダウンロード先へ送り、TienRank で店舗・商品・SEO/GEO の発見性を高めます。",
    category: "ECOMMERCE",
    readTime: "6分",
    intro: ["オンラインストアが自社アプリを作ると、まず App Store、Google Play、キャンペーン、QR が重要になります。ただし、まだブランドを知らない人に見つけてもらう場所も必要です。", "TienRank はそこに合います。Link My App はクリックを正しいアプリストアへ送り、TienRank はランキング、検索可能な掲載ページ、SEO/GEO 文脈でストアや商品を見つけてもらう場所になります。"],
    sections: [["なぜ Link My App のブログで扱うのか", ["Link My App はURL短縮だけではなく、iPhone、Android、PC、QR、キャンペーン、計測に対応してアプリ配布をシンプルにします。ただし店舗が見つからなければ、アプリのダウンロードも増えません。", "TienRank はその前段階の発見チャネルになります。EC文脈のある掲載ページからブランドを知った人を、スマートリンクでアプリダウンロードへつなげられます。"]], ["おすすめの流れ", ["まずアプリを公開するか、ECと同期できる技術で作成します。次に Link My App で App Store、Google Play、代替ページを1つのURLにまとめます。", "その後 TienRank にECを掲載し、販売商品、カテゴリ、注目商品、強み、技術、コミュニティ、重要リンクを整理します。"]], ["TienRank と Link My App のつなげ方", ["TienRank専用のスマートリンクを作ると、その掲載ページがアプリへの関心を生んだか分かります。iPhone は App Store、Android は Google Play、PC は指定した代替ページへ進みます。", "商品やキャンペーン別にリンクを分けることもできます。コレクション、ブランド掲載、ローンチ施策などを個別に計測できます。"]], ["特に向いているケース", ["アプリ公開直後、視覚的な商品が多いブランド、EC検索で露出を増やしたい店舗、ユーザーやAIに何をしているか理解してもらいたい場合に向いています。", "SNSや広告だけに頼らず、店舗、商品ページ、アプリを発見される資産にできます。"]]],
    cards: [["アプリ", "クリックを正しいストアまたは代替ページへ送る。"], ["商品", "掲載ページで商品やカテゴリの魅力を説明する。"], ["計測", "TienRank、QR、SNSの反応をリンク別に比較できる。"]],
    checklistTitle: "クイックチェックリスト",
    checklist: [["アプリを公開または準備", "App Store と Google Play の最終リンクを確認する。"], ["スマートリンクを作成", "Link My App で計測できるURLとQRを作る。"], ["TienRank に掲載", "カテゴリ、強み、商品が伝わる掲載ページにする。"], ["ダウンロードリンクを追加", "TienRank専用スマートリンクで流入を計測する。"], ["キャンペーンを分ける", "商品、QR、SNS、掲載別にリンクを作る。"], ["データを見る", "クリック、QR、端末、推定ダウンロードを確認する。"]],
    cta: ["次のステップ", "ストアとアプリを見つけてもらう", "TienRank でECの発見性を高め、Link My App でその関心を計測できるダウンロードへつなげましょう。", "TienRank にECを掲載する", "スマートリンクを作成"],
  },
  de: {
    title: "Warum du deinen Ecommerce nach der App-Erstellung bei TienRank eintragen solltest",
    excerpt: "Eine App für deinen Online-Shop ist nur ein Teil: Link My App führt Nutzer zum richtigen Download, TienRank bringt Sichtbarkeit für Profil, Produkte und SEO/GEO.",
    category: "ECOMMERCE",
    readTime: "6 Min.",
    intro: ["Wenn ein Online-Shop eine eigene App erstellt, geht es zuerst um App Store, Google Play, Kampagnen und QR-Codes. Genauso wichtig ist aber die Frage, wo Menschen dich entdecken, bevor sie deine Marke kennen.", "Hier passt TienRank dazu. Link My App leitet jeden Klick zum richtigen App-Ziel; TienRank kann deinem Shop, deinen Produkten und deiner Positionierung mehr Sichtbarkeit über Rankings, indexierbare Profile und SEO/GEO geben."],
    sections: [["Warum das Thema zu Link My App passt", ["Link My App ist mehr als URL-Verkürzung. Es geht darum, eine App besser zu verteilen: eine URL für iPhone, Android, Desktop, QR, Kampagnen und Messung. Aber eine App bekommt keine Downloads, wenn der Shop nicht entdeckt wird.", "TienRank wirkt früher im Funnel: Ein permanentes Ecommerce-Profil macht deine Marke auffindbar. Danach führt der Smartlink das Interesse zur App."]], ["Der empfohlene Ablauf", ["Veröffentliche zuerst die App oder erstelle sie mit einer Technologie, die mit deinem Ecommerce synchron bleibt. Danach erstellst du in Link My App eine URL mit App Store, Google Play und Fallback.", "Dann trägst du deinen Ecommerce bei TienRank ein und arbeitest am Profil: Sortiment, Kategorie, wichtige Produkte, Differenzierung, Technologie, Community und zentrale Links."]], ["TienRank mit Link My App verbinden", ["Erstelle einen eigenen Smartlink für TienRank. So erkennst du, ob das Profil App-Interesse erzeugt. iPhone geht zum App Store, Android zu Google Play und Desktop zur gewählten Alternative.", "Du kannst auch Links nach Produkt oder Kampagne trennen, damit das Dashboard die Klicks sauber auseinanderhält."]], ["Wann es besonders sinnvoll ist", ["Es lohnt sich nach einem App-Launch, bei visuellen Produkten, bei mehr Ecommerce-Sichtbarkeit oder wenn Nutzer und KI-Tools dein Angebot besser verstehen sollen.", "In umkämpften Nischen bekommt dein Shop zusätzliche auffindbare Assets statt nur Social oder Ads."]]],
    cards: [["App", "Ein Smartlink sendet jeden Klick zum App Store, Google Play oder Fallback."], ["Produkte", "Das Profil erklärt, was du verkaufst und welche Produkte wichtig sind."], ["Messung", "Separate Links zeigen, ob TienRank, QR oder Social mehr Interesse bringen."]],
    checklistTitle: "Schnelle Checkliste",
    checklist: [["App veröffentlichen oder vorbereiten", "finale App-Store- und Google-Play-Links prüfen."], ["Smartlink erstellen", "eine messbare URL und QR mit Link My App erzeugen."], ["Shop bei TienRank eintragen", "Profil mit Kategorie, Positionierung und Produkten aufbauen."], ["Downloadlink ergänzen", "einen eigenen Smartlink für TienRank nutzen."], ["Kampagnen trennen", "Links für Produkte, QR, Social oder Profile erstellen."], ["Daten prüfen", "Klicks, QR, Geräte und geschätzte Downloads auswerten."]],
    cta: ["Nächster Schritt", "Mach Shop und App besser auffindbar", "Trage deinen Ecommerce bei TienRank ein und nutze Link My App, um Interesse in messbare Downloads zu verwandeln.", "Ecommerce bei TienRank eintragen", "Smartlink erstellen"],
  },
  pt: {
    title: "Porque deves adicionar o teu ecommerce ao TienRank depois de criar a app",
    excerpt: "Criar uma app para a tua loja é só uma parte: usa o Link My App para levar cada utilizador ao download certo e o TienRank para ganhar visibilidade com fichas, produtos e SEO/GEO.",
    category: "ECOMMERCE",
    readTime: "6 min",
    intro: ["Quando uma loja online cria a sua app, pensa primeiro em App Store, Google Play, campanhas e QR. Mas também precisa de ser descoberta por quem ainda não conhece a marca.", "É aí que entra o TienRank. O Link My App envia cada clique para o destino certo da app; o TienRank pode dar visibilidade ao ecommerce, aos produtos e ao posicionamento através de rankings, fichas indexáveis e SEO/GEO."],
    sections: [["Porque este tema faz sentido no Link My App", ["O Link My App não serve apenas para encurtar URLs. Serve para distribuir melhor uma app: uma URL para iPhone, Android, computador, QR, campanhas e medição. Mas a app não ganha downloads se ninguém descobrir a loja.", "O TienRank atua antes no funil: apresenta a loja numa ficha permanente com contexto de ecommerce. Depois, o smart link transforma esse interesse em downloads."]], ["Fluxo recomendado", ["Primeiro publicas a app ou crias uma tecnologia sincronizada com o ecommerce. Depois crias no Link My App uma URL com App Store, Google Play e fallback.", "A seguir adicionas a loja ao TienRank e trabalhas a ficha: o que vendes, categoria, produtos destacados, diferenciação, tecnologia, comunidade e links importantes."]], ["Ligar TienRank ao Link My App", ["Cria um smart link específico para TienRank. Assim sabes se a ficha gera interesse pela app. iPhone vai para App Store, Android para Google Play e computador para a alternativa escolhida.", "Também podes criar links por produto ou campanha para manter os cliques separados no painel."]], ["Quando vale especialmente a pena", ["Faz sentido após lançar a app, com produtos visuais, quando procuras visibilidade ecommerce ou quando queres que utilizadores e ferramentas de IA entendam melhor o que fazes.", "A loja, as fichas e a app tornam-se ativos descobríveis, não apenas páginas dependentes de redes ou anúncios."]]],
    cards: [["App", "Um smart link envia cada clique para App Store, Google Play ou fallback."], ["Produtos", "A ficha explica o que vendes e que produtos ou categorias queres destacar."], ["Medição", "Links separados mostram se TienRank, QR ou redes geram mais interesse."]],
    checklistTitle: "Checklist rápido",
    checklist: [["Publicar ou preparar a app", "confirma os links finais da App Store e Google Play."], ["Criar o smart link", "gera uma URL e QR mensuráveis no Link My App."], ["Adicionar a loja ao TienRank", "cria uma ficha com categoria, posicionamento e produtos."], ["Adicionar o link de download", "usa um smart link dedicado para medir o TienRank."], ["Separar campanhas", "cria links para produtos, QR, redes ou fichas."], ["Rever dados", "analisa cliques, QR, dispositivos e downloads estimados."]],
    cta: ["Próximo passo", "Faz descobrir a tua loja e a tua app", "Adiciona o ecommerce ao TienRank para ganhar visibilidade e usa o Link My App para transformar interesse em downloads mensuráveis.", "Adicionar ecommerce ao TienRank", "Criar smart link"],
  },
  it: {
    title: "Perché aggiungere il tuo ecommerce a TienRank dopo aver creato l’app",
    excerpt: "Creare un’app per il tuo negozio è solo una parte: usa Link My App per portare gli utenti al download corretto e TienRank per dare visibilità a schede, prodotti e SEO/GEO.",
    category: "ECOMMERCE",
    readTime: "6 min",
    intro: ["Quando un negozio online crea la propria app, pensa subito ad App Store, Google Play, campagne e QR. Ma serve anche un luogo dove farsi scoprire da chi non conosce ancora il brand.", "Qui entra TienRank. Link My App manda ogni clic alla destinazione app corretta; TienRank può aiutare ecommerce, prodotti e posizionamento a essere trovati tramite ranking, schede indicizzabili e SEO/GEO."],
    sections: [["Perché questo tema ha senso su Link My App", ["Link My App non è solo un accorciatore di URL. Serve a distribuire meglio un’app: una URL per iPhone, Android, desktop, QR, campagne e misurazione. Ma l’app non ottiene download se il negozio non viene scoperto.", "TienRank lavora prima nel funnel: presenta il negozio in una scheda permanente con contesto ecommerce. Poi lo smart link trasforma quell’interesse in download."]], ["Il flusso consigliato", ["Prima pubblichi l’app o la crei con una tecnologia sincronizzata con l’ecommerce. Poi crei in Link My App una URL con App Store, Google Play e fallback.", "Dopo aggiungi lo store a TienRank e lavori sulla scheda: cosa vendi, categoria, prodotti in evidenza, differenziazione, tecnologia, community e link chiave."]], ["Collegare TienRank con Link My App", ["Crea uno smart link specifico per TienRank. Saprai se la scheda genera interesse verso l’app. iPhone va ad App Store, Android a Google Play e desktop alla pagina alternativa scelta.", "Puoi anche creare link per prodotto o campagna per tenere separati i clic nel pannello."]], ["Quando è particolarmente utile", ["È utile dopo il lancio dell’app, con prodotti visivi, quando vuoi più visibilità ecommerce o quando vuoi aiutare utenti e strumenti AI a capire cosa fai.", "Store, schede e app diventano asset scopribili, non solo pagine dipendenti da social o ads."]]],
    cards: [["App", "Uno smart link porta ogni clic ad App Store, Google Play o fallback."], ["Prodotti", "La scheda spiega cosa vendi e quali prodotti o categorie vuoi spingere."], ["Misurazione", "Link separati mostrano se TienRank, QR o social generano più interesse."]],
    checklistTitle: "Checklist rapida",
    checklist: [["Pubblica o prepara l’app", "controlla i link finali di App Store e Google Play."], ["Crea lo smart link", "genera URL e QR misurabili in Link My App."], ["Aggiungi lo store a TienRank", "crea una scheda con categoria, posizionamento e prodotti."], ["Aggiungi il link di download", "usa uno smart link dedicato per misurare TienRank."], ["Separa le campagne", "crea link per prodotti, QR, social o schede."], ["Controlla i dati", "analizza clic, QR, dispositivi e download stimati."]],
    cta: ["Prossimo passo", "Fai scoprire il tuo store e la tua app", "Aggiungi l’ecommerce a TienRank per guadagnare visibilità e usa Link My App per trasformare l’interesse in download misurabili.", "Aggiungi ecommerce a TienRank", "Crea smart link"],
  },
  ko: {
    title: "이커머스 앱을 만든 뒤 TienRank에 등록해야 하는 이유",
    excerpt: "온라인 스토어 앱을 만드는 것은 시작입니다. Link My App으로 올바른 다운로드로 보내고, TienRank로 프로필, 상품, SEO/GEO 노출을 키울 수 있습니다.",
    category: "이커머스",
    readTime: "6분",
    intro: ["온라인 스토어가 자체 앱을 만들면 App Store, Google Play, 캠페인, QR을 먼저 생각합니다. 하지만 브랜드를 아직 모르는 사람이 어디서 발견할지도 중요합니다.", "여기에 TienRank가 맞습니다. Link My App은 클릭을 올바른 앱 목적지로 보내고, TienRank는 랭킹, 검색 가능한 프로필, SEO/GEO 맥락에서 스토어와 상품을 발견하게 도와줍니다."],
    sections: [["왜 Link My App 블로그에서 다루는가", ["Link My App은 단순한 URL 단축이 아닙니다. iPhone, Android, 데스크톱, QR, 캠페인, 측정을 위한 앱 배포 도구입니다. 하지만 스토어가 발견되지 않으면 앱 다운로드도 늘기 어렵습니다.", "TienRank는 퍼널의 앞단에서 작동합니다. 이커머스 맥락의 영구 프로필로 브랜드를 보여주고, 이후 스마트 링크가 관심을 앱 다운로드로 연결합니다."]], ["추천 흐름", ["먼저 앱을 공개하거나 이커머스와 동기화되는 기술로 만듭니다. 그다음 Link My App에서 App Store, Google Play, 대체 페이지를 하나의 URL로 묶습니다.", "이후 TienRank에 스토어를 등록하고 판매 상품, 카테고리, 대표 상품, 차별점, 기술, 커뮤니티, 핵심 링크를 정리합니다."]], ["TienRank와 Link My App 연결 방법", ["TienRank 전용 스마트 링크를 만들면 프로필이 앱 관심을 만들었는지 알 수 있습니다. iPhone은 App Store, Android는 Google Play, 데스크톱은 선택한 대체 페이지로 이동합니다.", "상품이나 캠페인별 링크도 만들 수 있어 대시보드에서 클릭을 분리할 수 있습니다."]], ["특히 유용한 경우", ["앱 출시 직후, 시각적인 상품을 판매할 때, 이커머스 검색 노출을 늘리고 싶을 때, 사용자와 AI 도구가 무엇을 하는지 이해하게 만들고 싶을 때 유용합니다.", "스토어, 상품 페이지, 앱을 발견 가능한 자산으로 만들 수 있습니다."]]],
    cards: [["앱", "각 클릭을 App Store, Google Play 또는 대체 페이지로 보냅니다."], ["상품", "판매 상품과 중요한 카테고리를 설명합니다."], ["측정", "TienRank, QR, SNS 중 무엇이 관심을 만드는지 봅니다."]],
    checklistTitle: "빠른 체크리스트",
    checklist: [["앱 공개 또는 준비", "최종 App Store와 Google Play 링크를 확인합니다."], ["스마트 링크 생성", "Link My App에서 측정 가능한 URL과 QR을 만듭니다."], ["TienRank에 스토어 등록", "카테고리, 포지셔닝, 상품이 명확한 프로필을 만듭니다."], ["다운로드 링크 추가", "TienRank 전용 스마트 링크로 유입을 측정합니다."], ["캠페인 분리", "상품, QR, SNS, 프로필별 링크를 만듭니다."], ["데이터 확인", "클릭, QR, 기기, 예상 다운로드를 확인합니다."]],
    cta: ["다음 단계", "스토어와 앱을 더 잘 발견되게 만들기", "TienRank에 이커머스를 등록해 노출을 얻고, Link My App으로 그 관심을 측정 가능한 다운로드로 바꾸세요.", "TienRank에 이커머스 등록", "스마트 링크 만들기"],
  },
  nl: {
    title: "Waarom je je ecommerce aan TienRank toevoegt nadat je een app hebt gemaakt",
    excerpt: "Een app voor je webshop maken is maar één stap: gebruik Link My App voor de juiste download en TienRank voor zichtbaarheid met profielen, producten en SEO/GEO.",
    category: "ECOMMERCE",
    readTime: "6 min",
    intro: ["Wanneer een webshop een eigen app maakt, gaat de aandacht vaak naar App Store, Google Play, campagnes en QR-codes. Maar mensen moeten je merk ook kunnen ontdekken voordat ze je kennen.", "Daar past TienRank bij. Link My App stuurt elke klik naar de juiste appbestemming; TienRank kan je webshop, producten en positionering zichtbaarheid geven via rankings, indexeerbare profielen en SEO/GEO."],
    sections: [["Waarom dit onderwerp bij Link My App past", ["Link My App is niet alleen een URL-verkorter. Het helpt je app beter verspreiden: één URL voor iPhone, Android, desktop, QR, campagnes en meting. Maar een app krijgt geen downloads als niemand de webshop ontdekt.", "TienRank werkt eerder in de funnel: een permanent ecommerceprofiel maakt je merk vindbaar. Daarna brengt de smartlink die interesse naar de app."]], ["De aanbevolen flow", ["Publiceer eerst de app of maak die met technologie die met je ecommerce synchroniseert. Daarna maak je in Link My App één URL met App Store, Google Play en fallback.", "Vervolgens voeg je je webshop toe aan TienRank en werk je het profiel uit: aanbod, categorie, sterke producten, verschil, technologie, community en belangrijke links."]], ["TienRank verbinden met Link My App", ["Maak een specifieke smartlink voor TienRank. Dan weet je of dat profiel appinteresse oplevert. iPhone gaat naar App Store, Android naar Google Play en desktop naar je fallback.", "Je kunt ook links per product of campagne maken zodat het dashboard de klikken gescheiden houdt."]], ["Wanneer het extra nuttig is", ["Het is nuttig na een app-lancering, bij visuele producten, voor meer ecommercezichtbaarheid of wanneer gebruikers en AI-tools beter moeten begrijpen wat je doet.", "Je webshop, productpagina’s en app worden vindbare assets, niet alleen pagina’s die afhankelijk zijn van social of ads."]]],
    cards: [["App", "Een smartlink stuurt elke klik naar App Store, Google Play of fallback."], ["Producten", "Het profiel legt uit wat je verkoopt en welke producten of categorieën belangrijk zijn."], ["Meting", "Aparte links tonen of TienRank, QR of social meer interesse brengt."]],
    checklistTitle: "Snelle checklist",
    checklist: [["Publiceer of bereid de app voor", "controleer de definitieve App Store- en Google Play-links."], ["Maak je smartlink", "genereer een meetbare URL en QR met Link My App."], ["Voeg je shop toe aan TienRank", "bouw een profiel met categorie, positionering en producten."], ["Voeg de downloadlink toe", "gebruik een aparte smartlink voor TienRank."], ["Scheid campagnes", "maak links voor producten, QR, social of profielen."], ["Bekijk data", "controleer klikken, QR, apparaten en geschatte downloads."]],
    cta: ["Volgende stap", "Laat je shop en app ontdekken", "Voeg je ecommerce toe aan TienRank voor zichtbaarheid en gebruik Link My App om interesse om te zetten in meetbare downloads.", "Ecommerce toevoegen aan TienRank", "Smartlink maken"],
  },
  ar: {
    title: "لماذا تضيف متجرك الإلكتروني إلى TienRank بعد إنشاء تطبيقك",
    excerpt: "إنشاء تطبيق لمتجرك ليس إلا جزءا من العمل: استخدم Link My App لتوجيه المستخدم إلى التنزيل الصحيح، وTienRank لزيادة ظهور المتجر والمنتجات وSEO/GEO.",
    category: "التجارة الإلكترونية",
    readTime: "6 دقائق",
    intro: ["عندما ينشئ متجر إلكتروني تطبيقه الخاص، يفكر عادة في App Store وGoogle Play والحملات وQR. لكن من المهم أيضا أن يجدك من لا يعرف علامتك بعد.", "هنا يظهر دور TienRank. Link My App يرسل كل نقرة إلى وجهة التطبيق الصحيحة، وTienRank يمكن أن يمنح متجرك ومنتجاتك وتموضعك ظهورا عبر التصنيفات والصفحات القابلة للفهرسة وSEO/GEO."],
    sections: [["لماذا هذا الموضوع مناسب لـ Link My App", ["Link My App ليس مجرد اختصار روابط. هو طريقة أفضل لتوزيع التطبيق: رابط واحد لـ iPhone وAndroid وسطح المكتب وQR والحملات والقياس. لكن التطبيق لا يحصل على تنزيلات إذا لم يكتشف الناس المتجر.", "TienRank يعمل في مرحلة سابقة من المسار: يعرض المتجر في صفحة دائمة بسياق تجارة إلكترونية. وبعدها يحول الرابط الذكي هذا الاهتمام إلى تنزيلات."]], ["المسار المقترح", ["أولا تنشر التطبيق أو تنشئه بتقنية متزامنة مع المتجر. بعدها تنشئ في Link My App رابطا واحدا يضم App Store وGoogle Play ورابطا بديلا.", "ثم تضيف متجرك إلى TienRank وتعمل على الصفحة: ماذا تبيع، التصنيف، المنتجات البارزة، التميز، التقنية، المجتمع والروابط المهمة."]], ["كيف تربط TienRank مع Link My App", ["أنشئ رابطا ذكيا خاصا بـ TienRank. هكذا تعرف هل الصفحة تولد اهتماما بالتطبيق. iPhone يذهب إلى App Store وAndroid إلى Google Play وسطح المكتب إلى البديل المختار.", "يمكنك أيضا إنشاء روابط حسب المنتج أو الحملة حتى تبقى النقرات منفصلة في اللوحة."]], ["متى يكون مفيدا", ["يفيد بعد إطلاق التطبيق، ومع المنتجات البصرية، وعند البحث عن ظهور أكبر في التجارة الإلكترونية أو عندما تريد أن تفهم أدوات الذكاء الاصطناعي والمستخدمون ما تقدمه.", "يتحول المتجر وصفحات المنتجات والتطبيق إلى أصول قابلة للاكتشاف، وليس صفحات تعتمد فقط على الشبكات أو الإعلانات."]]],
    cards: [["التطبيق", "رابط ذكي يرسل كل نقرة إلى App Store أو Google Play أو البديل."], ["المنتجات", "الصفحة تشرح ما تبيعه والمنتجات أو الأقسام المهمة."], ["القياس", "روابط منفصلة توضح هل TienRank أو QR أو الشبكات تجلب اهتماما أكبر."]],
    checklistTitle: "قائمة سريعة",
    checklist: [["انشر التطبيق أو جهزه", "تأكد من روابط App Store وGoogle Play النهائية."], ["أنشئ الرابط الذكي", "استخدم Link My App للحصول على URL وQR قابلين للقياس."], ["أضف المتجر إلى TienRank", "أنشئ صفحة واضحة بالتصنيف والتموضع والمنتجات."], ["أضف رابط التنزيل", "استخدم رابطا ذكيا مخصصا لقياس TienRank."], ["افصل الحملات", "أنشئ روابط للمنتجات وQR والشبكات والصفحات."], ["راجع البيانات", "افحص النقرات وQR والأجهزة والتنزيلات المقدرة."]],
    cta: ["الخطوة التالية", "اجعل متجرك وتطبيقك قابلين للاكتشاف", "أضف متجرك إلى TienRank لزيادة الظهور واستخدم Link My App لتحويل الاهتمام إلى تنزيلات قابلة للقياس.", "إضافة المتجر إلى TienRank", "إنشاء رابط ذكي"],
  },
  hi: {
    title: "ऐप बनाने के बाद अपने ईकॉमर्स को TienRank पर क्यों जोड़ें",
    excerpt: "ऑनलाइन स्टोर की ऐप बनाना सिर्फ एक हिस्सा है: Link My App यूज़र्स को सही डाउनलोड पेज पर भेजता है और TienRank प्रोफाइल, उत्पादों और SEO/GEO विजिबिलिटी को बढ़ाता है.",
    category: "ईकॉमर्स",
    readTime: "6 मिनट",
    intro: ["जब कोई ऑनलाइन स्टोर अपनी ऐप बनाता है, तो ध्यान App Store, Google Play, कैंपेन और QR पर जाता है. लेकिन जो लोग ब्रांड को नहीं जानते, वे आपको कहां खोजेंगे, यह भी जरूरी है.", "यहीं TienRank काम आता है. Link My App हर क्लिक को सही ऐप डेस्टिनेशन पर भेजता है; TienRank आपके ईकॉमर्स, उत्पादों और पोजिशनिंग को रैंकिंग, इंडेक्स होने वाली प्रोफाइल और SEO/GEO डिस्कवरी के जरिए विजिबिलिटी दे सकता है."],
    sections: [["यह विषय Link My App पर क्यों सही है", ["Link My App सिर्फ URL छोटा करने वाला टूल नहीं है. यह ऐप वितरण को बेहतर बनाता है: iPhone, Android, डेस्कटॉप, QR, कैंपेन और मापन के लिए एक ही URL. लेकिन अगर स्टोर खोजा ही नहीं जाएगा, तो ऐप डाउनलोड भी नहीं बढ़ेंगे.", "TienRank फनल के शुरुआती हिस्से में काम करता है: ईकॉमर्स संदर्भ वाली स्थायी प्रोफाइल से लोग ब्रांड खोज सकते हैं. फिर स्मार्ट लिंक उस रुचि को ऐप डाउनलोड में बदलता है."]], ["सुझाया गया तरीका", ["पहले ऐप प्रकाशित करें या ईकॉमर्स से सिंक रहने वाली तकनीक से ऐप बनाएं. फिर Link My App में App Store, Google Play और वैकल्पिक पेज वाला एक URL बनाएं.", "इसके बाद ईकॉमर्स को TienRank पर जोड़ें और प्रोफाइल तैयार करें: आप क्या बेचते हैं, श्रेणी, मुख्य उत्पाद, अलग पहचान, तकनीक, समुदाय और जरूरी लिंक."]], ["TienRank को Link My App से कैसे जोड़ें", ["TienRank के लिए अलग स्मार्ट लिंक बनाएं. इससे पता चलेगा कि प्रोफाइल ऐप में रुचि पैदा कर रही है या नहीं. iPhone यूज़र App Store पर, Android यूज़र Google Play पर और डेस्कटॉप यूज़र वैकल्पिक पेज पर जाएगा.", "आप उत्पाद या कैंपेन के हिसाब से भी लिंक बना सकते हैं, ताकि डैशबोर्ड में क्लिक अलग-अलग दिखें."]], ["कब यह खास तौर पर काम आता है", ["ऐप लॉन्च के बाद, विजुअल उत्पाद बेचने वाले ब्रांड, ईकॉमर्स सर्च विजिबिलिटी बढ़ाने के लिए या यूज़र्स और AI टूल्स को आपका काम साफ समझाने के लिए यह उपयोगी है.", "स्टोर, उत्पाद पेज और ऐप खोजे जाने वाले एसेट बन जाते हैं; वे सिर्फ सोशल मीडिया या विज्ञापनों पर निर्भर पेज नहीं रहते."]]],
    cards: [["ऐप", "स्मार्ट लिंक हर क्लिक को App Store, Google Play या वैकल्पिक पेज पर भेजता है."], ["उत्पाद", "प्रोफाइल बताती है कि आप क्या बेचते हैं और कौन से उत्पाद सबसे अहम हैं."], ["मापन", "अलग-अलग लिंक बताते हैं कि TienRank, QR या सोशल चैनल कहां से ज्यादा रुचि ला रहे हैं."]],
    checklistTitle: "त्वरित चेकलिस्ट",
    checklist: [["ऐप प्रकाशित या तैयार करें", "अंतिम App Store और Google Play लिंक पक्का करें."], ["स्मार्ट लिंक बनाएं", "Link My App से मापने योग्य URL और QR बनाएं."], ["स्टोर को TienRank पर जोड़ें", "श्रेणी, पोजिशनिंग और उत्पादों वाली साफ प्रोफाइल बनाएं."], ["डाउनलोड लिंक जोड़ें", "TienRank से आने वाले ट्रैफिक को मापने के लिए अलग स्मार्ट लिंक इस्तेमाल करें."], ["कैंपेन अलग करें", "उत्पाद, QR, सोशल या प्रोफाइल के लिए अलग लिंक बनाएं."], ["डेटा देखें", "क्लिक, QR, डिवाइस और अनुमानित डाउनलोड देखें."]],
    cta: ["अगला कदम", "अपने स्टोर और ऐप को खोजे जाने लायक बनाएं", "विजिबिलिटी के लिए ईकॉमर्स को TienRank पर जोड़ें और उस रुचि को मापने योग्य डाउनलोड में बदलने के लिए Link My App इस्तेमाल करें.", "ईकॉमर्स को TienRank पर जोड़ें", "स्मार्ट लिंक बनाएं"],
  },
};

function TienRankContent({ article, language }) {
  const [eyebrow, ctaTitle, ctaText, tienRankButton, linkMyAppButton] = article.cta;

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
            href={tienRankUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-black transition hover:-translate-y-0.5"
          >
            {tienRankButton}
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

export function getTienRankPost(language, post) {
  const article = translations[language] || translations.en;

  return {
    ...post,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    readTime: article.readTime,
    content: <TienRankContent article={article} language={language} />,
  };
}

export const tienRankBlogPost = {
  slug: tienRankSlug,
  title: translations.es.title,
  date: "8 de Julio, 2026",
  category: translations.es.category,
  excerpt: translations.es.excerpt,
  readTime: translations.es.readTime,
  author: authorData,
  coverComponent: <TienRankCover />,
  content: <TienRankContent article={translations.es} language="es" />,
};
