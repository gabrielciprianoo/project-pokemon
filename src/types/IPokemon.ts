export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export type PokemonRegion =
  | 'kanto'
  | 'johto'
  | 'hoenn'
  | 'sinnoh'
  | 'unova'
  | 'kalos'
  | 'alola'
  | 'galar'
  | 'paldea';

export interface IPokemonType {
  slot: number;
  type: {
    name: PokemonTypeName;
    url: string | null | undefined;
  };
}

export interface IPokemonAbility {
  ability: {
    name: string | null | undefined;
    url: string | null | undefined;
  };
  is_hidden: boolean | undefined;
  slot: number | undefined;
}

export interface IPokemonStat {
  base_stat: number | undefined;
  stat: {
    name: string | null | undefined;
    url: string | null | undefined;
  };
}

export interface IPokemonSprites {
  front_default: string | null | undefined;
  back_default: string | null | undefined;
  front_shiny: string | null | undefined;
  back_shiny: string | null | undefined;
  front_female: string | null | undefined;
  back_female: string | null | undefined;
  front_shiny_female: string | null | undefined;
  back_shiny_female: string | null | undefined;
  other?: {
    'official-artwork'?: {
      front_default: string | null | undefined;
      front_shiny: string | null | undefined;
    };
  };
}

export interface IPokemonSpecies {
  generation?: {
    name: string | null;
    url: string | null;
  };
}

export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null | undefined;
  is_default: boolean | null | undefined;
  location_area_encounters: string | null | undefined;
  types: IPokemonType[];
  sprites?: IPokemonSprites | null;
  species?: {
    name: string | null | undefined;
    url: string | null | undefined;
  } | null;
  abilities?: IPokemonAbility[] | null;
  stats?: IPokemonStat[] | null;
  region?: PokemonRegion | null;
}

export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListItem[];
}

export interface IApiError {
  message: string;
  status?: number;
}

export interface IQueryOptions {
  limit?: number;
  offset?: number;
  enabled?: boolean;
}

export interface IQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
