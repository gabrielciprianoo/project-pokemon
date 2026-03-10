import PokemonType from '../../atoms/PokemonType';
import './PokemonHeader.scss';

interface PokemonHeaderProps {
  name: string;
  id: number;
  types: string[];
}

export default function PokemonHeader({ name, id, types }: PokemonHeaderProps) {
  const formattedId = `#${String(id).padStart(3, '0')}`;
  
  return (
    <div className="pokemon-header">
      <div className="pokemon-header__title-row">
        <h1 className="pokemon-header__name">{name}</h1>
        <span className="pokemon-header__id">{formattedId}</span>
      </div>
      <div className="pokemon-header__types">
        {types.map((type) => (
          <PokemonType key={type} type={type} />
        ))}
      </div>
    </div>
  );
}
