import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Pokemon,
  PokemonListItem,
  PokemonTypeName,
  PokemonRegion,
  PokemonSpecies
}from "../types/pokemon";

import styles from "./_HomePage.module.scss";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

const POKEMON_TYPES: PokemonTypeName[] = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy"
];

const GENERATION_TO_REGION: Record<string, PokemonRegion> = {
  "generation-i": "kanto",
  "generation-ii": "johto",
  "generation-iii": "hoenn",
  "generation-iv": "sinnoh",
  "generation-v": "unova",
  "generation-vi": "kalos",
  "generation-vii": "alola",
  "generation-viii": "galar",
  "generation-ix": "paldea"
};

const REGIONS: PokemonRegion[] = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea"
];

const REGION_NAMES: Record<PokemonRegion, string> = {
  kanto: "Kanto",
  johto: "Johto",
  hoenn: "Hoenn",
  sinnoh: "Sinnoh",
  unova: "Unova",
  kalos: "Kalos",
  alola: "Alola",
  galar: "Galar",
  paldea: "Paldea"
};

/* ───────────────────────────────── */
/* API FUNCTIONS */
/* ───────────────────────────────── */

async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  return response.json();
}

async function fetchPokemonSpecies(url: string): Promise<PokemonSpecies> {
  const response = await fetch(url);
  return response.json();
}

async function fetchPokemonWithRegion(url: string): Promise<Pokemon> {
  const pokemon = await fetchPokemonDetails(url);

  try {
    const species = await fetchPokemonSpecies(pokemon.species.url);
    const generation = species.generation.name;
    const region = GENERATION_TO_REGION[generation] || "kanto";

    return { ...pokemon, region };
  } catch {
    return { ...pokemon, region: "kanto" };
  }
}

async function fetchPokemonList(
  offset: number = 0,
  limit: number = 500
): Promise<Pokemon[]> {
  const response = await fetch(
    `${POKEAPI_BASE}/pokemon?offset=${offset}&limit=${limit}`
  );

  const data = await response.json();

  const detailedPromises = data.results.map((item: PokemonListItem) =>
    fetchPokemonWithRegion(item.url)
  );

  return Promise.all(detailedPromises);
}

/* ───────────────────────────────── */
/* COMPONENT */
/* ───────────────────────────────── */

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] =
    useState<PokemonTypeName | null>(null);

  const [selectedRegion, setSelectedRegion] =
    useState<PokemonRegion | null>(null);

  const [activeFilter, setActiveFilter] =
    useState<"type" | "region">("type");

  /* ───────────────────────────────── */
  /* LOAD DATA */
  /* ───────────────────────────────── */

  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);

      try {
        const data = await fetchPokemonList();
        setPokemons(data);
      } catch (error) {
        console.error("Error loading pokemons:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, []);

  /* ───────────────────────────────── */
  /* FILTER */
  /* ───────────────────────────────── */

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType = selectedType
        ? pokemon.types.some((t) => t.type.name === selectedType)
        : true;

      const matchesRegion = selectedRegion
        ? pokemon.region === selectedRegion
        : true;

      return matchesSearch && matchesType && matchesRegion;
    });
  }, [pokemons, searchTerm, selectedType, selectedRegion]);

  /* ───────────────────────────────── */
  /* LOADING */
  /* ───────────────────────────────── */

  if (loading) {
    return (
      <div className={styles.loader}>
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  /* ───────────────────────────────── */
  /* UI */
  /* ───────────────────────────────── */

  return (
    <div className={styles["home-page"]}>
      {/* SEARCH */}

      <div className={styles["search-bar"]}>
        <input
          className={styles["search-bar__input"]}
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* FILTER TABS */}

      <div className={styles["filter-tabs"]}>
        <button
          className={`
            ${styles["filter-tabs__btn"]}
            ${activeFilter === "type" ? styles["filter-tabs__btn--active"] : ""}
          `}
          onClick={() => setActiveFilter("type")}
        >
          🔥 Por Tipo
        </button>

        <button
          className={`
            ${styles["filter-tabs__btn"]}
            ${activeFilter === "region" ? styles["filter-tabs__btn--active"] : ""}
          `}
          onClick={() => setActiveFilter("region")}
        >
          🗺️ Por Región
        </button>
      </div>

      {/* TYPE FILTER */}

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

      {/* REGION FILTER */}

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

      {/* RESULT COUNT */}

      <div className={styles["results-count"]}>
        Mostrando {filteredPokemons.length} Pokémon
      </div>

      {/* GRID */}

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
                📏 {pokemon.height / 10}m
              </span>

              <span className={styles["pokemon-card__stat"]}>
                ⚖️ {pokemon.weight / 10}kg
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}

      {filteredPokemons.length === 0 && (
        <p className={styles["no-results"]}>
          No se encontraron Pokémon
        </p>
      )}
    </div>
  );
}