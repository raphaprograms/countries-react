import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Details from './pages/Details';

// function HomeStub() {
//   return (
//     <div>
//       Home
//     </div>
//   )
// }

// function DetailsStub() {
//   return (
//     <div>
//       Details
//     </div>
//   )
// }

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'country/:id', element: <Details/> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);