import { useState, useEffect, useMemo } from 'react';
import type { Pokemon, PokemonListItem, PokemonTypeName } from '../types/pokemon';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

const POKEMON_TYPES: PokemonTypeName[] = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  return response.json();
}

async function fetchPokemonList(offset: number = 0, limit: number = 9): Promise<Pokemon[]> {
  const response = await fetch(`${POKEAPI_BASE}/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  
  const detailedPromises = data.results.map((item: PokemonListItem) => 
    fetchPokemonDetails(item.url)
  );
  
  return Promise.all(detailedPromises);
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PokemonTypeName | null>(null);

  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);
      try {
        const data = await fetchPokemonList(0, 9);
        setPokemons(data);
      } catch (error) {
        console.error('Error loading pokemons:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType 
        ? pokemon.types.some(t => t.type.name === selectedType)
        : true;
      return matchesSearch && matchesType;
    });
  }, [pokemons, searchTerm, selectedType]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#e0e0e0' }}>
        Loading Pokémon...
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="type-filter">
        <button
          className={`type-filter__btn ${selectedType === null ? 'type-filter__btn--active' : ''}`}
          onClick={() => setSelectedType(null)}
        >
          All
        </button>
        {POKEMON_TYPES.map(type => (
          <button
            key={type}
            className={`type-filter__btn type-filter__btn--${type} ${selectedType === type ? 'type-filter__btn--active' : ''}`}
            onClick={() => setSelectedType(selectedType === type ? null : type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="pokemon-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        padding: '16px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {filteredPokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              className="pokemon-card__image"
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <h3 className="pokemon-card__name">{pokemon.name}</h3>
            <div className="pokemon-card__types">
              {pokemon.types.map(({ type }) => (
                <span key={type.name} className={`pokemon-card__type pokemon-card__type--${type.name}`}>
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredPokemons.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
          No Pokémon found
        </p>
      )}
    </div>
  );
}
