import { MoviesState } from '../types/type';

class Movies {
  #moviesResultState: MoviesState = { isLastPage: false, movies: [] };

  get movieResultState(): MoviesState {
    return this.#moviesResultState;
  }

  update(moviesState: MoviesState) {
    this.#moviesResultState = moviesState;
  }
}

export default Movies;
