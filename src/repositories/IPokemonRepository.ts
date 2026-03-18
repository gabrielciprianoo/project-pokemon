import type { IPokemon, IQueryOptions } from '../types';

export interface IPokemonRepository {
  getPokemonByName(name: string): Promise<IPokemon>;
  getPokemonByUrl(url: string): Promise<IPokemon>;
  getPokemonList(options?: IQueryOptions): Promise<IPokemon[]>;
}
