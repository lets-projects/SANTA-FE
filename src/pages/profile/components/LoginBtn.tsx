import styles from './LoginBtn.module.scss';

import kakaoLogo from '../../../../public/images/kakao.png';
import googleLogo from '../../../../public/images/google.svg';

interface Props {
  value: 'kakao' | 'google';
  state?: boolean;
}

export default function LoginBtn({ value, state }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.company}>
        <img src={value == 'kakao' ? kakaoLogo : googleLogo} className={styles.logoImg} />
        <p>{value}</p>
      </div>
      <div className={state ? styles.connected : styles.connect}>{state ? '연동완료' : '연동하기'}</div>
    </div>
  );
}
