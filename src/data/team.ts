import type { ImageMetadata } from 'astro';

export interface TeamMember {
	name: string;
	role: string;
	bio: string;
	/** Import from src/assets/team/, e.g. `import ruben from '../assets/team/ruben.jpg'` */
	photo?: ImageMetadata;
	links?: { label: string; href: string }[];
}

export const team: TeamMember[] = [
	{
		name: 'Ruben Vansteenberghe',
		role: '[Role]',
		bio: '[Placeholder] A short bio and what you focus on within the project.',
		links: [{ label: 'Email', href: 'mailto:ruben.vansteenberghe@gmail.com' }],
	},
	{
		name: '[Team member]',
		role: '[Role]',
		bio: '[Placeholder] A short bio and what they focus on within the project.',
	},
];
