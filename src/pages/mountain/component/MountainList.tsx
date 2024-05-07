import { TotalMountain } from '/src/services/mountainAPi';

import styles from './MountainList.module.scss';
import { Card } from '/src/components/common/Card';
import logo from '/images/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function MountainList({
  mountainContent,
  // totalPage,
}: {
  mountainContent: TotalMountain[];
  totalPage: number;
}) {
  const navigation = useNavigate();

  return (
    <>
      <div className={styles.title}>전체 산 목록</div>
      {mountainContent.map((mountain, index) => {
        return (
          <div
            className={styles.container}
            key={mountain.id}
            onClick={() => {
              navigation(`/mountain/detail?id=${mountain.id}`);
            }}
          >
            <Card variant={index % 2 !== 0 ? 'green2' : 'green1'}>
              <div className={styles.textContainer}>
                <div className={styles.top}>
                  <div className={styles.name}>{mountain.name}</div>
                </div>
                <div className={styles.middle}>
                  <div className={styles.location}>{mountain.location}</div>
                </div>
                <div className={styles.bottom}>
                  <img className={styles.logo} src={logo} />
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
}
