import Movie, { IFetchedError } from './domain/Movie';
import { statusCodeToErrorMessage } from './statusCode';
import { IMovieHandleProps, IMovieState } from './types/movie';

export const initialMovieStats = {
  results: [],
  nextPage: 1,
  query: '',
  category: 'popular',
  error: {
    isError: false,
    message: '',
  },
};

export function MovieRenderState(initialMovieState: IMovieState) {
  const movieState = initialMovieState;
  const movie = new Movie();

  async function renderPopularMovies(curPage = 1) {
    if (movieState['category'] === 'search') {
      movieState['nextPage'] = 1;
    }

    movieState['category'] = 'popular';
    setSkeletonArray(curPage);

    const { isError, data } = await movie.getPopularMovies({
      curPage,
    });

    if (isError && 'status_code' in data) {
      const message = statusCodeToErrorMessage(data.status_code);

      movieState['error'] = {
        isError,
        message,
      };

      return;
    }

    if (!('results' in data)) return;

    const { results, total_pages, page } = data;

    setTimeout(() => setMovies({ results, total_pages, page }), 500);
  }

  async function renderSearchedMovies(query: string, curPage = 1) {
    if (movieState['category'] === 'popular') {
      movieState['nextPage'] = 1;
    }

    movieState['query'] = query;
    movieState['category'] = 'search';
    setSkeletonArray(curPage);

    const { isError, data } = await movie.findMovies({
      query,
      curPage,
    });

    if (isError && 'status_code' in data) {
      const message = statusCodeToErrorMessage(data.status_code);

      movieState['error'] = {
        isError,
        message,
      };

      return;
    }

    if (!('results' in data)) return;

    const { results, total_pages, page } = data;
    setTimeout(() => setMovies({ results, total_pages, page }), 500);
  }

  function setSkeletonArray(curPage = 1) {
    const emptyArray = Array.from({ length: 20 }).map(() => {
      return { title: null };
    });

    movieState['results'] = curPage === 1 ? emptyArray : [...movieState.results, ...emptyArray];
  }

  function setMovies({ results, total_pages, page }: IMovieHandleProps) {
    movieState['results'] =
      page === 1 ? results : [...movieState.results.filter(({ title }) => title), ...results];
    movieState['nextPage'] = total_pages === page ? -1 : page + 1;
    movieState['error']['isError'] = false;
  }

  function getMovieStates() {
    return {
      ...movieState,
    };
  }

  return {
    getMovieStates,
    renderPopularMovies,
    renderSearchedMovies,
  };
}

export const Store = {
  movieStates: null,
};
