import styles from './FilterGrid.module.scss';
import { POKEMON_TYPES, REGIONS, REGION_NAMES } from '../../../constants/pokemon';
import type { PokemonTypeName, PokemonRegion } from '../../../schemas';

interface FilterGridProps {
  activeFilter: 'type' | 'region';
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  onTypeSelect: (type: PokemonTypeName | null) => void;
  onRegionSelect: (region: PokemonRegion | null) => void;
}

export default function FilterGrid({
  activeFilter,
  selectedType,
  selectedRegion,
  onTypeSelect,
  onRegionSelect,
}: FilterGridProps) {
  if (activeFilter === 'type') {
    return (
      <div className={styles['filter-grid']}>
        <button
          className={`
            ${styles['filter-grid__btn']}
            ${selectedType === null ? styles['filter-grid__btn--active'] : ''}
          `}
          onClick={() => onTypeSelect(null)}
        >
          Todos
        </button>

        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            className={`
              ${styles['filter-grid__btn']}
              ${styles[`filter-grid__btn--${type}`]}
              ${selectedType === type ? styles['filter-grid__btn--active'] : ''}
            `}
            onClick={() => onTypeSelect(selectedType === type ? null : type)}
          >
            {type}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles['filter-grid']}>
      <button
        className={`
          ${styles['filter-grid__btn']}
          ${selectedRegion === null ? styles['filter-grid__btn--active'] : ''}
        `}
        onClick={() => onRegionSelect(null)}
      >
        Todas
      </button>

      {REGIONS.map((region) => (
        <button
          key={region}
          className={`
            ${styles['filter-grid__btn']}
            ${selectedRegion === region ? styles['filter-grid__btn--active'] : ''}
          `}
          onClick={() => onRegionSelect(selectedRegion === region ? null : region)}
        >
          {REGION_NAMES[region]}
        </button>
      ))}
    </div>
  );
}
