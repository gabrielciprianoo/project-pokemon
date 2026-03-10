import Badge from '../../atoms/Badge';
import './AbilityList.scss';

interface Ability {
  name: string;
  isHidden: boolean;
}

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  return (
    <div className="ability-list">
      <h3 className="ability-list__title">Abilities</h3>
      <div className="ability-list__items">
        {abilities.map((ability) => (
          <div key={ability.name} className="ability-list__item">
            <span className="ability-list__name">{ability.name}</span>
            {ability.isHidden && <Badge variant="info">Hidden</Badge>}
          </div>
        ))}
      </div>
    </div>
  );
}
