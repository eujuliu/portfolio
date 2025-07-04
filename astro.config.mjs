// @ts-check
import { defineConfig, envField } from "astro/config";
import remarkObsidian from "remark-obsidian";

import react from "@astrojs/react";

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
});
