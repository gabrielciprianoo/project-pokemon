import { useState } from "react";
import type { PokemonTypeName, PokemonRegion } from "../types/pokemon";

export type FilterType = "type" | "region";

export function usePokemonFilter() {
  const [selectedType, setSelectedType] = useState<PokemonTypeName | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<PokemonRegion | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("type");

  const toggleType = (type: PokemonTypeName) => {
    setSelectedType(selectedType === type ? null : type);
  };

  const toggleRegion = (region: PokemonRegion) => {
    setSelectedRegion(selectedRegion === region ? null : region);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedRegion(null);
  };

  return {
    selectedType,
    setSelectedType,
    toggleType,
    selectedRegion,
    setSelectedRegion,
    toggleRegion,
    activeFilter,
    setActiveFilter,
    clearFilters
  };
}
