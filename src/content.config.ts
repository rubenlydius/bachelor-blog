import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { memberIds } from './data/members';
import { parseDuration, pillarIds } from './data/pillars';

const member = z.enum(memberIds);

// One logged task, e.g. `{ task: Research, pillar: ux, time: "2:22:24" }`.
// `time` is h:mm, h:mm:ss or a number of hours.
const task = z
	.object({
		task: z.string().trim().min(1),
		pillar: z.enum(pillarIds),
		time: z.union([z.number().min(0), z.string().regex(/^\d+:[0-5]\d(:[0-5]\d)?$/, 'use h:mm or h:mm:ss')]),
	})
	.transform(({ task, pillar, time }) => ({ task, pillar, hours: parseDuration(time) }));

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
				// Weekly time post: the tasks each member worked on (see `task` above)
				time: z.partialRecord(member, z.array(task)).optional(),
			})
			// A post with time data is always tagged "time"
			.transform((data) =>
				data.time && !data.tags.includes('time') ? { ...data, tags: [...data.tags, 'time'] } : data,
			),
});

export const collections = { posts };
