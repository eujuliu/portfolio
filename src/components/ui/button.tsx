import type { ReactNode } from "react"

interface Props {
	children?: ReactNode
	onClick: () => any
	style?: string
}

export default function Button({ children, onClick, style }: Props) {
	return (
		<button
			onClick={() => onClick()}
			className={` dark:text-white border rounded-md p-2 cursor-pointer border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors delay-[5ms] ${style}`}
		>
			{children}
		</button>
	)
}
