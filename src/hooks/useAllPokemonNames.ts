import { useQuery } from "@tanstack/react-query";
import { getAllPokemonNames } from "../services/pokemonApi";

export function useAllPokemonNames(enabled: boolean) {
  return useQuery({
    queryKey: ["all-pokemon-names"],
    queryFn: getAllPokemonNames,
    enabled,
  });
}
