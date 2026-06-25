import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { withClientCache } from './cacheService';

describe('cacheService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('guarda el resultado de la primera petición y reutiliza caché', async () => {
    const request = vi.fn().mockResolvedValue({ ok: true });

    const first = await withClientCache('products:list:v1', request);
    const second = await withClientCache('products:list:v1', request);

    expect(first).toEqual({ ok: true });
    expect(second).toEqual({ ok: true });
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('revalida cuando la caché expira', async () => {
    const request = vi
      .fn()
      .mockResolvedValueOnce(['first'])
      .mockResolvedValueOnce(['second']);

    await withClientCache('products:list:v1', request);
    vi.advanceTimersByTime(60 * 60 * 1000 + 1);
    const value = await withClientCache('products:list:v1', request);

    expect(value).toEqual(['second']);
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('invalida entradas corruptas', async () => {
    localStorage.setItem('products:list:v1', '{not-json');
    const request = vi.fn().mockResolvedValue(['fresh']);

    const value = await withClientCache('products:list:v1', request);

    expect(value).toEqual(['fresh']);
    expect(request).toHaveBeenCalledTimes(1);
  });
});
