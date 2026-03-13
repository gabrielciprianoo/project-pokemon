import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Pokemon, PokemonTypeName, PokemonRegion } from '../schemas';

export type FilterType = 'type' | 'region';

interface FilterStoreState {
  searchTerm: string;
  selectedType: PokemonTypeName | null;
  selectedRegion: PokemonRegion | null;
  activeFilter: FilterType;
}

interface FilterStoreActions {
  setSearchTerm: (term: string) => void;
  setSelectedType: (type: PokemonTypeName | null) => void;
  setSelectedRegion: (region: PokemonRegion | null) => void;
  setActiveFilter: (filter: FilterType) => void;
  toggleType: (type: PokemonTypeName) => void;
  toggleRegion: (region: PokemonRegion) => void;
  clearFilters: () => void;
  getFilteredPokemons: (pokemons: Pokemon[]) => Pokemon[];
}

type FilterStore = FilterStoreState & FilterStoreActions;

const useFilterStore = create<FilterStore>()(
  devtools(
    (set, get) => ({
      searchTerm: '',
      selectedType: null,
      selectedRegion: null,
      activeFilter: 'type',

      setSearchTerm: (term) => set({ searchTerm: term }, false, 'setSearchTerm'),

      setSelectedType: (type) => set({ selectedType: type }, false, 'setSelectedType'),

      setSelectedRegion: (region) => set({ selectedRegion: region }, false, 'setSelectedRegion'),

      setActiveFilter: (filter) => set({ activeFilter: filter }, false, 'setActiveFilter'),

      toggleType: (type) => set((state) => ({
        selectedType: state.selectedType === type ? null : type
      }), false, 'toggleType'),

      toggleRegion: (region) => set((state) => ({
        selectedRegion: state.selectedRegion === region ? null : region
      }), false, 'toggleRegion'),

      clearFilters: () => set({
        searchTerm: '',
        selectedType: null,
        selectedRegion: null,
      }, false, 'clearFilters'),

      getFilteredPokemons: (pokemons) => {
        const { searchTerm, selectedType, selectedRegion } = get();
        
        return pokemons.filter((pokemon) => {
          const matchesSearch = pokemon.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const matchesType = selectedType
            ? pokemon.types.some((t) => t.type.name === selectedType)
            : true;

          const matchesRegion = selectedRegion
            ? pokemon.region === selectedRegion
            : true;

          return matchesSearch && matchesType && matchesRegion;
        });
      },
    }),
    { name: 'FilterStore' }
  )
);

export default useFilterStore;
