import { useCallback, useEffect, useRef } from 'react';

export default function useIntersectionObserver<T extends HTMLDivElement>(onIntersect: () => void) {
  const targetRef = useRef<T>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    ([entry], obs) => {
      console.log('handleIntersect 실행');
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
        onIntersect();
      }
    },
    [onIntersect],
  );
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (targetRef?.current) {
      observer = new IntersectionObserver(handleIntersect, { root: null, rootMargin: '0px', threshold: 0.6 });
      observer.observe(targetRef.current);
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, [handleIntersect, targetRef]);
  return { targetRef };
}
