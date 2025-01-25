import { useStore } from '@nanostores/react';
import { useTranslation } from '../i18n/utils';
import { locale } from '../stores/i18n';
import type { ReactNode } from 'react';

export type FontSize =
	| 'xs'
	| 'sm'
	| 'base'
	| 'lg'
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| '5xl';
export type FontWeight = 'lighter' | 'normal' | 'bold' | 'bolder';

interface Props {
	size: FontSize;
	weight?: FontWeight;
	translation?: string;
	children?: ReactNode;
	className?: string;
}

export default function Text({
	size,
	weight,
	translation,
	children,
	className,
}: Props) {
	const $locale = useStore(locale);
	const t = useTranslation($locale);

	if (!className) className = 'text';

	return (
		<p
			className={className}
			style={{
				fontSize: `var(--font-size-${size})`,
				fontWeight: weight || 'normal',
			}}
		>
			{!translation ? children : t(translation)}
		</p>
	);
}
