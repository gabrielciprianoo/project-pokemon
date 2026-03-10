import StatBar from '../../atoms/StatBar';
import './StatList.scss';

interface Stat {
  name: string;
  value: number;
}

interface StatListProps {
  stats: Stat[];
}

const statTypeMap: Record<string, string> = {
  hp: 'fire',
  attack: 'fighting',
  defense: 'steel',
  'special-attack': 'psychic',
  'special-defense': 'grass',
  speed: 'electric',
};

export default function StatList({ stats }: StatListProps) {
  const formatStatName = (name: string) => {
    return name.replace('-', ' ');
  };
  
  return (
    <div className="stat-list">
      <h3 className="stat-list__title">Base Stats</h3>
      <div className="stat-list__items">
        {stats.map((stat) => (
          <StatBar
            key={stat.name}
            name={formatStatName(stat.name)}
            value={stat.value}
            type={statTypeMap[stat.name] || 'normal'}
          />
        ))}
      </div>
    </div>
  );
}
