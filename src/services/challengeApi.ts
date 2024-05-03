import { api } from './api';

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

export interface Challenge {
  id: 0;
  name: string;
  description: string;
  image: string;
  clearStandard: 0;
  category: {
    name: string;
  };
}

export const getAllChallenge = async () => {
  return await api.get('challenges');
};

export const getUserChallenge = async (completion: boolean) => {
  return await api.get(`users/completion?completion=${completion}`);
};

export const getMyMountains = async () => {
  return await api.get('users/mountains');
};

export const postVertifyMountain = async (vertifyMountainData: VertifyData) => {
  return await api.post('mountains/verify', vertifyMountainData);
};
