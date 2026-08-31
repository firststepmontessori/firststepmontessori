import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { JSDOM } from "jsdom";

const root = process.cwd();
const docsRoot = join(root, "docs");
const files = [];
const errors = [];
let diagramCount = 0;

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith(".md")) files.push(path);
  }
}

await walk(docsRoot);
const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, "navigator", { configurable: true, value: dom.window.navigator });
const { default: mermaid } = await import("mermaid");
mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });

for (const file of files) {
  const content = await readFile(file, "utf8");
  const blocks = content.matchAll(/```mermaid\s*\n([\s\S]*?)```/g);
  let index = 0;
  for (const block of blocks) {
    index += 1;
    diagramCount += 1;
    try {
      await mermaid.parse(block[1]);
    } catch (error) {
      errors.push(`${relative(root, file)} diagram ${index}: ${error.message}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${diagramCount} Mermaid diagrams in ${files.length} documentation files.`);
