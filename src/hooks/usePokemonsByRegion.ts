import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPokemonsByRegion, } from "../services/pokemonApi";
import type { PokemonRegion } from "../schemas/pokemon";

export function usePokemonsByRegion(region: PokemonRegion | null, relativeOffset: number) {
  return useQuery({
    queryKey: ["pokemon-region", region, relativeOffset],
    queryFn: () => getPokemonsByRegion(region!, relativeOffset),
    enabled: !!region,
    placeholderData: keepPreviousData,
  });
}

