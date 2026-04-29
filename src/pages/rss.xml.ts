import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_NAME } from "../lib/site";

const siteTitle = SITE_NAME;
const siteDescription = SITE_DESCRIPTION;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET({ site }: { site: URL }) {
  const posts = await getCollection("posts");
  const sorted = posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );

  const items = sorted
    .map((post) => {
      const url = new URL(`/${post.id}/`, site).href;
      return `
        <item>
          <title>${escapeXml(post.data.title)}</title>
          <description>${escapeXml(post.data.description)}</description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
          ${post.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteTitle)}</title>
        <description>${escapeXml(siteDescription)}</description>
        <link>${new URL("/", site).href}</link>
        <language>pt-BR</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
