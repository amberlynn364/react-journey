import { createBrowserRouter } from 'react-router-dom';
import RouterPath from './routerTypes';
import ErrorBoundary from '../pages/ErrorBoundary/ErrorBoundary';
import RootLayout from '../components/layouts/RootLayout';
import SideCardDetails from '../pages/SideCardDetails/SideCardDetails';
import { fetchDataWithID } from '../services/fetchData';

const router = createBrowserRouter([
  {
    path: RouterPath.RootLayout,
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: ':id',
        element: <SideCardDetails />,
        loader: async ({ params }) => {
          const data = await fetchDataWithID(params.id || '');
          return data;
        },
      },
    ],
  },
]);

export default router;
