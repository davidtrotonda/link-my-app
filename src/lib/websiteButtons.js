import { buildWebsiteLinkHtml, normalizeUrl } from "./links.js";

export const websiteButtonExample = {
  ios: "https://apps.apple.com/app/id6807142283",
  android: "https://play.google.com/store/apps/details?id=com.tourixy.app",
};

export const websiteButtonStyle = {
  display: "inline-block",
  margin: "0.25rem",
  padding: "0.625rem 1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#111827",
  color: "#fff",
  textDecoration: "none",
  font: "600 16px/1.5 system-ui, sans-serif",
  overflowWrap: "anywhere",
};

const inlineStyle = Object.entries(websiteButtonStyle)
  .map(([property, value]) => `${property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value}`)
  .join(";");

export function parseWebsiteButtonUrl(value, type) {
  const input = value.trim();
  if (/^[a-z][a-z0-9+.-]*:/i.test(input) && !/^https?:\/\//i.test(input)) return "";
  const normalized = normalizeUrl(input);
  if (!normalized) return "";
  const url = new URL(normalized);
  if (!url.hostname.includes(".") || url.username || url.password) return "";

  if (type === "ios") {
    const isAppleStore = ["apps.apple.com", "itunes.apple.com"].includes(url.hostname);
    return isAppleStore && /^\/(?:[a-z]{2}\/)?app\/(?:[^/]+\/)?id\d+\/?$/i.test(url.pathname)
      ? normalized
      : "";
  }
  if (type === "android") {
    const packageId = url.searchParams.get("id") || "";
    return url.hostname === "play.google.com" &&
      /^\/store\/apps\/details\/?$/.test(url.pathname) &&
      /^[a-z][\w]*(?:\.[a-z][\w]*)+$/i.test(packageId)
      ? normalized
      : "";
  }
  return type === "smart" ? normalized : "";
}

export function buildWebsiteButtonMarkup(buttons) {
  return buttons
    .map(({ href, label }) => buildWebsiteLinkHtml(href, label, { style: inlineStyle }))
    .join("\n");
}
