import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import remarkFlexibleMarkers from 'remark-flexible-markers';

export default defineConfig({
	integrations: [react()],
	output: 'server',
	adapter: vercel(),
	markdown: {
		shikiConfig: {
			themes: {
				light: 'min-light',
				dark: 'min-dark',
			},
		},
		remarkPlugins: [remarkFlexibleMarkers],
	},
});
