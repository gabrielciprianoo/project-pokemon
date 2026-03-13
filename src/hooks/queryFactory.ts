import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { pokemonRepository } from "../repositories";
import type { IPokemon } from "../interfaces/pokemon";

type QueryOptions<TQueryFnData, TError, TData, TQueryKey extends string[]> =
  Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">;

function createPokemonQueries() {
  function useGetAll(options?: QueryOptions<IPokemon[], Error, IPokemon[], ["pokemons"]>) {
    return useQuery({
      queryKey: ["pokemons"] as const,
      queryFn: () => pokemonRepository.getList(),
      ...options,
    });
  }

  function useGetByName(name: string, options?: QueryOptions<IPokemon, Error, IPokemon, ["pokemon", string]>) {
    return useQuery({
      queryKey: ["pokemon", name] as const,
      queryFn: () => pokemonRepository.getByName(name),
      enabled: !!name,
      ...options,
    });
  }

  function useGetByUrl(url: string, options?: QueryOptions<IPokemon, Error, IPokemon, ["pokemon-url", string]>) {
    return useQuery({
      queryKey: ["pokemon-url", url] as const,
      queryFn: () => pokemonRepository.getByUrl(url),
      enabled: !!url,
      ...options,
    });
  }

  return {
    useGetAll,
    useGetByName,
    useGetByUrl,
  };
}

export const pokemonQueries = createPokemonQueries();
