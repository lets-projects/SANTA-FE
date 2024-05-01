import { useEffect, useRef } from 'react';

export default function useIntersectionObserver<T extends HTMLDivElement>(onIntersect: () => void) {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          onIntersect();
        }
      },
      { threshold: 1 },
    );

    if (targetRef?.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onIntersect, targetRef]);

  return { targetRef };
}
