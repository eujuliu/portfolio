import RecursiveList, { type RecursiveItem } from '../RecursiveList';
import Text from '../Text';

import './style.css';

export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

interface Props {
	headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
	const root: RecursiveItem = {
		depth: 0,
		slug: 'table-of-contents',
		text: 'Table Of Contents',
		children: [],
	};
	const stack: RecursiveItem[] = [root];

	for (const item of headings) {
		while (stack.length > 0 && stack[stack.length - 1].depth >= item.depth) {
			stack.pop();
		}

		const parent = stack[stack.length - 1];
		const newItem: RecursiveItem = { ...item, children: [] };

		parent.children.push(newItem);
		stack.push(newItem);
	}

	return (
		<div className="table-of-contents">
			<Text size="xl" weight="bold" translation="blog.tableOfContents.label" />
			<RecursiveList items={root.children} />
		</div>
	);
}
