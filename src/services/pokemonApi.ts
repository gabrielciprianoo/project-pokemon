import apiClient from './apiClient';
import { validatePokemon, type Pokemon } from '../schemas';

export type { Pokemon };
export async function getPokemon(name: string): Promise<Pokemon> {
  const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
  return validatePokemon(response.data);
}

export async function getPokemonByUrl(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  const data = await response.json();
  return validatePokemon(data);
}
