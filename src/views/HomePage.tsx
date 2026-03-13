import { useState } from "react";
import { pokemonQueries } from "../hooks";
import { SearchBar, FilterTabs, FilterGrid } from "../components/molecules";
import { PokemonCardHome, PokemonGrid } from "../components/organisms";
import type { IPokemon } from "../interfaces/pokemon";

type PokemonTypeName = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";
type PokemonRegion = "kanto" | "johto" | "hoenn" | "sinnoh" | "unova" | "kalos" | "alola" | "galar" | "paldea";

import styles from "./_HomePage.module.scss";

export default function HomePage() {
  const { data: pokemons, isLoading, error } = pokemonQueries.useGetAll();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonTypeName | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<PokemonRegion | null>(null);
  const [activeFilter, setActiveFilter] = useState<"type" | "region">("type");

  const toggleType = (type: PokemonTypeName) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const toggleRegion = (region: PokemonRegion) => {
    setSelectedRegion((prev) => (prev === region ? null : region));
  };

  const filteredPokemons: IPokemon[] = pokemons?.filter((pokemon: IPokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType
      ? pokemon.types.some((t) => t.name === selectedType)
      : true;
    const matchesRegion = selectedRegion ? pokemon.region === selectedRegion : true;

    return matchesSearch && matchesType && matchesRegion;
  }) || [];

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loader}>
        <p>Error: {error.message}</p>
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
        {filteredPokemons.map((pokemon: IPokemon) => (
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
