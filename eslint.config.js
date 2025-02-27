import ts from "typescript-eslint";
import globals from "globals";
import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import astro from "eslint-plugin-astro";
import a11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser";

export default ts.config(
	eslint.configs.recommended,
	...astro.configs.recommended,
	{
		...react.configs.flat.recommended,
		files: ["src/**/*.{tsx,ts}"],
		languageOptions: {
			...react.configs.flat.recommended.languageOptions,
			parser: tsParser,
		},
	},
	a11y.flatConfigs.strict,
	{
		settings: {
			react: {
				version: "detect",
			},
		},
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		ignores: ["!**/*.{tsx,ts,astro}"],
		rules: {
			"react/react-in-jsx-scope": "off",
		},
	},
	prettier
);
