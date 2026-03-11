import { useMemo } from "react";
import type { Pokemon, PokemonTypeName, PokemonRegion } from "../types/pokemon";

interface UseFilteredPokemonsProps {
  pokemons: Pokemon[];
  searchTerm: string;
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
}

export function useFilteredPokemons({
  pokemons,
  searchTerm,
  selectedType,
  selectedRegion
}: UseFilteredPokemonsProps) {
  return useMemo(() => {
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
}
