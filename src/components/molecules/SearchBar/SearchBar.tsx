import { usePokemonStore } from "../../../store/pokemonStore";
import styles from "./_SearchBar.module.scss";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = usePokemonStore();

  return (
    <div className={styles["search-bar"]}>
      <input
        className={styles["search-bar__input"]}
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
