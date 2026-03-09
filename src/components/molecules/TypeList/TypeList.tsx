import PokemonType from '../../atoms/PokemonType';
import './TypeList.scss';

interface TypeListProps {
  types: string[];
}

export default function TypeList({ types }: TypeListProps) {
  return (
    <div className="type-list">
      <h3 className="type-list__title">Types</h3>
      <div className="type-list__items">
        {types.map((type) => (
          <PokemonType key={type} type={type} />
        ))}
      </div>
    </div>
  );
}
