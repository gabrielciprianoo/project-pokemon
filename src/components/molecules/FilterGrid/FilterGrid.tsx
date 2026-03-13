import styles from "./_FilterGrid.module.scss";

interface FilterGridProps<T extends string> {
  options: T[];
  selected: T | null;
  getLabel: (option: T) => string;
  onToggle: (option: T) => void;
  allLabel: string;
  getOptionClass?: (option: T) => string;
}

export default function FilterGrid<T extends string>({
  options,
  selected,
  getLabel,
  onToggle,
  allLabel,
  getOptionClass,
}: FilterGridProps<T>) {
  return (
    <div className={styles["filter-grid"]}>
      <button
        className={`${styles["filter-grid__btn"]} ${selected === null ? styles["filter-grid__btn--active"] : ""}`}
        onClick={() => { if (selected) onToggle(selected); }}
      >
        {allLabel}
      </button>
      {options.map((option) => (
        <button
          key={option}
          className={[
            styles["filter-grid__btn"],
            getOptionClass?.(option) ?? "",
            selected === option ? styles["filter-grid__btn--active"] : "",
          ].filter(Boolean).join(" ")}
          onClick={() => onToggle(option)}
        >
          {getLabel(option)}
        </button>
      ))}
    </div>
  );
}
