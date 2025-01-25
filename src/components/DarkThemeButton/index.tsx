import { useStore } from '@nanostores/react';
import { changeTheme, theme } from '../../stores/theme';
import './style.css';

export default function DarkThemeButton() {
	const $theme = useStore(theme);

	return (
		<button className="dark-theme-btn" onClick={() => changeTheme()}>
			<i className={`bx ${$theme === 'dark' ? 'bxs-moon' : 'bx-sun'}`}></i>
		</button>
	);
}
