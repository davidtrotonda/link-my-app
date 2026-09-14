// Catálogo de casos de uso por nicho.
// Cada nicho contiene contenido extenso y único por idioma para evitar
// canibalización SEO. Las páginas se renderizan con UseCasePage (genérica)
// excepto "agencies" que usa AgenciesPage (más rica).

import { germanUseCases } from "./deContent.js";
import { italianUseCases } from "./itContent.js";
import { japaneseUseCases } from "./jaContent.js";
import { koreanUseCases } from "./koContent.js";
import { dutchUseCases } from "./nlContent.js";
import { arabicUseCases } from "./arContent.js";
import { hindiUseCases } from "./hiContent.js";
import { portugueseUseCases } from "./ptContent.js";
import { nichePath, useCaseHubRoutes } from "./contentRoutes.js";

export { nichePath, useCaseHubRoutes };

export const niches = [
  /* ============================================================
   * 0. ADS
   * ============================================================ */
  {
    id: "ads",
    icon: "Megaphone",
    accent: "from-sky-50 to-white",
    en: {
      slug: "app-install-ads",
      label: "Ads",
      title: "Smart link for app install ads",
      metaTitle: "Smart link for app install ads - one URL for App Store and Google Play",
      metaDescription:
        "Use one smart link in Meta Ads, TikTok Ads, Google Ads and YouTube Ads. Detects iPhone or Android, sends clicks to the right store and measures campaigns.",
      h1: "One ad link that sends every click to the right app store",
      eyebrow: "App install ads",
      intro:
        "Meta Ads, TikTok Ads, Google Ads and YouTube Ads usually give you one destination URL. If that URL is only App Store, Android users are lost. If it is only Google Play, iPhone users are lost. Link My App gives every ad one smart link that detects the device and redirects each click to the correct store.",
      painPoints: [
        "Ad platforms usually give you one link, but your app has two store URLs.",
        "An App Store-only ad wastes Android clicks.",
        "A Google Play-only ad wastes iPhone clicks.",
        "Two separate campaigns split data and make reporting harder.",
        "A landing page between the ad and the store adds friction.",
        "QR codes in offline ad creatives need one URL that works for every phone.",
      ],
      benefits: [
        { title: "One link in every ad", text: "Use the same smart URL in Meta Ads, TikTok Ads, Google Ads, YouTube Ads and retargeting campaigns." },
        { title: "Automatic device routing", text: "iPhone goes to App Store, Android goes to Google Play and desktop can go to your fallback page." },
        { title: "Cleaner campaign tracking", text: "Create one link per campaign, ad set, creative or platform and compare clicks in the dashboard." },
        { title: "Less wasted media budget", text: "Clicks no longer land on a store that the user's phone cannot use." },
        { title: "QR for offline creatives", text: "Use the same idea on posters, flyers, events or packaging when an ad creative includes a QR." },
        { title: "Editable destinations", text: "Change App Store, Google Play or fallback without editing every ad or reprinting QR material." },
      ],
      metrics: [
        { value: "1 URL", label: "for every ad creative" },
        { value: "100%", label: "iOS, Android and desktop covered" },
        { value: "0 choice", label: "the user does not pick a store" },
      ],
      beforeAfter: {
        before: {
          title: "Without a smart link",
          rows: [
            "You choose App Store and lose Android clicks",
            "You choose Google Play and lose iPhone clicks",
            "You split campaigns just to use different store URLs",
            "Reporting is scattered across links, ads and landing pages",
          ],
        },
        after: {
          title: "With Link My App",
          rows: [
            "One ad URL works for iPhone, Android and desktop",
            "Every click goes straight to the right destination",
            "Campaign links can be separated by platform or creative",
            "QR scans and ad clicks can be tracked from the same dashboard",
          ],
        },
      },
      realExamples: [
        { title: "Meta Ads app campaign", text: "The ad uses one URL. iPhone users open App Store and Android users open Google Play automatically." },
        { title: "TikTok launch campaign", text: "Each creative gets its own smart link so the team sees which video drives the most qualified clicks." },
        { title: "Google and YouTube Ads", text: "Search, display and video campaigns use one clean app download URL without sending users to the wrong store." },
        { title: "Offline ad with QR", text: "A poster or flyer includes one QR that works for all phones and can be measured separately." },
      ],
      tutorial: [
        { title: "Paste both store URLs", text: "Add your App Store link, Google Play link and fallback URL for desktop or unsupported devices." },
        { title: "Create one link per campaign", text: "Use a clear slug for each Meta, TikTok, Google or YouTube campaign." },
        { title: "Use it as the ad destination", text: "Paste the smart link in the ad URL field instead of choosing only one store." },
        { title: "Duplicate for creatives", text: "Create separate links for each ad set, creative, market or influencer if you want cleaner reporting." },
        { title: "Add QR when needed", text: "If the creative includes a QR for offline use, download the QR from the same smart link." },
        { title: "Read the clicks", text: "Check clicks by device, source and QR to understand which ads are driving app interest." },
      ],
      faqs: [
        { q: "Can I use this link in Meta Ads?", a: "Yes. Use the smart link as the destination URL. It redirects each click to App Store, Google Play or your fallback based on the device." },
        { q: "Does it work with TikTok Ads?", a: "Yes. TikTok accepts a normal URL, and the smart link handles device detection after the click." },
        { q: "Can I use it in Google Ads and YouTube Ads?", a: "Yes. You can use one smart app download URL for search, display, video or YouTube campaigns." },
        { q: "Will the user see an intermediate page?", a: "The smart link is designed to send the user to the right destination without making them choose between stores." },
        { q: "Can I create one link per ad creative?", a: "Yes. Create separate smart links for campaigns, ad sets, creatives, markets or platforms to compare clicks." },
        { q: "Does the QR matter for ads?", a: "For most digital ads, the link is the key part. QR is useful when the ad is printed, shown at an event or used in an offline creative." },
        { q: "Can I change the store URLs later?", a: "Yes. The ad URL can stay the same while you update App Store, Google Play or fallback destinations from the dashboard." },
        { q: "Does this replace my ad platform analytics?", a: "No. It complements them with device, source and smart-link click data before the user reaches the store." },
      ],
    },
    es: {
      slug: "anuncios-app",
      label: "Anuncios",
      title: "Smart link para anuncios de descarga de apps",
      metaTitle: "Smart link para anuncios de apps - una URL para App Store y Google Play",
      metaDescription:
        "Usa un solo smart link en Meta Ads, TikTok Ads, Google Ads y YouTube Ads. Detecta iPhone o Android y manda cada clic a la tienda correcta.",
      h1: "Un enlace para anuncios que manda cada clic a la tienda correcta",
      eyebrow: "Anuncios de apps",
      intro:
        "Meta Ads, TikTok Ads, Google Ads y YouTube Ads suelen dejarte poner una sola URL de destino. Si pones solo App Store, pierdes usuarios Android. Si pones solo Google Play, pierdes usuarios iPhone. Link My App crea un smart link para que cada clic del anuncio detecte el dispositivo y vaya a la tienda correcta.",
      painPoints: [
        "Las plataformas de anuncios te dejan una URL, pero tu app tiene dos tiendas.",
        "Un anuncio con solo App Store pierde clics de Android.",
        "Un anuncio con solo Google Play pierde clics de iPhone.",
        "Separar campañas solo por tienda ensucia los datos.",
        "Una landing intermedia entre anuncio y tienda añade fricción.",
        "Los QR en creatividades offline necesitan una URL que funcione en cualquier móvil.",
      ],
      benefits: [
        { title: "Un link para cada anuncio", text: "Usa la misma URL inteligente en Meta Ads, TikTok Ads, Google Ads, YouTube Ads y campañas de retargeting." },
        { title: "Redirección automática", text: "iPhone va a App Store, Android va a Google Play y ordenador puede ir a tu enlace alternativo." },
        { title: "Medición más limpia", text: "Crea un link por campaña, conjunto, creatividad o plataforma y compara clics en el panel." },
        { title: "Menos presupuesto perdido", text: "Los clics ya no aterrizan en una tienda que el móvil del usuario no puede usar." },
        { title: "QR para creatividades físicas", text: "Usa el mismo sistema en carteles, flyers, eventos o packaging cuando la creatividad lleve QR." },
        { title: "Destinos editables", text: "Cambia App Store, Google Play o alternativa sin editar todos tus anuncios ni reimprimir material." },
      ],
      metrics: [
        { value: "1 URL", label: "por creatividad de anuncio" },
        { value: "100%", label: "iOS, Android y ordenador cubiertos" },
        { value: "0 dudas", label: "el usuario no elige tienda" },
      ],
      beforeAfter: {
        before: {
          title: "Sin smart link",
          rows: [
            "Eliges App Store y pierdes clics de Android",
            "Eliges Google Play y pierdes clics de iPhone",
            "Duplicas campañas solo para usar URLs distintas",
            "Los datos quedan repartidos entre links, anuncios y landings",
          ],
        },
        after: {
          title: "Con Link My App",
          rows: [
            "Una URL de anuncio sirve para iPhone, Android y ordenador",
            "Cada clic va directo al destino correcto",
            "Puedes separar links por plataforma o creatividad",
            "Los clics de anuncios y QR se leen desde el mismo panel",
          ],
        },
      },
      realExamples: [
        { title: "Campaña en Meta Ads", text: "El anuncio usa una URL. Los usuarios con iPhone abren App Store y los de Android abren Google Play automáticamente." },
        { title: "Lanzamiento en TikTok Ads", text: "Cada creatividad tiene su smart link para saber qué vídeo trae clics más cualificados." },
        { title: "Google Ads y YouTube Ads", text: "Search, display y vídeo usan una URL limpia de descarga sin mandar usuarios a la tienda equivocada." },
        { title: "Anuncio físico con QR", text: "Un cartel o flyer lleva un QR que funciona en todos los móviles y se mide por separado." },
      ],
      tutorial: [
        { title: "Pega las dos tiendas", text: "Añade el enlace de App Store, el de Google Play y una URL alternativa para ordenador u otros dispositivos." },
        { title: "Crea un link por campaña", text: "Usa un slug claro para cada campaña de Meta, TikTok, Google o YouTube." },
        { title: "Ponlo como destino del anuncio", text: "Pega el smart link en el campo de URL del anuncio en lugar de elegir solo una tienda." },
        { title: "Duplica por creatividad", text: "Crea links separados por conjunto, creatividad, mercado o influencer si quieres datos más limpios." },
        { title: "Añade QR si hace falta", text: "Si la creatividad se imprime o se usa en físico, descarga el QR del mismo smart link." },
        { title: "Lee los clics", text: "Revisa clics por dispositivo, fuente y QR para ver qué anuncios generan interés real por la app." },
      ],
      faqs: [
        { q: "¿Puedo usarlo en Meta Ads?", a: "Sí. Usa el smart link como URL de destino. Cada clic se redirige a App Store, Google Play o tu alternativa según el dispositivo." },
        { q: "¿Funciona en TikTok Ads?", a: "Sí. TikTok acepta una URL normal y el smart link detecta el dispositivo después del clic." },
        { q: "¿Sirve para Google Ads y YouTube Ads?", a: "Sí. Puedes usar una única URL de descarga para campañas de búsqueda, display, vídeo o YouTube." },
        { q: "¿El usuario verá una página intermedia?", a: "El smart link está pensado para mandar al usuario al destino correcto sin obligarle a elegir tienda." },
        { q: "¿Puedo crear un link por creatividad?", a: "Sí. Crea smart links separados por campaña, conjunto, creatividad, mercado o plataforma para comparar clics." },
        { q: "¿El QR importa en anuncios?", a: "En anuncios digitales lo principal es el link. El QR sirve cuando el anuncio es impreso, se enseña en un evento o se usa en una creatividad offline." },
        { q: "¿Puedo cambiar las URLs después?", a: "Sí. La URL del anuncio puede seguir igual mientras cambias App Store, Google Play o alternativa desde el panel." },
        { q: "¿Sustituye la analítica de la plataforma de anuncios?", a: "No. La complementa con datos de clics por dispositivo, fuente y smart link antes de llegar a la tienda." },
      ],
    },
    fr: {
      slug: "publicites-app",
      label: "Publicités",
      title: "Smart link pour publicités de téléchargement d'app",
      metaTitle: "Smart link pour publicités app - une URL pour App Store et Google Play",
      metaDescription:
        "Utilise un seul smart link dans Meta Ads, TikTok Ads, Google Ads et YouTube Ads. Détecte iPhone ou Android et envoie chaque clic vers la bonne boutique.",
      h1: "Un lien publicitaire qui envoie chaque clic vers la bonne boutique",
      eyebrow: "Publicités d'app",
      intro:
        "Meta Ads, TikTok Ads, Google Ads et YouTube Ads ne te laissent souvent qu'une URL de destination. Si tu mets seulement App Store, tu perds les utilisateurs Android. Si tu mets seulement Google Play, tu perds les utilisateurs iPhone. Link My App crée un smart link qui détecte l'appareil et redirige chaque clic vers la bonne boutique.",
      painPoints: [
        "Les plateformes pub donnent une URL, mais ton app a deux boutiques.",
        "Une pub App Store uniquement perd les clics Android.",
        "Une pub Google Play uniquement perd les clics iPhone.",
        "Séparer les campagnes par boutique complique les données.",
        "Une landing intermédiaire ajoute de la friction avant la boutique.",
        "Les QR dans les créas offline ont besoin d'une URL qui marche sur tout mobile.",
      ],
      benefits: [
        { title: "Un lien par publicité", text: "Utilise la même URL intelligente dans Meta Ads, TikTok Ads, Google Ads, YouTube Ads et le retargeting." },
        { title: "Routage automatique", text: "iPhone va vers App Store, Android vers Google Play et desktop vers ton fallback." },
        { title: "Mesure plus propre", text: "Crée un lien par campagne, ad set, créa ou plateforme et compare les clics." },
        { title: "Moins de budget perdu", text: "Les clics n'arrivent plus sur une boutique inutilisable pour le téléphone." },
        { title: "QR pour supports physiques", text: "Utilise la même logique sur affiches, flyers, événements ou packaging avec QR." },
        { title: "Destinations modifiables", text: "Change App Store, Google Play ou fallback sans modifier toutes les pubs ni réimprimer." },
      ],
      metrics: [
        { value: "1 URL", label: "par créa publicitaire" },
        { value: "100%", label: "iOS, Android et desktop couverts" },
        { value: "0 choix", label: "l'utilisateur ne choisit pas" },
      ],
      beforeAfter: {
        before: {
          title: "Sans smart link",
          rows: [
            "Tu choisis App Store et perds les clics Android",
            "Tu choisis Google Play et perds les clics iPhone",
            "Tu dupliques les campagnes pour changer d'URL",
            "Les données sont dispersées entre liens, pubs et landings",
          ],
        },
        after: {
          title: "Avec Link My App",
          rows: [
            "Une URL pub marche pour iPhone, Android et desktop",
            "Chaque clic va directement au bon endroit",
            "Les liens peuvent être séparés par plateforme ou créa",
            "Clics pub et scans QR se lisent dans le même dashboard",
          ],
        },
      },
      realExamples: [
        { title: "Campagne Meta Ads", text: "Une URL dans la pub. iPhone ouvre App Store, Android ouvre Google Play automatiquement." },
        { title: "Lancement TikTok Ads", text: "Chaque créa reçoit son smart link pour savoir quelle vidéo apporte les clics les plus qualifiés." },
        { title: "Google Ads et YouTube Ads", text: "Search, display et vidéo utilisent une URL de téléchargement propre sans mauvaise boutique." },
        { title: "Pub physique avec QR", text: "Une affiche ou un flyer inclut un QR qui marche sur tous les téléphones et se mesure séparément." },
      ],
      tutorial: [
        { title: "Colle les deux boutiques", text: "Ajoute App Store, Google Play et une URL fallback pour desktop ou appareils non reconnus." },
        { title: "Crée un lien par campagne", text: "Utilise un slug clair pour chaque campagne Meta, TikTok, Google ou YouTube." },
        { title: "Utilise-le comme destination", text: "Colle le smart link dans le champ URL de la pub au lieu de choisir une seule boutique." },
        { title: "Duplique par créa", text: "Crée des liens séparés par ad set, créa, marché ou influenceur pour mieux reporter." },
        { title: "Ajoute le QR si besoin", text: "Si la créa est imprimée ou utilisée offline, télécharge le QR du même smart link." },
        { title: "Lis les clics", text: "Analyse clics par appareil, source et QR pour voir quelles pubs génèrent l'intérêt app." },
      ],
      faqs: [
        { q: "Puis-je l'utiliser dans Meta Ads ?", a: "Oui. Mets le smart link comme URL de destination. Chaque clic va vers App Store, Google Play ou fallback selon l'appareil." },
        { q: "Compatible TikTok Ads ?", a: "Oui. TikTok accepte une URL normale et le smart link détecte l'appareil après le clic." },
        { q: "Compatible Google Ads et YouTube Ads ?", a: "Oui. Tu peux utiliser une URL unique pour search, display, vidéo ou YouTube." },
        { q: "L'utilisateur verra-t-il une page intermédiaire ?", a: "Le smart link est pensé pour envoyer l'utilisateur vers la bonne destination sans lui faire choisir une boutique." },
        { q: "Puis-je créer un lien par créa ?", a: "Oui. Crée des smart links par campagne, ad set, créa, marché ou plateforme pour comparer les clics." },
        { q: "Le QR compte-t-il pour les pubs ?", a: "En digital, le lien est le plus important. Le QR est utile pour une pub imprimée, un événement ou une créa offline." },
        { q: "Puis-je modifier les URLs plus tard ?", a: "Oui. L'URL de la pub reste la même pendant que tu modifies App Store, Google Play ou fallback dans le dashboard." },
        { q: "Cela remplace-t-il l'analytics des plateformes pub ?", a: "Non. Cela le complète avec des clics par appareil, source et smart link avant la boutique." },
      ],
    },
    ja: {
      slug: "app-install-ads",
      label: "広告",
      title: "アプリ広告向けスマートリンク",
      metaTitle: "アプリ広告向けスマートリンク - App Store と Google Play を1つのURLに",
      metaDescription:
        "Meta広告、TikTok広告、Google広告、YouTube広告で使える1つのスマートリンク。iPhone/Androidを判定し、正しいストアへ送ります。",
      h1: "広告の1リンクで、各クリックを正しいアプリストアへ",
      eyebrow: "アプリ広告",
      intro:
        "Meta広告、TikTok広告、Google広告、YouTube広告では、設定できるリンク先が1つだけになることが多いです。App Storeだけを入れるとAndroidユーザーを失い、Google Playだけを入れるとiPhoneユーザーを失います。Link My Appなら、広告に1つのスマートリンクを入れるだけで端末を判定し、正しいストアへ送れます。",
      painPoints: [
        "広告には1つのURLしか入れられないのに、アプリには2つのストアリンクがある。",
        "App Storeだけの広告ではAndroidのクリックを取りこぼす。",
        "Google Playだけの広告ではiPhoneのクリックを取りこぼす。",
        "ストア別にキャンペーンを分けるとデータが見づらくなる。",
        "広告とストアの間にLPを挟むと離脱が増える。",
        "オフライン広告のQRにも、全端末で使える1つのURLが必要。",
      ],
      benefits: [
        { title: "広告ごとに1リンク", text: "Meta、TikTok、Google、YouTube、リターゲティングで同じ考え方のスマートURLを使えます。" },
        { title: "端末別に自動振り分け", text: "iPhoneはApp Store、AndroidはGoogle Play、PCは代替ページへ送れます。" },
        { title: "キャンペーン計測がきれい", text: "キャンペーン、広告セット、クリエイティブ、媒体ごとにリンクを分けて比較できます。" },
        { title: "広告費の無駄を減らす", text: "ユーザーの端末で使えないストアへクリックを送らずに済みます。" },
        { title: "オフライン広告のQRにも対応", text: "ポスター、チラシ、イベント、パッケージでQRを使う場合にも同じ仕組みを使えます。" },
        { title: "後から変更可能", text: "広告URLや印刷物を変えずに、App Store、Google Play、代替URLを更新できます。" },
      ],
      metrics: [
        { value: "1 URL", label: "広告クリエイティブごと" },
        { value: "100%", label: "iOS、Android、PCに対応" },
        { value: "0迷い", label: "ユーザーに選ばせない" },
      ],
      beforeAfter: {
        before: {
          title: "スマートリンクなし",
          rows: [
            "App Storeを選ぶとAndroidクリックを失う",
            "Google Playを選ぶとiPhoneクリックを失う",
            "URLのためだけにキャンペーンを分ける",
            "リンク、広告、LPでデータが分散する",
          ],
        },
        after: {
          title: "Link My Appあり",
          rows: [
            "1つの広告URLがiPhone、Android、PCで機能する",
            "各クリックが正しい目的地へ直接進む",
            "媒体やクリエイティブ別にリンクを分けられる",
            "広告クリックとQRスキャンを同じ画面で確認できる",
          ],
        },
      },
      realExamples: [
        { title: "Meta広告キャンペーン", text: "広告には1つのURLだけ。iPhoneはApp Store、AndroidはGoogle Playへ自動で進みます。" },
        { title: "TikTokローンチ", text: "動画ごとにスマートリンクを作り、どのクリエイティブが良いクリックを生むか確認します。" },
        { title: "Google広告とYouTube広告", text: "検索、ディスプレイ、動画で、間違ったストアへ送らないクリーンなURLを使えます。" },
        { title: "QR付きオフライン広告", text: "ポスターやチラシに1つのQRを載せ、端末別に正しく誘導して計測します。" },
      ],
      tutorial: [
        { title: "2つのストアURLを貼る", text: "App Store、Google Play、PC向けの代替URLを設定します。" },
        { title: "キャンペーンごとにリンク作成", text: "Meta、TikTok、Google、YouTubeごとに分かりやすいslugを使います。" },
        { title: "広告のリンク先に設定", text: "1つのストアだけを選ばず、広告URL欄にスマートリンクを貼ります。" },
        { title: "クリエイティブ別に複製", text: "広告セット、動画、地域、インフルエンサー別にリンクを分けられます。" },
        { title: "必要ならQRを追加", text: "印刷物やイベントで使う場合は、同じスマートリンクからQRをダウンロードします。" },
        { title: "クリックを確認", text: "端末、流入元、QR別にクリックを見て、どの広告が反応を作るか確認します。" },
      ],
      faqs: [
        { q: "Meta広告で使えますか？", a: "はい。リンク先URLとして使えます。クリックごとに端末を判定し、App Store、Google Play、代替URLへ送ります。" },
        { q: "TikTok広告でも使えますか？", a: "はい。通常のURLとして設定でき、クリック後に端末判定が行われます。" },
        { q: "Google広告やYouTube広告でも使えますか？", a: "はい。検索、ディスプレイ、動画、YouTubeキャンペーンで使えます。" },
        { q: "中間ページは表示されますか？", a: "ユーザーにストアを選ばせず、正しい目的地へ送るためのスマートリンクです。" },
        { q: "広告クリエイティブごとにリンクを作れますか？", a: "はい。キャンペーン、広告セット、クリエイティブ、地域、媒体別に作成できます。" },
        { q: "広告でQRは重要ですか？", a: "デジタル広告ではリンクが中心です。QRは印刷、イベント、オフラインクリエイティブで役立ちます。" },
        { q: "後からストアURLを変更できますか？", a: "はい。広告に入れたURLはそのまま、管理画面でApp Store、Google Play、代替URLを変更できます。" },
        { q: "広告プラットフォームの分析を置き換えますか？", a: "いいえ。ストア到達前の端末別・リンク別クリックデータとして補完します。" },
      ],
    },
    de: {
      slug: "app-install-ads",
      label: "Anzeigen",
      title: "Smartlink für App-Install-Anzeigen",
      metaTitle: "Smartlink für App-Install-Anzeigen - eine URL für App Store und Google Play",
      metaDescription:
        "Nutze einen Smartlink in Meta Ads, TikTok Ads, Google Ads und YouTube Ads. Erkennt iPhone oder Android und sendet Klicks zum richtigen Store.",
      h1: "Ein Anzeigenlink, der jeden Klick zum richtigen App Store führt",
      eyebrow: "App-Install-Anzeigen",
      intro:
        "Meta Ads, TikTok Ads, Google Ads und YouTube Ads erlauben oft nur eine Ziel-URL. Nur App Store verliert Android-Nutzer. Nur Google Play verliert iPhone-Nutzer. Link My App nutzt einen Smartlink, erkennt das Gerät und leitet jeden Anzeigenklick zum richtigen Store.",
      painPoints: [
        "Anzeigenplattformen geben dir eine URL, aber deine App hat zwei Store-Links.",
        "Eine reine App-Store-Anzeige verliert Android-Klicks.",
        "Eine reine Google-Play-Anzeige verliert iPhone-Klicks.",
        "Getrennte Kampagnen nur wegen Store-URLs machen Reporting schwieriger.",
        "Eine Zwischen-Landingpage erzeugt Reibung.",
        "QR-Codes in Offline-Creatives brauchen eine URL für jedes Smartphone.",
      ],
      benefits: [
        { title: "Ein Link in jeder Anzeige", text: "Nutze dieselbe Smart-URL in Meta Ads, TikTok Ads, Google Ads, YouTube Ads und Retargeting." },
        { title: "Automatisches Routing", text: "iPhone geht zum App Store, Android zu Google Play und Desktop zum Fallback." },
        { title: "Saubereres Tracking", text: "Erstelle Links pro Kampagne, Ad Set, Creative oder Plattform und vergleiche Klicks." },
        { title: "Weniger verschwendetes Budget", text: "Klicks landen nicht mehr in einem Store, den das Gerät nicht nutzen kann." },
        { title: "QR für Offline-Werbung", text: "Nutze dieselbe Logik auf Plakaten, Flyern, Events oder Verpackungen." },
        { title: "Ziele editierbar", text: "Ändere App Store, Google Play oder Fallback, ohne Anzeigen oder QR-Material neu zu bauen." },
      ],
      metrics: [
        { value: "1 URL", label: "pro Anzeigen-Creative" },
        { value: "100%", label: "iOS, Android und Desktop abgedeckt" },
        { value: "0 Wahl", label: "Nutzer wählen keinen Store" },
      ],
      beforeAfter: {
        before: {
          title: "Ohne Smartlink",
          rows: [
            "Du wählst App Store und verlierst Android-Klicks",
            "Du wählst Google Play und verlierst iPhone-Klicks",
            "Du teilst Kampagnen nur für unterschiedliche URLs",
            "Daten liegen verteilt in Links, Anzeigen und Landingpages",
          ],
        },
        after: {
          title: "Mit Link My App",
          rows: [
            "Eine Anzeigen-URL funktioniert für iPhone, Android und Desktop",
            "Jeder Klick geht direkt zum richtigen Ziel",
            "Links können nach Plattform oder Creative getrennt werden",
            "Anzeigenklicks und QR-Scans sind im selben Dashboard sichtbar",
          ],
        },
      },
      realExamples: [
        { title: "Meta-Ads-Kampagne", text: "Die Anzeige nutzt eine URL. iPhone öffnet App Store, Android öffnet Google Play automatisch." },
        { title: "TikTok-Launch", text: "Jedes Creative bekommt einen Smartlink, damit das Team die besten Videos erkennt." },
        { title: "Google Ads und YouTube Ads", text: "Search, Display und Video nutzen eine saubere Download-URL ohne falschen Store." },
        { title: "Offline-Anzeige mit QR", text: "Plakat oder Flyer enthält einen QR, der auf allen Smartphones funktioniert und separat messbar ist." },
      ],
      tutorial: [
        { title: "Beide Store-URLs einfügen", text: "Füge App Store, Google Play und eine Fallback-URL für Desktop ein." },
        { title: "Link pro Kampagne erstellen", text: "Nutze klare Slugs für Meta, TikTok, Google oder YouTube." },
        { title: "Als Anzeigenziel nutzen", text: "Füge den Smartlink als Ziel-URL ein, statt nur einen Store zu wählen." },
        { title: "Pro Creative duplizieren", text: "Erstelle eigene Links für Ad Sets, Creatives, Märkte oder Influencer." },
        { title: "QR bei Bedarf hinzufügen", text: "Für Print oder Events lädst du den QR aus demselben Smartlink herunter." },
        { title: "Klicks auswerten", text: "Vergleiche Klicks nach Gerät, Quelle und QR im Dashboard." },
      ],
      faqs: [
        { q: "Kann ich den Link in Meta Ads nutzen?", a: "Ja. Nutze ihn als Ziel-URL. Jeder Klick geht je nach Gerät zu App Store, Google Play oder Fallback." },
        { q: "Funktioniert es mit TikTok Ads?", a: "Ja. TikTok akzeptiert eine normale URL und der Smartlink erkennt das Gerät nach dem Klick." },
        { q: "Funktioniert es mit Google Ads und YouTube Ads?", a: "Ja. Du kannst eine Download-URL für Search, Display, Video oder YouTube nutzen." },
        { q: "Sieht der Nutzer eine Zwischenseite?", a: "Der Smartlink ist dafür gedacht, Nutzer ohne Store-Auswahl zum richtigen Ziel zu senden." },
        { q: "Kann ich einen Link pro Creative erstellen?", a: "Ja. Erstelle Smartlinks pro Kampagne, Ad Set, Creative, Markt oder Plattform." },
        { q: "Ist QR für Anzeigen wichtig?", a: "Bei digitalen Anzeigen ist der Link entscheidend. QR ist nützlich für Print, Events oder Offline-Creatives." },
        { q: "Kann ich Store-URLs später ändern?", a: "Ja. Die Anzeigen-URL bleibt gleich, während du Ziele im Dashboard anpasst." },
        { q: "Ersetzt das meine Anzeigen-Analytics?", a: "Nein. Es ergänzt sie mit Klickdaten nach Gerät, Quelle und Smartlink vor dem Store." },
      ],
    },
    pt: {
      slug: "anuncios-app",
      label: "Anúncios",
      title: "Smart link para anúncios de download de apps",
      metaTitle: "Smart link para anúncios de apps - uma URL para App Store e Google Play",
      metaDescription:
        "Usa um smart link em Meta Ads, TikTok Ads, Google Ads e YouTube Ads. Detecta iPhone ou Android e envia cada clique para a loja certa.",
      h1: "Um link de anúncio que leva cada clique à loja certa",
      eyebrow: "Anúncios de apps",
      intro:
        "Meta Ads, TikTok Ads, Google Ads e YouTube Ads normalmente deixam colocar uma única URL de destino. Se usares só App Store, perdes utilizadores Android. Se usares só Google Play, perdes utilizadores iPhone. O Link My App dá-te um smart link que deteta o dispositivo e redireciona cada clique para a loja correta.",
      painPoints: [
        "As plataformas de anúncios dão uma URL, mas a app tem duas lojas.",
        "Um anúncio só com App Store perde cliques Android.",
        "Um anúncio só com Google Play perde cliques iPhone.",
        "Separar campanhas por loja complica os dados.",
        "Uma landing intermédia entre anúncio e loja cria fricção.",
        "QR codes em criativos offline precisam de uma URL que funcione em qualquer telemóvel.",
      ],
      benefits: [
        { title: "Um link em cada anúncio", text: "Usa a mesma URL inteligente em Meta Ads, TikTok Ads, Google Ads, YouTube Ads e retargeting." },
        { title: "Routing automático", text: "iPhone vai para App Store, Android para Google Play e desktop para o fallback." },
        { title: "Tracking mais limpo", text: "Cria um link por campanha, ad set, criativo ou plataforma e compara cliques." },
        { title: "Menos orçamento desperdiçado", text: "Os cliques deixam de chegar a uma loja que o dispositivo não consegue usar." },
        { title: "QR para criativos físicos", text: "Usa a mesma lógica em posters, flyers, eventos ou packaging." },
        { title: "Destinos editáveis", text: "Altera App Store, Google Play ou fallback sem editar anúncios ou reimprimir material." },
      ],
      metrics: [
        { value: "1 URL", label: "por criativo" },
        { value: "100%", label: "iOS, Android e desktop cobertos" },
        { value: "0 escolha", label: "o utilizador não escolhe loja" },
      ],
      beforeAfter: {
        before: {
          title: "Sem smart link",
          rows: [
            "Escolhes App Store e perdes cliques Android",
            "Escolhes Google Play e perdes cliques iPhone",
            "Duplicas campanhas só para mudar URLs",
            "Dados ficam espalhados entre links, anúncios e landings",
          ],
        },
        after: {
          title: "Com Link My App",
          rows: [
            "Uma URL de anúncio serve para iPhone, Android e desktop",
            "Cada clique vai direto ao destino certo",
            "Links podem ser separados por plataforma ou criativo",
            "Cliques de anúncios e scans QR aparecem no mesmo dashboard",
          ],
        },
      },
      realExamples: [
        { title: "Campanha Meta Ads", text: "O anúncio usa uma URL. iPhone abre App Store e Android abre Google Play automaticamente." },
        { title: "Lançamento TikTok Ads", text: "Cada criativo recebe um smart link para ver que vídeo traz cliques qualificados." },
        { title: "Google Ads e YouTube Ads", text: "Search, display e vídeo usam uma URL limpa sem enviar pessoas para a loja errada." },
        { title: "Anúncio offline com QR", text: "Um poster ou flyer usa um QR que funciona em todos os telemóveis e é medido à parte." },
      ],
      tutorial: [
        { title: "Colar as duas lojas", text: "Adiciona App Store, Google Play e uma URL fallback para desktop." },
        { title: "Criar link por campanha", text: "Usa um slug claro para cada campanha de Meta, TikTok, Google ou YouTube." },
        { title: "Usar como destino do anúncio", text: "Cola o smart link no campo de URL do anúncio em vez de escolher uma loja." },
        { title: "Duplicar por criativo", text: "Cria links por ad set, criativo, mercado ou influencer para reporting limpo." },
        { title: "Adicionar QR se fizer sentido", text: "Se o criativo for impresso ou offline, descarrega o QR do mesmo smart link." },
        { title: "Ler os cliques", text: "Vê cliques por dispositivo, origem e QR para perceber que anúncios geram interesse." },
      ],
      faqs: [
        { q: "Posso usar em Meta Ads?", a: "Sim. Usa o smart link como URL de destino. Cada clique vai para App Store, Google Play ou fallback conforme o dispositivo." },
        { q: "Funciona em TikTok Ads?", a: "Sim. TikTok aceita uma URL normal e o smart link faz a deteção depois do clique." },
        { q: "Serve para Google Ads e YouTube Ads?", a: "Sim. Podes usar uma URL única em search, display, vídeo ou YouTube." },
        { q: "O utilizador vê uma página intermédia?", a: "O smart link foi pensado para enviar o utilizador ao destino certo sem o obrigar a escolher loja." },
        { q: "Posso criar um link por criativo?", a: "Sim. Cria smart links por campanha, ad set, criativo, mercado ou plataforma." },
        { q: "O QR importa nos anúncios?", a: "Nos anúncios digitais o link é o principal. QR é útil em print, eventos ou criativos offline." },
        { q: "Posso alterar URLs depois?", a: "Sim. A URL do anúncio continua igual enquanto alteras destinos no dashboard." },
        { q: "Substitui a analytics da plataforma?", a: "Não. Complementa com cliques por dispositivo, origem e smart link antes da loja." },
      ],
    },
    it: {
      slug: "annunci-app",
      label: "Annunci",
      title: "Smart link per annunci di download app",
      metaTitle: "Smart link per annunci app - una URL per App Store e Google Play",
      metaDescription:
        "Usa uno smart link in Meta Ads, TikTok Ads, Google Ads e YouTube Ads. Rileva iPhone o Android e manda ogni clic allo store corretto.",
      h1: "Un link per annunci che porta ogni clic allo store corretto",
      eyebrow: "Annunci app",
      intro:
        "Meta Ads, TikTok Ads, Google Ads e YouTube Ads spesso ti lasciano una sola URL di destinazione. Se usi solo App Store, perdi utenti Android. Se usi solo Google Play, perdi utenti iPhone. Link My App crea uno smart link che rileva il dispositivo e manda ogni clic allo store giusto.",
      painPoints: [
        "Le piattaforme ads danno una URL, ma la app ha due store.",
        "Un annuncio solo App Store perde clic Android.",
        "Un annuncio solo Google Play perde clic iPhone.",
        "Separare campagne per store sporca il reporting.",
        "Una landing intermedia crea frizione prima dello store.",
        "I QR nei creativi offline hanno bisogno di una URL per tutti i telefoni.",
      ],
      benefits: [
        { title: "Un link in ogni annuncio", text: "Usa la stessa URL smart in Meta Ads, TikTok Ads, Google Ads, YouTube Ads e retargeting." },
        { title: "Routing automatico", text: "iPhone va ad App Store, Android a Google Play e desktop al fallback." },
        { title: "Tracking più pulito", text: "Crea link per campagna, ad set, creatività o piattaforma e confronta i clic." },
        { title: "Meno budget sprecato", text: "I clic non arrivano più su uno store che il telefono non può usare." },
        { title: "QR per creativi fisici", text: "Usa la stessa logica su poster, flyer, eventi o packaging." },
        { title: "Destinazioni modificabili", text: "Cambia App Store, Google Play o fallback senza modificare annunci o ristampare materiale." },
      ],
      metrics: [
        { value: "1 URL", label: "per creatività" },
        { value: "100%", label: "iOS, Android e desktop coperti" },
        { value: "0 scelta", label: "l'utente non sceglie store" },
      ],
      beforeAfter: {
        before: {
          title: "Senza smart link",
          rows: [
            "Scegli App Store e perdi clic Android",
            "Scegli Google Play e perdi clic iPhone",
            "Duplichi campagne solo per cambiare URL",
            "I dati sono sparsi tra link, ads e landing",
          ],
        },
        after: {
          title: "Con Link My App",
          rows: [
            "Una URL annuncio funziona per iPhone, Android e desktop",
            "Ogni clic va direttamente alla destinazione corretta",
            "I link possono essere separati per piattaforma o creatività",
            "Clic ads e scan QR si leggono nella stessa dashboard",
          ],
        },
      },
      realExamples: [
        { title: "Campagna Meta Ads", text: "L'annuncio usa una URL. iPhone apre App Store e Android apre Google Play automaticamente." },
        { title: "Lancio TikTok Ads", text: "Ogni creatività ha il proprio smart link per capire quale video porta clic migliori." },
        { title: "Google Ads e YouTube Ads", text: "Search, display e video usano una URL pulita senza mandare utenti allo store sbagliato." },
        { title: "Annuncio offline con QR", text: "Poster o flyer includono un QR che funziona su tutti i telefoni e si misura a parte." },
      ],
      tutorial: [
        { title: "Incolla i due store", text: "Aggiungi App Store, Google Play e una URL fallback per desktop." },
        { title: "Crea link per campagna", text: "Usa uno slug chiaro per Meta, TikTok, Google o YouTube." },
        { title: "Usalo come destinazione", text: "Incolla lo smart link nel campo URL dell'annuncio invece di scegliere uno store." },
        { title: "Duplica per creatività", text: "Crea link per ad set, creatività, mercato o influencer." },
        { title: "Aggiungi QR se serve", text: "Se il creativo è stampato o offline, scarica il QR dallo stesso smart link." },
        { title: "Leggi i clic", text: "Controlla clic per dispositivo, sorgente e QR per capire quali ads generano interesse." },
      ],
      faqs: [
        { q: "Posso usarlo in Meta Ads?", a: "Sì. Usa lo smart link come URL di destinazione. Ogni clic va a App Store, Google Play o fallback in base al dispositivo." },
        { q: "Funziona con TikTok Ads?", a: "Sì. TikTok accetta una URL normale e lo smart link rileva il dispositivo dopo il clic." },
        { q: "Serve per Google Ads e YouTube Ads?", a: "Sì. Puoi usare una URL unica per search, display, video o YouTube." },
        { q: "L'utente vede una pagina intermedia?", a: "Lo smart link è pensato per mandare l'utente alla destinazione corretta senza fargli scegliere lo store." },
        { q: "Posso creare un link per creatività?", a: "Sì. Crea smart link per campagna, ad set, creatività, mercato o piattaforma." },
        { q: "Il QR conta negli annunci?", a: "Nel digital conta soprattutto il link. Il QR serve per print, eventi o creatività offline." },
        { q: "Posso cambiare URL dopo?", a: "Sì. La URL dell'annuncio resta uguale mentre modifichi destinazioni dalla dashboard." },
        { q: "Sostituisce le analytics della piattaforma?", a: "No. Le completa con clic per dispositivo, sorgente e smart link prima dello store." },
      ],
    },
    ko: {
      slug: "app-install-ads",
      label: "광고",
      title: "앱 설치 광고용 스마트 링크",
      metaTitle: "앱 설치 광고용 스마트 링크 - App Store와 Google Play를 하나의 URL로",
      metaDescription:
        "Meta Ads, TikTok Ads, Google Ads, YouTube Ads에서 하나의 스마트 링크를 사용하세요. iPhone 또는 Android를 감지해 올바른 스토어로 보냅니다.",
      h1: "광고 클릭을 올바른 앱 스토어로 보내는 하나의 링크",
      eyebrow: "앱 설치 광고",
      intro:
        "Meta Ads, TikTok Ads, Google Ads, YouTube Ads는 보통 하나의 destination URL만 허용합니다. App Store만 넣으면 Android 사용자를 잃고, Google Play만 넣으면 iPhone 사용자를 잃습니다. Link My App은 광고에 넣을 하나의 스마트 링크로 기기를 감지하고 올바른 스토어로 보냅니다.",
      painPoints: [
        "광고 플랫폼은 URL 하나만 주지만 앱에는 두 개의 스토어 링크가 있습니다.",
        "App Store 전용 광고는 Android 클릭을 잃습니다.",
        "Google Play 전용 광고는 iPhone 클릭을 잃습니다.",
        "스토어 때문에 캠페인을 나누면 리포팅이 복잡해집니다.",
        "광고와 스토어 사이의 landing page는 마찰을 만듭니다.",
        "오프라인 광고 QR은 모든 휴대폰에서 작동하는 URL이 필요합니다.",
      ],
      benefits: [
        { title: "모든 광고에 하나의 링크", text: "Meta, TikTok, Google, YouTube, retargeting 캠페인에서 스마트 URL을 사용하세요." },
        { title: "자동 기기 라우팅", text: "iPhone은 App Store, Android는 Google Play, 데스크톱은 fallback으로 이동합니다." },
        { title: "깔끔한 캠페인 측정", text: "캠페인, ad set, creative, platform별 링크를 만들어 클릭을 비교하세요." },
        { title: "낭비되는 예산 감소", text: "사용자 기기에서 사용할 수 없는 스토어로 클릭을 보내지 않습니다." },
        { title: "오프라인 creative용 QR", text: "포스터, 전단, 이벤트, 패키지에서도 같은 방식으로 QR을 사용할 수 있습니다." },
        { title: "수정 가능한 목적지", text: "광고나 QR 인쇄물을 바꾸지 않고 App Store, Google Play, fallback을 수정하세요." },
      ],
      metrics: [
        { value: "1 URL", label: "광고 creative별" },
        { value: "100%", label: "iOS, Android, 데스크톱 지원" },
        { value: "0 선택", label: "사용자가 스토어를 고르지 않음" },
      ],
      beforeAfter: {
        before: {
          title: "스마트 링크 없이",
          rows: [
            "App Store를 선택하면 Android 클릭을 잃습니다",
            "Google Play를 선택하면 iPhone 클릭을 잃습니다",
            "URL 때문에 캠페인을 나눕니다",
            "데이터가 링크, 광고, landing page로 흩어집니다",
          ],
        },
        after: {
          title: "Link My App 사용 후",
          rows: [
            "하나의 광고 URL이 iPhone, Android, 데스크톱에서 작동합니다",
            "모든 클릭이 바로 올바른 목적지로 갑니다",
            "플랫폼이나 creative별로 링크를 나눌 수 있습니다",
            "광고 클릭과 QR scan을 같은 dashboard에서 봅니다",
          ],
        },
      },
      realExamples: [
        { title: "Meta Ads 캠페인", text: "광고는 하나의 URL을 사용하고 iPhone은 App Store, Android는 Google Play를 자동으로 엽니다." },
        { title: "TikTok Ads 출시", text: "각 creative에 스마트 링크를 부여해 어떤 영상이 좋은 클릭을 만드는지 확인합니다." },
        { title: "Google Ads와 YouTube Ads", text: "Search, display, video에서 잘못된 스토어로 보내지 않는 깔끔한 URL을 사용합니다." },
        { title: "QR이 있는 오프라인 광고", text: "포스터나 전단에 모든 휴대폰에서 작동하는 QR을 넣고 별도로 측정합니다." },
      ],
      tutorial: [
        { title: "두 스토어 URL 입력", text: "App Store, Google Play, 데스크톱용 fallback URL을 추가하세요." },
        { title: "캠페인별 링크 생성", text: "Meta, TikTok, Google, YouTube 캠페인별로 명확한 slug를 사용하세요." },
        { title: "광고 destination으로 사용", text: "하나의 스토어만 선택하지 말고 광고 URL 필드에 스마트 링크를 넣으세요." },
        { title: "Creative별 복제", text: "Ad set, creative, market, influencer별로 링크를 나누세요." },
        { title: "필요하면 QR 추가", text: "인쇄나 오프라인 creative에는 같은 스마트 링크의 QR을 다운로드하세요." },
        { title: "클릭 확인", text: "기기, 소스, QR별 클릭으로 어떤 광고가 앱 관심을 만드는지 확인하세요." },
      ],
      faqs: [
        { q: "Meta Ads에서 사용할 수 있나요?", a: "네. destination URL로 사용하면 기기에 따라 App Store, Google Play 또는 fallback으로 이동합니다." },
        { q: "TikTok Ads에서도 작동하나요?", a: "네. TikTok은 일반 URL을 허용하며 클릭 후 스마트 링크가 기기를 감지합니다." },
        { q: "Google Ads와 YouTube Ads도 가능한가요?", a: "네. Search, display, video, YouTube 캠페인에 사용할 수 있습니다." },
        { q: "사용자가 중간 페이지를 보나요?", a: "스마트 링크는 사용자가 스토어를 고르지 않도록 올바른 목적지로 보내는 용도입니다." },
        { q: "Creative별 링크를 만들 수 있나요?", a: "네. 캠페인, ad set, creative, market, platform별로 만들 수 있습니다." },
        { q: "광고에서 QR이 중요한가요?", a: "디지털 광고에서는 링크가 핵심입니다. QR은 인쇄, 이벤트, 오프라인 creative에서 유용합니다." },
        { q: "나중에 스토어 URL을 바꿀 수 있나요?", a: "네. 광고 URL은 그대로 두고 dashboard에서 목적지를 바꿀 수 있습니다." },
        { q: "광고 플랫폼 analytics를 대체하나요?", a: "아니요. 스토어 도착 전의 기기, 소스, 스마트 링크 클릭 데이터로 보완합니다." },
      ],
    },
    nl: {
      slug: "app-install-ads",
      label: "Advertenties",
      title: "Smartlink voor app-install-advertenties",
      metaTitle: "Smartlink voor app-install-advertenties - een URL voor App Store en Google Play",
      metaDescription:
        "Gebruik een smartlink in Meta Ads, TikTok Ads, Google Ads en YouTube Ads. Detecteert iPhone of Android en stuurt elke klik naar de juiste store.",
      h1: "Een advertentielink die elke klik naar de juiste app store stuurt",
      eyebrow: "App-install ads",
      intro:
        "Meta Ads, TikTok Ads, Google Ads en YouTube Ads laten je vaak maar een destination URL gebruiken. Alleen App Store verliest Android-gebruikers. Alleen Google Play verliest iPhone-gebruikers. Link My App gebruikt een smartlink die het apparaat detecteert en elke advertentieklik naar de juiste store stuurt.",
      painPoints: [
        "Advertentieplatforms geven een URL, maar je app heeft twee store-links.",
        "Een App Store-only advertentie verliest Android-klikken.",
        "Een Google Play-only advertentie verliest iPhone-klikken.",
        "Campagnes splitsen per store maakt rapportage rommeliger.",
        "Een tussenlanding voegt frictie toe.",
        "QR-codes in offline creatives hebben een URL nodig die op elk toestel werkt.",
      ],
      benefits: [
        { title: "Een link in elke advertentie", text: "Gebruik dezelfde smart URL in Meta Ads, TikTok Ads, Google Ads, YouTube Ads en retargeting." },
        { title: "Automatische routing", text: "iPhone gaat naar App Store, Android naar Google Play en desktop naar je fallback." },
        { title: "Schonere campagnemeting", text: "Maak links per campagne, ad set, creative of platform en vergelijk klikken." },
        { title: "Minder mediabudget verspild", text: "Klikken landen niet meer in een store die het toestel niet kan gebruiken." },
        { title: "QR voor offline creatives", text: "Gebruik dezelfde logica op posters, flyers, events of packaging." },
        { title: "Bestemmingen aanpasbaar", text: "Wijzig App Store, Google Play of fallback zonder advertenties of QR-materiaal te vervangen." },
      ],
      metrics: [
        { value: "1 URL", label: "per advertentiecreative" },
        { value: "100%", label: "iOS, Android en desktop gedekt" },
        { value: "0 keuze", label: "gebruiker kiest geen store" },
      ],
      beforeAfter: {
        before: {
          title: "Zonder smartlink",
          rows: [
            "Je kiest App Store en verliest Android-klikken",
            "Je kiest Google Play en verliest iPhone-klikken",
            "Je splitst campagnes alleen voor andere URL's",
            "Data zit verspreid over links, ads en landings",
          ],
        },
        after: {
          title: "Met Link My App",
          rows: [
            "Een advertentie-URL werkt voor iPhone, Android en desktop",
            "Elke klik gaat direct naar de juiste bestemming",
            "Links kunnen per platform of creative worden gescheiden",
            "Ad clicks en QR-scans staan in hetzelfde dashboard",
          ],
        },
      },
      realExamples: [
        { title: "Meta Ads-campagne", text: "De advertentie gebruikt een URL. iPhone opent App Store en Android opent Google Play automatisch." },
        { title: "TikTok Ads-lancering", text: "Elke creative krijgt een smartlink zodat je ziet welke video de beste klikken brengt." },
        { title: "Google Ads en YouTube Ads", text: "Search, display en video gebruiken een schone URL zonder verkeerde store." },
        { title: "Offline advertentie met QR", text: "Poster of flyer bevat een QR die op alle telefoons werkt en apart meetbaar is." },
      ],
      tutorial: [
        { title: "Plak beide store-URL's", text: "Voeg App Store, Google Play en een desktop fallback toe." },
        { title: "Maak een link per campagne", text: "Gebruik duidelijke slugs voor Meta, TikTok, Google of YouTube." },
        { title: "Gebruik hem als advertentiebestemming", text: "Plak de smartlink in het URL-veld van de advertentie in plaats van een store te kiezen." },
        { title: "Dupliceer per creative", text: "Maak aparte links voor ad sets, creatives, markten of influencers." },
        { title: "Voeg QR toe wanneer nodig", text: "Voor print of events download je de QR van dezelfde smartlink." },
        { title: "Lees de klikken", text: "Bekijk klikken per apparaat, bron en QR om te zien welke ads app-interesse genereren." },
      ],
      faqs: [
        { q: "Kan ik dit gebruiken in Meta Ads?", a: "Ja. Gebruik de smartlink als destination URL. Elke klik gaat naar App Store, Google Play of fallback op basis van het apparaat." },
        { q: "Werkt het met TikTok Ads?", a: "Ja. TikTok accepteert een normale URL en de smartlink detecteert het apparaat na de klik." },
        { q: "Werkt het met Google Ads en YouTube Ads?", a: "Ja. Je kunt een URL gebruiken voor search, display, video of YouTube." },
        { q: "Ziet de gebruiker een tussenpagina?", a: "De smartlink is bedoeld om de gebruiker naar de juiste bestemming te sturen zonder storekeuze." },
        { q: "Kan ik een link per creative maken?", a: "Ja. Maak smartlinks per campagne, ad set, creative, markt of platform." },
        { q: "Is QR belangrijk voor advertenties?", a: "Bij digitale advertenties is de link het belangrijkst. QR is handig voor print, events of offline creatives." },
        { q: "Kan ik store-URL's later wijzigen?", a: "Ja. De advertentie-URL blijft hetzelfde terwijl je bestemmingen in het dashboard aanpast." },
        { q: "Vervangt dit advertentieplatform-analytics?", a: "Nee. Het vult aan met klikdata per apparaat, bron en smartlink voor de store." },
      ],
    },
    ar: {
      slug: "app-install-ads",
      label: "الإعلانات",
      title: "رابط ذكي لإعلانات تنزيل التطبيقات",
      metaTitle: "رابط ذكي لإعلانات التطبيقات - URL واحد لـ App Store وGoogle Play",
      metaDescription:
        "استخدم رابطا ذكيا واحدا في Meta Ads وTikTok Ads وGoogle Ads وYouTube Ads. يكتشف iPhone أو Android ويرسل كل نقرة إلى المتجر الصحيح.",
      h1: "رابط إعلان واحد يرسل كل نقرة إلى متجر التطبيق الصحيح",
      eyebrow: "إعلانات التطبيقات",
      intro:
        "غالبا ما تسمح Meta Ads وTikTok Ads وGoogle Ads وYouTube Ads برابط وجهة واحد فقط. إذا وضعت App Store فقط، تخسر مستخدمي Android. وإذا وضعت Google Play فقط، تخسر مستخدمي iPhone. يمنحك Link My App رابطا ذكيا يكتشف الجهاز ويرسل كل نقرة إلى المتجر الصحيح.",
      painPoints: [
        "منصات الإعلانات تعطيك URL واحدا، بينما لتطبيقك رابطان للمتاجر.",
        "إعلان App Store فقط يخسر نقرات Android.",
        "إعلان Google Play فقط يخسر نقرات iPhone.",
        "تقسيم الحملات حسب المتجر يجعل التقارير أصعب.",
        "صفحة وسيطة بين الإعلان والمتجر تضيف احتكاكا.",
        "رموز QR في الإعلانات offline تحتاج URL يعمل على كل هاتف.",
      ],
      benefits: [
        { title: "رابط واحد في كل إعلان", text: "استخدم نفس URL الذكي في Meta Ads وTikTok Ads وGoogle Ads وYouTube Ads وretargeting." },
        { title: "توجيه تلقائي حسب الجهاز", text: "iPhone يذهب إلى App Store وAndroid إلى Google Play وسطح المكتب إلى fallback." },
        { title: "قياس حملات أوضح", text: "أنشئ رابطا لكل حملة أو ad set أو creative أو منصة وقارن النقرات." },
        { title: "ميزانية أقل مهدرة", text: "النقرات لا تصل إلى متجر لا يستطيع جهاز المستخدم استخدامه." },
        { title: "QR للإعلانات الفيزيائية", text: "استخدم نفس الفكرة في الملصقات والمنشورات والفعاليات والتغليف." },
        { title: "وجهات قابلة للتعديل", text: "غيّر App Store أو Google Play أو fallback بدون تعديل الإعلانات أو إعادة طباعة QR." },
      ],
      metrics: [
        { value: "URL 1", label: "لكل creative إعلاني" },
        { value: "100%", label: "تغطية iOS وAndroid وسطح المكتب" },
        { value: "0 اختيار", label: "المستخدم لا يختار المتجر" },
      ],
      beforeAfter: {
        before: {
          title: "بدون رابط ذكي",
          rows: [
            "تختار App Store فتخسر نقرات Android",
            "تختار Google Play فتخسر نقرات iPhone",
            "تقسم الحملات فقط لاستخدام URLs مختلفة",
            "البيانات تتوزع بين الروابط والإعلانات والصفحات",
          ],
        },
        after: {
          title: "مع Link My App",
          rows: [
            "URL إعلان واحد يعمل لـ iPhone وAndroid وسطح المكتب",
            "كل نقرة تذهب مباشرة إلى الوجهة الصحيحة",
            "يمكن فصل الروابط حسب المنصة أو creative",
            "نقرات الإعلانات ومسحات QR تظهر في نفس dashboard",
          ],
        },
      },
      realExamples: [
        { title: "حملة Meta Ads", text: "الإعلان يستخدم URL واحدا. iPhone يفتح App Store وAndroid يفتح Google Play تلقائيا." },
        { title: "إطلاق TikTok Ads", text: "كل creative يحصل على smart link لمعرفة أي فيديو يجلب أفضل النقرات." },
        { title: "Google Ads وYouTube Ads", text: "Search وdisplay وvideo تستخدم URL نظيفا بدون إرسال المستخدم للمتجر الخطأ." },
        { title: "إعلان offline مع QR", text: "ملصق أو flyer يحتوي QR يعمل على كل الهواتف ويمكن قياسه منفصلا." },
      ],
      tutorial: [
        { title: "إضافة رابطَي المتاجر", text: "أضف App Store وGoogle Play وfallback لسطح المكتب." },
        { title: "إنشاء رابط لكل حملة", text: "استخدم slug واضحا لكل حملة Meta أو TikTok أو Google أو YouTube." },
        { title: "استخدامه كوجهة الإعلان", text: "ضع smart link في حقل URL للإعلان بدلا من اختيار متجر واحد فقط." },
        { title: "نسخه حسب creative", text: "أنشئ روابط منفصلة لكل ad set أو creative أو سوق أو مؤثر." },
        { title: "إضافة QR عند الحاجة", text: "إذا كان الإعلان مطبوعا أو offline، نزّل QR من نفس smart link." },
        { title: "قراءة النقرات", text: "راجع النقرات حسب الجهاز والمصدر وQR لمعرفة الإعلانات التي تولد اهتماما بالتطبيق." },
      ],
      faqs: [
        { q: "هل يمكن استخدامه في Meta Ads؟", a: "نعم. استخدم smart link كURL للوجهة. كل نقرة تذهب إلى App Store أو Google Play أو fallback حسب الجهاز." },
        { q: "هل يعمل مع TikTok Ads؟", a: "نعم. TikTok يقبل URL عاديا، والرابط الذكي يكتشف الجهاز بعد النقرة." },
        { q: "هل يعمل مع Google Ads وYouTube Ads؟", a: "نعم. يمكنك استخدام URL واحد للحملات search وdisplay وvideo وYouTube." },
        { q: "هل يرى المستخدم صفحة وسيطة؟", a: "الرابط الذكي مصمم لإرسال المستخدم إلى الوجهة الصحيحة بدون أن يختار المتجر." },
        { q: "هل يمكن إنشاء رابط لكل creative؟", a: "نعم. أنشئ روابط حسب الحملة أو ad set أو creative أو السوق أو المنصة." },
        { q: "هل QR مهم في الإعلانات؟", a: "في الإعلانات الرقمية الرابط هو الأهم. QR مفيد للطباعة والفعاليات والإعلانات offline." },
        { q: "هل يمكن تغيير روابط المتاجر لاحقا؟", a: "نعم. URL الإعلان يبقى كما هو بينما تعدل الوجهات في dashboard." },
        { q: "هل يستبدل analytics منصة الإعلانات؟", a: "لا. يكملها ببيانات نقرات حسب الجهاز والمصدر والرابط قبل الوصول للمتجر." },
      ],
    },
    hi: {
      slug: "app-install-ads",
      label: "Ads",
      title: "App install ads के लिए smart link",
      metaTitle: "App install ads smart link - App Store और Google Play के लिए एक URL",
      metaDescription:
        "Meta Ads, TikTok Ads, Google Ads और YouTube Ads में एक smart link इस्तेमाल करें. यह iPhone या Android पहचानकर हर click को सही store पर भेजता है.",
      h1: "Ads के लिए एक link जो हर click को सही app store पर भेजता है",
      eyebrow: "App install ads",
      intro:
        "Meta Ads, TikTok Ads, Google Ads और YouTube Ads में अक्सर एक ही destination URL मिलता है. अगर आप सिर्फ App Store link डालते हैं, Android users खो जाते हैं. अगर सिर्फ Google Play डालते हैं, iPhone users खो जाते हैं. Link My App एक smart link देता है जो device detect करके click को सही store पर भेजता है.",
      painPoints: [
        "Ad platforms एक URL देती हैं, लेकिन app के दो store links होते हैं.",
        "App Store-only ad Android clicks खो देता है.",
        "Google Play-only ad iPhone clicks खो देता है.",
        "Store के हिसाब से campaigns split करने पर reporting messy होती है.",
        "Ad और store के बीच landing page friction बढ़ाता है.",
        "Offline ad creatives के QR को ऐसा URL चाहिए जो हर phone पर काम करे.",
      ],
      benefits: [
        { title: "हर ad में एक link", text: "Meta Ads, TikTok Ads, Google Ads, YouTube Ads और retargeting में वही smart URL इस्तेमाल करें." },
        { title: "Automatic device routing", text: "iPhone App Store पर, Android Google Play पर और desktop fallback पर जाता है." },
        { title: "Clean campaign tracking", text: "Campaign, ad set, creative या platform के लिए अलग link बनाकर clicks compare करें." },
        { title: "कम wasted budget", text: "Clicks ऐसे store पर नहीं जाते जो user के phone पर काम नहीं करता." },
        { title: "Offline creatives के लिए QR", text: "Posters, flyers, events या packaging में भी यही QR logic इस्तेमाल करें." },
        { title: "Editable destinations", text: "Ads या QR material बदले बिना App Store, Google Play या fallback edit करें." },
      ],
      metrics: [
        { value: "1 URL", label: "हर ad creative के लिए" },
        { value: "100%", label: "iOS, Android और desktop covered" },
        { value: "0 choice", label: "user store choose नहीं करता" },
      ],
      beforeAfter: {
        before: {
          title: "Smart link के बिना",
          rows: [
            "App Store चुनते हैं और Android clicks खोते हैं",
            "Google Play चुनते हैं और iPhone clicks खोते हैं",
            "URLs के लिए campaigns duplicate करते हैं",
            "Data links, ads और landings में बिखर जाता है",
          ],
        },
        after: {
          title: "Link My App के साथ",
          rows: [
            "एक ad URL iPhone, Android और desktop पर काम करता है",
            "हर click सीधे सही destination पर जाता है",
            "Links platform या creative के हिसाब से अलग हो सकते हैं",
            "Ad clicks और QR scans एक dashboard में दिखते हैं",
          ],
        },
      },
      realExamples: [
        { title: "Meta Ads campaign", text: "Ad एक URL इस्तेमाल करता है. iPhone App Store खोलता है और Android Google Play automatically खोलता है." },
        { title: "TikTok Ads launch", text: "हर creative को smart link मिलता है ताकि पता चले कौन सा video qualified clicks लाता है." },
        { title: "Google Ads और YouTube Ads", text: "Search, display और video campaigns गलत store पर भेजे बिना clean download URL इस्तेमाल करते हैं." },
        { title: "Offline ad with QR", text: "Poster या flyer में QR होता है जो हर phone पर काम करता है और अलग measure होता है." },
      ],
      tutorial: [
        { title: "दोनों store URLs डालें", text: "App Store, Google Play और desktop fallback URL add करें." },
        { title: "Campaign-wise link बनाएं", text: "Meta, TikTok, Google या YouTube campaign के लिए clear slug इस्तेमाल करें." },
        { title: "Ad destination में लगाएं", text: "सिर्फ एक store चुनने की जगह ad URL field में smart link paste करें." },
        { title: "Creative-wise duplicate करें", text: "Ad set, creative, market या influencer के लिए अलग links बनाएं." },
        { title: "जरूरत हो तो QR जोड़ें", text: "अगर creative print या offline है, तो उसी smart link से QR download करें." },
        { title: "Clicks पढ़ें", text: "Device, source और QR के हिसाब से clicks देखें कि कौन से ads app interest ला रहे हैं." },
      ],
      faqs: [
        { q: "क्या इसे Meta Ads में इस्तेमाल कर सकते हैं?", a: "हां. Smart link को destination URL की तरह इस्तेमाल करें. हर click device के हिसाब से App Store, Google Play या fallback पर जाता है." },
        { q: "क्या TikTok Ads में काम करता है?", a: "हां. TikTok normal URL accept करता है और smart link click के बाद device detect करता है." },
        { q: "क्या Google Ads और YouTube Ads में काम करता है?", a: "हां. Search, display, video या YouTube campaigns में एक URL इस्तेमाल कर सकते हैं." },
        { q: "क्या user intermediate page देखेगा?", a: "Smart link user से store choose करवाए बिना सही destination पर भेजने के लिए बना है." },
        { q: "क्या हर creative के लिए link बना सकते हैं?", a: "हां. Campaign, ad set, creative, market या platform के हिसाब से smart links बनाएं." },
        { q: "Ads में QR कितना जरूरी है?", a: "Digital ads में link मुख्य है. QR print, events या offline creatives में useful है." },
        { q: "क्या store URLs बाद में बदल सकते हैं?", a: "हां. Ad URL वही रहता है और आप dashboard से destinations edit करते हैं." },
        { q: "क्या यह ad platform analytics replace करता है?", a: "नहीं. यह store से पहले device, source और smart-link click data देकर उसे complement करता है." },
      ],
    },
  },

  /* ============================================================
   * 1. ECOMMERCE
   * ============================================================ */
  {
    id: "ecommerce",
    icon: "Store",
    accent: "from-emerald-50 to-white",
    en: {
      slug: "ecommerce-apps",
      label: "Ecommerce",
      title: "App download link for ecommerce apps",
      metaTitle: "App download link for ecommerce apps – one QR for App Store & Google Play",
      metaDescription: "Get one smart link and QR for your shop's app. Detects iPhone or Android and sends every click to App Store, Google Play or your store.",
      h1: "One link to drive downloads of your shop's app",
      eyebrow: "Ecommerce apps",
      intro: "Stop printing two icons next to your shop's app. Use a single smart link and QR that detects the user's phone and sends every click to App Store, Google Play or your store.",
      painPoints: [
        "Customers don't know which store to open and abandon the download.",
        "Your packaging has two icons that confuse the eye.",
        "You can't measure which campaign brought the most app installs.",
        "Email blasts have to include two URLs, doubling the clicks needed to install.",
        "Influencer drops with two store URLs lose followers between taps.",
        "Paid ads waste budget sending users to a store their phone can't open.",
      ],
      benefits: [
        { title: "One link in every channel", text: "Email, web, Instagram bio, packaging or stickers – the same URL works everywhere." },
        { title: "QR for the storefront", text: "Print a single QR on your shop window, receipts or packaging and forget about choosing iOS or Android." },
        { title: "Measure repeat customers", text: "See which channel brings buyers back into your app to repurchase." },
        { title: "One link for paid ads", text: "Use the smart link as the destination of Meta, Google Ads or TikTok campaigns – it detects iPhone or Android on the fly." },
        { title: "Cleaner email blasts", text: "Send one CTA in your newsletter instead of two stacked buttons." },
        { title: "Trackable influencer drops", text: "Give each influencer a different smart link to compare conversions without sending two URLs." },
      ],
      metrics: [
        { value: "+18%", label: "Tap-through vs two buttons" },
        { value: "1 QR", label: "Per shop window or packaging" },
        { value: "100%", label: "Devices covered" },
      ],
      beforeAfter: {
        before: {
          title: "Without a smart link",
          rows: [
            "Two icons on packaging, half the customers skip both",
            "Email campaigns with two CTAs, lower CTR",
            "No way to know which channel installed the app",
            "Influencer codes mixed with store URLs",
          ],
        },
        after: {
          title: "With Link My App",
          rows: [
            "One QR on packaging, every phone goes to the right store",
            "Single CTA in email, clean and trackable",
            "Clicks separated by Instagram, email, web and QR",
            "One smart link per influencer or campaign",
          ],
        },
      },
      realExamples: [
        { title: "Fashion brand boutique", text: "Prints one QR on each clothing tag so customers download the app while trying on clothes – without choosing iOS or Android." },
        { title: "Specialty coffee shop", text: "Uses a single smart link on receipts so every diner can install the loyalty app from any device." },
        { title: "Beauty marketplace", text: "Adds one smart link to every newsletter so subscribers stop having to choose a store." },
        { title: "Pet supplies retailer", text: "Prints a QR on packaging boxes for online orders so customers come back through the app." },
      ],
      tutorial: [
        { title: "Paste your shop URLs", text: "App Store URL, Google Play URL and a fallback to your shop's website for desktop visitors." },
        { title: "Download your QR", text: "Get the QR in high resolution and add it to packaging, shop window and receipts." },
        { title: "Switch your email CTAs", text: "Replace the two App Store / Google Play buttons in your newsletter with one CTA pointing to the smart link." },
        { title: "Track your channels", text: "Compare installs from Instagram, email, web, QR and ads in your dashboard." },
      ],
      faqs: [
        { q: "Can I use the same link for paid ads?", a: "Yes. The smart link works in Meta, Google Ads, TikTok and any other channel because it detects the device on the fly." },
        { q: "Does it work for Shopify or WooCommerce apps?", a: "Yes. If your shop has a native app on App Store or Google Play, you can paste both links and we'll send each visitor to the right store." },
        { q: "Can I track add-to-cart from the link?", a: "We track clicks per device, source and campaign. Add-to-cart events happen inside your app – pair Link My App with your in-app analytics." },
        { q: "Will the smart link slow my checkout flow?", a: "No. The redirect adds milliseconds and goes straight to App Store or Google Play, not to a landing page." },
        { q: "Can I use it on TikTok Shop and Instagram Shop?", a: "Yes. The smart link is a normal URL that works as bio link, story sticker and ad destination." },
        { q: "Can I create one smart link per campaign?", a: "Yes. You can create unlimited smart links for free so each campaign or influencer drop has its own URL and stats." },
        { q: "Does it support Amazon-like apps with two regions?", a: "Yes. You can use the fallback URL to send desktop users (or users from regions where your app isn't published) to the right web flow." },
        { q: "Can I change the destination without reprinting the QR?", a: "Yes. The QR points to your smart link, which is stable. You can change the App Store, Google Play or fallback URL anytime without reprinting." },
      ],
    },
    es: {
      slug: "apps-ecommerce",
      label: "Ecommerce",
      title: "Enlace de descarga para apps de ecommerce",
      metaTitle: "Enlace de descarga para apps de ecommerce – un QR para App Store y Play Store",
      metaDescription: "Crea un único smart link y QR para la app de tu tienda. Detecta iPhone o Android y envía cada clic a App Store, Play Store o tu web.",
      h1: "Un solo enlace para descargar la app de tu tienda",
      eyebrow: "Apps de ecommerce",
      intro: "Deja de poner dos iconos al lado de la app de tu tienda. Un smart link y un QR que detectan el móvil del usuario y mandan cada clic a App Store, Play Store o tu web.",
      painPoints: [
        "Los clientes no saben qué tienda abrir y abandonan la descarga.",
        "El packaging lleva dos iconos que confunden la vista.",
        "No sabes qué campaña genera más instalaciones de tu app.",
        "Las newsletter llevan dos URLs y duplican los clics necesarios para instalar.",
        "Los drops de influencer con dos URLs de tienda pierden seguidores entre toques.",
        "Los anuncios pagados queman presupuesto enviando a tiendas que no abre el móvil del usuario.",
      ],
      benefits: [
        { title: "Un enlace para cada canal", text: "Email, web, bio de Instagram, packaging o stickers: la misma URL funciona en todas partes." },
        { title: "QR para tu tienda física", text: "Imprime un único QR en el escaparate, tickets o packaging y olvídate de elegir iOS o Android." },
        { title: "Mide compras recurrentes", text: "Descubre qué canal trae a los compradores recurrentes a tu app." },
        { title: "Un único enlace para anuncios", text: "Usa el smart link como destino en Meta, Google Ads o TikTok – detecta iPhone o Android al instante." },
        { title: "Emails más limpios", text: "Envía un único CTA en tu newsletter en lugar de dos botones apilados." },
        { title: "Drops de influencer medibles", text: "Da a cada influencer un smart link distinto para comparar conversiones sin enviar dos URLs." },
      ],
      metrics: [
        { value: "+18%", label: "CTR vs dos botones" },
        { value: "1 QR", label: "Por escaparate o packaging" },
        { value: "100%", label: "Dispositivos cubiertos" },
      ],
      beforeAfter: {
        before: {
          title: "Sin smart link",
          rows: [
            "Dos iconos en el packaging, la mitad de clientes no abre ninguno",
            "Newsletter con dos CTAs, peor CTR",
            "Imposible saber qué canal instala la app",
            "Códigos de influencer mezclados con URLs de tienda",
          ],
        },
        after: {
          title: "Con Link My App",
          rows: [
            "Un QR en el packaging y cada móvil va a la tienda correcta",
            "Un único CTA en email, limpio y medible",
            "Clics separados por Instagram, email, web y QR",
            "Un smart link por influencer o campaña",
          ],
        },
      },
      realExamples: [
        { title: "Boutique de moda", text: "Imprime un QR en cada etiqueta de prenda para que los clientes descarguen la app mientras se prueban ropa – sin elegir iOS o Android." },
        { title: "Cafetería de especialidad", text: "Usa un smart link en los tickets para que cada cliente instale la app de fidelización desde cualquier dispositivo." },
        { title: "Marketplace de belleza", text: "Añade un único smart link a cada newsletter para que los suscriptores dejen de elegir tienda." },
        { title: "Tienda de productos para mascotas", text: "Imprime un QR en las cajas de envío online para que los clientes vuelvan a través de la app." },
      ],
      tutorial: [
        { title: "Pega las URLs de tu tienda", text: "URL de App Store, URL de Play Store y una alternativa a la web de tu tienda para visitas de ordenador." },
        { title: "Descarga tu QR", text: "Bájalo en alta resolución y añádelo al packaging, escaparate y tickets." },
        { title: "Cambia los CTAs del email", text: "Sustituye los dos botones de App Store / Play Store en tu newsletter por un único CTA al smart link." },
        { title: "Mide tus canales", text: "Compara instalaciones desde Instagram, email, web, QR y anuncios en el panel." },
      ],
      faqs: [
        { q: "¿Puedo usar el mismo link en anuncios de pago?", a: "Sí. El smart link funciona en Meta, Google Ads, TikTok y cualquier otro canal porque detecta el dispositivo al instante." },
        { q: "¿Funciona con apps de Shopify o WooCommerce?", a: "Sí. Si tu tienda tiene una app nativa en App Store o Play Store, pegas los dos enlaces y enviamos cada visita a la tienda correcta." },
        { q: "¿Puedo medir añadidos al carrito desde el link?", a: "Medimos clics por dispositivo, fuente y campaña. Los eventos de carrito ocurren dentro de la app – combina Link My App con tu analítica in-app." },
        { q: "¿El smart link ralentiza el checkout?", a: "No. La redirección añade milisegundos y va directa a App Store o Play Store, no a una landing intermedia." },
        { q: "¿Funciona con TikTok Shop e Instagram Shop?", a: "Sí. El smart link es una URL normal que funciona como link de bio, sticker de story y destino de anuncio." },
        { q: "¿Puedo crear un smart link por campaña?", a: "Sí. Puedes crear smart links ilimitados gratis para que cada campaña o influencer tenga su URL y estadísticas." },
        { q: "¿Soporta apps con dos regiones tipo Amazon?", a: "Sí. Usa la URL alternativa para enviar a usuarios de ordenador (o de regiones donde tu app no está publicada) al flujo web correcto." },
        { q: "¿Puedo cambiar el destino sin reimprimir el QR?", a: "Sí. El QR apunta a tu smart link, que es estable. Puedes cambiar la URL de App Store, Play Store o alternativa cuando quieras sin reimprimir." },
      ],
    },
    fr: {
      slug: "apps-ecommerce",
      label: "Ecommerce",
      title: "Lien de téléchargement pour apps ecommerce",
      metaTitle: "Lien de téléchargement pour apps ecommerce – un QR pour App Store et Google Play",
      metaDescription: "Crée un seul smart link et QR pour l'app de ta boutique. Détecte iPhone ou Android et envoie chaque clic vers App Store, Google Play ou ton site.",
      h1: "Un seul lien pour télécharger l'app de ta boutique",
      eyebrow: "Apps ecommerce",
      intro: "Arrête de mettre deux icônes à côté de l'app de ta boutique. Un smart link et un QR détectent le mobile et envoient chaque clic vers App Store, Google Play ou ton site.",
      painPoints: [
        "Les clients ne savent pas quelle boutique ouvrir et abandonnent le téléchargement.",
        "Ton packaging contient deux icônes qui embrouillent.",
        "Tu ne sais pas quelle campagne génère le plus d'installations.",
        "Les newsletters contiennent deux URLs et doublent les clics nécessaires.",
        "Les drops d'influenceurs avec deux URLs perdent des followers entre les taps.",
        "Les pubs payantes gaspillent du budget en envoyant vers une boutique que le mobile n'ouvre pas.",
      ],
      benefits: [
        { title: "Un lien pour chaque canal", text: "Email, web, bio Instagram, packaging ou stickers : la même URL marche partout." },
        { title: "QR pour ta boutique physique", text: "Imprime un seul QR sur vitrine, tickets ou packaging. Plus besoin de choisir iOS ou Android." },
        { title: "Mesure les achats récurrents", text: "Découvre quel canal ramène tes clients fidèles dans ton app." },
        { title: "Un seul lien pour tes pubs", text: "Utilise le smart link comme destination Meta, Google Ads ou TikTok – il détecte iPhone ou Android instantanément." },
        { title: "Emails plus propres", text: "Envoie un seul CTA dans ta newsletter au lieu de deux boutons empilés." },
        { title: "Drops d'influenceurs mesurables", text: "Donne à chaque influenceur un smart link différent pour comparer les conversions sans envoyer deux URLs." },
      ],
      metrics: [
        { value: "+18%", label: "CTR vs deux boutons" },
        { value: "1 QR", label: "Par vitrine ou packaging" },
        { value: "100%", label: "Appareils couverts" },
      ],
      beforeAfter: {
        before: {
          title: "Sans smart link",
          rows: [
            "Deux icônes sur le packaging, la moitié des clients n'ouvrent rien",
            "Newsletter avec deux CTAs, moins bon CTR",
            "Impossible de savoir quel canal installe l'app",
            "Codes influenceurs mélangés aux URLs de boutique",
          ],
        },
        after: {
          title: "Avec Link My App",
          rows: [
            "Un QR sur le packaging et chaque mobile va à la bonne boutique",
            "Un seul CTA en email, propre et mesurable",
            "Clics séparés par Instagram, email, web et QR",
            "Un smart link par influenceur ou campagne",
          ],
        },
      },
      realExamples: [
        { title: "Boutique de mode", text: "Imprime un QR sur chaque étiquette pour que les clients téléchargent l'app pendant l'essayage – sans choisir iOS ou Android." },
        { title: "Café de spécialité", text: "Utilise un smart link sur les tickets pour que chaque client installe l'app de fidélité depuis n'importe quel appareil." },
        { title: "Marketplace beauté", text: "Ajoute un seul smart link à chaque newsletter pour que les abonnés ne choisissent plus de boutique." },
        { title: "Animalerie en ligne", text: "Imprime un QR sur les cartons d'envoi pour que les clients reviennent via l'app." },
      ],
      tutorial: [
        { title: "Colle les URLs de ta boutique", text: "URL App Store, URL Google Play et une alternative vers le site de ta boutique pour les visiteurs desktop." },
        { title: "Télécharge ton QR", text: "Récupère-le en haute résolution et ajoute-le au packaging, à la vitrine et aux tickets." },
        { title: "Change tes CTAs email", text: "Remplace les deux boutons App Store / Google Play dans ta newsletter par un seul CTA vers le smart link." },
        { title: "Mesure tes canaux", text: "Compare les installations depuis Instagram, email, web, QR et pubs dans le panel." },
      ],
      faqs: [
        { q: "Puis-je utiliser le même lien dans des pubs payantes ?", a: "Oui. Le smart link fonctionne sur Meta, Google Ads, TikTok et tout autre canal car il détecte l'appareil instantanément." },
        { q: "Compatible avec Shopify ou WooCommerce ?", a: "Oui. Si ta boutique a une app native sur App Store ou Google Play, tu colles les deux liens et on envoie chaque visite vers la bonne boutique." },
        { q: "Puis-je mesurer les ajouts au panier ?", a: "On mesure les clics par appareil, source et campagne. Les événements panier se font dans l'app – combine Link My App avec ton analytics in-app." },
        { q: "Le smart link ralentit-il le checkout ?", a: "Non. La redirection ajoute des millisecondes et va direct vers App Store ou Google Play, pas vers une landing." },
        { q: "Compatible TikTok Shop et Instagram Shop ?", a: "Oui. Le smart link est une URL normale qui marche comme lien de bio, sticker de story et destination de pub." },
        { q: "Puis-je créer un smart link par campagne ?", a: "Oui. Tu crées des smart links illimités gratuitement pour que chaque campagne ou influenceur ait son URL et ses stats." },
        { q: "Compatible avec des apps à deux régions type Amazon ?", a: "Oui. Utilise l'URL alternative pour envoyer les utilisateurs desktop (ou de régions où ton app n'est pas publiée) vers le bon flow web." },
        { q: "Puis-je changer la destination sans réimprimer le QR ?", a: "Oui. Le QR pointe vers ton smart link, qui est stable. Tu peux changer l'URL App Store, Google Play ou alternative à tout moment sans réimprimer." },
      ],
    },
  },

  /* ============================================================
   * 2. SAAS / B2B
   * ============================================================ */
  {
    id: "saas",
    icon: "Briefcase",
    accent: "from-blue-50 to-white",
    en: {
      slug: "saas-apps",
      label: "SaaS / B2B",
      title: "App download link for SaaS and B2B apps",
      metaTitle: "App download link for SaaS apps – one link, App Store and Google Play",
      metaDescription: "One smart link for your SaaS app's iOS, Android and web versions. Perfect for demos, sales decks, fairs and customer onboarding.",
      h1: "One link for the iOS, Android and web of your SaaS",
      eyebrow: "SaaS & B2B apps",
      intro: "Don't make your prospects pick a store. A single smart link in your demo deck, email or QR code sends each user to the right destination – App Store, Google Play or the web app.",
      painPoints: [
        "Sales decks list 3 different URLs and prospects don't click any of them.",
        "Your trade show banners get printed twice for iOS and Android.",
        "You can't tell whether installs come from sales, marketing or product-led growth.",
        "Email signatures stack two store links and clutter every outbound.",
        "Onboarding emails confuse new admins about which version to install.",
        "Free-trial CTAs split traffic across three URLs, hurting conversion.",
      ],
      benefits: [
        { title: "Smart link for sales", text: "One link in every email signature, deck and proposal. Closes the gap between demo and install." },
        { title: "QR for fairs and demos", text: "Print a single QR on your booth, swag or laptop sticker. It works for prospects with any device." },
        { title: "Channel-level attribution", text: "Separate installs from outbound, paid, content and partners with the same URL." },
        { title: "Cleaner email signatures", text: "Replace 'Download for iOS / Android' with one 'Try the app' line." },
        { title: "Self-serve onboarding", text: "New admins click one URL and reach the right version – mobile or web." },
        { title: "Easier press kits", text: "Press articles, podcasts and reviews link to one URL instead of two." },
      ],
      metrics: [
        { value: "1 URL", label: "In every deck or proposal" },
        { value: "+1 QR", label: "Per event or fair" },
        { value: "3 layers", label: "iOS, Android, web fallback" },
      ],
      beforeAfter: {
        before: {
          title: "Without a smart link",
          rows: [
            "Decks with App Store + Google Play + web link",
            "Two booth banners per trade show",
            "No attribution between marketing and sales channels",
            "Email signatures full of store icons",
          ],
        },
        after: {
          title: "With Link My App",
          rows: [
            "One URL in every deck and proposal",
            "One QR for booth, swag and laptop stickers",
            "Installs separated by sales, marketing and partners",
            "Single 'Try the app' line in every signature",
          ],
        },
      },
      realExamples: [
        { title: "B2B project management app", text: "Adds the smart link to every outbound email signature so prospects install from any device after the demo." },
        { title: "Field service SaaS", text: "Prints the QR on every truck and uniform – field techs install from iPhone or Android in seconds." },
        { title: "HR software", text: "Uses one smart link in onboarding emails so new admins reach the right version of the app on phone or laptop." },
        { title: "Logistics tracking", text: "Sends a single QR to warehouse clients so all forklift drivers install on whatever device they carry." },
      ],
      tutorial: [
        { title: "Paste your three URLs", text: "App Store, Google Play and a web app fallback. The smart link decides the right destination on every click." },
        { title: "Add to every outbound", text: "Email signatures, proposals, decks, calendar invites – one link replaces three." },
        { title: "Print the QR for fairs", text: "Download the QR in high resolution and use it on your booth, swag and laptops." },
        { title: "Track sales vs marketing", text: "Tag the smart link with a source per channel to see what really drives installs." },
      ],
      faqs: [
        { q: "Can I add a fallback for desktop users?", a: "Yes. The smart link redirects desktop visitors to the web app or any landing you choose." },
        { q: "Does it work for free trials?", a: "Yes. The smart link only handles the redirect – your sign-up flow stays the same once the user lands on the right store or your web app." },
        { q: "Can my team manage multiple smart links?", a: "Yes. You can manage unlimited smart links for free for product launches, regions, campaigns or A/B tests." },
        { q: "Does it integrate with HubSpot or Salesforce?", a: "The smart link is a normal URL, so you can paste it anywhere these CRMs allow links – emails, sequences, custom properties, etc." },
        { q: "Can I use it for closed beta users?", a: "Yes. Use a private smart link that points to TestFlight, internal distribution or a beta web URL." },
        { q: "Is it usable for white-label apps?", a: "Yes. Pro gives you custom short URLs (link-my.app/yourbrand) and one link per white-labelled instance." },
        { q: "Does it support invite-only ad networks?", a: "Yes. Any ad network that accepts URLs works – Meta, Google Ads, LinkedIn, Reddit, etc." },
        { q: "Can I track form completions in the web fallback?", a: "We track the click before redirect. Pair Link My App with your in-product analytics to track form completions on the web." },
      ],
    },
    es: {
      slug: "apps-saas",
      label: "SaaS / B2B",
      title: "Enlace de descarga para apps SaaS y B2B",
      metaTitle: "Enlace de descarga para apps SaaS – un solo link para App Store y Play Store",
      metaDescription: "Un smart link para las versiones iOS, Android y web de tu app SaaS. Ideal para demos, presentaciones, ferias y onboarding.",
      h1: "Un solo enlace para iOS, Android y web de tu SaaS",
      eyebrow: "Apps SaaS y B2B",
      intro: "No obligues a tus prospects a elegir tienda. Un smart link en tu demo, email o QR manda a cada usuario al destino correcto: App Store, Play Store o la app web.",
      painPoints: [
        "Las presentaciones de ventas tienen 3 URLs y los prospects no clican ninguna.",
        "Los banners de ferias se imprimen dos veces para iOS y Android.",
        "No sabes si las instalaciones vienen de ventas, marketing o producto.",
        "Las firmas de email apilan dos enlaces de tienda y ensucian cada salida.",
        "Los emails de onboarding confunden al admin nuevo sobre qué versión instalar.",
        "Los CTAs de free trial reparten el tráfico en tres URLs y bajan la conversión.",
      ],
      benefits: [
        { title: "Smart link para ventas", text: "Un enlace en cada firma de email, dossier o propuesta. Cierra el gap entre la demo y la instalación." },
        { title: "QR para ferias y demos", text: "Un único QR en tu stand, merch o pegatina del portátil. Funciona en cualquier dispositivo del visitante." },
        { title: "Atribución por canal", text: "Separa las instalaciones por outbound, paid, contenido o partners con el mismo enlace." },
        { title: "Firmas de email limpias", text: "Sustituye 'Descarga para iOS / Android' por una sola línea 'Prueba la app'." },
        { title: "Onboarding self-serve", text: "Los admins nuevos clican una URL y llegan a la versión correcta – móvil o web." },
        { title: "Press kits más fáciles", text: "Artículos de prensa, podcasts y reseñas linkan a una URL en lugar de dos." },
      ],
      metrics: [
        { value: "1 URL", label: "En cada dossier o propuesta" },
        { value: "+1 QR", label: "Por evento o feria" },
        { value: "3 capas", label: "iOS, Android, fallback web" },
      ],
      beforeAfter: {
        before: {
          title: "Sin smart link",
          rows: [
            "Dossiers con App Store + Play Store + enlace web",
            "Dos banners de stand por feria",
            "Sin atribución entre marketing y ventas",
            "Firmas de email llenas de iconos de tienda",
          ],
        },
        after: {
          title: "Con Link My App",
          rows: [
            "Una URL en cada dossier y propuesta",
            "Un QR para stand, merch y pegatinas de portátil",
            "Instalaciones separadas por ventas, marketing y partners",
            "Una sola línea 'Prueba la app' en cada firma",
          ],
        },
      },
      realExamples: [
        { title: "App de gestión de proyectos B2B", text: "Añade el smart link a cada firma de email outbound para que los prospects instalen desde cualquier dispositivo tras la demo." },
        { title: "SaaS de field service", text: "Imprime el QR en cada furgoneta y uniforme – los técnicos instalan desde iPhone o Android en segundos." },
        { title: "Software de RRHH", text: "Usa un smart link en emails de onboarding para que los admins nuevos lleguen a la versión correcta en móvil o portátil." },
        { title: "Tracking logístico", text: "Envía un único QR a clientes de almacén para que todos los carretilleros instalen en el dispositivo que llevan." },
      ],
      tutorial: [
        { title: "Pega tus tres URLs", text: "App Store, Play Store y un fallback de app web. El smart link decide el destino correcto en cada clic." },
        { title: "Añádelo a cada outbound", text: "Firmas de email, propuestas, dossiers, invitaciones de calendario – un enlace sustituye a tres." },
        { title: "Imprime el QR para ferias", text: "Descarga el QR en alta resolución y úsalo en tu stand, merch y portátiles." },
        { title: "Mide ventas vs marketing", text: "Etiqueta el smart link con una fuente por canal para ver qué genera realmente instalaciones." },
      ],
      faqs: [
        { q: "¿Puedo añadir fallback para ordenador?", a: "Sí. El smart link redirige al usuario de ordenador a tu app web o a la landing que elijas." },
        { q: "¿Funciona con free trials?", a: "Sí. El smart link solo gestiona la redirección – tu flujo de registro sigue igual una vez el usuario está en la tienda correcta o en tu app web." },
        { q: "¿Puede mi equipo gestionar varios smart links?", a: "Sí. Gestionas smart links ilimitados gratis para lanzamientos, regiones, campañas o tests A/B." },
        { q: "¿Se integra con HubSpot o Salesforce?", a: "El smart link es una URL normal, así que puedes pegarla en cualquier campo de estos CRMs que acepte enlaces – emails, secuencias, propiedades personalizadas, etc." },
        { q: "¿Puedo usarlo para usuarios de beta cerrada?", a: "Sí. Usa un smart link privado que apunte a TestFlight, distribución interna o una URL web de beta." },
        { q: "¿Sirve para apps white-label?", a: "Sí. Pro te da URLs cortas personalizadas (link-my.app/tumarca) y un enlace por instancia white-label." },
        { q: "¿Soporta redes de anuncios cerradas?", a: "Sí. Cualquier red que acepte URLs funciona – Meta, Google Ads, LinkedIn, Reddit, etc." },
        { q: "¿Puedo medir formularios en el fallback web?", a: "Medimos el clic antes de la redirección. Combina Link My App con tu analítica in-product para medir formularios en la web." },
      ],
    },
    fr: {
      slug: "apps-saas",
      label: "SaaS / B2B",
      title: "Lien de téléchargement pour apps SaaS et B2B",
      metaTitle: "Lien de téléchargement pour apps SaaS – un seul lien pour App Store et Google Play",
      metaDescription: "Un smart link pour les versions iOS, Android et web de ton app SaaS. Parfait pour les démos, présentations, salons et onboarding.",
      h1: "Un seul lien pour iOS, Android et web de ton SaaS",
      eyebrow: "Apps SaaS et B2B",
      intro: "N'oblige pas tes prospects à choisir une boutique. Un smart link dans ta démo, ton email ou ton QR envoie chaque utilisateur vers la bonne destination : App Store, Google Play ou l'app web.",
      painPoints: [
        "Les présentations commerciales contiennent 3 URLs et les prospects ne cliquent sur aucune.",
        "Les bannières de salons s'impriment deux fois pour iOS et Android.",
        "Tu ne sais pas si les installs viennent du commercial, du marketing ou du produit.",
        "Les signatures email empilent deux liens de boutique et alourdissent chaque envoi.",
        "Les emails d'onboarding embrouillent les nouveaux admins.",
        "Les CTAs d'essai gratuit éclatent le trafic sur trois URLs et baissent la conversion.",
      ],
      benefits: [
        { title: "Smart link pour la vente", text: "Un lien dans chaque signature email, dossier ou proposition. Comble l'écart entre démo et installation." },
        { title: "QR pour salons et démos", text: "Un seul QR sur ton stand, ton merch ou ton sticker. Fonctionne pour n'importe quel appareil du visiteur." },
        { title: "Attribution par canal", text: "Sépare les installations par outbound, paid, contenu ou partenaires avec le même lien." },
        { title: "Signatures email propres", text: "Remplace 'Télécharge sur iOS / Android' par une seule ligne 'Essaie l'app'." },
        { title: "Onboarding self-service", text: "Les nouveaux admins cliquent une URL et arrivent à la bonne version – mobile ou web." },
        { title: "Press kits simplifiés", text: "Articles, podcasts et reviews lient à une URL au lieu de deux." },
      ],
      metrics: [
        { value: "1 URL", label: "Dans chaque dossier ou proposition" },
        { value: "+1 QR", label: "Par event ou salon" },
        { value: "3 niveaux", label: "iOS, Android, fallback web" },
      ],
      beforeAfter: {
        before: {
          title: "Sans smart link",
          rows: [
            "Dossiers avec App Store + Google Play + lien web",
            "Deux bannières de stand par salon",
            "Pas d'attribution entre marketing et ventes",
            "Signatures email pleines d'icônes de boutique",
          ],
        },
        after: {
          title: "Avec Link My App",
          rows: [
            "Une URL dans chaque dossier et proposition",
            "Un QR pour stand, merch et stickers",
            "Installations séparées par ventes, marketing et partenaires",
            "Une seule ligne 'Essaie l'app' dans chaque signature",
          ],
        },
      },
      realExamples: [
        { title: "App de gestion de projets B2B", text: "Ajoute le smart link à chaque signature email outbound pour que les prospects installent depuis n'importe quel appareil après la démo." },
        { title: "SaaS field service", text: "Imprime le QR sur chaque camion et uniforme – les techniciens installent depuis iPhone ou Android en secondes." },
        { title: "Logiciel RH", text: "Utilise un smart link dans les emails d'onboarding pour que les nouveaux admins arrivent à la bonne version sur mobile ou portable." },
        { title: "Tracking logistique", text: "Envoie un seul QR aux clients d'entrepôt pour que tous les caristes installent sur l'appareil qu'ils portent." },
      ],
      tutorial: [
        { title: "Colle tes trois URLs", text: "App Store, Google Play et un fallback d'app web. Le smart link décide la bonne destination à chaque clic." },
        { title: "Ajoute-le à chaque outbound", text: "Signatures email, propositions, dossiers, invitations de calendrier – un lien remplace trois." },
        { title: "Imprime le QR pour les salons", text: "Télécharge le QR en haute résolution et utilise-le sur ton stand, merch et portables." },
        { title: "Mesure ventes vs marketing", text: "Tague le smart link avec une source par canal pour voir ce qui génère vraiment des installs." },
      ],
      faqs: [
        { q: "Puis-je ajouter un fallback pour desktop ?", a: "Oui. Le smart link redirige les visiteurs desktop vers ton app web ou la landing de ton choix." },
        { q: "Compatible avec les essais gratuits ?", a: "Oui. Le smart link gère uniquement la redirection – ton flow d'inscription reste identique une fois sur la bonne boutique ou ton app web." },
        { q: "Mon équipe peut-elle gérer plusieurs smart links ?", a: "Oui. Tu gères des smart links illimités gratuitement pour lancements, régions, campagnes ou tests A/B." },
        { q: "Intégration avec HubSpot ou Salesforce ?", a: "Le smart link est une URL normale, tu peux la coller dans tout champ de ces CRMs qui accepte des liens – emails, séquences, propriétés personnalisées, etc." },
        { q: "Compatible avec les utilisateurs de beta fermée ?", a: "Oui. Utilise un smart link privé qui pointe vers TestFlight, distribution interne ou une URL web beta." },
        { q: "Compatible apps white-label ?", a: "Oui. Pro te donne des URLs courtes personnalisées (link-my.app/tamarque) et un lien par instance white-label." },
        { q: "Compatible avec les réseaux de pubs fermés ?", a: "Oui. Tout réseau qui accepte des URLs marche – Meta, Google Ads, LinkedIn, Reddit, etc." },
        { q: "Puis-je mesurer les formulaires sur le fallback web ?", a: "On mesure le clic avant la redirection. Combine Link My App avec ton analytics in-product pour mesurer les formulaires sur le web." },
      ],
    },
  },

  /* ============================================================
   * 3. RESTAURANTS
   * ============================================================ */
  {
    id: "restaurants",
    icon: "Utensils",
    accent: "from-amber-50 to-white",
    en: {
      slug: "restaurant-apps",
      label: "Restaurants",
      title: "App download link for restaurant apps",
      metaTitle: "App download link for restaurant apps – one QR for App Store & Google Play",
      metaDescription: "One smart link and QR for your restaurant's app. Send every customer to App Store or Google Play with no extra clicks.",
      h1: "One smart link for your restaurant's loyalty app",
      eyebrow: "Restaurant apps",
      intro: "Customers don't want to choose a store while waiting for the bill. Print one QR on the menu, table tent or receipt and send every diner to App Store, Google Play or your web ordering.",
      painPoints: [
        "Two QR codes on the menu look messy and customers ignore both.",
        "Staff has to explain which app store to open – it kills the moment.",
        "You can't measure which table or location brings more loyalty downloads.",
        "Receipts with two icons feel cheap and clutter the layout.",
        "Online ordering vs loyalty app confuses first-time customers.",
        "Delivery bags miss the chance to convert because of dual store icons.",
      ],
      benefits: [
        { title: "One QR on every table", text: "Print one QR and forget about reprints when iOS or Android updates the icon." },
        { title: "Track app downloads per location", text: "Use a smart link per branch and compare which one drives more app installs." },
        { title: "Loyalty without friction", text: "From the receipt to the loyalty app in one tap. Less explaining, more re-orders." },
        { title: "Online ordering fallback", text: "Customers without your app land on your ordering website automatically." },
        { title: "Catering and delivery campaigns", text: "Distribute one QR with every delivery order and grow installs without printing two icons." },
        { title: "Staff stops explaining", text: "One QR on the table tent removes the 'which store do I open?' question forever." },
      ],
      metrics: [
        { value: "1 QR", label: "Per table tent or receipt" },
        { value: "+1 link", label: "Per location for stats" },
        { value: "0", label: "Customers confused at the bill" },
      ],
      beforeAfter: {
        before: {
          title: "Without a smart link",
          rows: [
            "Two QRs on the table look messy and get ignored",
            "Staff explains which store to open at every table",
            "No idea which branch drives more app downloads",
            "Receipts cluttered with two store icons",
          ],
        },
        after: {
          title: "With Link My App",
          rows: [
            "One QR per table that works for any phone",
            "Customers install in one tap without asking",
            "Per-branch tracking on a single dashboard",
            "Receipts with one clean CTA",
          ],
        },
      },
      realExamples: [
        { title: "Italian restaurant chain", text: "Prints one QR on every menu and tracks downloads per branch to see which restaurant has the best loyalty pickup." },
        { title: "Specialty coffee shop", text: "Uses one QR on the table tent so every customer joins the loyalty app from any phone." },
        { title: "Burger franchise", text: "Sends a single QR with every delivery bag so customers install the next-order app." },
        { title: "Tapas bar", text: "Prints a QR on each receipt for tip-then-install conversion with no friction." },
      ],
      tutorial: [
        { title: "Paste your three URLs", text: "App Store, Google Play and your ordering website as the fallback for customers without the app." },
        { title: "Print one QR per branch", text: "Generate a smart link for each location so you can compare per-restaurant install stats." },
        { title: "Place QRs on table tents and receipts", text: "Standard size 4×4 cm or bigger. Add a short CTA like 'Scan to join the loyalty app'." },
        { title: "Train staff on the new flow", text: "One message: 'Scan the QR, get points'. No more iOS vs Android explanations." },
      ],
      faqs: [
        { q: "Can I use a different QR per branch?", a: "Yes. You can create one free smart link per location to know which restaurant generates more installs." },
        { q: "Does it work with web ordering?", a: "Yes. The smart link can fall back to your online ordering site for desktop users or customers without your app." },
        { q: "Can my POS print the QR?", a: "Any modern POS can print a static QR image. Generate the QR from your dashboard and upload it to your POS." },
        { q: "Will the QR work after I change icons or app updates?", a: "Yes. The smart link is stable. iOS or Android updates don't affect it because the QR points to your URL, not to a store." },
        { q: "Can I use the QR on delivery bags?", a: "Yes. Print it on the bag, the order ticket or the packaging – every customer can install no matter the phone." },
        { q: "Does it support multiple cities or countries?", a: "Yes. Use one smart link per city to compare install volume and direct each region to the right App Store and Google Play listing." },
        { q: "Is the QR legible at small sizes?", a: "Yes, but for tables and receipts we recommend 2.5–4 cm minimum so the camera can scan from a distance." },
        { q: "Can I A/B test different QR placements?", a: "Yes. Create one smart link per placement (table vs receipt vs delivery bag) and compare scans separately." },
      ],
    },
    es: {
      slug: "apps-restaurantes",
      label: "Restaurantes",
      title: "Enlace de descarga para apps de restaurantes",
      metaTitle: "Enlace de descarga para apps de restaurantes – un QR para App Store y Play Store",
      metaDescription: "Un smart link y QR para la app de tu restaurante. Envía a cada cliente a App Store o Play Store sin clics extra.",
      h1: "Un smart link para la app de fidelización de tu restaurante",
      eyebrow: "Apps de restaurantes",
      intro: "Los clientes no quieren elegir tienda mientras esperan la cuenta. Imprime un QR en la carta, en la mesa o en el ticket y manda a cada comensal a App Store, Play Store o tu web de pedidos.",
      painPoints: [
        "Dos QR en la carta quedan feos y los clientes no clican ninguno.",
        "El camarero tiene que explicar qué tienda abrir y se rompe el momento.",
        "No sabes qué mesa o local trae más descargas de fidelización.",
        "Los tickets con dos iconos quedan baratos y ensucian el diseño.",
        "Los pedidos online vs app de fidelización confunden al cliente primerizo.",
        "Las bolsas de delivery pierden la conversión por culpa de dos iconos de tienda.",
      ],
      benefits: [
        { title: "Un QR en cada mesa", text: "Un solo QR. Olvídate de reimprimir cuando iOS o Android actualiza el icono." },
        { title: "Mide descargas por local", text: "Smart link por sucursal: compara qué local trae más instalaciones de la app." },
        { title: "Fidelización sin fricción", text: "Del ticket a la app de fidelización en un toque. Menos explicación, más repeticiones." },
        { title: "Fallback a pedidos online", text: "Clientes sin tu app aterrizan automáticamente en tu web de pedidos." },
        { title: "Campañas de catering y delivery", text: "Reparte un QR con cada pedido a domicilio y crece sin imprimir dos iconos." },
        { title: "Camareros dejan de explicar", text: "Un QR en la mesa elimina para siempre el '¿qué tienda abro?'." },
      ],
      metrics: [
        { value: "1 QR", label: "Por mesa o ticket" },
        { value: "+1 link", label: "Por local para estadísticas" },
        { value: "0", label: "Clientes confusos en la cuenta" },
      ],
      beforeAfter: {
        before: {
          title: "Sin smart link",
          rows: [
            "Dos QR en la mesa quedan feos y se ignoran",
            "Camareros explican qué tienda abrir en cada mesa",
            "Sin saber qué local trae más descargas",
            "Tickets cargados con dos iconos de tienda",
          ],
        },
        after: {
          title: "Con Link My App",
          rows: [
            "Un QR por mesa que funciona en cualquier móvil",
            "Clientes instalan en un toque sin preguntar",
            "Tracking por local en un único panel",
            "Tickets con un único CTA limpio",
          ],
        },
      },
      realExamples: [
        { title: "Cadena de restaurantes italianos", text: "Imprime un QR en cada carta y mide descargas por local para saber qué restaurante tiene mejor pickup de fidelización." },
        { title: "Cafetería de especialidad", text: "Usa un QR en la mesa para que cada cliente se una a la app de fidelización desde cualquier móvil." },
        { title: "Franquicia de hamburguesas", text: "Envía un QR con cada bolsa de delivery para que los clientes instalen la app del próximo pedido." },
        { title: "Bar de tapas", text: "Imprime un QR en cada ticket para conversión propina-instalación sin fricción." },
      ],
      tutorial: [
        { title: "Pega tus tres URLs", text: "App Store, Play Store y tu web de pedidos como fallback para clientes sin la app." },
        { title: "Imprime un QR por local", text: "Genera un smart link por cada sucursal para comparar estadísticas de instalación por restaurante." },
        { title: "Coloca los QR en mesas y tickets", text: "Tamaño estándar 4×4 cm o más grande. Añade un CTA corto tipo 'Escanea para unirte a la app de fidelización'." },
        { title: "Forma a los camareros en el nuevo flujo", text: "Un solo mensaje: 'Escanea el QR, gana puntos'. Sin explicaciones de iOS vs Android." },
      ],
      faqs: [
        { q: "¿Puedo usar un QR distinto por local?", a: "Sí. Creas un smart link gratis por local para saber qué restaurante genera más instalaciones." },
        { q: "¿Funciona con pedidos online?", a: "Sí. El smart link puede ir a tu web de pedidos para usuarios de ordenador o clientes sin tu app." },
        { q: "¿Puede mi TPV imprimir el QR?", a: "Cualquier TPV moderno puede imprimir una imagen QR estática. Genera el QR desde el panel y súbelo al TPV." },
        { q: "¿Funciona el QR si cambio iconos o actualizo la app?", a: "Sí. El smart link es estable. Las actualizaciones de iOS o Android no le afectan porque el QR apunta a tu URL, no a una tienda." },
        { q: "¿Puedo usarlo en bolsas de delivery?", a: "Sí. Imprímelo en la bolsa, el ticket del pedido o el packaging – cualquier cliente puede instalar." },
        { q: "¿Soporta varias ciudades o países?", a: "Sí. Usa un smart link por ciudad para comparar volumen de instalaciones y dirigir cada región a la ficha correcta de App Store y Play Store." },
        { q: "¿Se ve bien el QR en tamaños pequeños?", a: "Sí, pero para mesas y tickets recomendamos mínimo 2.5–4 cm para que la cámara escanee a distancia." },
        { q: "¿Puedo hacer A/B test entre ubicaciones del QR?", a: "Sí. Crea un smart link por ubicación (mesa vs ticket vs bolsa) y compara los escaneos por separado." },
      ],
    },
    fr: {
      slug: "apps-restauration",
      label: "Restauration",
      title: "Lien de téléchargement pour apps de restaurants",
      metaTitle: "Lien de téléchargement pour apps de restaurants – un QR pour App Store et Google Play",
      metaDescription: "Un smart link et QR pour l'app de ton restaurant. Envoie chaque client vers App Store ou Google Play sans clics inutiles.",
      h1: "Un smart link pour l'app de fidélité de ton restaurant",
      eyebrow: "Apps restauration",
      intro: "Les clients ne veulent pas choisir une boutique en attendant l'addition. Imprime un QR sur le menu, la table ou le ticket et envoie chaque convive vers App Store, Google Play ou ta plateforme web de commandes.",
      painPoints: [
        "Deux QR sur le menu sont moches et les clients n'en cliquent aucun.",
        "Le serveur doit expliquer quelle boutique ouvrir et le moment est cassé.",
        "Tu ne sais pas quelle table ou quel établissement génère le plus de téléchargements.",
        "Les tickets avec deux icônes paraissent cheap et alourdissent le design.",
        "Commandes online vs app de fidélité embrouille le client primo.",
        "Les sacs de livraison ratent la conversion à cause de deux icônes de boutique.",
      ],
      benefits: [
        { title: "Un QR sur chaque table", text: "Un seul QR. Plus de réimpressions quand iOS ou Android met à jour l'icône." },
        { title: "Mesure les téléchargements par établissement", text: "Smart link par succursale : compare quel restaurant amène le plus d'installations." },
        { title: "Fidélisation sans friction", text: "Du ticket à l'app de fidélité en un tap. Moins d'explications, plus de retours." },
        { title: "Fallback vers commandes online", text: "Les clients sans ton app atterrissent automatiquement sur ta plateforme web de commandes." },
        { title: "Campagnes catering et delivery", text: "Distribue un QR avec chaque commande à domicile et croît sans imprimer deux icônes." },
        { title: "Serveurs n'expliquent plus", text: "Un QR sur la table élimine pour toujours le 'quelle boutique j'ouvre ?'." },
      ],
      metrics: [
        { value: "1 QR", label: "Par table ou ticket" },
        { value: "+1 lien", label: "Par établissement pour les stats" },
        { value: "0", label: "Clients confus à l'addition" },
      ],
      beforeAfter: {
        before: {
          title: "Sans smart link",
          rows: [
            "Deux QR sur la table sont moches et ignorés",
            "Serveurs expliquent quelle boutique ouvrir à chaque table",
            "Aucune idée de quel établissement amène le plus de téléchargements",
            "Tickets chargés de deux icônes de boutique",
          ],
        },
        after: {
          title: "Avec Link My App",
          rows: [
            "Un QR par table qui marche sur n'importe quel mobile",
            "Clients installent en un tap sans demander",
            "Tracking par établissement sur un seul panel",
            "Tickets avec un seul CTA propre",
          ],
        },
      },
      realExamples: [
        { title: "Chaîne de restaurants italiens", text: "Imprime un QR sur chaque menu et mesure les téléchargements par établissement pour voir quel resto a le meilleur pickup de fidélité." },
        { title: "Café de spécialité", text: "Utilise un QR sur la table pour que chaque client rejoigne l'app de fidélité depuis n'importe quel mobile." },
        { title: "Franchise burgers", text: "Envoie un QR avec chaque sac delivery pour que les clients installent l'app de prochaine commande." },
        { title: "Bar à tapas", text: "Imprime un QR sur chaque ticket pour une conversion pourboire-installation sans friction." },
      ],
      tutorial: [
        { title: "Colle tes trois URLs", text: "App Store, Google Play et ton site de commandes comme fallback pour clients sans l'app." },
        { title: "Imprime un QR par établissement", text: "Génère un smart link pour chaque lieu pour comparer les stats d'installation par restaurant." },
        { title: "Place les QR sur tables et tickets", text: "Taille standard 4×4 cm ou plus. Ajoute un CTA court genre 'Scanne pour rejoindre l'app de fidélité'." },
        { title: "Forme tes serveurs sur le nouveau flow", text: "Un seul message : 'Scanne le QR, gagne des points'. Plus d'explications iOS vs Android." },
      ],
      faqs: [
        { q: "Puis-je utiliser un QR différent par établissement ?", a: "Oui. Tu crées un smart link gratuit par lieu pour savoir quel restaurant génère le plus d'installs." },
        { q: "Compatible avec les commandes en ligne ?", a: "Oui. Le smart link peut renvoyer vers ton site de commandes pour les utilisateurs desktop ou les clients sans ton app." },
        { q: "Ma caisse peut-elle imprimer le QR ?", a: "Toute caisse moderne peut imprimer une image QR statique. Génère le QR depuis le panel et envoie-le à la caisse." },
        { q: "Le QR marche-t-il après changements d'icônes ou mises à jour ?", a: "Oui. Le smart link est stable. Les mises à jour iOS ou Android ne l'affectent pas car le QR pointe vers ton URL, pas vers une boutique." },
        { q: "Puis-je utiliser le QR sur sacs delivery ?", a: "Oui. Imprime-le sur le sac, le ticket de commande ou le packaging – tout client peut installer." },
        { q: "Compatible avec plusieurs villes ou pays ?", a: "Oui. Utilise un smart link par ville pour comparer le volume d'installations et diriger chaque région vers la bonne fiche App Store et Google Play." },
        { q: "Le QR est-il lisible en petite taille ?", a: "Oui, mais pour tables et tickets on recommande minimum 2.5–4 cm pour que la caméra scanne à distance." },
        { q: "Puis-je faire des A/B tests entre emplacements de QR ?", a: "Oui. Crée un smart link par emplacement (table vs ticket vs sac) et compare les scans séparément." },
      ],
    },
  },

  /* ============================================================
   * 4. FITNESS
   * ============================================================ */
  {
    id: "fitness",
    icon: "Dumbbell",
    accent: "from-pink-50 to-white",
    en: {
      slug: "fitness-apps",
      label: "Fitness",
      title: "App download link for fitness and gym apps",
      metaTitle: "App download link for fitness apps – one QR for gyms and trainers",
      metaDescription: "One smart link and QR for your gym, studio or personal training app. From reception to App Store or Google Play in one tap.",
      h1: "One smart link for your gym or fitness app",
      eyebrow: "Fitness & gym apps",
      intro: "Members hate fiddling with stores at the front desk. Place one QR at reception, in changing rooms, on bottles or social posts – it sends every member to App Store, Google Play or your booking site.",
      painPoints: [
        "Members give up on the app when they have to find the right store.",
        "Reception staff lose minutes explaining the difference between iOS and Android.",
        "You can't tell which gym location drives the most app downloads.",
        "Class flyers with two store icons look outdated and lower scans.",
        "Personal trainers with one bio link can't share the app on Instagram cleanly.",
        "Group challenges share two URLs and lose half the participants.",
      ],
      benefits: [
        { title: "One QR for every touchpoint", text: "Reception, lockers, water bottles, screens, Instagram bio – one link works for all." },
        { title: "Per-location tracking", text: "Use one smart link per gym and compare downloads, classes booked and retention." },
        { title: "Push members to bookings fast", text: "From printed schedule to your booking app with no decisions in between." },
        { title: "Bottles, towels and merch", text: "Print the QR on any branded merch – members install with a quick scan from anywhere." },
        { title: "Trainer bio in one link", text: "Personal trainers replace two app store URLs in their Instagram bio with one clean link." },
        { title: "Member campaigns from email", text: "One CTA in your member newsletter – no more 'iOS / Android' buttons." },
      ],
      metrics: [
        { value: "1 QR", label: "Per reception, locker, screen" },
        { value: "+1 link", label: "Per gym location for stats" },
        { value: "0 sec", label: "Lost explaining stores" },
      ],
      beforeAfter: {
        before: {
          title: "Without a smart link",
          rows: [
            "Two icons on every flyer and screen",
            "Reception explains iOS vs Android",
            "No per-location download stats",
            "Trainer bios stuffed with two store URLs",
          ],
        },
        after: {
          title: "With Link My App",
          rows: [
            "One QR everywhere, scannable from any phone",
            "Members install in seconds at reception",
            "Per-gym downloads tracked on one dashboard",
            "Clean trainer bios with one link",
          ],
        },
      },
      realExamples: [
        { title: "Boutique cycling studio", text: "Prints the QR on each bike screen so members install the booking app between classes." },
        { title: "Big gym chain", text: "Uses one smart link per location to know which gym brings more downloads – and adjusts merch deliveries accordingly." },
        { title: "Personal trainer", text: "Replaces App Store + Google Play in Instagram bio with one smart link that goes to their workout app." },
        { title: "Yoga retreat", text: "Prints the QR on water bottles and welcome packs so guests install the post-retreat app on any device." },
      ],
      tutorial: [
        { title: "Paste your URLs", text: "App Store, Google Play and your booking website for desktop visitors." },
        { title: "Print the QR for reception", text: "4×4 cm minimum at reception and locker rooms. Add the CTA 'Scan to book your class'." },
        { title: "Use it in trainer bios", text: "Replace dual store links with one smart link in Instagram and TikTok bios." },
        { title: "Track per gym", text: "Generate one smart link per location to see which gym brings more app installs." },
      ],
      faqs: [
        { q: "Can I print the QR on equipment?", a: "Yes. Just download the QR at high resolution from your dashboard and print it on stickers, posters or laser-engraved plates." },
        { q: "Can I use it on Instagram and TikTok?", a: "Yes. The smart link works as your bio link and also as the destination of TikTok ads or stories." },
        { q: "Does it work for personal trainers without an app?", a: "It works best when you have a native app. If you only have a website, the smart link can simply send everyone to your site instead." },
        { q: "Can I print the QR on towels or bottles?", a: "Yes. Use a high-contrast print so the camera can scan even on textured fabric. Bottles work great because the QR stays close to the user." },
        { q: "Does it support trainer apps with separate logins?", a: "Yes. The smart link only redirects – the in-app login flow stays the same once the user is on iOS or Android." },
        { q: "Can it open the right class booking after install?", a: "The smart link opens the store. To open the right class after install you'd need a deep link – pair Link My App with a deep-link service or in-app routing." },
        { q: "Can I change which location a QR points to?", a: "Yes. Edit the smart link from your dashboard and the same printed QR now sends to the updated destination." },
        { q: "Is it fast enough for a class queue?", a: "Yes. The redirect adds milliseconds. Members scan and land on the right store before the next class starts." },
      ],
    },
    es: {
      slug: "apps-fitness",
      label: "Fitness",
      title: "Enlace de descarga para apps de fitness y gimnasios",
      metaTitle: "Enlace de descarga para apps de fitness – un QR para gimnasios y entrenadores",
      metaDescription: "Un smart link y QR para tu app de gimnasio, estudio o entrenamiento personal. De recepción a App Store o Play Store en un toque.",
      h1: "Un smart link para la app de tu gimnasio o de fitness",
      eyebrow: "Apps de fitness y gimnasios",
      intro: "A los socios les molesta pelearse con las tiendas en recepción. Coloca un QR en recepción, vestuarios, botellas o redes y envía a cada socio a App Store, Play Store o tu web de reservas.",
      painPoints: [
        "Los socios abandonan la descarga cuando tienen que buscar la tienda correcta.",
        "El equipo de recepción pierde minutos explicando iOS frente a Android.",
        "No sabes qué sucursal del gimnasio trae más descargas.",
        "Los flyers de clases con dos iconos parecen antiguos y bajan los escaneos.",
        "Los entrenadores con un único link en bio no pueden compartir la app limpiamente.",
        "Los retos de grupo reparten dos URLs y pierden la mitad de los participantes.",
      ],
      benefits: [
        { title: "Un QR para cada punto de contacto", text: "Recepción, taquillas, botellas, pantallas, bio de Instagram: un enlace para todo." },
        { title: "Seguimiento por sucursal", text: "Un smart link por gimnasio y compara descargas, clases reservadas y retención." },
        { title: "Empuja a los socios a reservar", text: "Del horario impreso a tu app de reservas sin decisiones intermedias." },
        { title: "Botellas, toallas y merchandising", text: "Imprime el QR en cualquier merch de marca – los socios instalan con un escaneo rápido." },
        { title: "Bio de entrenador en un link", text: "Los entrenadores personales sustituyen dos URLs de tienda en su bio de Instagram por un único enlace." },
        { title: "Campañas a socios por email", text: "Un único CTA en tu newsletter de socios – sin botones 'iOS / Android'." },
      ],
      metrics: [
        { value: "1 QR", label: "Por recepción, taquilla, pantalla" },
        { value: "+1 link", label: "Por gimnasio para estadísticas" },
        { value: "0 seg", label: "Perdidos explicando tiendas" },
      ],
      beforeAfter: {
        before: {
          title: "Sin smart link",
          rows: [
            "Dos iconos en cada flyer y pantalla",
            "Recepción explica iOS vs Android",
            "Sin estadísticas de descargas por local",
            "Bios de entrenador llenas de dos URLs",
          ],
        },
        after: {
          title: "Con Link My App",
          rows: [
            "Un QR en todos lados, escaneable desde cualquier móvil",
            "Socios instalan en segundos en recepción",
            "Descargas por gimnasio en un único panel",
            "Bios de entrenador limpias con un solo link",
          ],
        },
      },
      realExamples: [
        { title: "Estudio boutique de ciclismo", text: "Imprime el QR en cada bici para que los socios instalen la app de reservas entre clases." },
        { title: "Cadena grande de gimnasios", text: "Usa un smart link por sucursal para saber qué gimnasio trae más descargas – y ajusta entregas de merch." },
        { title: "Entrenador personal", text: "Sustituye App Store + Play Store en su bio de Instagram por un smart link que va a su app de entrenamientos." },
        { title: "Retiro de yoga", text: "Imprime el QR en botellas y packs de bienvenida para que los huéspedes instalen la app post-retiro." },
      ],
      tutorial: [
        { title: "Pega tus URLs", text: "App Store, Play Store y tu web de reservas para visitantes de ordenador." },
        { title: "Imprime el QR para recepción", text: "Mínimo 4×4 cm en recepción y vestuarios. Añade el CTA 'Escanea para reservar tu clase'." },
        { title: "Úsalo en bios de entrenadores", text: "Sustituye los dos links de tienda por un único smart link en bios de Instagram y TikTok." },
        { title: "Mide por gimnasio", text: "Genera un smart link por local para ver qué gimnasio trae más instalaciones." },
      ],
      faqs: [
        { q: "¿Puedo imprimir el QR en máquinas?", a: "Sí. Descarga el QR en alta resolución desde el panel e imprímelo en pegatinas, carteles o placas grabadas a láser." },
        { q: "¿Funciona en Instagram y TikTok?", a: "Sí. El smart link funciona como link de bio y como destino de anuncios o stories en TikTok." },
        { q: "¿Funciona para entrenadores personales sin app?", a: "Funciona mejor con una app nativa. Si solo tienes web, el smart link puede redirigir directamente a tu sitio." },
        { q: "¿Puedo imprimir el QR en toallas o botellas?", a: "Sí. Usa una impresión con buen contraste para que la cámara escanee incluso en tela texturizada. Las botellas funcionan genial porque el QR queda cerca del usuario." },
        { q: "¿Soporta apps de entrenador con login separado?", a: "Sí. El smart link solo redirige – el flow de login dentro de la app sigue igual una vez el usuario está en iOS o Android." },
        { q: "¿Puede abrir la clase correcta tras instalar?", a: "El smart link abre la tienda. Para abrir una clase concreta tras instalar necesitas un deep link – combina Link My App con un servicio de deep-link o routing in-app." },
        { q: "¿Puedo cambiar el local al que apunta un QR?", a: "Sí. Edita el smart link desde el panel y el mismo QR impreso ahora apunta al nuevo destino." },
        { q: "¿Es lo bastante rápido para la fila de una clase?", a: "Sí. La redirección añade milisegundos. Los socios escanean y aterrizan en la tienda correcta antes de que empiece la siguiente clase." },
      ],
    },
    fr: {
      slug: "apps-fitness",
      label: "Fitness",
      title: "Lien de téléchargement pour apps fitness et salles de sport",
      metaTitle: "Lien de téléchargement pour apps fitness – un QR pour salles et coachs",
      metaDescription: "Un smart link et QR pour ton app de salle, studio ou coaching. De la réception à App Store ou Google Play en un tap.",
      h1: "Un smart link pour l'app de ta salle de sport",
      eyebrow: "Apps fitness et salles de sport",
      intro: "Les adhérents détestent se battre avec les boutiques à la réception. Place un QR à la réception, aux vestiaires, sur les gourdes ou les réseaux et envoie chaque membre vers App Store, Google Play ou ton site de réservation.",
      painPoints: [
        "Les adhérents abandonnent le téléchargement quand ils doivent chercher la bonne boutique.",
        "L'équipe perd des minutes à expliquer iOS contre Android.",
        "Tu ne sais pas quel établissement génère le plus de téléchargements.",
        "Les flyers de cours avec deux icônes paraissent vieillots et baissent les scans.",
        "Les coachs avec un seul lien dans la bio ne peuvent pas partager l'app proprement.",
        "Les défis de groupe partagent deux URLs et perdent la moitié des participants.",
      ],
      benefits: [
        { title: "Un QR pour chaque point de contact", text: "Réception, casiers, gourdes, écrans, bio Instagram : un lien pour tout." },
        { title: "Suivi par établissement", text: "Un smart link par salle et compare téléchargements, cours réservés et rétention." },
        { title: "Pousse les adhérents à réserver", text: "Du planning imprimé à ton app de réservation sans décision intermédiaire." },
        { title: "Gourdes, serviettes et merch", text: "Imprime le QR sur tout merch de marque – les adhérents installent avec un scan rapide." },
        { title: "Bio de coach en un lien", text: "Les coachs personnels remplacent deux URLs de boutique dans leur bio Instagram par un seul lien propre." },
        { title: "Campagnes adhérents par email", text: "Un seul CTA dans ta newsletter d'adhérents – plus de boutons 'iOS / Android'." },
      ],
      metrics: [
        { value: "1 QR", label: "Par réception, casier, écran" },
        { value: "+1 lien", label: "Par salle pour les stats" },
        { value: "0 sec", label: "Perdues à expliquer les boutiques" },
      ],
      beforeAfter: {
        before: {
          title: "Sans smart link",
          rows: [
            "Deux icônes sur chaque flyer et écran",
            "Réception explique iOS vs Android",
            "Pas de stats de téléchargements par lieu",
            "Bios de coach bourrées de deux URLs",
          ],
        },
        after: {
          title: "Avec Link My App",
          rows: [
            "Un QR partout, scannable depuis n'importe quel mobile",
            "Adhérents installent en secondes à la réception",
            "Téléchargements par salle sur un seul panel",
            "Bios de coach propres avec un seul lien",
          ],
        },
      },
      realExamples: [
        { title: "Studio boutique de cycling", text: "Imprime le QR sur chaque vélo pour que les adhérents installent l'app de réservation entre les cours." },
        { title: "Grosse chaîne de salles", text: "Utilise un smart link par établissement pour savoir quelle salle amène le plus de téléchargements – et ajuste les livraisons de merch." },
        { title: "Coach personnel", text: "Remplace App Store + Google Play dans sa bio Instagram par un smart link qui va à son app d'entraînement." },
        { title: "Retraite yoga", text: "Imprime le QR sur gourdes et packs de bienvenue pour que les hôtes installent l'app post-retraite." },
      ],
      tutorial: [
        { title: "Colle tes URLs", text: "App Store, Google Play et ton site de réservation pour les visiteurs desktop." },
        { title: "Imprime le QR pour la réception", text: "Minimum 4×4 cm en réception et vestiaires. Ajoute le CTA 'Scanne pour réserver ton cours'." },
        { title: "Utilise-le dans les bios de coachs", text: "Remplace les deux liens de boutique par un seul smart link dans les bios Instagram et TikTok." },
        { title: "Mesure par salle", text: "Génère un smart link par lieu pour voir quelle salle amène le plus d'installations." },
      ],
      faqs: [
        { q: "Puis-je imprimer le QR sur les machines ?", a: "Oui. Télécharge le QR en haute résolution depuis le panel et imprime-le sur stickers, affiches ou plaques gravées laser." },
        { q: "Compatible Instagram et TikTok ?", a: "Oui. Le smart link fonctionne comme lien de bio et destination de pubs ou stories TikTok." },
        { q: "Compatible coachs sans app ?", a: "Ça marche mieux avec une app native. Si tu n'as qu'un site, le smart link peut rediriger directement vers ce site." },
        { q: "Puis-je imprimer le QR sur serviettes ou gourdes ?", a: "Oui. Utilise une impression bien contrastée pour que la caméra scanne même sur tissu texturé. Les gourdes marchent super bien car le QR reste près de l'utilisateur." },
        { q: "Compatible apps de coach avec login séparé ?", a: "Oui. Le smart link redirige uniquement – le flow de login dans l'app reste identique une fois sur iOS ou Android." },
        { q: "Peut-il ouvrir le bon cours après installation ?", a: "Le smart link ouvre la boutique. Pour ouvrir un cours précis après installation tu as besoin d'un deep link – combine Link My App avec un service de deep-link ou routing in-app." },
        { q: "Puis-je changer l'établissement vers lequel pointe un QR ?", a: "Oui. Édite le smart link depuis le panel et le même QR imprimé pointe maintenant vers la nouvelle destination." },
        { q: "Assez rapide pour la file d'un cours ?", a: "Oui. La redirection ajoute des millisecondes. Les adhérents scannent et atterrissent sur la bonne boutique avant le prochain cours." },
      ],
    },
  },

  /* ============================================================
   * 5. CREATORS
   * ============================================================ */
  {
    id: "creators",
    icon: "Sparkles",
    accent: "from-purple-50 to-white",
    en: {
      slug: "creator-apps",
      label: "Creators",
      title: "App download link for creators and influencers",
      metaTitle: "App download link for creators – one bio link for your app",
      metaDescription: "Stop sharing two app store links in your bio. Use one smart link for App Store, Google Play and the web on Instagram, TikTok, YouTube and emails.",
      h1: "One bio link to install your app from anywhere",
      eyebrow: "Creator & influencer apps",
      intro: "If you launched your own app, your followers shouldn't have to dig for the right store. One smart link in your Instagram bio, TikTok and YouTube description sends them straight to App Store, Google Play or your site.",
      painPoints: [
        "Instagram bio only allows one link – you can't fit App Store + Google Play.",
        "Followers tap your link from desktop and get lost on an empty page.",
        "You can't tell how many app installs came from TikTok vs YouTube.",
        "Linktree-style pages add friction between the bio and your app.",
        "Merch drops with two store URLs lose conversions between taps.",
        "Story stickers can hold only one link – two store URLs don't fit.",
      ],
      benefits: [
        { title: "One smart bio link", text: "App Store, Google Play and your website behind one short URL that fits any platform." },
        { title: "Built-in QR for IRL meetups", text: "Print the QR on swag, posters or backdrops for events and meet-and-greets." },
        { title: "Track downloads per platform", text: "See how many followers from each channel actually installed your app." },
        { title: "Custom short URL", text: "Pro gives you link-my.app/yourname so your bio reads cleaner than any third-party shortener." },
        { title: "Faster than Linktree", text: "Skip the in-between page – your smart link sends followers straight to the right store." },
        { title: "Track collabs", text: "Give each collab partner a smart link and compare installs from each one." },
      ],
      metrics: [
        { value: "1 link", label: "In bio, story stickers and DMs" },
        { value: "+1 QR", label: "For meetups and merch" },
        { value: "0 pages", label: "Between bio and install" },
      ],
      beforeAfter: {
        before: {
          title: "Without a smart link",
          rows: [
            "Linktree page with two store buttons",
            "Followers from desktop lost on the link",
            "No platform-level attribution",
            "Merch with two icons reduces conversion",
          ],
        },
        after: {
          title: "With Link My App",
          rows: [
            "One bio link straight to the right store",
            "Desktop visitors land on the website automatically",
            "Installs from Instagram, TikTok and YouTube tracked separately",
            "Merch with one QR that works on any phone",
          ],
        },
      },
      realExamples: [
        { title: "Fitness influencer", text: "Replaces App Store + Google Play in Instagram bio with one smart link – followers install in one tap." },
        { title: "Cooking creator", text: "Puts a QR on cookbook covers and merch packaging so readers install the recipes app instantly." },
        { title: "Travel YouTuber", text: "Uses one smart link in every video description so subscribers install their trip-planning app regardless of phone." },
        { title: "Gaming streamer", text: "Adds the smart link to Twitch panels and Discord so viewers install the companion app from any device." },
      ],
      tutorial: [
        { title: "Paste your three URLs", text: "App Store, Google Play and your website (or landing page) as fallback." },
        { title: "Use it in every bio", text: "Instagram, TikTok, YouTube, X, Threads – paste the smart link as the one URL in your bio." },
        { title: "Print the QR for meetups", text: "Use the QR on backdrops, swag, posters and meet-and-greet signs." },
        { title: "Track per channel", text: "See in your dashboard how many installs come from Instagram vs TikTok vs YouTube." },
      ],
      faqs: [
        { q: "Does the link work on Instagram and TikTok bios?", a: "Yes. The smart link is a normal URL that works in every bio, story sticker, YouTube description or email." },
        { q: "Can I rebrand the link with my name?", a: "You get a custom short URL like link-my.app/yourname for free – great for memorable bios." },
        { q: "Will my followers see Link My App branding?", a: "The redirect is invisible to your followers – they land directly on your store or website." },
        { q: "Does it work for YouTube descriptions?", a: "Yes. YouTube and YouTube Shorts descriptions are just URLs – the smart link works as any other URL." },
        { q: "Can I A/B test bios on different platforms?", a: "Yes. Create one smart link per platform and compare clicks side by side." },
        { q: "Does it support Threads and Bluesky?", a: "Yes. Any social platform that accepts a URL in the bio supports a smart link." },
        { q: "Can I update the destination without changing my bio?", a: "Yes. The bio link stays the same – you change the destination from your dashboard at any time." },
        { q: "Can I track installs from a specific story?", a: "Create a different smart link for that story or campaign. The dashboard shows clicks separately so you know which content drives installs." },
      ],
    },
    es: {
      slug: "apps-creadores",
      label: "Creadores",
      title: "Enlace de descarga para apps de creadores e influencers",
      metaTitle: "Enlace de descarga para creadores – un link de bio para tu app",
      metaDescription: "Deja de poner dos enlaces de descarga en tu bio. Un smart link para App Store, Play Store y la web en Instagram, TikTok, YouTube y email.",
      h1: "Un link en tu bio para instalar tu app desde donde sea",
      eyebrow: "Apps de creadores e influencers",
      intro: "Si has lanzado tu app, tus seguidores no deberían perderse buscando la tienda correcta. Un smart link en tu bio de Instagram, TikTok y descripción de YouTube los manda directos a App Store, Play Store o tu web.",
      painPoints: [
        "Instagram bio solo permite un enlace – no cabe App Store + Play Store.",
        "Los seguidores entran desde ordenador y se quedan en una página vacía.",
        "No sabes cuántas instalaciones vienen de TikTok frente a YouTube.",
        "Las páginas tipo Linktree añaden fricción entre la bio y la app.",
        "Los drops de merch con dos URLs de tienda pierden conversión entre toques.",
        "Los stickers de story solo aceptan un link – no caben dos tiendas.",
      ],
      benefits: [
        { title: "Un link de bio inteligente", text: "App Store, Play Store y tu web detrás de una URL corta que entra en cualquier plataforma." },
        { title: "QR para meetups y eventos", text: "Imprime el QR en merch, carteles o backdrops para eventos y meet-and-greets." },
        { title: "Mide descargas por plataforma", text: "Mira cuántos seguidores de cada canal se han instalado tu app." },
        { title: "URL corta personalizada", text: "Link My App te da gratis link-my.app/tunombre para que tu bio se lea más limpia que cualquier acortador." },
        { title: "Más rápido que Linktree", text: "Sin página intermedia – tu smart link manda a los seguidores directos a la tienda correcta." },
        { title: "Mide colaboraciones", text: "Da a cada colaborador un smart link y compara instalaciones desde cada uno." },
      ],
      metrics: [
        { value: "1 link", label: "En bio, stickers de story y DMs" },
        { value: "+1 QR", label: "Para meetups y merch" },
        { value: "0 páginas", label: "Entre la bio y la instalación" },
      ],
      beforeAfter: {
        before: {
          title: "Sin smart link",
          rows: [
            "Página Linktree con dos botones de tienda",
            "Seguidores de ordenador se pierden en el link",
            "Sin atribución por plataforma",
            "Merch con dos iconos reduce conversión",
          ],
        },
        after: {
          title: "Con Link My App",
          rows: [
            "Un link de bio directo a la tienda correcta",
            "Visitantes de ordenador aterrizan en la web automáticamente",
            "Instalaciones de Instagram, TikTok y YouTube medidas por separado",
            "Merch con un QR que funciona en cualquier móvil",
          ],
        },
      },
      realExamples: [
        { title: "Influencer de fitness", text: "Sustituye App Store + Play Store en su bio de Instagram por un único smart link – los seguidores instalan en un toque." },
        { title: "Creador de cocina", text: "Pone un QR en portadas de recetario y packaging de merch para que los lectores instalen la app de recetas al instante." },
        { title: "YouTuber de viajes", text: "Usa un smart link en cada descripción de vídeo para que los suscriptores instalen su app de planificación de viajes." },
        { title: "Streamer de gaming", text: "Añade el smart link a paneles de Twitch y Discord para que los viewers instalen la app complementaria desde cualquier dispositivo." },
      ],
      tutorial: [
        { title: "Pega tus tres URLs", text: "App Store, Play Store y tu web (o landing) como alternativa." },
        { title: "Úsalo en cada bio", text: "Instagram, TikTok, YouTube, X, Threads – pega el smart link como única URL en tu bio." },
        { title: "Imprime el QR para meetups", text: "Usa el QR en backdrops, merch, carteles y señales de meet-and-greet." },
        { title: "Mide por canal", text: "Mira en el panel cuántas instalaciones vienen de Instagram vs TikTok vs YouTube." },
      ],
      faqs: [
        { q: "¿Funciona en la bio de Instagram y TikTok?", a: "Sí. El smart link es una URL normal que funciona en cualquier bio, sticker de story, descripción de YouTube o email." },
        { q: "¿Puedo personalizar el link con mi nombre?", a: "Tienes una URL corta personalizada gratis tipo link-my.app/tunombre – perfecta para bios memorables." },
        { q: "¿Mis seguidores ven la marca Link My App?", a: "La redirección es invisible para tus seguidores – aterrizan directamente en tu tienda o web." },
        { q: "¿Funciona en descripciones de YouTube?", a: "Sí. YouTube y YouTube Shorts admiten URLs normales – el smart link funciona como cualquier otra." },
        { q: "¿Puedo hacer A/B test entre plataformas?", a: "Sí. Crea un smart link por plataforma y compara clics uno al lado del otro." },
        { q: "¿Soporta Threads y Bluesky?", a: "Sí. Cualquier red social que acepte una URL en la bio soporta un smart link." },
        { q: "¿Puedo cambiar el destino sin tocar mi bio?", a: "Sí. El link de bio sigue igual – cambias el destino desde tu panel cuando quieras." },
        { q: "¿Puedo medir instalaciones desde una story concreta?", a: "Crea un smart link distinto para esa story o campaña. El panel muestra los clics por separado para que sepas qué contenido genera instalaciones." },
      ],
    },
    fr: {
      slug: "apps-createurs",
      label: "Créateurs",
      title: "Lien de téléchargement pour apps de créateurs et influenceurs",
      metaTitle: "Lien de téléchargement pour créateurs – un lien de bio pour ton app",
      metaDescription: "Arrête de mettre deux liens dans ta bio. Un smart link pour App Store, Google Play et le web sur Instagram, TikTok, YouTube et email.",
      h1: "Un lien dans ta bio pour installer ton app de partout",
      eyebrow: "Apps de créateurs et influenceurs",
      intro: "Si tu as lancé ton app, tes followers ne devraient pas chercher la bonne boutique. Un smart link dans ta bio Instagram, TikTok et description YouTube les envoie directement vers App Store, Google Play ou ton site.",
      painPoints: [
        "La bio Instagram n'autorise qu'un lien – impossible de mettre App Store + Google Play.",
        "Les followers ouvrent depuis desktop et tombent sur une page vide.",
        "Tu ne sais pas combien d'installs viennent de TikTok face à YouTube.",
        "Les pages type Linktree ajoutent de la friction entre la bio et l'app.",
        "Les drops de merch avec deux URLs perdent de la conversion.",
        "Les stickers de story n'acceptent qu'un lien – impossible d'y mettre deux boutiques.",
      ],
      benefits: [
        { title: "Un lien de bio intelligent", text: "App Store, Google Play et ton site derrière une URL courte qui passe partout." },
        { title: "QR pour les meetups", text: "Imprime le QR sur merch, affiches ou backdrops pour meet-and-greets et events." },
        { title: "Mesure les téléchargements par plateforme", text: "Vois combien de followers de chaque canal ont installé ton app." },
        { title: "URL courte personnalisée", text: "Link My App te donne gratuitement link-my.app/tonnom pour que ta bio soit plus propre qu'avec n'importe quel shortener tiers." },
        { title: "Plus rapide que Linktree", text: "Pas de page intermédiaire – ton smart link envoie les followers direct vers la bonne boutique." },
        { title: "Mesure les collabs", text: "Donne à chaque partenaire collab un smart link et compare les installs de chacun." },
      ],
      metrics: [
        { value: "1 lien", label: "En bio, stickers et DMs" },
        { value: "+1 QR", label: "Pour meetups et merch" },
        { value: "0 pages", label: "Entre la bio et l'install" },
      ],
      beforeAfter: {
        before: {
          title: "Sans smart link",
          rows: [
            "Page Linktree avec deux boutons de boutique",
            "Followers desktop perdus sur le lien",
            "Pas d'attribution par plateforme",
            "Merch avec deux icônes réduit la conversion",
          ],
        },
        after: {
          title: "Avec Link My App",
          rows: [
            "Un lien de bio direct vers la bonne boutique",
            "Visiteurs desktop atterrissent sur le site automatiquement",
            "Installs Instagram, TikTok et YouTube mesurés séparément",
            "Merch avec un QR qui marche sur tout mobile",
          ],
        },
      },
      realExamples: [
        { title: "Influenceur fitness", text: "Remplace App Store + Google Play dans sa bio Instagram par un seul smart link – les followers installent en un tap." },
        { title: "Créateur cuisine", text: "Met un QR sur les couvertures de livres de recettes et le packaging merch pour que les lecteurs installent l'app de recettes instantanément." },
        { title: "YouTuber voyage", text: "Utilise un smart link dans chaque description vidéo pour que les abonnés installent son app de planification." },
        { title: "Streamer gaming", text: "Ajoute le smart link aux panels Twitch et Discord pour que les viewers installent l'app compagnon depuis n'importe quel appareil." },
      ],
      tutorial: [
        { title: "Colle tes trois URLs", text: "App Store, Google Play et ton site (ou landing) comme alternative." },
        { title: "Utilise-le dans chaque bio", text: "Instagram, TikTok, YouTube, X, Threads – colle le smart link comme unique URL dans ta bio." },
        { title: "Imprime le QR pour les meetups", text: "Utilise le QR sur backdrops, merch, affiches et signalétique meet-and-greet." },
        { title: "Mesure par canal", text: "Vois sur le panel combien d'installs viennent d'Instagram vs TikTok vs YouTube." },
      ],
      faqs: [
        { q: "Compatible Instagram et TikTok ?", a: "Oui. Le smart link est une URL normale qui marche dans toute bio, sticker, description YouTube ou email." },
        { q: "Puis-je personnaliser le lien avec mon nom ?", a: "Tu obtiens gratuitement une URL courte personnalisée comme link-my.app/tonnom – parfait pour des bios mémorables." },
        { q: "Mes followers voient-ils la marque Link My App ?", a: "La redirection est invisible pour tes followers – ils atterrissent directement sur ta boutique ou ton site." },
        { q: "Compatible descriptions YouTube ?", a: "Oui. YouTube et YouTube Shorts acceptent les URLs normales – le smart link marche comme n'importe quelle URL." },
        { q: "Puis-je faire de l'A/B test entre plateformes ?", a: "Oui. Crée un smart link par plateforme et compare les clics côte à côte." },
        { q: "Compatible Threads et Bluesky ?", a: "Oui. Tout réseau social qui accepte une URL dans la bio supporte un smart link." },
        { q: "Puis-je changer la destination sans toucher ma bio ?", a: "Oui. Le lien de bio reste le même – tu changes la destination depuis ton panel quand tu veux." },
        { q: "Puis-je mesurer les installs depuis une story précise ?", a: "Crée un smart link différent pour cette story ou campagne. Le panel montre les clics séparément pour que tu saches quel contenu génère des installs." },
      ],
    },
  },

  /* ============================================================
   * 6. AGENCIES (renders with AgenciesPage – richer template)
   * ============================================================ */
  {
    id: "agencies",
    icon: "Building2",
    accent: "from-slate-50 to-white",
    en: {
      slug: "for-agencies",
      label: "Agencies",
      title: "App download links for marketing and dev agencies",
      metaTitle: "App download links for agencies – manage smart links for every client",
      metaDescription: "Manage one smart link per client, campaign or location. Give your agency clean attribution, QR codes for physical campaigns and a single dashboard.",
      h1: "Smart links for every client your agency runs",
      eyebrow: "For agencies and partners",
      intro: "Stop sending two URLs to every client. Your agency creates one smart link per client, channel or campaign, owns the analytics and delivers a single QR that works on iPhone, Android and desktop.",
      faqs: [
        { q: "Can I white-label the smart link?", a: "You can use a free custom short URL for each client (link-my.app/clientname) and keep redirects clean." },
        { q: "Can multiple users in my agency manage links?", a: "Yes. Your team can create and edit links across clients from the same dashboard for free." },
        { q: "Do you have a partner program?", a: "Get in touch – we work with agencies that manage several apps and need a clean multi-client workflow." },
        { q: "Can I move a client's smart link to their own dashboard?", a: "Yes. Smart links are transferable so when the handover happens, the same URL stays the same." },
        { q: "Does it integrate with our reporting tools?", a: "We expose clicks per device, source and campaign. You can export them or pair with Looker Studio / Sheets for client reports." },
        { q: "Can I use it for retainer-based clients?", a: "Yes. A single smart link per client lets you bill for the link, the QR, the attribution and the maintenance." },
        { q: "Is it ok for white-glove launches?", a: "Yes. Set up one smart link per market or region during the launch and decommission them when the project closes." },
        { q: "Can I manage 50+ clients in one place?", a: "Yes. The dashboard is designed for multiple clients and campaigns. Each smart link has its own stats." },
      ],
    },
    es: {
      slug: "para-agencias",
      label: "Agencias",
      title: "Enlaces de descarga para agencias de marketing y desarrollo",
      metaTitle: "Enlaces de descarga para agencias – smart links para cada cliente",
      metaDescription: "Gestiona un smart link por cliente, campaña o ubicación. Atribución limpia para tu agencia, QR para campañas físicas y un solo panel.",
      h1: "Smart links para cada cliente de tu agencia",
      eyebrow: "Para agencias y partners",
      intro: "Deja de mandar dos URLs a cada cliente. Tu agencia crea un smart link por cliente, canal o campaña, controla la analítica y entrega un único QR que funciona en iPhone, Android y ordenador.",
      faqs: [
        { q: "¿Puedo hacer white-label del smart link?", a: "Usas gratis una URL corta personalizada por cliente (link-my.app/cliente) y mantienes redirecciones limpias." },
        { q: "¿Pueden varios usuarios de mi agencia gestionar links?", a: "Sí. Tu equipo crea y edita links de varios clientes desde el mismo panel gratis." },
        { q: "¿Tenéis programa de partners?", a: "Escríbenos – trabajamos con agencias que gestionan varias apps y necesitan un flujo multi-cliente limpio." },
        { q: "¿Puedo traspasar el smart link al cliente?", a: "Sí. Los smart links son transferibles, así que cuando hagas el handover, la misma URL sigue igual." },
        { q: "¿Se integra con nuestras herramientas de reporting?", a: "Exponemos clics por dispositivo, fuente y campaña. Puedes exportarlos o combinarlos con Looker Studio / Sheets para informes de cliente." },
        { q: "¿Funciona para clientes con retainer?", a: "Sí. Un smart link por cliente te permite facturar el link, el QR, la atribución y el mantenimiento." },
        { q: "¿Sirve para lanzamientos white-glove?", a: "Sí. Configura un smart link por mercado o región durante el lanzamiento y dales de baja cuando el proyecto cierre." },
        { q: "¿Puedo gestionar 50+ clientes en un sitio?", a: "Sí. El panel está pensado para múltiples clientes y campañas. Cada smart link tiene su estadística propia." },
      ],
    },
    fr: {
      slug: "pour-agences",
      label: "Agences",
      title: "Liens de téléchargement pour agences marketing et dev",
      metaTitle: "Liens de téléchargement pour agences – smart links pour chaque client",
      metaDescription: "Gère un smart link par client, campagne ou lieu. Attribution claire pour ton agence, QR pour campagnes physiques et un seul tableau de bord.",
      h1: "Smart links pour chaque client de ton agence",
      eyebrow: "Pour agences et partenaires",
      intro: "Arrête d'envoyer deux URLs à chaque client. Ton agence crée un smart link par client, canal ou campagne, contrôle l'analytics et livre un seul QR qui fonctionne sur iPhone, Android et desktop.",
      faqs: [
        { q: "Puis-je faire du white-label du smart link ?", a: "Tu utilises gratuitement une URL courte personnalisée par client (link-my.app/client) et gardes des redirections propres." },
        { q: "Plusieurs utilisateurs de mon agence peuvent-ils gérer les liens ?", a: "Oui. Ton équipe crée et édite gratuitement les liens de plusieurs clients depuis le même tableau de bord." },
        { q: "Avez-vous un programme partenaire ?", a: "Contacte-nous – on travaille avec des agences qui gèrent plusieurs apps et on peut proposer des tarifs par volume." },
        { q: "Puis-je transférer le smart link au client ?", a: "Oui. Les smart links sont transférables, donc au handover la même URL reste identique." },
        { q: "Compatible avec nos outils de reporting ?", a: "On expose les clics par appareil, source et campagne. Tu peux les exporter ou les combiner avec Looker Studio / Sheets pour les rapports client." },
        { q: "Compatible clients en retainer ?", a: "Oui. Un smart link par client permet de facturer le lien, le QR, l'attribution et la maintenance." },
        { q: "Compatible lancements white-glove ?", a: "Oui. Configure un smart link par marché ou région pendant le lancement et désactive-les à la fin du projet." },
        { q: "Puis-je gérer 50+ clients au même endroit ?", a: "Oui. Le panel est conçu pour multiples clients et campagnes. Chaque smart link a sa propre stat." },
      ],
    },
  },
];

