const DEFAULT_API_BASE_URL = 'https://itx-frontend-test.onrender.com';
const DEFAULT_CACHE_TTL_MS = 60 * 60 * 1000;

function readNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  cacheTtlMs: readNumber(import.meta.env.VITE_CACHE_TTL_MS, DEFAULT_CACHE_TTL_MS),
};
