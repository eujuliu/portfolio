import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({
		base: './src/data/blog',
		pattern: '**/*.md',
	}),
	schema: z.object({
		id: z.string().default(crypto.randomUUID()),
		title: z.string(),
		subtitle: z.string(),
		unique_name: z.string(),
		image: z.string().optional(),
		publishedAt: z.string(),
		tags: z.array(z.string()).optional(),
		language: z.enum(['pt-br', 'en']),
	}),
});

export const collections = { blog };
