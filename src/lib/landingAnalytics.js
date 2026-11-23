export const analyticsConsentKey = "link-my-app.cookie-consent";
const measurementId = import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID;
let analyticsStarted = false;

export function readAnalyticsPreference() {
  try {
    return window.localStorage.getItem(analyticsConsentKey);
  } catch {
    return null;
  }
}

export function startAnalytics() {
  if (!/^G-[A-Z0-9]+$/.test(measurementId || "") || readAnalyticsPreference() !== "accepted") {
    return false;
  }
  if (analyticsStarted) return true;

  analyticsStarted = true;
  window.dataLayer ||= [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
  return true;
}

export function canTrackLandingForm(page) {
  return (page === "/" || page === "/es") && startAnalytics();
}

export function trackLandingFormEvent(eventName, page) {
  if (!canTrackLandingForm(page)) return false;
  window.gtag("event", eventName, { landing_form_page: page });
  return true;
}
