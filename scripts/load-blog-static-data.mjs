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
    // These scripts load two explicit SSR modules and do not need Vite's HTML
    // dependency crawler. Disabling discovery avoids scanning the legacy
    // duplicate app under Skeilink/ and competing with the SSR transform.
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true },
  });

  try {
    // Prime Vite's compatibility runner with a tiny module, then extend the
    // transport window for the large JSX content graph. The default 60-second
    // limit is too short on slower Windows filesystems, while Linux CI usually
    // finishes well below it.
    await server.ssrLoadModule("/src/lib/i18nRoutes.js");
    if (server._ssrCompatModuleRunner?.transport) {
      server._ssrCompatModuleRunner.transport.timeout = 300_000;
    }

    // Both entry points import App.jsx. Loading them concurrently can make the
    // Vite SSR transport evaluate that large graph twice and time out on
    // Windows. The second sequential load reuses Vite's module cache.
    const blogModule = await server.ssrLoadModule("/src/Blog.jsx");
    const tourixyModule = await server.ssrLoadModule("/src/TourixyCaseStudy.jsx");
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
