// The three pillars hours are logged against. Ids match the post tags.
// Colors are CSS tokens in global.css (validated as a colorblind-safe set).
export const pillars = [
	{ id: 'ux', label: 'UX', color: 'var(--pillar-ux)' },
	{ id: 'design', label: 'Design', color: 'var(--pillar-design)' },
	{ id: 'development', label: 'Development', color: 'var(--pillar-development)' },
] as const;

export const pillarIds = ['ux', 'design', 'development'] as const;
export type PillarId = (typeof pillarIds)[number];
export type Hours = Record<PillarId, number>;

/** One logged task: what someone worked on, under which pillar, for how long (in hours) */
export interface Task {
	task: string;
	pillar: PillarId;
	hours: number;
}

export const getPillar = (id: PillarId) => pillars.find((pillar) => pillar.id === id)!;
export const emptyHours = (): Hours => ({ ux: 0, design: 0, development: 0 });
export const totalHours = (hours: Hours) => hours.ux + hours.design + hours.development;

/** Hours per pillar, summed from a list of tasks */
export function hoursFromTasks(tasks: Task[]): Hours {
	const hours = emptyHours();
	for (const task of tasks) hours[task.pillar] += task.hours;
	return hours;
}

/** Combines tasks with the same name and pillar, sorted by pillar, then longest first */
export function mergeTasks(tasks: Task[]): Task[] {
	const merged = new Map<string, Task>();
	for (const task of tasks) {
		const key = `${task.pillar}:${task.task.toLowerCase()}`;
		const existing = merged.get(key);
		if (existing) existing.hours += task.hours;
		else merged.set(key, { ...task });
	}
	return [...merged.values()].sort(
		(a, b) => pillarIds.indexOf(a.pillar) - pillarIds.indexOf(b.pillar) || b.hours - a.hours,
	);
}

/** "1:30", "1:30:15" (h:mm or h:mm:ss) or a number of hours → hours */
export function parseDuration(value: number | string): number {
	if (typeof value === 'number') return value;
	const [h, m = 0, s = 0] = value.split(':').map(Number);
	return h + m / 60 + s / 3600;
}

/** 12.5 → "12.5h", rounded to one decimal */
export const formatHours = (n: number) => `${Math.round(n * 10) / 10}h`;

/** 1.1833 → "1h 11m", rounded to the minute */
export function formatDuration(n: number) {
	const minutes = Math.round(n * 60);
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return h && m ? `${h}h ${m}m` : h ? `${h}h` : `${m}m`;
}
