import { statusCodeToErrorMessage } from '../api/statusCode';
import { IMovieHandleProps, IMovieItemProps, IMovieState } from '../types/movie';
import Movie from './Movie';

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

export class MovieRender {
  #movieState: IMovieState;
  #movie = new Movie();

  constructor(initialMovieState: IMovieState) {
    this.#movieState = initialMovieState;
  }

  async renderPopularMovies(curPage = 1) {
    if (this.#movieState['category'] === 'search') {
      this.#movieState['nextPage'] = 1;
    }

    this.#movieState['category'] = 'popular';
    this.#setSkeletonArray(curPage);

    const { isError, data } = await this.#movie.getPopularMovies({
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

    const { isError, data } = await this.#movie.findMovies({
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
    const emptyArray = Array.from({ length: 20 }).map(() => {
      return { title: null };
    });

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
