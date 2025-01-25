import { useStore } from '@nanostores/react';
import { changeLanguage, locale } from '../../stores/i18n';
import './style.css';

export default function LanguagePicker() {
	const $locale = useStore(locale);
	// const t = useTranslation($locale);
	// const [visible, setVisibility] = useState(false);

	// function changeLanguage(language: AvailableLanguages) {
	// 	locale.set(language === 'en' ? 'pt-br' : 'en');
	// 	setVisibility(false);
	// }

	// useEffect(() => {
	// 	const closeDropdownOnClick = (e: MouseEvent) => {
	// 		const element = e.target as HTMLElement;

	// 		if (
	// 			visible &&
	// 			!Array.from(element.classList).some((value) =>
	// 				value.match(/select|dropdown/)
	// 			)
	// 		) {
	// 			setVisibility(false);
	// 		}
	// 	};

	// 	document.addEventListener('click', closeDropdownOnClick);

	// 	return () => {
	// 		document.removeEventListener('click', closeDropdownOnClick);
	// 	};
	// });

	return (
		<div className="language-picker">
			<button
				className="select-btn"
				onClick={() => changeLanguage($locale)}
				role="combobox"
				aria-label="select button"
				aria-haspopup="listbox"
				aria-expanded="false"
				aria-controls="select-dropdown"
			>
				<span className="select-btn-text">{$locale.toUpperCase()}</span>
				{/* <span className="select-btn-arrow"></span> */}
			</button>

			{/* <ul
				className={`dropdown ${visible ? 'visible' : 'hidden'}`}
				aria-labelledby="dropdown-button"
				role="listbox"
			>
				{locales.map((language) => (
					<li
						key={language}
						className={`select-option ${
							$locale === language ? 'visible' : 'hidden'
						}`}
						role="option"
						onClick={() => changeLanguage(language)}
					>
						{t(`languages.${language}`)}
					</li>
				))}
			</ul> */}
		</div>
	);
}
