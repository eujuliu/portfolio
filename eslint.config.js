import globals from "globals"
import ts from "typescript-eslint"
import react from "eslint-plugin-react"
import astro from "eslint-plugin-astro"
import a11y from "eslint-plugin-jsx-a11y"
import prettier from "eslint-config-prettier"

/** @type {import('eslint').Linter.Config[]} */
export default [
	// TypeScript Config
	...ts.configs.recommendedTypeChecked.map((config) => ({
		...config,
		files: ["src/**/*.{ts,tsx,astro}"],
	})),

	// React Config
	{
		...react.configs.flat.recommended,
		files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
		rules: {
			...react.configs.flat.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},

	// Astro Config
	...astro.configs["flat/recommended"],

	// Accessibility Config
	{
		files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,astro}"],
		plugins: {
			"jsx-a11y": a11y,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			...a11y.configs.strict.rules,
		},
	},

	// Global Config
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	prettier,
]
