import { api } from './api';

// interface Category {
//   name: string;
// }

// interface Challenge {
//   id: number;
//   name: string;
//   description: string;
//   imag: string;
//   clearStandard: number;
//   category: Category;
// }

export const getCompletion = async () => {
  return await api.get('sers/completion');
};

export const getMyMountains = async () => {
  return await api.get('users/mountains');
};
