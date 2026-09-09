import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const requiredFirebaseBuildVariables = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID",
  "VITE_FIREBASE_DATABASE_URL",
];

const localizedContentModules = [
  "/src/lib/deContent.js",
  "/src/lib/itContent.js",
  "/src/lib/jaContent.js",
  "/src/lib/koContent.js",
  "/src/lib/nlContent.js",
  "/src/lib/arContent.js",
  "/src/lib/hiContent.js",
  "/src/lib/ptContent.js",
];

function manualChunks(id) {
  const moduleId = id.replaceAll("\\", "/");

  if (moduleId.includes("/node_modules/")) {
    if (
      moduleId.includes("/node_modules/react/") ||
      moduleId.includes("/node_modules/react-dom/") ||
      moduleId.includes("/node_modules/react-router-dom/")
    ) {
      return "react";
    }

    if (moduleId.includes("/node_modules/firebase/")) {
      return "firebase";
    }

    if (moduleId.includes("/node_modules/lucide-react/")) {
      return "icons";
    }

    if (
      moduleId.includes("/node_modules/i18next/") ||
      moduleId.includes("/node_modules/i18next-browser-languagedetector/") ||
      moduleId.includes("/node_modules/react-i18next/")
    ) {
      return "i18n";
    }
  }

  if (moduleId.endsWith("/src/LandingVisuals.jsx")) {
    return "landing-visuals";
  }

  if (
    moduleId.endsWith("/src/lib/legalPages.js") ||
    localizedContentModules.some((contentModule) => moduleId.endsWith(contentModule))
  ) {
    return "localized-content";
  }

  if (
    moduleId.includes("/src/lib/blogOverrides") ||
    moduleId.endsWith("/src/MoreBlogs.jsx") ||
    moduleId.endsWith("/src/MoreBlogs2.jsx") ||
    moduleId.endsWith("/src/MoreBlogs3.jsx") ||
    moduleId.endsWith("/src/TuBackBlogPost.jsx") ||
    moduleId.endsWith("/src/TienRankBlogPost.jsx")
  ) {
    return "blog-content";
  }

  return undefined;
}

export default defineConfig(({ command, mode }) => {
  if (command === "build") {
    const buildEnvironment = {
      ...loadEnv(mode, process.cwd(), ""),
      ...process.env,
    };
    const missingVariables = requiredFirebaseBuildVariables.filter(
      (variableName) => !String(buildEnvironment[variableName] || "").trim(),
    );

    if (missingVariables.length > 0) {
      throw new Error(
        `Missing required Firebase build variables: ${missingVariables.join(", ")}`,
      );
    }
  }

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks,
        },
      },
    },
    server: {
      proxy: {
        "/api/stripe": {
          target:
            process.env.VITE_FIREBASE_FUNCTIONS_ORIGIN ||
            "http://localhost:5001/your-project/europe-west1",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/stripe\/(.*)$/, "/$1"),
        },
      },
    },
  };
});
