import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkFlexibleMarkers from 'remark-flexible-markers';

import netlify from '@astrojs/netlify';

export default defineConfig({
	integrations: [react()],
	output: 'server',
	adapter: netlify(),
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
