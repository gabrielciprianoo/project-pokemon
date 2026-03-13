import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles["search-bar"]}>
      <input
        className={styles["search-bar__input"]}
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
