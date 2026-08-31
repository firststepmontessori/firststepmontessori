import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { siteDocumentSchema } from "./content/schema";

const site = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/site" }),
  schema: siteDocumentSchema
});

export const collections = { site };
