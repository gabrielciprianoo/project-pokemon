import { useParams } from 'react-router-dom'

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>()

  return <div>Pokemon: {name}</div>
}
