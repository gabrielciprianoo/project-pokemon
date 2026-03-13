import PokemonCard from "../PokemonCard";
import type { PokemonListEntry } from "../../../services/pokemonApi";
import styles from "./_PokemonGrid.module.scss";

interface PokemonGridProps {
  items: PokemonListEntry[];
}

export default function PokemonGrid({ items }: PokemonGridProps) {
  if (items.length === 0) {
    return <p className={styles["no-results"]}>No se encontraron Pokémon</p>;
  }

  return (
    <div className={styles["pokemon-grid"]}>
      {items.map((item) => (
        <PokemonCard key={item.id} id={item.id} name={item.name} />
      ))}
    </div>
  );
}
