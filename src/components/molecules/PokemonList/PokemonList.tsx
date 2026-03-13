import { useNavigate } from 'react-router-dom';
import { REGION_NAMES } from '../../../constants/pokemon';
import type { Pokemon } from '../../../schemas';
import styles from './PokemonList.module.scss';

interface PokemonListProps {
  pokemons: Pokemon[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  const navigate = useNavigate();

  if (pokemons.length === 0) {
    return (
      <p className={styles['no-results']}>
        No se encontraron Pokémon
      </p>
    );
  }

  return (
    <>
      <div className={styles['results-count']}>
        Mostrando {pokemons.length} Pokémon
      </div>

      <div className={styles['pokemon-grid']}>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={styles['pokemon-card']}
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
          >
            <span className={styles['pokemon-card__id']}>
              #{String(pokemon.id).padStart(3, '0')}
            </span>

            <img
              className={styles['pokemon-card__image']}
              src={
                pokemon.sprites?.other?.['official-artwork']?.front_default ||
                pokemon.sprites?.front_default ||
                ''
              }
              alt={pokemon.name || ''}
              loading="lazy"
            />

            <h3 className={styles['pokemon-card__name']}>
              {pokemon.name}
            </h3>

            <div className={styles['pokemon-card__types']}>
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`
                    ${styles['pokemon-card__type']}
                    ${styles[`pokemon-card__type--${type.name}`]}
                  `}
                >
                  {type.name}
                </span>
              ))}
            </div>

            {pokemon.region && (
              <div className={styles['pokemon-card__region']}>
                {REGION_NAMES[pokemon.region]}
              </div>
            )}

            <div className={styles['pokemon-card__stats']}>
              <span className={styles['pokemon-card__stat']}>
                {pokemon.height / 10}m
              </span>

              <span className={styles['pokemon-card__stat']}>
                {pokemon.weight / 10}kg
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
