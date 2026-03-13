import * as v from "valibot";
import type { IPokemonType } from "../interfaces/pokemon";

export type PokemonRegion = "kanto" | "johto" | "hoenn" | "sinnoh" | "unova" | "kalos" | "alola" | "galar" | "paldea";

export const PokemonTypeNameSchema = v.union([
  v.literal("normal"), v.literal("fire"), v.literal("water"), v.literal("electric"),
  v.literal("grass"), v.literal("ice"), v.literal("fighting"), v.literal("poison"),
  v.literal("ground"), v.literal("flying"), v.literal("psychic"), v.literal("bug"),
  v.literal("rock"), v.literal("ghost"), v.literal("dragon"), v.literal("dark"),
  v.literal("steel"), v.literal("fairy"),
]);

export type PokemonTypeName = v.InferOutput<typeof PokemonTypeNameSchema>;

export const PokemonRegionSchema = v.union([
  v.literal("kanto"), v.literal("johto"), v.literal("hoenn"), v.literal("sinnoh"),
  v.literal("unova"), v.literal("kalos"), v.literal("alola"), v.literal("galar"),
  v.literal("paldea"),
]);

export type PokemonRegionSchemaType = v.InferOutput<typeof PokemonRegionSchema>;

const PokemonTypeSchema = v.object({
  slot: v.number(),
  type: v.object({
    name: PokemonTypeNameSchema,
    url: v.string(),
  }),
});

export type PokemonTypeRaw = v.InferOutput<typeof PokemonTypeSchema>;

const PokemonAbilitySchema = v.object({
  ability: v.object({
    name: v.string(),
    url: v.string(),
  }),
  is_hidden: v.boolean(),
  slot: v.number(),
});

export type PokemonAbilityRaw = v.InferOutput<typeof PokemonAbilitySchema>;

const PokemonStatSchema = v.object({
  base_stat: v.number(),
  stat: v.object({
    name: v.string(),
    url: v.string(),
  }),
});

export type PokemonStatRaw = v.InferOutput<typeof PokemonStatSchema>;

const PokemonSpritesSchema = v.object({
  front_default: v.string(),
  other: v.object({
    "official-artwork": v.object({
      front_default: v.string(),
    }),
  }),
});

export type PokemonSpritesRaw = v.InferOutput<typeof PokemonSpritesSchema>;

const PokemonSpeciesSchema = v.object({
  generation: v.object({
    name: v.string(),
    url: v.string(),
  }),
});

export type PokemonSpeciesResponse = v.InferOutput<typeof PokemonSpeciesSchema>;

export const PokemonDetailSchema = v.object({
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

export type PokemonData = v.InferOutput<typeof PokemonDetailSchema>;

const PokemonListItemSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export type PokemonListItemData = v.InferOutput<typeof PokemonListItemSchema>;

export const PokemonListResponseSchema = v.object({
  count: v.number(),
  next: v.nullable(v.string()),
  previous: v.nullable(v.string()),
  results: v.array(PokemonListItemSchema),
});

export type PokemonListResponseData = v.InferOutput<typeof PokemonListResponseSchema>;

function transformToPokemonType(raw: PokemonTypeRaw): IPokemonType {
  return {
    slot: raw.slot,
    name: raw.type.name,
    url: raw.type.url,
  };
}

function transformToPokemon(raw: PokemonData) {
  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    types: raw.types.map(transformToPokemonType),
    abilities: raw.abilities,
    stats: raw.stats,
    sprites: {
      front_default: raw.sprites.front_default,
      official_artwork: raw.sprites.other["official-artwork"].front_default,
    },
    species: raw.species,
    region: (raw.region || "kanto") as PokemonRegion,
  };
}

export class PokemonValidator {
  validate(data: unknown) {
    const result = v.safeParse(PokemonDetailSchema, data);
    if (!result.success) {
      const firstIssue = result.issues?.[0];
      const path = firstIssue?.path?.map((p) => p.key).join(".") || "unknown";
      throw new Error(`Validation failed at ${path}: ${firstIssue?.message || "Invalid data"}`);
    }
    return transformToPokemon(result.output);
  }

  validateList(data: unknown): PokemonListItemData[] {
    const result = v.safeParse(PokemonListResponseSchema, data);
    if (!result.success) {
      throw new Error("Invalid list response");
    }
    return result.output.results;
  }

  validateSpecies(data: unknown): PokemonSpeciesResponse {
    const result = v.safeParse(PokemonSpeciesSchema, data);
    if (!result.success) {
      throw new Error("Invalid species data");
    }
    return result.output;
  }
}

export const pokemonValidator = new PokemonValidator();
