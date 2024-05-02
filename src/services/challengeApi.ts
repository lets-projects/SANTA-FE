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

export interface VertifyMountain {
  id: number;
  climbDate: string;
  mountain: {
    name: string;
    location: string;
    height: number;
  };
}

export interface VertifyData {
  climbDate: string;
  latitude?: number;
  longitude?: number;
}

export const getAllChallenge = async () => {
  return await api.get('challenges');
};

export const getMyMountains = async () => {
  return await api.get('users/mountains');
};

export const postVertifyMountain = async (vertifyMountainData: VertifyData) => {
  return await api.post('mountains/verify', vertifyMountainData);
};
