import { useState } from "react";
import { usePokemonList } from "./usePokemonList";
import { PAGE_SIZE } from "../services/pokemonApi";
import type { PokemonPage } from "./usePokemonPage";

export function useListPage(): PokemonPage {
  const [offset, setOffset] = useState(0);
  const query = usePokemonList(offset);

  return {
    isLoading: query.isLoading,
    error: query.error as Error | null,
    pageItems: query.data ?? [],
    hasPrev: offset > 0,
    hasNext: (query.data?.length ?? 0) >= PAGE_SIZE,
    handlePrev: () => setOffset((o) => Math.max(0, o - PAGE_SIZE)),
    handleNext: () => setOffset((o) => o + PAGE_SIZE),
    refetch: query.refetch,
  };
}
