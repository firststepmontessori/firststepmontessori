import type { APIRoute } from "astro";
import { SITE_ENVIRONMENT } from "../lib/theme";

const paths = ["/", "/about", "/montessori-approach", "/programmes", "/daycare", "/admissions-contact", "/privacy", "/child-safety-media", "/accessibility"];

export const GET: APIRoute = ({ site }) => {
  if (SITE_ENVIRONMENT !== "production") return new Response("Preview sitemap disabled", { status: 404 });
  const origin = site?.toString().replace(/\/$/, "") ?? "";
  const urls = paths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
