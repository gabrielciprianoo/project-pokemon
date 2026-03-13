import { useEffect, useMemo, useCallback } from 'react';
import { usePokemonStore, useFilterStore } from '../stores';
import type { Pokemon, PokemonTypeName, PokemonRegion } from '../schemas';

export type FilterType = 'type' | 'region';

export interface UsePokemonListResult {
  loading: boolean;
  error: string | null;
  filteredPokemons: Pokemon[];
  refetch: () => Promise<void>;
  searchTerm: string;
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  activeFilter: FilterType;
  setSearchTerm: (term: string) => void;
  setSelectedType: (type: PokemonTypeName | null) => void;
  setSelectedRegion: (region: PokemonRegion | null) => void;
  setActiveFilter: (filter: FilterType) => void;
  clearFilters: () => void;
}

export function usePokemonList(initialLimit: number = 500): UsePokemonListResult {
  const { pokemons, loading, error, fetchPokemons } = usePokemonStore();
  
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedRegion,
    setSelectedRegion,
    activeFilter,
    setActiveFilter,
    clearFilters,
    getFilteredPokemons,
  } = useFilterStore();

  const filteredPokemons = useMemo(
    () => getFilteredPokemons(pokemons),
    [pokemons, getFilteredPokemons]
  );

  useEffect(() => {
    if (pokemons.length === 0) {
      fetchPokemons(initialLimit);
    }
  }, [pokemons.length, fetchPokemons, initialLimit]);

  const refetch = useCallback(() => fetchPokemons(initialLimit), [fetchPokemons, initialLimit]);

  return {
    loading,
    error,
    filteredPokemons,
    refetch,
    searchTerm,
    selectedType,
    selectedRegion,
    activeFilter,
    setSearchTerm,
    setSelectedType,
    setSelectedRegion,
    setActiveFilter,
    clearFilters,
  };
}
