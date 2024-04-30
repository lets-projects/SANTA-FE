import { useEffect, useState, RefObject } from 'react';

export default function useIntersectionObserver(onIntersect: () => void) {
  const [targetRef, setTargetRef] = useState<RefObject<HTMLDivElement> | null>(null);
  const handleIntersect: IntersectionObserverCallback = ([entry], obs) => {
    if (entry.isIntersecting) {
      obs.unobserve(entry.target);
      onIntersect();
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (targetRef?.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.6 });
      observer.observe(targetRef.current);
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, [handleIntersect, targetRef]);
  return { setTargetRef };
}
