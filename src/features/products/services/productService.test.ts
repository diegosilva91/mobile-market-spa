import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getProductDetail, getProducts } from './productService';

describe('productService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('obtiene y mapea el listado de productos', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            id: '1',
            brand: 'Apple',
            model: 'iPhone',
            price: '999',
            imgUrl: 'https://example.com/iphone.png',
          },
        ]),
        { status: 200 },
      ),
    );

    const products = await getProducts();

    expect(products).toEqual([
      {
        id: '1',
        brand: 'Apple',
        model: 'iPhone',
        price: '999',
        imageUrl: 'https://example.com/iphone.png',
      },
    ]);
  });

  it('obtiene y mapea detalle de producto', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          id: '1',
          brand: 'Apple',
          model: 'iPhone',
          price: '999',
          imgUrl: 'https://example.com/iphone.png',
          cpu: 'A17',
          options: {
            colors: [{ code: 1, name: 'Black' }],
            storages: [{ code: 2, name: '256GB' }],
          },
        }),
        { status: 200 },
      ),
    );

    const detail = await getProductDetail('1');

    expect(detail.colors).toEqual([{ code: 1, name: 'Black' }]);
    expect(detail.storages).toEqual([{ code: 2, name: '256GB' }]);
    expect(detail.cpu).toBe('A17');
  });

  it('reutiliza caché del listado y evita segunda llamada HTTP', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            id: '1',
            brand: 'Apple',
            model: 'iPhone',
            price: '999',
            imgUrl: 'https://example.com/iphone.png',
          },
        ]),
        { status: 200 },
      ),
    );

    await getProducts();
    await getProducts();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
