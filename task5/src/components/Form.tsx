import React, { useState } from 'react';
import { Movie } from '../types'
import Button from './Button'
import InputField from './InputField'

const initialState: Movie = {
    id: 0,
    title: '',
    description: '',
    year: '',
    posterUrl: '',
    rating: 0,
    actors: '',
    director: ''
};

const MovieForm: React.FC = () => {
    const [formData, setFormData] = useState<Movie>(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (       
        <form onSubmit={handleSubmit}>
            <InputField type="text" value={formData.title} name="title" label="Название фильма" onChange={handleInputChange} />
            <InputField type="text" value={formData.description} name="description" label="Описание" onChange={handleInputChange} />
            <InputField type="text" value={formData.year} name="year" label="Год выпуска" onChange={handleInputChange} />
            <InputField type="text" value={formData.posterUrl} name="posterUrl" label="Укажите ссылку на обложку" onChange={handleInputChange} />
            <InputField type="number" max="10" min="0" value={formData.rating} name="rating" label="Рейтинг" onChange={handleInputChange} />
            <InputField type="text" value={formData.actors} name="actors" label="Укажите список актеров" onChange={handleInputChange} />
            <InputField type="text" value={formData.director} name="director" label="Режиссер" onChange={handleInputChange} />
            <div className="flex-box btn-box">
                <Button text="Отменить"/>
                <Button text="Сохранить"/>
            </div>
        </form>
    );
};

export default MovieForm;