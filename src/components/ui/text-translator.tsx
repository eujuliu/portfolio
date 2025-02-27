import type { ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { configs } from '@/stores/configs';
import { useTranslation } from '@/i18n';

interface Props {
	path: string;
}

export default function TextTranslator({ path }: Props) {
	const $language = useStore(configs).language;
	const t = useTranslation($language);

	return <>{t(path)}</>;
}
