import type { ImageMetadata } from 'astro';
import type { MemberId } from './members';

export interface TeamMember {
	/** Used in post frontmatter (`author: ruben`) and in the profile URL (/team/ruben/) */
	id: MemberId;
	name: string;
	role: string;
	bio: string;
	/** Import from src/assets/team/, e.g. `import ruben from '../assets/team/ruben.jpg'` */
	photo?: ImageMetadata;
	links?: { label: string; href: string }[];
}

export const team: TeamMember[] = [
	{
		id: 'elitsa',
		name: 'Elitsa Kutsarova',
		role: 'Experience Design',
		bio: '[Placeholder] A short bio and their focus within the project.',
	},
	{
		id: 'miriam',
		name: 'Miriam Botanská',
		role: 'Visual Design',
		bio: '[Placeholder] A short bio and their focus within the project.',
	},
	{
		id: 'ruben',
		name: 'Ruben Van Steenberghe',
		role: 'Development',
		bio: 'Developer of the team. I enjoy experimenting with different ideas and exploring the technical side of our project.',
		links: [{ label: 'GitHub', href: 'https://github.com/rubenlydius' }],
	},
];

export const getMember = (id: MemberId) => team.find((member) => member.id === id)!;
