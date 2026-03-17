import { useMemo, useCallback } from "react";
import { usePokemonStore } from "../store";
import type { IPokemon, PokemonTypeName, PokemonRegion } from "../interfaces/pokemon";

interface UsePokemonFilterReturn {
  searchTerm: string;
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  activeFilter: "type" | "region";
  setSearchTerm: (term: string) => void;
  setSelectedType: (type: PokemonTypeName | null) => void;
  setSelectedRegion: (region: PokemonRegion | null) => void;
  toggleType: (type: PokemonTypeName) => void;
  toggleRegion: (region: PokemonRegion) => void;
  setActiveFilter: (filter: "type" | "region") => void;
  resetFilters: () => void;
  filteredPokemons: IPokemon[];
  applyFilter: (pokemons: IPokemon[]) => void;
}

export function usePokemonFilter(): UsePokemonFilterReturn {
  const store = usePokemonStore();

  const applyFilter = useCallback((pokemons: IPokemon[]) => {
    const { searchTerm, selectedType, selectedRegion } = store;
    
    const filtered = pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType
        ? pokemon.types.some((t) => t.name === selectedType)
        : true;
      const matchesRegion = selectedRegion ? pokemon.region === selectedRegion : true;

      return matchesSearch && matchesType && matchesRegion;
    });

    store.setFilteredPokemons(filtered);
  }, [store]);

  const filteredPokemons = useMemo(() => {
    return store.filteredPokemons;
  }, [store.filteredPokemons]);

  return {
    searchTerm: store.searchTerm,
    selectedType: store.selectedType,
    selectedRegion: store.selectedRegion,
    activeFilter: store.activeFilter,
    setSearchTerm: store.setSearchTerm,
    setSelectedType: store.setSelectedType,
    setSelectedRegion: store.setSelectedRegion,
    toggleType: store.toggleType,
    toggleRegion: store.toggleRegion,
    setActiveFilter: store.setActiveFilter,
    resetFilters: store.resetFilters,
    filteredPokemons,
    applyFilter,
  };
}
