import { usePokemonStore } from "../../../store/pokemonStore";
import { REGIONS, REGION_NAMES } from "../../../constants/regions";
import FilterGrid from "../FilterGrid";

export default function RegionFilterGrid() {
  const { filter, toggleRegion } = usePokemonStore();

  return (
    <FilterGrid
      options={REGIONS}
      selected={filter.selectedRegion}
      getLabel={(region) => REGION_NAMES[region]}
      onToggle={toggleRegion}
      allLabel="Todas"
    />
  );
}
