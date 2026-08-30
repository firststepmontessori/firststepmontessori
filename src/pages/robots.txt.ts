import type { APIRoute } from "astro";
import { SITE_ENVIRONMENT } from "../lib/theme";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, "") ?? "https://first-step-montessori.example";
  const body = SITE_ENVIRONMENT === "production"
    ? `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
