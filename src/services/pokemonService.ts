import * as v from 'valibot';
import { apiGet, fetchAndValidate } from './apiClient';
import { 
  PokemonSchema, 
  PokemonListResponseSchema, 
  PokemonSpeciesSchema,
  type Pokemon,
  type PokemonListResponse,
  type PokemonSpecies 
} from '../schemas';
import { GENERATION_TO_REGION, API_CONFIG } from '../constants/pokemon';

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

async function fetchPokemonData(url: string): Promise<Pokemon> {
  const pokemon = await fetchAndValidate<Pokemon>(url, PokemonSchema);
  
  try {
    const species = await fetchAndValidate<PokemonSpecies>(
      pokemon.species.url, 
      PokemonSpeciesSchema
    );
    const generation = species.generation.name;
    const region = GENERATION_TO_REGION[generation] || 'kanto';
    return { ...pokemon, region };
  } catch {
    return { ...pokemon, region: 'kanto' };
  }
}

export async function getPokemonList(limit: number = API_CONFIG.DEFAULT_LIMIT): Promise<Pokemon[]> {
  const data = await apiGet<PokemonListResponse>(
    `/pokemon?offset=0&limit=${limit}`,
    PokemonListResponseSchema
  );
  
  const urls = data.results.map((item) => item.url);

  return fetchWithLimit(
    urls,
    API_CONFIG.MAX_CONCURRENT_REQUESTS,
    fetchPokemonData
  );
}

export async function getPokemonByUrl(url: string): Promise<Pokemon> {
  return fetchAndValidate<Pokemon>(url, PokemonSchema);
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const pokemonData = await apiGet<{ url: string }>(`/pokemon/${name.toLowerCase()}`, 
    v.object({ url: v.string() })
  );
  return fetchPokemonData(pokemonData.url);
}
