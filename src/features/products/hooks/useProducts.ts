import { useCallback, useEffect, useState } from 'react';

import { getProducts } from '../services/productService';
import type { ProductListItem } from '../types/product.types';

type ProductsState = {
  products: ProductListItem[];
  isLoading: boolean;
  error: string | null;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'No se pudieron cargar los productos.';
}

export function useProducts() {
  const [reloadToken, setReloadToken] = useState(0);
  const [state, setState] = useState<ProductsState>({
    products: [],
    isLoading: true,
    error: null,
  });

  const reload = useCallback(() => {
    setState((previousState) => ({
      ...previousState,
      isLoading: true,
      error: null,
    }));
    setReloadToken((value) => value + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const products = await getProducts();

        if (isMounted) {
          setState({ products, isLoading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            products: [],
            isLoading: false,
            error: getErrorMessage(error),
          });
        }
      }
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, [reloadToken]);

  return {
    ...state,
    reload,
  };
}
