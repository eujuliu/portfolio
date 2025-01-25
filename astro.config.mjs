import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkFlexibleMarkers from 'remark-flexible-markers';
import node from '@astrojs/node';

export default defineConfig({
	integrations: [react()],
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
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
