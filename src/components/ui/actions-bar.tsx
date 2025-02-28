import type { ReactNode } from 'react';
import Select from './select';

export interface ActionsBarFilter {
	text: string;
	selected: string | string[];
	values: string[];
}

interface Props {
	title: ReactNode;
	filters: ActionsBarFilter[];
}

export default function ActionsBar({ title, filters }: Props) {
	return (
		<div>
			<h1>{title}</h1>
			{filters.map((filter) => (
			))}
		</div>
	);
}
