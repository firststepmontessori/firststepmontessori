import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

const blogRoot = join(process.cwd(), "src", "content", "blog");
const errors = [];

for (const entry of await readdir(blogRoot, { withFileTypes: true })) {
  if (!entry.isFile() || extname(entry.name) !== ".md") continue;
  const path = join(blogRoot, entry.name);
  const content = await readFile(path, "utf8");
  const slug = content.match(/^slug:\s*([^\n]+)$/m)?.[1]?.trim();
  if (!slug) errors.push(`${entry.name}: missing slug`);
  if (slug && slug !== basename(entry.name, ".md")) errors.push(`${entry.name}: filename must match slug '${slug}'`);
  if (/!\[[^\]]*\]\(/.test(content)) errors.push(`${entry.name}: Markdown images are not allowed; use an approved illustration field`);
  if (/^\s*<\/?[A-Za-z][^>]*>/m.test(content)) errors.push(`${entry.name}: embedded HTML is not allowed`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Validated blog filenames, slugs and photo-free Markdown boundaries.");
