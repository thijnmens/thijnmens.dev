import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Navbar from './components/Navbar.tsx';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Projects from './routes/Projects.tsx';
import ErrorPage from './routes/ErrorPage.tsx';

export default function pages(): RouteObject[] {
	return [
		{
			id: 'Home',
			path: '/',
			element: <App />,
		},
		{
			id: 'Projects',
			path: '/projects',
			element: <Projects />,
		},
	];
}

const router = createBrowserRouter(pages());

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Navbar />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
