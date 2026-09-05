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

const contentByLanguage = {
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
                target="_blank"
                rel="noreferrer"
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
            <a href={tourixyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-sky-800 hover:text-sky-950">
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
          <div className="mt-10 rounded-[32px] border border-sky-100 bg-white p-7 text-center shadow-[0_20px_55px_rgba(14,116,144,0.06)] md:p-10">
            <img src="/tourixy-favicon.png" alt="Tourixy" className="mx-auto h-14 w-14 rounded-[18px]" />
            <p className="mx-auto mt-5 max-w-4xl text-[clamp(20px,3vw,30px)] font-black leading-[1.25] tracking-[-0.035em]">{content.summary}</p>
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
