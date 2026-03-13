import * as v from "valibot";

export const PokemonTypeNameSchema = v.union([
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

export const PokemonRegionSchema = v.union([
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

const PokemonSpritesSchema = v.object({
  front_default: v.nullable(v.string()),
  other: v.object({
    "official-artwork": v.object({
      front_default: v.nullable(v.string()),
    }),
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

// Campos comunes entre PokemonSchema y PokemonDetailSchema
const PokemonBaseFields = {
  id: v.number(),
  name: v.string(),
  height: v.number(),
  weight: v.number(),
  types: v.array(PokemonTypeSchema),
  sprites: PokemonSpritesSchema,
};

export const PokemonSchema = v.object({
  ...PokemonBaseFields,
  region: v.optional(PokemonRegionSchema),
});

export const PokemonDetailSchema = v.object({
  ...PokemonBaseFields,
  abilities: v.array(PokemonAbilitySchema),
  stats: v.array(PokemonStatSchema),
});

export const PokemonListItemSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export type PokemonTypeName = v.InferOutput<typeof PokemonTypeNameSchema>;
export type PokemonRegion = v.InferOutput<typeof PokemonRegionSchema>;
export type Pokemon = v.InferOutput<typeof PokemonSchema>;
export type PokemonDetail = v.InferOutput<typeof PokemonDetailSchema>;
export type PokemonListItem = v.InferOutput<typeof PokemonListItemSchema>;
