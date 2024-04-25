import { api } from './api';

export async function getGatheringList() {
  return await api.get('meetings');
}

export async function getGatheringListByCategory(category: string) {
  return await api.get(`meetings/category-search?category=${category}`);
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

export async function getGatheringSearchResult(tag: string) {
  return await api.get(`meetings/tag-search?tag=${tag}`);
}
