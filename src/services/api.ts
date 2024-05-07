import axios, { AxiosInstance } from 'axios';
// import { paths } from '../utils/path';

const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
};

const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refresh_token');
  return refreshToken;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const accessToken = getAccessToken();

  //토큰이 있으면
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     const originalRequest = config;

//     if (status === 403) {
//       //토큰 재발급
//       await tokenRefresh(api)
//       const accessToken = getAccessToken();
//       error.config.headers.Authorization = `Bearer ${accessToken}`;
//       //중단된 요청은 토큰 갱신 후 재요청
//       return await api(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );

//토큰 갱신 함수
export const tokenRefresh = async (api: AxiosInstance) => {
  const refreshToken = getRefreshToken(); // 리프레시 토큰을 가져오기

  const response = await api.post('users/new-access-token', refreshToken);
  console.log(response);
  // const newAccessToken = response.accessToken;
  // sessionStorage.removeItem('access_token');
  // sessionStorage.setItem('access_token', newAccessToken); // 세션 스토리지에 액세스 토큰 저장
};

//interceptor 분리시 -> 로그인, 새로고침 해야 헤더에 토큰 적용되는 에러 발생함

// const test = async () => {
//   const refreshToken = localStorage.getItem('refresh_token');
//   console.log('refreshToken', refreshToken);
//   const data = {
//     refreshToken: refreshToken,
//   };
//   console.log(data);
//   const response = await api.post('users/new-access-token', data);
// };

// test();
