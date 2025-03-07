import { Check, ChevronDown } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import TextTranslator from "./text-translator";

export interface SelectOption {
	text: string;
	value: string;
}

interface Props {
	val: string | SelectOption[];
	onChange: (value: unknown) => unknown;
	itemText?: "text" | "value";
	placeholder: ReactNode;
	options: SelectOption[];
	multiple?: boolean;
}

export default function Select({
	val,
	onChange,
	itemText = "value",
	placeholder,
	options,
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

		document.addEventListener("click", handlerClickOutSide);

		return () => document.removeEventListener("click", handlerClickOutSide);
	});

	function buttonPlaceholder() {
		if (!val || val === "" || val?.length < 1) return placeholder;

		if (Array.isArray(val))
			return val.map((v) => (
				<TextTranslator
					key={v.text}
					path={v.text}
					className="after:content-[','] last:after:content-['']"
				/>
			));

		const item = options.find((i) => i.value === val);

		if (!item) return val;

		return <TextTranslator path={item[itemText]} />;
	}

	function changeValue(option: SelectOption, isSelected = false) {
		if (!multiple) {
			setOpen(false);
			onChange(option);

			return;
		}

		let values = [...new Set([...(val || []), option])];

		if (isSelected) values = values.filter((item) => item !== option);

		onChange(values);
	}

	function isSelected(option: SelectOption) {
		if (!val) return false;

		if (typeof val === "string") {
			return val.toLowerCase() === option.value;
		}

		return val.some((v) => v.value === option.value);
	}

	return (
		<div ref={dropdownRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex justify-center items-center gap-2 dark:text-white rounded-md p-2 cursor-pointer border-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors delay-[5ms]"
			>
				<span className="font-bold overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[60px] lg:max-w-[150px]">
					{buttonPlaceholder()}
				</span>
				<ChevronDown />
			</button>

			{open ? (
				<div className="absolute flex flex-col gap-1 scroll bg-neutral-600 dark:bg-neutral-100 rounded-md shadow-xl p-1 z-10 max-h-[300px] overflow-auto">
					{options.length > 0 ? (
						options.map((opt) => (
							<button
								type="button"
								key={opt.value}
								onClick={() => changeValue(opt, isSelected(opt))}
								className={`flex items-center gap-0.5 text-start px-2 py-1 hover:bg-neutral-500 hover:dark:bg-neutral-200 w-full transition-colors delay-[5ms] rounded ${
									isSelected(opt) ? "bg-neutral-500 dark:bg-neutral-200" : ""
								}`}
							>
								<TextTranslator
									path={opt.text}
									className="grow-1 text-sm font-medium text-neutral-100 dark:text-neutral-800"
								/>
								<span className="flex items-center h-[20px] w-[15px]">
									{isSelected(opt) ? (
										<Check
											className="text-neutral-200 dark:text-neutral-800"
											size={15}
										/>
									) : (
										""
									)}
								</span>
							</button>
						))
					) : (
						<div className="text-neutral-50 dark:text-neutral-700 text-sm font-medium px-2 py-1 whitespace-nowrap">
							<TextTranslator path="warnings.noData" />
						</div>
					)}
				</div>
			) : (
				""
			)}
		</div>
	);
}
