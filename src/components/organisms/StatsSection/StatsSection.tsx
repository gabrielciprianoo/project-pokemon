import StatList from '../../molecules/StatList';
import './StatsSection.scss';

interface Stat {
  name: string;
  value: number;
}

interface StatsSectionProps {
  stats: Stat[];
  baseStatTotal: number;
}

export default function StatsSection({ stats, baseStatTotal }: StatsSectionProps) {
  return (
    <div className="stats-section">
      <div className="stats-section__header">
        <h3 className="stats-section__title">Stats</h3>
        <span className="stats-section__total">
          Total: <strong>{baseStatTotal}</strong>
        </span>
      </div>
      <StatList stats={stats} />
    </div>
  );
}
