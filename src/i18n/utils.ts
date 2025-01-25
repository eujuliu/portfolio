import en from '../i18n/translations/en.json';
import ptBR from '../i18n/translations/pt-br.json';
import type { AvailableLanguages } from '../stores/i18n';

const translations = {
	'pt-br': ptBR,
	en,
};

export function useTranslation(lang: AvailableLanguages) {
	return function t(key: string) {
		return (
			key.split('.').reduce<any>((o, i) => o?.[i], translations[lang]) || key
		);
	};
}
