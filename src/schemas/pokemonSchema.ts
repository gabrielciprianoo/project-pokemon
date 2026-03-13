import * as v from 'valibot';

const PokemonTypeNameSchema = v.picklist([
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]);

const PokemonRegionSchema = v.picklist([
  'kanto', 'johto', 'hoenn', 'sinnoh', 'unova',
  'kalos', 'alola', 'galar', 'paldea'
]);

export const PokemonTypeSchema = v.object({
  slot: v.number(),
  type: v.object({
    name: PokemonTypeNameSchema,
    url: v.string(),
  }),
});

export const PokemonAbilitySchema = v.object({
  ability: v.object({
    name: v.string(),
    url: v.string(),
  }),
  is_hidden: v.boolean(),
  slot: v.number(),
});

export const PokemonStatSchema = v.object({
  base_stat: v.number(),
  stat: v.object({
    name: v.string(),
    url: v.string(),
  }),
});

export const PokemonSpritesSchema = v.object({
  front_default: v.string(),
  other: v.object({
    'official-artwork': v.object({
      front_default: v.optional(v.string()),
    }),
  }),
});

export const PokemonSpeciesRefSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export const PokemonGenerationSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export const PokemonSpeciesSchema = v.object({
  generation: PokemonGenerationSchema,
});

export type PokemonSpecies = v.InferOutput<typeof PokemonSpeciesSchema>;

export const PokemonSchema = v.object({
  id: v.number(),
  name: v.string(),
  height: v.number(),
  weight: v.number(),
  types: v.array(PokemonTypeSchema),
  sprites: PokemonSpritesSchema,
  species: PokemonSpeciesRefSchema,
  abilities: v.optional(v.array(PokemonAbilitySchema)),
  stats: v.optional(v.array(PokemonStatSchema)),
  region: v.optional(PokemonRegionSchema),
});

export const PokemonListItemSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export const PokemonListResponseSchema = v.object({
  count: v.number(),
  next: v.optional(v.string()),
  previous: v.optional(v.string()),
  results: v.array(PokemonListItemSchema),
});

export type PokemonTypeName = v.InferOutput<typeof PokemonTypeNameSchema>;
export type PokemonRegion = v.InferOutput<typeof PokemonRegionSchema>;
export type Pokemon = v.InferOutput<typeof PokemonSchema>;
export type PokemonListItem = v.InferOutput<typeof PokemonListItemSchema>;
export type PokemonListResponse = v.InferOutput<typeof PokemonListResponseSchema>;

export function validatePokemon(data: unknown): Pokemon {
  return v.parse(PokemonSchema, data);
}

export function validatePokemonList(data: unknown): PokemonListResponse {
  return v.parse(PokemonListResponseSchema, data);
}

export function validatePokemonArray(data: unknown): Pokemon[] {
  return v.parse(v.array(PokemonSchema), data);
}
