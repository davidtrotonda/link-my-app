import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Globe2,
  Map,
  Play,
  QrCode,
  Route,
  Smartphone,
  Users,
  WalletCards,
} from "lucide-react";
import { SEO, LegalNavbar } from "./App.jsx";
import {
  FinalFooter as LandingFinalFooter,
  animationStyles,
} from "./LandingVisuals.jsx";
import { localizePath, normalizeLanguage } from "./lib/i18nRoutes.js";

const siteUrl = "https://link-my.app";
const tourixyUrl = "https://tourixy.com";

export const contentByLanguage = {
  es: {
    title: "Caso de éxito Tourixy: un solo enlace para impulsar las descargas",
    description:
      "Cómo Tourixy utiliza Link My App para compartir su app en redes, web y códigos QR y dirigir cada visita a la tienda correcta.",
    eyebrow: "Caso de éxito · Tourixy",
    h1: "Un gran producto de viajes, con un camino mucho más corto hasta su descarga.",
    intro:
      "Tourixy reúne en una sola app todo lo necesario para descubrir, planificar y recordar un viaje. Link My App le permite presentarla con un único enlace en cada canal y llevar a cada persona directamente a la tienda que corresponde.",
    visit: "Visitar Tourixy",
    create: "Crear mi smart link",
    productTag: "El producto",
    productTitle: "Viajar empieza mucho antes de hacer la maleta",
    productIntro:
      "Tourixy convierte la preparación del viaje en una experiencia visual y ordenada. Puedes buscar un país, recorrer sus ciudades y ver cada lugar en vídeos breves explicados por una persona. En unos 30 segundos entiendes qué ofrece y si encaja contigo.",
    features: [
      {
        title: "Descubrir en vídeo",
        text: "Lugares, actividades, restaurantes, hoteles y opciones cercanas explicados de forma rápida y visual.",
      },
      {
        title: "Organizar una ruta",
        text: "Guarda lo que te gusta, crea tu itinerario y visualiza el recorrido en un mapa para aprovechar mejor el tiempo.",
      },
      {
        title: "Preparar todo el viaje",
        text: "Estimación de gastos y comparación de vuelos, hoteles, eSIM, coche de alquiler y seguro de viaje.",
      },
      {
        title: "Viajar acompañado",
        text: "Itinerario compartido, gastos, listas, documentos y billetes disponibles para todos los compañeros de viaje.",
      },
    ],
    challengeTag: "El reto",
    challengeTitle: "Una app completa necesita una promoción sencilla",
    challengeText:
      "El reto no era explicar más funciones, sino evitar fricción entre el interés y la descarga. En redes sociales solo hay espacio para un enlace; en una web, un cartel o un QR, pedir al usuario que elija entre App Store y Google Play añade un paso justo cuando ya ha decidido probar la app.",
    solutionTag: "La solución",
    solutionTitle: "Un único enlace en todos los puntos de contacto",
    solutionText:
      "Tourixy puede compartir la misma URL en su web, biografías y publicaciones sociales, colaboraciones y materiales impresos. Link My App reconoce el dispositivo y abre App Store en iPhone, Google Play en Android y una alternativa web cuando corresponde.",
    channels: [
      "El mismo enlace en perfiles y publicaciones sociales",
      "Un QR reutilizable para soportes físicos y colaboraciones",
      "Una URL clara desde la web y otras campañas digitales",
      "Destino automático para iPhone, Android u ordenador",
    ],
    whyTag: "Por qué funciona",
    whyTitle: "Menos decisiones pequeñas, más personas llegando a la app",
    whyIntro:
      "El crecimiento de Tourixy se apoya primero en un producto útil, fácil de entender y con un diseño moderno. El smart link no sustituye ese valor: elimina obstáculos para que la promoción en redes y otros canales lo convierta con más facilidad en visitas a la tienda.",
    outcomes: [
      {
        title: "Una campaña más coherente",
        text: "El mensaje siempre termina en la misma llamada a la acción, sin duplicar enlaces ni explicaciones.",
      },
      {
        title: "Una descarga con menos fricción",
        text: "Cada usuario aterriza en su tienda directamente, sin tener que identificar ni buscar la versión correcta.",
      },
      {
        title: "Más libertad para distribuir",
        text: "La URL funciona igual en redes, web, QR y materiales compartidos con colaboradores.",
      },
      {
        title: "Una base más fácil de optimizar",
        text: "La distribución queda centralizada y puede analizarse por canal para entender qué acciones generan más interés.",
      },
    ],
    summary:
      "Tourixy hace fácil una tarea compleja: decidir dónde viajar y convertir ideas en un itinerario real. Link My App aplica la misma lógica a su distribución: una sola entrada y el destino correcto para cada persona.",
    finalTitle: "¿Tu app también vive entre dos tiendas y muchos canales?",
    finalText:
      "Crea un enlace único para compartirla en redes, web y QR. Cada visita llegará al destino adecuado automáticamente.",
    finalCta: "Crear un enlace gratis",
  },
  en: {
    title: "Tourixy success story: one link to support app downloads",
    description:
      "How Tourixy uses Link My App across social media, its website and QR codes to send every visitor to the right store.",
    eyebrow: "Success story · Tourixy",
    h1: "A strong travel product, with a much shorter path to download.",
    intro:
      "Tourixy brings discovery, planning and travel memories into one app. Link My App lets the team promote it with one link in every channel and sends each person to the right destination.",
    visit: "Visit Tourixy",
    create: "Create my smart link",
    productTag: "The product",
    productTitle: "Travel starts long before packing",
    productIntro:
      "Tourixy makes trip planning visual and organised. Travellers can explore countries and cities through short, human-led videos and understand in around 30 seconds whether a place is right for them.",
    features: [
      { title: "Discover by video", text: "Places, activities, restaurants, hotels and nearby options explained quickly and visually." },
      { title: "Build a route", text: "Save favourites, create an itinerary and see the route on a map to make better use of time." },
      { title: "Prepare the whole trip", text: "Forecast costs and compare flights, hotels, eSIMs, car hire and travel insurance." },
      { title: "Travel together", text: "Share itineraries, expenses, lists, documents and tickets with every travel companion." },
    ],
    challengeTag: "The challenge",
    challengeTitle: "A complete app still needs simple promotion",
    challengeText:
      "The challenge was not adding more feature explanations, but removing friction between interest and download. Social profiles have room for one link, while asking people to choose between two stores adds a step after they have already decided to try the app.",
    solutionTag: "The solution",
    solutionTitle: "One link at every touchpoint",
    solutionText:
      "Tourixy can share the same URL on its website, social profiles, collaborations and printed material. Link My App detects the device and opens App Store on iPhone, Google Play on Android, or a web alternative when appropriate.",
    channels: [
      "The same link in social profiles and posts",
      "A reusable QR code for print and collaborations",
      "One clear URL from the website and digital campaigns",
      "Automatic destination for iPhone, Android or desktop",
    ],
    whyTag: "Why it works",
    whyTitle: "Fewer small decisions, more people reaching the app",
    whyIntro:
      "Tourixy's growth starts with a useful, easy-to-understand product and a modern design. The smart link does not replace that value; it removes obstacles so social and campaign interest can become store visits more easily.",
    outcomes: [
      { title: "A consistent campaign", text: "Every message ends with the same call to action, without duplicated links or instructions." },
      { title: "A smoother download", text: "Each visitor lands directly in the correct store without searching for the right version." },
      { title: "More distribution freedom", text: "The URL works across social, web, QR and partner materials." },
      { title: "Easier optimisation", text: "Distribution is centralised and can be reviewed by channel to understand what generates interest." },
    ],
    summary:
      "Tourixy simplifies a complex job: choosing where to travel and turning ideas into a real itinerary. Link My App does the same for distribution: one entry point and the right destination for each person.",
    finalTitle: "Does your app also live between two stores and many channels?",
    finalText:
      "Create one link for social, web and QR. Every visitor will reach the right destination automatically.",
    finalCta: "Create a free link",
  },
  fr: {
    title: "Cas client Tourixy : un seul lien pour faciliter les téléchargements",
    description:
      "Comment Tourixy utilise Link My App sur les réseaux, son site et ses QR codes pour diriger chaque visite vers le bon store.",
    eyebrow: "Cas client · Tourixy",
    h1: "Une excellente app de voyage, avec un chemin beaucoup plus court vers le téléchargement.",
    intro:
      "Tourixy réunit découverte, organisation et souvenirs de voyage dans une seule app. Link My App permet de la promouvoir avec un lien unique sur chaque canal.",
    visit: "Visiter Tourixy",
    create: "Créer mon smart link",
    productTag: "Le produit",
    productTitle: "Le voyage commence bien avant de faire sa valise",
    productIntro:
      "Tourixy rend la préparation visuelle et organisée. On explore pays et villes avec de courtes vidéos et l'on comprend en une trentaine de secondes si un lieu nous correspond.",
    features: [
      { title: "Découvrir en vidéo", text: "Lieux, activités, restaurants, hôtels et options à proximité présentés rapidement." },
      { title: "Organiser un parcours", text: "Enregistrer ses favoris, créer un itinéraire et visualiser le trajet sur une carte." },
      { title: "Préparer tout le voyage", text: "Prévoir les dépenses et comparer vols, hôtels, eSIM, voiture et assurance." },
      { title: "Voyager ensemble", text: "Partager itinéraire, dépenses, listes, documents et billets avec ses compagnons." },
    ],
    challengeTag: "Le défi",
    challengeTitle: "Une app complète a besoin d'une promotion simple",
    challengeText:
      "Le défi consistait à supprimer les frictions entre l'intérêt et le téléchargement. Les réseaux offrent une place pour un seul lien, tandis que choisir entre deux stores ajoute une étape inutile.",
    solutionTag: "La solution",
    solutionTitle: "Un lien unique sur tous les points de contact",
    solutionText:
      "Tourixy partage la même URL sur son site, ses réseaux, ses collaborations et ses supports imprimés. Link My App détecte l'appareil et ouvre automatiquement la bonne destination.",
    channels: [
      "Le même lien dans les profils et publications",
      "Un QR réutilisable sur les supports physiques",
      "Une URL claire depuis le site et les campagnes",
      "Une destination automatique sur iPhone, Android ou ordinateur",
    ],
    whyTag: "Pourquoi ça marche",
    whyTitle: "Moins de petites décisions, plus de personnes sur l'app",
    whyIntro:
      "La croissance de Tourixy repose d'abord sur un produit utile, clair et moderne. Le smart link ne remplace pas cette valeur : il retire les obstacles entre une campagne et la visite du store.",
    outcomes: [
      { title: "Une campagne cohérente", text: "Chaque message se termine par le même appel à l'action, sans multiplier les liens." },
      { title: "Un téléchargement plus fluide", text: "Chaque personne arrive directement sur le bon store." },
      { title: "Une distribution plus libre", text: "L'URL fonctionne sur les réseaux, le web, les QR et les supports partenaires." },
      { title: "Une optimisation plus simple", text: "La distribution est centralisée et peut être analysée par canal." },
    ],
    summary:
      "Tourixy simplifie une tâche complexe : choisir où partir et transformer ses idées en itinéraire. Link My App applique la même logique à sa distribution.",
    finalTitle: "Votre app vit elle aussi entre deux stores et plusieurs canaux ?",
    finalText:
      "Créez un lien unique pour les réseaux, le web et les QR. Chaque visite arrivera automatiquement au bon endroit.",
    finalCta: "Créer un lien gratuit",
  },
  ja: {
    title: "Tourixy導入事例：1つのリンクでアプリのダウンロードを促進",
    description: "TourixyがSNS、Webサイト、QRコードでLink My Appを活用し、訪問者を端末に合ったストアへ案内する方法をご紹介します。",
    eyebrow: "導入事例 · Tourixy",
    h1: "優れた旅行アプリを、もっと短い導線でダウンロードへ。",
    intro: "Tourixyは、旅先探しから計画、思い出の記録までを1つのアプリにまとめています。Link My Appなら、あらゆるチャネルで同じリンクを共有し、一人ひとりを適切なダウンロード先へ案内できます。",
    visit: "Tourixyを見る",
    create: "スマートリンクを作成",
    productTag: "プロダクト",
    productTitle: "旅は荷造りよりずっと前から始まる",
    productIntro: "Tourixyなら、旅行の準備を視覚的に分かりやすく整理できます。国や都市を検索し、現地の人が解説する短い動画を見ることで、約30秒でその場所が自分に合うか判断できます。",
    features: [
      { title: "動画で発見", text: "観光地、アクティビティ、レストラン、ホテル、周辺スポットを短い動画で分かりやすく紹介します。" },
      { title: "ルートを計画", text: "気になる場所を保存し、旅程を作成。地図上のルートで時間を効率よく使えます。" },
      { title: "旅行全体を準備", text: "費用を予測し、航空券、ホテル、eSIM、レンタカー、旅行保険を比較できます。" },
      { title: "仲間と一緒に", text: "旅程、支出、リスト、書類、チケットを旅行仲間全員で共有できます。" },
    ],
    challengeTag: "課題",
    challengeTitle: "多機能なアプリほど、紹介方法はシンプルに",
    challengeText: "必要だったのは機能説明を増やすことではなく、興味からダウンロードまでの摩擦を減らすことでした。SNSのプロフィールに置けるリンクは限られ、App StoreとGoogle Playを選ばせるだけでも余計な一手間になります。",
    solutionTag: "解決策",
    solutionTitle: "すべての接点で使える1つのリンク",
    solutionText: "TourixyはWebサイト、SNS、提携先、印刷物で同じURLを共有できます。Link My Appが端末を判別し、iPhoneならApp Store、AndroidならGoogle Play、必要に応じてWeb版を開きます。",
    channels: ["SNSプロフィールや投稿に同じリンク", "印刷物や提携施策で再利用できるQRコード", "Webサイトやデジタル施策でも明確な1つのURL", "iPhone、Android、PCを自動で適切な場所へ"],
    whyTag: "成果につながる理由",
    whyTitle: "小さな迷いを減らし、より多くの人をアプリへ",
    whyIntro: "Tourixyの成長を支えるのは、便利で分かりやすく、モダンに設計されたプロダクトです。スマートリンクはその価値に代わるものではなく、SNSやキャンペーンで生まれた関心をストア訪問へつなげやすくします。",
    outcomes: [
      { title: "一貫したキャンペーン", text: "リンクや説明を増やさず、すべての発信を同じ行動喚起で締めくくれます。" },
      { title: "スムーズなダウンロード", text: "訪問者は正しいバージョンを探すことなく、自分に合ったストアへ直接進めます。" },
      { title: "配信先を選ばない", text: "同じURLをSNS、Web、QRコード、提携先の素材で利用できます。" },
      { title: "改善しやすい基盤", text: "配信を一元化し、チャネルごとの反応を見ながら効果を把握できます。" },
    ],
    summary: "Tourixyは、行き先を決めて旅程にするという複雑な作業を簡単にします。Link My Appも同じ発想で、1つの入口から一人ひとりを正しい目的地へ届けます。",
    finalTitle: "あなたのアプリも、2つのストアと多くのチャネルにまたがっていませんか？",
    finalText: "SNS、Web、QRコードで使える1つのリンクを作成しましょう。訪問者は自動的に最適な場所へ進みます。",
    finalCta: "無料でリンクを作成",
  },
  de: {
    title: "Tourixy-Erfolgsgeschichte: ein Link für mehr App-Downloads",
    description: "Wie Tourixy Link My App in sozialen Netzwerken, auf der Website und in QR-Codes nutzt, um jeden Besucher zum richtigen Store zu führen.",
    eyebrow: "Erfolgsgeschichte · Tourixy",
    h1: "Ein starkes Reiseprodukt – mit einem deutlich kürzeren Weg zum Download.",
    intro: "Tourixy vereint Entdecken, Planen und Reiseerinnerungen in einer App. Mit Link My App kann das Team überall denselben Link teilen und jede Person direkt zum passenden Ziel führen.",
    visit: "Tourixy besuchen",
    create: "Smart Link erstellen",
    productTag: "Das Produkt",
    productTitle: "Reisen beginnt lange vor dem Kofferpacken",
    productIntro: "Tourixy macht die Reiseplanung visuell und übersichtlich. Reisende entdecken Länder und Städte in kurzen, persönlich erklärten Videos und erkennen in etwa 30 Sekunden, ob ein Ort zu ihnen passt.",
    features: [
      { title: "Per Video entdecken", text: "Orte, Aktivitäten, Restaurants, Hotels und Angebote in der Nähe werden schnell und anschaulich erklärt." },
      { title: "Eine Route planen", text: "Favoriten speichern, einen Reiseplan erstellen und die Route auf einer Karte optimal organisieren." },
      { title: "Die ganze Reise vorbereiten", text: "Kosten einschätzen und Flüge, Hotels, eSIMs, Mietwagen und Reiseversicherungen vergleichen." },
      { title: "Gemeinsam reisen", text: "Reisepläne, Ausgaben, Listen, Dokumente und Tickets mit allen Mitreisenden teilen." },
    ],
    challengeTag: "Die Herausforderung",
    challengeTitle: "Eine umfassende App braucht eine einfache Vermarktung",
    challengeText: "Es ging nicht darum, noch mehr Funktionen zu erklären, sondern Reibung zwischen Interesse und Download abzubauen. In sozialen Profilen ist meist nur Platz für einen Link; die Wahl zwischen App Store und Google Play fügt einen unnötigen Schritt hinzu.",
    solutionTag: "Die Lösung",
    solutionTitle: "Ein Link an jedem Kontaktpunkt",
    solutionText: "Tourixy teilt dieselbe URL auf der Website, in sozialen Netzwerken, Kooperationen und Printmaterialien. Link My App erkennt das Gerät und öffnet auf dem iPhone den App Store, auf Android Google Play oder bei Bedarf eine Web-Alternative.",
    channels: ["Derselbe Link in Profilen und Social Posts", "Ein wiederverwendbarer QR-Code für Print und Kooperationen", "Eine klare URL für Website und Digitalkampagnen", "Automatisches Ziel für iPhone, Android oder Desktop"],
    whyTag: "Warum es funktioniert",
    whyTitle: "Weniger kleine Entscheidungen, mehr Menschen in der App",
    whyIntro: "Tourixys Wachstum beginnt mit einem nützlichen, leicht verständlichen Produkt und modernem Design. Der Smart Link ersetzt diesen Wert nicht – er beseitigt Hindernisse, damit Interesse aus Social Media und Kampagnen leichter zu Store-Besuchen wird.",
    outcomes: [
      { title: "Eine einheitliche Kampagne", text: "Jede Botschaft endet mit derselben Handlungsaufforderung, ohne doppelte Links oder Erklärungen." },
      { title: "Ein reibungsloser Download", text: "Jede Person landet direkt im richtigen Store, ohne nach der passenden Version zu suchen." },
      { title: "Mehr Freiheit bei der Verteilung", text: "Die URL funktioniert in sozialen Netzwerken, im Web, als QR-Code und in Partnermaterialien." },
      { title: "Einfacher optimieren", text: "Die Verteilung ist zentral gebündelt und lässt sich nach Kanälen auswerten." },
    ],
    summary: "Tourixy vereinfacht eine komplexe Aufgabe: ein Reiseziel wählen und Ideen in einen echten Reiseplan verwandeln. Link My App überträgt dieselbe Logik auf die Verteilung: ein Einstieg und das richtige Ziel für jede Person.",
    finalTitle: "Ist auch deine App auf zwei Stores und viele Kanäle verteilt?",
    finalText: "Erstelle einen einzigen Link für Social Media, Website und QR-Codes. Jeder Besuch erreicht automatisch das passende Ziel.",
    finalCta: "Kostenlosen Link erstellen",
  },
  pt: {
    title: "Caso de sucesso Tourixy: um link para impulsionar downloads",
    description: "Como a Tourixy usa o Link My App nas redes sociais, no site e em códigos QR para levar cada visitante à loja certa.",
    eyebrow: "Caso de sucesso · Tourixy",
    h1: "Um ótimo produto de viagens, com um caminho muito mais curto até ao download.",
    intro: "A Tourixy reúne descoberta, planeamento e memórias de viagem numa só app. O Link My App permite promovê-la com o mesmo link em todos os canais e levar cada pessoa ao destino certo.",
    visit: "Visitar a Tourixy",
    create: "Criar o meu smart link",
    productTag: "O produto",
    productTitle: "Viajar começa muito antes de fazer a mala",
    productIntro: "A Tourixy torna o planeamento visual e organizado. É possível explorar países e cidades através de vídeos curtos apresentados por pessoas e perceber, em cerca de 30 segundos, se um lugar combina consigo.",
    features: [
      { title: "Descobrir em vídeo", text: "Lugares, atividades, restaurantes, hotéis e opções próximas explicados de forma rápida e visual." },
      { title: "Organizar uma rota", text: "Guardar favoritos, criar um itinerário e ver o percurso no mapa para aproveitar melhor o tempo." },
      { title: "Preparar toda a viagem", text: "Prever custos e comparar voos, hotéis, eSIM, aluguer de carro e seguro de viagem." },
      { title: "Viajar em conjunto", text: "Partilhar itinerários, despesas, listas, documentos e bilhetes com todos os companheiros." },
    ],
    challengeTag: "O desafio",
    challengeTitle: "Uma app completa precisa de uma promoção simples",
    challengeText: "O desafio não era explicar mais funcionalidades, mas reduzir a fricção entre o interesse e o download. Nas redes sociais há espaço para um único link; pedir que a pessoa escolha entre App Store e Google Play acrescenta um passo desnecessário.",
    solutionTag: "A solução",
    solutionTitle: "Um único link em todos os pontos de contacto",
    solutionText: "A Tourixy pode partilhar o mesmo URL no site, nas redes, em colaborações e em materiais impressos. O Link My App deteta o dispositivo e abre a App Store no iPhone, o Google Play no Android ou uma alternativa web quando necessário.",
    channels: ["O mesmo link em perfis e publicações sociais", "Um QR reutilizável para materiais físicos e colaborações", "Um URL claro no site e nas campanhas digitais", "Destino automático para iPhone, Android ou computador"],
    whyTag: "Porque funciona",
    whyTitle: "Menos pequenas decisões, mais pessoas a chegar à app",
    whyIntro: "O crescimento da Tourixy começa num produto útil, fácil de compreender e com design moderno. O smart link não substitui esse valor; elimina obstáculos para transformar o interesse gerado nas redes e campanhas em visitas à loja.",
    outcomes: [
      { title: "Uma campanha consistente", text: "Todas as mensagens terminam com a mesma chamada à ação, sem duplicar links ou instruções." },
      { title: "Um download mais simples", text: "Cada visitante chega diretamente à loja correta, sem procurar a versão adequada." },
      { title: "Mais liberdade para distribuir", text: "O URL funciona nas redes, na web, em QR e nos materiais de parceiros." },
      { title: "Otimização mais fácil", text: "A distribuição fica centralizada e pode ser analisada por canal." },
    ],
    summary: "A Tourixy simplifica uma tarefa complexa: escolher onde viajar e transformar ideias num itinerário real. O Link My App faz o mesmo na distribuição: uma entrada e o destino certo para cada pessoa.",
    finalTitle: "A sua app também vive entre duas lojas e muitos canais?",
    finalText: "Crie um único link para redes sociais, web e QR. Cada visita chegará automaticamente ao destino certo.",
    finalCta: "Criar um link grátis",
  },
  it: {
    title: "Caso di successo Tourixy: un solo link per favorire i download",
    description: "Come Tourixy usa Link My App sui social, sul sito e nei codici QR per indirizzare ogni visita allo store corretto.",
    eyebrow: "Caso di successo · Tourixy",
    h1: "Un ottimo prodotto di viaggio, con un percorso molto più breve verso il download.",
    intro: "Tourixy riunisce scoperta, pianificazione e ricordi di viaggio in un'unica app. Link My App permette di promuoverla con lo stesso link in ogni canale e porta ogni persona alla destinazione corretta.",
    visit: "Visita Tourixy",
    create: "Crea il mio smart link",
    productTag: "Il prodotto",
    productTitle: "Il viaggio inizia molto prima di preparare la valigia",
    productIntro: "Tourixy rende la pianificazione visiva e ordinata. Si possono esplorare paesi e città con brevi video narrati da persone e capire in circa 30 secondi se un luogo è adatto ai propri gusti.",
    features: [
      { title: "Scoprire in video", text: "Luoghi, attività, ristoranti, hotel e opzioni vicine spiegati in modo rapido e visivo." },
      { title: "Organizzare un percorso", text: "Salvare i preferiti, creare un itinerario e vedere il tragitto sulla mappa per ottimizzare il tempo." },
      { title: "Preparare tutto il viaggio", text: "Prevedere le spese e confrontare voli, hotel, eSIM, auto a noleggio e assicurazioni." },
      { title: "Viaggiare insieme", text: "Condividere itinerari, spese, liste, documenti e biglietti con tutti i compagni di viaggio." },
    ],
    challengeTag: "La sfida",
    challengeTitle: "Un'app completa ha bisogno di una promozione semplice",
    challengeText: "La sfida non era spiegare più funzioni, ma eliminare gli ostacoli tra interesse e download. Sui social c'è spazio per un solo link e chiedere di scegliere tra App Store e Google Play aggiunge un passaggio inutile.",
    solutionTag: "La soluzione",
    solutionTitle: "Un unico link in ogni punto di contatto",
    solutionText: "Tourixy può condividere lo stesso URL sul sito, sui social, nelle collaborazioni e sui materiali stampati. Link My App riconosce il dispositivo e apre App Store su iPhone, Google Play su Android o un'alternativa web quando serve.",
    channels: ["Lo stesso link nei profili e nei post social", "Un QR riutilizzabile per stampa e collaborazioni", "Un URL chiaro dal sito e dalle campagne digitali", "Destinazione automatica per iPhone, Android o computer"],
    whyTag: "Perché funziona",
    whyTitle: "Meno piccole decisioni, più persone che raggiungono l'app",
    whyIntro: "La crescita di Tourixy parte da un prodotto utile, facile da capire e dal design moderno. Lo smart link non sostituisce questo valore: rimuove gli ostacoli affinché l'interesse generato da social e campagne diventi più facilmente una visita allo store.",
    outcomes: [
      { title: "Una campagna coerente", text: "Ogni messaggio termina con la stessa call to action, senza duplicare link o spiegazioni." },
      { title: "Un download più fluido", text: "Ogni visitatore arriva direttamente nello store corretto senza cercare la versione giusta." },
      { title: "Più libertà di distribuzione", text: "L'URL funziona su social, web, QR e materiali dei partner." },
      { title: "Ottimizzazione più semplice", text: "La distribuzione è centralizzata e può essere analizzata per canale." },
    ],
    summary: "Tourixy semplifica un compito complesso: scegliere dove viaggiare e trasformare le idee in un itinerario reale. Link My App applica la stessa logica alla distribuzione: un solo ingresso e la destinazione giusta per ogni persona.",
    finalTitle: "Anche la tua app vive tra due store e molti canali?",
    finalText: "Crea un unico link per social, web e QR. Ogni visita raggiungerà automaticamente la destinazione corretta.",
    finalCta: "Crea un link gratis",
  },
  ko: {
    title: "Tourixy 성공 사례: 하나의 링크로 앱 다운로드 향상",
    description: "Tourixy가 소셜 미디어, 웹사이트, QR 코드에서 Link My App을 활용해 사용자를 알맞은 스토어로 보내는 방법을 소개합니다.",
    eyebrow: "성공 사례 · Tourixy",
    h1: "훌륭한 여행 앱, 다운로드까지의 길은 더 짧게.",
    intro: "Tourixy는 여행지 탐색, 일정 계획, 추억 기록을 하나의 앱에 담았습니다. Link My App을 사용하면 모든 채널에서 하나의 링크로 앱을 알리고 각 사용자를 알맞은 목적지로 안내할 수 있습니다.",
    visit: "Tourixy 방문하기",
    create: "스마트 링크 만들기",
    productTag: "제품",
    productTitle: "여행은 짐을 싸기 훨씬 전부터 시작됩니다",
    productIntro: "Tourixy는 여행 준비를 시각적이고 체계적으로 만들어 줍니다. 국가와 도시를 탐색하고 사람이 직접 설명하는 짧은 영상을 통해 약 30초 만에 그 장소가 나에게 맞는지 알 수 있습니다.",
    features: [
      { title: "영상으로 발견하기", text: "명소, 액티비티, 식당, 호텔, 주변 장소를 빠르고 시각적으로 설명합니다." },
      { title: "동선 계획하기", text: "마음에 드는 장소를 저장하고 일정을 만든 뒤 지도에서 효율적인 경로를 확인합니다." },
      { title: "여행 전체 준비하기", text: "예상 경비를 계산하고 항공편, 호텔, eSIM, 렌터카, 여행자 보험을 비교합니다." },
      { title: "함께 여행하기", text: "일정, 지출, 목록, 문서, 티켓을 모든 여행 동행자와 공유합니다." },
    ],
    challengeTag: "과제",
    challengeTitle: "기능이 많은 앱일수록 홍보는 간단해야 합니다",
    challengeText: "더 많은 기능을 설명하는 것이 아니라 관심에서 다운로드까지의 불편을 줄이는 것이 과제였습니다. 소셜 프로필에는 보통 링크 하나만 넣을 수 있고, App Store와 Google Play 중 하나를 고르게 하는 것만으로도 불필요한 단계가 생깁니다.",
    solutionTag: "해결책",
    solutionTitle: "모든 접점에서 사용하는 하나의 링크",
    solutionText: "Tourixy는 웹사이트, 소셜 미디어, 협업 콘텐츠, 인쇄물에 같은 URL을 공유할 수 있습니다. Link My App이 기기를 감지해 iPhone은 App Store, Android는 Google Play, 필요한 경우 웹 대안을 엽니다.",
    channels: ["소셜 프로필과 게시물에 같은 링크", "인쇄물과 협업에 재사용 가능한 QR 코드", "웹사이트와 디지털 캠페인에 명확한 하나의 URL", "iPhone, Android, PC에 맞는 목적지 자동 연결"],
    whyTag: "효과가 있는 이유",
    whyTitle: "작은 선택은 줄이고, 앱에 도달하는 사람은 늘리고",
    whyIntro: "Tourixy의 성장은 유용하고 이해하기 쉬우며 현대적인 디자인의 제품에서 시작됩니다. 스마트 링크는 그 가치를 대신하지 않고, 소셜 미디어와 캠페인에서 생긴 관심이 스토어 방문으로 이어지는 장벽을 줄입니다.",
    outcomes: [
      { title: "일관된 캠페인", text: "링크나 설명을 반복하지 않고 모든 메시지를 같은 행동 유도로 마무리할 수 있습니다." },
      { title: "더 매끄러운 다운로드", text: "각 사용자는 올바른 버전을 찾을 필요 없이 해당 스토어에 바로 도착합니다." },
      { title: "자유로운 배포", text: "하나의 URL이 소셜, 웹, QR, 파트너 자료에서 모두 작동합니다." },
      { title: "쉬운 최적화", text: "배포를 한곳에서 관리하고 채널별 반응을 살펴볼 수 있습니다." },
    ],
    summary: "Tourixy는 여행지를 고르고 아이디어를 실제 일정으로 만드는 복잡한 일을 쉽게 합니다. Link My App도 배포에 같은 방식을 적용해 하나의 입구에서 각 사용자에게 맞는 목적지로 연결합니다.",
    finalTitle: "앱이 두 개의 스토어와 여러 채널에 흩어져 있나요?",
    finalText: "소셜, 웹, QR에서 쓸 하나의 링크를 만드세요. 모든 방문자가 자동으로 알맞은 목적지에 도착합니다.",
    finalCta: "무료 링크 만들기",
  },
  nl: {
    title: "Tourixy-succesverhaal: één link voor meer appdownloads",
    description: "Hoe Tourixy Link My App gebruikt op sociale media, de website en in QR-codes om iedere bezoeker naar de juiste store te sturen.",
    eyebrow: "Succesverhaal · Tourixy",
    h1: "Een sterk reisproduct, met een veel kortere route naar de download.",
    intro: "Tourixy brengt ontdekken, plannen en reisherinneringen samen in één app. Met Link My App promoot het team de app via één link op elk kanaal en komt iedereen direct op de juiste bestemming.",
    visit: "Bezoek Tourixy",
    create: "Maak mijn smart link",
    productTag: "Het product",
    productTitle: "Reizen begint lang voordat de koffer wordt ingepakt",
    productIntro: "Tourixy maakt reisplanning visueel en overzichtelijk. Reizigers verkennen landen en steden via korte video's met persoonlijke uitleg en weten in ongeveer 30 seconden of een plek bij hen past.",
    features: [
      { title: "Ontdekken met video", text: "Plaatsen, activiteiten, restaurants, hotels en opties in de buurt worden snel en visueel uitgelegd." },
      { title: "Een route plannen", text: "Favorieten bewaren, een reisplan maken en de route op de kaart bekijken om tijd optimaal te benutten." },
      { title: "De hele reis voorbereiden", text: "Kosten voorspellen en vluchten, hotels, eSIMs, huurauto's en reisverzekeringen vergelijken." },
      { title: "Samen reizen", text: "Reisplannen, uitgaven, lijsten, documenten en tickets delen met alle reisgenoten." },
    ],
    challengeTag: "De uitdaging",
    challengeTitle: "Een complete app heeft eenvoudige promotie nodig",
    challengeText: "De uitdaging was niet om meer functies uit te leggen, maar om drempels tussen interesse en download weg te nemen. Op sociale profielen is ruimte voor één link; kiezen tussen App Store en Google Play voegt een onnodige stap toe.",
    solutionTag: "De oplossing",
    solutionTitle: "Eén link op elk contactpunt",
    solutionText: "Tourixy deelt dezelfde URL op de website, sociale media, in samenwerkingen en gedrukt materiaal. Link My App herkent het apparaat en opent de App Store op iPhone, Google Play op Android of een webalternatief wanneer dat beter past.",
    channels: ["Dezelfde link in sociale profielen en posts", "Een herbruikbare QR-code voor print en samenwerkingen", "Eén duidelijke URL vanaf de website en digitale campagnes", "Automatische bestemming voor iPhone, Android of desktop"],
    whyTag: "Waarom het werkt",
    whyTitle: "Minder kleine keuzes, meer mensen die de app bereiken",
    whyIntro: "De groei van Tourixy begint bij een nuttig, begrijpelijk product met een modern ontwerp. De smart link vervangt die waarde niet; hij neemt obstakels weg zodat interesse uit social en campagnes makkelijker leidt tot een bezoek aan de store.",
    outcomes: [
      { title: "Een consistente campagne", text: "Elke boodschap eindigt met dezelfde oproep, zonder dubbele links of uitleg." },
      { title: "Een soepelere download", text: "Iedere bezoeker komt direct in de juiste store zonder naar de goede versie te zoeken." },
      { title: "Meer vrijheid om te delen", text: "De URL werkt op social, web, in QR-codes en in materiaal van partners." },
      { title: "Makkelijker optimaliseren", text: "De verspreiding is centraal geregeld en kan per kanaal worden beoordeeld." },
    ],
    summary: "Tourixy maakt een ingewikkelde taak eenvoudig: kiezen waar je naartoe wilt en ideeën omzetten in een echt reisplan. Link My App doet hetzelfde voor de verspreiding: één ingang en de juiste bestemming voor iedereen.",
    finalTitle: "Staat jouw app ook tussen twee stores en veel kanalen?",
    finalText: "Maak één link voor social, web en QR. Iedere bezoeker bereikt automatisch de juiste bestemming.",
    finalCta: "Maak een gratis link",
  },
  ar: {
    title: "قصة نجاح Tourixy: رابط واحد لدعم تنزيلات التطبيق",
    description: "كيف تستخدم Tourixy خدمة Link My App في الشبكات الاجتماعية والموقع ورموز QR لتوجيه كل زائر إلى المتجر المناسب.",
    eyebrow: "قصة نجاح · Tourixy",
    h1: "منتج سفر قوي، وطريق أقصر بكثير إلى التنزيل.",
    intro: "تجمع Tourixy اكتشاف الوجهات والتخطيط للرحلة وحفظ الذكريات في تطبيق واحد. وتتيح Link My App الترويج له برابط واحد في كل قناة وتوجيه كل شخص إلى الوجهة المناسبة.",
    visit: "زيارة Tourixy",
    create: "إنشاء رابط ذكي",
    productTag: "المنتج",
    productTitle: "تبدأ الرحلة قبل إعداد الحقيبة بوقت طويل",
    productIntro: "تجعل Tourixy التخطيط للرحلة بصرياً ومنظماً. يمكن للمسافر استكشاف البلدان والمدن عبر مقاطع قصيرة يشرحها أشخاص، ومعرفة خلال نحو 30 ثانية ما إذا كان المكان يناسبه.",
    features: [
      { title: "الاكتشاف بالفيديو", text: "شرح سريع ومرئي للأماكن والأنشطة والمطاعم والفنادق والخيارات القريبة." },
      { title: "تنظيم المسار", text: "حفظ الأماكن المفضلة وإنشاء برنامج وعرض الطريق على الخريطة لاستغلال الوقت جيداً." },
      { title: "إعداد الرحلة كاملة", text: "تقدير النفقات ومقارنة الرحلات الجوية والفنادق وeSIM وتأجير السيارات وتأمين السفر." },
      { title: "السفر مع الآخرين", text: "مشاركة البرنامج والمصاريف والقوائم والمستندات والتذاكر مع جميع رفاق السفر." },
    ],
    challengeTag: "التحدي",
    challengeTitle: "التطبيق المتكامل يحتاج إلى ترويج بسيط",
    challengeText: "لم يكن التحدي شرح مزيد من المزايا، بل إزالة الاحتكاك بين الاهتمام والتنزيل. تتسع الملفات الاجتماعية غالباً لرابط واحد فقط، كما أن مطالبة الشخص بالاختيار بين App Store وGoogle Play تضيف خطوة غير ضرورية.",
    solutionTag: "الحل",
    solutionTitle: "رابط واحد في كل نقطة تواصل",
    solutionText: "تستطيع Tourixy مشاركة الرابط نفسه على موقعها وشبكاتها الاجتماعية وفي الشراكات والمواد المطبوعة. تتعرف Link My App على الجهاز فتفتح App Store على iPhone وGoogle Play على Android أو بديلاً على الويب عند الحاجة.",
    channels: ["الرابط نفسه في الملفات والمنشورات الاجتماعية", "رمز QR قابل لإعادة الاستخدام للطباعة والشراكات", "رابط واضح من الموقع والحملات الرقمية", "وجهة تلقائية لـ iPhone أو Android أو الكمبيوتر"],
    whyTag: "لماذا ينجح",
    whyTitle: "قرارات صغيرة أقل، ووصول أكبر إلى التطبيق",
    whyIntro: "يبدأ نمو Tourixy بمنتج مفيد وسهل الفهم وبتصميم حديث. لا يحل الرابط الذكي محل هذه القيمة، بل يزيل العقبات كي يتحول الاهتمام من الشبكات والحملات إلى زيارات للمتجر بسهولة أكبر.",
    outcomes: [
      { title: "حملة متناسقة", text: "تنتهي كل رسالة بالدعوة نفسها إلى الإجراء من دون تكرار الروابط أو التعليمات." },
      { title: "تنزيل أكثر سلاسة", text: "يصل كل زائر مباشرة إلى المتجر الصحيح من دون البحث عن النسخة المناسبة." },
      { title: "حرية أكبر في التوزيع", text: "يعمل الرابط عبر الشبكات والويب ورموز QR ومواد الشركاء." },
      { title: "تحسين أسهل", text: "يتمركز التوزيع في مكان واحد ويمكن مراجعته حسب القناة." },
    ],
    summary: "تسهّل Tourixy مهمة معقدة: اختيار وجهة السفر وتحويل الأفكار إلى برنامج حقيقي. وتطبق Link My App المنطق نفسه على التوزيع: مدخل واحد والوجهة الصحيحة لكل شخص.",
    finalTitle: "هل يوجد تطبيقك أيضاً بين متجرين وقنوات كثيرة؟",
    finalText: "أنشئ رابطاً واحداً للشبكات والويب ورموز QR، وسيصل كل زائر تلقائياً إلى الوجهة المناسبة.",
    finalCta: "إنشاء رابط مجاني",
  },
  hi: {
    title: "Tourixy की सफलता: ऐप डाउनलोड बढ़ाने के लिए एक लिंक",
    description: "Tourixy सोशल मीडिया, वेबसाइट और QR कोड पर Link My App से हर विज़िटर को सही ऐप स्टोर तक कैसे पहुँचाता है।",
    eyebrow: "सफलता की कहानी · Tourixy",
    h1: "एक बेहतरीन ट्रैवल ऐप, डाउनलोड तक कहीं छोटा रास्ता।",
    intro: "Tourixy यात्रा की खोज, योजना और यादों को एक ही ऐप में लाता है। Link My App की मदद से टीम हर चैनल पर एक लिंक साझा कर सकती है और हर व्यक्ति को सही जगह पहुँचा सकती है।",
    visit: "Tourixy देखें",
    create: "अपना स्मार्ट लिंक बनाएँ",
    productTag: "प्रोडक्ट",
    productTitle: "यात्रा सामान बाँधने से बहुत पहले शुरू हो जाती है",
    productIntro: "Tourixy यात्रा की योजना को विज़ुअल और व्यवस्थित बनाता है। यात्री छोटे, लोगों द्वारा समझाए गए वीडियो से देश और शहर देख सकते हैं और लगभग 30 सेकंड में जान सकते हैं कि कोई जगह उनके लिए सही है या नहीं।",
    features: [
      { title: "वीडियो से खोजें", text: "जगहें, गतिविधियाँ, रेस्टोरेंट, होटल और आसपास के विकल्प तेज़ व विज़ुअल तरीके से समझें।" },
      { title: "रूट बनाएँ", text: "पसंदीदा जगहें सेव करें, यात्रा कार्यक्रम बनाएँ और समय बचाने के लिए मैप पर रूट देखें।" },
      { title: "पूरी यात्रा तैयार करें", text: "खर्च का अनुमान लगाएँ और फ्लाइट, होटल, eSIM, किराये की कार व ट्रैवल इंश्योरेंस की तुलना करें।" },
      { title: "साथ में यात्रा करें", text: "यात्रा कार्यक्रम, खर्च, सूचियाँ, दस्तावेज़ और टिकट सभी साथियों के साथ साझा करें।" },
    ],
    challengeTag: "चुनौती",
    challengeTitle: "एक संपूर्ण ऐप का प्रचार सरल होना चाहिए",
    challengeText: "चुनौती और फीचर समझाना नहीं, बल्कि रुचि और डाउनलोड के बीच रुकावटें हटाना था। सोशल प्रोफाइल में आम तौर पर एक लिंक की जगह होती है और App Store या Google Play चुनवाना एक अतिरिक्त कदम जोड़ देता है।",
    solutionTag: "समाधान",
    solutionTitle: "हर संपर्क बिंदु पर एक लिंक",
    solutionText: "Tourixy अपनी वेबसाइट, सोशल प्रोफाइल, साझेदारियों और प्रिंट सामग्री पर एक ही URL साझा कर सकता है। Link My App डिवाइस पहचानकर iPhone पर App Store, Android पर Google Play और जरूरत होने पर वेब विकल्प खोलता है।",
    channels: ["सोशल प्रोफाइल और पोस्ट में वही लिंक", "प्रिंट और साझेदारियों के लिए दोबारा इस्तेमाल होने वाला QR", "वेबसाइट और डिजिटल अभियानों से एक साफ URL", "iPhone, Android या कंप्यूटर के लिए अपने-आप सही मंज़िल"],
    whyTag: "यह क्यों काम करता है",
    whyTitle: "छोटे फैसले कम, ऐप तक पहुँचने वाले लोग ज़्यादा",
    whyIntro: "Tourixy की बढ़त एक उपयोगी, समझने में आसान और आधुनिक डिज़ाइन वाले प्रोडक्ट से शुरू होती है। स्मार्ट लिंक उस मूल्य की जगह नहीं लेता; वह रुकावटें हटाता है ताकि सोशल और अभियानों की रुचि आसानी से स्टोर विज़िट में बदले।",
    outcomes: [
      { title: "एक जैसा अभियान", text: "बिना लिंक या निर्देश दोहराए हर संदेश एक ही कॉल टू एक्शन पर खत्म होता है।" },
      { title: "आसान डाउनलोड", text: "हर विज़िटर सही वर्ज़न खोजे बिना सीधे अपने स्टोर पर पहुँचता है।" },
      { title: "साझा करने की अधिक आज़ादी", text: "URL सोशल, वेब, QR और पार्टनर सामग्री में समान रूप से काम करता है।" },
      { title: "आसान ऑप्टिमाइज़ेशन", text: "वितरण एक जगह रहता है और हर चैनल के अनुसार देखा जा सकता है।" },
    ],
    summary: "Tourixy एक मुश्किल काम आसान करता है: कहाँ यात्रा करनी है यह तय करना और विचारों को असली यात्रा कार्यक्रम में बदलना। Link My App वितरण में यही करता है—एक प्रवेश और हर व्यक्ति के लिए सही मंज़िल।",
    finalTitle: "क्या आपका ऐप भी दो स्टोर और कई चैनलों में बँटा है?",
    finalText: "सोशल, वेब और QR के लिए एक लिंक बनाएँ। हर विज़िटर अपने-आप सही मंज़िल पर पहुँचेगा।",
    finalCta: "मुफ़्त लिंक बनाएँ",
  },
};

