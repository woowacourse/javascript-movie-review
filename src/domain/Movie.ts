import { fetchData } from '../api/http';
import { statusCodeToErrorMessage } from '../api/statusCode';
import { TMDB_MOVIE_BASE_URL } from '../utils/constants';
import { IMovieHandleProps, IMovieItemProps, IMovieProps, IMovieState } from '../types/movie';

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
  data: IMovieHandleProps<IMovieProps>;
}

export interface IModifiedMovie {
  data: IMovieHandleProps<IMovieItemProps>;
}

export const initialMovieStats: IMovieState = {
  results: [],
  nextPage: 1,
  query: '',
  category: 'popular',
  error: '',
};

class Movie {
  #movieState: IMovieState;

  constructor(initialMovieState: IMovieState) {
    this.#movieState = initialMovieState;
  }

  async getPopularMovies({ curPage = 1 }: IMovieFetchProps): Promise<IModifiedMovie> {
    const movieList = await fetchData<IFetchMovie>(
      `${TMDB_MOVIE_BASE_URL}/movie/popular?api_key=${'asdfa'}&language=ko-KR&page=${curPage}`
    );

    const { data } = movieList;

    const { results, total_pages, page } = data;

    const movleList = results.map((currentMovie) => ({
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));

    return {
      data: { results: movleList, total_pages, page },
    };
  }

  async findMovies({ query, curPage = 1 }: IFindMovieFetchProps): Promise<IModifiedMovie> {
    const foundedMovies = await fetchData<IFetchMovie>(
      `${TMDB_MOVIE_BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${curPage}`
    );

    const { data } = foundedMovies;

    const { results, total_pages, page } = data;

    const movleList = results.map((currentMovie) => ({
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));

    return {
      data: { results: movleList, total_pages, page },
    };
  }

  async renderPopularMovies(curPage = 1) {
    if (this.#movieState.category === 'search') {
      this.#movieState.nextPage = 1;
    }

    try {
      this.#movieState.category = 'popular';

      const { data } = await this.getPopularMovies({
        curPage,
      });

      const { results, total_pages, page } = data;

      this.#setMovies({ results, total_pages, page });
    } catch (error) {
      this.#movieState.error = error as string;
    }
  }

  async renderSearchedMovies(query: string, curPage = 1) {
    if (this.#movieState.category === 'popular') {
      this.#movieState.nextPage = 1;
    }
    try {
      this.#movieState.query = query;
      this.#movieState.category = 'search';

      const { data } = await this.findMovies({
        query,
        curPage,
      });

      const { results, total_pages, page } = data;
      this.#setMovies({ results, total_pages, page });
    } catch (error) {
      this.#movieState.error = error as string;
    }
  }

  #setSkeletonArray(curPage = 1) {
    const emptyArray = Array.from({ length: 20 }, () => ({ title: null }));

    this.#movieState.results =
      curPage === 1 ? emptyArray : [...this.#movieState.results, ...emptyArray];
  }

  #setMovies({ results, total_pages, page }: IMovieHandleProps<IMovieItemProps>) {
    this.#movieState.results = page === 1 ? results : [...this.#movieState.results, ...results];
    this.#movieState.nextPage = total_pages === page ? -1 : page + 1;
    this.#movieState.error = '';
  }

  getMovieStates() {
    return {
      ...this.#movieState,
    };
  }
}

export default Movie;
