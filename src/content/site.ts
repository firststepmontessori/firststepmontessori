import { getEntry } from "astro:content";
import type { SiteDocument } from "./schema";

export async function getSiteDocument(): Promise<SiteDocument> {
  const entry = await getEntry("site", "school");
  if (!entry) throw new Error("Missing required site content entry: site/school.md");
  return entry.data;
}
