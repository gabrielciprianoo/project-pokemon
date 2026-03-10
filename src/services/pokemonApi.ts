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

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  
  if (!response.ok) {
    throw new Error(`Pokemon not found: ${name}`);
  }
  
  return response.json();
}
