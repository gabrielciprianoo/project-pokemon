import { useState, useEffect, useCallback } from 'react';
import { getPokemon, type Pokemon } from '../services/pokemonApi';
import { GENERATION_TO_REGION } from '../constants/pokemon';
import type { PokemonRegion, PokemonSpecies } from '../schemas';

interface PokemonWithRegion extends Pokemon {
  region?: PokemonRegion;
}

export interface UsePokemonDetailOptions {
  name: string | undefined;
}

export interface UsePokemonDetailResult {
  pokemon: PokemonWithRegion | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePokemonDetail(
  options: UsePokemonDetailOptions
): UsePokemonDetailResult {
  const { name } = options;

  const [pokemon, setPokemon] = useState<PokemonWithRegion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = useCallback(async () => {
    if (!name) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getPokemon(name.toLowerCase());
      
      try {
        const speciesResponse = await fetch(data.species.url);
        const species: PokemonSpecies = await speciesResponse.json();
        const generation = species.generation.name;
        const region = GENERATION_TO_REGION[generation] || 'kanto';
        
        setPokemon({ ...data, region });
      } catch {
        setPokemon(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokemon');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return {
    pokemon,
    loading,
    error,
    refetch: fetchPokemon,
  };
}
