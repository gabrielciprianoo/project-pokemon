import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./views/HomePage'));
const PokemonDetailPage = lazy(() => import('./views/PokemonDetailPage'));
const NotFoundPage = lazy(() => import('./views/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>Cargando...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/pokemon/:name',
    element: (
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>Cargando...</div>}>
        <PokemonDetailPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>Cargando...</div>}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export default router;
