import {
  default as React,
  createContext,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  serverTimestamp,
  equalTo,
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Cookie,
  Copy,
  Download,
  Dumbbell,
  ExternalLink,
  FileText,
  Folder,
  Globe,
  Info,
  Link2,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  MousePointer2,
  Plus,
  QrCode,
  Settings,
  ShieldCheck,
  Smartphone,
  Star,
  Store,
  Trash2,
  User,
  Utensils,
  X,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import {
  auth,
  db,
  firebaseReady,
  googleProvider,
  publicBaseUrl,
} from "./firebase.js";
import { LanguageWrapper } from "./LanguageWrapper.jsx";
import {
  FinalFooter as LandingFinalFooter,
  ModernSimulationsSection as LandingSimulationsSection,
  PremiumNavbar as LandingNavbar,
  SmartLinkFlow as LandingSmartLinkFlow,
} from "./LandingVisuals.jsx";
import {
  detectDestination,
  normalizeUrl,
  publicLinkForSlug,
  slugFromInput,
} from "./lib/links.js";
import {
  defaultLanguage,
  getLocalizedRouteSegment,
  getLanguageFromPath,
  languageOptions,
  localizePath,
  normalizeLanguage,
  setUserChosenLanguage,
  supportedLanguages,
  switchLanguagePath,
} from "./lib/i18nRoutes.js";
import {
  legalPagesEn,
  legalPagesEs,
  legalPagesFr,
  legalTabsEn,
  legalTabsEs,
  legalTabsFr,
} from "./lib/legalPages.js";
import { niches as useCaseNiches, nichePath } from "./lib/useCases.js";
import { socialGlyphs } from "./components/SocialIcons.jsx";

const BlogIndex = React.lazy(() =>
  import("./Blog.jsx").then((module) => ({ default: module.BlogIndex }))
);
const BlogPost = React.lazy(() =>
  import("./Blog.jsx").then((module) => ({ default: module.BlogPost }))
);
const QrLandingPage = React.lazy(() => import("./QrLandingPage.jsx"));
const UseCasesHub = React.lazy(() => import("./UseCasesHub.jsx"));
const UseCasePage = React.lazy(() => import("./UseCasePage.jsx"));
const AgenciesPage = React.lazy(() => import("./AgenciesPage.jsx"));
const HowToHub = React.lazy(() => import("./HowToHub.jsx"));
const HowToPage = React.lazy(() => import("./HowToPage.jsx"));

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
});

const emptyLinkForm = {
  title: "",
  iosUrl: "",
  androidUrl: "",
  fallbackUrl: "",
  customUrl: "",
};

const linkDraftStorageKey = "link-my-app.pendingLinkDraft";
const brandName = "Link My App";
const siteUrl = "https://link-my.app";
const brandLogoUrl =
  "https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png";
const defaultSeoDescription =
  "Un solo enlace detecta iPhone, Android u ordenador y lleva cada clic a Google Play, App Store o tu web.";
const defaultSeoKeywords =
  "link descarga app, smart link apps, link App Store Google Play, QR para apps, enlaces inteligentes apps, estadísticas descargas app";
const installEstimateRates = {
  ios: 0.22,
  android: 0.24,
  fallback: 0.01,
};
const emptyStats = {
  total: 0,
  ios: 0,
  android: 0,
  fallback: 0,
  qr: 0,
  written: 0,
  estimatedInstalls: 0,
  qr_ios: 0,
  qr_android: 0,
  qr_fallback: 0,
  written_ios: 0,
  written_android: 0,
  written_fallback: 0,
  days: [],
};

function formatAuthError(error) {
  const code = error?.code || "";

  if (code === "auth/unauthorized-domain") {
    return "Este dominio todavía no está autorizado en Firebase. Añade link-my.app en Authentication > Settings > Authorized domains.";
  }
  if (code === "auth/email-already-in-use") {
    return "Ese email ya tiene cuenta. Prueba a iniciar sesión.";
  }
  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "El email o la contraseña no son correctos.";
  }
  if (code === "auth/weak-password") {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (code === "auth/popup-closed-by-user") {
    return "Has cerrado la ventana de Google antes de terminar.";
  }

  return error?.message || "Ha ocurrido un error. Inténtalo de nuevo.";
}

function upsertMeta(attribute, key, content) {
  if (typeof document === "undefined" || !content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (typeof document === "undefined" || !href) return;

  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertJsonLd(id, schema) {
  if (typeof document === "undefined") return;

  let element = document.getElementById(id);
  if (!schema) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schema);
}

export function SEO({
  title,
  description = defaultSeoDescription,
  keywords = defaultSeoKeywords,
  path = "/",
  robots = "index,follow",
  image = brandLogoUrl,
  schema,
}) {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const canonical = `${siteUrl}${localizePath(path, language)}`;
  const fullTitle = title.includes(brandName) ? title : `${title} | ${brandName}`;
  const alternates = supportedLanguages.map((lang) => ({
    lang,
    href: `${siteUrl}${localizePath(path, lang)}`,
  }));
  const xDefaultHref = `${siteUrl}${localizePath(path, defaultLanguage)}`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Skeilapps SL" />
      <meta name="publisher" content="Skeilapps SL" />
      <meta property="og:locale" content={{ en: "en_US", es: "es_ES", fr: "fr_FR" }[language] || "en_US"} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={canonical} />
      {alternates.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

function normalizeClickSource(value = "", referrer = "") {
  const rawSource = `${value || ""} ${referrer || ""}`.toLowerCase();

  if (rawSource.includes("instagram") || rawSource.includes("ig")) return "instagram";
  if (rawSource.includes("tiktok")) return "tiktok";
  if (rawSource.includes("facebook") || rawSource.includes("fb.")) return "facebook";
  if (rawSource.includes("whatsapp")) return "whatsapp";
  if (rawSource.includes("youtube")) return "youtube";
  if (rawSource.includes("twitter") || rawSource.includes("x.com")) return "twitter";
  if (rawSource.includes("redes") || rawSource.includes("social")) return "redes";
  if (rawSource.includes("qr")) return "qr";
  if (rawSource.includes("email") || rawSource.includes("mail")) return "email";
  if (rawSource.includes("web")) return "web";

  return "directo";
}

function cleanCustomUrl(url) {
  if (!url) return "";
  return url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/^\/+/, "")
    .replace(/\/$/, "");
}

function customUrlLooksLikeDomain(url) {
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+/i.test(cleanCustomUrl(url));
}

function publicUrlForCustomOrSlug(slug, customUrl = "") {
  const cleaned = cleanCustomUrl(customUrl);
  if (cleaned && customUrlLooksLikeDomain(cleaned)) {
    return `https://${cleaned}`;
  }

  return publicLinkForSlug(publicBaseUrl, slug);
}

function estimateDownloads(stats) {
  return Math.round(
    (stats?.ios || 0) * installEstimateRates.ios +
      (stats?.android || 0) * installEstimateRates.android +
      (stats?.fallback || 0) * installEstimateRates.fallback
  );
}

function getLastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    return {
      key: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("es-ES", { weekday: "short" }),
      ios: 0,
      android: 0,
      fallback: 0,
      estimatedInstalls: 0,
    };
  });
}

function sanitizeLinkDraft(value) {
  return {
    title: typeof value?.title === "string" ? value.title : "",
    iosUrl: typeof value?.iosUrl === "string" ? value.iosUrl : "",
    androidUrl: typeof value?.androidUrl === "string" ? value.androidUrl : "",
    fallbackUrl: typeof value?.fallbackUrl === "string" ? value.fallbackUrl : "",
    customUrl: typeof value?.customUrl === "string" ? value.customUrl : "",
  };
}

function hasLinkDraftData(draft) {
  return Object.values(sanitizeLinkDraft(draft)).some((value) => value.trim());
}

function readLinkDraft() {
  if (typeof window === "undefined") return emptyLinkForm;

  try {
    const rawDraft = window.localStorage.getItem(linkDraftStorageKey);
    return rawDraft ? sanitizeLinkDraft(JSON.parse(rawDraft)) : emptyLinkForm;
  } catch {
    return emptyLinkForm;
  }
}

function saveLinkDraft(draft) {
  if (typeof window === "undefined") return;

  const nextDraft = sanitizeLinkDraft(draft);
  if (!hasLinkDraftData(nextDraft)) return;
  window.localStorage.setItem(linkDraftStorageKey, JSON.stringify(nextDraft));
}

function clearLinkDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(linkDraftStorageKey);
}

function useAuth() {
  return useContext(AuthContext);
}

function useToast() {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  function show(nextMessage) {
    setMessage(nextMessage);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setMessage(""), 2600);
  }

  return [message, show];
}

async function ensureUserProfile(user) {
  if (!db || !user) return;

  const userRef = ref(db, `users/${user.uid}`);
  const snapshot = await get(userRef);
  const profileData = {
    uid: user.uid,
    displayName: user.displayName || user.email?.split("@")[0] || "Usuario",
    email: user.email || "",
    photoURL: user.photoURL || "",
    public: true,
    updatedAt: serverTimestamp(),
  };

  if (snapshot.exists()) {
    await update(userRef, profileData);
    return;
  }

  await set(userRef, {
    ...profileData,
    bio: "Mis smart links de Link My App.",
    createdAt: serverTimestamp(),
  });
}

// Available channels for the "create one link per source" pro feature.
// Suffix is appended to the original slug, e.g. "mi-app" + "ig" -> "mi-app-ig".
export const LINK_CHANNELS = [
  { id: "instagram", label: "Instagram", suffix: "ig", color: "#E4405F" },
  { id: "tiktok", label: "TikTok", suffix: "tt", color: "#000000" },
  { id: "facebook", label: "Facebook", suffix: "fb", color: "#1877F2" },
  { id: "x", label: "X / Twitter", suffix: "x", color: "#0F1419" },
  { id: "youtube", label: "YouTube", suffix: "yt", color: "#FF0000" },
  { id: "pinterest", label: "Pinterest", suffix: "pin", color: "#BD081C" },
  { id: "reddit", label: "Reddit", suffix: "rd", color: "#FF4500" },
  { id: "whatsapp", label: "WhatsApp", suffix: "wa", color: "#25D366" },
];

/**
 * Clones an existing smart link with a new slug suffixed by the channel id.
 * Used by the "track per channel" pro-gated feature in the dashboard.
 * Returns the new slug.
 */
