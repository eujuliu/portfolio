// @ts-check
import { defineConfig, envField } from "astro/config";
import remarkObsidian from "remark-obsidian";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: [remarkObsidian],
    gfm: true,
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "min-dark",
      },
    },
  },

  integrations: [react()],

  env: {
    schema: {
      OCTOKIT_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },

  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
