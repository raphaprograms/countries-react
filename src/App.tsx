

import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <header id="header">
        <Header />
      </header>
       <div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}