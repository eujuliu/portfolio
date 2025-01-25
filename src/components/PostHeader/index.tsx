import { useStore } from '@nanostores/react';
import { locale } from '../../stores/i18n';
import type { InferEntrySchema, RenderedContent } from 'astro:content';
import Text from '../Text';

import './style.css';

interface Post {
	id: string;
	body?: string;
	collection: 'blog';
	data: InferEntrySchema<'blog'>;
	rendered?: RenderedContent;
	filePath?: string;
}

interface Props {
	posts: Post[];
}

export default function PostHeader({ posts }: Props) {
	const $locale = useStore(locale);
	const post = posts.find((p) => p.data.language === $locale);

	if (!post) return '';

	return (
		<div className="post-header">
			<img src={post.data.image} />
			<div className="wrapper">
				<Text size="5xl" weight="bolder" className="title">
					{post.data.title}
				</Text>
				<Text size="xl" weight="normal" className="subtitle">
					{post.data.subtitle}
				</Text>
			</div>

			<div className="extra">
				<div className="tags">
					{post.data.tags?.map((tag) => (
						<span key={tag} className={`tag ${tag}`}>
							#{tag}
						</span>
					))}
				</div>
				{post.data.tags?.length ? '•' : ''}
				<div className="published-at">
					{new Date(post.data.publishedAt).toLocaleDateString($locale, {
						dateStyle: 'medium',
					})}
				</div>
			</div>
		</div>
	);
}
