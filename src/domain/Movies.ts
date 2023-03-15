import { getApiPopularMovie } from './api';
import Observable from './Observable';
import PopularMovieApiType from '../type/movie';

class Movies extends Observable {
  #page;

  constructor() {
    super();

    this.#page = 1;

    this.setMovies();
  }

  async setMovies() {
    const popularMovies = await getApiPopularMovie<PopularMovieApiType>(
      this.#page++
    );
    const refineMovies = popularMovies.results.map(
      ({ id, poster_path, title, vote_average }) => {
        return { id, poster_path, title, vote_average };
      }
    );

    this.notify('movies', refineMovies);
  }
}

const movies = new Movies();
export default Object.freeze(movies);
