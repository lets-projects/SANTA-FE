import { create } from 'zustand';

interface searchValueState {
  searchValue: string;
  setSearchValue: (item: string) => void;
}
export const useSearchValueStore = create<searchValueState>((set) => ({
  searchValue: '',
  setSearchValue: (item) => set({ searchValue: item }),
}));

type recentSearchKeyword = {
  recentKeyword: string[];
  addRecentSearchKeyword: (keyword: string) => void;
  deleteSearchKeyword: (index: number) => void; // 이 부분이 중요
};

export const useRecentSearchKeyword = create<recentSearchKeyword>((set) => ({
  recentKeyword: [],
  addRecentSearchKeyword: (keyword: string) =>
    set((state) => ({
      recentKeyword: [...state.recentKeyword, keyword],
    })),
  deleteSearchKeyword: (index: number) =>
    set((state) => ({
      recentKeyword: [...state.recentKeyword.slice(0, index), ...state.recentKeyword.slice(index + 1)],
    })),
}));
