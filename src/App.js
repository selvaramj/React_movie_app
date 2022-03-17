import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/navbar';
import Movies from './container/movies';
import Product from './container/products';
import MovieList from './container/movieList';
import Movie from './container/movie';
import MoviePart from './container/moviePart';
import PageNotFound from './components/pageNotFound';
import MovieSearch from './container/movieSearch';
import Login from './container/Login/loginForm';
import Register from './container/Register/register';
import MovieForm from './container/movieForm';
import Posts from './container/Post/posts';
import Logout from './components/logout';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavigationBar user={user} />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Movies user={user} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='logout' element={<Logout />} />
          <Route path='products' element={<Product />} />
          <Route path='movies' element={user ? <MovieList /> : <Login />} />
          <Route
            path='movies/:movie'
            element={user ? <MovieForm /> : <Login />}
          />
          <Route path='posts' element={<Posts />} />
          {/* <Route path='search-movie' element={<MovieSearch movies={data} />} /> */}
          <Route path='not-found' element={<PageNotFound />} />
          <Route path='*' element={<Navigate to={'/not-found'} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
