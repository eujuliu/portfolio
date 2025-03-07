import { useTranslation } from "@/i18n";
import { type AvailableLanguages, configs } from "@/stores/configs";
import { useStore } from "@nanostores/react";

type Translation = {
	[x in AvailableLanguages]: Record<string, unknown>;
};
interface Props {
	path: string;
	className?: string;
	translations?: Translation;
}

export default function TextTranslator({
	path,
	className,
	translations,
}: Props) {
	const $language = useStore(configs).language;
	const t = translations
		? (p: string) => translations[$language][p]
		: useTranslation($language);

	return (
		// biome-ignore lint/security/noDangerouslySetInnerHtml: It necessary for set the html that exists inside the strings
		<span className={className} dangerouslySetInnerHTML={{ __html: t(path) }} />
	);
}
