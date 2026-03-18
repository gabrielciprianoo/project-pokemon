import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IPokemon } from '../types';
import { pokemonRepository } from '../repositories';

interface PokemonStoreState {
  pokemons: IPokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
  fetchPokemons: (limit?: number) => Promise<void>;
  setPokemons: (pokemons: IPokemon[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const usePokemonStore = create<PokemonStoreState>()(
  devtools(
    (set) => ({
      pokemons: [],
      loading: false,
      error: null,
      offset: 0,
      hasMore: true,

      fetchPokemons: async (limit = 500) => {
        set({ loading: true, error: null });
        try {
          const pokemons = await pokemonRepository.getPokemonList({ limit });
          set({ pokemons, loading: false, hasMore: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error desconocido', 
            loading: false 
          });
        }
      },
      
      setPokemons: (pokemons) => set({ pokemons }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      reset: () => set({ 
        pokemons: [], 
        loading: false, 
        error: null, 
        offset: 0, 
        hasMore: true 
      }),
    }),
    { name: 'PokemonStore' }
  )
);

export default usePokemonStore;
