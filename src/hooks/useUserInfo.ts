import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../services/userApi';

const useUserInfo = () => {
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: Infinity,
  });

  if (data) {
    if (data && data.name === null && data.nickname === null && data.phoneNumber === null) {
      localStorage.setItem('role', 'gest');
    } else {
      localStorage.setItem('role', 'user');
    }
  }

  return data;
};

// const useUserInfo = <T>(select: (data: UserInfo) => T = (data) => data as UserInfo as T) => {
//   const { data } = useQuery({
//     queryKey: ['userInfo'],
//     queryFn: getUserInfo,
//     staleTime: Infinity,
//     select,
//   });

//   return data;
// };

export default useUserInfo;