async function createChannelLink(item, channel, user) {
  if (!firebaseReady || !db || !user) {
    throw new Error("Firebase no está configurado todavía.");
  }

  const baseSlug = (item.slug || "").replace(/[-]+$/, "");
  let candidate = `${baseSlug}-${channel.suffix}`;
  let tries = 0;

  // Find an unused slug, append -2, -3, ... if collisions
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await get(
      query(ref(db, "links"), orderByChild("slug"), equalTo(candidate))
    );
    const taken =
      existing.exists() &&
      Object.values(existing.val()).some((link) => link.active === true);
    if (!taken) break;
    tries += 1;
    candidate = `${baseSlug}-${channel.suffix}-${tries + 1}`;
    if (tries > 30) {
      throw new Error("No se pudo generar un slug único para el canal.");
    }
  }

  const linkRef = push(ref(db, "links"));
  await set(linkRef, {
    ownerId: user.uid,
    ownerEmail: user.email || "",
    title: `${item.title} – ${channel.label}`,
    slug: candidate,
    customUrl: "",
    iosUrl: item.iosUrl,
    androidUrl: item.androidUrl,
    fallbackUrl: item.fallbackUrl,
    active: true,
    channel: channel.id,
    parentLinkId: item.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return candidate;
}

async function createSmartLink(form, user, options = {}) {
  if (!firebaseReady || !db || !user) {
    throw new Error("Firebase no está configurado todavía.");
  }

  const title = form.title.trim();
  const slug = slugFromInput(form.customUrl || title);
  const iosUrl = normalizeUrl(form.iosUrl);
  const androidUrl = normalizeUrl(form.androidUrl);
  const fallbackUrl = normalizeUrl(form.fallbackUrl);

  if (!title) throw new Error("Añade el nombre de la app.");
  if (!slug || slug.length < 2) throw new Error("Elige una URL corta válida.");
  if (!iosUrl || !androidUrl || !fallbackUrl) {
    throw new Error("Completa App Store, Google Play y enlace alternativo.");
  }

  const existing = await get(
    query(ref(db, "links"), orderByChild("slug"), equalTo(slug))
  );

  if (
    existing.exists() &&
    Object.values(existing.val()).some((link) => link.active === true)
  ) {
    throw new Error("Esa URL corta ya está en uso. Prueba otra.");
  }

  const linkRef = push(ref(db, "links"));
  const payload = {
    ownerId: user.uid,
    ownerEmail: user.email || "",
    title,
    slug,
    customUrl: form.customUrl || "",
    iosUrl,
    androidUrl,
    fallbackUrl,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  // Tag the link with the social channel it was created for, so the
  // dashboard can show the right brand icon next to "Copy / Open / ...".
  if (options.channel) {
    payload.channel = options.channel;
  }
  await set(linkRef, payload);

  return slug;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dbProfile, setDbProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseReady || !auth) {
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        ensureUserProfile(currentUser).catch(console.error);
      }
    });
  }, []);

  useEffect(() => {
    if (!firebaseReady || !db || !user) {
      setDbProfile(null);
      return undefined;
    }

    return onValue(ref(db, `users/${user.uid}`), (snapshot) => {
      setDbProfile(snapshot.exists() ? snapshot.val() : null);
    });
  }, [user]);

  const profile = useMemo(() => {
    if (!dbProfile) return null;
    return { ...dbProfile, plan: dbProfile.plan || "free" };
  }, [dbProfile]);

  const value = useMemo(
    () => ({ user, profile, loading }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function FirebaseSetupNotice({ compact = false }) {
  if (firebaseReady) return null;

  return (
    <div
      className={`border border-amber-300 bg-amber-50 text-amber-950 ${
        compact ? "rounded-2xl p-4 text-sm" : "rounded-[28px] p-5"
      }`}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-black">Falta conectar Firebase</p>
          <p className="mt-1 leading-6 opacity-75">
            Duplica <span className="font-bold">.env.example</span> como{" "}
            <span className="font-bold">.env</span> y pega las claves de tu app
            web de Firebase.
          </p>
        </div>
      </div>
    </div>
  );
}

function PremiumNavbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);

  const links = [
    { label: t("nav.home"), href: localizePath("/", language) },
    { label: t("nav.how"), href: localizePath("/what-we-do", language) },
    { label: t("nav.faqs"), href: localizePath("/faqs", language) },
    { label: t("nav.price", "Gratis"), href: localizePath("/pricing", language) },
  ];

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100vw-16px)] max-w-[1040px] -translate-x-1/2 rounded-[24px] border border-black/10 bg-white/60 px-3 py-2 shadow-[inset_0_0_14px_rgba(255,255,255,0.85),0_3px_22px_rgba(0,0,0,0.10)] backdrop-blur-xl md:top-6 md:rounded-[30px] md:px-5 md:py-3 lg:px-7">
      <div className="flex items-center justify-between gap-3">
        <Link
          to={localizePath("/", language)}
          className="flex shrink-0 items-center gap-2 transition hover:opacity-80"
        >
          <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="h-9 w-9 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
          <span className="text-[18px] font-black tracking-tight text-black md:text-[22px]">
            Link My App
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[16px] font-bold text-black transition-colors duration-300 hover:text-black/55"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="relative ml-auto flex shrink-0 items-center gap-2">
          <Link
            to={user ? localizePath("/dashboard", language) : localizePath("/login", language)}
            className="inline-flex items-center justify-center rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#353535_0%,#0a0a0a_100%)] px-3 py-2.5 text-sm font-bold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_15px_rgba(0,0,0,0.32)] transition hover:-translate-y-0.5 md:rounded-[22px] md:px-4 md:py-3.5 md:text-base"
          >
            {user ? "Panel" : t("nav.login")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-transparent text-black lg:hidden"
            aria-label="Abrir menú"
          >
            {open ? (
              <X size={25} strokeWidth={2.4} />
            ) : (
              <Menu size={27} strokeWidth={2.4} />
            )}
          </button>

          <div
            className={`absolute right-0 top-[calc(100%+12px)] flex w-[min(280px,calc(100vw-24px))] origin-top flex-col gap-2 rounded-[24px] border border-black/10 bg-white p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition-all duration-300 lg:hidden ${
              open
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
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

function SmartLinkFlow() {
  return (
    <section
      className="relative w-full overflow-hidden rounded-[30px] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.07)]"
      aria-label="Smart link hacia App Store, web y Google Play"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1.5px)] bg-[size:22px_22px] opacity-60" />
      <div className="relative mx-auto flex max-w-[720px] flex-col items-center gap-7 py-4">
        <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border border-black/10 bg-white/90 px-4 py-3 shadow-sm">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black text-white">
            <Link2 size={17} />
          </div>
          <span className="truncate text-sm font-black">
            link-my.app/r/mi-app
          </span>
        </div>

        <div className="grid w-full grid-cols-3 items-center gap-3">
          <FlowNode icon={Smartphone} title="iPhone" color="bg-blue-500" />
          <FlowNode icon={Globe} title="Web" color="bg-black" />
          <FlowNode icon={Smartphone} title="Android" color="bg-emerald-500" />
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <StorePreview label="App Store" tone="border-blue-200 bg-blue-50" />
          <StorePreview label="Landing" tone="border-black/10 bg-white" />
          <StorePreview label="Google Play" tone="border-emerald-200 bg-emerald-50" />
        </div>
      </div>
    </section>
  );
}

function FlowNode({ icon: Icon, title, color }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${color}`}>
        <Icon size={20} />
      </div>
      <span className="text-xs font-black text-black/55">{title}</span>
    </div>
  );
}

function StorePreview({ label, tone }) {
  return (
    <div
      className={`flex min-h-24 flex-col items-center justify-center rounded-3xl border p-4 text-center shadow-sm ${tone}`}
    >
      <div className="mb-2 h-7 w-7 rounded-xl bg-black/85" />
      <p className="text-xs font-black text-black">{label}</p>
    </div>
  );
}

/**
 * Optional channel selector shown inside the create-link form once the user
 * already has at least one link. Selecting a channel appends its suffix to
 * the slug (e.g. "mi-app-ig") so each social network gets its own trackable URL.
 */
function ChannelSelector({ selected, onSelect }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-3xl border border-black/8 bg-gradient-to-br from-white via-slate-50 to-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-black leading-5 text-black/75">
          {t(
            "dashboard.channelsSubtitle",
            "Crea URLs específicas por red social para medir cada canal por separado.",
          )}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {LINK_CHANNELS.map((channel) => {
          const Glyph = socialGlyphs[channel.id];
          const isSelected = selected?.id === channel.id;
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => onSelect(channel)}
              aria-pressed={isSelected}
              aria-label={channel.label}
              title={channel.label}
              className={`group relative flex items-center justify-center rounded-2xl border p-2.5 transition ${
                isSelected
                  ? "border-black bg-black shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                  : "border-black/10 bg-white hover:-translate-y-0.5 hover:border-black/30"
              }`}
            >
              {Glyph && (
                <Glyph
                  width={20}
                  height={20}
                  style={{ color: isSelected ? "#fff" : channel.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] font-bold text-emerald-800">
          {t("dashboard.channelPreviewPrefix", "Tu enlace para")}{" "}
          <strong>{selected.label}</strong>{" "}
          {t("dashboard.channelPreviewSuffix", "tendrá el sufijo")}{" "}
          <code className="rounded bg-emerald-100 px-1.5 py-0.5">-{selected.suffix}</code>
        </p>
      )}
    </div>
  );
}

function LinkCreateForm({
  buttonLabel = "Crea Smartlink",
  onCreated,
  compact = false,
  loadDraft = false,
  disabled = false,
  onDisabledSubmit,
  hasExistingLinks = false,
}) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(() => (loadDraft ? readLinkDraft() : emptyLinkForm));
  const [draftReady, setDraftReady] = useState(() => loadDraft && hasLinkDraftData(readLinkDraft()));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const submitButtonRef = React.useRef(null);

  const baseSlug = slugFromInput(form.customUrl || form.title) || "mi-app";
  const effectiveSlug = selectedChannel ? `${baseSlug}-${selectedChannel.suffix}` : baseSlug;
  const previewUrl = publicLinkForSlug(publicBaseUrl, effectiveSlug);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleChannelClick(channel) {
    setSelectedChannel((current) => {
      const next = current?.id === channel.id ? null : channel;
      // When a channel becomes selected, smoothly scroll to the submit button
      // so the user can see and reach the "Crea Smartlink" CTA without hunting.
      if (next) {
        requestAnimationFrame(() => {
          submitButtonRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!user) {
      saveLinkDraft(form);
      navigate(localizePath("/login?linkDraft=1", i18n.language));
      return;
    }

    if (disabled) {
      onDisabledSubmit?.();
      return;
    }

    setSaving(true);
    try {
      // If a channel is selected (Pro only) we force the slug suffix by
      // passing the channel-suffixed slug as customUrl, and tag the link
      // with the channel id so its brand icon shows up next to the actions.
      const formForSubmit = selectedChannel
        ? { ...form, customUrl: effectiveSlug }
        : form;
      const slug = await createSmartLink(formForSubmit, user, {
        channel: selectedChannel?.id,
      });
      clearLinkDraft();
      setForm(emptyLinkForm);
      setSelectedChannel(null);
      setDraftReady(false);
      onCreated?.(slug);
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FirebaseSetupNotice compact />

      {draftReady && (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-800">
          {t("landing.draftReady")}
        </p>
      )}

      <InputField
        label={t("landing.appNameLabel")}
        value={form.title}
        onChange={(value) => updateField("title", value)}
        placeholder={t("landing.appNamePlaceholder")}
      />

      <InputField
        label={t("landing.iosUrlLabel")}
        value={form.iosUrl}
        onChange={(value) => updateField("iosUrl", value)}
        placeholder="https://apps.apple.com/..."
      />

      <InputField
        label={t("landing.androidUrlLabel")}
        value={form.androidUrl}
        onChange={(value) => updateField("androidUrl", value)}
        placeholder="https://play.google.com/store/apps/details?id=..."
      />

      <InputField
        label={t("landing.fallbackUrlLabel")}
        value={form.fallbackUrl}
        onChange={(value) => updateField("fallbackUrl", value)}
        placeholder={t("landing.fallbackPlaceholder", "https://tuweb.com/descargar-app")}
      />

      <label className="block">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="block text-sm font-bold text-black/75">
            {t("landing.customUrlLabel")}
          </span>
          <span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-black/45">
            {t("landing.editable")}
          </span>
        </div>

        <input
          value={form.customUrl}
          onChange={(event) => updateField("customUrl", event.target.value)}
          placeholder={t("landing.customUrlPlaceholder")}
          className="h-12 w-full rounded-2xl border border-black/12 bg-[#f8f8f6] px-4 text-sm font-semibold outline-none transition placeholder:text-black/28 focus:border-black/35 focus:bg-white"
        />

        <p className="mt-2 break-all text-xs font-medium leading-5 text-black/45">
          {t("landing.generatedUrl")}{" "}
          <span className="font-bold text-black/70">
            {form.customUrl && !selectedChannel
              ? publicUrlForCustomOrSlug(baseSlug, form.customUrl)
              : previewUrl}
          </span>
        </p>
      </label>

      {hasExistingLinks && (
        <ChannelSelector
          selected={selectedChannel}
          onSelect={handleChannelClick}
        />
      )}

      {!compact && (
        <div className="flex items-start gap-3 rounded-3xl border border-black/8 bg-[#fafaf8] p-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
            <QrCode size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-extrabold text-black/80">
              {t("landing.qrTitle")}
            </p>
            <p className="mt-1 text-xs font-medium leading-5 text-black/45">
              {t("landing.qrText")}
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </p>
      )}

      <button
        ref={submitButtonRef}
        disabled={saving || !firebaseReady}
        className="group mt-2 flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(0,0,0,0.24)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {saving ? <Loader2 className="animate-spin" size={18} /> : buttonLabel}
        {!saving && (
          <ArrowRight className="transition group-hover:translate-x-1" size={17} />
        )}
      </button>
    </form>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-black/75">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        className="h-12 w-full rounded-2xl border border-black/12 bg-[#f8f8f6] px-4 text-sm font-semibold outline-none transition placeholder:text-black/28 focus:border-black/35 focus:bg-white"
      />
    </label>
  );
}

function LandingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState(-1);
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Skeilapps SL",
          url: siteUrl,
          logo: `${siteUrl}/favicon.svg`,
        },
        {
          "@type": "WebSite",
          name: brandName,
          url: siteUrl,
          inLanguage: normalizeLanguage(i18n.language),
        },
        {
          "@type": "SoftwareApplication",
          name: brandName,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: siteUrl,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
          },
        },
      ],
    }),
    [i18n.language]
  );

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-white text-black"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >


    <SEO {...{
    title: t("landing.seoTitle"),
    description: t("landing.seoDesc"),
    path: "/",
    schema: faqSchema,
  }} />
      <LandingNavbar />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-60" />

      <section
        id="inicio"
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-5 pb-6 pt-32 md:px-8 md:pt-36 xl:px-10"
      >
        <div className="grid flex-1 items-start gap-10 py-10 xl:grid-cols-[minmax(0,1.12fr)_minmax(420px,540px)] 2xl:grid-cols-[minmax(0,1.18fr)_minmax(440px,560px)]">
          <div className="mx-auto w-full max-w-[980px] text-center xl:mx-0 xl:text-left">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] shadow-sm backdrop-blur-md">
              <Sparkles size={14} /> {t('landing.heroTag')}
            </div>

            <h1 className="mx-auto max-w-[820px] text-center text-[10vw] font-black leading-[0.9] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[72px] xl:mx-0 xl:text-left 2xl:text-[78px]">
              {t('landing.heroTitle')}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-center text-base font-medium leading-7 text-black/60 md:text-lg xl:mx-0 xl:text-left">
              {t('landing.heroSubtitle')}
            </p>

            <div className="mt-8">
              <LandingSmartLinkFlow />
            </div>
          </div>

          <div
            id="crear"
            className="mx-auto w-full max-w-[920px] rounded-[34px] border border-black/10 bg-white/82 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:p-5 xl:mx-0 xl:max-w-[540px] 2xl:max-w-[560px]"
          >
            <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm md:p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                    {t("landing.formTitle")}
                  </h2>
                </div>
                <div className="rounded-full bg-black px-3 py-1.5 text-xs font-bold text-white">
                  {t("landing.freeBadge")}
                </div>
              </div>

              <LinkCreateForm
                onCreated={() => navigate(localizePath("/dashboard", i18n.language))}
                buttonLabel={user ? t("landing.formButton") : t("landing.formLoginButton")}
              />
            </div>
          </div>
        </div>
      </section>

      <LandingSimulationsSection />
      <SeoContentSection />
      <FAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <LandingFinalFooter />
    </main>
  );
}

