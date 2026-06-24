import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage';
import { ProductListPage } from '../pages/ProductListPage/ProductListPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { AppLayout } from '../shared/components/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: 'products',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
