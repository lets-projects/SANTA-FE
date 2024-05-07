import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { KakaoCode, postKakaoCode } from '/src/services/userApi';
// import { useNavigate } from 'react-router-dom';

export default function OauthRedirectPage() {
  //   const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  console.log('카카오 인가 코드', code);

  const { mutate, data: OauthKaKaoData } = useMutation({
    mutationFn: (postData: KakaoCode) => postKakaoCode(postData),
  });

  useEffect(() => {
    if (code) {
      const postData = {
        authorizationCode: code,
      };
      mutate(postData);
      console.log(OauthKaKaoData);
    }
  }, [code]);

  return <></>;
}
