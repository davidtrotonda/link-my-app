export const defaultLanguage = "en";
export const supportedLanguages = ["en", "es", "fr"];

export const languageOptions = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const USER_LANG_KEY = "link-my-app.lang";

const routeTranslations = {
  en: {
    "/": "/",
    "/login": "/login",
    "/dashboard": "/dashboard",
    "/pricing": "/pricing",
    "/faqs": "/faqs",
    "/what-we-do": "/what-we-do",
    "/qr-codes": "/qr-code-for-apps",
    "/use-cases": "/use-cases",
    "/how-to": "/how-to",
    "/blog": "/blog",
    "/success-story/tourixy": "/success-stories/tourixy",
    "/privacy": "/privacy",
    "/cookies": "/cookies",
    "/terms": "/terms",
  },
  es: {
    "/": "/",
    "/login": "/iniciar-sesion",
    "/dashboard": "/panel",
    "/pricing": "/precio",
    "/faqs": "/faqs",
    "/what-we-do": "/que-hacemos",
    "/qr-codes": "/codigo-qr-app",
    "/use-cases": "/casos-de-uso",
    "/how-to": "/como",
    "/blog": "/blog",
    "/success-story/tourixy": "/casos-de-exito/tourixy",
    "/privacy": "/privacidad",
    "/cookies": "/cookies",
    "/terms": "/terminos",
  },
  fr: {
    "/": "/",
    "/login": "/connexion",
    "/dashboard": "/tableau-de-bord",
    "/pricing": "/tarifs",
    "/faqs": "/faq",
    "/what-we-do": "/que-faisons-nous",
    "/qr-codes": "/code-qr-app",
    "/use-cases": "/cas-d-usage",
    "/how-to": "/comment",
    "/blog": "/blog",
    "/success-story/tourixy": "/cas-clients/tourixy",
    "/privacy": "/confidentialite",
    "/cookies": "/cookies",
    "/terms": "/conditions",
  },
};

const legacyCanonicalRoutes = {
  "/precio": "/pricing",
  "/pricing": "/pricing",
  "/tarifs": "/pricing",
  "/como-funciona": "/what-we-do",
  "/que-hacemos": "/what-we-do",
  "/what-we-do": "/what-we-do",
  "/que-faisons-nous": "/what-we-do",
  "/qr-codes": "/qr-codes",
  "/qr-code-for-apps": "/qr-codes",
  "/codigo-qr-app": "/qr-codes",
  "/code-qr-app": "/qr-codes",
  "/privacidad": "/privacy",
  "/privacy": "/privacy",
  "/confidentialite": "/privacy",
  "/terminos": "/terms",
  "/terms": "/terms",
  "/conditions": "/terms",
  "/cookies": "/cookies",
  "/faqs": "/faqs",
  "/faq": "/faqs",
  "/blog": "/blog",
  "/success-stories/tourixy": "/success-story/tourixy",
  "/casos-de-exito/tourixy": "/success-story/tourixy",
  "/cas-clients/tourixy": "/success-story/tourixy",
  "/login": "/login",
  "/iniciar-sesion": "/login",
  "/connexion": "/login",
  "/dashboard": "/dashboard",
  "/panel": "/dashboard",
  "/tableau-de-bord": "/dashboard",
};

export function normalizeLanguage(language = defaultLanguage) {
  const code = String(language || defaultLanguage).toLowerCase().split("-")[0];

  if (code === "ca" || code === "val") return "es";
  return supportedLanguages.includes(code) ? code : defaultLanguage;
}

/** Called when the user explicitly picks a language from a selector */
export function setUserChosenLanguage(language) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(USER_LANG_KEY, normalizeLanguage(language));
  }
}

export function detectBrowserLanguage() {
  if (typeof window !== "undefined") {
    const chosen = window.localStorage.getItem(USER_LANG_KEY);
    if (chosen) return normalizeLanguage(chosen);
  }
  if (typeof navigator === "undefined") return defaultLanguage;

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const lang of languages) {
    if (!lang) continue;
    const code = String(lang).toLowerCase().split("-")[0];
    if (supportedLanguages.includes(code) || code === "ca" || code === "val") {
      return normalizeLanguage(code);
    }
  }

  return defaultLanguage;
}

function splitUrl(path = "/") {
  const [pathWithQuery = "/", hash = ""] = String(path || "/").split("#");
  const [pathname = "/", query = ""] = pathWithQuery.split("?");
  return {
    pathname: pathname || "/",
    query,
    hash,
  };
}

export function getLanguageFromPath(pathname = "/") {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return supportedLanguages.includes(firstSegment) ? firstSegment : null;
}

export function stripLanguagePrefix(pathname = "/") {
  const segments = pathname.split("/").filter(Boolean);

  if (supportedLanguages.includes(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
  }

  return pathname || "/";
}

export function toCanonicalPath(pathname = "/") {
  const cleanPath = stripLanguagePrefix(pathname || "/").replace(/\/$/, "") || "/";
  if (cleanPath === "/") return "/";
  if (legacyCanonicalRoutes[cleanPath]) return legacyCanonicalRoutes[cleanPath];
  if (cleanPath.startsWith("/blog/")) return cleanPath;
  return cleanPath;
}

export function isLocalizableRoute(pathname = "/") {
  const cleanPath = stripLanguagePrefix(pathname || "/").replace(/\/$/, "") || "/";
  if (cleanPath === "/" || legacyCanonicalRoutes[cleanPath]) return true;
  return cleanPath.startsWith("/blog/");
}

export function getLocalizedRouteSegment(canonicalPath = "/", language = defaultLanguage) {
  const route = routeTranslations[normalizeLanguage(language)]?.[canonicalPath] || canonicalPath;
  return route === "/" ? "" : route.replace(/^\//, "");
}

export function localizePath(path = "/", language = defaultLanguage) {
  if (!path || /^(https?:|mailto:|tel:|#)/i.test(path)) return path;

  const languageCode = normalizeLanguage(language);
  const { pathname, query, hash } = splitUrl(path);
  const cleanPath = stripLanguagePrefix(pathname || "/");
  const canonicalPath = toCanonicalPath(cleanPath);
  const localizedRoute = routeTranslations[languageCode]?.[canonicalPath];
  const translatedPath = localizedRoute || canonicalPath;
  const localizedPath =
    languageCode === defaultLanguage
      ? translatedPath
      : translatedPath === "/"
        ? `/${languageCode}`
        : `/${languageCode}${translatedPath}`;

  return `${localizedPath}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

export function switchLanguagePath(currentPath = "/", language = defaultLanguage) {
  const { pathname, query, hash } = splitUrl(currentPath);
  const cleanPath = stripLanguagePrefix(pathname || "/");
  const canonicalPath = toCanonicalPath(cleanPath);
  const pathWithQuery = `${canonicalPath}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
  return localizePath(pathWithQuery, language);
}
