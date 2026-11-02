// The three pillars hours are logged against. Ids match the post tags.
// Colors are CSS tokens in global.css (validated as a colorblind-safe set).
export const pillars = [
	{ id: 'ux', label: 'UX', color: 'var(--pillar-ux)' },
	{ id: 'design', label: 'Design', color: 'var(--pillar-design)' },
	{ id: 'development', label: 'Development', color: 'var(--pillar-development)' },
] as const;

export type PillarId = (typeof pillars)[number]['id'];
export type Hours = Record<PillarId, number>;

export const emptyHours = (): Hours => ({ ux: 0, design: 0, development: 0 });
export const totalHours = (hours: Hours) => hours.ux + hours.design + hours.development;
/** 12.5 → "12.5h", rounded to one decimal */
export const formatHours = (n: number) => `${Math.round(n * 10) / 10}h`;
