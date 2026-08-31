import type { APIRoute } from "astro";
import { getPublishedPosts } from "../../content/blog";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character] ?? character);

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.toString().replace(/\/$/, "") ?? "https://first-step-montessori.example";
  const items = (await getPublishedPosts()).map((post) => `<item><title>${escapeXml(post.data.title)}</title><link>${origin}/blog/${post.data.slug}/</link><guid>${origin}/blog/${post.data.slug}/</guid><pubDate>${post.data.publishedDate.toUTCString()}</pubDate><description>${escapeXml(post.data.description)}</description></item>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>First Step Montessori journal</title><link>${origin}/blog/</link><description>Notes about Montessori education and the early years.</description>${items}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
