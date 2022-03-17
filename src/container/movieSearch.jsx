import React from 'react';

const handleSubmit = (data) => {
  //data.prevent();
  console.log('submit ', data);
};

const MovieSearch = ({ movies }) => {
  return (
    <div>
      <form>
        <label htmlFor='name'>Enter Movie Name:</label>
        <input type='text' list='movie-list' id='name' />
        <datalist id='movie-list'>
          {movies.map((movie) => (
            <option value={movie.title} key={movie.id}>
              {movie.genre} -Rating {movie.rating}/10
            </option>
          ))}
        </datalist>
        <button className='btn btn-primary m-2'>Submit</button>
      </form>
    </div>
  );
};

export default MovieSearch;
