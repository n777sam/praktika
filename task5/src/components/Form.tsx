import { useEffect, useState } from 'react'
import { Movie } from '../types'
import Button from './Button'
import InputField from './InputField'

interface MovieFormProps {
    formProps: Movie,
    newMove?: boolean,
    onMovieChange: (movie: Movie) => void
}

const MovieForm: React.FC<MovieFormProps> = ({ formProps, onMovieChange, newMove }) => {

    const [formData, setFormData] = useState<Movie>(formProps)

    useEffect(() => {
        setFormData(formProps)
    }, [formProps])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'genres' ? e.target.value.split(',') : e.target.value
        })
    }

    const resetState = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setFormData(formProps)
    }

    const updateMovie = async () => {
        try {
            const response = await fetch(`http://localhost:3000/movies/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const movie = await response.json()
            onMovieChange(movie)
        } catch (e) {
            console.error(e)
        }
    }

    const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateMovie()
    }

    const handleSubmitNew = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const movie = await response.json()
            onMovieChange(movie)
        } catch (e) {
            console.error(e)
        }
    }

    const addFavorites = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            await fetch(`http://localhost:3000/favorites${formData.favorites ? '/' + formData.id : ''}`, {
                method: formData.favorites ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            formData.favorites = !formData.favorites
            updateMovie();
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex-box">
            <div className="form">
                {!newMove && <div className="flex-box">
                    <div className="id">id: {formData.id}</div>
                    <Button text={formData.favorites ? 'В избранном' : 'Добавить в избранное'} onClick={addFavorites} />
                </div>}
                <form onSubmit={newMove ? handleSubmitNew : handleSubmitUpdate}>
                    <InputField initialValue={formData.title} name="title" label="Название фильма" onChange={handleInputChange} />
                    <InputField initialValue={formData.plot} name="plot" label="Описание" onChange={handleInputChange} />
                    <InputField initialValue={formData.year} name="year" label="Год выпуска" onChange={handleInputChange} />
                    <InputField initialValue={formData.posterUrl} name="posterUrl" label="Укажите ссылку на обложку" onChange={handleInputChange} />
                    <InputField initialValue={formData.actors} name="actors" label="Укажите список актеров" onChange={handleInputChange} />
                    <InputField initialValue={formData.genres} name="genres" label="Жанры" onChange={handleInputChange} />
                    <InputField initialValue={formData.director} name="director" label="Режиссер" onChange={handleInputChange} />
                    <div className="flex-box btn-box">
                        <Button text="Отменить" onClick={resetState} />
                        <Button text="Сохранить" />
                    </div>
                </form>
            </div>
            <div className="image">
                {formData.posterUrl && <img src={formData.posterUrl} alt="" />}
            </div>
        </div>
    )
}

export default MovieForm