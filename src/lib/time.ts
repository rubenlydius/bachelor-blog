import type { CollectionEntry } from 'astro:content';
import { type MemberId, memberIds } from '../data/members';
import { type Hours, hoursFromTasks, mergeTasks, type Task } from '../data/pillars';
import { getPosts } from './posts';

export interface MemberTime {
	total: Hours;
	/** Every task across all weeks, same tasks combined */
	tasks: Task[];
	/** One entry per time post this member logged hours in, newest first */
	weeks: { post: CollectionEntry<'posts'>; hours: Hours; tasks: Task[] }[];
}

// Sums the tasks from every time post, per member.
export async function getTimeByMember(): Promise<Record<MemberId, MemberTime>> {
	const posts = await getPosts();
	return Object.fromEntries(
		memberIds.map((id) => {
			const weeks = posts
				.filter((post) => post.data.time?.[id]?.length)
				.map((post) => {
					const tasks = mergeTasks(post.data.time![id]!);
					return { post, hours: hoursFromTasks(tasks), tasks };
				});
			const tasks = mergeTasks(weeks.flatMap((week) => week.tasks));
			return [id, { total: hoursFromTasks(tasks), tasks, weeks }];
		}),
	) as Record<MemberId, MemberTime>;
}
