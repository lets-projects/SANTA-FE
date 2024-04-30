import { api } from './api';

// interface Category {
//   id: number;
//   name: string;
// }

export const getPreferCategory = async () => {
  return await api.get('/api/users/preferred-categories');
};
