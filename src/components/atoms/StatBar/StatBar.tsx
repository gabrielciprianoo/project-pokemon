import './StatBar.scss';

interface StatBarProps {
  name: string;
  value: number;
  max?: number;
  type?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function StatBar({ name, value, max = 150, type = 'normal', size = 'medium' }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={`stat-bar stat-bar--${size}`}>
      <div className="stat-bar__label">
        <span className="stat-bar__name">{name}</span>
        <span className="stat-bar__value">{value}</span>
      </div>
      <div className="stat-bar__track">
        <div 
          className={`stat-bar__fill stat-bar__fill--${type}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
