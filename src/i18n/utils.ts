import { en } from '../i18n/translations/en.ts';
import { ptBr } from '../i18n/translations/pt-br.ts';
import type { AvailableLanguages } from '../stores/i18n';

const translations = {
	'pt-br': ptBr,
	en,
};

export function useTranslation(lang: AvailableLanguages) {
	return function t(key: string) {
		return (
			key.split('.').reduce<any>((o, i) => o?.[i], translations[lang]) || key
		);
	};
}
