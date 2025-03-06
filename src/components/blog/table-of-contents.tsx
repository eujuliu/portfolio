import { configs, type AvailableLanguages } from '@/stores/configs';
import TextTranslator from '../ui/text-translator';
import { useStore } from '@nanostores/react';

interface TOCHeader {
	depth: number;
	slug: string;
	text: string;
}

interface RecursiveItem {
	depth: number;
	slug: string;
	text: string;
	children: RecursiveItem[];
}

interface TableOfContentsProps {
	headings: Record<AvailableLanguages, TOCHeader[]>;
	className?: string;
}

interface RecursiveListProps {
	items: RecursiveItem[];
	className?: string;
}

function RecursiveList({ items, className }: RecursiveListProps) {
	return (
		<ul className={className ? className : `my-4 lg:my-3`}>
			{items.map((item) => (
				<li
					key={item.slug}
					className="pt-[0.075em] pb-[0.075em] ml-12 lg:pt-[0.085rem] lg:pb-[0.085rem] lg:ml-8 lg:text-sm"
				>
					<a
						href={`#${item.slug}`}
						className="transition-colors delay-[5ms] hover:text-blue-500"
					>
						{item.text}
					</a>
					{item.children.length > 0 ? (
						<RecursiveList items={item.children} className="m-0" />
					) : (
						''
					)}
				</li>
			))}
		</ul>
	);
}

export default function TableOfContents({
	headings,
	className,
}: TableOfContentsProps) {
	const $language = useStore(configs).language;
	const headers = headings[$language];

	const root: RecursiveItem = {
		depth: 0,
		slug: 'table-of-contents',
		text: 'Table Of Contents',
		children: [],
	};
	const stack: RecursiveItem[] = [root];

	for (const item of headers) {
		while (stack.length > 0 && stack[stack.length - 1].depth >= item.depth) {
			stack.pop();
		}

		const parent = stack[stack.length - 1];
		const newItem: RecursiveItem = { ...item, children: [] };

		parent.children.push(newItem);
		stack.push(newItem);
	}

	return (
		<div className={`mt-8 h-fit ${className}`}>
			<TextTranslator
				path="blog.tableOfContents"
				className="text-2xl font-bold lg:text-base"
			/>
			<RecursiveList items={root.children} />
		</div>
	);
}
