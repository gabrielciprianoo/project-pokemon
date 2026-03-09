import { createBrowserRouter } from 'react-router-dom'
import HomePage from './views/HomePage'
import PokemonDetailPage from './views/PokemonDetailPage'
import NotFoundPage from './views/NotFoundPage'

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
