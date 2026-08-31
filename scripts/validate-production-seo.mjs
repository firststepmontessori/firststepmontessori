import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const origin = "https://firststepmontessori.com";
const expectedTheme = process.env.EXPECTED_SITE_THEME;
const errors = [];

if (!new Set(["garden", "geometry"]).has(expectedTheme)) {
  errors.push("EXPECTED_SITE_THEME must be garden or geometry.");
}

const pages = new Map([
  ["index.html", "/"],
  ["about/index.html", "/about/"],
  ["montessori-approach/index.html", "/montessori-approach/"],
  ["programmes/index.html", "/programmes/"],
  ["daycare/index.html", "/daycare/"],
  ["admissions-contact/index.html", "/admissions-contact/"],
  ["blog/index.html", "/blog/"],
  ["blog/why-montessori-begins-with-practical-life/index.html", "/blog/why-montessori-begins-with-practical-life/"],
  ["privacy/index.html", "/privacy/"],
  ["child-safety-media/index.html", "/child-safety-media/"],
  ["accessibility/index.html", "/accessibility/"]
]);

for (const [file, pathname] of pages) {
  const html = await readFile(join(dist, file), "utf8");
  const canonical = `${origin}${pathname}`;
  if (!html.includes(`data-site-theme="${expectedTheme}"`)) errors.push(`${file}: wrong theme identity.`);
  if (!html.includes('<meta name="robots" content="index,follow,max-image-preview:none">')) errors.push(`${file}: missing production robots metadata.`);
  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) errors.push(`${file}: canonical is not ${canonical}.`);
  if (!html.includes('"@type":"WebSite"')) errors.push(`${file}: missing WebSite structured data.`);
  if (!html.includes('"LocalBusiness"')) errors.push(`${file}: missing LocalBusiness structured data.`);
}

const notFound = await readFile(join(dist, "404.html"), "utf8");
if (!notFound.includes('<meta name="robots" content="noindex,nofollow">')) errors.push("404.html: must remain noindex.");

const robots = await readFile(join(dist, "robots.txt"), "utf8");
const expectedRobots = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
if (robots !== expectedRobots) errors.push("robots.txt: production policy or sitemap origin is incorrect.");

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) errors.push("sitemap.xml: invalid XML declaration.");
if (!sitemap.includes(`<loc>${origin}/</loc>`)) errors.push("sitemap.xml: homepage is missing.");
if (!sitemap.includes(`<loc>${origin}/blog/</loc>`)) errors.push("sitemap.xml: journal is missing.");
if (/Preview sitemap disabled|<loc>https:\/\/(?!firststepmontessori\.com)/.test(sitemap)) errors.push("sitemap.xml: preview or foreign origin detected.");

const rss = await readFile(join(dist, "blog/rss.xml"), "utf8");
if (!rss.includes(origin)) errors.push("blog/rss.xml: production origin is missing.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified production SEO output for ${expectedTheme}: indexable pages, canonical origin, structured data, robots, sitemap and RSS.`);
