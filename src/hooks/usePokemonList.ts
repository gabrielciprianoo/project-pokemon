import { useMemo, useCallback } from 'react';
import { useFilterStore } from '../stores';
import { usePokemonQuery } from './usePokemonQuery';
import type { PokemonTypeName, PokemonRegion, IPokemon } from '../types';

export type FilterType = 'type' | 'region';

export interface UsePokemonListResult {
  loading: boolean;
  error: string | null;
  filteredPokemons: IPokemon[];
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
  } = useFilterStore();

  const filteredPokemons = useMemo(() => {
    if (!pokemons.length) return [];
    
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
  }, [pokemons, searchTerm, selectedType, selectedRegion]);

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
