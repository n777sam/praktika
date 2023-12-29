import React, { useState } from 'react';
import Button from './Button'
import { Movie } from '../types'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import InputField from './InputField'

interface SideBarProps {
    filmArr: Movie[];
}

const SideBar: React.FC<SideBarProps> = ({ filmArr }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>(filmArr);

    const history = useNavigate();

    const handleClick = (id: number) => {
        history(`/movie/${id}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const results = filmArr.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div className="sidebar">
            <div className="search">
                <form onSubmit={handleSubmit} className='flex-box'>
                    <InputField type="text" value={searchTerm} name="title" placeholder='поиск' onChange={handleChange} />
                    <Button text="Искать" />
                </form>
            </div>
            <div className="films-list">
                {searchResults.map((item, index) => (
                    <div className="film-item" key={index} onClick={() => handleClick(item.id)}>
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
                <Button text="Добавить" onClick={() => { }} />
            </footer>
        </div>
    );
};

export default SideBar;