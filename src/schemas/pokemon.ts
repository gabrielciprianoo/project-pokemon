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

export type PokemonTypeName = v.InferOutput<typeof PokemonTypeNameSchema>;
export type PokemonRegion = v.InferOutput<typeof PokemonRegionSchema>;

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

export type Pokemon = v.InferOutput<typeof PokemonSchema>;
export type PokemonInput = v.InferInput<typeof PokemonSchema>;

export const PokemonListItemSchema = v.object({
  name: v.string(),
  url: v.string(),
});

export type PokemonListItem = v.InferOutput<typeof PokemonListItemSchema>;

export const PokemonListResponseSchema = v.object({
  count: v.number(),
  next: v.nullable(v.string()),
  previous: v.nullable(v.string()),
  results: v.array(PokemonListItemSchema),
});

export type PokemonListResponse = v.InferOutput<typeof PokemonListResponseSchema>;

export const PokemonSpeciesSchema = v.object({
  generation: v.object({
    name: v.string(),
    url: v.string(),
  }),
});

export type PokemonSpecies = v.InferOutput<typeof PokemonSpeciesSchema>;

export const SearchTermSchema = v.pipe(
  v.string(),
  v.minLength(0),
  v.maxLength(50)
);

export type SearchTerm = v.InferOutput<typeof SearchTermSchema>;

export interface ValidationError {
  path: string[];
  message: string;
}

interface ValibotIssue {
  path?: Array<{ key: string | number; value?: unknown }>;
  message: string;
}

export function formatValidationErrors(issues: ValibotIssue[]): ValidationError[] {
  return issues.map((issue) => ({
    path: issue.path?.map((p) => String(p.key)) || [],
    message: issue.message,
  }));
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof v.ValiError) {
    const errors = formatValidationErrors(error.issues as ValibotIssue[]);
    if (errors.length > 0) {
      const first = errors[0];
      return `${first.path.join(".")}: ${first.message}`;
    }
    return "Validation error";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
}

export function validatePokemon(data: unknown): Pokemon {
  return v.parse(PokemonSchema, data);
}

export function validateSearchTerm(data: unknown): SearchTerm {
  return v.parse(SearchTermSchema, data);
}

export function validatePokemonListResponse(data: unknown): PokemonListResponse {
  return v.parse(PokemonListResponseSchema, data);
}

export function safeValidatePokemon(data: unknown) {
  return v.safeParse(PokemonSchema, data);
}

export function safeValidateSearchTerm(data: unknown) {
  return v.safeParse(SearchTermSchema, data);
}

export function safeValidatePokemonListResponse(data: unknown) {
  return v.safeParse(PokemonListResponseSchema, data);
}
