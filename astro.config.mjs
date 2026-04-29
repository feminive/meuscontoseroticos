// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeMarkdownCallouts from "./src/lib/rehype-md-callout.js";

export default defineConfig({
  site: "https://www.meuscontoseroticos.com.br",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeMarkdownCallouts],
  },
});
