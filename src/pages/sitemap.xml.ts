import type { APIRoute } from "astro";
import { getBlogTopics, getPublishedPosts } from "../content/blog";
import { SITE_ENVIRONMENT } from "../lib/theme";

const paths = ["/", "/about/", "/montessori-approach/", "/programmes/", "/daycare/", "/admissions-contact/", "/blog/", "/privacy/", "/child-safety-media/", "/accessibility/"];
const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;

export const GET: APIRoute = async ({ site }) => {
  if (SITE_ENVIRONMENT !== "production") {
    return new Response(emptySitemap, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
  }
  const origin = site?.toString().replace(/\/$/, "") ?? "";
  const posts = await getPublishedPosts();
  const topics = await getBlogTopics();
  const blogPaths = [
    ...posts.map((post) => `/blog/${post.data.slug}/`),
    ...topics.map((topic) => `/blog/topic/${topic.slug}/`)
  ];
  const urls = [...paths, ...blogPaths].map((path) => `<url><loc>${origin}${path}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
