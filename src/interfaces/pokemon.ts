export type PokemonRegion = "kanto" | "johto" | "hoenn" | "sinnoh" | "unova" | "kalos" | "alola" | "galar" | "paldea";

export interface IPokemonType {
  slot: number;
  name: string;
  url: string;
}

export interface IPokemonAbility {
  name: string;
  url: string;
}

export interface IPokemonAbilityDetail {
  ability: IPokemonAbility;
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonStat {
  name: string;
  url: string;
}

export interface IPokemonStatDetail {
  base_stat: number;
  stat: IPokemonStat;
}

export interface IPokemonSprites {
  front_default: string;
  official_artwork: string;
}

export interface IPokemonSpeciesReference {
  name: string;
  url: string;
}

export interface IPokemonSpeciesResponse {
  generation: {
    name: string;
    url: string;
  };
}

export interface IPokemonBase {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: IPokemonType[];
  abilities: IPokemonAbilityDetail[];
  stats: IPokemonStatDetail[];
  sprites: IPokemonSprites;
  species: IPokemonSpeciesReference;
}

export interface IPokemon extends IPokemonBase {
  region: PokemonRegion;
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
