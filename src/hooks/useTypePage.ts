import { usePokemonsByType } from "./usePokemonsByType";
import { usePageOffset } from "./usePageOffset";
import { PAGE_SIZE } from "../services/pokemonApi";
import type { PokemonTypeName } from "../schemas/pokemon";
import type { PokemonPage } from "./usePokemonPage";

export function useTypePage(selectedType: PokemonTypeName | null): PokemonPage {
  const { offset, prev, next } = usePageOffset(selectedType);
  const query = usePokemonsByType(selectedType);
  const allItems = query.data ?? [];

  return {
    isLoading: query.isLoading,
    error: query.error as Error | null,
    pageItems: allItems.slice(offset, offset + PAGE_SIZE),
    hasPrev: offset > 0,
    hasNext: offset + PAGE_SIZE < allItems.length,
    handlePrev: prev,
    handleNext: next,
    refetch: query.refetch,
  };
}
