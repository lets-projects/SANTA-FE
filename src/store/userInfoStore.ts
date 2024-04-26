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

const defaultState = { email: '', nickname: '', name: '', phoneNumber: '', image: '' };

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
