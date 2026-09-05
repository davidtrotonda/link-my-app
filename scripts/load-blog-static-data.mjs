import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { supportedLanguages } from "../src/lib/i18nRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

export async function loadStaticSeoData() {
  globalThis.window ||= {
    location: {
      href: "https://link-my.app/",
      origin: "https://link-my.app",
      pathname: "/",
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
    },
  };

  const server = await createServer({
    root: repoRoot,
    appType: "custom",
    logLevel: "error",
    server: { middlewareMode: true },
  });

  try {
    const [blogModule, tourixyModule] = await Promise.all([
      server.ssrLoadModule("/src/Blog.jsx"),
      server.ssrLoadModule("/src/TourixyCaseStudy.jsx"),
    ]);
    const blog = Object.fromEntries(
      supportedLanguages.map((language) => [
        language,
        blogModule.getLocalizedBlogStaticData(language),
      ]),
    );
    return {
      blog,
      tourixy: tourixyModule.contentByLanguage,
    };
  } finally {
    await server.close();
  }
}
