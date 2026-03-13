import { useCallback, useEffect } from 'react';
import { getPokemon, type Pokemon } from '../services/pokemonApi';
import { useAsync, type AsyncState } from './useAsync';

interface UsePokemonResult extends AsyncState<Pokemon> {
  refetch: () => Promise<void>;
}

export function usePokemon(name: string | undefined): UsePokemonResult {
  const [state, { execute, reset }] = useAsync<Pokemon>(
    () => getPokemon(name!.toLowerCase()),
    !!name
  );

  const refetch = useCallback(() => {
    if (name) {
      return execute();
    }
    return Promise.resolve();
  }, [name, execute]);

  useEffect(() => {
    if (name) {
      execute();
    } else {
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return {
    ...state,
    refetch,
  };
}
