import { api } from './api';

interface LoginData {
  email: string;
  password: string;
}

interface Nickname {
  nickname: string;
}
interface Email {
  email: string;
}

export interface JoinData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phoneNumber: string;
}

interface LoginResponse {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

interface UserInfo {
  email: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  image: string;
}

export const postUserLogin = async (loginData: LoginData) => {
  const response = await api.post<LoginResponse>('/api/users/sign-in', loginData);
  return response.data;
};

export const getUserInfo = async () => {
  return await api.get<UserInfo>('/api/users/my-info');
};

//중복확인 api
export const postDuplicateEmail = async (email: Email) => {
  const response = await api.post<boolean>('/api/users/duplicate/email', email);
  return response.data;
};

export const postDuplicateNickname = async (nickname: Nickname) => {
  const response = await api.post<boolean>('/api/users/duplicate/nickname', nickname);
  return response.data;
};

//회원가입 api
export const postJoin = async (joinData: JoinData) => {
  const response = await api.post('/api/users/signup', joinData);
  return response.data;
};
