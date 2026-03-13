import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { validatePokemon, type Pokemon, type PokemonRegion } from '../schemas';
import { POKEAPI_BASE, GENERATION_TO_REGION, API_CONFIG } from '../constants/pokemon';

async function fetchWithLimit<T>(
  urls: string[],
  limit: number,
  fetcher: (url: string) => Promise<T>
): Promise<T[]> {
  const results: T[] = [];
  
  for (let i = 0; i < urls.length; i += limit) {
    const batch = urls.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map(fetcher));
    results.push(...batchResults);
  }
  
  return results;
}

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
            
            const response = await fetch(`${POKEAPI_BASE}/pokemon?offset=0&limit=${limit}`);
            const data = await response.json();
            const urls = data.results.map((item: { url: string }) => item.url);

            const fetchPokemonData = async (url: string): Promise<Pokemon> => {
              const pokemonResponse = await fetch(url);
              const pokemon = validatePokemon(await pokemonResponse.json());
              
              try {
                const speciesResponse = await fetch(pokemon.species.url);
                const species = await speciesResponse.json();
                const generation = species.generation.name;
                const region = GENERATION_TO_REGION[generation] || 'kanto';
                return { ...pokemon, region };
              } catch {
                return { ...pokemon, region: 'kanto' as PokemonRegion };
              }
            };

            const pokemons = await fetchWithLimit(
              urls,
              API_CONFIG.MAX_CONCURRENT_REQUESTS,
              fetchPokemonData
            );

            set({ 
              pokemons, 
              offset: limit, 
              hasMore: data.results.length === limit,
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
