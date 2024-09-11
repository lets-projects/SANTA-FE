import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { KakaoCode, postKakaoCode } from '/src/services/userApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '/src/utils/path';

export default function OauthRedirectPage() {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');
  const socialName = window.location.pathname.replace('/oauth/', '');

  const { mutate: kakaoLogin } = useMutation({
    mutationFn: (postData: KakaoCode) => postKakaoCode(postData),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      alert('환영합니다!');
      navigate(paths.HOME);
    },
    onError: () => {
      alert('다시 시도 해 주세요.');
      navigate(paths.LOGIN);
    },
  });

  useEffect(() => {
    if (!code) {
      return;
    }

    if (socialName == 'kakao') {
      const postData = {
        authorizationCode: code,
      };
      return kakaoLogin(postData);
    }

    if (socialName == 'google') {
      console.log(socialName);
      console.log(code);
    }

    if (socialName == 'naver') {
      console.log(socialName);
      console.log(code);
    }
  }, [code]);

  return (
    <>
      {code && socialName ? (
        <div>
          <div>소셜 이름 : {socialName}</div>
          <div>인가코드 : {code}</div>
        </div>
      ) : (
        <div>뭔가 에러생김</div>
      )}
    </>
  );
}
