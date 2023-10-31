import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import RouterPath from './routerTypes';
import ErrorBoundary from '../pages/ErrorBoundary/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: RouterPath.Home,
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
