import axios from 'axios';

const getUserToken = () => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = localStorage.getItem('access_token');
  return userToken;
};

export const api = axios.create({
  baseURL: 'http://43.200.136.37:8080/api/',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = getUserToken();

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  config.headers['Content-Type'] = 'application/json';

  return config;
});

//interceptor 분리시 -> 로그인, 새로고침 해야 헤더에 토큰 적용되는 에러 발생함
