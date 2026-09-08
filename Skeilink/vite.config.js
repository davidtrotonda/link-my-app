import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/database"],
          icons: ["lucide-react"],
        },
      },
    },
  },
  server: {
    proxy: {
      "/api/stripe": {
        target: "https://europe-west1-skeilink.cloudfunctions.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stripe\/(.*)$/, "/$1"),
      },
    },
  },
});
