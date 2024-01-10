import { useState, useEffect } from 'react'
import Form from '../components/Form'
import { Movie } from '../types'
import { useParams } from 'react-router-dom';

interface movieProps {
  currentMovie: Movie | null
  onMovieChange: (movie: Movie) => void
}

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

const MoviePage: React.FC<movieProps> = ({currentMovie, onMovieChange}) => {
  const [movie, setMovie] = useState<Movie>(initialState) 
  const { id } = useParams()
  const getMovieById = async () => {
    try {
        const response = await fetch(`http://localhost:3000/movies/${id}`)
        const movieData = await response.json()
        setMovie(movieData)
    } catch (e) {
        console.error(e)
    }
  }

  useEffect(() => {
    if (currentMovie) {
      setMovie(currentMovie)
    } else {
      getMovieById()
    }
  }, [currentMovie])
  return (<Form formProps={movie}  onMovieChange={onMovieChange} />)
}

export default MoviePage