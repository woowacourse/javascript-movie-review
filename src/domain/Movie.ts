import httpRequest from '../api/httpRequest';
import errorDisplay from '../components/Error/ErrorDisplay';
import { MovieListType, MovieType } from '../types/movie';

interface MovieData {
  movieList: MovieListType;
  isLastPage: boolean;
}
class Movie {
  #page: number;

  constructor() {
    this.#page = 0;
  }

  handleMovieData(type: string, input?: string) {
    if (type === 'popular') {
      return this.getMovieData();
    }

    return this.getSearchedData(input ?? '');
  }

  getMovieData(): Promise<MovieData> {
    this.updatePage();

    const movieList = httpRequest
      .getPopularMovies(this.#page)
      .then(({ movieList, isLastPage }) => ({
        movieList: movieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids,
          overview: movie.overview,
        })),
        isLastPage,
      }))
      .catch((error) => {
        errorDisplay.displayError(error.statusCode);
        return { movieList: [], isLastPage: true };
      });
    return movieList;
  }

  async getSearchedData(input: string) {
    this.updatePage();

    const movieList = await httpRequest
      .getSearchedMovies(this.#page, input)
      .then(({ movieList, isLastPage }) => ({
        movieList: movieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids,
          overview: movie.overview,
        })),
        isLastPage,
      }))
      .catch((error) => {
        errorDisplay.displayError(error.statusCode, error.message);
        return { movieList: [], isLastPage: true };
      });
    return movieList;
  }

  updatePage() {
    this.#page += 1;
  }
}

export default Movie;
