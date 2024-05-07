import { useQuery } from '@tanstack/react-query';

import styles from './MountainDetailPage.module.scss';
import { getMountainDetail } from '/src/services/mountainAPi';
import logo from '/images/logo.svg';

export default function MountainDetailPage() {
  const id = new URL(window.location.href).searchParams.get('id');
  const mountainId = Number(id);

  const { data: mountain, isSuccess } = useQuery({
    queryKey: ['mountainDetail', id],
    queryFn: () => getMountainDetail(mountainId),
    select: (data) => data.data,
  });

  return (
    <>
      {isSuccess && (
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.title}>{mountain.name}</div>
          </div>
          <div className={styles.middle}>
            <div className={styles.label}>위치</div>
            <div className={styles.location}>{mountain.location}</div>
            <div className={styles.gpsText}>
              <div className={styles.label}>위도 · 경도</div>
              <p>위도 - {mountain.latitude}</p>
              <p>경도 - {mountain.longitude}</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <img className={styles.logo} src={logo} />
          </div>
        </div>
      )}
    </>
  );
}
