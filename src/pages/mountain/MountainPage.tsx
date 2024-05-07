import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import styles from './MountainPage.module.scss';
import { TotalMountain, getAllMountains } from '/src/services/mountainAPi';
import MountainList from './component/MountainList';

const PAGE_SIZE = 10;
export default function MountainPage() {
  const [page, setPage] = useState(0);
  const [mountainList, setMountainList] = useState<TotalMountain[]>([]);

  const {
    data: allMountain,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['allMountain', page],
    queryFn: () => getAllMountains(page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        //총 페이지
        totalPage: data.data.totalPages,
      };
    },
  });

  useEffect(() => {
    const isSuccess = isFetched && !isError;
    if (isSuccess && allMountain) {
      setMountainList((prevList) => [...prevList, ...allMountain.content]);
      console.log('mountainList', mountainList);
    }
  }, [isFetched, isError, allMountain]);

  const isSuccess = !isError && isFetched;
  return (
    <div className={styles.container}>
      <div className={styles.title}>전체 산 목록</div>
      {isSuccess &&
        mountainList.map((mauntainData, index) => {
          return (
            <MountainList
              mauntainData={mauntainData}
              setPage={setPage}
              isLast={allMountain && allMountain.totalPage >= page && mountainList.length === index + 1}
            />
          );
        })}
    </div>
  );
}
