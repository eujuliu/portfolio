import { useState } from 'react';
import { locale } from '../../stores/i18n';
import { useStore } from '@nanostores/react';
import { useTranslation } from '../../i18n/utils';
import './style.css';

export default function Menu() {
	const [visible, setVisibility] = useState(false);
	const $locale = useStore(locale);
	const t = useTranslation($locale);

	const navigation = ['home', 'aboutMe', 'blog', 'contact'];
	const links = [
		{ href: 'https://github.com/eujuliu', name: 'github' },
		{ href: 'https://www.linkedin.com/in/ojuliomartins/', name: 'linkedin' },
	];

	function changeMenuVisibility() {
		setVisibility(!visible);

		document
			.querySelector('html')
			?.setAttribute('data-menu', !visible ? 'active' : 'inactive');
		window.scrollTo(0, 0);
	}

	return (
		<div className="menu">
			<button className="menu-btn" onClick={changeMenuVisibility}>
				<i className={`bx ${visible ? 'bx-x' : 'bx-menu'} bx-lg`}></i>
			</button>

			<div className={`side-menu ${visible ? 'visible' : 'hidden'}`}>
				<div className="content">
					<ul>
						{navigation.map((option, index) => (
							<li key={option} className="option">
								<span className="number">
									{(index + 1).toLocaleString($locale, {
										minimumIntegerDigits: 2,
									})}
								</span>

								<a href={`/${option === 'home' ? '' : option}`}>
									{t(`${option}.label`)}
								</a>
							</li>
						))}
					</ul>

					<div className="links">
						{links.map((link) => (
							<a
								key={link.name}
								className="link"
								href={link.href}
								target="_blank"
							>
								<i className="bx bx-up-arrow-alt bx-md"></i>
								{link.name}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
