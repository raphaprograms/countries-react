import { useTheme } from '../context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const label = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

    return (
        <>
            <h1>Where in the world?</h1>
            <button id="theme-toggle" onClick={toggleTheme}>{label}</button>
        </>
    )
}