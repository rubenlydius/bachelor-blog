import type { CollectionEntry } from 'astro:content';
import { type MemberId, memberIds } from '../data/members';
import { emptyHours, type Hours, pillars } from '../data/pillars';
import { getPosts } from './posts';

export interface MemberTime {
	total: Hours;
	/** One entry per time post this member logged hours in, newest first */
	weeks: { post: CollectionEntry<'posts'>; hours: Hours }[];
}

// Sums the hours from every time post, per member.
export async function getTimeByMember(): Promise<Record<MemberId, MemberTime>> {
	const result = Object.fromEntries(
		memberIds.map((id) => [id, { total: emptyHours(), weeks: [] }]),
	) as Record<MemberId, MemberTime>;

	for (const post of await getPosts()) {
		for (const id of memberIds) {
			const hours = post.data.time?.[id];
			if (!hours) continue;
			result[id].weeks.push({ post, hours });
			for (const pillar of pillars) result[id].total[pillar.id] += hours[pillar.id];
		}
	}
	return result;
}
