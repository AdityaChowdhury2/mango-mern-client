import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import MangoTable from './MangoTable';
import Update from './Update';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/mangoes',
		element: <MangoTable />,
		loader: () => fetch('http://localhost:5000/mango'),
	},
	{
		path: '/mangoes/:id',
		element: <Update />,
		loader: ({ params }) => fetch(`http://localhost:5000/mango/${params.id}`),
	},
]);

export default Router;
