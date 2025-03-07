import type { AvailableLanguages } from "@/stores/configs";

import en from "./translations/en.json";
import es from "./translations/es.json";
import ptBR from "./translations/pt-br.json";

const translations = {
	"pt-br": ptBR,
	en,
	es,
};

export function useTranslation(lang: AvailableLanguages) {
	return function t(key: string) {
		return (
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			key.split(".").reduce<any>((o, i) => o?.[i], translations[lang]) || key
		);
	};
}