const featureIcons = [Play, Map, WalletCards, Users];

export default function TourixyCaseStudy() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const content = contentByLanguage[language] || contentByLanguage.en;
  const pagePath = "/success-story/tourixy";
  const canonical = `${siteUrl}${localizePath(pagePath, language)}`;

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: content.title,
          description: content.description,
          url: canonical,
          inLanguage: language,
          about: {
            "@type": "SoftwareApplication",
            name: "Tourixy",
            applicationCategory: "TravelApplication",
            url: tourixyUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "Link My App",
            url: siteUrl,
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Link My App",
              item: `${siteUrl}${localizePath("/", language)}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: content.eyebrow,
              item: canonical,
            },
          ],
        },
      ],
    }),
    [canonical, content, language],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <SEO
        title={content.title}
        description={content.description}
        path={pagePath}
        image={`${siteUrl}/tourixy-favicon.png`}
        schema={schema}
      />
      <LegalNavbar />
      <style>{animationStyles}</style>

      <section className="relative px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute left-[12%] top-24 -z-10 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-sky-800 shadow-sm">
              <img
                src="/tourixy-favicon.png"
                alt=""
                className="h-7 w-7 rounded-full"
              />
              {content.eyebrow}
            </div>
            <h1 className="mt-6 max-w-4xl text-[clamp(42px,6vw,76px)] font-black leading-[0.94] tracking-[-0.06em]">
              {content.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-black/60 md:text-lg">
              {content.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={tourixyUrl}
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-black text-white shadow-[0_16px_36px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5"
              >
                {content.visit} <ExternalLink size={16} />
              </a>
              <Link
                to={localizePath("/login", language)}
                className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-6 py-3.5 text-sm font-black transition hover:-translate-y-0.5 hover:border-black/25"
              >
                {content.create} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="rounded-[38px] border border-black/8 bg-white p-5 shadow-[0_35px_100px_rgba(14,116,144,0.16)] md:p-7">
              <div className="flex items-center gap-3 border-b border-black/8 pb-5">
                <img
                  src="/tourixy-favicon.png"
                  alt="Tourixy"
                  className="h-14 w-14 rounded-[18px] shadow-[0_10px_24px_rgba(14,116,144,0.2)]"
                />
                <div>
                  <p className="text-lg font-black tracking-[-0.03em]">Tourixy</p>
                  <p className="text-xs font-bold text-black/45">tourixy.com</p>
                </div>
                <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
                  Smart link
                </span>
              </div>

              <div className="mt-6 rounded-[28px] bg-[#f4f9ff] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-800/55">
                  link-my.app/tourixy
                </p>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                    <Smartphone size={17} className="text-black/45" />
                    <span className="text-sm font-black">iPhone</span>
                    <ArrowRight size={14} className="ml-auto text-black/35" />
                    <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-black text-white">App Store</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                    <Smartphone size={17} className="text-black/45" />
                    <span className="text-sm font-black">Android</span>
                    <ArrowRight size={14} className="ml-auto text-black/35" />
                    <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-black text-white">Google Play</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                    <Globe2 size={17} className="text-black/45" />
                    <span className="text-sm font-black">Web</span>
                    <ArrowRight size={14} className="ml-auto text-black/35" />
                    <span className="rounded-full bg-sky-600 px-3 py-1.5 text-[10px] font-black text-white">tourixy.com</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["1 link", "iOS + Android", "Web + QR"].map((label) => (
                  <span key={label} className="rounded-2xl border border-black/8 px-2 py-3 text-[10px] font-black uppercase tracking-[0.08em] text-black/50">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fb] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700">{content.productTag}</p>
            <h2 className="mt-3 text-[clamp(34px,5vw,58px)] font-black leading-[0.96] tracking-[-0.055em]">{content.productTitle}</h2>
            <p className="mt-6 text-base font-medium leading-8 text-black/60 md:text-lg">{content.productIntro}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {content.features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <article key={feature.title} className="rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)] md:p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-800">
                    <Icon size={21} strokeWidth={2.4} />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">{feature.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-black/55">{feature.text}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <a href={tourixyUrl} className="inline-flex items-center gap-2 text-sm font-black text-sky-800 hover:text-sky-950">
              {content.visit} <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-2">
          <article className="rounded-[34px] border border-black/8 bg-white p-7 shadow-[0_24px_70px_rgba(0,0,0,0.05)] md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">{content.challengeTag}</p>
            <h2 className="mt-4 text-[clamp(30px,4vw,48px)] font-black leading-[0.98] tracking-[-0.05em]">{content.challengeTitle}</h2>
            <p className="mt-6 text-base font-medium leading-8 text-black/60">{content.challengeText}</p>
          </article>
          <article className="relative overflow-hidden rounded-[34px] bg-black p-7 text-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:p-10">
            <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-sky-500/25 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">{content.solutionTag}</p>
              <h2 className="mt-4 text-[clamp(30px,4vw,48px)] font-black leading-[0.98] tracking-[-0.05em]">{content.solutionTitle}</h2>
              <p className="mt-6 text-base font-medium leading-8 text-white/65">{content.solutionText}</p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-6 grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.channels.map((item, index) => {
            const Icon = [Smartphone, QrCode, Globe2, Route][index];
            return (
              <div key={item} className="rounded-[24px] border border-black/8 bg-[#fafafa] p-5">
                <Icon size={19} className="text-sky-700" />
                <p className="mt-4 text-sm font-black leading-6 text-black/70">{item}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f4f9ff] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700">{content.whyTag}</p>
            <h2 className="mt-4 text-[clamp(34px,5vw,60px)] font-black leading-[0.95] tracking-[-0.055em]">{content.whyTitle}</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-black/60 md:text-lg">{content.whyIntro}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {content.outcomes.map((outcome) => (
              <article key={outcome.title} className="flex gap-4 rounded-[26px] border border-sky-100 bg-white p-6 shadow-[0_14px_40px_rgba(14,116,144,0.05)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check size={16} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-lg font-black tracking-[-0.025em]">{outcome.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-7 text-black/55">{outcome.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[38px] bg-black p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.2)] md:p-14">
          <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-3xl text-[clamp(32px,5vw,58px)] font-black leading-[0.96] tracking-[-0.055em]">{content.finalTitle}</h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/62">{content.finalText}</p>
            </div>
            <Link to={localizePath("/login", language)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-black transition hover:-translate-y-0.5">
              {content.finalCta} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <LandingFinalFooter theme="light" />
    </main>
  );
}
