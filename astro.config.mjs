import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";

const siteTheme = process.env.SITE_THEME === "geometry" ? "geometry" : "garden";
const siteEnvironment = process.env.SITE_ENV === "production" ? "production" : "preview";

export default defineConfig({
  output: "server",
  adapter: cloudflare({ platformProxy: { enabled: true }, imageService: "passthrough" }),
  integrations: [preact()],
  session: false,
  site: process.env.PUBLIC_SITE_URL || "https://first-step-montessori.example",
  vite: {
    define: {
      __SITE_THEME__: JSON.stringify(siteTheme),
      __SITE_ENVIRONMENT__: JSON.stringify(siteEnvironment)
    }
  }
});
