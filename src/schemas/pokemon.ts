import * as v from "valibot";

const PokemonTypeNameSchema = v.union([
  v.literal("normal"),
  v.literal("fire"),
  v.literal("water"),
  v.literal("electric"),
  v.literal("grass"),
  v.literal("ice"),
  v.literal("fighting"),
  v.literal("poison"),
  v.literal("ground"),
  v.literal("flying"),
  v.literal("psychic"),
  v.literal("bug"),
  v.literal("rock"),
  v.literal("ghost"),
  v.literal("dragon"),
  v.literal("dark"),
  v.literal("steel"),
  v.literal("fairy"),
]);

const PokemonRegionSchema = v.union([
  v.literal("kanto"),
  v.literal("johto"),
  v.literal("hoenn"),
  v.literal("sinnoh"),
  v.literal("unova"),
  v.literal("kalos"),
  v.literal("alola"),
  v.literal("galar"),
  v.literal("paldea"),
]);

const PokemonTypeSchema = v.object({
  slot: v.number(),
  type: v.object({
    name: PokemonTypeNameSchema,
    url: v.string(),
  }),
});

const PokemonAbilitySchema = v.object({
  ability: v.object({
    name: v.string(),
    url: v.string(),
  }),
  is_hidden: v.boolean(),
  slot: v.number(),
});

const PokemonStatSchema = v.object({
  base_stat: v.number(),
  stat: v.object({
    name: v.string(),
    url: v.string(),
  }),
});

const PokemonSpritesSchema = v.object({
  front_default: v.string(),
  other: v.object({
    "official-artwork": v.object({
      front_default: v.string(),
    }),
  }),
});

export const PokemonSchema = v.object({
  id: v.number(),
  name: v.string(),
  height: v.number(),
  weight: v.number(),
  types: v.array(PokemonTypeSchema),
  abilities: v.array(PokemonAbilitySchema),
  stats: v.array(PokemonStatSchema),
  sprites: PokemonSpritesSchema,
  species: v.object({
    name: v.string(),
    url: v.string(),
  }),
  region: v.optional(PokemonRegionSchema),
});

export const PokemonListItemSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export const SearchTermSchema = v.pipe(
  v.string(),
  v.minLength(0),
  v.maxLength(50)
);

export function validatePokemon(data: unknown) {
  return v.parse(PokemonSchema, data);
}

export function validateSearchTerm(data: unknown) {
  return v.parse(SearchTermSchema, data);
}

export function safeValidatePokemon(data: unknown) {
  return v.safeParse(PokemonSchema, data);
}

export function safeValidateSearchTerm(data: unknown) {
  return v.safeParse(SearchTermSchema, data);
}
