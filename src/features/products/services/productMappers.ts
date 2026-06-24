import type { ProductDetail, ProductListItem, ProductOption } from '../types/product.types';

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback;
}

function normalizeOption(value: unknown): ProductOption | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const option = value as Record<string, unknown>;
  const code = Number(option.code);
  const name = asString(option.name);

  if (!Number.isFinite(code) || !name) {
    return null;
  }

  return { code, name };
}

function normalizeOptions(value: unknown): ProductOption[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(normalizeOption).filter((option): option is ProductOption => option !== null);
}

export function mapProductListItem(rawProduct: Record<string, unknown>): ProductListItem {
  return {
    id: asString(rawProduct.id),
    brand: asString(rawProduct.brand),
    model: asString(rawProduct.model),
    price: asString(rawProduct.price),
    imageUrl: asString(rawProduct.imgUrl ?? rawProduct.imageUrl),
  };
}

export function mapProductDetail(rawProduct: Record<string, unknown>): ProductDetail {
  const options = rawProduct.options as Record<string, unknown> | undefined;

  return {
    ...mapProductListItem(rawProduct),
    cpu: asString(rawProduct.cpu),
    ram: asString(rawProduct.ram),
    os: asString(rawProduct.os),
    displayResolution: asString(rawProduct.displayResolution ?? rawProduct.displaySize),
    battery: asString(rawProduct.battery),
    primaryCamera: asString(rawProduct.primaryCamera),
    secondaryCamera: asString(rawProduct.secondaryCmera ?? rawProduct.secondaryCamera),
    dimensions: asString(rawProduct.dimentions ?? rawProduct.dimensions),
    weight: asString(rawProduct.weight),
    colors: normalizeOptions(options?.colors ?? rawProduct.colors),
    storages: normalizeOptions(options?.storages ?? rawProduct.storages),
  };
}
