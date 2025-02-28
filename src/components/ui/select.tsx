import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
	text: ReactNode;
	value: string;
}

interface Props {
	val: string | SelectOption[];
	placeholder: ReactNode;
	options: SelectOption[];
	onChange: <T>(value: T) => any;
	multiple?: boolean;
}

export default function Select({
	val,
	placeholder,
	options,
	onChange,
	multiple,
}: Props) {
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

	function buttonPlaceholder(
		value: string | SelectOption[],
		placeholder: ReactNode
	) {
		if (value) {
			if (Array.isArray(value)) {
				return value.join(', ');
			}

			return value;
		}

		return placeholder;
	}

	function changeValue(option: SelectOption) {
		let result = null;
		if (!multiple) {
			setOpen(false);
			result = option;
		}

		if (multiple) {
			result = Array.from(new Set([...val, option]));
		}

		onChange(result);
	}

	function isSelected(option: SelectOption) {
		if (typeof val === 'string') {
			return val.toLowerCase() === option.value;
		}

		return val.some((v) => v.value === option.value);
	}

	return (
		<div ref={dropdownRef} className="relative">
			<button
				onClick={() => setOpen(!open)}
				className="flex justify-center items-center gap-2 dark:text-white rounded-md p-2 cursor-pointer border-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors delay-[5ms]"
			>
				<span className="font-bold">{buttonPlaceholder(val, placeholder)}</span>
				<ChevronDown />
			</button>

			{open ? (
				<div className="absolute flex flex-col gap-1 bg-neutral-600 dark:bg-neutral-100 rounded-md shadow-xl p-1">
					{options.map((opt) => (
						<button
							key={opt.value}
							onClick={() => changeValue(opt)}
							className={`flex items-center gap-0.5 text-start px-2 py-1  hover:bg-neutral-500  hover:dark:bg-neutral-200 w-full transition-colors delay-[5ms] rounded ${isSelected(opt) ? 'bg-neutral-500 dark:bg-neutral-200' : ''}`}
						>
							<span className="grow-1 text-sm font-medium text-neutral-100 dark:text-neutral-800">
								{opt.text}
							</span>
							<span className="flex items-center h-[20px] w-[15px]">
								{isSelected(opt) ? (
									<Check className="text-neutral-800" size={15} />
								) : (
									''
								)}
							</span>
						</button>
					))}
				</div>
			) : (
				''
			)}
		</div>
	);
}
