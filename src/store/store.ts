import { create } from 'zustand';

//카테고리 상태 관리
interface CategoryState {
  category: string;
  setCategory: (item: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  category: '',
  setCategory: (item) => set({ category: item }),
}));

interface searchValueState {
  searchValue: string;
  setSearchValue: (item: string) => void;
}
export const useSearchValueStore = create<searchValueState>((set) => ({
  searchValue: '',
  setSearchValue: (item) => set({ searchValue: item }),
}));
