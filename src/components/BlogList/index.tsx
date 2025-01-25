import { useStore } from '@nanostores/react';
import './style.css';
import { locale } from '../../stores/i18n';
import type { InferEntrySchema, RenderedContent } from 'astro:content';
import { useTranslation } from '../../i18n/utils';

interface Item {
	id: string;
	body?: string;
	collection: 'blog';
	data: InferEntrySchema<'blog'>;
	rendered?: RenderedContent;
	filePath?: string;
}

interface Props {
	items: Item[];
}

export default function BlogList({ items }: Props) {
	const $locale = useStore(locale);
	const posts = items.filter((item) => item.data.language === $locale);
	const t = useTranslation($locale);

	return (
		<ul className="blog-list">
			{posts.length < 1 ? <div className="message">{t('noData')}</div> : ''}
			{posts.map((post) => (
				<li key={post.id} className="item">
					<a className="blog-post" href={`/blog/${post.data.unique_name}`}>
						<div className="content">
							<div className="title">{post.data.title}</div>
							<div className="subtitle">{post.data.subtitle}</div>
							<div className="actions">
								<div className="published-at">
									{new Date(post.data.publishedAt).toLocaleDateString($locale, {
										dateStyle: 'medium',
									})}
								</div>
							</div>
						</div>
						<img src={post.data.image} className="image" />
					</a>
				</li>
			))}
		</ul>
	);
}
