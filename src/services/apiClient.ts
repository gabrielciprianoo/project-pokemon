import * as v from 'valibot';
import type { BaseIssue } from 'valibot';
import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { ApiError, ValidationError, NetworkError, NotFoundError } from '../utils/errors';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

type ValibotSchema<T> = v.BaseSchema<unknown, T, BaseIssue<unknown>>;

export async function fetchAndValidate<T>(
  url: string,
  schema: ValibotSchema<T>
): Promise<T> {
  try {
    const response = await axios.get(url, { timeout: 30000 });
    const result = v.safeParse(schema, response.data);
    
    if (!result.success) {
      console.error('Validation error:', result.issues);
      throw new ValidationError('Error de validación de datos');
    }
    
    return result.output;
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      throw error;
    }
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new NotFoundError('Pokemon no encontrado');
      }
      const errorMessage = typeof error.response?.data === 'string' 
        ? error.response.data 
        : 'Error en la solicitud';
      throw new ApiError(errorMessage, error.response?.status);
    }
    if (error instanceof TypeError) {
      throw new NetworkError('Error de conexión');
    }
    throw new NetworkError('Error inesperado');
  }
}

export async function apiGet<T>(
  url: string,
  schema: ValibotSchema<T>
): Promise<T> {
  try {
    const response = await apiClient.get(url);
    const result = v.safeParse(schema, response.data);
    
    if (!result.success) {
      console.error('Validation error:', result.issues);
      throw new ValidationError('Error de validación de datos');
    }
    
    return result.output;
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      throw error;
    }
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new NotFoundError('Pokemon no encontrado');
      }
      const errorMessage = typeof error.response?.data === 'string' 
        ? error.response.data 
        : 'Error en la solicitud';
      throw new ApiError(errorMessage, error.response?.status);
    }
    if (error instanceof TypeError) {
      throw new NetworkError('Error de conexión');
    }
    throw new NetworkError('Error inesperado');
  }
}

export async function getPokemonByFullUrl<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new NotFoundError('Pokemon no encontrado');
      }
      const errorMessage = typeof error.response?.data === 'string' 
        ? error.response.data 
        : 'Error en la solicitud';
      throw new ApiError(errorMessage, error.response?.status);
    }
    throw new NetworkError('Error de conexión');
  }
}

export default apiClient;
