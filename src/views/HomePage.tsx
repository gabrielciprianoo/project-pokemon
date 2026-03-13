import { Suspense } from 'react';
import { Loader, SearchBar, FilterTabs, FilterGrid, PokemonList, ErrorMessage } from '../components';
import { usePokemonList } from '../hooks';

import styles from './_HomePage.module.scss';

const HomePageContent = () => {
  const {
    loading,
    error,
    filteredPokemons,
    searchTerm,
    activeFilter,
    selectedType,
    selectedRegion,
    setSearchTerm,
    setActiveFilter,
    setSelectedType,
    setSelectedRegion,
  } = usePokemonList(500);

  if (loading && filteredPokemons.length === 0) {
    return <Loader message="Cargando Pokémon..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={styles['home-page']}>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <FilterGrid
        activeFilter={activeFilter}
        selectedType={selectedType}
        selectedRegion={selectedRegion}
        onTypeSelect={setSelectedType}
        onRegionSelect={setSelectedRegion}
      />
      
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

const HomePage = () => (
  <Suspense fallback={<Loader message="Cargando..." />}>
    <HomePageContent />
  </Suspense>
);

export default HomePage;
  