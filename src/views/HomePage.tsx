import { useEffect } from "react";

import { usePokemonStore } from "../hooks";
import { SearchBar, FilterTabs, FilterGrid } from "../components/molecules";
import { PokemonCardHome, PokemonGrid } from "../components/organisms";

import styles from "./_HomePage.module.scss";

export default function HomePage() {
  const {
    loading,
    error,
    searchTerm,
    filter,
    fetchPokemons,
    setSearchTerm,
    toggleType,
    toggleRegion,
    setActiveFilter,
    getFilteredPokemons
  } = usePokemonStore();

  const { selectedType, selectedRegion, activeFilter } = filter;

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const filteredPokemons = getFilteredPokemons();

  if (loading) {
    return (
      <div className={styles.loader}>
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loader}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles["home-page"]}>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {activeFilter === "type" && (
        <FilterGrid
          filterType="type"
          selectedType={selectedType}
          selectedRegion={selectedRegion}
          onToggleType={toggleType}
          onToggleRegion={toggleRegion}
        />
      )}

      {activeFilter === "region" && (
        <FilterGrid
          filterType="region"
          selectedType={selectedType}
          selectedRegion={selectedRegion}
          onToggleType={toggleType}
          onToggleRegion={toggleRegion}
        />
      )}

      <div className={styles["results-count"]}>
        Mostrando {filteredPokemons.length} Pokémon
      </div>

      <PokemonGrid>
        {filteredPokemons.map((pokemon) => (
          <PokemonCardHome key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonGrid>

      {filteredPokemons.length === 0 && (
        <p className={styles["no-results"]}>
          No se encontraron Pokémon
        </p>
      )}
    </div>
  );
}
