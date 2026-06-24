import { useEffect, useState } from 'react';

import { getProducts } from '../services/productService';
import type { ProductListItem } from '../types/product.types';

type ProductsState = {
  products: ProductListItem[];
  isLoading: boolean;
  error: string | null;
};

export function useProducts() {
  const [state, setState] = useState<ProductsState>({
    products: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const products = await getProducts();

        if (isMounted) {
          setState({ products, isLoading: false, error: null });
        }
      } catch {
        if (isMounted) {
          setState({
            products: [],
            isLoading: false,
            error: 'No se pudieron cargar los productos.',
          });
        }
      }
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
