import { usePokemonsByRegion } from "./usePokemonsByRegion";
import { usePageOffset } from "./usePageOffset";
import { PAGE_SIZE } from "../services/pokemonApi";
import { REGION_RANGES } from "../constants/regions";
import type { PokemonRegion } from "../schemas/pokemon";
import type { PokemonPage } from "./usePokemonPage";

export function useRegionPage(selectedRegion: PokemonRegion | null): PokemonPage {
  const { offset, prev, next } = usePageOffset(selectedRegion);
  const query = usePokemonsByRegion(selectedRegion, offset);
  const regionLimit = selectedRegion ? REGION_RANGES[selectedRegion].limit : 0;

  return {
    isLoading: query.isLoading,
    error: query.error as Error | null,
    pageItems: query.data ?? [],
    hasPrev: offset > 0,
    hasNext: offset + PAGE_SIZE < regionLimit,
    handlePrev: prev,
    handleNext: next,
    refetch: query.refetch,
  };
}
