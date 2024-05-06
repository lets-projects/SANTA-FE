import { useQuery } from '@tanstack/react-query';
import styles from './UserProfile.module.scss';

import useUserInfo from '/src/hooks/useUserInfo';
import { getUserRank } from '/src/services/userApi';

export default function UserProfile() {
  const { data: userRank } = useQuery({ queryKey: ['userRank'], queryFn: getUserRank });
  const userInfo = useUserInfo();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userProfile}>
        <img src={userInfo?.image} alt="유저 이미지" />
        <div className={styles.rankBox}>
          <p>내 점수🏅</p>
          <p>{userRank?.score}</p>
        </div>
      </div>
      <div className={styles.textBox}>
        <p>반갑습니다 {userInfo ? userInfo?.nickname : '비회원'}님!</p>
        <p>오늘도 즐거운 등산 되세요😄</p>
      </div>
    </div>
  );
}
