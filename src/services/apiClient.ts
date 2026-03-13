import axios from 'axios';

const apiClient = axios.create({
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

export default apiClient;
