

import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <header id="header">
        <Header />
      </header>
       <div>
        <Outlet />
      </div>
    </>
  );
}