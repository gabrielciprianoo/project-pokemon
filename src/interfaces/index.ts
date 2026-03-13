import type { IPokemon, IPokemonSpeciesResponse } from "./pokemon";

export interface IPokemonRepository {
  getByName(name: string): Promise<IPokemon>;
  getByUrl(url: string): Promise<IPokemon>;
  getSpecies(url: string): Promise<IPokemonSpeciesResponse>;
  getList(offset?: number, limit?: number): Promise<IPokemon[]>;
}

export interface IPokemonValidator {
  validate(data: unknown): IPokemon;
  validateList(data: unknown): IPokemon[];
  validateSpecies(data: unknown): IPokemonSpeciesResponse;
}
