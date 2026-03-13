import { POKEMON_TYPES } from "../../../constants/types";
import { REGIONS, REGION_NAMES } from "../../../constants/regions";
import type { PokemonTypeName, PokemonRegion } from "../../../types/pokemon";
import styles from "./FilterGrid.module.scss";

interface FilterGridProps {
  filterType: "type" | "region";
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  onToggleType: (type: PokemonTypeName) => void;
  onToggleRegion: (region: PokemonRegion) => void;
}

export default function FilterGrid({
  filterType,
  selectedType,
  selectedRegion,
  onToggleType,
  onToggleRegion,
}: FilterGridProps) {
  if (filterType === "type") {
    return (
      <div className={styles["filter-grid"]}>
        <button
          className={`
            ${styles["filter-grid__btn"]}
            ${selectedType === null ? styles["filter-grid__btn--active"] : ""}
          `}
          onClick={() => onToggleType(selectedType!)}
        >
          Todos
        </button>

        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            className={`
              ${styles["filter-grid__btn"]}
              ${styles[`filter-grid__btn--${type}`]}
              ${selectedType === type ? styles["filter-grid__btn--active"] : ""}
            `}
            onClick={() => onToggleType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles["filter-grid"]}>
      <button
        className={`
          ${styles["filter-grid__btn"]}
          ${selectedRegion === null ? styles["filter-grid__btn--active"] : ""}
        `}
        onClick={() => onToggleRegion(selectedRegion!)}
      >
        Todas
      </button>

      {REGIONS.map((region) => (
        <button
          key={region}
          className={`
            ${styles["filter-grid__btn"]}
            ${selectedRegion === region ? styles["filter-grid__btn--active"] : ""}
          `}
          onClick={() => onToggleRegion(region)}
        >
          {REGION_NAMES[region]}
        </button>
      ))}
    </div>
  );
}
