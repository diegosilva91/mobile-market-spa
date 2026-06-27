export type AddToCartPayload = {
  id: string;
  colorCode: number;
  storageCode: number;
};

export type AddToCartResponse = {
  count: number;
};

export type CartItem = {
  key: string;
  productId: string;
  brand: string;
  model: string;
  imageUrl: string;
  priceLabel: string;
  unitPrice: number;
  colorCode: number;
  colorName: string;
  storageCode: number;
  storageName: string;
  quantity: number;
};

export type CartItemInput = Omit<CartItem, 'key' | 'quantity'> & {
  quantity?: number;
};
