import { useAllPokemonNames } from "./useAllPokemonNames";
import { usePageOffset } from "./usePageOffset";
import { PAGE_SIZE } from "../services/pokemonApi";
import type { PokemonPage } from "./usePokemonPage";

export function useSearchPage(searchTerm: string): PokemonPage {
  const { offset, prev, next } = usePageOffset(searchTerm);
  const query = useAllPokemonNames(searchTerm.trim().length > 0);

  const term = searchTerm.toLowerCase();
  const filtered = (query.data ?? []).filter((item) =>
    item.name.toLowerCase().includes(term)
  );

  return {
    isLoading: query.isLoading,
    error: query.error as Error | null,
    pageItems: filtered.slice(offset, offset + PAGE_SIZE),
    hasPrev: offset > 0,
    hasNext: offset + PAGE_SIZE < filtered.length,
    handlePrev: prev,
    handleNext: next,
    refetch: query.refetch,
  };
}
