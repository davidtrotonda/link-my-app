import { howToPath } from "./contentRoutes.js";
import { localizePath } from "./i18nRoutes.js";

export const englishDownloadLinks = {
  generator: { href: localizePath("/#crear", "en"), label: "Create a free app download link" },
  qr: { href: localizePath("/qr-codes", "en"), label: "Create a QR code for your app" },
  websiteButton: {
    href: localizePath(howToPath("download-button-website", "en"), "en"),
    label: "Add an app download button to your website",
  },
};
