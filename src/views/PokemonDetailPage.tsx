import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  PokemonImage, 
  PokemonHeader, 
  PokemonInfoCard, 
  StatsSection 
} from '../components';
import { getPokemon } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon';
import '../styles/main.scss';

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemon(name);
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) {
    return (
      <div className="pokemon-detail">
        <div className="pokemon-detail__container">
          <div className="pokemon-detail__loading">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="pokemon-detail">
        <div className="pokemon-detail__container">
          <Link to="/" className="pokemon-detail__back">
            ← Back to Pokedex
          </Link>
          <div className="pokemon-detail__error">
            <h2>Error</h2>
            <p>{error || 'Pokemon not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const types = pokemon.types.map(t => t.type.name);
  const abilities = pokemon.abilities.map(a => ({
    name: a.ability.name,
    isHidden: a.is_hidden,
  }));
  const stats = pokemon.stats.map(s => ({
    name: s.stat.name,
    value: s.base_stat,
  }));
  const baseStatTotal = stats.reduce((sum, stat) => sum + stat.value, 0);

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail__container">
        <Link to="/" className="pokemon-detail__back">
          ← Back to Pokedex
        </Link>
        
        <div className="pokemon-detail__content">
          <div className="pokemon-detail__image-section">
            <PokemonImage 
              name={pokemon.name} 
              image={imageUrl}
              isLarge={true}
            />
          </div>
          
          <div className="pokemon-detail__info-section">
            <PokemonHeader 
              name={pokemon.name}
              id={pokemon.id}
              types={types}
            />
            
            <PokemonInfoCard
              height={pokemon.height}
              weight={pokemon.weight}
              types={types}
              abilities={abilities}
            />
            
            <StatsSection 
              stats={stats}
              baseStatTotal={baseStatTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
