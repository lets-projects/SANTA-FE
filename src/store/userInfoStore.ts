import { create } from 'zustand';

interface userInfoType {
  email: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  image: string;
}

interface UserInfoState {
  userInfo: userInfoType;
}

interface UserInfoActions {
  setUserInfo: (userInfo: userInfoType) => void;
  deleteUserInfo: () => void;
}

const defaultState = {
  email: '',
  nickname: '비회원',
  name: '비회원',
  phoneNumber: '01012341234',
  image: 'https://cdn.pixabay.com/photo/2023/10/14/09/20/mountains-8314422_1280.png',
};

const useUserInfoStore = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  setUserInfo: (userInfo: userInfoType) => {
    set({ userInfo });
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState });
  },
}));

export default useUserInfoStore;
