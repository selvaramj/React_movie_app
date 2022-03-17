import React from 'react';
import { useParams } from 'react-router-dom';
const MoviePart = ({ data }) => {
  const params = useParams();
  const { movieId, year } = params;
  const movie = data.find((item) => item.id == movieId);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}</p>
      <p>Year: {year}</p>
    </div>
  );
};

export default MoviePart;
