import apiClient, { getPokemonByFullUrl } from './apiClient';
import { validatePokemon, type Pokemon } from '../schemas';

export type { Pokemon };

export async function getPokemon(name: string): Promise<Pokemon> {
  const { data } = await apiClient.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
  return validatePokemon(data);
}

export async function getPokemonByUrl(url: string): Promise<Pokemon> {
  const data = await getPokemonByFullUrl<Pokemon>(url);
  return validatePokemon(data);
}
