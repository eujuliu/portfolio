import { configs } from '@/stores/configs';
import { useStore } from '@nanostores/react';
import type { Post } from './markdown';

interface Props {
	posts: Post[];
}

export default function List({ posts }: Props) {
	const $language = useStore(configs).language;

	return (
		<div className="grid gap-5 gap-y-6 lg:pb-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{posts
				.filter((post) => post.data.language === $language)
				.map((post) => (
					<div key={post.id} className="flex flex-col gap-4">
						<a href={`/blog/${post.data.link}`}>
							<img
								src={post.data.image_url}
								alt={post.data.alt}
								className="max-w-full rounded-2xl"
							/>
						</a>

						<div className="flex flex-col gap-1">
							<div className="text-neutral-500 dark:text-neutral-300">
								<span className="text-sm font-bold">
									{post.data.updated_at}
								</span>
								<span className="mx-1 text-xs">|</span>
								<span className="text-sm font-bold">{post.data.category}</span>
							</div>

							<a
								href={`/blog/${post.data.link}`}
								className="text-xl font-bold hover:text-blue-500 transition-colors delay-[5ms] line-clamp-2"
							>
								{post.data.title}
							</a>
						</div>
					</div>
				))}
		</div>
	);
}
