import { useEffect } from "react";
import { pokemonQueries } from "./queryFactory";
import { usePokemonFilter } from "./usePokemonFilter";
import type { IPokemon } from "../interfaces/pokemon";

interface UsePokemonListReturn {
  pokemons: IPokemon[];
  filteredPokemons: IPokemon[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function usePokemonList(): UsePokemonListReturn {
  const { data: pokemons, isLoading, error, refetch } = pokemonQueries.useGetAll();
  const { applyFilter, filteredPokemons } = usePokemonFilter();

  useEffect(() => {
    if (pokemons) {
      applyFilter(pokemons);
    }
  }, [pokemons, applyFilter]);

  return {
    pokemons: pokemons || [],
    filteredPokemons,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
