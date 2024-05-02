import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyMountains } from '/src/services/challengeApi';

import { PiMedal } from 'react-icons/pi';
import styles from './Achievements.module.scss';
import mountain from '/images/mountain.png';
import { paths } from '/src/utils/path';

// interface Record {
//   name: string;
//   height: number;
//   location: string;
//   climbDate: string;
// }

export default function AchievementsBox() {
  const navigate = useNavigate();

  const {
    data: myMountains,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['allChallenge'],
    queryFn: getMyMountains,
    select: (data) => data.data.content,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const SUCCESS = !isError && isFetched;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>나의 기록</p>
        <Link to="/나의업적페이지">
          <PiMedal className={styles.icon} />
        </Link>
      </div>
      <div className={styles.records}>
        <div className={styles.achievName}>총 높이</div>
        <p>{SUCCESS ? '' : 0} M</p>
        <div className={styles.achievName}>정복한 정상</div>
        <p>{SUCCESS ? myMountains.length : 0} 개</p>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.certificationBtn}
          onClick={() => {
            navigate(paths.MOUNTAIN_VERTIFY);
          }}
        >
          인증하러 가기
        </button>
        <div className={styles.imgContainer}>
          <img className={styles.mountainImg} src={mountain} />
        </div>
      </div>
    </div>
  );
}
