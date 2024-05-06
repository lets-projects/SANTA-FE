// import { useNavigate } from 'react-router-dom';

export default function OauthRedirectPage() {
  const code = new URL(window.location.href).searchParams.get('code');
  //   const navigate = useNavigate();

  console.log(code);
  return <></>;
}
