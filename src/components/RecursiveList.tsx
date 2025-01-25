export interface RecursiveItem {
	depth: number;
	slug: string;
	text: string;
	children: RecursiveItem[];
}

interface Props {
	items: RecursiveItem[];
}

export default function RecursiveList({ items }: Props) {
	return (
		<ul>
			{items.map((item) => (
				<li key={item.slug}>
					<a href={`#${item.slug}`}>{item.text}</a>
					{item.children.length > 0 ? (
						<RecursiveList items={item.children} />
					) : (
						''
					)}
				</li>
			))}
		</ul>
	);
}
