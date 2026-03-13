import { useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonStore, useFilterStore } from "../stores";
import { POKEMON_TYPES, REGIONS, REGION_NAMES } from "../constants/pokemon";

import styles from "./_HomePage.module.scss";

const HomePageContent = () => {
  const navigate = useNavigate();
  
  const { pokemons, loading, error, fetchPokemons } = usePokemonStore();
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    selectedRegion,
    activeFilter,
    setSelectedType,
    setSelectedRegion,
    setActiveFilter,
    getFilteredPokemons,
  } = useFilterStore();

  const filteredPokemons = getFilteredPokemons(pokemons);

  useEffect(() => {
    if (pokemons.length === 0) {
      fetchPokemons(500);
    }
  }, [pokemons.length, fetchPokemons]);

  if (loading && pokemons.length === 0) {
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
      <div className={styles["search-bar"]}>
        <input
          className={styles["search-bar__input"]}
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles["filter-tabs"]}>
        <button
          className={`
            ${styles["filter-tabs__btn"]}
            ${activeFilter === "type" ? styles["filter-tabs__btn--active"] : ""}
          `}
          onClick={() => setActiveFilter("type")}
        >
          Por Tipo
        </button>

        <button
          className={`
            ${styles["filter-tabs__btn"]}
            ${activeFilter === "region" ? styles["filter-tabs__btn--active"] : ""}
          `}
          onClick={() => setActiveFilter("region")}
        >
          Por Región
        </button>
      </div>

      {activeFilter === "type" && (
        <div className={styles["filter-grid"]}>
          <button
            className={`
              ${styles["filter-grid__btn"]}
              ${selectedType === null ? styles["filter-grid__btn--active"] : ""}
            `}
            onClick={() => setSelectedType(null)}
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
              onClick={() =>
                setSelectedType(selectedType === type ? null : type)
              }
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {activeFilter === "region" && (
        <div className={styles["filter-grid"]}>
          <button
            className={`
              ${styles["filter-grid__btn"]}
              ${selectedRegion === null ? styles["filter-grid__btn--active"] : ""}
            `}
            onClick={() => setSelectedRegion(null)}
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
              onClick={() =>
                setSelectedRegion(selectedRegion === region ? null : region)
              }
            >
              {REGION_NAMES[region]}
            </button>
          ))}
        </div>
      )}

      <div className={styles["results-count"]}>
        Mostrando {filteredPokemons.length} Pokémon
      </div>

      <div className={styles["pokemon-grid"]}>
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={styles["pokemon-card"]}
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
          >
            <span className={styles["pokemon-card__id"]}>
              #{String(pokemon.id).padStart(3, "0")}
            </span>

            <img
              className={styles["pokemon-card__image"]}
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              loading="lazy"
            />

            <h3 className={styles["pokemon-card__name"]}>
              {pokemon.name}
            </h3>

            <div className={styles["pokemon-card__types"]}>
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`
                    ${styles["pokemon-card__type"]}
                    ${styles[`pokemon-card__type--${type.name}`]}
                  `}
                >
                  {type.name}
                </span>
              ))}
            </div>

            {pokemon.region && (
              <div className={styles["pokemon-card__region"]}>
                {REGION_NAMES[pokemon.region]}
              </div>
            )}

            <div className={styles["pokemon-card__stats"]}>
              <span className={styles["pokemon-card__stat"]}>
                {pokemon.height / 10}m
              </span>

              <span className={styles["pokemon-card__stat"]}>
                {pokemon.weight / 10}kg
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredPokemons.length === 0 && (
        <p className={styles["no-results"]}>
          No se encontraron Pokémon
        </p>
      )}
    </div>
  );
};

const HomePage = () => (
  <Suspense fallback={<div className={styles.loader}><p>Cargando...</p></div>}>
    <HomePageContent />
  </Suspense>
);

export default HomePage;
