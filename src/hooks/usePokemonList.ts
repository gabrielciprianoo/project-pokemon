import { useMemo, useCallback } from 'react';
import { useFilterStore } from '../stores';
import { usePokemonQuery } from './usePokemonQuery';
import type { Pokemon, PokemonTypeName, PokemonRegion } from '../schemas';

export type FilterType = 'type' | 'region';

export interface UsePokemonListResult {
  loading: boolean;
  error: string | null;
  filteredPokemons: Pokemon[];
  refetch: () => Promise<unknown>;
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
  const { pokemons, loading, error, refetch } = usePokemonQuery({ limit: initialLimit });
  
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

  const handleRefetch = useCallback(() => refetch(), [refetch]);

  return {
    loading,
    error,
    filteredPokemons,
    refetch: handleRefetch,
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
