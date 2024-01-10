import Form from '../components/Form'
import { Movie } from '../types'

const initialState: Movie = {
  id: 0,
  title: '',
  year: '',
  posterUrl: '',
  rating: 0,
  actors: '',
  director: '',
  plot: ''
}

interface MoviePageProps {
  onMovieChange: (movie: Movie) => void
}

const MoviePage: React.FC<MoviePageProps> = ({onMovieChange}) => {
  return (<Form formProps={initialState} onMovieChange={onMovieChange} newMove={true} />)
}

export default MoviePage