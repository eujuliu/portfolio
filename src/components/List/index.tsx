import { useStore } from '@nanostores/react';
import { locale } from '../../stores/i18n';
import { removeReferenceFromObj } from '../../helpers';
import { useTranslation } from '../../i18n/utils';
import Text from '../Text';

import './style.css';

interface Item {
	title: string;
	company?: string;
	period?: string;
	local?: string;
	description?: string;
	link?: string;
	tools: string[];
	translation?: Record<string, any>;
}

export interface ListProps {
	titleText?: string;
	titleTranslation?: string;
	items: Item[];
}

export default function List({
	titleText,
	titleTranslation,
	items,
}: ListProps) {
	const $locale = useStore(locale);
	const t = useTranslation($locale);

	function mergeTranslations(item: Item) {
		const translation = item.translation?.[$locale];
		const obj = removeReferenceFromObj<Item>({
			...item,
			...(translation ? translation : {}),
		});

		delete obj.translation;

		return obj;
	}

	return (
		<div className="list-wrapper">
			<div className="list-header">
				<Text size="5xl" weight="bolder" translation={titleTranslation}>
					{titleText}
				</Text>
				<p className="counter">{items.length}</p>
			</div>

			<ul className="items">
				{items.map((item) => {
					item = mergeTranslations(item);

					return (
						<li key={item.title} className="item">
							<div className="content">
								<a href={item.link} className="title" target="_target">
									{item.title}
									{item.link ? <i className="bx bx-link-external"></i> : ''}
								</a>
								{item.company ? (
									<div className="company">{item.company}</div>
								) : (
									''
								)}
								{item.period ? <div className="period">{item.period}</div> : ''}
								{item.local ? <div className="local">{item.local}</div> : ''}
								{item.description ? (
									<div className="description">{item.description}</div>
								) : (
									''
								)}
								<div className="tools">
									{item.tools.map((v) => v.trim()).join(', ')}
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
