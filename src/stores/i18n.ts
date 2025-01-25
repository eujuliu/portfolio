import { persistentAtom } from '@nanostores/persistent';

export type AvailableLanguages = 'en' | 'pt-br';
export const locales: AvailableLanguages[] = ['en', 'pt-br'];
export const locale = persistentAtom<AvailableLanguages>(
	'jm:locale',
	undefined
);

export function changeLanguage(code: AvailableLanguages) {
	locale.set(code === 'pt-br' ? 'en' : 'pt-br');

	document.querySelector('html')?.setAttribute('lang', locale.get());
}
