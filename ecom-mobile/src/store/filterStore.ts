import { create } from "zustand";

interface FilterState {
  price_min: number;
  price_max: number;
  categoryId: number | null;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
  setCategoryId: (value: number | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  price_min: 0,
  price_max: 0,
  categoryId: null,
  setPriceMin: (value) => set({ price_min: value }),
  setPriceMax: (value) => set({ price_max: value }),
  setCategoryId: (value) => set({ categoryId: value }),
  resetFilters: () => set({ price_min: 0, price_max: 0, categoryId: null }),
}));