niches.forEach((niche) => {
  if (japaneseUseCases[niche.id]) {
    niche.ja = japaneseUseCases[niche.id];
  }
  if (germanUseCases[niche.id]) {
    niche.de = germanUseCases[niche.id];
  }
  if (portugueseUseCases[niche.id]) {
    niche.pt = portugueseUseCases[niche.id];
  }
  if (italianUseCases[niche.id]) {
    niche.it = italianUseCases[niche.id];
  }
  if (koreanUseCases[niche.id]) {
    niche.ko = koreanUseCases[niche.id];
  }
  if (dutchUseCases[niche.id]) {
    niche.nl = dutchUseCases[niche.id];
  }
  if (arabicUseCases[niche.id]) {
    niche.ar = arabicUseCases[niche.id];
  }
  if (hindiUseCases[niche.id]) {
    niche.hi = hindiUseCases[niche.id];
  }
});

export const visibleNicheIds = ["ads", "ecommerce", "saas", "restaurants", "fitness", "agencies"];
export const visibleNiches = visibleNicheIds
  .map((id) => niches.find((niche) => niche.id === id))
  .filter(Boolean);

export function getNicheById(id) {
  return niches.find((n) => n.id === id);
}

export function getNicheBySlug(slug, language = "en") {
  return niches.find((n) => (n[language]?.slug || n.en.slug) === slug);
}
