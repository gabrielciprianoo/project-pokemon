import { create } from "zustand";
import apiClient from "../services/apiClient";
import type { Pokemon, PokemonListItem, PokemonRegion, PokemonTypeName } from "../types/pokemon";
import { GENERATION_TO_REGION } from "../constants/regions";
import { safeValidatePokemon } from "../schemas/pokemon";

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

async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const response = await apiClient.get(url);
  const validation = safeValidatePokemon(response.data);
  if (!validation.success) {
    throw new Error("Invalid Pokemon data from API");
  }
  return validation.output;
}

async function fetchPokemonSpecies(url: string) {
  const response = await apiClient.get(url);
  return response.data;
}

async function fetchPokemonWithRegion(url: string): Promise<Pokemon> {
  const pokemon = await fetchPokemonDetails(url);

  try {
    const species = await fetchPokemonSpecies(pokemon.species.url);
    const generation = species.generation.name;
    const region = GENERATION_TO_REGION[generation] || "kanto";
    return { ...pokemon, region };
  } catch {
    return { ...pokemon, region: "kanto" as PokemonRegion };
  }
}

async function fetchPokemonList(offset: number = 0, limit: number = 500): Promise<Pokemon[]> {
  const response = await apiClient.get(`/pokemon?offset=${offset}&limit=${limit}`);
  const data = response.data;

  const detailedPromises = data.results.map((item: PokemonListItem) =>
    fetchPokemonWithRegion(item.url)
  );

  return Promise.all(detailedPromises);
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
