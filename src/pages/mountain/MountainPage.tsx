import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import styles from './MountainPage.module.scss';
import { getAllMountains } from '/src/services/mountainAPi';
// import { useNavigate } from 'react-router-dom';
import MountainList from './component/MountainList';

const PAGE_SIZE = 10;
export default function MountainPage() {
  const [page, _setPage] = useState(0);
  //   const [mountainList, setMountainList] = useState<TotalMountain[]>([]);

  //   const navigation = useNavigate();

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
        totalPage: data.data.totalPages,
      };
    },
  });

  console.log(allMountain);

  //   const isLast = allMountain?.totalPage >= page && gatheringList.length === index + 1;
  const isSuccess = !isError && isFetched;
  return (
    <div className={styles.container}>
      {isSuccess && <MountainList mountainContent={allMountain?.content} totalPage={allMountain?.totalPage} />}
    </div>
  );
}
