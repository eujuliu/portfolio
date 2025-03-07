/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { AvailableLanguages } from "@/stores/configs";

import ptBR from "./translations/pt-br.json";
import en from "./translations/en.json";
import es from "./translations/es.json";

const translations = {
	"pt-br": ptBR,
	en,
	es,
};

export function useTranslation(lang: AvailableLanguages) {
	return function t(key: string) {
		return (
			key.split(".").reduce<any>((o, i) => o?.[i], translations[lang]) || key
		);
	};
}
