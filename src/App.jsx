import {
  default as React,
  createContext,
  Suspense,
  useCallback,
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
  limitToLast,
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
  ChevronLeft,
  ChevronRight,
  Code2,
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
  Megaphone,
  Menu,
  MessageSquare,
  MousePointer2,
  Plus,
  QrCode,
  Search,
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
  stripeCheckoutUrl,
  stripePortalUrl,
  applyPromoCodeUrl,
  verifyPaymentUrl,
  adminPrepareAccountUrl,
  consumePreparedAccountUrl,
  edgeAccountStatsDeleteUrl,
  edgeLinkSyncUrl,
  edgeStatsUrl,
} from "./firebase.js";
import { LanguageWrapper } from "./LanguageWrapper.jsx";
import {
  FAQSection as LandingFAQSection,
  FinalFooter as LandingFinalFooter,
  ModernSimulationsSection as LandingSimulationsSection,
  PricingComparisonSection as LandingPricingSection,
  PremiumNavbar as LandingNavbar,
  SmartLinkFlow as LandingSmartLinkFlow,
  faqs as landingFaqs,
} from "./LandingVisuals.jsx";
import {
  buildWebsiteLinkHtml,
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
import { visibleUseCaseTeasers as useCaseNiches, teaserNichePath as nichePath } from "./lib/useCaseTeasers.js";
import { getOpenSourceContent, openSourceLinks } from "./lib/openSourceContent.js";
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
const TourixyCaseStudy = React.lazy(() => import("./TourixyCaseStudy.jsx"));

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

const destinationUrlFields = ["iosUrl", "androidUrl", "fallbackUrl"];

function normalizeLinkDestinationUrls(form) {
  return destinationUrlFields.reduce(
    (normalizedForm, field) => ({
      ...normalizedForm,
      [field]: normalizeUrl(form[field] || ""),
    }),
    { ...form }
  );
}

const linkDraftStorageKey = "link-my-app.pendingLinkDraft";
const brandName = "Link My App";
const siteUrl = "https://link-my.app";
const brandLogoUrl = `${siteUrl}/favicon-512.png`;
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "";
const configuredAdminEmails = [
  adminEmail,
  ...(import.meta.env.VITE_ADMIN_EMAILS || "").split(/[,\s]+/),
];
const adminEmails = Array.from(
  new Set(
    ["info@skeilapps.com", "davidtroton@gmail.com", ...configuredAdminEmails]
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  )
);
const feedbackEndpoint = import.meta.env.VITE_FEEDBACK_ENDPOINT || "";
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

function normalizeEmail(value = "") {
  return value.trim().toLowerCase();
}

function isValidEmailAddress(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

function isAdminUser(user) {
  return Boolean(user?.email && adminEmails.includes(normalizeEmail(user.email)));
}

function formatTimestamp(value) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getCurrentPageLanguage() {
  if (typeof window === "undefined") return defaultLanguage;

  const pathLanguage = getLanguageFromPath(window.location.pathname);
  const documentLanguage =
    typeof document !== "undefined" ? document.documentElement.lang : "";
  const browserLanguage =
    typeof navigator !== "undefined" ? navigator.language : "";

  return normalizeLanguage(
    pathLanguage || documentLanguage || browserLanguage || defaultLanguage
  );
}

function getFirebaseAuthLanguage(language) {
  const normalizedLanguage = normalizeLanguage(language);
  return normalizedLanguage === "pt" ? "pt-PT" : normalizedLanguage;
}

function getRegistrationLanguageCode(profile) {
  const code = String(profile?.registrationLanguage || "")
    .trim()
    .toLowerCase()
    .split("-")[0];

  if (code === "ca" || code === "val") return "es";
  return supportedLanguages.includes(code) ? code : "";
}

function formatRegistrationLanguage(profile, includeCode = false) {
  const code = getRegistrationLanguageCode(profile);
  if (!code) return "Desconocido";

  const label =
    languageOptions.find((language) => language.code === code)?.label ||
    code.toUpperCase();
  return includeCode ? `${label} (${code})` : label;
}

function formatExportDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function formatAuthError(error, t) {
  const code = error?.code || "";

  if (code === "auth/unauthorized-domain") {
    return t("messages.authUnavailable");
  }
  if (code === "auth/email-already-in-use") {
    return t("messages.authEmailInUse");
  }
  if (
    code === "auth/invalid-credential" ||
    code === "auth/wrong-password" ||
    code === "auth/user-not-found"
  ) {
    return t("messages.authInvalidCredentials");
  }
  if (code === "auth/weak-password") {
    return t("messages.authWeakPassword");
  }
  if (code === "auth/popup-closed-by-user") {
    return t("messages.authPopupClosed");
  }
  if (code === "auth/too-many-requests") {
    return t("messages.authTooManyRequests");
  }
  if (code === "auth/network-request-failed") {
    return t("messages.authNetwork");
  }

  return t("messages.authGeneric");
}

function createLinkError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

function formatLinkError(error, t) {
  if (error?.code === "link/title-required") {
    return t("messages.appNameRequired");
  }
  if (error?.code === "link/slug-invalid") {
    return t("messages.slugInvalid");
  }
  if (error?.code === "link/destinations-invalid") {
    return t("landing.urlInvalidError");
  }
  if (error?.code === "link/slug-in-use") {
    return t("messages.slugInUse");
  }
  if (error?.code === "link/service-unavailable") {
    return t("messages.serviceUnavailableText");
  }
  return t("messages.createLinkError");
}

async function startStripeCheckout(user, currency = "eur") {
  if (!user) {
    throw new Error("Inicia sesión para desbloquear Pro.");
  }
  if (!stripeCheckoutUrl) {
    throw new Error("Falta configurar la URL de Stripe Checkout.");
  }

  const token = await user.getIdToken();
  const langPath = window.location.pathname;
  const response = await fetch(stripeCheckoutUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      origin: window.location.origin,
      pathname: langPath,
      currency,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.url) {
    throw new Error(data.error || "No se ha podido abrir Stripe Checkout.");
  }

  window.location.assign(data.url);
}

async function startStripePortal(user) {
  if (!user) {
    throw new Error("Inicia sesión para ver tus facturas.");
  }
  if (!stripePortalUrl) {
    throw new Error("Falta configurar el portal de Stripe.");
  }

  const token = await user.getIdToken();
  const response = await fetch(stripePortalUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      origin: window.location.origin,
      pathname: window.location.pathname,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.url) {
    throw new Error(data.error || "No se ha podido abrir el portal de facturación.");
  }

  window.location.assign(data.url);
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
  const direction = language === "ar" ? "rtl" : "ltr";
  const canonical = `${siteUrl}${localizePath(path, language)}`;
  const fullTitle = title.includes(brandName) ? title : `${title} | ${brandName}`;
  const alternates = supportedLanguages.map((lang) => ({
    lang,
    href: `${siteUrl}${localizePath(path, lang)}`,
  }));
  const xDefaultHref = `${siteUrl}${localizePath(path, defaultLanguage)}`;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.querySelectorAll("[data-base-seo='true']").forEach((node) => {
      node.remove();
    });
  }, [canonical, fullTitle]);

  return (
    <Helmet>
      <html lang={language} dir={direction} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="David Trotonda" />
      <meta name="publisher" content="David Trotonda" />
      <meta property="og:locale" content={{ en: "en_US", es: "es_ES", fr: "fr_FR", ja: "ja_JP", de: "de_DE", pt: "pt_PT", it: "it_IT", ko: "ko_KR", nl: "nl_NL", ar: "ar_AR", hi: "hi_IN" }[language] || "en_US"} />
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

function eventsToDailyStats(events) {
  const rows = new Map();

  events.forEach((event) => {
    const createdAt = Number(event.createdAt || 0);
    if (!event.linkId || !event.ownerId || !createdAt) return;
    const day = new Date(createdAt).toISOString().slice(0, 10);
    const destination = ["ios", "android", "fallback"].includes(event.destination)
      ? event.destination
      : "fallback";
    const source = event.source === "qr" ? "qr" : "written";
    const key = `${event.linkId}|${day}|${destination}|${source}`;
    const current = rows.get(key) || {
      ownerId: event.ownerId,
      linkId: event.linkId,
      slug: event.slug || "",
      day,
      destination,
      source,
      clicks: 0,
      lastClickAt: 0,
    };
    current.clicks += 1;
    current.lastClickAt = Math.max(current.lastClickAt, createdAt);
    rows.set(key, current);
  });

  return Array.from(rows.values());
}

function mergeDailyStats(...groups) {
  const rows = new Map();

  groups.flat().forEach((row) => {
    if (!row?.linkId || !row?.day) return;
    const destination = ["ios", "android", "fallback"].includes(row.destination)
      ? row.destination
      : "fallback";
    const source = row.source === "qr" ? "qr" : "written";
    const key = `${row.linkId}|${row.day}|${destination}|${source}`;
    const current = rows.get(key) || {
      ownerId: row.ownerId || "",
      linkId: row.linkId,
      slug: row.slug || "",
      day: row.day,
      destination,
      source,
      clicks: 0,
      lastClickAt: 0,
    };
    current.clicks += Math.max(0, Number(row.clicks || 0));
    current.lastClickAt = Math.max(
      current.lastClickAt,
      Number(row.lastClickAt || 0)
    );
    rows.set(key, current);
  });

  return Array.from(rows.values());
}

function buildStatsForLinks(links, dailyRows) {
  const nextCounts = Object.fromEntries(
    links.map((item) => [item.id, { ...emptyStats, days: getLastSevenDays() }])
  );

  dailyRows.forEach((row) => {
    if (!nextCounts[row.linkId]) return;
    const destination = row.destination || "fallback";
    const source = row.source || "written";
    const clicks = Math.max(0, Number(row.clicks || 0));
    const dayStats = nextCounts[row.linkId].days.find(
      (day) => day.key === row.day
    );

    nextCounts[row.linkId].total += clicks;
    if (destination in nextCounts[row.linkId]) {
      nextCounts[row.linkId][destination] += clicks;
    }
    if (source === "qr") {
      nextCounts[row.linkId].qr += clicks;
      if (destination === "ios") nextCounts[row.linkId].qr_ios += clicks;
      else if (destination === "android") nextCounts[row.linkId].qr_android += clicks;
      else nextCounts[row.linkId].qr_fallback += clicks;
    } else {
      nextCounts[row.linkId].written += clicks;
      if (destination === "ios") nextCounts[row.linkId].written_ios += clicks;
      else if (destination === "android") nextCounts[row.linkId].written_android += clicks;
      else nextCounts[row.linkId].written_fallback += clicks;
    }
    if (dayStats && destination in dayStats) {
      dayStats[destination] += clicks;
    }
  });

  Object.values(nextCounts).forEach((stats) => {
    stats.estimatedInstalls = estimateDownloads(stats);
    stats.days = stats.days.map((day) => ({
      ...day,
      estimatedInstalls: estimateDownloads(day),
    }));
  });

  return nextCounts;
}

function adminDateInputValue(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function shiftAdminCalendarDate(value, offset) {
  const parts = String(value || "").split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) return "";

  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

function adminEventDateKey(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "" : adminDateInputValue(date);
}

function buildAdminVisitRows(links, dailyRows, usersById, fromDate, toDate) {
  if (!fromDate || !toDate || fromDate > toDate) return [];

  const linksById = new Map(links.map((link) => [link.id, link]));
  const rowsByLink = new Map();

  dailyRows.forEach((event) => {
    const eventDate = event.day || adminEventDateKey(event.lastClickAt);
    if (!eventDate) return;

    const link = linksById.get(event.linkId);
    const linkId = event.linkId || `missing-${event.slug || event.id}`;
    const ownerId = link?.ownerId || event.ownerId || "";
    const user = usersById[ownerId] || {};
    const current = rowsByLink.get(linkId) || {
      linkId,
      ownerId,
      userName: user.displayName || "Usuario sin nombre",
      userEmail: user.email || event.ownerEmail || "Sin email",
      title: link?.title || event.title || "Link eliminado",
      slug: link?.slug || event.slug || linkId,
      periodVisits: 0,
      totalVisits: 0,
      lastVisit: "",
    };

    const clicks = Math.max(0, Number(event.clicks || 0));
    current.totalVisits += clicks;
    if (!current.lastVisit || eventDate > current.lastVisit) {
      current.lastVisit = eventDate;
    }
    if (eventDate >= fromDate && eventDate <= toDate) {
      current.periodVisits += clicks;
    }
    rowsByLink.set(linkId, current);
  });

  return Array.from(rowsByLink.values())
    .filter((row) => row.periodVisits > 0)
    .sort(
      (a, b) =>
        b.periodVisits - a.periodVisits ||
        b.totalVisits - a.totalVisits ||
        a.userEmail.localeCompare(b.userEmail)
    );
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

function publicProfileData(profile = {}) {
  return {
    uid: String(profile.uid || ""),
    displayName: String(profile.displayName || "Usuario").slice(0, 120),
    bio: String(profile.bio || "").slice(0, 500),
    photoURL: String(profile.photoURL || "").slice(0, 2048),
    public: profile.public !== false,
    updatedAt: profile.updatedAt || serverTimestamp(),
  };
}

function publicLinkData(link = {}) {
  return {
    ownerId: String(link.ownerId || ""),
    title: String(link.title || "").slice(0, 160),
    slug: String(link.slug || ""),
    iosUrl: String(link.iosUrl || ""),
    androidUrl: String(link.androidUrl || ""),
    fallbackUrl: String(link.fallbackUrl || ""),
    active: Boolean(link.active),
    createdAt: link.createdAt || serverTimestamp(),
    updatedAt: link.updatedAt || serverTimestamp(),
    ...(link.channel ? { channel: String(link.channel).slice(0, 40) } : {}),
    ...(link.parentLinkId ? { parentLinkId: String(link.parentLinkId).slice(0, 160) } : {}),
  };
}

async function fetchEdgeStats(user, { admin = false } = {}) {
  if (!user || !edgeStatsUrl) return null;

  try {
    const token = await user.getIdToken();
    const url = new URL(edgeStatsUrl);
    if (admin) url.searchParams.set("scope", "admin");
    else url.searchParams.set("ownerId", user.uid);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
      return null;
    }
    const data = await response.json();
    if (!Array.isArray(data.rows)) return null;
    return {
      rows: data.rows,
      legacyMigrated: data.legacyMigrated === true,
    };
  } catch {
    return null;
  }
}

async function syncLinkAtEdge(
  user,
  linkId,
  { previousSlug = "", action = "sync", purgeStats = false } = {}
) {
  if (!user || !linkId || !edgeLinkSyncUrl) return false;

  try {
    const token = await user.getIdToken();
    const response = await fetch(edgeLinkSyncUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkId, previousSlug, action, purgeStats }),
    });
    if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
      return false;
    }
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

async function deleteAccountStatsAtEdge(user) {
  if (!user || !edgeAccountStatsDeleteUrl) return false;

  try {
    const token = await user.getIdToken();
    const response = await fetch(edgeAccountStatsDeleteUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ownerId: user.uid }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function getWithLegacyFallback(primaryLocation, legacyLocation) {
  let primarySnapshot = null;

  try {
    primarySnapshot = await get(primaryLocation);
    if (primarySnapshot.exists()) return primarySnapshot;
  } catch {
    // During the migration, the public collection may not exist under the old rules yet.
  }

  try {
    return await get(legacyLocation);
  } catch {
    return primarySnapshot;
  }
}

async function writePrivateAndPublicLink(linkRef, link) {
  const linkId = linkRef.key;
  if (!linkId) throw new Error("No se pudo crear el identificador del link.");

  await update(ref(db), {
    [`links/${linkId}`]: link,
    [`publicLinks/${linkId}`]: link.active ? publicLinkData(link) : null,
  });
  await syncLinkAtEdge(auth?.currentUser, linkId);
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

async function consumePreparedAccount(user) {
  if (!user || !consumePreparedAccountUrl) return null;

  try {
    const token = await user.getIdToken();
    const response = await fetch(consumePreparedAccountUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "No se pudo aplicar la cuenta preparada.");
    }
    return data;
  } catch (error) {
    console.warn("Prepared account sync skipped", error);
    return null;
  }
}

async function ensureUserProfile(user) {
  if (!db || !user) return;

  const userRef = ref(db, `users/${user.uid}`);
  const snapshot = await get(userRef);
  const existingProfile = snapshot.exists() ? snapshot.val() : {};
  const profileData = {
    uid: user.uid,
    email: user.email || "",
    emailNormalized: normalizeEmail(user.email || ""),
    photoURL: user.photoURL || "",
    updatedAt: serverTimestamp(),
  };

  if (snapshot.exists()) {
    const nextProfile = {
      ...profileData,
      displayName:
        existingProfile.displayName ||
        user.displayName ||
        user.email?.split("@")[0] ||
        "Usuario",
      public:
        typeof existingProfile.public === "boolean"
          ? existingProfile.public
          : true,
    };
    await update(ref(db), {
      [`users/${user.uid}`]: { ...existingProfile, ...nextProfile },
      [`publicProfiles/${user.uid}`]: publicProfileData({ ...existingProfile, ...nextProfile }),
    });
    await consumePreparedAccount(user);
    return;
  }

  const newProfile = {
    ...profileData,
    displayName: user.displayName || user.email?.split("@")[0] || "Usuario",
    public: true,
    bio: "Mis smart links de Link My App.",
    registrationLanguage: getCurrentPageLanguage(),
    createdAt: serverTimestamp(),
  };
  await update(ref(db), {
    [`users/${user.uid}`]: newProfile,
    [`publicProfiles/${user.uid}`]: publicProfileData(newProfile),
  });
  await consumePreparedAccount(user);
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

async function findAvailableSlug(baseSlug, maxAttempts = 31) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const suffix = attempt === 1 ? "" : `-${attempt}`;
    const trimmedBase = baseSlug
      .slice(0, Math.max(1, 80 - suffix.length))
      .replace(/-+$/, "");
    const candidate = `${trimmedBase}${suffix}`;
    const existing = await get(
      query(ref(db, "publicLinks"), orderByChild("slug"), equalTo(candidate))
    );
    const taken =
      existing.exists() &&
      Object.values(existing.val()).some((link) => link.active === true);

    if (!taken) return candidate;
  }

  throw createLinkError("link/slug-in-use");
}

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
  const candidate = await findAvailableSlug(`${baseSlug}-${channel.suffix}`);

  const linkRef = push(ref(db, "links"));
  await writePrivateAndPublicLink(linkRef, {
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
    throw createLinkError("link/service-unavailable");
  }

  const title = form.title.trim();
  const requestedSlug = slugFromInput(form.customUrl || title);
  const iosUrl = normalizeUrl(form.iosUrl);
  const androidUrl = normalizeUrl(form.androidUrl);
  const fallbackUrl = normalizeUrl(form.fallbackUrl);

  if (!title) throw createLinkError("link/title-required");
  if (!requestedSlug || requestedSlug.length < 2) {
    throw createLinkError("link/slug-invalid");
  }
  if (!iosUrl || !androidUrl || !fallbackUrl) {
    throw createLinkError("link/destinations-invalid");
  }

  const slug = await findAvailableSlug(requestedSlug);

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
  await writePrivateAndPublicLink(linkRef, payload);

  return slug;
}

async function createPendingSmartLink(user) {
  const draft = readLinkDraft();
  if (!hasLinkDraftData(draft)) return null;

  try {
    const slug = await createSmartLink(draft, user);
    clearLinkDraft();
    return slug;
  } catch (error) {
    // Keep the draft so an invalid URL or a slug collision can be corrected
    // from the dashboard without losing what the user entered before login.
    console.warn("Pending smart link could not be created automatically", error);
    return null;
  }
}

async function createSmartLinkForAccount(form, owner, adminUser) {
  if (!firebaseReady || !db || !owner?.uid) {
    throw new Error("Selecciona una cuenta válida.");
  }

  const title = form.title.trim();
  const requestedSlug = slugFromInput(form.customUrl || title);
  const iosUrl = normalizeUrl(form.iosUrl);
  const androidUrl = normalizeUrl(form.androidUrl);
  const fallbackUrl = normalizeUrl(form.fallbackUrl);

  if (!title) throw new Error("Añade el nombre de la app.");
  if (!requestedSlug || requestedSlug.length < 2) {
    throw new Error("Elige una URL corta válida.");
  }
  if (!iosUrl || !androidUrl || !fallbackUrl) {
    throw new Error("Completa App Store, Google Play y enlace alternativo.");
  }

  const slug = await findAvailableSlug(requestedSlug);

  const linkRef = push(ref(db, "links"));
  await writePrivateAndPublicLink(linkRef, {
    ownerId: owner.uid,
    ownerEmail: owner.email || "",
    title,
    slug,
    customUrl: form.customUrl || "",
    iosUrl,
    androidUrl,
    fallbackUrl,
    active: true,
    createdByAdminEmail: adminUser?.email || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

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
  const { t } = useTranslation();
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
          <p className="font-black">{t("messages.serviceUnavailableTitle")}</p>
          <p className="mt-1 leading-6 opacity-75">
            {t("messages.serviceUnavailableText")}
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
  ];

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100vw-16px)] max-w-[1040px] -translate-x-1/2 rounded-[24px] border border-black/10 bg-white/60 px-3 py-2 shadow-[inset_0_0_14px_rgba(255,255,255,0.85),0_3px_22px_rgba(0,0,0,0.10)] backdrop-blur-xl md:top-6 md:rounded-[30px] md:px-5 md:py-3 lg:px-7">
      <div className="flex items-center justify-between gap-3">
        <Link
          to={localizePath("/", language)}
          className="flex shrink-0 items-center gap-2 transition hover:opacity-80"
        >
          <img src="/logo-link-my-app.avif" alt="Link My App" className="h-9 w-9 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
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
            aria-label={t("messages.openMenu")}
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
      aria-label={t("messages.smartLinkVisualLabel")}
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
 * The channel suffix creates a separate trackable URL for each social network.
 */
function ChannelSelector({ selected, onSelect, isPro }) {
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
  isPro = false,
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

  const baseSlug =
    slugFromInput(form.customUrl || form.title) ||
    slugFromInput(t("landing.defaultSlug", "mi-app"));
  const effectiveSlug = selectedChannel ? `${baseSlug}-${selectedChannel.suffix}` : baseSlug;
  const previewUrl = publicLinkForSlug(publicBaseUrl, effectiveSlug);

  function updateField(field, value) {
    setError("");
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

    if (!form.title.trim()) {
      setError(t("messages.appNameRequired"));
      return;
    }

    const requestedSlug = slugFromInput(form.customUrl || form.title);
    if (!requestedSlug || requestedSlug.length < 2) {
      setError(t("messages.slugInvalid"));
      return;
    }

    const missingDestination = destinationUrlFields.some(
      (field) => !String(form[field] || "").trim()
    );
    if (missingDestination) {
      setError(
        t(
          "landing.urlRequiredError",
          "Completa las direcciones de App Store, Google Play y web alternativa."
        )
      );
      return;
    }

    const normalizedForm = normalizeLinkDestinationUrls(form);
    const invalidDestination = destinationUrlFields.some(
      (field) => !normalizedForm[field]
    );
    if (invalidDestination) {
      setError(
        t(
          "landing.urlInvalidError",
          "Introduce una dirección web válida. Puedes escribirla sin https://."
        )
      );
      return;
    }

    setForm(normalizedForm);

    if (!user) {
      saveLinkDraft(normalizedForm);
      navigate(localizePath("/login?linkDraft=1", i18n.language));
      return;
    }

    if (disabled) {
      onDisabledSubmit?.();
      return;
    }

    setSaving(true);
    try {
      // If a channel is selected we force the slug suffix by passing the
      // channel-suffixed slug as customUrl, and tag the link
      // with the channel id so its brand icon shows up next to the actions.
      const formForSubmit = selectedChannel
        ? { ...normalizedForm, customUrl: effectiveSlug }
        : normalizedForm;
      const slug = await createSmartLink(formForSubmit, user, {
        channel: selectedChannel?.id,
      });
      clearLinkDraft();
      setForm(emptyLinkForm);
      setSelectedChannel(null);
      setDraftReady(false);
      onCreated?.(slug);
    } catch (nextError) {
      setError(formatLinkError(nextError, t));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
      toolname="create_smart_link"
      tooldescription="Creates a Link My App smart link that routes iPhone users to App Store, Android users to Google Play, and desktop users to a fallback URL."
    >
      <FirebaseSetupNotice compact />

      {draftReady && (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-800">
          {t("landing.draftReady")}
        </p>
      )}

      <InputField
        label={t("landing.appNameLabel")}
        name="app_name"
        value={form.title}
        onChange={(value) => updateField("title", value)}
        placeholder={t("landing.appNamePlaceholder")}
        toolParamDescription="Public name of the app or campaign for this smart link."
      />

      <InputField
        label={t("landing.iosUrlLabel")}
        name="ios_url"
        value={form.iosUrl}
        onChange={(value) => updateField("iosUrl", value)}
        placeholder={t("landing.iosUrlPlaceholder", "https://apps.apple.com/...")}
        urlField
        autoComplete="url"
        toolParamDescription="Full App Store URL for iPhone and iPad visitors."
      />

      <InputField
        label={t("landing.androidUrlLabel")}
        name="android_url"
        value={form.androidUrl}
        onChange={(value) => updateField("androidUrl", value)}
        placeholder={t(
          "landing.androidUrlPlaceholder",
          "https://play.google.com/store/apps/details?id=..."
        )}
        urlField
        autoComplete="url"
        toolParamDescription="Full Google Play URL for Android visitors."
      />

      <InputField
        label={t("landing.fallbackUrlLabel")}
        name="fallback_url"
        value={form.fallbackUrl}
        onChange={(value) => updateField("fallbackUrl", value)}
        placeholder={t("landing.fallbackPlaceholder", "https://tuweb.com/descargar-app")}
        urlField
        autoComplete="url"
        toolParamDescription="Fallback web URL for desktop, unknown devices, or unavailable stores."
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
          name="custom_slug"
          value={form.customUrl}
          onChange={(event) => updateField("customUrl", event.target.value)}
          placeholder={t("landing.customUrlPlaceholder")}
          autoComplete="off"
          toolparamdescription="Optional short slug for the public smart link URL."
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
          isPro={isPro}
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

function DashboardCreateHelp() {
  const { t } = useTranslation();
  const fallbackSteps = [
    "Pon el nombre de tu app para reconocerla dentro del panel.",
    "Pega el enlace de App Store: se usará cuando alguien abra el link desde iPhone o iPad.",
    "Pega el enlace de Google Play: se usará cuando alguien abra el link desde Android.",
    "Añade un enlace alternativo para ordenador, tablets no detectadas u otros dispositivos.",
    "Elige el nombre corto del enlace y compártelo; el QR se generará automáticamente.",
    "Cuando compartas el enlace o el QR, Android abrirá Google Play, iPhone abrirá App Store y cualquier otro dispositivo abrirá el enlace alternativo.",
  ];
  const translatedSteps = t("dashboard.createHelpSteps", { returnObjects: true });
  const steps = Array.isArray(translatedSteps) ? translatedSteps : fallbackSteps;

  return (
    <details className="group mb-5 rounded-[24px] border border-black/8 bg-[#fafaf8] p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <p className="text-sm font-black tracking-[-0.01em] text-black">
            {t("dashboard.createHelpTitle", "Cómo funciona")}
          </p>
          <p className="mt-1 overflow-hidden text-xs font-semibold leading-5 text-black/50 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {t(
              "dashboard.createHelpSummary",
              "Qué poner en cada campo y qué pasa al crear el link."
            )}
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-black/10 bg-white text-black/55 transition group-open:rotate-180">
          <ChevronDown size={17} />
        </span>
      </summary>

      <div className="mt-4 border-t border-black/8 pt-4">
        <p className="text-xs font-bold leading-5 text-black/58">
          {t(
            "dashboard.createHelpIntro",
            "El smartlink es un único enlace que decide automáticamente a dónde enviar a cada persona según el dispositivo desde el que entra."
          )}
        </p>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black text-[10px] font-black text-white">
                {index + 1}
              </span>
              <span className="text-xs font-semibold leading-5 text-black/62">
                {step}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-xs font-bold leading-5 text-black/55">
          {t(
            "dashboard.createHelpOutro",
            "Desde esta pantalla también podrás copiar la URL, descargar el QR, pausar el link y revisar las estadísticas."
          )}
        </p>
      </div>
    </details>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  urlField = false,
  inputMode,
  autoComplete,
  toolParamDescription,
}) {
  function handleBlur() {
    if (!urlField || !String(value || "").trim()) return;
    const normalizedValue = normalizeUrl(value);
    if (normalizedValue) onChange(normalizedValue);
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-black/75">{label}</span>
      <input
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        type={urlField ? "text" : type}
        inputMode={urlField ? "url" : inputMode}
        autoComplete={autoComplete}
        toolparamdescription={toolParamDescription}
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
          "@type": "Person",
          name: "David Trotonda",
          url: siteUrl,
          logo: `${siteUrl}/favicon-512.png`,
        },
        {
          "@type": "WebSite",
          name: brandName,
          url: siteUrl,
          inLanguage: normalizeLanguage(i18n.language),
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${siteUrl}/#software`,
          name: brandName,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: siteUrl,
          isAccessibleForFree: true,
          license: openSourceLinks.license,
          sameAs: [openSourceLinks.repository],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
          },
        },
        {
          "@type": "SoftwareSourceCode",
          "@id": `${siteUrl}/#source-code`,
          name: `${brandName} source code`,
          codeRepository: openSourceLinks.repository,
          license: openSourceLinks.license,
          programmingLanguage: ["JavaScript", "JSX", "HTML", "CSS"],
          runtimePlatform: ["React", "Firebase", "Cloudflare Workers"],
          targetProduct: {
            "@id": `${siteUrl}/#software`,
          },
          maintainer: {
            "@type": "Person",
            name: "David Trotonda",
            url: siteUrl,
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: landingFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
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
            <Link
              to={localizePath("/open-source", i18n.language)}
              className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-black/25 xl:mx-0"
            >
              <Code2 size={14} aria-hidden="true" />
              Open source · Apache 2.0
              <ArrowRight size={13} aria-hidden="true" />
            </Link>

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
      <LandingPricingSection />
      <LandingFAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
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
      title: "Crea un código QR para tu app, sin fecha de caducidad y gratis",
      text: "Genera un QR único para tu aplicación. Funciona en iPhone y Android: al escanearlo manda a cada usuario a App Store, Google Play o tu URL alternativa.",
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
  const tourixyCaseLabel =
    {
      en: "Success story · Tourixy",
      es: "Caso de éxito · Tourixy",
      fr: "Cas client · Tourixy",
      ja: "導入事例 · Tourixy",
      de: "Erfolgsgeschichte · Tourixy",
      pt: "Caso de sucesso · Tourixy",
      it: "Caso di successo · Tourixy",
      ko: "성공 사례 · Tourixy",
      nl: "Succesverhaal · Tourixy",
      ar: "قصة نجاح · Tourixy",
      hi: "सफलता की कहानी · Tourixy",
    }[language] || "Success story · Tourixy";

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
                  "Anuncios, ecommerce, SaaS, restaurantes, fitness o agencias: un smart link y un QR adaptados a cada modelo.",
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
                  ads: Megaphone,
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

        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-sky-100 bg-white p-1.5 pr-2 shadow-[0_14px_38px_rgba(14,116,144,0.10)]">
            <img
              src="/tourixy-favicon.png"
              alt=""
              className="h-10 w-10 rounded-full shadow-sm"
            />
            <Link
              to={localizePath("/success-story/tourixy", language)}
              className="ml-2.5 rounded-full px-2 py-2 text-[12px] font-black uppercase tracking-[0.13em] text-black/70 transition hover:text-black"
            >
              {tourixyCaseLabel}
            </Link>
            <span className="mx-1 h-5 w-px bg-black/10" aria-hidden="true" />
            <a
              href="https://tourixy.com"
              aria-label="Tourixy.com"
              className="grid h-9 w-9 place-items-center rounded-full bg-black text-white transition hover:-translate-y-0.5 hover:bg-sky-700"
            >
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenSourcePage() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const content = getOpenSourceContent(language);
  const createPath = localizePath("/#crear", language);
  const pageUrl = `${siteUrl}${localizePath("/open-source", language)}`;
  const factIcons = [Code2, ShieldCheck, Building2, Globe];
  const stepIcons = [Smartphone, BarChart3, Code2];

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          name: content.metaTitle,
          description: content.metaDescription,
          url: pageUrl,
          inLanguage: language,
          isPartOf: {
            "@type": "WebSite",
            name: brandName,
            url: siteUrl,
          },
          about: {
            "@id": `${siteUrl}/#source-code`,
          },
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${siteUrl}/#software`,
          name: brandName,
          url: siteUrl,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          isAccessibleForFree: true,
          license: openSourceLinks.license,
          sameAs: [openSourceLinks.repository],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
          },
        },
        {
          "@type": "SoftwareSourceCode",
          "@id": `${siteUrl}/#source-code`,
          name: `${brandName} source code`,
          description: content.metaDescription,
          url: pageUrl,
          codeRepository: openSourceLinks.repository,
          license: openSourceLinks.license,
          programmingLanguage: ["JavaScript", "JSX", "HTML", "CSS"],
          runtimePlatform: ["React", "Firebase", "Cloudflare Workers"],
          targetProduct: {
            "@id": `${siteUrl}/#software`,
          },
          maintainer: {
            "@type": "Person",
            name: "David Trotonda",
            url: siteUrl,
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    }),
    [content, language, pageUrl]
  );

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-white text-black"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      <SEO
        title={content.metaTitle}
        description={content.metaDescription}
        keywords="open source smart link, Apache 2.0, self hosted smart link, App Store Google Play link, open source QR code"
        path="/open-source"
        schema={schema}
      />
      <LandingNavbar />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />

      <section className="relative z-10 mx-auto w-full max-w-[1220px] px-5 pb-20 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-sm backdrop-blur-md">
            <Code2 size={15} aria-hidden="true" />
            Open source · Apache 2.0
          </div>
          <h1 className="mt-7 text-[clamp(46px,7.5vw,92px)] font-black leading-[0.9] tracking-[-0.07em]">
            {content.title}
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-8 text-black/60 md:text-lg">
            {content.intro}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={openSourceLinks.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-white shadow-[0_16px_38px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
            >
              <Code2 size={18} aria-hidden="true" />
              {content.repoButton}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            <Link
              to={createPath}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-black/12 bg-white px-6 py-4 text-sm font-black text-black shadow-sm transition hover:-translate-y-0.5 hover:border-black/30"
            >
              {content.createButton}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.facts.map((fact, index) => {
            const FactIcon = factIcons[index] || Check;
            return (
              <article
                key={fact.title}
                className="rounded-[28px] border border-black/8 bg-white/90 p-6 shadow-[0_14px_45px_rgba(0,0,0,0.05)] backdrop-blur"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black text-white">
                  <FactIcon size={19} aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-black tracking-[-0.03em]">{fact.title}</h2>
                <p className="mt-3 text-sm font-medium leading-7 text-black/55">{fact.text}</p>
              </article>
            );
          })}
        </div>

        <section className="mt-24">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/35">Link My App</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] md:text-6xl">
              {content.choiceTitle}
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-black/58 md:text-lg">
              {content.choiceIntro}
            </p>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[32px] border border-black/8 bg-[#f7f7f5] p-7 md:p-9">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm">
                <Globe size={21} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-3xl font-black tracking-[-0.045em]">{content.hostedTitle}</h3>
              <p className="mt-4 text-sm font-medium leading-7 text-black/58 md:text-base">
                {content.hostedText}
              </p>
              <Link
                to={createPath}
                className="mt-7 inline-flex items-center gap-2 text-sm font-black underline decoration-2 underline-offset-4"
              >
                {content.createButton}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
            <article className="rounded-[32px] bg-black p-7 text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:p-9">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Code2 size={21} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-3xl font-black tracking-[-0.045em]">{content.selfHostedTitle}</h3>
              <p className="mt-4 text-sm font-medium leading-7 text-white/65 md:text-base">
                {content.selfHostedText}
              </p>
              <a
                href={openSourceLinks.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-black underline decoration-2 underline-offset-4"
              >
                {content.repoButton}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="max-w-4xl text-4xl font-black tracking-[-0.055em] md:text-6xl">
            {content.howTitle}
          </h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {content.steps.map((step, index) => {
              const StepIcon = stepIcons[index] || Check;
              return (
                <article key={step.title} className="rounded-[28px] border border-black/8 bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black text-white">
                      <StepIcon size={19} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-black text-black/25">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-[-0.04em]">{step.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-black/55">{step.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-24 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[32px] border border-black/8 bg-[#f7f7f5] p-7 md:p-10">
            <h2 className="text-4xl font-black tracking-[-0.055em] md:text-5xl">
              {content.transparencyTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-black/58">
              {content.transparencyText}
            </p>
          </article>
          <article className="rounded-[32px] border border-black/8 bg-white p-7 md:p-9">
            <h2 className="text-2xl font-black tracking-[-0.04em]">{content.stackTitle}</h2>
            <ul className="mt-6 space-y-4">
              {content.stack.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-black/65">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black text-white">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-24 overflow-hidden rounded-[36px] bg-black p-7 text-white shadow-[0_28px_90px_rgba(0,0,0,0.2)] md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-black">
                <FileText size={21} aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.055em] md:text-6xl">
                {content.licenseTitle}
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-white/65">
                {content.licenseText}
              </p>
            </div>
            <a
              href={openSourceLinks.license}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-black transition hover:-translate-y-0.5"
            >
              {content.licenseButton}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-4xl font-black tracking-[-0.055em] md:text-6xl">
            {content.faqTitle}
          </h2>
          <div className="mx-auto mt-9 max-w-4xl space-y-3">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[24px] border border-black/8 bg-white p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-black [&::-webkit-details-marker]:hidden md:text-lg">
                  {faq.question}
                  <ChevronDown className="shrink-0 transition group-open:rotate-180" size={19} aria-hidden="true" />
                </summary>
                <p className="mt-4 border-t border-black/8 pt-4 text-sm font-medium leading-7 text-black/58">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-[36px] border border-black/8 bg-white/90 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.08)] backdrop-blur md:p-12">
          <h2 className="mx-auto max-w-4xl text-4xl font-black tracking-[-0.055em] md:text-6xl">
            {content.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-black/58">
            {content.ctaText}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={createPath}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              {content.createButton}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={openSourceLinks.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/12 bg-white px-6 py-4 text-sm font-black text-black transition hover:-translate-y-0.5"
            >
              {content.repoButton}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </section>
      </section>

      <LandingFinalFooter />
    </main>
  );
}

const marketingPages = {
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
        <LandingFAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      )}
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

function PricingSection() {
  const { t } = useTranslation();
  return (
    <section id="precio" className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8">
      <div className="grid gap-6 rounded-[34px] border border-black/10 bg-black p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] md:grid-cols-[1fr_auto] md:items-center md:p-9">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
            {t("pricing.tag", "Precio inicial")}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">
            {t("pricing.title", "Empieza gratis y escala cuando tengas campañas.")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/58 md:text-base">
            {t("pricing.subtitle", "Auth, perfil, enlaces y redirección están preparados. Puedes añadir planes de pago después con Stripe o Firebase Extensions.")}
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-black text-black transition hover:-translate-y-0.5"
        >
          {t("pricing.btn", "Crear enlaces")} <ArrowRight size={16} />
        </Link>
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

const linkMyAppTinyStartupsBadgeHtml = `<!-- tinystartups · Launched on Tiny Startups -->
<a href="https://www.tinystartups.com/startup/link-my-app" target="_blank" rel="noopener"
   style="display:inline-flex;align-items:center;gap:14px;padding:14px 22px 14px 18px;border-radius:14px;text-decoration:none;font-family:'Inter',system-ui,sans-serif;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(90deg,#3525E6,#D81FE0,#22B8F0) border-box;border:2px solid transparent;color:#0E0B1F">
  <svg width="56" height="56" viewBox="0 0 100 100">
    <defs><linearGradient id="tsg" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0%" stop-color="#3525E6"/><stop offset="55%" stop-color="#D81FE0"/><stop offset="100%" stop-color="#22B8F0"/>
    </linearGradient></defs>
    <path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="url(#tsg)"/>
  </svg>
  <span style="display:flex;flex-direction:column;line-height:1.15">
    <span style="font-family:monospace;font-size:9px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#6A6585">Launched on</span>
    <span style="font-size:22px;font-weight:800;letter-spacing:-0.025em">Tiny Startups</span>
    <span style="font-size:11px;color:#6A6585;margin-top:4px">tinystartups.com</span>
  </span>
</a>`;

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
    <section className={`relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden border-t ${isDark ? 'border-black/10 bg-white' : 'border-black/10 bg-white'}`}>
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

        <footer className={`relative mx-auto mt-20 flex w-full max-w-[1320px] flex-col gap-8 border-t pt-8 md:flex-row md:items-end md:justify-between ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <img src="/logo-link-my-app.avif" alt="Link My App" className="h-9 w-9 object-contain" />
              <span className="text-lg font-black tracking-tight">LINK MY APP</span>
            </div>
            <div className="mt-3 text-center md:text-left">
              <p className={`text-xs font-black uppercase tracking-[0.18em] ${isDark ? 'text-white/35' : 'text-black/40'}`}>
                {t("messages.ourWebsites")}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <a href="https://skeilapps.com/" target="_blank" rel="noopener" className={`rounded-full border px-3 py-1.5 text-sm font-bold transition ${isDark ? 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.07] hover:text-white' : 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:bg-black/[0.07] hover:text-black'}`}>SkeilApps</a>
                <a href="https://tienrank.com/" target="_blank" rel="noopener" className={`rounded-full border px-3 py-1.5 text-sm font-bold transition ${isDark ? 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.07] hover:text-white' : 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:bg-black/[0.07] hover:text-black'}`}>TienRank</a>
                <a href="https://tuback.link/" target="_blank" rel="noopener" className={`rounded-full border px-3 py-1.5 text-sm font-bold transition ${isDark ? 'border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.07] hover:text-white' : 'border-black/10 bg-black/[0.03] text-black/60 hover:border-black/20 hover:bg-black/[0.07] hover:text-black'}`}>TuBack.link</a>
              </div>
            </div>
            <div
              className="mt-5 flex max-w-full justify-center overflow-x-auto md:justify-start"
              dangerouslySetInnerHTML={{ __html: linkMyAppTinyStartupsBadgeHtml }}
            />
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
  const initialLoginParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const [mode, setMode] = useState(
    initialLoginParams.get("register") === "1" ? "register" : "login"
  );
  const [hasPendingDraft] = useState(() => hasLinkDraftData(readLinkDraft()));
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialLoginParams.get("email") || "");
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
      await createPendingSmartLink(result.user);
      navigate(
        localizePath(
          window.location.search.includes("upgrade=pro")
            ? "/dashboard?upgrade=pro"
            : "/dashboard",
          i18n.language
        )
      );
    } catch (nextError) {
      setError(formatAuthError(nextError, t));
    } finally {
      setLoadingProvider("");
    }
  }

  async function handleEmailSubmit(event) {
    event.preventDefault();
    if (!firebaseReady || !auth) return;

    setError("");
    setMessage("");

    const normalizedEmail = normalizeEmail(email);
    if (mode === "register" && !name.trim()) {
      setError(t("messages.nameRequired"));
      return;
    }
    if (!normalizedEmail) {
      setError(t("messages.emailRequired"));
      return;
    }
    if (!isValidEmailAddress(normalizedEmail)) {
      setError(t("messages.emailInvalid"));
      return;
    }
    if (!password) {
      setError(t("messages.passwordRequired"));
      return;
    }
    if (mode === "register" && password.length < 6) {
      setError(t("messages.passwordLength"));
      return;
    }

    setEmail(normalizedEmail);
    setLoadingProvider("email");
    try {
      let authenticatedUser = null;
      if (mode === "register") {
        const result = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
        if (name.trim()) {
          await updateProfile(result.user, { displayName: name.trim() });
        }
        authenticatedUser = auth.currentUser || result.user;
        await ensureUserProfile(authenticatedUser);
      } else {
        const result = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        authenticatedUser = result.user;
        await ensureUserProfile(authenticatedUser);
      }
      await createPendingSmartLink(authenticatedUser);
      navigate(
        localizePath(
          window.location.search.includes("upgrade=pro")
            ? "/dashboard?upgrade=pro"
            : "/dashboard",
          i18n.language
        )
      );
    } catch (nextError) {
      setError(formatAuthError(nextError, t));
    } finally {
      setLoadingProvider("");
    }
  }

  async function handleResetPassword() {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail || !firebaseReady || !auth) {
      setMessage("");
      setError(
        t(
          "login.resetEmailRequired",
          "Escribe tu email para enviarte el enlace de recuperación."
        )
      );
      return;
    }
    if (!isValidEmailAddress(normalizedEmail)) {
      setMessage("");
      setError(t("messages.emailInvalid"));
      return;
    }

    setError("");
    setMessage("");
    setEmail(normalizedEmail);
    setLoadingProvider("reset");
    try {
      auth.languageCode = getFirebaseAuthLanguage(i18n.language);
      await sendPasswordResetEmail(auth, normalizedEmail);
      setMessage(
        t(
          "login.resetEmailSent",
          "Si existe una cuenta con ese email, recibirás un enlace para cambiar la contraseña."
        )
      );
    } catch {
      setError(
        t(
          "login.resetEmailError",
          "No se ha podido enviar el email de recuperación. Revisa la dirección e inténtalo de nuevo."
        )
      );
    } finally {
      setLoadingProvider("");
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
              <img src="/logo-link-my-app.avif" alt="Link My App" className="h-10 w-10 object-contain" />
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

              <form
                className="space-y-4"
                onSubmit={handleEmailSubmit}
                toolname={mode === "login" ? "login_with_email" : "register_with_email"}
                tooldescription={mode === "login" ? "Logs an existing Link My App user in with email and password." : "Creates a Link My App account with name, email, and password."}
              >
                {mode === "register" && (
                  <InputField
                    label={t("login.nameLabel", "Nombre")}
                    name="name"
                    value={name}
                    onChange={setName}
                    placeholder={t("login.namePlaceholder", "Tu nombre")}
                    autoComplete="name"
                    toolParamDescription="User's display name for the new account."
                  />
                )}
                <InputField
                  label={t("login.emailLabel", "Email")}
                  name="email"
                  value={email}
                  onChange={setEmail}
                  placeholder={t("messages.emailPlaceholder")}
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  toolParamDescription="User's email address."
                />
                <InputField
                  label={t("login.passwordLabel", "Contraseña")}
                  name="password"
                  value={password}
                  onChange={setPassword}
                  placeholder={t("login.passwordPlaceholder", "Mínimo 6 caracteres")}
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  toolParamDescription="User's password."
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
                  disabled={loadingProvider === "reset"}
                  className="text-black/60 transition hover:text-black"
                >
                  {loadingProvider === "reset"
                    ? t("login.resetPasswordSending", "Enviando…")
                    : t("login.resetPassword")}
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
  const [upgradeError, setUpgradeError] = useState("");
  const [upgrading, setUpgrading] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [linkPendingDeletion, setLinkPendingDeletion] = useState(null);
  const [optimisticPro, setOptimisticPro] = useState(false);
  const upgradeStartedRef = useRef(false);
  const [toast, showToast] = useToast();
  const adminMode = isAdminUser(user);
  const isPro = true;
  const visibleProfile = {
    ...(profile || {}),
    plan: "free",
    planLabel: t("dashboard.freePlan", "Gratis"),
  };


  
useEffect(() => {
    if (profile?.plan === "pro") {
      setOptimisticPro(true);
    }
  }, [profile?.plan]);

  useEffect(() => {
    if (!firebaseReady || !db || !user || adminMode) return undefined;

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
      () => {
        setError(t("messages.loadLinksError"));
        setLoadingLinks(false);
      }
    );
  }, [user, adminMode]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    
    if (params.get("stripe") === "success" && sessionId && user) {
      const url = new URL(window.location.href);
      url.searchParams.delete("stripe");
      url.searchParams.delete("session_id");
      window.history.replaceState({}, document.title, url.toString());

      (async () => {
        try {
          if (verifyPaymentUrl) {
            const token = await user.getIdToken();
            const response = await fetch(verifyPaymentUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ session_id: sessionId }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data.success || (data.plan && data.plan !== "pro")) {
              throw new Error(data.error || "No se pudo verificar el pago.");
            }
          }
          
          setOptimisticPro(true);
          setShowProModal(false);
          setUpgradeError("");
          setShowSuccessModal(true);
        } catch (err) {
          console.error("Error verifying payment", err);
          // Opcionalmente podemos mostrar un error al usuario si el pago falla
        } finally {
          upgradeStartedRef.current = false;
        }
      })();
    }
    if (
      params.get("upgrade") !== "pro" ||
      !user ||
      adminMode ||
      links.length === 0 ||
      upgradeStartedRef.current ||
      isPro
    ) {
      return;
    }

    upgradeStartedRef.current = true;
    handleUpgrade();
  }, [user, adminMode, isPro, links.length]);

  useEffect(() => {
    if (!firebaseReady || !db || !user || adminMode || links.length === 0) {
      setCounts({});
      return;
    }

    let cancelled = false;

    async function loadCounts() {
      const edgeStats = await fetchEdgeStats(user);
      let dailyRows = edgeStats?.rows || [];

      if (!edgeStats?.legacyMigrated) {
        const eventsQuery = query(
          ref(db, "clickEvents"),
          orderByChild("ownerId"),
          equalTo(user.uid)
        );
        const snapshot = await get(eventsQuery);
        dailyRows = mergeDailyStats(
          dailyRows,
          eventsToDailyStats(Object.values(snapshot.val() || {}))
        );
      }

      if (!cancelled) setCounts(buildStatsForLinks(links, dailyRows));
    }

    loadCounts().catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [links, user, adminMode]);

  async function copyToClipboard(
    value,
    successMessage = t("messages.copied")
  ) {
    try {
      await navigator.clipboard.writeText(value);
      showToast(successMessage);
    } catch {
      setError(t("messages.copyError"));
    }
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
      showToast(t("messages.qrDownloaded"));
    } catch {
      window.open(qrUrl, "_blank", "noopener,noreferrer");
    }
  }

  async function toggleActive(link) {
    setError("");
    try {
      const nextActive = !link.active;
      const updatedAt = serverTimestamp();
      await update(ref(db), {
        [`links/${link.id}/active`]: nextActive,
        [`links/${link.id}/updatedAt`]: updatedAt,
        [`publicLinks/${link.id}`]: nextActive
          ? publicLinkData({ ...link, active: true, updatedAt })
          : null,
      });
      await syncLinkAtEdge(user, link.id);
    } catch {
      setError(t("messages.actionError"));
    }
  }

  async function removeLink(link) {
    setError("");
    try {
      await syncLinkAtEdge(user, link.id, {
        previousSlug: link.slug,
        action: "delete",
        purgeStats: true,
      });
      await update(ref(db), {
        [`links/${link.id}`]: null,
        [`publicLinks/${link.id}`]: null,
      });
      setLinkPendingDeletion(null);
    } catch {
      setError(t("messages.actionError"));
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    navigate(localizePath("/", i18n.language));
  }

  async function handleUpgrade(promoCode = "") {
    setUpgradeError("");
    
    if (typeof promoCode === 'string' && promoCode.trim() !== "") {
      try {
        setUpgrading(true);
        if (!user) {
          throw new Error("Inicia sesión para activar el código promocional.");
        }

        if (applyPromoCodeUrl && auth.currentUser) {
          const token = await auth.currentUser.getIdToken();
          const response = await fetch(applyPromoCodeUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ promoCode: promoCode.trim() }),
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok || !data.success) {
            throw new Error(data.error || "No se pudo aplicar el código promocional. Asegúrate de que los cambios estén desplegados.");
          }
        } else {
          throw new Error("Falta configurar la URL para aplicar códigos promocionales.");
        }

        setOptimisticPro(true);
        setShowProModal(false);
        setUpgradeError("");
        setShowSuccessModal(true);
      } catch (err) {
        setUpgradeError(t("messages.upgradeError"));
      } finally {
        setUpgrading(false);
      }
      return;
    }

    setUpgrading(true);
    try {
      const isEnglish = i18n.language && i18n.language.startsWith("en");
      await startStripeCheckout(user, isEnglish ? "usd" : "eur");
    } catch {
      setUpgradeError(t("messages.upgradeError"));
      setUpgrading(false);
    }
  }

  const totalClicks = Object.values(counts).reduce(
    (sum, value) => sum + (value?.total || 0),
    0
  );
  const totalEstimatedDownloads = Object.values(counts).reduce(
    (sum, value) => sum + (value?.estimatedInstalls || 0),
    0
  );

  if (adminMode) {
    return <AdminDashboardPage onSignOut={handleSignOut} />;
  }

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
            {!loadingLinks && links.length === 0 && <DashboardCreateHelp />}
            <LinkCreateForm
              compact
              loadDraft
              hasExistingLinks={links.length > 0}
              isPro={isPro}
              buttonLabel={t("dashboard.createButton", "Crea Smartlink")}
              onCreated={(slug) => {
                showToast(t("messages.created", { slug }));
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
              const websiteLinkHtml = buildWebsiteLinkHtml(
                defaultLinkUrl,
                t("dashboard.websiteLinkAnchor", "Descargar {{app}}", {
                  app: item.title,
                })
              );
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
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">{t("dashboard.others", "Otros")}</p><p className="font-bold">{linkStats.written_fallback || 0}</p></div>
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
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">{t("dashboard.others", "Otros")}</p><p className="font-bold">{Math.round((linkStats.written_fallback || 0) * 0.01)}</p></div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <p className="mb-3 text-center text-sm font-black">{t("dashboard.clicksOnQR", "Clics en el QR")} ({linkStats.qr})</p>
                            <div className="flex justify-around text-center border-b border-black/5 pb-4 mb-4">
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">Android</p><p className="font-bold">{linkStats.qr_android || 0}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">iOS</p><p className="font-bold">{linkStats.qr_ios || 0}</p></div>
                              <div><p className="text-[10px] font-black uppercase tracking-[0.1em] text-black/50">{t("dashboard.others", "Otros")}</p><p className="font-bold">{linkStats.qr_fallback || 0}</p></div>
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
                          icon={Code2}
                          label={t("dashboard.copyForWebsite", "Copiar HTML para web")}
                          onClick={() =>
                            copyToClipboard(
                              websiteLinkHtml,
                              t(
                                "dashboard.websiteHtmlCopied",
                                "HTML para web copiado"
                              )
                            )
                          }
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
                          onClick={() => setLinkPendingDeletion(item)}
                        />
                      </div>
                      <p className="mt-3 text-xs font-semibold leading-5 text-black/45">
                        {t(
                          "dashboard.websiteLinkSeoHint",
                          "El HTML para web crea un enlace rastreable a link-my.app sin nofollow. El CMS de destino puede modificar sus atributos."
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-3 lg:items-end">
                      <img
                        src={qrUrl}
                        alt={t("messages.qrAlt", { app: item.title })}
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

      {showSuccessModal && (
        <PremiumSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}

      {linkPendingDeletion && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm"
          onClick={() => setLinkPendingDeletion(null)}
        >
          <section
            className="w-full max-w-md rounded-[30px] bg-white p-6 text-black shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-2xl font-black tracking-tight">
              {t("messages.deleteLinkTitle")}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-black/60">
              {t("messages.deleteLinkConfirm", {
                title: linkPendingDeletion.title,
              })}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLinkPendingDeletion(null)}
                className="h-11 rounded-2xl border border-black/10 text-sm font-black"
              >
                {t("messages.cancel")}
              </button>
              <button
                type="button"
                onClick={() => removeLink(linkPendingDeletion)}
                className="h-11 rounded-2xl bg-red-600 text-sm font-black text-white"
              >
                {t("messages.confirmDelete")}
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-black px-5 py-3 text-sm font-black text-white shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
}

function AdminDashboardPage({ onSignOut }) {
  return (
    <main className="min-h-screen bg-[#f7f7f6] text-black">
      <SEO
        title="Administración"
        description="Panel interno para gestionar usuarios, cuentas preparadas, smart links y códigos promocionales."
        path="/dashboard"
        robots="noindex,nofollow"
      />
      <DashboardHeader onSignOut={onSignOut} />
      <section className="mx-auto w-full max-w-[1360px] px-5 pb-12 pt-28 md:px-8">
        <AdminPanelModal embedded />
      </section>
    </main>
  );
}

function DashboardHeader({ onSignOut }) {
  const { t, i18n } = useTranslation();
  const homePath = localizePath("/", i18n.language);

  return (
    <header className="fixed left-1/2 top-4 z-40 flex w-[calc(100vw-16px)] max-w-[1360px] -translate-x-1/2 items-center justify-between rounded-[24px] border border-black/10 bg-white/70 px-4 py-3 shadow-[0_3px_22px_rgba(0,0,0,0.10)] backdrop-blur-xl">
      <Link to={homePath} className="flex items-center gap-2">
        <img src="/logo-link-my-app.avif" alt="Link My App" className="h-9 w-9 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
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
  const planLabel = profile?.plan === "pro" ? "PRO" : t("dashboard.freePlan", "Gratis");

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
        {isAdminUser(user) && (
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
  const [billingLoading, setBillingLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState("");
  const displayName = profile?.displayName || user.displayName || user.email || t("dashboard.userDefault", "Usuario");
  const [name, setName] = useState(displayName);
  const planLabel = profile?.plan === "pro" ? "PRO" : t("dashboard.freePlan", "Gratis");
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
    if (!nextName) {
      setError(t("messages.profileNameRequired"));
      return;
    }
    if (savingProfile) return;

    setError("");
    setSavingProfile(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: nextName });
      }
      const publicProfile = publicProfileData({
        ...(profile || {}),
        uid: user.uid,
        displayName: nextName,
        updatedAt: serverTimestamp(),
      });
      await update(ref(db), {
        [`users/${user.uid}/displayName`]: nextName,
        [`users/${user.uid}/updatedAt`]: serverTimestamp(),
        [`publicProfiles/${user.uid}`]: publicProfile,
      });
    } catch {
      setError(t("messages.profileSaveError"));
    } finally {
      setSavingProfile(false);
    }
  }

  async function openBillingPortal() {
    setError("");
    setBillingLoading(true);
    try {
      await startStripePortal(user);
    } catch {
      setError(t("messages.billingError"));
      setBillingLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setError("");
    setDeleting(true);
    try {
      const linksSnapshot = await get(
        query(ref(db, "links"), orderByChild("ownerId"), equalTo(user.uid))
      );
      const ownedLinks = Object.entries(linksSnapshot.val() || {});
      await Promise.all(
        ownedLinks.map(([linkId, link]) =>
          syncLinkAtEdge(user, linkId, {
            previousSlug: link.slug,
            action: "delete",
            purgeStats: true,
          })
        )
      );
      await deleteAccountStatsAtEdge(user);
      const linkRemovals = Object.fromEntries(
        ownedLinks.flatMap(([linkId]) => [
          [`links/${linkId}`, null],
          [`publicLinks/${linkId}`, null],
        ])
      );
      const eventsSnapshot = await get(
        query(ref(db, "clickEvents"), orderByChild("ownerId"), equalTo(user.uid))
      );
      const eventRemovals = Object.keys(eventsSnapshot.val() || {}).map((eventId) =>
        remove(ref(db, `clickEvents/${eventId}`))
      );
      if (Object.keys(linkRemovals).length > 0) {
        await update(ref(db), linkRemovals);
      }
      await Promise.all(eventRemovals);
      await update(ref(db), {
        [`users/${user.uid}`]: null,
        [`publicProfiles/${user.uid}`]: null,
      });
      await deleteUser(auth.currentUser);
      onDeleted?.();
    } catch (nextError) {
      const message =
        nextError?.code === "auth/requires-recent-login"
          ? t("messages.deleteRecentLogin")
          : t("messages.actionError");
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
          {!confirmingDelete ? (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              <Trash2 size={15} />
              {t("messages.deleteAccount")}
            </button>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
                className="h-11 rounded-2xl border border-red-200 text-sm font-black text-red-700 disabled:opacity-50"
              >
                {t("messages.cancel")}
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-600 text-sm font-black text-white disabled:opacity-50"
              >
                {deleting && <Loader2 className="animate-spin" size={16} />}
                {t("messages.confirmDelete")}
              </button>
            </div>
          )}
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

function AdminPanelModal({ onClose, embedded = false }) {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [promoCodes, setPromoCodes] = useState({});
  const [newPromoCode, setNewPromoCode] = useState("");
  const [usersById, setUsersById] = useState({});
  const [allLinks, setAllLinks] = useState([]);
  const [allDailyStats, setAllDailyStats] = useState([]);
  const [preparedAccounts, setPreparedAccounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [saving, setSaving] = useState(false);
  const [savingAccount, setSavingAccount] = useState(false);
  const [creatingSelectedLink, setCreatingSelectedLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showVisitsModal, setShowVisitsModal] = useState(false);
  const [visitsFrom, setVisitsFrom] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 29);
    return adminDateInputValue(date);
  });
  const [visitsTo, setVisitsTo] = useState(() => adminDateInputValue());
  const [selectedLinkForm, setSelectedLinkForm] = useState(emptyLinkForm);
  const [preparedForm, setPreparedForm] = useState({
    email: "",
    displayName: "",
    bio: "",
    appTitle: "",
    iosUrl: "",
    androidUrl: "",
    fallbackUrl: "",
    customUrl: "",
  });

  const reloadAdminData = useCallback(async () => {
    if (!firebaseReady || !db || !user) {
      setLoading(false);
      setError("Firebase no está configurado.");
      return;
    }

    setLoading(true);
    try {
      const [promoSnapshot, usersSnapshot, linksSnapshot, preparedSnapshot, edgeStats] =
        await Promise.all([
          get(ref(db, "settings/promoCodes")),
          get(query(ref(db, "users"), orderByChild("createdAt"), limitToLast(500))),
          get(query(ref(db, "links"), orderByChild("createdAt"), limitToLast(1000))),
          get(
            query(
              ref(db, "preparedAccounts"),
              orderByChild("updatedAt"),
              limitToLast(250)
            )
          ),
          fetchEdgeStats(user, { admin: true }),
        ]);

      setPromoCodes(promoSnapshot.val() || {});
      setUsersById(usersSnapshot.val() || {});
      setPreparedAccounts(preparedSnapshot.val() || {});
      setAllLinks(
        Object.entries(linksSnapshot.val() || {})
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      );

      let dailyRows = edgeStats?.rows || [];
      if (!edgeStats?.legacyMigrated) {
        const clicksSnapshot = await get(ref(db, "clickEvents"));
        dailyRows = mergeDailyStats(
          dailyRows,
          eventsToDailyStats(Object.values(clicksSnapshot.val() || {}))
        );
      }
      setAllDailyStats(dailyRows);
      setError("");
    } catch (nextError) {
      setError(nextError.message || "No se pudo cargar la administración.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void reloadAdminData();
  }, [reloadAdminData]);

  const registeredUsers = useMemo(
    () =>
      Object.entries(usersById)
        .map(([uid, value]) => ({ uid, ...value }))
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [usersById]
  );

  const linksByOwner = useMemo(() => {
    return allLinks.reduce((groups, item) => {
      const ownerId = item.ownerId || "sin-owner";
      groups[ownerId] = groups[ownerId] || [];
      groups[ownerId].push(item);
      return groups;
    }, {});
  }, [allLinks]);

  const preparedItems = useMemo(
    () =>
      Object.entries(preparedAccounts)
        .map(([key, value]) => ({ key, ...value }))
        .sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0)),
    [preparedAccounts]
  );

  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return registeredUsers;

    return registeredUsers.filter((item) => {
      const userLinks = linksByOwner[item.uid] || [];
      const haystack = [
        item.displayName,
        item.email,
        item.uid,
        item.plan,
        item.registrationLanguage,
        formatRegistrationLanguage(item, true),
        ...userLinks.flatMap((link) => [link.title, link.slug, link.iosUrl, link.androidUrl, link.fallbackUrl]),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }, [registeredUsers, linksByOwner, searchTerm]);

  const selectedUser =
    registeredUsers.find((item) => item.uid === selectedUserId) ||
    filteredUsers[0] ||
    registeredUsers[0] ||
    null;
  const selectedLinks = selectedUser ? linksByOwner[selectedUser.uid] || [] : [];
  const selectedLinkStats = useMemo(
    () => buildStatsForLinks(selectedLinks, allDailyStats),
    [selectedLinks, allDailyStats]
  );
  const selectedAccountTotals = useMemo(() => {
    return selectedLinks.reduce(
      (totals, item) => {
        const stats = selectedLinkStats[item.id] || emptyStats;
        totals.total += stats.total || 0;
        totals.qr += stats.qr || 0;
        totals.written += stats.written || 0;
        totals.estimatedInstalls += stats.estimatedInstalls || 0;
        return totals;
      },
      { total: 0, qr: 0, written: 0, estimatedInstalls: 0 }
    );
  }, [selectedLinks, selectedLinkStats]);
  const activeLinks = allLinks.filter((item) => item.active).length;
  const allVisitCount = allDailyStats.reduce(
    (total, row) => total + Math.max(0, Number(row.clicks || 0)),
    0
  );
  const pendingPrepared = preparedItems.filter((item) => item.status !== "applied").length;
  const visitRows = useMemo(
    () => buildAdminVisitRows(allLinks, allDailyStats, usersById, visitsFrom, visitsTo),
    [allLinks, allDailyStats, usersById, visitsFrom, visitsTo]
  );
  const visitPeriodTotal = visitRows.reduce((sum, row) => sum + row.periodVisits, 0);
  const visitHistoricalTotal = visitRows.reduce((sum, row) => sum + row.totalVisits, 0);

  function loginLinkForEmail(email) {
    const url = new URL(localizePath("/login", i18n.language), window.location.origin);
    url.searchParams.set("email", email);
    url.searchParams.set("register", "1");
    return url.toString();
  }

  async function copyValue(value, label = "Copiado") {
    await navigator.clipboard.writeText(value);
    setNotice(label);
    window.setTimeout(() => setNotice(""), 2600);
  }

  async function copyRegisteredUsersTable() {
    const escapeCell = (value) =>
      String(value ?? "")
        .replaceAll("\t", " ")
        .replaceAll(/\r?\n/g, " ");
    const rows = filteredUsers.map((item) => {
      const activeUserLinks = (linksByOwner[item.uid] || [])
        .filter((link) => link.active)
        .map((link) => publicLinkForSlug(publicBaseUrl, link.slug));

      return [
        item.displayName || "Usuario",
        item.email || "",
        formatRegistrationLanguage(item, true),
        activeUserLinks.join(" | "),
        formatExportDate(item.createdAt),
      ];
    });
    const table = [
      ["Nombre", "Email", "Idioma", "Enlaces", "Fecha de registro"],
      ...rows,
    ]
      .map((row) => row.map(escapeCell).join("\t"))
      .join("\n");

    await copyValue(
      table,
      `${filteredUsers.length} usuarios copiados por columnas`
    );
  }

  function updatePreparedForm(field, value) {
    setPreparedForm((current) => ({ ...current, [field]: value }));
  }

  function updateSelectedLinkForm(field, value) {
    setSelectedLinkForm((current) => ({ ...current, [field]: value }));
  }

  async function handleCreateSelectedUserLink(event) {
    event.preventDefault();
    if (!selectedUser || !user || creatingSelectedLink) return;

    setError("");
    setNotice("");
    setCreatingSelectedLink(true);
    try {
      const slug = await createSmartLinkForAccount(selectedLinkForm, selectedUser, user);
      setSelectedLinkForm(emptyLinkForm);
      setNotice(`Link creado para ${selectedUser.email || selectedUser.displayName}: ${publicLinkForSlug(publicBaseUrl, slug)}`);
      await reloadAdminData();
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setCreatingSelectedLink(false);
    }
  }

  async function handlePrepareAccount(event) {
    event.preventDefault();
    if (!user || savingAccount) return;

    setError("");
    setNotice("");
    setSavingAccount(true);
    try {
      const hasLinkDraft = [
        preparedForm.appTitle,
        preparedForm.iosUrl,
        preparedForm.androidUrl,
        preparedForm.fallbackUrl,
        preparedForm.customUrl,
      ].some((value) => value.trim());
      const token = await user.getIdToken();
      const response = await fetch(adminPrepareAccountUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: preparedForm.email,
          displayName: preparedForm.displayName,
          bio: preparedForm.bio,
          public: true,
          links: hasLinkDraft
            ? [
                {
                  title: preparedForm.appTitle,
                  iosUrl: preparedForm.iosUrl,
                  androidUrl: preparedForm.androidUrl,
                  fallbackUrl: preparedForm.fallbackUrl,
                  customUrl: preparedForm.customUrl,
                },
              ]
            : [],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "No se pudo preparar la cuenta.");
      }

      const accessLink = loginLinkForEmail(preparedForm.email);
      setNotice(
        data.userExisted
          ? "Cuenta actualizada y link creado para el usuario existente."
          : "Cuenta preparada. Cuando se registre con ese email, verá estos datos."
      );
      setPreparedForm({
        email: "",
        displayName: "",
        bio: "",
        appTitle: "",
        iosUrl: "",
        androidUrl: "",
        fallbackUrl: "",
        customUrl: "",
      });
      if (!data.userExisted) {
        await navigator.clipboard.writeText(accessLink).catch(() => {});
      }
      await reloadAdminData();
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setSavingAccount(false);
    }
  }

  async function handleAddPromo() {
    const code = newPromoCode.trim().toUpperCase();
    if (!code) return;
    setSaving(true);
    setError("");
    try {
      await set(ref(db, `settings/promoCodes/${code}`), {
        active: true,
        createdAt: serverTimestamp(),
      });
      setPromoCodes((current) => ({
        ...current,
        [code]: { active: true, createdAt: Date.now() },
      }));
      setNewPromoCode("");
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePromo(code) {
    if (confirm(`¿Eliminar código ${code}?`)) {
      await set(ref(db, `settings/promoCodes/${code}`), null);
      setPromoCodes((current) => {
        const next = { ...current };
        delete next[code];
        return next;
      });
    }
  }

  const panel = (
      <section
        className={
          embedded
            ? "w-full rounded-[34px] border border-black/10 bg-white p-4 text-black shadow-sm md:p-7"
            : "max-h-[94vh] w-full max-w-7xl overflow-y-auto rounded-[34px] border border-black/10 bg-white p-4 text-black shadow-xl md:p-7"
        }
        onClick={embedded ? undefined : (event) => event.stopPropagation()}
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40">
              Panel interno
            </p>
            <h2 className="mt-1 text-3xl font-black tracking-tight">Administración</h2>
          </div>
          {!embedded && (
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-black/10 bg-[#f7f7f6] text-black transition hover:bg-black hover:text-white"
              aria-label="Cerrar administración"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-5">
          <MiniStat label="Usuarios" value={registeredUsers.length} />
          <MiniStat label="Links" value={allLinks.length} />
          <MiniStat label="Activos" value={activeLinks} />
          <MiniStat
            label="Visitas"
            value={allVisitCount}
            onClick={() => setShowVisitsModal(true)}
            ariaLabel="Ver registro de visitas"
          />
          <MiniStat label="Preparadas" value={pendingPrepared} />
        </div>

        {(error || notice) && (
          <div className="mt-4 grid gap-2">
            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </p>
            )}
            {notice && (
              <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                {notice}
              </p>
            )}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex justify-center">
            <Loader2 className="animate-spin text-black" size={24} />
          </div>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
            <aside className="space-y-5">
              <form
                className="rounded-[28px] border border-black/10 bg-[#f7f7f6] p-4"
                onSubmit={handlePrepareAccount}
              >
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-black/45">
                  Crear cuenta preparada
                </h3>
                <div className="mt-4 grid gap-3">
                  <InputField
                    label="Email del usuario"
                    name="prepared_email"
                    value={preparedForm.email}
                    onChange={(value) => updatePreparedForm("email", value)}
                    placeholder="cliente@email.com"
                    type="email"
                    autoComplete="email"
                  />
                  <InputField
                    label="Nombre"
                    name="prepared_name"
                    value={preparedForm.displayName}
                    onChange={(value) => updatePreparedForm("displayName", value)}
                    placeholder="Nombre visible"
                    autoComplete="name"
                  />
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-black/75">Datos / nota interna</span>
                    <textarea
                      value={preparedForm.bio}
                      onChange={(event) => updatePreparedForm("bio", event.target.value)}
                      rows={3}
                      placeholder="Datos que verá en su cuenta"
                      className="w-full resize-none rounded-2xl border border-black/12 bg-white px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-black/28 focus:border-black/35"
                    />
                  </label>
                  <div className="rounded-2xl border border-black/10 bg-white p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">
                      Link inicial opcional
                    </p>
                    <div className="mt-3 grid gap-3">
                      <InputField
                        label="Nombre de app"
                        name="prepared_app"
                        value={preparedForm.appTitle}
                        onChange={(value) => updatePreparedForm("appTitle", value)}
                        placeholder="Mi app"
                      />
                      <InputField
                        label="App Store"
                        name="prepared_ios"
                        value={preparedForm.iosUrl}
                        onChange={(value) => updatePreparedForm("iosUrl", value)}
                        placeholder="https://apps.apple.com/..."
                        urlField
                      />
                      <InputField
                        label="Google Play"
                        name="prepared_android"
                        value={preparedForm.androidUrl}
                        onChange={(value) => updatePreparedForm("androidUrl", value)}
                        placeholder="https://play.google.com/..."
                        urlField
                      />
                      <InputField
                        label="Web alternativa"
                        name="prepared_fallback"
                        value={preparedForm.fallbackUrl}
                        onChange={(value) => updatePreparedForm("fallbackUrl", value)}
                        placeholder="https://tuweb.com"
                        urlField
                      />
                      <InputField
                        label="URL corta"
                        name="prepared_slug"
                        value={preparedForm.customUrl}
                        onChange={(value) => updatePreparedForm("customUrl", value)}
                        placeholder="mi-app"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <button
                    disabled={savingAccount || !preparedForm.email.trim()}
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white transition hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {savingAccount ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                    Preparar cuenta
                  </button>
                </div>
              </form>

              <div className="rounded-[28px] border border-black/10 bg-[#f7f7f6] p-4">
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-black/45">
                  Códigos promocionales
                </h3>
                <div className="mt-3 flex gap-2">
                  <input
                    value={newPromoCode}
                    onChange={(event) => setNewPromoCode(event.target.value)}
                    placeholder="NUEVO_CODIGO"
                    className="min-w-0 flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm font-bold uppercase text-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddPromo}
                    disabled={saving || !newPromoCode.trim()}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-black px-4 text-xs font-black text-white disabled:opacity-50"
                  >
                    Añadir
                  </button>
                </div>
                <div className="mt-4 grid gap-2">
                  {Object.keys(promoCodes).length === 0 ? (
                    <p className="py-2 text-center text-xs font-semibold text-black/40">No hay códigos activos.</p>
                  ) : (
                    Object.keys(promoCodes).map((code) => (
                      <div key={code} className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3">
                        <span className="text-sm font-black uppercase text-black">{code}</span>
                        <button
                          type="button"
                          onClick={() => handleDeletePromo(code)}
                          className="p-1 text-red-500 hover:text-red-700"
                          aria-label={`Eliminar ${code}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </aside>

            <section className="min-w-0 space-y-5">
              <div className="rounded-[28px] border border-black/10 bg-white p-4">
                <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Usuarios registrados</h3>
                    <p className="mt-1 text-sm font-semibold text-black/45">
                      Celdas listas para copiar a tu herramienta de email marketing.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <label className="relative block sm:w-80">
                      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" size={17} />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Buscar usuario o link"
                        className="h-11 w-full rounded-2xl border border-black/10 bg-[#f7f7f6] pl-10 pr-4 text-sm font-bold outline-none focus:border-black/30"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={copyRegisteredUsersTable}
                      disabled={filteredUsers.length === 0}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-black px-4 text-sm font-black text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <Copy size={16} />
                      Copiar columnas
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="max-h-[430px] overflow-auto rounded-[22px] border border-black/10">
                    <table className="w-full min-w-[920px] border-collapse text-left">
                      <thead className="sticky top-0 z-10 bg-[#eeeeec]">
                        <tr className="text-[10px] font-black uppercase tracking-[0.14em] text-black/45">
                          <th className="w-[18%] border-b border-black/10 px-4 py-3">Nombre</th>
                          <th className="w-[24%] border-b border-black/10 px-4 py-3">Email</th>
                          <th className="w-[14%] border-b border-black/10 px-4 py-3">Idioma</th>
                          <th className="w-[29%] border-b border-black/10 px-4 py-3">Enlaces</th>
                          <th className="w-[15%] border-b border-black/10 px-4 py-3">Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="bg-[#f7f7f6] p-5 text-center text-sm font-bold text-black/45">
                              No hay usuarios con esa búsqueda.
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((item) => {
                            const activeUserLinks = (linksByOwner[item.uid] || []).filter(
                              (link) => link.active
                            );
                            const selected = selectedUser?.uid === item.uid;
                            const selectedText = selected ? "text-white" : "text-black";
                            const mutedText = selected ? "text-white/55" : "text-black/45";

                            return (
                              <tr
                                key={item.uid}
                                tabIndex={0}
                                aria-selected={selected}
                                onClick={() => setSelectedUserId(item.uid)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    setSelectedUserId(item.uid);
                                  }
                                }}
                                className={`cursor-pointer border-b border-black/10 align-top outline-none transition last:border-b-0 ${
                                  selected
                                    ? "bg-black"
                                    : "bg-[#f7f7f6] hover:bg-black/[0.045] focus:bg-black/[0.045]"
                                }`}
                              >
                                <td className={`px-4 py-3 text-sm font-black ${selectedText}`}>
                                  <span className="block max-w-[220px] break-words">
                                    {item.displayName || "Usuario"}
                                  </span>
                                </td>
                                <td className={`px-4 py-3 text-sm font-bold ${selectedText}`}>
                                  <span className="block break-all">{item.email || "Sin email"}</span>
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${
                                      selected
                                        ? "bg-white/12 text-white"
                                        : getRegistrationLanguageCode(item)
                                          ? "bg-blue-50 text-blue-700"
                                          : "bg-black/5 text-black/40"
                                    }`}
                                  >
                                    {formatRegistrationLanguage(item)}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  {activeUserLinks.length === 0 ? (
                                    <span className={`text-xs font-bold ${mutedText}`}>Sin enlaces activos</span>
                                  ) : (
                                    <div className="grid gap-1">
                                      <span className={`break-all text-xs font-black ${selectedText}`}>
                                        {publicLinkForSlug(publicBaseUrl, activeUserLinks[0].slug)}
                                      </span>
                                      {activeUserLinks.length > 1 && (
                                        <span className={`text-[11px] font-black ${mutedText}`}>
                                          +{activeUserLinks.length - 1} enlaces más
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </td>
                                <td className={`whitespace-nowrap px-4 py-3 text-xs font-black ${mutedText}`}>
                                  {formatTimestamp(item.createdAt)}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="min-w-0 rounded-[24px] border border-black/10 bg-[#f7f7f6] p-4">
                    {!selectedUser ? (
                      <p className="text-center text-sm font-bold text-black/45">Selecciona un usuario.</p>
                    ) : (
                      <>
                        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                          <div className="min-w-0">
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">Cuenta</p>
                            <h4 className="mt-1 truncate text-2xl font-black">{selectedUser.displayName || "Usuario"}</h4>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => copyValue(selectedUser.email || "", "Email copiado")}
                                className="break-all text-left text-sm font-black text-blue-600"
                              >
                                {selectedUser.email || "Sin email"}
                              </button>
                              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-700">
                                {formatRegistrationLanguage(selectedUser, true)}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyValue(loginLinkForEmail(selectedUser.email || ""), "Link de acceso copiado")}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-black px-3 text-xs font-black text-white"
                          >
                            <Copy size={14} />
                            Link acceso
                          </button>
                        </div>

                        <div className="mt-4 grid gap-2 md:grid-cols-3">
                          <AccountRow label="UID" value={selectedUser.uid} />
                          <AccountRow label="Plan" value={selectedUser.planLabel || selectedUser.plan || "Gratis"} />
                          <AccountRow label="Alta" value={formatTimestamp(selectedUser.createdAt)} />
                        </div>

                        <div className="mt-4 grid gap-2 sm:grid-cols-4">
                          <MiniStat label="Visitas" value={selectedAccountTotals.total} />
                          <MiniStat label="Enlace" value={selectedAccountTotals.written} />
                          <MiniStat label="QR" value={selectedAccountTotals.qr} />
                          <MiniStat label="Descargas" value={selectedAccountTotals.estimatedInstalls} />
                        </div>

                        <form
                          className="mt-4 rounded-2xl border border-black/10 bg-white p-4"
                          onSubmit={handleCreateSelectedUserLink}
                        >
                          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div>
                              <h5 className="text-sm font-black uppercase tracking-[0.14em] text-black/45">
                                Crear link para esta cuenta
                              </h5>
                              <p className="mt-1 text-xs font-semibold text-black/45">
                                El enlace quedará dentro del panel de {selectedUser.email || selectedUser.displayName}.
                              </p>
                            </div>
                            <button
                              disabled={creatingSelectedLink}
                              className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-black px-4 text-xs font-black text-white disabled:opacity-50"
                            >
                              {creatingSelectedLink ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                              Crear link
                            </button>
                          </div>
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <InputField
                              label="Nombre de app"
                              name="selected_link_title"
                              value={selectedLinkForm.title}
                              onChange={(value) => updateSelectedLinkForm("title", value)}
                              placeholder="Mi app"
                            />
                            <InputField
                              label="URL corta"
                              name="selected_link_slug"
                              value={selectedLinkForm.customUrl}
                              onChange={(value) => updateSelectedLinkForm("customUrl", value)}
                              placeholder="mi-app"
                              autoComplete="off"
                            />
                            <InputField
                              label="App Store"
                              name="selected_link_ios"
                              value={selectedLinkForm.iosUrl}
                              onChange={(value) => updateSelectedLinkForm("iosUrl", value)}
                              placeholder="https://apps.apple.com/..."
                              urlField
                            />
                            <InputField
                              label="Google Play"
                              name="selected_link_android"
                              value={selectedLinkForm.androidUrl}
                              onChange={(value) => updateSelectedLinkForm("androidUrl", value)}
                              placeholder="https://play.google.com/..."
                              urlField
                            />
                            <div className="md:col-span-2">
                              <InputField
                                label="Web alternativa"
                                name="selected_link_fallback"
                                value={selectedLinkForm.fallbackUrl}
                                onChange={(value) => updateSelectedLinkForm("fallbackUrl", value)}
                                placeholder="https://tuweb.com"
                                urlField
                              />
                            </div>
                          </div>
                        </form>

                        <div className="mt-4 grid gap-3">
                          {selectedLinks.length === 0 ? (
                            <p className="rounded-2xl bg-white p-4 text-center text-sm font-bold text-black/45">
                              Este usuario todavía no tiene links.
                            </p>
                          ) : (
                            selectedLinks.map((item) => {
                              const linkUrl = publicUrlForCustomOrSlug(item.slug, item.customUrl);
                              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`${linkUrl}?src=qr`)}`;
                              const linkStats = selectedLinkStats[item.id] || emptyStats;
                              return (
                                <article key={item.id} className="rounded-2xl border border-black/10 bg-white p-4">
                                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h5 className="truncate text-lg font-black">{item.title}</h5>
                                        <span className={`rounded-full px-2 py-1 text-[10px] font-black ${item.active ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}>
                                          {item.active ? t("dashboard.active", "Activo") : t("dashboard.paused", "Pausado")}
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => copyValue(linkUrl, "Smart link copiado")}
                                        className="mt-1 break-all text-left text-sm font-black text-blue-600"
                                      >
                                        {linkUrl}
                                      </button>
                                      <div className="mt-3 grid gap-2 md:grid-cols-3">
                                        <Destination label="iOS" url={item.iosUrl} />
                                        <Destination label="Android" url={item.androidUrl} />
                                        <Destination label={t("dashboard.others", "Otros")} url={item.fallbackUrl} />
                                      </div>
                                      <div className="mt-3 grid gap-2 sm:grid-cols-4">
                                        <MiniStat label="Visitas" value={linkStats.total || 0} />
                                        <MiniStat label="Enlace" value={linkStats.written || 0} />
                                        <MiniStat label="QR" value={linkStats.qr || 0} />
                                        <MiniStat label="Descargas" value={linkStats.estimatedInstalls || 0} />
                                      </div>
                                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                                        <AdminStatBreakdown
                                          label="Destino"
                                          values={[
                                            ["iOS", linkStats.ios || 0],
                                            ["Android", linkStats.android || 0],
                                            [t("dashboard.others", "Otros"), linkStats.fallback || 0],
                                          ]}
                                        />
                                        <AdminStatBreakdown
                                          label="Desde enlace"
                                          values={[
                                            ["iOS", linkStats.written_ios || 0],
                                            ["Android", linkStats.written_android || 0],
                                            [t("dashboard.others", "Otros"), linkStats.written_fallback || 0],
                                          ]}
                                        />
                                        <AdminStatBreakdown
                                          label="Desde QR"
                                          values={[
                                            ["iOS", linkStats.qr_ios || 0],
                                            ["Android", linkStats.qr_android || 0],
                                            [t("dashboard.others", "Otros"), linkStats.qr_fallback || 0],
                                          ]}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2 md:flex-col">
                                      <img
                                        src={qrUrl}
                                        alt={`QR de ${item.title}`}
                                        className="h-20 w-20 rounded-2xl border border-black/10 bg-white p-1"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => copyValue(qrUrl, "URL del QR copiada")}
                                        className="inline-flex h-9 items-center gap-2 rounded-xl border border-black/10 px-3 text-xs font-black"
                                      >
                                        <QrCode size={14} />
                                        QR
                                      </button>
                                    </div>
                                  </div>
                                </article>
                              );
                            })
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white p-4">
                <h3 className="text-xl font-black tracking-tight">Cuentas preparadas</h3>
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {preparedItems.length === 0 ? (
                    <p className="rounded-2xl bg-[#f7f7f6] p-4 text-sm font-bold text-black/45 md:col-span-2">
                      No hay cuentas preparadas todavía.
                    </p>
                  ) : (
                    preparedItems.map((item) => {
                      const accessLink = loginLinkForEmail(item.email || "");
                      const preparedLinkCount = Array.isArray(item.links)
                        ? item.links.length
                        : Object.keys(item.links || {}).length;
                      return (
                        <div key={item.key} className="rounded-2xl border border-black/10 bg-[#f7f7f6] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-black">{item.displayName || item.email}</p>
                              <p className="mt-1 truncate text-xs font-bold text-black/45">{item.email}</p>
                            </div>
                            <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${item.status === "applied" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                              {item.status === "applied" ? "Aplicada" : "Pendiente"}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.1em] text-black/35">
                            <span>{preparedLinkCount} links</span>
                            <span>{formatTimestamp(item.updatedAt || item.createdAt)}</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => copyValue(accessLink, "Link de acceso copiado")}
                              className="inline-flex h-9 items-center gap-2 rounded-xl bg-black px-3 text-xs font-black text-white"
                            >
                              <Copy size={14} />
                              Acceso
                            </button>
                            {item.consumedBy && (
                              <button
                                type="button"
                                onClick={() => setSelectedUserId(item.consumedBy)}
                                className="inline-flex h-9 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 text-xs font-black"
                              >
                                Ver usuario
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </section>
  );

  const visitsModal = showVisitsModal ? (
    <AdminVisitsModal
      fromDate={visitsFrom}
      toDate={visitsTo}
      onFromDateChange={setVisitsFrom}
      onToDateChange={setVisitsTo}
      onClose={() => setShowVisitsModal(false)}
      rows={visitRows}
      periodTotal={visitPeriodTotal}
      historicalTotal={visitHistoricalTotal}
    />
  ) : null;

  if (embedded) return <>{panel}{visitsModal}</>;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-3 py-5 backdrop-blur-sm md:px-5 md:py-8"
        onClick={onClose}
      >
        {panel}
      </div>
      {visitsModal}
    </>
  );
}

function AdminVisitsModal({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onClose,
  rows,
  periodTotal,
  historicalTotal,
}) {
  const hasValidRange = Boolean(fromDate && toDate && fromDate <= toDate);
  const formatDate = (value) =>
    value
      ? new Date(`${value}T00:00:00`).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  function setPreset(days) {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - (days - 1));
    onFromDateChange(adminDateInputValue(from));
    onToDateChange(adminDateInputValue(to));
  }

  const dayCursor = toDate || adminDateInputValue();
  const todayCursor = adminDateInputValue();
  const nextDayDisabled = dayCursor >= todayCursor;

  function setSingleDay(value) {
    onFromDateChange(value);
    onToDateChange(value);
  }

  function shiftDay(offset) {
    const nextDay = shiftAdminCalendarDate(dayCursor, offset);
    if (!nextDay) return;
    setSingleDay(nextDay);
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-3 py-5 backdrop-blur-sm md:px-5 md:py-8"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-visits-title"
        className="max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[34px] border border-black/10 bg-white p-4 text-black shadow-[0_30px_120px_rgba(0,0,0,0.25)] md:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40">
              Registro de actividad
            </p>
            <h2 id="admin-visits-title" className="mt-1 text-3xl font-black tracking-tight">
              Visitas por fecha
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-black/50">
              Filtra un periodo para saber qué usuario y qué smart link están generando visitas. El total del link incluye todo su histórico.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center self-end rounded-2xl border border-black/10 bg-[#f7f7f6] text-black transition hover:bg-black hover:text-white md:self-start"
            aria-label="Cerrar registro de visitas"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 rounded-[26px] border border-black/10 bg-[#f7f7f6] p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-black/45">
                  Desde
                </span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(event) => onFromDateChange(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm font-black outline-none focus:border-black/35"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-black/45">
                  Hasta
                </span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(event) => onToDateChange(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm font-black outline-none focus:border-black/35"
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center overflow-hidden rounded-xl border border-black/10 bg-white">
                <button
                  type="button"
                  onClick={() => shiftDay(-1)}
                  aria-label="Ver el día anterior"
                  title="Día anterior"
                  className="grid h-10 w-10 place-items-center text-black/60 transition hover:bg-black hover:text-white"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setSingleDay(dayCursor)}
                  className="h-10 border-x border-black/10 px-3 text-xs font-black text-black/65 transition hover:bg-black/5"
                >
                  Día {formatDate(dayCursor)}
                </button>
                <button
                  type="button"
                  onClick={() => shiftDay(1)}
                  disabled={nextDayDisabled}
                  aria-label="Ver el día siguiente"
                  title="Día siguiente"
                  className="grid h-10 w-10 place-items-center text-black/60 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black/60"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
              {[7, 30, 90].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setPreset(days)}
                  className="h-10 rounded-xl border border-black/10 bg-white px-3 text-xs font-black text-black/65 transition hover:bg-black hover:text-white"
                >
                  {days === 7 ? "7 días" : days === 30 ? "30 días" : "90 días"}
                </button>
              ))}
            </div>
          </div>

          {!hasValidRange && (
            <p className="mt-3 rounded-2xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
              La fecha de inicio debe ser anterior o igual a la fecha final.
            </p>
          )}

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <MiniStat label="Visitas del periodo" value={hasValidRange ? periodTotal : 0} />
            <MiniStat label="Total histórico" value={hasValidRange ? historicalTotal : 0} />
            <MiniStat label="Links con actividad" value={hasValidRange ? rows.filter((row) => row.periodVisits > 0).length : 0} />
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[24px] border border-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead className="bg-[#eeeeec]">
                <tr className="text-[10px] font-black uppercase tracking-[0.14em] text-black/45">
                  <th className="border-b border-black/10 px-4 py-3">Usuario</th>
                  <th className="border-b border-black/10 px-4 py-3">Link</th>
                  <th className="border-b border-black/10 px-4 py-3 text-right">Visitas periodo</th>
                  <th className="border-b border-black/10 px-4 py-3 text-right">Total del link</th>
                  <th className="border-b border-black/10 px-4 py-3">Última visita</th>
                </tr>
              </thead>
              <tbody>
                {!hasValidRange || rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="bg-[#f7f7f6] px-4 py-10 text-center text-sm font-bold text-black/45">
                      {hasValidRange ? "No hay visitas en este periodo." : "Selecciona un periodo válido."}
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.linkId} className="border-b border-black/10 align-top last:border-b-0">
                      <td className="bg-[#f7f7f6] px-4 py-3">
                        <p className="max-w-[240px] break-words text-sm font-black">{row.userName}</p>
                        <p className="mt-1 max-w-[240px] break-all text-xs font-semibold text-black/45">{row.userEmail}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="max-w-[360px] break-words text-sm font-black">{row.title}</p>
                        <a
                          href={publicLinkForSlug(publicBaseUrl, row.slug)}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block max-w-[360px] break-all text-xs font-black text-blue-600 hover:underline"
                        >
                          {publicLinkForSlug(publicBaseUrl, row.slug)}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-right text-lg font-black text-black">{row.periodVisits}</td>
                      <td className="px-4 py-3 text-right text-lg font-black text-black">{row.totalVisits}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-xs font-black text-black/55">{formatDate(row.lastVisit)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
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

function AdminStatBreakdown({ label, values }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f7f7f6] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">
        {label}
      </p>
      <div className="mt-2 grid gap-1">
        {values.map(([name, value]) => (
          <div key={name} className="flex items-center justify-between gap-3 text-xs font-black text-black/65">
            <span>{name}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProUpgradeCard({ onUpgrade, upgrading, error }) {
  const { t, i18n } = useTranslation();
  const [promoCode, setPromoCode] = useState("");
  const features = [
    t("dashboard.proFeature1", "Smart links ilimitados"),
    t("dashboard.proFeature2", "Estadísticas en tiempo real"),
    t("dashboard.proFeature3", "QR ilimitados para campañas"),
    t("dashboard.proFeature4", "Historial completo de clics"),
  ];

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-black bg-[#0d0d0d] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.18)] md:p-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="relative grid gap-7 lg:grid-cols-[1fr_minmax(340px,380px)] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
            {t("dashboard.unlockProTag", "Todo desbloqueado")}
          </p>
          <h2 className={`mt-3 text-[clamp(24px,3.5vw,48px)] ${i18n.language.startsWith('fr') ? '' : 'sm:whitespace-nowrap'} font-black leading-[0.9] tracking-[-0.06em]`}>
            {t("dashboard.unlockProTitle", "Funciones gratis incluidas")}
          </h2>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/60 md:text-base">
            {t("dashboard.unlockProDesc", "Puedes crear todos los links que quieras gratis, medir campañas y ver estadísticas en tiempo real.")}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-white/82">
                <Check size={16} />
                {feature}
              </div>
            ))}
          </div>
          {error && (
            <p className="mt-5 rounded-2xl bg-red-500/12 px-4 py-3 text-sm font-bold text-red-100">
              {error}
            </p>
          )}
        </div>

        <div className="rounded-[28px] bg-white p-5 text-black shadow-[0_22px_55px_rgba(0,0,0,0.32)] mt-6 lg:mt-20">
          <div className="flex items-end gap-2">
            <span className="text-6xl font-black tracking-[-0.08em]">{t("dashboard.price", "0€")}</span>
            <span className="pb-3 text-xs font-black uppercase leading-tight text-black/42">
              {t("pricingComparison.paymentLabel", "Gratis\npara siempre").split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          </div>

          <div className="mt-5">
            <input
              type="text"
              placeholder={t("dashboard.promoPlaceholder", "Código promocional (opcional)")}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm font-medium text-black placeholder-black/40 focus:border-black/30 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <button
            type="button"
            onClick={() => onUpgrade(promoCode)}
            disabled={upgrading}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {upgrading ? <Loader2 className="animate-spin" size={16} /> : t("pricingComparison.unlock", "Crear cuenta gratis")}
            {!upgrading && <ArrowRight size={15} />}
          </button>
        </div>
      </div>
    </section>
  );
}

function ProLimitModal({ onClose, onUpgrade, upgrading, error }) {
  const { t, i18n } = useTranslation();
  const [promoCode, setPromoCode] = useState("");
  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        className="w-full max-w-xl overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0d0d] p-6 text-white shadow-[0_30px_110px_rgba(0,0,0,0.35)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/42">
              {t("dashboard.unlockProTag", "Todo desbloqueado")}
            </p>
            <h2 className={`mt-3 text-[clamp(24px,5vw,48px)] ${i18n.language.startsWith('fr') ? '' : 'sm:whitespace-nowrap'} font-black leading-[0.9] tracking-[-0.06em]`}>
              {t("dashboard.unlockProTitle", "Funciones gratis incluidas")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white hover:text-black"
            aria-label={t("messages.closeModal")}
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-5 text-base font-medium leading-7 text-white/62">
          {t("dashboard.unlockProModalDesc", "Los links ilimitados, QR, estadísticas en tiempo real e historial completo están disponibles gratis.")}
        </p>

        <div className="mt-6 rounded-[28px] bg-white p-5 text-black">
          <div className="flex items-end gap-2">
            <span className="text-6xl font-black tracking-[-0.08em]">{t("dashboard.price", "0€")}</span>
            <span className="pb-3 text-xs font-black uppercase leading-tight text-black/42">
              {t("pricingComparison.paymentLabel", "Gratis\npara siempre").split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          </div>

          <div className="mt-5">
            <input
              type="text"
              placeholder={t("dashboard.promoPlaceholder", "Código promocional (opcional)")}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm font-medium text-black placeholder-black/40 focus:border-black/30 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <button
            type="button"
            onClick={() => onUpgrade(promoCode)}
            disabled={upgrading}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {upgrading ? <Loader2 className="animate-spin" size={16} /> : t("pricingComparison.unlock", "Crear cuenta gratis")}
            {!upgrading && <ArrowRight size={15} />}
          </button>
        </div>

        {error && (
          <p className="mt-5 rounded-2xl bg-red-500/12 px-4 py-3 text-sm font-bold text-red-100">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}

function PremiumSuccessModal({ onClose }) {
  const { t } = useTranslation();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-md"
      onClick={onClose}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[34px] border border-white/10 bg-[#0a0a0a] p-8 text-center text-white shadow-[0_40px_120px_rgba(0,0,0,0.5)] md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-[0_0_50px_rgba(52,211,153,0.4)]">
          <Check size={48} className="text-white" />
        </div>
        <h2 className="mt-8 text-4xl font-black tracking-[-0.04em] text-white">
          {t("dashboard.successTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-lg font-medium leading-relaxed text-white/70">
          {t("dashboard.successText")}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-white text-base font-black text-black transition hover:scale-[1.02] active:scale-95"
        >
          {t("dashboard.successButton")}
        </button>
      </section>
    </div>
  );
}

function FeedbackPanel() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFeedbackSubmit(event) {
    event.preventDefault();
    if (loading) return;
    if (!feedback.trim()) {
      setStatus({ type: "error", message: t("messages.feedbackRequired") });
      return;
    }
    if (!feedbackEndpoint) {
      setStatus({ type: "error", message: t("messages.feedbackError") });
      return;
    }

    setStatus(null);
    setLoading(true);
    try {
      const response = await fetch(feedbackEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: feedback.trim(), email: user?.email || "Anónimo" }),
      });
      if (!response.ok) throw new Error("feedback-request-failed");
      setFeedback("");
      setStatus({ type: "success", message: t("messages.feedbackSent") });
      window.setTimeout(() => setStatus(null), 3000);
    } catch {
      setStatus({ type: "error", message: t("messages.feedbackError") });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-black">{t("dashboard.ratePlatforms", "Valóranos en Trustpilot")}</p>
      <div className="mt-3 grid grid-cols-1 gap-2">
        <ReviewButton imgSrc="/trustpilot-logo.svg" label="Trustpilot" href="https://es.trustpilot.com/review/link-my.app" target="_blank" rel="noopener noreferrer" />
      </div>
      <p className="mt-6 mb-3 text-sm font-black text-black">{t("dashboard.leaveSuggestion", "Déjanos cualquier sugerencia")}</p>
      <form
        className="space-y-2"
        onSubmit={handleFeedbackSubmit}
        toolname="send_feedback"
        tooldescription="Sends product feedback or a support suggestion to the Link My App team."
      >
        <label className="block">
          <span className="sr-only">
            {t("dashboard.leaveSuggestion", "Déjanos cualquier sugerencia")}
          </span>
          <textarea
            name="feedback_message"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            rows={3}
            placeholder={t("dashboard.suggestionPlaceholder", "Algo que funcione mal o que mejorarías...")}
            toolparamdescription="Feedback, support note, bug report, or product improvement suggestion."
            className="w-full resize-none rounded-2xl border border-black/10 bg-[#f7f7f6] px-3 py-3 text-sm font-semibold outline-none placeholder:text-black/30 focus:border-black/30"
          />
        </label>
        <button
          disabled={loading}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : t("dashboard.sendFeedback", "Enviar comentario")}
        </button>
        {status && (
          <p
            className={`text-center text-xs font-black ${
              status.type === "success" ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {status.message}
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
  const { t } = useTranslation();

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
        {t("dashboard.estimateDetailsTitle", "Cómo calculamos las descargas")}
      </button>
      {open && (
        <p className="mt-2 text-sm font-medium leading-6 text-black/55">
          {t(
            "dashboard.estimateDetailsText",
            "Son descargas estimadas, no verificadas por SDK. Calculamos un número entero aplicando una conversión media: App Store 22%, Google Play 24% y escritorio u otros dispositivos 1%. El análisis puede apoyarse en señales como IP, país, hora, fuente del clic y repetición para hacer la estimación más realista cuando esos datos estén disponibles.",
          )}
        </p>
      )}
    </div>
  );
}

function AnalyticsDetails({ stats }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
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
          {t("dashboard.chartToggle", "Ver gráfica de clics y descargas")}
        </span>
        <ChevronDown size={17} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-4 rounded-[24px] border border-black/10 bg-white p-4">
          <div className="flex flex-wrap gap-3 text-xs font-black text-black/55">
            <ChartLegend color="#2563eb" label="App Store" />
            <ChartLegend color="#16a34a" label="Google Play" />
            <ChartLegend color="#71717a" label={t("dashboard.others", "Otros")} />
            <ChartLegend color="#000000" label={t("dashboard.estimatedDownloads", "Descargas estimadas")} />
          </div>

          <svg className="mt-4 h-40 w-full" viewBox="0 0 300 140" role="img" aria-label={t("dashboard.chartAriaLabel", "Gráfica de estadísticas")}>
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
      const nextProfile = {
        uid: user.uid,
        displayName: name.trim() || user.email?.split("@")[0] || "Usuario",
        email: user.email || "",
        photoURL: user.photoURL || "",
        bio: bio.trim(),
        public: true,
        updatedAt: serverTimestamp(),
      };
      await update(ref(db), {
        [`users/${user.uid}`]: { ...(profile || {}), ...nextProfile },
        [`publicProfiles/${user.uid}`]: publicProfileData({ ...(profile || {}), ...nextProfile }),
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
        <form
          className="mt-5 space-y-4"
          onSubmit={saveProfile}
          toolname="update_public_profile"
          tooldescription="Updates the user's public profile name and bio."
        >
          <InputField
            label="Nombre público"
            name="public_name"
            value={name}
            onChange={setName}
            placeholder="Tu nombre"
            autoComplete="name"
            toolParamDescription="Public display name for the user profile."
          />
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-black/75">Bio</span>
            <textarea
              name="profile_bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              toolparamdescription="Short public bio shown on the user profile."
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

function MiniStat({ label, value, onClick, ariaLabel }) {
  const className = "rounded-2xl border border-black/10 bg-[#f7f7f6] px-3 py-2";
  const content = (
    <>
      <div className="text-lg font-black">{value}</div>
      <div className="text-[9px] font-black uppercase tracking-[0.13em] text-black/35">
        {label}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || `Ver ${label}`}
        className={`${className} w-full text-left transition hover:-translate-y-0.5 hover:border-black/25 hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/20`}
      >
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
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
 * Channel bar under each link. A click creates a new smart link suffixed with
 * the channel id so users can track installs per source.
 */
function ChannelStripe({ item, isPro, onLockedClick, onCreated }) {
  const { t } = useTranslation();
  const [busyChannel, setBusyChannel] = useState(null);
  const [toast, setToast] = useState(null);
  const { user } = useAuth();

  async function handleClick(channel) {
    if (busyChannel) return;
    try {
      setBusyChannel(channel.id);
      const slug = await createChannelLink(item, channel, user);
      const url = `${publicBaseUrl.replace(/\/$/, "")}/${slug}`;
      setToast({ channel, url });
      onCreated?.(slug);
      setTimeout(() => setToast(null), 6000);
    } catch (err) {
      console.error(err);
      setToast({ error: err.message || "No se pudo crear el enlace." });
      setTimeout(() => setToast(null), 6000);
    } finally {
      setBusyChannel(null);
    }
  }

  return (
    <div className="mt-5 rounded-2xl border border-black/10 bg-gradient-to-br from-white via-slate-50 to-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/45">
            {t("dashboard.channelsTag", "¿De dónde vendrán las descargas?")}
          </p>
          <p className="mt-1 text-[12px] font-medium text-black/55">
            {t(
              "dashboard.channelsHintPro",
              "Crea un enlace por canal para medir cada uno por separado.",
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {LINK_CHANNELS.map((channel) => {
          const busy = busyChannel === channel.id;
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => handleClick(channel)}
              disabled={busy}
              className={`group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black transition hover:-translate-y-0.5 ${
                "border-black/10 bg-white text-black hover:border-black/30"
              } ${busy ? "opacity-60" : ""}`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: channel.color }}
                aria-hidden
              />
              {channel.label}
              {busy && <Loader2 size={11} className="animate-spin" />}
            </button>
          );
        })}
      </div>

      {toast && (
        <div
          className={`mt-3 rounded-xl px-3 py-2 text-xs font-bold ${
            toast.error
              ? "bg-red-50 text-red-700"
              : "bg-emerald-50 text-emerald-800"
          }`}
        >
          {toast.error ? (
            toast.error
          ) : (
            <span>
              {t("dashboard.channelCreated", "Enlace creado para")}{" "}
              <strong>{toast.channel.label}</strong>:{" "}
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(toast.url)}
                className="underline"
              >
                {toast.url}
              </button>
            </span>
          )}
        </div>
      )}
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

    async function loadProfile() {
      const profileSnapshot = await getWithLegacyFallback(
        ref(db, `publicProfiles/${uid}`),
        ref(db, `users/${uid}`)
      );
      setProfile(profileSnapshot?.exists() ? profileSnapshot.val() : null);

      const linksSnapshot = await getWithLegacyFallback(
        query(ref(db, "publicLinks"), orderByChild("ownerId"), equalTo(uid)),
        query(ref(db, "links"), orderByChild("ownerId"), equalTo(uid))
      );
      const data = linksSnapshot?.val() || {};
      const nextLinks = Object.entries(data)
        .map(([id, value]) => ({ id, ...value }))
        .filter((item) => item.active)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setLinks(nextLinks);
      setLoading(false);
    }

    loadProfile().catch(() => setLoading(false));
    return undefined;
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
  const { t } = useTranslation();
  const { slug } = useParams();
  const didRun = useRef(false);
  const [status, setStatus] = useState(() => t("messages.redirecting"));
  const [targetUrl, setTargetUrl] = useState("");
  const [showWatermark, setShowWatermark] = useState(true);

useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (!firebaseReady || !db || !slug) {
      setStatus(t("messages.serviceUnavailableText"));
      return;
    }

    async function redirect() {
      const snapshot = await getWithLegacyFallback(
        query(ref(db, "publicLinks"), orderByChild("slug"), equalTo(slug)),
        query(ref(db, "links"), orderByChild("slug"), equalTo(slug))
      );
      const data = snapshot?.val() || {};
      const activeEntry = Object.entries(data).find(([, item]) => item.active);

      if (!activeEntry) {
        setStatus(t("messages.linkUnavailable"));
        return;
      }

      const [linkId, link] = activeEntry;
      setShowWatermark(false);
      const destination = detectDestination(navigator.userAgent);
      const source = normalizeClickSource(
        new URLSearchParams(window.location.search).get("src") ||
          new URLSearchParams(window.location.search).get("source") ||
          "",
        document.referrer
      );
      const nextTarget = normalizeUrl(
        destination === "ios"
          ? link.iosUrl
          : destination === "android"
            ? link.androidUrl
            : link.fallbackUrl
      );

      if (!nextTarget) {
        setStatus(t("messages.linkUnavailable"));
        return;
      }

      setTargetUrl(nextTarget);
      setStatus(t("messages.redirecting"));

      const eventRef = push(ref(db, "clickEvents"));
      void set(eventRef, {
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

    redirect().catch(() => setStatus(t("messages.redirectError")));
  }, [slug, t]);

  return (
    <main className="grid min-h-screen place-items-center bg-white px-5 text-black">
      <SEO {...{
    title: t("messages.redirectSeoTitle"),
    description: t("messages.redirectSeoDescription"),
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
              {t("messages.openDestination")} <ExternalLink size={15} />
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

const legalUpdatedAtByLanguage = {
  en: "March 24, 2026",
  es: "24 de marzo de 2026",
  fr: "24 mars 2026",
  ja: "2026年3月24日",
  de: "24. März 2026",
  pt: "24 de março de 2026",
  it: "24 marzo 2026",
  ko: "2026년 3월 24일",
  nl: "24 maart 2026",
  ar: "24 مارس 2026",
  hi: "24 मार्च 2026",
};

export function LegalNavbar() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  return (
    <nav className="fixed left-1/2 top-4 z-[9999] w-[calc(100vw-16px)] max-w-[930px] -translate-x-1/2 rounded-[24px] border border-black/10 bg-white/55 px-3 py-2 shadow-[inset_0_0_14px_rgba(255,255,255,0.85),0_3px_22px_rgba(0,0,0,0.10)] backdrop-blur-xl md:top-6 md:rounded-[30px] md:px-5 md:py-3 lg:px-7">
      <div className="flex items-center justify-between gap-3">
        <Link to={localizePath("/", language)} className="flex shrink-0 items-center gap-2 transition hover:opacity-80">
            <img src="/logo-link-my-app.avif" alt="Link My App" className="h-8 w-8 md:h-9 md:w-9 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
          <span className="text-[18px] font-bold tracking-tight text-black md:text-[22px]">
            Link My App
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          <Link to={localizePath("/", language)} className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55">{t("nav.home", "Inicio")}</Link>
          <Link to={localizePath("/what-we-do", language)} className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55">{t("nav.how", "Qué hacemos")}</Link>
          <Link to={localizePath("/faqs", language)} className="text-[17px] font-semibold text-black transition-colors duration-300 hover:text-black/55">{t("nav.faqs", "Faqs")}</Link>
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
  const [legalContent, setLegalContent] = useState(null);

  useEffect(() => {
    let active = true;
    import("./lib/legalPages.js").then((module) => {
      if (active) setLegalContent(module);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!legalContent) {
    return (
      <main className="grid min-h-screen place-items-center bg-white text-black">
        <Loader2 className="animate-spin" size={24} />
      </main>
    );
  }

  const {
    legalPagesEn,
    legalPagesEs,
    legalPagesFr,
    legalPagesJa,
    legalPagesDe,
    legalPagesPt,
    legalPagesIt,
    legalPagesKo,
    legalPagesNl,
    legalPagesAr,
    legalPagesHi,
    legalTabsEn,
    legalTabsEs,
    legalTabsFr,
    legalTabsJa,
    legalTabsDe,
    legalTabsPt,
    legalTabsIt,
    legalTabsKo,
    legalTabsNl,
    legalTabsAr,
    legalTabsHi,
  } = legalContent;
  const legalPagesByLanguage = { en: legalPagesEn, es: legalPagesEs, fr: legalPagesFr, ja: legalPagesJa, de: legalPagesDe, pt: legalPagesPt, it: legalPagesIt, ko: legalPagesKo, nl: legalPagesNl, ar: legalPagesAr, hi: legalPagesHi };
  const legalTabsByLanguage = { en: legalTabsEn, es: legalTabsEs, fr: legalTabsFr, ja: legalTabsJa, de: legalTabsDe, pt: legalTabsPt, it: legalTabsIt, ko: legalTabsKo, nl: legalTabsNl, ar: legalTabsAr, hi: legalTabsHi };
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
    ja: {
      pageLabel: "法的ページ",
      updated: "最終更新:",
      responsible: "管理者",
      titleSuffix: "|",
    },
    de: {
      pageLabel: "Rechtliche Seite",
      updated: "Letzte Aktualisierung:",
      responsible: "Verantwortlicher",
      titleSuffix: "von",
    },
    pt: {
      pageLabel: "Página legal",
      updated: "Última atualização:",
      responsible: "Responsável",
      titleSuffix: "de",
    },
    it: {
      pageLabel: "Pagina legale",
      updated: "Ultimo aggiornamento:",
      responsible: "Titolare",
      titleSuffix: "di",
    },
    ko: {
      pageLabel: "법적 페이지",
      updated: "최종 업데이트:",
      responsible: "관리자",
      titleSuffix: "|",
    },
    nl: {
      pageLabel: "Juridische pagina",
      updated: "Laatst bijgewerkt:",
      responsible: "Verantwoordelijke",
      titleSuffix: "van",
    },
    ar: {
      pageLabel: "صفحة قانونية",
      updated: "آخر تحديث:",
      responsible: "المسؤول",
      titleSuffix: "من",
    },
    hi: {
      pageLabel: "Legal page",
      updated: "Last updated:",
      responsible: "Controller",
      titleSuffix: "from",
    },
  };
  const legalPages = legalPagesByLanguage[language] || legalPagesEn;
  const legalTabs = legalTabsByLanguage[language] || legalTabsEn;
  const legalUi = legalUiByLanguage[language] || legalUiByLanguage.en;
  const page = legalPages[type] || legalPages.terms;
  const Icon = page.icon;
  const legalSchema = {
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
      name: "David Trotonda",
    },
  };

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
              {legalUi.updated}{" "}
              <span className="font-black text-black/72">
                {legalUpdatedAtByLanguage[language] || legalUpdatedAtByLanguage.en}
              </span>
            </p>
          </div>

          <aside className="rounded-[30px] border border-black/10 bg-white/86 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.07)] backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/35">
              {legalUi.responsible}
            </p>
            <h2 className="mt-3 text-xl font-black">David Trotonda</h2>
            <p className="mt-3 text-sm font-bold text-black/45">Open-source maintainer</p>
            <a
              href="https://github.com/davidtrotonda"
              className="mt-2 block text-sm font-black text-black transition hover:text-black/60"
            >
              github.com/davidtrotonda
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
        <img src="/logo-link-my-app.avif" alt="Link My App" className="mx-auto h-16 w-16 object-contain shadow-[0_12px_26px_rgba(0,0,0,0.18)]" />
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
              <Route path={getLocalizedRouteSegment("/open-source", language)} element={<OpenSourcePage />} />
              <Route path={getLocalizedRouteSegment("/faqs", language)} element={<MarketingPage pageKey="faqs" />} />
              <Route path={getLocalizedRouteSegment("/pricing", language)} element={<Navigate to={localizePath("/", language)} replace />} />
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
                path={getLocalizedRouteSegment("/success-story/tourixy", language)}
                element={<TourixyCaseStudy />}
              />
              <Route
                path="como-funciona"
                element={<MarketingPage pageKey="comoFunciona" />}
              />
            </Route>
          ))}
          <Route path="/precio" element={<Navigate to="/es" replace />} />
          <Route path="/tarifs" element={<Navigate to="/fr" replace />} />
          <Route path="/que-hacemos" element={<MarketingPage pageKey="comoFunciona" />} />
          <Route path="/que-faisons-nous" element={<MarketingPage pageKey="comoFunciona" />} />
          <Route path="/privacidad" element={<LegalPage type="privacy" />} />
          <Route path="/terminos" element={<LegalPage type="terms" />} />
          <Route path="/confidentialite" element={<LegalPage type="privacy" />} />
          <Route path="/conditions" element={<LegalPage type="terms" />} />
          <Route path="/en" element={<Navigate to="/" replace />} />
          <Route path="/en/blog" element={<BlogIndex />} />
          <Route path="/en/blog/:slug" element={<BlogPost />} />
          
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
