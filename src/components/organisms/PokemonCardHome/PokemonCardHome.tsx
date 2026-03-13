import { useNavigate } from "react-router-dom";
import { REGION_NAMES } from "../../../constants/regions";
import type { Pokemon } from "../../../types/pokemon";
import styles from "./PokemonCardHome.module.scss";

interface PokemonCardHomeProps {
  pokemon: Pokemon;
}

export default function PokemonCardHome({ pokemon }: PokemonCardHomeProps) {
  const navigate = useNavigate();

  return (
    <div
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
  );
}
