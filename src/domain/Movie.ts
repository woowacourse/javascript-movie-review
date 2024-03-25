import httpRequest from '../api/httpRequest';
import errorMessage from '../error/errorMessage';
import { MovieListType, MovieType } from '../types/movie';
import { RenderType } from '../types/props';

interface MovieData {
  movieList: MovieListType;
  isLastPage: boolean;
}

type HandleMovieDataTableType = { [key in RenderType]: () => Promise<MovieData> };

class Movie {
  #page: number;

  constructor() {
    this.#page = 0;
  }

  handleMovieData(type: RenderType, input?: string): Promise<MovieData> {
    const handleMovieDataTable: HandleMovieDataTableType = {
      popular: () => this.getMovieData(),
      search: () => this.getSearchedData(input ?? ''),
    };
    const getDataFunction = handleMovieDataTable[type];
    return getDataFunction();
  }

  async getMovieData(): Promise<MovieData> {
    this.updatePage();

    const movieList = httpRequest
      .fetchPopularMovies(this.#page)
      .then(({ popularMovieList, isLastPage }) => ({
        movieList: popularMovieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
        })),
        isLastPage,
      }))
      .catch((error) => {
        errorMessage.apiError(error.statusCode);
        return { movieList: [], isLastPage: true };
      });
    return movieList;
  }

  async getSearchedData(input: string): Promise<MovieData> {
    this.updatePage();

    const movieList = httpRequest
      .fetchSearchedMovies(this.#page, input)
      .then(({ searchedMovieList, isLastPage }) => ({
        movieList: searchedMovieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
        })),
        isLastPage,
      }))
      .catch((error) => {
        errorMessage.apiError(error.statusCode, error.message);
        return { movieList: [], isLastPage: true };
      });
    return movieList;
  }

  updatePage() {
    this.#page += 1;
  }
}

export default Movie;
