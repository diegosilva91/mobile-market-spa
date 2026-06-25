import { env } from '../config/env';

type CacheRecord<T> = {
  data: T;
  expiresAt: number;
};

function getStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function getCachedValue<T>(key: string): T | null {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  const rawValue = storage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    const record = JSON.parse(rawValue) as CacheRecord<T>;

    if (!record || typeof record.expiresAt !== 'number' || Date.now() > record.expiresAt) {
      storage.removeItem(key);
      return null;
    }

    return record.data;
  } catch {
    storage.removeItem(key);
    return null;
  }
}

export function setCachedValue<T>(key: string, data: T, ttlMs = env.cacheTtlMs) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  const record: CacheRecord<T> = {
    data,
    expiresAt: Date.now() + ttlMs,
  };

  storage.setItem(key, JSON.stringify(record));
}

export async function withClientCache<T>(key: string, request: () => Promise<T>): Promise<T> {
  const cachedValue = getCachedValue<T>(key);

  if (cachedValue !== null) {
    return cachedValue;
  }

  const data = await request();
  setCachedValue(key, data);

  return data;
}
