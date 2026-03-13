import * as v from 'valibot';
import type { BaseIssue } from 'valibot';
import axios, { type AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_POKEAPI_URL || 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Pokemon not found'));
    }
    return Promise.reject(error);
  }
);

type ValibotSchema<T> = v.BaseSchema<unknown, T, BaseIssue<unknown>>;

export async function fetchAndValidate<T>(
  url: string,
  schema: ValibotSchema<T>
): Promise<T> {
  const response = await axios.get(url);
  return v.parse(schema, response.data);
}

export async function apiGet<T>(
  url: string,
  schema: ValibotSchema<T>
): Promise<T> {
  const response = await apiClient.get(url);
  return v.parse(schema, response.data);
}

export async function getPokemonByFullUrl<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);
  return response.data;
}

export default apiClient;
