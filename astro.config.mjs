// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// Before you connect a Sanity project, the site uses sample content.
// A placeholder ID lets the integration load. See README.md, "Connect Sanity".
const projectId = env.PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = env.PUBLIC_SANITY_DATASET || "production";

// @sanity/astro 3.5.1's module-dedupe plugin builds a broken `sanity` alias on Windows
// (it points at sanity/package.json), so turn it off and apply the same dedupe in `vite` below.
process.env.SANITY_ASTRO_DISABLE_MODULE_DEDUPE = "1";

export default defineConfig({
  // Set this to the production URL. Astro uses it for canonical and social-image URLs.
  site: env.PUBLIC_SITE_URL || "http://localhost:4321",
  output: "static",
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: "2026-10-01",
      // Static builds read fresh data from the API, not the CDN cache.
      useCdn: false,
      // The editor opens the Studio at https://<your-site>/admin
      studioBasePath: "/admin",
    }),
    react(),
  ],
  // Astro downloads these at build time and serves them from the site itself.
  // src/layouts/Base.astro loads them; src/styles/global.css uses them.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      weights: [400],
      styles: ["normal", "italic"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 700"],
      styles: ["normal"],
      fallbacks: ["sans-serif"],
    },
  ],
  vite: {
    resolve: {
      dedupe: ["react", "react-dom", "react-dom/client", "styled-components", "sanity", "@sanity/ui"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react-compiler-runtime",
        "react-is",
        "styled-components",
        "lodash/startCase.js",
      ],
    },
  },
});
