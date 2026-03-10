import { createBrowserRouter } from 'react-router-dom'
import PokemonDetailPage from './views/PokemonDetailPage'
import NotFoundPage from './views/NotFoundPage'
import HomePage from './views/HomePage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/pokemon/:name',
    element: <PokemonDetailPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
