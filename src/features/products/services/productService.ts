import { apiRequest } from '../../../shared/services/apiClient';
import { withClientCache } from '../../../shared/services/cacheService';
import { mapProductDetail, mapProductListItem } from './productMappers';
import type {
  ProductDetail,
  ProductDetailApiResponse,
  ProductListApiResponse,
  ProductListItem,
} from '../types/product.types';

const PRODUCT_LIST_CACHE_KEY = 'products:list:v1';
const productDetailCacheKey = (productId: string) => `products:detail:${productId}:v1`;

export async function getProducts(): Promise<ProductListItem[]> {
  return withClientCache(PRODUCT_LIST_CACHE_KEY, async () => {
    const response = await apiRequest<ProductListApiResponse>('/api/product');

    return response.map(mapProductListItem);
  });
}

export async function getProductDetail(productId: string): Promise<ProductDetail> {
  return withClientCache(productDetailCacheKey(productId), async () => {
    const response = await apiRequest<ProductDetailApiResponse>(`/api/product/${productId}`);

    return mapProductDetail(response);
  });
}
