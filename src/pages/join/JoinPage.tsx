import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '/src/styles/join/join.module.scss';
import { paths } from '/src/utils/path';
import { postDuplicateEmail, postDuplicateNickname, postJoin } from '/src/services/userApi';
import { JoinData } from '/src/services/userApi';
import { joinSchema } from './joinSchema';

function JoinPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(joinSchema),
    mode: 'onChange',
  });

  const { mutate } = useMutation<Response, Error, JoinData>({
    mutationFn: (joinData) => postJoin(joinData),
    onSuccess: () => {
      navigate(paths.LOGIN);
    },
    onError: (error) => {
      console.log('login error', error);
    },
  });

  // const { mutate: isDuplicateEmail } = useMutation({
  //   mutationKey: ['duplicateEmail', { email: joinData.email }],
  //   mutationFn: () => postDuplicateEmail({ email: joinData.email }),
  // });

  // const { mutate: isDuplicateNickName } = useMutation({
  //   mutationKey: ['duplicateNickName', { nickname: joinData.nickname }],
  //   mutationFn: () => postDuplicateNickname({ nickname: joinData.nickname }),
  // });

  const onSubmit = (joinData: JoinData) => {
    //이메일 중복 확인 && 닉네임 중복 확인 성공시
    console.log(joinData);
    // mutate(joinData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <div className={styles.label}>이메일</div>
          <div className={styles.availabilityContainer}>
            <input type="text" className={styles.availabilityInput} {...register('email')} />
            <div
              className={styles.checkBtn}
              // onClick={() => {
              //   isDuplicateEmail(joinData.email);
              // }}
            >
              중복확인
            </div>
          </div>
          {errors.email && <p className={styles.errorMessage}>{errors.email?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호</div>
          <input type="password" {...register('password')} />
          {errors.password && <p className={styles.errorMessage}>{errors.password?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호 확인</div>
          <input type="password" {...register('checkPassword')} />
          {errors.checkPassword && <p className={styles.errorMessage}>{errors.checkPassword?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>이름</div>
          <input type="text" {...register('name')} />
          {errors.name && <p className={styles.errorMessage}>{errors.name?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>닉네임</div>
          <div className={styles.availabilityContainer}>
            <input type="text" className={styles.availabilityInput} {...register('nickname')} />
            <div
              className={styles.checkBtn}
              // onClick={() => {
              //   isDuplicateNickName(joinData.nickname);
              // }}
            >
              중복확인
            </div>
          </div>
          {errors.nickname && <p className={styles.errorMessage}>{errors.nickname?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>휴대폰</div>
          <input type="tel" placeholder='"-" 를 제외하고 입력해주세요' {...register('phoneNumber')} />
          {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber?.message}</p>}
        </div>

        <button type="submit" className={styles.joinBtn}>
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default JoinPage;
