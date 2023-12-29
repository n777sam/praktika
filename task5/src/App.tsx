import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movie from './pages/Movie';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;