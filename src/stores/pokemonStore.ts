import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Pokemon } from '../schemas';
import { getPokemonList } from '../services/pokemonService';

interface PokemonStoreState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
  fetchPokemons: (limit?: number) => Promise<void>;
  setPokemons: (pokemons: Pokemon[]) => void;
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
          const pokemons = await getPokemonList(limit);
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
