import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { pokemonRepository, type IPokemonRepository } from '../repositories';
import type { IPokemon, IQueryOptions } from '../types';

export type QueryKey = string[];

export interface IQueryFactory {
  createPokemonListQuery(options?: IQueryOptions): UseQueryOptions<IPokemon[], Error>;
  createPokemonByNameQuery(name: string | undefined): UseQueryOptions<IPokemon, Error>;
  createPokemonByUrlQuery(url: string): UseQueryOptions<IPokemon, Error>;
}

class PokemonQueryFactory implements IQueryFactory {
  private repository: IPokemonRepository;

  constructor(repository: IPokemonRepository) {
    this.repository = repository;
  }

  createPokemonListQuery(options: IQueryOptions = {}): UseQueryOptions<IPokemon[], Error> {
    const { limit = 500, enabled = true } = options;
    
    return {
      queryKey: ['pokemon', 'list', limit],
      queryFn: () => this.repository.getPokemonList({ limit }),
      enabled,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    };
  }

  createPokemonByNameQuery(name: string | undefined): UseQueryOptions<IPokemon, Error> {
    return {
      queryKey: ['pokemon', 'name', name],
      queryFn: () => {
        if (!name) throw new Error('Pokemon name is required');
        return this.repository.getPokemonByName(name);
      },
      enabled: !!name,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    };
  }

  createPokemonByUrlQuery(url: string): UseQueryOptions<IPokemon, Error> {
    return {
      queryKey: ['pokemon', 'url', url],
      queryFn: () => this.repository.getPokemonByUrl(url),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    };
  }
}

export const queryFactory = new PokemonQueryFactory(pokemonRepository);

export function usePokemonListQuery(options?: IQueryOptions) {
  return useQuery(queryFactory.createPokemonListQuery(options));
}

export function usePokemonByNameQuery(name: string | undefined) {
  return useQuery(queryFactory.createPokemonByNameQuery(name));
}

export function usePokemonByUrlQuery(url: string) {
  return useQuery(queryFactory.createPokemonByUrlQuery(url));
}
