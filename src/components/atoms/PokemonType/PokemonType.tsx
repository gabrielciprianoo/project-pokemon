import './PokemonType.scss';

interface PokemonTypeProps {
  type: string;
}

const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export default function PokemonType({ type }: PokemonTypeProps) {
  const color = typeColors[type] || '#A8A77A';
  
  return (
    <span 
      className="pokemon-type"
      style={{ 
        backgroundColor: color,
        boxShadow: `0 4px 12px ${color}60`
      }}
    >
      {type}
    </span>
  );
}
