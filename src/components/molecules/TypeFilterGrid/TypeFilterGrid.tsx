import { usePokemonStore } from "../../../store/pokemonStore";
import { POKEMON_TYPES } from "../../../constants/types";
import FilterGrid from "../FilterGrid";

export default function TypeFilterGrid() {
  const { filter, toggleType } = usePokemonStore();

  return (
    <FilterGrid
      options={POKEMON_TYPES}
      selected={filter.selectedType}
      getLabel={(type) => type}
      onToggle={toggleType}
      allLabel="Todos"
      getOptionClass={(type) => `type-btn--${type}`}
    />
  );
}
