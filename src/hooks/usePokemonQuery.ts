import { useQuery } from '@tanstack/react-query';
import { getPokemonList } from '../services/pokemonService';
import type { Pokemon } from '../schemas';

interface UsePokemonQueryOptions {
  limit?: number;
  enabled?: boolean;
}

export function usePokemonQuery({ limit = 500, enabled = true }: UsePokemonQueryOptions = {}) {
  const { data, isLoading, error, refetch, isFetching } = useQuery<Pokemon[], Error>({
    queryKey: ['pokemons', limit],
    queryFn: () => getPokemonList(limit),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    pokemons: data || [],
    loading: isLoading,
    fetching: isFetching,
    error: error?.message || null,
    refetch,
  };
}
