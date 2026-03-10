import { createBrowserRouter } from 'react-router-dom'
import PokemonDetailPage from './views/PokemonDetailPage'
import NotFoundPage from './views/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Pokédex - Home Page coming soon</div>,
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
