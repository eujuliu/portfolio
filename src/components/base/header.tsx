import { useEffect, useState } from 'react';
import TextTranslator from '../ui/text-translator';
import Select, { type SelectOption } from '../ui/select';
import { useStore } from '@nanostores/react';
import { configs, type AvailableLanguages } from '@/stores/configs';
import Button from '../ui/button';
import { Moon, SunDim, Menu, X } from 'lucide-react';

export interface MenuOptions {
	name: string;
	link: string;
	tag?: string;
	tagStyle?: string;
}

interface Props {
	menus: MenuOptions[];
}

const languages: SelectOption[] = [
	{
		value: 'pt-br',
		text: 'languages.pt-br',
	},
	{
		value: 'en',
		text: 'languages.en',
	},
	{
		value: 'es',
		text: 'languages.es',
	},
];

export default function Header({ menus }: Props) {
	const [menuOpen, setMenuOpen] = useState(false);
	const $configs = useStore(configs);

	useEffect(() => {
		const handleScreenResize = (event: Event) => {
			const width = window.innerWidth;
			if (width >= 1024 && menuOpen) setMenuOpen(false);
		};

		window.addEventListener('resize', handleScreenResize);

		return () => window.removeEventListener('resize', handleScreenResize);
	});

	function isActive(menu: MenuOptions) {
		return window.location.pathname === menu.link;
	}

	return (
		<header className="sticky top-0 bg-neutral-100 dark:bg-neutral-800 z-10 w-full flex justify-between items-center lg:gap-10 py-4">
			<a href="/" className="relative font-bold text-xl z-10 w-fit h-fit">
				JM
			</a>

			<div className="self-end relative justify-self-start z-10 lg:hidden">
				<Button onClick={() => setMenuOpen(!menuOpen)} style="border-0">
					{!menuOpen ? <Menu size={26} /> : <X size={26} />}
				</Button>
			</div>

			<div
				className={`flex flex-col w-0 lg:flex-row not-lg:justify-center lg:justify-between items-center not-lg:overflow-hidden gap-4 z-0 not-lg:fixed top-0 right-0  not-lg:h-dvh lg:w-full ${menuOpen ? 'w-dvw' : ''} not-lg:bg-neutral-100 not-lg:dark:bg-neutral-800 transition-all`}
			>
				<nav>
					<ul className="flex flex-col gap-8 justify-center items-center lg:flex-row">
						{menus.map((menu) => (
							<li key={menu.name} className="relative">
								<a
									href={menu.link}
									className={`not-lg:text-5xl font-bold hover:text-blue-500 transition-colors delay-[5ms] ${isActive(menu) ? 'text-blue-500' : ''}`}
								>
									<TextTranslator
										path={`navigation.${menu.name.toLowerCase()}`}
									/>
									{menu.tag ? (
										<span
											className={`absolute -top-1 text-xs lg:text-[10px] font-bold px-1 not-lg:py-0.5 rounded-sm bg-gray-400 text-neutral-100 ${menu.tagStyle}`}
										>
											{menu.tag}
										</span>
									) : (
										''
									)}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div className="flex not-lg:gap-10 not-lg:m-10">
					<Select
						placeholder={<TextTranslator path="languages.placeholder" />}
						options={languages}
						val={$configs.language.toUpperCase()}
						onChange={(option) =>
							configs.set({
								...$configs,
								language: option.value as AvailableLanguages,
							})
						}
					/>

					<Button
						onClick={() =>
							configs.set({
								...$configs,
								theme: $configs.theme === 'dark' ? 'light' : 'dark',
							})
						}
						style="border-0"
					>
						{$configs.theme === 'dark' ? <Moon /> : <SunDim />}
					</Button>
				</div>
			</div>
		</header>
	);
}
