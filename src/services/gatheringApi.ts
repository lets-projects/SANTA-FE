import { api } from './api';

export async function getGatheringList() {
  return await api.get('meetings');
}
type GatheringData = {
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: number;
  date: string;
  tags: string[];
  image: string;
};
export async function postGathering(data: GatheringData) {
  await api.post('meetings', data);
}
