import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getPokemonList } from '../services/pokemonService';
import { API_CONFIG } from '../constants/pokemon';
import type { Pokemon } from '../schemas';

interface PokemonStoreState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
}

interface PokemonStoreActions {
  fetchPokemons: (limit?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

type PokemonStore = PokemonStoreState & PokemonStoreActions;

const usePokemonStore = create<PokemonStore>()(
  devtools(
    persist(
      (set, get) => ({
        pokemons: [],
        loading: false,
        error: null,
        offset: 0,
        hasMore: true,

        fetchPokemons: async (limit = API_CONFIG.DEFAULT_LIMIT) => {
          try {
            set({ loading: true, error: null }, false, 'fetchPokemons');
            
            const pokemons = await getPokemonList(limit);

            set({ 
              pokemons, 
              offset: limit, 
              hasMore: pokemons.length === limit,
              loading: false 
            }, false, 'fetchPokemons/success');
          } catch (err) {
            const error = err instanceof Error ? err.message : 'Failed to load pokemons';
            set({ error, loading: false }, false, 'fetchPokemons/error');
          }
        },

        loadMore: async () => {
          const { loading, hasMore, offset, fetchPokemons } = get();
          if (loading || !hasMore) return;
          
          await fetchPokemons(offset + API_CONFIG.DEFAULT_LIMIT);
        },

        refresh: async () => {
          const { fetchPokemons } = get();
          set({ offset: 0, hasMore: true, pokemons: [] }, false, 'refresh');
          await fetchPokemons(API_CONFIG.DEFAULT_LIMIT);
        },

        clearError: () => set({ error: null }, false, 'clearError'),
      }),
      {
        name: 'pokemon-store',
        partialize: (state) => ({ pokemons: state.pokemons }),
      }
    ),
    { name: 'PokemonStore' }
  )
);

export default usePokemonStore;
