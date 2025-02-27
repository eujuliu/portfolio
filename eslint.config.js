import eslint from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import react from "eslint-plugin-react";
import astro from "eslint-plugin-astro";
import a11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

export default ts.config(
	eslint.configs.recommended,
	...astro.configs.recommended,
	a11y.flatConfigs.strict,
	{ ...react.configs.flat.recommended, files: ["src/**/*.{tsx,ts}"] },
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",
		},
		ignores: ["!**/*.{tsx,ts,astro}"],
	},
	prettier
);
