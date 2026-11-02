import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { memberIds } from './data/members';

const member = z.enum(memberIds);

// Hours per pillar for one member; missing pillars count as 0
const hours = z.object({
	ux: z.number().min(0).default(0),
	design: z.number().min(0).default(0),
	development: z.number().min(0).default(0),
});

// Each post lives in its own folder: src/content/posts/<slug>/index.mdx (+ its images).
const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.mdx' }),
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string(),
				date: z.coerce.date(),
				updated: z.coerce.date().optional(),
				author: member.optional(),
				cover: image().optional(),
				coverAlt: z.string().default(''),
				tags: z.array(z.string().trim().toLowerCase()).default([]),
				draft: z.boolean().default(false),
				// Weekly time post: hours per member, e.g. `ruben: { ux: 2, development: 14 }`
				time: z.partialRecord(member, hours).optional(),
			})
			// A post with time data is always tagged "time"
			.transform((data) =>
				data.time && !data.tags.includes('time') ? { ...data, tags: [...data.tags, 'time'] } : data,
			),
});

export const collections = { posts };
