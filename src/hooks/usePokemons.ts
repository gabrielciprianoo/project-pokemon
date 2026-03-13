import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../services/pokemonApi";
import type { Pokemon } from "../schemas/pokemon";

export function usePokemons() {
  return useQuery<Pokemon[], Error>({
    queryKey: ["pokemons"],
    queryFn: async () => fetchPokemonList(),
  });
}
