import { usePokemonStore } from "../store/pokemonStore";
import { usePokemonPage } from "../hooks";
import {
  SearchBar,
  FilterTabs,
  TypeFilterGrid,
  RegionFilterGrid,
  PokemonGrid,
} from "../components";
import styles from "./_HomePage.module.scss";

export default function HomePage() {
  const { filter, searchTerm } = usePokemonStore();
  const { activeFilter } = filter;
  const isSearchMode = searchTerm.trim().length > 0;

  const { isLoading, error, pageItems, hasPrev, hasNext, handlePrev, handleNext, refetch } =
    usePokemonPage();

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>No se pudieron cargar los Pokémon</p>
        <p className={styles["error__message"]}>{error.message}</p>
        <button className={styles["error__retry"]} onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className={styles["home-page"]}>
      <SearchBar />
      <FilterTabs />

      {!isSearchMode && activeFilter === "type" && <TypeFilterGrid />}
      {!isSearchMode && activeFilter === "region" && <RegionFilterGrid />}

      <div className={styles["results-count"]}>
        Mostrando {pageItems.length} Pokémon
      </div>

      <PokemonGrid items={pageItems} />

      <div className={styles.pagination}>
        <button
          className={styles["pagination__btn"]}
          onClick={handlePrev}
          disabled={!hasPrev}
        >
          ← Anterior
        </button>
        <button
          className={styles["pagination__btn"]}
          onClick={handleNext}
          disabled={!hasNext}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
