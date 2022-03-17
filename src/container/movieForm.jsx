import React from 'react';
import Form from '../components/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Joi from 'joi-browser';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string().allow(''),
    title: Joi.string().required().min(3).label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label('Daily Rental Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.params.movie;
      if (movieId == 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapMovieData(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('Invalid Movie data');
        setTimeout(() => window.location.assign('/not-found'), 2000);
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapMovieData = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre['_id'],
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.navigateTo('/', { replace: true });
  };
  render() {
    const { data } = this.state;
    return (
      <div className='container'>
        <h1>Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Stocks', 'number')}
          {this.renderInput('dailyRentalRate', 'Rating', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default (props) => {
  const navigate = useNavigate(),
    params = useParams();
  return <MovieForm {...props} navigateTo={navigate} params={params} />;
};
