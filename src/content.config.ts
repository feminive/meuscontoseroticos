import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      published: z.date().optional(),
      publishedAt: z.date().optional(),
      updatedAt: z.date().optional(),
      chapter: z.number().optional(),
      category: z.string().optional(),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use um slug em kebab-case.")
        .optional(),
      excerpt: z.string().optional(),
      readingTime: z.string().optional(),
      image: z.string().url().optional(),
      faq: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .optional(),
      tags: z
        .preprocess(
          (value) => value ?? "",
          z.union([z.string(), z.array(z.string())])
        )
        .transform((value) =>
          Array.isArray(value)
            ? value
            : value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
        )
        .refine((tags) => tags.length > 0, {
          message: "Use pelo menos uma tag no frontmatter.",
        }),
      featured: z.boolean().optional(),
    })
    .transform((data) => ({
      ...data,
      publishedAt: data.publishedAt ?? data.published,
    }))
    .refine((data) => data.publishedAt, {
      message: "Use published ou publishedAt no frontmatter.",
      path: ["publishedAt"],
    }),
});

export const collections = { posts };
