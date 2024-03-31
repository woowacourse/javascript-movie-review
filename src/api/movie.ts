import {
  PopularAPIParamsType,
  SearchAPIParamsType,
  MovieDetailAPIReturnType,
  MovieListAPIReturnType,
} from './movieAPI.type';
import Fetcher from './Fetcher';
import { API_URL, DETAIL_OF_MOVIE } from '../consts/URL';

const movieAPI = {
  async fetchPopularMovies({ pageNumber = 1 }: PopularAPIParamsType): Promise<MovieListAPIReturnType> {
    const fetcher = new Fetcher({
      url: API_URL.POPULAR_MOVIES,
      params: {
        page: pageNumber,
      },
    });

    return fetcher.get() as Promise<MovieListAPIReturnType>;
  },

  async fetchSearchMovies({ query, pageNumber = 1 }: SearchAPIParamsType): Promise<MovieListAPIReturnType> {
    const fetcher = new Fetcher({
      url: API_URL.SEARCH_MOVIES,
      params: {
        page: pageNumber,
        query,
      },
    });

    return fetcher.get() as Promise<MovieListAPIReturnType>;
  },

  async fetchDetailOfMovie({ movieId }: { movieId: number }): Promise<MovieDetailAPIReturnType> {
    const fetcher = new Fetcher({
      url: DETAIL_OF_MOVIE(movieId),
    });

    console.log(await fetcher.get());
    return fetcher.get() as Promise<MovieDetailAPIReturnType>;
  },
};

export default movieAPI;
