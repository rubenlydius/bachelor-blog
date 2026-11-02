export interface TimelineEvent {
	date: string; // YYYY-MM-DD
	label: string;
}

// Sorted by date. The first and last event define the start and end of the bar.
export const timeline: TimelineEvent[] = [
	{ date: '2026-10-27', label: 'Brief' },
	{ date: '2026-12-12', label: 'Transfo Intiem' },
	{ date: '2026-12-17', label: 'Jury' },
];
