import { getCollection, type CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

export function topicSlug(topic: string): string {
  return topic.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(date);
}

export async function getPublishedPosts(): Promise<BlogEntry[]> {
  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime());
  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.data.slug)) throw new Error(`Duplicate published blog slug: ${post.data.slug}`);
    slugs.add(post.data.slug);
  }
  return posts;
}

export async function getBlogTopics(): Promise<Array<{ name: string; slug: string; posts: BlogEntry[] }>> {
  const posts = await getPublishedPosts();
  const topics = new Map<string, { name: string; posts: BlogEntry[] }>();
  for (const post of posts) {
    for (const name of post.data.topics) {
      const slug = topicSlug(name);
      const topic = topics.get(slug) ?? { name, posts: [] };
      topic.posts.push(post);
      topics.set(slug, topic);
    }
  }
  return [...topics.entries()]
    .map(([slug, topic]) => ({ slug, ...topic }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
