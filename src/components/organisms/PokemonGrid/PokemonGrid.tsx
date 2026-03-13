import type { ReactNode } from "react";
import styles from "./PokemonGrid.module.scss";

interface PokemonGridProps {
  children: ReactNode;
}

export default function PokemonGrid({ children }: PokemonGridProps) {
  return (
    <div className={styles["pokemon-grid"]}>
      {children}
    </div>
  );
}
