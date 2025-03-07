// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	integrations: [react({ experimentalReactChildren: true })],
	env: {
		schema: {
			OCTOKIT_AUTH_TOKEN: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},
});
