import { defineCollection, z } from "astro:content"

import { glob } from "astro/loaders"
import formatDate from "./helpers/format-date"

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/data/posts" }),
	schema: z
		.object({
			id: z.string().default(crypto.randomUUID()),
			link: z.string().toLowerCase(),
			title: z.string().min(10),
			description: z.string().min(10).max(255),
			category: z.string(),
			image_url: z.string().min(10),
			alt: z.string().min(10),
			created_at: z.string(),
			updated_at: z.string(),
			language: z.enum(["en", "pt-br", "es"]),
			tags: z.array(z.string()).min(1),
		})
		.superRefine((data, ctx) => {
			data.created_at = formatDate(data.created_at, data.language)
			data.updated_at = formatDate(data.updated_at, data.language)
		}),
})

export const collections = { blog }
