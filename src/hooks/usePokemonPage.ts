import { usePokemonStore } from "../store/pokemonStore";
import { useListPage } from "./useListPage";
import { useTypePage } from "./useTypePage";
import { useRegionPage } from "./useRegionPage";
import { useSearchPage } from "./useSearchPage";
import type { PokemonListEntry } from "../services/pokemonApi";

export interface PokemonPage {
  isLoading: boolean;
  error: Error | null;
  pageItems: PokemonListEntry[];
  hasPrev: boolean;
  hasNext: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  refetch: () => void;
}

export function usePokemonPage(): PokemonPage {
  const { filter, searchTerm } = usePokemonStore();
  const { selectedType, selectedRegion } = filter;

  // All strategies instantiated unconditionally (Rules of Hooks)
  const searchPage = useSearchPage(searchTerm);
  const typePage = useTypePage(selectedType);
  const regionPage = useRegionPage(selectedRegion);
  const listPage = useListPage();

  if (searchTerm.trim()) return searchPage;
  if (selectedType) return typePage;
  if (selectedRegion) return regionPage;
  return listPage;
}
