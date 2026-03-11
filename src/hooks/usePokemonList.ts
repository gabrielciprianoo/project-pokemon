import { useState, useEffect } from "react";
import type { Pokemon, PokemonListItem, PokemonRegion, PokemonSpecies } from "../types/pokemon";
import { GENERATION_TO_REGION } from "../constants/regions";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  return response.json();
}

async function fetchPokemonSpecies(url: string): Promise<PokemonSpecies> {
  const response = await fetch(url);
  return response.json();
}

async function fetchPokemonWithRegion(url: string): Promise<Pokemon> {
  const pokemon = await fetchPokemonDetails(url);

  try {
    const species = await fetchPokemonSpecies(pokemon.species.url);
    const generation = species.generation.name;
    const region = GENERATION_TO_REGION[generation] || "kanto";

    return { ...pokemon, region };
  } catch {
    return { ...pokemon, region: "kanto" as PokemonRegion };
  }
}

async function fetchPokemonList(
  offset: number = 0,
  limit: number = 500
): Promise<Pokemon[]> {
  const response = await fetch(
    `${POKEAPI_BASE}/pokemon?offset=${offset}&limit=${limit}`
  );

  const data = await response.json();

  const detailedPromises = data.results.map((item: PokemonListItem) =>
    fetchPokemonWithRegion(item.url)
  );

  return Promise.all(detailedPromises);
}

export function usePokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPokemonList();
        setPokemons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading pokemons");
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, []);

  return { pokemons, loading, error };
}
