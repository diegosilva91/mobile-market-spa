export type ProductListItem = {
  id: string;
  brand: string;
  model: string;
  price: string;
  imageUrl: string;
};

export type ProductOption = {
  code: number;
  name: string;
};

export type ProductDetail = ProductListItem & {
  cpu?: string;
  ram?: string;
  os?: string;
  displayResolution?: string;
  battery?: string;
  primaryCamera?: string;
  secondaryCamera?: string;
  dimensions?: string;
  weight?: string;
  colors: ProductOption[];
  storages: ProductOption[];
};

export type ProductListApiResponse = Array<Record<string, unknown>>;
export type ProductDetailApiResponse = Record<string, unknown>;
