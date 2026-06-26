import { useEffect, useRef } from 'react';

/**
 * Observes a sentinel element and calls `onLoadMore` when it enters the viewport.
 * Re-attaches the observer whenever `isEnabled` changes.
 */
export function useInfiniteScroll(onLoadMore: () => void, isEnabled: boolean) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  });

  useEffect(() => {
    if (!isEnabled) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMoreRef.current();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isEnabled]);

  return sentinelRef;
}
