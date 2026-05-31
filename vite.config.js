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
        target:
          process.env.VITE_FIREBASE_FUNCTIONS_ORIGIN ||
          "http://localhost:5001/your-project/europe-west1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stripe\/(.*)$/, "/$1"),
      },
    },
  },
});
