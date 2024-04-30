import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPreferCategory } from '/src/services/categoryApi';

import { FaGear } from 'react-icons/fa6';
import styles from './CategoryBox.module.scss';
import { paths } from '/src/utils/path';

const CATEGORY = ['출사', '힐링', '아마추어'];

export default function CategoryBox() {
  const { data: preferCategory } = useQuery({
    queryKey: ['preferCategory'],
    queryFn: getPreferCategory,
    select: (data) => data.data,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(preferCategory);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>선호 카테고리</p>
        <Link to={paths.CATEGORY}>
          <FaGear className={styles.icon} />
        </Link>
      </div>
      <div className={styles.categoryList}>
        {CATEGORY.map((category) => {
          return <p key={category}>#{category}</p>;
        })}
      </div>
    </div>
  );
}
