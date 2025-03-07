import { useStore } from "@nanostores/react"
import { configs, type AvailableLanguages } from "@/stores/configs"
import { useTranslation } from "@/i18n"

type Translation = {
	[x in AvailableLanguages]: Record<string, any>
}
interface Props {
	path: string
	className?: string
	translations?: Translation
}

export default function TextTranslator({
	path,
	className,
	translations,
}: Props) {
	const $language = useStore(configs).language
	const t = translations
		? (p: string) => translations[$language][p]
		: useTranslation($language)

	return (
		<span className={className} dangerouslySetInnerHTML={{ __html: t(path) }} />
	)
}
