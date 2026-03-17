import { create } from "zustand";
import type { PokemonTypeName, PokemonRegion } from "../interfaces/pokemon";

interface FilterState {
  searchTerm: string;
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  activeFilter: "type" | "region";
}

interface FilterActions {
  setSearchTerm: (term: string) => void;
  setSelectedType: (type: PokemonTypeName | null) => void;
  setSelectedRegion: (region: PokemonRegion | null) => void;
  toggleType: (type: PokemonTypeName) => void;
  toggleRegion: (region: PokemonRegion) => void;
  setActiveFilter: (filter: "type" | "region") => void;
  resetFilters: () => void;
}

interface PokemonStore extends FilterState, FilterActions {
  filteredPokemons: import("../interfaces/pokemon").IPokemon[];
  setFilteredPokemons: (pokemons: import("../interfaces/pokemon").IPokemon[]) => void;
}

const initialState: FilterState = {
  searchTerm: "",
  selectedType: null,
  selectedRegion: null,
  activeFilter: "type",
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  ...initialState,
  filteredPokemons: [],

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  
  toggleType: (type) => 
    set((state) => ({
      selectedType: state.selectedType === type ? null : type,
    })),
  
  toggleRegion: (region) => 
    set((state) => ({
      selectedRegion: state.selectedRegion === region ? null : region,
    })),
  
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  
  resetFilters: () => set({ ...initialState, filteredPokemons: [] }),
  
  setFilteredPokemons: (pokemons) => set({ filteredPokemons: pokemons }),
}));
