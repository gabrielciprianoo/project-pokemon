import { usePokemonListQuery } from '../factories';
import type { IPokemon } from '../types';

interface UsePokemonQueryOptions {
  limit?: number;
  enabled?: boolean;
}

export function usePokemonQuery({ limit = 500, enabled = true }: UsePokemonQueryOptions = {}) {
  const { data, isLoading, error, refetch, isFetching } = usePokemonListQuery({ limit, enabled });

  return {
    pokemons: (data as IPokemon[]) || [],
    loading: isLoading,
    fetching: isFetching,
    error: error?.message || null,
    refetch,
  };
}
