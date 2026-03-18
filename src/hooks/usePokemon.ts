import { usePokemonByNameQuery } from '../factories';
import type { IPokemon } from '../types';

interface UsePokemonResult {
  data: IPokemon | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<unknown>;
}

export function usePokemon(name: string | undefined): UsePokemonResult {
  const { data, isLoading, error, refetch } = usePokemonByNameQuery(name);

  return {
    data: data || null,
    loading: isLoading,
    error: error?.message || null,
    refetch,
  };
}
