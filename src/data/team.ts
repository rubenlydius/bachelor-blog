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
		name: 'Elitsa Kutsarova',
		role: 'Experience Design',
		bio: '[Placeholder] A short bio and their focus within the project.',
	},
	{
		name: 'Miriam Botanská',
		role: 'Visual Design',
		bio: '[Placeholder] A short bio and their focus within the project.',
	},
	{
		name: 'Ruben Van Steenberghe',
		role: 'Development',
		bio: '[Placeholder] A short bio and what you focus on within the project.',
		links: [{ label: 'Email', href: 'mailto:ruben.vansteenberghe@gmail.com' }],
	},
];
