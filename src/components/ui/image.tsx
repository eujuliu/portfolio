import { configs, type AvailableLanguages } from "@/stores/configs"
import { useStore } from "@nanostores/react"

export type ImageTranslation = {
	[key in AvailableLanguages]: Record<string, string>
}
interface Props {
	src: string
	alt: string
	width?: string
	height?: string
	className?: string
	translations?: ImageTranslation
}

export default function Image({
	src,
	alt,
	width,
	height,
	className,
	translations,
}: Props) {
	const $language = useStore(configs).language
	if (translations) {
		src = translations[$language].src
		alt = translations[$language].alt
	}

	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			decoding="async"
			loading="lazy"
		/>
	)
}
