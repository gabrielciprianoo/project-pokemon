import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  undefined,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Pokémon no encontrado');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Tiempo de espera agotado');
    } else {
      console.error('Error de conexión:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
