import TypeList from '../../molecules/TypeList';
import AbilityList from '../../molecules/AbilityList';
import './PokemonInfoCard.scss';

interface PokemonInfoCardProps {
  height: number;
  weight: number;
  types: string[];
  abilities: { name: string; isHidden: boolean }[];
}

export default function PokemonInfoCard({ 
  height, 
  weight, 
  types, 
  abilities 
}: PokemonInfoCardProps) {
  const formatHeight = (h: number) => `${(h / 10).toFixed(1)} m`;
  const formatWeight = (w: number) => `${(w / 10).toFixed(1)} kg`;
  
  return (
    <div className="pokemon-info-card">
      <div className="pokemon-info-card__grid">
        <div className="pokemon-info-card__item">
          <span className="pokemon-info-card__label">Height</span>
          <span className="pokemon-info-card__value">{formatHeight(height)}</span>
        </div>
        <div className="pokemon-info-card__item">
          <span className="pokemon-info-card__label">Weight</span>
          <span className="pokemon-info-card__value">{formatWeight(weight)}</span>
        </div>
      </div>
      
      <div className="pokemon-info-card__section">
        <TypeList types={types} />
      </div>
      
      <div className="pokemon-info-card__section">
        <AbilityList abilities={abilities} />
      </div>
    </div>
  );
}
