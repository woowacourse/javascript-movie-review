import { getErrorMessage } from '../constants/message';

import type { MovieAPIResponse } from '../types/movie';
import type { MovieDetailAPIResponse } from '../types/movieDetail';

interface MovieApiParams {
  [key: string]: string | number;
}

const MovieApi = {
  baseUrl: 'https://api.themoviedb.org/3',

  getUrl(endpoint: string, params?: MovieApiParams) {
    return `
      ${MovieApi.baseUrl + endpoint}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&${
      params &&
      Object.entries(params)
        .map(([key, queryString]) => `${key}=${queryString}`)
        .join('&')
    }
    `;
  },

  async getResponseData<T = MovieAPIResponse>(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
      throw getErrorMessage(response.status);
    }

    const data: T = await response.json();
    return data;
  },

  getPopularMovies(params: MovieApiParams) {
    return MovieApi.getResponseData(MovieApi.getUrl('/movie/popular', params));
  },

  getSearchedMovies(params: MovieApiParams) {
    return MovieApi.getResponseData(MovieApi.getUrl('/search/movie', params));
  },

  getMovieDetail(movieId: string) {
    return MovieApi.getResponseData<MovieDetailAPIResponse>(MovieApi.getUrl(`/movie/${movieId}`));
  },
};

export default MovieApi;
