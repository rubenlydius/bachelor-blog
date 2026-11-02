// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://rubenlydius.github.io',
	base: '/bachelor-blog',
	// Two posts or pages with the same URL stop the build instead of one silently replacing the other
	prerenderConflictBehavior: 'error',
	integrations: [mdx(), sitemap()],
	// Titles (OCR-B) and body (IBM Plex Sans) are loaded from Adobe Fonts in BaseHead.astro
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains-mono',
			weights: ['400 500'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
