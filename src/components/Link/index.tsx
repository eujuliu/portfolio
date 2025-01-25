import { useStore } from '@nanostores/react';
import type { ReactNode } from 'react';
import { locale, type AvailableLanguages } from '../../stores/i18n';
import { useTranslation } from '../../i18n/utils';
import './style.css';

interface LinkObj {
	name: string;
	href: string;
	type: string;
}

export type LinkTranslation = Record<AvailableLanguages, LinkObj>;

interface Props {
	name: string;
	to: string | LinkTranslation;
	translation?: string;
	children?: ReactNode;
}

export default function Link(
	{ name, to, translation, children }: Props,
	redirect: boolean = true
) {
	const $locale = useStore(locale);
	const t = useTranslation($locale);
	const props: Record<string, any> = {};

	if (typeof to === 'string') {
		redirect = !!to.match(/http/g);
	}

	if (typeof to === 'object') {
		const translation = to[$locale];

		props.download =
			translation.type === 'download' ? translation.name : undefined;
		to = translation.href;
		redirect = false;
	}

	return (
		<a
			className={`link ${name}`}
			href={to}
			target={redirect ? '_blank' : '_self'}
			{...props}
		>
			{translation ? t(translation) : children}
		</a>
	);
}
