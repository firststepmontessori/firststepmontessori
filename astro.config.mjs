import { defineConfig } from "astro/config";

const siteTheme = process.env.SITE_THEME === "geometry" ? "geometry" : "garden";
const siteEnvironment = process.env.SITE_ENV === "production" ? "production" : "preview";

export default defineConfig({
  output: "static",
  site: process.env.PUBLIC_SITE_URL || "https://first-step-montessori.example",
  vite: {
    define: {
      __SITE_THEME__: JSON.stringify(siteTheme),
      __SITE_ENVIRONMENT__: JSON.stringify(siteEnvironment)
    }
  }
});
