import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogPostSchema, siteDocumentSchema } from "./content/schema";

const site = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/site" }),
  schema: siteDocumentSchema
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogPostSchema
});

export const collections = { blog, site };
