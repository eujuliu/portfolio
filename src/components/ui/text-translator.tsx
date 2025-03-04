import type { ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { configs } from '@/stores/configs';
import { useTranslation } from '@/i18n';

interface Props {
	path: string;
	className?: string;
}

export default function TextTranslator({ path, className }: Props) {
	const $language = useStore(configs).language;
	const t = useTranslation($language);

	return (
		<span
			className={className}
			dangerouslySetInnerHTML={{ __html: t(path) }}
		></span>
	);
}
