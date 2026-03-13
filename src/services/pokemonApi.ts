import apiClient from './apiClient';
import type { Pokemon, PokemonListItem, PokemonRegion } from '../types/pokemon';
import { GENERATION_TO_REGION } from '../constants/regions';
import { safeValidatePokemon } from '../schemas/pokemon';

export async function getPokemon(name: string): Promise<Pokemon> {
  const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
  return response.data;
}

export async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const response = await apiClient.get(url);
  const validation = safeValidatePokemon(response.data);
  if (!validation.success) {
    throw new Error("Invalid Pokemon data from API");
  }
  return validation.output;
}

export async function fetchPokemonSpecies(url: string) {
  const response = await apiClient.get(url);
  return response.data;
}

export async function fetchPokemonWithRegion(url: string): Promise<Pokemon> {
  const pokemon = await fetchPokemonDetails(url);

  try {
    const species = await fetchPokemonSpecies(pokemon.species.url);
    const generation = species.generation.name;
    const region = GENERATION_TO_REGION[generation] || "kanto";
    return { ...pokemon, region };
  } catch {
    return { ...pokemon, region: "kanto" as PokemonRegion };
  }
}

export async function fetchPokemonList(offset: number = 0, limit: number = 500): Promise<Pokemon[]> {
  const response = await apiClient.get(`/pokemon?offset=${offset}&limit=${limit}`);
  const data = response.data;

  const detailedPromises = data.results.map((item: PokemonListItem) =>
    fetchPokemonWithRegion(item.url)
  );

  return Promise.all(detailedPromises);
}
