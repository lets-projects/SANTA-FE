import { useEffect } from 'react';

interface useIntersectionObserverProps {
  targetRef: React.RefObject<HTMLDivElement>;
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

export default function useIntersectionObserver({
  targetRef,
  threshold,
  hasNextPage,
  fetchNextPage,
}: useIntersectionObserverProps) {
  useEffect(() => {
    if (!targetRef.current) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    };
    //ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold: threshold || 0.5,
    });

    // 타겟 관찰 시작
    observer.observe(targetRef.current);

    // 관찰 멈춤
    return () => observer.disconnect();
  }, [targetRef, threshold, hasNextPage, fetchNextPage]);
}
