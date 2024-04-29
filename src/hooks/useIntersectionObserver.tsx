// import { InfiniteQueryObserverResult } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';

// interface useIntersectionObserverProps {
//   threshold?: number;
//   hasNextPage: boolean | undefined;
//   fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
// }

// export default function useIntersectionObserver({
//   threshold,
//   hasNextPage,
//   fetchNextPage,
// }: useIntersectionObserverProps) {
//   const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

//   const observerCallback: IntersectionObserverCallback = (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting && hasNextPage) {
//         fetchNextPage();
//       }
//     });
//   };
//   useEffect(() => {
//     if (!target) return;

//     //ointersection observer 인스턴스 생성
//     const observer = new IntersectionObserver(observerCallback, {
//       threshold,
//     });

//     // 타겟 관찰 시작
//     observer.observe(target);

//     // 관찰 멈춤
//     return () => observer.unobserve(target);
//   }, [observerCallback, threshold, target]);

//   return { setTarget };
// }
