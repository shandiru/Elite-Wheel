import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Sitemap from "vite-plugin-sitemap";
import { CANONICAL_ROUTE_PATHS } from "./src/seo/routes.js";
import { DEFAULT_SITE_URL } from "./src/seo/siteMetadata.js";

const SITEMAP_DYNAMIC_ROUTES = CANONICAL_ROUTE_PATHS.filter((path) => path !== "/");

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: "es2018",
  },
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: process.env.VITE_SITE_URL || DEFAULT_SITE_URL,
      dynamicRoutes: SITEMAP_DYNAMIC_ROUTES,
      readable: true,
      generateRobotsTxt: true,
    }),
  ],
});
