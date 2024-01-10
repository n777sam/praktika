import { useState, useEffect } from 'react'
import Button from './Button'
import { Movie } from '../types'
import { useNavigate } from 'react-router-dom'
import InputField from './InputField'

interface SideBarProps {
    filmArr: Movie[]
    onMovieChange: (movie: Movie) => void
}

const SideBar: React.FC<SideBarProps> = ({ filmArr, onMovieChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchResults, setSearchResults] = useState<Movie[]>([])
    
    const history = useNavigate()
    const handleClick = (movie: Movie) => {
        onMovieChange(movie)
        history(`/movie/${movie.id}`)
    }
    const createRoter = () => {
        history(`/create`)
    }

    useEffect(() => {
        if (filmArr && filmArr.length > 0) {
            setSearchResults(filmArr)
        }
    }, [filmArr])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const results = filmArr.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(results)
    }

    return (
        <div className="sidebar">
            <div className="search">
                <form onSubmit={handleSubmit} className='flex-box'>
                    <InputField initialValue={searchTerm} name="title" placeholder='поиск' onChange={handleChange} />
                    <Button text="Искать" />
                </form>
            </div>
            <div className="films-list">
                {searchResults.map((item, index) => (
                    <div className="film-item" key={index} onClick={() => handleClick(item)}>
                        <h2>{item.title}</h2>
                        <div className="flex-box">
                            <div className="year">
                                {item.year}
                            </div>
                            <div className="tags">
                                {item.genres?.join(' ,')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <footer className="sidebar-footer">
                <div className="col">{searchResults.length}</div>
                <Button text="Добавить" onClick={() => {createRoter()}} />
            </footer>
        </div>
    )
}

export default SideBar