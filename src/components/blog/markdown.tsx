import type { InferEntrySchema, RenderedContent } from "astro:content";
import { type AvailableLanguages, configs } from "@/stores/configs";
import { useStore } from "@nanostores/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export interface Post {
	id: string;
	body?: string;
	collection: "blog";
	data: InferEntrySchema<"blog">;
	rendered?: RenderedContent;
	filePath?: string;
}

interface Props {
	posts: Record<AvailableLanguages, Post>;
	className?: string;
}

export default function Markdown({ posts, className }: Props) {
	const $language = useStore(configs).language;
	const post = posts[$language];

	const [backToTopVisible, setBackToTopVisibility] = useState(false);

	if (!post || !post.rendered) {
		return <div>Post don&apos;t exist</div>;
	}

	useEffect(() => {
		const onScroll = () => {
			setBackToTopVisibility(document.documentElement.scrollTop >= 840);
		};

		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	function backToTop() {
		window.scrollTo(0, 0);
	}

	return (
		<div className="relative">
			<div
				className={className}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: post.rendered.html,
				}}
			/>

			{backToTopVisible ? (
				<button
					type="button"
					className="fixed bottom-5 rounded-full border-2 p-1 right-5 bg-neutral-100 dark:bg-neutral-800 cursor-pointer"
					onClick={backToTop}
				>
					<ArrowUp />
				</button>
			) : (
				""
			)}
		</div>
	);
}
