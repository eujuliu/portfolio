import { persistentAtom } from "@nanostores/persistent";

export type AvailableLanguages = "pt-br" | "en" | "es";
export interface Configs {
	theme: "dark" | "light";
	language: AvailableLanguages;
}

export const configs = persistentAtom<Configs>(
	"jm:configs",
	{ language: "pt-br", theme: "dark" },
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

configs.listen(({ language, theme }) => {
	const html = document.querySelector("html");

	if (html) {
		html.setAttribute("lang", language);
		html.setAttribute("data-theme", theme);
	}
});
