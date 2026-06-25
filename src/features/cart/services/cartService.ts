import { apiRequest } from '../../../shared/services/apiClient';
import type { AddToCartPayload, AddToCartResponse } from '../types/cart.types';

export function addToCart(payload: AddToCartPayload) {
  return apiRequest<AddToCartResponse>('/api/cart', {
    method: 'POST',
    body: payload,
  });
}
