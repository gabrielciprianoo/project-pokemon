import { usePokemonStore } from "../store/pokemonStore";
import type { PokemonListEntry } from "../services/pokemonApi";

export function useFilteredPokemons(items: PokemonListEntry[]) {
  const { searchTerm } = usePokemonStore();

  if (!searchTerm) return items;

  const term = searchTerm.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(term));
}
