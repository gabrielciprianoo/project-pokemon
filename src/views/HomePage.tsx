import { useEffect, useState } from 'react';
import { PokemonCard } from '../components';
import { getPokemon, type Pokemon } from '../services/pokemonApi';
import '../styles/main.scss';

const POKEMON_LIST = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'squirtle',
  'wartortle',
  'blastoise'
];

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await Promise.all(
          POKEMON_LIST.map(name => getPokemon(name))
        );
        setPokemons(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pokemons');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="home__container">
          <div className="home__loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="home__container">
          <div className="home__error">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home__container">
        <h1 className="home__title">Pokédex</h1>
        <div className="home__grid">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}
