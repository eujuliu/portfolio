import { persistentAtom } from '@nanostores/persistent';

const useDarkTheme =
	window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: dark)').matches;

export const theme = persistentAtom<'dark' | 'light'>(
	'jm:theme',
	useDarkTheme ? 'dark' : 'light'
);

export function changeTheme() {
	const isDark = theme.get() === 'dark';

	theme.set(isDark ? 'light' : 'dark');

	document.querySelector('html')?.setAttribute('data-theme', theme.get());
}
