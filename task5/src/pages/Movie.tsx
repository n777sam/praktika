import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const Movie: React.FC = () => {
    let { id } = useParams()
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/movies');
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);
    return (
        <div className="app">
            <Header title="Админка фильмотеки" />
            <main className='main flex-box'>
                <SideBar filmArr={posts} />

                <div className="content">
                    <div className="id">{id}</div>
                    <Form />
                </div>
            </main>
        </div>
    );
};

export default Movie;