function SeoContentSection() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const translatedBlocks = t("seoContent.blocks", { returnObjects: true });
  const contentBlocks = [
    {
      icon: Smartphone,
      title: "Un link de descarga para iPhone, Android y ordenador",
      text: "Evita poner dos botones o explicar al usuario qué tienda debe abrir. Con un enlace inteligente, cada clic llega al destino adecuado: App Store, Google Play o una página alternativa.",
    },
    {
      icon: QrCode,
      title: "Código QR para descargar una app en campañas físicas",
      text: "Convierte carteles, packaging, eventos y mostradores en una URL medible. El mismo smart link puede imprimirse como QR y separar los clics que llegan desde escaneos.",
      to: localizePath("/qr-codes", language),
      cta: t("seoContent.qrCta", "Ver cómo crear tu QR"),
    },
    {
      icon: BarChart3,
      title: "Estadísticas para saber qué canal trae más descargas",
      text: "Mide clics por dispositivo, fuente y campaña. Así puedes comparar Instagram, email, web, QR o tienda física y decidir dónde promocionar tu app.",
    },
  ];
  const blocks = Array.isArray(translatedBlocks)
    ? translatedBlocks.map((b, i) => ({ ...contentBlocks[i], ...b }))
    : contentBlocks;

  return (
    <section className="relative w-full bg-white px-5 py-20 text-black md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
            {t("seoContent.tag")}
          </p>
          <h2 className="mt-3 text-[clamp(34px,5vw,64px)] font-black leading-[0.92] tracking-[-0.06em]">
            {t("seoContent.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-black/58 md:text-lg">
            {t("seoContent.description")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {blocks.map((block, index) => {
            const fallbackIcon = contentBlocks[index]?.icon || Smartphone;
            const Icon = block.icon || fallbackIcon;
            const linkTo = block.to || contentBlocks[index]?.to;
            const ctaLabel = block.cta || contentBlocks[index]?.cta;

            const cardClass =
              "group relative overflow-hidden rounded-[30px] border border-black/10 bg-white/90 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.045)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.08)]";

            const cardInner = (
              <>
                <div className="absolute inset-x-0 top-0 h-1 bg-black opacity-0 transition group-hover:opacity-100" />
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                  <Icon size={21} strokeWidth={2.5} />
                </div>
                <h3 className="text-[22px] font-black leading-tight tracking-[-0.035em]">
                  {block.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-7 text-black/55">
                  {block.text}
                </p>
                {linkTo && (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-black/70 group-hover:text-black">
                    {ctaLabel || "→"}
                    <span aria-hidden>→</span>
                  </span>
                )}
              </>
            );

            return linkTo ? (
              <Link key={block.title} to={linkTo} className={cardClass}>
                {cardInner}
              </Link>
            ) : (
              <article key={block.title} className={cardClass}>
                {cardInner}
              </article>
            );
          })}
        </div>

        {/* Casos de uso por sector (debajo de los 3 recuadros). Hidden on mobile per user request. */}
        <div className="hidden md:block mt-16 overflow-hidden rounded-[32px] border border-black/8 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.05)] md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-black/55">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {t("seoContent.useCasesTag", "Casos de uso por sector")}
              </p>
              <h3 className="mt-4 max-w-2xl text-[clamp(26px,3.2vw,40px)] font-black leading-[1.05] tracking-[-0.045em]">
                {t("seoContent.useCasesTitle", "Mira cómo se usa según tu sector")}
              </h3>
              <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-black/55 md:text-base">
                {t(
                  "seoContent.useCasesSubtitle",
                  "Ecommerce, SaaS, restaurantes, fitness, creadores o agencias: un smart link y un QR adaptados a cada modelo.",
                )}
              </p>
            </div>
            <Link
              to={localizePath("/use-cases", language)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
            >
              {t("seoContent.useCasesAll", "Ver todos")} →
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {useCaseNiches.map((n) => {
              const c = n[language] || n.en;
              const NicheIcon =
                {
                  ecommerce: Store,
                  saas: Briefcase,
                  restaurants: Utensils,
                  fitness: Dumbbell,
                  creators: Sparkles,
                  agencies: Building2,
                }[n.id] || Store;
              return (
                <Link
                  key={n.id}
                  to={localizePath(nichePath(n.id, language), language)}
                  className={`group relative overflow-hidden rounded-2xl border border-black/8 bg-gradient-to-br ${n.accent} p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)]`}
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                    <NicheIcon size={17} strokeWidth={2.5} />
                  </div>
                  <p className="text-[13px] font-black tracking-[-0.02em] text-black">
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black/40">
                    {c.eyebrow}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.16em] text-black/70 group-hover:text-black">
                    {t("seoContent.useCasesGo", "Ver")} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FreeEverythingSection() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const freePageCopy = {
    es: {
      tag: "Gratis para todos",
      title: "Todo Link My App incluido por 0 €.",
      intro:
        "No hay plan Pro, checkout ni tarjeta. Puedes usar todas las funciones principales desde tu cuenta gratis.",
      cta: "Crear cuenta gratis",
      included: "Funciones incluidas",
      note: "Sin pagos. Sin suscripciones. Sin límites artificiales para empezar.",
      features: [
        "Smart links ilimitados para tus apps",
        "Códigos QR ilimitados para campañas, carteles y packaging",
        "Estadísticas de clics en el panel",
        "Clics separados por iPhone, Android y ordenador",
        "Enlaces personalizados y editables",
        "Links por canal para Instagram, TikTok, email, web o QR",
        "Historial de clics y panel para gestionar todas tus apps",
        "Soporte y feedback desde el panel",
      ],
    },
    en: {
      tag: "Free for everyone",
      title: "All Link My App features included for $0.",
      intro:
        "There is no Pro plan, checkout or card. You can use the main features from your free account.",
      cta: "Create free account",
      included: "Included features",
      note: "No payments. No subscriptions. No artificial limits to get started.",
      features: [
        "Unlimited smart links for your apps",
        "Unlimited QR codes for campaigns, posters and packaging",
        "Click analytics in the dashboard",
        "Clicks split by iPhone, Android and desktop",
        "Custom and editable links",
        "Channel links for Instagram, TikTok, email, web or QR",
        "Click history and a dashboard for all your apps",
        "Support and feedback from the dashboard",
      ],
    },
    fr: {
      tag: "Gratuit pour tous",
      title: "Toutes les fonctions de Link My App incluses pour 0 €.",
      intro:
        "Pas de plan Pro, pas de paiement, pas de carte. Tu peux utiliser les fonctions principales avec ton compte gratuit.",
      cta: "Créer un compte gratuit",
      included: "Fonctions incluses",
      note: "Sans paiement. Sans abonnement. Sans limites artificielles pour commencer.",
      features: [
        "Smart links illimités pour tes apps",
        "QR illimités pour campagnes, affiches et packaging",
        "Statistiques de clics dans le tableau de bord",
        "Clics séparés par iPhone, Android et ordinateur",
        "Liens personnalisés et modifiables",
        "Liens par canal pour Instagram, TikTok, email, web ou QR",
        "Historique de clics et tableau pour toutes tes apps",
        "Support et feedback depuis le tableau de bord",
      ],
    },
  };
  const copy = freePageCopy[language] || freePageCopy.es;

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1220px] px-5 pb-24 pt-2 md:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <article className="rounded-[34px] border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
            {copy.tag}
          </p>
          <div className="mt-8 flex items-end gap-3">
            <span className="text-[clamp(72px,12vw,124px)] font-black leading-none tracking-[-0.08em]">
              0
            </span>
            <span className="pb-5 text-4xl font-black">€</span>
          </div>
          <h2 className="mt-6 text-[clamp(34px,5vw,58px)] font-black leading-[0.95] tracking-[-0.06em]">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-8 text-black/58 md:text-lg">
            {copy.intro}
          </p>
          <Link
            to={localizePath("/login", language)}
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-black text-white transition hover:-translate-y-0.5"
          >
            {copy.cta} <ArrowRight size={16} />
          </Link>
          <p className="mt-5 text-sm font-black text-emerald-700">
            {copy.note}
          </p>
        </article>

        <article className="rounded-[34px] border border-black bg-[#10100f] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.18)] md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black tracking-[-0.04em]">{copy.included}</h2>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-black">
              100% gratis
            </span>
          </div>
          <div className="mt-8 grid gap-3">
            {copy.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black leading-6 text-white/84"
              >
                <Check className="mt-0.5 shrink-0" size={16} strokeWidth={3} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

const marketingPages = {
  precio: {
    path: "/pricing",
    title: "Link My App es gratis para todos",
    description:
      "Todas las funciones de Link My App están incluidas gratis: smart links ilimitados, QR, estadísticas y enlaces por canal.",
    eyebrow: "Gratis",
    h1: "Todas las funciones, <br class=\"md:hidden\" /> cero coste.",
    intro:
      "Crea smart links para App Store, Google Play, QR, campañas y canales sin tarjeta, sin checkout y sin plan Pro.",
    content: "free",
  },
  faqs: {
    path: "/faqs",
    title: "Preguntas frecuentes sobre links de descarga para apps",
    description:
      "Respuestas sobre cómo crear links de descarga para apps, generar códigos QR y medir clics hacia App Store y Google Play.",
    eyebrow: "Faqs",
    h1: "Preguntas frecuentes sobre links para descargar apps.",
    intro:
      "Todo lo que necesitas saber antes de crear una URL única para App Store, Google Play, QR y campañas.",
    content: "faqs",
  },
  comoFunciona: {
    path: "/what-we-do",
    title: "Cómo crear un link para App Store y Google Play",
    description:
      "Aprende cómo funciona un smart link para apps: detecta iPhone, Android u ordenador y redirige a App Store, Google Play o una URL alternativa.",
    eyebrow: "Cómo funciona",
    h1: "Qué hacemos en <br class=\"md:hidden\" /> Link My App",
    intro:
      "Un link inteligente evita perder usuarios: detecta el dispositivo, redirige al destino correcto y permite medir clics por fuente.",
    content: "how",
  },
};

function MarketingPage({ pageKey }) {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const basePage = marketingPages[pageKey] || marketingPages.comoFunciona;
  
  const page = {
    ...basePage,
    title: t(`marketing.${pageKey}.title`, basePage.title),
    description: t(`marketing.${pageKey}.description`, basePage.description),
    eyebrow: t(`marketing.${pageKey}.eyebrow`, basePage.eyebrow),
    h1: t(`marketing.${pageKey}.h1`, basePage.h1),
    intro: t(`marketing.${pageKey}.intro`, basePage.intro)
  };

  const [openFaq, setOpenFaq] = useState(-1);
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${page.title} | ${brandName}`,
      url: `${siteUrl}${localizePath(page.path, language)}`,
      description: page.description,
      inLanguage: language,
      isPartOf: {
        "@type": "WebSite",
        name: brandName,
        url: siteUrl,
      },
    }),
    [page, language]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">


    <SEO {...{
    title: page.title,
    description: page.description,
    path: page.path,
    schema,
  }} />
      <LegalNavbar />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
      {!page.hideHero && (
        <section className="relative z-10 mx-auto w-full max-w-[1220px] px-5 pb-10 pt-32 md:px-8 md:pt-40">
          <p className="inline-flex rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-black/40 shadow-sm">
            {page.eyebrow}
          </p>
          <h1 
            className="mt-5 max-w-5xl text-[clamp(42px,7vw,86px)] font-black leading-[0.9] tracking-[-0.07em]"
            dangerouslySetInnerHTML={{ __html: page.h1 }}
          />
          <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-black/58 md:text-lg">
            {page.intro}
          </p>
        </section>
      )}
      {page.hideHero && <div className="relative h-28 md:h-32" />}

      {page.content === "faqs" && (
        <FAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      )}
      {page.content === "free" && <FreeEverythingSection />}
      {page.content === "how" && (
        <>
          <LandingSimulationsSection />
          <SeoContentSection />
        </>
      )}
      <LandingFinalFooter />
    </main>
  );
}

function ModernSimulationsSection() {
  const steps = [
    {
      title: "El clic",
      text: "El usuario abre tu enlace desde redes, email, bio o QR.",
      icon: MousePointer2,
    },
    {
      title: "Análisis",
      text: "Detectamos iPhone, Android u ordenador en el navegador.",
      icon: Smartphone,
    },
    {
      title: "Enrutamiento",
      text: "El smart link lo manda a App Store, Google Play o tu landing.",
      icon: Link2,
    },
  ];

  return (
    <section id="que-hacemos" className="w-full bg-white py-20 text-black">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-[-0.045em] md:text-6xl">
            Qué hacemos en Link My App
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-black/55 md:text-lg">
            Un enlace único con destinos inteligentes y control desde tu panel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
              >
                <div className="mb-7 grid h-64 place-items-center overflow-hidden rounded-2xl border border-black/5 bg-[#f8f9fa]">
                  <div className="relative grid h-32 w-32 place-items-center rounded-full border border-black/10">
                    <div className="absolute h-24 w-24 rounded-full border border-black/5" />
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-black text-white shadow-xl">
                      <Icon size={25} />
                    </div>
                    <div className="absolute -right-8 top-6 rounded-full bg-white px-2 py-1 text-[10px] font-black shadow">
                      {index + 1}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      index === 2 ? "bg-black text-white" : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-black">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-black/60">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ openFaq, setOpenFaq }) {
  const { t } = useTranslation();
  
  const faqsTranslated = [
    {
      question: t("faqs.q1", "¿Qué hace exactamente Link My App?"),
      answer: t("faqs.a1", "Crea un único enlace para tu app y lo redirige a App Store, Google Play o una URL alternativa según el dispositivo."),
    },
    {
      question: t("faqs.q2", "¿Puedo crear varios enlaces?"),
      answer: t("faqs.a2", "Sí. Cada cuenta tiene su panel para crear, pausar y revisar todos los links que vaya creando."),
    },
    {
      question: t("faqs.q3", "¿Funciona con QR?"),
      answer: t("faqs.a3", "Sí. Cualquier smart link público se puede usar como QR porque la URL queda estable."),
    },
    {
      question: t("faqs.q4", "¿Puedo ver estadísticas?"),
      answer: t("faqs.a4", "Sí. En el panel puedes ver clics totales y clics separados por iPhone, Android y ordenador."),
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.035)_1px,transparent_1.5px)] bg-[size:34px_34px] opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-black tracking-[-0.055em] text-black md:text-6xl">
          {t("faqs.title", "Preguntas frecuentes")}
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-3">
        {faqsTranslated.map((faq, index) => {
          const isOpen = openFaq === index;

          return (
            <button
              key={faq.question}
              type="button"
              onClick={() => setOpenFaq(isOpen ? -1 : index)}
              className="w-full rounded-[24px] border border-black/[0.07] bg-white p-5 text-left shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-black tracking-[-0.02em] text-black md:text-lg">
                    {faq.question}
                  </h3>
                </div>

                <ChevronDown
                  size={20}
                  className={`shrink-0 text-black/45 transition duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pl-12 text-sm font-medium leading-7 text-black/55 md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FinalFooter({ theme = "dark" }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage = normalizeLanguage(i18n.language);

  const changeLanguage = (lang) => {
    const normalizedLanguage = normalizeLanguage(lang);
    setUserChosenLanguage(normalizedLanguage);
    i18n.changeLanguage(normalizedLanguage);
    navigate(switchLanguagePath(`${location.pathname}${location.search}`, normalizedLanguage), {
      replace: true,
    });
  };

  const isDark = theme === "dark";

  return (
    <section className={`relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden border-t ${isDark ? 'border-black/10 bg-white' : 'border-black/10 bg-white'}`}>
      <div className={`relative overflow-hidden px-5 pt-20 pb-8 md:px-8 ${isDark ? 'bg-[radial-gradient(circle_at_50%_115%,rgba(64,64,64,0.45),transparent_34%),linear-gradient(120deg,#0d1020_0%,#111113_48%,#181612_100%)] text-white' : 'bg-gray-50 text-black'}`}>
        <div className={`pointer-events-none absolute inset-0 bg-[size:72px_72px] ${isDark ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)]'}`} />

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl">
            {t("footer.ctaTitle", "Convierte cada link en una descarga")}
          </h2>
          <p className={`mx-auto mt-6 max-w-2xl text-base font-medium leading-8 md:text-lg ${isDark ? 'text-white/58' : 'text-black/60'}`}>
            {t("footer.ctaSubtitle", "Unifica App Store, Google Play, QR y campañas en una sola URL.")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={localizePath("/dashboard", currentLanguage)}
              className={`flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-black transition hover:-translate-y-0.5 ${isDark ? 'bg-white text-black shadow-[0_12px_30px_rgba(255,255,255,0.12)]' : 'bg-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]'}`}
            >
              {t("footer.btnCreate", "Crear mi link de descarga")}
              <ArrowRight size={16} />
            </Link>
            <Link
              to={localizePath("/login", currentLanguage)}
              className={`flex h-12 items-center justify-center rounded-2xl border px-6 text-sm font-bold transition ${isDark ? 'border-white/12 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white' : 'border-black/10 bg-black/5 text-black/80 hover:bg-black/10 hover:text-black'}`}
            >
              {t("footer.btnAccess", "Acceder al panel")}
            </Link>
          </div>
        </div>

        <footer className={`relative mx-auto mt-20 flex w-full max-w-[1320px] flex-col gap-8 border-t pt-8 md:flex-row md:items-center md:justify-between ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="h-9 w-9 object-contain" />
              <span className="text-lg font-black tracking-tight">LINK MY APP</span>
            </div>
            <div className="mt-3 text-center md:text-left">
              <p className={`max-w-md text-sm font-medium leading-6 ${isDark ? 'text-white/45' : 'text-black/50'}`}>
                {t("footer.brandSubtitle", "Un link de descarga para llevar a cada usuario a la tienda correcta.")}
              </p>
              <div className="mt-4">
                <p className={`text-xs font-black uppercase tracking-[0.18em] ${isDark ? 'text-white/35' : 'text-black/40'}`}>Nuestras Webs</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <a href="https://skeilapps.com/" target="_blank" rel="noopener" className={`rounded-full border px-3 py-1.5 text-sm font-bold transition ${isDark ? 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.07] hover:text-white' : 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:bg-black/[0.07] hover:text-black'}`}>SkeilApps</a>
                  <a href="https://tienrank.com/" target="_blank" rel="noopener" className={`rounded-full border px-3 py-1.5 text-sm font-bold transition ${isDark ? 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.07] hover:text-white' : 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:bg-black/[0.07] hover:text-black'}`}>TienRank</a>
                  <a href="https://tuback.link/" target="_blank" rel="noopener" className={`rounded-full border px-3 py-1.5 text-sm font-bold transition ${isDark ? 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.07] hover:text-white' : 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:bg-black/[0.07] hover:text-black'}`}>TuBack.link</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <div className={`flex items-center gap-2 mr-4 rounded-xl px-3 py-1 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <Globe size={14} className={isDark ? "text-white/60" : "text-black/60"} />
              <select 
                className={`bg-transparent text-sm font-medium outline-none appearance-none cursor-pointer ${isDark ? 'text-white/80' : 'text-black/80'}`}
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                {languageOptions.map((language) => (
                  <option key={language.code} value={language.code} className="text-black">
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            <FooterLink isDark={isDark} icon={Cookie} label={t("footer.cookies", "Cookies")} href={localizePath("/cookies", currentLanguage)} />
            <FooterLink isDark={isDark} icon={FileText} label={t("footer.terms", "Términos")} href={localizePath("/terms", currentLanguage)} />
            <FooterLink isDark={isDark} icon={ShieldCheck} label={t("footer.privacy", "Privacidad")} href={localizePath("/privacy", currentLanguage)} />
          </div>
        </footer>
      </div>
    </section>
  );
}

function FooterLink({ icon: Icon, label, href, isDark = true, ...props }) {
  return (
    <a
      href={href}
      {...props}
      className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${isDark ? 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.07] hover:text-white' : 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:bg-black/[0.07] hover:text-black'}`}
    >
      <Icon size={15} className={`transition ${isDark ? 'text-white/35 group-hover:text-white/70' : 'text-black/35 group-hover:text-black/70'}`} />
      {label}
    </a>
  );
}

function LoginPage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [hasPendingDraft] = useState(() => hasLinkDraftData(readLinkDraft()));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingProvider, setLoadingProvider] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  if (user) return <Navigate to={localizePath("/dashboard", i18n.language)} replace />;

  async function handleProvider(providerType) {
    if (!firebaseReady || !auth) return;

    setError("");
    setLoadingProvider(providerType);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await ensureUserProfile(result.user);
      navigate(
        localizePath(
          window.location.search.includes("upgrade=pro")
            ? "/dashboard?upgrade=pro"
            : "/dashboard",
          i18n.language
        )
      );
    } catch (nextError) {
      setError(formatAuthError(nextError));
    } finally {
      setLoadingProvider("");
    }
  }

  async function handleEmailSubmit(event) {
    event.preventDefault();
    if (!firebaseReady || !auth) return;

    setError("");
    setMessage("");
    setLoadingProvider("email");
    try {
      if (mode === "register") {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) {
          await updateProfile(result.user, { displayName: name.trim() });
        }
        await ensureUserProfile(auth.currentUser || result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await ensureUserProfile(result.user);
      }
      navigate(
        localizePath(
          window.location.search.includes("upgrade=pro")
            ? "/dashboard?upgrade=pro"
            : "/dashboard",
          i18n.language
        )
      );
    } catch (nextError) {
      setError(formatAuthError(nextError));
    } finally {
      setLoadingProvider("");
    }
  }

  async function handleResetPassword() {
    if (!email || !firebaseReady || !auth) {
      setError("Escribe tu email para enviarte el reset.");
      return;
    }

    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Te he enviado el email para cambiar la contraseña.");
    } catch (nextError) {
      setError(formatAuthError(nextError));
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f6] px-5 py-8 text-black">
      <SEO
        title={t("login.seoTitle", "Iniciar sesión para crear links de descarga")}
        description={t("login.seoDesc", "Accede a Link My App para crear links de descarga, generar códigos QR y ver estadísticas de clics de tus apps.")}
        path="/login"
        robots="noindex,nofollow"
      />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[34px] border border-black/10 bg-white shadow-[0_28px_90px_rgba(0,0,0,0.08)] lg:grid-cols-[0.9fr_1fr]">
          <div className="hidden bg-black p-10 text-white lg:block">
            <Link to={localizePath("/", i18n.language)} className="inline-flex items-center gap-3">
              <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="h-10 w-10 object-contain" />
              <span className="text-xl font-black">Link My App</span>
            </Link>
            <div className="mt-28">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                {t("login.privatePanel", "Panel privado")}
              </p>
              <h1 className="mt-4 text-5xl font-black leading-none tracking-[-0.055em]">
                {t("login.heroTitle", "Crea links y mide clics")}
              </h1>
              <div className="mt-8 grid gap-3 text-sm font-bold text-white/72">
                <AuthBenefit icon={Link2} text={t("login.benefit1", "Crea links para iPhone, Android y web")} />
                <AuthBenefit icon={QrCode} text={t("login.benefit2", "Genera un QR automático para cada enlace")} />
                <AuthBenefit icon={BarChart3} text={t("login.benefit3", "Consulta estadísticas de clics y dispositivos")} />
              </div>
            </div>
          </div>

          <div className="p-5 md:p-10">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-black text-black/55 lg:hidden"
            >
              <Link2 size={16} /> Link My App
            </Link>

            <div className="mx-auto max-w-md">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">
                {t("login.authTag", "Autenticación")}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] md:text-5xl">
                {mode === "login" ? t("login.loginTitle", "Accede a tu cuenta") : t("login.registerTitle", "Crea tu cuenta")}
              </h2>

              {hasPendingDraft && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-900">
                  {t("login.pendingDraft", "Tu link de descarga está preparado. Inicia sesión y lo tendrás listo en el panel para crearlo.")}
                </div>
              )}

              <div className="mt-7 grid gap-3">
                <SocialButton
                  label={t("login.googleBtn", "Continuar con Google")}
                  iconType="google"
                  onClick={() => handleProvider("google")}
                  loading={loadingProvider === "google"}
                  disabled={!firebaseReady}
                />
              </div>

              <div className="my-7 flex items-center gap-4 text-xs font-black uppercase tracking-[0.18em] text-black/32">
                <span className="h-px flex-1 bg-black/10" />
                {t("login.emailSeparator", "Email")}
                <span className="h-px flex-1 bg-black/10" />
              </div>

              <form className="space-y-4" onSubmit={handleEmailSubmit}>
                {mode === "register" && (
                  <InputField
                    label={t("login.nameLabel", "Nombre")}
                    value={name}
                    onChange={setName}
                    placeholder={t("login.namePlaceholder", "Tu nombre")}
                  />
                )}
                <InputField
                  label={t("login.emailLabel", "Email")}
                  value={email}
                  onChange={setEmail}
                  placeholder="tu@email.com"
                  type="email"
                />
                <InputField
                  label={t("login.passwordLabel", "Contraseña")}
                  value={password}
                  onChange={setPassword}
                  placeholder={t("login.passwordPlaceholder", "Mínimo 6 caracteres")}
                  type="password"
                />

                {error && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {error}
                  </p>
                )}
                {message && (
                  <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                    {message}
                  </p>
                )}

                <FirebaseSetupNotice compact />

                <button
                  disabled={!firebaseReady || loadingProvider === "email"}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {loadingProvider === "email" ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : mode === "login" ? (
                    t("login.loginBtn", "Entrar")
                  ) : (
                    t("login.registerBtn", "Crear cuenta")
                  )}
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setError("");
                    setMessage("");
                  }}
                  className="text-black/60 transition hover:text-black"
                >
                  {mode === "login"
                    ? t("login.switchRegister", "¿No tienes cuenta? Regístrate gratis")
                    : t("login.switchLogin", "¿Ya tienes cuenta? Inicia sesión")}
                </button>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-black/60 transition hover:text-black"
                >
                  Recuperar contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function AuthBenefit({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <Icon size={17} className="text-white/52" />
      <span>{text}</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="h-[17px] w-[17px] shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.78-.04 1.94-.8 3.32-.66 1.48.06 2.68.73 3.36 1.83-2.92 1.62-2.4 5.37.5 6.48-.68 1.9-1.53 3.6-2.26 4.54zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.46-3.74 4.25z" />
    </svg>
  );
}

function SocialButton({ label, iconType, onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-45"
    >
      {loading ? <Loader2 className="animate-spin" size={17} /> : (iconType === "apple" ? <AppleIcon /> : <GoogleIcon />)}
      {label}
    </button>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname) || "en";

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to={localizePath("/login", language)} replace />;
  return children;
}

function FullScreenLoader() {
  return (
    <main className="grid min-h-screen place-items-center bg-white text-black">
      <div className="flex items-center gap-3 rounded-2xl border border-black/10 px-5 py-4 text-sm font-black">
        <Loader2 className="animate-spin" size={18} />
        Cargando
      </div>
    </main>
  );
}

function DashboardPage() {
  const { user, profile } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [counts, setCounts] = useState({});
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [error, setError] = useState("");
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [toast, showToast] = useToast();
  const isPro = true;
  const visibleProfile = profile ? { ...profile, plan: "free", planLabel: "Gratis" } : profile;


  
  useEffect(() => {
    if (!firebaseReady || !db || !user) return undefined;

    const linksQuery = query(ref(db, "links"), orderByChild("ownerId"), equalTo(user.uid));

    return onValue(
      linksQuery,
      (snapshot) => {
        const data = snapshot.val() || {};
        const nextLinks = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        setLinks(nextLinks);
        setLoadingLinks(false);
      },
      (nextError) => {
        setError(nextError.message);
        setLoadingLinks(false);
      }
    );
  }, [user]);

  useEffect(() => {
    if (!firebaseReady || !db || !user || links.length === 0) {
      setCounts({});
      return;
    }

    let cancelled = false;

    async function loadCounts() {
      const nextCounts = Object.fromEntries(
        links.map((item) => [item.id, { ...emptyStats, days: getLastSevenDays() }])
      );
      const eventsQuery = query(
        ref(db, "clickEvents"),
        orderByChild("ownerId"),
        equalTo(user.uid)
      );
      const snapshot = await get(eventsQuery);

      Object.values(snapshot.val() || {}).forEach((event) => {
        if (!nextCounts[event.linkId]) return;
        const destination = event.destination || "fallback";
        const source = event.source || "written";
        const eventDate = event.createdAt
          ? new Date(event.createdAt).toISOString().slice(0, 10)
          : "";
        const dayStats = nextCounts[event.linkId].days.find(
          (day) => day.key === eventDate
        );

        nextCounts[event.linkId].total += 1;
        if (destination in nextCounts[event.linkId]) {
          nextCounts[event.linkId][destination] += 1;
        }
        if (source === "qr") {
          nextCounts[event.linkId].qr += 1;
          if (destination === "ios") nextCounts[event.linkId].qr_ios += 1;
          else if (destination === "android") nextCounts[event.linkId].qr_android += 1;
          else nextCounts[event.linkId].qr_fallback += 1;
        } else {
          nextCounts[event.linkId].written += 1;
          if (destination === "ios") nextCounts[event.linkId].written_ios += 1;
          else if (destination === "android") nextCounts[event.linkId].written_android += 1;
          else nextCounts[event.linkId].written_fallback += 1;
        }
        if (dayStats && destination in dayStats) {
          dayStats[destination] += 1;
        }
      });

      Object.values(nextCounts).forEach((stats) => {
        stats.estimatedInstalls = estimateDownloads(stats);
        stats.days = stats.days.map((day) => ({
          ...day,
          estimatedInstalls: estimateDownloads(day),
        }));
      });

      if (!cancelled) setCounts(nextCounts);
    }

    loadCounts().catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [links, user]);

  async function copyToClipboard(value) {
    await navigator.clipboard.writeText(value);
    showToast("Copiado");
  }

  async function downloadQrImage(qrUrl, title) {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${slugFromInput(title) || "link-my-app"}-qr.png`;
      link.click();
      URL.revokeObjectURL(objectUrl);
      showToast("QR descargado");
    } catch {
      window.open(qrUrl, "_blank", "noopener,noreferrer");
    }
  }

  async function toggleActive(link) {
    await update(ref(db, `links/${link.id}`), {
      active: !link.active,
      updatedAt: serverTimestamp(),
    });
  }

  async function removeLink(link) {
    const confirmed = window.confirm(`Eliminar ${link.title}?`);
    if (!confirmed) return;
    await remove(ref(db, `links/${link.id}`));
  }

  async function handleSignOut() {
    await signOut(auth);
    navigate(localizePath("/", i18n.language));
  }

  const totalClicks = Object.values(counts).reduce(
    (sum, value) => sum + (value?.total || 0),
    0
  );
  const totalEstimatedDownloads = Object.values(counts).reduce(
    (sum, value) => sum + (value?.estimatedInstalls || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f7f6] text-black">
      <SEO {...{
    title: "Panel de links de descarga",
    description:
      "Panel privado para crear smart links, descargar códigos QR y revisar estadísticas de clics de tus apps.",
    path: "/dashboard",
    robots: "noindex,nofollow",
  }} />
      <DashboardHeader onSignOut={handleSignOut} />

      <section className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 px-5 pb-12 pt-28 md:px-8 lg:grid lg:grid-cols-[360px_1fr] lg:items-start">
        <aside className="contents lg:block lg:space-y-6">
          <div className="order-1 mb-6 lg:order-none lg:mb-0">
            <AccountPanel
              user={user}
              profile={visibleProfile}
              onOpenSettings={() => setShowAccountModal(true)}
              onOpenAdmin={() => setShowAdminModal(true)}
            />
          </div>

          <div id="crear-link" className="order-3 mb-6 rounded-[28px] border border-black/10 bg-white p-5 shadow-sm lg:order-none lg:mb-0">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white">
                <Plus size={18} />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">{t("dashboard.createTitle", "Crea Smartlink")}</h2>
              </div>
            </div>
            <LinkCreateForm
              compact
              loadDraft
              hasExistingLinks={links.length > 0}
              buttonLabel={t("dashboard.createButton", "Crea Smartlink")}
              onCreated={(slug) => {
                showToast(`Creado: ${slug}`);
              }}
            />
          </div>

          <div className="order-5 lg:order-none">
            <FeedbackPanel />
          </div>
        </aside>

        <section className="order-2 mb-6 min-w-0 space-y-6 lg:order-none lg:mb-0">
          <div className="rounded-[30px] border border-black/10 bg-white p-5 shadow-sm md:p-7">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
                  {t("dashboard.subtitle", "Tus links de descarga")}
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] md:text-5xl">
                  {t("dashboard.title", "Panel de enlaces")}
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
                <Stat label={t("dashboard.statLinks", "Links")} value={links.length} />
                <Stat
                  label={t("dashboard.statActive", "Activos")}
                  value={links.filter((item) => item.active).length}
                />
                <Stat
                  label={t("dashboard.statClicks", "Clics")}
                  value={totalClicks}
                />
                <Stat
                  label={t("dashboard.statDownloads", "Descargas")}
                  value={totalEstimatedDownloads}
                />
              </div>
            </div>
          </div>

          {/* Mobile-only CTA card that scrolls to the create-link form below. */}
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById("crear-link");
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                const firstInput = target.querySelector("input, textarea");
                if (firstInput) setTimeout(() => firstInput.focus({ preventScroll: true }), 400);
              }
            }}
            className="lg:hidden flex w-full items-center gap-4 rounded-[28px] border border-black/10 bg-white p-5 shadow-sm transition active:scale-[0.99]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-black text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
              <Plus size={20} />
            </span>
            <span className="flex flex-col items-start text-left">
              <span className="text-lg font-black tracking-tight">
                {t("dashboard.createTitle", "Crea Smartlink")}
              </span>
              <span className="text-[12px] font-medium text-black/55">
                {t("dashboard.createCtaSubtitle", "Toca para abrir el formulario y crear tu link")}
              </span>
            </span>
            <span className="ml-auto text-black/40">→</span>
          </button>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </p>
          )}

          <div className="grid gap-4">
            {loadingLinks && (
              <div className="rounded-[28px] border border-black/10 bg-white p-6 text-sm font-black text-black/50">
                {t("dashboard.loadingLinks", "Cargando enlaces...")}
              </div>
            )}

            {!loadingLinks && links.length === 0 && (
              <div className="rounded-[28px] border border-black/10 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
                  <Link2 size={22} />
                </div>
                <h2 className="mt-5 text-2xl font-black tracking-tight">
                  {t("dashboard.noLinksTitle", "Todavía no tienes links")}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-black/50">
                  {t("dashboard.noLinksDesc", "Crea el primero desde el formulario y aparecerá aquí con su URL, QR y estadísticas de clics.")}
                </p>
                <a href="#crear-link" className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-black px-6 text-sm font-black text-white transition hover:-translate-y-0.5 lg:hidden">
                  {t("dashboard.createFirstLink", "Crear mi primer link")}
                </a>
              </div>
            )}

            {links.map((item, index) => {
              const defaultLinkUrl = publicLinkForSlug(publicBaseUrl, item.slug);
              const linkUrl = publicUrlForCustomOrSlug(item.slug, item.customUrl);
              const qrLinkUrl = `${linkUrl}?src=qr`;
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                qrLinkUrl
              )}`;
              const linkStats = counts[item.id] || emptyStats;

              return (
                <React.Fragment key={item.id}>
                <article
                  className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="grid gap-5 lg:grid-cols-[1fr_120px]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="truncate text-2xl font-black tracking-tight">
                          {item.title}
                        </h2>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            item.active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {item.active ? t("dashboard.active", "Activo") : t("dashboard.paused", "Pausado")}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(linkUrl)}
                        className="mt-2 break-all text-left text-sm font-black text-blue-600 transition hover:text-blue-800"
                      >
                        {linkUrl}
                      </button>

                      <div className="mt-5 grid gap-3 md:grid-cols-3">
                        <Destination label="iOS" url={item.iosUrl} />
                        <Destination label="Android" url={item.androidUrl} />
                        <Destination label={t("dashboard.others", "Otros")} url={item.fallbackUrl} />
                      </div>

                      <div className="mt-5 grid gap-4">
                        <div className="rounded-2xl border border-black/10 bg-[#f7f7f6] p-4 text-center">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-black/50">{t("dashboard.totalClicks", "Clics Totales")}</p>
                          <p className="text-3xl font-black">{linkStats.total}</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <p className="mb-3 text-center text-sm font-black">{t("dashboard.clicksOnLink", "Clics en el enlace")} ({linkStats.written})</p>
                            <div className="flex justify-around text-center border-b border-black/5 pb-4 mb-4">
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Android</p><p className="font-bold">{linkStats.written_android || 0}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">iOS</p><p className="font-bold">{linkStats.written_ios || 0}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Otros</p><p className="font-bold">{linkStats.written_fallback || 0}</p></div>
                            </div>
                            <div className="mb-3 flex items-center justify-center gap-2">
                              <p className="text-xs font-black">
                                {t("dashboard.downloadsLabel", "Descargas")} ({Math.round((linkStats.written_android || 0) * 0.24) + Math.round((linkStats.written_ios || 0) * 0.22) + Math.round((linkStats.written_fallback || 0) * 0.01)})
                              </p>
                              <button
                                type="button"
                                className="group relative grid h-[14px] w-[14px] place-items-center rounded-full border border-black/30 text-black/50 transition hover:text-black"
                              >
                                <Info size={9} />
                                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 opacity-0 transition group-hover:opacity-100">
                                  <div className="rounded-xl bg-black px-3 py-2 text-center text-[11px] font-medium leading-tight text-white shadow-xl">
                                    {t("dashboard.estimateNotice", "Estimación basada en datos de conversión promedio del sector. Analizamos el origen geográfico, dispositivo y patrones temporales de cada clic para ofrecer una proyección realista del volumen de instalaciones esperadas.")}
                                  </div>
                                  <div className="mx-auto h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black" />
                                </div>
                              </button>
                            </div>
                            <div className="flex justify-around text-center">
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Google Play</p><p className="font-bold">{Math.round((linkStats.written_android || 0) * 0.24)}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">App Store</p><p className="font-bold">{Math.round((linkStats.written_ios || 0) * 0.22)}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Otros</p><p className="font-bold">{Math.round((linkStats.written_fallback || 0) * 0.01)}</p></div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <p className="mb-3 text-center text-sm font-black">{t("dashboard.clicksOnQR", "Clics en el QR")} ({linkStats.qr})</p>
                            <div className="flex justify-around text-center border-b border-black/5 pb-4 mb-4">
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Android</p><p className="font-bold">{linkStats.qr_android || 0}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">iOS</p><p className="font-bold">{linkStats.qr_ios || 0}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Otros</p><p className="font-bold">{linkStats.qr_fallback || 0}</p></div>
                            </div>
                            <div className="mb-3 flex items-center justify-center gap-2">
                              <p className="text-xs font-black">
                                {t("dashboard.downloadsLabel", "Descargas")} ({Math.round((linkStats.qr_android || 0) * 0.24) + Math.round((linkStats.qr_ios || 0) * 0.22) + Math.round((linkStats.qr_fallback || 0) * 0.01)})
                              </p>
                              <button
                                type="button"
                                className="group relative grid h-[14px] w-[14px] place-items-center rounded-full border border-black/30 text-black/50 transition hover:text-black"
                              >
                                <Info size={9} />
                                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 opacity-0 transition group-hover:opacity-100">
                                  <div className="rounded-xl bg-black px-3 py-2 text-center text-[11px] font-medium leading-tight text-white shadow-xl">
                                    {t("dashboard.estimateNotice", "Estimación basada en datos de conversión promedio del sector. Analizamos el origen geográfico, dispositivo y patrones temporales de cada clic para ofrecer una proyección realista del volumen de instalaciones esperadas.")}
                                  </div>
                                  <div className="mx-auto h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black" />
                                </div>
                              </button>
                            </div>
                            <div className="flex justify-around text-center">
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Google Play</p><p className="font-bold">{Math.round((linkStats.qr_android || 0) * 0.24)}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">App Store</p><p className="font-bold">{Math.round((linkStats.qr_ios || 0) * 0.22)}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">{t("dashboard.others", "Otros")}</p><p className="font-bold">{Math.round((linkStats.qr_fallback || 0) * 0.01)}</p></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <ChannelBadge item={item} />
                        <ActionButton
                          icon={Copy}
                          label={t("dashboard.copy", "Copiar")}
                          onClick={() => copyToClipboard(linkUrl)}
                        />
                        <ActionButton
                          icon={ExternalLink}
                          label={t("dashboard.open", "Abrir")}
                          onClick={() => window.open(linkUrl, "_blank", "noopener,noreferrer")}
                        />
                        <ActionButton
                          icon={Check}
                          label={item.active ? t("dashboard.pause", "Pausar") : t("dashboard.activate", "Activar")}
                          onClick={() => toggleActive(item)}
                        />
                        <ActionButton
                          icon={Trash2}
                          label={t("dashboard.delete", "Eliminar")}
                          danger
                          onClick={() => removeLink(item)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 lg:items-end">
                      <img
                        src={qrUrl}
                        alt={`QR de ${item.title}`}
                        className="h-32 w-32 rounded-2xl border border-black/10 bg-white p-2 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => downloadQrImage(qrUrl, item.title)}
                        className="flex w-32 items-center justify-center gap-2 rounded-xl bg-[#f7f7f6] py-2 text-[10px] font-black uppercase tracking-wider text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
                      >
                        <Download size={14} /> {t("dashboard.downloadQR", "Descargar QR")}
                      </button>
                    </div>
                  </div>
                </article>
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </section>

      {showAccountModal && (
        <AccountDetailsModal
          user={user}
          profile={visibleProfile}
          onClose={() => setShowAccountModal(false)}
          onDeleted={() => navigate(localizePath("/", i18n.language))}
        />
      )}

      {showAdminModal && (
        <AdminPanelModal onClose={() => setShowAdminModal(false)} />
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-black px-5 py-3 text-sm font-black text-white shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
}

function DashboardHeader({ onSignOut }) {
  const { t, i18n } = useTranslation();
  const homePath = localizePath("/", i18n.language);

  return (
    <header className="fixed left-1/2 top-4 z-40 flex w-[calc(100vw-16px)] max-w-[1360px] -translate-x-1/2 items-center justify-between rounded-[24px] border border-black/10 bg-white/70 px-4 py-3 shadow-[0_3px_22px_rgba(0,0,0,0.10)] backdrop-blur-xl">
      <Link to={homePath} className="flex items-center gap-2">
        <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="h-9 w-9 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
        <span className="text-lg font-black">Link My App</span>
      </Link>
      <nav className="flex items-center gap-2">
        <Link
          to={homePath}
          className="hidden rounded-2xl px-4 py-2 text-sm font-black text-black/55 transition hover:bg-black/5 hover:text-black sm:block"
        >
          {t("nav.home", "Inicio")}
        </Link>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex items-center gap-2 rounded-2xl bg-black px-4 py-2 text-sm font-black text-white"
        >
          <LogOut size={16} />
          {t("nav.logout", "Salir")}
        </button>
      </nav>
    </header>
  );
}

function AccountPanel({ user, profile, onOpenSettings, onOpenAdmin }) {
  const { t } = useTranslation();
  const displayName = profile?.displayName || user.displayName || user.email;
  const planLabel = t("dashboard.freePlan", "Gratis");

  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={displayName || "Cuenta"}
            className="h-14 w-14 rounded-2xl object-cover"
          />
        ) : (
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
            <User size={23} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">
            {t("dashboard.linksPanelTag", "Panel de links")}
          </p>
          <h2 className="truncate text-xl font-black">{displayName}</h2>
          <div className="mt-1 flex min-w-0 items-center gap-2">
            <p className="truncate text-sm font-semibold text-black/45">{user.email}</p>
            <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-black text-black/55">
              {planLabel}
            </span>
          </div>
        </div>
        {user.email === "info@skeilapps.com" && (
          <button
            type="button"
            onClick={onOpenAdmin}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-black/10 bg-[#f7f7f6] text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
            aria-label="Administración"
          >
            <ShieldCheck size={18} />
          </button>
        )}
        <button
          type="button"
          onClick={onOpenSettings}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-black/10 bg-[#f7f7f6] text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
          aria-label={t("dashboard.openSettings", "Abrir ajustes de cuenta")}
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}

function AccountDetailsModal({ user, profile, onDeleted, onClose }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState("");
  const displayName = profile?.displayName || user.displayName || user.email || t("dashboard.userDefault", "Usuario");
  const [name, setName] = useState(displayName);
  const planLabel = t("dashboard.freePlan", "Gratis");
  const currentLanguage = normalizeLanguage(i18n.language);

  function changeLanguage(nextLanguage) {
    const normalizedLanguage = normalizeLanguage(nextLanguage);
    setUserChosenLanguage(normalizedLanguage);
    i18n.changeLanguage(normalizedLanguage);
    const newPath = switchLanguagePath(`${location.pathname}${location.search}`, normalizedLanguage);
    window.location.href = newPath;
  }

  async function saveProfile() {
    const nextName = name.trim();
    if (!nextName || savingProfile) return;

    setError("");
    setSavingProfile(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: nextName });
      }
      await update(ref(db, `users/${user.uid}`), {
        displayName: nextName,
        updatedAt: serverTimestamp(),
      });
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      t("dashboard.deleteConfirm", "Vas a borrar tu cuenta, tus links y tus estadísticas. Esta acción no se puede deshacer.")
    );
    if (!confirmed) return;

    setError("");
    setDeleting(true);
    try {
      const linksSnapshot = await get(
        query(ref(db, "links"), orderByChild("ownerId"), equalTo(user.uid))
      );
      const removals = Object.keys(linksSnapshot.val() || {}).map((linkId) =>
        remove(ref(db, `links/${linkId}`))
      );
      const eventsSnapshot = await get(
        query(ref(db, "clickEvents"), orderByChild("ownerId"), equalTo(user.uid))
      );
      const eventRemovals = Object.keys(eventsSnapshot.val() || {}).map((eventId) =>
        remove(ref(db, `clickEvents/${eventId}`))
      );
      await Promise.all([...removals, ...eventRemovals]);
      await remove(ref(db, `users/${user.uid}`));
      await deleteUser(auth.currentUser);
      onDeleted?.();
    } catch (nextError) {
      const message =
        nextError?.code === "auth/requires-recent-login"
          ? "Por seguridad, vuelve a iniciar sesión y después borra la cuenta."
          : nextError.message;
      setError(message);
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/35 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[34px] border border-black/10 bg-white p-5 text-black shadow-[0_28px_100px_rgba(0,0,0,0.25)] md:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black text-white">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">
                {t("dashboard.accountDetailsTag", "Detalles de cuenta")}
              </p>
              <h2 className="text-2xl font-black tracking-tight">{t("dashboard.accountTitle", "Cuenta")}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-[#f7f7f6] text-black transition hover:bg-black hover:text-white"
            aria-label={t("dashboard.closeSettings", "Cerrar ajustes")}
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <label className="block rounded-2xl border border-black/10 bg-[#f7f7f6] px-4 py-3">
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">
              {t("dashboard.nameLabel", "Nombre")}
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-black text-black/75 outline-none"
            />
          </label>
          <AccountRow label="Email" value={user.email || t("dashboard.noEmail", "Sin email")} />
          <AccountRow label={t("dashboard.currentPlan", "Plan actual")} value={planLabel} />
          <label className="block rounded-2xl border border-black/10 bg-[#f7f7f6] px-4 py-3">
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">
              {t("dashboard.settingsLanguage")}
            </span>
            <select
              value={currentLanguage}
              onChange={(event) => changeLanguage(event.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-black text-black/75 outline-none"
            >
              {languageOptions.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={saveProfile}
            disabled={savingProfile}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {savingProfile ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
            {t("dashboard.saveChanges", "Guardar cambios")}
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700/70">
            {t("dashboard.dangerZone", "Zona peligrosa")}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-red-900/70">
            {t("dashboard.deleteWarning", "Si borras la cuenta se eliminan tus smartlinks, estadísticas y datos del panel.")}
          </p>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {deleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={15} />}
            Borrar cuenta
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}

function AdminPanelModal({ onClose }) {
  const { i18n } = useTranslation();
  const [promoCodes, setPromoCodes] = useState({});
  const [newPromoCode, setNewPromoCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promoRef = ref(db, "settings/promoCodes");

    const unsubPromo = onValue(promoRef, (snap) => {
      if (snap.exists()) {
        setPromoCodes(snap.val());
      } else {
        setPromoCodes({});
      }
      setLoading(false);
    });

    return () => {
      unsubPromo();
    };
  }, []);

  async function handleAddPromo() {
    const code = newPromoCode.trim().toUpperCase();
    if (!code) return;
    setSaving(true);
    await set(ref(db, `settings/promoCodes/${code}`), {
      active: true,
      createdAt: serverTimestamp(),
    });
    setNewPromoCode("");
    setSaving(false);
  }

  async function handleDeletePromo(code) {
    if (confirm(`¿Eliminar código ${code}?`)) {
      await set(ref(db, `settings/promoCodes/${code}`), null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[34px] border border-black/10 bg-white p-6 text-black shadow-xl md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Administración</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-[#f7f7f6] text-black transition hover:bg-black hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div className="mt-8 flex justify-center"><Loader2 className="animate-spin text-black" size={24} /></div>
        ) : (
          <div className="mt-6 grid gap-6">
            <div className="rounded-2xl border border-black/10 bg-[#f7f7f6] p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.1em] text-black/40">Códigos Promocionales</h3>
              <div className="mt-3 flex gap-2">
                <input
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value)}
                  placeholder="NUEVO_CODIGO"
                  className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm font-bold text-black uppercase"
                />
                <button
                  type="button"
                  onClick={handleAddPromo}
                  disabled={saving || !newPromoCode.trim()}
                  className="flex h-10 px-4 items-center justify-center gap-2 rounded-xl bg-black text-xs font-black text-white disabled:opacity-50"
                >
                  Añadir
                </button>
              </div>
              <div className="mt-4 grid gap-2">
                {Object.keys(promoCodes).length === 0 ? (
                  <p className="text-xs text-black/40 font-semibold text-center py-2">No hay códigos activos.</p>
                ) : (
                  Object.keys(promoCodes).map((code) => (
                    <div key={code} className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3">
                      <span className="text-sm font-black uppercase text-black">{code}</span>
                      <button
                        onClick={() => handleDeletePromo(code)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function AccountRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f7f7f6] px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-black text-black/75">{value}</p>
    </div>
  );
}

function FeedbackPanel() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFeedbackSubmit(event) {
    event.preventDefault();
    if (!feedback.trim() || loading) return;

    setLoading(true);
    try {
      await fetch("https://skeilapps.com/wp-json/skeilink/v1/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: feedback.trim(), email: user?.email || "Anónimo" }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFeedback("");
      setSent(true);
      window.setTimeout(() => setSent(false), 3000);
    }
  }

  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-black">{t("dashboard.ratePlatforms", "Valóranos en Trustpilot")}</p>
      <div className="mt-3 grid grid-cols-1 gap-2">
        <ReviewButton imgSrc="https://skeilapps.com/wp-content/uploads/2026/05/trsutpiklfds-Photoroom.png" label="Trustpilot" href="https://es.trustpilot.com/review/link-my.app" target="_blank" rel="noopener noreferrer" />
      </div>
      <p className="mt-6 mb-3 text-sm font-black text-black">{t("dashboard.leaveSuggestion", "Déjanos cualquier sugerencia")}</p>
      <form className="space-y-2" onSubmit={handleFeedbackSubmit}>
        <label className="block">
          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            rows={3}
            placeholder={t("dashboard.suggestionPlaceholder", "Algo que funcione mal o que mejorarías...")}
            className="w-full resize-none rounded-2xl border border-black/10 bg-[#f7f7f6] px-3 py-3 text-sm font-semibold outline-none placeholder:text-black/30 focus:border-black/30"
          />
        </label>
        <button
          disabled={loading}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : t("dashboard.sendFeedback", "Enviar comentario")}
        </button>
        {sent && (
          <p className="text-center text-xs font-black text-emerald-700">
            Gracias, comentario guardado para revisar.
          </p>
        )}
      </form>
    </div>
  );
}

function ReviewButton({ imgSrc, label, href = "#", ...props }) {
  return (
    <a
      href={href}
      {...props}
      className="flex items-center justify-center rounded-2xl border border-black/10 bg-[#f7f7f6] px-2 py-4 transition hover:-translate-y-0.5"
    >
      <img src={imgSrc} alt={label} className="h-20 w-auto object-contain mix-blend-multiply" />
    </a>
  );
}

function EstimatedDownloadsInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 rounded-2xl bg-[#f7f7f6] px-4 py-3">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 text-left text-xs font-black uppercase tracking-[0.14em] text-black/45 transition hover:text-black"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full border border-black/20 text-black">
          <Info size={13} />
        </span>
        Cómo calculamos las descargas
      </button>
      {open && (
        <p className="mt-2 text-sm font-medium leading-6 text-black/55">
          Son descargas estimadas, no verificadas por SDK. Calculamos un número
          entero aplicando una conversión media: App Store 22%, Google Play 24% y
          escritorio u otros dispositivos 1%. El análisis puede apoyarse en
          señales como IP, país, hora, fuente del clic y repetición para hacer la
          estimación más realista cuando esos datos estén disponibles.
        </p>
      )}
    </div>
  );
}

function AnalyticsDetails({ stats }) {
  const [open, setOpen] = useState(false);
  const days = stats?.days?.length ? stats.days : getLastSevenDays();
  const maxValue = Math.max(
    1,
    ...days.flatMap((day) => [
      day.ios || 0,
      day.android || 0,
      day.fallback || 0,
      day.estimatedInstalls || 0,
    ])
  );

  function pointsFor(key) {
    return days
      .map((day, index) => {
        const x = 18 + index * (264 / Math.max(days.length - 1, 1));
        const y = 118 - ((day[key] || 0) / maxValue) * 92;
        return `${x},${y}`;
      })
      .join(" ");
  }

  return (
    <div className="lg:col-span-2">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex h-11 w-full items-center justify-between rounded-2xl border border-black/10 bg-[#f7f7f6] px-4 text-sm font-black text-black/70 transition hover:bg-black hover:text-white"
      >
        <span className="inline-flex items-center gap-2">
          <BarChart3 size={16} />
          Ver gráfica de clics y descargas
        </span>
        <ChevronDown size={17} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-4 rounded-[24px] border border-black/10 bg-white p-4">
          <div className="flex flex-wrap gap-3 text-xs font-black text-black/55">
            <ChartLegend color="#2563eb" label="App Store" />
            <ChartLegend color="#16a34a" label="Google Play" />
            <ChartLegend color="#71717a" label="Otros" />
            <ChartLegend color="#000000" label="Descargas estimadas" />
          </div>

          <svg className="mt-4 h-40 w-full" viewBox="0 0 300 140" role="img" aria-label="Gráfica de estadísticas">
            <path d="M18 118 H286" stroke="#e5e7eb" strokeWidth="2" />
            <path d="M18 26 H286" stroke="#f1f5f9" strokeWidth="1" />
            <path d="M18 72 H286" stroke="#f1f5f9" strokeWidth="1" />
            <polyline points={pointsFor("ios")} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={pointsFor("android")} fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={pointsFor("fallback")} fill="none" stroke="#71717a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={pointsFor("estimatedInstalls")} fill="none" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {days.map((day, index) => (
              <text
                key={day.key}
                x={18 + index * (264 / Math.max(days.length - 1, 1))}
                y="136"
                textAnchor="middle"
                className="fill-black/40 text-[8px] font-black uppercase"
              >
                {day.label}
              </text>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}

function ChartLegend({ color, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function ProfilePanel({ user, profile, profileUrl, onCopy }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.displayName || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(profile?.displayName || "");
    setBio(profile?.bio || "");
  }, [profile]);

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name.trim() });
      }
      await update(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        displayName: name.trim() || user.email?.split("@")[0] || "Usuario",
        email: user.email || "",
        photoURL: user.photoURL || "",
        bio: bio.trim(),
        public: true,
        updatedAt: serverTimestamp(),
      });
      setEditing(false);
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={profile?.displayName || user.email || "Perfil"}
            className="h-14 w-14 rounded-2xl object-cover"
          />
        ) : (
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
            <User size={23} />
          </div>
        )}
        <div className="min-w-0">
          <h2 className="truncate text-xl font-black">
            {profile?.displayName || user.displayName || user.email}
          </h2>
          <p className="truncate text-sm font-semibold text-black/45">{user.email}</p>
        </div>
      </div>

      {!editing ? (
        <>
          <p className="mt-5 text-sm font-medium leading-6 text-black/55">
            {profile?.bio || "Mis smart links de Link My App."}
          </p>
          <div className="mt-5 rounded-2xl bg-[#f7f7f6] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
              Smart link público
            </p>
            <button
              type="button"
              onClick={onCopy}
              className="mt-2 break-all text-left text-sm font-black text-blue-600"
            >
              {profileUrl}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="h-11 rounded-2xl border border-black/10 text-sm font-black transition hover:bg-black/5"
            >
              Editar perfil
            </button>
            <Link
              to={`/perfil/${user.uid}`}
              className="grid h-11 place-items-center rounded-2xl bg-black text-sm font-black text-white"
            >
              Ver links
            </Link>
          </div>
        </>
      ) : (
        <form className="mt-5 space-y-4" onSubmit={saveProfile}>
          <InputField
            label="Nombre público"
            value={name}
            onChange={setName}
            placeholder="Tu nombre"
          />
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-black/75">Bio</span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              className="w-full resize-none rounded-2xl border border-black/12 bg-[#f8f8f6] px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-black/28 focus:border-black/35 focus:bg-white"
            />
          </label>
          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </p>
          )}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="h-11 rounded-2xl border border-black/10 text-sm font-black"
            >
              Cancelar
            </button>
            <button className="grid h-11 place-items-center rounded-2xl bg-black text-sm font-black text-white">
              {saving ? <Loader2 className="animate-spin" size={18} /> : "Guardar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f7f7f6] px-4 py-3">
      <div className="text-xl font-black">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-[0.15em] text-black/35">
        {label}
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f7f7f6] px-3 py-2">
      <div className="text-lg font-black">{value}</div>
      <div className="text-[9px] font-black uppercase tracking-[0.13em] text-black/35">
        {label}
      </div>
    </div>
  );
}

function Destination({ label, url }) {
  return (
    <div className="min-w-0 rounded-2xl border border-black/10 bg-[#f7f7f6] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/35">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-bold text-black/65">{url}</p>
    </div>
  );
}

/**
 * Detects the social channel of a link either from the explicit `channel`
 * field saved in Firebase, or by looking at the slug suffix as fallback.
 * Older links don't have the channel field set, so the suffix lookup keeps
 * them compatible without manual cleanup.
 */
function detectLinkChannel(item) {
  if (!item) return null;
  if (item.channel) return item.channel;
  const slug = item.slug || "";
  const match = LINK_CHANNELS.find((c) => slug.endsWith(`-${c.suffix}`));
  return match ? match.id : null;
}

/**
 * Compact badge that shows the social network this link belongs to.
 * Rendered next to the link's action buttons (Copy, Open, ...). Renders
 * nothing for links that were not created from a channel preset.
 */
function ChannelBadge({ item }) {
  const channelId = detectLinkChannel(item);
  if (!channelId) return null;
  const channel = LINK_CHANNELS.find((c) => c.id === channelId);
  if (!channel) return null;
  const Glyph = socialGlyphs[channel.id];
  return (
    <span
      className="inline-flex h-10 items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 text-xs font-black uppercase tracking-[0.14em] text-black/70"
      title={channel.label}
      aria-label={channel.label}
    >
      {Glyph && <Glyph width={16} height={16} style={{ color: channel.color }} />}
      <span className="hidden sm:inline">{channel.label}</span>
    </span>
  );
}

function ActionButton({ icon: Icon, label, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-2xl border px-3 text-sm font-black transition hover:-translate-y-0.5 ${
        danger
          ? "border-red-100 bg-red-50 text-red-700"
          : "border-black/10 bg-white text-black/70 hover:text-black"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

function ProfilePage() {
  const { uid } = useParams();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseReady || !db || !uid) {
      setLoading(false);
      return undefined;
    }

    let unsubscribeLinks = () => {};

    async function loadProfile() {
      const profileSnapshot = await get(ref(db, `users/${uid}`));
      setProfile(profileSnapshot.exists() ? profileSnapshot.val() : null);

      const linksQuery = query(ref(db, "links"), orderByChild("ownerId"), equalTo(uid));

      unsubscribeLinks = onValue(linksQuery, (snapshot) => {
        const data = snapshot.val() || {};
        const nextLinks = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .filter((item) => item.active)
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        setLinks(nextLinks);
        setLoading(false);
      });
    }

    loadProfile().catch(() => setLoading(false));
    return () => unsubscribeLinks();
  }, [uid]);

  if (loading) return <FullScreenLoader />;

  return (
    <main className="min-h-screen bg-[#f7f7f6] px-5 py-8 text-black">
      <div className="mx-auto w-full max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-black/50">
          <Link2 size={16} /> Link My App
        </Link>

        <section className="mt-8 rounded-[34px] border border-black/10 bg-white p-6 text-center shadow-sm md:p-10">
          {!profile ? (
            <>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
                <User size={22} />
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-tight">
                Perfil no encontrado
              </h1>
            </>
          ) : (
            <>
              {profile.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt={profile.displayName}
                  className="mx-auto h-20 w-20 rounded-3xl object-cover"
                />
              ) : (
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-black text-white">
                  <User size={30} />
                </div>
              )}
              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em]">
                {profile.displayName}
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-black/55">
                {profile.bio}
              </p>
            </>
          )}
        </section>

        <section className="mt-5 grid gap-3">
          {links.map((item) => {
            const url = publicLinkForSlug(publicBaseUrl, item.slug);
            return (
              <a
                key={item.id}
                href={url}
                className="flex items-center justify-between gap-4 rounded-[24px] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-black">{item.title}</h2>
                  <p className="mt-1 truncate text-sm font-bold text-black/45">
                    {url}
                  </p>
                </div>
                <ArrowRight className="shrink-0 text-black/40" size={20} />
              </a>
            );
          })}

          {profile && links.length === 0 && (
            <div className="rounded-[24px] border border-black/10 bg-white p-6 text-center text-sm font-bold text-black/45">
              {t("publicProfile.noLinks", "Este perfil todavía no tiene links activos.")}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function RedirectPage() {
  const { slug } = useParams();
  const didRun = useRef(false);
  const [status, setStatus] = useState("Cargando...");
  const [targetUrl, setTargetUrl] = useState("");
  const [showWatermark, setShowWatermark] = useState(true);


  
useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (!firebaseReady || !db || !slug) {
      setStatus("Firebase no está configurado.");
      return;
    }

    async function redirect() {
      const snapshot = await get(
        query(ref(db, "links"), orderByChild("slug"), equalTo(slug))
      );
      const data = snapshot.val() || {};
      const activeEntry = Object.entries(data).find(([, item]) => item.active);

      if (!activeEntry) {
        setStatus("Este enlace no existe o está pausado.");
        return;
      }

      const [linkId, link] = activeEntry;
      const ownerSnapshot = await get(ref(db, `users/${link.ownerId}`)).catch(() => null);
      const ownerPlan = ownerSnapshot?.exists() ? ownerSnapshot.val()?.plan : "free";
      setShowWatermark(ownerPlan !== "pro");
      const destination = detectDestination(navigator.userAgent);
      const source = normalizeClickSource(
        new URLSearchParams(window.location.search).get("src") ||
          new URLSearchParams(window.location.search).get("source") ||
          "",
        document.referrer
      );
      const nextTarget =
        destination === "ios"
          ? link.iosUrl
          : destination === "android"
            ? link.androidUrl
            : link.fallbackUrl;

      setTargetUrl(nextTarget);
      setStatus("Cargando...");

      const eventRef = push(ref(db, "clickEvents"));
      await set(eventRef, {
        linkId,
        ownerId: link.ownerId,
        ownerLinkKey: `${link.ownerId}_${linkId}`,
        slug: link.slug,
        destination,
        source: source === "qr" ? "qr" : "written",
        userAgent: navigator.userAgent.slice(0, 300),
        createdAt: serverTimestamp(),
      }).catch(console.error);

      window.location.replace(nextTarget);
    }

    redirect().catch((nextError) => setStatus(nextError.message));
  }, [slug]);

  return (
    <main className="grid min-h-screen place-items-center bg-white px-5 text-black">
      <SEO {...{
    title: `Redirigiendo a la tienda correcta`,
    description:
      "Smart link de descarga que envía al usuario a App Store, Google Play o al destino alternativo configurado.",
    path: slug ? `/${slug}` : "/r",
    robots: "noindex,follow",
  }} />
      <div className="w-full max-w-md">
        <div className="rounded-[30px] border border-black/10 bg-white p-7 text-center shadow-[0_22px_70px_rgba(0,0,0,0.07)]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
            <Loader2 className="animate-spin" size={24} />
          </div>
          <h1 className="mt-5 text-2xl font-black tracking-tight">{status}</h1>
          {targetUrl && (
            <a
              href={targetUrl}
              className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-600"
            >
              Abrir destino <ExternalLink size={15} />
            </a>
          )}
        </div>
        {showWatermark && (
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-black text-black shadow-sm">
              <img src={brandLogoUrl} alt="" className="h-5 w-5 object-contain" />
              <span>Powered by Link My App</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const legalUpdatedAt = "24 de marzo de 2026";

export function LegalNavbar() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  return (
    <nav className="fixed left-1/2 top-4 z-[9999] w-[calc(100vw-16px)] max-w-[930px] -translate-x-1/2 rounded-[24px] border border-black/10 bg-white/55 px-3 py-2 shadow-[inset_0_0_14px_rgba(255,255,255,0.85),0_3px_22px_rgba(0,0,0,0.10)] backdrop-blur-xl md:top-6 md:rounded-[30px] md:px-5 md:py-3 lg:px-7">
      <div className="flex items-center justify-between gap-3">
        <Link to={localizePath("/", language)} className="flex shrink-0 items-center gap-2 transition hover:opacity-80">
            <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="h-8 w-8 md:h-9 md:w-9 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
          <span className="text-[18px] font-bold tracking-tight text-black md:text-[22px]">
            Link My App
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          <Link to={localizePath("/", language)} className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55">{t("nav.home", "Inicio")}</Link>
          <Link to={localizePath("/what-we-do", language)} className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55">{t("nav.how", "Qué hacemos")}</Link>
          <Link to={localizePath("/faqs", language)} className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55">{t("nav.faqs", "Faqs")}</Link>
          <Link to={localizePath("/pricing", language)} className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55">{t("nav.price", "Gratis")}</Link>
        </div>

        <Link
          to={localizePath("/login", language)}
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#353535_0%,#0a0a0a_100%)] px-3 py-2.5 text-sm font-bold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_15px_rgba(0,0,0,0.32)] transition hover:-translate-y-0.5 md:rounded-[22px] md:px-4 md:py-3.5 md:text-base"
        >
          {t("nav.login", "Iniciar sesión")}
        </Link>
      </div>
    </nav>
  );
}

function LegalPage({ type }) {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const legalPagesByLanguage = { en: legalPagesEn, es: legalPagesEs, fr: legalPagesFr };
  const legalTabsByLanguage = { en: legalTabsEn, es: legalTabsEs, fr: legalTabsFr };
  const legalUiByLanguage = {
    en: {
      pageLabel: "Legal page",
      updated: "Last updated:",
      responsible: "Controller",
      titleSuffix: "from",
    },
    es: {
      pageLabel: "Página legal",
      updated: "Última actualización:",
      responsible: "Responsable",
      titleSuffix: "de",
    },
    fr: {
      pageLabel: "Page légale",
      updated: "Dernière mise à jour :",
      responsible: "Responsable",
      titleSuffix: "de",
    },
  };
  const legalPages = legalPagesByLanguage[language] || legalPagesEn;
  const legalTabs = legalTabsByLanguage[language] || legalTabsEn;
  const legalUi = legalUiByLanguage[language] || legalUiByLanguage.en;
  const page = legalPages[type] || legalPages.terms;
  const Icon = page.icon;
  const legalSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${page.title} | ${brandName}`,
      url: `${siteUrl}${localizePath(page.path, language)}`,
      inLanguage: language,
      isPartOf: {
        "@type": "WebSite",
        name: brandName,
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Skeilapps SL",
      },
    }),
    [page, language]
  );

  return (
    <main className="relative min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <SEO
        title={`${page.title} ${legalUi.titleSuffix} ${brandName}`}
        description={page.intro}
        path={page.path}
        keywords={`${page.shortTitle.toLowerCase()} ${brandName}, legal Link My App, smart links apps, RGPD apps`}
        schema={legalSchema}
      />
      <LegalNavbar />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />

      <section className="relative z-10 mx-auto w-full max-w-[1220px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="flex flex-wrap gap-2">
          {legalTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = tab.key === type;
            return (
              <Link
                key={tab.key}
                to={localizePath(legalPages[tab.key].path, language)}
                className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-xs font-black transition ${
                  isActive
                    ? "border-black bg-black text-white shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
                    : "border-black/10 bg-white/80 text-black/48 hover:text-black"
                }`}
              >
                <TabIcon size={14} />
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-black/40 shadow-sm">
          <Icon size={14} /> {legalUi.pageLabel}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-[clamp(48px,9vw,96px)] font-black leading-[0.82] tracking-[-0.075em] text-black">
              {page.title}
            </h1>
            <p className="mt-7 text-base font-medium leading-8 text-black/52 md:text-lg">
              {legalUi.updated} <span className="font-black text-black/72">{legalUpdatedAt}</span>
            </p>
          </div>

          <aside className="rounded-[30px] border border-black/10 bg-white/86 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.07)] backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">
              {legalUi.responsible}
            </p>
            <h2 className="mt-3 text-xl font-black">Skeilapps SL</h2>
            <p className="mt-3 text-sm font-bold text-black/45">CIF: BXXXXX</p>
            <a
              href="mailto:info@skeilapps.com"
              className="mt-2 block text-sm font-black text-black transition hover:text-black/60"
            >
              info@skeilapps.com
            </a>
          </aside>
        </div>

        <div className="mt-10 rounded-[30px] border border-black/10 bg-white/86 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-8">
          <p className="text-base font-medium leading-8 text-black/58">
            {page.intro}
          </p>
        </div>

        <div className="mt-5 grid gap-5">
          {page.sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-[30px] border border-black/10 bg-white/88 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.045)] backdrop-blur-xl md:p-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:gap-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="text-2xl font-black tracking-[-0.035em] text-black md:text-4xl">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm font-medium leading-7 text-black/55 md:text-base md:leading-8"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const homePath = localizePath("/", i18n.language);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-white px-5 text-black">


    <SEO {...{
    title: t("notFound.title", "Página no encontrada"),
    description: t("notFound.description", "Esta página de Link My App no existe o el enlace inteligente ya no está disponible."),
    path: "/404",
    robots: "noindex,follow",
  }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <section className="relative w-full max-w-xl rounded-[34px] border border-black/10 bg-white p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.08)]">
        <img src="https://skeilapps.com/wp-content/uploads/2026/05/logo-Link-My-App.png" alt="Link My App" className="mx-auto h-16 w-16 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
        <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-black/35">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] md:text-6xl">
          {t("notFound.heading", "Link no encontrado")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-7 text-black/55">
          {t("notFound.text", "Esta página no existe o el smart link ya no está disponible.")}
        </p>
        <Link
          to={homePath}
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-black text-white transition hover:-translate-y-0.5"
        >
          {t("notFound.back", "Volver al inicio")}
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}

const cookieConsentKey = "link-my-app.cookie-consent";

function CookieConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(cookieConsentKey);
    setVisible(!storedConsent);
  }, []);

  function saveConsent(value) {
    window.localStorage.setItem(cookieConsentKey, value);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[10000] border-t border-white/10 bg-[#101010] px-5 py-4 text-white shadow-[0_-22px_60px_rgba(0,0,0,0.28)] md:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-white/82">
            <Cookie size={15} strokeWidth={2.2} />
          </div>
          <p className="max-w-5xl text-[13px] font-medium leading-6 text-white/78 md:text-sm">
            {t("cookiesBanner.text")}
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => saveConsent("rejected")}
            className="h-11 px-1 text-sm font-extrabold text-white/80 transition hover:text-white"
          >
            {t("cookiesBanner.reject")}
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="h-12 rounded-full bg-white px-7 text-sm font-black text-black shadow-[0_10px_28px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5"
          >
            {t("cookiesBanner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const routeBases = supportedLanguages.map((language) => ({
    language,
    path: language === "en" ? "/" : `/${language}`,
  }));

  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="animate-spin" size={24} />
          </div>
        }
      >
      <Routes>
        <Route element={<LanguageWrapper />}>
          {routeBases.map(({ language, path }) => (
            <Route path={path} key={language}>
              <Route index element={<LandingPage />} />
              <Route path={getLocalizedRouteSegment("/login", language)} element={<LoginPage />} />
              <Route
                path={getLocalizedRouteSegment("/dashboard", language)}
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route path={getLocalizedRouteSegment("/privacy", language)} element={<LegalPage type="privacy" />} />
              <Route path={getLocalizedRouteSegment("/cookies", language)} element={<LegalPage type="cookies" />} />
              <Route path={getLocalizedRouteSegment("/terms", language)} element={<LegalPage type="terms" />} />
              <Route path={getLocalizedRouteSegment("/faqs", language)} element={<MarketingPage pageKey="faqs" />} />
              <Route path={getLocalizedRouteSegment("/pricing", language)} element={<MarketingPage pageKey="precio" />} />
              <Route path={getLocalizedRouteSegment("/what-we-do", language)} element={<MarketingPage pageKey="comoFunciona" />} />
              <Route path={getLocalizedRouteSegment("/qr-codes", language)} element={<QrLandingPage />} />
              <Route path={getLocalizedRouteSegment("/use-cases", language)} element={<UseCasesHub />} />
              {useCaseNiches.filter((n) => n.id === "agencies").map((n) => (
                <Route
                  key={`${language}-agencies`}
                  path={`${getLocalizedRouteSegment("/use-cases", language)}/${(n[language] || n.en).slug}`}
                  element={<AgenciesPage />}
                />
              ))}
              <Route
                path={`${getLocalizedRouteSegment("/use-cases", language)}/:nicheSlug`}
                element={<UseCasePage />}
              />
              <Route path={getLocalizedRouteSegment("/how-to", language)} element={<HowToHub />} />
              <Route
                path={`${getLocalizedRouteSegment("/how-to", language)}/:howToSlug`}
                element={<HowToPage />}
              />
              <Route path={getLocalizedRouteSegment("/blog", language)} element={<BlogIndex />} />
              <Route path={`${getLocalizedRouteSegment("/blog", language)}/:slug`} element={<BlogPost />} />
              <Route
                path="como-funciona"
                element={<MarketingPage pageKey="comoFunciona" />}
              />
            </Route>
          ))}
          <Route path="/precio" element={<MarketingPage pageKey="precio" />} />
          <Route path="/tarifs" element={<MarketingPage pageKey="precio" />} />
          <Route path="/que-hacemos" element={<MarketingPage pageKey="comoFunciona" />} />
          <Route path="/que-faisons-nous" element={<MarketingPage pageKey="comoFunciona" />} />
          <Route path="/privacidad" element={<LegalPage type="privacy" />} />
          <Route path="/terminos" element={<LegalPage type="terms" />} />
          <Route path="/confidentialite" element={<LegalPage type="privacy" />} />
          <Route path="/conditions" element={<LegalPage type="terms" />} />
          
          <Route path="/r/:slug" element={<RedirectPage />} />
          <Route path="/:slug" element={<RedirectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </Suspense>
      <CookieConsentBanner />
    </AuthProvider>
  );
}

export default App;
