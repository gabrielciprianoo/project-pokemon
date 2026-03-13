import apiClient from "../services/apiClient";
import { pokemonValidator } from "../services/pokemonValidator";
import { GENERATION_TO_REGION } from "../constants/regions";
import type { IPokemonRepository } from "../interfaces";
import type { IPokemon, IPokemonSpeciesResponse } from "../interfaces/pokemon";

export class PokemonRepository implements IPokemonRepository {
  async getByName(name: string): Promise<IPokemon> {
    const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
    return pokemonValidator.validate(response.data);
  }

  async getByUrl(url: string): Promise<IPokemon> {
    const response = await apiClient.get(url);
    const pokemon = pokemonValidator.validate(response.data);
    return this.addRegion(pokemon);
  }

  async getSpecies(url: string): Promise<IPokemonSpeciesResponse> {
    const response = await apiClient.get(url);
    return pokemonValidator.validateSpecies(response.data);
  }

  async getList(offset: number = 0, limit: number = 500): Promise<IPokemon[]> {
    const response = await apiClient.get(`/pokemon?offset=${offset}&limit=${limit}`);
    const items = pokemonValidator.validateList(response.data);

    const detailedPromises = items.map((item: { name: string; url: string }) => this.getByUrl(item.url));
    return Promise.all(detailedPromises);
  }

  private async addRegion(pokemon: IPokemon): Promise<IPokemon> {
    try {
      const species = await this.getSpecies(pokemon.species.url);
      const generation = species.generation.name;
      const region = GENERATION_TO_REGION[generation] || "kanto";
      return { ...pokemon, region };
    } catch {
      return { ...pokemon, region: "kanto" };
    }
  }
}

export const pokemonRepository = new PokemonRepository();
