import React, { Component } from 'react';
import ListGroup from '../components/listGroup';
import Pagination from '../components/pagination';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/searchBox';
import { getGenres } from '../services/genreService';
import { deleteMovie, getMovies } from '../services/movieService';
import { toast } from 'react-toastify';

class Movies extends Component {
  state = {
    currentPage: 1,
    movies: [],
    genre: [],
    pageSize: 5,
    sortColumn: { path: 'title', order: 'asc' },
    selectedGenre: null,
    searchQuery: '',
  };

  async componentDidMount() {
    const { data: genre } = await getGenres();
    const genreAll = { name: 'All Genres', key: 'all' };
    const genreList = [genreAll, ...genre];
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genre: genreList,
      selectedGenre: genreAll,
    });
    console.log('State  ', this.state);
  }

  handleDeleteMovie = async (movie) => {
    const orgMovies = this.state.movies;
    const movies = orgMovies.filter((mov) => mov._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
      toast.success(`${movie.title} movie successfully deleted`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted');
      this.setState({ movies: orgMovies });
    }
  };

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handelePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      selectedGenre,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery.length > 0)
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(
        (movie) => movie.genre['_id'] === selectedGenre._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      currentPage,
      pageSize,
      genre,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount: count, data: movies } = this.getPageData();
    const { navigateTo, user } = this.props;
    console.log('movies ', movies);

    return (
      <div className='container'>
        <h1 className='text-center'>Movie List</h1>
        {count > 0 ? (
          <>
            <p className='text-center'>
              There are {count} movies in the database
            </p>
            <div className='row'>
              <div className='col-3'>
                {user && (
                  <button
                    className='btn btn-primary'
                    onClick={() => navigateTo('/movies/new')}
                    style={{ marginBottom: 20 }}
                  >
                    New Movie
                  </button>
                )}
                <ListGroup
                  genreList={genre}
                  onGenreSelect={this.handleGenreSelect}
                  selectedGenre={selectedGenre}
                />
              </div>
              <div className='col'>
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                {count > 0 && (
                  <>
                    <MoviesTable
                      movies={movies}
                      onLikeClick={this.handleLikeClick}
                      onDeleteMovie={this.handleDeleteMovie}
                      onSort={this.handleSort}
                      sortColumn={sortColumn}
                    />
                  </>
                )}
                <Pagination
                  currentPage={currentPage}
                  itemsCount={count}
                  pageSize={pageSize}
                  onPageChange={this.handelePageChange}
                />
              </div>
            </div>
          </>
        ) : (
          <p className='text-center'>No movies in the database</p>
        )}
      </div>
    );
  }
}

export default (props) => {
  return <Movies {...props} navigateTo={useNavigate()} />;
};
