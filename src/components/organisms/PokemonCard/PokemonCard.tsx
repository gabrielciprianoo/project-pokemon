import { Link } from 'react-router-dom';
import { PokemonImage, PokemonType } from '../../atoms';
import type { Pokemon } from '../../../services/pokemonApi';
import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const types = (pokemon.types || []).map(t => t.type.name);
  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '';

  return (
    <Link 
      to={`/pokemon/${pokemon.name}`} 
      className={`pokemon-card pokemon-card--${types[0]}`}
    >
      <div className="pokemon-card__content">
        <div className="pokemon-card__image-wrapper">
          <PokemonImage 
            name={pokemon.name} 
            image={imageUrl}
          />
        </div>
        <div className="pokemon-card__info">
          <span className="pokemon-card__id">#{String(pokemon.id).padStart(3, '0')}</span>
          <h3 className="pokemon-card__name">{pokemon.name}</h3>
          <div className="pokemon-card__types">
            {types.map((type) => (
              <PokemonType key={type} type={type} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
