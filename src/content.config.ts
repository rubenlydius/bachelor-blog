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

// Posts are grouped in folders (per author, time/), but the URL only uses the file name:
// ruben/making-the-blog.mdx → /posts/making-the-blog/, some-post/index.mdx → /posts/some-post/.
// A `slug:` in the frontmatter overrides it. Duplicate names fail the build.
const posts = defineCollection({
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.mdx',
		generateId: ({ entry, data }) => {
			if (data.slug) return String(data.slug);
			const parts = entry.replace(/\.mdx$/, '').split('/');
			const name = parts.pop()!;
			return name === 'index' ? parts.pop()! : name;
		},
	}),
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
				// Slugs of the neighbouring posts in a storyline, shown as buttons at the bottom of the post
				prev: z.string().optional(),
				next: z.string().optional(),
				// Weekly time post: hours per member, e.g. `ruben: { ux: 2, development: 14 }`
				time: z.partialRecord(member, hours).optional(),
			})
			// A post with time data is always tagged "time"
			.transform((data) =>
				data.time && !data.tags.includes('time') ? { ...data, tags: [...data.tags, 'time'] } : data,
			),
});

export const collections = { posts };
