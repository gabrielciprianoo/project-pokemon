import { Link } from "react-router-dom";
import { PokemonImage, PokemonType } from "../../atoms";
import { usePokemonDetail } from "../../../hooks";
import { getSpriteUrl } from "../../../services/pokemonApi";
import type { PokemonListEntry } from "../../../services/pokemonApi";
import "./PokemonCard.scss";

export default function PokemonCard({ id, name }: PokemonListEntry) {
  const { data: pokemon } = usePokemonDetail(name);

  const types = pokemon?.types.map((t) => t.type.name) ?? [];
  const primaryType = types[0];

  return (
    <Link
      to={`/pokemon/${name}`}
      className={`pokemon-card ${primaryType ? `pokemon-card--${primaryType}` : ""}`}
    >
      <div className="pokemon-card__content">
        <div className="pokemon-card__image-wrapper">
          <PokemonImage name={name} image={getSpriteUrl(id)} />
        </div>
        <div className="pokemon-card__info">
          <span className="pokemon-card__id">#{String(id).padStart(3, "0")}</span>
          <h3 className="pokemon-card__name">{name}</h3>
          <div className="pokemon-card__types">
            {types.length > 0 ? (
              types.map((type) => <PokemonType key={type} type={type} />)
            ) : (
              <div className="pokemon-card__types-skeleton" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
