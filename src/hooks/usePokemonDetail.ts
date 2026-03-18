import { usePokemonByNameQuery } from '../factories';
import type { IPokemon } from '../types';

export interface UsePokemonDetailOptions {
  name: string | undefined;
}

export interface UsePokemonDetailResult {
  pokemon: IPokemon | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<unknown>;
}

export function usePokemonDetail(
  options: UsePokemonDetailOptions
): UsePokemonDetailResult {
  const { name } = options;
  const { data, isLoading, error, refetch } = usePokemonByNameQuery(name);

  return {
    pokemon: data || null,
    loading: isLoading,
    error: error?.message || null,
    refetch,
  };
}
