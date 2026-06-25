import { Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '../shared/components/AppLayout';

const ProductListPage = lazy(() =>
  import('../pages/ProductListPage/ProductListPage').then((module) => ({
    default: module.ProductListPage,
  })),
);
const ProductDetailPage = lazy(() =>
  import('../pages/ProductDetailPage/ProductDetailPage').then((module) => ({
    default: module.ProductDetailPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
);

function withSuspense(component: ReactNode) {
  return <Suspense fallback={<p>Cargando vista...</p>}>{component}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<ProductListPage />),
      },
      {
        path: 'products',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'products/:productId',
        element: withSuspense(<ProductDetailPage />),
      },
      {
        path: '*',
        element: withSuspense(<NotFoundPage />),
      },
    ],
  },
]);
