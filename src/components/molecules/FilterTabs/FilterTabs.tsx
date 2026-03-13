import styles from './FilterTabs.module.scss';
import type { FilterType } from '../../../hooks/usePokemonList';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className={styles['filter-tabs']}>
      <button
        className={`
          ${styles['filter-tabs__btn']}
          ${activeFilter === 'type' ? styles['filter-tabs__btn--active'] : ''}
        `}
        onClick={() => onFilterChange('type')}
      >
        Por Tipo
      </button>

      <button
        className={`
          ${styles['filter-tabs__btn']}
          ${activeFilter === 'region' ? styles['filter-tabs__btn--active'] : ''}
        `}
        onClick={() => onFilterChange('region')}
      >
        Por Región
      </button>
    </div>
  );
}
