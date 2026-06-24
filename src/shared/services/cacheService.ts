export async function withClientCache<T>(_key: string, request: () => Promise<T>): Promise<T> {
  return request();
}
