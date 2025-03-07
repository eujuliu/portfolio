import { Circle, GitFork, Github, Star } from "lucide-react";
import Colors from "@/data/github-languages-colors.json";
import type { Project } from "@/pages/projects.astro";

type Colors = Record<string, string>;
interface Props {
	projects: Project[];
}

export default function List({ projects }: Props) {
	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{projects.map(({ name, link, description, language, stars, forks }) => (
				<div
					key={name as React.Key}
					className="grid gap-2 grid-rows-3 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 w-full"
				>
					<div className="flex justify-between items-center font-bold">
						<a
							href={link as string}
							target="_blank"
							className="text-lg text-blue-500 hover:underline underline-offset-2"
							rel="noreferrer"
						>
							{name}
						</a>
						<Github size={12} />
					</div>

					<p className="font-medium text-xs text-neutral-500 line-clamp-2">
						{description}
					</p>

					<div className="flex gap-4 items-center">
						{language ? (
							<span className="flex items-center gap-1 font-bold text-sm">
								<Circle
									fill={(Colors as Colors)[language as string]}
									stroke="none"
									size={15}
								/>
								{language}
							</span>
						) : (
							""
						)}

						{stars ? (
							<span className="flex items-center gap-1">
								<Star size={15} />
								<span className="text-xs font-medium">{stars}</span>
							</span>
						) : (
							""
						)}

						{forks ? (
							<span className="flex items-center gap-1">
								<GitFork size={15} />
								<span className="text-xs font-medium">{forks}</span>
							</span>
						) : (
							""
						)}
					</div>
				</div>
			))}
		</div>
	);
}
