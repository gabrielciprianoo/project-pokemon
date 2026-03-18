import type { PokemonTypeName, PokemonRegion } from '../types';

export const POKEAPI_BASE = import.meta.env.VITE_POKEAPI_URL;

export const GENERATION_TO_REGION: Record<string, PokemonRegion> = {
  'generation-i': 'kanto',
  'generation-ii': 'johto',
  'generation-iii': 'hoenn',
  'generation-iv': 'sinnoh',
  'generation-v': 'unova',
  'generation-vi': 'kalos',
  'generation-vii': 'alola',
  'generation-viii': 'galar',
  'generation-ix': 'paldea',
};

export const POKEMON_TYPES: PokemonTypeName[] = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export const REGIONS: PokemonRegion[] = [
  'kanto', 'johto', 'hoenn', 'sinnoh', 'unova',
  'kalos', 'alola', 'galar', 'paldea'
];

export const REGION_NAMES: Record<PokemonRegion, string> = {
  kanto: 'Kanto',
  johto: 'Johto',
  hoenn: 'Hoenn',
  sinnoh: 'Sinnoh',
  unova: 'Unova',
  kalos: 'Kalos',
  alola: 'Alola',
  galar: 'Galar',
  paldea: 'Paldea',
};

export const API_CONFIG = {
  DEFAULT_LIMIT: 50,
  MAX_CONCURRENT_REQUESTS: 10,
  TIMEOUT: 10000,
};
