import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts" }),
  schema: z.object({
    slug: z.string().nonempty(),
    title: z.string().nonempty(),
    description: z.string().nonempty().min(25),
    image: z.string().nonempty(),
    tags: z.array(z.string().min(3).max(20)).max(8),
    publishedAt: z.date().transform((str) => new Date(str)),
  }),
});

export const collections = { posts };
