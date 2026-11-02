import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each post lives in its own folder: src/content/posts/<slug>/index.mdx (+ its images).
const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			updated: z.coerce.date().optional(),
			cover: image().optional(),
			coverAlt: z.string().default(''),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

export const collections = { posts };
