import { access, readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const required = [
  "index.html", "404.html", "about/index.html", "montessori-approach/index.html",
  "programmes/index.html", "daycare/index.html", "admissions-contact/index.html",
  "blog/index.html", "blog/why-montessori-begins-with-practical-life/index.html",
  "blog/topic/montessori/index.html", "blog/rss.xml", "privacy/index.html",
  "child-safety-media/index.html", "accessibility/index.html", "robots.txt",
  "sitemap.xml", "_headers", "_redirects"
];
const errors = [];

for (const path of required) {
  try { await access(join(dist, path)); } catch { errors.push(`Missing static output: ${path}`); }
}

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (/\.(?:html|js|mjs)$/i.test(entry.name)) {
      const content = await readFile(path, "utf8");
      if (/cloudflare:workers|\/api\/admin|D1Database|AdminEditor/.test(content)) errors.push(`Runtime/admin reference in ${relative(root, path)}`);
    }
  }
}
await walk(dist);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Verified ${required.length} static artifacts and no Worker/admin runtime references.`);
