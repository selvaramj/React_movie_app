import React, { useEffect } from 'react';
import Like from '../components/like';
import Table from '../components/table';
import auth from '../services/authService';

const MoviesTable = (props) => {
  const { movies, onLikeClick, onDeleteMovie, onSort, sortColumn } = props;
  const columns = [
    {
      path: 'title',
      label: 'Title',
      needSort: true,
      isLink: true,
    },
    {
      path: 'genre.name',
      label: 'Genre',
      needSort: true,
    },
    {
      path: 'numberInStock',
      label: 'Stocks',
      needSort: true,
    },
    {
      path: 'dailyRentalRate',
      label: 'Rating',
      needSort: true,
    },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.liked} onLikeClick={() => onLikeClick(movie)} />
      ),
      needSort: false,
    },
  ];
  const deleteColumn = {
    key: 'delete',
    content: (movie) => (
      <button className='btn btn-danger' onClick={() => onDeleteMovie(movie)}>
        Delete
      </button>
    ),
    needSort: false,
  };
  const user = auth.getCurrentUser();
  if (user && user.isAdmin) {
    columns.push(deleteColumn);
  }

  return (
    <Table
      columns={columns}
      data={movies}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
};

export default MoviesTable;
