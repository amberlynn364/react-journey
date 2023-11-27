import { createBrowserRouter } from 'react-router-dom';
import RouterPath from './routerTypes';
import ErrorBoundary from '../pages/ErrorBoundary/ErrorBoundary';
import SideCardDetails from '../pages/SideCardDetails/SideCardDetails';
import RootLayout from '../layouts/RootLayout';
import Page404 from '../pages/Page404/Page404';

const router = createBrowserRouter([
  {
    path: RouterPath.RootLayout,
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: ':id',
        element: <SideCardDetails />,
      },
    ],
  },
  {
    path: RouterPath.Page404,
    element: <Page404 />,
  },
]);

export default router;
