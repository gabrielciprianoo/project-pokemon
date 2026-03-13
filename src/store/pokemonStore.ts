import { create } from "zustand";
import type { PokemonTypeName, PokemonRegion } from "../schemas/pokemon";

interface FilterState {
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  activeFilter: "type" | "region";
}

interface PokemonUIState {
  searchTerm: string;
  filter: FilterState;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  toggleType: (type: PokemonTypeName) => void;
  toggleRegion: (region: PokemonRegion) => void;
  setActiveFilter: (filter: "type" | "region") => void;
  clearFilters: () => void;
}

export const usePokemonStore = create<PokemonUIState>((set) => ({
  searchTerm: "",
  filter: {
    selectedType: null,
    selectedRegion: null,
    activeFilter: "type",
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  clearSearch: () => set({ searchTerm: "" }),

  toggleType: (type) =>
    set((state) => ({
      filter: {
        ...state.filter,
        selectedType: state.filter.selectedType === type ? null : type,
      },
    })),

  toggleRegion: (region) =>
    set((state) => ({
      filter: {
        ...state.filter,
        selectedRegion: state.filter.selectedRegion === region ? null : region,
      },
    })),

  setActiveFilter: (filterType) =>
    set((state) => ({
      filter: {
        ...state.filter,
        activeFilter: filterType,
        selectedType: filterType === "region" ? null : state.filter.selectedType,
        selectedRegion: filterType === "type" ? null : state.filter.selectedRegion,
      },
    })),

  clearFilters: () =>
    set((state) => ({
      filter: { ...state.filter, selectedType: null, selectedRegion: null },
    })),
}));
