import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const docsRoot = join(root, "docs");
const required = [
  "README.md", ...Array.from({ length: 20 }, (_, index) => `${String(index).padStart(2, "0")}-${[
    "implementation-plan", "product-requirements", "research-findings", "content-information-architecture", "brand-design-system", "calm-prepared-garden-theme", "joyful-geometry-theme", "colour-modes-animation", "page-layouts", "high-level-design", "low-level-design", "data-model-api-contracts", "cloudflare-infrastructure", "admin-content-workflow", "seo-local-discovery", "security-privacy-child-safety", "testing-quality-gates", "deployment-operations-handover", "content-verification-checklist", "decisions-assumptions"
  ][index]}.md`),
  ...Array.from({ length: 6 }, (_, index) => `adr/${String(index + 1).padStart(4, "0")}-${[
    "use-astro-on-cloudflare-workers", "use-one-codebase-for-two-theme-deployments", "use-d1-and-cloudflare-access-for-admin", "exclude-photography-from-v1", "support-system-light-night-modes", "use-whatsapp-and-call-without-public-form"
  ][index]}.md`)
];

const discovered = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith(".md")) discovered.push(relative(docsRoot, path));
  }
}
await walk(docsRoot);
const errors = [];
for (const path of required) if (!discovered.includes(path)) errors.push(`Missing ${path}`);
const index = await readFile(join(docsRoot, "README.md"), "utf8");
for (const path of discovered) {
  const content = await readFile(join(docsRoot, path), "utf8");
  for (const field of ["Status:", "Audience:", "Owner:", "Last updated:"]) if (!content.slice(0, 600).includes(field)) errors.push(`${path}: missing ${field}`);
  if (path !== "README.md" && !index.includes(path)) errors.push(`${path}: orphaned from docs/README.md`);
  if ((content.match(/```/g) || []).length % 2 !== 0) errors.push(`${path}: unbalanced code fence`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Validated ${discovered.length} documentation files.`);
