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

const nullableString = v.nullable(v.string());
const optionalString = v.optional(nullableString, null);
const optionalNumber = v.optional(v.number(), 0);
const optionalBoolean = v.optional(v.boolean(), false);

export const PokemonTypeSchema = v.object({
  slot: v.number(),
  type: v.object({
    name: PokemonTypeNameSchema,
    url: optionalString,
  }),
});

export const PokemonAbilitySchema = v.object({
  ability: v.object({
    name: optionalString,
    url: optionalString,
  }),
  is_hidden: optionalBoolean,
  slot: optionalNumber,
});

export const PokemonStatSchema = v.object({
  base_stat: optionalNumber,
  stat: v.object({
    name: optionalString,
    url: optionalString,
  }),
});

export const PokemonOfficialArtworkSchema = v.object({
  front_default: optionalString,
  front_shiny: optionalString,
});

export const PokemonOtherSpritesSchema = v.object({
  'official-artwork': v.optional(PokemonOfficialArtworkSchema),
  dream_world: v.optional(v.unknown()),
  home: v.optional(v.unknown()),
  'gen-fifth': v.optional(v.unknown()),
  'gen-fourth': v.optional(v.unknown()),
  'gen-third': v.optional(v.unknown()),
});

export const PokemonSpritesSchema = v.object({
  front_default: optionalString,
  back_default: optionalString,
  front_shiny: optionalString,
  back_shiny: optionalString,
  front_female: optionalString,
  back_female: optionalString,
  front_shiny_female: optionalString,
  back_shiny_female: optionalString,
  other: v.optional(PokemonOtherSpritesSchema),
  animated: v.optional(v.unknown()),
});

export const PokemonSpeciesRefSchema = v.object({
  name: optionalString,
  url: optionalString,
});

export const PokemonGenerationSchema = v.object({
  name: optionalString,
  url: optionalString,
});

export const PokemonSpeciesSchema = v.object({
  generation: v.optional(PokemonGenerationSchema),
});

export type PokemonSpecies = v.InferOutput<typeof PokemonSpeciesSchema>;

export const PokemonSchema = v.object({
  id: v.number(),
  name: v.string(),
  height: v.number(),
  weight: v.number(),
  base_experience: optionalNumber,
  is_default: optionalBoolean,
  location_area_encounters: optionalString,
  types: v.array(PokemonTypeSchema),
  sprites: v.optional(PokemonSpritesSchema),
  species: v.optional(PokemonSpeciesRefSchema),
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
  next: optionalString,
  previous: optionalString,
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
