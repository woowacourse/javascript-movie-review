import { generateMovieApiUrl, getCurrentPage, getCurrentQuery } from '../../utils/urlHelper';
import { API_URL } from './../../consts/Api';
import { MovieAPI } from './API.type';
import { ERROR_MESSAGE } from '../../consts/error';

const MovieFetchAPI = {
  async fetchPopularMovies(): Promise<MovieAPI> {
    const popularMoviesUrl = generateMovieApiUrl(API_URL.POPULAR_MOVIES, {
      page: getCurrentPage(),
    });

    const response = await fetch(popularMoviesUrl);

    this.errorHandler(response.status);

    const popularMovieResult = await response.json();

    return popularMovieResult;
  },

  async fetchSearchMovies(): Promise<MovieAPI> {
    const searchMoviesUrl = generateMovieApiUrl(API_URL.SEARCH_MOVIES, {
      page: getCurrentPage(),
      query: getCurrentQuery(),
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
