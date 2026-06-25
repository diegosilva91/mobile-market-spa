import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCachedValue, setCachedValue, withClientCache } from './cacheService';

describe('cacheService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('devuelve null cuando no existe una entrada cacheada', () => {
    expect(getCachedValue('missing-key')).toBeNull();
  });

  it('guarda y recupera una entrada no expirada', () => {
    setCachedValue('products:list:test', [{ id: '1', brand: 'Apple' }], 60_000);

    expect(getCachedValue('products:list:test')).toEqual([{ id: '1', brand: 'Apple' }]);
  });

  it('invalida una entrada expirada', () => {
    vi.spyOn(Date, 'now').mockReturnValueOnce(1_000);
    setCachedValue('products:detail:test', { id: '1' }, 500);

    vi.spyOn(Date, 'now').mockReturnValueOnce(2_000);

    expect(getCachedValue('products:detail:test')).toBeNull();
  });

  it('evita repetir la petición cuando existe caché válida', async () => {
    const request = vi.fn().mockResolvedValue({ id: '1', model: 'iPhone' });

    const firstResult = await withClientCache('product:test', request);
    const secondResult = await withClientCache('product:test', request);

    expect(firstResult).toEqual({ id: '1', model: 'iPhone' });
    expect(secondResult).toEqual({ id: '1', model: 'iPhone' });
    expect(request).toHaveBeenCalledTimes(1);
  });
});
