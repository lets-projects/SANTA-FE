import { TotalMountain } from '/src/services/mountainAPi';

import styles from './MountainList.module.scss';
import { Card } from '/src/components/common/Card';
import logo from '/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';

interface Props {
  mauntainData: TotalMountain;
  isLast?: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function MountainList({ mauntainData, setPage, isLast }: Props) {
  const navigation = useNavigate();
  const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (isLast && setPage) {
      setPage((prev) => prev + 1);
    }
  });

  return (
    <>
      <div
        className={styles.container}
        key={mauntainData.id}
        ref={(_ref) => {
          if (isLast) {
            console.log('ref 할당');
            targetRef.current = _ref;
          } else {
            _ref = null;
          }
        }}
        onClick={() => {
          navigation(`/mountain/detail?id=${mauntainData.id}`);
        }}
      >
        <Card variant={mauntainData.id % 2 !== 0 ? 'green2' : 'green1'}>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.name}>{mauntainData.name}</div>
            </div>
            <div className={styles.middle}>
              <div className={styles.location}>{mauntainData.location}</div>
            </div>
            <div className={styles.bottom}>
              <img className={styles.logo} src={logo} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
