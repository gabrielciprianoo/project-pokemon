import { usePokemonStore } from "../../../store/pokemonStore";
import styles from "./_FilterTabs.module.scss";

export default function FilterTabs() {
  const { filter, setActiveFilter } = usePokemonStore();
  const { activeFilter } = filter;

  return (
    <div className={styles["filter-tabs"]}>
      <button
        className={`${styles["filter-tabs__btn"]} ${activeFilter === "type" ? styles["filter-tabs__btn--active"] : ""}`}
        onClick={() => setActiveFilter("type")}
      >
        🔥 Por Tipo
      </button>
      <button
        className={`${styles["filter-tabs__btn"]} ${activeFilter === "region" ? styles["filter-tabs__btn--active"] : ""}`}
        onClick={() => setActiveFilter("region")}
      >
        🗺️ Por Región
      </button>
    </div>
  );
}
