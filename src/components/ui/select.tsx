import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
	text: ReactNode;
	value: string;
}

interface Props {
	val?: string;
	placeholder: ReactNode;
	options: SelectOption[];
	onChange: <T>(value: T) => any;
}

export default function Select({ val, placeholder, options, onChange }: Props) {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handlerClickOutSide = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('click', handlerClickOutSide);

		return () => document.removeEventListener('click', handlerClickOutSide);
	});

	return (
		<div ref={dropdownRef} className="relative">
			<button
				onClick={() => setOpen(!open)}
				className="flex justify-center items-center gap-2 dark:text-white rounded-md p-2 cursor-pointer border-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors delay-[5ms]"
			>
				<span className="font-bold">{val || placeholder}</span>
				<ChevronDown />
			</button>

			{open ? (
				<div className="absolute flex-col items-start bg-neutral-600 dark:bg-neutral-100 rounded-md shadow-xl p-1">
					{options.map((opt, index) => (
						<button
							key={opt.value}
							onClick={() => {
								setOpen(false);
								onChange(opt.value);
							}}
							className={`text-md px-1 py-1 font-medium text-neutral-100 hover:bg-neutral-500 dark:text-neutral-800 hover:dark:bg-neutral-200 w-full transition-colors delay-[5ms] rounded`}
						>
							{opt.text}
						</button>
					))}
				</div>
			) : (
				''
			)}
		</div>
	);
}
