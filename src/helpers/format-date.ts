import type { AvailableLanguages } from '@/stores/configs';

export default function formatDate(
	str: string,
	language: AvailableLanguages,
	options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' }
) {
	const date = new Date(str);
	const formatted = new Intl.DateTimeFormat(language, options).format(date);

	return formatted;
}
