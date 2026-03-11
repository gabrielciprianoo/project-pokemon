import { useState } from "react";

export function usePokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  return {
    searchTerm,
    setSearchTerm,
    clearSearch: () => setSearchTerm("")
  };
}
