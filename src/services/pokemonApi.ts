import * as v from "valibot";
import apiClient from "./apiClient";
import { PokemonDetailSchema, PokemonListItemSchema } from "../schemas/pokemon";
import { REGION_RANGES } from "../constants/regions";
import type { PokemonDetail, PokemonRegion, PokemonTypeName } from "../schemas/pokemon";

export const PAGE_SIZE = 18;

export interface PokemonListEntry {
  id: number;
  name: string;
}

function extractIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export async function getPokemonListPage(offset: number): Promise<PokemonListEntry[]> {
  const response = await apiClient.get(`/pokemon?offset=${offset}&limit=${PAGE_SIZE}`);
  const result = v.safeParse(v.array(PokemonListItemSchema), response.data.results);
  if (!result.success) {
    throw new Error("No se pudo cargar la lista de Pokémon. Verifica tu conexión.");
  }
  return result.output.map((item) => ({
    id: extractIdFromUrl(item.url),
    name: item.name,
  }));
}

const PokemonTypeEntrySchema = v.object({
  pokemon: v.object({
    name: v.string(),
    url: v.string(),
  }),
});

export async function getPokemonsByType(type: PokemonTypeName): Promise<PokemonListEntry[]> {
  const response = await apiClient.get(`/type/${type}`);
  const result = v.safeParse(v.array(PokemonTypeEntrySchema), response.data.pokemon);
  if (!result.success) {
    throw new Error(`No se pudieron cargar los Pokémon de tipo ${type}.`);
  }
  return result.output
    .map((entry) => ({
      id: extractIdFromUrl(entry.pokemon.url),
      name: entry.pokemon.name,
    }))
    .filter((entry) => entry.id <= 1025)
    .sort((a, b) => a.id - b.id);
}

export async function getPokemonsByRegion(
  region: PokemonRegion,
  relativeOffset: number
): Promise<PokemonListEntry[]> {
  const range = REGION_RANGES[region];
  const remaining = range.limit - relativeOffset;
  if (remaining <= 0) return [];

  const globalOffset = range.offset + relativeOffset;
  const limit = Math.min(PAGE_SIZE, remaining);

  const response = await apiClient.get(`/pokemon?offset=${globalOffset}&limit=${limit}`);
  const result = v.safeParse(v.array(PokemonListItemSchema), response.data.results);
  if (!result.success) {
    throw new Error(`No se pudieron cargar los Pokémon de ${region}.`);
  }
  return result.output.map((item) => ({
    id: extractIdFromUrl(item.url),
    name: item.name,
  }));
}

export async function getAllPokemonNames(): Promise<PokemonListEntry[]> {
  const response = await apiClient.get(`/pokemon?limit=1300&offset=0`);
  const result = v.safeParse(v.array(PokemonListItemSchema), response.data.results);
  if (!result.success) {
    throw new Error("No se pudo cargar la lista de Pokémon.");
  }
  return result.output
    .map((item) => ({ id: extractIdFromUrl(item.url), name: item.name }))
    .filter((item) => item.id <= 1025);
}

export async function getPokemon(name: string): Promise<PokemonDetail> {
  const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
  const result = v.safeParse(PokemonDetailSchema, response.data);
  if (!result.success) {
    throw new Error("No se pudo cargar la información del Pokémon");
  }
  return result.output;
}

export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

