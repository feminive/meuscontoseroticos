// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import rehypeMarkdownCallouts from "./src/lib/rehype-md-callout.js";

const postsDir = new URL("./src/content/posts", import.meta.url);
const MIN_TRACK_POSTS = 2;

function slugifyTag(tag) {
  return tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readPostSitemapData() {
  const posts = readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const body = readFileSync(join(postsDir.pathname, file), "utf8");
      const id = file.replace(/\.md$/, "");
      const date =
        body.match(/^updatedAt:\s*(.+)$/m)?.[1] ??
        body.match(/^publishedAt:\s*(.+)$/m)?.[1] ??
        body.match(/^published:\s*(.+)$/m)?.[1];
      const tagsValue = body.match(/^tags:\s*(.+)$/m)?.[1] ?? "";
      const tags = tagsValue
        .split(",")
        .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);

      return {
        id,
        lastmod: date ? new Date(date).toISOString() : undefined,
        tags,
      };
    });

  const postLastmod = new Map();
  const tagCounts = new Map();

  for (const post of posts) {
    if (post.lastmod) {
      postLastmod.set(`/${post.id}/`, post.lastmod);
      postLastmod.set(`/${post.id.toLowerCase()}/`, post.lastmod);
    }
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      tagCounts.set(slug, (tagCounts.get(slug) ?? 0) + 1);
    }
  }

  const publicTrackSlugs = new Set(
    [...tagCounts.entries()]
      .filter(([, count]) => count >= MIN_TRACK_POSTS)
      .map(([slug]) => slug)
  );

  return { postLastmod, publicTrackSlugs };
}

const { postLastmod, publicTrackSlugs } = readPostSitemapData();

export default defineConfig({
  site: "https://meuscontoseroticos.com.br",
  integrations: [
    sitemap({
      filter(page) {
        const { pathname } = new URL(page);
        const track = pathname.match(/^\/trilhas\/([^/]+)\/$/);
        return !track || publicTrackSlugs.has(track[1]);
      },
      serialize(item) {
        const { pathname } = new URL(item.url);
        return {
          ...item,
          lastmod: postLastmod.get(pathname) ?? item.lastmod,
        };
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeMarkdownCallouts],
  },
});
