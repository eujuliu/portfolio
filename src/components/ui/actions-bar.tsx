import { useReducer, type ReactNode } from 'react';
import Select, { type SelectOption } from './select';
import TextTranslator from './text-translator';

export interface ActionsBarFilter {
	id: string;
	text: string;
	values: SelectOption[];
	itemText?: 'text' | 'value';
	multiple?: boolean;
	initialValue?: string;
}

interface Props {
	title?: ReactNode;
	filters: ActionsBarFilter[];
}

type State = Record<string, string>;

export default function ActionsBar({ title, filters }: Props) {
	const initial = filters.reduce<Record<string, any>>(
		(acc, filter) => ({ ...acc, [filter.id]: filter.initialValue || null }),
		{}
	);
	const [state, dispatch] = useReducer<State, any>(reducer, initial);

	function reducer(state: State, { id, value }: any) {
		return {
			...state,
			[id]: Array.isArray(value) ? value : value.value,
		};
	}

	return (
		<div className="flex justify-between items-center py-4 lg:py-8">
			<h1 className="font-bold text-xl sm:text-3xl lg:text-5xl">{title}</h1>
			<div className="flex gap-1 items-center hidden">
				{filters.map(({ id, text, values, itemText, multiple }) => (
					<Select
						key={id}
						placeholder={<TextTranslator path={text} />}
						itemText={itemText}
						val={state[id]}
						onChange={(value) => dispatch({ id, value })}
						options={values}
						multiple={multiple}
					/>
				))}
			</div>
		</div>
	);
}
