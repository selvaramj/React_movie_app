import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const Movie = ({ data }) => {
  const params = useParams();
  const movieId = params.movieId;
  const movie = data.find((item) => item.id == movieId);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Selected Movie:</h2>
      <h5>{movie.title}</h5>
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}</p>
      <button className='btn btn-primary' onClick={() => navigate('/movies')}>
        Close
      </button>
    </div>
  );
};

export default Movie;
