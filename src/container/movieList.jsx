import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getMovies } from '../services/movieService';

const MovieList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: movies } = await getMovies();
      setData(movies);
    };
    fetchData();
  }, []);
  return (
    <div className='container row'>
      <div className='col-mg-12 col-lg-8'>
        <h1>Movie List</h1>
        <p>There are {data.length} movies in the database</p>
        <ul>
          {data.map((item, index) => (
            <li key={item._id}>
              {index}. {item.title}
              <br />
              <span>
                <Link to={`/movies/${item._id}`}>need more info?</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='col-md-12 col-lg-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieList;
