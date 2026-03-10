import './PokemonImage.scss';

interface PokemonImageProps {
  name: string;
  image?: string;
  isLarge?: boolean;
}

export default function PokemonImage({ name, image, isLarge = false }: PokemonImageProps) {
  const placeholderUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${image ? image.split('/').pop() : '1'}.png`;
  
  return (
    <div className={`pokemon-image ${isLarge ? 'pokemon-image--large' : ''}`}>
      <img 
        src={image || placeholderUrl} 
        alt={name}
        className="pokemon-image__img"
        loading="lazy"
      />
    </div>
  );
}
