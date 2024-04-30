import { api } from './api';

export interface Rank {
  id: number;
  rank: number;
  nickname: string;
  score: number;
}

export const getRanks = async (): Promise<Rank[]> => {
  const url = `/ranks`;
  const res = await api.get(url);
  return res.data;
};
