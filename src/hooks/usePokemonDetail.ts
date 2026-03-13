import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../services/pokemonApi";

export function usePokemonDetail(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
    enabled: !!name,
  });
}
