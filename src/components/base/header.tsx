import { useState } from 'react';
import TextTranslator from '../ui/text-translator';
import Select, { type SelectOption } from '../ui/select';
import { useStore } from '@nanostores/react';
import { configs, type AvailableLanguages } from '@/stores/configs';
import Button from '../ui/button';
import { Moon, SunDim, Menu, PanelRightClose } from 'lucide-react';

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
		text: <TextTranslator path="languages.pt-br" />,
	},
	{
		value: 'en',
		text: <TextTranslator path="languages.en" />,
	},
	{
		value: 'es',
		text: <TextTranslator path="languages.es" />,
	},
];

export default function Header({ menus }: Props) {
	const [menuOpen, setMenuOpen] = useState(false);
	const $configs = useStore(configs);

	return (
		<header className="relative z-10 w-full px-4 py-6 flex justify-between">
			<div className="relative dark:text-white font-bold text-xl p-1 z-10 w-fit h-fit">
				JM
			</div>

			<div className="self-end relative justify-self-start  z-10">
				<Button onClick={() => setMenuOpen(!menuOpen)} style="border-0">
					{!menuOpen ? <Menu size={26} /> : <PanelRightClose size={26} />}
				</Button>
			</div>

			<div
				className={`flex flex-col justify-center overflow-hidden items-center gap-4 z-0 fixed top-0 right-0  h-dvh bg-neutral-100 dark:bg-neutral-800 transition-all ${menuOpen ? 'w-dvw' : 'w-0 -right-full'}`}
			>
				<nav>
					<ul className="flex flex-col gap-8 justify-center items-center">
						{menus.map((menu) => (
							<li key={menu.name} className="relative">
								<a
									href={menu.link}
									className="dark:text-white text-5xl font-bold hover:text-blue-400 transition-colors delay-[5ms]"
								>
									<TextTranslator
										path={`navigation.${menu.name.toLowerCase()}`}
									/>
								</a>
								{menu.tag ? (
									<span
										className={`absolute -top-1 text-xs font-bold px-1 py-0.5 rounded-sm bg-gray-400 pointer-events-none ${menu.tagStyle}`}
									>
										{menu.tag}
									</span>
								) : (
									''
								)}
							</li>
						))}
					</ul>
				</nav>

				<div className="flex gap-10 m-10">
					<Select
						placeholder={<TextTranslator path="languages.placeholder" />}
						options={languages}
						val={$configs.language.toUpperCase()}
						onChange={(value) =>
							configs.set({
								...$configs,
								language: value as AvailableLanguages,
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
