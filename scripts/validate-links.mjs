import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const root = process.cwd();
const checkExternal = process.argv.includes("--external");
const markdownFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith(".md")) markdownFiles.push(path);
  }
}

await walk(join(root, "docs"));
await walk(join(root, "design"));
markdownFiles.push(join(root, "README.md"));

const errors = [];
const externalLinks = new Set();
const linkPattern = /(?<!!)\[[^\]]*\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(linkPattern)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, "");
    if (!rawTarget || rawTarget.startsWith("#") || rawTarget.startsWith("mailto:") || rawTarget.startsWith("tel:")) continue;
    if (/^https?:\/\//.test(rawTarget)) {
      externalLinks.add(rawTarget);
      continue;
    }

    const pathOnly = decodeURIComponent(rawTarget.split("#")[0]);
    const target = resolve(dirname(file), pathOnly);
    if (!target.startsWith(root)) {
      errors.push(`${file}: link escapes repository: ${rawTarget}`);
      continue;
    }
    try {
      await access(target);
    } catch {
      errors.push(`${file}: missing link target: ${rawTarget}`);
    }
  }
}

if (checkExternal) {
  for (const url of externalLinks) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "FirstStepMontessori-LinkCheck/1.0" },
        redirect: "follow",
        signal: AbortSignal.timeout(15_000)
      });
      if (response.status >= 400 && response.status !== 403 && response.status !== 429) {
        errors.push(`External link returned ${response.status}: ${url}`);
      }
    } catch (error) {
      errors.push(`External link failed: ${url} (${error.message})`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated links in ${markdownFiles.length} Markdown files${checkExternal ? `, including ${externalLinks.size} external URLs` : ""}.`);
