import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPokemonListPage, } from "../services/pokemonApi";

export function usePokemonList(offset: number) {
  return useQuery({
    queryKey: ["pokemons", offset],
    queryFn: () => getPokemonListPage(offset),
    placeholderData: keepPreviousData,
  });
}

