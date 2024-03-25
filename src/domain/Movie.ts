import HTTPError from '../api/HttpError';
import httpRequest from '../api/httpRequest';
import errorMessage from '../error/errorMessage';
import { MovieListType } from '../types/movie';
import { RenderType } from '../types/props';

interface MovieDataType {
  movieList: MovieListType;
  isLastPage: boolean;
}

type RequestFunctionType = (page: number, input?: string) => Promise<MovieDataType>;

type HandleMovieDataTableType = { [key in RenderType]: () => Promise<MovieDataType> };

class Movie {
  #page: number;

  constructor() {
    this.#page = 0;
  }

  handleMovieData(type: RenderType, input?: string): Promise<MovieDataType> {
    this.updatePage();
    const handleMovieDataTable: HandleMovieDataTableType = {
      popular: () => this.getMovieData(httpRequest.fetchPopularMovies),
      search: () => this.getMovieData(httpRequest.fetchSearchedMovies, input),
    };
    const getDataFunction = handleMovieDataTable[type];
    return getDataFunction();
  }

  async getMovieData(requestFunction: RequestFunctionType, input?: string): Promise<MovieDataType> {
    try {
      const { movieList, isLastPage } = await requestFunction(this.#page, input);
      const filteredMovieList = movieList.map((movie) => ({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        vote_average: movie.vote_average,
      }));
      return { movieList: filteredMovieList, isLastPage };
    } catch (error) {
      const customError = error as HTTPError;
      errorMessage.apiError(customError.statusCode, customError.message ? customError.message : '');
      return { movieList: [], isLastPage: true };
    }
  }

  updatePage() {
    this.#page += 1;
  }
}

export default Movie;
