import apiClient from './apiClient';

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface PokemonStat {
  stat: {
    name: string;
    url: string;
  };
  base_stat: number;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export async function getPokemon(name: string): Promise<Pokemon> {
  const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
  return response.data;
}
