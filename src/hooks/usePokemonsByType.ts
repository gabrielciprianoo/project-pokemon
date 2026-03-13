import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPokemonsByType } from "../services/pokemonApi";
import type { PokemonTypeName } from "../schemas/pokemon";

export function usePokemonsByType(type: PokemonTypeName | null) {
  return useQuery({
    queryKey: ["pokemon-type", type],
    queryFn: () => getPokemonsByType(type!),
    enabled: !!type,
    placeholderData: keepPreviousData,
  });
}
