import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MoviePage from './pages/MoviePage'
import Main from './pages/MainPage'
import CreateMoviePage from './pages/CreateMoviePage'
import Header from './components/Header'
import SideBar from './components/SideBar'
import { Movie } from './types'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [movie, setMovie] = useState<Movie | null>(null)
  const onMovieChange = (item: Movie) => {
    setMovie(item)
  }
  const updateItem = (newMovie: Movie) => {
    const isNew = movies.some(item => item.id === newMovie.id)
    let updatedItems
    if (isNew) {
      updatedItems = movies.map(item => {
        if (item.id === newMovie.id) {
          return newMovie
        }
        return item
      })
    } else {
      updatedItems = [newMovie, ...movies]
    }  

    setMovies(updatedItems)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies')
        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Router>
      <Header title="Админка фильмотеки" />
      <main className='main flex-box'>
        <SideBar filmArr={movies} onMovieChange={onMovieChange} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movie/:id" element={<MoviePage currentMovie={movie} onMovieChange={updateItem} />} />
            <Route path="/create" element={<CreateMoviePage onMovieChange={updateItem} />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App