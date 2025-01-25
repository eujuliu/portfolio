import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkFlexibleMarkers from 'remark-flexible-markers';

import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
	integrations: [react()],
	output: 'hybrid',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
		maxDuration: 8,
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
