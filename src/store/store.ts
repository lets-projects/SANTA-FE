import { create } from 'zustand';

interface searchValueState {
  searchValue: string;
  setSearchValue: (item: string) => void;
}
export const useSearchValueStore = create<searchValueState>((set) => ({
  searchValue: '',
  setSearchValue: (item) => set({ searchValue: item }),
}));
