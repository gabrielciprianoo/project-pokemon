import type { PokemonRegion } from "../schemas/pokemon";

export const REGION_RANGES: Record<PokemonRegion, { offset: number; limit: number }> = {
  kanto:  { offset: 0,   limit: 151 },
  johto:  { offset: 151, limit: 100 },
  hoenn:  { offset: 251, limit: 135 },
  sinnoh: { offset: 386, limit: 107 },
  unova:  { offset: 493, limit: 156 },
  kalos:  { offset: 649, limit: 72  },
  alola:  { offset: 721, limit: 88  },
  galar:  { offset: 809, limit: 96  },
  paldea: { offset: 905, limit: 120 },
};

export const REGIONS = Object.keys(REGION_RANGES) as PokemonRegion[];

export const REGION_NAMES: Record<PokemonRegion, string> = {
  kanto:  "Kanto",
  johto:  "Johto",
  hoenn:  "Hoenn",
  sinnoh: "Sinnoh",
  unova:  "Unova",
  kalos:  "Kalos",
  alola:  "Alola",
  galar:  "Galar",
  paldea: "Paldea",
};

export function getRegionFromId(id: number): PokemonRegion {
  if (id <= 151) return "kanto";
  if (id <= 251) return "johto";
  if (id <= 386) return "hoenn";
  if (id <= 493) return "sinnoh";
  if (id <= 649) return "unova";
  if (id <= 721) return "kalos";
  if (id <= 809) return "alola";
  if (id <= 905) return "galar";
  return "paldea";
}
