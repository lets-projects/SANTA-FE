//loginPage
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IoMailOutline } from 'react-icons/io5';
import { IoLockOpenOutline } from 'react-icons/io5';
import styles from '/src/styles/login/loginPage.module.scss';
import googleIcon from '/images/google.svg';
import kakaoIcon from '/images/kakao.png';
import { validateEmail } from '/src/utils/validation';

type LoginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, seterrorMessage] = useState('');

  const loginData = { email: email, password: password };
  const navigate = useNavigate();

  const postLogin = useMutation({
    mutationFn: (loginData: LoginForm) => axios.post(`http://43.200.136.37:8080/api/users/sign-in`, loginData),
    onSuccess: (data) => {
      localStorage.setItem('access', data.data.accessToken);
      localStorage.setItem('refresh', data.data.refreshToken);
      navigate('/');
    },
    onError: (data) => {
      console.log('아임 에러!!!!', data);
      seterrorMessage('아이디 또는 비밀번호를 잘못 입력하였습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email == '') return seterrorMessage('아이디를 입력해 주세요');
    if (!validateEmail(email)) return seterrorMessage('아이디는 이메일 형식이어야 합니다.');
    else {
      postLogin.mutate(loginData);
    }
  };

  console.log();

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>LOGIN</div>
          <div className={styles.description}>로그인 하시면 더 다양한 기능을 이용하실 수 있습니다</div>
        </div>
        <div className={styles.middleContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <IoMailOutline />
              <input type="text" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className={styles.inputContainer}>
              <IoLockOpenOutline />
              <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className={styles.errorMessage}>
              <p>{errorMessage}</p>
            </div>
            <button type="submit" className={styles.loginBtn}>
              로그인
            </button>
          </form>
          <div className={styles.loginMenuContainer}>
            <div>아이디 찾기</div>
            <div className={styles.verticalLine}></div>
            <div>비밀번호 찾기</div>
            <div className={styles.verticalLine}></div>
            <div className={styles.siginText}>회원가입</div>
          </div>
        </div>
        <div className={styles.socialLoginContainer}>
          <div>소셜 계정으로 로그인</div>
          <div className={styles.socialLoginIcon}>
            <img src={kakaoIcon} />
            <img src={googleIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
