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

  async getPopularMovies({
    curPage = 1,
  }: IMovieFetchProps): Promise<IMovieHandleProps<IMovieItemProps>> {
    const { results, total_pages, page } = await fetchData<IMovieHandleProps<IMovieProps>>(
      `${TMDB_MOVIE_BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${curPage}`
    );

    const movleList = results.map((currentMovie) => ({
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));

    return {
      results: movleList,
      total_pages,
      page,
    };
  }

  async getFindMovies({
    query,
    curPage = 1,
  }: IFindMovieFetchProps): Promise<IMovieHandleProps<IMovieItemProps>> {
    const { results, total_pages, page } = await fetchData<IMovieHandleProps<IMovieProps>>(
      `${TMDB_MOVIE_BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${curPage}`
    );

    const movieList = results.map((currentMovie) => ({
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));

    return {
      results: movieList,
      total_pages,
      page,
    };
  }

  async renderPopularMovies(curPage = 1) {
    try {
      const { results, total_pages, page } = await this.getPopularMovies({
        curPage,
      });

      if (this.#movieState.category === 'search') {
        this.#movieState.category = 'popular';
        this.#movieState.nextPage = 1;
      }

      this.#setMovies({ results, total_pages, page });
    } catch (error) {
      this.#movieState.error = error as string;
    }
  }

  async renderSearchedMovies(query: string, curPage = 1) {
    try {
      const { results, total_pages, page } = await this.getFindMovies({
        query,
        curPage,
      });

      if (this.#movieState.category === 'popular') {
        this.#movieState.query = query;
        this.#movieState.category = 'search';
        this.#movieState.nextPage = 1;
      }

      this.#setMovies({ results, total_pages, page });
    } catch (error) {
      this.#movieState.error = error as string;
    }
  }

  #setMovies({ results, total_pages, page }: IMovieHandleProps<IMovieItemProps>) {
    this.#movieState.results = results;
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
