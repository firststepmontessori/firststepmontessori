import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const scanRoots = [join(root, "src"), join(root, "public")];
const raster = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".heic"]);
const errors = [];
async function walk(directory) {
  let entries;
  try { entries = await readdir(directory, { withFileTypes: true }); } catch { return; }
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else {
      if (raster.has(extname(entry.name).toLowerCase())) errors.push(`Photographic/raster asset in shipped site: ${relative(root, path)}`);
      if ([".ts", ".tsx", ".astro", ".js"].includes(extname(entry.name))) {
        const content = await readFile(path, "utf8");
        if (/type=["']file["']|multipart\/form-data|\/api\/.*upload/i.test(content)) errors.push(`Upload capability detected: ${relative(root, path)}`);
      }
    }
  }
}
for (const directory of scanRoots) await walk(directory);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("No photos, raster assets or upload surfaces found in the shipped website.");
