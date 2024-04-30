import { useState } from 'react';
import { Button } from '/src/components/common/Button';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import styles from '/src/styles/join/join.module.scss';
import { paths } from '/src/utils/path';
import { postDuplicateEmail, postDuplicateNickname, postJoin } from '/src/services/userApi';

function JoinPage() {
  const navigate = useNavigate();
  const [joinData, setJoinData] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    phoneNumber: '',
  });

  const { mutate } = useMutation({
    mutationFn: () => postJoin(joinData),
    onSuccess: () => {
      navigate(paths.LOGIN);
    },
    onError: (error) => {
      console.log('login error', error);
    },
  });

  const { mutate: isDuplicateEmail } = useMutation({
    mutationKey: ['duplicateEmail', { email: joinData.email }],
    mutationFn: () => postDuplicateEmail({ email: joinData.email }),
  });

  const { mutate: isDuplicateNickName } = useMutation({
    mutationKey: ['duplicateNickName', { nickname: joinData.nickname }],
    mutationFn: () => postDuplicateNickname({ nickname: joinData.nickname }),
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.inputContainer}>
          <div className={styles.label}>이메일</div>
          <div className={styles.availabilityContainer}>
            <input
              type="email"
              className={styles.availabilityInput}
              onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
            />
            <div
              className={styles.checkBtn}
              onClick={() => {
                isDuplicateEmail(joinData.email);
              }}
            >
              중복확인
            </div>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호</div>
          <input type="password" onChange={(e) => setJoinData({ ...joinData, password: e.target.value })} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호 확인</div>
          <input type="password" onChange={(e) => setJoinData({ ...joinData, email: e.target.value })} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>이름</div>
          <input type="text" onChange={(e) => setJoinData({ ...joinData, name: e.target.value })} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>닉네임</div>
          <div className={styles.availabilityContainer}>
            <input
              type="text"
              className={styles.availabilityInput}
              onChange={(e) => setJoinData({ ...joinData, nickname: e.target.value })}
            />
            <div
              className={styles.checkBtn}
              onClick={() => {
                isDuplicateNickName(joinData.nickname);
              }}
            >
              중복확인
            </div>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>휴대폰</div>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
            placeholder='"-" 를 제외하고 입력해주세요'
            onChange={(e) => setJoinData({ ...joinData, phoneNumber: e.target.value })}
          />
        </div>
      </form>
      <Button variant="green3" onClick={handleSubmit}>
        회원가입 완료
      </Button>
    </div>
  );
}

export default JoinPage;
