import type { IPokemon, IQueryOptions } from '../types';
import { apiGet, fetchAndValidate } from '../services/apiClient';
import { 
  PokemonSchema, 
  PokemonListResponseSchema, 
  PokemonSpeciesSchema 
} from '../schemas';
import { GENERATION_TO_REGION, API_CONFIG } from '../constants/pokemon';

async function fetchWithLimit<T>(
  urls: (string | null | undefined)[],
  limit: number,
  fetcher: (url: string) => Promise<T>
): Promise<T[]> {
  const results: T[] = [];
  const validUrls = urls.filter((url): url is string => typeof url === 'string');
  
  for (let i = 0; i < validUrls.length; i += limit) {
    const batch = validUrls.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map(fetcher));
    results.push(...batchResults);
  }
  
  return results;
}

async function fetchPokemonData(url: string): Promise<IPokemon> {
  const pokemon = await fetchAndValidate<IPokemon>(url, PokemonSchema);
  
  try {
    const speciesUrl = pokemon.species?.url;
    if (!speciesUrl) {
      return { ...pokemon, region: 'kanto' };
    }
    
    const species = await fetchAndValidate<{ generation?: { name: string | null } }>(
      speciesUrl, 
      PokemonSpeciesSchema
    );
    const generation = species.generation?.name;
    if (!generation) {
      return { ...pokemon, region: 'kanto' };
    }
    const region = GENERATION_TO_REGION[generation] || 'kanto';
    return { ...pokemon, region };
  } catch {
    return { ...pokemon, region: 'kanto' };
  }
}

export interface IPokemonRepository {
  getPokemonByName(name: string): Promise<IPokemon>;
  getPokemonByUrl(url: string): Promise<IPokemon>;
  getPokemonList(options?: IQueryOptions): Promise<IPokemon[]>;
}

export class PokemonRepository implements IPokemonRepository {
  async getPokemonByName(name: string): Promise<IPokemon> {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    return fetchPokemonData(pokemonUrl);
  }

  async getPokemonByUrl(url: string): Promise<IPokemon> {
    return fetchPokemonData(url);
  }

  async getPokemonList(options: IQueryOptions = {}): Promise<IPokemon[]> {
    const { limit = API_CONFIG.DEFAULT_LIMIT } = options;
    
    const data = await apiGet<{ count: number; next: string | null; previous: string | null; results: { name: string; url: string }[] }>(
      `/pokemon?offset=0&limit=${limit}`,
      PokemonListResponseSchema
    );
    
    const urls = data.results?.map((item) => item.url) || [];

    return fetchWithLimit(
      urls,
      API_CONFIG.MAX_CONCURRENT_REQUESTS,
      fetchPokemonData
    );
  }
}

export const pokemonRepository = new PokemonRepository();
