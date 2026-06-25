import { describe, expect, it, vi } from 'vitest';

import { addToCart } from './cartService';

describe('cartService', () => {
  it('envía el payload correcto al endpoint de carrito', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ count: 2 }), { status: 200 }),
    );

    const response = await addToCart({
      id: '1',
      colorCode: 10,
      storageCode: 20,
    });

    expect(response).toEqual({ count: 2 });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/cart'),
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });
});
