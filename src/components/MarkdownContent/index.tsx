import { useStore } from '@nanostores/react';
import { locale } from '../../stores/i18n';
import type { InferEntrySchema, RenderedContent } from 'astro:content';
import { useTranslation } from '../../i18n/utils';

import './style.css';
import TableOfContents, { type Heading } from '../TableOfContents';
import { useEffect, useState } from 'react';

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

export default function MarkdownContent({ posts }: Props) {
	const $locale = useStore(locale);
	const t = useTranslation($locale);
	const post = posts.find((p) => p.data.language === $locale);
	const [backToTopVisible, setBackToTopVisibility] = useState(false);

	if (!post || !post.rendered) {
		return <div className="message">{t('noData')}</div>;
	}

	useEffect(() => {
		const onScroll = () => {
			setBackToTopVisibility(document.documentElement.scrollTop >= 840);
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	function backToTop() {
		window.scrollTo(0, 0);
	}

	return (
		<div className="markdown-content">
			<div className="table-of-contents-wrapper">
				<TableOfContents
					headings={(post?.rendered?.metadata?.headings || []) as Heading[]}
				/>
			</div>
			<div
				className="content"
				dangerouslySetInnerHTML={{
					__html: post.rendered.html,
				}}
			/>
			{backToTopVisible ? (
				<button className="back-to-top" onClick={backToTop}>
					<i className="bx bx-up-arrow-alt bx-lg"></i>
				</button>
			) : (
				''
			)}
		</div>
	);
}
