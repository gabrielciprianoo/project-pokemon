import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Pokemon } from '../schemas';

interface PokemonStoreState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
  setPokemons: (pokemons: Pokemon[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

type PokemonStore = PokemonStoreState;

const usePokemonStore = create<PokemonStore>()(
  devtools(
    (set) => ({
      pokemons: [],
      loading: false,
      error: null,
      offset: 0,
      hasMore: true,

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
