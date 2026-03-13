import { create } from "zustand";
import type { Pokemon, PokemonRegion, PokemonTypeName } from "../types/pokemon";
import { fetchPokemonList } from "../services/pokemonApi";

interface FilterState {
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  activeFilter: "type" | "region";
}

interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filter: FilterState;
  fetchPokemons: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  toggleType: (type: PokemonTypeName) => void;
  toggleRegion: (region: PokemonRegion) => void;
  setActiveFilter: (filter: "type" | "region") => void;
  clearFilters: () => void;
  getFilteredPokemons: () => Pokemon[];
}

export const usePokemonStore = create<PokemonState>((set, get) => ({
  pokemons: [],
  loading: false,
  error: null,
  searchTerm: "",
  filter: {
    selectedType: null,
    selectedRegion: null,
    activeFilter: "type",
  },

  fetchPokemons: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPokemonList();
      set({ pokemons: data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error loading pokemons",
        loading: false
      });
    }
  },

  setSearchTerm: (term: string) => set({ searchTerm: term }),

  clearSearch: () => set({ searchTerm: "" }),

  toggleType: (type: PokemonTypeName) =>
    set((state) => ({
      filter: {
        ...state.filter,
        selectedType: state.filter.selectedType === type ? null : type,
      },
    })),

  toggleRegion: (region: PokemonRegion) =>
    set((state) => ({
      filter: {
        ...state.filter,
        selectedRegion: state.filter.selectedRegion === region ? null : region,
      },
    })),

  setActiveFilter: (filterType: "type" | "region") =>
    set((state) => ({
      filter: {
        ...state.filter,
        activeFilter: filterType,
      },
    })),

  clearFilters: () =>
    set((state) => ({
      filter: {
        ...state.filter,
        selectedType: null,
        selectedRegion: null,
      },
    })),

  getFilteredPokemons: () => {
    const { pokemons, searchTerm, filter } = get();
    const { selectedType, selectedRegion } = filter;

    return pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType = selectedType
        ? pokemon.types.some((t) => t.type.name === selectedType)
        : true;

      const matchesRegion = selectedRegion
        ? pokemon.region === selectedRegion
        : true;

      return matchesSearch && matchesType && matchesRegion;
    });
  },
}));
