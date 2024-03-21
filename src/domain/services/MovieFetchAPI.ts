import { generateMovieApiUrl } from '../../utils/urlHelper';
import { API_URL } from './../../consts/Api';
import { PopularAPIParamsType, MovieAPIReturnType, SearchAPIParamsType } from './API.type';
import { ERROR_MESSAGE } from '../../consts/error';

const MovieFetchAPI = {
  async fetchPopularMovies({ pageNumber = 1 }: PopularAPIParamsType): Promise<MovieAPIReturnType> {
    const popularMoviesUrl = generateMovieApiUrl(API_URL.POPULAR_MOVIES, {
      page: pageNumber,
    });

    const response = await fetch(popularMoviesUrl);

    this.errorHandler(response.status);

    const popularMovieResult = await response.json();

    return popularMovieResult;
  },

  async fetchSearchMovies({ query, pageNumber = 1 }: SearchAPIParamsType): Promise<MovieAPIReturnType> {
    const searchMoviesUrl = generateMovieApiUrl(API_URL.SEARCH_MOVIES, {
      page: pageNumber,
      query,
    });

    const response = await fetch(searchMoviesUrl);

    this.errorHandler(response.status);

    const searchMovieResult = await response.json();

    if (!searchMovieResult.results.length) throw new Error(ERROR_MESSAGE.RESULTS_NOT_FOUND);
    return searchMovieResult;
  },

  errorHandler(status: number) {
    if (status === 400) throw new Error(ERROR_MESSAGE.FETCH_FAILED);
    else if (status === 401) throw new Error(ERROR_MESSAGE.AUTHENTICATION_FAILED);
    else if (status === 500) throw new Error(ERROR_MESSAGE.SERVER_ERROR);
    else if (status === 501) throw new Error(ERROR_MESSAGE.SERVICE_NOT_SUPPORTED);
  },
};

export default MovieFetchAPI;
