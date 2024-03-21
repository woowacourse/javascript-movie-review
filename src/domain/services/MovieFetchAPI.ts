import { generateMovieApiUrl } from '../../utils/urlHelper';
import { API_URL } from './../../consts/Api';
import { PopularAPIParamsType, MovieAPIReturnType, SearchAPIParamsType } from './API.type';

const MovieFetchAPI = {
  async fetchPopularMovies({ pageNumber = 1 }: PopularAPIParamsType): Promise<MovieAPIReturnType> {
    const popularMoviesUrl = generateMovieApiUrl(API_URL.POPULAR_MOVIES, {
      page: pageNumber,
    });

    const response = await fetch(popularMoviesUrl);
    const popularMovieResult = await response.json();

    return popularMovieResult;
  },

  async fetchSearchMovies({ query, pageNumber = 1 }: SearchAPIParamsType): Promise<MovieAPIReturnType> {
    const searchMoviesUrl = generateMovieApiUrl(API_URL.SEARCH_MOVIES, {
      page: pageNumber,
      query,
    });

    const response = await fetch(searchMoviesUrl);
    const searchMovieResult = await response.json();

    return searchMovieResult;
  },
};

export default MovieFetchAPI;
