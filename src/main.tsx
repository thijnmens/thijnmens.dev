import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Navbar from './components/Navbar.tsx';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Projects from './routes/Projects.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import Layouts from './routes/Layouts.tsx';

export default function pages(): RouteObject[] {
	return [
		{
			id: 'Home',
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
		},
		{
			id: 'Projects',
			path: '/projects',
			element: <Projects />,
			errorElement: <ErrorPage />,
		},
		{
			id: 'Adofai Layouts',
			path: '/layouts',
			element: <Layouts />,
			errorElement: <ErrorPage />
		}
	];
}

const router = createBrowserRouter(pages());

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Navbar />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
