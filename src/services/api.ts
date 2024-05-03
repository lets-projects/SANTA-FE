import axios from 'axios';

const getUserToken = () => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = localStorage.getItem('access_token');
  return userToken;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = getUserToken();
  // const userToken =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QzQGFzZC5jb20iLCJhdXRoIjoiVVNFUiIsImV4cCI6MTcxNDQ2Mjg0MH0.ojnccvHlr7y4lbwBTih6Td-hJQeE_wTXMxqON0BtCJs';

  // 토큰이 있다면 헤더에 추가한다.
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});
