import { fetchData } from '../api/http';
import { statusCodeToErrorMessage } from '../api/statusCode';
import { IMovieHandleProps, IMovieItemProps, IMovieProps, IMovieState } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

interface IMovieFetchProps {
  curPage: number;
}

interface IFindMovieFetchProps extends IMovieFetchProps {
  query: string;
}

export interface IFetchedError {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface IFetchMovie {
  isError: boolean;
  data: IMovieHandleProps<IMovieProps> | IFetchedError;
}

export interface IModifiedMovie {
  isError: boolean;
  data: IMovieHandleProps<IMovieItemProps> | IFetchedError;
}

export const initialMovieStats: IMovieState = {
  results: [],
  nextPage: 1,
  query: '',
  category: 'popular',
  error: {
    isError: false,
    message: '',
  },
};

class Movie {
  #movieState: IMovieState;

  constructor(initialMovieState: IMovieState) {
    this.#movieState = initialMovieState;
  }

  async getPopularMovies({ curPage = 1 }: IMovieFetchProps): Promise<IModifiedMovie> {
    const movieList = await fetchData<IFetchMovie>(
      `${BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${curPage}`
    );

    const { isError, data } = movieList;

    if ('results' in data) {
      const { results, total_pages, page } = data;

      const movleList = results.map((currentMovie) => ({
        title: currentMovie.title,
        posterPath: currentMovie.poster_path,
        voteAverage: currentMovie.vote_average,
      }));

      return {
        isError,
        data: { results: movleList, total_pages, page },
      };
    }

    return {
      isError,
      data,
    };
  }

  async findMovies({ query, curPage = 1 }: IFindMovieFetchProps): Promise<IModifiedMovie> {
    const foundedMovies = await fetchData<IFetchMovie>(
      `${BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${curPage}`
    );

    const { isError, data } = foundedMovies;

    if ('results' in data) {
      const { results, total_pages, page } = data;

      const movleList = results.map((currentMovie) => ({
        title: currentMovie.title,
        posterPath: currentMovie.poster_path,
        voteAverage: currentMovie.vote_average,
      }));

      return {
        isError,
        data: { results: movleList, total_pages, page },
      };
    }

    return {
      isError,
      data,
    };
  }

  async renderPopularMovies(curPage = 1) {
    if (this.#movieState['category'] === 'search') {
      this.#movieState['nextPage'] = 1;
    }

    this.#movieState['category'] = 'popular';
    this.#setSkeletonArray(curPage);

    const { isError, data } = await this.getPopularMovies({
      curPage,
    });

    if (isError && 'status_code' in data) {
      const message = statusCodeToErrorMessage(data.status_code);

      this.#movieState['error'] = {
        isError,
        message,
      };

      return;
    }

    if (!('results' in data)) return;

    const { results, total_pages, page } = data;

    setTimeout(() => this.#setMovies({ results, total_pages, page }), 500);
  }

  async renderSearchedMovies(query: string, curPage = 1) {
    if (this.#movieState['category'] === 'popular') {
      this.#movieState['nextPage'] = 1;
    }

    this.#movieState['query'] = query;
    this.#movieState['category'] = 'search';
    this.#setSkeletonArray(curPage);

    const { isError, data } = await this.findMovies({
      query,
      curPage,
    });

    if (isError && 'status_code' in data) {
      const message = statusCodeToErrorMessage(data.status_code);

      this.#movieState['error'] = {
        isError,
        message,
      };

      return;
    }

    if (!('results' in data)) return;

    const { results, total_pages, page } = data;
    setTimeout(() => this.#setMovies({ results, total_pages, page }), 500);
  }

  #setSkeletonArray(curPage = 1) {
    const emptyArray = Array.from({ length: 20 }, () => ({ title: null }));

    this.#movieState['results'] =
      curPage === 1 ? emptyArray : [...this.#movieState.results, ...emptyArray];
  }

  #setMovies({ results, total_pages, page }: IMovieHandleProps<IMovieItemProps>) {
    this.#movieState['results'] =
      page === 1 ? results : [...this.#movieState.results.filter(({ title }) => title), ...results];
    this.#movieState['nextPage'] = total_pages === page ? -1 : page + 1;
    this.#movieState['error']['isError'] = false;
  }

  getMovieStates() {
    return {
      ...this.#movieState,
    };
  }
}

export default Movie;
