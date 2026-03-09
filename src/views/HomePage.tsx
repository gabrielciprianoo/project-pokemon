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
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '4rem',
        color: '#e0e0e0'
      }}>
        <div className="pokemon-loader"></div>
        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Cargando Pokémon...</p>
        <style>{`
          .pokemon-loader {
            width: 60px;
            height: 60px;
            border: 4px solid #333;
            border-top-color: #ff5350;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
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

      <div className="pokemon-grid">
        {filteredPokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <span className="pokemon-card__id">#{String(pokemon.id).padStart(3, '0')}</span>
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
            <div className="pokemon-card__stats">
              <span className="pokemon-card__stat">📏 {pokemon.height / 10}m</span>
              <span className="pokemon-card__stat">⚖️ {pokemon.weight / 10}kg</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .pokemon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pokemon-card {
          background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .pokemon-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(255, 83, 80, 0.3);
        }

        .pokemon-card__id {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 0.85rem;
          color: #888;
          font-weight: 600;
        }

        .pokemon-card__image {
          width: 120px;
          height: 120px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .pokemon-card:hover .pokemon-card__image {
          transform: scale(1.1);
        }

        .pokemon-card__name {
          color: #fff;
          margin: 12px 0 8px;
          text-transform: capitalize;
          font-size: 1.3rem;
        }

        .pokemon-card__types {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .pokemon-card__type {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          textTransform: uppercase;
        }

        .pokemon-card__type--fire { background: #ff6b6b; color: #fff; }
        .pokemon-card__type--water { background: #4dabf7; color: #fff; }
        .pokemon-card__type--grass { background: #69db7c; color: #1a1a1a; }
        .pokemon-card__type--electric { background: #ffd43b; color: #1a1a1a; }
        .pokemon-card__type--ice { background: #74c0fc; color: #1a1a1a; }
        .pokemon-card__type--fighting { background: #fa5252; color: #fff; }
        .pokemon-card__type--poison { background: #be4bdb; color: #fff; }
        .pokemon-card__type--ground { background: #e67700; color: #fff; }
        .pokemon-card__type--flying { background: #868e96; color: #1a1a1a; }
        .pokemon-card__type--psychic { background: #f783ac; color: #1a1a1a; }
        .pokemon-card__type--bug { background: #a9e34b; color: #1a1a1a; }
        .pokemon-card__type--rock { background: #a78bfa; color: #fff; }
        .pokemon-card__type--ghost { background: #845ef7; color: #fff; }
        .pokemon-card__type--dragon { background: #5c7cfa; color: #fff; }
        .pokemon-card__type--dark { background: #495057; color: #fff; }
        .pokemon-card__type--steel { background: #adb5bd; color: #1a1a1a; }
        .pokemon-card__type--fairy { background: #f783ac; color: #1a1a1a; }
        .pokemon-card__type--normal { background: #ced4da; color: #1a1a1a; }

        .pokemon-card__stats {
          display: flex;
          justify-content: center;
          gap: 16px;
          color: #aaa;
          font-size: 0.85rem;
        }

        .search-bar__input {
          padding: 12px 20px;
          border-radius: 25px;
          border: none;
          background: #2a2a2a;
          color: #fff;
          font-size: 1rem;
          width: 100%;
          max-width: 400px;
          outline: none;
          transition: box-shadow 0.3s ease;
        }

        .search-bar__input:focus {
          box-shadow: 0 0 0 3px rgba(255, 83, 80, 0.3);
        }

        .type-filter {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
          padding: 0 16px;
        }

        .type-filter__btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease;
          background: #333;
          color: #ccc;
        }

        .type-filter__btn:hover {
          transform: scale(1.05);
        }

        .type-filter__btn--active {
          background: #ff5350;
          color: #fff;
        }
      `}</style>

      {filteredPokemons.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
          No Pokémon found
        </p>
      )}
    </div>
  );
}
